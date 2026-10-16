import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'fall-of-constantinople',
  names: [
    { text: 'Fall of Constantinople', lang: 'en', role: 'primary' },
    {
      text: 'Siege of Constantinople',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'The Ottoman Empire', para: '4' }
        }
      ]
    }
  ],
  researched: '2026-10-16',
  type: 'battle',
  start: {
    alts: [
      {
        value: { d: '1453' },
        cites: [
          {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'The Ottoman Empire', para: '4' }
          },
          { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1351' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1453-05-29' },
        cites: [
          {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'The Ottoman Empire', para: '4' }
          },
          { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1351' } },
          {
            source: 'britannica-1911-constantinople',
            loc: { section: 'Constantinople', para: '13' }
          }
        ]
      }
    ]
  },
  regions: ['europe', 'mena'],
  prominence: 1,
  places: [
    {
      ref: 'place:istanbul',
      cites: [
        {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'The Ottoman Empire', para: '4' }
        },
        {
          source: 'britannica-1911-constantinople',
          loc: { section: 'Constantinople', para: '13' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:ottoman-empire',
      cites: [
        {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'The Ottoman Empire', para: '4' }
        }
      ]
    },
    {
      ref: 'polity:byzantine-empire',
      cites: [
        {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'The Ottoman Empire', para: '4' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'ottoman',
      name: 'Ottoman Empire',
      polity: 'polity:ottoman-empire',
      cites: [
        {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'The Ottoman Empire', para: '4' }
        }
      ]
    },
    {
      key: 'byzantine',
      name: 'Byzantine Empire',
      polity: 'polity:byzantine-empire',
      cites: [
        {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'The Ottoman Empire', para: '4' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:mehmed-ii',
      role: 'commander',
      side: 'ottoman',
      cites: [
        {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'The Ottoman Empire', para: '4' }
        }
      ]
    },
    {
      ref: 'person:constantine-xi',
      role: 'commander',
      side: 'byzantine',
      cites: [
        { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1351' } }
      ]
    }
  ],
  figures: [
    {
      key: 'combatants',
      side: 'ottoman',
      value: {
        alts: [
          {
            value: { min: 200000 },
            cites: [
              { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1351' } }
            ],
            heldBy: [
              { kind: 'organization', name: 'Encyclopædia Britannica (11th edition, 1911)' }
            ]
          }
        ]
      }
    },
    {
      key: 'combatants',
      side: 'byzantine',
      value: {
        alts: [
          {
            value: { min: 8000, qualifier: 'over' },
            cites: [
              { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1351' } }
            ],
            heldBy: [
              { kind: 'organization', name: 'Encyclopædia Britannica (11th edition, 1911)' }
            ]
          }
        ]
      }
    }
  ],
  related: [
    {
      ref: 'event:battle-of-varna',
      rel: 'preceded-by',
      cites: [
        { source: 'britannica-1911-varna', loc: { section: 'Varna', para: '2' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'In 1453, Mehmed II (1432-1481) led the Ottoman Turks in seizing the ancient city of Constantinople, the Byzantine Empire’s capital. This put an end to 1,000-year reign of the Byzantine Empire.',
          lang: 'en',
          cite: {
            source: 'loc-guide-ottoman-turkish-reference-works',
            loc: { section: 'Reference Works' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://guides.loc.gov/ottoman-turkish/reference'
          }
        },
        {
          id: 'q2',
          text: 'Aside from scattered outposts in Greece, all that remained of the Byzantine Empire was its capital, Constantinople.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'The Ottoman Empire', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/turkey/6.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Cut off by land since 1365, the city, despite long periods of truce with the Turks, was supplied and reinforced by Venetian traders who controlled its commerce by sea.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'The Ottoman Empire', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/turkey/6.htm' }
        },
        {
          id: 'q4',
          text: 'Murad now laid siege to Constantinople to avenge himself on the emperor, and on the 24th of August the desperate valour of the defenders succeeded in driving back an assault led by a band of fanatical dervishes.',
          lang: 'en',
          cite: { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1349' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Turkey'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'The defenders were dispirited and torn by sedition and dissensions, and the emperor could rely on little more than 8000 fighting men, while the assailants, 200,000 strong, were animated by the wildest fanatical zeal.',
          lang: 'en',
          cite: { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1351' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Turkey'
          }
        },
        {
          id: 'q6',
          text: 'On May 29, the Turks fought their way through the gates of the city and brought the siege to a successful conclusion.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'The Ottoman Empire', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/turkey/6.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q7',
          text: 'As an isolated military action, the taking of Constantinople did not have a critical effect on European security, but to the Ottoman Dynasty the capture of the imperial capital was of supreme symbolic importance.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'The Ottoman Empire', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/turkey/6.htm' }
        },
        {
          id: 'q8',
          text: 'The cathedral of Hagia Sophia was converted to a mosque',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'The Ottoman Empire', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/turkey/6.htm' }
        },
        {
          id: 'q9',
          text: 'The city also remained the ecclesiastical center of the Greek Orthodox Church, of which Mehmet II proclaimed himself the protector and for which he appointed a new patriarch after the custom of the Byzantine emperors.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'The Ottoman Empire', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/turkey/6.htm' }
        },
        {
          id: 'q10',
          text: 'After some days\' stay in Constantinople, during which he granted wide privileges to the Greeks and to their patriarch, the sultan proceeded northwards and entirely subdued the southern parts of Servia.',
          lang: 'en',
          cite: { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1352' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Turkey'
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
            value: { d: '1453-05-29' },
            cites: [
              { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1351' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'The siege had lasted fifty-three days when, on the 29th of May 1453, a tremendous assault was successful; the desperate efforts of the Greeks were unavailing, Constantine himself falling among the foremost defenders of the breach.',
        lang: 'en',
        cite: { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1351' } },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Turkey'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d5/Siege_of_Constantinople_BnF_MS_Fr_9087.jpg/1280px-Siege_of_Constantinople_BnF_MS_Fr_9087.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Siege_of_Constantinople_BnF_MS_Fr_9087.jpg',
    credit: { institution: 'Bibliothèque nationale de France', creator: 'Jean Le Tavernier' },
    license: { id: 'public-domain' }
  }
})
