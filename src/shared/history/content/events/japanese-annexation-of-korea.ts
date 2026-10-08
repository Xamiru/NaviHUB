import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'japanese-annexation-of-korea',
  names: [
    { text: 'Japanese annexation of Korea', lang: 'en', role: 'primary' },
    { text: '한일병합', lang: 'ko', role: 'native' },
    { text: '韓国併合', lang: 'ja', role: 'alternative' },
    {
      text: 'Japan-Korea Annexation Treaty',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'kantei-2010-08-10-statement-by-prime-minister-naoto-kan',
          loc: { section: 'Statement by Prime Minister Naoto Kan', para: '2' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'treaty',
  start: {
    alts: [
      {
        value: { d: '1910-08-22' },
        cites: [
          {
            source: 'frus-1910-d705-japanese-ambassador-annexation-of-korea',
            loc: { section: 'Document 705' }
          }
        ]
      }
    ]
  },
  regions: ['east-asia'],
  prominence: 2,
  places: [
    {
      ref: 'place:seoul',
      cites: [
        {
          source: 'frus-1910-d705-japanese-ambassador-annexation-of-korea',
          loc: { section: 'Document 705' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:meiji-era' }
  ],
  polities: [
    { ref: 'polity:empire-of-japan' }
  ],
  participants: [
    {
      name: 'Masatake Terauchi',
      role: 'signatory',
      cites: [
        {
          source: 'frus-1910-d705-japanese-ambassador-annexation-of-korea',
          loc: { section: 'Document 705' }
        }
      ]
    },
    {
      name: 'Ye Wan Yong',
      role: 'signatory',
      cites: [
        {
          source: 'frus-1910-d705-japanese-ambassador-annexation-of-korea',
          loc: { section: 'Document 705' }
        }
      ]
    },
    {
      ref: 'person:ito-hirobumi',
      role: 'participant',
      cites: [
        {
          source: 'loc-north-korea-country-study-1993',
          loc: { section: 'NINETEENTH CENTURY', para: '11' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:korean-war', rel: 'related' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'In 1910 Japan turned Korea into its colony, thus extinguishing Korea\'s hard-fought independence',
          lang: 'en',
          cite: {
            source: 'loc-north-korea-country-study-1993',
            loc: { section: 'NINETEENTH CENTURY', para: '11' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/north-korea/11.htm' }
        },
        {
          id: 'q2',
          text: 'Japan then governed Korea under a residency general and subsequently under a governor general directly subordinate to Japanese prime ministers. All of the governor generals were high-ranking Japanese military officers.',
          lang: 'en',
          cite: {
            source: 'loc-south-korea-country-study-1990',
            loc: { section: 'Korea Under Japanese Rule', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/south-korea/7.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Under the peace treaty brokered by Theodore Roosevelt in a conference at Portsmouth, New Hampshire, and signed in 1905, Russia recognized Japan\'s paramount rights in Korea. Japan would not question the rights of the United States in its colony, the Philippines, and the United States would not challenge Japan\'s new protectorate, established in 1905 to control Korea\'s foreign policy. Japan installed a resident-general and, two years later, deposed King Kojong.',
          lang: 'en',
          cite: {
            source: 'loc-north-korea-country-study-1993',
            loc: { section: 'NINETEENTH CENTURY', para: '11' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/north-korea/11.htm' }
        },
        {
          id: 'q4',
          text: 'Even before the country was formally annexed by Japan in 1910, the Japanese caused the last ruling monarch, King Kojong, to abdicate the throne in 1907 in favor of his feeble son, who was soon married off to a Japanese woman and given a Japanese peerage.',
          lang: 'en',
          cite: {
            source: 'loc-south-korea-country-study-1990',
            loc: { section: 'Korea Under Japanese Rule', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/south-korea/7.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'Article I. His Majesty the Emperor of Korea makes the complete and permanent cession',
          lang: 'en',
          cite: {
            source: 'frus-1910-d705-japanese-ambassador-annexation-of-korea',
            loc: { section: 'Document 705' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/historicaldocuments/frus1910/d705'
          }
        },
        {
          id: 'q6',
          text: 'Art. II. His Majesty the Emperor of Japan accepts the cession',
          lang: 'en',
          cite: {
            source: 'frus-1910-d705-japanese-ambassador-annexation-of-korea',
            loc: { section: 'Document 705' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/historicaldocuments/frus1910/d705'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q7',
          text: 'In theory the Koreans, as subjects of the Japanese emperor, enjoyed the same status as the Japanese; but in fact the Japanese government treated the Koreans as a conquered people. Until 1921 they were not allowed to publish their own newspapers or to organize political or intellectual groups.',
          lang: 'en',
          cite: {
            source: 'loc-south-korea-country-study-1990',
            loc: { section: 'Korea Under Japanese Rule', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/south-korea/7.htm' }
        },
        {
          id: 'q8',
          text: 'From the late 1930s until 1945, the colonial government pursued a policy of assimilation whose primary goal was to force the Koreans to speak Japanese and to consider themselves Japanese subjects.',
          lang: 'en',
          cite: {
            source: 'loc-south-korea-country-study-1990',
            loc: { section: 'Korea Under Japanese Rule', para: '9' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/south-korea/7.htm' }
        },
        {
          id: 'q9',
          text: 'Central judicial bodies wrote new laws establishing an extensive, "legalized" system of racial discrimination against Koreans, making them second-class citizens in their own country.',
          lang: 'en',
          cite: {
            source: 'loc-north-korea-country-study-1993',
            loc: { section: 'JAPANESE COLONIALISM', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/north-korea/12.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1910-08-22' },
            cites: [
              {
                source: 'frus-1910-d705-japanese-ambassador-annexation-of-korea',
                loc: { section: 'Document 705' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'treaty between japan and korea, signed on the 22d of august, 1910.',
        lang: 'en',
        cite: {
          source: 'frus-1910-d705-japanese-ambassador-annexation-of-korea',
          loc: { section: 'Document 705' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://history.state.gov/historicaldocuments/frus1910/d705'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1910-08-29' },
            cites: [
              {
                source: 'frus-1910-d705-japanese-ambassador-annexation-of-korea',
                loc: { section: 'Document 705' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'By virtue of that important act, which shall take effect on its promulgation on the 29th of August, 1910, the Imperial Government of Japan undertake the entire government and administration of Korea',
        lang: 'en',
        cite: {
          source: 'frus-1910-d705-japanese-ambassador-annexation-of-korea',
          loc: { section: 'Document 705' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://history.state.gov/historicaldocuments/frus1910/d705'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1919-03-01' },
            cites: [
              {
                source: 'loc-south-korea-country-study-1990',
                loc: { section: 'Korea Under Japanese Rule', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'Nationalist sentiments gave rise to a Korean student demonstration in Japan, and on March 1, 1919, to a Proclamation of Independence by a small group of leaders in Seoul. With the consolidation of what became known as the March First Movement, street demonstrations led by Christian and Ch\'ondogyo (a movement that evolved from Tonghak) groups erupted throughout the country to protest Japanese rule.',
        lang: 'en',
        cite: {
          source: 'loc-south-korea-country-study-1990',
          loc: { section: 'Korea Under Japanese Rule', para: '3' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/south-korea/7.htm' }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/22/Japan%E2%80%93Korea_Annexation_Treaty_1.jpg/1280px-Japan%E2%80%93Korea_Annexation_Treaty_1.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Japan%E2%80%93Korea_Annexation_Treaty_1.jpg',
    credit: { institution: 'Japan Center for Asian Historical Records' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'unno-1995-kankoku-heigo', perspective: 'japanese' },
    { source: 'moriyama-1992-nikkan-heigo', perspective: 'japanese' }
  ]
})
