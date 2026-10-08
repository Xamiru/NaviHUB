import { definePerson } from '../../schema'

export default definePerson({
  id: 'ibn-saud',
  names: [
    { text: 'Ibn Saud', lang: 'en', role: 'primary' },
    { text: 'عبد العزيز بن عبد الرحمن آل سعود', lang: 'ar', role: 'native' },
    {
      text: 'Abd al Aziz ibn Abd ar Rahman Al Saud',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-saudi-arabia-country-study-1992',
          loc: { section: 'OIL INDUSTRY: Brief History', para: '4' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1876' },
        cites: [
          {
            source: 'loc-saudi-arabia-country-study-1992',
            loc: { section: 'The King', para: '3' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1953' },
        cites: [
          {
            source: 'loc-saudi-arabia-country-study-1992',
            loc: { section: 'The Reigns of Saud and Faisal', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['mena'],
  roles: ['monarch'],
  offices: [
    {
      title: 'King of Saudi Arabia',
      polity: 'polity:saudi-arabia',
      cites: [
        {
          source: 'loc-saudi-arabia-country-study-1992',
          loc: { section: 'OIL INDUSTRY: Brief History', para: '4' }
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
          text: 'Abd al Aziz established the Saudi state in three stages, namely, by retaking Najd in 1905, defeating the Rashidi clan at Hail in 1921, and conquering the Hijaz in 1924.',
          lang: 'en',
          cite: {
            source: 'loc-saudi-arabia-country-study-1992',
            loc: { section: 'The Rise of Abd Al Aziz', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/saudi-arabia/9.htm' }
        },
        {
          id: 'q2',
          text: 'Finally, by maintaining his authority under pressure from the Western powers, Abd al Aziz had become the only truly independent Arab leader after World War I.',
          lang: 'en',
          cite: {
            source: 'loc-saudi-arabia-country-study-1992',
            loc: { section: 'The Rule of Abd Al Aziz', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/saudi-arabia/10.htm' }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q3',
          text: 'In the late 1920s the majority sided with Abd al Aziz, setting the foundation of the modern state.',
          lang: 'en',
          cite: {
            source: 'loc-saudi-arabia-country-study-1992',
            loc: { section: 'The Rule of Abd Al Aziz', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/saudi-arabia/10.htm' }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q4',
          text: 'Upon Abd al Aziz\'s death in 1953 he was succeeded by his son, Saud.',
          lang: 'en',
          cite: {
            source: 'loc-saudi-arabia-country-study-1992',
            loc: { section: 'The Reigns of Saud and Faisal', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/saudi-arabia/11.htm' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Official_Portrait_of_King_Abdulaziz.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Official_Portrait_of_King_Abdulaziz.jpg',
    credit: { institution: 'Saudi Press Agency', creator: 'Saudi Press Agency' },
    license: { id: 'public-domain' }
  }
})
