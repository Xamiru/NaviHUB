import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'opening-of-the-first-majles',
  names: [
    { text: 'Opening of the first Majles', lang: 'en', role: 'primary' },
    { text: 'گشایش مجلس اول', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'founding',
  start: {
    alts: [
      {
        value: { d: '1906-10-07' },
        cites: [
          {
            source: 'iranica-arjomand-constitutional-revolution-constitution',
            loc: { section: 'iii. The Constitution', para: '3' }
          },
          {
            source: 'iranica-martin-constitutional-revolution-events',
            loc: {
              section: 'CONSTITUTIONAL REVOLUTION ii. Events, Adoption of the Constitution and early debates',
              para: '9'
            }
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
    { ref: 'event:persian-constitutional-revolution' }
  ],
  polities: [
    { ref: 'polity:qajar-iran' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q5',
          text: 'The Majles was inaugurated on 18 Šaʿbān 1324/7 October 1906, and the members elected Ṣanīʿ-al-Dawla president on the following day.',
          lang: 'en',
          cite: {
            source: 'iranica-arjomand-constitutional-revolution-constitution',
            loc: { section: 'iii. The Constitution', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/constitutional-revolution-iii'
          }
        },
        {
          id: 'q2',
          text: 'Of the Tehran deputies thirty-two represented the guilds, ten the merchants, ten the landowners, four the ʿolamāʾ, and four the Qajar family.',
          lang: 'en',
          cite: {
            source: 'iranica-martin-constitutional-revolution-events',
            loc: {
              section: 'CONSTITUTIONAL REVOLUTION ii. Events, Adoption of the Constitution and early debates',
              para: '8'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/constitutional-revolution-ii'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q6',
          text: 'After further negotiations the shah agreed in principle to a majles, and on 7 Jomādā II/29 July ʿAyn-al-Dawla resigned.',
          lang: 'en',
          cite: {
            source: 'iranica-martin-constitutional-revolution-events',
            loc: {
              section: 'CONSTITUTIONAL REVOLUTION ii. Events, Adoption of the Constitution and early debates',
              para: '7'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/constitutional-revolution-ii'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q9',
          text: 'Ṣanīʿ-al-Dawla immediately announced that the drafting of the internal regulations for the Majles and of the constitution itself would take precedence over all other business',
          lang: 'en',
          cite: {
            source: 'iranica-arjomand-constitutional-revolution-constitution',
            loc: { section: 'iii. The Constitution', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/constitutional-revolution-iii'
          }
        },
        {
          id: 'q3',
          text: 'Observers commented that the majority of the deputies had little understanding of constitutionalism and either pursued their personal interests or came under the influence of an ambitious few',
          lang: 'en',
          cite: {
            source: 'iranica-martin-constitutional-revolution-events',
            loc: {
              section: 'CONSTITUTIONAL REVOLUTION ii. Events, Adoption of the Constitution and early debates',
              para: '9'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/constitutional-revolution-ii'
          }
        },
        {
          id: 'q10',
          text: 'The guild deputies in particular were overawed by the proceedings and took little part in the debates, content to follow the guidance of the merchants and mojtaheds.',
          lang: 'en',
          cite: {
            source: 'iranica-martin-constitutional-revolution-events',
            loc: {
              section: 'CONSTITUTIONAL REVOLUTION ii. Events, Adoption of the Constitution and early debates',
              para: '9'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/constitutional-revolution-ii'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/81/Representatives_of_the_First_Iranian_Parliament_WDL11288.png',
    page: 'https://commons.wikimedia.org/wiki/File:Representatives_of_the_First_Iranian_Parliament_WDL11288.png',
    title: 'Representatives of the First Iranian Parliament',
    credit: { institution: 'World Digital Library, Library of Congress' },
    license: { id: 'public-domain' }
  },
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1906-08-10' },
            cites: [
              {
                source: 'iranica-martin-constitutional-revolution-events',
                loc: {
                  section: 'CONSTITUTIONAL REVOLUTION ii. Events, Adoption of the Constitution and early debates',
                  para: '7'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'Finally, following further consultations, including an interview between the grand vizier, Mošīr-al-Dawla, and leading merchants, the rescript of 19 Jomādā II/10 August granted the right to a majles-e šūrā-ye mellī',
        lang: 'en',
        cite: {
          source: 'iranica-martin-constitutional-revolution-events',
          loc: {
            section: 'CONSTITUTIONAL REVOLUTION ii. Events, Adoption of the Constitution and early debates',
            para: '7'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/constitutional-revolution-ii'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1906-09-08' },
            cites: [
              {
                source: 'iranica-martin-constitutional-revolution-events',
                loc: {
                  section: 'CONSTITUTIONAL REVOLUTION ii. Events, Adoption of the Constitution and early debates',
                  para: '8'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q1',
        text: 'The regulations provided for 156 deputies (Tārīḵ-e bīdārī, ed. Saʿīdī Sīrjānī, I, pp. 601-08); sixty of them were allotted to Tehran, reportedly in order to permit swift establishment of the Majles.',
        lang: 'en',
        cite: {
          source: 'iranica-martin-constitutional-revolution-events',
          loc: {
            section: 'CONSTITUTIONAL REVOLUTION ii. Events, Adoption of the Constitution and early debates',
            para: '8'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/constitutional-revolution-ii'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1906-09-29' },
            cites: [
              {
                source: 'iranica-martin-constitutional-revolution-events',
                loc: {
                  section: 'CONSTITUTIONAL REVOLUTION ii. Events, Adoption of the Constitution and early debates',
                  para: '8'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'Elections took place in the capital on 10 Šaʿbān/29 September, the number of voters being no more than a few hundred in each of the five classes, owing to high property qualifications.',
        lang: 'en',
        cite: {
          source: 'iranica-martin-constitutional-revolution-events',
          loc: {
            section: 'CONSTITUTIONAL REVOLUTION ii. Events, Adoption of the Constitution and early debates',
            para: '8'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/constitutional-revolution-ii'
        }
      }
    }
  ],
  participants: [
    {
      name: 'Ṣanīʿ-al-Dawla',
      role: 'leader',
      cites: [
        {
          source: 'iranica-arjomand-constitutional-revolution-constitution',
          loc: { section: 'iii. The Constitution', para: '3' }
        }
      ]
    },
    {
      ref: 'person:mohammad-tabatabai',
      role: 'participant',
      cites: [
        {
          source: 'iranica-martin-constitutional-revolution-events',
          loc: {
            section: 'CONSTITUTIONAL REVOLUTION ii. Events, Adoption of the Constitution and early debates',
            para: '8'
          }
        }
      ]
    },
    {
      ref: 'person:abdollah-behbahani',
      role: 'participant',
      cites: [
        {
          source: 'iranica-martin-constitutional-revolution-events',
          loc: {
            section: 'CONSTITUTIONAL REVOLUTION ii. Events, Adoption of the Constitution and early debates',
            para: '8'
          }
        }
      ]
    },
    {
      ref: 'person:mozaffar-al-din-shah',
      role: 'head-of-state',
      cites: [
        {
          source: 'iranica-martin-constitutional-revolution-events',
          loc: {
            section: 'CONSTITUTIONAL REVOLUTION ii. Events, Adoption of the Constitution and early debates',
            para: '7'
          }
        }
      ]
    }
  ],
  furtherReading: [
    { source: 'kasravi-1940-tarikh-e-mashruteh-ye-iran', perspective: 'iranian' },
    { source: 'ettehadieh-1982-peydayesh-va-tahavvol-e-ahzab', perspective: 'iranian' }
  ]
})
