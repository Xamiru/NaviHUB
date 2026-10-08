import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'armenian-genocide',
  names: [
    { text: 'Armenian Genocide', lang: 'en', role: 'primary' },
    { text: 'Հայոց ցեղասպանություն', lang: 'hy', role: 'native' },
    {
      text: 'Meds Yeghern',
      lang: 'en',
      role: 'alternative',
      usedBy: [
        { kind: 'state', name: 'United States' }
      ],
      cites: [
        {
          source: 'whitehouse-2021-04-24-biden-armenian-remembrance-day',
          loc: {
            section: 'Statement by President Joe Biden on Armenian Remembrance Day',
            para: '1'
          }
        }
      ]
    },
    {
      text: 'the Events of 1915',
      lang: 'en',
      role: 'contested',
      usedBy: [
        { kind: 'state', name: 'Republic of Turkey' }
      ],
      cites: [
        {
          source: 'tr-mfa-events-of-1915-overview',
          loc: {
            section: 'The Events of 1915 and the Turkish-Armenian Controversy over History: An Overview'
          }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'genocide',
  start: {
    alts: [
      {
        value: { d: '1915' },
        cites: [
          { source: 'eo1418-suny-armenian-genocide', loc: { section: 'Armenian Genocide' } },
          {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1915' }
          },
          {
            source: 'loc-armenia-country-study-1995',
            loc: { section: 'The Young Turks', para: '2' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1916' },
        cites: [
          {
            source: 'ehne-adjemian-armenian-genocide',
            loc: { section: 'The Armenian Genocide', para: '1' }
          },
          {
            source: 'eo1418-suny-armenian-genocide',
            loc: { section: 'Conclusion', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['mena', 'russia-central-asia'],
  prominence: 1,
  places: [
    {
      ref: 'place:istanbul',
      cites: [
        {
          source: 'eo1418-suny-armenian-genocide',
          loc: { section: 'Mass Deportation, Forced Marches, and Death Camps', para: '1' }
        }
      ]
    }
  ],
  polities: [
    { ref: 'polity:ottoman-empire' }
  ],
  participants: [
    {
      ref: 'person:talaat-pasha',
      role: 'perpetrator',
      cites: [
        { source: 'eo1418-kieser-talat', loc: { section: 'Armenian Genocide', para: '4' } },
        { source: 'loc-turkey-country-study-1995', loc: { section: 'World War I', para: '7' } }
      ]
    },
    {
      ref: 'person:enver-pasha',
      role: 'perpetrator',
      cites: [
        { source: 'loc-turkey-country-study-1995', loc: { section: 'World War I', para: '3' } },
        {
          source: 'ehne-adjemian-armenian-genocide',
          loc: { section: 'The Armenian Genocide', para: '11' }
        }
      ]
    },
    {
      name: 'Ahmet Cemal Pasha',
      role: 'perpetrator',
      cites: [
        { source: 'loc-turkey-country-study-1995', loc: { section: 'World War I', para: '7' } }
      ]
    },
    {
      name: 'Special Organization (Teşkilat-ı Mahsusa)',
      role: 'perpetrator',
      cites: [
        {
          source: 'eo1418-suny-armenian-genocide',
          loc: { section: 'Mass Deportation, Forced Marches, and Death Camps', para: '2' }
        },
        {
          source: 'ehne-adjemian-armenian-genocide',
          loc: { section: 'The Armenian Genocide', para: '12' }
        }
      ]
    },
    {
      name: 'Behaeddin Şakir',
      role: 'organizer',
      cites: [
        {
          source: 'eo1418-suny-armenian-genocide',
          loc: { section: 'The “Evolution” of Armenian Genocide', para: '1' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'deaths',
      value: {
        alts: [
          {
            value: { min: 600000, max: 800000 },
            cites: [
              {
                source: 'eo1418-suny-armenian-genocide',
                loc: { section: 'Conclusion', para: '1' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Ronald Grigor Suny' }
            ]
          },
          {
            value: { min: 600000, max: 2000000 },
            cites: [
              {
                source: 'loc-armenia-country-study-1995',
                loc: { section: 'The Young Turks', para: '2' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
            ]
          },
          {
            value: { min: 600000, qualifier: 'over' },
            cites: [
              {
                source: 'loc-turkey-country-study-1995',
                loc: { section: 'Armenians', para: '1' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
            ]
          },
          {
            value: { min: 1500000 },
            cites: [
              {
                source: 'whitehouse-2021-04-24-biden-armenian-remembrance-day',
                loc: {
                  section: 'Statement by President Joe Biden on Armenian Remembrance Day',
                  para: '1'
                }
              }
            ],
            heldBy: [
              { kind: 'state', name: 'United States' }
            ]
          }
        ]
      }
    }
  ],
  related: [
    { ref: 'event:hamidian-massacres', rel: 'preceded-by' },
    { ref: 'event:first-world-war', rel: 'related' },
    { ref: 'event:young-turk-revolution', rel: 'related' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'In early 1915 the Young Turk government of the Ottoman Empire decided to deport hundreds of thousands of Armenians and Assyrians from their homes into distant parts of the Empire, eventually into the deserts of Syria. Armenian soldiers in the Ottoman Army were demobilized and massacred; women and children were driven on long marches, starved, beaten, and often murdered.',
          lang: 'en',
          cite: { source: 'eo1418-suny-armenian-genocide', loc: { section: 'Armenian Genocide' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/armenian-genocide/'
          }
        },
        {
          id: 'q2',
          text: 'Perpetrated in the name of a nationalist ideology that was inspired by European models, the genocide of 1915-1916 represented a turning point in terms of scale, methods and perspective in the mass atrocities being committed during the waning of the Ottoman Empire.',
          lang: 'en',
          cite: {
            source: 'ehne-adjemian-armenian-genocide',
            loc: { section: 'The Armenian Genocide', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/en/encyclopedia/themes/wars-and-memories/violence-war/armenian-genocide'
          }
        },
        {
          id: 'q3',
          text: '1915 Massacre of thousands of Armenians at the hands of Ottoman Turks, a crime that Armenians consider to be an act of genocide.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1915' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-2/'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q4',
          text: 'The Armenian population that remained in the Ottoman Empire after the 1895 massacre supported the 1908 revolution of the Committee of Union and Progress, better known as the Young Turks, who promised liberal treatment of ethnic minorities.',
          lang: 'en',
          cite: {
            source: 'loc-armenia-country-study-1995',
            loc: { section: 'The Young Turks', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/armenia/9.htm' }
        },
        {
          id: 'q5',
          text: 'A disastrous defeat followed in which Enver lost three-quarters of his army – more than 45,000 men. Some Armenian soldiers deserted, and a few Ottoman Armenians fled to the areas occupied by the Russians, confirming in Turkish minds the treachery that marked the Christian minorities.',
          lang: 'en',
          cite: {
            source: 'eo1418-suny-armenian-genocide',
            loc: { section: 'The “Evolution” of Armenian Genocide', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/armenian-genocide/'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q6',
          text: 'Guarded by Ottoman soldiers and gendarmes, they were attacked and slaughtered by the çetes (gangs of irregular fighters) of the Teşkilat-ı Mahsusa (Special Organization), and by Kurds, Turks, and Circassians.',
          lang: 'en',
          cite: {
            source: 'eo1418-suny-armenian-genocide',
            loc: { section: 'Mass Deportation, Forced Marches, and Death Camps', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/armenian-genocide/'
          }
        },
        {
          id: 'q7',
          text: 'Armenian houses were systematically handed over to Muslim migrants (muhacir) and Armenian assets transferred to an exclusively Muslim economy.',
          lang: 'en',
          cite: { source: 'eo1418-kieser-talat', loc: { section: 'Armenian Genocide', para: '5' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/pasha-talat/'
          }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q8',
          text: 'Estimates of the Armenians killed in the deportations and massacres of 1915-1916 range from a few hundred thousand to 1,500,000. The more conservative estimates of between 600,000 and 800,000 killed, with hundreds of thousands of others converted to Islam or surviving as refugees, appear most accurate.',
          lang: 'en',
          cite: {
            source: 'eo1418-suny-armenian-genocide',
            loc: { section: 'Conclusion', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/armenian-genocide/'
          }
        },
        {
          id: 'q9',
          text: 'Estimates vary from 600,000 to 2 million deaths out of the prewar population of about 3 million Armenians. By 1917 fewer than 200,000 Armenians remained in Turkey.',
          lang: 'en',
          cite: {
            source: 'loc-armenia-country-study-1995',
            loc: { section: 'The Young Turks', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/armenia/9.htm' }
        },
        {
          id: 'q10',
          text: 'Between killings and deportation, approximately two thirds of the 2.1 million Ottoman Armenians were eliminated during the genocide.',
          lang: 'en',
          cite: {
            source: 'ehne-adjemian-armenian-genocide',
            loc: { section: 'The Armenian Genocide', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/en/encyclopedia/themes/wars-and-memories/violence-war/armenian-genocide'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q11',
          text: 'The Istanbul Trials (1919) were essentially an opportunity for the new, post-war Ottoman authorities to deny responsibility for the CUP’s political legacy.',
          lang: 'en',
          cite: {
            source: 'ehne-adjemian-armenian-genocide',
            loc: { section: 'The Armenian Genocide', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/en/encyclopedia/themes/wars-and-memories/violence-war/armenian-genocide'
          }
        },
        {
          id: 'q12',
          text: 'Nevertheless, the event, as well as the reactions it provoked at the time, did play a decisive role in Rafael Lemkin’s formulation of the concept of genocide (1944).',
          lang: 'en',
          cite: {
            source: 'ehne-adjemian-armenian-genocide',
            loc: { section: 'The Armenian Genocide', para: '17' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/en/encyclopedia/themes/wars-and-memories/violence-war/armenian-genocide'
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
            value: { d: '1915-02' },
            cites: [
              {
                source: 'ehne-adjemian-armenian-genocide',
                loc: { section: 'The Armenian Genocide', para: '11' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'In February 1915, order was given to disarm Armenian conscripts in the third Ottoman army, and to transfer them to the labor battalions (amele taburiler), where they were murdered over the next few months by the Turkish soldiers and officers commanding them.',
        lang: 'en',
        cite: {
          source: 'ehne-adjemian-armenian-genocide',
          loc: { section: 'The Armenian Genocide', para: '11' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://ehne.fr/en/encyclopedia/themes/wars-and-memories/violence-war/armenian-genocide'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1915-04-24' },
            cites: [
              {
                source: 'eo1418-suny-armenian-genocide',
                loc: { section: 'Mass Deportation, Forced Marches, and Death Camps', para: '1' }
              },
              {
                source: 'ehne-adjemian-armenian-genocide',
                loc: { section: 'The Armenian Genocide', para: '11' }
              },
              {
                source: 'whitehouse-2021-04-24-biden-armenian-remembrance-day',
                loc: {
                  section: 'Statement by President Joe Biden on Armenian Remembrance Day',
                  para: '1'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'When some Armenians resisted the encroaching massacres in the city of Van in eastern Anatolia, the CUP had the leading intellectuals and politicians in Istanbul, several of them deputies to the Ottoman Parliament, arrested and sent from the city (24 April 1915). Most of them perished in the next few months.',
        lang: 'en',
        cite: {
          source: 'eo1418-suny-armenian-genocide',
          loc: { section: 'Mass Deportation, Forced Marches, and Death Camps', para: '1' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://encyclopedia.1914-1918-online.net/article/armenian-genocide/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1915-05', notAfter: '1915-08' },
            cites: [
              {
                source: 'ehne-adjemian-armenian-genocide',
                loc: { section: 'The Armenian Genocide', para: '12' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'In fact, most of the Armenian population across Anatolia was deported between May and August 1915, although the deportations followed varying methods and logics.',
        lang: 'en',
        cite: {
          source: 'ehne-adjemian-armenian-genocide',
          loc: { section: 'The Armenian Genocide', para: '12' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://ehne.fr/en/encyclopedia/themes/wars-and-memories/violence-war/armenian-genocide'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1916' },
            cites: [
              {
                source: 'ehne-adjemian-armenian-genocide',
                loc: { section: 'The Armenian Genocide', para: '13' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'During the second phase of the genocide, which took place in 1916, CUP leadership essentially ordered the eradication of the survivors who had reached the deserts of Syria between Aleppo, Raqqa, Deir ez-Zor and Ras al-Ayn. Once again, systematic massacres were committed by the Special Organization.',
        lang: 'en',
        cite: {
          source: 'ehne-adjemian-armenian-genocide',
          loc: { section: 'The Armenian Genocide', para: '13' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://ehne.fr/en/encyclopedia/themes/wars-and-memories/violence-war/armenian-genocide'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5c/Armenian_Genocide_Map-en.svg/1280px-Armenian_Genocide_Map-en.svg.png',
    page: 'https://commons.wikimedia.org/wiki/File:Armenian_Genocide_Map-en.svg',
    credit: { creator: 'Sémhur' },
    license: { id: 'cc-by-sa', version: '3.0' }
  },
  archive: [
    {
      id: 'morgenthau-ambassador-morgenthaus-story',
      mediaKind: 'document',
      title: 'Ambassador Morgenthau\'s story',
      date: { d: '1919' },
      url: 'https://archive.org/download/ambassadormorgen00morguoft/ambassadormorgen00morguoft.pdf',
      page: 'https://archive.org/details/ambassadormorgen00morguoft',
      credit: {
        institution: 'Robarts - University of Toronto (Internet Archive)',
        creator: 'Morgenthau, Henry, 1856-'
      },
      license: { id: 'public-domain' },
      bytes: 27184042
    }
  ],
  furtherReading: [
    { source: 'akcam-1999-insan-haklari-ve-ermeni-sorunu', perspective: 'turkish' },
    { source: 'akcam-2006-a-shameful-act', perspective: 'turkish' }
  ]
})
