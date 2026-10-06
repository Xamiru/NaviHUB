import { definePeriod } from '../../schema'

export default definePeriod({
  id: 'reign-of-mohammad-reza-shah',
  names: [
    { text: 'Reign of Mohammad Reza Shah Pahlavi', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  periodType: 'reign',
  start: {
    alts: [
      {
        value: { d: '1941-09-16' },
        cites: [
          {
            source: 'iranica-yarshater-iranian-history-islamic-period-6',
            loc: {
              section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Moḥammad Reza Shah (1941-79)'
            }
          },
          {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'WORLD WAR II AND THE AZARBAIJAN CRISIS', para: '1' }
          },
          {
            source: 'iranica-zabih-communism-in-persia-1941-1953',
            loc: { section: 'COMMUNISM ii. In Persia from 1941 to 1953', para: '1' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1979' },
        cites: [
          {
            source: 'iranica-yarshater-iranian-history-islamic-period-6',
            loc: {
              section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Moḥammad Reza Shah (1941-79)'
            }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 2,
  parent: 'period:pahlavi-dynasty',
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The first phase of Moḥammad Reza Shah’s reign (1941-53) was characterized by factionalism in the Majles, unbridled disputes, and sometimes character assassinations in the press, as a fruit of unprecedented freedom, despite a measure of government control.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-iranian-history-islamic-period-6',
            loc: {
              section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Moḥammad Reza Shah (1941-79)'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/iran-ii2-islamic-period-page-6/'
          }
        },
        {
          id: 'q2',
          text: 'The shah, who had been educated in Switzerland and who, after returning to Iran, was sent to the military academy (daneškada-ye afsari) for two years of training, exhibited a democratic attitude and followed the vote of the Majles in the appointment of prime ministers.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-iranian-history-islamic-period-6',
            loc: {
              section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Moḥammad Reza Shah (1941-79)'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/iran-ii2-islamic-period-page-6/'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Similarly, Moḥammad-Reżā Shah’s inexperience and vulnerability, particularly in view of the circumstances surrounding his assumption of the throne and the impact of the humiliating fate that had met his father, together with his desire to enhance his prerogatives, despite his avowed undertaking to act constitutionally, facilitated the growing influence of the British legation (embassy from 1943).',
          lang: 'en',
          cite: {
            source: 'iranica-azimi-great-britain-v',
            loc: { section: 'GREAT BRITAIN v. British influence in Persia, 1941-79', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/great-britain-v/'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/20/Photograph_of_President_Truman_and_the_Shah_of_Iran_in_the_Oval_Office._-_NARA_-_200149.jpg/1280px-Photograph_of_President_Truman_and_the_Shah_of_Iran_in_the_Oval_Office._-_NARA_-_200149.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Photograph_of_President_Truman_and_the_Shah_of_Iran_in_the_Oval_Office._-_NARA_-_200149.jpg',
    credit: { institution: 'US National Archives and Records Administration', creator: 'Abbie Rowe' },
    license: { id: 'public-domain' }
  }
})
