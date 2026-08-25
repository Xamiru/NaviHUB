import { useSearchParams } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import Tabs from '../components/Tabs'
import { usePersistedState } from '../lib/navState'
import LookalikeDrill from '../components/japanese/LookalikeDrill'
import TransitivityDrill from '../components/japanese/TransitivityDrill'
import HomophoneDrill from '../components/japanese/HomophoneDrill'

// One page, three ways Japanese gets confusing: visual (look-alike kanji),
// grammatical (transitivity pairs) and phonetic (homophones) — the same
// discrimination skill trained from three directions.

type Tab = 'lookalike' | 'pairs' | 'homophones'
const TAB_KEYS: Tab[] = ['lookalike', 'pairs', 'homophones']

export default function JapaneseConfusablesPage() {
  const [params] = useSearchParams()
  const seeded = params.get('tab') as Tab | null
  const [tab, setTab] = usePersistedState<Tab>(
    'jpConfusablesTab',
    seeded && TAB_KEYS.includes(seeded) ? seeded : 'lookalike'
  )

  return (
    <div className="p-6 max-w-[1320px] mx-auto">
      <PageHeader
        back={{ to: '/japanese', label: 'Japanese' }}
        title="Confusables"
        subtitle="The three ways Japanese blurs together — trained apart."
      />

      <Tabs
        className="mb-5"
        value={tab}
        onChange={setTab}
        tabs={[
          { key: 'lookalike', label: 'Look-alike kanji' },
          { key: 'pairs', label: 'Verb pairs' },
          { key: 'homophones', label: 'Homophones' }
        ]}
      />

      {tab === 'lookalike' ? (
        <LookalikeDrill />
      ) : tab === 'pairs' ? (
        <TransitivityDrill />
      ) : (
        <HomophoneDrill />
      )}
    </div>
  )
}
