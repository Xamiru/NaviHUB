import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'battle-of-omdurman',
  names: [
    { text: 'Battle of Omdurman', lang: 'en', role: 'primary' },
    {
      text: 'Schlacht bei Omdurman',
      lang: 'de',
      role: 'alternative',
      cites: [
        { source: 'lemo-chronik-1898', loc: { section: 'Chronik 1898', para: '47' } }
      ]
    }
  ],
  researched: '2026-10-06',
  type: 'battle',
  start: {
    alts: [
      {
        value: { d: '1898-09-02' },
        cites: [
          {
            source: 'loc-sudan-country-study-1991',
            loc: { section: 'Reconquest of Sudan', para: '3' }
          },
          { source: 'lemo-chronik-1898', loc: { section: 'Chronik 1898', para: '46' } }
        ]
      }
    ]
  },
  regions: ['subsaharan-africa', 'mena'],
  prominence: 2,
  places: [
    {
      ref: 'place:omdurman',
      cites: [
        {
          source: 'loc-sudan-country-study-1991',
          loc: { section: 'Reconquest of Sudan', para: '3' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:mahdiyah' }
  ],
  sides: [
    {
      key: 'anglo-egyptian',
      name: 'Anglo-Egyptian force',
      cites: [
        {
          source: 'loc-sudan-country-study-1991',
          loc: { section: 'Reconquest of Sudan', para: '3' }
        }
      ]
    },
    {
      key: 'mahdists',
      name: 'Mahdists',
      cites: [
        {
          source: 'loc-sudan-country-study-1991',
          loc: { section: 'Reconquest of Sudan', para: '3' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'Herbert Kitchener',
      role: 'commander',
      side: 'anglo-egyptian',
      cites: [
        {
          source: 'loc-sudan-country-study-1991',
          loc: { section: 'Reconquest of Sudan', para: '1' }
        },
        { source: 'lemo-chronik-1898', loc: { section: 'Chronik 1898', para: '47' } }
      ]
    },
    {
      name: 'Khalifa',
      role: 'commander',
      side: 'mahdists',
      cites: [
        {
          source: 'loc-sudan-country-study-1991',
          loc: { section: 'Reconquest of Sudan', para: '3' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'combatants',
      side: 'mahdists',
      value: {
        alts: [
          {
            value: { min: 52000 },
            cites: [
              {
                source: 'loc-sudan-country-study-1991',
                loc: { section: 'Reconquest of Sudan', para: '3' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
            ]
          }
        ]
      }
    },
    {
      key: 'combatants',
      side: 'anglo-egyptian',
      value: {
        alts: [
          {
            value: { min: 25800 },
            cites: [
              {
                source: 'loc-sudan-country-study-1991',
                loc: { section: 'Reconquest of Sudan', para: '2' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
            ]
          }
        ]
      }
    },
    {
      key: 'deaths',
      side: 'mahdists',
      value: {
        alts: [
          {
            value: { min: 11000, qualifier: 'about' },
            cites: [
              {
                source: 'loc-sudan-country-study-1991',
                loc: { section: 'Reconquest of Sudan', para: '3' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
            ]
          }
        ]
      }
    },
    {
      key: 'deaths',
      side: 'anglo-egyptian',
      value: {
        alts: [
          {
            value: { min: 48 },
            cites: [
              {
                source: 'loc-sudan-country-study-1991',
                loc: { section: 'Reconquest of Sudan', para: '3' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
            ]
          }
        ]
      }
    },
    {
      key: 'wounded',
      side: 'anglo-egyptian',
      value: {
        alts: [
          {
            value: { min: 400, qualifier: 'up-to' },
            cites: [
              {
                source: 'loc-sudan-country-study-1991',
                loc: { section: 'Reconquest of Sudan', para: '3' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
            ]
          }
        ]
      }
    }
  ],
  related: [
    {
      ref: 'period:anglo-egyptian-sudan',
      rel: 'led-to',
      cites: [
        {
          source: 'loc-sudan-country-study-1991',
          loc: { section: 'THE ANGLO-EGYPTIAN CONDOMINIUM, 1899-1955', para: '1' }
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
          text: 'In 1892 Herbert Kitchener (later Lord Kitchener) became sirdar, or commander, of the Egyptian army and started preparations for the reconquest of Sudan.',
          lang: 'en',
          cite: {
            source: 'loc-sudan-country-study-1991',
            loc: { section: 'Reconquest of Sudan', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/sudan/14.htm' }
        },
        {
          id: 'q2',
          text: 'Britain feared that the other colonial powers would take advantage of Sudan\'s instability to acquire territory previously annexed to Egypt.',
          lang: 'en',
          cite: {
            source: 'loc-sudan-country-study-1991',
            loc: { section: 'Reconquest of Sudan', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/sudan/14.htm' }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q3',
          text: 'On September 2, 1898, the Khalifa committed his 52,000-man army to a frontal assault against the Anglo-Egyptian force, which was massed on the plain outside Omdurman.',
          lang: 'en',
          cite: {
            source: 'loc-sudan-country-study-1991',
            loc: { section: 'Reconquest of Sudan', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/sudan/14.htm' }
        },
        {
          id: 'q4',
          text: 'The outcome never was in doubt, largely because of superior British firepower.',
          lang: 'en',
          cite: {
            source: 'loc-sudan-country-study-1991',
            loc: { section: 'Reconquest of Sudan', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/sudan/14.htm' }
        },
        {
          id: 'q5',
          text: 'Ein britisch-ägyptisches Heer unter Horatio Herbert Kitchener besiegt die Truppen des sudanesischen Mahdi in der Schlacht bei Omdurman und schlägt den 1881 begonnen Mahdi-Aufstand damit endgültig nieder.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1898', loc: { section: 'Chronik 1898', para: '47' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1898.html'
          }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q6',
          text: 'During the five-hour battle, about 11,000 Mahdists died whereas AngloEgyptian losses amounted to 48 dead and fewer than 400 wounded.',
          lang: 'en',
          cite: {
            source: 'loc-sudan-country-study-1991',
            loc: { section: 'Reconquest of Sudan', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/sudan/14.htm' }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q7',
          text: 'Mopping-up operations required several years, but organized resistance ended when the Khalifa, who had escaped to Kurdufan, died in fighting at Umm Diwaykarat in November 1899.',
          lang: 'en',
          cite: {
            source: 'loc-sudan-country-study-1991',
            loc: { section: 'Reconquest of Sudan', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/sudan/14.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1896-03' },
            cites: [
              {
                source: 'loc-sudan-country-study-1991',
                loc: { section: 'Reconquest of Sudan', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'In March 1896, the campaign started; in September, Kitchener captured Dunqulah.',
        lang: 'en',
        cite: {
          source: 'loc-sudan-country-study-1991',
          loc: { section: 'Reconquest of Sudan', para: '2' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/sudan/14.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1898-07-10' },
            cites: [
              { source: 'lemo-chronik-1898', loc: { section: 'Chronik 1898', para: '38' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'Französische Kolonialtruppen unter Jean-Baptiste Marchand (1863-1934) nehmen den Ort Faschoda am Weißen Nil, der zum britischen Interessensgebiet gehört, in Besitz.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1898', loc: { section: 'Chronik 1898', para: '39' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1898.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1898-09-18' },
            cites: [
              { source: 'lemo-chronik-1898', loc: { section: 'Chronik 1898', para: '50' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'Der britische General Kitchener erreicht Faschoda und beginnt mit den französischen Besatzern Verhandlungen zur Räumung des Gebiets, die schließlich zur Beilegung der "Faschodakrise" im Sudanvertrag 1899 führen.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1898', loc: { section: 'Chronik 1898', para: '51' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1898.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1899-03-21' },
            cites: [
              { source: 'lemo-chronik-1899', loc: { section: 'Chronik 1899', para: '16' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'Mit dem Sudan-Vertrag bereinigen Frankreich und Großbritannien die Faschodakrise und legen die Grenzen des Sudan fest: Frankreich behält den gesamten westlichen Sudan, muss aber das Niltal den Briten überlassen.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1899', loc: { section: 'Chronik 1899', para: '17' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1899.html'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f5/Sketch_map_of_the_Battle_of_Omdurman_2nd_Sept._1898.png/1280px-Sketch_map_of_the_Battle_of_Omdurman_2nd_Sept._1898.png',
    page: 'https://commons.wikimedia.org/wiki/File:Sketch_map_of_the_Battle_of_Omdurman_2nd_Sept._1898.png',
    credit: {
      institution: 'Durham University Library',
      creator: 'Great Britain. War Office. Intelligence Division'
    },
    license: { id: 'public-domain' }
  }
})
