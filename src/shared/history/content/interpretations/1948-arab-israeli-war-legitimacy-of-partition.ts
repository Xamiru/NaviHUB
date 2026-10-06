import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: '1948-arab-israeli-war-legitimacy-of-partition',
  about: ['event:1948-arab-israeli-war'],
  topic: 'legitimacy',
  researched: '2026-10-06',
  positions: [
    {
      id: 'natural-right-and-un-resolution',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Israel' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'This right is the natural right of the Jewish people to be masters of their own fate, like all other nations, in their own sovereign State.',
          lang: 'en',
          cite: {
            source: 'avalon-israeli-declaration-of-independence',
            loc: { section: 'Declaration of Israel\'s Independence 1948' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://avalon.law.yale.edu/20th_century/israel.asp'
          }
        }
      ]
    },
    {
      id: 'partition-illegal',
      category: 'official',
      holders: [
        { kind: 'organization', name: 'Palestine Liberation Organization' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'The partition of Palestine in 1947 and the establishment of the state of Israel are entirely illegal, regardless of the passage of time, because they were contrary to the will of the Palestinian people and to their natural right in their homeland, and inconsistent with the principles embodied in the Charter of the United Nations; particularly the right to self-determination.',
          lang: 'en',
          cite: {
            source: 'avalon-palestinian-national-charter-1968',
            loc: { section: 'Article 19' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://avalon.law.yale.edu/20th_century/plocov.asp'
          }
        }
      ]
    },
    {
      id: 'arab-rejection-of-partition',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Office of the Historian, U.S. Department of State' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'The goal of the Arabs was initially to block the Partition Resolution and to prevent the establishment of the Jewish state. The Jews, on the other hand, hoped to gain control over the territory allotted to them under the Partition Plan.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-arab-israeli-war-of-1948',
            loc: { section: 'The Arab-Israeli War of 1948', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1945-1952/arab-israeli-war'
          }
        }
      ]
    }
  ]
})
