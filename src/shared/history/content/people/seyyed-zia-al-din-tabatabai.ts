import { definePerson } from '../../schema'

export default definePerson({
  id: 'seyyed-zia-al-din-tabatabai',
  names: [
    { text: 'Seyyed Zia al-Din Tabatabai', lang: 'en', role: 'primary' },
    { text: 'سید ضیاءالدین طباطبایی', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1888' },
        cites: [
          {
            source: 'iranica-yarshater-iranian-history-islamic-period-5',
            loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Qajar period' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1969' },
        cites: [
          {
            source: 'iranica-yarshater-iranian-history-islamic-period-5',
            loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Qajar period' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  roles: ['journalist', 'politician'],
  offices: [
    {
      title: 'prime minister',
      polity: 'polity:qajar-iran',
      start: {
        alts: [
          {
            value: { d: '1921' },
            cites: [
              {
                source: 'iranica-yarshater-chronology-part-2',
                loc: { section: 'Chronology of Iranian History Part 2, 1921' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1921-05' },
            cites: [
              {
                source: 'iranica-ferrier-anglo-iranian-relations-pahlavi',
                loc: { section: 'ANGLO-IRANIAN RELATIONS iii. Pahlavi period', para: '6' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-shambayati-coup-detat-of-1921',
          loc: { section: 'COUP D’ETAT OF 1299/1921', para: '5' }
        },
        {
          source: 'iranica-yarshater-chronology-part-2',
          loc: { section: 'Chronology of Iranian History Part 2, 1921' }
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
          text: 'Sayyed Żiāʾ-al-Din Ṭabāṭabāʾi, publisher of the populist Raʿd newspaper, together with Reżā Khan Mirpanj, commander of the Cossack Brigade in Qazvin. organize a coup d’état and capture Tehran without bloodshed.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1921' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-2/'
          }
        },
        {
          id: 'q2',
          text: 'Żīāʾ-al-Dīn’s program called for major reform of the state and society, with priority given to building up the armed forces',
          lang: 'en',
          cite: {
            source: 'iranica-shambayati-coup-detat-of-1921',
            loc: { section: 'COUP D’ETAT OF 1299/1921', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/coup-detat-of-1299-1921/'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q3',
          text: 'In a sweeping move he ordered a large number of men of influence and wealth arrested and jailed.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-iranian-history-islamic-period-5',
            loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Qajar period' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/iran-ii2-islamic-period-page-5/'
          }
        },
        {
          id: 'q4',
          text: 'His revolutionary government lasted, however, only three months and ended when Reza Khan, commander of the military and the real power in the cabinet, banished Sayyed Żiāʾ on account of differing views between them',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-iranian-history-islamic-period-5',
            loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Qajar period' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/iran-ii2-islamic-period-page-5/'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3d/Iran_Over_Volcano_-_Ziaeddin_Tabatabai.png/1280px-Iran_Over_Volcano_-_Ziaeddin_Tabatabai.png',
    page: 'https://commons.wikimedia.org/wiki/File:Iran_Over_Volcano_-_Ziaeddin_Tabatabai.png',
    credit: { institution: 'Mohamed Hassanein Heikal, Iran fawq burkan (Cairo: Akhbar al-Yawm, 1951)' },
    license: { id: 'public-domain' }
  }
})
