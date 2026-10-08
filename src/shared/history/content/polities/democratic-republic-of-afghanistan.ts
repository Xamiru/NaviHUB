import { definePolity } from '../../schema'

export default definePolity({
  id: 'democratic-republic-of-afghanistan',
  names: [
    { text: 'Democratic Republic of Afghanistan', lang: 'en', role: 'primary' },
    {
      text: 'جمهوری دموکراتیک افغانستان',
      lang: 'fa',
      role: 'native',
      translit: 'Jomhūrī-ye Demokrātīk-e Afḡānestān'
    },
    {
      text: 'DRA',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'USURPATION, INVASION AND WAR: 1978-92', para: '2' }
        }
      ]
    }
  ],
  researched: '2026-10-09',
  polityType: 'republic',
  start: {
    alts: [
      {
        value: { d: '1978-04-27' },
        cites: [
          {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'Women', para: '26' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1992' },
        cites: [
          {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'Ethnic groups', para: '10' }
          },
          {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'USURPATION, INVASION AND WAR: 1978-92', para: '-1' }
          }
        ]
      }
    ]
  },
  regions: ['south-asia', 'russia-central-asia'],
  prominence: 2,
  capitals: [
    {
      ref: 'place:kabul',
      start: {
        alts: [
          {
            value: { d: '1978-04-27' },
            cites: [
              {
                source: 'loc-afghanistan-country-study-2001',
                loc: { section: 'Women', para: '26' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'cshapes-2-dataset',
          loc: { section: 'Afghanistan (code 700), capital Kabul' }
        }
      ]
    }
  ],
  predecessors: [
    {
      ref: 'polity:kingdom-of-afghanistan',
      cites: [
        {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'USURPATION, INVASION AND WAR: 1978-92', para: '2' }
        }
      ]
    }
  ],
  cshapes: [
    { set: 'world', code: 700, from: 1978.32, to: 1992.32 }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2d/Flag_of_Afghanistan_%281980%E2%80%931987%29.svg/1280px-Flag_of_Afghanistan_%281980%E2%80%931987%29.svg.png',
    page: 'https://commons.wikimedia.org/wiki/File:Flag_of_Afghanistan_(1980–1987).svg',
    credit: { institution: 'World Digital Library' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'With Muhammad Daud\'s death, the government of Afghanistan was run by a divided, dilettante Marxist clique that launched a train of events eventually leading to the disintegration of the state. They named their regime the Democratic Republic of Afghanistan (DRA).',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'USURPATION, INVASION AND WAR: 1978-92', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/afghanistan/89.htm' }
        },
        {
          id: 'q2',
          text: 'Political leadership of the Democratic Republic of Afghanistan was asserted within three days of the military takeover. After thirteen years of conspiratorial activity, the two factions of the PDPA emerged in public, refusing at first, to admit their Marxist credentials. Khalq\'s dominance was quickly apparent.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'USURPATION, INVASION AND WAR: 1978-92', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/afghanistan/89.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'The "Saur Revolution," as the new government grandiloquently labeled its coup d\'etat (after the month in the Islamic calendar in which it occurred), was almost entirely the achievement of the Khalq faction of the PDPA.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'USURPATION, INVASION AND WAR: 1978-92', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/afghanistan/89.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'Taraki became president, prime minister and General Secretary of the PDPA. Parcham\'s leader, Babrak Karmal, and Amin were named deputy prime ministers. Cabinet membership was split eleven to ten , with Khalq in the majority.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'USURPATION, INVASION AND WAR: 1978-92', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/afghanistan/89.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'The Khalq leadership proved incapable of filling this vacuum. Its brutal and clumsy attempts to introduce radical changes in control over agricultural land holding and credit, rural social relations, marriage and family arrangements, and education led to scattered protests and uprisings among all major communities in the Afghan countryside. Taraki and Amin left a legacy of turmoil and resentment which gravely compromised later Marxist attempts to win popular acceptance.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'USURPATION, INVASION AND WAR: 1978-92', para: '9' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/afghanistan/89.htm' }
        }
      ]
    }
  ]
})
