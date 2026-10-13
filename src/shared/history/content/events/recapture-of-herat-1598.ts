import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'recapture-of-herat-1598',
  names: [
    { text: 'Recapture of Herat', lang: 'en', role: 'primary' },
    {
      text: 'Battle of Rebāṭ-e Parīān',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-savory-allahverdi-khan',
          loc: { section: 'ALLĀHVERDĪ KHAN (1)', para: '2' }
        }
      ]
    }
  ],
  researched: '2026-10-13',
  type: 'battle',
  start: {
    alts: [
      {
        value: { d: '1598-08' },
        cites: [
          { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '12' } },
          {
            source: 'iranica-savory-allahverdi-khan',
            loc: { section: 'ALLĀHVERDĪ KHAN (1)', para: '2' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'russia-central-asia'],
  prominence: 3,
  places: [
    {
      ref: 'place:herat',
      cites: [
        { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '12' } }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:safavid-iran',
      cites: [
        { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '12' } }
      ]
    },
    {
      ref: 'polity:khanate-of-bukhara',
      cites: [
        {
          source: 'iranica-bregel-abul-khayrids',
          loc: { section: 'ABU’L-KHAYRIDS', para: '7' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'safavid',
      name: 'Safavids',
      polity: 'polity:safavid-iran',
      cites: [
        { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '12' } }
      ]
    },
    {
      key: 'uzbek',
      name: 'Uzbeks',
      polity: 'polity:khanate-of-bukhara',
      cites: [
        { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '12' } }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:abbas-i',
      role: 'commander',
      side: 'safavid',
      cites: [
        { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '12' } }
      ]
    },
    {
      ref: 'person:allahverdi-khan',
      role: 'commander',
      side: 'safavid',
      cites: [
        {
          source: 'iranica-savory-allahverdi-khan',
          loc: { section: 'ALLĀHVERDĪ KHAN (1)', para: '2' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:transfer-of-the-capital-to-isfahan',
      rel: 'contributed-to',
      cites: [
        { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '13' } }
      ]
    },
    {
      ref: 'event:battle-of-jam-1528',
      rel: 'followed-by',
      cites: [
        {
          source: 'iranica-bregel-abul-khayrids',
          loc: { section: 'ABU’L-KHAYRIDS', para: '7' }
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
          text: 'Allāhverdī Khan distinguished himself in action in Shah ʿAbbās’s great victory over the Uzbeks at Rebāṭ-e Parīān in Moḥarram, 1007/August, 1598, a victory which led to the recovery of Herat after ten years of Uzbek occupation.',
          lang: 'en',
          cite: {
            source: 'iranica-savory-allahverdi-khan',
            loc: { section: 'ALLĀHVERDĪ KHAN (1)', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/allahverdi-khan-d-1'
          }
        },
        {
          id: 'q2',
          text: 'Shah ʿAbbās took the offensive, routed the Uzbeks in Moḥarram, 1007/August, 1598, and recaptured Herat, which had been in enemy hands for ten years.',
          lang: 'en',
          cite: { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '12' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/abbas-i'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q4',
          text: 'Within a short time after his accession Shah ʿAbbās had demonstrated his determination to rule de facto as well as de jure, but time was needed to build up the army sufficiently to be able to take the offensive against the archenemies of the Safavid state, the Uzbeks in the east and the Ottomans in the west.',
          lang: 'en',
          cite: { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '12' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/abbas-i'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q6',
          text: 'Only the interference of the ulema prevented an open war between the father and the son, but the Qazaqs used the opportunity of this feud and invaded Transoxania in 1006/1598.',
          lang: 'en',
          cite: {
            source: 'iranica-bregel-abul-khayrids',
            loc: { section: 'ABU’L-KHAYRIDS', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/abul-khayrids-dynasty'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q7',
          text: 'Turning his attention to the Uzbeks, the new ruler recaptured Mashad and Herat.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '31' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        },
        {
          id: 'q8',
          text: 'The Abu’l-Khayrid dynasty in Bukhara was extinguished and replaced by a new dynasty of the Ashtarkhanids, or Janids, in 1007/1599.',
          lang: 'en',
          cite: {
            source: 'iranica-bregel-abul-khayrids',
            loc: { section: 'ABU’L-KHAYRIDS', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/abul-khayrids-dynasty'
          }
        },
        {
          id: 'q9',
          text: 'Shortly after this battle, Allāhverdī Khan, on orders from the shah, executed the qizilbāš amir Farhād Khan Qarāmānlū who, like Moršed-qolī Khan Ostāǰlū before him, had grown too powerful and was suspected of plotting against the shah',
          lang: 'en',
          cite: {
            source: 'iranica-savory-allahverdi-khan',
            loc: { section: 'ALLĀHVERDĪ KHAN (1)', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/allahverdi-khan-d-1'
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
            value: { d: '1588' },
            cites: [
              {
                source: 'iranica-bregel-abul-khayrids',
                loc: { section: 'ABU’L-KHAYRIDS', para: '7' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'The Khorasan campaign began with the conquest of Herat in 996/1588.',
        lang: 'en',
        cite: {
          source: 'iranica-bregel-abul-khayrids',
          loc: { section: 'ABU’L-KHAYRIDS', para: '7' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/abul-khayrids-dynasty'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1598' },
            cites: [
              { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '12' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'In 1006/1598 the brilliant Uzbek leader ʿAbdallāh Khan died, and the dynasty was weakened by internal contention.',
        lang: 'en',
        cite: { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '12' } },
        provenance: { via: 'web', at: '2026-10-13', url: 'https://www.iranicaonline.org/articles/abbas-i' }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2d/Sunlight_filters_through_a_corridor_of_the_Citadel_of_Herat_in_Herat%2C_Afghanistan%2C_Dec_111231-F-WU507-178.jpg/1280px-Sunlight_filters_through_a_corridor_of_the_Citadel_of_Herat_in_Herat%2C_Afghanistan%2C_Dec_111231-F-WU507-178.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Sunlight_filters_through_a_corridor_of_the_Citadel_of_Herat_in_Herat,_Afghanistan,_Dec_111231-F-WU507-178.jpg',
    credit: { creator: 'MSgt Kevin Wallace' },
    license: { id: 'public-domain' }
  }
})
