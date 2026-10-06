import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'babi-bahai-schism',
  names: [
    { text: 'Babi–Bahai schism', lang: 'en', role: 'primary' },
    { text: 'Split between Bahāʾ-Allāh and Ṣobḥ-e Azal', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-06',
  type: 'religious',
  start: {
    alts: [
      {
        value: { d: '1866' },
        cites: [
          {
            source: 'iranica-maceoin-azali-babism',
            loc: { section: 'AZALI BABISM', para: '4' }
          },
          { source: 'iranica-cole-baha-allah', loc: { section: 'BAHĀʾ-ALLĀH', para: '14' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1868-08-12' },
        cites: [
          { source: 'iranica-cole-baha-allah', loc: { section: 'BAHĀʾ-ALLĀH', para: '14' } }
        ]
      }
    ]
  },
  regions: ['iran', 'mena', 'europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:edirne',
      cites: [
        { source: 'iranica-maceoin-azali-babism', loc: { section: 'AZALI BABISM', para: '4' } }
      ]
    },
    {
      ref: 'place:acre',
      cites: [
        { source: 'iranica-maceoin-azali-babism', loc: { section: 'AZALI BABISM', para: '4' } }
      ]
    },
    {
      ref: 'place:famagusta',
      cites: [
        { source: 'iranica-maceoin-azali-babism', loc: { section: 'AZALI BABISM', para: '4' } }
      ]
    }
  ],
  partOf: [
    { ref: 'period:babi-movement' }
  ],
  related: [
    {
      ref: 'event:declaration-of-bahaullah',
      rel: 'caused-by',
      cites: [
        { source: 'iranica-cole-baha-allah', loc: { section: 'BAHĀʾ-ALLĀH', para: '14' } }
      ]
    }
  ],
  sides: [
    {
      key: 'bahai',
      name: 'Bahaʾis',
      cites: [
        { source: 'iranica-maceoin-azali-babism', loc: { section: 'AZALI BABISM', para: '4' } }
      ]
    },
    {
      key: 'azali',
      name: 'Azalis',
      cites: [
        { source: 'iranica-maceoin-azali-babism', loc: { section: 'AZALI BABISM', para: '7' } }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:bahaullah',
      role: 'leader',
      side: 'bahai',
      cites: [
        { source: 'iranica-maceoin-azali-babism', loc: { section: 'AZALI BABISM', para: '4' } }
      ]
    },
    {
      ref: 'person:sobh-e-azal',
      role: 'leader',
      side: 'azali',
      cites: [
        { source: 'iranica-maceoin-azali-babism', loc: { section: 'AZALI BABISM', para: '4' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'In Edirne in 1866, Bahāʾallāh made public his claim to be man yoẓherohoʾllāh (he whom God shall manifest), the messianic figure of the Bayān.',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-azali-babism',
            loc: { section: 'AZALI BABISM', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/azali-babism'
          }
        },
        {
          id: 'q2',
          text: 'His attempt to preserve traditional Babism proved largely unpopular, however, and his followers were soon in the minority.',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-azali-babism',
            loc: { section: 'AZALI BABISM', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/azali-babism'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'By adopting a policy of seclusion (ḡayba), Ṣobḥ-e Azal gradually alienated himself from a large proportion of the exiles, who began to give their allegiance to other claimants, notably Azal’s half-brother, Bahāʾallāh.',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-azali-babism',
            loc: { section: 'AZALI BABISM', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/azali-babism'
          }
        },
        {
          id: 'q4',
          text: 'While in Edirne (1863-68) Bahāʾ-Allāh wrote letters to Babi followers in Iran openly proclaiming himself to be the spiritual “return” (rajʿa) of the Bāb.',
          lang: 'en',
          cite: {
            source: 'iranica-cole-bahaism-i',
            loc: { section: 'BAHAISM i. The Faith', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/bahaism-index/bahaism-i'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'In the late 1860s and early 1870s most Babis in Iran went over to Bahāʾ-Allāh, becoming Bahais.',
          lang: 'en',
          cite: { source: 'iranica-cole-baha-allah', loc: { section: 'BAHĀʾ-ALLĀH', para: '16' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/baha-allah'
          }
        },
        {
          id: 'q6',
          text: 'Babis in Iran were then forced to choose between Bahāʾ-Allāh and Azal.',
          lang: 'en',
          cite: {
            source: 'iranica-cole-bahaism-i',
            loc: { section: 'BAHAISM i. The Faith', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/bahaism-index/bahaism-i'
          }
        },
        {
          id: 'q7',
          text: 'Azali Babism represents the conservative core of the original Babi movement, opposed to innovation and preaching a religion for a non-clerical gnostic elite rather than the masses. It also retains the original Babi antagonism to the Qajar state and a commitment to political activism, in distinction to the quietist stance of Bahaʾism.',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-azali-babism',
            loc: { section: 'AZALI BABISM', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/azali-babism'
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
            value: { d: '1863-12-12' },
            cites: [
              {
                source: 'iranica-cole-baha-allah',
                loc: { section: 'BAHĀʾ-ALLĀH', para: '14' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'Bahāʾ-Allāh and his entourage, as well as Azal and his, lived in Edirne from 12 December 1863 to 12 August 1868.',
        lang: 'en',
        cite: { source: 'iranica-cole-baha-allah', loc: { section: 'BAHĀʾ-ALLĀH', para: '14' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/baha-allah'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1866' },
            cites: [
              {
                source: 'iranica-cole-baha-allah',
                loc: { section: 'BAHĀʾ-ALLĀH', para: '14' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'In spring of 1866 Bahāʾ-Allāh moved to a separate house from that of Azal, saying that Azal had attempted to have him killed, and, meeting with failure, had then imputed similar plots to his older brother.',
        lang: 'en',
        cite: { source: 'iranica-cole-baha-allah', loc: { section: 'BAHĀʾ-ALLĀH', para: '14' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/baha-allah'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1867-09' },
            cites: [
              {
                source: 'iranica-cole-baha-allah',
                loc: { section: 'BAHĀʾ-ALLĀH', para: '14' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'In September, 1867, he decisively broke with Yaḥyā, addressing to him a letter in which he set forth his station and demanded his brother’s obedience.',
        lang: 'en',
        cite: { source: 'iranica-cole-baha-allah', loc: { section: 'BAHĀʾ-ALLĀH', para: '14' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/baha-allah'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1868' },
            cites: [
              {
                source: 'iranica-maceoin-azali-babism',
                loc: { section: 'AZALI BABISM', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'In 1868, bitter feuding between the two factions, leading to violence on both sides, induced Ottoman authorities to exile the Babis yet further. Bahāʾallāh and his followers (now known as Bahaʾis) were sent to Acre in Palestine, and Azal with his family and some adherents to Famagusta in Cyprus, where he remained until his death on 29 April 1912.',
        lang: 'en',
        cite: { source: 'iranica-maceoin-azali-babism', loc: { section: 'AZALI BABISM', para: '4' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/azali-babism'
        }
      }
    }
  ]
})
