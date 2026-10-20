import { Component, useCallback, useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'
import { createRoot } from 'react-dom/client'
import type { Application } from '@splinetool/runtime'
import { Pause, Play, RotateCw, Hand } from 'lucide-react'
import { SplineScene } from '@/components/ui/splite'
import { Spotlight } from '@/components/ui/spotlight'
import { Card } from '@/components/ui/card'
import './robot.css'

export const ROBOT_SCENE = new URL(
  document.querySelector<HTMLElement>('#spline-root')?.dataset.scene ?? 'assets/robot-scene.splinecode',
  document.baseURI,
).href

type BoundaryProps = { children: ReactNode; onFailure: () => void }
class SceneBoundary extends Component<BoundaryProps, {failed:boolean}> {
  state = {failed:false}
  static getDerivedStateFromError() { return {failed:true} }
  componentDidCatch() { this.props.onFailure() }
  render() { return this.state.failed ? null : this.props.children }
}

export function SplineRobotHero() {
  const [enabled,setEnabled] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [ready,setReady] = useState(false)
  const [failed,setFailed] = useState(false)
  const [paused,setPaused] = useState(false)
  const [touchEnabled,setTouchEnabled] = useState(false)
  const [attempt,setAttempt] = useState(0)
  const app = useRef<Application | null>(null)
  const failedValue = useRef(false)
  const stage = useRef<HTMLDivElement>(null)
  const visible = useRef(true)
  const pauseValue = useRef(paused)
  pauseValue.current = paused
  const syncPlayback = useCallback(() => {
    if (!app.current) return
    if (pauseValue.current || document.hidden || !visible.current) app.current.stop()
    else app.current.play()
  },[])
  const onLoad = useCallback((runtime: Application) => {
    if(failedValue.current){runtime.stop();return}
    app.current = runtime
    runtime.setBackgroundColor('transparent')
    runtime.setGlobalEvents(!window.matchMedia('(pointer: coarse)').matches)
    setReady(true)
    syncPlayback()
  },[syncPlayback])
  const onFailure = useCallback(() => { failedValue.current=true;app.current=null;setReady(false);setFailed(true) },[])

  useEffect(() => {
    if (!enabled || ready || failed) return
    const timer=window.setTimeout(onFailure,30000)
    return () => window.clearTimeout(timer)
  },[enabled,ready,failed,attempt,onFailure])
  useEffect(() => {
    document.addEventListener('visibilitychange',syncPlayback)
    const node=stage.current
    const observer='IntersectionObserver' in window ? new IntersectionObserver(entries => {visible.current=entries[0].isIntersecting;syncPlayback()}) : null
    if(node) observer?.observe(node)
    return () => { document.removeEventListener('visibilitychange',syncPlayback);observer?.disconnect();app.current=null }
  },[syncPlayback])
  useEffect(syncPlayback,[paused,syncPlayback])
  useEffect(() => {
    const motion=window.matchMedia('(prefers-reduced-motion: reduce)')
    const handleChange=() => { if(motion.matches){setPaused(true);setTouchEnabled(false)} }
    motion.addEventListener('change',handleChange)
    return () => motion.removeEventListener('change',handleChange)
  },[])
  function retry(){app.current=null;failedValue.current=false;setFailed(false);setReady(false);setEnabled(true);setAttempt(value=>value+1)}

  return <Card ref={stage} className="spline-hero-card sp:w-full sp:h-full sp:relative sp:overflow-hidden sp:border-0 sp:rounded-none sp:bg-transparent sp:shadow-none" data-touch-enabled={touchEnabled} aria-label="SKYNET interactive Spline robot">
    <Spotlight size={330} fill="rgba(185,200,255,0.16)" className="spline-react-spotlight" />
    <div className="spline-topline"><span>SKYNET <small>/ INTERACTIVE 3D</small></span>{ready && <button type="button" onClick={()=>setPaused(value=>!value)} aria-pressed={paused}>{paused ? <Play size={13}/> : <Pause size={13}/>} {paused?'Resume':'Pause'}</button>}</div>
    {enabled && !failed && <SceneBoundary key={attempt} onFailure={onFailure}><SplineScene scene={ROBOT_SCENE} className="spline-react-canvas sp:w-full sp:h-full" onLoad={onLoad}/></SceneBoundary>}
    {!ready && <div className="spline-status" role="status" aria-live="polite">
      {failed ? <><p>3D robot එක load කරන්න බැරි වුණා.</p><button type="button" onClick={retry}><RotateCw size={15}/> Try again</button></> : enabled ? <><span className="spline-spinner" aria-hidden="true"/><p>Loading 3D robot…</p></> : <><p>3D motion is off for your motion preference.</p><button type="button" onClick={()=>setEnabled(true)}><Play size={15}/> Load 3D robot</button></>}
    </div>}
    {ready && <div className="spline-bottomline"><span className="spline-mouse-hint">Move your mouse over the robot.</span><button className="spline-touch-toggle" type="button" aria-pressed={touchEnabled} onClick={()=>setTouchEnabled(value=>!value)}><Hand size={14}/> {touchEnabled?'Finish interaction':'Enable touch'}</button></div>}
  </Card>
}

const mount=document.querySelector('#spline-root')
if(mount) createRoot(mount).render(<SplineRobotHero />)
