import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'founding-of-the-peoples-republic-of-china',
  names: [
    { text: 'Founding of the People\'s Republic of China', lang: 'en', role: 'primary' },
    { text: '中华人民共和国成立', lang: 'zh', role: 'native' },
    {
      text: 'Chinese Revolution of 1949',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'state-dept-milestones-chinese-revolution-of-1949',
          loc: { section: 'The Chinese Revolution of 1949', para: '0' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  type: 'revolution',
  start: {
    alts: [
      {
        value: { d: '1949-10-01' },
        cites: [
          {
            source: 'state-dept-milestones-chinese-revolution-of-1949',
            loc: { section: 'The Chinese Revolution of 1949', para: '1' }
          },
          {
            source: 'loc-china-country-study-1987',
            loc: { section: 'THE PEOPLE\'S REPUBLIC OF CHINA', para: '1' }
          },
          { source: 'lemo-chronik-1949', loc: { section: 'Jahreschronik 1949', para: '133' } }
        ]
      }
    ]
  },
  regions: ['east-asia'],
  prominence: 2,
  places: [
    {
      ref: 'place:beijing',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'THE PEOPLE\'S REPUBLIC OF CHINA', para: '1' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:mao-zedong',
      role: 'leader',
      cites: [
        {
          source: 'state-dept-milestones-chinese-revolution-of-1949',
          loc: { section: 'The Chinese Revolution of 1949', para: '1' }
        },
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'THE PEOPLE\'S REPUBLIC OF CHINA', para: '1' }
        }
      ]
    },
    {
      ref: 'person:chiang-kai-shek',
      role: 'head-of-state',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'Return to Civil War', para: '4' }
        }
      ]
    },
    {
      name: 'Zhou Enlai',
      role: 'head-of-government',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'THE PEOPLE\'S REPUBLIC OF CHINA', para: '1' }
        }
      ]
    },
    {
      name: 'George C. Marshall',
      role: 'diplomat',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'Return to Civil War', para: '3' }
        },
        {
          source: 'state-dept-milestones-chinese-revolution-of-1949',
          loc: { section: 'The Chinese Revolution of 1949', para: '8' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:second-sino-japanese-war',
      rel: 'related',
      cites: [
        {
          source: 'state-dept-milestones-chinese-revolution-of-1949',
          loc: { section: 'The Chinese Revolution of 1949', para: '7' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'On October 1, 1949, Chinese Communist leader Mao Zedong declared the creation of the People’s Republic of China (PRC). The announcement ended the costly full-scale civil war between the Chinese Communist Party (CCP) and the Nationalist Party, or Kuomintang (KMT), which broke out immediately following World War II and had been preceded by on and off conflict between the two sides since the 1920’s.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-chinese-revolution-of-1949',
            loc: { section: 'The Chinese Revolution of 1949', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1945-1952/chinese-rev'
          }
        },
        {
          id: 'q2',
          text: 'On October 1, 1949, the People\'s Republic of China was formally established, with its national capital at Beijing. "The Chinese people have stood up!" declared Mao as he announced the creation of a "people\'s democratic dictatorship."',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'THE PEOPLE\'S REPUBLIC OF CHINA', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/24.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'The truce was tenuous, however, and, in spite of repeated efforts by U.S. General George Marshall to broker an agreement, by 1946 the two sides were fighting an all-out civil war.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-chinese-revolution-of-1949',
            loc: { section: 'The Chinese Revolution of 1949', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1945-1952/chinese-rev'
          }
        },
        {
          id: 'q4',
          text: 'Belatedly, the Nationalist government sought to enlist popular support through internal reforms. The effort was in vain, however, because of the rampant corruption in government and the accompanying political and economic chaos. By late 1948 the Nationalist position was bleak. The demoralized and undisciplined Nationalist troops proved no match for the People\'s Liberation Army (PLA).',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'Return to Civil War', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/23.htm' }
        }
      ]
    },
    {
      kind: 'causes',
      quotes: [
        {
          id: 'q5',
          text: 'Although the Communists did not hold any major cities after World War II, they had strong grassroots support, superior military organization and morale, and large stocks of weapons seized from Japanese supplies in Manchuria. Years of corruption and mismanagement had eroded popular support for the Nationalist Government.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-chinese-revolution-of-1949',
            loc: { section: 'The Chinese Revolution of 1949', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1945-1952/chinese-rev'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q6',
          text: 'After Chiang Kai-shek and a few hundred thousand Nationalist troops fled from the mainland to the island of Taiwan, there remained only isolated pockets of resistance. In December 1949 Chiang proclaimed Taipei, Taiwan, the temporary capital of China.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'Return to Civil War', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/23.htm' }
        },
        {
          id: 'q7',
          text: 'In August of 1949, the Truman administration published the “China White Paper,” which explained past U.S. policy toward China based upon the principle that only Chinese forces could determine the outcome of their civil war. Unfortunately for Truman, this step failed to protect his administration from charges of having “lost” China.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-chinese-revolution-of-1949',
            loc: { section: 'The Chinese Revolution of 1949', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1945-1952/chinese-rev'
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
            value: { d: '1949-01' },
            cites: [
              {
                source: 'loc-china-country-study-1987',
                loc: { section: 'Return to Civil War', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'In January 1949 Beiping was taken by the Communists without a fight, and its name changed back to Beijing.',
        lang: 'en',
        cite: {
          source: 'loc-china-country-study-1987',
          loc: { section: 'Return to Civil War', para: '4' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/23.htm' }
      }
    }
  ]
})
