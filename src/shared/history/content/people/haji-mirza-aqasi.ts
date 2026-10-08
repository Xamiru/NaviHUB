import { definePerson } from '../../schema'

export default definePerson({
  id: 'haji-mirza-aqasi',
  names: [
    { text: 'Haji Mirza Aqasi', lang: 'en', role: 'primary' },
    { text: 'حاجی میرزا آقاسی', lang: 'fa', role: 'native' },
    {
      text: 'Ḥājjī Mīrzā ʿAbbās Īravānī',
      lang: 'fa-Latn',
      role: 'alternative',
      cites: [
        { source: 'iranica-amanat-aqasi', loc: { section: 'ĀQĀSĪ, ḤĀJJĪ MĪRZĀ', para: '1' } }
      ]
    }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1783', approx: true },
        cites: [
          { source: 'iranica-amanat-aqasi', loc: { section: 'ĀQĀSĪ, ḤĀJJĪ MĪRZĀ', para: '1' } }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1849' },
        cites: [
          {
            source: 'iranica-amanat-aqasi',
            loc: { section: 'ĀQĀSĪ, ḤĀJJĪ MĪRZĀ', para: '19' }
          }
        ]
      },
      {
        value: { d: '1848' },
        cites: [
          { source: 'iranica-amanat-aqasi', loc: { section: 'ĀQĀSĪ, ḤĀJJĪ MĪRZĀ', para: '1' } }
        ]
      }
    ]
  },
  regions: ['iran'],
  roles: ['politician', 'cleric'],
  offices: [
    {
      title: 'grand vizier',
      polity: 'polity:qajar-iran',
      start: {
        alts: [
          {
            value: { d: '1835' },
            cites: [
              {
                source: 'iranica-amanat-aqasi',
                loc: { section: 'ĀQĀSĪ, ḤĀJJĪ MĪRZĀ', para: '1' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1848' },
            cites: [
              {
                source: 'iranica-amanat-aqasi',
                loc: { section: 'ĀQĀSĪ, ḤĀJJĪ MĪRZĀ', para: '1' }
              }
            ]
          }
        ]
      },
      cites: [
        { source: 'iranica-amanat-aqasi', loc: { section: 'ĀQĀSĪ, ḤĀJJĪ MĪRZĀ', para: '1' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'ĀQĀSĪ, ḤĀJJĪ MĪRZĀ ABBĀS ĪRAVĀNĪ (ca. 1198-1265/1783-1848), grand vizier of Moḥammad Shah Qāǰār (r. 1250-64/1834-48) between 1251-64/1835-48.',
          lang: 'en',
          cite: { source: 'iranica-amanat-aqasi', loc: { section: 'ĀQĀSĪ, ḤĀJJĪ MĪRZĀ', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/aqasff-ujuli-mnsz-adras-ivxni-ca'
          }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q2',
          text: 'Through the latter’s mediation, Āqāsī was readmitted to the Crown Prince’s service, and by 1240/1824 was appointed chief tutor to several of the Crown Prince’s sons, including Farīdūn Mīrzā and, soon after, Moḥammad Mīrzā, the future shah.',
          lang: 'en',
          cite: { source: 'iranica-amanat-aqasi', loc: { section: 'ĀQĀSĪ, ḤĀJJĪ MĪRZĀ', para: '2' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/aqasff-ujuli-mnsz-adras-ivxni-ca'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q3',
          text: 'Āqāsī started as a caretaker premier but soon proved to be shrewd enough to outmaneuver other contestants to the office including the powerful Amīr-e Neẓām of Azarbaijan, Moḥammad Khan Zangena, the Shah’s grand uncle Allāhyār Khan Āṣaf-al-dawla, and the Neʿmatallāhī leader Zayn-al-ʿābedīn Šīrvānī.',
          lang: 'en',
          cite: { source: 'iranica-amanat-aqasi', loc: { section: 'ĀQĀSĪ, ḤĀJJĪ MĪRZĀ', para: '5' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/aqasff-ujuli-mnsz-adras-ivxni-ca'
          }
        },
        {
          id: 'q4',
          text: 'In a widespread purge in 1251/1835-36, Āqāsī eradicated all pro-Qāʾem-maqām elements and replaced them with predominantly Azarbaijani allies.',
          lang: 'en',
          cite: { source: 'iranica-amanat-aqasi', loc: { section: 'ĀQĀSĪ, ḤĀJJĪ MĪRZĀ', para: '6' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/aqasff-ujuli-mnsz-adras-ivxni-ca'
          }
        },
        {
          id: 'q5',
          text: 'The Herat campaign of 1252-53/1837-38, the first major test of Āqāsī’s competence, demonstrated the failure of his self-styled army modernization, irresolute diplomacy versus the Afghan chief Kāmrān Mīrzā and the British envoy McNeill, and poor command over an army paralyzed by starvation, factionalism, and unclear military objectives.',
          lang: 'en',
          cite: { source: 'iranica-amanat-aqasi', loc: { section: 'ĀQĀSĪ, ḤĀJJĪ MĪRZĀ', para: '7' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/aqasff-ujuli-mnsz-adras-ivxni-ca'
          }
        },
        {
          id: 'q6',
          text: 'To compensate for the loss of revenue and the subsequent financial crises, the minister (perhaps inspired by Moḥammad-ʿAlī’s agrarian policy) resorted to the highly unpopular policy of repossessing the toyūls granted in Fatḥ-ʿAlī Shah’s reign.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-aqasi',
            loc: { section: 'ĀQĀSĪ, ḤĀJJĪ MĪRZĀ', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/aqasff-ujuli-mnsz-adras-ivxni-ca'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q7',
          text: 'Dejected and fearful, he fled to the shrine of ʿAbd-al-ʿAẓīm and after receiving a safe conduct through the good offices of the Russian and British envoys, eventually took refuge in Iraq’s holy cities, where he died a year later in Ramażān, 1265/1849.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-aqasi',
            loc: { section: 'ĀQĀSĪ, ḤĀJJĪ MĪRZĀ', para: '19' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/aqasff-ujuli-mnsz-adras-ivxni-ca'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/58/Portrait_of_Muhammad_Shah_Qajar_and_his_Vizier_Haj_Mirza_Aghasi_MET_DP345140.jpg/1280px-Portrait_of_Muhammad_Shah_Qajar_and_his_Vizier_Haj_Mirza_Aghasi_MET_DP345140.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Portrait_of_Muhammad_Shah_Qajar_and_his_Vizier_Haj_Mirza_Aghasi_MET_DP345140.jpg',
    credit: { institution: 'The Metropolitan Museum of Art' },
    license: { id: 'cc0' }
  }
})
