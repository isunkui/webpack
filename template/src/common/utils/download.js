/**
 * download
 *
 * @author isunkui
 * @date 2017/11/30
 */

export const downloadApp = (urlSource = 'unknown') => {
  window.location.href = `http://static.doufan.tv/landing/html/redirect.html?source=${urlSource}`;
};
