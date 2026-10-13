import { definePerson } from '../../schema'

export default definePerson({
  id: 'nader-shah',
  names: [
    { text: 'Nader Shah', lang: 'en', role: 'primary' },
    { text: 'نادرشاه افشار', lang: 'fa', role: 'native', translit: 'Nāder Šāh Afšār' },
    {
      text: 'Nadir Shah',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1087' } },
        {
          source: 'lc-names-n50063254',
          loc: { section: 'Nādir Shāh, Shah of Iran, 1688-1747' }
        }
      ]
    },
    {
      text: 'Ṭahmāsb-qoli',
      lang: 'en',
      role: 'former',
      cites: [
        { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '6' } }
      ]
    },
    {
      text: 'Nāderqoli Beg',
      lang: 'en',
      role: 'former',
      cites: [
        {
          source: 'iranica-bonakdarian-india-afsharid-zand-periods',
          loc: { section: 'INDIA vii. RELATIONS: THE AFSHARID AND ZAND PERIODS', para: '5' }
        }
      ]
    }
  ],
  researched: '2026-10-13',
  born: {
    alts: [
      {
        value: { d: '1688-11' },
        cites: [
          { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '2' } }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1747-06-20' },
        cites: [
          { source: 'iranica-perry-afsharids', loc: { section: 'AFSHARIDS', para: '4' } }
        ],
        heldBy: [
          { kind: 'scholar', name: 'John R. Perry', discipline: 'historian' }
        ]
      },
      {
        value: { d: '1747-06-09' },
        cites: [
          {
            source: 'iranica-balland-afghanistan-political-history',
            loc: { section: 'AFGHANISTAN x. Political History', para: '2' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Daniel Balland', discipline: 'historian' }
        ]
      }
    ]
  },
  regions: ['iran', 'south-asia'],
  roles: ['monarch', 'military'],
  offices: [
    {
      title: 'Regent of Persia',
      polity: 'polity:safavid-iran',
      start: {
        alts: [
          {
            value: { d: '1732-08' },
            cites: [
              {
                source: 'iranica-tucker-nader-shah',
                loc: { section: 'NĀDER SHAH', para: '9' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1736-03-08' },
            cites: [
              {
                source: 'iranica-tucker-nader-shah',
                loc: { section: 'NĀDER SHAH', para: '14' }
              }
            ]
          }
        ]
      },
      cites: [
        { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '9' } },
        { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '14' } }
      ]
    },
    {
      title: 'Shah of Iran',
      polity: 'polity:afsharid-iran',
      start: {
        alts: [
          {
            value: { d: '1736-03-08' },
            cites: [
              {
                source: 'iranica-tucker-nader-shah',
                loc: { section: 'NĀDER SHAH', para: '14' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1747-06-20' },
            cites: [
              { source: 'iranica-perry-afsharids', loc: { section: 'AFSHARIDS', para: '4' } }
            ],
            heldBy: [
              { kind: 'scholar', name: 'John R. Perry', discipline: 'historian' }
            ]
          },
          {
            value: { d: '1747-06-09' },
            cites: [
              {
                source: 'iranica-balland-afghanistan-political-history',
                loc: { section: 'AFGHANISTAN x. Political History', para: '2' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Daniel Balland', discipline: 'historian' }
            ]
          }
        ]
      },
      cites: [
        { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '14' } },
        { source: 'iranica-perry-afsharids', loc: { section: 'AFSHARIDS', para: '4' } }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Contemporary_portrait_of_Nader_Shah._Artist_unknown%2C_created_in_ca._1740_in_Iran.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Contemporary_portrait_of_Nader_Shah._Artist_unknown,_created_in_ca._1740_in_Iran.jpg',
    credit: { institution: 'British Library' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Although Nader Shah achieved political unity, his military campaigns and extortionate taxation proved a terrible drain on a country already ravaged and depopulated by war and disorder, and in 1747 he was murdered by chiefs of his own Afshar tribe.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE SAFAVIDS, 1501-1722', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/iran/11.htm' }
        },
        {
          id: 'q2',
          text: 'Like Tīmūr, Nāder was a restless conqueror who neglected to lay firm administrative foundations for his far-flung ambitions.',
          lang: 'en',
          cite: { source: 'iranica-perry-afsharids', loc: { section: 'AFSHARIDS', para: '2' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/afsharids'
          }
        },
        {
          id: 'q3',
          text: 'Nāder’s troops assassinated him in 1747, after he had come to be regarded as a cruel and capricious tyrant.',
          lang: 'en',
          cite: { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/nader-shah'
          }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q4',
          text: 'Born in November 1688 into a humble pastoral family, then at its winter camp in Darra Gaz in the mountains north of Mashad, Nāder belonged to a group of the Qirqlu branch of the Afšār Turkmen.',
          lang: 'en',
          cite: { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '2' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/nader-shah'
          }
        },
        {
          id: 'q5',
          text: 'In the mid 1720s, Nāder played an important role in defeating Malek Maḥmud Sistāni, one of that area’s main warlords, who had set himself up as the scion of the 9th-10th century Saffarid dynasty.',
          lang: 'en',
          cite: { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '5' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/nader-shah'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q6',
          text: 'With this promotion, Nāder assumed the title Ṭahmāsb-qoli (servant of Ṭahmāsb).',
          lang: 'en',
          cite: { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '6' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/nader-shah'
          }
        },
        {
          id: 'q7',
          text: 'Now regent, Nāder resumed hostilities against the Ottomans.',
          lang: 'en',
          cite: { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '9' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/nader-shah'
          }
        },
        {
          id: 'q8',
          text: 'By the end of 1735, Nāder felt that he had gained enough prestige through a series of victories and had secured the immediate military situation well enough to assume the throne himself.',
          lang: 'en',
          cite: { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '12' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/nader-shah'
          }
        },
        {
          id: 'q9',
          text: 'After laying siege to Qandahar for almost a year, Nāder destroyed it in 1738—the last redoubt of the Ḡilzi, who were led by Shah Ḥosayn Solṭān, the brother of Shah Maḥmud, who had been the first Ḡilzay to rule Persia (1722-1725).',
          lang: 'en',
          cite: { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '22' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/nader-shah'
          }
        },
        {
          id: 'q10',
          text: 'After a successful offensive that culminated in the final defeat of the Mughal forces at the battle of Karnāl near Delhi in February 1739, Nāder made the Mughal emperor Moḥammad Šāh (r. 1719-48) his vassal and divested him of a large part of his fabulous riches, including the Peacock Throne and the Koh-i-Noor diamond.',
          lang: 'en',
          cite: { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '24' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/nader-shah'
          }
        },
        {
          id: 'q11',
          text: 'In June 1744, Nāder sacked Shiraz, and by winter he had crushed these revolts.',
          lang: 'en',
          cite: { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '29' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/nader-shah'
          }
        }
      ]
    },
    {
      kind: 'ideas',
      quotes: [
        {
          id: 'q12',
          text: 'Nāder tried to redefine religious and political legitimacy in Persia at symbolic and substantive levels.',
          lang: 'en',
          cite: { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '15' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/nader-shah'
          }
        },
        {
          id: 'q13',
          text: 'Nāder departed substantially from Safavid precedent by redefining Shiʿism as the Jaʿfari maḏhab of Sunni Islam and promoting the common Turkmen descent of the contemporary Muslim rulers as a basis for international relations.',
          lang: 'en',
          cite: { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '17' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/nader-shah'
          }
        }
      ]
    },
    {
      kind: 'later-life',
      quotes: [
        {
          id: 'q14',
          text: 'In 1741, an attempt was made on Nāder’s life near Darband.',
          lang: 'en',
          cite: { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '27' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/nader-shah'
          }
        },
        {
          id: 'q15',
          text: 'Marvi reported that Nāder began to manifest signs of physical deterioration and mental instability.',
          lang: 'en',
          cite: { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '27' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/nader-shah'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q16',
          text: 'In June 1747, a cabal of Afšār and Qajar officers succeeded in killing Nāder.',
          lang: 'en',
          cite: { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '31' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/nader-shah'
          }
        },
        {
          id: 'q17',
          text: 'The last years of Nadir’s life were full of internal trouble.',
          lang: 'en',
          cite: { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1100' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Persia'
          }
        }
      ]
    }
  ]
})
