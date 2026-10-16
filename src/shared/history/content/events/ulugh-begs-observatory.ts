import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'ulugh-begs-observatory',
  names: [
    { text: 'Ulugh Beg’s observatory', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-16',
  type: 'invention',
  start: {
    alts: [
      {
        value: { d: '1421' },
        cites: [
          {
            source: 'iranica-grenet-samarqand-i',
            loc: { section: 'SAMARQAND i. HISTORY AND ARCHAEOLOGY', para: '11' }
          }
        ]
      }
    ]
  },
  regions: ['russia-central-asia'],
  prominence: 3,
  places: [
    {
      ref: 'place:samarkand',
      cites: [
        {
          source: 'iranica-grenet-samarqand-i',
          loc: { section: 'SAMARQAND i. HISTORY AND ARCHAEOLOGY', para: '11' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:timurid-empire',
      cites: [
        {
          source: 'iranica-yarshater-iran-ii2-islamic-period-page-3',
          loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period (page 3)', para: '25' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:ulugh-beg',
      role: 'leader',
      cites: [
        {
          source: 'iranica-pingree-astronomy-in-iran-i',
          loc: {
            section: 'ASTROLOGY AND ASTRONOMY IN IRAN i. History of astronomy in Iran',
            para: '29'
          }
        }
      ]
    },
    {
      name: 'Ḡīāṯ-al-dīn Jamšīd Kāšī',
      role: 'participant',
      cites: [
        {
          source: 'iranica-pingree-astronomy-in-iran-i',
          loc: {
            section: 'ASTROLOGY AND ASTRONOMY IN IRAN i. History of astronomy in Iran',
            para: '29'
          }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:reign-of-shahrukh-and-herat-as-capital', rel: 'related' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The best known members of this group are Ḡīāṯ-al-dīn Jamšīd Kāšī, who completed the al-Zīǰ al-ḵāqānī in 1413-14, Qāżī-zāda Rūmī, and ʿAlāʾ-al-dīn Qūšǰī.',
          lang: 'en',
          cite: {
            source: 'iranica-pingree-astronomy-in-iran-i',
            loc: {
              section: 'ASTROLOGY AND ASTRONOMY IN IRAN i. History of astronomy in Iran',
              para: '29'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/astrology-and-astronomy-in-iran/astrology-and-astronomy-in-iran-i-history-of-astronomy-in-iran/'
          }
        },
        {
          id: 'q2',
          text: 'He erected an observatory at Samarkand, from which were issued tables of the sun, moon and planets, with an interesting introduction, which throws much light on the trigonometry and astronomical methods then in use',
          lang: 'en',
          cite: { source: 'britannica-1911-ulugh-beg', loc: { section: 'ULUGH BEG', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Ulugh_Beg'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'The effects of Oloḡ Beg’s work were felt in India in the seventeenth and eighteenth centuries.',
          lang: 'en',
          cite: {
            source: 'iranica-pingree-astronomy-in-iran-i',
            loc: {
              section: 'ASTROLOGY AND ASTRONOMY IN IRAN i. History of astronomy in Iran',
              para: '30'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/astrology-and-astronomy-in-iran/astrology-and-astronomy-in-iran-i-history-of-astronomy-in-iran/'
          }
        },
        {
          id: 'q7',
          text: 'But it seems unlikely, in the present state of our ignorance, that these Indian texts added anything of significance to Oloḡ Beg’s work, which remained the authoritative treatise on astronomy in Persian until the introduction of modern astronomy in the nineteenth century.',
          lang: 'en',
          cite: {
            source: 'iranica-pingree-astronomy-in-iran-i',
            loc: {
              section: 'ASTROLOGY AND ASTRONOMY IN IRAN i. History of astronomy in Iran',
              para: '30'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/astrology-and-astronomy-in-iran/astrology-and-astronomy-in-iran-i-history-of-astronomy-in-iran/'
          }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1440', approx: true },
            cites: [
              {
                source: 'iranica-pingree-astronomy-in-iran-i',
                loc: {
                  section: 'ASTROLOGY AND ASTRONOMY IN IRAN i. History of astronomy in Iran',
                  para: '29'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'The principle result of their efforts was the publication of the Zīǰ-e Oloḡ Beg in about 1440, which was immensely popular in Islam and was translated into both Arabic and Sanskrit.',
        lang: 'en',
        cite: {
          source: 'iranica-pingree-astronomy-in-iran-i',
          loc: {
            section: 'ASTROLOGY AND ASTRONOMY IN IRAN i. History of astronomy in Iran',
            para: '29'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://www.iranicaonline.org/articles/astrology-and-astronomy-in-iran/astrology-and-astronomy-in-iran-i-history-of-astronomy-in-iran/'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/23/Ulugh_Beg_Observatory_01.jpg/1280px-Ulugh_Beg_Observatory_01.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Ulugh_Beg_Observatory_01.jpg',
    credit: { creator: 'Bgag' },
    license: { id: 'cc0' }
  }
})
