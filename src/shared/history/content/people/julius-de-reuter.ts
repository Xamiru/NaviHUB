import { definePerson } from '../../schema'

export default definePerson({
  id: 'julius-de-reuter',
  names: [
    { text: 'Julius de Reuter', lang: 'en', role: 'primary' },
    {
      text: 'Baron Julius de Reuter',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-amanat-great-britain-ii',
          loc: {
            section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
            para: '25'
          }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  died: {
    alts: [
      {
        value: { d: '1899-02-25' },
        cites: [
          {
            source: 'britannica-1911-reuter-paul-julius-baron-de',
            loc: { section: 'REUTER, PAUL JULIUS, Baron de', para: '1' }
          }
        ]
      }
    ]
  },
  diedIn: {
    ref: 'place:nice',
    cites: [
      {
        source: 'britannica-1911-reuter-paul-julius-baron-de',
        loc: { section: 'REUTER, PAUL JULIUS, Baron de', para: '1' }
      }
    ]
  },
  regions: ['europe', 'iran'],
  roles: ['businessperson'],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'At a time when European capital was pouring into the Ottoman Empire, Egypt and Tunisia in the 1870s, granting a large concession to Baron Julius de Reuter, a German financier with British citizenship, was not rare.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '25'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/great-britain-ii/'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'In 1888 the shah, heeding this advice, opened the Karun River in Khuzestan to foreign shipping and gave Reuter permission to open the country\'s first bank.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE QAJARS, 1795-1925', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/iran/12.htm' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/a/aa/Reuter%2C_Paul_Julius_von%2C_Nadar%2C_Gallica.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Reuter,_Paul_Julius_von,_Nadar,_Gallica.jpg',
    credit: { institution: 'Bibliothèque nationale de France', creator: 'Nadar' },
    license: { id: 'public-domain' }
  }
})
