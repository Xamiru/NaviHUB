import { definePerson } from '../../schema'

export default definePerson({
  id: 'diponegoro',
  names: [
    { text: 'Diponegoro', lang: 'en', role: 'primary' },
    {
      text: 'Pangeran Diponegoro',
      lang: 'id',
      role: 'alternative',
      cites: [
        {
          source: 'loc-indonesia-country-study-1993',
          loc: { section: 'The Java War and Cultivation System', para: '2' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  born: {
    alts: [
      {
        value: { d: '1785', approx: true },
        cites: [
          {
            source: 'loc-indonesia-country-study-1993',
            loc: { section: 'The Java War and Cultivation System', para: '2' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1855' },
        cites: [
          {
            source: 'loc-indonesia-country-study-1993',
            loc: { section: 'The Java War and Cultivation System', para: '2' }
          }
        ]
      }
    ]
  },
  regions: ['southeast-asia'],
  roles: ['revolutionary'],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Its central figure was Pangeran Diponegoro (ca. 1785-1855), eldest son of the sultan of Yogyakarta.',
          lang: 'en',
          cite: {
            source: 'loc-indonesia-country-study-1993',
            loc: { section: 'The Java War and Cultivation System', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/indonesia/11.htm' }
        },
        {
          id: 'q2',
          text: 'His education and disposition combined both Islamic and mystical elements: he was well acquainted with the teachings of the traditional Islamic schools (pesantren) in the rural village where he lived as a child with his grandmother, but he also experienced a vision in which the Goddess of the Southern Ocean promised that he was a future king.',
          lang: 'en',
          cite: {
            source: 'loc-indonesia-country-study-1993',
            loc: { section: 'The Java War and Cultivation System', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/indonesia/11.htm' }
        },
        {
          id: 'q3',
          text: 'According to M.C. Ricklefs, Diponegoro was in a unique position to mobilize both the elite and the common people against the colonialists: "as a senior prince, he had access to the aristocracy, as a mystic to the religious community, and as a rural dweller to the masses in the countryside."',
          lang: 'en',
          cite: {
            source: 'loc-indonesia-country-study-1993',
            loc: { section: 'The Java War and Cultivation System', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/indonesia/11.htm' }
        }
      ]
    },
    {
      kind: 'later-life',
      quotes: [
        {
          id: 'q4',
          text: 'Diponegoro was arrested in 1830 and exiled for a short time to Manado in northern Sulawesi and then to Makassar where he died.',
          lang: 'en',
          cite: {
            source: 'loc-indonesia-country-study-1993',
            loc: { section: 'The Java War and Cultivation System', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/indonesia/11.htm' }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q5',
          text: 'Because of his anti-Dutch role, Diponegoro is one of modern Indonesia\'s national heroes.',
          lang: 'en',
          cite: {
            source: 'loc-indonesia-country-study-1993',
            loc: { section: 'The Java War and Cultivation System', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/indonesia/11.htm' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4f/Raden_Saleh_-_Diponegoro_arrest.jpg/1280px-Raden_Saleh_-_Diponegoro_arrest.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Raden_Saleh_-_Diponegoro_arrest.jpg',
    credit: { institution: 'Istana Negara, Jakarta', creator: 'Raden Saleh' },
    license: { id: 'public-domain' }
  }
})
