import {
  RequestEntity,
  isObject,
  getDataToJSON,
  findObjectValue,
  statusError,
  axiosParamsConfig,
} from 'pine-utils';
import router from '@/router/index';
import axios from 'axios';

const WebHttpRequest: any = axios.create();
export const contentType = 'application/x-www-form-urlencoded';
let configRequest: any = null
export const configRequestFunction = (config: any) => {
  const configJson = { ...config };
  if (configJson?.once && !configRequest) {
    configJson.once -= 1;
    configRequest = configJson;
  } else {
    configRequest = null;
  }

  if (getToken() && !configJson.istoken) {
    const { authorization, sessionId } = getToken();
    configJson.headers.authorization = authorization;
    configJson.headers.sessionId = sessionId;
  }

  configJson.headers['content-type'] = config?.contentType || contentType;

  return configJson;
};
const resetToLogin = ({ code, status, message, config }: any) => {
  const { serverUrl } = getDataToJSON(window.location.href);

  if (!serverUrl) {
    if (status == 401 || (11020 == code && !config.istoken)) {
      router.push("/login");
      WebHttpRequest.cancel && WebHttpRequest.cancel();
      return false;
    }
    if (!["1", "200"].includes(String(code))) {
      MessageBox({
        type: "error",
        duration: 2500,
        message: message,
      });
    }
  }
  return serverUrl;
};
// 请求成功处理
export const httptResponseFunction = async (response: object) => {
  const { config, data, status, statusText }: any = response;
  if (!isObject(data)) {
    return Promise.resolve(data);
  }
  const result: any = {
    code: data.code ?? status,
    page: data.page ?? {},
    message: data.msg || statusText,
    data: config?.request ? findObjectValue(data, config.request) : data,
  };
  const serverUrl = resetToLogin({
    code: result.code,
    status,
    config,
    message: result.message,
  });
  const statusCode = ["1", "200"].includes(String(result.code));
  // 数据响应提示
  if (config?.showMessage && !serverUrl && statusCode) {
    MessageBox({
      type: statusCode ? "success" : "error",
      duration: 2500,
      message: config?.message ?? "操作成功了",
    });
  }
  return statusCode ? Promise.resolve(result) : Promise.reject(result);
};

// 请求失败处理函数
export const httpErrorFunction = async (error: any) => {
  console.log(error);
  const { config, status, code, message }: any = error
    ? JSON.parse(JSON.stringify(error))
    : {};
  resetToLogin({
    code,
    status,
    config,
    message,
  });

  // 重新请求
  if (config && config.once && configRequest) {
    WebHttpRequest.request(config);
  }
  return Promise.reject(error);
};


WebHttpRequest.interceptors.request.use(configRequestFunction, (error: any) => error);
WebHttpRequest.interceptors.response.use(
  httptResponseFunction,
  httpErrorFunction,
);

export default async (option: RequestEntity) => {
  return await WebHttpRequest.request(axiosParamsConfig(option));
};
