import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'dissolution-of-the-holy-roman-empire',
  names: [
    { text: 'Dissolution of the Holy Roman Empire', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  type: 'dissolution',
  start: {
    alts: [
      {
        value: { d: '1806' },
        cites: [
          {
            source: 'loc-austria-country-study-1994',
            loc: { section: 'The Napoleonic Wars', para: '3' }
          },
          {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The French Revolution and Germany', para: '5' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  partOf: [
    { ref: 'period:napoleonic-wars' }
  ],
  participants: [
    {
      name: 'Franz II',
      role: 'head-of-state',
      cites: [
        {
          source: 'loc-austria-country-study-1994',
          loc: { section: 'The Napoleonic Wars', para: '3' }
        }
      ]
    },
    {
      ref: 'person:napoleon-bonaparte',
      role: 'participant',
      cites: [
        {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'The French Revolution and Germany', para: '5' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Because French domination of Germany raised the possibility that Napoleon Bonaparte or one of his subordinates could be elected Holy Roman Emperor, Leopold\'s son, Franz II (r. 1792- 1835), took two steps to protect Habsburg interests. First, to guarantee his family\'s continued imperial status, he adopted a new, hereditary title, Emperor of Austria, in 1804, thus becoming Franz I of Austria. Second, to preclude completely the possibility of Napoleon\'s election, in 1806 he renounced the title of Holy Roman Emperor and dissolved the Holy Roman Empire.',
          lang: 'en',
          cite: {
            source: 'loc-austria-country-study-1994',
            loc: { section: 'The Napoleonic Wars', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/austria/19.htm' }
        },
        {
          id: 'q2',
          text: 'The empire ceased to exist in 1806 when Francis II of Austria gave up his imperial title.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The French Revolution and Germany', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/22.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q3',
          text: 'In its place, Napoleon had created the Confederation of the Rhine, made up of the states of western and southern Germany, under French direction. Austria and Prussia were not members.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The French Revolution and Germany', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/22.htm' }
        }
      ]
    }
  ]
})
