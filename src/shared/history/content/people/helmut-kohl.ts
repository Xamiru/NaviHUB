import { definePerson } from '../../schema'

export default definePerson({
  id: 'helmut-kohl',
  names: [
    { text: 'Helmut Kohl', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-10',
  born: {
    alts: [
      {
        value: { d: '1930-04-03' },
        cites: [
          {
            source: 'lc-names-kohl-helmut-n50042957',
            loc: { section: 'Kohl, Helmut, 1930-2017' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '2017-06-16' },
        cites: [
          {
            source: 'lc-names-kohl-helmut-n50042957',
            loc: { section: 'Kohl, Helmut, 1930-2017' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  roles: ['head-of-state', 'politician'],
  offices: [
    {
      title: 'Federal Chancellor of Germany',
      polity: 'polity:federal-republic-of-germany',
      start: {
        alts: [
          {
            value: { d: '1982' },
            cites: [
              {
                source: 'bundeskanzler-de-helmut-kohl-1982-1998',
                loc: { section: 'Helmut Kohl’s era (1982–98)', para: '2' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1998' },
            cites: [
              {
                source: 'bundeskanzler-de-helmut-kohl-1982-1998',
                loc: { section: 'Helmut Kohl’s era (1982–98)', para: '25' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'bundeskanzler-de-helmut-kohl-1982-1998',
          loc: { section: 'Helmut Kohl’s era (1982–98)', para: '2' }
        },
        {
          source: 'bundeskanzler-de-helmut-kohl-1982-1998',
          loc: { section: 'Helmut Kohl’s era (1982–98)', para: '25' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d4/Helmut_Kohl_%281996%29.jpg/1280px-Helmut_Kohl_%281996%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Helmut_Kohl_(1996).jpg',
    credit: { creator: 'Christian Lambiotte' },
    license: { id: 'cc-by', version: '4.0', url: 'https://creativecommons.org/licenses/by/4.0' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Helmut Kohl (CDU) was Federal Chancellor of the Federal Republic of Germany for 16 years.',
          lang: 'en',
          cite: {
            source: 'bundeskanzler-de-helmut-kohl-1982-1998',
            loc: { section: 'Helmut Kohl’s era (1982–98)', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.bundeskanzler.de/bk-en/federal-chancellery/federal-chancellors-since-1949/helmut-kohl'
          }
        },
        {
          id: 'q2',
          text: 'Many people remember him as the “Chancellor of Unity” because it was during his term in office that West and East Germany were reunified.',
          lang: 'en',
          cite: {
            source: 'bundeskanzler-de-helmut-kohl-1982-1998',
            loc: { section: 'Helmut Kohl’s era (1982–98)', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.bundeskanzler.de/bk-en/federal-chancellery/federal-chancellors-since-1949/helmut-kohl'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q3',
          text: 'Helmut Kohl came to power in 1982 following a constructive vote of no confidence.',
          lang: 'en',
          cite: {
            source: 'bundeskanzler-de-helmut-kohl-1982-1998',
            loc: { section: 'Helmut Kohl’s era (1982–98)', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.bundeskanzler.de/bk-en/federal-chancellery/federal-chancellors-since-1949/helmut-kohl'
          }
        },
        {
          id: 'q4',
          text: 'In its first years in government, Helmut Kohl’s coalition introduced tax reforms to ensure that the people of Germany had more money in their pockets.',
          lang: 'en',
          cite: {
            source: 'bundeskanzler-de-helmut-kohl-1982-1998',
            loc: { section: 'Helmut Kohl’s era (1982–98)', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.bundeskanzler.de/bk-en/federal-chancellery/federal-chancellors-since-1949/helmut-kohl'
          }
        },
        {
          id: 'q5',
          text: 'Calls for German reunification got louder and louder.',
          lang: 'en',
          cite: {
            source: 'bundeskanzler-de-helmut-kohl-1982-1998',
            loc: { section: 'Helmut Kohl’s era (1982–98)', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.bundeskanzler.de/bk-en/federal-chancellery/federal-chancellors-since-1949/helmut-kohl'
          }
        },
        {
          id: 'q6',
          text: 'Helmut Kohl put all his efforts within the group of Western allies and in dealings with the then Soviet Union into bringing about rapid reunification.',
          lang: 'en',
          cite: {
            source: 'bundeskanzler-de-helmut-kohl-1982-1998',
            loc: { section: 'Helmut Kohl’s era (1982–98)', para: '18' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.bundeskanzler.de/bk-en/federal-chancellery/federal-chancellors-since-1949/helmut-kohl'
          }
        },
        {
          id: 'q7',
          text: 'During a visit to Moscow in early February, Chancellor Kohl had received assurances from Gorbachev that the Soviet Union would respect the wishes of both Germanys to unite.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Opening of the Berlin Wall and Unification', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/germany/73.htm' }
        },
        {
          id: 'q8',
          text: 'In the 1990s Helmut Kohl worked hard to ensure the European Union expanded and deepened.',
          lang: 'en',
          cite: {
            source: 'bundeskanzler-de-helmut-kohl-1982-1998',
            loc: { section: 'Helmut Kohl’s era (1982–98)', para: '23' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.bundeskanzler.de/bk-en/federal-chancellery/federal-chancellors-since-1949/helmut-kohl'
          }
        }
      ]
    }
  ]
})
