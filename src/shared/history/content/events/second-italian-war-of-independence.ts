import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'second-italian-war-of-independence',
  names: [
    { text: 'Second Italian War of Independence', lang: 'en', role: 'primary' },
    { text: 'Seconda guerra d\'indipendenza italiana', lang: 'it', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1859' },
        cites: [
          {
            source: 'loc-austria-country-study-1994',
            loc: { section: 'The Failure of Neoabsolutism', para: '3' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1859-07' },
        cites: [
          {
            source: 'loc-austria-country-study-1994',
            loc: { section: 'The Failure of Neoabsolutism', para: '3' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:magenta',
      cites: [
        {
          source: 'britannica-1911-napoleon-iii',
          loc: { section: 'NAPOLEON III.', para: '23' }
        }
      ]
    },
    {
      ref: 'place:solferino',
      cites: [
        {
          source: 'loc-hungary-country-study-1989',
          loc: { section: 'Aftermath of the Revolution', para: '3' }
        }
      ]
    }
  ],
  polities: [
    { ref: 'polity:second-french-empire' }
  ],
  sides: [
    {
      key: 'italians',
      name: 'the Italians',
      cites: [
        {
          source: 'loc-austria-country-study-1994',
          loc: { section: 'The Failure of Neoabsolutism', para: '3' }
        }
      ]
    },
    {
      key: 'austria',
      name: 'Austria',
      polity: 'polity:austrian-empire',
      cites: [
        {
          source: 'loc-austria-country-study-1994',
          loc: { section: 'The Failure of Neoabsolutism', para: '3' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:napoleon-iii',
      role: 'head-of-state',
      side: 'italians',
      cites: [
        {
          source: 'fordham-documents-of-italian-unification',
          loc: { section: 'Documents of Italian Unification, 1846-61', para: '7' }
        }
      ]
    },
    {
      name: 'Count Cavour',
      role: 'leader',
      side: 'italians',
      cites: [
        {
          source: 'fordham-documents-of-italian-unification',
          loc: { section: 'Documents of Italian Unification, 1846-61', para: '6' }
        }
      ]
    },
    {
      ref: 'person:franz-joseph-i',
      role: 'head-of-state',
      side: 'austria',
      cites: [
        {
          source: 'loc-austria-country-study-1994',
          loc: { section: 'The Failure of Neoabsolutism', para: '3' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:crimean-war', rel: 'related' }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'The empire\'s peoples could not be isolated from the larger nationalist struggles of the German, Italian, and Slavic peoples.',
          lang: 'en',
          cite: {
            source: 'loc-austria-country-study-1994',
            loc: { section: 'The Failure of Neoabsolutism', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/austria/24.htm' }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q5',
          text: 'The first crack in Franz Joseph\'s neo-absolutist rule developed in 1859, when the forces of Sardinia and France defeated Austria at Solferno.',
          lang: 'en',
          cite: {
            source: 'loc-hungary-country-study-1989',
            loc: { section: 'Aftermath of the Revolution', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/hungary/22.htm' }
        },
        {
          id: 'q2',
          text: 'Because Franz Joseph was unwilling to make the concessions that were Prussia\'s price for assistance from the German Confederation and because he feared the French might stir up trouble in Hungary, Franz Joseph surrendered Lombardy in July 1859.',
          lang: 'en',
          cite: {
            source: 'loc-austria-country-study-1994',
            loc: { section: 'The Failure of Neoabsolutism', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/austria/24.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'His consent to the annexation of the Central Italian states, in exchange for Savoy and Nice (Treaty of Turin, March 24, 1860) exposed him to violent attacks on the part of the ultramontanes, whose slave he had practically been since 1848.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-napoleon-iii',
            loc: { section: 'NAPOLEON III.', para: '23' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Napoleon_III.'
          }
        },
        {
          id: 'q4',
          text: 'These failures did not bode well for the anticipated conflict with Prussia over German unification, so the emperor began to abandon absolutism and create a more viable political base.',
          lang: 'en',
          cite: {
            source: 'loc-austria-country-study-1994',
            loc: { section: 'The Failure of Neoabsolutism', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/austria/24.htm' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8a/Bossoli%2C_Carlo_-_Battle_of_Solferino.jpg/1280px-Bossoli%2C_Carlo_-_Battle_of_Solferino.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Bossoli,_Carlo_-_Battle_of_Solferino.jpg',
    credit: { creator: 'Carlo Bossoli' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'romeo-1969-cavour-e-il-suo-tempo', perspective: 'european' }
  ]
})
