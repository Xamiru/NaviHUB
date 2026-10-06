import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'battle-of-the-little-bighorn',
  names: [
    { text: 'Battle of the Little Bighorn', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
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
      kind: 'background',
      quotes: [
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
        },
        {
          id: 'q3',
          text: 'In der Schlacht am Little Bighorn River in Montana besiegen die Indianerstämme der Cheyennes und Sioux unter ihren Häuptlingen Sitting Bull (1831-1890), Crazy Horse (um 1840-1877) und Two Moon (1847-1917) eine US-Kavallerieabteilung unter George Armstrong Custer (1839-1876).',
          lang: 'de',
          cite: { source: 'lemo-chronik-1876', loc: { section: 'Chronik 1876', para: '41' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1876.html'
          }
        },
        {
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
    url: 'https://upload.wikimedia.org/wikipedia/commons/2/24/%22Scene_of_Gen._Custer%27s_last_stand%2C_looking_in_the_direction_of_the_ford_and_the_Indian_village.%22_A_pile_of_bones_on_the_Little_Big_Horn_battlefield_is_all_that_remains%2C_ca._1877_-_NARA_-_530869.gif',
    page: 'https://commons.wikimedia.org/wiki/File:%22Scene_of_Gen._Custer%27s_last_stand,_looking_in_the_direction_of_the_ford_and_the_Indian_village.%22_A_pile_of_bones_on_the_Little_Big_Horn_battlefield_is_all_that_remains,_ca._1877_-_NARA_-_530869.gif',
    credit: { institution: 'U.S. National Archives and Records Administration' },
    license: { id: 'public-domain' }
  }
})
