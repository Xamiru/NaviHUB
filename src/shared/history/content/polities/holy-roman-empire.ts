import { definePolity } from '../../schema'

export default definePolity({
  id: 'holy-roman-empire',
  names: [
    { text: 'Holy Roman Empire', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-13',
  polityType: 'empire',
  start: {
    alts: [
      {
        value: { d: '0962' },
        cites: [
          {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The Saxon Dynasty, 919-1024', para: '2' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1806' },
        cites: [
          {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The French Revolution and Germany', para: '5' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 1,
  cshapes: [
    { set: 'early', code: 12548, to: 1700 }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/d/dc/Banner_of_Charles_V_as_Holy_Roman_Emperor.svg',
    page: 'https://commons.wikimedia.org/wiki/File:Banner_of_Charles_V_as_Holy_Roman_Emperor.svg',
    credit: { creator: 'Proof02' },
    license: { id: 'cc-by-sa', version: '3.0', url: 'https://creativecommons.org/licenses/by-sa/3.0' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'In 962 Otto, who had also gained control of the Middle Kingdom, was formally crowned king of the Romans.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The Saxon Dynasty, 919-1024', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/germany/7.htm' }
        },
        {
          id: 'q2',
          text: 'After the interregnum period, Germany\'s emperors came from three powerful dynastic houses: Luxemburg (in Bohemia), Wittelsbach (in Bavaria), and Habsburg (in Austria).',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The Empire under the Early Habsburgs', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/germany/10.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'The Golden Bull of 1356, an edict promulgated by Emperor Charles IV (r. 1355-78) of the Luxemburg family, provided the basic constitution of the empire up to its dissolution.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The Empire under the Early Habsburgs', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/germany/10.htm' }
        },
        {
          id: 'q4',
          text: 'It formalized the practice of having seven electors--the archbishops of the cities of Trier, Cologne, and Mainz, and the rulers of the Palatinate, Saxony, Brandenburg, and Bohemia--choose the emperor, and it represented a further political consolidation of the principalities.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The Empire under the Early Habsburgs', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/germany/10.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'Charles had been out of Germany between 1521 and 1530, and when he returned he found that the new religion had won too many adherents to be easily uprooted.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Resistance to Lutheranism', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/germany/13.htm' }
        },
        {
          id: 'q6',
          text: 'By the early 1550s, it was apparent that a negotiated settlement was necessary.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The Peace of Augsburg', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/germany/14.htm' }
        },
        {
          id: 'q7',
          text: 'The Peace of Augsburg brought peace but did not settle the religious disagreements in Germany.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The Counter-Reformation and Religious Tensions', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/germany/16.htm' }
        },
        {
          id: 'q8',
          text: 'In 1618 Bohemian nobles opposed the decision of Emperor Matthias (r. 1608-19) to designate his Catholic cousin Ferdinand king of Bohemia.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Military Campaigns', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/germany/17.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q9',
          text: 'The Peace of Westphalia largely settled German affairs for the next century and a half.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The Peace of Westphalia', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/germany/18.htm' }
        },
        {
          id: 'q10',
          text: 'The Habsburgs would continue to be crowned emperors, but their strength would derive from their own holdings, not from leadership of the empire.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The Peace of Westphalia', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/germany/18.htm' }
        },
        {
          id: 'q11',
          text: 'Approximately 300 states had existed within the Holy Roman Empire in 1789; only about forty remained by 1814.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The French Revolution and Germany', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/germany/22.htm' }
        }
      ]
    }
  ]
})
