import { definePolity } from '../../schema'

export default definePolity({
  id: 'dutch-republic',
  names: [
    { text: 'Dutch Republic', lang: 'en', role: 'primary' },
    {
      text: 'United Provinces of the Netherlands',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-indonesia-country-study-1992',
          loc: { section: 'The United East India Company', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-13',
  polityType: 'republic',
  start: {
    alts: [
      {
        value: { d: '1581' },
        cites: [
          {
            source: 'loc-indonesia-country-study-1992',
            loc: { section: 'The United East India Company', para: '1' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1795' },
        cites: [
          {
            source: 'loc-indonesia-country-study-1992',
            loc: { section: 'VOC Bankruptcy and the British Occupation', para: '2' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 1,
  cshapes: [
    { set: 'early', code: 170072, to: 1700 }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/59/1649-08-07_Grootzegel_Staten-Generaal.png/1280px-1649-08-07_Grootzegel_Staten-Generaal.png',
    page: 'https://commons.wikimedia.org/wiki/File:1649-08-07_Grootzegel_Staten-Generaal.png',
    credit: { creator: 'Anonymous' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The United Provinces of the Netherlands was, in a sense, the world\'s first modern state.',
          lang: 'en',
          cite: {
            source: 'loc-indonesia-country-study-1992',
            loc: { section: 'The United East India Company', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/indonesia/7.htm' }
        },
        {
          id: 'q2',
          text: 'Winning independence from Spain in 1581, the Netherlands became a major seafaring power.',
          lang: 'en',
          cite: {
            source: 'loc-indonesia-country-study-1992',
            loc: { section: 'The United East India Company', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/indonesia/7.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Unhappily for Spain, Charles, after some hesitation, decided to transmit the Netherlands to his son, and not to allow them to go with the empire.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-philip-ii-of-spain',
            loc: { section: 'Philip II. of Spain', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Philip_II._of_Spain'
          }
        },
        {
          id: 'q4',
          text: 'Thus external and internal influences alike drove him into conflict with the Netherlands, France and England; with the first because political and religious discontent combined to bring about revolt, which he felt bound in duty to crush; with the second and third because they helped the Flemings and the Hollanders.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-philip-ii-of-spain',
            loc: { section: 'Philip II. of Spain', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Philip_II._of_Spain'
          }
        },
        {
          id: 'q5',
          text: 'He became, and could not but become, a persecutor in and out of Spain; and his persecutions not only hardened the obstinacy of the Dutch, and helped to exasperate the English, but they provoked a revolt of the Moriscoes, which impoverished his kingdom.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-philip-ii-of-spain',
            loc: { section: 'Philip II. of Spain', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Philip_II._of_Spain'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q6',
          text: 'In 1602, however, these companies merged to form the United East India Company (VOC) under a charter issued by the Dutch parliament, the Staten-Generaal.',
          lang: 'en',
          cite: {
            source: 'loc-indonesia-country-study-1992',
            loc: { section: 'The United East India Company', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/indonesia/7.htm' }
        },
        {
          id: 'q7',
          text: 'Although its directors, the Heeren Zeventien (Seventeen Gentlemen), were motivated solely by profit, the VOC was not simply a trading company in the modern sense of the word.',
          lang: 'en',
          cite: {
            source: 'loc-indonesia-country-study-1992',
            loc: { section: 'The United East India Company', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/indonesia/7.htm' }
        },
        {
          id: 'q8',
          text: 'The independence of Switzerland was at last formally recognized, as was that of the United Netherlands in a separate treaty signed by Spain at Münster.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-westphalia-treaty-of',
            loc: { section: 'Westphalia, Treaty of', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Westphalia,_Treaty_of'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q9',
          text: 'During the seventeenth century, Amsterdam emerged as Europe\'s primary center for commerce and banking.',
          lang: 'en',
          cite: {
            source: 'loc-indonesia-country-study-1992',
            loc: { section: 'The United East India Company', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/indonesia/7.htm' }
        },
        {
          id: 'q10',
          text: 'The Netherlands was occupied by French troops in 1795, and a French protectorate established.',
          lang: 'en',
          cite: {
            source: 'loc-indonesia-country-study-1992',
            loc: { section: 'VOC Bankruptcy and the British Occupation', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/indonesia/9.htm' }
        }
      ]
    }
  ]
})
