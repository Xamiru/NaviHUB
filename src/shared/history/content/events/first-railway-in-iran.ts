import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'first-railway-in-iran',
  names: [
    { text: 'Tehran–Shah Abdol-Azim railway', lang: 'en', role: 'primary' },
    {
      text: 'Tehran-Šāh ʿAbd-al-ʿAẓim line',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-shahvar-railroads-first-railroad',
          loc: {
            section: 'Railroads i. The First Railroad Built and Operated in Persia',
            para: '4'
          }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  type: 'economic',
  start: {
    alts: [
      {
        value: { d: '1888-07' },
        cites: [
          {
            source: 'iranica-shahvar-railroads-first-railroad',
            loc: {
              section: 'Railroads i. The First Railroad Built and Operated in Persia',
              para: '4'
            }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 3,
  places: [
    {
      ref: 'place:tehran',
      cites: [
        {
          source: 'iranica-shahvar-railroads-first-railroad',
          loc: {
            section: 'Railroads i. The First Railroad Built and Operated in Persia',
            para: '1'
          }
        }
      ]
    },
    {
      ref: 'place:shah-abdol-azim-shrine',
      cites: [
        {
          source: 'iranica-shahvar-railroads-first-railroad',
          loc: {
            section: 'Railroads i. The First Railroad Built and Operated in Persia',
            para: '1'
          }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:qajar-dynasty' },
    { ref: 'period:reign-of-naser-al-din-shah-qajar' }
  ],
  participants: [
    {
      ref: 'person:naser-al-din-shah-qajar',
      role: 'head-of-state',
      cites: [
        {
          source: 'iranica-shahvar-railroads-first-railroad',
          loc: {
            section: 'Railroads i. The First Railroad Built and Operated in Persia',
            para: '4'
          }
        }
      ]
    },
    {
      name: 'Fabius Boital',
      role: 'organizer',
      cites: [
        {
          source: 'iranica-shahvar-railroads-first-railroad',
          loc: {
            section: 'Railroads i. The First Railroad Built and Operated in Persia',
            para: '1'
          }
        }
      ]
    },
    {
      name: 'Edouard Otlet',
      role: 'organizer',
      cites: [
        {
          source: 'iranica-shahvar-railroads-first-railroad',
          loc: {
            section: 'Railroads i. The First Railroad Built and Operated in Persia',
            para: '2'
          }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'During the three decades between the 1850s and the 1880s various French, Belgian, British, Russian and American concerns attempted to introduce railways to Persia, but these did not materialize, either due to lack of adequate capital or because of the Anglo-Russian rivalry',
          lang: 'en',
          cite: {
            source: 'iranica-shahvar-railroads-first-railroad',
            loc: {
              section: 'Railroads i. The First Railroad Built and Operated in Persia',
              para: '1'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/railroads/railroads-i-the-first-railroad-built-and-operated-in-persia'
          }
        },
        {
          id: 'q2',
          text: 'A railroad network, the most potent of all 19th century modernizing technologies, and a longstanding dream of any Middle Eastern reformist state, was denied to Persia primarily because of the neighboring powers’ strategic concerns.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '31'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/great-britain-ii/'
          }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q3',
          text: 'The Tehran-Šāh ʿAbd-al-ʿAẓim line was a single line, composed of an 80-centimeters gauge main line, 5.5 miles in length, connecting the capital and the shrine, and of two branch lines, 2.5 miles in length, which connected the main line with some limestone quarries in the hills south-east of the capital.',
          lang: 'en',
          cite: {
            source: 'iranica-shahvar-railroads-first-railroad',
            loc: {
              section: 'Railroads i. The First Railroad Built and Operated in Persia',
              para: '4'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/railroads/railroads-i-the-first-railroad-built-and-operated-in-persia'
          }
        },
        {
          id: 'q4',
          text: 'This did not materialize because speedy means of communications connecting the north and south of Persia ran contrary to both British and Russian interests',
          lang: 'en',
          cite: {
            source: 'iranica-shahvar-railroads-first-railroad',
            loc: {
              section: 'Railroads i. The First Railroad Built and Operated in Persia',
              para: '3'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/railroads/railroads-i-the-first-railroad-built-and-operated-in-persia'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q5',
          text: 'The train and the journey by it were clearly strange for the local population, and this caused many accidents and produced many superstitious rumors.',
          lang: 'en',
          cite: {
            source: 'iranica-shahvar-railroads-first-railroad',
            loc: {
              section: 'Railroads i. The First Railroad Built and Operated in Persia',
              para: '7'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/railroads/railroads-i-the-first-railroad-built-and-operated-in-persia'
          }
        },
        {
          id: 'q6',
          text: 'In order to allay public fears, the shah ordered high-ranking individuals and the commanders of the army to travel with him by train to Šāh ʿAbd-al-ʿAẓim.',
          lang: 'en',
          cite: {
            source: 'iranica-shahvar-railroads-first-railroad',
            loc: {
              section: 'Railroads i. The First Railroad Built and Operated in Persia',
              para: '7'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/railroads/railroads-i-the-first-railroad-built-and-operated-in-persia'
          }
        },
        {
          id: 'q7',
          text: 'Although the line continued to operate until 1962, public use of it was constantly on the decline.',
          lang: 'en',
          cite: {
            source: 'iranica-shahvar-railroads-first-railroad',
            loc: {
              section: 'Railroads i. The First Railroad Built and Operated in Persia',
              para: '8'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/railroads/railroads-i-the-first-railroad-built-and-operated-in-persia'
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
            value: { d: '1886-12' },
            cites: [
              {
                source: 'iranica-shahvar-railroads-first-railroad',
                loc: {
                  section: 'Railroads i. The First Railroad Built and Operated in Persia',
                  para: '1'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'In December 1886, a French engineer and concession-hunter by the name of Fabius Boital received a concession from Naṣer-al-Din Shah to build a small Decauville railway from the capital Tehran southwards to the Shrine of Šāh ʿAbd-al-ʿAẓim, a popular site of pilgrimage in Ray, a distance of about 6 miles.',
        lang: 'en',
        cite: {
          source: 'iranica-shahvar-railroads-first-railroad',
          loc: {
            section: 'Railroads i. The First Railroad Built and Operated in Persia',
            para: '1'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/railroads/railroads-i-the-first-railroad-built-and-operated-in-persia'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1887-05-17' },
            cites: [
              {
                source: 'iranica-shahvar-railroads-first-railroad',
                loc: {
                  section: 'Railroads i. The First Railroad Built and Operated in Persia',
                  para: '1'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'Probably due to a shortage of money, Boital sold both concessions to a Belgian company named “La Société Anonyme des Chemins de Fer et Tramways en Perse,” founded in Brussels on 17 May 1887.',
        lang: 'en',
        cite: {
          source: 'iranica-shahvar-railroads-first-railroad',
          loc: {
            section: 'Railroads i. The First Railroad Built and Operated in Persia',
            para: '1'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/railroads/railroads-i-the-first-railroad-built-and-operated-in-persia'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1888-05-31' },
            cites: [
              {
                source: 'iranica-shahvar-railroads-first-railroad',
                loc: {
                  section: 'Railroads i. The First Railroad Built and Operated in Persia',
                  para: '4'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'The main line was completed on 31 May 1888, with the opening ceremony, in the presence of the shah, taking place in July 1888.',
        lang: 'en',
        cite: {
          source: 'iranica-shahvar-railroads-first-railroad',
          loc: {
            section: 'Railroads i. The First Railroad Built and Operated in Persia',
            para: '4'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/railroads/railroads-i-the-first-railroad-built-and-operated-in-persia'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Mellat-Cinema1.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Mellat-Cinema1.jpg',
    credit: { creator: 'Pemies' },
    license: { id: 'cc-by-sa', version: '3.0' }
  }
})
