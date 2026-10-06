import { definePerson } from '../../schema'

export default definePerson({
  id: 'agustin-de-iturbide',
  names: [
    { text: 'Agustín de Iturbide', lang: 'en', role: 'primary' },
    {
      text: 'Agustín I',
      lang: 'es',
      role: 'alternative',
      cites: [
        {
          source: 'loc-mexico-country-study-1996',
          loc: { section: 'Empire and Early Republic, 1821-55', para: '2' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  regions: ['latin-america'],
  roles: ['monarch', 'military'],
  offices: [
    {
      title: 'constitutional emperor of Mexico',
      start: {
        alts: [
          {
            value: { d: '1822-05' },
            cites: [
              {
                source: 'loc-mexico-country-study-1996',
                loc: { section: 'Empire and Early Republic, 1821-55', para: '2' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1823-02' },
            cites: [
              {
                source: 'loc-mexico-country-study-1996',
                loc: { section: 'Empire and Early Republic, 1821-55', para: '3' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'loc-mexico-country-study-1996',
          loc: { section: 'Empire and Early Republic, 1821-55', para: '2' }
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
          text: 'Iturbide, a native of Valladolid, had gained renown for the zeal with which he persecuted Hidalgo\'s and Morelos\'s rebels during the early independence struggle.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'Iturbide and the Plan of Iguala', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/13.htm' }
        },
        {
          id: 'q2',
          text: 'A favorite of the Mexican church hierarchy, Iturbide was the personification of conservative criollo values, devoutly religious, and committed to the defense of property rights and social privileges; he was also disgruntled at his lack of promotion and wealth.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'Iturbide and the Plan of Iguala', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/13.htm' }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q3',
          text: 'As congress deliberated, Iturbide realized that power was slipping from his hands and decided to stage a dramatic demonstration on his behalf.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'Empire and Early Republic, 1821-55', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/14.htm' }
        },
        {
          id: 'q4',
          text: 'In congress, discontented factions sharply criticized the government, and Iturbide\'s recourse was to dissolve the legislative branch and to have all opposition delegates arrested in August 1822.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'Empire and Early Republic, 1821-55', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/14.htm' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Agust%C3%ADn_de_Iturbide_al_%C3%B3leo.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Agust%C3%ADn_de_Iturbide_al_%C3%B3leo.jpg',
    credit: { institution: 'Museo Soumaya' },
    license: { id: 'public-domain' }
  }
})
