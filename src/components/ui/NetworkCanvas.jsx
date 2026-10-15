import { useEffect, useRef } from 'react'

const NetworkCanvas = ({ className = '', density = 16000, reach = 130 }) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const mouse = { x: -9999, y: -9999 }
    let width = 0
    let height = 0
    let frame = 0
    let nodes = []

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      width = rect.width
      height = rect.height
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.round(Math.min(95, Math.max(26, (width * height) / density)))
      nodes = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.34,
        vy: (Math.random() - 0.5) * 0.34,
        r: Math.random() * 1.4 + 0.8,
        gold: Math.random() < 0.09,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height)

      for (const node of nodes) {
        if (!reduce) {
          const dx = mouse.x - node.x
          const dy = mouse.y - node.y
          const dist = Math.hypot(dx, dy)
          if (dist < 190 && dist > 1) {
            node.x += (dx / dist) * 0.22
            node.y += (dy / dist) * 0.22
          }
          node.x += node.vx
          node.y += node.vy
          if (node.x < -10) node.x = width + 10
          if (node.x > width + 10) node.x = -10
          if (node.y < -10) node.y = height + 10
          if (node.y > height + 10) node.y = -10
        }
      }

      for (let i = 0; i < nodes.length; i += 1) {
        const a = nodes[i]
        for (let j = i + 1; j < nodes.length; j += 1) {
          const b = nodes[j]
          const dist = Math.hypot(a.x - b.x, a.y - b.y)
          if (dist < reach) {
            ctx.strokeStyle = `rgba(59,130,246,${(1 - dist / reach) * 0.32})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
        const md = Math.hypot(a.x - mouse.x, a.y - mouse.y)
        if (md < 190) {
          ctx.strokeStyle = `rgba(245,184,46,${(1 - md / 190) * 0.55})`
          ctx.lineWidth = 1
          ctx.beginPath()
          ctx.moveTo(a.x, a.y)
          ctx.lineTo(mouse.x, mouse.y)
          ctx.stroke()
        }
      }

      for (const node of nodes) {
        ctx.fillStyle = node.gold ? 'rgba(245,184,46,0.95)' : 'rgba(147,197,253,0.75)'
        ctx.beginPath()
        ctx.arc(node.x, node.y, node.r, 0, Math.PI * 2)
        ctx.fill()
      }

      if (!reduce) frame = requestAnimationFrame(draw)
    }

    const onMove = (event) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = event.clientX - rect.left
      mouse.y = event.clientY - rect.top
    }

    const onLeave = () => {
      mouse.x = -9999
      mouse.y = -9999
    }

    const visibility = new IntersectionObserver(([entry]) => {
      cancelAnimationFrame(frame)
      if (entry.isIntersecting && !reduce) frame = requestAnimationFrame(draw)
    })

    const sizing = new ResizeObserver(() => {
      resize()
      if (reduce) draw()
    })

    resize()
    draw()
    visibility.observe(canvas)
    sizing.observe(canvas)
    window.addEventListener('pointermove', onMove, { passive: true })
    document.addEventListener('pointerleave', onLeave)

    return () => {
      cancelAnimationFrame(frame)
      visibility.disconnect()
      sizing.disconnect()
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [density, reach])

  return <canvas ref={canvasRef} className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} aria-hidden="true" />
}

export default NetworkCanvas
