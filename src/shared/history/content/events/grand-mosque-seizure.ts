import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'grand-mosque-seizure',
  names: [
    { text: 'Grand Mosque seizure', lang: 'en', role: 'primary' },
    {
      text: 'اقتحام المسجد الحرام',
      lang: 'ar',
      role: 'native',
      translit: 'Iqtiḥām al-Masjid al-Ḥarām'
    },
    {
      text: 'Occupation of the Grand Mosque, Mecca',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'frus1977-80v18-doc-201', loc: { section: 'Document 201' } }
      ]
    },
    {
      text: 'Mecca incident',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'frus1977-80v18-doc-206', loc: { section: 'Document 206' } }
      ]
    }
  ],
  researched: '2026-10-09',
  type: 'occupation',
  start: {
    alts: [
      {
        value: { d: '1979-11-20' },
        cites: [
          { source: 'frus1977-80v18-doc-201', loc: { section: 'Document 201' } }
        ]
      }
    ]
  },
  regions: ['mena'],
  prominence: 2,
  places: [
    {
      ref: 'place:mecca',
      cites: [
        { source: 'frus1977-80v18-doc-201', loc: { section: 'Document 201' } }
      ]
    }
  ],
  sides: [
    {
      key: 'seizers',
      name: 'The seizers of the Grand Mosque',
      cites: [
        { source: 'frus1977-80v18-doc-201', loc: { section: 'Document 201' } }
      ]
    },
    {
      key: 'saudi',
      name: 'Saudi authorities',
      cites: [
        { source: 'frus1977-80v18-doc-201', loc: { section: 'Document 201' } }
      ]
    }
  ],
  participants: [
    {
      name: 'Muhammad Abdallah',
      role: 'perpetrator',
      side: 'seizers',
      cites: [
        { source: 'frus1977-80v18-doc-201', loc: { section: 'Document 201' } }
      ]
    }
  ],
  figures: [
    {
      key: 'participants',
      value: {
        alts: [
          {
            value: { min: 300, qualifier: 'about' },
            cites: [
              { source: 'frus1977-80v18-doc-201', loc: { section: 'Document 201' } }
            ],
            heldBy: [
              { kind: 'organization', name: 'U.S. Embassy in Saudi Arabia' }
            ]
          },
          {
            value: { min: 200, max: 500 },
            cites: [
              { source: 'frus1977-80v18-doc-201', loc: { section: 'Document 201' } }
            ],
            heldBy: [
              { kind: 'participant', name: 'A Saudi Cabinet minister (unnamed)' }
            ]
          }
        ]
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/92/Al-Haram_mosque_-_Flickr_-_Al_Jazeera_English.jpg/1280px-Al-Haram_mosque_-_Flickr_-_Al_Jazeera_English.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Al-Haram_mosque_-_Flickr_-_Al_Jazeera_English.jpg',
    credit: { institution: 'Al Jazeera English (Flickr)', creator: 'Al Jazeera English' },
    license: { id: 'cc-by-sa', version: '2.0' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The Grand Mosque in Mecca was seized by a Saudi religious fanatic, Muhammad Abdallah, 26 years old, a member of the Utayba tribe. He has approx 300 well-armed persons with him, 13 of which have been captured by Saudi authorities.',
          lang: 'en',
          cite: { source: 'frus1977-80v18-doc-201', loc: { section: 'Document 201' } },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/historicaldocuments/frus1977-80v18/d201'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'According to Minister, there is a special religious significance attached to the seizure at this time. As he explained it to me, Muslims generally believe that there will be a second coming of Jesus and some believe that there will be a false Jesus preceding the real Jesus. Still others believe that a Mahdi will appear as a forerunner to both of these events.',
          lang: 'en',
          cite: { source: 'frus1977-80v18-doc-201', loc: { section: 'Document 201' } },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/historicaldocuments/frus1977-80v18/d201'
          }
        },
        {
          id: 'q3',
          text: 'Muhammad Abdallah is well known to the Saudi authorities. He is reported to be 26 years of age and of imposing appearance and personality. He attended sharia school in Riyadh for approx three years but did not finish. He was imprisoned for approx four months because of activities inimical to govt. When released, he returned south to his home tribe.',
          lang: 'en',
          cite: { source: 'frus1977-80v18-doc-201', loc: { section: 'Document 201' } },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/historicaldocuments/frus1977-80v18/d201'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'Following morning prayers on Nov 20, he appeared at the Grand Mosque and told the imam that he was the Mahdi. His followers then seized control putting two guards at each of the 26 doors into the Mosque. Previously, they had been able to bring in trucks loaded with arms and dates for food. In this seizure, armed sentries were sent to the roof of the Mosque and into the minarets.',
          lang: 'en',
          cite: { source: 'frus1977-80v18-doc-201', loc: { section: 'Document 201' } },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/historicaldocuments/frus1977-80v18/d201'
          }
        },
        {
          id: 'q5',
          text: 'Thus there were several thousand (estimated by the Minister to be as many as 40,000–50,000) people in the Mosque at that time.',
          lang: 'en',
          cite: { source: 'frus1977-80v18-doc-201', loc: { section: 'Document 201' } },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/historicaldocuments/frus1977-80v18/d201'
          }
        },
        {
          id: 'q6',
          text: 'The Minister said that last evening 13 of the intruders were captured, one of whom was a Pakistani. The rest were probably members of the Utayba tribe. According to the people who were there, there were a few non-Saudis involved but the great majority were from the Utayba tribe plus some from the Wadi al-Dawasir.',
          lang: 'en',
          cite: { source: 'frus1977-80v18-doc-201', loc: { section: 'Document 201' } },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/historicaldocuments/frus1977-80v18/d201'
          }
        },
        {
          id: 'q7',
          text: 'A small group of gunmen are still believed to be holding out in the labyrinthine basement of the Grand Mosque with an unknown number of hostages.',
          lang: 'en',
          cite: { source: 'frus1977-80v18-doc-204', loc: { section: 'Document 204' } },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/historicaldocuments/frus1977-80v18/d204'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q8',
          text: 'A searching reassessment and re-evaluation of all SAG policy, foreign and domestic, has been triggered by the Mecca affair. The results of this inward and outward look will be reflected in the SAG’s relationship with the United States during 1980.',
          lang: 'en',
          cite: { source: 'frus1977-80v18-doc-206', loc: { section: 'Document 206' } },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/historicaldocuments/frus1977-80v18/d206'
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
            value: { d: '1979-11-20' },
            cites: [
              { source: 'frus1977-80v18-doc-201', loc: { section: 'Document 201' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'The Minister said that just after morning prayers, a young man named Muhammad Abdallah along with some followers variously estimated to number from a minimum of 200 to a maximum of 500 seized the holy Mosque.',
        lang: 'en',
        cite: { source: 'frus1977-80v18-doc-201', loc: { section: 'Document 201' } },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://history.state.gov/historicaldocuments/frus1977-80v18/d201'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1979-11-28' },
            cites: [
              { source: 'frus1977-80v18-doc-204', loc: { section: 'Document 204' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'Occupation of the Grand Mosque, Mecca: Situation Report—The situation in Mecca has apparently not changed appreciably over the last 24 hours.',
        lang: 'en',
        cite: { source: 'frus1977-80v18-doc-204', loc: { section: 'Document 204' } },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://history.state.gov/historicaldocuments/frus1977-80v18/d204'
        }
      }
    }
  ],
  polities: [
    {
      ref: 'polity:saudi-arabia',
      cites: [
        { source: 'frus1977-80v18-doc-201', loc: { section: 'Document 201' } }
      ]
    }
  ],
  furtherReading: [
    { source: 'trofimov-2008-the-siege-of-mecca', perspective: 'american' },
    { source: 'hegghammer-2011-the-meccan-rebellion', perspective: 'european' }
  ]
})
