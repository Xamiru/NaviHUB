import PageHeader from '../components/PageHeader'
import ScanPanel from '../components/emulation/ScanPanel'
import { PortsPanel, StatsPanel } from '../components/emulation/ToolsPanels'
import { InstalledMods } from '../components/ModsSection'

// Emulation work that belongs to no single console: scanning every folder,
// playtime across consoles and emulators, mods left by removed games, and
// native PC ports of library games.
export default function EmulatorToolsPage() {
  return (
    <div className="mx-auto max-w-[1200px] p-4 sm:p-6">
      <PageHeader
        title="Emulator tools"
        back={{ to: '/games/emulators', label: 'Emulators' }}
        subtitle="Scan every folder for game files, see playtime across consoles, and tidy up mods."
      />
      <ScanPanel />
      <StatsPanel />
      <InstalledMods mediaId={null} title="Mods from removed games" />
      <PortsPanel />
    </div>
  )
}
