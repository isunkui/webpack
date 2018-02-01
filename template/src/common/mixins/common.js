/**
 * common
 *
 * @author isunkui
 * @date 2018/2/1
 */
import api from '../service/axios'
export const sharedState = {
  loading: false,
  env: undefined
}

export const loadingStart$ = () => sharedState.loading = true
export const loadingDone$ = () => sharedState.loading = false

export default {
  data () {
    if (this.$route) {
      sharedState.env = this.$route.query.env
      api.setBaseUrl(sharedState.env)
    }
    return {
      sharedState
    }
  },
  methods: {
    loadingStart$,
    loadingDone$
  }
}
