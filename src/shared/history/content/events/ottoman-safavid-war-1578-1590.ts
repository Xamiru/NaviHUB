import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'ottoman-safavid-war-1578-1590',
  names: [
    { text: 'Ottoman-Safavid war of 1578-1590', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-13',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1578' },
        cites: [
          {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '28' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Rudi Matthee', discipline: 'historian' }
        ]
      },
      {
        value: { d: '1577' },
        cites: [
          {
            source: 'iranica-matthee-iraq-iv-safavid-period',
            loc: { section: 'IRAQ iv. RELATIONS IN THE SAFAVID PERIOD', para: '16' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Rudi Matthee', discipline: 'historian' }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1590' },
        cites: [
          {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '28' }
          },
          {
            source: 'iranica-matthee-iraq-iv-safavid-period',
            loc: { section: 'IRAQ iv. RELATIONS IN THE SAFAVID PERIOD', para: '16' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'mena'],
  prominence: 2,
  places: [
    {
      ref: 'place:tabriz',
      cites: [
        {
          source: 'iranica-matthee-safavid-dynasty',
          loc: { section: 'SAFAVID DYNASTY', para: '28' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:safavid-iran',
      cites: [
        {
          source: 'iranica-matthee-safavid-dynasty',
          loc: { section: 'SAFAVID DYNASTY', para: '28' }
        }
      ]
    },
    {
      ref: 'polity:ottoman-empire',
      cites: [
        {
          source: 'iranica-matthee-safavid-dynasty',
          loc: { section: 'SAFAVID DYNASTY', para: '28' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'ottoman',
      name: 'Ottomans',
      polity: 'polity:ottoman-empire',
      cites: [
        {
          source: 'iranica-matthee-safavid-dynasty',
          loc: { section: 'SAFAVID DYNASTY', para: '28' }
        }
      ]
    },
    {
      key: 'safavid',
      name: 'Safavids',
      polity: 'polity:safavid-iran',
      cites: [
        {
          source: 'iranica-matthee-safavid-dynasty',
          loc: { section: 'SAFAVID DYNASTY', para: '28' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'Sultan Morād III',
      role: 'head-of-state',
      side: 'ottoman',
      cites: [
        {
          source: 'iranica-matthee-safavid-dynasty',
          loc: { section: 'SAFAVID DYNASTY', para: '28' }
        }
      ]
    },
    {
      name: 'Moḥammad Ḵodā-banda',
      role: 'head-of-state',
      side: 'safavid',
      cites: [
        {
          source: 'iranica-matthee-safavid-dynasty',
          loc: { section: 'SAFAVID DYNASTY', para: '27' }
        }
      ]
    },
    {
      ref: 'person:abbas-i',
      role: 'head-of-state',
      side: 'safavid',
      cites: [
        {
          source: 'iranica-matthee-safavid-dynasty',
          loc: { section: 'SAFAVID DYNASTY', para: '31' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:treaty-of-istanbul-1590',
      rel: 'led-to',
      cites: [
        {
          source: 'iranica-matthee-iraq-iv-safavid-period',
          loc: { section: 'IRAQ iv. RELATIONS IN THE SAFAVID PERIOD', para: '16' }
        }
      ]
    },
    {
      ref: 'event:death-of-tahmasp-i-and-the-succession-crisis',
      rel: 'caused-by',
      cites: [
        {
          source: 'iranica-matthee-iraq-iv-safavid-period',
          loc: { section: 'IRAQ iv. RELATIONS IN THE SAFAVID PERIOD', para: '16' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q16',
          text: 'Shah Ṭahmāsb’s death in 984/1576 opened a power vacuum in Persia that proved too tempting to resist for the Ottomans.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-iraq-iv-safavid-period',
            loc: { section: 'IRAQ iv. RELATIONS IN THE SAFAVID PERIOD', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/iraq-iv-safavid-period'
          }
        },
        {
          id: 'q2',
          text: 'A year later they broke the accord of Amasya and attacked Safavid territory once again, unleashing a war that would last until Shah ʿAbbās I sued for peace in 1590.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-iraq-iv-safavid-period',
            loc: { section: 'IRAQ iv. RELATIONS IN THE SAFAVID PERIOD', para: '16' }
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
      kind: 'background',
      quotes: [
        {
          id: 'q17',
          text: 'The Uzbeks staged incursions into Khorasan in 1578, and in the same year a new round of Safavid-Ottoman warfare erupted that would continue until 1590, causing severe economic disruption in Persia’s northwestern regions, already devastated by severe drought and famine.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '28' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        },
        {
          id: 'q4',
          text: 'The peace was kept by both sides until the death of Shah Ṭahmāsb (984/1576), when the ensuing troubles in Iran encouraged the Ottomans to occupy those regions of the Caucasus claimed by both countries.',
          lang: 'en',
          cite: {
            source: 'iranica-kohbach-amasya-peace',
            loc: { section: 'AMASYA, PEACE OF', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/amasya-peace'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'Georgia was the initial target of Sultan Morād III’s (r. 1574-95) attempts to establish control over parts of Transcaucasia with a Sunni majority.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '28' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        },
        {
          id: 'q6',
          text: 'Assisted by Crimean Tatars, the Ottomans in 1579 advanced as far as Baku and Darband on the Caspian Sea, blocking maritime traffic by establishing naval supremacy.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '28' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        },
        {
          id: 'q8',
          text: 'The Persians, applying their usual scorched-earth policy, further contributed to the area’s destruction.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '28' }
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
      kind: 'consequences',
      quotes: [
        {
          id: 'q11',
          text: 'In the fall of 1603, Shah ʿAbbās I (r. 1587-1629) launched his first military campaign against the Ottomans to recapture the lands he had ceded to them in 1589-90.',
          lang: 'en',
          cite: {
            source: 'iranica-ghougassian-julfa-i-safavid-period',
            loc: { section: 'JULFA i. SAFAVID PERIOD', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/julfa-i-safavid-period'
          }
        },
        {
          id: 'q19',
          text: 'He could ill afford this luxury at a time when the Ottomans were in possession of large areas of Persian territory in the northwest—areas which they had seized during the reign of his two predecessors.',
          lang: 'en',
          cite: { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '6' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/abbas-i'
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
            value: { d: '1578' },
            cites: [
              {
                source: 'iranica-matthee-safavid-dynasty',
                loc: { section: 'SAFAVID DYNASTY', para: '28' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'Širvān, where heavy taxation had led to an anti-Safavid uprising, soon followed.',
        lang: 'en',
        cite: {
          source: 'iranica-matthee-safavid-dynasty',
          loc: { section: 'SAFAVID DYNASTY', para: '28' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/safavids'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1579' },
            cites: [
              {
                source: 'iranica-matthee-safavid-dynasty',
                loc: { section: 'SAFAVID DYNASTY', para: '28' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'In frequent clashes with the Safavids, Šamaḵa, the capital of Širvān and the center of Persia’s northern silk trade, was destroyed.',
        lang: 'en',
        cite: {
          source: 'iranica-matthee-safavid-dynasty',
          loc: { section: 'SAFAVID DYNASTY', para: '28' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/safavids'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1585' },
            cites: [
              {
                source: 'iranica-matthee-safavid-dynasty',
                loc: { section: 'SAFAVID DYNASTY', para: '28' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q18',
        text: 'In 1585, the Ottomans once again briefly seized Tabriz, massacring segments of its population.',
        lang: 'en',
        cite: {
          source: 'iranica-matthee-safavid-dynasty',
          loc: { section: 'SAFAVID DYNASTY', para: '28' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/safavids'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1590' },
            cites: [
              {
                source: 'iranica-matthee-iraq-iv-safavid-period',
                loc: { section: 'IRAQ iv. RELATIONS IN THE SAFAVID PERIOD', para: '16' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'This arrangement, humiliating for Persia, was confirmed in large part by the Treaty of Constantinople, signed in 998/1590, after an Ottoman attack on Baghdad.',
        lang: 'en',
        cite: {
          source: 'iranica-mclachlan-boundaries-ottoman-empire',
          loc: { section: 'BOUNDARIES i. With the Ottoman Empire', para: '1' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/boundaries-i'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/A_farman_from_the_fourth_Safavid_shah%2C_Mohammad_Khodabandeh%2C_Safavid_Iran%2C_dated_1584.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:A_farman_from_the_fourth_Safavid_shah,_Mohammad_Khodabandeh,_Safavid_Iran,_dated_1584.jpg',
    credit: { institution: 'Chiswick Auctions' },
    license: { id: 'public-domain' }
  }
})
