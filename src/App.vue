<template>
  <div id="app">
    <alarm-module v-if="isShow"></alarm-module>
    <router-view/>
  </div>
</template>

<script>
import AlarmModule from "@/views/components/AlarmModule";
import {getToken} from '@/utils/auth'

export default {
  name: 'App',
  components: {
    AlarmModule
  },
  watch: {
    $route: {
      handler: function (to, from) {
        if (from.path === '/login' && to.path === '/index') {
          console.log('login')
          this.isShow = true
        } else if (to.path === '/login') {
          this.isShow = false
        }
      },
      // 深度观察监听
      deep: true
    }
  },

  data() {
    return {
      isShow: false
    }
  },
  created() {
    if (getToken()) {
      this.isShow = true
    }
  },
}
</script>

