import { definePolity } from '../../schema'

export default definePolity({
  id: 'polish-lithuanian-commonwealth',
  names: [
    { text: 'Polish–Lithuanian Commonwealth', lang: 'en', role: 'primary' },
    {
      text: 'Commonwealth of Two Nations',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-poland-country-study-1992',
          loc: { section: 'The Jagiellon Era, 1385-1572', para: '4' }
        }
      ]
    },
    {
      text: 'Poland',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-poland-country-study-1992',
          loc: { section: 'The Three Partitions, 1764-95', para: '1' }
        }
      ]
    },
    {
      text: 'Poland-Lithuania',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-poland-country-study-1992',
          loc: { section: 'The Three Partitions, 1764-95', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-13',
  polityType: 'republic',
  start: {
    alts: [
      {
        value: { d: '1569' },
        cites: [
          {
            source: 'loc-poland-country-study-1992',
            loc: { section: 'The “Golden Age” of the Sixteenth Century', para: '16' }
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
            source: 'loc-poland-country-study-1992',
            loc: { section: 'The Three Partitions, 1764-95', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 1,
  cshapes: [
    { set: 'early', code: 172107, to: 1795 }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Coat_of_arms_of_the_Polish%E2%80%93Lithuanian_Commonwealth_with_Polish_Eagle_and_Lithuanian_Vytis_%28Waykimas%29%2C_1601-1700.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Coat_of_arms_of_the_Polish%E2%80%93Lithuanian_Commonwealth_with_Polish_Eagle_and_Lithuanian_Vytis_(Waykimas),_1601-1700.jpg',
    credit: { institution: 'Bibliothèque nationale de France' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Poland and Lithuania would maintain joint statehood for more than 400 years, and over the first three centuries of that span the "Commonwealth of Two Nations" ranked as one of the leading powers of the continent.',
          lang: 'en',
          cite: {
            source: 'loc-poland-country-study-1992',
            loc: { section: 'The Jagiellon Era, 1385-1572', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/poland/6.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'In the mid-sixteenth century, Poland-Lithuania sought ways to maintain control of the diverse kingdom in spite of two threatening circumstances. First, since the late 1400s a series of ambitious tsars of the house of Rurik had led Russia in competing with Poland-Lithuania for influence over the Slavic territories located between the two states. Second, Sigismund II Augustus (1548-72) had no male heir. The Jagiellon Dynasty, the strongest link between the halves of the state, would end after his reign. Accordingly, the Union of Lublin of 1569 transformed the loose federation and personal union of the Jagiellonian epoch into the Polish-Lithuanian Commonwealth, deepening and formalizing the bonds between Poland and Lithuania.',
          lang: 'en',
          cite: {
            source: 'loc-poland-country-study-1992',
            loc: { section: 'The “Golden Age” of the Sixteenth Century', para: '16' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/poland/7.htm' }
        },
        {
          id: 'q3',
          text: 'Although most accounts of Polish history show the two centuries after the end of the Jagiellon Dynasty as a time of decline leading to foreign domination, Poland-Lithuania remained an influential player in European politics and a vital cultural entity through most of the period.',
          lang: 'en',
          cite: {
            source: 'loc-poland-country-study-1992',
            loc: { section: 'The Noble Republic, 1572-1795', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/poland/8.htm' }
        },
        {
          id: 'q4',
          text: 'The death of Sigismund II Augustus in 1572 was followed by a three-year Interregnum during which adjustments were made in the constitutional system.',
          lang: 'en',
          cite: {
            source: 'loc-poland-country-study-1992',
            loc: { section: 'The Noble Republic, 1572-1795', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/poland/8.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'Before another 100 years had elapsed, Poland-Lithuania had virtually ceased to function as a coherent and genuinely independent state.',
          lang: 'en',
          cite: {
            source: 'loc-poland-country-study-1992',
            loc: { section: 'Decay of the Commonwealth', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/poland/10.htm' }
        },
        {
          id: 'q6',
          text: 'During the reign of Peter the Great (1682-1725), the commonwealth fell under the dominance of Russia, and by the middle of the eighteenth century Poland-Lithuania had been made a virtual protectorate of its eastern neighbor, retaining only the theoretical right to self-rule.',
          lang: 'en',
          cite: {
            source: 'loc-poland-country-study-1992',
            loc: { section: 'Decay of the Commonwealth', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/poland/10.htm' }
        },
        {
          id: 'q7',
          text: 'The defeat of the Confederation of Bar again left Poland exposed to the ambitions of its neighbors.',
          lang: 'en',
          cite: {
            source: 'loc-poland-country-study-1992',
            loc: { section: 'The Three Partitions, 1764-95', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/poland/11.htm' }
        },
        {
          id: 'q8',
          text: 'Stanislaw August\'s process of renovation reached its climax on May 3, 1791, when, after three years of intense debate, the "Four Years\' Sejm" produced Europe\'s first written constitution.',
          lang: 'en',
          cite: {
            source: 'loc-poland-country-study-1992',
            loc: { section: 'The Three Partitions, 1764-95', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/poland/11.htm' }
        },
        {
          id: 'q9',
          text: 'In 1792 domestic and foreign reactionaries combined to end the democratization process.',
          lang: 'en',
          cite: {
            source: 'loc-poland-country-study-1992',
            loc: { section: 'The Three Partitions, 1764-95', para: '9' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/poland/11.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q10',
          text: 'In the eighteenth century, the powers of the monarchy and the central administration became purely trivial.',
          lang: 'en',
          cite: {
            source: 'loc-poland-country-study-1992',
            loc: { section: 'Decay of the Commonwealth', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/poland/10.htm' }
        },
        {
          id: 'q11',
          text: 'The third partition in 1795 wiped Poland-Lithuania from the map of Europe.',
          lang: 'en',
          cite: {
            source: 'loc-poland-country-study-1992',
            loc: { section: 'The Three Partitions, 1764-95', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/poland/11.htm' }
        }
      ]
    }
  ]
})
