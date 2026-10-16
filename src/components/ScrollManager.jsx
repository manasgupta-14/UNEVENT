import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router'

const ScrollManager = () => {
  const { pathname, hash } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (hash) {
      const timer = setTimeout(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth' })
      }, 80)
      return () => clearTimeout(timer)
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
    return undefined
  }, [pathname, hash])

  useEffect(() => {
    const onClick = (event) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
      const anchor = event.target.closest?.('a')
      if (!anchor || anchor.target === '_blank' || anchor.hasAttribute('download')) return
      const href = anchor.getAttribute('href')
      if (!href) return
      if (href.startsWith('/') && !href.startsWith('//')) {
        event.preventDefault()
        navigate(href)
        return
      }
      if (href.length > 1 && href.startsWith('#') && pathname !== '/' && !document.getElementById(href.slice(1))) {
        event.preventDefault()
        navigate(`/${href}`)
      }
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [navigate, pathname])

  return null
}

export default ScrollManager
