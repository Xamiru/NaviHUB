import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'assassination-of-nader-shah',
  names: [
    { text: 'Assassination of Nader Shah', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-13',
  type: 'assassination',
  start: {
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
  regions: ['iran'],
  prominence: 2,
  polities: [
    {
      ref: 'polity:afsharid-iran',
      cites: [
        { source: 'iranica-perry-afsharids', loc: { section: 'AFSHARIDS', para: '1' } }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:nader-shah',
      role: 'victim',
      cites: [
        { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '31' } }
      ]
    },
    {
      name: 'Salah Bey',
      role: 'perpetrator',
      cites: [
        { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1100' } }
      ]
    },
    {
      name: 'ʿAli-qoli',
      role: 'participant',
      cites: [
        { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '31' } }
      ]
    }
  ],
  related: [
    {
      ref: 'event:founding-of-the-durrani-empire',
      rel: 'led-to',
      cites: [
        { source: 'iranica-balland-dorrani', loc: { section: 'DORRĀNĪ', para: '7' } }
      ]
    },
    {
      ref: 'event:karim-khan-zands-regency',
      rel: 'led-to',
      cites: [
        {
          source: 'iranica-perry-karim-khan-zand',
          loc: { section: 'KARIM KHAN ZAND', para: '1' }
        }
      ]
    },
    {
      ref: 'event:treaty-of-kordan-1746',
      rel: 'preceded-by',
      cites: [
        {
          source: 'iranica-tucker-ottoman-persian-relations-afsharid-zand',
          loc: { section: 'OTTOMAN-PERSIAN RELATIONS ii. AFSHARID AND ZAND PERIODS', para: '18' }
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
          id: 'q2',
          text: 'Although Nāder was assassinated soon after this treaty was drawn up, its basic terms remained in effect even during later episodes of renewed conflict.',
          lang: 'en',
          cite: {
            source: 'iranica-tucker-ottoman-persian-relations-afsharid-zand',
            loc: { section: 'OTTOMAN-PERSIAN RELATIONS ii. AFSHARID AND ZAND PERIODS', para: '18' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/ottoman-persian-relations-ii'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'The last years of Nadir’s life were full of internal trouble.',
          lang: 'en',
          cite: { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1100' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Persia'
          }
        },
        {
          id: 'q4',
          text: 'On the part of the sovereign, murders and executions; on that of his subjects, revolt and conspiracy.',
          lang: 'en',
          cite: { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1100' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Persia'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'The succession struggle embroiled Persia in civil war for the next five years.',
          lang: 'en',
          cite: { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '31' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/nader-shah'
          }
        },
        {
          id: 'q6',
          text: 'A period of anarchy and a struggle for supremacy among Afshar, Qajar, Afghan, and Zand tribal chieftains followed Nader Shah\'s death.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE SAFAVIDS, 1501-1722', para: '9' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/iran/11.htm' }
        },
        {
          id: 'q7',
          text: 'At Nāder Shah’s death they felt strong enough to proclaim their independence.',
          lang: 'en',
          cite: { source: 'iranica-balland-dorrani', loc: { section: 'DORRĀNĪ', para: '7' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/dorrani-1'
          }
        },
        {
          id: 'q8',
          text: 'The remaining parts of Nāder’s empire were now the sphere of the Zand dynasty in western Iran, and the Dorrānī dynasty of Afghanistan.',
          lang: 'en',
          cite: { source: 'iranica-perry-afsharids', loc: { section: 'AFSHARIDS', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/afsharids'
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
            value: { d: '1741' },
            cites: [
              {
                source: 'iranica-tucker-nader-shah',
                loc: { section: 'NĀDER SHAH', para: '27' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'In 1741, an attempt was made on Nāder’s life near Darband.',
        lang: 'en',
        cite: { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '27' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/nader-shah'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1744-06' },
            cites: [
              {
                source: 'iranica-tucker-nader-shah',
                loc: { section: 'NĀDER SHAH', para: '29' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'In June 1744, Nāder sacked Shiraz, and by winter he had crushed these revolts.',
        lang: 'en',
        cite: { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '29' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/nader-shah'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1746' },
            cites: [
              {
                source: 'iranica-tucker-nader-shah',
                loc: { section: 'NĀDER SHAH', para: '30' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'Nāder had spent the winter and spring of 1746 in Mashad, where he formulated a strategy to suppress the plethora of internal revolts.',
        lang: 'en',
        cite: { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '30' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/nader-shah'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1747-06' },
            cites: [
              {
                source: 'iranica-tucker-nader-shah',
                loc: { section: 'NĀDER SHAH', para: '31' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'Nāder’s troops assassinated him in 1747, after he had come to be regarded as a cruel and capricious tyrant.',
        lang: 'en',
        cite: { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '1' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/nader-shah'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1747-07' },
            cites: [
              {
                source: 'iranica-tucker-nader-shah',
                loc: { section: 'NĀDER SHAH', para: '31' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'Two months before the assassination, Nāder’s nephew ʿAli-qoli, son of his brother Ebrāhim (d. 1738), had risen in revolt, and in July he followed his uncle on the throne as ʿĀdel Shah (r. 1747-48).',
        lang: 'en',
        cite: { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '31' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/nader-shah'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cf/Nader_Shah_grave.jpg/1280px-Nader_Shah_grave.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Nader_Shah_grave.jpg',
    credit: { creator: 'Ayazsa' },
    license: { id: 'cc-by', version: '4.0', url: 'https://creativecommons.org/licenses/by/4.0' }
  }
})
