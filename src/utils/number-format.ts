export function formatNumber2KW(num: number) {
  if (num >= 1e3 && num < 1e4) {
    return (num / 1e3).toFixed(1) + 'K'
  } else if (num >= 1e4) {
    return (num / 1e4).toFixed(1) + 'W'
  } else {
    return num
  }
}
