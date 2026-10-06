import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'faramush-khana',
  names: [
    { text: 'Faramush-khana', lang: 'en', role: 'primary' },
    { text: 'فراموشخانه', lang: 'fa', role: 'native' },
    {
      text: 'Farāmūš-ḵāna',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-algar-freemasonry-qajar',
          loc: { section: 'FREEMASONRY ii. In the Qajar Period', para: '6' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  type: 'movement',
  start: {
    alts: [
      {
        value: { d: '1858' },
        cites: [
          {
            source: 'iranica-algar-freemasonry-qajar',
            loc: { section: 'FREEMASONRY ii. In the Qajar Period', para: '6' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1861-10' },
        cites: [
          {
            source: 'iranica-algar-freemasonry-qajar',
            loc: { section: 'FREEMASONRY ii. In the Qajar Period', para: '8' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 3,
  places: [
    {
      ref: 'place:tehran',
      cites: [
        {
          source: 'iranica-algar-freemasonry-qajar',
          loc: { section: 'FREEMASONRY ii. In the Qajar Period', para: '6' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:qajar-dynasty' },
    { ref: 'period:reign-of-naser-al-din-shah-qajar' }
  ],
  participants: [
    {
      ref: 'person:malkom-khan',
      role: 'organizer',
      cites: [
        {
          source: 'iranica-algar-freemasonry-qajar',
          loc: { section: 'FREEMASONRY ii. In the Qajar Period', para: '6' }
        }
      ]
    },
    {
      name: 'Mīrzā Yaʿqūb Khan',
      role: 'leader',
      cites: [
        {
          source: 'iranica-algar-freemasonry-qajar',
          loc: { section: 'FREEMASONRY ii. In the Qajar Period', para: '6' }
        }
      ]
    },
    {
      name: 'Jalāl-al-Dīn Mīrzā',
      role: 'participant',
      cites: [
        {
          source: 'iranica-algar-freemasonry-qajar',
          loc: { section: 'FREEMASONRY ii. In the Qajar Period', para: '6' }
        }
      ]
    },
    {
      ref: 'person:naser-al-din-shah-qajar',
      role: 'head-of-state',
      cites: [
        {
          source: 'iranica-algar-freemasonry-qajar',
          loc: { section: 'FREEMASONRY ii. In the Qajar Period', para: '8' }
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
          text: 'It was one of the first batch of initiates to Sincère Amitié, Mīrzā Malkom Khan (d. 1326/1908), who established the earliest farāmūš-ḵāna on Persian soil; it must, however, be regarded as a pseudo-Masonic institution given its lack of affiliation to any of the European obediences.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-freemasonry-qajar',
            loc: { section: 'FREEMASONRY ii. In the Qajar Period', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/freemasonry-ii-in-the-qajar-period'
          }
        },
        {
          id: 'q2',
          text: 'Freemasonry nonetheless played a role of some importance in the 19th-century history of Persia, largely because of the linkages to foreign powers that inevitably accompanied the initiation of Persian diplomats in European capitals.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-freemasonry-qajar',
            loc: { section: 'FREEMASONRY ii. In the Qajar Period', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/freemasonry-ii-in-the-qajar-period'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'It suggests also that the term farāmūšī, for long current in Persia as a popular appellation for Freemasonry, as well as farāmūš-ḵāna (house of forgetfulness) designating a Masonic lodge, originated in India, passing from there not only to Persia but also to Central Asia;',
          lang: 'en',
          cite: {
            source: 'iranica-algar-freemasonry-qajar',
            loc: { section: 'FREEMASONRY ii. In the Qajar Period', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/freemasonry-ii-in-the-qajar-period'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'The extent of its membership is uncertain, although definitely inferior to the thirty thousand that Malkom once claimed.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-freemasonry-qajar',
            loc: { section: 'FREEMASONRY ii. In the Qajar Period', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/freemasonry-ii-in-the-qajar-period'
          }
        },
        {
          id: 'q5',
          text: 'This impressive roster may be taken as proof of the sympathetic curiosity about Freemasonry that was evidently widespread among the Persian elite; it is unlikely that the initiates should have been particularly devoted to Malkom, who was considerably younger than most of them and had never occupied any important post in Persia.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-freemasonry-qajar',
            loc: { section: 'FREEMASONRY ii. In the Qajar Period', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/freemasonry-ii-in-the-qajar-period'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q6',
          text: 'Conditions were unstable in the capital, and rumors were rife that the Shah had died.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-freemasonry-qajar',
            loc: { section: 'FREEMASONRY ii. In the Qajar Period', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/freemasonry-ii-in-the-qajar-period'
          }
        },
        {
          id: 'q7',
          text: 'The episode was thus short-lived, and only a few initiates of the farāmūš-ḵāna went on to pursue seriously either Masonic or reformist interests.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-freemasonry-qajar',
            loc: { section: 'FREEMASONRY ii. In the Qajar Period', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/freemasonry-ii-in-the-qajar-period'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q8',
          text: 'The second such organization, the Jāmeʿ-e Ādamīyat (Society of Humanity), founded by ʿAbbāsqolī Khan Qazvīnī in 1904, can be characterized as a latter-day reincarnation of Malkom Khan’s original farāmūš-ḵāna; its immediate predecessor was, indeed, the Majmaʿ-e Ādamīyat (League of Humanity), a group of uncertain membership and influence organized by Malkom during the years he was publishing Qānūn (Algar, 1973, pp. 228-37).',
          lang: 'en',
          cite: {
            source: 'iranica-algar-freemasonry-qajar',
            loc: { section: 'FREEMASONRY ii. In the Qajar Period', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/freemasonry-ii-in-the-qajar-period'
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
            value: { d: '1857-12-10' },
            cites: [
              {
                source: 'iranica-algar-freemasonry-qajar',
                loc: { section: 'FREEMASONRY ii. In the Qajar Period', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'The seven initiated into the lodge Sincère Amitié at the Paris headquarters of the Grand Orient on 10 December 1857, consisted of Ḡaffārī himself, Mīrzā Malkom Khan, Mīrzā Zamān Khan, Narīmān Khan, Moḥammad-ʿAlī Āqā, Mīrzā Reżā, and ʿAlī-Naqī (Algar, 1970, p. 28).',
        lang: 'en',
        cite: {
          source: 'iranica-algar-freemasonry-qajar',
          loc: { section: 'FREEMASONRY ii. In the Qajar Period', para: '5' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/freemasonry-ii-in-the-qajar-period'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1858' },
            cites: [
              {
                source: 'iranica-algar-freemasonry-qajar',
                loc: { section: 'FREEMASONRY ii. In the Qajar Period', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'The farāmūš-ḵāna was founded by Malkom after its return to Tehran in 1274/1858; its nominal head was Malkom’s father, Mīrzā Yaʿqūb Khan, an Armenian convert to Islam, and it met in the house of Jalāl-al-Dīn Mīrzā, one of the numerous offspring of Fatḥ-ʿAlī Shah.',
        lang: 'en',
        cite: {
          source: 'iranica-algar-freemasonry-qajar',
          loc: { section: 'FREEMASONRY ii. In the Qajar Period', para: '6' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/freemasonry-ii-in-the-qajar-period'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1861-10' },
            cites: [
              {
                source: 'iranica-algar-freemasonry-qajar',
                loc: { section: 'FREEMASONRY ii. In the Qajar Period', para: '8' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'Although Nāṣer-al-Dīn Shah had undoubtedly known of the existence of the farāmūš-ḵāna despite the secrecy surrounding it and may even have approved of what he imagined to be its goals, the life of the institution was brought to an end by royal decree in October 1861; anyone who so much as uttered the word farāmūš-ḵāna was threatened with condign punishment (Eʿtemād-al-Salṭana, p. 118).',
        lang: 'en',
        cite: {
          source: 'iranica-algar-freemasonry-qajar',
          loc: { section: 'FREEMASONRY ii. In the Qajar Period', para: '8' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/freemasonry-ii-in-the-qajar-period'
        }
      }
    }
  ]
})
