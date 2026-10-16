import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'timur-toqtamish-war',
  names: [
    { text: 'Timur–Toqtamish war', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-16',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1384' },
        cites: [
          { source: 'iranica-jackson-jalayerids', loc: { section: 'JALAYERIDS', para: '11' } }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Peter Jackson', discipline: 'historian' }
        ]
      },
      {
        value: { d: '1385' },
        cites: [
          {
            source: 'iranica-bosworth-azarbaijan-iv',
            loc: { section: 'Azarbaijan iv. Islamic History to 1941', para: '20' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Clifford Edmund Bosworth', discipline: 'historian' }
        ]
      },
      {
        value: { d: '1386' },
        cites: [
          {
            source: 'iranica-jackson-golden-horde',
            loc: { section: 'GOLDEN HORDE', para: '3' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Peter Jackson', discipline: 'historian' }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1395' },
        cites: [
          { source: 'britannica-1911-timur', loc: { section: 'TIMŪR', para: '4' } },
          {
            source: 'britannica-1911-golden-horde',
            loc: { section: 'GOLDEN HORDE', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['russia-central-asia', 'iran'],
  prominence: 3,
  places: [
    {
      ref: 'place:tabriz',
      cites: [
        { source: 'iranica-jackson-jalayerids', loc: { section: 'JALAYERIDS', para: '11' } }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:timurid-empire',
      cites: [
        { source: 'iranica-jackson-golden-horde', loc: { section: 'GOLDEN HORDE', para: '3' } }
      ]
    },
    {
      ref: 'polity:golden-horde',
      cites: [
        { source: 'iranica-jackson-golden-horde', loc: { section: 'GOLDEN HORDE', para: '3' } }
      ]
    }
  ],
  sides: [
    {
      key: 'timurid',
      name: 'Timurids',
      polity: 'polity:timurid-empire',
      cites: [
        { source: 'iranica-jackson-golden-horde', loc: { section: 'GOLDEN HORDE', para: '3' } }
      ]
    },
    {
      key: 'golden-horde',
      name: 'Golden Horde',
      polity: 'polity:golden-horde',
      cites: [
        { source: 'iranica-jackson-golden-horde', loc: { section: 'GOLDEN HORDE', para: '3' } }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:timur',
      role: 'commander',
      side: 'timurid',
      cites: [
        { source: 'iranica-jackson-golden-horde', loc: { section: 'GOLDEN HORDE', para: '3' } }
      ]
    },
    {
      ref: 'person:toqtamish',
      role: 'commander',
      side: 'golden-horde',
      cites: [
        { source: 'iranica-jackson-golden-horde', loc: { section: 'GOLDEN HORDE', para: '3' } }
      ]
    }
  ],
  related: [
    { ref: 'event:timurs-conquest-of-iran', rel: 'related' },
    { ref: 'event:five-years-campaign', rel: 'related' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The wars between Tamerlane (Timur, r. 1371-1405) and his onetime protégé, Toqtamïš (r. 1377-97), in the mid-1380s and 1390s devastated the Volga region and reshuffled the Qepčāq tribes.',
          lang: 'en',
          cite: { source: 'iranica-golden-qepcaq', loc: { section: 'QEPČĀQ', para: '11' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/qepcaq'
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
            value: { d: '1384' },
            cites: [
              {
                source: 'iranica-jackson-jalayerids',
                loc: { section: 'JALAYERIDS', para: '11' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Peter Jackson', discipline: 'historian' }
            ]
          },
          {
            value: { d: '1385' },
            cites: [
              {
                source: 'iranica-bosworth-azarbaijan-iv',
                loc: { section: 'Azarbaijan iv. Islamic History to 1941', para: '20' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Clifford Edmund Bosworth', discipline: 'historian' }
            ]
          },
          {
            value: { d: '1386' },
            cites: [
              {
                source: 'iranica-jackson-golden-horde',
                loc: { section: 'GOLDEN HORDE', para: '3' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Peter Jackson', discipline: 'historian' }
            ]
          }
        ]
      },
      quote: {
        id: 'q2',
        text: 'The installation in Azarbaijan of a client of Timur brought down on the province a savage attack by Toqtamiš, khan of the Golden Horde, who in 1384 sacked Tabriz and Marāḡa and devastated the regions of Marand and Nakhchivan (Naḵjavān) before withdrawing with allegedly 200,000 captives',
        lang: 'en',
        cite: { source: 'iranica-jackson-jalayerids', loc: { section: 'JALAYERIDS', para: '11' } },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://www.iranicaonline.org/articles/jalayerids'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1395' },
            cites: [
              { source: 'britannica-1911-timur', loc: { section: 'TIMŪR', para: '4' } },
              {
                source: 'britannica-1911-golden-horde',
                loc: { section: 'GOLDEN HORDE', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q3',
        text: 'For a short time the glory of the Golden Horde was renewed, until it was finally crushed by Timur in 1395.',
        lang: 'en',
        cite: { source: 'britannica-1911-golden-horde', loc: { section: 'GOLDEN HORDE', para: '1' } },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Golden_Horde'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/01/Battle_between_Timur_and_Toqtamish_Khan_in_18_June_1391._Zafarnama_of_1436%2C_facing_folios_208v-207r.jpg/1280px-Battle_between_Timur_and_Toqtamish_Khan_in_18_June_1391._Zafarnama_of_1436%2C_facing_folios_208v-207r.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Battle_between_Timur_and_Toqtamish_Khan_in_18_June_1391._Zafarnama_of_1436,_facing_folios_208v-207r.jpg',
    credit: { creator: '1436 painter' },
    license: { id: 'public-domain' }
  }
})
