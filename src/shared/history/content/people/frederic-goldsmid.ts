import { definePerson } from '../../schema'

export default definePerson({
  id: 'frederic-goldsmid',
  names: [
    { text: 'Frederic John Goldsmid', lang: 'en', role: 'primary' },
    {
      text: 'Fredrick John Goldsmid',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-wright-goldsmid',
          loc: { section: 'GOLDSMID, Major-General Sir Fredrick John', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  born: {
    alts: [
      {
        value: { d: '1818' },
        cites: [
          {
            source: 'iranica-wright-goldsmid',
            loc: { section: 'GOLDSMID, Major-General Sir Fredrick John', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1909' },
        cites: [
          {
            source: 'iranica-wright-goldsmid',
            loc: { section: 'GOLDSMID, Major-General Sir Fredrick John', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'south-asia', 'europe'],
  roles: ['military', 'diplomat', 'scholar'],
  offices: [
    {
      title: 'director-general in London of the Government of India\'s Indo-European Telegraph Department',
      start: {
        alts: [
          {
            value: { d: '1865' },
            cites: [
              {
                source: 'iranica-wright-goldsmid',
                loc: { section: 'GOLDSMID, Major-General Sir Fredrick John', para: '1' }
              },
              {
                source: 'iranica-rubin-indo-european-telegraph-department',
                loc: { section: 'INDO-EUROPEAN TELEGRAPH DEPARTMENT', para: '5' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1870' },
            cites: [
              {
                source: 'iranica-wright-goldsmid',
                loc: { section: 'GOLDSMID, Major-General Sir Fredrick John', para: '1' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Denis Wright' }
            ]
          },
          {
            value: { d: '1871' },
            cites: [
              {
                source: 'iranica-rubin-indo-european-telegraph-department',
                loc: { section: 'INDO-EUROPEAN TELEGRAPH DEPARTMENT', para: '5' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Michael Rubin' }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-wright-goldsmid',
          loc: { section: 'GOLDSMID, Major-General Sir Fredrick John', para: '1' }
        },
        {
          source: 'iranica-rubin-indo-european-telegraph-department',
          loc: { section: 'INDO-EUROPEAN TELEGRAPH DEPARTMENT', para: '5' }
        }
      ]
    },
    {
      title: 'Arbitrator on the Perso-Afghan (Sistān) Arbitration Commission',
      start: {
        alts: [
          {
            value: { d: '1872' },
            cites: [
              {
                source: 'iranica-wright-goldsmid',
                loc: { section: 'GOLDSMID, Major-General Sir Fredrick John', para: '1' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1873' },
            cites: [
              {
                source: 'iranica-wright-goldsmid',
                loc: { section: 'GOLDSMID, Major-General Sir Fredrick John', para: '1' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-wright-goldsmid',
          loc: { section: 'GOLDSMID, Major-General Sir Fredrick John', para: '1' }
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
          text: 'Goldsmid was the son of a British cavalry officer and grandson of a well-known Jewish financier.',
          lang: 'en',
          cite: {
            source: 'iranica-wright-goldsmid',
            loc: { section: 'GOLDSMID, Major-General Sir Fredrick John', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/goldsmid'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'In 1851 he went as a political officer to Sind, where, in 1861, he began his long connection with the laying of the telegraph line from London to India, exploring Baluchistan and Makrān and negotiating with local chieftains for the extension of the line.',
          lang: 'en',
          cite: {
            source: 'iranica-wright-goldsmid',
            loc: { section: 'GOLDSMID, Major-General Sir Fredrick John', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/goldsmid'
          }
        },
        {
          id: 'q3',
          text: 'He was chief British Commissioner on the Baluchistan (Makrān) Boundary Commission of 1870-71 and Arbitrator on the Perso-Afghan (Sistān) Arbitration Commission of 1872-73.',
          lang: 'en',
          cite: {
            source: 'iranica-wright-goldsmid',
            loc: { section: 'GOLDSMID, Major-General Sir Fredrick John', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/goldsmid'
          }
        },
        {
          id: 'q4',
          text: 'Between 1870 and 1872, Goldsmid led a boundary commission which helped to establish Iran’s border with British India, ending a dispute in which the Khan of Kalāt claimed sovereignty over the Makrān coast (Goldsmid, 1876).',
          lang: 'en',
          cite: {
            source: 'iranica-rubin-indo-european-telegraph-department',
            loc: { section: 'INDO-EUROPEAN TELEGRAPH DEPARTMENT', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/indo-european-telegraph-department'
          }
        }
      ]
    },
    {
      kind: 'later-life',
      quotes: [
        {
          id: 'q5',
          text: 'After retiring in 1874, Goldsmid maintained a lively interest in Persia, writing and reading papers to the Royal Geographical and other learned societies.',
          lang: 'en',
          cite: {
            source: 'iranica-wright-goldsmid',
            loc: { section: 'GOLDSMID, Major-General Sir Fredrick John', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/goldsmid'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/55/Frederic_John_Goldsmid_-_Fradelle_%26_Marshall_-_btv1b8449777x_%283_of_4%29.jpg/1280px-Frederic_John_Goldsmid_-_Fradelle_%26_Marshall_-_btv1b8449777x_%283_of_4%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Frederic_John_Goldsmid_-_Fradelle_%26_Marshall_-_btv1b8449777x_(3_of_4).jpg',
    credit: { institution: 'Bibliothèque nationale de France', creator: 'Fradelle & Marshall' },
    license: { id: 'public-domain' }
  }
})
