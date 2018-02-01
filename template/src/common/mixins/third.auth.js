/**
 * auth
 *
 * @author isunkui
 * @date 2018/1/30
 */
import { mapActions } from 'vuex'
import { page } from '../utils'

export default  {
  data () {
    return {
      commonParams: {
        env: this.$route.query.env
      }
    }
  },
  methods: {
    handleAuth$ (forceAuth = false) {
      if (page.infos().isWechat) {
        return this.handleWechatAuth$(forceAuth)
      } else {
        return this.handleQqAuth$(forceAuth)
      }
    },
    handleWechatAuth$ (forceAuth = false) {
      return this.fetchWechatUserInfo({ forceAuth, ...this.commonParams })
    },
    handleQqAuth$ (forceAuth = false) {
      const code = this.$route.query.code
      return this.fetchQqUserInfo({ code, forceAuth, ...this.commonParams })
    },
    ...mapActions([ 'fetchWechatUserInfo', 'fetchQqUserInfo', 'handleWechatShare' ])
  },
  created () {
  }

}
