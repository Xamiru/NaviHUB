import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'babi-attempt-on-naser-al-din-shah',
  names: [
    { text: 'Babi attempt on the life of Naser al-Din Shah', lang: 'en', role: 'primary' },
    { text: 'سوءقصد بابیان به ناصرالدین شاه', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'assassination',
  start: {
    alts: [
      {
        value: { d: '1852-08-15' },
        cites: [
          {
            source: 'iranica-maceoin-babism-ii',
            loc: { section: 'BABISM ii. Babi executions and uprisings', para: '4' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 2,
  places: [
    { ref: 'place:tehran' }
  ],
  partOf: [
    { ref: 'period:babi-movement' },
    { ref: 'period:reign-of-naser-al-din-shah-qajar' },
    { ref: 'period:qajar-dynasty' }
  ],
  polities: [
    { ref: 'polity:qajar-iran' }
  ],
  participants: [
    {
      ref: 'person:naser-al-din-shah-qajar',
      role: 'victim',
      cites: [
        {
          source: 'iranica-maceoin-babism-ii',
          loc: { section: 'BABISM ii. Babi executions and uprisings', para: '4' }
        }
      ]
    },
    {
      name: 'Shaikh Mollā ʿAlī Toršīzī',
      role: 'organizer',
      cites: [
        {
          source: 'iranica-maceoin-babism-ii',
          loc: { section: 'BABISM ii. Babi executions and uprisings', para: '4' }
        }
      ]
    },
    {
      ref: 'person:bahaullah',
      role: 'participant',
      cites: [
        {
          source: 'iranica-maceoin-babism-ii',
          loc: { section: 'BABISM ii. Babi executions and uprisings', para: '4' }
        }
      ]
    },
    {
      ref: 'person:mirza-aqa-khan-nuri',
      role: 'head-of-government',
      cites: [
        {
          source: 'iranica-maceoin-babism-ii',
          loc: { section: 'BABISM ii. Babi executions and uprisings', para: '4' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'executed',
      value: {
        alts: [
          {
            value: { min: 50, qualifier: 'about' },
            cites: [
              {
                source: 'iranica-maceoin-babism-ii',
                loc: { section: 'BABISM ii. Babi executions and uprisings', para: '4' }
              }
            ]
          }
        ]
      }
    }
  ],
  related: [
    { ref: 'event:execution-of-the-bab', rel: 'related' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'In a final act of desperation, on 15 August 1852, a small group of Babis attempted to assassinate Nāṣer-al-Dīn Shah.',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-babism-ii',
            loc: { section: 'BABISM ii. Babi executions and uprisings', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/babism-index/babism-ii-babi-executions-and-uprisings'
          }
        },
        {
          id: 'q2',
          text: 'A plot led by Shaikh Mollā ʿAlī Toršīzī was uncovered, large numbers of Babis in the capital and elsewhere arrested, and some fifty put to death.',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-babism-ii',
            loc: { section: 'BABISM ii. Babi executions and uprisings', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/babism-index/babism-ii-babi-executions-and-uprisings'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q5',
          text: 'Coupled with the debacles of Māzandarān, Neyrīz, and Zanjān, in the course of which some 2,000 to 3,000 Babis, including most of the provincial leadership, perished (on these figures see MacEoin, “From Babism to Baha’ism,” p. 236), the Bāb’s death spelt the end of the movement as a vital political force in Iran.',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-babism-ii',
            loc: { section: 'BABISM ii. Babi executions and uprisings', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/babism-index/babism-ii-babi-executions-and-uprisings'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q6',
          text: 'Among those arrested was Mīrzā Ḥosayn-ʿAlī Nūrī Bahāʾ-Allāh, a Babi from a wealthy family connected with the Qajar court.',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-babism-ii',
            loc: { section: 'BABISM ii. Babi executions and uprisings', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/babism-index/babism-ii-babi-executions-and-uprisings'
          }
        },
        {
          id: 'q3',
          text: 'Released on the intervention of the Russian Minister in January, 1853 (Zarandi, Dawn-Breakers, p. 636), he was instructed to leave the country and chose to go to Baghdad, accompanied by members of his family and other Babis.',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-babism-ii',
            loc: { section: 'BABISM ii. Babi executions and uprisings', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/babism-index/babism-ii-babi-executions-and-uprisings'
          }
        },
        {
          id: 'q4',
          text: 'During the next decade, Baghdad became firmly established as the main center of Babism, giving refuge to a small community of Iranian émigrés who sought to perpetuate the movement.',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-babism-ii',
            loc: { section: 'BABISM ii. Babi executions and uprisings', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/babism-index/babism-ii-babi-executions-and-uprisings'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f3/The_Young_Nasir_Al-Din_Shah_Qajar.jpg/1280px-The_Young_Nasir_Al-Din_Shah_Qajar.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:The_Young_Nasir_Al-Din_Shah_Qajar.jpg',
    credit: { creator: 'Mirza Abolhassan Khan Ghaffari' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'ivanov-1939-babidskie-vosstaniia-v-irane', perspective: 'russian-soviet' }
  ]
})
