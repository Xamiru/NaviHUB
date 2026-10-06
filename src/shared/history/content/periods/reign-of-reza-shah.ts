import { definePeriod } from '../../schema'

export default definePeriod({
  id: 'reign-of-reza-shah',
  names: [
    { text: 'Reign of Reza Shah Pahlavi', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  periodType: 'reign',
  start: {
    alts: [
      {
        value: { d: '1925' },
        cites: [
          {
            source: 'iranica-yarshater-iranian-history-islamic-period-5',
            loc: {
              section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Reza Shah Pahlavi (1925-41)'
            }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1941-09-16' },
        cites: [
          {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'WORLD WAR II AND THE AZARBAIJAN CRISIS', para: '1' }
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
          text: 'Accordingly he set out to reform with great determination the military, administrative, educational, and juridical systems of the country and its social conditions.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-iranian-history-islamic-period-5',
            loc: {
              section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Reza Shah Pahlavi (1925-41)'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/iran-ii2-islamic-period-page-5/'
          }
        },
        {
          id: 'q2',
          text: 'Under Reżā Shah’s rule, the state subjected all persons within Iran to its own authority and abolished other autonomous jurisdictional spheres, whether foreign and derived from capitulatory relations and thus extraterritorial, or domestic and based on pre-capitalist social institutions such as tribes or the ʿolamāʾ as an estate.',
          lang: 'en',
          cite: {
            source: 'iranica-sheikholeslami-administration-pahlavi',
            loc: { section: 'ADMINISTRATION in Iran vii. Pahlavi period', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/administration-vii-pahlavi/'
          }
        },
        {
          id: 'q3',
          text: 'He formed a national army, introduced conscription, and set about the establishment of social and economic infrastructures and the reform of the country’s financial, administrative, legal, and educational systems',
          lang: 'en',
          cite: {
            source: 'iranica-pesaran-economy-pahlavi',
            loc: { section: 'ECONOMY ix. IN THE PAHLAVI PERIOD', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/economy-ix/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q4',
          text: 'Many of the Shah\'s measures were consciously designed to break the power of the religious hierarchy.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE ERA OF REZA SHAH', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/iran/15.htm' }
        },
        {
          id: 'q5',
          text: 'Educational reforms were the most effective means that reduced and gradually almost ended the clerical grip on the educational system and promoted secularism.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-iranian-history-islamic-period-5',
            loc: {
              section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Reza Shah Pahlavi (1925-41)'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/iran-ii2-islamic-period-page-5/'
          }
        }
      ]
    }
  ]
})
