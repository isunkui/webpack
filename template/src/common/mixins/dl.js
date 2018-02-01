/**
 * dl
 *
 * @author isunkui
 * @date 2018/1/27
 */
export const baiduCount = ({ project = 'app-share', route, clickArea }) => {
  window._hmt && window._hmt.push(['_trackEvent', project, route, clickArea])
}

export const dlApp = (urlSource = 'unknown') => {
  window.location.href = `http://static.doufan.tv/v2/landing/html/dl.html?source=${urlSource}`
}

export default {
  methods: {
    dlApp$ (clickArea = 'unknown') {
      this.baiduCount$(clickArea)
      dlApp(this.$route.name)
    },
    baiduCount$ (clickArea = 'unknown') {
      baiduCount({
        route: this.$route.name,
        clickArea
      })
    }
  }
}
