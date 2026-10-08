import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'battle-of-waterloo',
  names: [
    { text: 'Battle of Waterloo', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  type: 'battle',
  start: {
    alts: [
      {
        value: { d: '1815-06-18' },
        cites: [
          {
            source: 'fondation-napoleon-timeline-consulate-first-empire',
            loc: { section: 'Timeline: Consulate/1st French Empire, 1815 – A YEAR LIKE NO OTHER' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 1,
  places: [
    {
      ref: 'place:waterloo',
      cites: [
        {
          source: 'fondation-napoleon-timeline-consulate-first-empire',
          loc: { section: 'Timeline: Consulate/1st French Empire, 1815 – A YEAR LIKE NO OTHER' }
        }
      ]
    }
  ],
  partOf: [
    {
      ref: 'event:hundred-days',
      cites: [
        {
          source: 'fondation-napoleon-timeline-consulate-first-empire',
          loc: { section: 'Timeline: Consulate/1st French Empire, 1815 – A YEAR LIKE NO OTHER' }
        }
      ]
    }
  ],
  polities: [
    { ref: 'polity:united-kingdom' }
  ],
  participants: [
    {
      ref: 'person:napoleon-bonaparte',
      role: 'commander',
      cites: [
        {
          source: 'fondation-napoleon-timeline-consulate-first-empire',
          loc: { section: 'Timeline: Consulate/1st French Empire, 1815 – A YEAR LIKE NO OTHER' }
        }
      ],
      side: 'french'
    },
    {
      name: 'Gebhard von Blücher',
      role: 'commander',
      cites: [
        {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'The French Revolution and Germany', para: '3' }
        }
      ],
      side: 'prussian'
    },
    {
      name: 'Duke of Wellington',
      role: 'commander',
      cites: [
        { source: 'nam-battle-of-waterloo', loc: { section: 'Battle of Waterloo', para: '1' } }
      ],
      side: 'anglo-allied'
    },
    {
      name: 'Marshal Ney',
      role: 'commander',
      side: 'french',
      cites: [
        {
          source: 'nam-battle-of-waterloo',
          loc: { section: 'Battle of Waterloo', para: '52' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q4',
          text: 'The Battle of Waterloo was fought on 18 June 1815 between Napoleon’s French Army and a coalition led by the Duke of Wellington and Marshal Blücher. The decisive battle of its age, it concluded a war that had raged for 23 years, ended French attempts to dominate Europe, and destroyed Napoleon’s imperial power forever.',
          lang: 'en',
          cite: {
            source: 'nam-battle-of-waterloo',
            loc: { section: 'Battle of Waterloo', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.nam.ac.uk/explore/battle-waterloo'
          }
        },
        {
          id: 'q2',
          text: 'Prussian forces under General Gebhard von Blücher were essential to the final victory over Napoleon at the Battle of Waterloo in 1815.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The French Revolution and Germany', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/22.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q5',
          text: 'The French Emperor Napoleon Bonaparte had escaped from exile in March 1815 and returned to power. He decided to go on the offensive, hoping to win a quick victory that would tear apart the coalition of European armies formed against him.',
          lang: 'en',
          cite: {
            source: 'nam-battle-of-waterloo',
            loc: { section: 'Battle of Waterloo', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.nam.ac.uk/explore/battle-waterloo'
          }
        },
        {
          id: 'q6',
          text: 'Two armies - the Prussians, led by Field Marshal Gebhard von Blücher, and an Anglo-Allied force, under Field Marshal the Duke of Wellington - were gathering in the Netherlands. Together, they outnumbered the French. Napoleon’s best chance of success was therefore to keep them apart and defeat each one separately.',
          lang: 'en',
          cite: {
            source: 'nam-battle-of-waterloo',
            loc: { section: 'Battle of Waterloo', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.nam.ac.uk/explore/battle-waterloo'
          }
        }
      ]
    },
    {
      kind: 'causes',
      quotes: [
        {
          id: 'q18',
          text: 'The causes of Napoleon’s failure in the Waterloo campaign were as follows:—The French army was numerically too weak for the gigantic task it undertook. Napoleon himself was no longer the Napoleon of Marengo or Austerlitz, and though he was not broken down, his physical strength was certainly impaired.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-waterloo-campaign',
            loc: { section: 'WATERLOO CAMPAIGN, 1815', para: '76' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Waterloo_Campaign,_1815'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q3',
          text: 'Refusing to prolong a resistance campaign, as he was advised by a number of his close associates, Napoleon capitulated on 22 June.',
          lang: 'en',
          cite: {
            source: 'fondation-napoleon-timeline-consulate-first-empire',
            loc: { section: 'Timeline: Consulate/1st French Empire, 1815 – A YEAR LIKE NO OTHER' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.napoleon.org/en/young-historians/napodoc/timeline-consulate1st-french-empire/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q16',
          text: 'Waterloo ended the wars that had convulsed Europe since the French Revolution (1789-99). It also ended France’s attempts, whether under Louis XIV or Napoleon, to dominate the continent.',
          lang: 'en',
          cite: {
            source: 'nam-battle-of-waterloo',
            loc: { section: 'Battle of Waterloo', para: '81' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.nam.ac.uk/explore/battle-waterloo'
          }
        },
        {
          id: 'q17',
          text: 'Waterloo inaugurated a general European peace that, apart from the brief interruption of the Crimean War (1854-56), lasted until 1914.',
          lang: 'en',
          cite: {
            source: 'nam-battle-of-waterloo',
            loc: { section: 'Battle of Waterloo', para: '82' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.nam.ac.uk/explore/battle-waterloo'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/72/Battle_of_Waterloo_1815.PNG/1280px-Battle_of_Waterloo_1815.PNG',
    page: 'https://commons.wikimedia.org/wiki/File:Battle_of_Waterloo_1815.PNG',
    credit: { creator: 'William Sadler' },
    license: { id: 'public-domain' }
  },
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1815-06-15' },
            cites: [
              {
                source: 'nam-battle-of-waterloo',
                loc: { section: 'Battle of Waterloo', para: '12' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'Attempting to drive a wedge between his enemies, Napoleon crossed the River Sambre on 15 June, entering what is now Belgium.',
        lang: 'en',
        cite: {
          source: 'nam-battle-of-waterloo',
          loc: { section: 'Battle of Waterloo', para: '12' }
        },
        provenance: { via: 'web', at: '2026-10-07', url: 'https://www.nam.ac.uk/explore/battle-waterloo' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1815-06-16' },
            cites: [
              {
                source: 'nam-battle-of-waterloo',
                loc: { section: 'Battle of Waterloo', para: '67' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'Wellington’s army holds off the French at Quatre Bras. But the main French army defeats the Prussians at Ligny. The Prussians retreat.',
        lang: 'en',
        cite: {
          source: 'nam-battle-of-waterloo',
          loc: { section: 'Battle of Waterloo', para: '69' }
        },
        provenance: { via: 'web', at: '2026-10-07', url: 'https://www.nam.ac.uk/explore/battle-waterloo' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1815-06-17' },
            cites: [
              {
                source: 'nam-battle-of-waterloo',
                loc: { section: 'Battle of Waterloo', para: '70' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'The Prussian withdrawal obliges Wellington to retreat as well. He falls back to a ridge near the village of Waterloo. Wellington plans to fight there until the Prussians come to his aid.',
        lang: 'en',
        cite: {
          source: 'nam-battle-of-waterloo',
          loc: { section: 'Battle of Waterloo', para: '72' }
        },
        provenance: { via: 'web', at: '2026-10-07', url: 'https://www.nam.ac.uk/explore/battle-waterloo' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1815-06-18' },
            cites: [
              {
                source: 'nam-battle-of-waterloo',
                loc: { section: 'Battle of Waterloo', para: '73' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'At 11.30am, following a huge artillery bombardment - partly negated by Wellington’s position and the wet ground - Napoleon launched his diversionary attack against Hougoumont.',
        lang: 'en',
        cite: {
          source: 'nam-battle-of-waterloo',
          loc: { section: 'Battle of Waterloo', para: '37' }
        },
        provenance: { via: 'web', at: '2026-10-07', url: 'https://www.nam.ac.uk/explore/battle-waterloo' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1815-06-18' },
            cites: [
              {
                source: 'nam-battle-of-waterloo',
                loc: { section: 'Battle of Waterloo', para: '73' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'Two hours later, the French attacked the Allied left centre. They drove back the Dutch-Belgians. But as they crested the ridge, they were stopped by British infantry and then faced a counter-attack by British heavy cavalry.',
        lang: 'en',
        cite: {
          source: 'nam-battle-of-waterloo',
          loc: { section: 'Battle of Waterloo', para: '39' }
        },
        provenance: { via: 'web', at: '2026-10-07', url: 'https://www.nam.ac.uk/explore/battle-waterloo' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1815-06-18' },
            cites: [
              {
                source: 'nam-battle-of-waterloo',
                loc: { section: 'Battle of Waterloo', para: '73' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'By mid-afternoon, news of the Prussians\' arrival forced Napoleon to form a defensive line on his right. Soon afterwards, believing the Allies were pulling back, the French cavalry charged the infantry of Wellington’s right centre who formed square.',
        lang: 'en',
        cite: {
          source: 'nam-battle-of-waterloo',
          loc: { section: 'Battle of Waterloo', para: '49' }
        },
        provenance: { via: 'web', at: '2026-10-07', url: 'https://www.nam.ac.uk/explore/battle-waterloo' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1815-06-18' },
            cites: [
              {
                source: 'nam-battle-of-waterloo',
                loc: { section: 'Battle of Waterloo', para: '73' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'Meanwhile, the Prussians continued to arrive on Napoleon’s right, forcing him to detach more troops to steady the situation. At about 6.00pm, the French captured La Haye Sainte, severely weakening Wellington’s position.',
        lang: 'en',
        cite: {
          source: 'nam-battle-of-waterloo',
          loc: { section: 'Battle of Waterloo', para: '51' }
        },
        provenance: { via: 'web', at: '2026-10-07', url: 'https://www.nam.ac.uk/explore/battle-waterloo' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1815-06-18' },
            cites: [
              {
                source: 'nam-battle-of-waterloo',
                loc: { section: 'Battle of Waterloo', para: '73' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'At about 7.00pm, in a last bid for victory, Napoleon released his finest troops, the Imperial Guard. They marched up the ridge between Hougoumont and La Haye Sainte, but had chosen to attack where Wellington was strongest. Under a withering fire from British guardsmen and light infantry, the Imperial Guard halted, wavered and finally broke.',
        lang: 'en',
        cite: {
          source: 'nam-battle-of-waterloo',
          loc: { section: 'Battle of Waterloo', para: '58' }
        },
        provenance: { via: 'web', at: '2026-10-07', url: 'https://www.nam.ac.uk/explore/battle-waterloo' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1815-06-18' },
            cites: [
              {
                source: 'nam-battle-of-waterloo',
                loc: { section: 'Battle of Waterloo', para: '73' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'Their defeat sent the rest of the French into panic and, eventually, retreat. This continued all night, with the French harried by the Prussian cavalry.',
        lang: 'en',
        cite: {
          source: 'nam-battle-of-waterloo',
          loc: { section: 'Battle of Waterloo', para: '59' }
        },
        provenance: { via: 'web', at: '2026-10-07', url: 'https://www.nam.ac.uk/explore/battle-waterloo' }
      }
    }
  ],
  sides: [
    {
      key: 'french',
      name: 'Napoleon’s French Army',
      polity: 'polity:first-french-empire',
      cites: [
        { source: 'nam-battle-of-waterloo', loc: { section: 'Battle of Waterloo', para: '1' } }
      ]
    },
    {
      key: 'anglo-allied',
      name: 'Anglo-Allied force',
      cites: [
        { source: 'nam-battle-of-waterloo', loc: { section: 'Battle of Waterloo', para: '8' } }
      ]
    },
    {
      key: 'prussian',
      name: 'Prussians',
      polity: 'polity:kingdom-of-prussia',
      cites: [
        { source: 'nam-battle-of-waterloo', loc: { section: 'Battle of Waterloo', para: '8' } }
      ]
    }
  ],
  figures: [
    {
      key: 'combatants',
      side: 'french',
      value: {
        alts: [
          {
            value: { min: 72000 },
            cites: [
              {
                source: 'nam-battle-of-waterloo',
                loc: { section: 'Battle of Waterloo', para: '25' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'National Army Museum' }
            ]
          },
          {
            value: { min: 74000 },
            cites: [
              {
                source: 'britannica-1911-waterloo-campaign',
                loc: { section: 'WATERLOO CAMPAIGN, 1815', para: '62' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Archibald Frank Becke' }
            ]
          }
        ]
      }
    },
    {
      key: 'combatants',
      side: 'anglo-allied',
      value: {
        alts: [
          {
            value: { min: 68000 },
            cites: [
              {
                source: 'nam-battle-of-waterloo',
                loc: { section: 'Battle of Waterloo', para: '27' }
              }
            ]
          }
        ]
      }
    },
    {
      key: 'casualties',
      side: 'french',
      value: {
        alts: [
          {
            value: { min: 40000, qualifier: 'nearly' },
            cites: [
              {
                source: 'nam-battle-of-waterloo',
                loc: { section: 'Battle of Waterloo', para: '59' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'National Army Museum' }
            ]
          },
          {
            value: { min: 40000, qualifier: 'over' },
            cites: [
              {
                source: 'britannica-1911-waterloo-campaign',
                loc: { section: 'WATERLOO CAMPAIGN, 1815', para: '73' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Archibald Frank Becke' }
            ]
          }
        ]
      }
    },
    {
      key: 'casualties',
      side: 'anglo-allied',
      value: {
        alts: [
          {
            value: { min: 15000, qualifier: 'over' },
            cites: [
              {
                source: 'britannica-1911-waterloo-campaign',
                loc: { section: 'WATERLOO CAMPAIGN, 1815', para: '73' }
              }
            ]
          }
        ]
      }
    },
    {
      key: 'casualties',
      side: 'prussian',
      value: {
        alts: [
          {
            value: { min: 7000 },
            cites: [
              {
                source: 'britannica-1911-waterloo-campaign',
                loc: { section: 'WATERLOO CAMPAIGN, 1815', para: '73' }
              }
            ]
          }
        ]
      }
    }
  ],
  furtherReading: [
    { source: 'logie-1984-waterloo-levitable-defaite', perspective: 'european' },
    { source: 'lentz-2015-waterloo-1815', perspective: 'european' }
  ]
})
