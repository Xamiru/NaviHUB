import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'second-sino-japanese-war',
  names: [
    { text: 'Second Sino-Japanese War', lang: 'en', role: 'primary' },
    { text: '抗日战争', lang: 'zh', role: 'native' },
    {
      text: 'Anti-Japanese War',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'loc-china-country-study-1987', loc: { section: 'Anti-Japanese War' } }
      ]
    },
    { text: '日中戦争', lang: 'ja', role: 'alternative' }
  ],
  researched: '2026-10-08',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1937-07-07' },
        cites: [
          {
            source: 'loc-china-country-study-1987',
            loc: { section: 'Anti-Japanese War', para: '2' }
          },
          {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'The Rise of the Militarists', para: '7' }
          },
          {
            source: 'state-dept-milestones-road-to-pearl-harbor',
            loc: {
              section: 'Japan, China, the United States and the Road to Pearl Harbor, 1937–41',
              para: '3'
            }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1945' },
        cites: [
          {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'The Rise of the Militarists', para: '7' }
          },
          {
            source: 'loc-china-country-study-1987',
            loc: { section: 'Anti-Japanese War', para: '4' }
          }
        ]
      }
    ]
  },
  regions: ['east-asia'],
  prominence: 1,
  places: [
    {
      ref: 'place:beijing',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'Anti-Japanese War', para: '2' }
        }
      ]
    },
    { ref: 'place:nanjing' },
    { ref: 'place:shanghai' }
  ],
  sides: [
    {
      key: 'china',
      name: 'China',
      polity: 'polity:republic-of-china',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'Anti-Japanese War', para: '2' }
        }
      ]
    },
    {
      key: 'japan',
      name: 'Japan',
      polity: 'polity:empire-of-japan',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'Anti-Japanese War', para: '2' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:chiang-kai-shek',
      role: 'leader',
      side: 'china',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'Anti-Japanese War', para: '1' }
        }
      ]
    },
    {
      ref: 'person:mao-zedong',
      role: 'leader',
      side: 'china',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'Anti-Japanese War', para: '3' }
        }
      ]
    },
    {
      name: 'Konoe Fumimaro',
      role: 'head-of-government',
      side: 'japan',
      cites: [
        {
          source: 'loc-japan-country-study-1994',
          loc: { section: 'The Rise of the Militarists', para: '8' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:mukden-incident', rel: 'preceded-by' },
    {
      ref: 'event:second-world-war',
      rel: 'contributed-to',
      cites: [
        {
          source: 'state-dept-milestones-road-to-pearl-harbor',
          loc: {
            section: 'Japan, China, the United States and the Road to Pearl Harbor, 1937–41',
            para: '1'
          }
        }
      ]
    },
    { ref: 'event:nanjing-massacre', rel: 'related' }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'The importance of "internal unity before external danger" was forcefully brought home in December 1936, when Nationalist troops (who had been ousted from Manchuria by the Japanese) mutinied at Xi\'an. The mutineers forcibly detained Chiang Kai-shek for several days until he agreed to cease hostilities against the Communist forces in northwest China and to assign Communist units combat duties in designated anti-Japanese front areas.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'Anti-Japanese War', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/22.htm' }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q4',
          text: 'War was launched against China after the Marco Polo Bridge Incident of July 7, 1937, in which an allegedly unplanned clash took place near Beiping (as Beijing was then called) between Chinese and Japanese troops and quickly escalated into full-scale warfare. The Second Sino-Japanese War (1937-45) ensued, and relations with the United States, Britain, and the Soviet Union deteriorated.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'The Rise of the Militarists', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/japan/32.htm' }
        },
        {
          id: 'q2',
          text: 'The Chinese resistance stiffened after July 7, 1937, when a clash occurred between Chinese and Japanese troops outside Beijing (then renamed Beiping) near the Marco Polo Bridge.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'Anti-Japanese War', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/22.htm' }
        },
        {
          id: 'q3',
          text: 'This skirmish not only marked the beginning of open, though undeclared, war between China and Japan but also hastened the formal announcement of the second Guomindang-CCP united front against Japan.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'Anti-Japanese War', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/22.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'The uneasy alliance began to break down after late 1938, despite Japan\'s steady territorial gains in northern China, the coastal regions, and the rich Chang Jiang Valley in central China.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'Anti-Japanese War', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/22.htm' }
        },
        {
          id: 'q6',
          text: 'The United States was the main supplier of the oil, steel, iron, and other commodities needed by the Japanese military as it became bogged down by Chinese resistance',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-road-to-pearl-harbor',
            loc: {
              section: 'Japan, China, the United States and the Road to Pearl Harbor, 1937–41',
              para: '5'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1937-1945/pearl-harbor'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q7',
          text: 'Between 1937 and 1941, escalating conflict between China and Japan influenced U.S. relations with both nations, and ultimately contributed to pushing the United States toward full-scale war with Japan and Germany.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-road-to-pearl-harbor',
            loc: {
              section: 'Japan, China, the United States and the Road to Pearl Harbor, 1937–41',
              para: '1'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1937-1945/pearl-harbor'
          }
        },
        {
          id: 'q8',
          text: 'In 1945 China emerged from the war nominally a great military power but actually a nation economically prostrate and on the verge of all-out civil war.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'Anti-Japanese War', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/22.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1937-12-13' },
            cites: [
              {
                source: 'askew-2002-nanjing-incident-recent-research',
                loc: { section: 'The Nanjing Incident: Recent Research and Trends', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'The Nanjing Incident refers to the killing and raping of large numbers of Chinese over a relatively short period of time by the Japanese military after the city of Nanjing was captured on 13 December 1937.',
        lang: 'en',
        cite: {
          source: 'askew-2002-nanjing-incident-recent-research',
          loc: { section: 'The Nanjing Incident: Recent Research and Trends', para: '3' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'http://www.japanesestudies.org.uk/articles/Askew.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1945-09-02' },
            cites: [
              {
                source: 'loc-japan-country-study-1994',
                loc: { section: 'WORLD WAR II AND THE OCCUPATION', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'The documents of surrender were signed on board the U.S.S. Missouri in Tokyo Bay on September 2, 1945.',
        lang: 'en',
        cite: {
          source: 'loc-japan-country-study-1994',
          loc: { section: 'WORLD WAR II AND THE OCCUPATION', para: '1' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/japan/33.htm' }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/39/Japanese_Special_Naval_Landing_Forces_in_Battle_of_Shanghai_1937.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Japanese_Special_Naval_Landing_Forces_in_Battle_of_Shanghai_1937.jpg',
    credit: { institution: 'Ministry of the Navy (Japan)' },
    license: { id: 'public-domain' }
  },
  archive: [
    {
      id: 'bombing-of-uss-panay-1937-12-12',
      mediaKind: 'video',
      title: 'Norman Alley\'s Bombing of USS Panay Special Issue, 1937/12/12',
      url: 'https://archive.org/download/1937-12-12_Bombing_of_USS_Panay/1937-12-12_Bombing_of_USS_Panay_512kb.mp4',
      page: 'https://archive.org/details/1937-12-12_Bombing_of_USS_Panay',
      credit: { institution: 'Universal Newsreels (Internet Archive)', creator: 'Norman Alley' },
      license: { id: 'public-domain' },
      bytes: 94801468,
      date: { d: '1937-12-12' },
      durationSec: 1313
    }
  ],
  furtherReading: [
    { source: 'ams-1991-zhongguo-kangri-zhanzheng-shi', perspective: 'chinese' },
    { source: 'zhang-2001-zhongguo-kangri-zhanzheng-shi', perspective: 'chinese' },
    { source: 'senshishitsu-1975-shina-jihen-rikugun-sakusen', perspective: 'japanese' },
    { source: 'hata-1961-nitchu-senso-shi', perspective: 'japanese' },
    { source: 'kasahara-2017-nitchu-senso-zenshi', perspective: 'japanese' }
  ]
})
