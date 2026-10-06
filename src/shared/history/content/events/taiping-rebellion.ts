import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'taiping-rebellion',
  names: [
    { text: 'Taiping Rebellion', lang: 'en', role: 'primary' },
    { text: '太平天國運動', lang: 'zh', role: 'native' },
    {
      text: 'Heavenly Kingdom of Great Peace',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Taiping Rebellion, 1851-64', para: '2' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  type: 'uprising',
  start: {
    alts: [
      {
        value: { d: '1851' },
        cites: [
          {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Taiping Rebellion, 1851-64', para: '2' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1864' },
        cites: [
          {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Taiping Rebellion, 1851-64' }
          }
        ]
      }
    ]
  },
  regions: ['east-asia'],
  prominence: 1,
  places: [
    {
      ref: 'place:nanjing',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Taiping Rebellion, 1851-64', para: '2' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:hong-xiuquan',
      role: 'leader',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Taiping Rebellion, 1851-64', para: '2' }
        }
      ]
    },
    {
      name: 'Zeng Guofan',
      role: 'commander',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Taiping Rebellion, 1851-64', para: '3' }
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
            value: { min: 30000000, qualifier: 'over' },
            cites: [
              {
                source: 'loc-china-country-study-1987',
                loc: { section: 'The Taiping Rebellion, 1851-64', para: '2' }
              }
            ]
          }
        ]
      }
    }
  ],
  sections: [
    {
      kind: 'causes',
      quotes: [
        {
          id: 'q1',
          text: 'During the mid-nineteenth century, China\'s problems were compounded by natural calamities of unprecedented proportions, including droughts, famines, and floods.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Taiping Rebellion, 1851-64', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/16.htm' }
        },
        {
          id: 'q2',
          text: 'Government neglect of public works was in part responsible for this and other disasters, and the Qing administration did little to relieve the widespread misery caused by them.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Taiping Rebellion, 1851-64', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/16.htm' }
        },
        {
          id: 'q3',
          text: 'Economic tensions, military defeats at Western hands, and anti-Manchu sentiments all combined to produce widespread unrest, especially in the south.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Taiping Rebellion, 1851-64', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/16.htm' }
        },
        {
          id: 'q4',
          text: 'South China had been the last area to yield to the Qing conquerors and the first to be exposed to Western influence. It provided a likely setting for the largest uprising in modern Chinese history--the Taiping Rebellion.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Taiping Rebellion, 1851-64', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/16.htm' }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q5',
          text: 'In 1851 Hong Xiuquan and others launched an uprising in Guizhou Province.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Taiping Rebellion, 1851-64', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/16.htm' }
        },
        {
          id: 'q6',
          text: 'Hong proclaimed the Heavenly Kingdom of Great Peace (Taiping Tianguo, or Taiping for short) with himself as king. The new order was to reconstitute a legendary ancient state in which the peasantry owned and tilled the land in common; slavery, concubinage, arranged marriage, opium smoking, footbinding, judicial torture, and the worship of idols were all to be eliminated.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Taiping Rebellion, 1851-64', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/16.htm' }
        },
        {
          id: 'q7',
          text: 'The Taiping army, although it had captured Nanjing and driven as far north as Tianjin, failed to establish stable base areas.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Taiping Rebellion, 1851-64', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/16.htm' }
        },
        {
          id: 'q8',
          text: 'Additionally, British and French forces, being more willing to deal with the weak Qing administration than contend with the uncertainties of a Taiping regime, came to the assistance of the imperial army.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Taiping Rebellion, 1851-64', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/16.htm' }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q9',
          text: 'Before the Chinese army succeeded in crushing the revolt, however, 14 years had passed, and well over 30 million people were reported killed.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Taiping Rebellion, 1851-64', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/16.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q10',
          text: 'Zeng\'s success gave new power to an emerging Han Chinese elite and eroded Qing authority.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Taiping Rebellion, 1851-64', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/16.htm' }
        },
        {
          id: 'q11',
          text: 'The rude realities of the Opium War, the unequal treaties, and the mid-century mass uprisings caused Qing courtiers and officials to recognize the need to strengthen China.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Self-Strengthening Movement', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/17.htm' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/71/Taiping_Heavenly_Kingdom_Coin_%2816929385639%29.jpg/1280px-Taiping_Heavenly_Kingdom_Coin_%2816929385639%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Taiping_Heavenly_Kingdom_Coin_(16929385639).jpg',
    credit: { creator: 'Gary Todd' },
    license: { id: 'cc0' }
  }
})
