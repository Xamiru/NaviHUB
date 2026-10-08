import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'anglo-persian-definitive-treaty',
  names: [
    { text: 'Anglo-Persian Definitive Treaty', lang: 'en', role: 'primary' },
    { text: 'عهدنامه مفصل ایران و انگلیس', lang: 'fa', role: 'native' },
    {
      text: 'Definitive Treaty of Friendship and Alliance',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-daniel-golestan-treaty',
          loc: { section: 'GOLESTĀN TREATY', para: '4' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'treaty',
  start: {
    alts: [
      {
        value: { d: '1812-03' },
        cites: [
          { source: 'iranica-avery-ouseley', loc: { section: 'OUSELEY, Gore', para: '4' } }
        ]
      },
      {
        value: { d: '1814' },
        cites: [
          {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '7'
            }
          },
          {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '9'
            }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'europe'],
  prominence: 2,
  places: [
    { ref: 'place:tehran' }
  ],
  partOf: [
    { ref: 'period:qajar-dynasty' }
  ],
  polities: [
    { ref: 'polity:united-kingdom' },
    { ref: 'polity:qajar-iran' }
  ],
  participants: [
    {
      ref: 'person:gore-ouseley',
      role: 'negotiator',
      cites: [
        {
          source: 'iranica-amanat-great-britain-ii',
          loc: {
            section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
            para: '9'
          }
        }
      ]
    },
    {
      ref: 'person:fath-ali-shah-qajar',
      role: 'head-of-state',
      cites: [
        {
          source: 'iranica-amanat-fath-ali-shah',
          loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '19' }
        }
      ]
    },
    {
      ref: 'person:abul-hasan-khan-ilchi',
      role: 'diplomat',
      cites: [
        {
          source: 'iranica-daniel-golestan-treaty',
          loc: { section: 'GOLESTĀN TREATY', para: '4' }
        }
      ]
    },
    {
      name: 'Mirzā Šafiʿ ʿAliābādi',
      role: 'participant',
      cites: [
        {
          source: 'iranica-amanat-great-britain-ii',
          loc: {
            section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
            para: '7'
          }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:treaty-of-golestan', rel: 'related' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q3',
          text: 'The arrival of three British diplomatic missions in Tehran between 1808-1811: Harford Jones, John Malcolm, and Gore Ouseley, immediately after the dismissal of General Gardane (see gardane mission) and the French withdrawal, reflected the urgency that both London and Calcutta attached to the Persian alliance, primarily out of concern for a recurring French threat. The renewed relations ultimately lead to the 1814 Anglo-Persian Definitive Treaty, which obliged Persia to cancel all treaties with other European powers hostile to England and exclude their armies from entering Persia in exchange for British military and monetary aid to the tune of 150,000 Pounds Sterling annually in case of a European threat',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '7'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/great-britain-ii/'
          }
        },
        {
          id: 'q1',
          text: 'Ouseley’s influence within the Qajar state eventually led to the conclusion of the Definitive Treaty of 1814 based on the Preliminary Agreement negotiated by Jones.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '9'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/great-britain-ii/'
          }
        },
        {
          id: 'q2',
          text: 'It guaranteed British military assistance and a subsidy of 200,000 tumāns in the event of war with a European power in exchange for Persia barring any European force from the use of the Persian territory to attack India (Hurewitz, pp., 199-201).',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '9'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/great-britain-ii/'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q4',
          text: 'Anglo-Persian relations warmed even further with the visit of Abu’l-Ḥasan Khan (q.v.) to London in 1809 and his return to Persia with Gore Ouseley as ambassador and minister plenipotentiary in 1810.',
          lang: 'en',
          cite: {
            source: 'iranica-daniel-golestan-treaty',
            loc: { section: 'GOLESTĀN TREATY', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/golestan-treaty/'
          }
        },
        {
          id: 'q5',
          text: 'Under Ouseley’s auspices, the preliminary treaty was converted into the Definitive Treaty of Friendship and Alliance in 1812, which confirmed the earlier promises of military assistance',
          lang: 'en',
          cite: {
            source: 'iranica-daniel-golestan-treaty',
            loc: { section: 'GOLESTĀN TREATY', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/golestan-treaty/'
          }
        },
        {
          id: 'q6',
          text: 'Ouseley’s diplomatic activity (Wright, 1977, pp. 12-15; idem, 1986, pp. 61-63) is marked by the conclusion of the Anglo-Iranian Treaty in March 1812, though this version was never ratified',
          lang: 'en',
          cite: { source: 'iranica-avery-ouseley', loc: { section: 'OUSELEY, Gore', para: '4' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/ouseley-sir-gore/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q7',
          text: 'In reality, British commitment to the defense of Persia weakened as the Napoleonic threat subsided and as an understanding was subsequently reached with Russia over Persia.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '9'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/great-britain-ii/'
          }
        },
        {
          id: 'q8',
          text: 'The refusal to pay the promised subsidy during the second round of the Perso-Russian wars and in later years, cast a dark sha-dow over the relations between the two countries which continued into the reign of Moḥammad Shah (1834-48).',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '9'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/great-britain-ii/'
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
            value: { d: '1811-11-10' },
            cites: [
              {
                source: 'iranica-amanat-fath-ali-shah',
                loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '18' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'Furthermore, by dispatching Mīrzā Abu’l-Ḥasan Khan Īlčī Šīrāzī (q.v.), the shah reasserted his demands in London and in exchange received another British envoy extraordinary, Sir Gore Ouseley, who arrived in Tehran on 10 November 1811 with the special assignment of finalizing the second Anglo-Persian treaty and facilitating peace between Russia and Persia',
        lang: 'en',
        cite: {
          source: 'iranica-amanat-fath-ali-shah',
          loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '18' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/fath-ali-shah'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8b/Sir_Gore_Ouseley%2C_PA06227.jpg/1280px-Sir_Gore_Ouseley%2C_PA06227.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Sir_Gore_Ouseley,_PA06227.jpg',
    credit: { institution: 'KU Leuven Libraries', creator: 'Henry Richard Cook' },
    license: { id: 'public-domain' }
  },
  archive: [
    {
      id: 'morier-1818',
      mediaKind: 'document',
      title: 'A second journey through Persia, Armenia, and Asia Minor, to Constantinople, between the years 1810 and 1816',
      date: { d: '1818' },
      url: 'https://archive.org/download/secondjourneythr00mori/secondjourneythr00mori.pdf',
      page: 'https://archive.org/details/secondjourneythr00mori',
      credit: {
        institution: 'Smithsonian Libraries (Internet Archive)',
        creator: 'James Justinian Morier'
      },
      license: { id: 'public-domain' },
      bytes: 55646379
    }
  ],
  furtherReading: [
    {
      source: 'mahmud-1949-tarikh-e-ravabet-e-siyasi-ye-iran-va-engelis',
      perspective: 'iranian'
    },
    { source: 'nafisi-1965-tarikh-e-ejtemai-va-siyasi-ye-iran', perspective: 'iranian' }
  ]
})
