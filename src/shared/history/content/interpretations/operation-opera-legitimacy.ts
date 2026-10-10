import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'operation-opera-legitimacy',
  about: ['event:operation-opera'],
  topic: 'legitimacy',
  positions: [
    {
      id: 'israel-a-rescue-operation',
      category: 'official',
      holders: [
        { kind: 'state', name: 'State of Israel' },
        { kind: 'participant', name: 'Menachem Begin', ref: 'person:menachem-begin' },
        { kind: 'organization', name: 'Menachem Begin Heritage Center' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'Begin, however, viewed the attack a rescue operation for the Children of Israel.',
          lang: 'en',
          cite: {
            source: 'begin-center-the-bombing-of-the-iraqi-nuclear-reactor',
            loc: { section: 'The Bombing of the Iraqi Nuclear Reactor', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.begincenter.org.il/timeline/the-bombing-of-the-iraqi-nuclear-reactor/?lang=en'
          }
        }
      ],
      reception: [
        {
          id: 'q2',
          text: 'According to some estimates, Iraq in 1981 was still as much as five to ten years away from the ability to build a nuclear weapon. Others estimated at that time that Iraq might get its first such weapon within a year or two.',
          lang: 'en',
          cite: {
            source: 'fas-nuke-guide-osiraq-tammuz-i',
            loc: { section: 'Osiraq / Tammuz I', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://nuke.fas.org/guide/iraq/facility/osiraq.htm'
          }
        }
      ]
    },
    {
      id: 'iraq-a-research-reactor',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Republic of Iraq' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'Baghdad reiterated a previous statement that the French atomic reactor was designed for research and for the eventual production of electricity.',
          lang: 'en',
          cite: {
            source: 'fas-nuke-guide-osiraq-tammuz-i',
            loc: { section: 'Osiraq / Tammuz I', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://nuke.fas.org/guide/iraq/facility/osiraq.htm'
          }
        }
      ],
      reception: [
        {
          id: 'q4',
          text: 'After invading Kuwait, Iraq attempted to accelerate its program to develop a nuclear weapon by using radioactive fuel from the Osiraq reactor.',
          lang: 'en',
          cite: {
            source: 'fas-nuke-guide-osiraq-tammuz-i',
            loc: { section: 'Osiraq / Tammuz I', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://nuke.fas.org/guide/iraq/facility/osiraq.htm'
          }
        }
      ]
    },
    {
      id: 'legitimate-anticipatory-self-defence',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress Federal Research Division' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'Those who approved of the raid argued that the Israelis had engaged in an act of legitimate self-defense justifiable under international law and under Article 51 of the charter of the United Nations (UN).',
          lang: 'en',
          cite: {
            source: 'loc-iraq-country-study-1988',
            loc: { section: 'The Search for Nuclear Technology', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/iraq/100.htm' }
        }
      ]
    },
    {
      id: 'security-council-strongly-condemns',
      category: 'contemporary',
      holders: [
        { kind: 'organization', name: 'United Nations Security Council' }
      ],
      statements: [
        {
          id: 'q6',
          text: '1. Strongly condemns the military attack by Israel in clear violation of the Charter of the United Nations and the norms of international conduct;',
          lang: 'en',
          cite: {
            source: 'avalon-unsc-resolution-487-1981',
            loc: { section: 'United Nations Security Council Resolution 487' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://avalon.law.yale.edu/20th_century/un487.asp'
          }
        },
        {
          id: 'q7',
          text: 'Deeply concerned about the danger to international peace and security created by the premeditated Israeli air attack on Iraqi nuclear installations on 7 June 1981',
          lang: 'en',
          cite: {
            source: 'avalon-unsc-resolution-487-1981',
            loc: { section: 'United Nations Security Council Resolution 487' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://avalon.law.yale.edu/20th_century/un487.asp'
          }
        }
      ]
    }
  ],
  researched: '2026-10-10'
})
