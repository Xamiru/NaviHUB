import { definePerson } from '../../schema'

export default definePerson({
  id: 'mahmoud-abbas',
  names: [
    { text: 'Mahmoud Abbas', lang: 'en', role: 'primary' },
    { text: 'محمود عباس', lang: 'ar', role: 'native' },
    { text: 'Abu Mazen', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-13',
  born: {
    alts: [
      {
        value: { d: '1935-03-26' },
        cites: [
          {
            source: 'lc-names-abbas-mahmoud-n79066862',
            loc: { section: 'ʻAbbās, Maḥmūd, 1935-' }
          }
        ]
      }
    ]
  },
  regions: ['mena'],
  roles: ['politician', 'head-of-state'],
  offices: [
    {
      title: 'President of the Palestinian Authority',
      start: {
        alts: [
          {
            value: { d: '2005-01-09' },
            cites: [
              {
                source: 'hrw-2006-world-report-israel-and-the-occupied-palestinian-territories',
                loc: { section: 'World Report 2006: Israel/Occupied Palestinian Territories' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'hrw-2006-world-report-israel-and-the-occupied-palestinian-territories',
          loc: { section: 'World Report 2006: Israel/Occupied Palestinian Territories' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/b/b0/Mahmoud_Abbas.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Mahmoud_Abbas.jpg',
    credit: { institution: 'The White House', creator: 'Lawrence Jackson' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Following the death of Palestinian leader Yasser Arafat in November 2004, Palestinians held their second-ever national elections on January 9, 2005. The main contender, Mahmoud Abbas (Abu Mazen), became the second Palestinian president with 62.52% of the vote.',
          lang: 'en',
          cite: {
            source: 'hrw-2006-world-report-israel-and-the-occupied-palestinian-territories',
            loc: { section: 'World Report 2006: Israel/Occupied Palestinian Territories' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/world-report/2006/country-chapters/israel/palestine'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'On September 13, 1993, Israeli Prime Minister Yitzhak Rabin and Palestine Liberation Organization (PLO) Negotiator Mahmoud Abbas signed a Declaration of Principles on Interim Self-Government Arrangements, commonly referred to as the “Oslo Accord,” at the White House.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-oslo-accords-and-the-arab-israeli-peace-process',
            loc: { section: 'The Oslo Accords and the Arab-Israeli Peace Process', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://history.state.gov/milestones/1993-2000/oslo'
          }
        },
        {
          id: 'q3',
          text: 'On February 8, 2005 Mahmoud Abbas and Israeli Prime Minister Ariel Sharon met in Sharm el-Sheikh for the first Israeli-Palestinian summit in four years.',
          lang: 'en',
          cite: {
            source: 'hrw-2006-world-report-israel-and-the-occupied-palestinian-territories',
            loc: { section: 'World Report 2006: Israel/Occupied Palestinian Territories' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/world-report/2006/country-chapters/israel/palestine'
          }
        },
        {
          id: 'q4',
          text: 'In the OPT, despite Abbas’ pledges of restored law and order and his reorganization of the security services, including firing long-standing officials who P.A. authorities deemed inept or corrupt, control of the Palestinian Authority over Palestinian population centers is frequently nominal at best, and conditions of lawlessness have increased in the Gaza Strip and parts of the West Bank in 2005.',
          lang: 'en',
          cite: {
            source: 'hrw-2006-world-report-israel-and-the-occupied-palestinian-territories',
            loc: { section: 'World Report 2006: Israel/Occupied Palestinian Territories' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/world-report/2006/country-chapters/israel/palestine'
          }
        },
        {
          id: 'q5',
          text: 'Although President Mahmoud Abbas of Fatah retained his position as president of the Palestinian Authority (PA), tensions between Fatah and Hamas increased during the year.',
          lang: 'en',
          cite: {
            source: 'hrw-2007-world-report-israel-and-the-occupied-palestinian-territories',
            loc: { section: 'World Report 2007: Israel', para: '17' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/world-report/2007/country-chapters-5'
          }
        }
      ]
    }
  ]
})
