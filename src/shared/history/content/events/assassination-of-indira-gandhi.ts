import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'assassination-of-indira-gandhi',
  names: [
    { text: 'Assassination of Indira Gandhi', lang: 'en', role: 'primary' },
    { text: 'इंदिरा गांधी की हत्या', lang: 'hi', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'assassination',
  start: {
    alts: [
      {
        value: { d: '1984-10-31' },
        cites: [
          {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Indira Gandhi', para: '8' }
          }
        ]
      }
    ]
  },
  regions: ['south-asia'],
  prominence: 2,
  places: [
    {
      ref: 'place:delhi',
      cites: [
        {
          source: 'loc-india-country-study-1995',
          loc: { section: 'Indira Gandhi', para: '8' }
        }
      ]
    },
    {
      ref: 'place:amritsar',
      cites: [
        {
          source: 'loc-india-country-study-1995',
          loc: { section: 'Indira Gandhi', para: '8' }
        }
      ]
    }
  ],
  polities: [
    { ref: 'polity:india' }
  ],
  participants: [
    {
      name: 'Indira Gandhi',
      role: 'victim',
      cites: [
        {
          source: 'reagan-lib-1984-10-31-statement-on-assassination-of-indira-gandhi',
          loc: {
            section: 'Statement on the Assassination of Prime Minister Indira Gandhi of India',
            para: '4'
          }
        }
      ]
    },
    {
      name: 'Members of her security guard',
      role: 'perpetrator',
      cites: [
        {
          source: 'reagan-lib-1984-10-31-statement-on-assassination-of-indira-gandhi',
          loc: {
            section: 'Statement on the Assassination of Prime Minister Indira Gandhi of India',
            para: '4'
          }
        }
      ]
    },
    {
      name: 'Rajiv Gandhi',
      role: 'head-of-government',
      cites: [
        { source: 'loc-india-country-study-1995', loc: { section: 'Rajiv Gandhi', para: '1' } }
      ]
    },
    {
      ref: 'person:ronald-reagan',
      role: 'head-of-state',
      cites: [
        {
          source: 'reagan-lib-1984-10-31-statement-on-assassination-of-indira-gandhi',
          loc: {
            section: 'Statement on the Assassination of Prime Minister Indira Gandhi of India',
            para: '1'
          }
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
          text: 'Prime Minister Gandhi was shot outside her home by two members of her security guard and died a short time later in the All-India Institute of Medical Sciences.',
          lang: 'en',
          cite: {
            source: 'reagan-lib-1984-10-31-statement-on-assassination-of-indira-gandhi',
            loc: {
              section: 'Statement on the Assassination of Prime Minister Indira Gandhi of India',
              para: '4'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.reaganlibrary.gov/archives/speech/statement-assassination-prime-minister-indira-gandhi-india'
          }
        },
        {
          id: 'q2',
          text: 'The news of Indira Gandhi\'s assassination plunged New Delhi and other parts of India into anti-Sikh riots for three days; several thousand Sikhs were killed.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Indira Gandhi', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/india/24.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'The confrontation in Punjab began in 1973 when the Akali Dal issued the Anandpur Sahib Resolution calling for the establishment of a "Sikh Autonomous Region" with its own constitution.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Punjab and Jammu and Kashmir', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/india/117.htm' }
        },
        {
          id: 'q4',
          text: 'In May 1984, Sikh extremists occupied the Golden Temple in Amritsar, converting it into a haven for terrorists.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Indira Gandhi', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/india/24.htm' }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q5',
          text: 'Rajiv was sworn in as prime minister at the age of forty.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Rajiv Gandhi', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/india/25.htm' }
        },
        {
          id: 'q6',
          text: 'I want to express my shock, revulsion, and grief over the brutal assassination earlier today of Prime Minister Indira Gandhi of the Republic of India.',
          lang: 'en',
          cite: {
            source: 'reagan-lib-1984-10-31-statement-on-assassination-of-indira-gandhi',
            loc: {
              section: 'Statement on the Assassination of Prime Minister Indira Gandhi of India',
              para: '1'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.reaganlibrary.gov/archives/speech/statement-assassination-prime-minister-indira-gandhi-india'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q7',
          text: 'Rajiv Gandhi attempted to put an end to the crisis by signing an agreement with Akali Dal moderate Harchand Singh Longowal in August 1985.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Punjab and Jammu and Kashmir', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/india/117.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1984-06' },
            cites: [
              {
                source: 'loc-india-country-study-1995',
                loc: { section: 'Indira Gandhi', para: '8' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'Gandhi responded in early June when she launched Operation Bluestar, which killed and wounded hundreds of soldiers, insurgents, and civilians',
        lang: 'en',
        cite: {
          source: 'loc-india-country-study-1995',
          loc: { section: 'Indira Gandhi', para: '8' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/india/24.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1984-10-31' },
            cites: [
              {
                source: 'loc-india-country-study-1995',
                loc: { section: 'Indira Gandhi', para: '8' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'Guarding against further challenges to her power, she removed the chief ministers of Jammu and Kashmir and Andhra Pradesh just months before her assassination by her Sikh bodyguards on October 31, 1984.',
        lang: 'en',
        cite: {
          source: 'loc-india-country-study-1995',
          loc: { section: 'Indira Gandhi', para: '8' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/india/24.htm' }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/ba/Indira_Gandhi_1977.jpg/1280px-Indira_Gandhi_1977.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Indira_Gandhi_1977.jpg',
    credit: {
      institution: 'Nationaal Archief, The Hague (Fotocollectie Algemeen Nederlands Persbureau, ANEFO, 929-0811)'
    },
    license: { id: 'cc0' }
  }
})
