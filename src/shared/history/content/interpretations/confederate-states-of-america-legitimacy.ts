import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'confederate-states-of-america-legitimacy',
  about: ['polity:confederate-states-of-america'],
  topic: 'legitimacy',
  researched: '2026-10-08',
  positions: [
    {
      id: 'right-of-the-people-to-withdraw',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Confederate States of America' },
        { kind: 'participant', name: 'Jefferson Davis', ref: 'person:jefferson-davis' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'It illustrates the American idea that governments rest on the consent of the governed, and that it is the right of the people to alter or abolish them at will whenever they become destructive of the ends for which they were established.',
          lang: 'en',
          cite: {
            source: 'avalon-davis-inaugural-address-1861',
            loc: {
              section: 'Inaugural Address of the President of the Provisional Government',
              para: '2'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://avalon.law.yale.edu/19th_century/csa_csainau.asp'
          }
        },
        {
          id: 'q2',
          text: 'Thus the sovereign States here represented have proceeded to form this Confederacy; and it is by abuse of language that their act has been denominated a revolution.',
          lang: 'en',
          cite: {
            source: 'avalon-davis-inaugural-address-1861',
            loc: {
              section: 'Inaugural Address of the President of the Provisional Government',
              para: '3'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://avalon.law.yale.edu/19th_century/csa_csainau.asp'
          }
        }
      ]
    },
    {
      id: 'union-is-perpetual',
      category: 'official',
      holders: [
        { kind: 'state', name: 'United States' },
        { kind: 'participant', name: 'Abraham Lincoln', ref: 'person:abraham-lincoln' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'I hold that in contemplation of universal law and of the Constitution the Union of these States is perpetual.',
          lang: 'en',
          cite: {
            source: 'avalon-lincoln-first-inaugural-address',
            loc: { section: 'First Inaugural Address of Abraham Lincoln', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://avalon.law.yale.edu/19th_century/lincoln1.asp'
          }
        },
        {
          id: 'q4',
          text: 'It follows from these views that no State upon its own mere motion can lawfully get out of the Union; that resolves and ordinances to that effect are legally void, and that acts of violence within any State or States against the authority of the United States are insurrectionary or revolutionary, according to circumstances.',
          lang: 'en',
          cite: {
            source: 'avalon-lincoln-first-inaugural-address',
            loc: { section: 'First Inaugural Address of Abraham Lincoln', para: '19' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://avalon.law.yale.edu/19th_century/lincoln1.asp'
          }
        }
      ]
    }
  ]
})
