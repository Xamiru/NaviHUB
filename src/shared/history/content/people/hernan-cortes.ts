import { definePerson } from '../../schema'

export default definePerson({
  id: 'hernan-cortes',
  names: [
    { text: 'Hernán Cortés', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-13',
  born: {
    alts: [
      {
        value: { d: '1485' },
        cites: [
          {
            source: 'britannica-1911-cortes-hernan',
            loc: { section: 'Cortes, Hernan', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1547-12-02' },
        cites: [
          {
            source: 'britannica-1911-cortes-hernan',
            loc: { section: 'Cortes, Hernan', para: '5' }
          }
        ]
      }
    ]
  },
  regions: ['latin-america', 'europe'],
  roles: ['military', 'other'],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/7f/Cortes-Hernan-LOC.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Cortes-Hernan-LOC.jpg',
    credit: { institution: 'Library of Congress' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Lured by stories of the riches of the Aztec, a Spanish adventurer, Hernán (sometimes referred to as Fernando or Hernando) Cortés, assembled a fleet of eleven ships, ammunition, and over 700 men and in 1519 set sail from Cuba to Mexico.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'The Spanish Conquest', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/mexico/6.htm' }
        },
        {
          id: 'q2',
          text: 'The extent of his conquests, and the ability he had displayed, effaced the censure which he had incurred by the irregularity of his operations; and public opinion having declared in his favour, Charles V., disregarding the pretensions of Velazquez, appointed him governor and captain-general of Mexico, at the same time conferring on him the valley of Oaxaca, which was erected (1529) into a marquisate, with a considerable revenue.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-cortes-hernan',
            loc: { section: 'Cortes, Hernan', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Cortes,_Hernan'
          }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q3',
          text: 'He belonged to a noble family of decayed fortune, and, being destined for the law, was sent, at fourteen years of age, to the university of Salamanca; but study was distasteful to him, and he returned home in 1501, resolved to enter upon a life of adventure.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-cortes-hernan',
            loc: { section: 'Cortes, Hernan', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Cortes,_Hernan'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q4',
          text: 'He laid the foundation of the town of Vera Cruz, caused himself to be elected captain-general of the new colony, and burned his vessels to cut off the possibility of retreat and show his soldiers that they must either conquer or perish.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-cortes-hernan',
            loc: { section: 'Cortes, Hernan', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Cortes,_Hernan'
          }
        },
        {
          id: 'q5',
          text: 'Montezuma soon was arrested, and the Spanish took control of Tenochtitlán.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'The Spanish Conquest', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/mexico/6.htm' }
        },
        {
          id: 'q6',
          text: 'But although his power was thus confirmed by royal authority, and although he exerted himelf to consolidate Spanish domination throughout all Mexico, the means he employed were such that the natives, reduced to despair, took arms against the Spaniards.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-cortes-hernan',
            loc: { section: 'Cortes, Hernan', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Cortes,_Hernan'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q7',
          text: 'Cortes dissembled, redoubled the assiduity of his attendance on the emperor, accompanied him in the disastrous expedition to Algiers in 1541, served as a volunteer, and had a horse killed under him.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-cortes-hernan',
            loc: { section: 'Cortes, Hernan', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Cortes,_Hernan'
          }
        }
      ]
    }
  ]
})
