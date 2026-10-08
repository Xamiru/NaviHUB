import { definePerson } from '../../schema'

export default definePerson({
  id: 'ito-hirobumi',
  names: [
    { text: 'Ito Hirobumi', lang: 'en', role: 'primary' },
    { text: '伊藤博文', lang: 'ja', role: 'native' }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1841' },
        cites: [
          {
            source: 'britannica-1911-ito-hirobumi',
            loc: { section: 'ITO, HIROBUMI, Prince', para: '1' }
          },
          {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'The Development of Representative Government', para: '5' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1909-10-26' },
        cites: [
          {
            source: 'britannica-1911-ito-hirobumi',
            loc: { section: 'ITO, HIROBUMI, Prince', para: '2' }
          }
        ]
      }
    ]
  },
  regions: ['east-asia'],
  roles: ['politician'],
  offices: [
    {
      title: 'Prime Minister of Japan',
      polity: 'polity:empire-of-japan',
      start: {
        alts: [
          {
            value: { d: '1885' },
            cites: [
              {
                source: 'loc-japan-country-study-1994',
                loc: { section: 'The Development of Representative Government', para: '6' }
              }
            ]
          },
          {
            value: { d: '1886' },
            cites: [
              {
                source: 'britannica-1911-ito-hirobumi',
                loc: { section: 'ITO, HIROBUMI, Prince', para: '2' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'loc-japan-country-study-1994',
          loc: { section: 'The Development of Representative Government', para: '6' }
        },
        {
          source: 'britannica-1911-ito-hirobumi',
          loc: { section: 'ITO, HIROBUMI, Prince', para: '2' }
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
          text: 'ITO, HIROBUMI, Prince (1841–1909), Japanese statesman, was born in 1841, being the son of Ito Jūzō, and (like his father) began life as a retainer of the lord of Choshu, one of the most powerful nobles of Japan.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-ito-hirobumi',
            loc: { section: 'ITO, HIROBUMI, Prince', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Ito,_Hirobumi,_Prince'
          }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q2',
          text: 'Ito felt that his knowledge of foreigners, if it was to be thorough, should be sought for in Europe, and with the connivance of Choshu he, in company with Inouye and three other young men of the same rank as himself, determined to risk their lives by committing the then capital offence of visiting a foreign country. With great secrecy they made their way to Nagasaki, where they concluded an arrangement with the agent of Messrs Jardine, Matheson & Co. for passages on board a vessel which was about to sail for Shanghai (1863). At that port the adventurers separated, three of their number taking ship as passengers to London, while Ito and Inouye preferred to work their passages before the mast in the “Pegasus,” bound for the same destination. For a year these two friends remained in London studying English methods,',
          lang: 'en',
          cite: {
            source: 'britannica-1911-ito-hirobumi',
            loc: { section: 'ITO, HIROBUMI, Prince', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Ito,_Hirobumi,_Prince'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q3',
          text: 'One of the Meiji oligarchy, Ito Hirobumi (1841-1909), a Choshu native long involved in government affairs, was charged with drafting Japan\'s constitution.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'The Development of Representative Government', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/japan/25.htm' }
        },
        {
          id: 'q4',
          text: 'In 1882 he was sent on a mission to Europe to study the various forms of constitutional government; on this occasion he attended the coronation of the tsar Alexander III. On his return to Japan he was entrusted with the arduous duty of drafting a constitution.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-ito-hirobumi',
            loc: { section: 'ITO, HIROBUMI, Prince', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Ito,_Hirobumi,_Prince'
          }
        },
        {
          id: 'q5',
          text: 'Between 1891 and 1895, Ito served as prime minister with a cabinet composed mostly of genro who wanted to establish a government party to control the House of Representatives.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'The Development of Representative Government', para: '10' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/japan/25.htm' }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q6',
          text: 'In September 1907 he was advanced to the rank of prince. He retired from his post in Korea in July 1909, and became president of the privy council in Japan. But on the 26th of October, when on a visit to Harbin, he was shot dead by a Korean assassin.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-ito-hirobumi',
            loc: { section: 'ITO, HIROBUMI, Prince', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Ito,_Hirobumi,_Prince'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/c/c0/Hirobumi_ITO.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Hirobumi_ITO.jpg',
    credit: { institution: 'National Diet Library' },
    license: { id: 'public-domain' }
  }
})
