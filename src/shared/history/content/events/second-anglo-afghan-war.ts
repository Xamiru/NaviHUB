import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'second-anglo-afghan-war',
  names: [
    { text: 'Second Anglo-Afghan War', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1878-11-21' },
        cites: [
          {
            source: 'iranica-adamec-norris-anglo-afghan-wars',
            loc: { section: 'ANGLO-AFGHAN WARS ii. Second Anglo-Afghan War (1878-80)', para: '2' }
          },
          {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'The Second Anglo-Afghan War', para: '6' }
          },
          { source: 'lemo-chronik-1878', loc: { section: 'Chronik 1878', para: '62' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1880' },
        cites: [
          {
            source: 'iranica-adamec-norris-anglo-afghan-wars',
            loc: { section: 'ANGLO-AFGHAN WARS ii. Second Anglo-Afghan War (1878-80)' }
          }
        ]
      }
    ]
  },
  regions: ['south-asia', 'europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:kabul',
      cites: [
        {
          source: 'iranica-balland-afghanistan-political-history',
          loc: { section: 'AFGHANISTAN x. Political History', para: '14' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'britain',
      name: 'the British',
      cites: [
        {
          source: 'iranica-balland-afghanistan-political-history',
          loc: { section: 'AFGHANISTAN x. Political History', para: '14' }
        }
      ]
    },
    {
      key: 'afghanistan',
      name: 'the Afghans',
      cites: [
        {
          source: 'iranica-balland-afghanistan-political-history',
          loc: { section: 'AFGHANISTAN x. Political History', para: '14' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:sher-ali-khan',
      role: 'head-of-state',
      side: 'afghanistan',
      cites: [
        {
          source: 'iranica-adamec-norris-anglo-afghan-wars',
          loc: { section: 'ANGLO-AFGHAN WARS ii. Second Anglo-Afghan War (1878-80)', para: '2' }
        }
      ]
    },
    {
      name: 'Yaʿqūb Khan',
      role: 'head-of-state',
      side: 'afghanistan',
      cites: [
        {
          source: 'iranica-adamec-norris-anglo-afghan-wars',
          loc: { section: 'ANGLO-AFGHAN WARS ii. Second Anglo-Afghan War (1878-80)', para: '3' }
        }
      ]
    },
    {
      name: 'Ayyūb Khan',
      role: 'commander',
      side: 'afghanistan',
      cites: [
        {
          source: 'iranica-adamec-norris-anglo-afghan-wars',
          loc: { section: 'ANGLO-AFGHAN WARS ii. Second Anglo-Afghan War (1878-80)', para: '4' }
        }
      ]
    },
    {
      name: 'General Roberts',
      role: 'commander',
      side: 'britain',
      cites: [
        {
          source: 'iranica-adamec-norris-anglo-afghan-wars',
          loc: { section: 'ANGLO-AFGHAN WARS ii. Second Anglo-Afghan War (1878-80)', para: '2' }
        }
      ]
    },
    {
      name: 'Lord Lytton',
      role: 'leader',
      side: 'britain',
      cites: [
        {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'The Second Anglo-Afghan War', para: '6' }
        }
      ]
    },
    {
      name: 'Sir Louis Cavagnari',
      role: 'victim',
      side: 'britain',
      cites: [
        {
          source: 'iranica-adamec-norris-anglo-afghan-wars',
          loc: { section: 'ANGLO-AFGHAN WARS ii. Second Anglo-Afghan War (1878-80)', para: '3' }
        }
      ]
    },
    {
      name: 'ʿAbd-al-Raḥmān Khan',
      role: 'leader',
      cites: [
        {
          source: 'iranica-adamec-norris-anglo-afghan-wars',
          loc: { section: 'ANGLO-AFGHAN WARS ii. Second Anglo-Afghan War (1878-80)', para: '4' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'combatants',
      side: 'britain',
      value: {
        alts: [
          {
            value: { min: 30000 },
            cites: [
              {
                source: 'iranica-balland-afghanistan-political-history',
                loc: { section: 'AFGHANISTAN x. Political History', para: '14' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Daniel Balland' }
            ]
          },
          {
            value: { min: 40000, qualifier: 'about' },
            cites: [
              {
                source: 'loc-afghanistan-country-study-2001',
                loc: { section: 'The Second Anglo-Afghan War', para: '6' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
            ]
          }
        ]
      }
    }
  ],
  related: [
    {
      ref: 'event:congress-of-berlin',
      rel: 'caused-by',
      cites: [
        {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'The Second Anglo-Afghan War', para: '5' }
        }
      ]
    },
    { ref: 'event:first-anglo-afghan-war', rel: 'preceded-by' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The mission was turned back as it approached the eastern entrance of the Khyber Pass, thus triggering the Second Anglo-Afghan War. A British force of about 40,000 fighting men were distributed into military columns which penetrated Afghanistan at three different points.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'The Second Anglo-Afghan War', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/afghanistan/14.htm' }
        },
        {
          id: 'q2',
          text: 'Only the second met with some resistance. Jalālābād and Qandahār were occupied without fighting, and the capital found itself threatened when Šēr ʿAlī departed, leaving his son Moḥammad Yaʿqūb as regent.',
          lang: 'en',
          cite: {
            source: 'iranica-balland-afghanistan-political-history',
            loc: { section: 'AFGHANISTAN x. Political History', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/afghanistan-x-political-history'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q3',
          text: 'Not until the spring of 1881 were the last British Indian troops withdrawn.',
          lang: 'en',
          cite: {
            source: 'iranica-adamec-norris-anglo-afghan-wars',
            loc: { section: 'ANGLO-AFGHAN WARS ii. Second Anglo-Afghan War (1878-80)', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/anglo-afghan-wars'
          }
        },
        {
          id: 'q4',
          text: 'ʿAbd-al-Raḥmān conceded British supervision of his foreign relations and a military presence in the passes.',
          lang: 'en',
          cite: {
            source: 'iranica-adamec-norris-anglo-afghan-wars',
            loc: { section: 'ANGLO-AFGHAN WARS ii. Second Anglo-Afghan War (1878-80)', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/anglo-afghan-wars'
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
            value: { d: '1878-11-21' },
            cites: [
              {
                source: 'iranica-adamec-norris-anglo-afghan-wars',
                loc: {
                  section: 'ANGLO-AFGHAN WARS ii. Second Anglo-Afghan War (1878-80)',
                  para: '2'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q5',
        text: 'On 21 November 1878 General Roberts (son of the British commander of Shah Šoǰāʿ’s contingent forty years before) set in motion three columns of troops, thus beginning the Second Anglo-Afghan War.',
        lang: 'en',
        cite: {
          source: 'iranica-adamec-norris-anglo-afghan-wars',
          loc: { section: 'ANGLO-AFGHAN WARS ii. Second Anglo-Afghan War (1878-80)', para: '2' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/anglo-afghan-wars'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1879-05-26' },
            cites: [
              {
                source: 'iranica-balland-afghanistan-political-history',
                loc: { section: 'AFGHANISTAN x. Political History', para: '14' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q6',
        text: 'With British forces occupying much of the country, Sher Ali\'s son and successor, Yaqub, signed the Treaty of Gandamak in May 1879 to prevent a British invasion of the rest of the country.',
        lang: 'en',
        cite: {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'The Second Anglo-Afghan War', para: '7' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/afghanistan/14.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1879-09-03' },
            cites: [
              {
                source: 'iranica-balland-afghanistan-political-history',
                loc: { section: 'AFGHANISTAN x. Political History', para: '14' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'Yaʿqūb received his envoy, Sir Louis Cavagnari, but did nothing to stop the massacre of that envoy and his staff in September, 1879. Roberts reactivated his three columns, and within six weeks of the massacre Kabul was occupied and Yaʿqūb deposed.',
        lang: 'en',
        cite: {
          source: 'iranica-adamec-norris-anglo-afghan-wars',
          loc: { section: 'ANGLO-AFGHAN WARS ii. Second Anglo-Afghan War (1878-80)', para: '3' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/anglo-afghan-wars'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1880-07-22' },
            cites: [
              {
                source: 'iranica-balland-afghanistan-political-history',
                loc: { section: 'AFGHANISTAN x. Political History', para: '15' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'On 2 Šaʿbān 1297/22 July 1880, after the ʿAbd-al-Raḥmān had accepted all the clauses of the Gandamak Treaty—although he successfully demanded that the representative of the government of India be once again Sunni Indian and not an Englishman—he was officially declared amir by General Roberts.',
        lang: 'en',
        cite: {
          source: 'iranica-balland-afghanistan-political-history',
          loc: { section: 'AFGHANISTAN x. Political History', para: '15' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/afghanistan-x-political-history'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/86/Upper_Bala_Hissar_from_west_Kabul_in_1879.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Upper_Bala_Hissar_from_west_Kabul_in_1879.jpg',
    credit: { institution: 'The British Library', creator: 'John Burke' },
    license: { id: 'public-domain' }
  }
})
