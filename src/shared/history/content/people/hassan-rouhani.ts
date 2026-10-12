import { definePerson } from '../../schema'

export default definePerson({
  id: 'hassan-rouhani',
  names: [
    { text: 'Hassan Rouhani', lang: 'en', role: 'primary' },
    { text: 'حسن روحانی', lang: 'fa', role: 'native' },
    { text: 'Hassan Rohani', lang: 'en', role: 'alternative' },
    { text: 'Hassan Rowhani', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-13',
  born: {
    alts: [
      {
        value: { d: '1948-11-12' },
        cites: [
          { source: 'lc-names-rouhani-hassan-n2007031479', loc: { section: 'Rūḥānī, Ḥasan' } }
        ]
      }
    ]
  },
  regions: ['iran'],
  roles: ['politician', 'cleric', 'diplomat', 'head-of-state'],
  offices: [
    {
      title: 'Secretary of the Supreme National Security Council',
      polity: 'polity:islamic-republic-of-iran',
      end: {
        alts: [
          {
            value: { d: '2005-08' },
            cites: [
              {
                source: 'acronym-2005-dd80-irans-nuclear-programme-eu-3-snubbed',
                loc: {
                  section: 'Iran\'s Nuclear Programme: EU-3 Snubbed as Iran begins Uranium Conversion at Isfahan',
                  para: '20'
                }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'acronym-2003-11-10-iaea-report-on-iran-gov-2003-75',
          loc: {
            section: 'Implementation of the NPT Safeguards Agreement in the Islamic Republic of Iran (GOV/2003/75)',
            para: '21'
          }
        }
      ]
    },
    {
      title: 'President of Iran',
      polity: 'polity:islamic-republic-of-iran',
      start: {
        alts: [
          {
            value: { d: '2013' },
            cites: [
              {
                source: 'hrw-2014-world-report-iran',
                loc: { section: 'World Report 2014: Iran', para: '4' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '2021' },
            cites: [
              {
                source: 'hrw-2022-world-report-iran',
                loc: { section: 'World Report 2022: Iran' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'hrw-2014-world-report-iran',
          loc: { section: 'World Report 2014: Iran', para: '4' }
        },
        { source: 'hrw-2018-world-report-iran', loc: { section: 'World Report 2018: Iran' } }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a6/Hassan_Rouhani_%282017-11-01%29.jpg/1280px-Hassan_Rouhani_%282017-11-01%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Hassan_Rouhani_(2017-11-01).jpg',
    credit: { institution: 'Presidential Press and Information Office (Russia)' },
    license: { id: 'cc-by', version: '4.0', url: 'https://creativecommons.org/licenses/by/4.0' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'On May 21, the Guardian Council, an unelected body of 12 religious jurists, disqualified all but eight of the more than 680 registered presidential candidates using vague criteria that enabled authorities to make sweeping and arbitrary exclusions. Nonetheless, turnout was high and voters overwhelmingly elected cleric and former diplomat Hassan Rouhani whose campaign promises included a “civil rights charter,” improving the economy, and greater political engagement with the West.',
          lang: 'en',
          cite: {
            source: 'hrw-2014-world-report-iran',
            loc: { section: 'World Report 2014: Iran', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/world-report/2014/country-chapters/iran'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'On 16 October 2003, at the invitation of the Iranian Government, the Director General met in Tehran with H.E. Dr. H. Rohani, Secretary of the Supreme National Security Council of Iran, to discuss the open issues requiring urgent resolution.',
          lang: 'en',
          cite: {
            source: 'acronym-2003-11-10-iaea-report-on-iran-gov-2003-75',
            loc: {
              section: 'Implementation of the NPT Safeguards Agreement in the Islamic Republic of Iran (GOV/2003/75)',
              para: '21'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.acronym.org.uk/old/archive/docs/0311/doc26.htm'
          }
        },
        {
          id: 'q3',
          text: 'August 8 - Ali Larijani named to replace Hojatoleslam Hassan Rohani as Iran\'s chief nuclear negotiator.',
          lang: 'en',
          cite: {
            source: 'acronym-2005-dd80-irans-nuclear-programme-eu-3-snubbed',
            loc: {
              section: 'Iran\'s Nuclear Programme: EU-3 Snubbed as Iran begins Uranium Conversion at Isfahan',
              para: '20'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.acronym.org.uk/old/archive/textonly/dd/dd80/80news01.htm'
          }
        },
        {
          id: 'q4',
          text: 'Following Rouhani’s inauguration, authorities in September released at least a dozen rights activists and political opposition figures, but scores of others jailed for their affiliation with banned opposition parties, labor unions, and student groups remain in prison.',
          lang: 'en',
          cite: {
            source: 'hrw-2014-world-report-iran',
            loc: { section: 'World Report 2014: Iran', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/world-report/2014/country-chapters/iran'
          }
        },
        {
          id: 'q5',
          text: 'President Hassan Rouhani secured a second four-year term in office in May 2017, in an election marked by debate over the state of civil and political rights in Iran.',
          lang: 'en',
          cite: { source: 'hrw-2018-world-report-iran', loc: { section: 'World Report 2018: Iran' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/world-report/2018/country-chapters/iran'
          }
        }
      ]
    }
  ]
})
