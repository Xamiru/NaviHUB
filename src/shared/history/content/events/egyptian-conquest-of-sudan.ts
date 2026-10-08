import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'egyptian-conquest-of-sudan',
  names: [
    { text: 'Egyptian conquest of Sudan', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  type: 'invasion',
  start: {
    alts: [
      {
        value: { d: '1820' },
        cites: [
          {
            source: 'loc-sudan-country-study-1991',
            loc: { section: 'THE TURKIYAH, 1821-85', para: '3' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1821' },
        cites: [
          {
            source: 'loc-sudan-country-study-1991',
            loc: { section: 'THE TURKIYAH, 1821-85', para: '4' }
          }
        ]
      }
    ]
  },
  regions: ['subsaharan-africa', 'mena'],
  prominence: 2,
  places: [
    {
      ref: 'place:sennar',
      cites: [
        {
          source: 'loc-sudan-country-study-1991',
          loc: { section: 'THE TURKIYAH, 1821-85', para: '3' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'period:turkiyah',
      rel: 'led-to',
      cites: [
        {
          source: 'loc-sudan-country-study-1991',
          loc: { section: 'THE TURKIYAH, 1821-85', para: '4' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'egypt',
      name: 'the pasha\'s forces',
      cites: [
        {
          source: 'loc-sudan-country-study-1991',
          loc: { section: 'THE TURKIYAH, 1821-85', para: '3' }
        }
      ]
    },
    {
      key: 'sannar',
      name: 'Sannar',
      cites: [
        {
          source: 'loc-sudan-country-study-1991',
          loc: { section: 'THE TURKIYAH, 1821-85', para: '3' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:muhammad-ali-of-egypt',
      role: 'leader',
      side: 'egypt',
      cites: [
        {
          source: 'loc-sudan-country-study-1991',
          loc: { section: 'THE TURKIYAH, 1821-85', para: '3' }
        }
      ]
    },
    {
      name: 'Badi IV',
      role: 'participant',
      side: 'sannar',
      cites: [
        {
          source: 'loc-sudan-country-study-1991',
          loc: { section: 'THE TURKIYAH, 1821-85', para: '3' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'combatants',
      side: 'egypt',
      value: {
        alts: [
          {
            value: { min: 4000 },
            cites: [
              {
                source: 'loc-sudan-country-study-1991',
                loc: { section: 'THE TURKIYAH, 1821-85', para: '3' }
              }
            ]
          }
        ]
      }
    }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'To replace the Albanian soldiers, Muhammad Ali planned to build an Egyptian army with Sudanese slave recruits.',
          lang: 'en',
          cite: {
            source: 'loc-sudan-country-study-1991',
            loc: { section: 'THE TURKIYAH, 1821-85', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/sudan/11.htm' }
        },
        {
          id: 'q2',
          text: 'After he had defeated the Mamluks in Egypt, a party of them had escaped and had fled south.',
          lang: 'en',
          cite: {
            source: 'loc-sudan-country-study-1991',
            loc: { section: 'THE TURKIYAH, 1821-85', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/sudan/11.htm' }
        },
        {
          id: 'q3',
          text: 'In 1811 these Mamluks established a state at Dunqulah as a base for their slave trading.',
          lang: 'en',
          cite: {
            source: 'loc-sudan-country-study-1991',
            loc: { section: 'THE TURKIYAH, 1821-85', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/sudan/11.htm' }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q4',
          text: 'In 1820 the sultan of Sannar informed Muhammad Ali that he was unable to comply with the demand to expel the Mamluks. In response the pasha sent 4,000 troops to invade Sudan, clear it of Mamluks, and reclaim it for Egypt.',
          lang: 'en',
          cite: {
            source: 'loc-sudan-country-study-1991',
            loc: { section: 'THE TURKIYAH, 1821-85', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/sudan/11.htm' }
        },
        {
          id: 'q6',
          text: 'The pasha\'s forces received the submission of the kashif, dispersed the Dunqulah Mamluks, conquered Kurdufan, and accepted Sannar\'s surrender from the last Funj sultan, Badi IV.',
          lang: 'en',
          cite: {
            source: 'loc-sudan-country-study-1991',
            loc: { section: 'THE TURKIYAH, 1821-85', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/sudan/11.htm' }
        },
        {
          id: 'q7',
          text: 'The Jaali Arab tribes offered stiff resistance, however.',
          lang: 'en',
          cite: {
            source: 'loc-sudan-country-study-1991',
            loc: { section: 'THE TURKIYAH, 1821-85', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/sudan/11.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q8',
          text: 'Initially, the Egyptian occupation of Sudan was disastrous.',
          lang: 'en',
          cite: {
            source: 'loc-sudan-country-study-1991',
            loc: { section: 'THE TURKIYAH, 1821-85', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/sudan/11.htm' }
        },
        {
          id: 'q9',
          text: 'Within a year of the pasha\'s victory, 30,000 Sudanese slaves went to Egypt for training and induction into the army.',
          lang: 'en',
          cite: {
            source: 'loc-sudan-country-study-1991',
            loc: { section: 'THE TURKIYAH, 1821-85', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/sudan/11.htm' }
        },
        {
          id: 'q10',
          text: 'There is little documentation for the history of the southern Sudanese provinces until the introduction of the Turkiyah in the north in the early 1820s and the subsequent extension of slave raiding into the south.',
          lang: 'en',
          cite: {
            source: 'loc-sudan-country-study-1991',
            loc: { section: 'THE TURKIYAH, 1821-85', para: '10' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/sudan/11.htm' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b6/John_Frederick_Lewis_-_Study_for_Mehmet_Ali_Pasha_-_1986.78_-_Cleveland_Museum_of_Art.tif/lossy-page1-1280px-John_Frederick_Lewis_-_Study_for_Mehmet_Ali_Pasha_-_1986.78_-_Cleveland_Museum_of_Art.tif.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:John_Frederick_Lewis_-_Study_for_Mehmet_Ali_Pasha_-_1986.78_-_Cleveland_Museum_of_Art.tif',
    credit: { institution: 'Cleveland Museum of Art', creator: 'John Frederick Lewis' },
    license: { id: 'cc0' }
  },
  furtherReading: [
    { source: 'rafii-1982-asr-muhammad-ali', perspective: 'arab' },
    { source: 'shuqayr-1981-tarikh-al-sudan', perspective: 'arab' }
  ]
})
