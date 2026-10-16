import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'aq-qoyunlu-civil-wars',
  names: [
    { text: 'Aq Qoyunlu civil wars', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-16',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1478-07' },
        cites: [
          {
            source: 'iranica-quiring-zoche-aq-qoyunlu',
            loc: { section: 'AQ QOYUNLŪ', para: '18' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1501' },
        cites: [
          {
            source: 'iranica-quiring-zoche-aq-qoyunlu',
            loc: { section: 'AQ QOYUNLŪ', para: '22' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'mena'],
  prominence: 3,
  places: [
    {
      ref: 'place:tabriz',
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '21' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:aq-qoyunlu',
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '21' }
        }
      ]
    },
    {
      ref: 'polity:safavid-iran',
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '22' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'aq-qoyunlu',
      name: 'Aq Qoyunlu',
      polity: 'polity:aq-qoyunlu',
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '21' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:sultan-yaqub-aq-qoyunlu',
      role: 'leader',
      side: 'aq-qoyunlu',
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '21' }
        }
      ]
    },
    {
      name: 'Bāysonḡor',
      role: 'leader',
      side: 'aq-qoyunlu',
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '21' }
        }
      ]
    },
    {
      name: 'Rostam',
      role: 'leader',
      side: 'aq-qoyunlu',
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '21' }
        }
      ]
    },
    {
      name: 'Aḥmad',
      role: 'leader',
      side: 'aq-qoyunlu',
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '21' }
        }
      ]
    },
    {
      name: 'Alvand',
      role: 'leader',
      side: 'aq-qoyunlu',
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '22' }
        }
      ]
    },
    {
      name: 'Morād',
      role: 'leader',
      side: 'aq-qoyunlu',
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '22' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:uzun-hasans-empire', rel: 'preceded-by' },
    {
      ref: 'event:founding-of-the-safavid-state',
      rel: 'led-to',
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '22' }
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
          text: 'After Yaʿqūb’s death, the Āq Qoyunlū engaged in ceaseless power struggles.',
          lang: 'en',
          cite: {
            source: 'iranica-quiring-zoche-aq-qoyunlu',
            loc: { section: 'AQ QOYUNLŪ', para: '21' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/aq-qoyunlu-confederation'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'A lasting weakness of the central government lay in the land grant system practiced since Saljuq times or earlier, whereby amirs did not receive salaries from the ruler but were rewarded with de facto heritable grants of seigneurial rights over designated areas.',
          lang: 'en',
          cite: {
            source: 'iranica-quiring-zoche-aq-qoyunlu',
            loc: { section: 'AQ QOYUNLŪ', para: '20' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/aq-qoyunlu-confederation'
          }
        },
        {
          id: 'q3',
          text: 'The gap between nomadic warriors and sedentary residents, which was also an ethnic barrier between Turkmans and Iranians, remained unbridgeable.',
          lang: 'en',
          cite: {
            source: 'iranica-quiring-zoche-aq-qoyunlu',
            loc: { section: 'AQ QOYUNLŪ', para: '17' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/aq-qoyunlu-confederation'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q4',
          text: 'The surviving Āq Qoyunlū tribes and groups were absorbed, in some cases years later, into the Qizilbāš tribes; in this process, the Afšār retained their tribal identity while others, such as the Ḥāǰǰīlū, Döḡer, Mawṣellū, and Pornāk, were merged into a new tribe called Turkman.',
          lang: 'en',
          cite: {
            source: 'iranica-quiring-zoche-aq-qoyunlu',
            loc: { section: 'AQ QOYUNLŪ', para: '22' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/aq-qoyunlu-confederation'
          }
        },
        {
          id: 'q5',
          text: 'The last Āq Qoyunlū sultan, Morād, who hoped to regain the throne with the help of Ottoman troops, was defeated and killed at his last stronghold, Rohā, by Esmāʿīl’s Qizilbāš fighters.',
          lang: 'en',
          cite: {
            source: 'iranica-quiring-zoche-aq-qoyunlu',
            loc: { section: 'AQ QOYUNLŪ', para: '22' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/aq-qoyunlu-confederation'
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
            value: { d: '1478-07' },
            cites: [
              {
                source: 'iranica-quiring-zoche-aq-qoyunlu',
                loc: { section: 'AQ QOYUNLŪ', para: '18' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q6',
        text: 'Uzun Ḥasan’s successor Ḵalīl went in for a policy of tighter centralization of power in the suftan’s hands but he was soon killed, in Rabīʿa II, 883/July, 1478, in a fight near Ḵoy with rebellious partisans of his fourteen-year-old brother Yaʿqūb; among them were many Āq Qoyunlū tribesmen from Anatolia aggrieved by the decline of their influence since the removal of the central authority of Iran.',
        lang: 'en',
        cite: {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '18' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://www.iranicaonline.org/articles/aq-qoyunlu-confederation'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1491' },
            cites: [
              {
                source: 'iranica-quiring-zoche-aq-qoyunlu',
                loc: { section: 'AQ QOYUNLŪ', para: '21' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'Yaʿqūb’s eight-year-old son Bāysonḡor was enthroned in 896/1491 under the tutelage of Ṣūfī Ḵalīl Beg Mawṣellū and ejected from Tabrīz in Raǰab, 897/May, 1492 by his cousin Rostam b. Maqṣūd b. Uzun Ḥasan, who had the backing of the Pornāk and Qajar tribes under the leadership of Ebrāhīm b. Dānā Ḵalīl Bayandor (known as Ayba Solṭān).',
        lang: 'en',
        cite: {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '21' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://www.iranicaonline.org/articles/aq-qoyunlu-confederation'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1493' },
            cites: [
              {
                source: 'iranica-quiring-zoche-aq-qoyunlu',
                loc: { section: 'AQ QOYUNLŪ', para: '21' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'Bāysonḡor made several unsuccessful attempts to return before he was killed in 898/1493.',
        lang: 'en',
        cite: {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '21' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://www.iranicaonline.org/articles/aq-qoyunlu-confederation'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1497-12' },
            cites: [
              {
                source: 'iranica-quiring-zoche-aq-qoyunlu',
                loc: { section: 'AQ QOYUNLŪ', para: '21' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'Aḥmad immediately reimposed centralizing measures, which provoked a revolt of the amirs led by Ayba Solṭān, and he was defeated and killed near Isfahan in Rabīʿa II, 903/December, 1497.',
        lang: 'en',
        cite: {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '21' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://www.iranicaonline.org/articles/aq-qoyunlu-confederation'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1501' },
            cites: [
              {
                source: 'iranica-quiring-zoche-aq-qoyunlu',
                loc: { section: 'AQ QOYUNLŪ', para: '22' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'The collapse of Āq Qoyunlū rule in Iran began in the autumn of 907/1501 with their defeat by Esmāʿīl Ṣafawī, who had left Lāhīǰān two years earlier and used his charisma to rally a large following of Turkman warriors.',
        lang: 'en',
        cite: {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '22' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://www.iranicaonline.org/articles/aq-qoyunlu-confederation'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Edict_of_the_Aq-Quyunlu_ruler_Ya%27qub%2C_Persia%2C_Dated_19_Jumadi_II.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Edict_of_the_Aq-Quyunlu_ruler_Ya%27qub,_Persia,_Dated_19_Jumadi_II.jpg',
    credit: { institution: 'Sotheby\'s' },
    license: { id: 'public-domain' }
  }
})
