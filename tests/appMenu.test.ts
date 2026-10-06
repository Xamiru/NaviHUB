import { describe, expect, it, vi } from 'vitest'

vi.mock('electron', () => ({ Menu: {}, MenuItem: class {}, shell: {} }))
vi.mock('../src/main/logFile', () => ({ logDir: () => '/logs' }))

import { releaseCloseAccelerator } from '../src/main/appMenu'

describe('releaseCloseAccelerator', () => {
  it('releases Ctrl+W from the default Window > Close item only', () => {
    const close = { role: 'close', registerAccelerator: true }
    const minimize = { role: 'minimize', registerAccelerator: true }
    const reload = { role: 'reload', registerAccelerator: true }
    const menu = {
      items: [
        { label: 'View', registerAccelerator: true, submenu: { items: [reload] } },
        { role: 'windowMenu', registerAccelerator: true, submenu: { items: [minimize, close] } }
      ]
    }
    releaseCloseAccelerator(menu as never)
    expect(close.registerAccelerator).toBe(false)
    expect(minimize.registerAccelerator).toBe(true)
    expect(reload.registerAccelerator).toBe(true)
  })
})
