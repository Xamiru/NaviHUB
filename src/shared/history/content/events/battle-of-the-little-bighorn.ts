import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'battle-of-the-little-bighorn',
  names: [
    { text: 'Battle of the Little Bighorn', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  type: 'battle',
  start: {
    alts: [
      {
        value: { d: '1876-06-25' },
        cites: [
          {
            source: 'nps-libi-story-of-the-battle',
            loc: { section: 'Story of the Battle', para: '1' }
          },
          { source: 'lemo-chronik-1876', loc: { section: 'Chronik 1876', para: '40' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1876-06-26' },
        cites: [
          {
            source: 'nps-libi-story-of-the-battle',
            loc: { section: 'Story of the Battle', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['north-america'],
  prominence: 2,
  places: [
    {
      ref: 'place:little-bighorn',
      cites: [
        {
          source: 'nps-libi-story-of-the-battle',
          loc: { section: 'Story of the Battle', para: '1' }
        }
      ]
    }
  ],
  polities: [
    { ref: 'polity:united-states' }
  ],
  sides: [
    {
      key: 'tribes',
      name: 'warriors of the Lakota Sioux, Northern Cheyenne, and Arapaho tribes',
      cites: [
        {
          source: 'nps-libi-story-of-the-battle',
          loc: { section: 'Story of the Battle', para: '1' }
        }
      ]
    },
    {
      key: 'us',
      name: 'the 7th Regiment of the US Cavalry',
      cites: [
        {
          source: 'nps-libi-story-of-the-battle',
          loc: { section: 'Story of the Battle', para: '1' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'Sitting Bull',
      role: 'leader',
      side: 'tribes',
      cites: [
        {
          source: 'nps-libi-story-of-the-battle',
          loc: { section: 'Story of the Battle', para: '9' }
        }
      ]
    },
    {
      name: 'Crazy Horse',
      role: 'leader',
      side: 'tribes',
      cites: [
        { source: 'lemo-chronik-1876', loc: { section: 'Chronik 1876', para: '41' } }
      ]
    },
    {
      name: 'Two Moon',
      role: 'leader',
      side: 'tribes',
      cites: [
        { source: 'lemo-chronik-1876', loc: { section: 'Chronik 1876', para: '41' } }
      ]
    },
    {
      name: 'George Armstrong Custer',
      role: 'commander',
      side: 'us',
      cites: [
        {
          source: 'nps-libi-story-of-the-battle',
          loc: { section: 'Story of the Battle', para: '11' }
        }
      ]
    },
    {
      name: 'Marcus Reno',
      role: 'commander',
      side: 'us',
      cites: [
        {
          source: 'nps-libi-story-of-the-battle',
          loc: { section: 'Story of the Battle', para: '15' }
        }
      ]
    },
    {
      name: 'Frederick Benteen',
      role: 'commander',
      side: 'us',
      cites: [
        {
          source: 'nps-libi-story-of-the-battle',
          loc: { section: 'Story of the Battle', para: '15' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'combatants',
      side: 'tribes',
      value: {
        alts: [
          {
            value: { min: 1500, max: 1800 },
            cites: [
              {
                source: 'nps-libi-story-of-the-battle',
                loc: { section: 'Story of the Battle', para: '14' }
              }
            ]
          }
        ]
      }
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q2',
          text: 'The Battle of the Little Bighorn was fought along the ridges, steep bluffs, and ravines of the Little Bighorn River, in south-central Montana on June 25-26, 1876. The combatants were warriors of the Lakota Sioux, Northern Cheyenne, and Arapaho tribes, battling men of the 7th Regiment of the US Cavalry, along with their Crow, and Arikara scouts.',
          lang: 'en',
          cite: {
            source: 'nps-libi-story-of-the-battle',
            loc: { section: 'Story of the Battle', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nps.gov/libi/learn/historyculture/battle-story.htm'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q7',
          text: 'However, Lakota leaders such as Sitting Bull and Crazy Horse rejected the reservation system. Likewise, many roving bands of hunters and warriors did not sign the 1868 treaty. They felt no obligation to conform to its restrictions, or to limit their hunting to the unceded hunting land assigned by the treaty. Their forays off the set aside lands brought them into conflict with settlers and enemy tribes outside the treaty boundaries.',
          lang: 'en',
          cite: {
            source: 'nps-libi-story-of-the-battle',
            loc: { section: 'Story of the Battle', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.nps.gov/libi/learn/historyculture/battle-story.htm'
          }
        },
        {
          id: 'q1',
          text: 'Tension between the United States and the Lakota escalated in 1874, when Lt. Col. George Armstrong Custer was ordered to make an exploration of the Black Hills inside the boundary of the Great Sioux Reservation. Custer was to map the area, locate a suitable site for a future military post, and to make note of the natural resources. During the expedition, professional geologists discovered deposits of gold. Word of its discovery caused an invasion of miners and entrepreneurs to the Black Hills in direct violation of the 1868 Treaty of Fort Laramie.',
          lang: 'en',
          cite: {
            source: 'nps-libi-story-of-the-battle',
            loc: { section: 'Story of the Battle', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nps.gov/libi/learn/historyculture/battle-story.htm'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'The battle was a momentary victory for the Lakota and Cheyenne. The death of Custer and his troops became a rallying point for the United States to increase their efforts to force native peoples onto reservation lands. With more troops in the field, Lakota hunting grounds were invaded by powerful Army expeditionary forces determined to conquer the Northern Plains Indians. Most of the declared "hostiles" surrendered within one year of the fight, and the Black Hills were taken by the US government without compensation to the Lakota.',
          lang: 'en',
          cite: {
            source: 'nps-libi-story-of-the-battle',
            loc: { section: 'Story of the Battle', para: '26' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nps.gov/libi/learn/historyculture/battle-story.htm'
          }
        }
      ]
    },
    {
      kind: 'memory',
      quotes: [
        {
          id: 'q6',
          text: 'The Battle of the Little Bighorn has come to symbolize the clash of two vastly dissimilar cultures: the buffalo/horse culture of the northern plains tribes, and the highly industrial based culture of the United States.',
          lang: 'en',
          cite: {
            source: 'nps-libi-story-of-the-battle',
            loc: { section: 'Story of the Battle', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nps.gov/libi/learn/historyculture/battle-story.htm'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b5/Sitting_Bull_1885_uncropped.jpg/1280px-Sitting_Bull_1885_uncropped.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Sitting_Bull_1885_uncropped.jpg',
    credit: {
      institution: 'Library of Congress Prints and Photographs Division',
      creator: 'David Francis Barry'
    },
    license: { id: 'public-domain' }
  },
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1876-03' },
            cites: [
              {
                source: 'nps-libi-story-of-the-battle',
                loc: { section: 'Story of the Battle', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'The campaign was set in motion in March of 1876, when a 450-man force of combined cavalry and infantry commanded by Colonel John Gibbon, marched out of Fort Ellis near Bozeman, Montana.',
        lang: 'en',
        cite: {
          source: 'nps-libi-story-of-the-battle',
          loc: { section: 'Story of the Battle', para: '6' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.nps.gov/libi/learn/historyculture/battle-story.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1876-06-22' },
            cites: [
              {
                source: 'nps-libi-story-of-the-battle',
                loc: { section: 'Story of the Battle', para: '11' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'On June 22, General Terry decided to detach Custer and his 7th Cavalry to make a wide flanking march and approach the Indians from the east and south.',
        lang: 'en',
        cite: {
          source: 'nps-libi-story-of-the-battle',
          loc: { section: 'Story of the Battle', para: '11' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.nps.gov/libi/learn/historyculture/battle-story.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1876-06-25' },
            cites: [
              {
                source: 'nps-libi-story-of-the-battle',
                loc: { section: 'Story of the Battle', para: '13' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'As instructed by Custer, Major Reno crossed the river about two miles south of the village and began advancing downstream toward its southern end.',
        lang: 'en',
        cite: {
          source: 'nps-libi-story-of-the-battle',
          loc: { section: 'Story of the Battle', para: '17' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.nps.gov/libi/learn/historyculture/battle-story.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1876-06-25' },
            cites: [
              {
                source: 'nps-libi-story-of-the-battle',
                loc: { section: 'Story of the Battle', para: '19' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q4',
        text: 'About 40 men of the original 210 were cornered on the hill where the stone monument now stands.',
        lang: 'en',
        cite: {
          source: 'nps-libi-story-of-the-battle',
          loc: { section: 'Story of the Battle', para: '24' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.nps.gov/libi/learn/historyculture/battle-story.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1876-06-26' },
            cites: [
              {
                source: 'nps-libi-story-of-the-battle',
                loc: { section: 'Story of the Battle', para: '19' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'Large numbers of warriors approaching from that direction forced the cavalry to withdraw to Reno Hill where the Indians held them under siege from the afternoon of June 25, until dusk on June 26. On the evening of June 26, the entire village began to move to the south.',
        lang: 'en',
        cite: {
          source: 'nps-libi-story-of-the-battle',
          loc: { section: 'Story of the Battle', para: '19' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.nps.gov/libi/learn/historyculture/battle-story.htm'
        }
      }
    }
  ],
  furtherReading: [
    { source: 'mattioli-2017-verlorene-welten', perspective: 'european' }
  ]
})
