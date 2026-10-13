import { definePerson } from '../../schema'

export default definePerson({
  id: 'oliver-cromwell',
  names: [
    { text: 'Oliver Cromwell', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-13',
  born: {
    alts: [
      {
        value: { d: '1599-04-25' },
        cites: [
          {
            source: 'britannica-1911-cromwell-oliver',
            loc: { section: 'Cromwell, Oliver', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1658' },
        cites: [
          {
            source: 'britannica-1911-cromwell-oliver',
            loc: { section: 'Cromwell, Oliver', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  roles: ['politician', 'military', 'head-of-state'],
  offices: [
    {
      title: 'Lord Protector',
      start: {
        alts: [
          {
            value: { d: '1653-12-16' },
            cites: [
              {
                source: 'britannica-1911-cromwell-oliver',
                loc: { section: 'Cromwell, Oliver', para: '43' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1658' },
            cites: [
              {
                source: 'britannica-1911-cromwell-oliver',
                loc: { section: 'Cromwell, Oliver', para: '1' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'britannica-1911-cromwell-oliver',
          loc: { section: 'Cromwell, Oliver', para: '43' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/24/Oliver_Cromwell_by_Samuel_Cooper.jpg/1280px-Oliver_Cromwell_by_Samuel_Cooper.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Oliver_Cromwell_by_Samuel_Cooper.jpg',
    credit: { creator: 'Samuel Cooper' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Cromwell, who had no desire to exercise arbitrary power and whose main object therefore was to devise some constitutional limit to the authority which circumstances had placed in his hands, now accepted the written constitution drawn up by some of the officers, called the Instrument of Government, the earliest example of a “fixed government” based on “fundamentals,” or constitutional guarantees, and the only example of it in English history.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-cromwell-oliver',
            loc: { section: 'Cromwell, Oliver', para: '43' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Cromwell,_Oliver'
          }
        },
        {
          id: 'q2',
          text: 'As the king had no longer a field army, the war after Naseby resolved itself into a series of sieges which Charles had no means of raising.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-cromwell-oliver',
            loc: { section: 'Cromwell, Oliver', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Cromwell,_Oliver'
          }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q3',
          text: 'Oliver was born on the 25th of April 1599, was educated under Dr Thomas Beard, a fervent puritan, at the free school at Huntingdon, and on the 23rd of April 1616 matriculated as a fellow-commoner at Sidney Sussex College, Cambridge, then a hotbed of puritanism, subsequently studying law in London.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-cromwell-oliver',
            loc: { section: 'Cromwell, Oliver', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Cromwell,_Oliver'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q4',
          text: 'Cromwell and the Eastern Association.—This had already intervened to help in the siege of Reading and had sent troops to the abortive gathering at Nottingham, besides clearing its own ground of “malignants.”',
          lang: 'en',
          cite: {
            source: 'britannica-1911-great-rebellion',
            loc: { section: 'Great Rebellion', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Great_Rebellion'
          }
        },
        {
          id: 'q5',
          text: 'There was this important difference, however, between Waller’s idea and Cromwell’s achievement—that the professional soldiers of the New Model were disciplined, led, and in all things inspired by “godly” officers.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-great-rebellion',
            loc: { section: 'Great Rebellion', para: '30' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Great_Rebellion'
          }
        },
        {
          id: 'q6',
          text: 'On the 16th of December 1653 Cromwell was installed in his new office, dressed as a civilian in a plain black coat instead of in scarlet as a general, in order  to demonstrate that military government had given place to civil; for he approached his task in the same spirit that had prompted his declaration to the Little Parliament of his wish “to divest the sword of all power in the Civil administration.”',
          lang: 'en',
          cite: {
            source: 'britannica-1911-cromwell-oliver',
            loc: { section: 'Cromwell, Oliver', para: '43' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Cromwell,_Oliver'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q7',
          text: 'During the next few days he grew weaker and resigned himself to death.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-cromwell-oliver',
            loc: { section: 'Cromwell, Oliver', para: '59' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Cromwell,_Oliver'
          }
        }
      ]
    }
  ]
})
