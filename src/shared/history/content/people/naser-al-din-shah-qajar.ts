import { definePerson } from '../../schema'

export default definePerson({
  id: 'naser-al-din-shah-qajar',
  names: [
    { text: 'Naser al-Din Shah Qajar', lang: 'en', role: 'primary' },
    { text: 'ناصرالدین شاه قاجار', lang: 'fa', role: 'native' },
    { text: 'Naser ad Din Shah', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-06',
  died: {
    alts: [
      {
        value: { d: '1896-05-01' },
        cites: [
          { source: 'britannica-1911-nasr-ed-din', loc: { section: 'NASR-ED-DIN', para: '1' } }
        ]
      }
    ]
  },
  regions: ['iran'],
  roles: ['monarch'],
  offices: [
    {
      title: 'Shah of Iran',
      start: {
        alts: [
          {
            value: { d: '1848' },
            cites: [
              {
                source: 'loc-iran-country-study-1987',
                loc: { section: 'THE QAJARS, 1795-1925', para: '1' }
              },
              {
                source: 'iranica-andreeva-russia-relations',
                loc: {
                  section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
                  para: '35'
                }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1896' },
            cites: [
              {
                source: 'loc-iran-country-study-1987',
                loc: { section: 'THE QAJARS, 1795-1925', para: '1' }
              },
              {
                source: 'iranica-andreeva-russia-relations',
                loc: {
                  section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
                  para: '35'
                }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'THE QAJARS, 1795-1925', para: '1' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q1',
          text: 'Shortly after Āqāsi’s nomination, Nāṣer-al-Din Mirzā, then four years old, was appointed crown prince (wali-ʿahd).',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-mohammad-shah',
            loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/mohammad-shah'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'Soon after, in Šawwāl, 1264/September, 1848, Moḥammad Shah died, and Nāṣer-al-dīn had to proceed to Tehran and assume the throne.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-amir-kabir',
            loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/amir-e-kabir-mirza-taqi-khan'
          }
        },
        {
          id: 'q3',
          text: 'British military and financial assistance during the critical months of the accession and consolidation of power by Nāṣer-al-Din Shah (1848-96), also offered Britain further advantages.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '13'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/great-britain-ii/'
          }
        },
        {
          id: 'q4',
          text: 'Nāṣer-al-Din Shah (r. 1848-96) encouraged foreign concessions in Iran in the hope that they would help to modernize the country, but, similar to the other Qajar rulers, he underestimated the need for radical financial and administrative reform in order for this policy to succeed.',
          lang: 'en',
          cite: {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '35'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
          }
        },
        {
          id: 'q6',
          text: 'In 1868 he wrote a long letter (Lawḥ-e solṭān) to Nāṣer-al-Dīn Shah, saying Babis under his leadership were not militant, and requesting an end to their persecution in Iran. The shah had Bahāʾ-Allāh’s emissary bearing this letter tortured and killed.',
          lang: 'en',
          cite: { source: 'iranica-cole-baha-allah', loc: { section: 'BAHĀʾ-ALLĀH', para: '15' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/baha-allah'
          }
        },
        {
          id: 'q7',
          text: 'It was ratified on the occasion of Nāṣer-al-Dīn Shah’s state visit to Berlin (31 May-8 June 1873).',
          lang: 'en',
          cite: {
            source: 'iranica-bast-germany-diplomatic-relations',
            loc: { section: 'GERMANY i. German-Persian diplomatic relations', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/germany-i'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q5',
          text: 'In 1896, reputedly encouraged by Jamal ad Din al Afghani (called Asadabadi because he came from Asadabad), the well-known Islamic preacher and political activist, a young Iranian assassinated the shah.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE QAJARS, 1795-1925', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/iran/12.htm' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f3/The_Young_Nasir_Al-Din_Shah_Qajar.jpg/1280px-The_Young_Nasir_Al-Din_Shah_Qajar.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:The_Young_Nasir_Al-Din_Shah_Qajar.jpg',
    credit: { creator: 'Mirza Abolhassan Khan Ghaffari' },
    license: { id: 'public-domain' }
  },
  born: {
    alts: [
      {
        value: { d: '1829-04-04' },
        cites: [
          { source: 'britannica-1911-nasr-ed-din', loc: { section: 'NASR-ED-DIN', para: '1' } }
        ]
      }
    ]
  },
  diedIn: {
    ref: 'place:tehran',
    cites: [
      { source: 'britannica-1911-nasr-ed-din', loc: { section: 'NASR-ED-DIN', para: '1' } }
    ]
  }
})
