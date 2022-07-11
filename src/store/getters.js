const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles,
  permissions: state => state.user.permissions,
  permission_routes: state => state.permission.routes,
  sysmenu_routes: state => state.permission.addRoutes,
  sidebarRouters: state => state.permission.sidebarRouters,
  socketConnection: state => state.socketStore.socketConnection,
  socketMessage: state => state.socketStore.socketMessage,
  socketStatus: state => state.socketStore.socketStatus,
  isStoreSocket:state=>state.socketStore.isStoreSocket

}
export default getters
