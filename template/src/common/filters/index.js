import { filters } from '../utils'

export const ms2Secnods = (ms) => {
  let seconds = parseInt(ms / 1000, 10)
  return seconds
}
export const cdnImg = filters.cdnImg;
export const time = filters.time;
export const leftpad = filters.leftpad;
export const percentage = filters.percentage;

export default {
  ms2Secnods,
  cdnImg
}
