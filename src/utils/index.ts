import router from "@/router";
import { jsonToGetData, arrayToOnly, getParams, beforeAxiosEnter, getName, isObject, findObjectValue } from 'pine-utils'
import request from './request';
export const setFilePath = (path: string) => {
  return new URL('../../image' + path, import.meta.url).href;
};

export const setItemRouter = (
  router: any,
  list: Array<any>,
  name: string
) => {
  return list.map((item: any) => {
    const modules = import.meta.glob('../views/**/*.vue');
    const tempjson: any = {
      name: '',
      path: '',
      component: '' as any,
      children: [],
      meta: {
        disabled: item?.hidden ?? item?.meta?.disabled ?? true,
        title: item?.meta?.title ?? item?.menuName,
        className: item?.icon,
        routeCode: item?.menuCode,
        parentCode: item.parentCode ?? ''
      }
    };
    if (item.type == 'dir' || item.children) {
      const path = item?.name || item?.source;
      tempjson.name = path;
      tempjson.path = path;
      if (Array.isArray(item.children) && item.children.length) {
        tempjson.redirect = item.children[0].path;
      }
      if (!tempjson.meta.disabled) {
        const paths = modules[`../views${item.path}.vue`];
        if (paths) {
          tempjson.component = paths;
        }
      } else {
        tempjson.component = modules['../views/main.vue'];
      }
    } else {
      const paths = modules[`../views${item.path}.vue`];
      if (paths) {
        const path = item?.path || item?.name;
        tempjson.name = path;
        tempjson.path = path;
        tempjson.component = paths;
      }
    }

    if (!router.hasRoute(tempjson.name)) {
      if (['/userInfo', '/importRecords'].includes(tempjson.path)) {
        router.addRoute(tempjson);
      } else {
        router.addRoute(name, tempjson);
      }
    }

    if (item.children) {
      tempjson.children = setItemRouter(router, item.children, tempjson.name);
    } else {
      tempjson.children = null;
    }
    return tempjson;
  });
};

let tempjson: any = {};
let matcheds: any = [];
export const getItemRouter = (
  list: Array<any>, route: any
) => {
  list && list.map((item: any) => {
    if (item.children) {
      tempjson = item;
      getItemRouter(item.children, route);
    } else {
      if (route.path == item.path) {
        matcheds = [tempjson, item];
        setDictList({ type: "route", data: item });
      }
    }

  });
  return arrayToOnly(matcheds, 'path');
};

// 按钮点击
export const handleChange = (item: any, data: any = {}) => {
  item.handle && setDictList({ type: "text", data: item.label ?? item.text });
  return new Promise((resolve) => {
    if (item?.pinia == false) {
      setDetails({});
    } else {
      item?.pinia && item.pinia(data);
    }
    if (item?.path) {
      if (item.path.match(/\d+/g)) {
        router.go(Number(item.path));
      } else {
        if (Array.isArray(item?.params)) {
          const params = jsonToGetData(getParams(item, data));
          router.push(item.path + params);
        } else {
          router.push(item.path);
        }
      }
    } else {
      resolve({ data, item });
    }
  });
};
export const httpRequest = async (item: any, datas: any = {}) => {
  return new Promise((resolve, reject) => {
    const params = beforeAxiosEnter(item, datas);
    request(params)
      .then((data: any) => {
        resolve(data ?? {});
      })
      .catch((data: any) => {
        reject(data ?? {});
      });
  });
};

export const getItemLoad = async (item: any, datas: any = {}) => {
  let list: any = item.list;
  if (item?.load) {
    const { data }: any = await httpRequest(item, datas);
    console.log(data);
    list = data ?? [];
  }
  if (isObject(item?.props) && Array.isArray(list)) {
    const { label, value } = item.props;
    return list.map((sitem: any) => {
      sitem.label = findObjectValue(sitem, label) ?? "";
      value && (sitem.value = findObjectValue(sitem, value) ?? "");
      return sitem;
    });
  } else {
    return list;
  }
};

