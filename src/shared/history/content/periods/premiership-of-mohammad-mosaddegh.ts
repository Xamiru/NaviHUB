import { definePeriod } from '../../schema'

export default definePeriod({
  id: 'premiership-of-mohammad-mosaddegh',
  names: [
    { text: 'Premiership of Mohammad Mosaddegh', lang: 'en', role: 'primary' },
    { text: 'دولت محمد مصدق', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-07',
  periodType: 'regime',
  start: {
    alts: [
      {
        value: { d: '1951-04-28' },
        cites: [
          {
            source: 'iranica-mina-oil-agreements',
            loc: { section: 'OIL AGREEMENTS IN IRAN', para: '28' }
          },
          {
            source: 'iranica-rahnema-kashani',
            loc: { section: 'KĀŠĀNI, SAYYED ABU’L-QĀSEM', para: '48' }
          }
        ]
      },
      {
        value: { d: '1951-04-29' },
        cites: [
          {
            source: 'iranica-gasiorowski-coup-detat-1953',
            loc: { section: 'COUP D’ETAT OF 1332 Š./1953', para: '1' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1953-08-19' },
        cites: [
          {
            source: 'iranica-gasiorowski-coup-detat-1953',
            loc: { section: 'COUP D’ETAT OF 1332 Š./1953', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 2,
  parent: 'period:reign-of-mohammad-reza-shah',
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/7c/Prime_Minister_Mohammad_Mossadegh_of_Iran_addressing_the_United_Nations_Security_Council.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Prime_Minister_Mohammad_Mossadegh_of_Iran_addressing_the_United_Nations_Security_Council.jpg',
    credit: { institution: 'Harry S. Truman Library and Museum' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'In 1951 Moṣaddeq (1882-1967), who had achieved through his speeches and his votes in the Majles a reputation for patriotism, liberal views, and incorruptibility, was elected by the Majles as its candidate for the premiership. Even though he had not been particularly sympathetic to the court, the shah appointed him as prime minister. He received tremendous backing from all classes of the people.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-iranian-history-islamic-period-6',
            loc: {
              section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Moḥammad Reza Shah (1941-79)'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/iran-ii2-islamic-period-page-6/'
          }
        },
        {
          id: 'q2',
          text: 'Mossadeq had come to office on the strength of support from the National Front and other parties in the Majlis and as a result of his great popularity.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'MOSSADEQ AND OIL NATIONALIZATION', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/iran/17.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'As prime minister, he departed from established practice and refused to consult foreign embassies or to allow embassies such as that of Britain to offer advice on the conduct of Persian domestic affairs. The court also ceased to be an avenue through which these embassies could maintain and exert their influence.',
          lang: 'en',
          cite: {
            source: 'iranica-azimi-great-britain-v',
            loc: { section: 'GREAT BRITAIN v. British influence in Persia, 1941-79', para: '22' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/great-britain-v/'
          }
        },
        {
          id: 'q4',
          text: 'As domestic conditions deteriorated, however, Mossadeq\'s populist style grew more autocratic. In August 1952, the Majlis acceded to his demand for full powers in all affairs of government for a six-month period. These special powers were subsequently extended for a further six-month term. He also obtained approval for a law to reduce, from six years to two years, the term of the Senate (established in 1950 as the upper house of the Majlis), and thus brought about the dissolution of that body. Mossadeq\'s support in the lower house of the Majlis (also called the Majlis) was dwindling, however, so on August 3, 1953, the prime minister organized a plebiscite for the dissolution of the Majlis, claimed a massive vote in favor of the proposal, and dissolved the legislative body.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'MOSSADEQ AND OIL NATIONALIZATION', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/iran/17.htm' }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q5',
          text: 'In Persia, despite concerted Anglo-American efforts to discredit Moṣaddeq, the strength and resilience of pro-Moṣaddeq sentiments could not be denied. Following the resumption of diplomatic relations with Persia in December 1953, Denis Wright, the British Charge d’Affaires, observed that there was “still much latent support for Moṣaddeq throughout the country,” adding that no Persian government “in the foreseeable future can afford to ignore the nationalism which he stirred up” (PRO, FO 371/11009, Wright to Eden, January 7 1954).',
          lang: 'en',
          cite: {
            source: 'iranica-azimi-great-britain-v',
            loc: { section: 'GREAT BRITAIN v. British influence in Persia, 1941-79', para: '32' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/great-britain-v/'
          }
        }
      ]
    }
  ]
})
