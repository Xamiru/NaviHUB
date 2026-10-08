import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'jangali-movement',
  names: [
    { text: 'Jangali movement', lang: 'en', role: 'primary' },
    { text: 'نهضت جنگل', lang: 'fa', role: 'native' },
    {
      text: 'Jangali (forest) movement',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-bonakdarian-great-britain-iii',
          loc: { section: 'GREAT BRITAIN iii. British influence in Persia, 1900-21', para: '54' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'movement',
  start: {
    alts: [
      {
        value: { d: '1915' },
        cites: [
          {
            source: 'iranica-dailami-jangali-movement',
            loc: { section: 'JANGALI MOVEMENT', para: '1' }
          },
          {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1915' }
          },
          {
            source: 'iranica-bonakdarian-great-britain-iii',
            loc: { section: 'GREAT BRITAIN iii. British influence in Persia, 1900-21', para: '54' }
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
            source: 'iranica-dailami-jangali-movement',
            loc: { section: 'JANGALI MOVEMENT', para: '1' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Pezhmann Dailami' }
        ]
      },
      {
        value: { d: '1921-10' },
        cites: [
          {
            source: 'iranica-chaqueri-communism-i',
            loc: { section: 'COMMUNISM i. In Persia to 1941', para: '10' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Cosroe Chaqueri' }
        ]
      }
    ]
  },
  regions: ['iran', 'russia-central-asia'],
  prominence: 2,
  places: [
    {
      ref: 'place:gilan',
      cites: [
        {
          source: 'iranica-dailami-jangali-movement',
          loc: { section: 'JANGALI MOVEMENT', para: '9' }
        }
      ]
    },
    {
      ref: 'place:rasht',
      cites: [
        {
          source: 'iranica-dailami-jangali-movement',
          loc: { section: 'JANGALI MOVEMENT', para: '11' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:reign-of-ahmad-shah-qajar' },
    { ref: 'period:qajar-dynasty' }
  ],
  polities: [
    { ref: 'polity:qajar-iran' }
  ],
  participants: [
    {
      ref: 'person:mirza-kuchik-khan',
      role: 'leader',
      cites: [
        {
          source: 'iranica-dailami-jangali-movement',
          loc: { section: 'JANGALI MOVEMENT', para: '1' }
        },
        {
          source: 'iranica-yarshater-chronology-part-2',
          loc: { section: 'Chronology of Iranian History Part 2, 1915' }
        }
      ]
    },
    {
      name: 'Ḥāji Aḥmad Kasmāʾi',
      role: 'leader',
      cites: [
        {
          source: 'iranica-dailami-jangali-movement',
          loc: { section: 'JANGALI MOVEMENT', para: '34' }
        }
      ]
    },
    {
      name: 'Ehsān-Allāh Khan Dustdār',
      role: 'leader',
      cites: [
        {
          source: 'iranica-dailami-jangali-movement',
          loc: { section: 'JANGALI MOVEMENT', para: '60' }
        }
      ]
    },
    {
      name: 'Nikolai Baratov',
      role: 'commander',
      cites: [
        {
          source: 'iranica-dailami-jangali-movement',
          loc: { section: 'JANGALI MOVEMENT', para: '13' }
        }
      ]
    },
    {
      name: 'Lionel Dunsterville',
      role: 'commander',
      cites: [
        {
          source: 'iranica-dailami-jangali-movement',
          loc: { section: 'JANGALI MOVEMENT', para: '49' }
        }
      ]
    },
    {
      ref: 'person:vosuq-al-dowleh',
      role: 'head-of-government',
      cites: [
        {
          source: 'iranica-dailami-jangali-movement',
          loc: { section: 'JANGALI MOVEMENT', para: '58' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:iran-in-the-first-world-war', rel: 'related' },
    { ref: 'event:russian-revolution-of-1917', rel: 'related' },
    { ref: 'event:anglo-persian-agreement-of-1919', rel: 'related' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'JANGALI MOVEMENT (1915-20), a movement that took shape in the aftermath of the 1905-11 Constitutional Revolution, under the leadership of Mirzˊā Kuček Khan Jangali (q.v.), in response to the period of political decay brought about by the advent of World War I and the occupation of Iran by Anglo-Russian and Ottoman troops.',
          lang: 'en',
          cite: {
            source: 'iranica-dailami-jangali-movement',
            loc: { section: 'JANGALI MOVEMENT', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/jangali-movement'
          }
        },
        {
          id: 'q2',
          text: 'In 1915 a nationalist revolt had broken out in the northern Caspian province of Gilān, directed against the central government, corrupt local landowners, and foreign intervention in Persia.',
          lang: 'en',
          cite: {
            source: 'iranica-bonakdarian-great-britain-iii',
            loc: { section: 'GREAT BRITAIN iii. British influence in Persia, 1900-21', para: '54' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/great-britain-iii'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Gilān’s administration completely collapsed when in August 1914 the Russian forces left for the Caucasus. Chaos ensued, and even the Qajar governors refused to uphold the law and enforce order without the protection of the Russian army. Disobedience began in mild forms. There were collective complaints about landlords and Russian agents, and a few industrial strikes took place. But by the beginning of 1915, Gilān was the scene of widespread unrest.',
          lang: 'en',
          cite: {
            source: 'iranica-dailami-jangali-movement',
            loc: { section: 'JANGALI MOVEMENT', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/jangali-movement'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'In 1917, the Jangalis carried out important reforms. They exempted the peasants (for the time being) from paying tax or dues. They took over and supervised the distribution of water to farms, a perennial source of quarrel between peasants and landlords (FO 248/1168: Jangal, No. 2, 17 June 1917; decipher 18, 21 May 1917; decipher 22, 16 July 1917). These measures encouraged productivity and while famine ruled in the rest of Iran, agricultural production in Gilān reached an all time high. The Jangalis in fact sent rice to famine-stricken Tehran, as well as actively feeding the besieged city of Baku in Russian Azarbaijan.',
          lang: 'en',
          cite: {
            source: 'iranica-dailami-jangali-movement',
            loc: { section: 'JANGALI MOVEMENT', para: '32' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/jangali-movement'
          }
        },
        {
          id: 'q5',
          text: 'By early 1918, the Jangalis had formed a revolutionary army that has been estimated to have numbered between 3,000 and 8,000 men, but the turn of events did not allow for the pre-conditions of revolution.',
          lang: 'en',
          cite: {
            source: 'iranica-dailami-jangali-movement',
            loc: { section: 'JANGALI MOVEMENT', para: '46' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/jangali-movement'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q16',
          text: 'The Russian Revolutions of March and October 1917 had a profound impact on Persian nationalism, British policy towards Persia, and the range of anti-British activities in Persia.',
          lang: 'en',
          cite: {
            source: 'iranica-bonakdarian-great-britain-iii',
            loc: { section: 'GREAT BRITAIN iii. British influence in Persia, 1900-21', para: '53' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/great-britain-iii'
          }
        },
        {
          id: 'q6',
          text: 'This revolt, led by Mirzā Kuček Khan, and known as the Jangali (forest) movement, posed the most serious military challenge to British post-war prestige in Persia and would be a factor in precipitating the British-sponsored coup d’etat of 1921, led by Reżā Khan and Sayyed Ziāʾ-al-Din Ṭabāṭabāʾi.',
          lang: 'en',
          cite: {
            source: 'iranica-bonakdarian-great-britain-iii',
            loc: { section: 'GREAT BRITAIN iii. British influence in Persia, 1900-21', para: '54' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/great-britain-iii'
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
            value: { d: '1915-10' },
            cites: [
              {
                source: 'iranica-dailami-jangali-movement',
                loc: { section: 'JANGALI MOVEMENT', para: '10' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'The earliest known Jangali operation took place in October 1915 when the governor of Rašt put a certain landowner, ʿAbd-al-Razzāq Šafti, in charge of the district of Pasiḵān with a view to preventing the Jangalis from approaching Rašt.',
        lang: 'en',
        cite: {
          source: 'iranica-dailami-jangali-movement',
          loc: { section: 'JANGALI MOVEMENT', para: '10' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/jangali-movement'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1916-01' },
            cites: [
              {
                source: 'iranica-dailami-jangali-movement',
                loc: { section: 'JANGALI MOVEMENT', para: '13' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'At about the same time a large number of Russian troops from Rašt, Anzali, Manjil and Zanjān were sent on an expedition against the Jangalis, who were heavily defeated in January 1916, but Baratov’s forces stopped just short of completely destroying them.',
        lang: 'en',
        cite: {
          source: 'iranica-dailami-jangali-movement',
          loc: { section: 'JANGALI MOVEMENT', para: '13' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/jangali-movement'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1917-08' },
            cites: [
              {
                source: 'iranica-dailami-jangali-movement',
                loc: { section: 'JANGALI MOVEMENT', para: '29' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'The Jangalis established themselves in Gilān in a surprisingly short time. Maclaren, the British Acting vice-consul, was probably too late in reporting in August that they had become “to all intents and purposes the masters of Gilān” (FO 248/1168: decipher 32, 20 Aug. 1917).',
        lang: 'en',
        cite: {
          source: 'iranica-dailami-jangali-movement',
          loc: { section: 'JANGALI MOVEMENT', para: '29' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/jangali-movement'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1918-06' },
            cites: [
              {
                source: 'iranica-bonakdarian-great-britain-iii',
                loc: {
                  section: 'GREAT BRITAIN iii. British influence in Persia, 1900-21',
                  para: '60'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'In June 1918, the Jangalis had forced the retreat of British forces, led by Major-General Lio-nel Dunsterville, from areas under their control, through which the British forces hoped to reach the Russian Caucasus where the Russian war effort against the Ottomans had fizzled out in the aftermath of the Bolshevik Revolution.',
        lang: 'en',
        cite: {
          source: 'iranica-bonakdarian-great-britain-iii',
          loc: { section: 'GREAT BRITAIN iii. British influence in Persia, 1900-21', para: '60' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/great-britain-iii'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1918-08-12' },
            cites: [
              {
                source: 'iranica-dailami-jangali-movement',
                loc: { section: 'JANGALI MOVEMENT', para: '50' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Pezhmann Dailami' }
            ]
          },
          {
            value: { d: '1918-07' },
            cites: [
              {
                source: 'iranica-bonakdarian-great-britain-iii',
                loc: {
                  section: 'GREAT BRITAIN iii. British influence in Persia, 1900-21',
                  para: '60'
                }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Mansour Bonakdarian' }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'They thus came to terms with the British and signed an agreement with them on 12 August 1918 (Fakhraii, pp. 153-57).',
        lang: 'en',
        cite: {
          source: 'iranica-dailami-jangali-movement',
          loc: { section: 'JANGALI MOVEMENT', para: '50' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/jangali-movement'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1919-03-29' },
            cites: [
              {
                source: 'iranica-dailami-jangali-movement',
                loc: { section: 'JANGALI MOVEMENT', para: '59' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'Action against the revolutionaries started on 29 March 1919, when a detachment of British troops entered Rašt.',
        lang: 'en',
        cite: {
          source: 'iranica-dailami-jangali-movement',
          loc: { section: 'JANGALI MOVEMENT', para: '59' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/jangali-movement'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1920-05-18' },
            cites: [
              {
                source: 'iranica-dailami-jangali-movement',
                loc: { section: 'JANGALI MOVEMENT', para: '64' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'The 11th Red Army, having entered Baku on 28 April 1920, landed in Gilān on 18 May and the Bolsheviks were welcomed by the Jangalis.',
        lang: 'en',
        cite: {
          source: 'iranica-dailami-jangali-movement',
          loc: { section: 'JANGALI MOVEMENT', para: '64' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/jangali-movement'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1920-06-05' },
            cites: [
              {
                source: 'iranica-dailami-jangali-movement',
                loc: { section: 'JANGALI MOVEMENT', para: '65' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'The political demands of the radical leaders of the Jangali movement eventually culminated in the establishment of the Soviet Republic of Gilān on 5 June 1920.',
        lang: 'en',
        cite: {
          source: 'iranica-dailami-jangali-movement',
          loc: { section: 'JANGALI MOVEMENT', para: '65' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/jangali-movement'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1921-10' },
            cites: [
              {
                source: 'iranica-chaqueri-communism-i',
                loc: { section: 'COMMUNISM i. In Persia to 1941', para: '10' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'A combination of external political pressure, internal party conflict, and military persecution led, at the end of October 1921, to final defeat of the Jangalīs by a superior force supported by both Britain and the Soviet Union (Chaqueri, 1983, pp. 69-85).',
        lang: 'en',
        cite: {
          source: 'iranica-chaqueri-communism-i',
          loc: { section: 'COMMUNISM i. In Persia to 1941', para: '10' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/communism-i'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/59/Mirza_Kuchik_Khan_mausoleum_01.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Mirza_Kuchik_Khan_mausoleum_01.jpg',
    credit: { creator: 'Ali Asadollahi' },
    license: { id: 'cc-by', version: '4.0' }
  },
  archive: [
    {
      id: 'dunsterville-adventures-of-dunsterforce-1920',
      mediaKind: 'document',
      title: 'The adventures of Dunsterforce',
      date: { d: '1920' },
      url: 'https://archive.org/download/adventuresofduns00dunsrich/adventuresofduns00dunsrich.pdf',
      page: 'https://archive.org/details/adventuresofduns00dunsrich',
      credit: {
        institution: 'University of California Libraries (Internet Archive)',
        creator: 'Dunsterville, L. C. (Lionel Charles), 1865-1946'
      },
      license: { id: 'public-domain' },
      bytes: 27628488
    }
  ],
  furtherReading: [
    { source: 'fakhrai-1978-sardar-e-jangal', perspective: 'iranian' }
  ]
})
