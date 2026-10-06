import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'truman-doctrine-soviet-role-in-greece',
  about: ['event:truman-doctrine'],
  topic: 'causes',
  researched: '2026-10-06',
  positions: [
    {
      id: 'support-free-peoples',
      category: 'official',
      holders: [
        { kind: 'state', name: 'United States' },
        { kind: 'participant', name: 'Harry S. Truman', ref: 'person:harry-s-truman' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'I believe that it must be the policy of the United States to support free peoples who are resisting attempted subjugation by armed minorities or by outside pressures.',
          lang: 'en',
          cite: {
            source: 'avalon-truman-doctrine-address-1947',
            loc: { section: 'Truman Doctrine' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://avalon.law.yale.edu/20th_century/trudoc.asp'
          }
        }
      ]
    },
    {
      id: 'stalin-held-back',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Office of the Historian, U.S. Department of State' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'At the time, the U.S. Government believed that the Soviet Union supported the Greek Communist war effort and worried that if the Communists prevailed in the Greek civil war, the Soviets would ultimately influence Greek policy. In fact, Soviet leader Joseph Stalin had deliberately refrained from providing any support to the Greek Communists and had forced Yugoslav Prime Minister Josip Tito to follow suit, much to the detriment of Soviet-Yugoslav relations.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-truman-doctrine',
            loc: { section: 'The Truman Doctrine, 1947', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1945-1952/truman-doctrine'
          }
        }
      ]
    }
  ]
})
