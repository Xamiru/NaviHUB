import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'influenza-pandemic-of-1918',
  names: [
    { text: '1918 influenza pandemic', lang: 'en', role: 'primary' },
    {
      text: '“Spanish” influenza',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'eo1418-phillips-influenza-pandemic',
          loc: { section: 'Influenza Pandemic' }
        }
      ]
    },
    {
      text: 'nāḵoši-e bād',
      lang: 'fa-Latn',
      role: 'alternative',
      translit: 'nāḵoši-e bād',
      cites: [
        { source: 'iranica-afkhami-influenza', loc: { section: 'INFLUENZA', para: '14' } }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'epidemic',
  start: {
    alts: [
      {
        value: { d: '1918-03' },
        cites: [
          {
            source: 'eo1418-phillips-influenza-pandemic',
            loc: { section: 'A possible path to a lethal pandemic', para: '3' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1919' },
        cites: [
          {
            source: 'eo1418-phillips-influenza-pandemic',
            loc: { section: 'A possible path to a lethal pandemic', para: '11' }
          },
          {
            source: 'cdc-1918-pandemic-h1n1',
            loc: { section: '1918 Pandemic (H1N1 virus)', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['global', 'north-america', 'europe', 'iran', 'subsaharan-africa', 'oceania'],
  prominence: 2,
  places: [
    {
      ref: 'place:freetown',
      cites: [
        {
          source: 'eo1418-phillips-influenza-pandemic',
          loc: { section: 'A possible path to a lethal pandemic', para: '7' }
        }
      ]
    },
    {
      ref: 'place:brest',
      cites: [
        {
          source: 'eo1418-phillips-influenza-pandemic',
          loc: { section: 'A possible path to a lethal pandemic', para: '7' }
        }
      ]
    },
    {
      ref: 'place:boston',
      cites: [
        {
          source: 'eo1418-phillips-influenza-pandemic',
          loc: { section: 'A possible path to a lethal pandemic', para: '7' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'deaths',
      value: {
        alts: [
          {
            value: { min: 50000000, qualifier: 'about' },
            cites: [
              {
                source: 'eo1418-phillips-influenza-pandemic',
                loc: { section: 'The virus and its transmission', para: '1' }
              },
              {
                source: 'eo1418-phillips-influenza-pandemic',
                loc: { section: 'The differentiated demographic impact', para: '1' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Howard Phillips' }
            ]
          },
          {
            value: { min: 50000000, qualifier: 'over' },
            cites: [
              {
                source: 'cdc-1918-pandemic-h1n1',
                loc: { section: '1918 Pandemic (H1N1 virus)', para: '1' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'Centers for Disease Control and Prevention' }
            ]
          }
        ]
      }
    }
  ],
  related: [
    { ref: 'event:first-world-war', rel: 'related' },
    { ref: 'event:iranian-famine-of-1917-1918', rel: 'related' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The “Spanish” flu pandemic was, quite simply, the single worst disease episode in modern world history. In the space of eighteen months in 1918-1919, its three waves killed some 50 million people around the globe, or some 3 to 4 percent of the world’s population.',
          lang: 'en',
          cite: {
            source: 'eo1418-phillips-influenza-pandemic',
            loc: { section: 'The virus and its transmission', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/influenza-pandemic/'
          }
        },
        {
          id: 'q2',
          text: 'The 1918 influenza pandemic was the most severe pandemic in recent history. It was caused by an H1N1 virus with genes of avian origin.',
          lang: 'en',
          cite: {
            source: 'cdc-1918-pandemic-h1n1',
            loc: { section: '1918 Pandemic (H1N1 virus)', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://archive.cdc.gov/www_cdc_gov/flu/pandemic-resources/1918-pandemic-h1n1.html'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q11',
          text: 'Though this first wave of the pandemic laid millions low, it claimed relatively few lives and was most noted for the disruption of everyday activities which it caused among troops and civilians alike and for the fact that such disruptions in neutral Spain (where no censorship of the press was in force) were widely reported in the world’s media, earning it the mistaken tag of “Spanish” flu.',
          lang: 'en',
          cite: {
            source: 'eo1418-phillips-influenza-pandemic',
            loc: { section: 'The virus and its transmission', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://encyclopedia.1914-1918-online.net/article/influenza-pandemic/'
          }
        },
        {
          id: 'q3',
          text: 'It is surely no coincidence that the newly mutated H1N1 virus which created the deadly second wave of “Spanish” flu first made its transformed presence known late in August 1918 in Freetown, Brest and Boston, three major wartime ports through which hundreds of thousands of soldiers and sailors had been streaming since the first wave of the pandemic had broken out earlier in the year.',
          lang: 'en',
          cite: {
            source: 'eo1418-phillips-influenza-pandemic',
            loc: { section: 'A possible path to a lethal pandemic', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://encyclopedia.1914-1918-online.net/article/influenza-pandemic/'
          }
        },
        {
          id: 'q4',
          text: 'Thus, when, in the first half of 1919, the virus re-surfaced in a slightly altered form as a third global wave of “Spanish” flu, against the background of the movement of post-war refugees, soldiers being repatriated and peacetime commerce resuming, its capacity to infect and kill was diminished.',
          lang: 'en',
          cite: {
            source: 'eo1418-phillips-influenza-pandemic',
            loc: { section: 'A possible path to a lethal pandemic', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/influenza-pandemic/'
          }
        },
        {
          id: 'q5',
          text: 'This influenza epidemic invaded Persia from several different directions, probably by virtue of the several armies fighting within its territory and on account of its geographical centrality within the Eurasian plateau.',
          lang: 'en',
          cite: { source: 'iranica-afkhami-influenza', loc: { section: 'INFLUENZA', para: '9' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/influenza'
          }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q6',
          text: 'Even if the figures are only estimates, in terms of lives claimed, World War I (ca. 12-14 million dead) is dwarfed by the three waves of the “Spanish” influenza pandemic which killed, directly or indirectly, ca. 50 million people.',
          lang: 'en',
          cite: {
            source: 'eo1418-phillips-influenza-pandemic',
            loc: { section: 'The differentiated demographic impact', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/influenza-pandemic/'
          }
        },
        {
          id: 'q7',
          text: 'It is estimated that about 500 million people or one-third of the world’s population became infected with this virus. The number of deaths was estimated to be at least 50 million worldwide with about 675,000 occurring in the United States.',
          lang: 'en',
          cite: {
            source: 'cdc-1918-pandemic-h1n1',
            loc: { section: '1918 Pandemic (H1N1 virus)', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://archive.cdc.gov/www_cdc_gov/flu/pandemic-resources/1918-pandemic-h1n1.html'
          }
        },
        {
          id: 'q8',
          text: 'Estimates would indicate that Persia potentially lost a population ranging from 902,400 to 2,431,000 inhabitants to the flu. The true number of casualties probably stands somewhere in between the two extremes.',
          lang: 'en',
          cite: { source: 'iranica-afkhami-influenza', loc: { section: 'INFLUENZA', para: '18' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/influenza'
          }
        },
        {
          id: 'q9',
          text: 'The latter were disproportionately those aged between eighteen and forty, and more often male than female, save if the women were pregnant.',
          lang: 'en',
          cite: {
            source: 'eo1418-phillips-influenza-pandemic',
            loc: { section: 'The differentiated demographic impact', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/influenza-pandemic/'
          }
        }
      ]
    },
    {
      kind: 'memory',
      quotes: [
        {
          id: 'q10',
          text: 'Even though the so-called “Spanish” influenza pandemic of 1918-1919 coincided in part with the final year of World War I, and even though it claimed four to five times more lives than did the war, it is not a subject to which historians of that war have given much attention.',
          lang: 'en',
          cite: {
            source: 'eo1418-phillips-influenza-pandemic',
            loc: { section: 'Introduction', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/influenza-pandemic/'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fc/1918_at_Spanish_Flu_Ward_Walter_Reed_%28cropped%29.jpg/1280px-1918_at_Spanish_Flu_Ward_Walter_Reed_%28cropped%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:1918_at_Spanish_Flu_Ward_Walter_Reed_(cropped).jpg',
    credit: { institution: 'Library of Congress', creator: 'Harris & Ewing' },
    license: { id: 'public-domain' }
  }
})
