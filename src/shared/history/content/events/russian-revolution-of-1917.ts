import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'russian-revolution-of-1917',
  names: [
    { text: 'Russian Revolution of 1917', lang: 'en', role: 'primary' },
    { text: 'Революция 1917 года', lang: 'ru', role: 'native' },
    {
      text: 'February Revolution',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Revolutions and Civil War', para: '2' }
        }
      ]
    },
    {
      text: 'Bolshevik Revolution',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Revolutions and Civil War', para: '12' }
        }
      ]
    },
    {
      text: 'October Revolution',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'eo1418-thatcher-trotsky', loc: { section: 'Trotsky, Leon' } }
      ]
    }
  ],
  researched: '2026-10-06',
  type: 'revolution',
  start: {
    alts: [
      {
        value: { d: '1917-03-08' },
        cites: [
          { source: 'lemo-chronik-1917', loc: { section: 'Chronik 1917', para: '47' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1917-11-07' },
        cites: [
          {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Revolutions and Civil War', para: '15' }
          },
          {
            source: 'eo1418-ennker-lenin',
            loc: { section: 'Revolution and Peace', para: '2' }
          }
        ]
      }
    ]
  },
  regions: ['russia-central-asia', 'europe', 'global'],
  prominence: 1,
  places: [
    {
      ref: 'place:petrograd',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Revolutions and Civil War', para: '4' }
        },
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Revolutions and Civil War', para: '15' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:vladimir-lenin',
      role: 'leader',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Revolutions and Civil War', para: '14' }
        },
        { source: 'eo1418-ennker-lenin', loc: { section: 'Revolution and Peace', para: '2' } }
      ]
    },
    {
      ref: 'person:leon-trotsky',
      role: 'leader',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Revolutions and Civil War', para: '14' }
        },
        {
          source: 'eo1418-thatcher-trotsky',
          loc: { section: 'The 1917 Russian Revolution', para: '2' }
        }
      ]
    },
    {
      ref: 'person:nicholas-ii',
      role: 'head-of-state',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Revolutions and Civil War', para: '5' }
        }
      ]
    },
    {
      name: 'Aleksandr Kerenskiy',
      role: 'head-of-government',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Revolutions and Civil War', para: '11' }
        }
      ]
    },
    {
      name: 'Georgiy L\'vov',
      role: 'head-of-government',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Revolutions and Civil War', para: '5' }
        }
      ]
    },
    {
      name: 'Lavr Kornilov',
      role: 'commander',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Revolutions and Civil War', para: '11' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:russian-revolution-of-1905', rel: 'preceded-by' },
    {
      ref: 'event:first-world-war',
      rel: 'caused-by',
      cites: [
        {
          source: 'eo1418-read-revolutions-russian-empire',
          loc: { section: 'Revolutions (Russian Empire)' }
        },
        {
          source: 'eo1418-read-revolutions-russian-empire',
          loc: { section: 'Conclusion', para: '1' }
        }
      ]
    },
    {
      ref: 'event:jangali-movement',
      rel: 'contributed-to',
      cites: [
        {
          source: 'iranica-dailami-jangali-movement',
          loc: { section: 'JANGALI MOVEMENT', para: '28' }
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
          text: 'The Russian Revolution was one of the most influential events to emerge from the furnace of the First World War. It transformed Russia and its Empire and firmly planted the flag of world revolution at the centre of 20th century world history. The Revolution was the outcome of a vast array of interacting forces, internal and external, long-term and short-term, structural and accidental. The Great War did not create the forces of revolution, but it did set them in motion and fuel them.',
          lang: 'en',
          cite: {
            source: 'eo1418-read-revolutions-russian-empire',
            loc: { section: 'Revolutions (Russian Empire)' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/revolutions-russian-empire/'
          }
        },
        {
          id: 'q2',
          text: 'Russians saw the fall of the Romanov Dynasty, which had ruled for more than 300 years, followed by a long struggle for power between the Bolsheviks and a series of disparate armies, known collectively as the Whites, supported by Russia\'s erstwhile wartime allies.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Revolutions and Civil War', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/8.htm' }
        }
      ]
    },
    {
      kind: 'causes',
      quotes: [
        {
          id: 'q3',
          text: 'By early 1917, the existing order in Russia was verging on collapse. The country\'s involvement in World War I had already cost millions of lives and severely disrupted Russia\'s already struggling economy. In an effort to reverse the worsening military situation, Nicholas II took personal command of Russian forces at the front, leaving the conduct of government in Petrograd (St. Petersburg before 1914; Leningrad after 1924; St. Petersburg after 1991) to his unpopular wife and a series of incompetent ministers. As a consequence of these conditions, the morale of the people rapidly deteriorated.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Revolutions and Civil War', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/8.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'The collapse of the monarchy left two rival political institutions--the Provisional Government and the Petrograd Soviet--to share administrative authority over the country.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Revolutions and Civil War', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/8.htm' }
        },
        {
          id: 'q5',
          text: 'A committed revolutionary and pragmatic Marxist thinker, he astounded the Bolsheviks in Petrograd with his April Theses , in which he boldly called for the overthrow of the Provisional Government, the transfer of "all power to the soviets," and the expropriation of factories by workers and of land belonging to the church, the nobility, and the gentry by peasants.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Revolutions and Civil War', para: '9' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/8.htm' }
        },
        {
          id: 'q6',
          text: 'The Kornilov affair created a power vacuum. The immediate threat of a military coup had become non-existent. However, the PG also became almost powerless. Supporters on the right, especially the crucial officers, hated Kerensky for his apparent betrayal of Kornilov. However, Kerensky gained no corresponding credit with the Soviet because he was tainted by his initial collaboration with Kornilov. The process of dissolution of power that began in February, had reached its lowest point. Central power and authority had been dissipated.',
          lang: 'en',
          cite: {
            source: 'eo1418-read-revolutions-russian-empire',
            loc: { section: 'The October Revolution', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/revolutions-russian-empire/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q7',
          text: 'Having convened the Constituent Assembly, which finally had been elected in November with the Bolsheviks winning only a quarter of the seats, the Soviet government dissolved the assembly in January after a one-day session, ending a short-lived experiment in parliamentary democracy.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Revolutions and Civil War', para: '16' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/8.htm' }
        },
        {
          id: 'q8',
          text: 'Beginning in April 1918, anticommunist forces, called the Whites and often led by former officers of the tsarist army, began to clash with the Red Army, which Trotsky, named commissar of war in the Soviet government, organized to defend the new state. A civil war to determine the future of Russia had begun.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Revolutions and Civil War', para: '19' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/8.htm' }
        },
        {
          id: 'q9',
          text: 'The Soviet system’s martial birthmark was visible up to its end, in its authoritarianism, its productionist, heavy-industry-oriented economy, and its vast military.',
          lang: 'en',
          cite: {
            source: 'eo1418-read-revolutions-russian-empire',
            loc: { section: 'Conclusion', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/revolutions-russian-empire/'
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
            value: { d: '1917-03-08' },
            cites: [
              { source: 'lemo-chronik-1917', loc: { section: 'Chronik 1917', para: '47' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'Aufgrund des erfolglosen Kriegsverlaufs und der wirtschaftlichen Zerrüttung kommt es in Petrograd zu ersten schweren Zusammenstößen zwischen streikenden Arbeitern und dem Militär.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1917', loc: { section: 'Chronik 1917', para: '48' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1917.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1917-03-15' },
            cites: [
              {
                source: 'loc-russia-country-study-1996',
                loc: { section: 'Revolutions and Civil War', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'With the consent of the Petrograd Soviet, the Executive Committee of the Duma organized the Provisional Government on March 15.',
        lang: 'en',
        cite: {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Revolutions and Civil War', para: '5' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/8.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1917-04' },
            cites: [
              {
                source: 'loc-russia-country-study-1996',
                loc: { section: 'Revolutions and Civil War', para: '9' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'Lenin, the Bolshevik leader, returned to Petrograd in April 1917 from his wartime residence in Switzerland.',
        lang: 'en',
        cite: {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Revolutions and Civil War', para: '9' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/8.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1917-09-10' },
            cites: [
              {
                source: 'loc-russia-country-study-1996',
                loc: { section: 'Revolutions and Civil War', para: '11' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'Kerenskiy dismissed Kornilov from his command, but Kornilov, disobeying the order, launched an extemporaneous revolt on September 10 (August 28).',
        lang: 'en',
        cite: {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Revolutions and Civil War', para: '11' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/8.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1917-11-07' },
            cites: [
              {
                source: 'loc-russia-country-study-1996',
                loc: { section: 'Revolutions and Civil War', para: '15' }
              },
              {
                source: 'eo1418-ennker-lenin',
                loc: { section: 'Revolution and Peace', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'By evening, the Bolsheviks had taken control of utilities and most government buildings in Petrograd, thus enabling Lenin to proclaim the downfall of the Provisional Government on the morning of the next day, November 7. The Bolsheviks captured the Provisional Government\'s cabinet at its Winter Palace headquarters that night with hardly a shot fired in the government\'s defense.',
        lang: 'en',
        cite: {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Revolutions and Civil War', para: '15' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/8.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1918-03-03' },
            cites: [
              {
                source: 'loc-russia-country-study-1996',
                loc: { section: 'Revolutions and Civil War', para: '17' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'On March 3, Soviet government officials signed the Treaty of Brest-Litovsk, relinquishing Poland, the Baltic lands, Finland, and Ukraine to German control and giving up a portion of the Caucasus region to Turkey.',
        lang: 'en',
        cite: {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Revolutions and Civil War', para: '17' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/8.htm' }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f7/19170704_Riot_on_Nevsky_prosp_Petrograd.jpg/1280px-19170704_Riot_on_Nevsky_prosp_Petrograd.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:19170704_Riot_on_Nevsky_prosp_Petrograd.jpg',
    credit: { creator: 'Viktor Bulla' },
    license: { id: 'public-domain' }
  }
})
