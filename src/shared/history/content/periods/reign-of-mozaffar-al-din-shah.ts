import { definePeriod } from '../../schema'

export default definePeriod({
  id: 'reign-of-mozaffar-al-din-shah',
  names: [
    { text: 'Reign of Mozaffar al-Din Shah', lang: 'en', role: 'primary' },
    { text: 'سلطنت مظفرالدین شاه', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-06',
  periodType: 'reign',
  start: {
    alts: [
      {
        value: { d: '1896' },
        cites: [
          {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1896' }
          },
          {
            source: 'iranica-yarshater-iranian-history-islamic-period-5',
            loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Qajar period' }
          },
          {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '41'
            }
          },
          {
            source: 'iranica-amanat-constitutional-revolution-intellectual-background',
            loc: { section: 'CONSTITUTIONAL REVOLUTION i. Intellectual background', para: '2' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1907' },
        cites: [
          {
            source: 'iranica-yarshater-iranian-history-islamic-period-5',
            loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Qajar period' }
          },
          {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '41'
            }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Ehsan Yarshater' },
          { kind: 'scholar', name: 'Elena Andreeva' }
        ]
      },
      {
        value: { d: '1906' },
        cites: [
          {
            source: 'iranica-amanat-constitutional-revolution-intellectual-background',
            loc: { section: 'CONSTITUTIONAL REVOLUTION i. Intellectual background', para: '2' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Abbas Amanat' }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 2,
  parent: 'period:qajar-dynasty',
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'During the reign of Moẓaffar-al-Dīn Shah (1313-24/1896-1906) the new intelligentsia used the press and modern education to win the support of this tacit coalition for a secular agenda of material and moral rejuvenation, patriotism, and political reform.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-constitutional-revolution-intellectual-background',
            loc: { section: 'CONSTITUTIONAL REVOLUTION i. Intellectual background', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/constitutional-revolution-i'
          }
        },
        {
          id: 'q2',
          text: 'Russian control over Iran’s internal affairs in the last decade of the 19th and the beginning of the 20th century became especially tight in the reigns of Moẓaffar-al-Din Shah (r. 1896-1907) and Moḥammad-ʿAli Shah (r. 1907-1909).',
          lang: 'en',
          cite: {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '41'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'Taking advantage of widespread dissatisfaction with the pro-Russian course adopted by the Iranian government since 1892, the British legation in Tehran began to cultivate disaffected officials, publishers of newspapers, and most of all, prominent moǰtaheds, some of whom allegedly received large gifts of money if they assumed an anti-Russian position (M. S. Ivanov, Iranskaya revolyutsiya 1905-1911 godov, Moscow, 1957, p. 202).',
          lang: 'en',
          cite: {
            source: 'iranica-kazemzadeh-anglo-iranian-relations-qajar',
            loc: { section: 'ANGLO-IRANIAN RELATIONS ii. The Qajar Period', para: '35' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/anglo-iranian-relations-ii/'
          }
        },
        {
          id: 'q4',
          text: 'Through the medium of Arfaʿ-al-dawla, Iranian minister in Russia, and Mīrzā Naṣrallāh Khan Mošīr-al-dawla, foreign minister, the first Russian loan was concluded on 20 January 1900 (25.5 million rubles, 2.4 million pounds).',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-atabak-e-azam',
            loc: { section: 'ATĀBAK-E AʿẒAM, AMĪN-AL-SOLṬĀN', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/atabak-e-azam'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Mozaffar_ad-Din_Shah_Qajar%2C_Vanity_Fair%2C_1903-01-29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Mozaffar_ad-Din_Shah_Qajar,_Vanity_Fair,_1903-01-29.jpg',
    credit: { creator: 'Leslie Ward' },
    license: { id: 'public-domain' }
  }
})
