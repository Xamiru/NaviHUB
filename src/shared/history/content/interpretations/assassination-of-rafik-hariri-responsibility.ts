import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'assassination-of-rafik-hariri-responsibility',
  about: ['event:assassination-of-rafik-hariri'],
  topic: 'responsibility',
  positions: [
    {
      id: 'un-investigation-senior-syrian-security-officials-implicated',
      category: 'contemporary',
      holders: [
        {
          kind: 'organization',
          name: 'United Nations International Independent Investigation Commission (Detlev Mehlis)'
        }
      ],
      statements: [
        {
          id: 'q1',
          text: 'Lebanese authorities arrested four senior pro-Syrian Lebanese intelligence and security officers in August on suspicion of involvement in the Hariri assassination, but the preliminary report of chief U.N. investigator Detlev Mehlis, submitted to Secretary-General Kofi Annan on October 20, implicated senior Syrian security officials as well.',
          lang: 'en',
          cite: {
            source: 'hrw-2006-world-report-syria',
            loc: { section: 'World Report 2006: Syria' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/world-report/2006/country-chapters/syria'
          }
        }
      ]
    },
    {
      id: 'tribunal-no-indictments-yet-in-2009',
      category: 'contemporary',
      holders: [
        { kind: 'organization', name: 'Special Tribunal for Lebanon' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'The tribunal has not issued any indictments to date, and the UN-appointed international commission continues its investigations.',
          lang: 'en',
          cite: {
            source: 'hrw-2010-world-report-lebanon',
            loc: { section: 'World Report 2010: Lebanon' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/world-report/2010/country-chapters/lebanon'
          }
        }
      ]
    },
    {
      id: 'tribunal-judgment-a-hezbollah-member-convicted',
      category: 'contemporary',
      holders: [
        { kind: 'organization', name: 'Special Tribunal for Lebanon' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'In August, judges at the Special Tribunal for Lebanon convicted a member of Hezbollah for his role in the killing of former Lebanese Prime Minister Rafik Hariri in a 2005 car bomb.',
          lang: 'en',
          cite: {
            source: 'hrw-2021-world-report-lebanon',
            loc: { section: 'World Report 2021: Lebanon' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/world-report/2021/country-chapters/lebanon'
          }
        },
        {
          id: 'q4',
          text: 'In March, the Appeals Chamber of the Special Tribunal for Lebanon reversed the acquittal of Hezbollah agents Hassan Merhi and Hussein Oneissi, convicting them in absentia of being co-perpetrators in the assassination of former Lebanese Prime Minister Rafik al-Hariri in 2005.',
          lang: 'en',
          cite: {
            source: 'hrw-2023-world-report-lebanon',
            loc: { section: 'World Report 2023: Lebanon' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/world-report/2023/country-chapters/lebanon'
          }
        }
      ]
    }
  ],
  researched: '2026-10-13'
})
