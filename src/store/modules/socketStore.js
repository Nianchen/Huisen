/**
 * @project ruoyi-ui
 * @fileName socketStore.js
 * @author JiangHongxu
 * @date 2021/4/21 14:39
 */
import Socket from "@/utils/socket";

const socketStore = {
  state: {
    socketConnection: null,
    socketMessage: '',
    socketStatus: false,
    isStoreSocket: false
  },
  mutations: {
    SET_MESSAGE: (state, message) => {
      state.socketMessage = message
    },
    SET_SOCKET: (state, socketConnection) => {
      state.socketConnection = socketConnection
    },
    SET_SOCKETSTATUS: (state, wsStatus) => {
      state.socketStatus = wsStatus
    },
    SET_ISSTORESOCKET: (state, isStoreSocket) => {
      state.isStoreSocket = isStoreSocket
    }
  },
  actions: {
    // 获取msg数据
    GetMessage({commit}, data) {
      commit('SET_MESSAGE', data)
    },
    // 获取ws对象
    GetSocketConnection({commit}, socketConnection) {
      commit('SET_SOCKET', socketConnection)
    },

    GetSocketStatus({commit}, socketStatus) {
      commit('SET_SOCKETSTATUS', socketStatus)
    },
    GetIsStoreSocket({commit}, isStoreSocket) {
      commit('SET_ISSTORESOCKET', isStoreSocket)
    }
  }
}

export default socketStore
