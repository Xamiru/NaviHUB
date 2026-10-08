import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'french-coup-of-1851',
  names: [
    { text: 'French coup of 2 December 1851', lang: 'en', role: 'primary' },
    { text: 'Coup d\'État du 2 décembre 1851', lang: 'fr', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'coup',
  start: {
    alts: [
      {
        value: { d: '1851-12-01', notAfter: '1851-12-02' },
        cites: [
          {
            source: 'elysee-louis-napoleon-bonaparte',
            loc: { section: 'Louis-Napoléon Bonaparte' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1852-01' },
        cites: [
          {
            source: 'elysee-louis-napoleon-bonaparte',
            loc: { section: 'Louis-Napoléon Bonaparte' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  places: [
    { ref: 'place:paris' }
  ],
  polities: [
    { ref: 'polity:french-second-republic' }
  ],
  participants: [
    {
      ref: 'person:napoleon-iii',
      role: 'leader',
      cites: [
        {
          source: 'elysee-louis-napoleon-bonaparte',
          loc: { section: 'Louis-Napoléon Bonaparte' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'polity:second-french-empire',
      rel: 'led-to',
      cites: [
        {
          source: 'elysee-louis-napoleon-bonaparte',
          loc: { section: 'Louis-Napoléon Bonaparte' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q8',
          text: 'When the Assembly, by the law of the 31st of May 1850, restricted universal suffrage and reduced the number of the electors from 9 to 6 millions, he was able to throw upon it the whole responsibility for this coup d’état bourgeois.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-napoleon-iii',
            loc: { section: 'NAPOLEON III.', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Napoleon_III.'
          }
        },
        {
          id: 'q9',
          text: 'The pretender would have preferred, however, that it should be brought about legally, the first step being his re-election in 1852. The Constitution forbade his re-election; therefore the Constitution must be revised. On the 19th of July the Assembly threw out the proposal for revision, thus signing its own death-warrant, and the coup d’état was resolved upon.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-napoleon-iii',
            loc: { section: 'NAPOLEON III.', para: '17' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Napoleon_III.'
          }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q6',
          text: 'Louis Napoleon saw his opportunity. On the night between the 1st and 2nd of December 1851, the anniversary of Austerlitz, he dissolved the Chamber, re-established universal suffrage, had all the party leaders arrested, and summoned a new assembly to prolong his term of office for ten years.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-france-history',
            loc: { section: 'FRANCE: History', para: '506' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/France/History'
          }
        },
        {
          id: 'q7',
          text: 'The resistance organized by the republicans within Paris under Victor Hugo was soon subdued by the intoxicated soldiers. The more serious resistance in the departments was crushed by declaring a state of siege and by the “mixed commissions.” The plebiscite of the 20th of December ratified by a huge majority the coup d’état in favour of the prince-president, who alone reaped the benefit of the excesses of the Republicans and the reactionary passions of the monarchists.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-france-history',
            loc: { section: 'FRANCE: History', para: '506' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/France/History'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q10',
          text: 'Napoleon asked the people for the powers necessary to draw up a constitution on these principles; the plebiscite issued in a vast majority of votes in his favour, and the constitution of the 14th of January 1852 was the result. […] The executive power was conferred on Louis Napoleon for ten years, with the title of president of the Republic and very extended powers.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-france-history',
            loc: { section: 'FRANCE: History', para: '750' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/France/History'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Impression_des_proclamations_du_coup_d%27%C3%89tat_du_2_d%C3%A9cembre_1851.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Impression_des_proclamations_du_coup_d%27%C3%89tat_du_2_d%C3%A9cembre_1851.jpg',
    credit: { institution: 'Bibliothèque nationale de France (Gallica)', creator: 'Burgun' },
    license: { id: 'public-domain' }
  },
  archive: [
    {
      id: 'tenot-1870',
      mediaKind: 'document',
      title: 'Paris in December, 1851; or, The coup d\'tat of Napoleon III',
      date: { d: '1870' },
      url: 'https://archive.org/download/parisindecember00tenoiala/parisindecember00tenoiala.pdf',
      page: 'https://archive.org/details/parisindecember00tenoiala',
      credit: {
        institution: 'University of California Libraries (Internet Archive)',
        creator: 'Eugène Ténot'
      },
      license: { id: 'public-domain' },
      bytes: 16130366
    }
  ],
  furtherReading: [
    { source: 'agulhon-1973-1848-ou-lapprentissage-de-la-republique', perspective: 'european' },
    { source: 'girard-1986-napoleon-iii', perspective: 'european' }
  ]
})
