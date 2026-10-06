import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'ottoman-persian-war-1821-1823',
  names: [
    { text: 'Ottoman–Persian War of 1821–1823', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1821' },
        cites: [
          {
            source: 'iranica-amanat-dawlatshah',
            loc: { section: 'DAWLATŠĀH, MOḤAMMAD-ʿALĪ MĪRZĀ', para: '4' }
          },
          {
            source: 'iranica-busse-abbas-mirza',
            loc: { section: 'ʿABBĀS MĪRZĀ QAJAR', para: '5' }
          },
          {
            source: 'iranica-cronin-army-qajar',
            loc: { section: 'ARMY v. Qajar Period', para: '18' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1823' },
        cites: [
          {
            source: 'iranica-amanat-dawlatshah',
            loc: { section: 'DAWLATŠĀH, MOḤAMMAD-ʿALĪ MĪRZĀ', para: '4' }
          },
          {
            source: 'iranica-cronin-army-qajar',
            loc: { section: 'ARMY v. Qajar Period', para: '18' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'mena'],
  prominence: 2,
  places: [
    {
      ref: 'place:baghdad',
      cites: [
        {
          source: 'iranica-amanat-dawlatshah',
          loc: { section: 'DAWLATŠĀH, MOḤAMMAD-ʿALĪ MĪRZĀ', para: '4' }
        }
      ]
    },
    {
      ref: 'place:erzurum',
      cites: [
        {
          source: 'iranica-cronin-army-qajar',
          loc: { section: 'ARMY v. Qajar Period', para: '18' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:qajar-dynasty' }
  ],
  related: [
    {
      ref: 'event:first-treaty-of-erzurum',
      rel: 'led-to',
      cites: [
        {
          source: 'iranica-tucker-iraq-afsharids-to-qajars',
          loc: { section: 'IRAQ v. AFSHARIDS TO THE END OF THE QAJARS', para: '12' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'persia',
      name: 'Persia',
      cites: [
        {
          source: 'iranica-tucker-iraq-afsharids-to-qajars',
          loc: { section: 'IRAQ v. AFSHARIDS TO THE END OF THE QAJARS', para: '12' }
        }
      ]
    },
    {
      key: 'ottomans',
      name: 'the Ottomans',
      cites: [
        {
          source: 'iranica-tucker-iraq-afsharids-to-qajars',
          loc: { section: 'IRAQ v. AFSHARIDS TO THE END OF THE QAJARS', para: '12' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:mohammad-ali-mirza-dowlatshah',
      role: 'commander',
      side: 'persia',
      cites: [
        {
          source: 'iranica-amanat-dawlatshah',
          loc: { section: 'DAWLATŠĀH, MOḤAMMAD-ʿALĪ MĪRZĀ', para: '4' }
        }
      ]
    },
    {
      ref: 'person:abbas-mirza',
      role: 'commander',
      side: 'persia',
      cites: [
        {
          source: 'iranica-tucker-iraq-afsharids-to-qajars',
          loc: { section: 'IRAQ v. AFSHARIDS TO THE END OF THE QAJARS', para: '12' }
        }
      ]
    },
    {
      ref: 'person:fath-ali-shah-qajar',
      role: 'head-of-state',
      side: 'persia',
      cites: [
        {
          source: 'iranica-amanat-fath-ali-shah',
          loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '20' }
        }
      ]
    },
    {
      name: 'Maḥmūd Pasha Bābān',
      role: 'participant',
      cites: [
        {
          source: 'iranica-amanat-dawlatshah',
          loc: { section: 'DAWLATŠĀH, MOḤAMMAD-ʿALĪ MĪRZĀ', para: '4' }
        }
      ]
    },
    {
      name: 'Shaikh Mūsā Najafī',
      role: 'participant',
      cites: [
        {
          source: 'iranica-amanat-dawlatshah',
          loc: { section: 'DAWLATŠĀH, MOḤAMMAD-ʿALĪ MĪRZĀ', para: '4' }
        }
      ]
    },
    {
      name: 'Dāwūd Pasha',
      role: 'leader',
      side: 'ottomans',
      cites: [
        {
          source: 'iranica-amanat-dawlatshah',
          loc: { section: 'DAWLATŠĀH, MOḤAMMAD-ʿALĪ MĪRZĀ', para: '3' }
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
          text: 'Changes in the relationship between Persia and Iraq in the Qajar era can also be perceived in the last substantial military conflict between the Ottomans and Persia in the early 1820s.',
          lang: 'en',
          cite: {
            source: 'iranica-tucker-iraq-afsharids-to-qajars',
            loc: { section: 'IRAQ v. AFSHARIDS TO THE END OF THE QAJARS', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/iraq-v-afsharids-to-the-end-of-the-qajars/'
          }
        },
        {
          id: 'q2',
          text: 'Yet he complied with his sons’ pursuit of conquest as Herat was temporarily occupied by Ḥasan-ʿAlī Mīrzā in 1816 and between 1819 and 1823 Moḥammad-ʿAlī Mīrzā and ʿAbbās Mīrzā scored successes in war against the Ottomans in Iraq and eastern Anatolia.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-fath-ali-shah',
            loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '20' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/fath-ali-shah'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q3',
          text: 'Dawlatšāh’s death led to a temporary lull in the troubled relations between Persia and the Ottoman empire; shortly afterward some of the disputed issues were partially settled in the treaty of Erzurum in 1238/1823',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-dawlatshah',
            loc: { section: 'DAWLATŠĀH, MOḤAMMAD-ʿALĪ MĪRZĀ', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/dawlatsah-mohammad-ali-mirza/'
          }
        },
        {
          id: 'q4',
          text: 'This war demonstrated that the Iranian army, if not equal to the technologically advanced armies of the imperial powers, was strong enough to withstand and even overcome the army of its Middle Eastern neighbor.',
          lang: 'en',
          cite: {
            source: 'iranica-cronin-army-qajar',
            loc: { section: 'ARMY v. Qajar Period', para: '18' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/army-v/'
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
            value: { d: '1821' },
            cites: [
              {
                source: 'iranica-amanat-dawlatshah',
                loc: { section: 'DAWLATŠĀH, MOḤAMMAD-ʿALĪ MĪRZĀ', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q5',
        text: 'The policy of backing Kurdish warlords against Baghdad as a guarantee for security of the Persian frontiers reached a climax in 1236/1821, when Dawlatšāh again attacked Baghdad on the pretext of protecting ʿAbd-al-Raḥmān’s son and successor, Maḥmūd Pasha Bābān, whom the Ottomans accused of disloyalty.',
        lang: 'en',
        cite: {
          source: 'iranica-amanat-dawlatshah',
          loc: { section: 'DAWLATŠĀH, MOḤAMMAD-ʿALĪ MĪRZĀ', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/dawlatsah-mohammad-ali-mirza/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1821' },
            cites: [
              {
                source: 'iranica-amanat-dawlatshah',
                loc: { section: 'DAWLATŠĀH, MOḤAMMAD-ʿALĪ MĪRZĀ', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q6',
        text: 'Moḥammad-ʿAlī advanced deep into Iraq but was stopped by the formidable walls of Baghdad and dissuaded from taking the city by the intervention of Shaikh Mūsā Najafī, son of Shaikh Jaʿfar.',
        lang: 'en',
        cite: {
          source: 'iranica-amanat-dawlatshah',
          loc: { section: 'DAWLATŠĀH, MOḤAMMAD-ʿALĪ MĪRZĀ', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/dawlatsah-mohammad-ali-mirza/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1821' },
            cites: [
              {
                source: 'iranica-cronin-army-qajar',
                loc: { section: 'ARMY v. Qajar Period', para: '18' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'Nonetheless the Iranian forces led by ʿAbbās Mirzā acquitted themselves well in campaigns against the Ottoman empire in 1821-23, routing the Ottoman army at the battle of Erzurum in 1821.',
        lang: 'en',
        cite: {
          source: 'iranica-cronin-army-qajar',
          loc: { section: 'ARMY v. Qajar Period', para: '18' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'https://www.iranicaonline.org/articles/army-v/' }
      }
    }
  ]
})
