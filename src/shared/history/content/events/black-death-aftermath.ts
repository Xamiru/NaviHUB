import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'black-death-aftermath',
  names: [
    { text: 'Aftermath of the Black Death', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-16',
  type: 'epidemic',
  start: {
    alts: [
      {
        value: { d: '1350' },
        cites: [
          {
            source: 'robb-et-al-2025-more-continuity-than-change-black-death-cambridge',
            loc: {
              section: 'More continuity than change following the Black Death epidemic in medieval Cambridge'
            }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 3,
  polities: [
    {
      ref: 'polity:kingdom-of-england',
      cites: [
        {
          source: 'robb-et-al-2025-more-continuity-than-change-black-death-cambridge',
          loc: {
            section: 'More continuity than change following the Black Death epidemic in medieval Cambridge'
          }
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
          text: 'The epidemic’s direct effect is undoubted: the death toll reached 50% or higher in some areas; it initiated the Second Pandemic, a 300-year period in which deadly plague epidemics recurred every 10–20 years',
          lang: 'en',
          cite: {
            source: 'robb-et-al-2025-more-continuity-than-change-black-death-cambridge',
            loc: {
              section: 'More continuity than change following the Black Death epidemic in medieval Cambridge'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12480250/'
          }
        },
        {
          id: 'q2',
          text: 'The Black Death epidemic of Yersinia pestis (1347-50 CE) killed about half the population of England, and many historical changes have been ascribed to it.',
          lang: 'en',
          cite: {
            source: 'robb-et-al-2025-more-continuity-than-change-black-death-cambridge',
            loc: {
              section: 'More continuity than change following the Black Death epidemic in medieval Cambridge'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12480250/'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'The cemetery came into use around 1000 CE and was used until 1365-6, when the parish, severely reduced in population by the Black Death (1348-9) and the subsequent epidemic in 1362, was merged with a nearby one.',
          lang: 'en',
          cite: {
            source: 'robb-et-al-2025-more-continuity-than-change-black-death-cambridge',
            loc: {
              section: 'More continuity than change following the Black Death epidemic in medieval Cambridge'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12480250/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q4',
          text: 'In the landscape, settlements were abandoned and fields turned to pasture, which required less labour and which powered England’s late medieval wealth-creating wool trade.',
          lang: 'en',
          cite: {
            source: 'robb-et-al-2025-more-continuity-than-change-black-death-cambridge',
            loc: {
              section: 'More continuity than change following the Black Death epidemic in medieval Cambridge'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12480250/'
          }
        },
        {
          id: 'q5',
          text: 'Socially, wages rose as the labour supply was reduced, and workers became less tied to estates and more independently mobile',
          lang: 'en',
          cite: {
            source: 'robb-et-al-2025-more-continuity-than-change-black-death-cambridge',
            loc: {
              section: 'More continuity than change following the Black Death epidemic in medieval Cambridge'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12480250/'
          }
        },
        {
          id: 'q6',
          text: 'Many historians have seen the plague as hastening and amplifying changes which were happening anyway (for example, the transition from serfs tied to estates to free labour)',
          lang: 'en',
          cite: {
            source: 'robb-et-al-2025-more-continuity-than-change-black-death-cambridge',
            loc: {
              section: 'More continuity than change following the Black Death epidemic in medieval Cambridge'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC12480250/'
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
            value: { d: '1361' },
            cites: [
              { source: 'britannica-1911-plague', loc: { section: 'Plague', para: '4' } }
            ],
            heldBy: [
              { kind: 'organization', name: 'Encyclopædia Britannica (11th edition, 1911)' }
            ]
          },
          {
            value: { d: '1362' },
            cites: [
              {
                source: 'robb-et-al-2025-more-continuity-than-change-black-death-cambridge',
                loc: {
                  section: 'More continuity than change following the Black Death epidemic in medieval Cambridge'
                }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'John Robb and colleagues', discipline: 'historian' }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'The outbreaks of 1361 and 1368, known as the second and third plagues of the reign of Edward III., were doubtless of the same disease, though by some historians not called the black death.',
        lang: 'en',
        cite: { source: 'britannica-1911-plague', loc: { section: 'Plague', para: '4' } },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Plague'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/7d/Burying_Plague_Victims_of_Tournai.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Burying_Plague_Victims_of_Tournai.jpg',
    credit: { creator: 'Gilles Li Muisis (Chronicles)' },
    license: { id: 'public-domain' }
  }
})
