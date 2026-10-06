import { definePeriod } from '../../schema'

export default definePeriod({
  id: 'cold-war',
  names: [
    { text: 'Cold War', lang: 'en', role: 'primary' },
    {
      text: 'Kalter Krieg',
      lang: 'de',
      role: 'alternative',
      cites: [
        {
          source: 'lemo-biografie-winston-churchill',
          loc: { section: 'Winston Churchill 1874-1965', para: '50' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  periodType: 'era',
  start: {
    alts: [
      {
        value: { d: '1947' },
        cites: [
          {
            source: 'state-dept-milestones-kennan-and-containment',
            loc: { section: 'Kennan and Containment, 1947', para: '1' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1989' },
        cites: [
          {
            source: 'state-dept-milestones-kennan-and-containment',
            loc: { section: 'Kennan and Containment, 1947', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['global', 'europe', 'north-america', 'russia-central-asia'],
  prominence: 1,
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The end of the common cause again exposed the underlying hostility between the capitalist countries and the Soviet Union. And the favorable position in which the Soviet Union finished World War II rapidly made it the prime postwar threat to world peace in the eyes of Western policy makers. The so-called Cold War that emerged from that situation featured Soviet domination of all of Eastern Europe, the development of nuclear weapons by the Soviet Union, and dangerous conflicts and near-conflicts in several areas of the world.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Reconstruction and Cold War', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/12.htm' }
        },
        {
          id: 'q2',
          text: 'George F. Kennan, a career Foreign Service Officer, formulated the policy of “containment,” the basic United States strategy for fighting the cold war (1947–1989) with the Soviet Union.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-kennan-and-containment',
            loc: { section: 'Kennan and Containment, 1947', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1945-1952/kennan'
          }
        }
      ]
    },
    {
      kind: 'ideas',
      quotes: [
        {
          id: 'q3',
          text: '“The main element of any United States policy toward the Soviet Union,” Kennan wrote, “must be that of a long-term, patient but firm and vigilant containment of Russian expansive tendencies.”',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-kennan-and-containment',
            loc: { section: 'Kennan and Containment, 1947', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1945-1952/kennan'
          }
        },
        {
          id: 'q4',
          text: 'Despite all the criticisms and the various policy defeats that Kennan suffered in the early 1950’s, containment in the more general sense of blocking the expansion of Soviet influence remained the basic strategy of the United States throughout the cold war.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-kennan-and-containment',
            loc: { section: 'Kennan and Containment, 1947', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1945-1952/kennan'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5d/Photograph_of_President_Truman_and_Prime_Minister_Churchill_standing_on_the_rear_platform_of_a_special_Baltimore..._-_NARA_-_199349.jpg/1280px-Photograph_of_President_Truman_and_Prime_Minister_Churchill_standing_on_the_rear_platform_of_a_special_Baltimore..._-_NARA_-_199349.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Photograph_of_President_Truman_and_Prime_Minister_Churchill_standing_on_the_rear_platform_of_a_special_Baltimore..._-_NARA_-_199349.jpg',
    credit: { institution: 'US National Archives and Records Administration', creator: 'Abbie Rowe' },
    license: { id: 'public-domain' }
  }
})
