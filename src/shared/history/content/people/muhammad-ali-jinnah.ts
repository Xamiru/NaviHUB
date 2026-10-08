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
  researched: '2026-10-08',
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
      title: 'Leader of the Muslim League',
      lang: 'en',
      start: {
        alts: [
          {
            value: { d: '1934' },
            cites: [
              {
                source: 'loc-pakistan-country-study-1994',
                loc: { section: 'The Two Nations Theory', para: '4' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'loc-pakistan-country-study-1994',
          loc: { section: 'The Two Nations Theory', para: '4' }
        },
        {
          source: 'loc-pakistan-country-study-1994',
          loc: { section: 'Constitutional Beginnings', para: '1' }
        }
      ]
    },
    {
      title: 'Governor-General of Pakistan',
      polity: 'polity:pakistan',
      lang: 'en',
      cites: [
        {
          source: 'loc-pakistan-country-study-1994',
          loc: { section: 'Constitutional Beginnings', para: '1' }
        }
      ]
    },
    {
      title: 'President of the Constituent Assembly of Pakistan',
      polity: 'polity:pakistan',
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
      kind: 'overview',
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
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q4',
          text: 'Jinnah, who was born in 1876, studied law in England and began his career as an enthusiastic liberal in Congress on returning to India.',
          lang: 'en',
          cite: {
            source: 'loc-pakistan-country-study-1994',
            loc: { section: 'Beginnings of Self-Government', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/pakistan/11.htm' }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q5',
          text: 'In 1913 he joined the Muslim League, which had been shocked by the 1911 annulment of the partition of Bengal into cooperating with Congress to make demands on the British. Jinnah continued his membership in Congress until 1919. During this dual membership period, he was described by a leading Congress spokesperson as the "ambassador of Hindu-Muslim unity."',
          lang: 'en',
          cite: {
            source: 'loc-pakistan-country-study-1994',
            loc: { section: 'Beginnings of Self-Government', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/pakistan/11.htm' }
        },
        {
          id: 'q6',
          text: 'In 1934 Jinnah returned to the leadership of the Muslim League after a period of residence in London, but found it divided and without a sense of mission. He set about restoring a sense of purpose to Muslims, and he emphasized the Two Nations Theory.',
          lang: 'en',
          cite: {
            source: 'loc-pakistan-country-study-1994',
            loc: { section: 'The Two Nations Theory', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/pakistan/12.htm' }
        },
        {
          id: 'q7',
          text: 'By the late 1930s, Jinnah was convinced of the need for a unifying issue among Muslims, and Pakistan was the obvious answer.',
          lang: 'en',
          cite: {
            source: 'loc-pakistan-country-study-1994',
            loc: { section: 'The Two Nations Theory', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/pakistan/12.htm' }
        },
        {
          id: 'q8',
          text: 'When the viceroy proceeded to form an interim government without the Muslim League, Jinnah called for demonstrations, or "Direct Action," on August 16, 1946.',
          lang: 'en',
          cite: {
            source: 'loc-pakistan-country-study-1994',
            loc: { section: 'Toward Partition', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/pakistan/13.htm' }
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
  },
  born: {
    alts: [
      {
        value: { d: '1876' },
        cites: [
          {
            source: 'loc-pakistan-country-study-1994',
            loc: { section: 'Beginnings of Self-Government', para: '4' }
          }
        ]
      }
    ]
  }
})
