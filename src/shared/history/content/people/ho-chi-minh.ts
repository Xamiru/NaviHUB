import { definePerson } from '../../schema'

export default definePerson({
  id: 'ho-chi-minh',
  names: [
    { text: 'Ho Chi Minh', lang: 'en', role: 'primary' },
    { text: 'Hồ Chí Minh', lang: 'vi', role: 'native' }
  ],
  researched: '2026-10-07',
  regions: ['southeast-asia'],
  roles: ['revolutionary', 'head-of-state'],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Bundesarchiv_Bild_183-48579-0009%2C_Stralsund%2C_Ho_Chi_Minh_mit_Matrosen_der_NVA.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Bundesarchiv_Bild_183-48579-0009,_Stralsund,_Ho_Chi_Minh_mit_Matrosen_der_NVA.jpg',
    credit: { institution: 'Bundesarchiv' },
    license: {
      id: 'cc-by-sa',
      version: '3.0 de',
      url: 'https://creativecommons.org/licenses/by-sa/3.0/de/deed.en'
    }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Although Ho Chi Minh would become famous for leading the North Vietnamese forces against the United States in the 1960s, despite his communist leanings, he was not at the outset anti-American.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-dien-bien-phu',
            loc: { section: 'Dien Bien Phu & the Fall of French Indochina, 1954', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1953-1960/dien-bien-phu'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'He had been disappointed by the lack of support given native peoples struggling for independence from colonial rule at the Versailles Conference that ended World War I. In the 1940s, he made repeated requests for American aid and campaigned for independence.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-dien-bien-phu',
            loc: { section: 'Dien Bien Phu & the Fall of French Indochina, 1954', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1953-1960/dien-bien-phu'
          }
        },
        {
          id: 'q3',
          text: 'To counter the influence of popular nationalist Ho Chi Minh, the French attempted to reinstate former emperor Bao Dai, but he was never as popular as Ho Chi Minh, and Vietnam’s independence movement continued to grow.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-dien-bien-phu',
            loc: { section: 'Dien Bien Phu & the Fall of French Indochina, 1954', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1953-1960/dien-bien-phu'
          }
        }
      ]
    }
  ]
})
