import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'nader-shahs-coronation-1736',
  names: [
    { text: 'Nader Shah’s coronation', lang: 'en', role: 'primary' },
    {
      text: 'Mughan assembly',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '12' } }
      ]
    }
  ],
  researched: '2026-10-13',
  type: 'founding',
  start: {
    alts: [
      {
        value: { d: '1736-02' },
        cites: [
          { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '12' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1736-03-08' },
        cites: [
          { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '14' } }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 2,
  places: [
    {
      ref: 'place:mughan-steppe',
      cites: [
        { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '12' } }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:afsharid-iran',
      cites: [
        { source: 'iranica-perry-afsharids', loc: { section: 'AFSHARIDS', para: '1' } }
      ]
    },
    {
      ref: 'polity:safavid-iran',
      cites: [
        { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '12' } }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:nader-shah',
      role: 'leader',
      cites: [
        { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '12' } }
      ]
    },
    {
      name: 'Ottoman ambassador',
      role: 'diplomat',
      cites: [
        {
          source: 'iranica-tucker-ottoman-persian-relations-afsharid-zand',
          loc: { section: 'OTTOMAN-PERSIAN RELATIONS ii. AFSHARID AND ZAND PERIODS', para: '9' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:treaty-of-ganja-1735',
      rel: 'preceded-by',
      cites: [
        { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '11' } }
      ]
    },
    {
      ref: 'event:nader-shahs-invasion-of-india',
      rel: 'followed-by',
      cites: [
        { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '23' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
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
          id: 'q2',
          text: 'All those present at Moḡān were required to sign a document indicating their agreement with Nāder’s ideas.',
          lang: 'en',
          cite: { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '13' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/nader-shah'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'When Nāder learned that Ṭahmāsb had relinquished substantial territory to the Ottomans, he quickly returned to Isfahan.',
          lang: 'en',
          cite: { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '9' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/nader-shah'
          }
        },
        {
          id: 'q4',
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
          id: 'q5',
          text: 'Russia and Persia then signed a defensive alliance in March 1735 at Ganja.',
          lang: 'en',
          cite: { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '11' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/nader-shah'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'During this negotiation and subsequent ones, the Ottomans rejected all proposals related to Nāder’s Jaʿfari maḏhab concept but ultimately agreed to Nāder’s demands concerning recognition of a Persian amir al-ḥajj, exchange of ambassadors, and that of prisoners of war.',
          lang: 'en',
          cite: { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '16' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/nader-shah'
          }
        },
        {
          id: 'q7',
          text: 'The actual discussion of this proposal largely consisted of the two delegations talking past each other, and no agreement could be reached.',
          lang: 'en',
          cite: {
            source: 'iranica-tucker-ottoman-persian-relations-afsharid-zand',
            loc: { section: 'OTTOMAN-PERSIAN RELATIONS ii. AFSHARID AND ZAND PERIODS', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/ottoman-persian-relations-ii'
          }
        },
        {
          id: 'q8',
          text: 'The Ottoman responses to Nāder’s proposals revealed some willingness to put the relationship with Persia on a new footing.',
          lang: 'en',
          cite: {
            source: 'iranica-tucker-ottoman-persian-relations-afsharid-zand',
            loc: { section: 'OTTOMAN-PERSIAN RELATIONS ii. AFSHARID AND ZAND PERIODS', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/ottoman-persian-relations-ii'
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
            value: { d: '1735-03' },
            cites: [
              {
                source: 'iranica-tucker-nader-shah',
                loc: { section: 'NĀDER SHAH', para: '11' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'In the treaty, the Russians agreed to return most of the territory conquered in the 1720s.',
        lang: 'en',
        cite: { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '11' } },
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
            value: { d: '1736-02' },
            cites: [
              {
                source: 'iranica-tucker-nader-shah',
                loc: { section: 'NĀDER SHAH', para: '12' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'In Feburary 1736, he gathered the nomadic and sedentary leaders of the Safavid realm at a vast encampment on the Moḡān steppe.',
        lang: 'en',
        cite: { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '12' } },
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
            value: { d: '1736-02' },
            cites: [
              {
                source: 'iranica-tucker-nader-shah',
                loc: { section: 'NĀDER SHAH', para: '12' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'After several days of meetings, the assembly proclaimed Nāder as the legitimate monarch.',
        lang: 'en',
        cite: { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '12' } },
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
            value: { d: '1736-03' },
            cites: [
              {
                source: 'iranica-tucker-nader-shah',
                loc: { section: 'NĀDER SHAH', para: '13' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'The newly appointed shah gave a speech to acknowledge the approval of those in attendance.',
        lang: 'en',
        cite: { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '13' } },
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
            value: { d: '1736' },
            cites: [
              {
                source: 'iranica-tucker-ottoman-persian-relations-afsharid-zand',
                loc: {
                  section: 'OTTOMAN-PERSIAN RELATIONS ii. AFSHARID AND ZAND PERIODS',
                  para: '10'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'Immediately following his coronation, Nāder sent an embassy to Istanbul to explain his ideas.',
        lang: 'en',
        cite: {
          source: 'iranica-tucker-ottoman-persian-relations-afsharid-zand',
          loc: { section: 'OTTOMAN-PERSIAN RELATIONS ii. AFSHARID AND ZAND PERIODS', para: '10' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/ottoman-persian-relations-ii'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1b/Jahangusha-ye_Naderi_08.jpg/1280px-Jahangusha-ye_Naderi_08.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Jahangusha-ye_Naderi_08.jpg',
    credit: { institution: 'Adib Boroumand collection (Jahāngošā-ye Nāderi manuscript)' },
    license: { id: 'public-domain' }
  }
})
