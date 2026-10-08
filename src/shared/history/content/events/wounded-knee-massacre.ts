import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'wounded-knee-massacre',
  names: [
    { text: 'Wounded Knee Massacre', lang: 'en', role: 'primary' },
    {
      text: 'Battle of Wounded Knee',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'egp-carter-wounded-knee-massacre',
          loc: { section: 'WOUNDED KNEE MASSACRE', para: '-2' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'massacre',
  start: {
    alts: [
      {
        value: { d: '1890-12-29' },
        cites: [
          {
            source: 'egp-carter-wounded-knee-massacre',
            loc: { section: 'WOUNDED KNEE MASSACRE', para: '1' }
          },
          {
            source: 'nps-badl-big-foot-pass-overlook',
            loc: { section: 'Big Foot Pass Overlook' }
          }
        ]
      }
    ]
  },
  regions: ['north-america'],
  prominence: 2,
  places: [
    {
      ref: 'place:wounded-knee-creek',
      cites: [
        {
          source: 'egp-carter-wounded-knee-massacre',
          loc: { section: 'WOUNDED KNEE MASSACRE', para: '1' }
        }
      ]
    }
  ],
  polities: [
    { ref: 'polity:united-states' }
  ],
  participants: [
    {
      name: 'Big Foot',
      role: 'victim',
      cites: [
        {
          source: 'egp-carter-wounded-knee-massacre',
          loc: { section: 'WOUNDED KNEE MASSACRE', para: '7' }
        },
        {
          source: 'nps-badl-big-foot-pass-overlook',
          loc: { section: 'Big Foot Pass Overlook' }
        }
      ]
    },
    {
      name: 'James W. Forsyth',
      role: 'commander',
      cites: [
        {
          source: 'egp-carter-wounded-knee-massacre',
          loc: { section: 'WOUNDED KNEE MASSACRE', para: '7' }
        }
      ]
    },
    {
      name: 'Black Coyote',
      role: 'participant',
      cites: [
        {
          source: 'egp-carter-wounded-knee-massacre',
          loc: { section: 'WOUNDED KNEE MASSACRE', para: '8' }
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
            value: { min: 250, max: 300 },
            cites: [
              {
                source: 'egp-carter-wounded-knee-massacre',
                loc: { section: 'WOUNDED KNEE MASSACRE', para: '1' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'John E. Carter' }
            ]
          },
          {
            value: { min: 150, max: 300 },
            cites: [
              {
                source: 'nps-badl-big-foot-pass-overlook',
                loc: { section: 'Big Foot Pass Overlook' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'National Park Service' }
            ]
          }
        ]
      }
    },
    {
      key: 'military-deaths',
      value: {
        alts: [
          {
            value: { min: 25 },
            cites: [
              {
                source: 'egp-carter-wounded-knee-massacre',
                loc: { section: 'WOUNDED KNEE MASSACRE', para: '8' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'John E. Carter' }
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
          id: 'q1',
          text: 'On December 29, 1890, on Wounded Knee Creek in southwestern South Dakota, a tangle of events resulted in the deaths of more than 250, and possibly as many as 300, Native Americans. These people were guilty of no crime and were not engaged in combat. A substantial number were women and children. Most of the victims were members of the Miniconjou band of the Lakota Sioux who had been intercepted by military forces after they fled their reservation in South Dakota for refuge in the Badlands.',
          lang: 'en',
          cite: {
            source: 'egp-carter-wounded-knee-massacre',
            loc: { section: 'WOUNDED KNEE MASSACRE', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'http://plainshumanities.unl.edu/encyclopedia/doc/egp.war.056'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'A year earlier, the Ghost Dance had appeared on the Pine Ridge Reservation.',
          lang: 'en',
          cite: {
            source: 'egp-carter-wounded-knee-massacre',
            loc: { section: 'WOUNDED KNEE MASSACRE', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'http://plainshumanities.unl.edu/encyclopedia/doc/egp.war.056'
          }
        },
        {
          id: 'q3',
          text: 'But in Royer\'s paranoid mind the Ghost Dance was a war dance that threatened imminent bloodshed.',
          lang: 'en',
          cite: {
            source: 'egp-carter-wounded-knee-massacre',
            loc: { section: 'WOUNDED KNEE MASSACRE', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'http://plainshumanities.unl.edu/encyclopedia/doc/egp.war.056'
          }
        },
        {
          id: 'q4',
          text: 'In mid-November 1890 President Benjamin Harrison responded to the fears of an Indian outbreak by ordering troops into the area.',
          lang: 'en',
          cite: {
            source: 'egp-carter-wounded-knee-massacre',
            loc: { section: 'WOUNDED KNEE MASSACRE', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'http://plainshumanities.unl.edu/encyclopedia/doc/egp.war.056'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'A man named Black Coyote (sometimes called Black Fox) refused to surrender his rifle to a soldier.',
          lang: 'en',
          cite: {
            source: 'egp-carter-wounded-knee-massacre',
            loc: { section: 'WOUNDED KNEE MASSACRE', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'http://plainshumanities.unl.edu/encyclopedia/doc/egp.war.056'
          }
        },
        {
          id: 'q6',
          text: 'Immediately the nervous troops began firing, while the Miniconjous retrieved their weapons and returned fire.',
          lang: 'en',
          cite: {
            source: 'egp-carter-wounded-knee-massacre',
            loc: { section: 'WOUNDED KNEE MASSACRE', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'http://plainshumanities.unl.edu/encyclopedia/doc/egp.war.056'
          }
        },
        {
          id: 'q7',
          text: 'The military\'s rifle fire was complemented with cannon rounds from Hotchkiss guns, whose accuracy and exploding shells were formidable.',
          lang: 'en',
          cite: {
            source: 'egp-carter-wounded-knee-massacre',
            loc: { section: 'WOUNDED KNEE MASSACRE', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'http://plainshumanities.unl.edu/encyclopedia/doc/egp.war.056'
          }
        }
      ]
    },
    {
      kind: 'memory',
      quotes: [
        {
          id: 'q8',
          text: 'Soon the event developed a meaning that transcended the reality of the tragic loss of life, and Wounded Knee became, and remains, the symbol of the inhumanity of U.S. government policy toward Native Americans.',
          lang: 'en',
          cite: {
            source: 'egp-carter-wounded-knee-massacre',
            loc: { section: 'WOUNDED KNEE MASSACRE', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'http://plainshumanities.unl.edu/encyclopedia/doc/egp.war.056'
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
            value: { d: '1890-12-15' },
            cites: [
              {
                source: 'egp-carter-wounded-knee-massacre',
                loc: { section: 'WOUNDED KNEE MASSACRE', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'On December 15, 1890, the Hunkpapa holy man and Ghost Dance leader, Sitting Bull, was killed at Standing Rock Agency.',
        lang: 'en',
        cite: {
          source: 'egp-carter-wounded-knee-massacre',
          loc: { section: 'WOUNDED KNEE MASSACRE', para: '6' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'http://plainshumanities.unl.edu/encyclopedia/doc/egp.war.056'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1890-12-23' },
            cites: [
              {
                source: 'egp-carter-wounded-knee-massacre',
                loc: { section: 'WOUNDED KNEE MASSACRE', para: '7' }
              },
              {
                source: 'nps-badl-big-foot-pass-overlook',
                loc: { section: 'Big Foot Pass Overlook' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'On December 23, the Miniconjous left their village in the dead of night and fled south toward the Badlands.',
        lang: 'en',
        cite: {
          source: 'egp-carter-wounded-knee-massacre',
          loc: { section: 'WOUNDED KNEE MASSACRE', para: '7' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'http://plainshumanities.unl.edu/encyclopedia/doc/egp.war.056'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1890-12-29' },
            cites: [
              {
                source: 'nps-badl-big-foot-pass-overlook',
                loc: { section: 'Big Foot Pass Overlook' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'The next day (December 29, 1890), tensions rose and the 7th Calvary massacred an estimated 150-300 men, women, and children at Wounded Knee.',
        lang: 'en',
        cite: {
          source: 'nps-badl-big-foot-pass-overlook',
          loc: { section: 'Big Foot Pass Overlook' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.nps.gov/places/bigfoot-pass-overlook.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1891-01-03' },
            cites: [
              {
                source: 'egp-carter-wounded-knee-massacre',
                loc: { section: 'WOUNDED KNEE MASSACRE', para: '8' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'The fear of a reprisal attack kept troops and civilians entrenched at the agency until January 3, 1891, when a military-escorted civilian burial party proceeded to the site of the massacre.',
        lang: 'en',
        cite: {
          source: 'egp-carter-wounded-knee-massacre',
          loc: { section: 'WOUNDED KNEE MASSACRE', para: '8' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'http://plainshumanities.unl.edu/encyclopedia/doc/egp.war.056'
        }
      }
    }
  ],
  furtherReading: [
    { source: 'mattioli-2017-verlorene-welten', perspective: 'european' }
  ]
})
