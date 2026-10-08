import { definePerson } from '../../schema'

export default definePerson({
  id: 'paul-von-hindenburg',
  names: [
    { text: 'Paul von Hindenburg', lang: 'en', role: 'primary' },
    { text: 'Paul von Beneckendorff und von Hindenburg', lang: 'de', role: 'native' }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1847-10-02' },
        cites: [
          {
            source: 'eo1418-von-der-goltz-hindenburg',
            loc: { section: 'Hindenburg, Paul von' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1934-08-02' },
        cites: [
          {
            source: 'eo1418-von-der-goltz-hindenburg',
            loc: { section: 'Hindenburg, Paul von' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  roles: ['military', 'head-of-state'],
  offices: [
    {
      title: 'chief of the General Staff',
      polity: 'polity:german-empire',
      start: {
        alts: [
          {
            value: { d: '1916-08' },
            cites: [
              {
                source: 'eo1418-von-der-goltz-hindenburg',
                loc: { section: 'Hindenburg, Paul von' }
              }
            ]
          }
        ]
      },
      cites: [
        { source: 'eo1418-von-der-goltz-hindenburg', loc: { section: 'Hindenburg, Paul von' } },
        { source: 'eo1418-von-der-goltz-hindenburg', loc: { section: 'Hindenburg, Paul von' } }
      ]
    },
    {
      title: 'Reich president',
      start: {
        alts: [
          {
            value: { d: '1925' },
            cites: [
              {
                source: 'eo1418-von-der-goltz-hindenburg',
                loc: { section: 'Hindenburg, Paul von' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1934' },
            cites: [
              {
                source: 'eo1418-von-der-goltz-hindenburg',
                loc: { section: 'Hindenburg, Paul von' }
              }
            ]
          }
        ]
      },
      cites: [
        { source: 'eo1418-von-der-goltz-hindenburg', loc: { section: 'Hindenburg, Paul von' } },
        { source: 'eo1418-von-der-goltz-hindenburg', loc: { section: 'Hindenburg, Paul von' } }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/98/Bundesarchiv_Bild_183-C06886%2C_Paul_v._Hindenburg_%28cropped%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Bundesarchiv_Bild_183-C06886,_Paul_v._Hindenburg_(cropped).jpg',
    credit: { institution: 'Bundesarchiv' },
    license: {
      id: 'cc-by-sa',
      version: '3.0 de',
      url: 'https://creativecommons.org/licenses/by-sa/3.0/de/deed.en'
    }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Paul von Hindenburg shot to fame after the Battle of Tannenberg in August 1914. He was Germany’s national hero of wartime, soon eclipsing the Kaiser. Appointed to the Supreme Command in 1916, he increasingly took on a political role. His myth survived the military collapse of 1918. Hindenburg served as president of the Weimar Republic from 1925 onwards and appointed Hitler as chancellor in 1933.',
          lang: 'en',
          cite: {
            source: 'eo1418-von-der-goltz-hindenburg',
            loc: { section: 'Hindenburg, Paul von' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://encyclopedia.1914-1918-online.net/article/hindenburg-paul-von/'
          }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q2',
          text: 'Paul von Hindenburg (1847-1934) was largely unknown before 1914. Born in 1847, he joined the Third Regiment of Foot Guards in 1866, admitting him to the Prussian Officer Corps. He fought in some of the key battles of German unification, which would later bolster his reputation as a symbol of national unity: Königgrätz in 1866 and Sedan in 1870.',
          lang: 'en',
          cite: {
            source: 'eo1418-von-der-goltz-hindenburg',
            loc: { section: 'Hindenburg, Paul von' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://encyclopedia.1914-1918-online.net/article/hindenburg-paul-von/'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q3',
          text: 'Nevertheless, Hindenburg was credited with orchestrating victory in the Battle of Tannenberg in late August 1914, which helped to drive the Russians out of East Prussia.',
          lang: 'en',
          cite: {
            source: 'eo1418-von-der-goltz-hindenburg',
            loc: { section: 'Hindenburg, Paul von' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://encyclopedia.1914-1918-online.net/article/hindenburg-paul-von/'
          }
        },
        {
          id: 'q4',
          text: 'The day after Romania entered the war on the Entente side on 28 August 1916, Hindenburg and Ludendorff were appointed to the Supreme Command.',
          lang: 'en',
          cite: {
            source: 'eo1418-von-der-goltz-hindenburg',
            loc: { section: 'Hindenburg, Paul von' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://encyclopedia.1914-1918-online.net/article/hindenburg-paul-von/'
          }
        },
        {
          id: 'q5',
          text: 'his testimony to the Parliamentary Investigation Committee on the Causes of the Collapse in November 1919 popularized the “stab-in-the-back” legend, which associated republican forces with defeat and treason.',
          lang: 'en',
          cite: {
            source: 'eo1418-von-der-goltz-hindenburg',
            loc: { section: 'Hindenburg, Paul von' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://encyclopedia.1914-1918-online.net/article/hindenburg-paul-von/'
          }
        },
        {
          id: 'q6',
          text: 'On 30 January 1933, Hindenburg appointed his opponent of the previous year, the Nazi leader Adolf Hitler (1889-1945), as Reich chancellor.',
          lang: 'en',
          cite: {
            source: 'eo1418-von-der-goltz-hindenburg',
            loc: { section: 'Hindenburg, Paul von' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://encyclopedia.1914-1918-online.net/article/hindenburg-paul-von/'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q7',
          text: 'For a long time, the scholarly consensus was that Hindenburg was an apolitical leader who was largely steered by others. More recent studies have revealed a man who was keenly aware of the power of his own image and who quickly developed an acute sense of the politically opportune.',
          lang: 'en',
          cite: {
            source: 'eo1418-von-der-goltz-hindenburg',
            loc: { section: 'Hindenburg, Paul von' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://encyclopedia.1914-1918-online.net/article/hindenburg-paul-von/'
          }
        }
      ]
    }
  ]
})
