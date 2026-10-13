import { definePerson } from '../../schema'

export default definePerson({
  id: 'selim-i',
  names: [
    { text: 'Selim I', lang: 'en', role: 'primary' },
    {
      text: 'Salīm I',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'iranica-mccaffrey-calderan', loc: { section: 'ČĀLDERĀN', para: '1' } }
      ]
    }
  ],
  researched: '2026-10-13',
  born: {
    alts: [
      {
        value: { d: '1465' },
        cites: [
          { source: 'britannica-1911-selim', loc: { section: 'SELIM', para: '2' } }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1521-09-22' },
        cites: [
          { source: 'britannica-1911-selim', loc: { section: 'SELIM', para: '2' } }
        ]
      }
    ]
  },
  regions: ['mena', 'europe'],
  roles: ['monarch', 'military'],
  offices: [
    {
      title: 'Sultan of the Ottoman Empire',
      polity: 'polity:ottoman-empire',
      start: {
        alts: [
          {
            value: { d: '1512' },
            cites: [
              { source: 'britannica-1911-selim', loc: { section: 'SELIM', para: '2' } }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1521-09-22' },
            cites: [
              { source: 'britannica-1911-selim', loc: { section: 'SELIM', para: '2' } }
            ]
          },
          {
            value: { d: '1520' },
            cites: [
              {
                source: 'loc-turkey-country-study-1995',
                loc: { section: 'Selim I and Süleyman the Magnificent', para: '1' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'Library of Congress' }
            ]
          }
        ]
      },
      cites: [
        { source: 'britannica-1911-selim', loc: { section: 'SELIM', para: '2' } },
        {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'Selim I and Süleyman the Magnificent', para: '1' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4f/Houghton_EC7_T4922_734c_%28B%29_-_Selim_I.jpg/1280px-Houghton_EC7_T4922_734c_%28B%29_-_Selim_I.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Houghton_EC7_T4922_734c_(B)_-_Selim_I.jpg',
    credit: { institution: 'Houghton Library, Harvard University', creator: 'Claude du Bosc' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Selim I (r. 1512-20) extended Ottoman sovereignty southward, conquering Syria, Palestine, and Egypt.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'Selim I and Süleyman the Magnificent', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/turkey/8.htm' }
        },
        {
          id: 'q2',
          text: 'Selim I. (1465–1521) succeeded in 1512 his father Bayezid II., whom he dethroned',
          lang: 'en',
          cite: { source: 'britannica-1911-selim', loc: { section: 'SELIM', para: '2' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Selim'
          }
        },
        {
          id: 'q3',
          text: 'He signalized his accession by putting to death his brothers and nephews; and gave early proof of resolution by boldly cutting down before their troops two officers who showed signs of insubordination.',
          lang: 'en',
          cite: { source: 'britannica-1911-selim', loc: { section: 'SELIM', para: '2' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Selim'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q4',
          text: 'The campaign which followed was a triumph for Selim, whose firmness and courage overcame the pusillanimity and insubordination of the Janissaries.',
          lang: 'en',
          cite: { source: 'britannica-1911-selim', loc: { section: 'SELIM', para: '2' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Selim'
          }
        },
        {
          id: 'q5',
          text: 'Before the start of the campaign Salīm ordered the execution of upwards of 40,000 Anatolian Qezelbāš as punishment for their rebellious behavior.',
          lang: 'en',
          cite: { source: 'iranica-mccaffrey-calderan', loc: { section: 'ČĀLDERĀN', para: '8' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/calderan-battle'
          }
        },
        {
          id: 'q6',
          text: 'Salīm was thus able to march unopposed into Tabrīz, which he occupied on 17 Rajab/7 September.',
          lang: 'en',
          cite: { source: 'iranica-mccaffrey-calderan', loc: { section: 'ČĀLDERĀN', para: '12' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/calderan-battle'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q7',
          text: 'After his return from his Egyptian campaign, he was preparing an expedition against Rhodes when he was overtaken by sickness and died, on the 22nd of September 1521, in the ninth year of his reign, near the very spot where he had attacked his father’s troops, not far from Adrianople.',
          lang: 'en',
          cite: { source: 'britannica-1911-selim', loc: { section: 'SELIM', para: '2' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Selim'
          }
        }
      ]
    }
  ]
})
