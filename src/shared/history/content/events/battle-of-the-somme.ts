import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'battle-of-the-somme',
  names: [
    { text: 'Battle of the Somme', lang: 'en', role: 'primary' },
    { text: 'Bataille de la Somme', lang: 'fr', role: 'native' },
    {
      text: 'Schlacht an der Somme',
      lang: 'de',
      role: 'alternative',
      cites: [
        { source: 'lemo-chronik-1916', loc: { section: 'Chronik 1916', para: '103' } }
      ]
    }
  ],
  researched: '2026-10-06',
  type: 'battle',
  start: {
    alts: [
      {
        value: { d: '1916-07-01' },
        cites: [
          {
            source: 'eo1418-philpott-somme',
            loc: { section: 'The 1916 Battle of the Somme', para: '1' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'William Philpott' }
        ]
      },
      {
        value: { d: '1916-06-24' },
        cites: [
          { source: 'lemo-chronik-1916', loc: { section: 'Chronik 1916', para: '102' } }
        ],
        heldBy: [
          { kind: 'organization', name: 'Deutsches Historisches Museum' }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1916-11-26' },
        cites: [
          { source: 'lemo-chronik-1916', loc: { section: 'Chronik 1916', para: '102' } }
        ],
        heldBy: [
          { kind: 'organization', name: 'Deutsches Historisches Museum' }
        ]
      },
      {
        value: { d: '1917-03-17' },
        cites: [
          {
            source: 'eo1418-philpott-somme',
            loc: { section: 'The 1916 Battle of the Somme', para: '4' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'William Philpott' }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:somme',
      cites: [
        { source: 'eo1418-philpott-somme', loc: { section: 'Preliminaries', para: '1' } }
      ]
    }
  ],
  sides: [
    {
      key: 'britain',
      name: 'the British',
      cites: [
        {
          source: 'eo1418-philpott-somme',
          loc: { section: 'The 1916 Battle of the Somme', para: '4' }
        }
      ]
    },
    {
      key: 'france',
      name: 'the French',
      cites: [
        {
          source: 'eo1418-philpott-somme',
          loc: { section: 'The 1916 Battle of the Somme', para: '4' }
        }
      ]
    },
    {
      key: 'germany',
      name: 'The German army',
      cites: [
        {
          source: 'eo1418-philpott-somme',
          loc: { section: 'The 1916 Battle of the Somme', para: '4' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'Sir Douglas Haig',
      role: 'commander',
      side: 'britain',
      cites: [
        {
          source: 'eo1418-philpott-somme',
          loc: { section: 'The 1916 Battle of the Somme', para: '1' }
        }
      ]
    },
    {
      name: 'Sir Henry Rawlinson',
      role: 'commander',
      side: 'britain',
      cites: [
        {
          source: 'eo1418-philpott-somme',
          loc: { section: 'The 1916 Battle of the Somme', para: '1' }
        }
      ]
    },
    {
      name: 'Ferdinand Foch',
      role: 'commander',
      side: 'france',
      cites: [
        {
          source: 'eo1418-philpott-somme',
          loc: { section: 'The 1916 Battle of the Somme', para: '1' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'casualties',
      side: 'germany',
      value: {
        alts: [
          {
            value: { min: 500000, qualifier: 'over' },
            cites: [
              {
                source: 'eo1418-philpott-somme',
                loc: { section: 'The 1916 Battle of the Somme', para: '4' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'William Philpott' }
            ]
          }
        ]
      }
    },
    {
      key: 'casualties',
      side: 'britain',
      value: {
        alts: [
          {
            value: { min: 420000 },
            cites: [
              {
                source: 'eo1418-philpott-somme',
                loc: { section: 'The 1916 Battle of the Somme', para: '4' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'William Philpott' }
            ]
          }
        ]
      }
    },
    {
      key: 'casualties',
      side: 'france',
      value: {
        alts: [
          {
            value: { min: 202000 },
            cites: [
              {
                source: 'eo1418-philpott-somme',
                loc: { section: 'The 1916 Battle of the Somme', para: '4' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'William Philpott' }
            ]
          }
        ]
      }
    }
  ],
  related: [
    { ref: 'event:first-world-war', rel: 'related' },
    { ref: 'event:battle-of-verdun', rel: 'related' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The 1916 Battle of the Somme is the most well known engagement in this region, notorious for its heavy casualties.',
          lang: 'en',
          cite: { source: 'eo1418-philpott-somme', loc: { section: 'Somme, Battles of' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/somme-battles-of/'
          }
        },
        {
          id: 'q2',
          text: 'The Battle of the Somme was the Anglo-French contribution to the general Allied offensive during the 1916 campaign, whose objective was to overstretch and wear down the Central Powers’ armies. After the French army was engaged at Verdun, the offensive shrank in ambition, as did the French army’s contribution, leaving the British to take the principal role in the attack on 1 July 1916.',
          lang: 'en',
          cite: {
            source: 'eo1418-philpott-somme',
            loc: { section: 'The 1916 Battle of the Somme', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/somme-battles-of/'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'The outcome was disaster for much of the initial British assault – and some 57,000 casualties – although it was not simply bad planning and weak bombardment alone, but also poor tactics from inexperienced commanders and soldiers, as well as an effective German defence that checked the British assault on the northern sector of their front.',
          lang: 'en',
          cite: {
            source: 'eo1418-philpott-somme',
            loc: { section: 'The 1916 Battle of the Somme', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/somme-battles-of/'
          }
        },
        {
          id: 'q4',
          text: 'In the Battle of Flers-Courcelette – famous for the first (and generally ineffective) employment of the tank, in essence a slowly moving mobile gun-platform – Fourth Army finally cleared the Thiepval Ridge and advanced beyond it, only to face another line of German defences on the high ground beyond.',
          lang: 'en',
          cite: {
            source: 'eo1418-philpott-somme',
            loc: { section: 'The 1916 Battle of the Somme', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/somme-battles-of/'
          }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q5',
          text: 'It probably lost more than 500,000 casualties on top of those suffered at Verdun (the numbers are still disputed) and suffered a serious crisis of morale. The British suffered 420,000 and the French 202,000 casualties.',
          lang: 'en',
          cite: {
            source: 'eo1418-philpott-somme',
            loc: { section: 'The 1916 Battle of the Somme', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/somme-battles-of/'
          }
        }
      ]
    },
    {
      kind: 'memory',
      quotes: [
        {
          id: 'q6',
          text: 'The opening of the Somme offensive is central to Britain’s “lions led by donkeys” mythology of the war, with the broader strategic impact of the 140-day attritional offensive on the strategic balance of the war largely forgotten.',
          lang: 'en',
          cite: { source: 'eo1418-philpott-somme', loc: { section: 'Aftermath', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/somme-battles-of/'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f6/British_Mark_I_male_tank_Somme_25_September_1916.jpg/1280px-British_Mark_I_male_tank_Somme_25_September_1916.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:British_Mark_I_male_tank_Somme_25_September_1916.jpg',
    credit: { institution: 'Imperial War Museums', creator: 'Ernest Brooks' },
    license: { id: 'public-domain' }
  }
})
