import { definePerson } from '../../schema'

export default definePerson({
  id: 'morgan-shuster',
  names: [
    { text: 'Morgan Shuster', lang: 'en', role: 'primary' },
    { text: 'مورگان شوستر', lang: 'fa', role: 'native' },
    {
      text: 'William Morgan Shuster',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-bonakdarian-great-britain-iii',
          loc: { section: 'GREAT BRITAIN iii. British influence in Persia, 1900-21', para: '36' }
        }
      ]
    },
    {
      text: 'Morgan Schuster',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-2',
          loc: { section: 'Chronology of Iranian History Part 2, 1911' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  regions: ['iran', 'north-america'],
  roles: ['other'],
  offices: [
    {
      title: 'Treasurer General',
      start: {
        alts: [
          {
            value: { d: '1911' },
            cites: [
              {
                source: 'iranica-yarshater-chronology-part-2',
                loc: { section: 'Chronology of Iranian History Part 2, 1911' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1911-12-24' },
            cites: [
              {
                source: 'iranica-bonakdarian-great-britain-iii',
                loc: {
                  section: 'GREAT BRITAIN iii. British influence in Persia, 1900-21',
                  para: '42'
                }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-2',
          loc: { section: 'Chronology of Iranian History Part 2, 1911' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'career',
      quotes: [
        {
          id: 'q1',
          text: '1911 Morgan Schuster, an American financial advisor, arrives with his sixteen-member team to oversee financial reforms and assumes the position of Treasurer General; he enjoys the support of the Social Democrats but is opposed by the Russians who view him as pro-British.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1911' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-2/'
          }
        },
        {
          id: 'q2',
          text: 'Acting in accord with the Constitutionalists and quite independently from the Russians and the British, Shuster soon caused Russian hostility.',
          lang: 'en',
          cite: {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '46'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
          }
        },
        {
          id: 'q3',
          text: 'He also published a letter in The Times denouncing Russian and British policies; the letter was also printed in Tehran in a Persian translation as Maktub-e ruz-nāma (Eng. text, in Shuster, Appendix-C, pp. 359-71; Kazemzadeh, 1968, pp. 613-15, 631).',
          lang: 'en',
          cite: {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '46'
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
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/1a/SHUSTER%2C_W.M._HONORABLE_LCCN2016856902.jpg/1280px-SHUSTER%2C_W.M._HONORABLE_LCCN2016856902.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:SHUSTER,_W.M._HONORABLE_LCCN2016856902.jpg',
    credit: { institution: 'Library of Congress', creator: 'Harris & Ewing' },
    license: { id: 'public-domain' }
  },
  archive: [
    {
      id: 'shuster-strangling-of-persia-1912',
      mediaKind: 'document',
      title: 'The strangling of Persia; a story of the European diplomacy and oriental intrigue that resulted in the denationalization of twelve million Mohammedans, a personal narrative',
      date: { d: '1912' },
      url: 'https://archive.org/download/stranglingpersi00shusgoog/stranglingpersi00shusgoog.pdf',
      page: 'https://archive.org/details/stranglingpersi00shusgoog',
      credit: {
        institution: 'Harvard University (Internet Archive)',
        creator: 'Shuster, W. Morgan (William Morgan), 1877-1960'
      },
      license: { id: 'public-domain' },
      bytes: 17327586
    }
  ]
})
