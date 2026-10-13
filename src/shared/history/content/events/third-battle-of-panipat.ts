import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'third-battle-of-panipat',
  names: [
    { text: 'Third Battle of Panipat', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-13',
  type: 'battle',
  start: {
    alts: [
      {
        value: { d: '1761-01-07' },
        cites: [
          { source: 'britannica-1911-panipat', loc: { section: 'PANIPAT', para: '1' } },
          { source: 'britannica-1911-karnal', loc: { section: 'KARNAL', para: '3' } }
        ],
        heldBy: [
          {
            kind: 'organization',
            name: 'Encyclopædia Britannica (11th edition, 1911), articles Panipat and Karnal'
          }
        ]
      },
      {
        value: { d: '1761-01-06' },
        cites: [
          {
            source: 'britannica-1911-afghanistan',
            loc: { section: 'AFGHANISTAN', para: '107' }
          }
        ],
        heldBy: [
          {
            kind: 'organization',
            name: 'Encyclopædia Britannica (11th edition, 1911), article Afghanistan'
          }
        ]
      }
    ]
  },
  regions: ['south-asia'],
  prominence: 2,
  places: [
    {
      ref: 'place:panipat',
      cites: [
        {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'AHMAD SHAH AND THE DURRANI EMPIRE', para: '6' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'durrani',
      name: 'Afghans',
      polity: 'polity:durrani-empire',
      cites: [
        {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'AHMAD SHAH AND THE DURRANI EMPIRE', para: '6' }
        }
      ]
    },
    {
      key: 'marathas',
      name: 'Marathas',
      cites: [
        {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'AHMAD SHAH AND THE DURRANI EMPIRE', para: '6' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:ahmad-shah-durrani',
      role: 'commander',
      side: 'durrani',
      cites: [
        {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'AHMAD SHAH AND THE DURRANI EMPIRE', para: '6' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'combatants',
      side: 'durrani',
      value: {
        alts: [
          {
            value: { min: 100000, qualifier: 'up-to' },
            cites: [
              {
                source: 'loc-afghanistan-country-study-2001',
                loc: { section: 'AHMAD SHAH AND THE DURRANI EMPIRE', para: '6' }
              }
            ]
          }
        ]
      }
    },
    {
      key: 'combatants',
      side: 'marathas',
      value: {
        alts: [
          {
            value: { min: 100000, qualifier: 'up-to' },
            cites: [
              {
                source: 'loc-afghanistan-country-study-2001',
                loc: { section: 'AHMAD SHAH AND THE DURRANI EMPIRE', para: '6' }
              }
            ]
          }
        ]
      }
    }
  ],
  related: [
    {
      ref: 'event:battle-of-plassey',
      rel: 'related',
      cites: [
        {
          source: 'iranica-balland-afghanistan-political-history',
          loc: { section: 'AFGHANISTAN x. Political History', para: '2' }
        }
      ]
    },
    {
      ref: 'event:founding-of-the-durrani-empire',
      rel: 'preceded-by',
      cites: [
        {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'AHMAD SHAH AND THE DURRANI EMPIRE', para: '6' }
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
          text: 'Once again Panipat was the scene of a confrontation between two warring contenders for control of northern India.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'AHMAD SHAH AND THE DURRANI EMPIRE', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/afghanistan/11.htm' }
        },
        {
          id: 'q2',
          text: 'Despite decisively defeating the Marathas, what might have been Ahmad Shah\'s peaceful control of his domains was disrupted by other challenges.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'AHMAD SHAH AND THE DURRANI EMPIRE', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/afghanistan/11.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'The collapse of Mughal control in India, however, also facilitated the rise of rulers other than Ahmad Shah.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'AHMAD SHAH AND THE DURRANI EMPIRE', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/afghanistan/11.htm' }
        },
        {
          id: 'q4',
          text: 'From their capital at Pune, the Marathas, Hindus who controlled much of western and central India, were beginning to look northward to the decaying Mughal empire, which Ahmad Shah now claimed by conquest.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'AHMAD SHAH AND THE DURRANI EMPIRE', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/afghanistan/11.htm' }
        },
        {
          id: 'q5',
          text: 'Maratha forays into Orissa and Bengal (1740) were followed by the Dorrāni Afghan leader—and a former commander in Nāder’s 1739 invasion force—Aḥmad Shah Abdāli’s sack of Delhi (1748 and subsequently), further regional fragmentation, and the expanding military leverage of rival European commercial companies in the Indian subcontinent, namely the French East India Company (Compagnie des Indes Orientales) and the English East India Company (EIC).',
          lang: 'en',
          cite: {
            source: 'iranica-bonakdarian-india-afsharid-zand-periods',
            loc: { section: 'INDIA vii. RELATIONS: THE AFSHARID AND ZAND PERIODS', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/india-vii-relations-the-afsharid-and-zand-periods'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'By the end of 1761, the Sikhs had gained power and taken control of much of the Punjab.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'AHMAD SHAH AND THE DURRANI EMPIRE', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/afghanistan/11.htm' }
        },
        {
          id: 'q7',
          text: 'In 1762 Ahmad Shah crossed the passes from Afghanistan for the sixth time to subdue the Sikhs.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'AHMAD SHAH AND THE DURRANI EMPIRE', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/afghanistan/11.htm' }
        },
        {
          id: 'q8',
          text: 'At the same time the rise of Sikh power in the east prevented the Afghans from maintaining their hold on the left bank of the Indus (loss of Lahore, 1179/1765).',
          lang: 'en',
          cite: {
            source: 'iranica-balland-afghanistan-political-history',
            loc: { section: 'AFGHANISTAN x. Political History', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/afghanistan-x-political-history'
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
            value: { d: '1757' },
            cites: [
              {
                source: 'loc-afghanistan-country-study-2001',
                loc: { section: 'AHMAD SHAH AND THE DURRANI EMPIRE', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'Upon his return to Qandahar in 1757, Ahmad faced Maratha attacks which succeeded in ousting Timur and his court in India.',
        lang: 'en',
        cite: {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'AHMAD SHAH AND THE DURRANI EMPIRE', para: '5' }
        },
        provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/afghanistan/11.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1759' },
            cites: [
              {
                source: 'loc-afghanistan-country-study-2001',
                loc: { section: 'AHMAD SHAH AND THE DURRANI EMPIRE', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'Early skirmishes ended in victory for the Afghans, and by 1759 Ahmad and his army had reached Lahore.',
        lang: 'en',
        cite: {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'AHMAD SHAH AND THE DURRANI EMPIRE', para: '6' }
        },
        provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/afghanistan/11.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1760' },
            cites: [
              {
                source: 'loc-afghanistan-country-study-2001',
                loc: { section: 'AHMAD SHAH AND THE DURRANI EMPIRE', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'By 1760 the Maratha groups had coalesced into a great army.',
        lang: 'en',
        cite: {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'AHMAD SHAH AND THE DURRANI EMPIRE', para: '6' }
        },
        provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/afghanistan/11.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1761-01-07' },
            cites: [
              { source: 'britannica-1911-panipat', loc: { section: 'PANIPAT', para: '1' } },
              { source: 'britannica-1911-karnal', loc: { section: 'KARNAL', para: '3' } }
            ],
            heldBy: [
              {
                kind: 'organization',
                name: 'Encyclopædia Britannica (11th edition, 1911), articles Panipat and Karnal'
              }
            ]
          },
          {
            value: { d: '1761-01-06' },
            cites: [
              {
                source: 'britannica-1911-afghanistan',
                loc: { section: 'AFGHANISTAN', para: '107' }
              }
            ],
            heldBy: [
              {
                kind: 'organization',
                name: 'Encyclopædia Britannica (11th edition, 1911), article Afghanistan'
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'The Battle of Panipat in 1761 between Muslim and Hindu armies who numbered as many as 100,000 troops each was fought along a twelve-kilometer front.',
        lang: 'en',
        cite: {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'AHMAD SHAH AND THE DURRANI EMPIRE', para: '6' }
        },
        provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/afghanistan/11.htm' }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4a/Plan_of_the_Battle_of_Paniput%2C_1761.jpg/1280px-Plan_of_the_Battle_of_Paniput%2C_1761.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Plan_of_the_Battle_of_Paniput,_1761.jpg',
    credit: { institution: 'Asiatic Researches (Bengal, 1799)' },
    license: { id: 'public-domain' }
  }
})
