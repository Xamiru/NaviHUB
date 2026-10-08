import { definePolity } from '../../schema'

export default definePolity({
  id: 'kingdom-of-prussia',
  names: [
    { text: 'Kingdom of Prussia', lang: 'en', role: 'primary' },
    { text: 'Königreich Preußen', lang: 'de', role: 'native' }
  ],
  researched: '2026-10-08',
  polityType: 'kingdom',
  start: {
    alts: [
      {
        value: { d: '1701-01-18' },
        cites: [
          { source: 'britannica-1911-prussia', loc: { section: 'PRUSSIA', para: '103' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1918-11-09' },
        cites: [
          {
            source: 'eo1418-rohl-wilhelm-ii-german-emperor',
            loc: { section: 'Wilhelm II, German Emperor' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  capitals: [
    {
      ref: 'place:berlin',
      cites: [
        {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'Postwar Occupation and Division', para: '9' }
        }
      ]
    }
  ],
  partOf: [
    {
      ref: 'polity:german-empire',
      start: {
        alts: [
          {
            value: { d: '1871-01-18' },
            cites: [
              {
                source: 'state-dept-countries-germany',
                loc: { section: 'Germany: Summary', para: '13' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1918-11-09' },
            cites: [
              {
                source: 'eo1418-rohl-wilhelm-ii-german-emperor',
                loc: { section: 'Wilhelm II, German Emperor' }
              }
            ]
          }
        ]
      },
      cites: [
        { source: 'britannica-1911-prussia', loc: { section: 'PRUSSIA', para: '1' } }
      ]
    }
  ],
  cshapes: [
    { set: 'early', code: 27306 },
    { set: 'europe', code: 255, to: 1871.05 }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/3b/Preu%C3%9Fen-_Friedrich_I._-_M%C3%BCnzkabinett%2C_Berlin_-_5555138.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Preu%C3%9Fen-_Friedrich_I._-_M%C3%BCnzkabinett,_Berlin_-_5555138.jpg',
    credit: { institution: 'Münzkabinett, Staatliche Museen zu Berlin' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'PRUSSIA (Ger. Preussen; Lat. Borussia), a kingdom of Germany, and the largest, most populous and most important state of the German Empire.',
          lang: 'en',
          cite: { source: 'britannica-1911-prussia', loc: { section: 'PRUSSIA', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Prussia'
          }
        },
        {
          id: 'q2',
          text: 'Frederick II (r. 1740-86), known to posterity as Frederick the Great, continued along the same lines as his father but showed much greater imagination and ruthlessness, transforming his small kingdom into one of the great powers of Europe.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Austria and Prussia', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/germany/20.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'The name of Prussia is derived from the dukedom of Prussia (the present province of East Prussia), which was raised into a kingdom by the emperor in favour of Frederick III., elector of Brandenburg, on the 18th of January 1701.',
          lang: 'en',
          cite: { source: 'britannica-1911-prussia', loc: { section: 'PRUSSIA', para: '103' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Prussia'
          }
        },
        {
          id: 'q4',
          text: 'Brandenburg became known as Prussia in 1701 when its ruler crowned himself King Frederick I of Prussia.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Austria and Prussia', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/germany/20.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'In 1862 King Wilhelm I of Prussia (r. 1858-88) chose Bismarck to serve as his minister president.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Bismarck and Unification', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/germany/27.htm' }
        },
        {
          id: 'q6',
          text: 'Bismarck used a diplomatic dispute to provoke Austria to declare war on Prussia in 1866. Against expectations, Prussia quickly won the Seven Weeks\' War (also known as the Austro-Prussian War) against Austria and its south German allies.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Bismarck and Unification', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/germany/27.htm' }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q7',
          text: 'Alternative proposals, such as allowing Wilhelm to relinquish the imperial crown but remain as King of Prussia were dismissed. Faced with revolution across Germany, close to midday on 9 November 1918, Prince Max announced Wilhelm’s abdication as Kaiser and King in a desperate attempt to keep control.',
          lang: 'en',
          cite: {
            source: 'eo1418-rohl-wilhelm-ii-german-emperor',
            loc: { section: 'Wilhelm II, German Emperor' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://encyclopedia.1914-1918-online.net/article/wilhelm-ii-german-emperor/'
          }
        },
        {
          id: 'q8',
          text: 'On 25 February 1947, the Allied Control Council abolished the state of Prussia, “which from the early days has been a bearer of militarism and reaction in Germany”.',
          lang: 'en',
          cite: {
            source: 'eo1418-mulligan-historiography-of-the-origins-of-the-first-world-war',
            loc: { section: 'The Historiography of the Origins of the First World War' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://encyclopedia.1914-1918-online.net/article/the-historiography-of-the-origins-of-the-first-world-war/'
          }
        }
      ]
    }
  ],
  furtherReading: [
    { source: 'haffner-1979-preussen-ohne-legende', perspective: 'european' }
  ]
})
