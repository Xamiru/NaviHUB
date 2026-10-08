import { definePerson } from '../../schema'

export default definePerson({
  id: 'alexander-i-of-russia',
  names: [
    { text: 'Alexander I of Russia', lang: 'en', role: 'primary' },
    { text: 'Александр I', lang: 'ru', role: 'native' }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1777-12-23' },
        cites: [
          {
            source: 'fondation-napoleon-ley-alexander-i',
            loc: { section: 'Alexander I', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1825-12-01' },
        cites: [
          {
            source: 'fondation-napoleon-ley-alexander-i',
            loc: { section: 'Alexander I', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['russia-central-asia', 'europe'],
  roles: ['monarch'],
  offices: [
    {
      title: 'Emperor of Russia',
      polity: 'polity:russian-empire',
      start: {
        alts: [
          {
            value: { d: '1801' },
            cites: [
              {
                source: 'loc-russia-country-study-1996',
                loc: { section: 'Ruling the Empire', para: '5' }
              },
              {
                source: 'iranica-andreeva-russia-relations',
                loc: {
                  section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
                  para: '15'
                }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1825' },
            cites: [
              {
                source: 'loc-russia-country-study-1996',
                loc: { section: 'Ruling the Empire', para: '5' }
              },
              {
                source: 'iranica-andreeva-russia-relations',
                loc: {
                  section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
                  para: '15'
                }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Ruling the Empire', para: '5' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Alexander I was born in St. Petersburg on 23 December, 1777 and died at Taganrog on 1 December, 1825.',
          lang: 'en',
          cite: {
            source: 'fondation-napoleon-ley-alexander-i',
            loc: { section: 'Alexander I', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.napoleon.org/en/history-of-the-two-empires/biographies/alexander-i/'
          }
        },
        {
          id: 'q2',
          text: 'The new tsar, Alexander I (r. 1801-25), came to the throne as the result of his father\'s murder, in which he was implicated.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Ruling the Empire', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/5.htm' }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q3',
          text: 'Like his father, he believed that the Russian border should align with the Kura and Aras rivers.',
          lang: 'en',
          cite: {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '15'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
          }
        },
        {
          id: 'q4',
          text: 'Unlike his father, he looked at Iranians and other Muslims with contempt and altered Paul’s policy of toleration.',
          lang: 'en',
          cite: {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '15'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
          }
        },
        {
          id: 'q5',
          text: 'Fearing Napoleon\'s expansionist ambitions and the growth of French power, Alexander joined Britain and Austria against Napoleon.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Ruling the Empire', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/5.htm' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/2/28/Emperor_Alexander_I_of_Russia_by_Alexander_Molinari_1813.png',
    page: 'https://commons.wikimedia.org/wiki/File:Emperor_Alexander_I_of_Russia_by_Alexander_Molinari_1813.png',
    credit: { institution: 'National Museum in Warsaw', creator: 'Alexander Molinari' },
    license: { id: 'public-domain' }
  }
})
