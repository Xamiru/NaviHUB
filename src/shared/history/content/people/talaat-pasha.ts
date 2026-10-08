import { definePerson } from '../../schema'

export default definePerson({
  id: 'talaat-pasha',
  names: [
    { text: 'Talaat Pasha', lang: 'en', role: 'primary' },
    { text: 'Talât Paşa', lang: 'tr', role: 'native' },
    {
      text: 'Mehmed Talat Pasha',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'eo1418-kieser-talat', loc: { section: 'Career until 1913', para: '1' } }
      ]
    }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1874-01-01' },
        cites: [
          { source: 'eo1418-kieser-talat', loc: { section: 'Pasha, Talat' } }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Hans-Lukas Kieser' }
        ]
      },
      {
        value: { d: '1868' },
        cites: [
          {
            source: 'eo1418-suny-armenian-genocide',
            loc: {
              section: 'Turkish Nationalism and the Catastrophic Results of the War for Armenians',
              para: '1'
            }
          },
          {
            source: 'eo1418-zurcher-kemal',
            loc: { section: 'Conflict and Critique', para: '2' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Ronald Grigor Suny' },
          { kind: 'scholar', name: 'Erik-Jan Zürcher' }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1921-03-15' },
        cites: [
          { source: 'eo1418-kieser-talat', loc: { section: 'Pasha, Talat' } }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Hans-Lukas Kieser' }
        ]
      },
      {
        value: { d: '1922' },
        cites: [
          {
            source: 'eo1418-suny-armenian-genocide',
            loc: {
              section: 'Turkish Nationalism and the Catastrophic Results of the War for Armenians',
              para: '1'
            }
          },
          {
            source: 'eo1418-zurcher-kemal',
            loc: { section: 'Conflict and Critique', para: '2' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Ronald Grigor Suny' },
          { kind: 'scholar', name: 'Erik-Jan Zürcher' }
        ]
      }
    ]
  },
  bornIn: {
    ref: 'place:edirne',
    cites: [
      { source: 'eo1418-kieser-talat', loc: { section: 'Pasha, Talat' } }
    ]
  },
  diedIn: {
    ref: 'place:berlin',
    cites: [
      { source: 'eo1418-kieser-talat', loc: { section: 'Pasha, Talat' } }
    ]
  },
  regions: ['mena', 'europe'],
  roles: ['politician'],
  offices: [
    {
      title: 'grand vizier',
      polity: 'polity:ottoman-empire',
      start: {
        alts: [
          {
            value: { d: '1917-02-04' },
            cites: [
              { source: 'eo1418-kieser-talat', loc: { section: 'Grand Vizier', para: '1' } }
            ]
          }
        ]
      },
      cites: [
        { source: 'eo1418-kieser-talat', loc: { section: 'Grand Vizier', para: '1' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'A first father of modern Turkey before Mustafa Kemal Atatürk, and the driving force of the Committee of Union and Progress (CUP) during the war, Talat organized the removal of Armenian and other Christian citizens to secure exclusive Turkish power in Asia Minor.',
          lang: 'en',
          cite: { source: 'eo1418-kieser-talat', loc: { section: 'Pasha, Talat' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/pasha-talat/'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'A few days later, in ciphered telegrams from 24 April to the provincial governors and the army, he defined the situation in Asia Minor as that of a general Armenian rebellion and of revolutionary committees that wished to establish self-determination and thus must be eliminated. Agencies of Talat’s ministry not only arrested the Armenian elites throughout the country, but organized the removal of most Armenians from eastern Asia Minor and western Anatolia in addition to the province of Edirne.',
          lang: 'en',
          cite: { source: 'eo1418-kieser-talat', loc: { section: 'Armenian Genocide', para: '4' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/pasha-talat/'
          }
        },
        {
          id: 'q3',
          text: 'When Talat was appointed as pasha and grand vizier on 4 February 1917, at last the real CUP head led Ottoman Turkey and a full-fledged CUP cabinet.',
          lang: 'en',
          cite: { source: 'eo1418-kieser-talat', loc: { section: 'Grand Vizier', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/pasha-talat/'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q4',
          text: 'Talat and Cemal, who were held responsible for the deportation of Armenians and the mistreatment of refugees, were assassinated by Armenian nationalists in 1921.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'World War I', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/turkey/12.htm' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/68/Talat_Pasha_cropped.jpg/1280px-Talat_Pasha_cropped.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Talat_Pasha_cropped.jpg',
    credit: { institution: 'Library of Congress', creator: 'Bain News Service' },
    license: { id: 'public-domain' }
  }
})
