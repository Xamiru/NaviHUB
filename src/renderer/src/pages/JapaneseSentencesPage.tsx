import { useEffect } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import PageHeader from '../components/PageHeader'
import EmptyState from '../components/EmptyState'
import Tabs from '../components/Tabs'
import ParticleDrill from '../components/japanese/ParticleDrill'
import ScrambleDrill from '../components/japanese/ScrambleDrill'
import ContextReadingDrill from '../components/japanese/ContextReadingDrill'

// Sentence games: three drills generated from the installed Tatoeba bank +
// kuromoji, nothing authored — particle fill (MC), sentence scramble (chunk
// reordering, graded against the original), reading in context (typed). Gated
// on the sentence bank exactly like the feed page; the reading tab also
// needs JMdict (main verifies every target reading against it).

type Tab = 'particles' | 'scramble' | 'reading'
const TABS: { key: Tab; label: string }[] = [
  { key: 'particles', label: 'Particle fill' },
  { key: 'scramble', label: 'Scramble' },
  { key: 'reading', label: 'Reading in context' }
]

export default function JapaneseSentencesPage() {
  const [params] = useSearchParams()
  const seeded = params.get('tab') as Tab | null
  const [tab, setTab] = usePersistedState<Tab>(
    'jpSentenceGamesTab',
    seeded && TABS.some((t) => t.key === seeded) ? seeded : 'particles'
  )

  const { data: bank, isLoading } = useQuery({
    queryKey: qk.dict.sentenceBank,
    queryFn: () => api.dict.sentenceBank()
  })

  // Warm the tokenizer once (~1 s dictionary load) so Start feels instant.
  useEffect(() => {
    void api.japanese.tokenize('。').catch(() => {})
  }, [])

  if (!isLoading && !bank) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <PageHeader back={{ to: '/japanese', label: 'Japanese' }} title="Sentence games" />
        <EmptyState
          title="Sentence bank not installed"
          body="These games are built from the offline Tatoeba sentences — install them in Settings → Dictionaries."
          action={
            <Link to="/settings?tab=japanese" className="btn-primary">
              Open Settings
            </Link>
          }
        />
      </div>
    )
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <PageHeader
        back={{ to: '/japanese', label: 'Japanese' }}
        title="Sentence games"
        subtitle="Real sentences from the bank, tokenised on the fly — no authored content, so the pool never runs dry."
      />
      <Tabs tabs={TABS} value={tab} onChange={setTab} className="mb-5" />
      {tab === 'particles' && <ParticleDrill />}
      {tab === 'scramble' && <ScrambleDrill />}
      {tab === 'reading' && <ContextReadingDrill />}
    </div>
  )
}
