import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'salt-march',
  names: [
    { text: 'Salt March', lang: 'en', role: 'primary' },
    { text: 'Dandi March', lang: 'en', role: 'alternative' },
    { text: 'Salt Satyagraha', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-08',
  type: 'protest',
  start: {
    alts: [
      {
        value: { d: '1930-03-12' },
        cites: [
          {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Mahatma Gandhi', para: '6' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1930-04-06' },
        cites: [
          {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Mahatma Gandhi', para: '6' }
          }
        ]
      }
    ]
  },
  regions: ['south-asia'],
  prominence: 2,
  places: [
    {
      ref: 'place:ahmedabad',
      cites: [
        {
          source: 'loc-india-country-study-1995',
          loc: { section: 'Mahatma Gandhi', para: '6' }
        }
      ]
    },
    {
      ref: 'place:dandi',
      cites: [
        {
          source: 'loc-india-country-study-1995',
          loc: { section: 'Mahatma Gandhi', para: '6' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'polity:british-raj' }
  ],
  polities: [
    { ref: 'polity:british-raj' }
  ],
  participants: [
    {
      ref: 'person:mahatma-gandhi',
      role: 'leader',
      cites: [
        {
          source: 'loc-india-country-study-1995',
          loc: { section: 'Mahatma Gandhi', para: '6' }
        }
      ]
    },
    {
      name: 'Edward Lord Irwin',
      role: 'negotiator',
      cites: [
        { source: 'lemo-chronik-1931', loc: { section: 'Chronik 1931', para: '39' } },
        { source: 'lemo-chronik-1931', loc: { section: 'Chronik 1931', para: '46' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'In 1929 the Congress responded by drafting its own constitution under the guidance of Motilal Nehru (Jawaharlal\'s father) demanding full independence (purna swaraj ) by 1930; the Congress went so far as to observe January 26, 1930, as the first anniversary of the first year of independence.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Mahatma Gandhi', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/india/20.htm' }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q2',
          text: 'Gandhi reemerged from his long seclusion by undertaking his most inspired campaign, a march of about 400 kilometers from his commune in Ahmadabad to Dandi, on the coast of Gujarat between March 12 and April 6, 1930.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Mahatma Gandhi', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/india/20.htm' }
        },
        {
          id: 'q3',
          text: 'At Dandi, in protest against extortionate British taxes on salt, he and thousands of followers illegally but symbolically made their own salt from sea water.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Mahatma Gandhi', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/india/20.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'For the next five years, the Congress and government were locked in conflict and negotiations until what became the Government of India Act of 1935 could be hammered out.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Mahatma Gandhi', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/india/20.htm' }
        },
        {
          id: 'q4',
          text: 'Their defiance reflected India\'s determination to be free, despite the imprisonment of thousands of protesters.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Mahatma Gandhi', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/india/20.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q6',
          text: 'In Indien kommt es zu schweren Auseinandersetzungen zwischen den Anhängern des Führers der indischen Freiheitsbewegung "Mahatma" Gandhi (1869-1948) und den britischen Kolonialbehörden.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1930', loc: { section: 'Chronik 1930', para: '82' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1930.html'
          }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1930-05-05' },
            cites: [
              { source: 'lemo-chronik-1930', loc: { section: 'Chronik 1930', para: '90' } },
              {
                source: 'hansard-commons-1930-05-05-arrest-of-mr-gandhi',
                loc: { section: 'Civil Disobedience Campaign (Arrest of Mr. Gandhi)' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'Mr. Gandhi was arrested this morning and is detained under the Bombay State Prisoners\' Regulation of 1827.',
        lang: 'en',
        cite: {
          source: 'hansard-commons-1930-05-05-arrest-of-mr-gandhi',
          loc: { section: 'Civil Disobedience Campaign (Arrest of Mr. Gandhi)' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://api.parliament.uk/historic-hansard/commons/1930/may/05/civil-disobedience-campaign-arrest-of-mr'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1931-03-04' },
            cites: [
              { source: 'lemo-chronik-1931', loc: { section: 'Chronik 1931', para: '46' } },
              {
                source: 'hansard-commons-1931-03-05-conversations-with-mr-gandhi',
                loc: {
                  section: 'Conversations between the Governor-General of India and Mr. Gandhi'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'Consequent on the conversations that have taken place between His Excellency the Viceroy and Mr. Gandhi, it has been arranged that the Civil Disobedience Movement be discontinued, and that, with the approval of His Majesty\'s Government, certain action he taken by the Government of India and Local Governments.',
        lang: 'en',
        cite: {
          source: 'hansard-commons-1931-03-05-conversations-with-mr-gandhi',
          loc: { section: 'Conversations between the Governor-General of India and Mr. Gandhi' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://api.parliament.uk/historic-hansard/commons/1931/mar/05/conversations-between-the-governor'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/24/Gandhi_and_Indira_1924.jpg/1280px-Gandhi_and_Indira_1924.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Gandhi_and_Indira_1924.jpg',
    credit: { institution: 'Gujarat Vidyapith' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'chandra-1989-indias-struggle-for-independence', perspective: 'south-asian' },
    {
      source: 'sitaramayya-1946-history-of-the-indian-national-congress',
      perspective: 'south-asian'
    }
  ]
})
