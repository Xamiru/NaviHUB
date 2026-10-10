import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: '1998-nuclear-tests-in-india-and-pakistan-motives',
  about: ['event:1998-nuclear-tests-in-india-and-pakistan'],
  topic: 'motives',
  framing: {
    id: 'q1',
    text: 'Although their actions were largely driven by domestic political considerations, the regional and international security and nuclear proliferation environments have seismically shifted as a result.',
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
  },
  positions: [
    {
      id: 'india-government-vajpayee-statement',
      category: 'official',
      holders: [
        { kind: 'state', name: 'India' },
        { kind: 'participant', name: 'Atal Bihari Vajpayee' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'The decades of the 80\'s and 90\'s had meanwhile witnessed the gradual deterioration of our security environment as a result of nuclear and missile proliferation.',
          lang: 'en',
          cite: {
            source: 'acronym-1998-05-india-nuclear-tests-statements-by-india',
            loc: { section: 'India Nuclear Tests, 11 & 13 May: Statements by India', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.acronym.org.uk/old/archive/26ind.htm'
          }
        },
        {
          id: 'q3',
          text: 'India is now a nuclear-weapon State.',
          lang: 'en',
          cite: {
            source: 'acronym-1998-05-india-nuclear-tests-statements-by-india',
            loc: { section: 'India Nuclear Tests, 11 & 13 May: Statements by India', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.acronym.org.uk/old/archive/26ind.htm'
          }
        },
        {
          id: 'q4',
          text: 'We do not intend to use these weapons for aggression or for mounting threats against any country; these are weapons of self-defence, to ensure that India is not subjected to nuclear threats or coercion.',
          lang: 'en',
          cite: {
            source: 'acronym-1998-05-india-nuclear-tests-statements-by-india',
            loc: { section: 'India Nuclear Tests, 11 & 13 May: Statements by India', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.acronym.org.uk/old/archive/26ind.htm'
          }
        }
      ],
      reception: [
        {
          id: 'q5',
          text: 'It would be facile to blame the South Asian crisis on the P-5 for not disarming sooner, as that infantilises India and Pakistan\'s own decisions and choices.',
          lang: 'en',
          cite: {
            source: 'acronym-1998-05-india-pakistan-nuclear-tests-introduction',
            loc: { section: 'Special Feature: Introduction', para: '8' }
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
      id: 'pakistan-government-sharif-statement',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Pakistan' },
        { kind: 'participant', name: 'Nawaz Sharif' }
      ],
      statements: [
        {
          id: 'q6',
          text: 'After due deliberations and a careful review of all options, we took the decision to restore the strategic balance.',
          lang: 'en',
          cite: {
            source: 'acronym-1998-05-pakistan-nuclear-tests-statements-by-pakistan',
            loc: {
              section: 'Pakistan Nuclear Tests, 28 & 30 May: Statements by Pakistan',
              para: '4'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.acronym.org.uk/old/archive/dd/dd26/26pak.htm'
          }
        },
        {
          id: 'q7',
          text: 'These weapons are to deter aggression, whether nuclear or conventional.',
          lang: 'en',
          cite: {
            source: 'acronym-1998-05-pakistan-nuclear-tests-statements-by-pakistan',
            loc: {
              section: 'Pakistan Nuclear Tests, 28 & 30 May: Statements by Pakistan',
              para: '5'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.acronym.org.uk/old/archive/dd/dd26/26pak.htm'
          }
        }
      ],
      reception: [
        {
          id: 'q8',
          text: 'Nor can it be ignored that P-5 complacency and their repeated assertions of the legitimacy and necessity of their own nuclear weapons have contributed to creating the conditions for this mess.',
          lang: 'en',
          cite: {
            source: 'acronym-1998-05-india-pakistan-nuclear-tests-introduction',
            loc: { section: 'Special Feature: Introduction', para: '8' }
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
      id: 'united-states-clinton-remarks',
      category: 'official',
      holders: [
        { kind: 'state', name: 'United States' },
        { kind: 'participant', name: 'Bill Clinton', ref: 'person:bill-clinton' }
      ],
      statements: [
        {
          id: 'q9',
          text: 'First, I deplore the decision.',
          lang: 'en',
          cite: {
            source: 'white-house-1998-05-28-remarks-on-the-pakistani-nuclear-tests',
            loc: { section: 'Remarks by the President, 28 May 1998', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://clintonwhitehouse3.archives.gov/WH/New/html/19980528-29826.html'
          }
        },
        {
          id: 'q10',
          text: 'By failing to exercise restraint and responding to the Indian test, Pakistan lost a truly priceless opportunity to strengthen its own security, to improve its political standing in the eyes of the world.',
          lang: 'en',
          cite: {
            source: 'white-house-1998-05-28-remarks-on-the-pakistani-nuclear-tests',
            loc: { section: 'Remarks by the President, 28 May 1998', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://clintonwhitehouse3.archives.gov/WH/New/html/19980528-29826.html'
          }
        }
      ],
      reception: [
        {
          id: 'q11',
          text: 'But the P-5 were short on practical steps and offered nothing in terms of nuclear disarmament, a reciprocal component of non-proliferation that they have been slow to implement, despite the opportunities presented at the end of the Cold War.',
          lang: 'en',
          cite: {
            source: 'acronym-1998-05-india-pakistan-nuclear-tests-introduction',
            loc: { section: 'Special Feature: Introduction', para: '7' }
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
  researched: '2026-10-10'
})
