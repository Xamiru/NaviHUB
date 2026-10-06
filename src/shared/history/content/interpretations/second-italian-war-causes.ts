import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'second-italian-war-causes',
  about: ['event:second-italian-war-of-independence'],
  topic: 'causes',
  researched: '2026-10-06',
  positions: [
    {
      id: 'cause-of-italy',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Count Cavour' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'In recent years, therefore, we have tried to do away with the last hindrances to our country, and we have lost no occasion to act as the spokesman and defender of the other peoples of Italy.',
          lang: 'en',
          cite: {
            source: 'fordham-documents-of-italian-unification',
            loc: { section: 'Documents of Italian Unification, 1846-61', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://sourcebooks.fordham.edu/mod/1861italianunif.asp'
          }
        },
        {
          id: 'q2',
          text: 'As for the defense of the rights of Italy, that was our task in the course of the Congress of Paris. . . .it was an outstanding fact that the cause of Italy was for the first time supported by an Italian power.',
          lang: 'en',
          cite: {
            source: 'fordham-documents-of-italian-unification',
            loc: { section: 'Documents of Italian Unification, 1846-61', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://sourcebooks.fordham.edu/mod/1861italianunif.asp'
          }
        }
      ]
    },
    {
      id: 'non-revolutionary-war',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Napoleon III', ref: 'person:napoleon-iii' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'The Emperor started by saying that he had decided to support Sardinia with all his forces in a war against Austria, provided that the war was undertaken for a non-revolutionary cause, which could be justified in the eyes of diplomacy and still more of public opinion in France and Europe.',
          lang: 'en',
          cite: {
            source: 'fordham-documents-of-italian-unification',
            loc: { section: 'Documents of Italian Unification, 1846-61', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://sourcebooks.fordham.edu/mod/1861italianunif.asp'
          }
        }
      ]
    },
    {
      id: 'french-opportunism',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'France took advantage of the estrangement between Austria and Russia to set up a military confrontation between Austrian and Italian nationalist forces. This opened the door to French military intervention in support of the Italians in 1859.',
          lang: 'en',
          cite: {
            source: 'loc-austria-country-study-1994',
            loc: { section: 'The Failure of Neoabsolutism', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/austria/24.htm' }
        }
      ]
    }
  ]
})
