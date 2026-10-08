import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'british-occupation-of-kharg-1838',
  names: [
    { text: 'British occupation of Kharg Island (1838)', lang: 'en', role: 'primary' },
    { text: 'اشغال جزیره خارک', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'occupation',
  start: {
    alts: [
      {
        value: { d: '1838-06' },
        cites: [
          {
            source: 'iranica-amanat-herat-vi',
            loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '11' }
          }
        ]
      },
      {
        value: { d: '1837' },
        cites: [
          {
            source: 'iranica-potts-kharg-island-ii',
            loc: { section: 'KHARG ISLAND ii. History and archaeology', para: '14' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 3,
  places: [
    {
      ref: 'place:kharg-island',
      cites: [
        {
          source: 'iranica-amanat-herat-vi',
          loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '11' }
        },
        {
          source: 'iranica-potts-kharg-island-ii',
          loc: { section: 'KHARG ISLAND ii. History and archaeology', para: '14' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:reign-of-mohammad-shah-qajar' }
  ],
  polities: [
    { ref: 'polity:qajar-iran' }
  ],
  sides: [
    {
      key: 'britain',
      name: 'the British Indian fleet',
      cites: [
        {
          source: 'iranica-amanat-herat-vi',
          loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '11' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'combatants',
      side: 'britain',
      value: {
        alts: [
          {
            value: { min: 500 },
            cites: [
              {
                source: 'iranica-amanat-herat-vi',
                loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '11' }
              }
            ]
          }
        ]
      }
    }
  ],
  related: [
    {
      ref: 'event:siege-of-herat-1837-1838',
      rel: 'response-to',
      cites: [
        {
          source: 'iranica-potts-kharg-island-ii',
          loc: { section: 'KHARG ISLAND ii. History and archaeology', para: '14' }
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
          text: 'Upon the shah’s denial of Malcolm’s second mission in 1808, the British colonial authorities under Lord Minto for the first time threatened to use naval force in the Persian Gulf and occupy Ḵārk (Kharg) island.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '6'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/great-britain-ii/'
          }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q4',
          text: 'A British force occupied Kharg briefly in 1837 as part of a strategy to force the Persians to withdraw from Herat (English, 1971, p. 23; Perry, 1973, p. 95).',
          lang: 'en',
          cite: {
            source: 'iranica-potts-kharg-island-ii',
            loc: { section: 'KHARG ISLAND ii. History and archaeology', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/kharg-island-02'
          }
        },
        {
          id: 'q2',
          text: 'Ten days later the British Indian fleet that had been dispatched months earlier from Bombay occupied the Persian Gulf of Ḵārk and threatened the port of Bušehr.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-herat-vi',
            loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/herat-vi'
          }
        },
        {
          id: 'q3',
          text: 'The small force of 500 Indian Sepoys faced virtually no resistance.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-herat-vi',
            loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/herat-vi'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'The naval engagement in the Persian Gulf and the temporary occupation of Ḵārk Island forced Persia to abandon the Herat expedition (Kelly, pp. 290-301).',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '12'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/great-britain-ii/'
          }
        },
        {
          id: 'q6',
          text: 'To restore relations with Britain and request withdrawal from Ḵārk, in early 1839 the shah dispatched Ḥosayn Khan Ājudān-bāši to Europe.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-herat-vi',
            loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/herat-vi'
          }
        },
        {
          id: 'q7',
          text: 'The minister was forced to compromise on consular representation and growth in the volume of foreign imports in order to end the British occupation of and secure Iran’s sovereignty over Ḵārg island.',
          lang: 'en',
          cite: { source: 'iranica-amanat-aqasi', loc: { section: 'ĀQĀSĪ, ḤĀJJĪ MĪRZĀ', para: '9' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/aqasff-ujuli-mnsz-adras-ivxni-ca'
          }
        }
      ]
    }
  ]
})
