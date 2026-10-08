import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'austro-hungarian-compromise-of-1867',
  names: [
    { text: 'Austro-Hungarian Compromise of 1867', lang: 'en', role: 'primary' },
    {
      text: 'Compromise of 1867',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-hungary-country-study-1989',
          loc: { section: 'DUAL MONARCHY', para: '1' }
        }
      ]
    },
    {
      text: 'Ausgleich',
      lang: 'de',
      role: 'alternative',
      cites: [
        { source: 'lemo-chronik-1867', loc: { section: 'Chronik 1867', para: '25' } }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'reform',
  start: {
    alts: [
      {
        value: { d: '1867-03-15' },
        cites: [
          { source: 'lemo-chronik-1867', loc: { section: 'Chronik 1867', para: '24' } },
          { source: 'lemo-chronik-1867', loc: { section: 'Chronik 1867', para: '25' } }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:budapest',
      cites: [
        { source: 'lemo-chronik-1867', loc: { section: 'Chronik 1867', para: '25' } }
      ]
    }
  ],
  polities: [
    { ref: 'polity:austrian-empire' },
    { ref: 'polity:austria-hungary' }
  ],
  related: [
    {
      ref: 'event:austro-prussian-war',
      rel: 'caused-by',
      cites: [
        { source: 'lemo-chronik-1867', loc: { section: 'Chronik 1867', para: '25' } }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:franz-joseph-i',
      role: 'head-of-state',
      cites: [
        { source: 'lemo-chronik-1867', loc: { section: 'Chronik 1867', para: '25' } }
      ]
    },
    {
      name: 'Gyula Graf Andrássy',
      role: 'head-of-government',
      cites: [
        { source: 'lemo-chronik-1867', loc: { section: 'Chronik 1867', para: '25' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The Compromise of 1867, which created the Dual Monarchy, gave the Hungarian government more control of its domestic affairs than it had possessed at any time since the Battle of Mohacs.',
          lang: 'en',
          cite: {
            source: 'loc-hungary-country-study-1989',
            loc: { section: 'DUAL MONARCHY', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/hungary/23.htm' }
        }
      ]
    },
    {
      kind: 'causes',
      quotes: [
        {
          id: 'q12',
          text: 'The peace of Prague (Aug. 20, 1866), excluding Austria from Italy and Germany, made the fate of the Habsburg monarchy absolutely dependent upon a compromise with the Magyars.',
          lang: 'en',
          cite: { source: 'britannica-1911-hungary', loc: { section: 'HUNGARY', para: '538' } },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Hungary'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'Once again a Habsburg emperor became king of Hungary, but the compromise strictly limited his power over the country\'s internal affairs, and the Hungarian government assumed control over its domestic affairs.',
          lang: 'en',
          cite: {
            source: 'loc-hungary-country-study-1989',
            loc: { section: 'DUAL MONARCHY', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/hungary/23.htm' }
        },
        {
          id: 'q5',
          text: 'The compromise also returned Transylvania, Vojvodina, and the military frontier to Hungary\'s jurisdiction.',
          lang: 'en',
          cite: {
            source: 'loc-hungary-country-study-1989',
            loc: { section: 'DUAL MONARCHY', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/hungary/23.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'However, the new government faced severe economic problems and the growing restiveness of ethnic minorities.',
          lang: 'en',
          cite: {
            source: 'loc-hungary-country-study-1989',
            loc: { section: 'DUAL MONARCHY', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/hungary/23.htm' }
        },
        {
          id: 'q7',
          text: 'At Franz Joseph\'s insistence, Hungary and Croatia reached a similar compromise in 1868, giving the Croats a special status in Hungary.',
          lang: 'en',
          cite: {
            source: 'loc-hungary-country-study-1989',
            loc: { section: 'DUAL MONARCHY', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/hungary/23.htm' }
        },
        {
          id: 'q8',
          text: 'Many Hungarians thought the act too generous, while minority-group leaders rejected it as inadequate.',
          lang: 'en',
          cite: {
            source: 'loc-hungary-country-study-1989',
            loc: { section: 'DUAL MONARCHY', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/hungary/23.htm' }
        },
        {
          id: 'q9',
          text: 'The Polish subjects under Austrian jurisdiction (after 1867 the Habsburg Empire was commonly known as Austria-Hungary) confronted a generally more lenient regime.',
          lang: 'en',
          cite: {
            source: 'loc-poland-country-study-1992',
            loc: { section: 'PARTITIONED POLAND', para: '19' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/poland/12.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1867-06-08' },
            cites: [
              { source: 'britannica-1911-hungary', loc: { section: 'HUNGARY', para: '538' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'The coronation took place on the 8th of June, on which occasion the king solemnly declared that he wished “a veil to be drawn over the past.”',
        lang: 'en',
        cite: { source: 'britannica-1911-hungary', loc: { section: 'HUNGARY', para: '538' } },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Hungary'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/28/Bertalan_Szekely_coronation_of_Franz_Josef_I_in_matthias_church_1867_IMG_0245.JPG/1280px-Bertalan_Szekely_coronation_of_Franz_Josef_I_in_matthias_church_1867_IMG_0245.JPG',
    page: 'https://commons.wikimedia.org/wiki/File:Bertalan_Szekely_coronation_of_Franz_Josef_I_in_matthias_church_1867_IMG_0245.JPG',
    credit: { creator: 'Bjoertvedt' },
    license: { id: 'cc-by-sa', version: '4.0' }
  },
  furtherReading: [
    { source: 'berger-1967-der-osterreichisch-ungarische-ausgleich', perspective: 'european' },
    { source: 'hanak-1984-ungarn-in-der-donaumonarchie', perspective: 'european' }
  ]
})
