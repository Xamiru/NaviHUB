import { definePerson } from '../../schema'

export default definePerson({
  id: 'john-malcolm',
  names: [
    { text: 'John Malcolm', lang: 'en', role: 'primary' },
    { text: 'Sir John Malcolm', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-06',
  born: {
    alts: [
      {
        value: { d: '1769-05-02' },
        cites: [
          {
            source: 'iranica-bonakdarian-eskandari-qajar-malcolm',
            loc: { section: 'MALCOLM, SIR JOHN', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1833-05-30' },
        cites: [
          {
            source: 'iranica-bonakdarian-eskandari-qajar-malcolm',
            loc: { section: 'MALCOLM, SIR JOHN', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'south-asia', 'europe'],
  roles: ['diplomat', 'military', 'scholar'],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'MALCOLM, Major-General Sir John, G.C.B., K.C.B. (b. 2 May 1769, Dumfriesshire, Scotland, d. 30 May 1833, London; Figure 1), military officer, diplomat, and administrator (British India), member of parliament (United Kingdom), and historian.',
          lang: 'en',
          cite: {
            source: 'iranica-bonakdarian-eskandari-qajar-malcolm',
            loc: { section: 'MALCOLM, SIR JOHN', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/malcolm-sir-john/'
          }
        },
        {
          id: 'q2',
          text: 'Of his three missions to Persia (1799-1801, 1808, and 1810), Malcolm would be best remembered in Persia for his first mission, in part due to its striking pageantry.',
          lang: 'en',
          cite: {
            source: 'iranica-bonakdarian-eskandari-qajar-malcolm',
            loc: { section: 'MALCOLM, SIR JOHN', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/malcolm-sir-john/'
          }
        }
      ]
    },
    {
      kind: 'works',
      quotes: [
        {
          id: 'q3',
          text: 'Sir John Malcolm (b. 1769), British soldier, statesman, historian, envoy of the East India Company, Governor of Bombay, and author of The History of Persia from the Most Early Period to the Present Time (2 vols., 1815), the first comprehensive history of Persia which served as a basis for a number of subsequent histories, dies.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-1',
            loc: { section: 'Chronology of Iranian History Part 1, 1833' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-1/'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/6/62/Samuel_Lane_-_Sir_John_Malcolm%2C_1769_-_1833._Indian_administrator_and_diplomat_-_PG_439_-_National_Galleries_of_Scotland.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Samuel_Lane_-_Sir_John_Malcolm,_1769_-_1833._Indian_administrator_and_diplomat_-_PG_439_-_National_Galleries_of_Scotland.jpg',
    credit: { institution: 'National Galleries of Scotland', creator: 'Samuel Lane' },
    license: { id: 'public-domain' }
  },
  archive: [
    {
      id: 'malcolm-1815-history-1',
      mediaKind: 'document',
      title: 'The history of Persia, from the most early period to the present time. Containing an account of the religion, government, usages, and character of the inhabitants of that kingdom',
      date: { d: '1815' },
      url: 'https://archive.org/download/b30455200_0001/b30455200_0001.pdf',
      page: 'https://archive.org/details/b30455200_0001',
      credit: { institution: 'Wellcome Library (Internet Archive)', creator: 'John Malcolm' },
      license: { id: 'public-domain' },
      bytes: 49677047
    },
    {
      id: 'malcolm-1815-history-2',
      mediaKind: 'document',
      title: 'The history of Persia, from the most early period to the present time. Containing an account of the religion, government, usages, and character of the inhabitants of that kingdom',
      date: { d: '1815' },
      url: 'https://archive.org/download/b30455200_0002/b30455200_0002.pdf',
      page: 'https://archive.org/details/b30455200_0002',
      credit: { institution: 'Wellcome Library (Internet Archive)', creator: 'John Malcolm' },
      license: { id: 'public-domain' },
      bytes: 54503131
    }
  ]
})
