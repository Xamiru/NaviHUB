import { defineEvent } from '../../schema'

export default defineEvent({
  id: '1998-nuclear-tests-in-india-and-pakistan',
  names: [
    { text: '1998 nuclear tests in India and Pakistan', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-10',
  type: 'other',
  start: {
    alts: [
      {
        value: { d: '1998-05-11' },
        cites: [
          {
            source: 'acronym-1998-05-india-pakistan-nuclear-tests-introduction',
            loc: { section: 'Special Feature: Introduction', para: '1' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1998-05-30' },
        cites: [
          {
            source: 'acronym-1998-05-india-pakistan-nuclear-tests-introduction',
            loc: { section: 'Special Feature: Introduction', para: '2' }
          }
        ]
      }
    ]
  },
  regions: ['south-asia', 'global'],
  prominence: 2,
  polities: [
    { ref: 'polity:india' },
    { ref: 'polity:pakistan' },
    { ref: 'polity:united-states' }
  ],
  sides: [
    {
      key: 'india',
      name: 'India',
      polity: 'polity:india',
      cites: [
        {
          source: 'acronym-1998-05-india-pakistan-nuclear-tests-introduction',
          loc: { section: 'Special Feature: Introduction', para: '1' }
        }
      ]
    },
    {
      key: 'pakistan',
      name: 'Pakistan',
      polity: 'polity:pakistan',
      cites: [
        {
          source: 'acronym-1998-05-india-pakistan-nuclear-tests-introduction',
          loc: { section: 'Special Feature: Introduction', para: '2' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'Atal Bihari Vajpayee',
      role: 'head-of-government',
      side: 'india',
      cites: [
        {
          source: 'acronym-1998-05-india-nuclear-tests-statements-by-india',
          loc: { section: 'India Nuclear Tests, 11 & 13 May: Statements by India', para: '1' }
        }
      ]
    },
    {
      name: 'Nawaz Sharif',
      role: 'head-of-government',
      side: 'pakistan',
      cites: [
        {
          source: 'acronym-1998-05-pakistan-nuclear-tests-statements-by-pakistan',
          loc: { section: 'Pakistan Nuclear Tests, 28 & 30 May: Statements by Pakistan', para: '1' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:kargil-war',
      rel: 'led-to',
      cites: [
        {
          source: 'hrw-2000-world-report-india',
          loc: { section: 'Human Rights Watch World Report 2000: India', para: '4' }
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
          text: 'Global efforts to prevent nuclear proliferation and advance the cause of nuclear disarmament received a major blow in May with the carrying out of nuclear weapons tests by India and Pakistan.',
          lang: 'en',
          cite: {
            source: 'acronym-1998-05-disarmament-diplomacy-26-editors-introduction',
            loc: { section: 'Editor\'s Introduction', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.acronym.org.uk/old/archive/dd/dd26/26edint.htm'
          }
        },
        {
          id: 'q2',
          text: 'It is not disputed that both India and Pakistan have conducted nuclear tests in the past month.',
          lang: 'en',
          cite: {
            source: 'acronym-1998-05-india-pakistan-nuclear-tests-introduction',
            loc: { section: 'Special Feature: Introduction', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.acronym.org.uk/old/archive/dd/dd26/26intro.htm'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'India, Pakistan and Israel have long been regarded as nuclear-capable or even \'de facto nuclear-weapon States\', but the tests have raised political, security and diplomatic questions that can no longer be swept under the carpet of nuclear ambiguity.',
          lang: 'en',
          cite: {
            source: 'acronym-1998-05-india-pakistan-nuclear-tests-introduction',
            loc: { section: 'Special Feature: Introduction', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.acronym.org.uk/old/archive/dd/dd26/26intro.htm'
          }
        },
        {
          id: 'q4',
          text: 'The timing of India\'s tests may have been only coincidentally related to the NPT\'s second preparatory committee meeting in Geneva, but the message from that meeting\'s stalemate over the Middle East and nuclear disarmament was certainly underlined by the tests: the NPT regime cannot be taken for granted.',
          lang: 'en',
          cite: {
            source: 'acronym-1998-05-india-pakistan-nuclear-tests-introduction',
            loc: { section: 'Special Feature: Introduction', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.acronym.org.uk/old/archive/dd/dd26/26intro.htm'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'Western analysts have cast doubt on whether either country actually detonated the number or size of tests they announced, suggesting that India did not conduct a thermonuclear explosion of 43 kt, and may only have conducted three tests, all below 12 kt.',
          lang: 'en',
          cite: {
            source: 'acronym-1998-05-india-pakistan-nuclear-tests-introduction',
            loc: { section: 'Special Feature: Introduction', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.acronym.org.uk/old/archive/dd/dd26/26intro.htm'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'The response so far from the major powers indicates that they do not recognise the seismic shift.',
          lang: 'en',
          cite: {
            source: 'acronym-1998-05-india-pakistan-nuclear-tests-introduction',
            loc: { section: 'Special Feature: Introduction', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.acronym.org.uk/old/archive/dd/dd26/26intro.htm'
          }
        },
        {
          id: 'q7',
          text: 'Banning nuclear testing and the production of fissile materials are vital components of non-proliferation and nuclear disarmament.',
          lang: 'en',
          cite: {
            source: 'acronym-1998-05-india-pakistan-nuclear-tests-introduction',
            loc: { section: 'Special Feature: Introduction', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.acronym.org.uk/old/archive/dd/dd26/26intro.htm'
          }
        },
        {
          id: 'q8',
          text: 'In June the U.S. Senate approved a measure lifting sanctions on the sale of farm commodities and other products to India and Pakistan.',
          lang: 'en',
          cite: {
            source: 'hrw-2000-world-report-india',
            loc: { section: 'Human Rights Watch World Report 2000: India', para: '38' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://www.hrw.org/legacy/wr2k/Asia-04.htm' }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q9',
          text: 'The crisis contains severe dangers, but also opportunities.',
          lang: 'en',
          cite: {
            source: 'acronym-1998-05-india-pakistan-nuclear-tests-introduction',
            loc: { section: 'Special Feature: Introduction', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.acronym.org.uk/old/archive/dd/dd26/26intro.htm'
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
            value: { d: '1998-05-11' },
            cites: [
              {
                source: 'acronym-1998-05-india-pakistan-nuclear-tests-introduction',
                loc: { section: 'Special Feature: Introduction', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'On 11 May, the Indian government announced it had conducted 3 nuclear test explosions at the Pohkaran site in Rajasthan.',
        lang: 'en',
        cite: {
          source: 'acronym-1998-05-india-pakistan-nuclear-tests-introduction',
          loc: { section: 'Special Feature: Introduction', para: '1' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://www.acronym.org.uk/old/archive/dd/dd26/26intro.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1998-05-13' },
            cites: [
              {
                source: 'acronym-1998-05-india-pakistan-nuclear-tests-introduction',
                loc: { section: 'Special Feature: Introduction', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'On 13 May, 2 more tests were announced by the Bharatiya Janata Party (BJP) leadership.',
        lang: 'en',
        cite: {
          source: 'acronym-1998-05-india-pakistan-nuclear-tests-introduction',
          loc: { section: 'Special Feature: Introduction', para: '1' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://www.acronym.org.uk/old/archive/dd/dd26/26intro.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1998-05-28' },
            cites: [
              {
                source: 'acronym-1998-05-india-pakistan-nuclear-tests-introduction',
                loc: { section: 'Special Feature: Introduction', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'Pakistan announced on 28 May that it had conducted five nuclear tests, followed by a further test on 30 May.',
        lang: 'en',
        cite: {
          source: 'acronym-1998-05-india-pakistan-nuclear-tests-introduction',
          loc: { section: 'Special Feature: Introduction', para: '2' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://www.acronym.org.uk/old/archive/dd/dd26/26intro.htm'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Chagaiatomictests.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Chagaiatomictests.jpg',
    credit: { institution: 'Government of Pakistan' },
    license: { id: 'cc-by', version: '4.0', url: 'https://creativecommons.org/licenses/by/4.0' }
  }
})
