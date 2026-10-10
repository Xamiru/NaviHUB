import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: '18-tir-student-protests-responsibility',
  about: ['event:18-tir-student-protests'],
  topic: 'responsibility',
  positions: [
    {
      id: 'khatami-police-acting-outside-their-authority',
      category: 'official',
      holders: [
        { kind: 'participant', name: 'Mohammad Khatami', ref: 'person:mohammad-khatami' },
        { kind: 'state', name: 'Islamic Republic of Iran' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'President Khatami stated on August 12 that "police officers acting outside their authority and non-military personnel" were responsible for the dormitories raid',
          lang: 'en',
          cite: {
            source: 'hrw-2000-world-report-iran',
            loc: { section: 'World Report 2000: Iran', para: '13' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://www.hrw.org/legacy/wr2k/Mena-04.htm' }
        }
      ],
      reception: [
        {
          id: 'q2',
          text: 'Eyewitnesses confirmed that the main force involved in the violent assault was not the Ansar-e Hezbollahi but a much more disciplined, better equipped, uniformed force which arrived at the scene in its own vehicles, entered the campus with cooperation from police officers, and vanished into the dawn a few hours later.',
          lang: 'en',
          cite: {
            source: 'hrw-2000-world-report-iran',
            loc: { section: 'World Report 2000: Iran', para: '13' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://www.hrw.org/legacy/wr2k/Mena-04.htm' }
        }
      ]
    },
    {
      id: 'conservative-leaders-hostile-foreign-backed-forces',
      category: 'official',
      holders: [
        { kind: 'party', name: 'Conservative leaders of the Islamic Republic' },
        { kind: 'state', name: 'Islamic Republic of Iran' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'Blame for the unrest was pinned on hostile, foreign-backed forces and several conservative leaders suggested that public support for a reform agenda was sowing confusion and leaving the nation vulnerable to attack by its enemies.',
          lang: 'en',
          cite: {
            source: 'hrw-2000-world-report-iran',
            loc: { section: 'World Report 2000: Iran', para: '12' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://www.hrw.org/legacy/wr2k/Mena-04.htm' }
        },
        {
          id: 'q4',
          text: 'In the following weeks the conservative press carried statements by Revolutionary Guard leaders calling for an end to President Khatami\'s "dangerous experiments with democracy."',
          lang: 'en',
          cite: {
            source: 'hrw-2000-world-report-iran',
            loc: { section: 'World Report 2000: Iran', para: '12' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://www.hrw.org/legacy/wr2k/Mena-04.htm' }
        }
      ],
      reception: [
        {
          id: 'q5',
          text: 'The student protests, also an outlet for popular expression of dissatisfaction with government policies in a wide range of areas, including the dire economic situation, the lack of opportunities for university graduates, restrictions on basic freedoms, and the slow pace of reform were likened by commentators to the mass demonstrations in 1978 and 1979 which preceded the overthrow of the Shah.',
          lang: 'en',
          cite: {
            source: 'hrw-2000-world-report-iran',
            loc: { section: 'World Report 2000: Iran', para: '11' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://www.hrw.org/legacy/wr2k/Mena-04.htm' }
        }
      ]
    },
    {
      id: 'student-movement-distanced-itself-from-the-looting',
      category: 'contemporary',
      holders: [
        { kind: 'public', name: 'The student movement' }
      ],
      statements: [
        {
          id: 'q6',
          text: 'The student movement distanced itself from the activities of looters and lawbreakers, making a distinction between the peaceful protests of July 9 - 11 and the riotous behavior of the following two days.',
          lang: 'en',
          cite: {
            source: 'hrw-2000-world-report-iran',
            loc: { section: 'World Report 2000: Iran', para: '11' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://www.hrw.org/legacy/wr2k/Mena-04.htm' }
        }
      ]
    }
  ],
  researched: '2026-10-10'
})
