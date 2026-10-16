import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'rise-of-timur',
  names: [
    { text: 'Rise of Timur', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-16',
  type: 'founding',
  start: {
    alts: [
      {
        value: { d: '1370' },
        cites: [
          {
            source: 'iranica-szuppe-herat-iii',
            loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '17' }
          },
          {
            source: 'iranica-manz-dunaway-clavijo',
            loc: { section: 'CLAVIJO, RUY GONZÁLEZ DE', para: '1' }
          },
          {
            source: 'iranica-perry-deportations-iii',
            loc: { section: 'DEPORTATIONS iii. In the Islamic period', para: '15' }
          }
        ]
      },
      {
        value: { d: '1369' },
        cites: [
          { source: 'britannica-1911-timur', loc: { section: 'TIMŪR', para: '3' } }
        ],
        heldBy: [
          { kind: 'organization', name: 'Encyclopædia Britannica (11th edition, 1911)' }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1381' },
        cites: [
          {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'Invasions of the Mongols and Tamerlane', para: '5' }
          }
        ]
      }
    ]
  },
  regions: ['russia-central-asia', 'iran'],
  prominence: 1,
  places: [
    {
      ref: 'place:balkh',
      cites: [
        { source: 'britannica-1911-timur', loc: { section: 'TIMŪR', para: '3' } },
        {
          source: 'iranica-fourniau-balk-iii',
          loc: { section: 'BALḴ iii. From the Mongols to Modern Times', para: '4' }
        }
      ]
    },
    {
      ref: 'place:samarkand',
      cites: [
        {
          source: 'iranica-grenet-samarqand-i',
          loc: { section: 'SAMARQAND i. HISTORY AND ARCHAEOLOGY', para: '11' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:timurid-empire',
      cites: [
        {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'Mongol Rule, 1220-1506', para: '2' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:timur',
      role: 'leader',
      cites: [
        { source: 'britannica-1911-timur', loc: { section: 'TIMŪR', para: '3' } }
      ]
    }
  ],
  related: [
    { ref: 'event:timurs-conquest-of-iran', rel: 'followed-by' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Timur belonged to a clan of the Chaghatayid Mongols that had been Turkified, and, in the chaotic and war-torn situation that prevailed in Central Asia in the mid-fourteenth century as a result of the decay of the Chaghatayid power, he was able to establish a military presence there, eventually becoming the master of Transoxiana.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-iran-ii2-islamic-period-page-3',
            loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period (page 3)', para: '23' }
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
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'In the early fourteenth century, however, as the empire began to break up into its constituent parts, the Chaghatai territory also was disrupted as the princes of various tribal groups competed for influence.',
          lang: 'en',
          cite: { source: 'loc-uzbekistan-country-study-1996', loc: { section: 'Timur', para: '2' } },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/uzbekistan/5.htm' }
        },
        {
          id: 'q5',
          text: 'After the murder of Kurgan the contentions which arose among the many claimants to sovereign power were arrested by the invasion of Toghluk Timūr of Kashgar, a descendant of Jenghiz.',
          lang: 'en',
          cite: { source: 'britannica-1911-timur', loc: { section: 'TIMŪR', para: '3' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Tim%C5%ABr'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q9',
          text: 'Unlike Chengiz, Timur was not a capable administrator, being interested only in conquest and collection of booty; nor did he have any viziers or counselors of note.',
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
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1369' },
            cites: [
              { source: 'britannica-1911-timur', loc: { section: 'TIMŪR', para: '3' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'At the close of 1369 Hosain was assassinated and Timūr, having been formally proclaimed sovereign at Balkh, mounted the throne at Samarkand, the capital of his dominions.',
        lang: 'en',
        cite: { source: 'britannica-1911-timur', loc: { section: 'TIMŪR', para: '3' } },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Tim%C5%ABr'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1371' },
            cites: [
              {
                source: 'iranica-grenet-samarqand-i',
                loc: { section: 'SAMARQAND i. HISTORY AND ARCHAEOLOGY', para: '11' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'In 1371, Timur chose Samarqand as his capital and immediately had the new site fortified by a new wall and a citadel in its western part, containing the Kok Sarāy, a palace used only for ceremonies',
        lang: 'en',
        cite: {
          source: 'iranica-grenet-samarqand-i',
          loc: { section: 'SAMARQAND i. HISTORY AND ARCHAEOLOGY', para: '11' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://www.iranicaonline.org/articles/samarqand-i'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1381' },
            cites: [
              {
                source: 'loc-iran-country-study-1987',
                loc: { section: 'Invasions of the Mongols and Tamerlane', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'Tamerlane, variously described as of Mongol or Turkic origin, was the next ruler to achieve emperor status. He conquered Transoxiana proper and by 1381 established himself as sovereign.',
        lang: 'en',
        cite: {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'Invasions of the Mongols and Tamerlane', para: '5' }
        },
        provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/iran/10.htm' }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e8/Timur_grants_an_audience_on_the_occasion_of_his_accession_to_the_throne_at_Balkh%2C_on_9_April_1370._Zafarnama_of_Ibrahim_Sultan%2C_Timurid_Shiraz%2C_1436._Frontispiece._Facing_folios_129r-128vjpg.jpg/1280px-thumbnail.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Timur_grants_an_audience_on_the_occasion_of_his_accession_to_the_throne_at_Balkh,_on_9_April_1370._Zafarnama_of_Ibrahim_Sultan,_Timurid_Shiraz,_1436._Frontispiece._Facing_folios_129r-128vjpg.jpg',
    credit: { institution: 'Smithsonian Institution', creator: '1435–36 artist' },
    license: { id: 'public-domain' }
  }
})
