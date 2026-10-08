import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'spanish-civil-war',
  names: [
    { text: 'Spanish Civil War', lang: 'en', role: 'primary' },
    { text: 'Guerra Civil Española', lang: 'es', role: 'native' },
    {
      text: 'Guerra de España',
      lang: 'es',
      role: 'alternative',
      cites: [
        { source: 'boe-ley-20-2022-memoria-democratica', loc: { section: 'Preámbulo, I' } }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1936-07-17' },
        cites: [
          { source: 'lemo-chronik-1936', loc: { section: 'Chronik 1936', para: '102' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1939-03-31' },
        cites: [
          {
            source: 'loc-spain-country-study-1988',
            loc: { section: 'THE SPANISH CIVIL WAR', para: '15' }
          },
          {
            source: 'lemo-biografie-francisco-franco',
            loc: { section: 'Francisco Franco 1892-1975', para: '49' }
          },
          {
            source: 'lemo-biografie-francisco-franco',
            loc: { section: 'Francisco Franco 1892-1975', para: '52' }
          }
        ]
      },
      {
        value: { d: '1939-02-27' },
        cites: [
          { source: 'lemo-chronik-1939', loc: { section: 'Chronik 1939', para: '30' } }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 1,
  places: [
    {
      ref: 'place:madrid',
      cites: [
        {
          source: 'loc-spain-country-study-1988',
          loc: { section: 'THE SPANISH CIVIL WAR', para: '2' }
        },
        {
          source: 'loc-spain-country-study-1988',
          loc: { section: 'THE SPANISH CIVIL WAR', para: '6' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'nationalists',
      name: 'Nationalists',
      cites: [
        {
          source: 'loc-spain-country-study-1988',
          loc: { section: 'THE SPANISH CIVIL WAR', para: '2' }
        }
      ]
    },
    {
      key: 'republicans',
      name: 'Republicans',
      cites: [
        {
          source: 'loc-spain-country-study-1988',
          loc: { section: 'THE SPANISH CIVIL WAR', para: '6' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:francisco-franco',
      role: 'commander',
      side: 'nationalists',
      cites: [
        {
          source: 'loc-spain-country-study-1988',
          loc: { section: 'THE SPANISH CIVIL WAR', para: '2' }
        },
        {
          source: 'loc-spain-country-study-1988',
          loc: { section: 'THE SPANISH CIVIL WAR', para: '3' }
        }
      ]
    },
    {
      name: 'Emilio Mola',
      role: 'commander',
      side: 'nationalists',
      cites: [
        {
          source: 'loc-spain-country-study-1988',
          loc: { section: 'THE SPANISH CIVIL WAR', para: '2' }
        }
      ]
    },
    {
      name: 'Francisco Largo Caballero',
      role: 'head-of-government',
      side: 'republicans',
      cites: [
        {
          source: 'loc-spain-country-study-1988',
          loc: { section: 'THE SPANISH CIVIL WAR', para: '12' }
        }
      ]
    },
    {
      name: 'Juan Negrin',
      role: 'head-of-government',
      side: 'republicans',
      cites: [
        {
          source: 'loc-spain-country-study-1988',
          loc: { section: 'THE SPANISH CIVIL WAR', para: '13' }
        }
      ]
    },
    {
      ref: 'person:benito-mussolini',
      role: 'participant',
      side: 'nationalists',
      cites: [
        {
          source: 'loc-spain-country-study-1988',
          loc: { section: 'THE SPANISH CIVIL WAR', para: '9' }
        }
      ]
    },
    {
      ref: 'person:adolf-hitler',
      role: 'participant',
      side: 'nationalists',
      cites: [
        { source: 'lemo-chronik-1936', loc: { section: 'Chronik 1936', para: '107' } }
      ]
    }
  ],
  figures: [
    {
      key: 'deaths',
      value: {
        alts: [
          {
            value: { min: 600000 },
            cites: [
              {
                source: 'loc-spain-country-study-1988',
                loc: { section: 'THE SPANISH CIVIL WAR', para: '16' }
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
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'Calvo Sotelo was murdered in July 1936, supposedly in retaliation for the killing of a police officer by fascists. Calvo Sotelo\'s death was a signal to the army to act on the pretext that the civilian government had allowed the country to fall into disorder. The army issued a pronunciamiento.',
          lang: 'en',
          cite: {
            source: 'loc-spain-country-study-1988',
            loc: { section: 'THE SPANISH CIVIL WAR', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/spain/21.htm' }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q15',
          text: 'In 1936 Germany began closer relations with fascist Italy, a pariah state because of its invasion of Ethiopia the year before. The two antidemocratic states joined together to assist General Francisco Franco in overthrowing Spain\'s republican government during the Spanish Civil War (1936-39).',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The Third Reich: Foreign Policy', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/germany/40.htm' }
        },
        {
          id: 'q16',
          text: 'In Morocco, elite units seized control under Franco, Spain\'s youngest general and hero. Transport supplied by Germany and Italy ferried Franco\'s African army, including Moorish auxiliaries, to Andalusia.',
          lang: 'en',
          cite: {
            source: 'loc-spain-country-study-1988',
            loc: { section: 'THE SPANISH CIVIL WAR', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/spain/21.htm' }
        },
        {
          id: 'q3',
          text: 'Throughout the Civil War, the industrial areas--except Asturias and the Basque provinces--remained in Republican hands, while the chief food-producing areas were under Nationalist control.',
          lang: 'en',
          cite: {
            source: 'loc-spain-country-study-1988',
            loc: { section: 'THE SPANISH CIVIL WAR', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/spain/21.htm' }
        },
        {
          id: 'q4',
          text: 'The German Condor Legion, made infamous by the bombing of Guernica, provided air support for the Nationalists and tested the tactics and the equipment used a few years later by the Luftwaffe (German air force).',
          lang: 'en',
          cite: {
            source: 'loc-spain-country-study-1988',
            loc: { section: 'THE SPANISH CIVIL WAR', para: '9' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/spain/21.htm' }
        },
        {
          id: 'q5',
          text: 'The net effect of the nonintervention agreement was to cut off French and British aid to the republic. Germany and Italy did not observe the agreement. The Soviet Union was not a signatory.',
          lang: 'en',
          cite: {
            source: 'loc-spain-country-study-1988',
            loc: { section: 'THE SPANISH CIVIL WAR', para: '10' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/spain/21.htm' }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q6',
          text: 'There is as much controversy over the number of casualties of the Spanish Civil War as there is about the results of the 1936 election, but even conservative estimates are high. The most consistent estimate is 600,000 dead from all causes, including combat, bombing, and executions. In the Republican sector, tens of thousands died of starvation, and several hundred thousand more fled from Spain.',
          lang: 'en',
          cite: {
            source: 'loc-spain-country-study-1988',
            loc: { section: 'THE SPANISH CIVIL WAR', para: '16' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/spain/21.htm' }
        }
      ]
    },
    {
      kind: 'memory',
      quotes: [
        {
          id: 'q7',
          text: 'El último de ellos, protagonizado por la Segunda República Española y sus avanzadas reformas políticas y sociales, fue interrumpido por un golpe de Estado y una cruenta guerra que contó con el apoyo de unidades regulares de las Fuerzas Armadas de Italia y Alemania y sus respectivos Gobiernos, que intervinieron en territorio español',
          lang: 'es',
          cite: { source: 'boe-ley-20-2022-memoria-democratica', loc: { section: 'Preámbulo, I' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.boe.es/buscar/act.php?id=BOE-A-2022-17099'
          }
        },
        {
          id: 'q8',
          text: 'El régimen franquista impuso desde sus inicios una poderosa política de memoria que excluía, criminalizaba, estigmatizaba e invisibilizaba radicalmente a las víctimas vencidas tras el triunfo del golpe militar contra la República legalmente constituida.',
          lang: 'es',
          cite: { source: 'boe-ley-20-2022-memoria-democratica', loc: { section: 'Preámbulo, I' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.boe.es/buscar/act.php?id=BOE-A-2022-17099'
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
            value: { d: '1936-10-01' },
            cites: [
              { source: 'lemo-chronik-1936', loc: { section: 'Chronik 1936', para: '146' } },
              {
                source: 'loc-spain-country-study-1988',
                loc: { section: 'THE SPANISH CIVIL WAR', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q17',
        text: 'In October 1936, Franco was named head of state, with the rank of generalissimo and the title el caudillo (the leader).',
        lang: 'en',
        cite: {
          source: 'loc-spain-country-study-1988',
          loc: { section: 'THE SPANISH CIVIL WAR', para: '3' }
        },
        provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/spain/21.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1937-04-26' },
            cites: [
              { source: 'lemo-chronik-1937', loc: { section: 'Chronik 1937', para: '60' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'Das deutsche Flugzeuggeschwader der "Legion Condor" zerstört in einem dreistündigen Bombenangriff die nordspanische Kleinstadt Guernica.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1937', loc: { section: 'Chronik 1937', para: '61' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1937.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1938-04-15' },
            cites: [
              { source: 'lemo-chronik-1938', loc: { section: 'Chronik 1938', para: '73' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'Die faschistischen Truppen des Generals Francisco Franco erreichen in Aragonien die östliche Mittelmeerküste. Damit ist das Gebiet der Republikaner in zwei Teile getrennt.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1938', loc: { section: 'Chronik 1938', para: '74' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1938.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1939-01-26' },
            cites: [
              { source: 'lemo-chronik-1939', loc: { section: 'Chronik 1939', para: '13' } },
              {
                source: 'loc-spain-country-study-1988',
                loc: { section: 'THE SPANISH CIVIL WAR', para: '15' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q18',
        text: 'Barcelona fell to the Nationalists in January 1939, and Valencia, the temporary capital, fell in March.',
        lang: 'en',
        cite: {
          source: 'loc-spain-country-study-1988',
          loc: { section: 'THE SPANISH CIVIL WAR', para: '15' }
        },
        provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/spain/21.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1939-03-28' },
            cites: [
              { source: 'lemo-chronik-1939', loc: { section: 'Chronik 1939', para: '56' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'Francos Truppen ziehen kampflos in Madrid ein.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1939', loc: { section: 'Chronik 1939', para: '57' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1939.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1939-03-31' },
            cites: [
              {
                source: 'loc-spain-country-study-1988',
                loc: { section: 'THE SPANISH CIVIL WAR', para: '15' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'When factional fighting broke out in Madrid among the city\'s defenders, the Republican army commander seized control of what remained of the government and surrendered to the Nationalists on the last day of March, thus ending the Civil War.',
        lang: 'en',
        cite: {
          source: 'loc-spain-country-study-1988',
          loc: { section: 'THE SPANISH CIVIL WAR', para: '15' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/spain/21.htm' }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/Bundesarchiv_Bild_183-H25224%2C_Guernica%2C_Ruinen.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Bundesarchiv_Bild_183-H25224,_Guernica,_Ruinen.jpg',
    credit: { institution: 'Bundesarchiv' },
    license: {
      id: 'cc-by-sa',
      version: '3.0',
      url: 'https://creativecommons.org/licenses/by-sa/3.0/de/deed.en'
    },
    title: 'Guernica, Ruinen'
  },
  archive: [
    {
      id: 'terrified-civilians-flee-air-raid-1936-09-09',
      mediaKind: 'video',
      title: 'Terrified Civilians Flee Air Raid,  1936/09/09',
      url: 'https://archive.org/download/1936-09-09_Terrified_Civilians_Flee_Air_Raid/1936-09-09_Terrified_Civilians_Flee_Air_Raid.mp4',
      page: 'https://archive.org/details/1936-09-09_Terrified_Civilians_Flee_Air_Raid',
      credit: { institution: 'Universal Newsreels (Internet Archive)' },
      license: { id: 'public-domain' },
      bytes: 7803149,
      date: { d: '1936-09-09' },
      durationSec: 85
    }
  ],
  furtherReading: [
    { source: 'salas-larrazabal-1973-historia-del-ejercito-popular', perspective: 'european' },
    { source: 'arraras-1984-historia-de-la-cruzada-espanola', perspective: 'european' }
  ]
})
