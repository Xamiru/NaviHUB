import { definePerson } from '../../schema'

export default definePerson({
  id: 't-e-lawrence',
  names: [
    { text: 'T. E. Lawrence', lang: 'en', role: 'primary' },
    {
      text: 'Thomas Edward Lawrence',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'eo1418-tell-lawrence', loc: { section: 'Lawrence, Thomas Edward' } }
      ]
    },
    {
      text: 'Lawrence of Arabia',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'eo1418-tell-lawrence', loc: { section: 'Lawrence, Thomas Edward' } }
      ]
    }
  ],
  researched: '2026-10-06',
  born: {
    alts: [
      {
        value: { d: '1888-08-16' },
        cites: [
          { source: 'eo1418-tell-lawrence', loc: { section: 'Lawrence, Thomas Edward' } }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1935-05-19' },
        cites: [
          { source: 'eo1418-tell-lawrence', loc: { section: 'Lawrence, Thomas Edward' } }
        ]
      }
    ]
  },
  regions: ['mena', 'europe'],
  roles: ['military', 'writer'],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'T.E. Lawrence’s exploits during the Arab Revolt have acquired mythical status, making it difficult to distinguish between what he actually achieved and what was the product of his overactive imagination.',
          lang: 'en',
          cite: { source: 'eo1418-tell-lawrence', loc: { section: 'Lawrence, Thomas Edward' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/lawrence-thomas-edward/'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'Lawrence attached himself to the staff of Faysal I, King of Iraq (1885-1933), the commander of the northern armies of the Arab Revolt, becoming his official advisor in December 1916.',
          lang: 'en',
          cite: {
            source: 'eo1418-tell-lawrence',
            loc: { section: 'Into Battle: The Arab Campaign', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/lawrence-thomas-edward/'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q3',
          text: 'Thick layers of “Lawrenciana” have continued to accumulate around his name ever since, making it difficult to reach a balanced historical judgment of his wartime exploits or of his influence on the post-war Middle East.',
          lang: 'en',
          cite: {
            source: 'eo1418-tell-lawrence',
            loc: { section: 'War’s Aftermath: Sharifian Solution and Obscurity', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/lawrence-thomas-edward/'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bf/Lieutenant-colonel_T_E_Lawrence%2C_Cb%2C_Dso%2C_1918_Art.IWMART2473.jpg/1280px-Lieutenant-colonel_T_E_Lawrence%2C_Cb%2C_Dso%2C_1918_Art.IWMART2473.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Lieutenant-colonel_T_E_Lawrence,_Cb,_Dso,_1918_Art.IWMART2473.jpg',
    credit: { institution: 'Imperial War Museums', creator: 'James McBey' },
    license: { id: 'public-domain' }
  }
})
