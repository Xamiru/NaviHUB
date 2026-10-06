import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'emancipation-proclamation-nature',
  about: ['event:emancipation-proclamation'],
  topic: 'nature',
  researched: '2026-10-06',
  positions: [
    {
      id: 'lincoln-central-act',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Abraham Lincoln', ref: 'person:abraham-lincoln' }
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
      ]
    },
    {
      id: 'confederate-servile-war',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Jefferson Davis' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'Included in this proclamation is a statement that Lincoln\'s upcoming Emancipation Proclamation is designed to "excite servile war" and that any black US soldiers or their white officers are to be sent to the individual states instead of being treated as prisoners of war.',
          lang: 'en',
          cite: {
            source: 'nps-gett-civil-war-timeline',
            loc: { section: 'Civil War Timeline', para: '50' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nps.gov/gett/learn/historyculture/civil-war-timeline.htm'
          }
        }
      ]
    },
    {
      id: 'military-measure',
      category: 'official',
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
      category: 'official',
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