export const getMode = () => import.meta.env.MODE;
export const setTextHtml = (row: any, item: any) => {
  let htmlText = "";
  let tempjson: any = {};
  const tempList: any = [];
  const vals = findObjectValue(row, getName(item));
  if (Array.isArray(item?.list) && item?.list.length) {
    item?.list.map((sitem: any) => {
      if (isObject(item.props)) {
        const { label, value } = item.props;
        if ((vals && String(vals).match(/,/g)) || (vals && Array.isArray(vals))) {
          const items: any = Array.isArray(vals) ? vals : String(vals).match(/,/g);
          if ((item.multiple || vals)) {
            items.map((kitem: any) => {
              if (isObject(kitem)) {
                if (kitem[value] == sitem[value]) {
                  tempList.push(findObjectValue(sitem, label));
                }
              } else {
                if (kitem == sitem[value]) {
                  tempList.push(findObjectValue(sitem, label));
                }
              }

            });

            htmlText = tempList.join(item.scope ?? "，");
          }
        } else if (vals == sitem[value]) {
          htmlText = sitem.label;
          tempjson = sitem;
        }
      } else if (vals == sitem.value) {
        htmlText = sitem.label;
        tempjson = sitem;
      }
    });
  } else if (item.multiple && Array.isArray(vals)) {
    vals.map((sitem: string | any) => {
      if (isObject(sitem)) {
        if (isObject(item.props)) {
          const { label } = item.props;
          tempList.push(findObjectValue(sitem, label));
        } else {
          tempList.push(findObjectValue(sitem, sitem.label));
        }
      } else {
        tempList.push(sitem);
      }
    });
    htmlText = tempList.join(item.scope ?? "，");
  } else {
    htmlText = vals;
  }
  return { htmlText, ...tempjson };
};

// 动态显示设置数据
export const setItemVisible = (row: any, item: any) => {
  const visible = item?.visible;
  if (isObject(visible)) {
    if (visible?.static) {
      if (Array.isArray(visible?.value)) {
        return visible?.value.includes(String(findObjectValue(row, visible?.label)));
      } else {
        return visible.value == String(findObjectValue(row, visible?.label));
      }
    } else {

      if (Array.isArray(visible?.value)) {

      } else {
        return findObjectValue(row, visible?.value) == findObjectValue(row, visible?.label);
      }

    }
  } else {
    return visible;
  }
};

export const setItemDisabled = (row: any, item: any) => {
  const disabled = item?.disabled ?? false;
  if (isObject(disabled)) {
    if (disabled?.static) {
      if (Array.isArray(disabled?.value)) {
        return disabled?.value.includes(String(findObjectValue(row, disabled?.label)));
      } else {
        return disabled.value == findObjectValue(row, disabled?.label);
      }
    } else {
      if (findObjectValue(row, disabled?.label)) {
        return (
          findObjectValue(row, disabled?.value) ==
          findObjectValue(row, disabled?.label)
        );
      } else {
        return false;
      }
    }
  } else {
    return disabled;
  }
};
// 菜单下拉数据
export const setVisibleMenu = (
  list: any = []
) => {
  const { menus } = getDictList("router") ?? {};
  const items: any = [];
  if (Array.isArray(menus)) {
    menus.map((item: any) => {
      if (!item.hidden && item.type == 'dir') {
        const modules = import.meta.glob("../views/**/*.vue");
        let tempjson: any = { ...item };
        tempjson.text = item.menuName;
        if (!isObject(item.visible)) {
          tempjson.visible = true;
        }
        const paths: any = modules[`../views${item.path}.vue`];
        if (paths) {
          tempjson.path = item.path;
        }
        items.push(tempjson);
      }
    });
  }

  return items;
};
// 设置动态按钮
export const setVisibleButton = (
  list: any = []
) => {
  const { buttons } = getDictList("router") ?? {};
  const { currentRoute }: any = router;
  setDictList({ type: "text", data: '' });
  setDictList({ type: "matched", data: getItemRouter(getDictList("menuList"), currentRoute.value) });
  const { meta }: any = getDictList("route") ?? {};
  const items: any = [];
  if (Array.isArray(buttons) && meta) {
    buttons.map((bitem: any) => {
      list.map(async (item: any) => {
        if (
          bitem.parentCode == meta.routeCode &&
          item.handle == bitem.source
        ) {
          const modules = import.meta.glob("../views/**/*.vue");
          let tempjson: any = { ...item };
          tempjson.text = bitem.menuName;
          if (!isObject(item.visible)) {
            tempjson.visible = true;
          }
          const paths: any = modules[`../views${bitem.path}.vue`];
          if (paths) {
            tempjson.path = bitem.path;
          }
          items.push(tempjson);
        }
      });
    });
  }
  return items;
};
export const VITE_CLOUD_PATH = import.meta.env.VITE_CLOUD_PATH;


