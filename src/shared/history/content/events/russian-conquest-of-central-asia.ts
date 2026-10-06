import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'russian-conquest-of-central-asia',
  names: [
    { text: 'Russian conquest of Central Asia', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  type: 'invasion',
  start: {
    alts: [
      {
        value: { d: '1865' },
        cites: [
          {
            source: 'loc-uzbekistan-country-study-1996',
            loc: { section: 'The Russian Conquest', para: '2' }
          }
        ]
      }
    ]
  },
  end: {
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
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Elena Andreeva' }
        ]
      },
      {
        value: { d: '1876' },
        cites: [
          {
            source: 'loc-uzbekistan-country-study-1996',
            loc: { section: 'The Russian Conquest', para: '2' }
          },
          {
            source: 'loc-uzbekistan-country-study-1996',
            loc: { section: 'The Russian Conquest', para: '3' }
          }
        ],
        heldBy: [
          { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
        ]
      }
    ]
  },
  regions: ['russia-central-asia', 'iran'],
  prominence: 2,
  places: [
    {
      ref: 'place:tashkent',
      cites: [
        {
          source: 'loc-uzbekistan-country-study-1996',
          loc: { section: 'The Russian Conquest', para: '2' }
        }
      ]
    },
    {
      ref: 'place:samarkand',
      cites: [
        {
          source: 'loc-uzbekistan-country-study-1996',
          loc: { section: 'The Russian Conquest', para: '2' }
        }
      ]
    },
    {
      ref: 'place:bukhara',
      cites: [
        {
          source: 'loc-uzbekistan-country-study-1996',
          loc: { section: 'The Russian Conquest', para: '2' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:reign-of-alexander-ii' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
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
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'Following the Crimean War, the regime revived its expansionist policies.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '16' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/6.htm' }
        },
        {
          id: 'q3',
          text: 'As soon as the Russian conquest of the Caucasus was completed in the late 1850s, therefore, the Russian Ministry of War began to send military forces against the Central Asian khanates.',
          lang: 'en',
          cite: {
            source: 'loc-uzbekistan-country-study-1996',
            loc: { section: 'The Russian Conquest', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/uzbekistan/8.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q4',
          text: 'The treaties establishing the protectorates over Bukhoro and Khiva gave Russia control of the foreign relations of these states and gave Russian merchants important concessions in foreign trade; the khanates retained control of their own internal affairs. Tashkent and Quqon fell directly under a Russian governor general.',
          lang: 'en',
          cite: {
            source: 'loc-uzbekistan-country-study-1996',
            loc: { section: 'The Russian Conquest', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/uzbekistan/8.htm' }
        },
        {
          id: 'q5',
          text: 'To avoid alarming Britain, which had strong interests in protecting nearby India, Russia left the Bukhoran territories directly bordering Afghanistan and Persia nominally independent.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '16' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/6.htm' }
        },
        {
          id: 'q6',
          text: 'The seemingly irresistible advance of the Russian troops and the brilliant victories they achieved over hordes of Central Asian warriors should have created a common interest between Britain and Iran in resisting Russia’s approach to Khorasan and Herat. In January, 1869, Nāṣer-al-dīn Shah told the departing British Minister, Charles Alison, that the closest intimacy should exist between the two states now that Russia was making such advances in Central Asia (Alison to Clarendon, No. 2, Tehran, January 11, 1869, F.O. 60/318).',
          lang: 'en',
          cite: {
            source: 'iranica-kazemzadeh-anglo-iranian-relations-qajar',
            loc: { section: 'ANGLO-IRANIAN RELATIONS ii. The Qajar Period', para: '28' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/anglo-iranian-relations-ii/'
          }
        },
        {
          id: 'q7',
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
          id: 'q8',
          text: 'From the 1860s to the early 20th century, Great Britain became Russia’s most important rival on the international stage.',
          lang: 'en',
          cite: {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '34'
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
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1865' },
            cites: [
              {
                source: 'loc-uzbekistan-country-study-1996',
                loc: { section: 'The Russian Conquest', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'Three major population centers of the khanates--Tashkent, Bukhoro, and Samarqand--were captured in 1865, 1867, and 1868, respectively.',
        lang: 'en',
        cite: {
          source: 'loc-uzbekistan-country-study-1996',
          loc: { section: 'The Russian Conquest', para: '2' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/uzbekistan/8.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1866' },
            cites: [
              {
                source: 'loc-russia-country-study-1996',
                loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '16' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'The capture of Tashkent was a significant victory over the Quqon (Kokand) Khanate, part of which was annexed in 1866.',
        lang: 'en',
        cite: {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '16' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/6.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1867' },
            cites: [
              {
                source: 'loc-russia-country-study-1996',
                loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '16' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'By 1867 Russian forces had captured enough territory to form the Guberniya (Governorate General) of Turkestan, the capital of which was Tashkent.',
        lang: 'en',
        cite: {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '16' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/6.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1868' },
            cites: [
              {
                source: 'loc-russia-country-study-1996',
                loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '16' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'The Bukhoro (Bukhara) Khanate then lost the crucial Samarqand area to Russian forces in 1868.',
        lang: 'en',
        cite: {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '16' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/6.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1868' },
            cites: [
              {
                source: 'loc-uzbekistan-country-study-1996',
                loc: { section: 'The Russian Conquest', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'In 1868 the Khanate of Bukhoro signed a treaty with Russia making Bukhoro a Russian protectorate.',
        lang: 'en',
        cite: {
          source: 'loc-uzbekistan-country-study-1996',
          loc: { section: 'The Russian Conquest', para: '2' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/uzbekistan/8.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1873' },
            cites: [
              {
                source: 'loc-uzbekistan-country-study-1996',
                loc: { section: 'The Russian Conquest', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'Khiva became a Russian protectorate in 1873, and the Quqon Khanate finally was incorporated into the Russian Empire, also as a protectorate, in 1876.',
        lang: 'en',
        cite: {
          source: 'loc-uzbekistan-country-study-1996',
          loc: { section: 'The Russian Conquest', para: '2' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/uzbekistan/8.htm' }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d2/%D0%93%D0%BB%D0%B0%D0%B2%D0%BD%D0%B0%D1%8F_%D1%83%D0%BB%D0%B8%D1%86%D0%B0_%D0%B2_%D0%A1%D0%B0%D0%BC%D0%B0%D1%80%D0%BA%D0%B0%D0%BD%D0%B4%D0%B5_%D1%81_%D0%B2%D1%8B%D1%81%D0%BE%D1%82%D1%8B_%D1%86%D0%B8%D1%82%D0%B0%D0%B4%D0%B5%D0%BB%D0%B8_%D1%80%D0%B0%D0%BD%D0%BD%D0%B8%D0%BC_%D1%83%D1%82%D1%80%D0%BE%D0%BC.jpg/1280px-%D0%93%D0%BB%D0%B0%D0%B2%D0%BD%D0%B0%D1%8F_%D1%83%D0%BB%D0%B8%D1%86%D0%B0_%D0%B2_%D0%A1%D0%B0%D0%BC%D0%B0%D1%80%D0%BA%D0%B0%D0%BD%D0%B4%D0%B5_%D1%81_%D0%B2%D1%8B%D1%81%D0%BE%D1%82%D1%8B_%D1%86%D0%B8%D1%82%D0%B0%D0%B4%D0%B5%D0%BB%D0%B8_%D1%80%D0%B0%D0%BD%D0%BD%D0%B8%D0%BC_%D1%83%D1%82%D1%80%D0%BE%D0%BC.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:%D0%93%D0%BB%D0%B0%D0%B2%D0%BD%D0%B0%D1%8F_%D1%83%D0%BB%D0%B8%D1%86%D0%B0_%D0%B2_%D0%A1%D0%B0%D0%BC%D0%B0%D1%80%D0%BA%D0%B0%D0%BD%D0%B4%D0%B5_%D1%81_%D0%B2%D1%8B%D1%81%D0%BE%D1%82%D1%8B_%D1%86%D0%B8%D1%82%D0%B0%D0%B4%D0%B5%D0%BB%D0%B8_%D1%80%D0%B0%D0%BD%D0%BD%D0%B8%D0%BC_%D1%83%D1%82%D1%80%D0%BE%D0%BC.jpg',
    credit: { creator: 'Vasily Vereshchagin' },
    license: { id: 'public-domain' }
  }
})
