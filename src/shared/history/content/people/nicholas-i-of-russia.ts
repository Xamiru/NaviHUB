import { definePerson } from '../../schema'

export default definePerson({
  id: 'nicholas-i-of-russia',
  names: [
    { text: 'Nicholas I of Russia', lang: 'en', role: 'primary' },
    { text: 'Николай I', lang: 'ru', role: 'native' }
  ],
  researched: '2026-10-06',
  regions: ['russia-central-asia'],
  roles: ['monarch'],
  offices: [
    {
      title: 'tsar',
      start: {
        alts: [
          {
            value: { d: '1825' },
            cites: [
              {
                source: 'iranica-andreeva-russia-relations',
                loc: {
                  section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
                  para: '21'
                }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1855' },
            cites: [
              {
                source: 'loc-russia-country-study-1996',
                loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '6' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-andreeva-russia-relations',
          loc: {
            section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
            para: '21'
          }
        },
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '6' }
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
          text: 'Alexander I died in 1825, and, after the attempted coup by the Decembrists, Nicholas I ascended the Russian throne.',
          lang: 'en',
          cite: {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '21'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
          }
        },
        {
          id: 'q2',
          text: 'Nicholas completely lacked his brother\'s spiritual and intellectual breadth; he saw his role simply as one paternal autocrat ruling his people by whatever means were necessary.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Ruling the Empire', para: '13' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/5.htm' }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q3',
          text: 'In foreign policy, Nicholas I acted as the protector of ruling legitimism and guardian against revolution.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Ruling the Empire', para: '16' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/5.htm' }
        },
        {
          id: 'q4',
          text: 'His offers to suppress revolution on the European continent, accepted in some instances, earned him the label of gendarme of Europe.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Ruling the Empire', para: '16' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/5.htm' }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q5',
          text: 'Nicholas I died before the fall of Sevastopol\', but he already had recognized the failure of his regime.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Ruling the Empire', para: '17' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/5.htm' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/c/cc/Franz_Kr%C3%BCger_-_Portrait_of_Emperor_Nicholas_I_-_WGA12289.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Franz_Kr%C3%BCger_-_Portrait_of_Emperor_Nicholas_I_-_WGA12289.jpg',
    credit: { institution: 'State Hermitage Museum', creator: 'Franz Krüger' },
    license: { id: 'public-domain' }
  }
})
