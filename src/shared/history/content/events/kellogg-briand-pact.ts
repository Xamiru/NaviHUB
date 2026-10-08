import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'kellogg-briand-pact',
  names: [
    { text: 'Kellogg–Briand Pact', lang: 'en', role: 'primary' },
    {
      text: 'Pact of Paris',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'state-dept-milestones-kellogg-briand-pact',
          loc: { section: 'The Kellogg-Briand Pact, 1928', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'treaty',
  start: {
    alts: [
      {
        value: { d: '1928-08-27' },
        cites: [
          {
            source: 'state-dept-milestones-kellogg-briand-pact',
            loc: { section: 'The Kellogg-Briand Pact, 1928', para: '1' }
          },
          {
            source: 'avalon-kellogg-briand-pact',
            loc: { section: 'Kellogg-Briand Pact 1929' }
          },
          { source: 'lemo-chronik-1928', loc: { section: 'Chronik 1928', para: '143' } }
        ]
      }
    ]
  },
  regions: ['global', 'europe', 'north-america'],
  prominence: 3,
  places: [
    {
      ref: 'place:paris',
      cites: [
        {
          source: 'state-dept-milestones-kellogg-briand-pact',
          loc: { section: 'The Kellogg-Briand Pact, 1928', para: '1' }
        }
      ]
    }
  ],
  polities: [
    { ref: 'polity:united-states' },
    { ref: 'polity:french-third-republic' }
  ],
  participants: [
    {
      name: 'Frank B. Kellogg',
      role: 'signatory',
      cites: [
        { source: 'avalon-kellogg-briand-pact', loc: { section: 'Kellogg-Briand Pact 1929' } }
      ]
    },
    {
      name: 'Aristide Briand',
      role: 'signatory',
      cites: [
        { source: 'avalon-kellogg-briand-pact', loc: { section: 'Kellogg-Briand Pact 1929' } }
      ]
    },
    {
      name: 'Gustav Stresemann',
      role: 'signatory',
      cites: [
        { source: 'avalon-kellogg-briand-pact', loc: { section: 'Kellogg-Briand Pact 1929' } }
      ]
    }
  ],
  related: [
    {
      ref: 'event:founding-of-the-league-of-nations',
      rel: 'related',
      cites: [
        {
          source: 'state-dept-milestones-kellogg-briand-pact',
          loc: { section: 'The Kellogg-Briand Pact, 1928', para: '4' }
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
          text: 'The Kellogg-Briand Pact was an agreement to outlaw war signed on August 27, 1928.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-kellogg-briand-pact',
            loc: { section: 'The Kellogg-Briand Pact, 1928', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1921-1936/kellogg'
          }
        },
        {
          id: 'q2',
          text: 'The High Contracting Parties solemly declare in the names of their respective peoples that they condemn recourse to war for the solution of international controversies, and renounce it, as an instrument of national policy in their relations with one another.',
          lang: 'en',
          cite: {
            source: 'avalon-kellogg-briand-pact',
            loc: { section: 'Kellogg-Briand Pact 1929' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://avalon.law.yale.edu/20th_century/kbpact.asp'
          }
        },
        {
          id: 'q3',
          text: 'The High Contracting Parties agree that the settlement or solution of all disputes or conflicts of whatever nature or of whatever origin they may be, which may arise among them, shall never be sought except by pacific means.',
          lang: 'en',
          cite: {
            source: 'avalon-kellogg-briand-pact',
            loc: { section: 'Kellogg-Briand Pact 1929' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://avalon.law.yale.edu/20th_century/kbpact.asp'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q4',
          text: 'With the influence and assistance of Shotwell and Butler, French Minister of Foreign Affairs Aristide Briand proposed a peace pact as a bilateral agreement between the United States and France to outlaw war between them.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-kellogg-briand-pact',
            loc: { section: 'The Kellogg-Briand Pact, 1928', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1921-1936/kellogg'
          }
        },
        {
          id: 'q5',
          text: 'Because the language of the pact established the important point that only wars of aggression – not military acts of self-defense – would be covered under the pact, many nations had no objections to signing it. If the pact served to limit conflicts, then everyone would benefit; if it did not, there were no legal consequences.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-kellogg-briand-pact',
            loc: { section: 'The Kellogg-Briand Pact, 1928', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1921-1936/kellogg'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q6',
          text: 'It soon became clear that there was no way to enforce the pact or sanction those who broke it; it also never fully defined what constituted “self-defense,” so there were many ways around its terms.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-kellogg-briand-pact',
            loc: { section: 'The Kellogg-Briand Pact, 1928', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1921-1936/kellogg'
          }
        },
        {
          id: 'q7',
          text: 'In the end, the Kellogg-Briand Pact did little to prevent World War II or any of the conflicts that followed. Its legacy remains as a statement of the idealism expressed by advocates for peace in the interwar period.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-kellogg-briand-pact',
            loc: { section: 'The Kellogg-Briand Pact, 1928', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1921-1936/kellogg'
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
            value: { d: '1929-07-02' },
            cites: [
              {
                source: 'avalon-kellogg-briand-pact',
                loc: { section: 'Kellogg-Briand Pact 1929' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'Additional adhesions deposited subsequent to July 24, 1929. Persia, July 2, 1929;',
        lang: 'en',
        cite: { source: 'avalon-kellogg-briand-pact', loc: { section: 'Kellogg-Briand Pact 1929' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://avalon.law.yale.edu/20th_century/kbpact.asp'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1929-07-24' },
            cites: [
              {
                source: 'avalon-kellogg-briand-pact',
                loc: { section: 'Kellogg-Briand Pact 1929' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'AND WHEREAS the said Treaty has been duly ratified on the parts of all the High Contracting Parties and their several instruments of ratification have been deposited with the Government of the United States of America, the last on July 24, 1929;',
        lang: 'en',
        cite: { source: 'avalon-kellogg-briand-pact', loc: { section: 'Kellogg-Briand Pact 1929' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://avalon.law.yale.edu/20th_century/kbpact.asp'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/dc/Kellogg%E2%80%93Briand_Pact_%281928%29.jpg/1280px-Kellogg%E2%80%93Briand_Pact_%281928%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Kellogg%E2%80%93Briand_Pact_(1928).jpg',
    credit: { institution: 'Nationaal Archief' },
    license: { id: 'public-domain' }
  }
})
