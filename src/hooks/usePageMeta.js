import { useEffect } from 'react'

const usePageMeta = (title, description) => {
  useEffect(() => {
    const previousTitle = document.title
    const meta = document.querySelector('meta[name="description"]')
    const previousDescription = meta?.getAttribute('content')

    document.title = `${title} | UNEVENT`
    if (description && meta) meta.setAttribute('content', description)

    return () => {
      document.title = previousTitle
      if (meta && previousDescription != null) meta.setAttribute('content', previousDescription)
    }
  }, [title, description])
}

export default usePageMeta
