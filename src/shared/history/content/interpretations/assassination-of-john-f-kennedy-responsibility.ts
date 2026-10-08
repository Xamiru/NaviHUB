import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'assassination-of-john-f-kennedy-responsibility',
  about: ['event:assassination-of-john-f-kennedy'],
  topic: 'responsibility',
  positions: [
    {
      id: 'warren-commission',
      category: 'official',
      holders: [
        {
          kind: 'organization',
          name: 'President\'s Commission on the Assassination of President Kennedy'
        }
      ],
      statements: [
        {
          id: 'q1',
          text: 'The shots which killed President Kennedy and wounded Governor Connally were fired by Lee Harvey Oswald.',
          lang: 'en',
          cite: {
            source: 'warren-commission-1964-report',
            loc: { section: 'Chapter 1: Summary and Conclusions', para: '110' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.archives.gov/research/jfk/warren-commission-report/chapter-1.html'
          }
        },
        {
          id: 'q2',
          text: 'The Commission has found no evidence that either Lee Harvey Oswald or Jack Ruby was part of any conspiracy, domestic or foreign, to assassinate President Kennedy.',
          lang: 'en',
          cite: {
            source: 'warren-commission-1964-report',
            loc: { section: 'Chapter 1: Summary and Conclusions', para: '135' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.archives.gov/research/jfk/warren-commission-report/chapter-1.html'
          }
        },
        {
          id: 'q3',
          text: 'On the basis of the evidence before the Commission it concludes that Oswald acted alone.',
          lang: 'en',
          cite: {
            source: 'warren-commission-1964-report',
            loc: { section: 'Chapter 1: Summary and Conclusions', para: '148' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.archives.gov/research/jfk/warren-commission-report/chapter-1.html'
          }
        }
      ],
      reception: [
        {
          id: 'q8',
          text: 'The Warren Commission failed to investigate adequately the possibility of a conspiracy to assassinate the President.',
          lang: 'en',
          cite: {
            source: 'hsca-1979-report',
            loc: { section: 'Summary of Findings and Recommendations', para: '28' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.archives.gov/research/jfk/select-committee-report/summary.html'
          }
        },
        {
          id: 'q9',
          text: 'The Warren Commission conducted a thorough and professional investigation into the responsibility of Lee Harvey Oswald for the assassination.',
          lang: 'en',
          cite: {
            source: 'hsca-1979-report',
            loc: { section: 'Summary of Findings and Recommendations', para: '27' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.archives.gov/research/jfk/select-committee-report/summary.html'
          }
        }
      ]
    },
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
          id: 'q4',
          text: 'Lee Harvey Oswald fired three shots at President John F. Kennedy. The second and third shots he fired struck the President. The third shot he fired killed the President.',
          lang: 'en',
          cite: {
            source: 'hsca-1979-report',
            loc: { section: 'Summary of Findings and Recommendations', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.archives.gov/research/jfk/select-committee-report/summary.html'
          }
        },
        {
          id: 'q5',
          text: 'Scientific acoustical evidence establishes a high probability that two gunmen fired at President John F. Kennedy. Other scientific evidence does not preclude the possibility of two gunmen firing at the President. Scientific evidence negates some specific conspiracy allegations.',
          lang: 'en',
          cite: {
            source: 'hsca-1979-report',
            loc: { section: 'Summary of Findings and Recommendations', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.archives.gov/research/jfk/select-committee-report/summary.html'
          }
        },
        {
          id: 'q6',
          text: 'The committee believes, on the basis of the evidence available to it, that President John F. Kennedy was probably assassinated as a result of a conspiracy. The committee is unable to identify the other gunman or the extent of the conspiracy.',
          lang: 'en',
          cite: {
            source: 'hsca-1979-report',
            loc: { section: 'Summary of Findings and Recommendations', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.archives.gov/research/jfk/select-committee-report/summary.html'
          }
        },
        {
          id: 'q7',
          text: 'The Warren Commission presented the conclusions in its report in a fashion that was too definitive.',
          lang: 'en',
          cite: {
            source: 'hsca-1979-report',
            loc: { section: 'Summary of Findings and Recommendations', para: '30' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.archives.gov/research/jfk/select-committee-report/summary.html'
          }
        }
      ],
      reception: [
        {
          id: 'q10',
          text: 'The validity of this evidence has been widely debated in the short time since it was first presented to the committee and the public',
          lang: 'en',
          cite: {
            source: 'hsca-1979-report',
            loc: {
              section: 'Report of the Select Committee on Assassinations of the U.S. House of Representatives'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.archives.gov/research/jfk/select-committee-report/part-4.html'
          }
        }
      ]
    }
  ],
  researched: '2026-10-09'
})
