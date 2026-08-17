import type { EnMatchSet } from './types'

// Collocation / phrasal-verb match sets: six pairs each. Every left must pair
// with exactly ONE right in its own set — authors check the cross-combinations
// (never put make/do together with a decision/business). Keys FROZEN. Gate:
// tests/englishGames.test.ts.
export const EN_MATCH_SETS: EnMatchSet[] = [
  {
    key: 'match-01',
    theme: 'verb-noun',
    title: 'Verb + noun: at work',
    pairs: [
      { left: 'meet', right: 'a deadline' },
      { left: 'raise', right: 'an objection' },
      { left: 'draw', right: 'a conclusion' },
      { left: 'shoulder', right: 'the blame' },
      { left: 'strike', right: 'a balance' },
      { left: 'bear', right: 'a grudge' }
    ]
  },
  {
    key: 'match-02',
    theme: 'verb-noun',
    title: 'Verb + noun: doing research',
    pairs: [
      { left: 'formulate', right: 'a hypothesis' },
      { left: 'administer', right: 'a questionnaire' },
      { left: 'recruit', right: 'participants' },
      { left: 'obtain', right: 'ethical approval' },
      { left: 'publish', right: 'the findings' },
      { left: 'replicate', right: 'an earlier study' }
    ]
  },
  {
    key: 'match-03',
    theme: 'verb-noun',
    title: 'Verb + noun: money and business',
    pairs: [
      { left: 'launch', right: 'a takeover bid' },
      { left: 'waive', right: 'the joining fee' },
      { left: 'issue', right: 'a full refund' },
      { left: 'freeze', right: 'staff wages' },
      { left: 'diversify', right: 'an investment portfolio' },
      { left: 'underwrite', right: 'the loan' }
    ]
  },
  {
    key: 'match-04',
    theme: 'verb-noun',
    title: 'Verb + noun: meetings and decisions',
    pairs: [
      { left: 'chair', right: 'the panel' },
      { left: 'table', right: 'a motion' },
      { left: 'circulate', right: 'the minutes' },
      { left: 'reach', right: 'a compromise' },
      { left: 'postpone', right: 'the vote' },
      { left: 'declare', right: 'an interest' }
    ]
  },
  {
    key: 'match-05',
    theme: 'verb-noun',
    title: 'Verb + noun: law and the courts',
    pairs: [
      { left: 'breach', right: 'a confidentiality agreement' },
      { left: 'file', right: 'a lawsuit' },
      { left: 'overturn', right: 'a conviction' },
      { left: 'draft', right: 'the legislation' },
      { left: 'serve', right: 'an eviction notice' },
      { left: 'grant', right: 'an injunction' }
    ]
  },
  {
    key: 'match-06',
    theme: 'verb-noun',
    title: 'Verb + noun: media and reputation',
    pairs: [
      { left: 'wreak', right: 'havoc' },
      { left: 'retract', right: 'a statement' },
      { left: 'break', right: 'an exclusive story' },
      { left: 'tarnish', right: 'a reputation' },
      { left: 'field', right: 'awkward questions' },
      { left: 'weather', right: 'the storm' }
    ]
  },
  {
    key: 'match-07',
    theme: 'verb-noun',
    title: 'Verb + noun: study and university',
    pairs: [
      { left: 'sit', right: 'an examination' },
      { left: 'submit', right: 'a dissertation' },
      { left: 'master', right: 'a second language' },
      { left: 'defer', right: 'a place' },
      { left: 'meet', right: 'the entry requirements' },
      { left: 'award', right: 'a scholarship' }
    ]
  },
  {
    key: 'match-08',
    theme: 'verb-noun',
    title: 'Verb + noun: risk and crisis',
    pairs: [
      { left: 'pose', right: 'a threat' },
      { left: 'avert', right: 'a disaster' },
      { left: 'mitigate', right: 'the damage' },
      { left: 'trigger', right: 'an investigation' },
      { left: 'contain', right: 'an outbreak' },
      { left: 'raise', right: 'the alarm' }
    ]
  },
  {
    key: 'match-09',
    theme: 'adjective-noun',
    title: 'Adjective + noun: argument and evidence',
    pairs: [
      { left: 'compelling', right: 'evidence' },
      { left: 'vested', right: 'interest' },
      { left: 'sweeping', right: 'generalisation' },
      { left: 'tenuous', right: 'link' },
      { left: 'glaring', right: 'omission' },
      { left: 'watertight', right: 'alibi' }
    ]
  },
  {
    key: 'match-10',
    theme: 'adjective-noun',
    title: 'Adjective + noun: work and career',
    pairs: [
      { left: 'steep', right: 'learning curve' },
      { left: 'gruelling', right: 'schedule' },
      { left: 'lucrative', right: 'contract' },
      { left: 'menial', right: 'tasks' },
      { left: 'transferable', right: 'skills' },
      { left: 'glowing', right: 'reference' }
    ]
  },
  {
    key: 'match-11',
    theme: 'adjective-noun',
    title: 'Adjective + noun: money and the economy',
    pairs: [
      { left: 'soaring', right: 'inflation' },
      { left: 'crippling', right: 'debt' },
      { left: 'disposable', right: 'income' },
      { left: 'modest', right: 'pay rise' },
      { left: 'sluggish', right: 'growth' },
      { left: 'untapped', right: 'market' }
    ]
  },
  {
    key: 'match-12',
    theme: 'adjective-noun',
    title: 'Adjective + noun: health and wellbeing',
    pairs: [
      { left: 'chronic', right: 'pain' },
      { left: 'underlying', right: 'condition' },
      { left: 'balanced', right: 'diet' },
      { left: 'sedentary', right: 'lifestyle' },
      { left: 'restless', right: 'night' },
      { left: 'brisk', right: 'walk' }
    ]
  },
  {
    key: 'match-13',
    theme: 'adjective-noun',
    title: 'Adjective + noun: weather and environment',
    pairs: [
      { left: 'torrential', right: 'rain' },
      { left: 'prevailing', right: 'wind' },
      { left: 'dwindling', right: 'resources' },
      { left: 'pristine', right: 'wilderness' },
      { left: 'renewable', right: 'energy' },
      { left: 'adverse', right: 'weather conditions' }
    ]
  },
  {
    key: 'match-14',
    theme: 'adjective-noun',
    title: 'Adjective + noun: character and behaviour',
    pairs: [
      { left: 'ulterior', right: 'motive' },
      { left: 'unwavering', right: 'loyalty' },
      { left: 'blatant', right: 'disregard' },
      { left: 'outspoken', right: 'critic' },
      { left: 'bitter', right: 'rivalry' },
      { left: 'impeccable', right: 'manners' }
    ]
  },
  {
    key: 'match-15',
    theme: 'adjective-noun',
    title: 'Adjective + noun: cities and housing',
    pairs: [
      { left: 'affordable', right: 'housing' },
      { left: 'congested', right: 'roads' },
      { left: 'disused', right: 'railway line' },
      { left: 'sprawling', right: 'suburbs' },
      { left: 'listed', right: 'building' },
      { left: 'extortionate', right: 'rents' }
    ]
  },
  {
    key: 'match-16',
    theme: 'adjective-noun',
    title: 'Adjective + noun: technology and media',
    pairs: [
      { left: 'cutting-edge', right: 'technology' },
      { left: 'viral', right: 'video' },
      { left: 'seamless', right: 'integration' },
      { left: 'rampant', right: 'piracy' },
      { left: 'intuitive', right: 'interface' },
      { left: 'targeted', right: 'advertising' }
    ]
  },
  {
    key: 'match-17',
    theme: 'adjective-noun',
    title: 'Adjective + noun: feelings and reactions',
    pairs: [
      { left: 'profound', right: 'disappointment' },
      { left: 'mounting', right: 'pressure' },
      { left: 'palpable', right: 'tension' },
      { left: 'lingering', right: 'doubt' },
      { left: 'overwhelming', right: 'relief' },
      { left: 'simmering', right: 'resentment' }
    ]
  },
  {
    key: 'match-18',
    theme: 'phrasal-verb',
    title: 'Phrasal verbs: work and projects',
    pairs: [
      { left: 'carry out', right: 'to perform or conduct' },
      { left: 'put off', right: 'to postpone to a later date' },
      { left: 'take on', right: 'to accept extra work or staff' },
      { left: 'draw up', right: 'to prepare a formal document' },
      { left: 'follow up', right: 'to check on progress afterwards' },
      { left: 'fall through', right: 'to fail to happen as planned' }
    ]
  },
  {
    key: 'match-19',
    theme: 'phrasal-verb',
    title: 'Phrasal verbs: money',
    pairs: [
      { left: 'put aside', right: 'to save for future use' },
      { left: 'run up', right: 'to accumulate a large bill' },
      { left: 'pay off', right: 'to clear a debt entirely' },
      { left: 'cut back on', right: 'to reduce spending' },
      { left: 'do without', right: 'to manage in the absence of something' },
      { left: 'come into', right: 'to inherit unexpectedly' }
    ]
  },
  {
    key: 'match-20',
    theme: 'phrasal-verb',
    title: 'Phrasal verbs: discussion and disputes',
    pairs: [
      { left: 'back down', right: 'to withdraw from a position' },
      { left: 'talk over', right: 'to discuss thoroughly' },
      { left: 'fall out', right: 'to quarrel and stop speaking' },
      { left: 'bring up', right: 'to raise a topic' },
      { left: 'gloss over', right: 'to treat lightly to avoid difficulty' },
      { left: 'shout down', right: 'to silence by shouting' }
    ]
  },
  {
    key: 'match-21',
    theme: 'phrasal-verb',
    title: 'Phrasal verbs: study and understanding',
    pairs: [
      { left: 'brush up on', right: 'to revise a rusty skill' },
      { left: 'work out', right: 'to solve or calculate' },
      { left: 'go over', right: 'to review in detail' },
      { left: 'catch on', right: 'to begin to understand' },
      { left: 'get through', right: 'to complete a demanding amount of work' },
      { left: 'drop out of', right: 'to leave a course before finishing' }
    ]
  },
  {
    key: 'match-22',
    theme: 'phrasal-verb',
    title: 'Phrasal verbs: institutions and rules',
    pairs: [
      { left: 'crack down on', right: 'to enforce rules severely' },
      { left: 'phase out', right: 'to withdraw gradually' },
      { left: 'roll out', right: 'to introduce across an organisation' },
      { left: 'opt out of', right: 'to choose not to take part' },
      { left: 'do away with', right: 'to abolish' },
      { left: 'step down', right: 'to resign from a post' }
    ]
  },
  {
    key: 'match-23',
    theme: 'phrasal-verb',
    title: 'Phrasal verb + object: everyday choices',
    pairs: [
      { left: 'take up', right: 'yoga' },
      { left: 'put up with', right: 'a difficult colleague' },
      { left: 'pick up', right: 'a foreign language' },
      { left: 'turn down', right: 'a job offer' },
      { left: 'look into', right: 'the complaint' },
      { left: 'call off', right: 'the search' }
    ]
  },
  {
    key: 'match-24',
    theme: 'phrasal-verb',
    title: 'Phrasal verbs: travel and hospitality',
    pairs: [
      { left: 'check in', right: 'to register on arrival' },
      { left: 'set off', right: 'to begin a journey' },
      { left: 'see off', right: 'to accompany a departing traveller' },
      { left: 'put up', right: 'to give a guest a bed for the night' },
      { left: 'drop off', right: 'to leave a passenger at a destination' },
      { left: 'get around', right: 'to travel from place to place' }
    ]
  },
  {
    key: 'match-25',
    theme: 'phrasal-verb',
    title: 'Phrasal verbs: problems and outcomes',
    pairs: [
      { left: 'iron out', right: 'to resolve minor difficulties' },
      { left: 'come up against', right: 'to encounter an obstacle' },
      { left: 'pull off', right: 'to achieve something difficult' },
      { left: 'back up', right: 'to support with evidence' },
      { left: 'rule out', right: 'to exclude as a possibility' },
      { left: 'own up to', right: 'to admit responsibility' }
    ]
  },
  {
    key: 'match-26',
    theme: 'preposition',
    title: 'Adjective + preposition: attitudes and expertise',
    pairs: [
      { left: 'averse', right: 'to' },
      { left: 'devoid', right: 'of' },
      { left: 'adept', right: 'at' },
      { left: 'notorious', right: 'for' },
      { left: 'consistent', right: 'with' },
      { left: 'immersed', right: 'in' }
    ]
  },
  {
    key: 'match-27',
    theme: 'preposition',
    title: 'Verb + preposition: research and argument',
    pairs: [
      { left: 'account', right: 'for' },
      { left: 'object', right: 'to' },
      { left: 'insist', right: 'on' },
      { left: 'coincide', right: 'with' },
      { left: 'derive', right: 'from' },
      { left: 'specialise', right: 'in' }
    ]
  },
  {
    key: 'match-28',
    theme: 'preposition',
    title: 'Noun + preposition: formal writing',
    pairs: [
      { left: 'an increase', right: 'in' },
      { left: 'a solution', right: 'to' },
      { left: 'the reason', right: 'for' },
      { left: 'a lack', right: 'of' },
      { left: 'an obsession', right: 'with' },
      { left: 'an insight', right: 'into' }
    ]
  },
  {
    key: 'match-29',
    theme: 'preposition',
    title: 'Adjective + preposition: people and feelings',
    pairs: [
      { left: 'susceptible', right: 'to' },
      { left: 'wary', right: 'of' },
      { left: 'adamant', right: 'about' },
      { left: 'proficient', right: 'in' },
      { left: 'eligible', right: 'for' },
      { left: 'popular', right: 'with' }
    ]
  },
  {
    key: 'match-30',
    theme: 'preposition',
    title: 'Verb + preposition: work and protest',
    pairs: [
      { left: 'resign', right: 'from' },
      { left: 'protest', right: 'against' },
      { left: 'resort', right: 'to' },
      { left: 'vouch', right: 'for' },
      { left: 'delve', right: 'into' },
      { left: 'capitalise', right: 'on' }
    ]
  },
  {
    key: 'match-31',
    theme: 'preposition',
    title: 'Noun + preposition: business and law',
    pairs: [
      { left: 'a demand', right: 'for' },
      { left: 'a ban', right: 'on' },
      { left: 'an exception', right: 'to' },
      { left: 'jurisdiction', right: 'over' },
      { left: 'compliance', right: 'with' },
      { left: 'a decline', right: 'in' }
    ]
  },
  {
    key: 'match-32',
    theme: 'preposition',
    title: 'Adjective + preposition: describing evidence',
    pairs: [
      { left: 'inconsistent', right: 'with' },
      { left: 'indicative', right: 'of' },
      { left: 'based', right: 'on' },
      { left: 'subject', right: 'to' },
      { left: 'deficient', right: 'in' },
      { left: 'renowned', right: 'for' }
    ]
  },
  {
    key: 'match-33',
    theme: 'preposition',
    title: 'Verb + preposition: change and reaction',
    pairs: [
      { left: 'adapt', right: 'to' },
      { left: 'benefit', right: 'from' },
      { left: 'interfere', right: 'with' },
      { left: 'rely', right: 'on' },
      { left: 'result', right: 'in' },
      { left: 'apologise', right: 'for' }
    ]
  }
]
