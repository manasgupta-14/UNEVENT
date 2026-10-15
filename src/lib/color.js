const parse = (hex) => {
  const value = parseInt(hex.slice(1), 16)
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255]
}

export const rgba = (hex, alpha) => {
  const [r, g, b] = parse(hex)
  return `rgba(${r},${g},${b},${alpha})`
}

export const tint = (hex, amount) => {
  const [r, g, b] = parse(hex)
  const mix = (channel) => Math.round(channel + (255 - channel) * amount)
  return `rgb(${mix(r)},${mix(g)},${mix(b)})`
}
