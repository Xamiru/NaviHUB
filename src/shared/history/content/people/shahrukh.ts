import { definePerson } from '../../schema'

export default definePerson({
  id: 'shahrukh',
  names: [
    { text: 'Shahrukh', lang: 'en', role: 'primary' },
    {
      text: 'Shah Rukh',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1046' } }
      ]
    },
    {
      text: 'Šāhroḵ',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-szuppe-herat-iii',
          loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '18' }
        }
      ]
    },
    { text: 'شاهرخ', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-16',
  born: {
    alts: [
      {
        value: { d: '1377' },
        cites: [
          {
            source: 'loc-name-authority-shah-rukh-mirza',
            loc: { section: 'MARC field 100 $d: heading dates' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1447' },
        cites: [
          {
            source: 'iranica-szuppe-herat-iii',
            loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '18' }
          },
          {
            source: 'iranica-quiring-zoche-aq-qoyunlu',
            loc: { section: 'AQ QOYUNLŪ', para: '10' }
          },
          {
            source: 'iranica-manz-gowhar-sad-aga',
            loc: { section: 'GOWHAR-ŠĀD ĀḠĀ', para: '1' }
          },
          {
            source: 'iranica-yarshater-iran-ii2-islamic-period-page-3',
            loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period (page 3)', para: '25' }
          }
        ]
      },
      {
        value: { d: '1446' },
        cites: [
          { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1046' } },
          {
            source: 'loc-name-authority-shah-rukh-mirza',
            loc: { section: 'MARC field 100 $d: heading dates' }
          }
        ],
        heldBy: [
          { kind: 'organization', name: 'Encyclopædia Britannica (11th edition, 1911)' }
        ]
      }
    ]
  },
  regions: ['iran', 'russia-central-asia'],
  roles: ['monarch'],
  offices: [
    {
      title: 'Governor of Herat',
      polity: 'polity:timurid-empire',
      start: {
        alts: [
          {
            value: { d: '1397' },
            cites: [
              {
                source: 'iranica-szuppe-herat-iii',
                loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '18' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-szuppe-herat-iii',
          loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '18' }
        }
      ]
    },
    {
      title: 'Ruler of the Timurid state',
      polity: 'polity:timurid-empire',
      start: {
        alts: [
          {
            value: { d: '1409' },
            cites: [
              {
                source: 'iranica-manz-gowhar-sad-aga',
                loc: { section: 'GOWHAR-ŠĀD ĀḠĀ', para: '1' }
              }
            ]
          },
          {
            value: { d: '1405' },
            cites: [
              {
                source: 'iranica-yarshater-iran-ii2-islamic-period-page-3',
                loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period (page 3)', para: '25' }
              },
              {
                source: 'iranica-szuppe-herat-iii',
                loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '18' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Ehsan Yarshater', discipline: 'historian' }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1447' },
            cites: [
              {
                source: 'iranica-manz-gowhar-sad-aga',
                loc: { section: 'GOWHAR-ŠĀD ĀḠĀ', para: '1' }
              },
              {
                source: 'iranica-szuppe-herat-iii',
                loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '18' }
              }
            ]
          },
          {
            value: { d: '1446' },
            cites: [
              { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1046' } }
            ],
            heldBy: [
              { kind: 'organization', name: 'Encyclopædia Britannica (11th edition, 1911)' }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-manz-gowhar-sad-aga',
          loc: { section: 'GOWHAR-ŠĀD ĀḠĀ', para: '1' }
        },
        {
          source: 'iranica-yarshater-iran-ii2-islamic-period-page-3',
          loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period (page 3)', para: '25' }
        },
        {
          source: 'iranica-szuppe-herat-iii',
          loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '18' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/19/Shah_Rukh_Makes_a_Triumphal_Entrance_in_Samarkand_in_1394%2C_after_Timur_Names_Him_Governor_of_the_City._Zafarnama_1436_%28Shah_Rukh_detail%29.jpg/1280px-Shah_Rukh_Makes_a_Triumphal_Entrance_in_Samarkand_in_1394%2C_after_Timur_Names_Him_Governor_of_the_City._Zafarnama_1436_%28Shah_Rukh_detail%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Shah_Rukh_Makes_a_Triumphal_Entrance_in_Samarkand_in_1394,_after_Timur_Names_Him_Governor_of_the_City._Zafarnama_1436_(Shah_Rukh_detail).jpg',
    credit: { institution: 'Freer Gallery of Art', creator: '1435–36 artist' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'After the death of Timur, Šāhroḵ consolidated his position as ruler of Khorasan and of the whole Timurid state in the years 1405-09 and remained the Timurid supreme ruler under the title of Mirzā until his death in 1447',
          lang: 'en',
          cite: {
            source: 'iranica-szuppe-herat-iii',
            loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '18' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/herat-iii'
          }
        },
        {
          id: 'q2',
          text: 'Shah Rukh, the fourth son of Timur, reigned for thirty-eight years, and appears to have been a brave, generous, and enlightened monarch.',
          lang: 'en',
          cite: { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1046' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Persia'
          }
        },
        {
          id: 'q3',
          text: 'However, his only surviving son Šāhroḵ (r. 1405-47), a peace-loving, capable, and generous patron of culture and art, was able to hold together a large portion of his father’s empire, that is, Khorasan, Transoxiana, southern Iran, and Iraq.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-iran-ii2-islamic-period-page-3',
            loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period (page 3)', para: '25' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/iran-ii2-islamic-period-page-3'
          }
        }
      ]
    },
    {
      kind: 'later-life',
      quotes: [
        {
          id: 'q4',
          text: 'When Šāhroḵ was ill in 848/1444-45, she made Amir Aḥmad Firuzšāh swear allegiance to ʿAlāʾ-al-Dawla, and according to some',
          lang: 'en',
          cite: {
            source: 'iranica-manz-gowhar-sad-aga',
            loc: { section: 'GOWHAR-ŠĀD ĀḠĀ', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/gowhar-sad-aga'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q5',
          text: 'Sir John Malcolm speaks of the splendour of his court and of his encouragement of science and learning.',
          lang: 'en',
          cite: { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1046' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Persia'
          }
        }
      ]
    }
  ]
})
