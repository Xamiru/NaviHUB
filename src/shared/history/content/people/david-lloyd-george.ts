import { definePerson } from '../../schema'

export default definePerson({
  id: 'david-lloyd-george',
  names: [
    { text: 'David Lloyd George', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  born: {
    alts: [
      {
        value: { d: '1863-01-17' },
        cites: [
          { source: 'eo1418-packer-lloyd-george', loc: { section: 'Lloyd George, David' } }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1945-03-26' },
        cites: [
          { source: 'eo1418-packer-lloyd-george', loc: { section: 'Lloyd George, David' } }
        ]
      }
    ]
  },
  bornIn: {
    ref: 'place:manchester',
    cites: [
      { source: 'eo1418-packer-lloyd-george', loc: { section: 'Lloyd George, David' } }
    ]
  },
  regions: ['europe'],
  roles: ['politician'],
  offices: [
    {
      title: 'Prime Minister',
      start: {
        alts: [
          {
            value: { d: '1916' },
            cites: [
              { source: 'eo1418-packer-lloyd-george', loc: { section: 'Lloyd George, David' } }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1922' },
            cites: [
              { source: 'eo1418-packer-lloyd-george', loc: { section: 'Lloyd George, David' } }
            ]
          }
        ]
      },
      cites: [
        { source: 'eo1418-packer-lloyd-george', loc: { section: 'Lloyd George, David' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Lloyd George was a leading Liberal politician before World War I, who went on to play a central role in the United Kingdom’s war effort as Chancellor of the Exchequer (1908-1915), Minister of Munitions (1915-1916), Secretary of State for War (1916) and finally as Prime Minister (1916-1922).',
          lang: 'en',
          cite: { source: 'eo1418-packer-lloyd-george', loc: { section: 'Lloyd George, David' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/lloyd-george-david/'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'He played a central and controversial role at the Versailles Peace Conference in 1919, ensuring Germany was forced to accept clauses in the Versailles Treaty that laid the basis for the Allies’ demands for reparations, but opposing drastic reductions of its territory.',
          lang: 'en',
          cite: {
            source: 'eo1418-packer-lloyd-george',
            loc: { section: 'Post-war triumph and decline', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/lloyd-george-david/'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/e/e8/David_Lloyd_George.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:David_Lloyd_George.jpg',
    credit: { institution: 'Library of Congress', creator: 'Harris & Ewing' },
    license: { id: 'public-domain' }
  }
})
