import { beforeEach, describe, expect, it, vi } from 'vitest'
import { anchorPos } from '../src/shared/achievements'

const electronState = vi.hoisted(() => ({
  workArea: { x: 0, y: 0, width: 1920, height: 1040 },
  instances: [] as Array<{
    visible: boolean
    destroyed: boolean
    setPosition: ReturnType<typeof vi.fn>
    destroy: ReturnType<typeof vi.fn>
  }>
}))

vi.mock('electron', () => {
  class BrowserWindow {
    visible = false
    destroyed = false
    setPosition = vi.fn()
    destroy = vi.fn(() => {
      this.destroyed = true
    })
    webContents = { setWindowOpenHandler: vi.fn() }

    constructor() {
      electronState.instances.push(this)
    }

    isDestroyed(): boolean {
      return this.destroyed
    }
    isVisible(): boolean {
      return this.visible
    }
    showInactive(): void {
      this.visible = true
    }
    setAlwaysOnTop(): void {}
    setMenuBarVisibility(): void {}
    setIgnoreMouseEvents(): void {}
    moveTop(): void {}
    loadURL(): Promise<void> {
      return Promise.resolve()
    }
    loadFile(): Promise<void> {
      return Promise.resolve()
    }
  }

  return {
    BrowserWindow,
    Notification: class {
      static isSupported = () => false
    },
    nativeImage: { createFromPath: vi.fn() },
    screen: {
      getPrimaryDisplay: () => ({ workArea: electronState.workArea }),
      getCursorScreenPoint: () => ({ x: electronState.workArea.x + 1, y: 1 }),
      getDisplayNearestPoint: () => ({ workArea: electronState.workArea })
    }
  }
})

vi.mock('../src/main/files', () => ({ absoluteMediaPath: (path: string) => path }))
vi.mock('../src/main/logBus', () => ({ logWarn: vi.fn() }))

const popup = await import('../src/main/achPopup')

beforeEach(() => {
  popup.closeAchPopup()
  electronState.instances.length = 0
  electronState.workArea = { x: 0, y: 0, width: 1920, height: 1040 }
})

describe('achievement popup display placement', () => {
  it('re-anchors to the cursor display every time it is raised', () => {
    popup.sessionStarted()
    const win = electronState.instances[0]!
    electronState.workArea = { x: 1920, y: 0, width: 2560, height: 1400 }

    expect(popup.showUnlock()).toBe(true)
    const expected = anchorPos(electronState.workArea)
    expect(win.setPosition).toHaveBeenCalledWith(expected.x, expected.y)
  })
})
