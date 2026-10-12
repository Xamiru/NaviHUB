import { definePerson } from '../../schema'

export default definePerson({
  id: 'tony-blair',
  names: [
    { text: 'Tony Blair', lang: 'en', role: 'primary' },
    {
      text: 'Anthony Charles Lynton Blair',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'lc-names-blair-tony-no95058170', loc: { section: 'Blair, Tony, 1953-' } }
      ]
    }
  ],
  researched: '2026-10-12',
  born: {
    alts: [
      {
        value: { d: '1953-05-06' },
        cites: [
          {
            source: 'gov-uk-davis-tony-blair',
            loc: { section: 'Past Prime Ministers: Tony Blair', para: '3' }
          },
          { source: 'lc-names-blair-tony-no95058170', loc: { section: 'Blair, Tony, 1953-' } }
        ]
      }
    ]
  },
  bornIn: {
    ref: 'place:edinburgh',
    cites: [
      {
        source: 'gov-uk-davis-tony-blair',
        loc: { section: 'Past Prime Ministers: Tony Blair', para: '4' }
      }
    ]
  },
  regions: ['europe'],
  roles: ['politician', 'head-of-state'],
  offices: [
    {
      title: 'Prime Minister of the United Kingdom',
      polity: 'polity:united-kingdom',
      start: {
        alts: [
          {
            value: { d: '1997-05-02' },
            cites: [
              {
                source: 'gov-uk-davis-tony-blair',
                loc: { section: 'Past Prime Ministers: Tony Blair', para: '17' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '2007-06-27' },
            cites: [
              {
                source: 'gov-uk-davis-tony-blair',
                loc: { section: 'Past Prime Ministers: Tony Blair', para: '24' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'gov-uk-davis-tony-blair',
          loc: { section: 'Past Prime Ministers: Tony Blair', para: '17' }
        },
        {
          source: 'gov-uk-davis-tony-blair',
          loc: { section: 'Past Prime Ministers: Tony Blair', para: '24' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Tony_Blair_in_2002_%28cropped%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Tony_Blair_in_2002_(cropped).jpg',
    credit: { institution: 'The White House', creator: 'Paul Morse' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Tony Blair, the longest serving Labour Prime Minister, oversaw the Northern Irish peace process, public sector reform and the response to the 9/11 and 7/7 terrorist attacks.',
          lang: 'en',
          cite: {
            source: 'gov-uk-davis-tony-blair',
            loc: { section: 'Past Prime Ministers: Tony Blair', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://www.gov.uk/government/history/past-prime-ministers/tony-blair'
          }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q2',
          text: 'Tony Blair was born in 1953 in Edinburgh, Scotland.',
          lang: 'en',
          cite: {
            source: 'gov-uk-davis-tony-blair',
            loc: { section: 'Past Prime Ministers: Tony Blair', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://www.gov.uk/government/history/past-prime-ministers/tony-blair'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q3',
          text: 'Tony Blair assumed several Shadow Cabinet roles before being made Shadow Home Secretary in 1992.',
          lang: 'en',
          cite: {
            source: 'gov-uk-davis-tony-blair',
            loc: { section: 'Past Prime Ministers: Tony Blair', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://www.gov.uk/government/history/past-prime-ministers/tony-blair'
          }
        },
        {
          id: 'q4',
          text: 'Tony Blair was seen as a new kind of politician with enormous charisma, arguably the finest opposition leader of modern times – even succeeding in reforming ‘Clause IV’ of the Labour constitution.',
          lang: 'en',
          cite: {
            source: 'gov-uk-davis-tony-blair',
            loc: { section: 'Past Prime Ministers: Tony Blair', para: '17' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://www.gov.uk/government/history/past-prime-ministers/tony-blair'
          }
        },
        {
          id: 'q5',
          text: 'Important constitutional changes happened quickly, with Scottish and Welsh devolution, reform to the House of Lords, the Human Rights Act and a Freedom of Information Act.',
          lang: 'en',
          cite: {
            source: 'gov-uk-davis-tony-blair',
            loc: { section: 'Past Prime Ministers: Tony Blair', para: '18' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://www.gov.uk/government/history/past-prime-ministers/tony-blair'
          }
        },
        {
          id: 'q6',
          text: 'Thanks to Tony Blair’s leadership, a healthy economy and a poor showing by the Conservative Party, Labour won the 2001 general election with another landslide, with 167 seats.',
          lang: 'en',
          cite: {
            source: 'gov-uk-davis-tony-blair',
            loc: { section: 'Past Prime Ministers: Tony Blair', para: '20' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://www.gov.uk/government/history/past-prime-ministers/tony-blair'
          }
        },
        {
          id: 'q7',
          text: 'The 9/11 terrorist attacks became defining moments for Tony Blair and his legacy.',
          lang: 'en',
          cite: {
            source: 'gov-uk-davis-tony-blair',
            loc: { section: 'Past Prime Ministers: Tony Blair', para: '21' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://www.gov.uk/government/history/past-prime-ministers/tony-blair'
          }
        },
        {
          id: 'q8',
          text: 'Bush and British Prime Minister Tony Blair met privately to discuss options.',
          lang: 'en',
          cite: {
            source: 'millercenter-gregg-gw-bush-foreign-affairs',
            loc: { section: 'George W. Bush: Foreign Affairs', para: '27' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://millercenter.org/president/gwbush/foreign-affairs'
          }
        },
        {
          id: 'q9',
          text: 'Blair preferred to wait for additional U.N. weapons inspections, but those could not take place without Saddam’s cooperation.',
          lang: 'en',
          cite: {
            source: 'millercenter-gregg-gw-bush-foreign-affairs',
            loc: { section: 'George W. Bush: Foreign Affairs', para: '27' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://millercenter.org/president/gwbush/foreign-affairs'
          }
        },
        {
          id: 'q10',
          text: 'The case for war in the UK had been built around the widespread belief that Saddam harboured weapons of mass destruction (WMD), which were not subsequently found.',
          lang: 'en',
          cite: {
            source: 'gov-uk-davis-tony-blair',
            loc: { section: 'Past Prime Ministers: Tony Blair', para: '22' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://www.gov.uk/government/history/past-prime-ministers/tony-blair'
          }
        },
        {
          id: 'q11',
          text: 'The 7/7 London explosions by British-born Muslim suicide bombers led Blair to try to tighten civil liberties, another cause of public division.',
          lang: 'en',
          cite: {
            source: 'gov-uk-davis-tony-blair',
            loc: { section: 'Past Prime Ministers: Tony Blair', para: '23' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://www.gov.uk/government/history/past-prime-ministers/tony-blair'
          }
        },
        {
          id: 'q12',
          text: 'In 2006, the Israel-Lebanon war saw a very large Labour rebellion against Tony Blair over his reluctance to criticise Israel and his continued support for Bush.',
          lang: 'en',
          cite: {
            source: 'gov-uk-davis-tony-blair',
            loc: { section: 'Past Prime Ministers: Tony Blair', para: '24' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://www.gov.uk/government/history/past-prime-ministers/tony-blair'
          }
        }
      ]
    }
  ]
})
