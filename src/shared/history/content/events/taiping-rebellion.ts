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
  researched: '2026-10-08',
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
        value: { d: '1864-07' },
        cites: [
          { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } }
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
    },
    {
      ref: 'person:charles-gordon',
      role: 'commander',
      cites: [
        { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } }
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
      kind: 'course',
      quotes: [
        {
          id: 'q12',
          text: 'This was Hung Siu-tsʽüan. He proclaimed himself as sent by heaven to drive out the Tatars, and to restore in his own person the succession to China. At the same time, having been converted to Christianity and professing to abhor the vices and sins of the age, he called on all the virtuous of the land to extirpate rulers who were standing examples of all that was base and vile in human nature. Crowds soon flocked to his standard. Tʽien-tê was deserted; and putting himself at the head of his followers (who abandoned the practice of shaving the head), Hung Siu-tsʽüan marched northwards and captured Wu-chʽang on the Yangtsze-kiang, the capital of Hu-peh.',
          lang: 'en',
          cite: { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/China'
          }
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
  },
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1853' },
            cites: [
              { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'Then, moving down the river, he proceeded to the attack of Nanking. Without much difficulty Hung Siu-tsʽüan in 1853 established himself within its walls, and proclaimed the inauguration of the Tʽai-pʽing dynasty, of which he nominated himself the first emperor under the title of Tʽien Wang or “Heavenly king.”',
        lang: 'en',
        cite: { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/China'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1864-07' },
            cites: [
              { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'They lost city after city, and, finally in July 1864, the imperialists, after an interval of twelve years, once more gained possession of Nanking. Tʽien Wang committed suicide on the capture of his capital, and with him fell his cause.',
        lang: 'en',
        cite: { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/China'
        }
      }
    }
  ],
  furtherReading: [
    { source: 'luo-1991-taiping-tianguo-shi', perspective: 'chinese' },
    { source: 'mao-1991-taiping-tianguo-tongshi', perspective: 'chinese' },
    { source: 'jian-1962-taiping-tianguo-quanshi', perspective: 'chinese' }
  ]
})
