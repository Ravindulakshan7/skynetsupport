'use client'

import { Suspense, lazy } from 'react'
import type { Application } from '@splinetool/runtime'
const Spline = lazy(() => import('@splinetool/react-spline'))

interface SplineSceneProps {
  scene: string
  className?: string
  onLoad?: (app: Application) => void
}

export function SplineScene({ scene, className, onLoad }: SplineSceneProps) {
  return (
    <Suspense fallback={<div className="sp:w-full sp:h-full sp:flex sp:items-center sp:justify-center" role="status"><span className="spline-spinner" aria-label="Loading 3D viewer" /></div>}>
      <Spline scene={scene} className={className} onLoad={onLoad} renderOnDemand />
    </Suspense>
  )
}
