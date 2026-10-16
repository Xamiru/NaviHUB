import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'jami-and-the-naqshbandi-order-in-herat',
  names: [
    { text: 'Jami and the Naqshbandi order in Herat', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-16',
  type: 'religious',
  start: {
    alts: [
      {
        value: { d: '1456' },
        cites: [
          {
            source: 'iranica-algar-jami-ii-and-sufism',
            loc: { section: 'JĀMI ii. And Sufism', para: '6' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1492-11-09' },
        cites: [
          { source: 'iranica-jami-headword', loc: { section: 'JĀMI', para: '1' } },
          {
            source: 'iranica-losensky-jami-i-life-and-works',
            loc: { section: 'JĀMI i. Life and Works', para: '7' }
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
        {
          source: 'iranica-losensky-jami-i-life-and-works',
          loc: { section: 'JĀMI i. Life and Works', para: '6' }
        }
      ]
    },
    {
      ref: 'place:samarkand',
      cites: [
        {
          source: 'iranica-algar-jami-ii-and-sufism',
          loc: { section: 'JĀMI ii. And Sufism', para: '6' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:timurid-empire',
      cites: [
        {
          source: 'iranica-losensky-jami-i-life-and-works',
          loc: { section: 'JĀMI i. Life and Works', para: '6' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:jami',
      role: 'participant',
      cites: [
        {
          source: 'iranica-algar-jami-ii-and-sufism',
          loc: { section: 'JĀMI ii. And Sufism', para: '4' }
        }
      ]
    },
    {
      ref: 'person:ali-shir-navai',
      role: 'participant',
      cites: [
        {
          source: 'iranica-losensky-jami-i-life-and-works',
          loc: { section: 'JĀMI i. Life and Works', para: '7' }
        }
      ]
    },
    {
      ref: 'person:sultan-husayn-bayqara',
      role: 'head-of-state',
      cites: [
        {
          source: 'iranica-losensky-jami-i-life-and-works',
          loc: { section: 'JĀMI i. Life and Works', para: '6' }
        }
      ]
    },
    {
      name: 'Ḵᵛāja ʿObayd-Allāh Aḥrār',
      role: 'participant',
      cites: [
        {
          source: 'iranica-algar-jami-ii-and-sufism',
          loc: { section: 'JĀMI ii. And Sufism', para: '6' }
        }
      ]
    },
    {
      name: 'Saʿd-al-Din Kāšḡari',
      role: 'participant',
      cites: [
        {
          source: 'iranica-losensky-jami-i-life-and-works',
          loc: { section: 'JĀMI i. Life and Works', para: '5' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:herat-under-sultan-husayn-bayqara', rel: 'related' },
    { ref: 'event:ali-shir-navai-and-chaghatay-literature', rel: 'related' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Jāmi’s affiliation to the Naqšbandiya, an order swiftly rising to prominence at the time in both Transoxiana and Khorasan, was central to his understanding and practice of Sufism.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-jami-ii-and-sufism',
            loc: { section: 'JĀMI ii. And Sufism', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/jami-ii'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'The close relations between the Naqšbandi order and the Timurid dynasty would decisively shape the rest of Jāmi’s life.',
          lang: 'en',
          cite: {
            source: 'iranica-losensky-jami-i-life-and-works',
            loc: { section: 'JĀMI i. Life and Works', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/jami-i'
          }
        },
        {
          id: 'q3',
          text: 'Jāmi initially submitted himself, however, to austerities of separation from the world so extreme that on his re-emergence he had temporarily forgotten the niceties and forms of social intercourse.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-jami-ii-and-sufism',
            loc: { section: 'JĀMI ii. And Sufism', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/jami-ii'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q4',
          text: 'Despite all the foregoing, several persons are said to have been formally trained by Jāmi in the ṭariqa: Rażi-al-Din ʿAbd-al-Ḡafur Lāri (d. 1506), renowned for a number of writings, especially the supplement (takmela) he wrote to Jāmi’s Nafaḥāt al-ons, an engaging and detailed portrayal of his master as a near-perfect embodiment of the Naqšbandi ideal; Mawlānā Šahidi Qomi, who took refuge in Gujarat once the Safavids conquered Khorasan; and Ḵʷāja Żiāʾ-al-Din Yusof, Jāmi’s third son (d. 1513)',
          lang: 'en',
          cite: {
            source: 'iranica-algar-jami-ii-and-sufism',
            loc: { section: 'JĀMI ii. And Sufism', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/jami-ii'
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
            value: { d: '1456' },
            cites: [
              {
                source: 'iranica-algar-jami-ii-and-sufism',
                loc: { section: 'JĀMI ii. And Sufism', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q5',
        text: 'Equally important for Jāmi’s practice of Sufism, especially after the death of Kāšḡari in 1456, were his links with the already mentioned Naqšbandi shaykh, Ḵᵛāja ʿObayd-Allāh Aḥrār, resident in Samarqand',
        lang: 'en',
        cite: {
          source: 'iranica-algar-jami-ii-and-sufism',
          loc: { section: 'JĀMI ii. And Sufism', para: '6' }
        },
        provenance: { via: 'web', at: '2026-10-16', url: 'https://www.iranicaonline.org/articles/jami-ii' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1472' },
            cites: [
              {
                source: 'iranica-losensky-jami-i-life-and-works',
                loc: { section: 'JĀMI i. Life and Works', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q6',
        text: 'When Jāmi was setting out to go on pilgrimage to Mecca in 1472, he entrusted ʿAlišir with his personal affairs in his absence, and Sultan Ḥoseyn equipped Jāmi’s entourage and provided him with letters of introduction to the local rulers he would encounter on his way',
        lang: 'en',
        cite: {
          source: 'iranica-losensky-jami-i-life-and-works',
          loc: { section: 'JĀMI i. Life and Works', para: '6' }
        },
        provenance: { via: 'web', at: '2026-10-16', url: 'https://www.iranicaonline.org/articles/jami-i' }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/6/67/Nafahat_al-Uns%2C_Jami%2C_1604-05%2C_detail%2C_Biblioteca_de_la_Fundaci%C3%B3n_L%C3%A1zaro_Galdiano%2C_Madrid.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Nafahat_al-Uns,_Jami,_1604-05,_detail,_Biblioteca_de_la_Fundaci%C3%B3n_L%C3%A1zaro_Galdiano,_Madrid.jpg',
    credit: { institution: 'Biblioteca de la Fundación Lázaro Galdiano' },
    license: { id: 'public-domain' }
  }
})
