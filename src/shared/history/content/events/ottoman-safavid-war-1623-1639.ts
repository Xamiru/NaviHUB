import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'ottoman-safavid-war-1623-1639',
  names: [
    { text: 'Ottoman-Safavid war of 1623-1639', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-13',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1623' },
        cites: [
          {
            source: 'iranica-matthee-iraq-iv-safavid-period',
            loc: { section: 'IRAQ iv. RELATIONS IN THE SAFAVID PERIOD', para: '18' }
          },
          {
            source: 'iranica-matthee-iraq-iv-safavid-period',
            loc: { section: 'IRAQ iv. RELATIONS IN THE SAFAVID PERIOD', para: '4' }
          },
          {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '44' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1639' },
        cites: [
          {
            source: 'iranica-matthee-iraq-iv-safavid-period',
            loc: { section: 'IRAQ iv. RELATIONS IN THE SAFAVID PERIOD', para: '22' }
          },
          {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '46' }
          },
          {
            source: 'iranica-mclachlan-boundaries-ottoman-empire',
            loc: { section: 'BOUNDARIES i. With the Ottoman Empire', para: '1' }
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
          source: 'iranica-matthee-iraq-iv-safavid-period',
          loc: { section: 'IRAQ iv. RELATIONS IN THE SAFAVID PERIOD', para: '18' }
        }
      ]
    },
    {
      ref: 'place:basra',
      cites: [
        {
          source: 'iranica-matthee-iraq-iv-safavid-period',
          loc: { section: 'IRAQ iv. RELATIONS IN THE SAFAVID PERIOD', para: '19' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:safavid-iran',
      cites: [
        {
          source: 'iranica-matthee-iraq-iv-safavid-period',
          loc: { section: 'IRAQ iv. RELATIONS IN THE SAFAVID PERIOD', para: '18' }
        }
      ]
    },
    {
      ref: 'polity:ottoman-empire',
      cites: [
        {
          source: 'iranica-matthee-iraq-iv-safavid-period',
          loc: { section: 'IRAQ iv. RELATIONS IN THE SAFAVID PERIOD', para: '18' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'safavid',
      name: 'Safavids',
      polity: 'polity:safavid-iran',
      cites: [
        {
          source: 'iranica-matthee-iraq-iv-safavid-period',
          loc: { section: 'IRAQ iv. RELATIONS IN THE SAFAVID PERIOD', para: '18' }
        }
      ]
    },
    {
      key: 'ottoman',
      name: 'Ottomans',
      polity: 'polity:ottoman-empire',
      cites: [
        {
          source: 'iranica-matthee-iraq-iv-safavid-period',
          loc: { section: 'IRAQ iv. RELATIONS IN THE SAFAVID PERIOD', para: '18' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:abbas-i',
      role: 'commander',
      side: 'safavid',
      cites: [
        {
          source: 'iranica-matthee-iraq-iv-safavid-period',
          loc: { section: 'IRAQ iv. RELATIONS IN THE SAFAVID PERIOD', para: '18' }
        }
      ]
    },
    {
      ref: 'person:shah-safi',
      role: 'head-of-state',
      side: 'safavid',
      cites: [
        {
          source: 'iranica-matthee-iraq-iv-safavid-period',
          loc: { section: 'IRAQ iv. RELATIONS IN THE SAFAVID PERIOD', para: '21' }
        }
      ]
    },
    {
      name: 'Sultan Morād IV',
      role: 'head-of-state',
      side: 'ottoman',
      cites: [
        {
          source: 'iranica-matthee-iraq-iv-safavid-period',
          loc: { section: 'IRAQ iv. RELATIONS IN THE SAFAVID PERIOD', para: '22' }
        }
      ]
    },
    {
      name: 'Rostam Khan',
      role: 'commander',
      side: 'safavid',
      cites: [
        {
          source: 'iranica-matthee-iraq-iv-safavid-period',
          loc: { section: 'IRAQ iv. RELATIONS IN THE SAFAVID PERIOD', para: '21' }
        }
      ]
    },
    {
      name: 'Husrev Pasha',
      role: 'commander',
      side: 'ottoman',
      cites: [
        {
          source: 'iranica-matthee-iraq-iv-safavid-period',
          loc: { section: 'IRAQ iv. RELATIONS IN THE SAFAVID PERIOD', para: '21' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:treaty-of-zuhab',
      rel: 'led-to',
      cites: [
        {
          source: 'iranica-matthee-iraq-iv-safavid-period',
          loc: { section: 'IRAQ iv. RELATIONS IN THE SAFAVID PERIOD', para: '22' }
        }
      ]
    },
    {
      ref: 'event:death-of-abbas-i',
      rel: 'related',
      cites: [
        {
          source: 'iranica-matthee-iraq-iv-safavid-period',
          loc: { section: 'IRAQ iv. RELATIONS IN THE SAFAVID PERIOD', para: '20' }
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
          text: 'Only in 1623 did Shah ʿAbbās decide to take advantage of Ottoman weakness in the aftermath of the assassination of Sultan ʿOṯmān II (20 May 1622) and widespread unrest in Ottoman territory.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-iraq-iv-safavid-period',
            loc: { section: 'IRAQ iv. RELATIONS IN THE SAFAVID PERIOD', para: '18' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/iraq-iv-safavid-period'
          }
        },
        {
          id: 'q2',
          text: 'Shah ʿAbbās waged war until the end of his reign, reconquering Kandahar from the Mughals in 1622 and Baghdad from the Ottomans a year later.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '44' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Skirmishes continued until in 1613 the two parties concluded a peace treaty modeled on the Treaty of Amasya.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-iraq-iv-safavid-period',
            loc: { section: 'IRAQ iv. RELATIONS IN THE SAFAVID PERIOD', para: '17' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/iraq-iv-safavid-period'
          }
        },
        {
          id: 'q4',
          text: 'These campaigns, coming as they did on the heels of the protracted wars against the Ottomans, seriously depleted the royal treasury and exposed the financial difficulties of the state.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '44' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'Basra, which by then had long been mostly autonomous under the local dynasty of Āl-e Afrāsiāb, became the target of direct Safavid aggression as well in this period.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-iraq-iv-safavid-period',
            loc: { section: 'IRAQ iv. RELATIONS IN THE SAFAVID PERIOD', para: '19' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/iraq-iv-safavid-period'
          }
        },
        {
          id: 'q6',
          text: 'The Ottomans made a brief attempt to regain Iraq in 1625, and in 1629, taking advantage of Shah ʿAbbās’s death, organized a campaign led by newly appointed grand vizier Husrev/Ḵosrow Pasha.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-iraq-iv-safavid-period',
            loc: { section: 'IRAQ iv. RELATIONS IN THE SAFAVID PERIOD', para: '21' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/iraq-iv-safavid-period'
          }
        },
        {
          id: 'q7',
          text: 'The siege of the city failed, however, as Husrev/Ḵosrow Pasha proved unable to breach its walls.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-iraq-iv-safavid-period',
            loc: { section: 'IRAQ iv. RELATIONS IN THE SAFAVID PERIOD', para: '21' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/iraq-iv-safavid-period'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q9',
          text: 'Under Ṣafi, the Mughals recovered Kandahar and the Ottomans managed to recapture Baghdad and most of Mesopotamia, a situation that was incorporated into the peace accord of Qaṣr-e Širin, concluded in 1639.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '46' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
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
            value: { d: '1623' },
            cites: [
              {
                source: 'iranica-matthee-iraq-iv-safavid-period',
                loc: { section: 'IRAQ iv. RELATIONS IN THE SAFAVID PERIOD', para: '4' }
              },
              {
                source: 'iranica-matthee-safavid-dynasty',
                loc: { section: 'SAFAVID DYNASTY', para: '44' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'Responding to an invitation for assistance on the part of Bakr Subāši, Baghdad’s rebellious Ottoman governor, he organized a march against Iraq',
        lang: 'en',
        cite: {
          source: 'iranica-matthee-iraq-iv-safavid-period',
          loc: { section: 'IRAQ iv. RELATIONS IN THE SAFAVID PERIOD', para: '18' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/iraq-iv-safavid-period'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1630' },
            cites: [
              {
                source: 'iranica-matthee-iraq-iv-safavid-period',
                loc: { section: 'IRAQ iv. RELATIONS IN THE SAFAVID PERIOD', para: '21' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'The Ottoman army reached Baghdad only in late 1630, having made a detour via Hamadān, which they destroyed.',
        lang: 'en',
        cite: {
          source: 'iranica-matthee-iraq-iv-safavid-period',
          loc: { section: 'IRAQ iv. RELATIONS IN THE SAFAVID PERIOD', para: '21' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/iraq-iv-safavid-period'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1638' },
            cites: [
              {
                source: 'iranica-matthee-iraq-iv-safavid-period',
                loc: { section: 'IRAQ iv. RELATIONS IN THE SAFAVID PERIOD', para: '22' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'Assisted by what appears to have been a careless Safavid defense strategy, the Ottomans occupied the city in 1638',
        lang: 'en',
        cite: {
          source: 'iranica-matthee-iraq-iv-safavid-period',
          loc: { section: 'IRAQ iv. RELATIONS IN THE SAFAVID PERIOD', para: '22' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/iraq-iv-safavid-period'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Zaynal_Khan_Shamlu.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Zaynal_Khan_Shamlu.jpg',
    credit: { creator: 'Aegidius Sadeler' },
    license: { id: 'public-domain' }
  }
})
