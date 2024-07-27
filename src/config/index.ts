import zhCn from "element-plus/es/locale/lang/zh-cn";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import dayjs from 'dayjs'
export const globalJson = {
  pagins: {
    current: "page",
    size: "limit",
    total: "total",
    request: "page"
  },
  dayjs,
  weekHtml() {
    const index = dayjs().day()
    const weekjson: any = {
      0: '星期日',
      1: '星期一',
      2: '星期二',
      3: '星期三',
      4: '星期四',
      5: '星期五',
      6: '星期六'
    }

    return weekjson[index]
  },
  dateHtml: () => dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss'),
  configTheme: {
    size: "large",
    adviceLink: "",
    advicelabel: "意见反馈",
    corp: (() => {
      const year = dayjs(new Date()).year()
      return `Copyright © ${year} 成都互联网科技有限公司`
    })(),
    locale: zhCn,
    message: {
      max: 1
    }
  }
};

export const createGlobalJson = (app: any) => {
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
  }

  for (const [key, values] of Object.entries(globalJson)) {
    app.provide(key, values);
  }
  return app;
};
