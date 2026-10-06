import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'anglo-irish-treaty',
  names: [
    { text: 'Anglo-Irish Treaty', lang: 'en', role: 'primary' },
    {
      text: 'Articles of Agreement for a Treaty between Great Britain and Ireland',
      lang: 'en',
      role: 'official',
      cites: [
        {
          source: 'difp-1921-12-06-articles-of-agreement',
          loc: { section: 'No. 214', para: '-2' }
        },
        {
          source: 'difp-1921-12-06-articles-of-agreement',
          loc: { section: 'No. 214', para: '-1' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  type: 'treaty',
  start: {
    alts: [
      {
        value: { d: '1921-12-06' },
        cites: [
          {
            source: 'difp-1921-12-06-articles-of-agreement',
            loc: { section: 'No. 214', para: '0' }
          },
          { source: 'lemo-chronik-1921', loc: { section: 'Chronik 1921', para: '224' } }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:london',
      cites: [
        {
          source: 'difp-1921-12-06-articles-of-agreement',
          loc: { section: 'No. 214', para: '0' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'D. Lloyd George',
      role: 'signatory',
      cites: [
        {
          source: 'difp-1921-12-06-articles-of-agreement',
          loc: { section: 'No. 214', para: '29' }
        }
      ]
    },
    {
      name: 'Austen Chamberlain',
      role: 'signatory',
      cites: [
        {
          source: 'difp-1921-12-06-articles-of-agreement',
          loc: { section: 'No. 214', para: '31' }
        }
      ]
    },
    {
      name: 'Winston S. Churchill',
      role: 'signatory',
      cites: [
        {
          source: 'difp-1921-12-06-articles-of-agreement',
          loc: { section: 'No. 214', para: '35' }
        }
      ]
    },
    {
      name: 'Art Ó Griobhtha (Arthur Griffith)',
      role: 'signatory',
      cites: [
        {
          source: 'difp-1921-12-06-articles-of-agreement',
          loc: { section: 'No. 214', para: '30' }
        },
        { source: 'difp-1921-12-08-cabinet-minutes', loc: { section: 'No. 215', para: '4' } }
      ]
    },
    {
      name: 'Micheál Ó Coileain (Michael Collins)',
      role: 'signatory',
      cites: [
        {
          source: 'difp-1921-12-06-articles-of-agreement',
          loc: { section: 'No. 214', para: '32' }
        },
        { source: 'difp-1921-12-08-cabinet-minutes', loc: { section: 'No. 215', para: '4' } }
      ]
    },
    {
      name: 'Riobárd Bartún (Robert Barton)',
      role: 'signatory',
      cites: [
        {
          source: 'difp-1921-12-06-articles-of-agreement',
          loc: { section: 'No. 214', para: '34' }
        },
        { source: 'difp-1921-12-08-cabinet-minutes', loc: { section: 'No. 215', para: '4' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: '1. Ireland shall have the same constitutional status in the Community of Nations known as the British Empire as the Dominion of Canada, the Commonwealth of Australia, the Dominion of New Zealand, and the Union of South Africa with a Parliament having powers to make laws for the peace, order and good government of Ireland and an Executive responsible to that Parliament, and shall be styled and known as the Irish Free State.',
          lang: 'en',
          cite: {
            source: 'difp-1921-12-06-articles-of-agreement',
            loc: { section: 'No. 214', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.difp.ie/volume-1/1921/anglo-irish-treaty/214/'
          }
        },
        {
          id: 'q2',
          text: '11 Oct. – 6 Dec. Negotiations in London lead to signature of ‘Articles of Agreement’ (Anglo-Irish treaty), creating the Irish Free State with dominion status within British Empire from December 1922 onwards.',
          lang: 'en',
          cite: {
            source: 'difp-timeline-of-events-1919-1969',
            loc: { section: 'Timeline of events, 1919-69' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.difp.ie/timeline-of-events-1919-69/'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Six months ago there was in Ireland a peace that was not a peace and a war that was not a war.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1921-12-14-debate-on-the-address',
            loc: { section: 'HC Deb 14 December 1921 vol 149 cc6-26', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://api.parliament.uk/historic-hansard/commons/1921/dec/14/debate-on-the-address'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q4',
          text: '7 Jan. Anglo-Irish treaty approved by the Dáil, which splits over whether to accept or reject its terms.',
          lang: 'en',
          cite: {
            source: 'difp-timeline-of-events-1919-1969',
            loc: { section: 'Timeline of events, 1919-69' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.difp.ie/timeline-of-events-1919-69/'
          }
        },
        {
          id: 'q5',
          text: '28 June. Outbreak of Civil War between anti-treaty and pro-treaty forces.',
          lang: 'en',
          cite: {
            source: 'difp-timeline-of-events-1919-1969',
            loc: { section: 'Timeline of events, 1919-69' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.difp.ie/timeline-of-events-1919-69/'
          }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1921-12-14' },
            cites: [
              {
                source: 'hansard-commons-1921-12-14-irish-free-state',
                loc: { section: 'HC Deb 14 December 1921 vol 149 c5', para: '0' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q6',
        text: 'My Lords and Members of the House of Commons, I have summoned you to meet at this unusual time in order that the Articles of Agreement which have been signed by My Ministers and the Irish Delegation may be at once submitted for your approval.',
        lang: 'en',
        cite: {
          source: 'hansard-commons-1921-12-14-irish-free-state',
          loc: { section: 'HC Deb 14 December 1921 vol 149 c5', para: '3' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://api.parliament.uk/historic-hansard/commons/1921/dec/14/irish-free-state'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1922-12-06' },
            cites: [
              {
                source: 'difp-timeline-of-events-1919-1969',
                loc: { section: 'Timeline of events, 1919-69' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: '6 Dec. Irish Free State formally comes into being.',
        lang: 'en',
        cite: {
          source: 'difp-timeline-of-events-1919-1969',
          loc: { section: 'Timeline of events, 1919-69' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.difp.ie/timeline-of-events-1919-69/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1923-04-27' },
            cites: [
              {
                source: 'difp-timeline-of-events-1919-1969',
                loc: { section: 'Timeline of events, 1919-69' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: '27 Apr. Ceasefire by anti-treaty IRA ends Civil War;',
        lang: 'en',
        cite: {
          source: 'difp-timeline-of-events-1919-1969',
          loc: { section: 'Timeline of events, 1919-69' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.difp.ie/timeline-of-events-1919-69/'
        }
      }
    }
  ]
})
