import { definePerson } from '../../schema'

export default definePerson({
  id: 'sun-yat-sen',
  names: [
    { text: 'Sun Yat-sen', lang: 'en', role: 'primary' },
    { text: '孫中山', lang: 'zh', role: 'native' },
    {
      text: 'Sun Yixian',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Republican Revolution of 1911', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1866' },
        cites: [
          {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Republican Revolution of 1911', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1925' },
        cites: [
          {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Republican Revolution of 1911', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['east-asia'],
  roles: ['revolutionary', 'head-of-state'],
  offices: [
    {
      title: 'provisional president of the new Chinese republic',
      polity: 'polity:republic-of-china',
      start: {
        alts: [
          {
            value: { d: '1912-01-01' },
            cites: [
              {
                source: 'loc-china-country-study-1987',
                loc: { section: 'The Republican Revolution of 1911', para: '2' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Republican Revolution of 1911', para: '2' }
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
          text: 'The revolutionary leader was Sun Yat-sen (Sun Yixian in pinyin, 1866- 1925), a republican and anti-Qing activist who became increasingly popular among the overseas Chinese and Chinese students abroad, especially in Japan.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Republican Revolution of 1911', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/19.htm' }
        }
      ]
    },
    {
      kind: 'ideas',
      quotes: [
        {
          id: 'q2',
          text: 'It centered on the Three Principles of the People (san min zhuyi): "nationalism, democracy, and people\'s livelihood." The principle of nationalism called for overthrowing the Manchus and ending foreign hegemony over China. The second principle, democracy, was used to describe Sun\'s goal of a popularly elected republican form of government. People\'s livelihood, often referred to as socialism, was aimed at helping the common people through regulation of the ownership of the means of production and land.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Republican Revolution of 1911', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/china/19.htm' }
        },
        {
          id: 'q3',
          text: 'The Revolutionary Alliance advocated replacing Qing rule with a republican government; Sun himself was a nationalist with some socialist tendencies.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-chinese-revolution-of-1911',
            loc: { section: 'The Chinese Revolution of 1911', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1899-1913/chinese-rev'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/50/Yat-Sen_Sun_1866-1925_LCCN2004672775_%28cropped%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Yat-Sen_Sun_1866-1925_LCCN2004672775_(cropped).jpg',
    credit: { institution: 'Library of Congress' },
    license: { id: 'public-domain' }
  }
})
