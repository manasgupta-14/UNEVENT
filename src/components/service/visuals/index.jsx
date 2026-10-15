const modules = import.meta.glob('./*Visual.jsx', { eager: true })

const map = Object.fromEntries(
  Object.entries(modules).map(([path, module]) => [path.match(/\/(\w+)Visual\.jsx$/)[1].toLowerCase(), module.default]),
)

const Visual = ({ service }) => {
  const Component = map[service.slug]
  return Component ? <Component service={service} /> : null
}

export default Visual
