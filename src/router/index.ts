import { routes } from "./router";
const router = createRouter({
  history: createWebHashHistory(),
  routes
});
let hasCurrentRouter = false
router.beforeEach((to, from) => {
  from.meta.loading = true;
  const token = getToken()
  if (token) {
    if (!hasCurrentRouter) {
      hasCurrentRouter = true
      return to.fullPath;
    } else {
      return true
    }

  } else {
    if (to.path == '/login') {
      return true
    } else {
      return '/login'
    }
  }

});
router.afterEach((to) => {
  to.meta.loading = true;
  return true;
});
export default router;
