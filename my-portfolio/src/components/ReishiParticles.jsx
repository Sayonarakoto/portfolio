import { useEffect, useRef } from 'react'
import { useLenis } from './CinematicScrollProvider'

export default function ReishiParticles() {
  const canvasRef = useRef(null)
  const lenis = useLenis()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let animationFrameId
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const handleResize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', handleResize)

    // Particle pool
    const particleCount = 40
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.8,
      baseSpeedY: Math.random() * 0.4 + 0.2,
      speedX: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.35 + 0.15,
    }))

    const render = () => {
      ctx.clearRect(0, 0, width, height)

      // Read normalized scroll velocity from Lenis if active
      const velocity = lenis ? Math.abs(lenis.velocity || 0) : 0
      const boost = Math.min(velocity * 0.15, 4)

      particles.forEach((p) => {
        p.y -= p.baseSpeedY + boost
        p.x += p.speedX

        if (p.y < -10) {
          p.y = height + 10
          p.x = Math.random() * width
        }
        if (p.x < -10) p.x = width + 10
        if (p.x > width + 10) p.x = -10

        ctx.fillStyle = `rgba(26, 26, 27, ${p.opacity})`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      window.removeEventListener('resize', handleResize)
      cancelAnimationFrame(animationFrameId)
    }
  }, [lenis])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-30 opacity-60"
    />
  )
}
