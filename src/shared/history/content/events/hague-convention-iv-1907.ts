import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'hague-convention-iv-1907',
  names: [
    { text: 'Hague Convention (IV) of 1907', lang: 'en', role: 'primary' },
    {
      text: 'Convention respecting the Laws and Customs of War on Land',
      lang: 'en',
      role: 'official',
      cites: [
        {
          source: 'hague-convention-iv-1907',
          loc: {
            section: 'Convention (IV) respecting the Laws and Customs of War on Land, preamble'
          }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  type: 'treaty',
  start: {
    alts: [
      {
        value: { d: '1907-10-18' },
        cites: [
          { source: 'hague-convention-iv-1907', loc: { section: 'Title' } }
        ]
      }
    ]
  },
  regions: ['global', 'europe'],
  prominence: 2,
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Seeing that, while seeking means to preserve peace and prevent armed conflicts between nations, it is likewise necessary to bear in mind the case where the appeal to arms has been brought about by events which their care was unable to avert;',
          lang: 'en',
          cite: {
            source: 'hague-convention-iv-1907',
            loc: {
              section: 'Convention (IV) respecting the Laws and Customs of War on Land, preamble'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://avalon.law.yale.edu/20th_century/hague04.asp'
          }
        },
        {
          id: 'q2',
          text: 'Thinking it important, with this object, to revise the general laws and customs of war, either with a view to defining them with greater precision or to confining them within such limits as would mitigate their severity as far as possible;',
          lang: 'en',
          cite: {
            source: 'hague-convention-iv-1907',
            loc: {
              section: 'Convention (IV) respecting the Laws and Customs of War on Land, preamble'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://avalon.law.yale.edu/20th_century/hague04.asp'
          }
        },
        {
          id: 'q3',
          text: 'Until a more complete code of the laws of war has been issued, the High Contracting Parties deem it expedient to declare that, in cases not included in the Regulations adopted by them, the inhabitants and the belligerents remain under the protection and the rule of the principles of the law of nations, as they result from the usages established among civilized peoples, from the laws of humanity, and the dictates of the public conscience.',
          lang: 'en',
          cite: {
            source: 'hague-convention-iv-1907',
            loc: {
              section: 'Convention (IV) respecting the Laws and Customs of War on Land, preamble'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://avalon.law.yale.edu/20th_century/hague04.asp'
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
            value: { d: '1910-01-26' },
            cites: [
              {
                source: 'hague-convention-iv-1907',
                loc: {
                  section: 'Convention (IV) respecting the Laws and Customs of War on Land, preamble'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q4',
        text: 'ENTERED INTO FORCE: 26 January 1910',
        lang: 'en',
        cite: {
          source: 'hague-convention-iv-1907',
          loc: {
            section: 'Convention (IV) respecting the Laws and Customs of War on Land, preamble'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://avalon.law.yale.edu/20th_century/hague04.asp'
        }
      }
    }
  ]
})
