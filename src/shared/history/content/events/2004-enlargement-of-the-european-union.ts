import { defineEvent } from '../../schema'

export default defineEvent({
  id: '2004-enlargement-of-the-european-union',
  names: [
    { text: '2004 enlargement of the European Union', lang: 'en', role: 'primary' },
    {
      text: 'Fifth enlargement',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'eur-lex-summary-the-2004-enlargement-the-challenge-of-a-25-member-eu',
          loc: { section: 'The 2004 enlargement: the challenge of a 25-member EU', para: '2' }
        }
      ]
    }
  ],
  researched: '2026-10-12',
  type: 'other',
  start: {
    alts: [
      {
        value: { d: '2004-05-01' },
        cites: [
          {
            source: 'eur-lex-summary-the-2004-enlargement-the-challenge-of-a-25-member-eu',
            loc: { section: 'The 2004 enlargement: the challenge of a 25-member EU', para: '1' }
          },
          {
            source: 'european-union-history-of-the-european-union-2000-09',
            loc: { section: 'History of the European Union 2000-09', para: '10' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:athens',
      cites: [
        {
          source: 'eur-lex-summary-the-2004-enlargement-the-challenge-of-a-25-member-eu',
          loc: { section: 'The 2004 enlargement: the challenge of a 25-member EU', para: '65' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:fall-of-the-berlin-wall',
      rel: 'caused-by',
      cites: [
        {
          source: 'eur-lex-summary-the-2004-enlargement-the-challenge-of-a-25-member-eu',
          loc: { section: 'The 2004 enlargement: the challenge of a 25-member EU', para: '4' }
        }
      ]
    },
    {
      ref: 'event:introduction-of-the-euro',
      rel: 'related',
      cites: [
        {
          source: 'european-union-history-of-the-european-union-2000-09',
          loc: { section: 'History of the European Union 2000-09', para: '11' }
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
          text: 'On 1 May 2004 ten new countries with a combined population of almost 75 million joined the EU.',
          lang: 'en',
          cite: {
            source: 'eur-lex-summary-the-2004-enlargement-the-challenge-of-a-25-member-eu',
            loc: { section: 'The 2004 enlargement: the challenge of a 25-member EU', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20240417144050/https://eur-lex.europa.eu/EN/legal-content/summary/the-2004-enlargement-the-challenge-of-a-25-member-eu.html'
          }
        },
        {
          id: 'q2',
          text: 'Cyprus and Malta join the EU along with 8 Central and Eastern European countries — Czechia, Estonia, Hungary, Latvia, Lithuania, Poland, Slovakia and Slovenia — finally ending the division of Europe after the Second World War.',
          lang: 'en',
          cite: {
            source: 'european-union-history-of-the-european-union-2000-09',
            loc: { section: 'History of the European Union 2000-09', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://european-union.europa.eu/principles-countries-history/history-eu/2000-09_en'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'The fall of the Berlin Wall on 9 November 1989 marked the disintegration of the entire Communist bloc in the East.',
          lang: 'en',
          cite: {
            source: 'eur-lex-summary-the-2004-enlargement-the-challenge-of-a-25-member-eu',
            loc: { section: 'The 2004 enlargement: the challenge of a 25-member EU', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20240417144050/https://eur-lex.europa.eu/EN/legal-content/summary/the-2004-enlargement-the-challenge-of-a-25-member-eu.html'
          }
        },
        {
          id: 'q4',
          text: 'From 1987 to 1996 thirteen countries submitted applications to join the EU: Cyprus, Estonia, Hungary, Poland, the Czech Republic, Slovenia, Bulgaria, Latvia, Lithuania, Malta, Romania, Slovakia and Turkey.',
          lang: 'en',
          cite: {
            source: 'eur-lex-summary-the-2004-enlargement-the-challenge-of-a-25-member-eu',
            loc: { section: 'The 2004 enlargement: the challenge of a 25-member EU', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20240417144050/https://eur-lex.europa.eu/EN/legal-content/summary/the-2004-enlargement-the-challenge-of-a-25-member-eu.html'
          }
        },
        {
          id: 'q5',
          text: 'To prepare for EU membership, the candidate countries first signed Europe Agreements (in the case of Central and Eastern European countries) or Association Agreements (Turkey, Cyprus and Malta).',
          lang: 'en',
          cite: {
            source: 'eur-lex-summary-the-2004-enlargement-the-challenge-of-a-25-member-eu',
            loc: { section: 'The 2004 enlargement: the challenge of a 25-member EU', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20240417144050/https://eur-lex.europa.eu/EN/legal-content/summary/the-2004-enlargement-the-challenge-of-a-25-member-eu.html'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q6',
          text: 'When the ten new Member States joined the EU on 1 May 2004 the pre-accession strategy no longer applied to them, but they still benefit from the pre-accession financial instruments for projects presented before 2005 and are now eligible for the Structural Funds and the Cohesion Fund.',
          lang: 'en',
          cite: {
            source: 'eur-lex-summary-the-2004-enlargement-the-challenge-of-a-25-member-eu',
            loc: { section: 'The 2004 enlargement: the challenge of a 25-member EU', para: '90' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20240417144050/https://eur-lex.europa.eu/EN/legal-content/summary/the-2004-enlargement-the-challenge-of-a-25-member-eu.html'
          }
        },
        {
          id: 'q7',
          text: 'The new Member States have also contributed 15 billion euros to the EU budget.',
          lang: 'en',
          cite: {
            source: 'eur-lex-summary-the-2004-enlargement-the-challenge-of-a-25-member-eu',
            loc: { section: 'The 2004 enlargement: the challenge of a 25-member EU', para: '92' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20240417144050/https://eur-lex.europa.eu/EN/legal-content/summary/the-2004-enlargement-the-challenge-of-a-25-member-eu.html'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q8',
          text: 'The driving force behind the fifth EU enlargement has been the desire to ensure peace, stability and economic prosperity in a re-unified Europe.',
          lang: 'en',
          cite: {
            source: 'eur-lex-summary-the-2004-enlargement-the-challenge-of-a-25-member-eu',
            loc: { section: 'The 2004 enlargement: the challenge of a 25-member EU', para: '71' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20240417144050/https://eur-lex.europa.eu/EN/legal-content/summary/the-2004-enlargement-the-challenge-of-a-25-member-eu.html'
          }
        },
        {
          id: 'q9',
          text: 'Voters in France and the Netherlands reject the Treaty establishing a constitution for Europe, which was signed by the 25 EU member states in October 2004.',
          lang: 'en',
          cite: {
            source: 'european-union-history-of-the-european-union-2000-09',
            loc: { section: 'History of the European Union 2000-09', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://european-union.europa.eu/principles-countries-history/history-eu/2000-09_en'
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
            value: { d: '1997-12-12' },
            cites: [
              {
                source: 'eur-lex-summary-the-2004-enlargement-the-challenge-of-a-25-member-eu',
                loc: { section: 'The 2004 enlargement: the challenge of a 25-member EU', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'The Luxembourg European Council of 12 and 13 December 1997 launched the EU enlargement process, in which "each of the applicant States would proceed at its own rate, depending on its degree of preparedness".',
        lang: 'en',
        cite: {
          source: 'eur-lex-summary-the-2004-enlargement-the-challenge-of-a-25-member-eu',
          loc: { section: 'The 2004 enlargement: the challenge of a 25-member EU', para: '5' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-12',
          url: 'https://web.archive.org/web/20240417144050/https://eur-lex.europa.eu/EN/legal-content/summary/the-2004-enlargement-the-challenge-of-a-25-member-eu.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1998-03-31' },
            cites: [
              {
                source: 'eur-lex-summary-the-2004-enlargement-the-challenge-of-a-25-member-eu',
                loc: {
                  section: 'The 2004 enlargement: the challenge of a 25-member EU',
                  para: '63'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'Accession negotiations began on 31 March 1998 with the six best-prepared countries (Cyprus, Estonia, Hungary, Poland, the Czech Republic and Slovenia), and on 15 February 2000 with all the other candidate countries (Bulgaria, Latvia, Lithuania, Malta, Romania and Slovakia) except Turkey.',
        lang: 'en',
        cite: {
          source: 'eur-lex-summary-the-2004-enlargement-the-challenge-of-a-25-member-eu',
          loc: { section: 'The 2004 enlargement: the challenge of a 25-member EU', para: '63' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-12',
          url: 'https://web.archive.org/web/20240417144050/https://eur-lex.europa.eu/EN/legal-content/summary/the-2004-enlargement-the-challenge-of-a-25-member-eu.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2002-12' },
            cites: [
              {
                source: 'eur-lex-summary-the-2004-enlargement-the-challenge-of-a-25-member-eu',
                loc: {
                  section: 'The 2004 enlargement: the challenge of a 25-member EU',
                  para: '65'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'The Copenhagen European Council of December 2002 found that 10 of the 13 candidate countries (Cyprus, Estonia, Hungary, Poland, the Czech Republic, Slovenia, Latvia, Lithuania, Malta and Slovakia) fulfilled the conditions necessary for joining the EU. They therefore signed their Accession Treaty on 16 April 2003 in Athens and officially joined the EU on 1 May 2004 after the ratification procedures were completed.',
        lang: 'en',
        cite: {
          source: 'eur-lex-summary-the-2004-enlargement-the-challenge-of-a-25-member-eu',
          loc: { section: 'The 2004 enlargement: the challenge of a 25-member EU', para: '65' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-12',
          url: 'https://web.archive.org/web/20240417144050/https://eur-lex.europa.eu/EN/legal-content/summary/the-2004-enlargement-the-challenge-of-a-25-member-eu.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '2004-05-01' },
            cites: [
              {
                source: 'eur-lex-summary-the-2004-enlargement-the-challenge-of-a-25-member-eu',
                loc: { section: 'The 2004 enlargement: the challenge of a 25-member EU', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'The 25-member EU now forms a political and economic area with 450 million citizens and includes three former Soviet republics (Estonia, Latvia and Lithuania), four former satellites of the USSR (Poland, the Czech Republic, Hungary and Slovakia), a former Yugoslav republic (Slovenia) and two Mediterranean islands (Cyprus and Malta).',
        lang: 'en',
        cite: {
          source: 'eur-lex-summary-the-2004-enlargement-the-challenge-of-a-25-member-eu',
          loc: { section: 'The 2004 enlargement: the challenge of a 25-member EU', para: '1' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-12',
          url: 'https://web.archive.org/web/20240417144050/https://eur-lex.europa.eu/EN/legal-content/summary/the-2004-enlargement-the-challenge-of-a-25-member-eu.html'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/45/Signing_ceremony_of_the_accession_treaty_of_the_New_Member_States_of_the_EU_%28P-009815_00-17%29.jpg/1280px-Signing_ceremony_of_the_accession_treaty_of_the_New_Member_States_of_the_EU_%28P-009815_00-17%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Signing_ceremony_of_the_accession_treaty_of_the_New_Member_States_of_the_EU_(P-009815_00-17).jpg',
    credit: { institution: 'European Commission Audiovisual Service', creator: 'Jan Van de Vel' },
    license: { id: 'cc-by', version: '4.0', url: 'https://creativecommons.org/licenses/by/4.0' }
  }
})
