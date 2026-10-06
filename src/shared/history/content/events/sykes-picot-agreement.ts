import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'sykes-picot-agreement',
  names: [
    { text: 'Sykes–Picot Agreement', lang: 'en', role: 'primary' },
    {
      text: 'Asia Minor Agreement',
      lang: 'en',
      role: 'official',
      cites: [
        { source: 'loc-israel-country-study-1988', loc: { section: 'World War I', para: '6' } }
      ]
    }
  ],
  researched: '2026-10-06',
  type: 'treaty',
  start: {
    alts: [
      {
        value: { d: '1916-05' },
        cites: [
          {
            source: 'eo1418-tell-sykes-picot-agreement',
            loc: { section: 'Introduction', para: '1' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Tariq Tell' }
        ]
      },
      {
        value: { d: '1916-02' },
        cites: [
          {
            source: 'loc-israel-country-study-1988',
            loc: { section: 'World War I', para: '6' }
          }
        ],
        heldBy: [
          { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
        ]
      }
    ]
  },
  regions: ['mena', 'europe'],
  prominence: 2,
  participants: [
    {
      name: 'Sir Mark Sykes',
      role: 'negotiator',
      cites: [
        {
          source: 'eo1418-tell-sykes-picot-agreement',
          loc: { section: 'Introduction', para: '1' }
        }
      ]
    },
    {
      name: 'François Georges-Picot',
      role: 'negotiator',
      cites: [
        {
          source: 'eo1418-tell-sykes-picot-agreement',
          loc: { section: 'Introduction', para: '1' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:arab-revolt', rel: 'related' },
    { ref: 'event:balfour-declaration', rel: 'related' },
    { ref: 'event:paris-peace-conference', rel: 'related' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'In dividing the Fertile Crescent into British and French spheres, the wartime Sykes-Picot Agreement laid the foundation of the colonial division of the region ratified at the St. Remo (1920) and Lausanne (1923) conferences, when Palestine (internationalized in the original plan), Mosul and its hinterlands were added to Britain’s zone.',
          lang: 'en',
          cite: {
            source: 'eo1418-tell-sykes-picot-agreement',
            loc: { section: 'Sykes-Picot Agreement' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/sykes-picot-agreement/'
          }
        },
        {
          id: 'q2',
          text: 'The May 1916 agreement negotiated by Sir Mark Sykes (1879-1919) and François Georges-Picot (1870-1951) painted the Fertile Crescent in shades of Red (for Great Britain’s sphere of influence) and blue (the French sphere).',
          lang: 'en',
          cite: {
            source: 'eo1418-tell-sykes-picot-agreement',
            loc: { section: 'Introduction', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/sykes-picot-agreement/'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'An initial agreement was reached by the two men in January 1916 and slightly modified in February 1916.',
          lang: 'en',
          cite: {
            source: 'eo1418-tell-sykes-picot-agreement',
            loc: { section: 'Dividing the Fertile Crescent during WWI', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/sykes-picot-agreement/'
          }
        },
        {
          id: 'q4',
          text: 'That in the blue area France, and in the red area Great Britain, shall be allowed to establish such direct or indirect administration or control as they desire and as they may think fit to arrange with the Arab state or confederation of Arab states.',
          lang: 'en',
          cite: {
            source: 'avalon-sykes-picot-agreement-1916',
            loc: { section: 'The Sykes-Picot Agreement : 1916', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://avalon.law.yale.edu/20th_century/sykes.asp'
          }
        },
        {
          id: 'q5',
          text: 'That in the brown area there shall be established an international administration, the form of which is to be decided upon after consultation with Russia, and subsequently in consultation with the other allies, and the representatives of the Shereef of Mecca.',
          lang: 'en',
          cite: {
            source: 'avalon-sykes-picot-agreement-1916',
            loc: { section: 'The Sykes-Picot Agreement : 1916', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://avalon.law.yale.edu/20th_century/sykes.asp'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'Picot had obtained gains out of proportion to the actual balance of forces in the Levant, a fact the British exploited to claw back most of the concessions made by Sykes after the war.',
          lang: 'en',
          cite: {
            source: 'eo1418-tell-sykes-picot-agreement',
            loc: { section: 'War’s Aftermath: Anglo-French Rivalries Reignited', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/sykes-picot-agreement/'
          }
        },
        {
          id: 'q7',
          text: 'A generation after the agreement, the unintended consequences of Sykes-Picot undermined Britain’s imperial tenure in the Fertile Crescent.',
          lang: 'en',
          cite: {
            source: 'eo1418-tell-sykes-picot-agreement',
            loc: { section: 'War’s Aftermath: Anglo-French Rivalries Reignited', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/sykes-picot-agreement/'
          }
        }
      ]
    },
    {
      kind: 'memory',
      quotes: [
        {
          id: 'q8',
          text: 'For many Arabs today, “Sykes-Picot” remains a byword for secret diplomacy and the ruthless realpolitik associated with colonial ambition.',
          lang: 'en',
          cite: {
            source: 'eo1418-tell-sykes-picot-agreement',
            loc: { section: 'Introduction', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/sykes-picot-agreement/'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f9/MPK1-426_Sykes_Picot_Agreement_Map_signed_8_May_1916.jpg/1280px-MPK1-426_Sykes_Picot_Agreement_Map_signed_8_May_1916.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:MPK1-426_Sykes_Picot_Agreement_Map_signed_8_May_1916.jpg',
    credit: { institution: 'The National Archives (United Kingdom)' },
    license: { id: 'public-domain' }
  }
})
