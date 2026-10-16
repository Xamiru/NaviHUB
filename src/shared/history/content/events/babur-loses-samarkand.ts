import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'babur-loses-samarkand',
  names: [
    { text: 'Babur loses Samarkand', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-16',
  type: 'other',
  start: {
    alts: [
      {
        value: { d: '1501' },
        cites: [
          { source: 'britannica-1911-baber', loc: { section: 'Baber', para: '1' } },
          {
            source: 'iranica-lehmann-babor',
            loc: { section: 'BĀBOR, ẒAHĪR-AL-DĪN MOḤAMMAD', para: '4' }
          }
        ]
      }
    ]
  },
  regions: ['russia-central-asia'],
  prominence: 3,
  places: [
    {
      ref: 'place:samarkand',
      cites: [
        { source: 'britannica-1911-baber', loc: { section: 'Baber', para: '1' } }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:khanate-of-bukhara',
      cites: [
        { source: 'britannica-1911-baber', loc: { section: 'Baber', para: '1' } }
      ]
    },
    {
      ref: 'polity:timurid-empire',
      cites: [
        { source: 'britannica-1911-baber', loc: { section: 'Baber', para: '1' } }
      ]
    }
  ],
  sides: [
    {
      key: 'uzbeks',
      name: 'Uzbeks',
      polity: 'polity:khanate-of-bukhara',
      cites: [
        { source: 'britannica-1911-baber', loc: { section: 'Baber', para: '1' } }
      ]
    },
    {
      key: 'timurids',
      name: 'Timurids',
      polity: 'polity:timurid-empire',
      cites: [
        {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'Mughal-Safavid Rivalry, ca. 1500-1747', para: '1' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:babur',
      role: 'commander',
      side: 'timurids',
      cites: [
        { source: 'britannica-1911-baber', loc: { section: 'Baber', para: '1' } }
      ]
    },
    {
      ref: 'person:muhammad-shaybani',
      role: 'commander',
      side: 'uzbeks',
      cites: [
        { source: 'britannica-1911-baber', loc: { section: 'Baber', para: '1' } }
      ]
    }
  ],
  related: [
    { ref: 'event:rise-of-muhammad-shaybani', rel: 'related' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Early in the sixteenth century, Babur, who was descended from Timur on his father\'s side and from Genghis Khan on his mother\'s, was driven out of his father\'s kingdom in the Ferghana Valley (which straddles contemporary Uzbekistan, Tajikistan and Kyrgyzstan) by the Shaybani Uzbeks, who had wrested Samarkand from the Timurids.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'Mughal-Safavid Rivalry, ca. 1500-1747', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/afghanistan/10.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'Bābor’s father, ʿOmar Šayḵ Mīrzā (d. 899/1494), ruled the kingdom of Farḡāna along the headwaters of the Syr Darya, but as one of four brothers, direct fifth-generation descendants from the great Tīmūr, he entertained larger ambitions.',
          lang: 'en',
          cite: {
            source: 'iranica-lehmann-babor',
            loc: { section: 'BĀBOR, ẒAHĪR-AL-DĪN MOḤAMMAD', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/babor-zahir-al-din'
          }
        },
        {
          id: 'q3',
          text: 'Bābor presumed that his descent from Tīmūr legitimized his claim to rule anywhere that Tīmūr had conquered, but like his father, the first prize he sought was Samarqand.',
          lang: 'en',
          cite: {
            source: 'iranica-lehmann-babor',
            loc: { section: 'BĀBOR, ẒAHĪR-AL-DĪN MOḤAMMAD', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/babor-zahir-al-din'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q4',
          text: 'Bābor, alone among the Timurids of his generation, opted to leave the Central Asian arena, in which he had lost everything, to seek a power base elsewhere, perhaps with the intention of returning to his homeland at a later date.',
          lang: 'en',
          cite: {
            source: 'iranica-lehmann-babor',
            loc: { section: 'BĀBOR, ẒAHĪR-AL-DĪN MOḤAMMAD', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/babor-zahir-al-din'
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
            value: { d: '1501' },
            cites: [
              { source: 'britannica-1911-baber', loc: { section: 'Baber', para: '1' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q5',
        text: 'After some reverses he regained both these places, but in 1501 his most formidable enemy, Shaibani (Sheibani) Khan, ruler of the Uzbegs, defeated him in a great engagement and drove him from Samarkand.',
        lang: 'en',
        cite: { source: 'britannica-1911-baber', loc: { section: 'Baber', para: '1' } },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Baber'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1504' },
            cites: [
              {
                source: 'iranica-lehmann-babor',
                loc: { section: 'BĀBOR, ẒAHĪR-AL-DĪN MOḤAMMAD', para: '4' }
              },
              {
                source: 'loc-afghanistan-country-study-2001',
                loc: { section: 'Mughal-Safavid Rivalry, ca. 1500-1747', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q6',
        text: 'After several unsuccessful attempts to regain Ferghana and Samarkand, Babur crossed the Amu Darya and captured Kabul from the last of its Mongol rulers in 1504.',
        lang: 'en',
        cite: {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'Mughal-Safavid Rivalry, ca. 1500-1747', para: '1' }
        },
        provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/afghanistan/10.htm' }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c2/Battle_of_Babur_with_Shaibaq_Khan_in_May_1509._Artist_Haydar_Kashmiri%2C_Mughal_period._First_Baburnama%2C_circa_1589.jpg/1280px-Battle_of_Babur_with_Shaibaq_Khan_in_May_1509._Artist_Haydar_Kashmiri%2C_Mughal_period._First_Baburnama%2C_circa_1589.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Battle_of_Babur_with_Shaibaq_Khan_in_May_1509._Artist_Haydar_Kashmiri,_Mughal_period._First_Baburnama,_circa_1589.jpg',
    credit: { creator: 'Haydar Kashmiri', institution: 'Christie\'s' },
    license: { id: 'public-domain' }
  }
})
