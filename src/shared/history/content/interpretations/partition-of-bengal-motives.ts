import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'partition-of-bengal-motives',
  about: ['event:partition-of-bengal-1905'],
  topic: 'motives',
  researched: '2026-10-09',
  positions: [
    {
      id: 'administration',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Government of India' },
        { kind: 'participant', name: 'Lord Curzon', ref: 'person:george-curzon' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'It is beyond dispute that Bengal must be relieved. No one Government and no one Administration can possibly devote to nearly 80 millions of people the personal supervision, care, and control which are the objects for which Local Governments exist.',
          lang: 'en',
          cite: {
            source: 'curzon-1904-speeches-vol-iii',
            loc: { section: 'Addresses at Dacca, 18 February 1904', page: '295' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://archive.org/download/in.ernet.dli.2015.207242/2015.207242.Speeches-By_djvu.txt'
          }
        },
        {
          id: 'q5',
          text: 'which would invest the Mahomedans in Eastern Bengal with a unity which they have not enjoyed since the days of the old Musulman Viceroys and Kings,',
          lang: 'en',
          cite: {
            source: 'curzon-1904-speeches-vol-iii',
            loc: { section: 'Addresses at Dacca, 18 February 1904', page: '303' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://archive.org/download/in.ernet.dli.2015.207242/2015.207242.Speeches-By_djvu.txt'
          }
        }
      ],
      reception: [
        {
          id: 'q8',
          text: 'An ill-conceived and hastily implemented action, the partition outraged Bengalis. Not only had the government failed to consult Indian public opinion but the action appeared to reflect the British resolve to "divide and rule."',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'The Independence Movement', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/india/19.htm' }
        }
      ]
    },
    {
      id: 'a-cruel-wrong',
      category: 'contemporary',
      holders: [
        { kind: 'party', name: 'Indian National Congress' },
        { kind: 'participant', name: 'Gopal Krishna Gokhale' }
      ],
      statements: [
        {
          id: 'q6',
          text: '14. That this Congress records its emphatic protest against the proposals of the Government of India, for the partition of Bengal in any manner whatsoever. That the proposals are viewed with great alarm by the people, as the division of the Bengali nation into separate units will seriously interfere with its social, intellectual and material progress,',
          lang: 'en',
          cite: {
            source: 'natesan-1909-indian-national-congress',
            loc: { section: 'Congress Resolutions: Twentieth Congress, Bombay, 1904', page: '150' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://archive.org/download/indiannationalco00madrrich/indiannationalco00madrrich_djvu.txt'
          }
        },
        {
          id: 'q7',
          text: 'Gentlemen, the question that is uppermost in the minds of us all at this moment is the Partition of Bengal. A cruel wrong has been inflicted on our Bengalee brethren',
          lang: 'en',
          cite: {
            source: 'natesan-1909-indian-national-congress',
            loc: { section: 'Presidential address of G. K. Gokhale, Benares, 1905', page: '824' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://archive.org/download/indiannationalco00madrrich/indiannationalco00madrrich_djvu.txt'
          }
        }
      ]
    },
    {
      id: 'muslim-recognition',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'Many Bengali Muslims viewed the partition as initial recognition of their cultural and political separation from the Hindu majority population.',
          lang: 'en',
          cite: {
            source: 'loc-bangladesh-country-study-1989',
            loc: { section: 'The Division of Bengal, 1905-12', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/bangladesh/11.htm' }
        }
      ]
    }
  ]
})
