import { ElMessageBox, ElMessage, ElLoading } from 'element-plus';
// 消息提示
export const DialogBox = (options: object | number | string) => {
  return new Promise((resolve, reject) => {
    const message = /number|string/.test(typeof options) ? options : '';
    let tempjson: object = {
      title: '温馨提示',
      message: String(message) || '此操作将永久删除该文件, 是否继续?',
      showCancelButton: true,
      type: 'warning'
    };
    message && (tempjson = Object.assign({}, tempjson, options));

    ElMessageBox(tempjson)
      .then(() => resolve(true))
      .catch(() => reject(false));
  });
};

export const MessageBox = (option: any) => ElMessage(option);

export const Loading = (loading: any) =>
  ElLoading.service({
    text: loading,
    lock: true,
    customClass: 'loading-box',
    background: 'rgba(0,0,0,.8)'
  });
