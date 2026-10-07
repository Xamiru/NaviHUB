import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'second-world-war',
  names: [
    { text: 'Second World War', lang: 'en', role: 'primary' },
    {
      text: 'World War II',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'WORLD WAR II AND THE AZARBAIJAN CRISIS', para: '1' }
        }
      ]
    },
    {
      text: 'Zweiter Weltkrieg',
      lang: 'de',
      role: 'alternative',
      cites: [
        { source: 'lemo-chronik-1939', loc: { section: 'Chronik 1939', para: '168' } }
      ]
    },
    {
      text: 'Great Patriotic War',
      lang: 'en',
      role: 'alternative',
      usedBy: [
        { kind: 'state', name: 'Soviet Union' },
        { kind: 'state', name: 'Russia' }
      ],
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'The War Years', para: '6' }
        }
      ]
    },
    {
      text: 'Greater East Asia War',
      lang: 'en',
      role: 'alternative',
      usedBy: [
        { kind: 'state', name: 'Japan' }
      ],
      cites: [
        {
          source: 'loc-japan-country-study-1994',
          loc: { section: 'WORLD WAR II AND THE OCCUPATION', para: '1' }
        }
      ]
    },
    {
      text: 'Pacific War',
      lang: 'en',
      role: 'alternative',
      usedBy: [
        { kind: 'state', name: 'United States' }
      ],
      cites: [
        {
          source: 'loc-japan-country-study-1994',
          loc: { section: 'WORLD WAR II AND THE OCCUPATION', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-07',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1939-09-01' },
        cites: [
          { source: 'lemo-chronik-1939', loc: { section: 'Chronik 1939', para: '167' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1945-09-02' },
        cites: [
          { source: 'lemo-chronik-1945', loc: { section: 'Chronik 1945', para: '215' } },
          {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'WORLD WAR II AND THE OCCUPATION', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['global', 'europe', 'east-asia', 'russia-central-asia', 'north-america'],
  prominence: 1,
  places: [
    {
      ref: 'place:warsaw',
      cites: [
        {
          source: 'loc-poland-country-study-1992',
          loc: { section: 'World War II', para: '1' }
        }
      ]
    },
    {
      ref: 'place:stalingrad',
      cites: [
        { source: 'lemo-chronik-1943', loc: { section: 'Chronik 1943', para: '31' } }
      ]
    },
    {
      ref: 'place:normandy',
      cites: [
        { source: 'lemo-chronik-1944', loc: { section: 'Chronik 1944', para: '122' } }
      ]
    },
    {
      ref: 'place:pearl-harbor',
      cites: [
        {
          source: 'state-dept-milestones-road-to-pearl-harbor',
          loc: {
            section: 'Japan, China, the United States and the Road to Pearl Harbor, 1937–41',
            para: '7'
          }
        }
      ]
    },
    {
      ref: 'place:berlin',
      cites: [
        {
          source: 'avalon-german-act-of-military-surrender-1945',
          loc: { section: 'Act of Military Surrender Signed at Berlin on the 8th day of May, 1945' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'allies',
      name: 'Allied Powers',
      cites: [
        {
          source: 'avalon-japanese-instrument-of-surrender-1945',
          loc: { section: 'First Instrument of Surrender' }
        }
      ]
    },
    {
      key: 'axis',
      name: 'axis powers',
      cites: [
        {
          source: 'iranica-kuniholm-azerbaijan-1941-1947',
          loc: { section: 'AZERBAIJAN v. History from 1941 to 1947', para: '3' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:winston-churchill',
      role: 'head-of-government',
      side: 'allies',
      cites: [
        {
          source: 'lemo-biografie-winston-churchill',
          loc: { section: 'Winston Churchill 1874-1965', para: '43' }
        }
      ]
    },
    {
      ref: 'person:franklin-d-roosevelt',
      role: 'head-of-state',
      side: 'allies',
      cites: [
        {
          source: 'state-dept-milestones-tehran-conference',
          loc: { section: 'The Tehran Conference, 1943', para: '1' }
        }
      ]
    },
    {
      ref: 'person:joseph-stalin',
      role: 'head-of-government',
      side: 'allies',
      cites: [
        {
          source: 'state-dept-milestones-tehran-conference',
          loc: { section: 'The Tehran Conference, 1943', para: '1' }
        }
      ]
    },
    {
      ref: 'person:harry-s-truman',
      role: 'head-of-state',
      side: 'allies',
      cites: [
        {
          source: 'lemo-biografie-harry-s-truman',
          loc: { section: 'Harry S. Truman 1884 - 1972', para: '20' }
        }
      ]
    },
    {
      ref: 'person:chiang-kai-shek',
      role: 'head-of-state',
      side: 'allies',
      cites: [
        {
          source: 'state-dept-milestones-road-to-pearl-harbor',
          loc: {
            section: 'Japan, China, the United States and the Road to Pearl Harbor, 1937–41',
            para: '3'
          }
        }
      ]
    },
    {
      ref: 'person:adolf-hitler',
      role: 'head-of-state',
      side: 'axis',
      cites: [
        { source: 'lemo-chronik-1939', loc: { section: 'Chronik 1939', para: '168' } }
      ]
    },
    {
      ref: 'person:benito-mussolini',
      role: 'head-of-government',
      side: 'axis',
      cites: [
        { source: 'lemo-chronik-1939', loc: { section: 'Chronik 1939', para: '173' } }
      ]
    },
    {
      ref: 'person:hirohito',
      role: 'head-of-state',
      side: 'axis',
      cites: [
        {
          source: 'loc-japan-country-study-1994',
          loc: { section: 'WORLD WAR II AND THE OCCUPATION', para: '1' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'military-deaths',
      value: {
        alts: [
          {
            value: { min: 15000000 },
            cites: [
              {
                source: 'nww2m-research-starters-worldwide-deaths',
                loc: { section: 'Worldwide Casualties' }
              }
            ]
          }
        ]
      }
    },
    {
      key: 'civilian-deaths',
      value: {
        alts: [
          {
            value: { min: 45000000 },
            cites: [
              {
                source: 'nww2m-research-starters-worldwide-deaths',
                loc: { section: 'Worldwide Casualties' }
              }
            ]
          }
        ]
      }
    },
    {
      key: 'wounded',
      value: {
        alts: [
          {
            value: { min: 25000000 },
            cites: [
              {
                source: 'nww2m-research-starters-worldwide-deaths',
                loc: { section: 'Worldwide Casualties' }
              }
            ]
          }
        ]
      }
    }
  ],
  related: [
    { ref: 'event:second-sino-japanese-war', rel: 'related' },
    { ref: 'event:the-holocaust', rel: 'related' },
    { ref: 'event:anglo-soviet-invasion-of-iran', rel: 'related' },
    { ref: 'event:atomic-bombings-of-hiroshima-and-nagasaki', rel: 'related' },
    {
      ref: 'event:founding-of-the-united-nations',
      rel: 'led-to',
      cites: [
        { source: 'avalon-charter-of-the-united-nations', loc: { section: 'Preamble' } }
      ]
    },
    {
      ref: 'event:nuremberg-trials',
      rel: 'led-to',
      cites: [
        {
          source: 'state-dept-milestones-nuremberg-and-tokyo-trials',
          loc: {
            section: 'The Nuremberg Trial and the Tokyo War Crimes Trials (1945–1948)',
            para: '1'
          }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q25',
          text: 'World War II began on September 1, 1939, when Nazi Germany invaded Poland.',
          lang: 'en',
          cite: {
            source: 'state-dept-countries-poland',
            loc: { section: 'Poland: Diplomatic Relations', para: '24' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'https://history.state.gov/countries/poland' }
        },
        {
          id: 'q1',
          text: 'Mit dem Beschuss von polnischen Munitionslagern auf der Westerplatte bei Danzig durch das deutsche Linienschiff "Schleswig-Holstein" beginnt der Überfall auf Polen und damit der Zweite Weltkrieg. Die deutsche Wehrmacht marschiert ohne Kriegserklärung in Polen ein.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1939', loc: { section: 'Chronik 1939', para: '168' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1939.html'
          }
        },
        {
          id: 'q2',
          text: 'His invasion of Poland in September 1939 was the tripwire that set off World War II, the most devastating period in the history of the Polish state.',
          lang: 'en',
          cite: {
            source: 'loc-poland-country-study-1992',
            loc: { section: 'World War II', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/poland/15.htm' }
        },
        {
          id: 'q3',
          text: 'Unterzeichnung der Kapitulation Japans; Ende des Zweiten Weltkriegs.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1945', loc: { section: 'Chronik 1945', para: '216' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1945.html'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'Die schweren Verluste der Luftwaffe bei der "Battle of Britain" genannten Luftschlacht bedeuten praktisch die deutsche Niederlage im Kampf um die Luftherrschaft über England. Kurz darauf wird die geplante Invasion ohne neuen Termin verschoben.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1940', loc: { section: 'Chronik 1940', para: '192' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1940.html'
          }
        },
        {
          id: 'q5',
          text: 'The German blitzkrieg, known as Operation Barbarossa, nearly succeeded in breaking the Soviet Union in the months that followed.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'The War Years', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/11.htm' }
        },
        {
          id: 'q6',
          text: 'Therefore they were stunned when the unthinkable happened and Japanese planes bombed the U.S. fleet at Pearl Harbor on December 7, 1941. The following day, the United States declared war on Japan, and it soon entered into a military alliance with China. When Germany stood by its ally and declared war on the United States, the Roosevelt Administration faced war in both Europe and Asia.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-road-to-pearl-harbor',
            loc: {
              section: 'Japan, China, the United States and the Road to Pearl Harbor, 1937–41',
              para: '7'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1937-1945/pearl-harbor'
          }
        },
        {
          id: 'q7',
          text: 'Die erste für die Wehrmacht vernichtende Niederlage im Krieg gegen die Sowjetunion veränderte die Kriegssituation nachhaltig. Das Gesetz des Handelns ging nunmehr auf die Rote Armee über.',
          lang: 'de',
          cite: {
            source: 'lemo-kapitel-schlacht-um-stalingrad',
            loc: { section: 'Die Schlacht um Stalingrad', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/kapitel/der-zweite-weltkrieg/kriegsverlauf/schlacht-um-stalingrad-194243'
          }
        },
        {
          id: 'q8',
          text: 'In June 1944, American, British, and Canadian forces invaded France, driving the Germans back and liberating Paris by August.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'World War 2 - Defeat', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/43.htm' }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q9',
          text: '*Worldwide casualty estimates vary widely in several sources. The number of civilian deaths in China alone might well be more than 50,000,000.',
          lang: 'en',
          cite: {
            source: 'nww2m-research-starters-worldwide-deaths',
            loc: { section: 'Worldwide Casualties' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nationalww2museum.org/students-teachers/student-resources/research-starters/research-starters-worldwide-deaths-world-war'
          }
        },
        {
          id: 'q10',
          text: 'An estimated 20 million Soviet soldiers and civilians perished in the war, the heaviest loss of life of any of the combatant countries.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'The War Years', para: '13' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/11.htm' }
        },
        {
          id: 'q11',
          text: 'Between 1939 and 1945, 6 million people, over 15 percent of Poland\'s population, perished, with the uniquely cruel inclusion of mass extermination of Jews in concentration camps in Poland.',
          lang: 'en',
          cite: {
            source: 'loc-poland-country-study-1992',
            loc: { section: 'World War II', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/poland/15.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q12',
          text: 'The end of World War II saw the Soviet Union emerge as one of the world\'s two great military powers.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'The War Years', para: '13' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/11.htm' }
        },
        {
          id: 'q13',
          text: 'The terms of surrender included the occupation of Japan by Allied military forces, assurances that Japan would never again go to war, restriction of Japanese sovereignty to the four main islands "and such minor islands as may be determined," and surrender of Japan\'s colonial holdings.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'WORLD WAR II AND THE OCCUPATION', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/japan/33.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1939-09-03' },
            cites: [
              { source: 'lemo-chronik-1939', loc: { section: 'Chronik 1939', para: '172' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'Großbritannien und Frankreich erklären Deutschland den Krieg, nachdem ein letzter Vermittlungsversuch Mussolinis von Hitler nicht beantwortet wird. Die USA, Italien und Spanien erklären sich neutral.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1939', loc: { section: 'Chronik 1939', para: '173' } },
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
            value: { d: '1940-05-13' },
            cites: [
              {
                source: 'hansard-commons-1940-05-13-his-majestys-government',
                loc: { section: 'HC Deb 13 May 1940 vol 360 cc1501-25' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'You ask, what is our aim? I can answer in one word: It is victory, victory at all costs, victory in spite of all terror, victory, however long and hard the road may be; for without victory, there is no survival.',
        lang: 'en',
        cite: {
          source: 'hansard-commons-1940-05-13-his-majestys-government',
          loc: { section: 'HC Deb 13 May 1940 vol 360 cc1501-25', para: '6' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://api.parliament.uk/historic-hansard/commons/1940/may/13/his-majestys-government-1'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1940-06-18' },
            cites: [
              {
                source: 'hansard-commons-1940-06-18-war-situation',
                loc: { section: 'HC Deb 18 June 1940 vol 362 cc51-64' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'What General Weygand called the "Battle of France" is over. I expect that the battle of Britain is about to begin.',
        lang: 'en',
        cite: {
          source: 'hansard-commons-1940-06-18-war-situation',
          loc: { section: 'HC Deb 18 June 1940 vol 362 cc51-64', para: '21' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://api.parliament.uk/historic-hansard/commons/1940/jun/18/war-situation'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1940-06-22' },
            cites: [
              { source: 'lemo-chronik-1940', loc: { section: 'Chronik 1940', para: '137' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q17',
        text: 'Zur Inszenierung der französischen Kapitulation wird in Compiègne der Eisenbahnwagen benutzt, in dem 1918 die Waffenstillstandsverhandlungen geführt worden sind.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1940', loc: { section: 'Chronik 1940', para: '138' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1940.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1941-06-22' },
            cites: [
              { source: 'lemo-chronik-1941', loc: { section: 'Chronik 1941', para: '146' } },
              {
                source: 'loc-russia-country-study-1996',
                loc: { section: 'The War Years', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q18',
        text: 'Ohne Kriegserklärung beginnen die deutschen Truppen auf einer Linie zwischen der Ostsee und den Karpaten mit dem Einmarsch in die Sowjetunion. Den Truppen folgen Einsatzgruppen zur systematischen Ermordung der jüdischen Bevölkerung, KP-Funktionäre, Sinti und Roma und Kriegsgefangenen.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1941', loc: { section: 'Chronik 1941', para: '147' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1941.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1941-12-07' },
            cites: [
              { source: 'lemo-chronik-1941', loc: { section: 'Chronik 1941', para: '294' } },
              {
                source: 'state-dept-milestones-road-to-pearl-harbor',
                loc: {
                  section: 'Japan, China, the United States and the Road to Pearl Harbor, 1937–41',
                  para: '7'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q19',
        text: 'Japan greift ohne Vorwarnung den US-Militärstützpunkt Pearl Harbor auf Hawaii an und versenkt mehrere Schlachtschiffe. Einen Tag darauf folgt die gegenseitige Kriegserklärung.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1941', loc: { section: 'Chronik 1941', para: '295' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1941.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1942-11-22' },
            cites: [
              { source: 'lemo-chronik-1942', loc: { section: 'Chronik 1942', para: '231' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q20',
        text: 'Die Rote Armee schließt die deutsche 6. Armee mit insgesamt 284.000 Soldaten in Stalingrad ein.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1942', loc: { section: 'Chronik 1942', para: '232' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1942.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1943-02-02' },
            cites: [
              { source: 'lemo-chronik-1943', loc: { section: 'Chronik 1943', para: '31' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q21',
        text: 'Mit der Kapitulation der letzten Wehrmachtstruppen in Stalingrad gehen über 100.000 Soldaten in sowjetische Gefangenschaft.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1943', loc: { section: 'Chronik 1943', para: '32' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1943.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1944-06-06' },
            cites: [
              { source: 'lemo-chronik-1944', loc: { section: 'Chronik 1944', para: '122' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q22',
        text: 'Mit 6.000 Schiffen beginnt in der Normandie die Invasion der Alliierten in Westeuropa. Mit der Landung von 150.000 Soldaten werden mehrere Brückenköpfe gebildet.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1944', loc: { section: 'Chronik 1944', para: '123' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1944.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1945-05-08' },
            cites: [
              {
                source: 'avalon-german-act-of-military-surrender-1945',
                loc: {
                  section: 'Act of Military Surrender Signed at Berlin on the 8th day of May, 1945'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q23',
        text: '1. We the undersigned, acting by authority of the German High Command, hereby surrender unconditionally to the Supreme Commander, Allied Expeditionary Force and simultaneously to the Supreme High Command of the Red Army all forces on land, at sea, and in the air who are at this date under German control.',
        lang: 'en',
        cite: {
          source: 'avalon-german-act-of-military-surrender-1945',
          loc: { section: 'Act of Military Surrender Signed at Berlin on the 8th day of May, 1945' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'https://avalon.law.yale.edu/wwii/gs11.asp' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1945-09-02' },
            cites: [
              { source: 'lemo-chronik-1945', loc: { section: 'Chronik 1945', para: '215' } },
              {
                source: 'loc-japan-country-study-1994',
                loc: { section: 'WORLD WAR II AND THE OCCUPATION', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q24',
        text: 'We hereby proclaim the unconditional surrender to the Allied Powers of the Japanese Imperial General Headquarters and of all Japanese armed forces and all armed forces under the Japanese control wherever situated.',
        lang: 'en',
        cite: {
          source: 'avalon-japanese-instrument-of-surrender-1945',
          loc: { section: 'First Instrument of Surrender' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'https://avalon.law.yale.edu/wwii/j4.asp' }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/56/WWII%2C_Europe%2C_France%2C_%22Into_the_Jaws_of_Death_-_U.S._Troops_wading_through_water_and_Nazi_gunfire%22_-_NARA_-_195515.jpg/1280px-WWII%2C_Europe%2C_France%2C_%22Into_the_Jaws_of_Death_-_U.S._Troops_wading_through_water_and_Nazi_gunfire%22_-_NARA_-_195515.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:WWII,_Europe,_France,_%22Into_the_Jaws_of_Death_-_U.S._Troops_wading_through_water_and_Nazi_gunfire%22_-_NARA_-_195515.jpg',
    credit: {
      institution: 'US National Archives and Records Administration',
      creator: 'Robert F. Sargent'
    },
    license: { id: 'public-domain' }
  },
  archive: [
    {
      id: 'prelude-to-war-1942',
      mediaKind: 'video',
      title: 'Prelude to War',
      url: 'https://archive.org/download/gov.archives.arc.36067/gov.archives.arc.36067_512kb.mp4',
      page: 'https://archive.org/details/gov.archives.arc.36067',
      credit: {
        institution: 'U.S. National Archives and Records Administration (Internet Archive)',
        creator: 'U.S. War Department'
      },
      license: { id: 'public-domain' },
      bytes: 238371087,
      date: { d: '1942' },
      durationSec: 3303
    }
  ]
})
