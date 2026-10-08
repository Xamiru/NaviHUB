import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'egyptian-ottoman-war-british-opposition',
  about: ['event:egyptian-ottoman-war-1831-1833'],
  topic: 'foreign-role',
  researched: '2026-10-08',
  positions: [
    {
      id: 'economic-and-strategic-threat',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Marsot', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'The historian Marsot has argued that Britain became determined to check Muhammad Ali because a strong Egypt represented a threat to Britain\'s economic and strategic interests.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'Muhammad Ali, 1805-48', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/egypt/21.htm' }
        },
        {
          id: 'q2',
          text: 'Strategically, Britain wanted to maintain access to the overland route through Egypt to India, a vital link in the line of imperial communications.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'Muhammad Ali, 1805-48', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/egypt/21.htm' }
        }
      ]
    },
    {
      id: 'ottoman-integrity',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'It was at this time that Lord Palmerston, the British minister of foreign affairs, established the British policy, which lasted until the outbreak of World War I, of preserving the integrity of the Ottoman Empire.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'Muhammad Ali, 1805-48', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/egypt/21.htm' }
        },
        {
          id: 'q4',
          text: 'Britain preferred a weakened but intact Ottoman Empire that would grant it the strategic and commercial advantages it needed to maintain its influence in the region.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'Muhammad Ali, 1805-48', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/egypt/21.htm' }
        }
      ]
    }
  ]
})
