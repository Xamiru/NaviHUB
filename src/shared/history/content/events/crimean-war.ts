import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'crimean-war',
  names: [
    { text: 'Crimean War', lang: 'en', role: 'primary' },
    { text: 'Крымская война', lang: 'ru', role: 'native' },
    {
      text: 'guerre de Crimée',
      lang: 'fr',
      role: 'alternative',
      cites: [
        {
          source: 'elysee-louis-napoleon-bonaparte',
          loc: { section: 'Louis-Napoléon Bonaparte' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1853' },
        cites: [
          {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Ruling the Empire', para: '17' }
          },
          {
            source: 'loc-austria-country-study-1994',
            loc: { section: 'The Failure of Neoabsolutism', para: '2' }
          },
          {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '16'
            }
          },
          {
            source: 'loc-romania-country-study-1989',
            loc: { section: 'The Crimean War and Unification', para: '1' }
          }
        ]
      },
      {
        value: { d: '1854' },
        cites: [
          {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'External Threats and Internal Transformations', para: '6' }
          },
          {
            source: 'elysee-louis-napoleon-bonaparte',
            loc: { section: 'Louis-Napoléon Bonaparte' }
          },
          {
            source: 'iranica-calmard-anglo-persian-war',
            loc: { section: 'ANGLO-PERSIAN WAR (1856-57)', para: '12' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1856-04' },
        cites: [
          {
            source: 'iranica-calmard-anglo-persian-war',
            loc: { section: 'ANGLO-PERSIAN WAR (1856-57)', para: '4' }
          }
        ]
      },
      {
        value: { d: '1855' },
        cites: [
          {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '16'
            }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Abbas Amanat' }
        ]
      },
      {
        value: { d: '1856-03-30' },
        cites: [
          {
            source: 'britannica-1911-crimean-war',
            loc: { section: 'CRIMEAN WAR', para: '13' }
          }
        ],
        heldBy: [
          { kind: 'organization', name: 'Encyclopædia Britannica' }
        ]
      }
    ]
  },
  regions: ['europe', 'russia-central-asia', 'mena'],
  prominence: 1,
  places: [
    {
      ref: 'place:sevastopol',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Ruling the Empire', para: '17' }
        }
      ]
    }
  ],
  polities: [
    { ref: 'polity:second-french-empire' },
    { ref: 'polity:united-kingdom' },
    { ref: 'polity:ottoman-empire' }
  ],
  sides: [
    {
      key: 'allies',
      name: 'France, Britain, and the Ottoman Empire',
      cites: [
        {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'External Threats and Internal Transformations', para: '6' }
        }
      ]
    },
    {
      key: 'russia',
      name: 'Russia',
      polity: 'polity:russian-empire',
      cites: [
        {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'External Threats and Internal Transformations', para: '6' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:nicholas-i-of-russia',
      role: 'head-of-state',
      side: 'russia',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Ruling the Empire', para: '17' }
        }
      ]
    },
    {
      ref: 'person:alexander-ii-of-russia',
      role: 'head-of-state',
      side: 'russia',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '6' }
        }
      ]
    },
    {
      ref: 'person:napoleon-iii',
      role: 'head-of-state',
      side: 'allies',
      cites: [
        {
          source: 'elysee-louis-napoleon-bonaparte',
          loc: { section: 'Louis-Napoléon Bonaparte' }
        }
      ]
    },
    {
      name: 'Lord John Russell',
      role: 'participant',
      side: 'allies',
      cites: [
        {
          source: 'hansard-commons-1854-03-31-war-with-russia',
          loc: { section: 'HC Deb 31 March 1854 vol 132 cc198-308', para: '3' }
        }
      ]
    },
    {
      name: 'Earl of Clarendon',
      role: 'participant',
      side: 'allies',
      cites: [
        {
          source: 'hansard-lords-1854-03-31-war-with-russia',
          loc: { section: 'HL Deb 31 March 1854 vol 132 cc140-98', para: '3' }
        }
      ]
    },
    {
      ref: 'person:ivan-paskevich',
      role: 'commander',
      side: 'russia',
      cites: [
        { source: 'britannica-1911-crimean-war', loc: { section: 'CRIMEAN WAR', para: '1' } }
      ]
    },
    {
      name: 'Lord Raglan',
      role: 'commander',
      side: 'allies',
      cites: [
        { source: 'britannica-1911-crimean-war', loc: { section: 'CRIMEAN WAR', para: '2' } }
      ]
    },
    {
      name: 'Marshal Saint Arnaud',
      role: 'commander',
      side: 'allies',
      cites: [
        { source: 'britannica-1911-crimean-war', loc: { section: 'CRIMEAN WAR', para: '2' } }
      ]
    },
    {
      name: 'Menshikov',
      role: 'commander',
      side: 'russia',
      cites: [
        { source: 'britannica-1911-crimean-war', loc: { section: 'CRIMEAN WAR', para: '3' } }
      ]
    },
    {
      name: 'Lieut.-Col. Todleben',
      role: 'commander',
      side: 'russia',
      cites: [
        { source: 'britannica-1911-crimean-war', loc: { section: 'CRIMEAN WAR', para: '5' } }
      ]
    },
    {
      name: 'Pélissier',
      role: 'commander',
      side: 'allies',
      cites: [
        { source: 'britannica-1911-crimean-war', loc: { section: 'CRIMEAN WAR', para: '12' } }
      ]
    },
    {
      name: 'Lord Cardigan',
      role: 'commander',
      side: 'allies',
      cites: [
        { source: 'britannica-1911-crimean-war', loc: { section: 'CRIMEAN WAR', para: '6' } }
      ]
    },
    {
      name: 'Florence Nightingale',
      role: 'participant',
      side: 'allies',
      cites: [
        { source: 'britannica-1911-crimean-war', loc: { section: 'CRIMEAN WAR', para: '8' } }
      ]
    }
  ],
  related: [
    {
      ref: 'event:treaty-of-paris-1856',
      rel: 'led-to',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '15' }
        }
      ]
    },
    { ref: 'period:reign-of-nicholas-i', rel: 'related' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q3',
          text: 'The Crimean War (1854-56) pitted France, Britain, and the Ottoman Empire against Russia.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'External Threats and Internal Transformations', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/turkey/10.htm' }
        },
        {
          id: 'q4',
          text: 'Fearing the results of an Ottoman defeat by Russia, in 1854 Britain and France joined what became known as the Crimean War on the Ottoman side.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Ruling the Empire', para: '17' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/5.htm' }
        },
        {
          id: 'q5',
          text: 'Austria offered the Ottomans diplomatic support, and Prussia remained neutral, leaving Russia without allies on the continent.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Ruling the Empire', para: '17' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/5.htm' }
        },
        {
          id: 'q6',
          text: 'The European allies landed in Crimea and laid siege to the well-fortified Russian base at Sevastopol\'. After a year\'s siege the base fell, exposing Russia\'s inability to defend a major fortification on its own soil.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Ruling the Empire', para: '17' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/5.htm' }
        },
        {
          id: 'q7',
          text: 'During the Crimean War (1853-56), the situation in Hungary made Austria vulnerable to economic and political pressure from Britain and France, the allies of Turkey against Russia. Thus, when Russia asked for Austria\'s support, Austria initially sought to mediate the conflict but then joined the western allies against Russia.',
          lang: 'en',
          cite: {
            source: 'loc-austria-country-study-1994',
            loc: { section: 'The Failure of Neoabsolutism', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/austria/24.htm' }
        },
        {
          id: 'q14',
          text: 'The two countries jointly participated in the Crimean War against Russia. France did not have a direct interest in taking part in this conflict, but its commitment and victory enabled it to resume its place in the Concert of Europe, and to play a role of arbiter within it.',
          lang: 'en',
          cite: {
            source: 'ehne-anceau-napoleon-iii-and-europe',
            loc: { section: 'Napoleon III and Europe' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://ehne.fr/en/encyclopedia/themes/international-relations/arbiters-and-arbitration-in-europe-beginning-modern-times/napoleon-iii-and-europe'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'In 1853 Tsar Nicholas I of Russia described the Ottoman Empire as "the sick man of Europe."',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'External Threats and Internal Transformations', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/turkey/10.htm' }
        },
        {
          id: 'q2',
          text: 'Russia withdrew from Walachia and Moldavia in 1851 but returned yet again in the summer of 1853, thus precipitating the Crimean War.',
          lang: 'en',
          cite: {
            source: 'loc-romania-country-study-1989',
            loc: { section: 'The Crimean War and Unification', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/romania/15.htm' }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q29',
          text: 'In May 1855 the Crimean theatre of war occupied 174,500 allies (of whom 32,000 were British) and 170,000 Russians. The losses in battle were: allies 70,000 men, Russians 128,700; and the total losses, from all causes and in all theatres of the war: allies 252,600 (including 45,000 English), Russians 256,000 men',
          lang: 'en',
          cite: {
            source: 'britannica-1911-crimean-war',
            loc: { section: 'CRIMEAN WAR', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Crimean_War'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q9',
          text: 'Nicholas I died before the fall of Sevastopol\', but he already had recognized the failure of his regime.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Ruling the Empire', para: '17' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/5.htm' }
        },
        {
          id: 'q10',
          text: 'Russia now faced the choice of initiating major reforms or losing its status as a major European power.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Ruling the Empire', para: '17' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/5.htm' }
        },
        {
          id: 'q11',
          text: 'By failing to repay Russia for its help in Hungary in 1849, Austria lost critical Russian support for its position in Germany and Italy.',
          lang: 'en',
          cite: {
            source: 'loc-austria-country-study-1994',
            loc: { section: 'The Failure of Neoabsolutism', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/austria/24.htm' }
        },
        {
          id: 'q12',
          text: 'In the meantime, the diplomatic scene had changed since the end of the Crimean War in April, 1856: Russia could consider further progress toward India, and France was no longer Britain’s ally (Standish, “The Persian War,” p. 30).',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-anglo-persian-war',
            loc: { section: 'ANGLO-PERSIAN WAR (1856-57)', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/anglo-persian-war-1856-57'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q30',
          text: 'Canrobert took over the lines before the Malakoff to relieve the British. He had at the end of January 1855 78,000 men for duty; Raglan could barely muster 12,000. But, with the advent of spring, paved roads and a railway were promptly taken in hand, and during the remainder of the war the British troops were so well cared for that their death-rate was lower than at home, while the hospitals in rear, thanks to the energy and devotion of Florence Nightingale and her nurses, became models of good management.',
          lang: 'en',
          cite: { source: 'britannica-1911-crimean-war', loc: { section: 'CRIMEAN WAR', para: '8' } },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Crimean_War'
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
            value: { d: '1853-10' },
            cites: [
              {
                source: 'britannica-1911-crimean-war',
                loc: { section: 'CRIMEAN WAR', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'When Turkey, after a period of irregular fighting, declared war on Russia in October 1853, Great Britain and France (subsequently assisted by Sardinia) intervened in the quarrel.',
        lang: 'en',
        cite: { source: 'britannica-1911-crimean-war', loc: { section: 'CRIMEAN WAR', para: '1' } },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Crimean_War'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1853-11-30' },
            cites: [
              {
                source: 'britannica-1911-crimean-war',
                loc: { section: 'CRIMEAN WAR', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'At first this intervention was represented merely by the presence of an allied squadron in the Bosporus, but the storm of indignation aroused in Great Britain and France by the destruction of the Turkish fleet at Sinope (30th November) soon impelled these powers to more active measures.',
        lang: 'en',
        cite: { source: 'britannica-1911-crimean-war', loc: { section: 'CRIMEAN WAR', para: '1' } },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Crimean_War'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1854-08-02' },
            cites: [
              {
                source: 'britannica-1911-crimean-war',
                loc: { section: 'CRIMEAN WAR', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q17',
        text: 'The Russian offensive was at an end, the army hastily fell back, and on the 2nd of August 1854 the last man recrossed the Pruth.',
        lang: 'en',
        cite: { source: 'britannica-1911-crimean-war', loc: { section: 'CRIMEAN WAR', para: '1' } },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Crimean_War'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1854-09-13' },
            cites: [
              {
                source: 'britannica-1911-crimean-war',
                loc: { section: 'CRIMEAN WAR', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q18',
        text: 'One hundred and fifty war-vessels and transports conveyed the army, which, guarded on all sides by the fighting fleet, crossed without incident and drew up on the Crimean coast on September 13th.',
        lang: 'en',
        cite: { source: 'britannica-1911-crimean-war', loc: { section: 'CRIMEAN WAR', para: '2' } },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Crimean_War'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1854-09-25' },
            cites: [
              {
                source: 'britannica-1911-crimean-war',
                loc: { section: 'CRIMEAN WAR', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q19',
        text: 'On the 23rd of September the advance was resumed, and by the 25th Sevastopol was in full view of the allied outposts.',
        lang: 'en',
        cite: { source: 'britannica-1911-crimean-war', loc: { section: 'CRIMEAN WAR', para: '4' } },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Crimean_War'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1854-10-25' },
            cites: [
              {
                source: 'britannica-1911-crimean-war',
                loc: { section: 'CRIMEAN WAR', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q20',
        text: 'Lord Cardigan led the Light Brigade straight at the Russian field batteries, behind which the enemy’s squadrons had re-formed.',
        lang: 'en',
        cite: { source: 'britannica-1911-crimean-war', loc: { section: 'CRIMEAN WAR', para: '6' } },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Crimean_War'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1854-11-05' },
            cites: [
              {
                source: 'britannica-1911-crimean-war',
                loc: { section: 'CRIMEAN WAR', para: '7' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q21',
        text: 'The junction of the covering army and the siege corps near Inkerman was the scene of a slight action on the day following Balaklava, and the battle of Inkerman followed on the 5th of November.',
        lang: 'en',
        cite: { source: 'britannica-1911-crimean-war', loc: { section: 'CRIMEAN WAR', para: '7' } },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Crimean_War'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1854-11-14' },
            cites: [
              {
                source: 'britannica-1911-crimean-war',
                loc: { section: 'CRIMEAN WAR', para: '8' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q22',
        text: 'It was now obvious that the army must winter in the Crimea, and preparations in view of this were begun betimes. But on the night of November 14th a violent storm arose which wrecked nearly thirty vessels with their precious cargoes of treasure, medical comforts, forage, clothing and other necessaries.',
        lang: 'en',
        cite: { source: 'britannica-1911-crimean-war', loc: { section: 'CRIMEAN WAR', para: '8' } },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Crimean_War'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1855-06-18' },
            cites: [
              {
                source: 'britannica-1911-crimean-war',
                loc: { section: 'CRIMEAN WAR', para: '12' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q23',
        text: 'The French attack on the Malakoff dwindled away into a meaningless fire-fight: the British, attacking the Redan in face of a cross-fire of one hundred heavy guns, at first succeeded in entering the work, but in the end sustained a bloody and disastrous repulse.',
        lang: 'en',
        cite: { source: 'britannica-1911-crimean-war', loc: { section: 'CRIMEAN WAR', para: '12' } },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Crimean_War'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1855-08-16' },
            cites: [
              {
                source: 'britannica-1911-crimean-war',
                loc: { section: 'CRIMEAN WAR', para: '13' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q24',
        text: 'On the 16th of August the corps of Generals Liprandi and Read furiously attacked the 37,000 French and Sardinian troops on the heights above Traktir Bridge.',
        lang: 'en',
        cite: { source: 'britannica-1911-crimean-war', loc: { section: 'CRIMEAN WAR', para: '13' } },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Crimean_War'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1855-09-08' },
            cites: [
              {
                source: 'britannica-1911-crimean-war',
                loc: { section: 'CRIMEAN WAR', para: '13' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q25',
        text: 'On the 8th of September 1855 at noon, the whole of Bosquet’s corps suddenly swarmed up to the Malakoff.',
        lang: 'en',
        cite: { source: 'britannica-1911-crimean-war', loc: { section: 'CRIMEAN WAR', para: '13' } },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Crimean_War'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1855-09-09' },
            cites: [
              {
                source: 'britannica-1911-crimean-war',
                loc: { section: 'CRIMEAN WAR', para: '13' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q26',
        text: 'The fall of the Malakoff was the end of the siege. All night the Russians were filing over the bridges to the north side, and on the 9th the victors took possession of the empty and burning prize.',
        lang: 'en',
        cite: { source: 'britannica-1911-crimean-war', loc: { section: 'CRIMEAN WAR', para: '13' } },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Crimean_War'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1855-11-26' },
            cites: [
              {
                source: 'britannica-1911-crimean-war',
                loc: { section: 'CRIMEAN WAR', para: '15' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q27',
        text: 'Next year Count Muraviev completely isolated the garrison of Kars, which made a magnificent defence, inspired by Fenwick Williams Pasha and other British officers. In one assault alone 7000 Russians were killed and wounded, and it was not until the 26th of November 1855 that the fortress was forced to surrender.',
        lang: 'en',
        cite: { source: 'britannica-1911-crimean-war', loc: { section: 'CRIMEAN WAR', para: '15' } },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Crimean_War'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1856-03-30' },
            cites: [
              {
                source: 'britannica-1911-crimean-war',
                loc: { section: 'CRIMEAN WAR', para: '13' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q28',
        text: 'An armistice was agreed upon on the 26th of February and the definitive peace of Paris was signed on the 30th of March 1856.',
        lang: 'en',
        cite: { source: 'britannica-1911-crimean-war', loc: { section: 'CRIMEAN WAR', para: '13' } },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Crimean_War'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/96/RogerFentonvalley1.jpg/1280px-RogerFentonvalley1.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:RogerFentonvalley1.jpg',
    credit: {
      institution: 'Library of Congress Prints and Photographs Division',
      creator: 'Roger Fenton'
    },
    license: { id: 'public-domain' }
  },
  figures: [
    {
      key: 'combatants',
      side: 'allies',
      value: {
        alts: [
          {
            value: { min: 174500 },
            cites: [
              {
                source: 'britannica-1911-crimean-war',
                loc: { section: 'CRIMEAN WAR', para: '16' }
              }
            ]
          }
        ]
      }
    },
    {
      key: 'combatants',
      side: 'russia',
      value: {
        alts: [
          {
            value: { min: 170000 },
            cites: [
              {
                source: 'britannica-1911-crimean-war',
                loc: { section: 'CRIMEAN WAR', para: '16' }
              }
            ]
          }
        ]
      }
    },
    {
      key: 'casualties',
      side: 'allies',
      value: {
        alts: [
          {
            value: { min: 252600 },
            cites: [
              {
                source: 'britannica-1911-crimean-war',
                loc: { section: 'CRIMEAN WAR', para: '16' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Berndt' }
            ]
          }
        ]
      }
    },
    {
      key: 'casualties',
      side: 'russia',
      value: {
        alts: [
          {
            value: { min: 256000 },
            cites: [
              {
                source: 'britannica-1911-crimean-war',
                loc: { section: 'CRIMEAN WAR', para: '16' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Berndt' }
            ]
          }
        ]
      }
    }
  ],
  furtherReading: [
    { source: 'tarle-1950-krymskaia-voina', perspective: 'russian-soviet' },
    { source: 'badem-2010-ottoman-crimean-war', perspective: 'turkish' },
    { source: 'kurat-1970-turkiye-ve-rusya', perspective: 'turkish' }
  ]
})
