import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'great-syrian-revolt',
  names: [
    { text: 'Great Syrian Revolt', lang: 'en', role: 'primary' },
    {
      text: 'Druze revolt',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-syria-country-study-1987',
          loc: { section: 'THE FRENCH MANDATE', para: '7' }
        }
      ]
    }
  ],
  researched: '2026-10-07',
  type: 'uprising',
  start: {
    alts: [
      {
        value: { d: '1925-07-20' },
        cites: [
          {
            source: 'loc-syria-country-study-1987',
            loc: { section: 'THE FRENCH MANDATE', para: '7' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1925' },
        cites: [
          {
            source: 'loc-syria-country-study-1987',
            loc: { section: 'THE FRENCH MANDATE', para: '8' }
          }
        ]
      }
    ]
  },
  regions: ['mena'],
  prominence: 3,
  places: [
    {
      ref: 'place:damascus',
      cites: [
        {
          source: 'loc-syria-country-study-1987',
          loc: { section: 'THE FRENCH MANDATE', para: '8' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'Sultan Pasha al Atrash',
      role: 'leader',
      cites: [
        {
          source: 'loc-syria-country-study-1987',
          loc: { section: 'THE FRENCH MANDATE', para: '4' }
        },
        {
          source: 'loc-syria-country-study-1987',
          loc: { section: 'THE FRENCH MANDATE', para: '7' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'deaths',
      value: {
        alts: [
          {
            value: { min: 5000 },
            cites: [
              {
                source: 'loc-syria-country-study-1987',
                loc: { section: 'THE FRENCH MANDATE', para: '8' }
              }
            ]
          }
        ]
      }
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q4',
          text: 'Led by Sultan Pasha al Atrash, Druzes attacked and captured Salkhad on July 20, 1925, and on August 2 they took the Druze capital, As Suwayda.',
          lang: 'en',
          cite: {
            source: 'loc-syria-country-study-1987',
            loc: { section: 'THE FRENCH MANDATE', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/syria/9.htm' }
        }
      ]
    },
    {
      kind: 'causes',
      quotes: [
        {
          id: 'q1',
          text: 'Devastating proof of the miscalculations of the French burst into the open with the 1925 Druze revolt.',
          lang: 'en',
          cite: {
            source: 'loc-syria-country-study-1987',
            loc: { section: 'THE FRENCH MANDATE', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/syria/9.htm' }
        },
        {
          id: 'q2',
          text: 'The Druzes had many complaints, but chief among them was the foreign intervention in Druze affairs.',
          lang: 'en',
          cite: {
            source: 'loc-syria-country-study-1987',
            loc: { section: 'THE FRENCH MANDATE', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/syria/9.htm' }
        },
        {
          id: 'q3',
          text: 'Their grievances against the French were many, but chief among them were French suppression of newspapers, political activity, and civil rights and the division of Greater Syria into several political units.',
          lang: 'en',
          cite: {
            source: 'loc-syria-country-study-1987',
            loc: { section: 'THE FRENCH MANDATE', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/syria/9.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'News of the Druze rebellion spread throughout Syria and ignited revolts in Aleppo and Damascus among Syrian nationalists, who pleaded with Atrash to attack the Syrian capital. In October the Druzes invaded the Damascus region; nationalist leaders led their own demonstrations; and the French began systematic bombardment of the city, resulting in the death of 5,000 Syrians.',
          lang: 'en',
          cite: {
            source: 'loc-syria-country-study-1987',
            loc: { section: 'THE FRENCH MANDATE', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/syria/9.htm' }
        },
        {
          id: 'q6',
          text: 'The rebellion collapsed by the end of the year, and reluctant order replaced open revolt.',
          lang: 'en',
          cite: {
            source: 'loc-syria-country-study-1987',
            loc: { section: 'THE FRENCH MANDATE', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/syria/9.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q7',
          text: 'The revolts, however, were not necessarily expressions of desire for unified Syrian independence. They were uprisings by individual groups--Alawis, Druzes, and beduins--against foreign interference, comparable to those earlier fomented against the Ottomans.',
          lang: 'en',
          cite: {
            source: 'loc-syria-country-study-1987',
            loc: { section: 'THE FRENCH MANDATE', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/syria/9.htm' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Ghouta_rebels_in_1925.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Ghouta_rebels_in_1925.jpg',
    credit: { institution: 'Markaz al-Wathāʾiq al-Tārīkhiyya' },
    license: { id: 'public-domain' }
  }
})
