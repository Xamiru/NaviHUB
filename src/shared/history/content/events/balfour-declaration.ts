import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'balfour-declaration',
  names: [
    { text: 'Balfour Declaration', lang: 'en', role: 'primary' },
    { text: 'הצהרת בלפור', lang: 'he', role: 'alternative' },
    { text: 'وعد بلفور', lang: 'ar', role: 'alternative' }
  ],
  researched: '2026-10-07',
  type: 'other',
  start: {
    alts: [
      {
        value: { d: '1917-11-02' },
        cites: [
          {
            source: 'eo1418-rhett-balfour-declaration',
            loc: { section: 'Introduction', para: '1' }
          },
          {
            source: 'avalon-balfour-declaration-1917',
            loc: { section: 'Balfour Declaration November 2, 1917', para: '0' }
          }
        ]
      }
    ]
  },
  regions: ['mena', 'europe'],
  prominence: 2,
  participants: [
    {
      ref: 'person:arthur-balfour',
      role: 'signatory',
      cites: [
        {
          source: 'eo1418-rhett-balfour-declaration',
          loc: { section: 'Introduction', para: '1' }
        },
        {
          source: 'avalon-balfour-declaration-1917',
          loc: { section: 'Balfour Declaration November 2, 1917', para: '6' }
        }
      ]
    },
    {
      name: 'Lord Walter Lionel Rothschild',
      role: 'participant',
      cites: [
        {
          source: 'eo1418-rhett-balfour-declaration',
          loc: { section: 'Introduction', para: '1' }
        }
      ]
    },
    {
      name: 'Chaim Weizmann',
      role: 'organizer',
      cites: [
        {
          source: 'eo1418-rhett-balfour-declaration',
          loc: { section: 'Political Zionism', para: '3' }
        }
      ]
    },
    {
      name: 'Nahum Sokolow',
      role: 'organizer',
      cites: [
        {
          source: 'eo1418-rhett-balfour-declaration',
          loc: { section: 'Political Zionism', para: '3' }
        }
      ]
    },
    {
      name: 'Edwin Montagu',
      role: 'participant',
      cites: [
        {
          source: 'eo1418-rhett-balfour-declaration',
          loc: { section: 'Drafting the Declaration', para: '2' }
        }
      ]
    },
    {
      name: 'David Lloyd George',
      role: 'head-of-government',
      cites: [
        {
          source: 'eo1418-rhett-balfour-declaration',
          loc: { section: 'Introduction', para: '4' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:first-zionist-congress', rel: 'related' },
    { ref: 'event:sykes-picot-agreement', rel: 'related' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q2',
          text: 'The Balfour Declaration, issued on 2 November 1917, is one of the most influential documents leading to the establishment of the state of Israel.',
          lang: 'en',
          cite: {
            source: 'eo1418-rhett-balfour-declaration',
            loc: { section: 'Introduction', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/balfour-declaration/'
          }
        },
        {
          id: 'q1',
          text: '"His Majesty\'s Government view with favour the establishment in Palestine of a national home for the Jewish people, and will use their best endeavours to facilitate the achievement of this object, it being clearly understood that nothing shall be done which may prejudice the civil and religious rights of existing non-Jewish communities in Palestine, or the rights and political status enjoyed by Jews in any other country."',
          lang: 'en',
          cite: {
            source: 'avalon-balfour-declaration-1917',
            loc: { section: 'Balfour Declaration November 2, 1917', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://avalon.law.yale.edu/20th_century/balfour.asp'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'While earlier versions had been under discussion since spring 1917, political Zionists formally presented their goals in the Preliminary Zionist Draft on 12 July 1917. Authored by Sokolow, the statement forcefully reasserted the concepts of Palestine as the “National Home of the Jewish people,” but nowhere mentioned populations already living in the region.',
          lang: 'en',
          cite: {
            source: 'eo1418-rhett-balfour-declaration',
            loc: { section: 'Drafting the Declaration', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/balfour-declaration/'
          }
        },
        {
          id: 'q4',
          text: '“Race” was, in the end, removed from the text and the component of non-Zionist populations remained, but as was evident from Montagu’s reaction to the Balfour Declaration’s release, it was not immediately embraced by all.',
          lang: 'en',
          cite: {
            source: 'eo1418-rhett-balfour-declaration',
            loc: { section: 'Drafting the Declaration', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/balfour-declaration/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'In Palestine, the Balfour Declaration’s issuance, and indeed its incorporation into the Mandate for Palestine, firmly established Zionism while destabilizing the non-Zionist population (whether it be Jewish, Christian, or Muslim) in the region.',
          lang: 'en',
          cite: {
            source: 'eo1418-rhett-balfour-declaration',
            loc: { section: 'Drafting the Declaration', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/balfour-declaration/'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8e/Balfour_declaration_unmarked.jpg/1280px-Balfour_declaration_unmarked.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Balfour_declaration_unmarked.jpg',
    credit: { institution: 'British Library' },
    license: { id: 'public-domain' }
  }
})
