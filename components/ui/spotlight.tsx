'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useSpring, useTransform, useReducedMotion } from 'framer-motion'
import type { SpringOptions } from 'framer-motion'
import { cn } from '@/lib/utils'

type SpotlightProps = {
  className?: string
  size?: number
  fill?: string
  springOptions?: SpringOptions
}

export function Spotlight({ className, size = 200, fill = 'white', springOptions = { bounce: 0 } }: SpotlightProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const reduced = useReducedMotion()
  const mouseX = useSpring(0, springOptions)
  const mouseY = useSpring(0, springOptions)
  const left = useTransform(mouseX, x => `${x - size / 2}px`)
  const top = useTransform(mouseY, y => `${y - size / 2}px`)

  useEffect(() => {
    const parent = containerRef.current?.parentElement
    if (!parent || reduced) return
    const oldPosition = parent.style.position
    const oldOverflow = parent.style.overflow
    if (getComputedStyle(parent).position === 'static') parent.style.position = 'relative'
    parent.style.overflow = 'hidden'
    const move = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return
      const bounds = parent.getBoundingClientRect()
      mouseX.set(event.clientX - bounds.left)
      mouseY.set(event.clientY - bounds.top)
    }
    const enter = (event: PointerEvent) => { if (event.pointerType !== 'touch') setIsHovered(true) }
    const leave = () => setIsHovered(false)
    parent.addEventListener('pointermove', move)
    parent.addEventListener('pointerenter', enter)
    parent.addEventListener('pointerleave', leave)
    return () => {
      parent.removeEventListener('pointermove', move)
      parent.removeEventListener('pointerenter', enter)
      parent.removeEventListener('pointerleave', leave)
      parent.style.position = oldPosition
      parent.style.overflow = oldOverflow
    }
  }, [mouseX, mouseY, reduced])

  return <motion.div ref={containerRef} aria-hidden="true" className={cn('sp:pointer-events-none sp:absolute sp:rounded-full sp:blur-xl sp:transition-opacity sp:duration-200', isHovered && !reduced ? 'sp:opacity-100' : 'sp:opacity-0', className)} style={{width:size,height:size,left,top,background:`radial-gradient(circle at center, ${fill}, transparent 75%)`}} />
}
