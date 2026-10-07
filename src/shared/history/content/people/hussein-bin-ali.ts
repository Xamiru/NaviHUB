import { definePerson } from '../../schema'

export default definePerson({
  id: 'hussein-bin-ali',
  names: [
    { text: 'Hussein bin Ali', lang: 'en', role: 'primary' },
    { text: 'الحسين بن علي', lang: 'ar', role: 'native' },
    {
      text: 'Husayn ibn Ali, King of Hejaz',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'eo1418-tell-husayn-ibn-ali',
          loc: { section: 'Between Mecca and Istanbul', para: '1' }
        }
      ]
    },
    {
      text: 'Sharif Husayn bin ‘Ali of Mecca',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'eo1418-el-bakri-arab-revolt',
          loc: { section: 'Revolutions and Rebellions: Arab Revolt (Ottoman Empire/Middle East)' }
        }
      ]
    }
  ],
  researched: '2026-10-07',
  born: {
    alts: [
      {
        value: { d: '1853', approx: true },
        cites: [
          {
            source: 'eo1418-tell-husayn-ibn-ali',
            loc: { section: 'Between Mecca and Istanbul', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1931-07-04' },
        cites: [
          {
            source: 'eo1418-tell-husayn-ibn-ali',
            loc: { section: 'Husayn ibn Ali, King of Hejaz' }
          }
        ]
      }
    ]
  },
  bornIn: {
    ref: 'place:mecca',
    cites: [
      {
        source: 'eo1418-tell-husayn-ibn-ali',
        loc: { section: 'Between Mecca and Istanbul', para: '1' }
      }
    ]
  },
  regions: ['mena'],
  roles: ['monarch', 'revolutionary'],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Husayn ibn Ali launched the Arab Revolt in alliance with Great Britain. His relations with his European allies remained uneasy and deteriorated further when a unified Arab state under his rule failed to materialize after the war. Ibn Sa‘ud’s conquest of the Hejaz drove Husayn into exile in 1925.',
          lang: 'en',
          cite: {
            source: 'eo1418-tell-husayn-ibn-ali',
            loc: { section: 'Husayn ibn Ali, King of Hejaz' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/husayn-ibn-ali-king-of-hejaz/'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'Husayn declared himself “King of the Arabs” in October 1916 (although he was only recognized as King of the Hejaz by his European allies).',
          lang: 'en',
          cite: {
            source: 'eo1418-tell-husayn-ibn-ali',
            loc: { section: 'Husayn and the Great Arab Revolt', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/husayn-ibn-ali-king-of-hejaz/'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q3',
          text: 'Having launched his uprising against Ottoman rule with British prompting, Husayn ended up as the chief victim of a postwar settlement that saw Britain renege on the promises of Arab independence held out by his correspondence with McMahon.',
          lang: 'en',
          cite: {
            source: 'eo1418-tell-husayn-ibn-ali',
            loc: { section: 'The Fate of Husayn’s Revolt', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/husayn-ibn-ali-king-of-hejaz/'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/f/fe/The_King_of_Hedjaz_and_Arab_Independence_%28page_04%29.png',
    page: 'https://commons.wikimedia.org/wiki/File:The_King_of_Hedjaz_and_Arab_Independence_(page_04).png',
    credit: { institution: 'World Digital Library, Library of Congress' },
    license: { id: 'public-domain' }
  }
})
