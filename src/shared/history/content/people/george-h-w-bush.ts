import { definePerson } from '../../schema'

export default definePerson({
  id: 'george-h-w-bush',
  names: [
    { text: 'George H. W. Bush', lang: 'en', role: 'primary' },
    {
      text: 'George Herbert Walker Bush',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'millercenter-knott-bush-life-before-the-presidency',
          loc: { section: 'George H. W. Bush: Life Before the Presidency', para: '1' }
        }
      ]
    },
    {
      text: 'Bush 41',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'millercenter-bush-fast-facts',
          loc: { section: 'George H. W. Bush: Fast Facts' }
        }
      ]
    }
  ],
  researched: '2026-10-10',
  born: {
    alts: [
      {
        value: { d: '1924-06-12' },
        cites: [
          {
            source: 'millercenter-bush-fast-facts',
            loc: { section: 'George H. W. Bush: Fast Facts' }
          },
          {
            source: 'millercenter-knott-bush-life-before-the-presidency',
            loc: { section: 'George H. W. Bush: Life Before the Presidency', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '2018-11-30' },
        cites: [
          {
            source: 'millercenter-bush-fast-facts',
            loc: { section: 'George H. W. Bush: Fast Facts' }
          },
          {
            source: 'lc-names-bush-george-n80015879',
            loc: { section: 'Bush, George, 1924-2018' }
          }
        ]
      }
    ]
  },
  regions: ['north-america'],
  roles: ['head-of-state', 'politician'],
  offices: [
    {
      title: 'President of the United States',
      polity: 'polity:united-states',
      start: {
        alts: [
          {
            value: { d: '1989-01-20' },
            cites: [
              {
                source: 'millercenter-bush-fast-facts',
                loc: { section: 'George H. W. Bush: Fast Facts' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1993-01-20' },
            cites: [
              {
                source: 'millercenter-bush-fast-facts',
                loc: { section: 'George H. W. Bush: Fast Facts' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'millercenter-bush-fast-facts',
          loc: { section: 'George H. W. Bush: Fast Facts' }
        },
        {
          source: 'millercenter-bush-fast-facts',
          loc: { section: 'George H. W. Bush: Fast Facts' }
        }
      ]
    },
    {
      title: 'Director of Central Intelligence',
      polity: 'polity:united-states',
      cites: [
        {
          source: 'millercenter-knott-bush-life-before-the-presidency',
          loc: { section: 'George H. W. Bush: Life Before the Presidency', para: '11' }
        }
      ]
    },
    {
      title: 'Vice President of the United States',
      polity: 'polity:united-states',
      cites: [
        {
          source: 'millercenter-knott-bush-life-before-the-presidency',
          loc: { section: 'George H. W. Bush: Life Before the Presidency', para: '17' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/9f/Official_portrait_of_President_George_H_W_Bush_January_1992.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Official_portrait_of_President_George_H_W_Bush_January_1992.jpg',
    credit: { institution: 'George H.W. Bush Presidential Library and Museum' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'George Herbert Walker Bush was born in Milton, Massachusetts, on June 12, 1924.',
          lang: 'en',
          cite: {
            source: 'millercenter-knott-bush-life-before-the-presidency',
            loc: { section: 'George H. W. Bush: Life Before the Presidency', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://millercenter.org/president/bush/life-before-the-presidency'
          }
        },
        {
          id: 'q2',
          text: 'George Herbert Walker Bush came into the presidency as one of the most qualified candidates to assume the office.',
          lang: 'en',
          cite: {
            source: 'millercenter-knott-bush-impact-and-legacy',
            loc: { section: 'George H. W. Bush: Impact and Legacy', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://millercenter.org/president/bush/impact-and-legacy'
          }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q3',
          text: 'Bush left home as a teenager to attend Phillips Academy Andover, an exclusive boarding school in Massachusetts. At Andover, Bush was captain of the baseball and soccer teams, and the senior class president. He graduated on his eighteenth birthday in 1942. That same day, he enlisted in the United States Navy.',
          lang: 'en',
          cite: {
            source: 'millercenter-knott-bush-life-before-the-presidency',
            loc: { section: 'George H. W. Bush: Life Before the Presidency', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://millercenter.org/president/bush/life-before-the-presidency'
          }
        },
        {
          id: 'q4',
          text: 'He served in the Navy during World War II from 1942 until September 1945.',
          lang: 'en',
          cite: {
            source: 'millercenter-knott-bush-life-before-the-presidency',
            loc: { section: 'George H. W. Bush: Life Before the Presidency', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://millercenter.org/president/bush/life-before-the-presidency'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q5',
          text: 'In 1966, Bush ran for a seat in the U.S. House of Representatives from Houston\'s Seventh district.',
          lang: 'en',
          cite: {
            source: 'millercenter-knott-bush-life-before-the-presidency',
            loc: { section: 'George H. W. Bush: Life Before the Presidency', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://millercenter.org/president/bush/life-before-the-presidency'
          }
        },
        {
          id: 'q6',
          text: 'In December 1970, President Richard Nixon nominated Bush as the U.S. ambassador to the United Nations.',
          lang: 'en',
          cite: {
            source: 'millercenter-knott-bush-life-before-the-presidency',
            loc: { section: 'George H. W. Bush: Life Before the Presidency', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://millercenter.org/president/bush/life-before-the-presidency'
          }
        },
        {
          id: 'q7',
          text: 'Bush stepped down as head of the RNC after Gerald Ford became President. The new President appointed Bush as the U.S. envoy to the People\'s Republic of China.',
          lang: 'en',
          cite: {
            source: 'millercenter-knott-bush-life-before-the-presidency',
            loc: { section: 'George H. W. Bush: Life Before the Presidency', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://millercenter.org/president/bush/life-before-the-presidency'
          }
        },
        {
          id: 'q8',
          text: 'Ultimately, Bush emerged as the consensus choice for the second spot, in part due to his appeal to the more moderate wing of the party.',
          lang: 'en',
          cite: {
            source: 'millercenter-knott-bush-life-before-the-presidency',
            loc: { section: 'George H. W. Bush: Life Before the Presidency', para: '17' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://millercenter.org/president/bush/life-before-the-presidency'
          }
        },
        {
          id: 'q9',
          text: 'On August 2, 1990, Iraq invaded its neighbor Kuwait.',
          lang: 'en',
          cite: {
            source: 'millercenter-knott-bush-foreign-affairs',
            loc: { section: 'George H. W. Bush: Foreign Affairs', para: '20' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://millercenter.org/president/bush/foreign-affairs'
          }
        },
        {
          id: 'q10',
          text: 'He also articulated the four principles that guided "Operation Desert Shield": the immediate and complete withdrawal of Iraq from Kuwait; the restoration of the legitimate Kuwaiti government; the stability and security of the Middle East; and the protection of Americans abroad.',
          lang: 'en',
          cite: {
            source: 'millercenter-knott-bush-foreign-affairs',
            loc: { section: 'George H. W. Bush: Foreign Affairs', para: '22' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://millercenter.org/president/bush/foreign-affairs'
          }
        },
        {
          id: 'q11',
          text: 'However, President Bush and his team had been clear from the beginning that their primary war aim was to make Iraq withdraw from Kuwait, and they achieved that goal.',
          lang: 'en',
          cite: {
            source: 'millercenter-knott-bush-foreign-affairs',
            loc: { section: 'George H. W. Bush: Foreign Affairs', para: '27' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://millercenter.org/president/bush/foreign-affairs'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q12',
          text: 'Generally the Bush presidency is viewed as successful in foreign affairs but a disappointment in domestic affairs.',
          lang: 'en',
          cite: {
            source: 'millercenter-knott-bush-impact-and-legacy',
            loc: { section: 'George H. W. Bush: Impact and Legacy', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://millercenter.org/president/bush/impact-and-legacy'
          }
        },
        {
          id: 'q13',
          text: 'Bush had a conservative nature and was uncomfortable with bold, dramatic change, preferring stability and calm.',
          lang: 'en',
          cite: {
            source: 'millercenter-knott-bush-impact-and-legacy',
            loc: { section: 'George H. W. Bush: Impact and Legacy', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://millercenter.org/president/bush/impact-and-legacy'
          }
        }
      ]
    }
  ]
})
