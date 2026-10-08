import { definePerson } from '../../schema'

export default definePerson({
  id: 'napoleon-iii',
  names: [
    { text: 'Napoleon III', lang: 'en', role: 'primary' },
    { text: 'Napoléon III', lang: 'fr', role: 'native' },
    {
      text: 'Louis-Napoléon Bonaparte',
      lang: 'fr',
      role: 'alternative',
      cites: [
        {
          source: 'elysee-louis-napoleon-bonaparte',
          loc: { section: 'Louis-Napoléon Bonaparte' }
        }
      ]
    },
    {
      text: 'Louis Napoleon',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '15' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1808-04-20' },
        cites: [
          {
            source: 'elysee-louis-napoleon-bonaparte',
            loc: { section: 'Louis-Napoléon Bonaparte' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1873-01-09' },
        cites: [
          {
            source: 'elysee-louis-napoleon-bonaparte',
            loc: { section: 'Louis-Napoléon Bonaparte' }
          }
        ]
      }
    ]
  },
  bornIn: {
    ref: 'place:paris',
    cites: [
      {
        source: 'elysee-louis-napoleon-bonaparte',
        loc: { section: 'Louis-Napoléon Bonaparte' }
      }
    ]
  },
  regions: ['europe'],
  roles: ['monarch', 'head-of-state'],
  offices: [
    {
      title: 'Président de la République',
      polity: 'polity:french-second-republic',
      lang: 'fr',
      start: {
        alts: [
          {
            value: { d: '1848-12-10' },
            cites: [
              {
                source: 'elysee-louis-napoleon-bonaparte',
                loc: { section: 'Louis-Napoléon Bonaparte' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'elysee-louis-napoleon-bonaparte',
          loc: { section: 'Louis-Napoléon Bonaparte' }
        }
      ]
    },
    {
      title: 'Empereur des Français',
      polity: 'polity:second-french-empire',
      lang: 'fr',
      start: {
        alts: [
          {
            value: { d: '1852-12-02' },
            cites: [
              {
                source: 'elysee-louis-napoleon-bonaparte',
                loc: { section: 'Louis-Napoléon Bonaparte' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1871-03-01' },
            cites: [
              {
                source: 'elysee-louis-napoleon-bonaparte',
                loc: { section: 'Louis-Napoléon Bonaparte' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'elysee-louis-napoleon-bonaparte',
          loc: { section: 'Louis-Napoléon Bonaparte' }
        },
        {
          source: 'elysee-louis-napoleon-bonaparte',
          loc: { section: 'Louis-Napoléon Bonaparte' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q7',
          text: 'NAPOLEON III. [Charles Louis Napoleon Bonaparte] (1808–1873), emperor of the French, was born on the 20th of April 1808 in Paris at 8 rue Cerutti (now rue Laffitte), and not at the Tuileries, as the official historians state. He was the third son of Louis Bonaparte (see Bonaparte), brother of Napoleon I., and from 1806 to 1810 king of Holland, and of Hortense de Beauharnais, daughter of General (de) Beauharnais and Josephine Tascher de la Pagerie, afterwards the empress Josephine;',
          lang: 'en',
          cite: {
            source: 'britannica-1911-napoleon-iii',
            loc: { section: 'NAPOLEON III.', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Napoleon_III.'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q8',
          text: 'On the 10th of December he was elected president of the Republic by 5,434,226 votes against 1,448,107 given to Cavaignac.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-napoleon-iii',
            loc: { section: 'NAPOLEON III.', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Napoleon_III.'
          }
        },
        {
          id: 'q9',
          text: 'His consent to the annexation of the Central Italian states, in exchange for Savoy and Nice (Treaty of Turin, March 24, 1860) exposed him to violent attacks on the part of the ultramontanes, whose slave he had practically been since 1848.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-napoleon-iii',
            loc: { section: 'NAPOLEON III.', para: '23' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Napoleon_III.'
          }
        }
      ]
    },
    {
      kind: 'later-life',
      quotes: [
        {
          id: 'q10',
          text: 'On the 2nd of September, Napoleon III. surrendered with 80,000 men, and on the 4th of September the Empire fell. He was taken as a prisoner to the castle of Wilhelmshöhe, near Cassel, where he stayed till the end of the war.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-napoleon-iii',
            loc: { section: 'NAPOLEON III.', para: '30' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Napoleon_III.'
          }
        },
        {
          id: 'q11',
          text: 'Restored to liberty, he retired with his wife and son to Chislehurst in England. […] At the end of 1872 his disease became more acute, and a surgical operation became necessary. He died on the 9th of January 1873, leaving his son in the charge of the empress and of Rouher.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-napoleon-iii',
            loc: { section: 'NAPOLEON III.', para: '31' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Napoleon_III.'
          }
        },
        {
          id: 'q6',
          text: 'By his own admission, the 1860s were a “black spot” that darkened the horizon, for which he was partly responsible.',
          lang: 'en',
          cite: {
            source: 'ehne-anceau-napoleon-iii-and-europe',
            loc: { section: 'Napoleon III and Europe' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/en/encyclopedia/themes/international-relations/arbiters-and-arbitration-in-europe-beginning-modern-times/napoleon-iii-and-europe'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/16/Franz_Xavier_Winterhalter_-_Napoleon_III_in_Coronation_Robes.jpg/1280px-Franz_Xavier_Winterhalter_-_Napoleon_III_in_Coronation_Robes.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Franz_Xavier_Winterhalter_-_Napoleon_III_in_Coronation_Robes.jpg',
    credit: { institution: 'Musée du Louvre' },
    license: { id: 'public-domain' }
  }
})
