import { definePolity } from '../../schema'

export default definePolity({
  id: 'zand-iran',
  names: [
    { text: 'Zand Iran', lang: 'en', role: 'primary' },
    {
      text: 'Zand dynasty',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'iranica-perry-zand-dynasty', loc: { section: 'ZAND DYNASTY', para: '1' } }
      ]
    }
  ],
  researched: '2026-10-13',
  polityType: 'kingdom',
  start: {
    alts: [
      {
        value: { d: '1751' },
        cites: [
          { source: 'iranica-perry-zand-dynasty', loc: { section: 'ZAND DYNASTY', para: '1' } }
        ],
        heldBy: [
          { kind: 'scholar', name: 'John R. Perry', discipline: 'historian' }
        ]
      },
      {
        value: { d: '1750' },
        cites: [
          {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE SAFAVIDS, 1501-1722', para: '9' }
          }
        ],
        heldBy: [
          { kind: 'organization', name: 'Library of Congress' }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1794' },
        cites: [
          {
            source: 'iranica-perry-zand-dynasty',
            loc: { section: 'ZAND DYNASTY', para: '10' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 2,
  capitals: [
    {
      ref: 'place:shiraz',
      start: {
        alts: [
          {
            value: { d: '1765' },
            cites: [
              {
                source: 'iranica-perry-zand-dynasty',
                loc: { section: 'ZAND DYNASTY', para: '2' }
              }
            ]
          }
        ]
      },
      cites: [
        { source: 'iranica-perry-zand-dynasty', loc: { section: 'ZAND DYNASTY', para: '2' } }
      ]
    }
  ],
  predecessors: [
    {
      ref: 'polity:afsharid-iran',
      cites: [
        { source: 'iranica-perry-zand-dynasty', loc: { section: 'ZAND DYNASTY', para: '1' } }
      ]
    }
  ],
  dynasties: ['period:zand-period'],
  cshapes: [
    { set: 'early', code: 97629053 }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Finally Karim Khan Zand (1750-79) was able to defeat his rivals and to unify the country, except for Khorasan, under a loose form of central control.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE SAFAVIDS, 1501-1722', para: '9' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/iran/11.htm' }
        },
        {
          id: 'q2',
          text: 'The dynasty’s reputation rests on its founder Karim Khan, who was able not only to weld together an army from the different Iranian pastoral tribes of the Zagros but also to build a measure of trust and some lasting alliances with the bureaucrats and magnates of the major cities of western and southern Persia (Isfahan, Shiraz, Tabriz, and Kerman).',
          lang: 'en',
          cite: {
            source: 'iranica-perry-zand-dynasty',
            loc: { section: 'ZAND DYNASTY', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/zand-dynasty'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'Karim Khan, who had meanwhile returned to Isfahan in January 1751 with an augmented army, sought out and defeated his rival in Baḵtiāri country.',
          lang: 'en',
          cite: {
            source: 'iranica-perry-karim-khan-zand',
            loc: { section: 'KARIM KHAN ZAND', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/karim-khan-zand'
          }
        },
        {
          id: 'q4',
          text: '“Esmāʿil III,” who was kept in comfortable confinement at the fortress at Ābāda, predeceased the Wakil in 1773, and the fiction of a Safavid revival was quietly dropped.',
          lang: 'en',
          cite: {
            source: 'iranica-perry-karim-khan-zand',
            loc: { section: 'KARIM KHAN ZAND', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/karim-khan-zand'
          }
        },
        {
          id: 'q5',
          text: 'None of Karim Khan’s five successors formally adopted his title of ‘deputy’ (wakil), nor did they take that of ‘shah.’',
          lang: 'en',
          cite: { source: 'iranica-perry-zand-dynasty', loc: { section: 'ZAND DYNASTY', para: '5' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/zand-dynasty'
          }
        },
        {
          id: 'q6',
          text: 'ʿAli-Morād Khan (r. 1781-85) was faced with a resurgence of Qajar power and established his capital strategically at Isfahan.',
          lang: 'en',
          cite: { source: 'iranica-perry-zand-dynasty', loc: { section: 'ZAND DYNASTY', para: '7' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/zand-dynasty'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q7',
          text: 'Loṭf-ʿAli Khan surprised Kerman in 1794 and held it for four months before the Qajars were admitted by treachery.',
          lang: 'en',
          cite: {
            source: 'iranica-perry-zand-dynasty',
            loc: { section: 'ZAND DYNASTY', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/zand-dynasty'
          }
        },
        {
          id: 'q8',
          text: 'Āḡā Moḥammad Khan Qājār had his last Zand enemy blinded and cruelly tortured before taking him back to Tehran for execution in Rabiʿ II 1209/November 1794.',
          lang: 'en',
          cite: {
            source: 'iranica-perry-zand-dynasty',
            loc: { section: 'ZAND DYNASTY', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/zand-dynasty'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d4/Columns_of_Vakil_Mosque_in_Shiraz.jpg/1280px-Columns_of_Vakil_Mosque_in_Shiraz.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Columns_of_Vakil_Mosque_in_Shiraz.jpg',
    credit: { creator: 'Skot' },
    license: { id: 'cc-by-sa', version: '4.0', url: 'https://creativecommons.org/licenses/by-sa/4.0' }
  }
})
