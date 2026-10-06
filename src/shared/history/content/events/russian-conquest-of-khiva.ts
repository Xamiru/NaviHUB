import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'russian-conquest-of-khiva',
  names: [
    { text: 'Russian conquest of Khiva', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  type: 'invasion',
  start: {
    alts: [
      {
        value: { d: '1873' },
        cites: [
          {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '32'
            }
          },
          {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1873' }
          },
          {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'The Second Anglo-Afghan War', para: '4' }
          }
        ]
      }
    ]
  },
  regions: ['russia-central-asia', 'iran'],
  prominence: 3,
  places: [
    {
      ref: 'place:khiva',
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-2',
          loc: { section: 'Chronology of Iranian History Part 2, 1873' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:second-anglo-afghan-war',
      rel: 'contributed-to',
      cites: [
        {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'The Second Anglo-Afghan War', para: '4' }
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
          text: '1873 Ḵiva is conquered by Russian forces.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1873' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-2/'
          }
        },
        {
          id: 'q2',
          text: 'Russian military advance into Central Asia started in the 1860s, and by 1873 the territories of the Ḵoqand (Kokand), Bukhara, and Khiva khanates became Russian territories.',
          lang: 'en',
          cite: {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '32'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q3',
          text: 'The Afghan ruler was worried about the southward encroachment of Russia, which by 1873 had taken over the lands of the khan, or ruler, of Khiva.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'The Second Anglo-Afghan War', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/afghanistan/14.htm' }
        },
        {
          id: 'q4',
          text: 'In 1290/1873, an Anglo-Russian accord gave each power a zone of influence in Central Asia, with Afghanistan in the English sphere.',
          lang: 'en',
          cite: {
            source: 'iranica-balland-afghanistan-political-history',
            loc: { section: 'AFGHANISTAN x. Political History', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/afghanistan-x-political-history'
          }
        },
        {
          id: 'q5',
          text: 'During the Russian military actions in Central Asia, however, Iran supported the Russian army with supplies of food and forage (Kulagina and Dunaeva, pp. 58-59; Rawlinson, pp. 169-71, 313-15; Eʿtemād-al-Salṭana, III, pp. 1939 ff., 1951).',
          lang: 'en',
          cite: {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '32'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
          }
        },
        {
          id: 'q6',
          text: 'After the fall of Geok Tepe in 1881, most of the Turcoman territories of Transcaspia fell under the Russian rule.',
          lang: 'en',
          cite: {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '32'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/de/Russians_entering_khiva_1873_%28cropped%29.jpg/1280px-Russians_entering_khiva_1873_%28cropped%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Russians_entering_khiva_1873_(cropped).jpg',
    credit: { creator: 'Nikolay Karazin' },
    license: { id: 'public-domain' }
  }
})
