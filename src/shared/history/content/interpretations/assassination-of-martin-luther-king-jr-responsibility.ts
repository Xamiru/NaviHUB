import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'assassination-of-martin-luther-king-jr-responsibility',
  about: ['event:assassination-of-martin-luther-king-jr'],
  topic: 'responsibility',
  framing: {
    id: 'q6',
    text: 'Ray, within days of entering his guilty plea in 1969, attempted to withdraw it. Until his death in April 1998, he maintained that he did not shoot Dr. King and was framed by a man he knew only as Raoul. For 30 years, others have similarly alleged that Ray was Raoul\'s unwitting pawn and that a conspiracy orchestrated Dr. King\'s murder. These varied theories have generated several comprehensive government investigations regarding the assassination, none of which confirmed the existence of any conspiracy. However, in King v. Jowers, a recent civil suit in a Tennessee state court, a jury returned a verdict finding that Jowers and unnamed others, including unspecified government agencies, participated in a conspiracy to assassinate Dr. King.',
    lang: 'en',
    cite: {
      source: 'doj-2000-king-assassination-allegations',
      loc: { section: 'Overview', para: '4' }
    },
    provenance: {
      via: 'web',
      at: '2026-10-07',
      url: 'https://www.justice.gov/crt/overview-investigation-allegations-regarding-assassination-dr-martin-luther-king-jr'
    }
  },
  positions: [
    {
      id: 'house-select-committee',
      category: 'official',
      holders: [
        {
          kind: 'organization',
          name: 'Select Committee on Assassinations, U.S. House of Representatives'
        }
      ],
      statements: [
        {
          id: 'q1',
          text: 'James Earl Ray fired one shot at Dr. Martin Luther King, Jr. The shot killed Dr. King.',
          lang: 'en',
          cite: {
            source: 'hsca-1979-report',
            loc: { section: 'Summary of Findings and Recommendations', para: '33' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.archives.gov/research/jfk/select-committee-report/summary.html'
          }
        },
        {
          id: 'q2',
          text: 'The committee believes, on the basis of the circumstantial evidence available to it, that there is a likelihood that James Earl Ray assassinated Dr. Martin Luther King as a result of a conspiracy.',
          lang: 'en',
          cite: {
            source: 'hsca-1979-report',
            loc: { section: 'Summary of Findings and Recommendations', para: '41' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.archives.gov/research/jfk/select-committee-report/summary.html'
          }
        },
        {
          id: 'q3',
          text: 'No Federal, State or local government agency was involved in the assassination of Dr. King.',
          lang: 'en',
          cite: {
            source: 'hsca-1979-report',
            loc: { section: 'Summary of Findings and Recommendations', para: '43' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.archives.gov/research/jfk/select-committee-report/summary.html'
          }
        }
      ]
    },
    {
      id: 'department-of-justice',
      category: 'official',
      holders: [
        {
          kind: 'organization',
          name: 'Civil Rights Division, United States Department of Justice'
        }
      ],
      statements: [
        {
          id: 'q4',
          text: 'Ultimately, we found nothing to disturb the 1969 judicial determination that James Earl Ray murdered Dr. King or to confirm that Raoul or anyone else implicated by Jowers or suggested by the Wilson papers participated in the assassination.',
          lang: 'en',
          cite: {
            source: 'doj-2000-king-assassination-allegations',
            loc: { section: 'Overview', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.justice.gov/crt/overview-investigation-allegations-regarding-assassination-dr-martin-luther-king-jr'
          }
        },
        {
          id: 'q5',
          text: 'Finally, we find that there is no reliable evidence to support the allegations presented in King v. Jowers of a government-directed conspiracy involving the Mafia and Dr. King\'s associates. Accordingly, no further investigation is warranted.',
          lang: 'en',
          cite: {
            source: 'doj-2000-king-assassination-allegations',
            loc: { section: 'Overview', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.justice.gov/crt/overview-investigation-allegations-regarding-assassination-dr-martin-luther-king-jr'
          }
        }
      ]
    }
  ],
  researched: '2026-10-07'
})
