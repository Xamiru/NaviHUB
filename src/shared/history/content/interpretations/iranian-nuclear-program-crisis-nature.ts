import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'iranian-nuclear-program-crisis-nature',
  about: ['event:iranian-nuclear-program-crisis'],
  topic: 'nature',
  framing: {
    id: 'q1',
    text: 'The Iranian nuclear stand-off bears many of the hallmarks of a no-win situation, and yet the stakes are so high that for the sake of both international security and the Iranian people, a diplomatic solution needs urgently to be found.',
    lang: 'en',
    cite: {
      source: 'acronym-2006-dd82-narrowing-options-for-iran-and-the-world',
      loc: { section: 'Narrowing options for Iran and the World', para: '3' }
    },
    provenance: {
      via: 'web',
      at: '2026-10-13',
      url: 'https://acronym.org.uk/old/archive/dd/dd82/82iran.htm'
    }
  },
  positions: [
    {
      id: 'iran-a-peaceful-programme-and-an-inalienable-right',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Islamic Republic of Iran' },
        { kind: 'participant', name: 'Ali Khamenei', ref: 'person:ali-khamenei' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'The Iranian authorities reaffirmed that nuclear weapons have no place in Iran\'s defence doctrine and that its nuclear programme and activities have been exclusively in the peaceful domain.',
          lang: 'en',
          cite: {
            source: 'acronym-2003-10-21-e3-foreign-ministers-visit-to-tehran-agreed-statement',
            loc: {
              section: 'Agreed Statement at the end of a visit to the Islamic Republic of Iran, October 21, 2003'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.acronym.org.uk/old/archive/docs/0310/doc13.htm'
          }
        },
        {
          id: 'q3',
          text: 'Iran, like all other developing countries and members of the NPT, has rejected nuclear weapons decisively and firmly.',
          lang: 'en',
          cite: {
            source: 'acronym-2005-dd80-irans-nuclear-programme-eu-3-snubbed',
            loc: {
              section: 'Iran\'s Nuclear Programme: EU-3 Snubbed as Iran begins Uranium Conversion at Isfahan',
              para: '40'
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
          text: 'Iran\'s Supreme Leader Ayatollah Ali Khamenei stated that Iran had no interest in developing nuclear weapons but would not suspend its nuclear activities.',
          lang: 'en',
          cite: {
            source: 'acronym-2005-dd80-irans-nuclear-programme-eu-3-snubbed',
            loc: {
              section: 'Iran\'s Nuclear Programme: EU-3 Snubbed as Iran begins Uranium Conversion at Isfahan',
              para: '47'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.acronym.org.uk/old/archive/textonly/dd/dd80/80news01.htm'
          }
        }
      ],
      reception: [
        {
          id: 'q5',
          text: 'Iran has made substantial efforts over the past two decades to master an independent nuclear fuel cycle and, to that end, has conducted experiments to acquire the know-how for almost every aspect of the nuclear fuel cycle. Many aspects of Iran\'s nuclear fuel cycle activities and experiments, particularly in the areas of uranium enrichment, uranium conversion and plutonium research, had not been declared to the Agency',
          lang: 'en',
          cite: {
            source: 'acronym-2006-dd82-narrowing-options-for-iran-and-the-world',
            loc: { section: 'Narrowing options for Iran and the World', para: '22' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://acronym.org.uk/old/archive/dd/dd82/82iran.htm'
          }
        }
      ]
    },
    {
      id: 'us-an-active-nuclear-weapons-programme',
      category: 'official',
      holders: [
        { kind: 'state', name: 'United States' },
        { kind: 'participant', name: 'R. Nicholas Burns' }
      ],
      statements: [
        {
          id: 'q6',
          text: 'We see no sign Iran has made the necessary strategic decision to abandon what we conclude is an active nuclear weapons program.',
          lang: 'en',
          cite: {
            source: 'acronym-2005-05-26-burns-statement-on-us-policy-toward-iran',
            loc: { section: 'Statement of R. Nicholas Burns, May 26, 2005' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://acronym.org.uk/old/archive/textonly/docs/0505/doc04.htm'
          }
        }
      ],
      reception: [
        {
          id: 'q7',
          text: 'To date, there is no evidence that the previously undeclared nuclear material and activities referred to above were related to a nuclear weapons programme.',
          lang: 'en',
          cite: {
            source: 'acronym-2003-11-10-iaea-report-on-iran-gov-2003-75',
            loc: {
              section: 'Implementation of the NPT Safeguards Agreement in the Islamic Republic of Iran (GOV/2003/75)',
              para: '78'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.acronym.org.uk/old/archive/docs/0311/doc26.htm'
          }
        },
        {
          id: 'q8',
          text: 'Though the US insists that the clandestine uranium enrichment and plutonium production programmes are evidence of Iran\'s intent to develop nuclear weapons, ElBaradei has pointed out that the quantities involved were grammes rather than kilogrammes, consistent with the exposed research programmes but far too little to be weapon-significant at this stage.',
          lang: 'en',
          cite: {
            source: 'acronym-2003-12-dd74-addressing-irans-nuclear-programme',
            loc: {
              section: 'Addressing Iran\'s Nuclear Programme: the US, IAEA, and European Foreign Ministers',
              para: '3'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.acronym.org.uk/old/archive/dd/dd74/74news02.htm'
          }
        }
      ]
    },
    {
      id: 'acronym-no-clear-evidence-but-suspicion',
      category: 'contemporary',
      holders: [
        { kind: 'organization', name: 'The Acronym Institute for Disarmament Diplomacy' }
      ],
      statements: [
        {
          id: 'q9',
          text: 'At present there is no clear evidence of nuclear weapons development.',
          lang: 'en',
          cite: {
            source: 'acronym-2007-dd84-irans-nuclear-programme-in-a-dangerous-poker-game',
            loc: { section: 'Iran\'s Nuclear Programme in a Dangerous Poker Game', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.acronym.org.uk/old/archive/dd/dd84/84news03.htm'
          }
        }
      ]
    }
  ],
  researched: '2026-10-13'
})
