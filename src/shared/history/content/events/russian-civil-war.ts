import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'russian-civil-war',
  names: [
    { text: 'Russian Civil War', lang: 'en', role: 'primary' },
    { text: 'Гражданская война в России', lang: 'ru', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1917-11-07' },
        cites: [
          { source: 'eo1418-sumpf-russian-civil-war', loc: { section: 'Russian Civil War' } }
        ]
      },
      {
        value: { d: '1918-04' },
        cites: [
          {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Revolutions and Civil War', para: '19' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1920' },
        cites: [
          {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Revolutions and Civil War', para: '23' }
          }
        ]
      },
      {
        value: { d: '1921' },
        cites: [
          { source: 'eo1418-sumpf-russian-civil-war', loc: { section: 'Russian Civil War' } }
        ]
      }
    ]
  },
  regions: ['russia-central-asia', 'europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:moscow',
      cites: [
        { source: 'eo1418-sumpf-russian-civil-war', loc: { section: 'Russian Civil War' } }
      ]
    },
    {
      ref: 'place:petrograd',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Revolutions and Civil War', para: '15' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'polity:soviet-union' }
  ],
  sides: [
    {
      key: 'reds',
      name: 'Reds',
      cites: [
        { source: 'eo1418-sumpf-russian-civil-war', loc: { section: 'Russian Civil War' } }
      ]
    },
    {
      key: 'whites',
      name: 'Whites',
      cites: [
        { source: 'eo1418-sumpf-russian-civil-war', loc: { section: 'Russian Civil War' } }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:vladimir-lenin',
      role: 'leader',
      side: 'reds',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Revolutions and Civil War', para: '19' }
        }
      ]
    },
    {
      ref: 'person:leon-trotsky',
      role: 'commander',
      side: 'reds',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Revolutions and Civil War', para: '19' }
        }
      ]
    },
    {
      name: 'Anton Denikin',
      role: 'commander',
      side: 'whites',
      cites: [
        { source: 'eo1418-sumpf-russian-civil-war', loc: { section: 'Russian Civil War' } }
      ]
    },
    {
      name: 'Alexander Kolchak',
      role: 'commander',
      side: 'whites',
      cites: [
        { source: 'eo1418-sumpf-russian-civil-war', loc: { section: 'Russian Civil War' } }
      ]
    },
    {
      ref: 'person:alexander-kerensky',
      role: 'participant',
      cites: [
        { source: 'eo1418-sumpf-russian-civil-war', loc: { section: 'Russian Civil War' } }
      ]
    }
  ],
  related: [
    {
      ref: 'event:russian-revolution-of-1917',
      rel: 'caused-by',
      cites: [
        { source: 'eo1418-sumpf-russian-civil-war', loc: { section: 'Russian Civil War' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The Russian civil war was not simply a conflict between Red communists and White monarchists; rather, it involved a complex intertwining of military, social and political issues that were created or exacerbated by the Great War.',
          lang: 'en',
          cite: { source: 'eo1418-sumpf-russian-civil-war', loc: { section: 'Russian Civil War' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://encyclopedia.1914-1918-online.net/article/russian-civil-war/'
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
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/russia/8.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'The term Russian civil war generally refers to the confrontation between the proponents of restoring the deposed Ancien Régime (“Whites”) and those who defended the new socialist regime that emerged from the October Revolution (“Reds”).',
          lang: 'en',
          cite: { source: 'eo1418-sumpf-russian-civil-war', loc: { section: 'Russian Civil War' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://encyclopedia.1914-1918-online.net/article/russian-civil-war/'
          }
        },
        {
          id: 'q4',
          text: 'Having convened the Constituent Assembly, which finally had been elected in November with the Bolsheviks winning only a quarter of the seats, the Soviet government dissolved the assembly in January after a one-day session, ending a short-lived experiment in parliamentary democracy.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Revolutions and Civil War', para: '16' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/russia/8.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'Beginning in April 1918, anticommunist forces, called the Whites and often led by former officers of the tsarist army, began to clash with the Red Army, which Trotsky, named commissar of war in the Soviet government, organized to defend the new state. A civil war to determine the future of Russia had begun.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Revolutions and Civil War', para: '19' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/russia/8.htm' }
        },
        {
          id: 'q6',
          text: 'The White armies enjoyed varying degrees of support from the Allied Powers. Desiring to defeat Germany in any way possible, Britain, France, and the United States landed troops in Russia and provided logistical support to the Whites, whom the Allies trusted would resume Russia\'s struggle against Germany after overthrowing the communist regime.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Revolutions and Civil War', para: '20' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/russia/8.htm' }
        },
        {
          id: 'q7',
          text: 'By the end of 1920, the communists had clearly triumphed in the Civil War. Although in 1919 Soviet Russia had shrunk to the size of sixteenth-century Muscovy, the Red Army had the advantage of defending the heartland with Moscow at its center (see fig. 4).',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Revolutions and Civil War', para: '23' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/russia/8.htm' }
        },
        {
          id: 'q8',
          text: 'In those desperate times, both Reds and Whites murdered and executed without trial large numbers of suspected enemies.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Revolutions and Civil War', para: '24' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/russia/8.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q9',
          text: 'The harsh economic policies of the Civil War period, however, would have a profound influence on the future development of the country.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Revolutions and Civil War', para: '26' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/russia/8.htm' }
        },
        {
          id: 'q10',
          text: 'Rather than a civil war, it is therefore more appropriate to speak of civil wars in the plural, of armed conflicts that were more or less inter-connected, bound up with terrible social conflict and equally profound ethnic discord.',
          lang: 'en',
          cite: { source: 'eo1418-sumpf-russian-civil-war', loc: { section: 'Russian Civil War' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://encyclopedia.1914-1918-online.net/article/russian-civil-war/'
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
        id: 'q11',
        text: 'On March 3, Soviet government officials signed the Treaty of Brest-Litovsk, relinquishing Poland, the Baltic lands, Finland, and Ukraine to German control and giving up a portion of the Caucasus region to Turkey.',
        lang: 'en',
        cite: {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Revolutions and Civil War', para: '17' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/russia/8.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1918-05-25' },
            cites: [
              {
                source: 'eo1418-sumpf-russian-civil-war',
                loc: { section: 'Russian Civil War' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'Some 30,000 Czech and Slovak soldiers, including the writer and polemicist Jaroslav Hašek (1883-1923), as such revolted against the Bolsheviks on 25 May 1918 in Ekaterinburg.',
        lang: 'en',
        cite: { source: 'eo1418-sumpf-russian-civil-war', loc: { section: 'Russian Civil War' } },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://encyclopedia.1914-1918-online.net/article/russian-civil-war/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1918-07' },
            cites: [
              {
                source: 'loc-russia-country-study-1996',
                loc: { section: 'Revolutions and Civil War', para: '23' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'Hopes of restoring the monarchy ended effectively when communists executed the imperial family in July 1918.',
        lang: 'en',
        cite: {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Revolutions and Civil War', para: '23' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/russia/8.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1920-03-27' },
            cites: [
              {
                source: 'eo1418-sumpf-russian-civil-war',
                loc: { section: 'Russian Civil War' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'In early October 1919, after the victories in Kursk and Voronezh, Moscow appeared to be within firing range, but the Red Army’s counter-attack pushed the “Armed Forces of South Russia” towards the sea; on 27 March 1920, the last men left Novorossiysk to sail to Crimea.',
        lang: 'en',
        cite: { source: 'eo1418-sumpf-russian-civil-war', loc: { section: 'Russian Civil War' } },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://encyclopedia.1914-1918-online.net/article/russian-civil-war/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1921-03' },
            cites: [
              {
                source: 'loc-russia-country-study-1996',
                loc: { section: 'Revolutions and Civil War', para: '26' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'To the Soviet government, however, the most disquieting manifestation of dissatisfaction with war communism was the rebellion in March 1921 of sailors at the naval base at Kronshtadt (near Petrograd), which had earlier won renown as a bastion of the Bolshevik Revolution. Although Trotsky and the Red Army succeeded in putting down the mutiny, it signaled to the party leadership that war communism had to end.',
        lang: 'en',
        cite: {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Revolutions and Civil War', para: '26' }
        },
        provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/russia/8.htm' }
      }
    }
  ],
  furtherReading: [
    { source: 'gorky-1935-istoriia-grazhdanskoi-voiny-v-sssr', perspective: 'russian-soviet' }
  ]
})
