import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'treaty-of-istanbul-1590',
  names: [
    { text: 'Treaty of Istanbul (1590)', lang: 'en', role: 'primary' },
    {
      text: 'Treaty of Constantinople',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-mclachlan-boundaries-ottoman-empire',
          loc: { section: 'BOUNDARIES i. With the Ottoman Empire', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-13',
  type: 'treaty',
  start: {
    alts: [
      {
        value: { d: '1590' },
        cites: [
          {
            source: 'iranica-mclachlan-boundaries-ottoman-empire',
            loc: { section: 'BOUNDARIES i. With the Ottoman Empire', para: '1' }
          },
          {
            source: 'iranica-matthee-iraq-iv-safavid-period',
            loc: { section: 'IRAQ iv. RELATIONS IN THE SAFAVID PERIOD', para: '16' }
          },
          {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '28' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'mena'],
  prominence: 3,
  polities: [
    {
      ref: 'polity:safavid-iran',
      cites: [
        {
          source: 'iranica-mclachlan-boundaries-ottoman-empire',
          loc: { section: 'BOUNDARIES i. With the Ottoman Empire', para: '1' }
        }
      ]
    },
    {
      ref: 'polity:ottoman-empire',
      cites: [
        {
          source: 'iranica-mclachlan-boundaries-ottoman-empire',
          loc: { section: 'BOUNDARIES i. With the Ottoman Empire', para: '1' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:abbas-i',
      role: 'signatory',
      cites: [
        {
          source: 'iranica-matthee-safavid-dynasty',
          loc: { section: 'SAFAVID DYNASTY', para: '31' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:ottoman-safavid-war-1578-1590',
      rel: 'followed-by',
      cites: [
        {
          source: 'iranica-matthee-iraq-iv-safavid-period',
          loc: { section: 'IRAQ iv. RELATIONS IN THE SAFAVID PERIOD', para: '16' }
        }
      ]
    },
    {
      ref: 'event:ottoman-safavid-war-1603-1618',
      rel: 'led-to',
      cites: [
        {
          source: 'iranica-ghougassian-julfa-i-safavid-period',
          loc: { section: 'JULFA i. SAFAVID PERIOD', para: '8' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q8',
          text: 'Aware that he would not be able to fight on two fronts simultaneously, and intent on having his hands free in the east, Shah ʿAbbās initially concluded a peace with the Ottomans',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '31' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'A year later they broke the accord of Amasya and attacked Safavid territory once again, unleashing a war that would last until Shah ʿAbbās I sued for peace in 1590.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-iraq-iv-safavid-period',
            loc: { section: 'IRAQ iv. RELATIONS IN THE SAFAVID PERIOD', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/iraq-iv-safavid-period'
          }
        },
        {
          id: 'q4',
          text: 'Persia’s neighbors, meanwhile, again took advantage of the turmoil in the Safavid realm.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '28' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'The shah gained breathing space to confront and defeat the Uzbeks by signing a largely disadvantageous treaty with the Ottomans.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE SAFAVIDS, 1501-1722', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/iran/11.htm' }
        },
        {
          id: 'q6',
          text: 'Turning his attention to the Uzbeks, the new ruler recaptured Mashad and Herat.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '31' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b3/Houghton_EC7_T4922_734c_%28B%29_-_Murad_III.jpg/1280px-Houghton_EC7_T4922_734c_%28B%29_-_Murad_III.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Houghton_EC7_T4922_734c_(B)_-_Murad_III.jpg',
    credit: { institution: 'Houghton Library, Harvard University', creator: 'Claude du Bosc' },
    license: { id: 'public-domain' }
  },
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1590' },
            cites: [
              {
                source: 'iranica-mclachlan-boundaries-ottoman-empire',
                loc: { section: 'BOUNDARIES i. With the Ottoman Empire', para: '1' }
              },
              {
                source: 'iranica-matthee-iraq-iv-safavid-period',
                loc: { section: 'IRAQ iv. RELATIONS IN THE SAFAVID PERIOD', para: '16' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'This arrangement, humiliating for Persia, was confirmed in large part by the Treaty of Constantinople, signed in 998/1590, after an Ottoman attack on Baghdad.',
        lang: 'en',
        cite: {
          source: 'iranica-mclachlan-boundaries-ottoman-empire',
          loc: { section: 'BOUNDARIES i. With the Ottoman Empire', para: '1' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/boundaries-i'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1598' },
            cites: [
              { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '12' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'Shah ʿAbbās took the offensive, routed the Uzbeks in Moḥarram, 1007/August, 1598, and recaptured Herat, which had been in enemy hands for ten years.',
        lang: 'en',
        cite: { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '12' } },
        provenance: { via: 'web', at: '2026-10-13', url: 'https://www.iranicaonline.org/articles/abbas-i' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1603' },
            cites: [
              {
                source: 'iranica-ghougassian-julfa-i-safavid-period',
                loc: { section: 'JULFA i. SAFAVID PERIOD', para: '8' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'In the fall of 1603, Shah ʿAbbās I (r. 1587-1629) launched his first military campaign against the Ottomans to recapture the lands he had ceded to them in 1589-90.',
        lang: 'en',
        cite: {
          source: 'iranica-ghougassian-julfa-i-safavid-period',
          loc: { section: 'JULFA i. SAFAVID PERIOD', para: '8' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/julfa-i-safavid-period'
        }
      }
    }
  ]
})
