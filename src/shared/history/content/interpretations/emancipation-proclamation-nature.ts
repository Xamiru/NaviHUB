import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'emancipation-proclamation-nature',
  about: ['event:emancipation-proclamation'],
  topic: 'nature',
  researched: '2026-10-09',
  positions: [
    {
      id: 'lincoln-central-act',
      category: 'official',
      holders: [
        { kind: 'participant', name: 'Abraham Lincoln', ref: 'person:abraham-lincoln' },
        { kind: 'state', name: 'United States' }
      ],
      statements: [
        {
          id: 'q1',
          text: '"I know very well that the name which is connected with this act will never be forgotten," he said. "It is my greatest and most enduring contribution to the history of the war. It is, in fact, the central act of my administration, and the great event of the nineteenth century."',
          lang: 'en',
          cite: {
            source: 'nps-guelzo-emancipation-and-the-quest-for-freedom',
            loc: { section: 'Emancipation and the Quest for Freedom', para: '17' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nps.gov/articles/emancipation-and-the-quest-for-freedom.htm'
          }
        }
      ],
      reception: [
        {
          id: 'q10',
          text: 'There was always the possibility that, after the war, the courts might still undo emancipation.',
          lang: 'en',
          cite: {
            source: 'nps-guelzo-emancipation-and-the-quest-for-freedom',
            loc: { section: 'Emancipation and the Quest for Freedom', para: '17' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.nps.gov/articles/emancipation-and-the-quest-for-freedom.htm'
          }
        }
      ]
    },
    {
      id: 'confederate-servile-war',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Confederate States of America' },
        { kind: 'participant', name: 'Jefferson Davis' }
      ],
      statements: [
        {
          id: 'q9',
          text: 'And whereas the President of the United States has by public and official declaration signified not only his approval of the effort to excite servile war within the Confederacy but his intention to give aid and encouragement thereto if these independent States shall continue to refuse submission to a foreign power after the 1st day of January next',
          lang: 'en',
          cite: {
            source: 'fssp-davis-1862-12-23-proclamation-general-orders-111',
            loc: { section: 'Proclamation by the Confederate President, General Orders No. 111' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'https://www.freedmen.umd.edu/pow.htm' }
        }
      ],
      reception: [
        {
          id: 'q11',
          text: 'With this Proclamation he hoped to inspire all Black people, and enslaved people in the Confederacy in particular, to support the Union cause',
          lang: 'en',
          cite: {
            source: 'nara-milestone-emancipation-proclamation',
            loc: { section: 'Emancipation Proclamation (1863)', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.archives.gov/milestone-documents/emancipation-proclamation'
          }
        }
      ]
    },
    {
      id: 'military-measure',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'National Archives and Records Administration' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'Lincoln’s bold step to change the goals of the war was a military measure and came just a few days after the Union’s victory in the Battle of Antietam.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-emancipation-proclamation',
            loc: { section: 'Emancipation Proclamation (1863)', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/emancipation-proclamation'
          }
        },
        {
          id: 'q4',
          text: 'Because it was a military measure, however, the Emancipation Proclamation was limited in many ways.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-emancipation-proclamation',
            loc: { section: 'Emancipation Proclamation (1863)', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/emancipation-proclamation'
          }
        }
      ]
    },
    {
      id: 'confirmed-self-emancipation',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'National Archives and Records Administration' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'From the first days of the Civil War, enslaved people had acted to secure their own liberty.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-emancipation-proclamation',
            loc: { section: 'Emancipation Proclamation (1863)', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/emancipation-proclamation'
          }
        },
        {
          id: 'q6',
          text: 'The Emancipation Proclamation confirmed their insistence that the war for the Union must become a war for freedom.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-emancipation-proclamation',
            loc: { section: 'Emancipation Proclamation (1863)', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.archives.gov/milestone-documents/emancipation-proclamation'
          }
        }
      ]
    },
    {
      id: 'legal-caution',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Allen C. Guelzo' }
      ],
      statements: [
        {
          id: 'q7',
          text: 'Nevertheless, the Proclamation has several puzzling features: it speaks of emancipation as a matter of "military necessity" and only once as "an act of justice." It exempted the slaves of the border states and the occupied military districts of the South, and its language is tepid and legalistic.',
          lang: 'en',
          cite: {
            source: 'nps-guelzo-emancipation-and-the-quest-for-freedom',
            loc: { section: 'Emancipation and the Quest for Freedom', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nps.gov/articles/emancipation-and-the-quest-for-freedom.htm'
          }
        },
        {
          id: 'q8',
          text: 'But the puzzles are more apparent than real.',
          lang: 'en',
          cite: {
            source: 'nps-guelzo-emancipation-and-the-quest-for-freedom',
            loc: { section: 'Emancipation and the Quest for Freedom', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nps.gov/articles/emancipation-and-the-quest-for-freedom.htm'
          }
        }
      ]
    }
  ]
})
