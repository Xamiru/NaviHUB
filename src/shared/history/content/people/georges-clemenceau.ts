import { definePerson } from '../../schema'

export default definePerson({
  id: 'georges-clemenceau',
  names: [
    { text: 'Georges Clemenceau', lang: 'en', role: 'primary' },
    {
      text: 'Georges Eugene Benjamin Clemenceau',
      lang: 'fr',
      role: 'alternative',
      cites: [
        { source: 'eo1418-laniol-clemenceau', loc: { section: 'Clemenceau, Georges' } }
      ]
    },
    {
      text: 'Le Tigre',
      lang: 'fr',
      role: 'alternative',
      cites: [
        { source: 'eo1418-laniol-clemenceau', loc: { section: 'Clemenceau, Georges' } }
      ]
    }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1841-09-28' },
        cites: [
          { source: 'eo1418-laniol-clemenceau', loc: { section: 'Clemenceau, Georges' } }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1929-11-24' },
        cites: [
          { source: 'eo1418-laniol-clemenceau', loc: { section: 'Clemenceau, Georges' } }
        ]
      }
    ]
  },
  diedIn: {
    ref: 'place:paris',
    cites: [
      { source: 'eo1418-laniol-clemenceau', loc: { section: 'Clemenceau, Georges' } }
    ]
  },
  regions: ['europe'],
  roles: ['politician', 'journalist'],
  offices: [
    {
      title: 'president of the council',
      polity: 'polity:french-third-republic',
      start: {
        alts: [
          {
            value: { d: '1917-11-16' },
            cites: [
              {
                source: 'eo1418-laniol-clemenceau',
                loc: { section: 'During World War I', para: '3' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'eo1418-laniol-clemenceau',
          loc: { section: 'During World War I', para: '3' }
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
          text: 'During the war, Georges Clemenceau fought for a more efficient war effort and for parliamentary control of military affairs and, as a journalist, rejected unlimited censorship. As French premier, he embodied the “integral war” and the struggle for victory. Once the armistice had been signed, the “Père la Victoire” signed a compromised peace that placed France at the center of European politics.',
          lang: 'en',
          cite: { source: 'eo1418-laniol-clemenceau', loc: { section: 'Clemenceau, Georges' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/clemenceau-georges/'
          }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q2',
          text: '“Domestic policy, I wage war. Foreign policy, I still wage war” was Clemenceau’s motto.',
          lang: 'en',
          cite: { source: 'eo1418-laniol-clemenceau', loc: { section: '“I wage war”', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/clemenceau-georges/'
          }
        },
        {
          id: 'q3',
          text: 'He had no faith in Wilson’s just settlement: “You want to do justice to the Germans. Do not imagine that they will ever forgive us; they will seek only the chance to obtain revenge.”',
          lang: 'en',
          cite: {
            source: 'eo1418-sharp-paris-peace-conference',
            loc: { section: 'The Paris Peace Conference', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/the-paris-peace-conference-and-its-consequences/'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/47/Portrait_of_Georges_Clemenceau_Wellcome_M0005201.jpg/1280px-Portrait_of_Georges_Clemenceau_Wellcome_M0005201.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Portrait_of_Georges_Clemenceau_Wellcome_M0005201.jpg',
    credit: { institution: 'Wellcome Collection', creator: 'P. Alvarez' },
    license: { id: 'cc-by', version: '4.0' }
  }
})
