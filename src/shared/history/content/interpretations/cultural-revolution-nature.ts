import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'cultural-revolution-nature',
  about: ['event:cultural-revolution'],
  topic: 'nature',
  researched: '2026-10-09',
  positions: [
    {
      id: 'new-stage-of-socialist-revolution',
      category: 'official',
      holders: [
        { kind: 'party', name: 'Communist Party of China (Central Committee, 1966)' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'The Great Proletarian Cultural Revolution now unfolding is a great revolution that touches people to their very souls and constitutes a new stage in the development of the socialist revolution in our country, a stage which is both broader and deeper.',
          lang: 'en',
          cite: {
            source: 'cpc-1966-decision-concerning-the-great-proletarian-cultural-revolution',
            loc: { section: '1. A New Stage in the Socialist Revolution' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.marxists.org/subject/china/peking-review/1966/PR1966-33g.htm'
          }
        },
        {
          id: 'q2',
          text: 'At present, our objective is to struggle against and overthrow those persons in authority who are taking the capitalist road, to criticize and repudiate the reactionary bourgeois academic “authorities” and the ideology of the bourgeoisie and all other exploiting classes and to transform education, literature and art and all other parts of the superstructure not in correspondence with the socialist economic base, so as to facilitate the consolidation and development of the socialist system.',
          lang: 'en',
          cite: {
            source: 'cpc-1966-decision-concerning-the-great-proletarian-cultural-revolution',
            loc: { section: '1. A New Stage in the Socialist Revolution' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.marxists.org/subject/china/peking-review/1966/PR1966-33g.htm'
          }
        }
      ],
      reception: [
        {
          id: 'q6',
          text: 'By mid-1965 Mao had gradually but systematically regained control of the party with the support of Lin Biao, Jiang Qing (Mao\'s fourth wife), and Chen Boda, a leading theoretician.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Cultural Revolution, 1966-76', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/china/28.htm' }
        }
      ]
    },
    {
      id: 'most-severe-setback',
      category: 'official',
      holders: [
        { kind: 'party', name: 'Communist Party of China (Central Committee, 1981)' }
      ],
      statements: [
        {
          id: 'q3',
          text: '19. The “cultural revolution", which lasted from May 1966 to October 1976, was responsible for the most severe setback and the heaviest losses suffered by the Party, the state and the people since the founding of the People’s Republic.',
          lang: 'en',
          cite: {
            source: 'cpc-1981-resolution-on-party-history',
            loc: { section: 'The Decade of the “Cultural Revolution"' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.marxists.org/subject/china/documents/cpc/history/01.htm'
          }
        },
        {
          id: 'q4',
          text: '4) Practice has shown that the “cultural revolution” did not in fact constitute a revolution or social progress in any sense, nor could it possibly have done so.',
          lang: 'en',
          cite: {
            source: 'cpc-1981-resolution-on-party-history',
            loc: { section: 'The Decade of the “Cultural Revolution"' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.marxists.org/subject/china/documents/cpc/history/01.htm'
          }
        }
      ],
      reception: [
        {
          id: 'q7',
          text: 'Considerable intraparty opposition to the Cultural Revolution was evident.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Cultural Revolution, 1966-76', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/china/28.htm' }
        }
      ]
    },
    {
      id: 'purge-under-guise-of-purity',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'In the next six months, under the guise of upholding ideological purity, Mao and his supporters purged or attacked a wide variety of public figures, including State Chairman Liu Shaoqi and other party and state leaders.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Cultural Revolution, 1966-76', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/china/28.htm' }
        }
      ]
    }
  ]
})
