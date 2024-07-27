const store: any = createPinia();

import { storePlugin } from 'pinia-plugin-store';
const plugin = storePlugin({
  stores: ['token', 'userInfo', 'config', 'dictList', 'details'],
  storage: sessionStorage,
});
store.use(plugin);
export default store;
