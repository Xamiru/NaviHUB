import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'uniform-dress-law-of-1928',
  names: [
    { text: 'Uniform dress law of 1928', lang: 'en', role: 'primary' },
    { text: 'قانون متحدالشکل شدن البسه', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'law',
  start: {
    alts: [
      {
        value: { d: '1928-12-27' },
        cites: [
          {
            source: 'iranica-saidi-sirjani-clothing-pahlavi',
            loc: { section: 'CLOTHING xi. In the Pahlavi and post-Pahlavi periods', para: '4' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 3,
  partOf: [
    { ref: 'period:pahlavi-dynasty' },
    { ref: 'period:reign-of-reza-shah' }
  ],
  polities: [
    { ref: 'polity:pahlavi-iran' }
  ],
  participants: [
    {
      ref: 'person:reza-shah-pahlavi',
      role: 'head-of-state',
      cites: [
        {
          source: 'iranica-saidi-sirjani-clothing-pahlavi',
          loc: { section: 'CLOTHING xi. In the Pahlavi and post-Pahlavi periods', para: '1' }
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
          text: 'The uniform dress law is passed by the Majles requiring citizens to wear Western attire and the Pahlavi hat.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1928' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-2/'
          }
        },
        {
          id: 'q2',
          text: 'All government workers, as well as school­boys, were to wear cylindrical hats with bills (known as kolāh-e pahlavī, “Pahlavi cap”; plate cxxvi) in­stead of the customary fur hats, turbans, or ovoid hats.',
          lang: 'en',
          cite: {
            source: 'iranica-saidi-sirjani-clothing-pahlavi',
            loc: { section: 'CLOTHING xi. In the Pahlavi and post-Pahlavi periods', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/clothing-xi/'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'On 29 Bahman (Dalw) 1301 Š./18 February 1923 parliament ratified a bill requiring all civil servants, cabinet members, and parliamentary deputies to wear Persian-made clothing during business hours',
          lang: 'en',
          cite: {
            source: 'iranica-saidi-sirjani-clothing-pahlavi',
            loc: { section: 'CLOTHING xi. In the Pahlavi and post-Pahlavi periods', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/clothing-xi/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q4',
          text: 'The imposition of the Pahlavi cap and the prohibition of traditional headgear aroused strong opposition, es­pecially among two groups. The first included tradi­tionalists, who considered turbans a sign of distinction, and tribesmen, who identified themselves by the styles and colors of their headgear. The second comprised the proprietors of textile factories, who were brought to the brink of bankruptcy by the new regulations.',
          lang: 'en',
          cite: {
            source: 'iranica-saidi-sirjani-clothing-pahlavi',
            loc: { section: 'CLOTHING xi. In the Pahlavi and post-Pahlavi periods', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/clothing-xi/'
          }
        },
        {
          id: 'q5',
          text: 'Gradually men became accustomed to the Pahlavi cap, though opposition continued to be voiced, mainly by the Muslim clergy, particularly among the lower and less educated ranks',
          lang: 'en',
          cite: {
            source: 'iranica-saidi-sirjani-clothing-pahlavi',
            loc: { section: 'CLOTHING xi. In the Pahlavi and post-Pahlavi periods', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/clothing-xi/'
          }
        },
        {
          id: 'q6',
          text: 'Determined to unify what he saw as Iran\'s heterogeneous peoples, end foreign influence, and emancipate women, Reza Shah imposed European dress on the population.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE ERA OF REZA SHAH', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/iran/15.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1928-09-26' },
            cites: [
              {
                source: 'iranica-saidi-sirjani-clothing-pahlavi',
                loc: { section: 'CLOTHING xi. In the Pahlavi and post-Pahlavi periods', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'On 4 Mehr 1307 Š./26 September 1928 the cabinet resolved that all male Persians dress uniformly in Western style.',
        lang: 'en',
        cite: {
          source: 'iranica-saidi-sirjani-clothing-pahlavi',
          loc: { section: 'CLOTHING xi. In the Pahlavi and post-Pahlavi periods', para: '3' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/clothing-xi/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1928-12-27' },
            cites: [
              {
                source: 'iranica-saidi-sirjani-clothing-pahlavi',
                loc: { section: 'CLOTHING xi. In the Pahlavi and post-Pahlavi periods', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'As a result, on 6 Day 1307 Š./27 December 1928 the seventh parliament passed a law ratifying the cabinet decree and making the clothing regulations both legal and compulsory',
        lang: 'en',
        cite: {
          source: 'iranica-saidi-sirjani-clothing-pahlavi',
          loc: { section: 'CLOTHING xi. In the Pahlavi and post-Pahlavi periods', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/clothing-xi/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1929-03-21' },
            cites: [
              {
                source: 'iranica-saidi-sirjani-clothing-pahlavi',
                loc: { section: 'CLOTHING xi. In the Pahlavi and post-Pahlavi periods', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'Only the clergy, including instructors at religious seminaries, and leaders of other officially recognized religions were exempt from this decree, which went into effect on 1 Farvardīn 1308 Š./21 March 1929 in the towns and a year later in villages and rural areas',
        lang: 'en',
        cite: {
          source: 'iranica-saidi-sirjani-clothing-pahlavi',
          loc: { section: 'CLOTHING xi. In the Pahlavi and post-Pahlavi periods', para: '3' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/clothing-xi/'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/59/The_Pahlavi_Hat_in_the_1936_Pars_Yearbook.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:The_Pahlavi_Hat_in_the_1936_Pars_Yearbook.jpg',
    credit: { institution: 'Pars Yearbook (1936)' },
    license: { id: 'public-domain' }
  }
})
