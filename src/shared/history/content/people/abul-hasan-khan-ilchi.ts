import { definePerson } from '../../schema'

export default definePerson({
  id: 'abul-hasan-khan-ilchi',
  names: [
    { text: 'Abu’l-Hasan Khan Ilchi', lang: 'en', role: 'primary' },
    { text: 'میرزا ابوالحسن خان ایلچی', lang: 'fa', role: 'native' },
    { text: 'Mīrzā Abu’l-Ḥasan Khan Īlčī Šīrāzī', lang: 'fa-Latn', role: 'alternative' }
  ],
  researched: '2026-10-06',
  born: {
    alts: [
      {
        value: { d: '1776' },
        cites: [
          {
            source: 'iranica-javadi-abul-hasan-khan-ilci',
            loc: { section: 'ABU’L-ḤASAN KHAN ĪLČĪ', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1845' },
        cites: [
          {
            source: 'iranica-javadi-abul-hasan-khan-ilci',
            loc: { section: 'ABU’L-ḤASAN KHAN ĪLČĪ', para: '8' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  roles: ['diplomat', 'politician'],
  offices: [
    {
      title: 'minister of foreign affairs',
      start: {
        alts: [
          {
            value: { d: '1823' },
            cites: [
              {
                source: 'iranica-javadi-abul-hasan-khan-ilci',
                loc: { section: 'ABU’L-ḤASAN KHAN ĪLČĪ', para: '7' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1834' },
            cites: [
              {
                source: 'iranica-javadi-abul-hasan-khan-ilci',
                loc: { section: 'ABU’L-ḤASAN KHAN ĪLČĪ', para: '7' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-javadi-abul-hasan-khan-ilci',
          loc: { section: 'ABU’L-ḤASAN KHAN ĪLČĪ', para: '7' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'ABU’L-ḤASAN KHAN ĪLČĪ, MĪRZĀ, Persian diplomat, b. 1190/1776 in Šīrāz.',
          lang: 'en',
          cite: {
            source: 'iranica-javadi-abul-hasan-khan-ilci',
            loc: { section: 'ABU’L-ḤASAN KHAN ĪLČĪ', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/abul-hasan-khan-ilci/'
          }
        },
        {
          id: 'q2',
          text: 'The first mission of Mīrzā Abu’l-Ḥasan, to the court of George III, earned him the title of Īḷčī (envoy).',
          lang: 'en',
          cite: {
            source: 'iranica-javadi-abul-hasan-khan-ilci',
            loc: { section: 'ABU’L-ḤASAN KHAN ĪLČĪ', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/abul-hasan-khan-ilci/'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q3',
          text: 'Mīrzā Abu’l-Ḥasan, traveling with Sir Harford Jones Brydges (the returning British ambassador) and James Morier, who was at this time secretary to the mission, left Tehran on 7 May 1809, reaching Plymouth November 25.',
          lang: 'en',
          cite: {
            source: 'iranica-javadi-abul-hasan-khan-ilci',
            loc: { section: 'ABU’L-ḤASAN KHAN ĪLČĪ', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/abul-hasan-khan-ilci/'
          }
        },
        {
          id: 'q4',
          text: 'In the London of 1810, Mīrzā Abu’l-Ḥasan caused quite a sensation.',
          lang: 'en',
          cite: {
            source: 'iranica-javadi-abul-hasan-khan-ilci',
            loc: { section: 'ABU’L-ḤASAN KHAN ĪLČĪ', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/abul-hasan-khan-ilci/'
          }
        },
        {
          id: 'q5',
          text: 'In 1815 Mīrzā Abu’l-Ḥasan was sent to the court of St. Petersburg as special envoy; though Sir Gore Ouseley had promised Fatḥ-ʿAlī Shah to negotiate for the return of the Iranian territories with the czar, nothing came out of this trip, and Mīrzā Abu’l-Ḥasan returned to Tehran after two years.',
          lang: 'en',
          cite: {
            source: 'iranica-javadi-abul-hasan-khan-ilci',
            loc: { section: 'ABU’L-ḤASAN KHAN ĪLČĪ', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/abul-hasan-khan-ilci/'
          }
        },
        {
          id: 'q6',
          text: 'In 1819 he was again sent to England, traveling overland via Constantinople, Vienna, and Paris, and he returned in the following year.',
          lang: 'en',
          cite: {
            source: 'iranica-javadi-abul-hasan-khan-ilci',
            loc: { section: 'ABU’L-ḤASAN KHAN ĪLČĪ', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/abul-hasan-khan-ilci/'
          }
        }
      ]
    },
    {
      kind: 'later-life',
      quotes: [
        {
          id: 'q7',
          text: 'In 1239/1823 he was appointed minister of foreign affairs, the second foreign minister of Iran after Mīrzā ʿAbd-al-Wahhāb Moʿtamad-al-dawla Našāṭ (q.v.).',
          lang: 'en',
          cite: {
            source: 'iranica-javadi-abul-hasan-khan-ilci',
            loc: { section: 'ABU’L-ḤASAN KHAN ĪLČĪ', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/abul-hasan-khan-ilci/'
          }
        },
        {
          id: 'q8',
          text: 'Mīrzā Abu’l-Ḥasan held this position until his death in 1262/1845.',
          lang: 'en',
          cite: {
            source: 'iranica-javadi-abul-hasan-khan-ilci',
            loc: { section: 'ABU’L-ḤASAN KHAN ĪLČĪ', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/abul-hasan-khan-ilci/'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/2/26/Mirza_Abu%27l_Hassan_Khan_by_William_Henry_Beechey.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Mirza_Abu%27l_Hassan_Khan_by_William_Henry_Beechey.jpg',
    credit: { creator: 'William Beechey' },
    license: { id: 'public-domain' }
  }
})
