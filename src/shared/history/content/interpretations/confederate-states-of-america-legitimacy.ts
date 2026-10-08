import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'confederate-states-of-america-legitimacy',
  about: ['polity:confederate-states-of-america'],
  topic: 'legitimacy',
  researched: '2026-10-09',
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
      ],
      reception: [
        {
          id: 'q5',
          text: 'Considered therefore as transactions under the Constitution, the ordinance of secession, adopted by the convention and ratified by a majority of the citizens of Texas, and all the acts of her legislature intended to give effect to that ordinance, were absolutely null. They were utterly without operation in law.',
          lang: 'en',
          cite: {
            source: 'us-supreme-court-1869-texas-v-white',
            loc: { section: 'Texas v. White, 74 U.S. (7 Wall.) 700' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.law.cornell.edu/supremecourt/text/74/700'
          }
        },
        {
          id: 'q6',
          text: 'Still it was the sovereign act of a sovereign State, and the verdict on the trial of this question, \'by battle,\'22 as to her right to secede, has been against her.',
          lang: 'en',
          cite: {
            source: 'us-supreme-court-1869-texas-v-white',
            loc: { section: 'Texas v. White, 74 U.S. (7 Wall.) 700' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.law.cornell.edu/supremecourt/text/74/700'
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
      ],
      reception: [
        {
          id: 'q7',
          text: 'The Constitution, in all its provisions, looks to an indestructible Union, composed of indestructible States.',
          lang: 'en',
          cite: {
            source: 'us-supreme-court-1869-texas-v-white',
            loc: { section: 'Texas v. White, 74 U.S. (7 Wall.) 700' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.law.cornell.edu/supremecourt/text/74/700'
          }
        }
      ]
    }
  ]
})
