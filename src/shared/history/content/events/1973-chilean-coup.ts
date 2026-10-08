import { defineEvent } from '../../schema'

export default defineEvent({
  id: '1973-chilean-coup',
  names: [
    { text: '1973 Chilean coup d’état', lang: 'en', role: 'primary' },
    { text: 'Golpe de Estado en Chile de 1973', lang: 'es', role: 'native' },
    {
      text: 'Pinochet coup',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'state-dept-milestones-allende-and-the-pinochet-coup',
          loc: { section: 'The Allende Years and the Pinochet Coup, 1969–1973', para: '12' }
        }
      ]
    }
  ],
  researched: '2026-10-09',
  type: 'coup',
  start: {
    alts: [
      {
        value: { d: '1973-09-11' },
        cites: [
          {
            source: 'state-dept-milestones-allende-and-the-pinochet-coup',
            loc: { section: 'The Allende Years and the Pinochet Coup, 1969–1973', para: '11' }
          },
          {
            source: 'loc-chile-country-study-1994',
            loc: { section: 'Salvador Allende\'s Leftist Regime, 1970-73', para: '14' }
          }
        ]
      }
    ]
  },
  regions: ['latin-america'],
  prominence: 2,
  places: [
    {
      ref: 'place:santiago-de-chile',
      cites: [
        {
          source: 'state-dept-milestones-allende-and-the-pinochet-coup',
          loc: { section: 'The Allende Years and the Pinochet Coup, 1969–1973', para: '11' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:cold-war' }
  ],
  sides: [
    {
      key: 'allende',
      name: 'Popular Unity government',
      cites: [
        {
          source: 'loc-chile-country-study-1994',
          loc: { section: 'The Popular Unity Government, 1970-73', para: '1' }
        },
        {
          source: 'state-dept-milestones-allende-and-the-pinochet-coup',
          loc: { section: 'The Allende Years and the Pinochet Coup, 1969–1973', para: '11' }
        }
      ]
    },
    {
      key: 'junta',
      name: 'Military junta',
      cites: [
        {
          source: 'memoria-chilena-junta-militar-de-gobierno',
          loc: { section: 'Junta Militar de Gobierno' }
        },
        {
          source: 'state-dept-milestones-allende-and-the-pinochet-coup',
          loc: { section: 'The Allende Years and the Pinochet Coup, 1969–1973', para: '12' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:salvador-allende',
      role: 'head-of-state',
      side: 'allende',
      cites: [
        {
          source: 'state-dept-milestones-allende-and-the-pinochet-coup',
          loc: { section: 'The Allende Years and the Pinochet Coup, 1969–1973', para: '11' }
        },
        {
          source: 'loc-chile-country-study-1994',
          loc: { section: 'Salvador Allende\'s Leftist Regime, 1970-73', para: '15' }
        }
      ]
    },
    {
      ref: 'person:augusto-pinochet',
      role: 'commander',
      side: 'junta',
      cites: [
        {
          source: 'loc-chile-country-study-1994',
          loc: { section: 'Salvador Allende\'s Leftist Regime, 1970-73', para: '14' }
        },
        {
          source: 'state-dept-milestones-allende-and-the-pinochet-coup',
          loc: { section: 'The Allende Years and the Pinochet Coup, 1969–1973', para: '12' }
        }
      ]
    },
    {
      name: 'José Toribio Merino',
      role: 'leader',
      side: 'junta',
      cites: [
        {
          source: 'memoria-chilena-junta-militar-de-gobierno',
          loc: { section: 'Junta Militar de Gobierno' }
        }
      ]
    },
    {
      name: 'Gustavo Leigh',
      role: 'leader',
      side: 'junta',
      cites: [
        {
          source: 'memoria-chilena-junta-militar-de-gobierno',
          loc: { section: 'Junta Militar de Gobierno' }
        }
      ]
    },
    {
      name: 'César Mendoza',
      role: 'leader',
      side: 'junta',
      cites: [
        {
          source: 'memoria-chilena-junta-militar-de-gobierno',
          loc: { section: 'Junta Militar de Gobierno' }
        }
      ]
    },
    {
      name: 'Carlos Prats',
      role: 'participant',
      side: 'allende',
      cites: [
        {
          source: 'state-dept-milestones-allende-and-the-pinochet-coup',
          loc: { section: 'The Allende Years and the Pinochet Coup, 1969–1973', para: '9' }
        }
      ]
    },
    {
      ref: 'person:richard-nixon',
      role: 'head-of-state',
      cites: [
        {
          source: 'state-dept-milestones-allende-and-the-pinochet-coup',
          loc: { section: 'The Allende Years and the Pinochet Coup, 1969–1973', para: '13' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:1973-oil-crisis',
      rel: 'related',
      cites: [
        {
          source: 'state-dept-milestones-allende-and-the-pinochet-coup',
          loc: { section: 'The Allende Years and the Pinochet Coup, 1969–1973', para: '8' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/b/b5/Golpe_de_Estado_1973.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Golpe_de_Estado_1973.jpg',
    credit: { institution: 'Biblioteca del Congreso Nacional de Chile' },
    license: { id: 'cc-by', version: '3.0' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'On the morning of September 11, 1973, the military launched another coup against the Allende government.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-allende-and-the-pinochet-coup',
            loc: { section: 'The Allende Years and the Pinochet Coup, 1969–1973', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1969-1976/allende'
          }
        },
        {
          id: 'q2',
          text: 'At 9:10 a.m., Allende made his final broadcast from the presidential palace, announcing that he would not resign the presidency and rallying his supporters with the cry, “Long live Chile! Long live the people! Long live the workers!”',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-allende-and-the-pinochet-coup',
            loc: { section: 'The Allende Years and the Pinochet Coup, 1969–1973', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1969-1976/allende'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'In September 1970, Salvador Allende, the UP candidate, was elected president of Chile. Over the next three years, a unique political and economic experience followed. The UP was a coalition of left and center-left parties dominated by the Socialist Party (Partido Socialista--PS) and the Communist Party of Chile (Partido Comunista de Chile--PCCh), both of which sought to implement deep institutional, political, and economic reforms. The UP\'s program called for a democratic "Chilean road to socialism".',
          lang: 'en',
          cite: {
            source: 'loc-chile-country-study-1994',
            loc: { section: 'The Popular Unity Government, 1970-73', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/chile/59.htm' }
        },
        {
          id: 'q4',
          text: 'Politically, Allende faced problems holding his Popular Unity coalition together, pacifying the more leftist elements inside and outside Popular Unity and, above all, coping with the increasingly implacable opposition.',
          lang: 'en',
          cite: {
            source: 'loc-chile-country-study-1994',
            loc: { section: 'Salvador Allende\'s Leftist Regime, 1970-73', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/chile/30.htm' }
        },
        {
          id: 'q5',
          text: 'Meanwhile, the United States pursued a two-track policy toward Allende\'s Chile. At the overt level, Washington was frosty, especially after the nationalization of the copper mines; official relations were unfriendly but not openly hostile. The government of President Richard M. Nixon squeezed the Chilean economy by terminating financial assistance and blocking loans from multilateral organizations, although it increased aid to the military, a sector unenthusiastic toward the Allende government. It was widely reported that at the covert level the United States worked to destabilize Allende\'s Chile by funding opposition political groups and media and by encouraging a military coup d\'état.',
          lang: 'en',
          cite: {
            source: 'loc-chile-country-study-1994',
            loc: { section: 'Salvador Allende\'s Leftist Regime, 1970-73', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/chile/30.htm' }
        },
        {
          id: 'q6',
          text: 'During the second and third years of the UP, demand outstripped supply, the economy shrank, deficit spending snowballed, new investments and foreign exchange became scarce, the value of copper sales dropped, shortages appeared, and inflation skyrocketed, eroding the previous gains for the working class.',
          lang: 'en',
          cite: {
            source: 'loc-chile-country-study-1994',
            loc: { section: 'Salvador Allende\'s Leftist Regime, 1970-73', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/chile/30.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q7',
          text: 'In the aftermath of the indecisive 1973 congressional elections, both sides escalated the confrontation and hurled threats of insurgency.',
          lang: 'en',
          cite: {
            source: 'loc-chile-country-study-1994',
            loc: { section: 'Salvador Allende\'s Leftist Regime, 1970-73', para: '12' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/chile/30.htm' }
        },
        {
          id: 'q8',
          text: 'In August 1973, the rightist and centrist representatives in the Chamber of Deputies undermined the president\'s legitimacy by accusing him of systematically violating the constitution and by urging the armed forces to intervene. In early September, Allende was preparing to call for a rare national plebiscite to resolve the impasse between Popular Unity and the opposition.',
          lang: 'en',
          cite: {
            source: 'loc-chile-country-study-1994',
            loc: { section: 'Salvador Allende\'s Leftist Regime, 1970-73', para: '14' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/chile/30.htm' }
        },
        {
          id: 'q9',
          text: 'After the address, Allende purportedly joined in defending the palace, which was under heavy attack. Once it became clear that the military would take the palace, Allende told the defenders to surrender. Allende died during the final events of the coup: his death is now widely regarded a suicide.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-allende-and-the-pinochet-coup',
            loc: { section: 'The Allende Years and the Pinochet Coup, 1969–1973', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1969-1976/allende'
          }
        },
        {
          id: 'q10',
          text: 'Allende committed suicide while defending (with an assault rifle) his socialist government against the coup d\'état. Although sporadic resistance to the coup erupted, the military consolidated control much more quickly than it had believed possible. Many Chileans had predicted that a coup would unleash a civil war, but instead it ushered in a long period of repression.',
          lang: 'en',
          cite: {
            source: 'loc-chile-country-study-1994',
            loc: { section: 'Salvador Allende\'s Leftist Regime, 1970-73', para: '15' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/chile/30.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q11',
          text: 'The takeover of the government ended a 46-year history of democratic rule in Chile. In June 1975, Pinochet announced that there would be no future elections in the country.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-allende-and-the-pinochet-coup',
            loc: { section: 'The Allende Years and the Pinochet Coup, 1969–1973', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1969-1976/allende'
          }
        },
        {
          id: 'q12',
          text: 'The first phase of the dictatorship (1973-75) was mainly destructive, aimed at rapid demobilization, depoliticization, and stabilization. The armed forces treated the members of the UP as an enemy to be obliterated, not just as an errant political movement to be booted from office. The military commanders closed Congress, censored the media, purged the universities, burned books, declared political parties outlawed if Marxist or in recess otherwise, and banned union activities.',
          lang: 'en',
          cite: {
            source: 'loc-chile-country-study-1994',
            loc: { section: 'MILITARY RULE, 1973-90', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/chile/31.htm' }
        },
        {
          id: 'q13',
          text: 'The worst human rights abuses occurred in the first four years of the junta, when thousands of civilians were murdered, jailed, tortured, brutalized, or exiled, especially those linked with the Popular Unity parties. The secret police, reporting to Pinochet through the National Intelligence Directorate (Dirección Nacional de Inteligencia--DINA), replaced in 1977 by the National Information Center (Centro Nacional de Información--CNI), kept dissidents living in fear of arrest, torture, murder, or "disappearance."',
          lang: 'en',
          cite: {
            source: 'loc-chile-country-study-1994',
            loc: { section: 'MILITARY RULE, 1973-90', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/chile/31.htm' }
        },
        {
          id: 'q24',
          text: 'The report of the National Commission on Truth and Reconciliation, known as the Rettig Commission, confirmed many of the allegations of military abuses.',
          lang: 'en',
          cite: {
            source: 'loc-chile-country-study-1994',
            loc: { section: 'The Armed Forces', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/chile/98.htm' }
        },
        {
          id: 'q14',
          text: 'establecer un cuadro lo más completo posible sobre los graves hechos de violación a los derechos humanos, sus antecedentes y circunstancias; reunir información que permitiera individualizar a las víctimas y estableces su suerte y paradero; recomendar las medidas de reparación o reivindicación que estimara de justicia; y recomendar las medidas legales y administrativas que a su juicio debieran adoptarse para impedir o prevenir la comisión de nuevos atropellos graves a los derechos humanos.',
          lang: 'es',
          cite: { source: 'memoria-chilena-informe-rettig', loc: { section: 'Informe Rettig' } },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.memoriachilena.gob.cl/602/w3-article-94640.html'
          }
        },
        {
          id: 'q15',
          text: 'La Comisión recibió poco más de 3.400 denuncias y clasificaron como víctimas de la violencia política a 2.279 personas.',
          lang: 'es',
          cite: { source: 'memoria-chilena-informe-rettig', loc: { section: 'Informe Rettig' } },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.memoriachilena.gob.cl/602/w3-article-94640.html'
          }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q16',
          text: 'Colocado en un tránsito histórico, pagaré con mi vida la lealtad al pueblo.',
          lang: 'es',
          cite: { source: 'allende-1973-ultimas-palabras', loc: { section: 'Últimas palabras' } },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.marxists.org/espanol/allende/1973/11-09-73.htm'
          },
          translation: {
            text: 'Placed in a historic transition, I will pay for loyalty to the people with my life.',
            lang: 'en',
            cite: {
              source: 'allende-1973-last-words-to-the-nation-furuhashi',
              loc: { section: 'Last Words to the Nation' }
            },
            provenance: {
              via: 'web',
              at: '2026-10-09',
              url: 'https://www.marxists.org/archive/allende/1973/september/11.htm'
            }
          }
        },
        {
          id: 'q17',
          text: 'La historia es nuestra y la hacen los pueblos.',
          lang: 'es',
          cite: { source: 'allende-1973-ultimas-palabras', loc: { section: 'Últimas palabras' } },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.marxists.org/espanol/allende/1973/11-09-73.htm'
          },
          translation: {
            text: 'History is ours, and people make history.',
            lang: 'en',
            cite: {
              source: 'allende-1973-last-words-to-the-nation-furuhashi',
              loc: { section: 'Last Words to the Nation' }
            },
            provenance: {
              via: 'web',
              at: '2026-10-09',
              url: 'https://www.marxists.org/archive/allende/1973/september/11.htm'
            }
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
            value: { d: '1970-10-24' },
            cites: [
              {
                source: 'state-dept-milestones-allende-and-the-pinochet-coup',
                loc: { section: 'The Allende Years and the Pinochet Coup, 1969–1973', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q18',
        text: 'On October 24 the Chilean Congress voted to elect Allende president by a large margin, and on November 3 he was officially sworn in as President of Chile.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-allende-and-the-pinochet-coup',
          loc: { section: 'The Allende Years and the Pinochet Coup, 1969–1973', para: '6' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://history.state.gov/milestones/1969-1976/allende'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1971-07-11' },
            cites: [
              {
                source: 'state-dept-milestones-allende-and-the-pinochet-coup',
                loc: { section: 'The Allende Years and the Pinochet Coup, 1969–1973', para: '7' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q19',
        text: 'On December 21, 1970, Allende proposed an amendment to the Chilean constitution that would authorize the expropriation of the mining companies. The Chilean Congress passed the nationalization amendment on July 11, 1971, and it became law five days later.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-allende-and-the-pinochet-coup',
          loc: { section: 'The Allende Years and the Pinochet Coup, 1969–1973', para: '7' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://history.state.gov/milestones/1969-1976/allende'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1973-03' },
            cites: [
              {
                source: 'loc-chile-country-study-1994',
                loc: { section: 'Salvador Allende\'s Leftist Regime, 1970-73', para: '11' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q20',
        text: 'The two sides reached a showdown in the March 1973 congressional elections. The opposition expected the Allende coalition to suffer the typical losses of Chilean governments in midterm elections, especially with the economy in a tailspin. The National Party and PDC hoped to win two-thirds of the seats, enough to impeach Allende. They netted 55 percent of the votes, not enough of a majority to end the stalemate.',
        lang: 'en',
        cite: {
          source: 'loc-chile-country-study-1994',
          loc: { section: 'Salvador Allende\'s Leftist Regime, 1970-73', para: '11' }
        },
        provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/chile/30.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1973-06-29' },
            cites: [
              {
                source: 'state-dept-milestones-allende-and-the-pinochet-coup',
                loc: { section: 'The Allende Years and the Pinochet Coup, 1969–1973', para: '9' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q21',
        text: 'On June 29, 1973, in the midst of widespread protests and strikes, Lieutenant Colonel Roberto Souper led a failed coup attempt against Allende. In a radio address Allende called for the people to support his administration and help defeat the unlawful coup, and called in General Carlos Prats to deal with the rebel forces. Prats, like Schneider, believed that the military should remain apolitical, and the coup was aborted by late morning.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-allende-and-the-pinochet-coup',
          loc: { section: 'The Allende Years and the Pinochet Coup, 1969–1973', para: '9' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://history.state.gov/milestones/1969-1976/allende'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1973-08-22' },
            cites: [
              {
                source: 'state-dept-milestones-allende-and-the-pinochet-coup',
                loc: { section: 'The Allende Years and the Pinochet Coup, 1969–1973', para: '10' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q22',
        text: 'On August 22, the Chamber of Deputies charged the Allende government with breaching numerous sections of the Constitution. Allende refuted the allegations, stating that his actions were constitutional.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-allende-and-the-pinochet-coup',
          loc: { section: 'The Allende Years and the Pinochet Coup, 1969–1973', para: '10' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://history.state.gov/milestones/1969-1976/allende'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1973-09-13' },
            cites: [
              {
                source: 'state-dept-milestones-allende-and-the-pinochet-coup',
                loc: { section: 'The Allende Years and the Pinochet Coup, 1969–1973', para: '12' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q23',
        text: 'On September 13, Pinochet was named President of Chile, whereupon he dismantled Congress and outlawed many Chilean leftist political parties.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-allende-and-the-pinochet-coup',
          loc: { section: 'The Allende Years and the Pinochet Coup, 1969–1973', para: '12' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://history.state.gov/milestones/1969-1976/allende'
        }
      }
    }
  ],
  polities: [
    {
      ref: 'polity:united-states',
      cites: [
        {
          source: 'state-dept-milestones-allende-and-the-pinochet-coup',
          loc: { section: 'The Allende Years and the Pinochet Coup, 1969–1973', para: '13' }
        }
      ]
    }
  ],
  furtherReading: [
    { source: 'verdugo-1994-chile-1973', perspective: 'latin-american' },
    { source: 'verdugo-2001-la-caravana-de-la-muerte', perspective: 'latin-american' },
    { source: 'kornbluh-2013-pinochet-file', perspective: 'american' }
  ]
})
