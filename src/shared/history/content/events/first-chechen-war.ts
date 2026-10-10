import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'first-chechen-war',
  names: [
    { text: 'First Chechen War', lang: 'en', role: 'primary' },
    { text: 'Первая чеченская война', lang: 'ru', role: 'native' },
    {
      text: 'War in Chechnya',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'hrw-1997-world-report-the-russian-federation',
          loc: { section: 'The Russian Federation', para: '3' }
        }
      ]
    }
  ],
  researched: '2026-10-10',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1994-12' },
        cites: [
          {
            source: 'hrw-1997-world-report-the-russian-federation',
            loc: { section: 'The Russian Federation', para: '3' }
          },
          {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Movements Toward Sovereignty, Chechnya', para: '20' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1996-08' },
        cites: [
          {
            source: 'hrw-1997-world-report-the-russian-federation',
            loc: { section: 'The Russian Federation', para: '2' }
          }
        ]
      }
    ]
  },
  regions: ['russia-central-asia'],
  prominence: 2,
  places: [
    {
      ref: 'place:grozny',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Movements Toward Sovereignty, Chechnya', para: '19' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'russia',
      name: 'Russian federal forces',
      cites: [
        {
          source: 'hrw-1997-russia-chechnya-background',
          loc: { section: 'Russia/Chechnya: Background', para: '1' }
        }
      ]
    },
    {
      key: 'chechen',
      name: 'Chechen forces',
      cites: [
        {
          source: 'hrw-1997-russia-chechnya-background',
          loc: { section: 'Russia/Chechnya: Background', para: '1' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:boris-yeltsin',
      role: 'head-of-state',
      side: 'russia',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Movements Toward Sovereignty, Chechnya', para: '20' }
        }
      ]
    },
    {
      name: 'Dzhokhar Dudayev',
      role: 'leader',
      side: 'chechen',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Movements Toward Sovereignty, Chechnya', para: '19' }
        }
      ]
    },
    {
      name: 'Pavel Grachev',
      role: 'commander',
      side: 'russia',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Movements Toward Sovereignty, Chechnya', para: '20' }
        }
      ]
    },
    {
      name: 'Alexander Lebed',
      role: 'negotiator',
      side: 'russia',
      cites: [
        {
          source: 'hrw-1997-russia-chechnya-background',
          loc: { section: 'Russia/Chechnya: Background', para: '1' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'civilian-deaths',
      value: {
        alts: [
          {
            value: { min: 50000 },
            cites: [
              {
                source: 'hrw-1997-russia-chechnya-background',
                loc: { section: 'Russia/Chechnya: Background', para: '1' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'Human Rights Watch' }
            ]
          }
        ]
      }
    },
    {
      key: 'military-deaths',
      side: 'russia',
      value: {
        alts: [
          {
            value: { min: 3826 },
            cites: [
              {
                source: 'hrw-1997-russia-chechnya-background',
                loc: { section: 'Russia/Chechnya: Background', para: '1' }
              },
              {
                source: 'hrw-1997-russia-chechnya-background',
                loc: { section: 'Russia/Chechnya: Background', para: '4' }
              }
            ],
            heldBy: [
              { kind: 'participant', name: 'Alexander Lebed' }
            ]
          },
          {
            value: { min: 4379 },
            cites: [
              {
                source: 'hrw-1997-russia-chechnya-background',
                loc: { section: 'Russia/Chechnya: Background', para: '1' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'Memorial Human Rights Center' }
            ]
          }
        ]
      }
    }
  ],
  related: [
    {
      ref: 'event:dissolution-of-the-soviet-union',
      rel: 'caused-by',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Movements Toward Sovereignty, Chechnya', para: '19' }
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
          text: 'Twenty months of war devastated the Russian Federation\'s republic of Chechnya, killing at least 50,000 civilians -about 5 percent of the republic\'s pre-war population of 1.1 million.',
          lang: 'en',
          cite: {
            source: 'hrw-1997-russia-chechnya-background',
            loc: { section: 'Russia/Chechnya: Background', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/legacy/reports/1997/russia2/Russia-01.htm'
          }
        },
        {
          id: 'q2',
          text: 'Chechnya was one of the heaviest burdens Yeltsin carried during the 1996 presidential election campaign.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Movements Toward Sovereignty, Chechnya', para: '21' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/russia/36.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'The only autonomous jurisdictions that refused to sign the 1992 Federation Treaty were Chechnya and Tatarstan, both of which are rich in oil.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Movements Toward Sovereignty, Chechnya', para: '16' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/russia/36.htm' }
        },
        {
          id: 'q4',
          text: 'In September 1991, the government of the Chechen-Ingush Autonomous Republic resigned under pressure from the proindependence Congress of the Chechen People, whose leader was former Soviet air force general Dzhokar Dudayev.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Movements Toward Sovereignty, Chechnya', para: '19' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/russia/36.htm' }
        },
        {
          id: 'q5',
          text: 'The Chechen-Ingush Autonomous Republic split in two in June 1992.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Movements Toward Sovereignty, Chechnya', para: '20' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/russia/36.htm' }
        },
        {
          id: 'q6',
          text: 'In August 1994, when an opposition faction launched an armed campaign to topple Dudayev\'s government, Moscow supplied the rebel forces with military equipment, and Russian aircraft began to bomb Groznyy.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Movements Toward Sovereignty, Chechnya', para: '20' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/russia/36.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q7',
          text: 'The Russian government\'s expectations of a quick surgical strike followed by Chechen capitulation were misguided.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Movements Toward Sovereignty, Chechnya', para: '21' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/russia/36.htm' }
        },
        {
          id: 'q8',
          text: 'In January 1996, the destruction of the Dagestani border village of Pervomayskoye by Russian forces in reaction to Chechen hostage taking brought strong criticism from the hitherto loyal Republic of Dagestan and escalated domestic dissatisfaction.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Movements Toward Sovereignty, Chechnya', para: '22' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/russia/36.htm' }
        },
        {
          id: 'q9',
          text: 'As of this writing, nearly all of the 55,000 Russian troops have withdrawn from Chechnya in time for the January 27 presidential election, a key condition of the agreements.',
          lang: 'en',
          cite: {
            source: 'hrw-1997-russia-chechnya-background',
            loc: { section: 'Russia/Chechnya: Background', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/legacy/reports/1997/russia2/Russia-01.htm'
          }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q10',
          text: 'From the very beginning, the war was characterized by massive, appalling violations of humanitarian law.',
          lang: 'en',
          cite: {
            source: 'hrw-1997-russia-chechnya-background',
            loc: { section: 'Russia/Chechnya: Background', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/legacy/reports/1997/russia2/Russia-01.htm'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q11',
          text: 'The Khasavyurt agreements postponed a final decision on the legal status of Chechnya until December 31, 2001.',
          lang: 'en',
          cite: {
            source: 'hrw-1997-russia-chechnya-background',
            loc: { section: 'Russia/Chechnya: Background', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/legacy/reports/1997/russia2/Russia-01.htm'
          }
        },
        {
          id: 'q12',
          text: 'The protracted war in Chechnya, which generated many reports of violence against civilians, ignited fear and contempt toward Russia among many other ethnic groups in the federation.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Movements Toward Sovereignty, Chechnya', para: '21' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/russia/36.htm' }
        },
        {
          id: 'q13',
          text: 'Russia began military airstrikes and a ground campaign in Chechnya in late September 1999, about 3 years after fighting in 1994-1996 had ended with peace accords.',
          lang: 'en',
          cite: {
            source: 'crs-2000-renewed-chechnya-conflict-developments-in-1999-2000',
            loc: { section: 'Renewed Chechnya Conflict: Developments in 1999-2000', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.everycrsreport.com/reports/RL30389.html'
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
            value: { d: '1994-12' },
            cites: [
              {
                source: 'loc-russia-country-study-1996',
                loc: { section: 'Movements Toward Sovereignty, Chechnya', para: '20' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'In December, five days after Dudayev and Minister of Defense Pavel Grachev of Russia had agreed to avoid the further use of force, Russian troops invaded Chechnya.',
        lang: 'en',
        cite: {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Movements Toward Sovereignty, Chechnya', para: '20' }
        },
        provenance: { via: 'web', at: '2026-10-10', url: 'http://countrystudies.us/russia/36.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1995-07' },
            cites: [
              {
                source: 'hrw-1997-russia-chechnya-background',
                loc: { section: 'Russia/Chechnya: Background', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'Two previous cease-fire agreements - in July 1995, following the Budyennovsk hostage raid, and in June 1996, on the eve of presidential elections in Russia - collapsed soon after they were signed.',
        lang: 'en',
        cite: {
          source: 'hrw-1997-russia-chechnya-background',
          loc: { section: 'Russia/Chechnya: Background', para: '2' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://www.hrw.org/legacy/reports/1997/russia2/Russia-01.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1996-08' },
            cites: [
              {
                source: 'hrw-1997-world-report-the-russian-federation',
                loc: { section: 'The Russian Federation', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'The Khasavyurt agreements, signed after intense fighting in Grozny threatened utterly to rout Russian forces, have held and are far more comprehensive than their predecessors.',
        lang: 'en',
        cite: {
          source: 'hrw-1997-russia-chechnya-background',
          loc: { section: 'Russia/Chechnya: Background', para: '2' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://www.hrw.org/legacy/reports/1997/russia2/Russia-01.htm'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/3c/Evstafiev-chechnya-tank-helmet.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Evstafiev-chechnya-tank-helmet.jpg',
    credit: { creator: 'Mikhail Evstafiev' },
    license: { id: 'cc-by-sa', version: '3.0', url: 'https://creativecommons.org/licenses/by-sa/3.0/' }
  }
})
