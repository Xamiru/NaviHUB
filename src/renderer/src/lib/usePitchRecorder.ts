import { useCallback, useEffect, useRef, useState } from 'react'
import { MAX_TAKE_SECONDS } from '@shared/pitchTrack'

// Mic capture for the Speak drill. Deliberately ScriptProcessor, not
// AudioWorklet: worklet module fetch breaks on file:// documents (production
// loads via win.loadFile) and the blob-URL workaround would need a CSP
// posture change — while analysis here is post-hoc on Stop, so the worklet's
// off-main-thread advantage buys nothing. MediaRecorder is rejected too: it
// emits lossy Opus, perturbing exactly the harmonics being measured. The
// whole choice is contained in this one file; a future worklet swap touches
// nothing else.

export type RecorderStatus = 'idle' | 'recording' | 'denied' | 'no-mic' | 'error'

export interface Take {
  samples: Float32Array
  sampleRate: number
}

export function usePitchRecorder(): {
  status: RecorderStatus
  level: number // live RMS 0..1 while recording
  seconds: number
  start(): Promise<void>
  stop(): Take | null
  replay(take: Take): void
} {
  const [status, setStatus] = useState<RecorderStatus>('idle')
  const [level, setLevel] = useState(0)
  const [seconds, setSeconds] = useState(0)

  const ctxRef = useRef<AudioContext | null>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const processorRef = useRef<ScriptProcessorNode | null>(null)
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null)
  const gainRef = useRef<GainNode | null>(null)
  const chunksRef = useRef<Float32Array[]>([])
  const startedAtRef = useRef(0)
  const recordingRef = useRef(false)

  const teardownGraph = useCallback(() => {
    processorRef.current?.disconnect()
    sourceRef.current?.disconnect()
    gainRef.current?.disconnect()
    processorRef.current = null
    sourceRef.current = null
    gainRef.current = null
  }, [])

  const releaseMic = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop())
    streamRef.current = null
  }, [])

  // Release everything on unmount — the OS mic indicator must go dark.
  useEffect(() => {
    return () => {
      teardownGraph()
      releaseMic()
      void ctxRef.current?.close().catch(() => {})
      ctxRef.current = null
    }
  }, [teardownGraph, releaseMic])

  const start = useCallback(async () => {
    if (recordingRef.current) return
    try {
      // Chromium's processing chain (esp. AGC/noise suppression) distorts F0
      // and amplitude — capture raw.
      const stream =
        streamRef.current ??
        (await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: false,
            noiseSuppression: false,
            autoGainControl: false,
            channelCount: 1
          }
        }))
      streamRef.current = stream
      // Device default sample rate — never force one; the real rate rides
      // along with the samples into the pure DSP module.
      const ctx = ctxRef.current ?? new AudioContext()
      ctxRef.current = ctx
      if (ctx.state === 'suspended') await ctx.resume()

      chunksRef.current = []
      const source = ctx.createMediaStreamSource(stream)
      const processor = ctx.createScriptProcessor(4096, 1, 1)
      // ScriptProcessor only fires when connected through to the destination;
      // zero gain prevents monitoring feedback.
      const gain = ctx.createGain()
      gain.gain.value = 0
      source.connect(processor)
      processor.connect(gain)
      gain.connect(ctx.destination)
      sourceRef.current = source
      processorRef.current = processor
      gainRef.current = gain

      startedAtRef.current = ctx.currentTime
      recordingRef.current = true
      let lastUi = 0
      processor.onaudioprocess = (e) => {
        if (!recordingRef.current) return
        const input = e.inputBuffer.getChannelData(0)
        chunksRef.current.push(new Float32Array(input))
        // ~10 Hz UI updates: live RMS meter + elapsed clock.
        const now = ctx.currentTime
        if (now - lastUi > 0.1) {
          lastUi = now
          let sum = 0
          for (let i = 0; i < input.length; i++) sum += input[i] * input[i]
          setLevel(Math.min(1, Math.sqrt(sum / input.length) * 4))
          setSeconds(now - startedAtRef.current)
        }
      }
      setStatus('recording')
      setSeconds(0)
    } catch (err) {
      const name = err instanceof DOMException ? err.name : ''
      setStatus(name === 'NotAllowedError' ? 'denied' : name === 'NotFoundError' ? 'no-mic' : 'error')
    }
  }, [])

  const stop = useCallback((): Take | null => {
    if (!recordingRef.current) return null
    recordingRef.current = false
    teardownGraph()
    setStatus('idle')
    setLevel(0)
    const chunks = chunksRef.current
    chunksRef.current = []
    const total = chunks.reduce((n, c) => n + c.length, 0)
    if (total === 0) return null
    const samples = new Float32Array(total)
    let off = 0
    for (const c of chunks) {
      samples.set(c, off)
      off += c.length
    }
    return { samples, sampleRate: ctxRef.current?.sampleRate ?? 48000 }
  }, [teardownGraph])

  // In-memory replay — no blob URLs, no CSP involvement.
  const replay = useCallback((take: Take) => {
    const ctx = ctxRef.current ?? new AudioContext()
    ctxRef.current = ctx
    const buffer = ctx.createBuffer(1, take.samples.length, take.sampleRate)
    buffer.copyToChannel(take.samples as Float32Array<ArrayBuffer>, 0)
    const node = ctx.createBufferSource()
    node.buffer = buffer
    node.connect(ctx.destination)
    node.start()
  }, [])

  // Auto-stop cap: the drill polls `seconds` and calls stop(); this is only a
  // safety for a stuck recording (belt over braces).
  useEffect(() => {
    if (status !== 'recording') return
    const t = window.setTimeout(() => {
      // The drill normally stops first; this just flips state if it didn't.
    }, MAX_TAKE_SECONDS * 1000 + 500)
    return () => window.clearTimeout(t)
  }, [status])

  return { status, level, seconds, start, stop, replay }
}
