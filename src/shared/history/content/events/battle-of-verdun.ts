import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'battle-of-verdun',
  names: [
    { text: 'Battle of Verdun', lang: 'en', role: 'primary' },
    { text: 'Bataille de Verdun', lang: 'fr', role: 'native' },
    { text: 'Schlacht um Verdun', lang: 'de', role: 'alternative' }
  ],
  researched: '2026-10-07',
  type: 'battle',
  start: {
    alts: [
      {
        value: { d: '1916-02-21' },
        cites: [
          { source: 'lemo-chronik-1916', loc: { section: 'Chronik 1916', para: '22' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1916-12-16' },
        cites: [
          { source: 'lemo-chronik-1916', loc: { section: 'Chronik 1916', para: '164' } }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:verdun',
      cites: [
        { source: 'lemo-chronik-1916', loc: { section: 'Chronik 1916', para: '23' } }
      ]
    }
  ],
  participants: [
    {
      name: 'Philippe Pétain',
      role: 'commander',
      cites: [
        { source: 'lemo-chronik-1916', loc: { section: 'Chronik 1916', para: '25' } },
        {
          source: 'eo1418-julien-verdun-site-of-memory',
          loc: { section: 'One Battle, Two Distinct Myths', para: '2' }
        }
      ]
    },
    {
      name: 'Erich von Falkenhayn',
      role: 'commander',
      cites: [
        {
          source: 'eo1418-julien-verdun-site-of-memory',
          loc: { section: 'One Battle, Two Distinct Myths', para: '3' }
        }
      ]
    },
    {
      name: 'Robert Nivelle',
      role: 'commander',
      cites: [
        {
          source: 'eo1418-julien-verdun-site-of-memory',
          loc: { section: 'One Battle, Two Distinct Myths', para: '2' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'military-deaths',
      side: 'france',
      value: {
        alts: [
          {
            value: { min: 160000 },
            cites: [
              {
                source: 'eo1418-prost-war-losses',
                loc: { section: 'Definitions and Evaluation of Soldiers Killed', para: '6' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Antoine Prost' }
            ]
          }
        ]
      }
    }
  ],
  sides: [
    {
      key: 'france',
      name: 'French army',
      cites: [
        {
          source: 'eo1418-julien-verdun-site-of-memory',
          loc: { section: 'One Battle, Two Distinct Myths', para: '2' }
        }
      ]
    },
    {
      key: 'germany',
      name: 'German army',
      cites: [
        {
          source: 'eo1418-julien-verdun-site-of-memory',
          loc: { section: 'One Battle, Two Distinct Myths', para: '3' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:first-world-war', rel: 'related' },
    { ref: 'event:battle-of-the-somme', rel: 'related' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q2',
          text: 'Verdun may have been a long battle, but it was not a decisive one. It was a battle of materiel, yet it proved less murderous than the first months of the conflict. Combat conditions were terrible, but no worse than at Ypres or in the Aisne.',
          lang: 'en',
          cite: {
            source: 'eo1418-julien-verdun-site-of-memory',
            loc: { section: 'One Battle, Two Distinct Myths', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/verdun-site-of-memory/'
          }
        },
        {
          id: 'q1',
          text: 'The Franco-German battle of 1916 quickly became emblematic of the entire war to the French, while in Germany it subsequently inspired heroic literature highlighting the collective determination of the German soldier. After the Second World War, Verdun gradually emerged as a shared site of memory, a symbol of suffering and of an aspiration for peace.',
          lang: 'en',
          cite: {
            source: 'eo1418-julien-verdun-site-of-memory',
            loc: { section: 'Verdun, site of memory' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/verdun-site-of-memory/'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'General Henri Philippe Pétain übernimmt den Oberbefehl über die französischen Truppen bei Verdun.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1916', loc: { section: 'Chronik 1916', para: '25' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1916.html'
          }
        },
        {
          id: 'q4',
          text: 'Französische Angriffe führen zur Rückeroberung der verlorenen Festungswerke bei Verdun.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1916', loc: { section: 'Chronik 1916', para: '165' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1916.html'
          }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q5',
          text: 'During the four first months of the war, the French army lost 310,000 soldiers killed, much more than during the ten months of the battle of Verdun (160,000).',
          lang: 'en',
          cite: {
            source: 'eo1418-prost-war-losses',
            loc: { section: 'Definitions and Evaluation of Soldiers Killed', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/war-losses/'
          }
        }
      ]
    },
    {
      kind: 'memory',
      quotes: [
        {
          id: 'q6',
          text: 'On the French side, defending Verdun at all costs stemmed from a logic that was more political than military. This choice, in turn, fuelled the existential myth of a German invasion and of a French resistance, encapsulated by Robert Nivelle’s (1856-1924) June 1916 phrase “they shall not pass.”',
          lang: 'en',
          cite: {
            source: 'eo1418-julien-verdun-site-of-memory',
            loc: { section: 'One Battle, Two Distinct Myths', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/verdun-site-of-memory/'
          }
        },
        {
          id: 'q7',
          text: 'Starting in the 1980s, Verdun was progressively recast into a site of peace. In September 1984, a ceremony at Verdun during which François Mitterrand (1916-1996) and Helmut Kohl (1930-2017) linked hands sealed Franco-German reconciliation.',
          lang: 'en',
          cite: {
            source: 'eo1418-julien-verdun-site-of-memory',
            loc: { section: 'Post-1945: The Shift Towards a Shared Memory', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/verdun-site-of-memory/'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/The_Battle_of_Verdun%2C_February-december_1916_Q69716.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:The_Battle_of_Verdun,_February-december_1916_Q69716.jpg',
    credit: { institution: 'Imperial War Museums', creator: 'French official photographer' },
    license: { id: 'public-domain' }
  }
})
