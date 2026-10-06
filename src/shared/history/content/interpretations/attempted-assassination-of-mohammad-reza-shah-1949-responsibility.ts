import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'attempted-assassination-of-mohammad-reza-shah-1949-responsibility',
  about: ['event:attempted-assassination-of-mohammad-reza-shah-1949'],
  topic: 'responsibility',
  researched: '2026-10-06',
  framing: {
    id: 'q1',
    text: 'In February 1949, the Tudeh was blamed for an abortive attempt on the shah\'s life, and its leaders fled abroad or were arrested.',
    lang: 'en',
    cite: {
      source: 'loc-iran-country-study-1987',
      loc: { section: 'WORLD WAR II AND THE AZARBAIJAN CRISIS', para: '5' }
    },
    provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/iran/16.htm' }
  },
  positions: [
    {
      id: 'tudeh-member',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Sepehr Zabih' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'At the same time a Tudeh party member made an attempt on the shah’s life, which resulted in the banning of the party and its affiliates',
          lang: 'en',
          cite: {
            source: 'iranica-zabih-communism-in-persia-1941-1953',
            loc: { section: 'COMMUNISM ii. In Persia from 1941 to 1953', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/communism-ii/'
          }
        }
      ]
    },
    {
      id: 'alleged-tudeh-attempt',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Cosroe Chaqueri' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'He was also condemned to death in absentia by the government after an alleged Tudeh attempt on the life of the shah on 15 Bahman 1328 Š./4 February 1949.',
          lang: 'en',
          cite: {
            source: 'iranica-chaqueri-eskandari-iraj',
            loc: { section: 'ESKANDARĪ, ĪRAJ', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/eskandari-iraj/'
          }
        }
      ]
    },
    {
      id: 'mixed-affiliations',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Ali Rahnema' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'Faḵr Ārāʾi was said to have had sympathies for the pro-Soviet Tudeh Party of Iran, yet he was at the ceremony as a reporter for the newspaper Parčam-e Eslām (The Flag of Islam), the managing director of which was Faqihi Širāzi. It was reported that Kāšāni had personally introduced Faḵr Ārāʾi to the newspaper',
          lang: 'en',
          cite: {
            source: 'iranica-rahnema-kashani',
            loc: { section: 'KĀŠĀNI, SAYYED ABU’L-QĀSEM', para: '18' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/kasani-abul-qasem/'
          }
        },
        {
          id: 'q5',
          text: 'It is doubtful that Kāšāni and Faqihi Širāzi had any knowledge or role in the assassination attempt.',
          lang: 'en',
          cite: {
            source: 'iranica-rahnema-kashani',
            loc: { section: 'KĀŠĀNI, SAYYED ABU’L-QĀSEM', para: '18' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/kasani-abul-qasem/'
          }
        }
      ]
    }
  ]
})
