import { definePerson } from '../../schema'

export default definePerson({
  id: 'muhammad-ali-jinnah',
  names: [
    { text: 'Muhammad Ali Jinnah', lang: 'en', role: 'primary' },
    { text: 'محمد علی جناح', lang: 'ur', role: 'native' },
    {
      text: 'Quaid-i-Azam',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-pakistan-country-study-1994',
          loc: { section: 'Constitutional Beginnings', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  died: {
    alts: [
      {
        value: { d: '1948-09' },
        cites: [
          {
            source: 'loc-pakistan-country-study-1994',
            loc: { section: 'Constitutional Beginnings', para: '2' }
          }
        ]
      }
    ]
  },
  regions: ['south-asia'],
  roles: ['politician'],
  offices: [
    {
      title: 'Governor-General of Pakistan',
      lang: 'en',
      cites: [
        {
          source: 'loc-pakistan-country-study-1994',
          loc: { section: 'Constitutional Beginnings', para: '1' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'career',
      quotes: [
        {
          id: 'q1',
          text: 'Mohammad Ali Jinnah, a Western-educated Muslim lawyer, took over the presidency of the moribund Muslim League and galvanized it into a national force under the battle cry of "Islam in danger."',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Political Impasse and Independence', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/india/21.htm' }
        },
        {
          id: 'q2',
          text: 'At independence Jinnah was the supreme authority. An accomplished politician, he won independence for Pakistan within seven years of the Lahore Resolution and was hailed by his followers as the Quaid-i-Azam (Great Leader).',
          lang: 'en',
          cite: {
            source: 'loc-pakistan-country-study-1994',
            loc: { section: 'Constitutional Beginnings', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/pakistan/15.htm' }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q3',
          text: 'Although Jinnah had led the movement for Pakistan as a separate Muslim nation, he was appalled by the communal riots and urged equal rights for all citizens irrespective of religion. Jinnah died in September 1948--only thirteen months after independence--leaving his successors to tackle the problems of Pakistan\'s identity.',
          lang: 'en',
          cite: {
            source: 'loc-pakistan-country-study-1994',
            loc: { section: 'Constitutional Beginnings', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/pakistan/15.htm' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Muhammad_Ali_Jinnah.png',
    page: 'https://commons.wikimedia.org/wiki/File:Muhammad_Ali_Jinnah.png',
    credit: { institution: 'Press Information Department of Pakistan' },
    license: { id: 'public-domain' }
  }
})
