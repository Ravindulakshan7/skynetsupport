'use client'

import { SplineScene } from "@/components/ui/splite";
import { Card } from "@/components/ui/card"
import { Spotlight } from "@/components/ui/spotlight"
 
export function SplineSceneBasic() {
  return (
    <Card className="sp:w-full sp:h-[500px] sp:bg-black/[0.96] sp:relative sp:overflow-hidden">
      <Spotlight
        className="sp:-top-40 sp:left-0 sp:md:left-60 sp:md:-top-20"
        fill="white"
      />
      
      <div className="sp:flex sp:h-full">
        {/* Left content */}
        <div className="sp:flex-1 sp:p-8 sp:relative sp:z-10 sp:flex sp:flex-col sp:justify-center">
          <h1 className="sp:text-4xl sp:md:text-5xl sp:font-bold sp:bg-clip-text sp:text-transparent sp:bg-gradient-to-b sp:from-neutral-50 sp:to-neutral-400">
            Interactive 3D
          </h1>
          <p className="sp:mt-4 sp:text-neutral-300 sp:max-w-lg">
            Bring your UI to life with beautiful 3D scenes. Create immersive experiences 
            that capture attention and enhance your design.
          </p>
        </div>

        {/* Right content */}
        <div className="sp:flex-1 sp:relative">
          <SplineScene 
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="sp:w-full sp:h-full"
          />
        </div>
      </div>
    </Card>
  )
}
