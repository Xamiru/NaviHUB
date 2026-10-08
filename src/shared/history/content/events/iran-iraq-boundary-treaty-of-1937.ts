import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'iran-iraq-boundary-treaty-of-1937',
  names: [
    { text: 'Iran–Iraq Boundary Treaty of 1937', lang: 'en', role: 'primary' },
    { text: 'عهدنامه مرزی ۱۹۳۷ ایران و عراق', lang: 'fa', role: 'native' },
    {
      text: 'Boundary Treaty between The Kingdom of Iraq and the Empire of Iran',
      lang: 'en',
      role: 'official',
      cites: [
        {
          source: 'iranica-milani-iraq-pahlavi',
          loc: { section: 'IRAQ vi. PAHLAVI PERIOD, 1921-79', para: '13' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'treaty',
  start: {
    alts: [
      {
        value: { d: '1937-07-04' },
        cites: [
          {
            source: 'iranica-milani-iraq-pahlavi',
            loc: { section: 'IRAQ vi. PAHLAVI PERIOD, 1921-79', para: '13' }
          },
          {
            source: 'iranica-ramazani-arab-iranian-relations-modern-times',
            loc: { section: 'ʿARAB v. Arab-Iranian Relations in Modern Times', para: '1' }
          },
          {
            source: 'iranica-ferrier-anglo-iranian-relations-pahlavi',
            loc: { section: 'ANGLO-IRANIAN RELATIONS iii. Pahlavi period', para: '18' }
          }
        ]
      },
      {
        value: { d: '1937-07-14' },
        cites: [
          {
            source: 'iranica-kechichian-boundaries-iraq',
            loc: { section: 'BOUNDARIES iv. With Iraq', para: '2' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'mena'],
  prominence: 2,
  places: [
    {
      ref: 'place:tehran',
      cites: [
        {
          source: 'iranica-milani-iraq-pahlavi',
          loc: { section: 'IRAQ vi. PAHLAVI PERIOD, 1921-79', para: '13' }
        }
      ]
    },
    {
      ref: 'place:shatt-al-arab',
      cites: [
        {
          source: 'iranica-ramazani-arab-iranian-relations-modern-times',
          loc: { section: 'ʿARAB v. Arab-Iranian Relations in Modern Times', para: '1' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:reign-of-reza-shah' }
  ],
  polities: [
    { ref: 'polity:pahlavi-iran' },
    { ref: 'polity:kingdom-of-iraq' }
  ],
  participants: [
    {
      name: 'Nuri Saʾid Pasha',
      role: 'negotiator',
      cites: [
        {
          source: 'iranica-milani-iraq-pahlavi',
          loc: { section: 'IRAQ vi. PAHLAVI PERIOD, 1921-79', para: '13' }
        }
      ]
    },
    {
      name: 'Bāqer Kāẓemi',
      role: 'negotiator',
      cites: [
        {
          source: 'iranica-milani-iraq-pahlavi',
          loc: { section: 'IRAQ vi. PAHLAVI PERIOD, 1921-79', para: '12' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:saadabad-pact',
      rel: 'followed-by',
      cites: [
        {
          source: 'iranica-ramazani-arab-iranian-relations-modern-times',
          loc: { section: 'ʿARAB v. Arab-Iranian Relations in Modern Times', para: '1' }
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
          text: 'Failing to resolve their irreconcilable differences through the League of Nations, the two countries revived the stalled bilateral negotiations. In August 1935, Nuri Saʾid Pasha and his team, which included the British chair of the Basra Port Authority, visited Iran. After twenty days of exhaustive negotiations, the two sides signed the “Boundary Treaty between The Kingdom of Iraq and the Empire of Iran” at Tehran on 4 July 1937',
          lang: 'en',
          cite: {
            source: 'iranica-milani-iraq-pahlavi',
            loc: { section: 'IRAQ vi. PAHLAVI PERIOD, 1921-79', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/iraq-vi-pahlavi-period-1921-79/'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'Territorial disputes was the casus belli of animosity between Iran and Iraq. Iran’s main priority was to establish joint sovereignty with Iraq over the Arvand Rud (Shatt al-Arab) based on the thalweg principle, the deepest and most navigable point of a river dividing the two banks.',
          lang: 'en',
          cite: {
            source: 'iranica-milani-iraq-pahlavi',
            loc: { section: 'IRAQ vi. PAHLAVI PERIOD, 1921-79', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/iraq-vi-pahlavi-period-1921-79/'
          }
        },
        {
          id: 'q3',
          text: 'The most pivotal and contentious issue of this legal dispute was the status of the Arvand Rud and the navigational rights of the two countries on the strategic waterway. Nuri Saʾid Pasha, the Iraqi foreign minister, demanded Iraq’s exclusive sovereignty, arguing that although Iran had an elongated coastline with multiple ports and anchorages, the waterway was Iraq’s sole access to the Persian Gulf',
          lang: 'en',
          cite: {
            source: 'iranica-milani-iraq-pahlavi',
            loc: { section: 'IRAQ vi. PAHLAVI PERIOD, 1921-79', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/iraq-vi-pahlavi-period-1921-79/'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'a new treaty partly redrawing the frontier along the thalweg, guaran­teeing freedom of navigation through the Šaṭṭ al-ʿArab, and recommending joint maintenance facilities was concluded',
          lang: 'en',
          cite: {
            source: 'iranica-kechichian-boundaries-iraq',
            loc: { section: 'BOUNDARIES iv. With Iraq', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/boundaries-iv/'
          }
        },
        {
          id: 'q5',
          text: 'it was British diplomacy which helped to pave the way for a settlement and the conclusion of the Treaty of 4 July 1937 between Iran and Iraq.',
          lang: 'en',
          cite: {
            source: 'iranica-ferrier-anglo-iranian-relations-pahlavi',
            loc: { section: 'ANGLO-IRANIAN RELATIONS iii. Pahlavi period', para: '18' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/anglo-iranian-relations-iii/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'even though the Baghdad government conceded to Tehran sovereignty over anchorage facilities extending approximately 6 km along the shore opposite Ābādān, Iraq retained virtual control of the river until Far­vardīn, 1349 Š./April, 1969, when the Baʿthist regime decided for the first time to check the papers of ships moving up the Šaṭṭ al-ʿArab and demanded that Iranian vessels lower their flags before entering the river.',
          lang: 'en',
          cite: {
            source: 'iranica-kechichian-boundaries-iraq',
            loc: { section: 'BOUNDARIES iv. With Iraq', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/boundaries-iv/'
          }
        },
        {
          id: 'q7',
          text: 'President Qāsem, who repudiated the 1937 treaty on grounds of undue British pressure to sign, regarded the whole river as subject to Iraqi control.',
          lang: 'en',
          cite: {
            source: 'iranica-ramazani-arab-iranian-relations-modern-times',
            loc: { section: 'ʿARAB v. Arab-Iranian Relations in Modern Times', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/arab-v/'
          }
        },
        {
          id: 'q8',
          text: 'Iran reacted swiftly and unilaterally abrogated the 1937 treaty. Iran justified its decision by citing Iran’s decades of non-compliance with the treaty, and by applying the legal principle of Rebus Sic Stantibus, that is, a basic alteration of circumstance',
          lang: 'en',
          cite: {
            source: 'iranica-milani-iraq-pahlavi',
            loc: { section: 'IRAQ vi. PAHLAVI PERIOD, 1921-79', para: '30' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/iraq-vi-pahlavi-period-1921-79/'
          }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1934-11-29' },
            cites: [
              {
                source: 'iranica-kechichian-boundaries-iraq',
                loc: { section: 'BOUNDARIES iv. With Iraq', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'On 29 November 1934, two years after it had become a fully independent member of the League of Nations, Iraq brought the matter before the League.',
        lang: 'en',
        cite: {
          source: 'iranica-kechichian-boundaries-iraq',
          loc: { section: 'BOUNDARIES iv. With Iraq', para: '2' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/boundaries-iv/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1969-04-19' },
            cites: [
              {
                source: 'iranica-kechichian-boundaries-iraq',
                loc: { section: 'BOUNDARIES iv. With Iraq', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'In response Moḥammad-Reżā Shah’s government, on Farvardīn 30/April 19, declared the 1316 Š./1937 treaty legally invalid (bī-arzeš o bāṭel o bī-aṯar, lit. “without value or effect and without validity”) on the grounds of changed circumstances',
        lang: 'en',
        cite: {
          source: 'iranica-kechichian-boundaries-iraq',
          loc: { section: 'BOUNDARIES iv. With Iraq', para: '2' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/boundaries-iv/'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/a/ab/Shatt_al-Arab_map.png',
    page: 'https://commons.wikimedia.org/wiki/File:Shatt_al-Arab_map.png',
    credit: { institution: 'Central Intelligence Agency' },
    license: { id: 'public-domain' }
  }
})
