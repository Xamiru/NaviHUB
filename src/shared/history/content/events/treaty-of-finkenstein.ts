import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'treaty-of-finkenstein',
  names: [
    { text: 'Treaty of Finkenstein', lang: 'en', role: 'primary' },
    { text: 'عهدنامه فین‌کن‌اشتاین', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'treaty',
  start: {
    alts: [
      {
        value: { d: '1807-05-04' },
        cites: [
          {
            source: 'iranica-hellot-bellier-france-relations',
            loc: { section: 'FRANCE iii. RELATIONS WITH PERSIA 1789-1918', para: '3' }
          },
          {
            source: 'iranica-calmard-gardane-mission',
            loc: { section: 'GARDANE MISSION', para: '2' }
          },
          {
            source: 'iranica-bonakdarian-eskandari-qajar-malcolm',
            loc: { section: 'MALCOLM, SIR JOHN', para: '18' }
          },
          {
            source: 'iranica-cronin-army-qajar',
            loc: { section: 'ARMY v. Qajar Period', para: '10' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:finckenstein-palace',
      cites: [
        {
          source: 'iranica-calmard-gardane-mission',
          loc: { section: 'GARDANE MISSION', para: '2' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:reign-of-fath-ali-shah' }
  ],
  polities: [
    { ref: 'polity:first-french-empire' },
    { ref: 'polity:qajar-iran' }
  ],
  participants: [
    {
      ref: 'person:napoleon-bonaparte',
      role: 'head-of-state',
      cites: [
        {
          source: 'iranica-calmard-gardane-mission',
          loc: { section: 'GARDANE MISSION', para: '2' }
        }
      ]
    },
    {
      name: 'Mīrzā Moḥammad-Reżā Qazvīnī',
      role: 'negotiator',
      cites: [
        {
          source: 'iranica-calmard-gardane-mission',
          loc: { section: 'GARDANE MISSION', para: '2' }
        }
      ]
    },
    {
      ref: 'person:fath-ali-shah-qajar',
      role: 'head-of-state',
      cites: [
        {
          source: 'iranica-calmard-gardane-mission',
          loc: { section: 'GARDANE MISSION', para: '7' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:gardane-mission',
      rel: 'led-to',
      cites: [
        {
          source: 'iranica-cronin-army-qajar',
          loc: { section: 'ARMY v. Qajar Period', para: '10' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'In 1804, Fatḥ-ʿAlī Shah hoped Napoleon might help him recover Georgia, while the latter thought closer ties with Persia might facilitate the defeat of Russia and open the way to India.',
          lang: 'en',
          cite: {
            source: 'iranica-hellot-bellier-france-relations',
            loc: { section: 'FRANCE iii. RELATIONS WITH PERSIA 1789-1918', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/france-iii-relations-with-persia-1789-1918/'
          }
        },
        {
          id: 'q2',
          text: 'Seeking an alternative ally in the tumultuous Europe of the time, the shah responded positively in 1806 to an earlier French prelude and welcomed Napoleon’s envoy, Amédée Jaubert.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-fath-ali-shah',
            loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/fath-ali-shah'
          }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q3',
          text: 'After an exchange of letters between Napoleon and Fatḥ-ʿAlī Shah, Moḥammad-Reżā was received by Napoleon at the castle of Finkenstein, where the Franco-Persian treaty was signed (4 May 1807). Articles 2-4 of this treaty guaranteed Persia’s territorial integrity and stipulated that Georgia, being part of Persia, should be evacuated by the Russians. Articles 6 and 7 contained provisions to provide weapons and military instructors for Persian artillery and infantry. Articles 8-13 were aimed at breaking off Anglo-Persian relations and providing means for a French invasion of India with Persian and Afghan cooperation',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-gardane-mission',
            loc: { section: 'GARDANE MISSION', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/gardane-mission'
          }
        },
        {
          id: 'q4',
          text: 'The Treaty of Finkenstein (May 1807) not only stipulated that the shah “sever all diplomatic relations with England, declare war at once on the latter power, and commence hostilities without delay” (art. 8) but also give the French forces the right of passage through Persia and assist in the Indian campaign',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-fath-ali-shah',
            loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/fath-ali-shah'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q5',
          text: 'The Shah ratified the Treaty of Finkenstein (20 December).',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-gardane-mission',
            loc: { section: 'GARDANE MISSION', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/gardane-mission'
          }
        },
        {
          id: 'q6',
          text: 'Little more than two months after the conclusion of the Treaty of Finkenstein, European alignments were reversed when Napoleon and the tsar signed the Treaty of Tilsit (7 and 9 July 1807), and French influence in Iran began to wane.',
          lang: 'en',
          cite: {
            source: 'iranica-cronin-army-qajar',
            loc: { section: 'ARMY v. Qajar Period', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/army-v/'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/2/23/The_Persian_Envoy_Mirza_Mohammed_Reza_Qazvini_Finkenstein_Castle_27_Avril_1807_by_Francois_Mulard.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:The_Persian_Envoy_Mirza_Mohammed_Reza_Qazvini_Finkenstein_Castle_27_Avril_1807_by_Francois_Mulard.jpg',
    credit: { creator: 'François-Henri Mulard' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'nafisi-1965-tarikh-e-ejtemai-va-siyasi-ye-iran', perspective: 'iranian' }
  ]
})
