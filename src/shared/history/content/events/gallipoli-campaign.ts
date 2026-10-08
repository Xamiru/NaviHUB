import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'gallipoli-campaign',
  names: [
    { text: 'Gallipoli campaign', lang: 'en', role: 'primary' },
    { text: 'Çanakkale Savaşı', lang: 'tr', role: 'native' },
    { text: 'Dardanelles campaign', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-08',
  type: 'battle',
  start: {
    alts: [
      {
        value: { d: '1915-02-19' },
        cites: [
          {
            source: 'eo1418-skinner-gallipoli',
            loc: { section: 'Initial Actions', para: '1' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1916-01' },
        cites: [
          {
            source: 'eo1418-skinner-gallipoli',
            loc: { section: 'Gallipoli, Campaign and Battle of' }
          },
          {
            source: 'eo1418-skinner-gallipoli',
            loc: { section: 'The End of the Campaign', para: '2' }
          }
        ]
      }
    ]
  },
  regions: ['mena', 'europe', 'oceania'],
  prominence: 2,
  places: [
    {
      ref: 'place:gallipoli',
      cites: [
        { source: 'eo1418-skinner-gallipoli', loc: { section: 'Allied Plans', para: '1' } }
      ]
    }
  ],
  polities: [
    { ref: 'polity:united-kingdom' },
    { ref: 'polity:french-third-republic' },
    { ref: 'polity:british-empire' }
  ],
  sides: [
    {
      key: 'allies',
      name: 'French and British Commonwealth forces',
      cites: [
        {
          source: 'eo1418-skinner-gallipoli',
          loc: { section: 'Gallipoli, Campaign and Battle of' }
        }
      ]
    },
    {
      key: 'ottoman',
      name: 'the German-advised Ottoman army',
      polity: 'polity:ottoman-empire',
      cites: [
        {
          source: 'eo1418-skinner-gallipoli',
          loc: { section: 'Gallipoli, Campaign and Battle of' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:mustafa-kemal-ataturk',
      role: 'commander',
      side: 'ottoman',
      cites: [
        {
          source: 'eo1418-skinner-gallipoli',
          loc: { section: 'The Initial Assault on Gallipoli', para: '1' }
        }
      ]
    },
    {
      name: 'Otto Liman von Sanders',
      role: 'commander',
      side: 'ottoman',
      cites: [
        { source: 'eo1418-skinner-gallipoli', loc: { section: 'Allied Plans', para: '1' } }
      ]
    },
    {
      name: 'Esat Pasha',
      role: 'commander',
      side: 'ottoman',
      cites: [
        {
          source: 'eo1418-skinner-gallipoli',
          loc: { section: 'Ottoman Defensive Preparations', para: '1' }
        }
      ]
    },
    {
      name: 'Sir Ian Hamilton',
      role: 'commander',
      side: 'allies',
      cites: [
        { source: 'eo1418-skinner-gallipoli', loc: { section: 'Allied Plans', para: '1' } }
      ]
    },
    {
      ref: 'person:winston-churchill',
      role: 'organizer',
      side: 'allies',
      cites: [
        { source: 'eo1418-skinner-gallipoli', loc: { section: 'Allied Plans', para: '1' } }
      ]
    },
    {
      ref: 'person:enver-pasha',
      role: 'commander',
      side: 'ottoman',
      cites: [
        { source: 'eo1418-skinner-gallipoli', loc: { section: 'Major Operations', para: '2' } }
      ]
    }
  ],
  figures: [
    {
      key: 'casualties',
      side: 'allies',
      value: {
        alts: [
          {
            value: { min: 205000 },
            cites: [
              {
                source: 'eo1418-skinner-gallipoli',
                loc: { section: 'The End of the Campaign', para: '2' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Harold Allen Skinner Jr.' }
            ]
          }
        ]
      }
    },
    {
      key: 'casualties',
      side: 'ottoman',
      value: {
        alts: [
          {
            value: { min: 251000, max: 289000 },
            cites: [
              {
                source: 'eo1418-skinner-gallipoli',
                loc: { section: 'The End of the Campaign', para: '2' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Harold Allen Skinner Jr.' }
            ]
          }
        ]
      }
    },
    {
      key: 'military-deaths',
      side: 'ottoman',
      value: {
        alts: [
          {
            value: { min: 56643 },
            cites: [
              {
                source: 'eo1418-skinner-gallipoli',
                loc: { section: 'The End of the Campaign', para: '2' }
              }
            ],
            heldBy: [
              { kind: 'state', name: 'Ottoman Empire' }
            ]
          }
        ]
      }
    }
  ],
  related: [
    { ref: 'event:first-world-war', rel: 'related' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'From March 1915 to January 1916, French and British Commonwealth forces fought against the German-advised Ottoman army for control of the Dardanelles. The resulting Central Powers victory contributed to the collapse of the Russian war effort, and the fall of Great Britain’s coalition government in late 1916. The experience of Gallipoli profoundly shaped the postwar identities of Turkey, Australia, and New Zealand.',
          lang: 'en',
          cite: {
            source: 'eo1418-skinner-gallipoli',
            loc: { section: 'Gallipoli, Campaign and Battle of' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/gallipoli-campaign-and-battle-of/'
          }
        },
        {
          id: 'q2',
          text: 'In the spring of 1915, the Allies undertook naval and land operations in the Dardanelles that were intended to knock the Ottoman Empire out of the war with one blow and to open the straits for the passage of supplies to Russia. Amphibious landings were carried out at Gallipoli, but British forces, vigorously opposed by forces commanded by Atatürk, were unable to expand their beachheads. The last units of the expeditionary force were evacuated by February 1916.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'World War I', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/turkey/12.htm' }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q3',
          text: 'The Gallipoli campaign produced an estimated half-million casualties: 205,000 Commonwealth, 47,000 French, and 251-289,000 Ottoman. Of those totals, estimated Allied dead and missing were 47,000, while the Ottomans calculated 56,643 dead, and 11,176 missing.',
          lang: 'en',
          cite: {
            source: 'eo1418-skinner-gallipoli',
            loc: { section: 'The End of the Campaign', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/gallipoli-campaign-and-battle-of/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q4',
          text: 'To this day, historians are still divided over the strategic merits of the Gallipoli campaign.',
          lang: 'en',
          cite: { source: 'eo1418-skinner-gallipoli', loc: { section: 'Analysis', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/gallipoli-campaign-and-battle-of/'
          }
        },
        {
          id: 'q5',
          text: 'Victory restored the prestige of the Ottoman army, with Mustafa Kemal lionized as a national hero. The Dardanelles remained closed to Entente shipping for the rest of the war, a key factor in the breakdown of the Russian war effort in late 1916.',
          lang: 'en',
          cite: { source: 'eo1418-skinner-gallipoli', loc: { section: 'Analysis', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/gallipoli-campaign-and-battle-of/'
          }
        }
      ]
    },
    {
      kind: 'memory',
      quotes: [
        {
          id: 'q6',
          text: 'Gallipoli deeply influenced the national memory and identity of Australia and New Zealand, with each nation designating 25 April as ANZAC Day, a day of national remembrance.',
          lang: 'en',
          cite: {
            source: 'eo1418-skinner-gallipoli',
            loc: { section: 'The Legacy of Gallipoli', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/gallipoli-campaign-and-battle-of/'
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
            value: { d: '1915-02-19' },
            cites: [
              {
                source: 'eo1418-skinner-gallipoli',
                loc: { section: 'Initial Actions', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'Led by British Admiral Sir Sackville Hamilton Carden (1857-1930), an Allied squadron of fourteen capital ships began shelling the Dardanelles defenses on 19 February 1915.',
        lang: 'en',
        cite: { source: 'eo1418-skinner-gallipoli', loc: { section: 'Initial Actions', para: '1' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://encyclopedia.1914-1918-online.net/article/gallipoli-campaign-and-battle-of/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1915-03-18' },
            cites: [
              {
                source: 'eo1418-skinner-gallipoli',
                loc: { section: 'Initial Actions', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'On 18 March 1915, de Robeck attempted a coup de main, which failed with heavy capital ship losses from Ottoman mines and shellfire.',
        lang: 'en',
        cite: { source: 'eo1418-skinner-gallipoli', loc: { section: 'Initial Actions', para: '1' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://encyclopedia.1914-1918-online.net/article/gallipoli-campaign-and-battle-of/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1915-04-25' },
            cites: [
              {
                source: 'eo1418-skinner-gallipoli',
                loc: { section: 'The Initial Assault on Gallipoli', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'On 25 April 1915, the Royal Navy midshipman leading the ANZAC assault prevented a massacre at the heavily defended Gaba Tepe beaches by diverting the boats to the lightly defended Ariburnu (Anzac Cove).12 However, the sluggish ANZAC advance allowed Lt. Col. Mustafa Kemal (1881-1938) time to contain the Ariburnu bridgehead by deploying the Ottoman 19th Division atop the commanding Sari Bair and Chunuk Bair ridges.',
        lang: 'en',
        cite: {
          source: 'eo1418-skinner-gallipoli',
          loc: { section: 'The Initial Assault on Gallipoli', para: '1' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://encyclopedia.1914-1918-online.net/article/gallipoli-campaign-and-battle-of/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1915-08-06', notAfter: '1915-08-07' },
            cites: [
              {
                source: 'eo1418-skinner-gallipoli',
                loc: { section: 'Major Operations', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'On 6-7 August 1915, Hamilton launched a surprise breakout attempt at Helles and Anzac, in concert with an amphibious assault at Suvla Bay by the fresh IX Corps under General Sir Fredrick Stopford (1854-1929).',
        lang: 'en',
        cite: { source: 'eo1418-skinner-gallipoli', loc: { section: 'Major Operations', para: '3' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://encyclopedia.1914-1918-online.net/article/gallipoli-campaign-and-battle-of/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1915-12', notAfter: '1916-01' },
            cites: [
              {
                source: 'eo1418-skinner-gallipoli',
                loc: { section: 'The End of the Campaign', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'In contrast to the muddled landings, the Allied evacuations in late December and early January 1916 were well planned and successfully executed by Monro’s replacement, General William Birdwood (1865-1951).',
        lang: 'en',
        cite: {
          source: 'eo1418-skinner-gallipoli',
          loc: { section: 'The End of the Campaign', para: '2' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://encyclopedia.1914-1918-online.net/article/gallipoli-campaign-and-battle-of/'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/THE_GALLIPOLI_CAMPAIGN%2C_APRIL_1915-JANUARY_1916_Q13431.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:THE_GALLIPOLI_CAMPAIGN,_APRIL_1915-JANUARY_1916_Q13431.jpg',
    credit: { institution: 'Imperial War Museums', creator: 'Ernest Brooks' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    {
      source: 'harp-tarihi-baskanligi-1970-birinci-dunya-harbinde-turk-harbi',
      perspective: 'turkish'
    }
  ]
})
