import { useEffect } from 'react'

const setDescription = (content) => {
  let tag = document.querySelector('meta[name="description"]')
  if (!tag) {
    tag = document.createElement('meta')
    tag.name = 'description'
    document.head.appendChild(tag)
  }
  tag.setAttribute('content', content)
}

const usePageMeta = ({ title, description }) => {
  useEffect(() => {
    const prevTitle = document.title
    const prevDescription = document.querySelector('meta[name="description"]')?.getAttribute('content') ?? ''

    if (title) document.title = title
    if (description) setDescription(description)

    const { hash } = window.location
    const hasTarget = hash && document.getElementById(hash.slice(1))
    if (!hasTarget) window.scrollTo({ top: 0, behavior: 'instant' })

    return () => {
      document.title = prevTitle
      if (prevDescription) setDescription(prevDescription)
    }
  }, [title, description])
}

export default usePageMeta