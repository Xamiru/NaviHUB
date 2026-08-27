import { describe, expect, it } from 'vitest'
import {
  claimMusicMaintenance,
  musicMaintenanceOwner,
  releaseMusicMaintenance
} from '../src/main/musicMaintenance'

describe('music maintenance ownership', () => {
  it('keeps a batch reserved across nested work by the same owner', () => {
    claimMusicMaintenance('spotify-batch-1')
    claimMusicMaintenance('spotify-batch-1')
    releaseMusicMaintenance('spotify-batch-1')
    expect(musicMaintenanceOwner()).toBe('spotify-batch-1')
    expect(() => claimMusicMaintenance('music scan')).toThrow(/spotify-batch-1/)
    releaseMusicMaintenance('spotify-batch-1')
    expect(musicMaintenanceOwner()).toBeNull()
  })

  it('does not let a stale owner release another batch', () => {
    claimMusicMaintenance('spotify-batch-2')
    releaseMusicMaintenance('spotify-batch-1')
    expect(musicMaintenanceOwner()).toBe('spotify-batch-2')
    releaseMusicMaintenance('spotify-batch-2')
  })
})
