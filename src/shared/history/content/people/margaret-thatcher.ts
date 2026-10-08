import { definePerson } from '../../schema'

export default definePerson({
  id: 'margaret-thatcher',
  names: [
    { text: 'Margaret Thatcher', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1925-10-13' },
        cites: [
          {
            source: 'gov-uk-past-prime-ministers-margaret-thatcher',
            loc: { section: 'Baroness Thatcher', para: '3' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '2013-04-08' },
        cites: [
          {
            source: 'gov-uk-past-prime-ministers-margaret-thatcher',
            loc: { section: 'Baroness Thatcher', para: '5' }
          },
          {
            source: 'gov-uk-past-prime-ministers-margaret-thatcher',
            loc: { section: 'Baroness Thatcher', para: '24' }
          }
        ]
      }
    ]
  },
  bornIn: {
    ref: 'place:grantham',
    cites: [
      {
        source: 'gov-uk-past-prime-ministers-margaret-thatcher',
        loc: { section: 'Baroness Thatcher', para: '3' }
      }
    ]
  },
  diedIn: {
    ref: 'place:london',
    cites: [
      {
        source: 'gov-uk-past-prime-ministers-margaret-thatcher',
        loc: { section: 'Baroness Thatcher', para: '5' }
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
            value: { d: '1979' },
            cites: [
              {
                source: 'gov-uk-past-prime-ministers-margaret-thatcher',
                loc: { section: 'Baroness Thatcher', para: '7' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1990' },
            cites: [
              {
                source: 'gov-uk-past-prime-ministers-margaret-thatcher',
                loc: { section: 'Baroness Thatcher', para: '7' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'gov-uk-past-prime-ministers-margaret-thatcher',
          loc: { section: 'Baroness Thatcher', para: '7' }
        }
      ]
    },
    {
      title: 'Secretary of State for Education',
      polity: 'polity:united-kingdom',
      start: {
        alts: [
          {
            value: { d: '1970' },
            cites: [
              {
                source: 'gov-uk-past-prime-ministers-margaret-thatcher',
                loc: { section: 'Baroness Thatcher', para: '14' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'gov-uk-past-prime-ministers-margaret-thatcher',
          loc: { section: 'Baroness Thatcher', para: '14' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f9/Margaret_Thatcher_%281983%29.jpg/1280px-Margaret_Thatcher_%281983%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Margaret_Thatcher_(1983).jpg',
    credit: { institution: 'Nationaal Archief, The Hague (Anefo)', creator: 'Rob Bogaerts' },
    license: { id: 'cc0' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Baroness Margaret Thatcher, the \'Iron Lady\', was the first female British Prime Minister and the longest serving PM for over 150 years.',
          lang: 'en',
          cite: {
            source: 'gov-uk-past-prime-ministers-margaret-thatcher',
            loc: { section: 'Baroness Thatcher', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.gov.uk/government/history/past-prime-ministers/margaret-thatcher'
          }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q2',
          text: 'Margaret Thatcher’s father, a shopkeeper and Mayor of Grantham, was a major influence in her childhood. She was educated at the local grammar school and studied Chemistry at Oxford University, where she became president of the university Conservative association.',
          lang: 'en',
          cite: {
            source: 'gov-uk-past-prime-ministers-margaret-thatcher',
            loc: { section: 'Baroness Thatcher', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.gov.uk/government/history/past-prime-ministers/margaret-thatcher'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q3',
          text: 'Thatcher read for the Bar before being elected as the Conservative MP for Finchley in 1959. She held junior posts before becoming Shadow Spokesperson for Education, and entered the Cabinet as Education Secretary in 1970.',
          lang: 'en',
          cite: {
            source: 'gov-uk-past-prime-ministers-margaret-thatcher',
            loc: { section: 'Baroness Thatcher', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.gov.uk/government/history/past-prime-ministers/margaret-thatcher'
          }
        },
        {
          id: 'q4',
          text: 'In Opposition she stood against Edward Heath for the party leadership in 1975 and won. Her victory was considered a surprise by many. In 1979, the Conservative Party won the General Election and Thatcher became PM, taking over from James Callaghan.',
          lang: 'en',
          cite: {
            source: 'gov-uk-past-prime-ministers-margaret-thatcher',
            loc: { section: 'Baroness Thatcher', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.gov.uk/government/history/past-prime-ministers/margaret-thatcher'
          }
        },
        {
          id: 'q5',
          text: 'Her first 2 years in office were not easy - unemployment was very high, but the economy gradually showed improvement. She brought more of her supporters into the Cabinet, and added to her reputation by leading the country to war against Argentina in the Falkland Islands.',
          lang: 'en',
          cite: {
            source: 'gov-uk-past-prime-ministers-margaret-thatcher',
            loc: { section: 'Baroness Thatcher', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.gov.uk/government/history/past-prime-ministers/margaret-thatcher'
          }
        },
        {
          id: 'q6',
          text: 'The Conservatives went on to win the 1983 election by an overwhelming majority, helped by a divided opposition. Her government followed a radical programme of privatisation and deregulation, reform of the trade unions, tax cuts and the introduction of market mechanisms into health and education. The aim was to reduce the role of government and increase individual self-reliance.',
          lang: 'en',
          cite: {
            source: 'gov-uk-past-prime-ministers-margaret-thatcher',
            loc: { section: 'Baroness Thatcher', para: '17' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.gov.uk/government/history/past-prime-ministers/margaret-thatcher'
          }
        },
        {
          id: 'q7',
          text: 'Supported by most Britons, Thatcher insisted on a return to the status quo ante. Any other result would, she believed, imply moral equivalence between the British and Argentine positions, validate Argentina’s aggression, and diminish the islanders’ right to self-determination.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-crisis-in-the-south-atlantic',
            loc: {
              section: 'Crisis in the South Atlantic: The Reagan Administration and the Anglo-Argentine War of 1982',
              para: '5'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/milestones/1981-1988/south-atlantic'
          }
        },
        {
          id: 'q8',
          text: 'She also became a familiar figure internationally, creating a famous friendship with US President Reagan and gaining the praise of Soviet leader Gorbachev.',
          lang: 'en',
          cite: {
            source: 'gov-uk-past-prime-ministers-margaret-thatcher',
            loc: { section: 'Baroness Thatcher', para: '18' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.gov.uk/government/history/past-prime-ministers/margaret-thatcher'
          }
        }
      ]
    },
    {
      kind: 'later-life',
      quotes: [
        {
          id: 'q9',
          text: 'One great difficulty during her time in office was the issue of Europe. Her long-serving Foreign Secretary, Sir Geoffrey Howe resigned in November 1990 in protest at her attitude to Europe. His resignation speech brought about events which were to lead to her exit from 10 Downing Street later that month.',
          lang: 'en',
          cite: {
            source: 'gov-uk-past-prime-ministers-margaret-thatcher',
            loc: { section: 'Baroness Thatcher', para: '19' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.gov.uk/government/history/past-prime-ministers/margaret-thatcher'
          }
        },
        {
          id: 'q10',
          text: 'She left the House of Commons in 1992, and was appointed a life peerage in the House of Lords in the same year, receiving the title of Baroness Thatcher of Kesteven.',
          lang: 'en',
          cite: {
            source: 'gov-uk-past-prime-ministers-margaret-thatcher',
            loc: { section: 'Baroness Thatcher', para: '21' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.gov.uk/government/history/past-prime-ministers/margaret-thatcher'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q11',
          text: 'Thatcher died on 8 April 2013 at The Ritz Hotel in London, after suffering a stroke.',
          lang: 'en',
          cite: {
            source: 'gov-uk-past-prime-ministers-margaret-thatcher',
            loc: { section: 'Baroness Thatcher', para: '24' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.gov.uk/government/history/past-prime-ministers/margaret-thatcher'
          }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q12',
          text: 'I am sure that the whole House will join me in condemning totally this unprovoked aggression by the Government of Argentina against British territory. [HON. MEMBERS: "Hear, hear".] It has not a shred of justification and not a scrap of legality.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1982-04-03-falkland-islands',
            loc: { section: 'Falkland Islands (3 April 1982)', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://api.parliament.uk/historic-hansard/commons/1982/apr/03/falkland-islands'
          }
        },
        {
          id: 'q13',
          text: 'Early this morning in Port Stanley, 74 days after the Falkland Islands were invaded, General Moore accepted from General Menendez the surrender of all the Argentine forces in East and West Falkland together with their arms and equipment. In a message to the Commander-in-Chief Fleet, General Moore reported: The Falkland Islands are once more under the Government desired by their inhabitants. God Save the Queen.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1982-06-15-falkland-islands',
            loc: { section: 'Falkland Islands (15 June 1982)', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://api.parliament.uk/historic-hansard/commons/1982/jun/15/falkland-islands'
          }
        }
      ]
    }
  ]
})
