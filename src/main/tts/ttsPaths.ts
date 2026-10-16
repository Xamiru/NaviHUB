import { app } from 'electron'
import { join } from 'path'
import { packInstalled } from './ttsService'

// Where the voice pack lives, readable without loading the worker runtime
// (the setup checklist asks whether it is installed on every Today visit).
export const voicePackDir = (): string => join(app.getPath('userData'), 'openjtalk')
export const voicePackInstalled = (): boolean => packInstalled(voicePackDir())

// The before-quit registry stops the worker only if the runtime ever loaded.
let stopper: (() => Promise<void>) | null = null
export function registerTtsStopper(fn: () => Promise<void>): void {
  stopper = fn
}
export function stopActiveTts(): void {
  void stopper?.()
}
