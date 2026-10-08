import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'boxer-uprising',
  names: [
    { text: 'Boxer Rebellion', lang: 'en', role: 'primary' },
    { text: 'Boxer Uprising', lang: 'en', role: 'alternative' },
    {
      text: 'Yihetuan',
      lang: 'zh-Latn',
      role: 'alternative',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Hundred Days\' Reform and the Aftermath', para: '4' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'uprising',
  start: {
    alts: [
      {
        value: { d: '1900' },
        cites: [
          {
            source: 'state-dept-milestones-open-door-china',
            loc: {
              section: 'Secretary of State John Hay and the Open Door in China, 1899–1900',
              para: '8'
            }
          },
          {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Hundred Days\' Reform and the Aftermath', para: '4' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1901' },
        cites: [
          {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Hundred Days\' Reform and the Aftermath', para: '4' }
          }
        ]
      }
    ]
  },
  regions: ['east-asia', 'europe', 'global'],
  prominence: 1,
  places: [
    { ref: 'place:beijing' }
  ],
  polities: [
    { ref: 'polity:united-states' },
    { ref: 'polity:united-kingdom' },
    { ref: 'polity:german-empire' },
    { ref: 'polity:french-third-republic' },
    { ref: 'polity:austria-hungary' },
    { ref: 'polity:kingdom-of-italy' },
    { ref: 'polity:qing-empire' }
  ],
  participants: [
    {
      ref: 'person:cixi',
      role: 'head-of-state',
      cites: [
        {
          source: 'state-dept-milestones-open-door-china',
          loc: {
            section: 'Secretary of State John Hay and the Open Door in China, 1899–1900',
            para: '8'
          }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'The conservatives then gave clandestine backing to the antiforeign and anti-Christian movement of secret societies known as Yihetuan (Society of Righteousness and Harmony). The movement has been better known in the West as the Boxers (from an earlier name--Yihequan, Righteousness and Harmony Boxers).',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Hundred Days\' Reform and the Aftermath', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/18.htm' }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q2',
          text: 'An anti-foreign movement known as the Boxer Rebellion, named for the martial artists that led the movement, gathered strength, and began attacking foreign missionaries and Chinese converts to Christianity. With the backing of Empress Dowager Cixi (Tz’u Hsi) and the Imperial Army, the Boxer Rebellion turned into a violent conflict that claimed the lives of hundreds of foreign missionaries and thousands of Chinese nationals. As the Boxers descended upon Beijing, foreign nationals living in that city—including embassy staff—clustered together in the besieged foreign legations, and called upon their home governments for assistance.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-open-door-china',
            loc: {
              section: 'Secretary of State John Hay and the Open Door in China, 1899–1900',
              para: '8'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1899-1913/hay-and-china'
          }
        },
        {
          id: 'q3',
          text: 'Russian military contingents joined forces from Europe, Japan, and the United States to restore order in northern China. A force of 180,000 Russian troops fought to pacify part of Manchuria and to secure its railroads.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '35' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/6.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q4',
          text: 'Under the Protocol of 1901, the court was made to consent to the execution of ten high officials and the punishment of hundreds of others, expansion of the Legation Quarter, payment of war reparations, stationing of foreign troops in China, and razing of some Chinese fortifications.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Hundred Days\' Reform and the Aftermath', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/18.htm' }
        },
        {
          id: 'q5',
          text: 'With foreign armies fighting their way from the Chinese coast to rescue their citizens in the capital, in some cases securing their own concessions and areas of special interest along the way, the principle of the Open Door seemed to be in grave danger.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-open-door-china',
            loc: {
              section: 'Secretary of State John Hay and the Open Door in China, 1899–1900',
              para: '10'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1899-1913/hay-and-china'
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
            value: { d: '1900-06' },
            cites: [
              {
                source: 'loc-china-country-study-1987',
                loc: { section: 'The Hundred Days\' Reform and the Aftermath', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q6',
        text: 'Finally, in June 1900, the Boxers besieged the foreign concessions in Beijing and Tianjin, an action that provoked an allied relief expedition by the offended nations. The Qing declared war against the invaders, who easily crushed their opposition and occupied north China.',
        lang: 'en',
        cite: {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Hundred Days\' Reform and the Aftermath', para: '4' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/18.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1900-07-03' },
            cites: [
              {
                source: 'state-dept-milestones-open-door-china',
                loc: {
                  section: 'Secretary of State John Hay and the Open Door in China, 1899–1900',
                  para: '10'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'On July 3, 1900, Hay circulated another message to the foreign powers involved in China, this time noting the importance of respecting the “territorial and administrative integrity” of China.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-open-door-china',
          loc: {
            section: 'Secretary of State John Hay and the Open Door in China, 1899–1900',
            para: '10'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://history.state.gov/milestones/1899-1913/hay-and-china'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9e/Beijing_Castle_Boxer_Rebellion_1900_FINAL.jpg/1280px-Beijing_Castle_Boxer_Rebellion_1900_FINAL.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Beijing_Castle_Boxer_Rebellion_1900_FINAL.jpg',
    credit: { institution: 'Library of Congress', creator: 'Kasai Torajirō' },
    license: { id: 'public-domain' }
  },
  archive: [
    {
      id: 'ricalton-1902',
      mediaKind: 'document',
      title: 'The Boxer uprising : Cheefoo, Taku, Tien-tsin : a part of Underwood & Underwood\'s stereoscopic tour through China',
      date: { d: '1902' },
      url: 'https://archive.org/download/boxeruprisingche00rica/boxeruprisingche00rica.pdf',
      page: 'https://archive.org/details/boxeruprisingche00rica',
      credit: { institution: 'Library of Congress (Internet Archive)', creator: 'James Ricalton' },
      license: { id: 'public-domain' },
      bytes: 8404261
    }
  ],
  furtherReading: [
    { source: 'lin-1993-yihetuan-shishi-kao', perspective: 'chinese' },
    { source: 'sato-1999-giwadan-no-kigen-to-sono-undo', perspective: 'japanese' },
    { source: 'kobayashi-1986-giwadan-senso-to-meiji-kokka', perspective: 'japanese' },
    { source: 'datsyshen-2001-bokserskaya-voina', perspective: 'russian-soviet' }
  ]
})
