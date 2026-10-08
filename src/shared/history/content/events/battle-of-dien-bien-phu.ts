import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'battle-of-dien-bien-phu',
  names: [
    { text: 'Battle of Dien Bien Phu', lang: 'en', role: 'primary' },
    { text: 'Chiến dịch Điện Biên Phủ', lang: 'vi', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'battle',
  start: {
    alts: [
      {
        value: { d: '1954-03-13' },
        cites: [
          {
            source: 'loc-vietnam-country-study-1987',
            loc: { section: 'Dien Bien Phu', para: '4' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1954-05-07' },
        cites: [
          {
            source: 'loc-vietnam-country-study-1987',
            loc: { section: 'Dien Bien Phu', para: '4' }
          },
          {
            source: 'state-dept-milestones-dien-bien-phu',
            loc: { section: 'Dien Bien Phu & the Fall of French Indochina, 1954', para: '1' }
          },
          {
            source: 'eisenhower-library-presidential-years',
            loc: { section: 'Presidential Years' }
          }
        ]
      }
    ]
  },
  regions: ['southeast-asia', 'europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:dien-bien-phu',
      cites: [
        {
          source: 'loc-vietnam-country-study-1987',
          loc: { section: 'Dien Bien Phu', para: '2' }
        },
        {
          source: 'state-dept-milestones-dien-bien-phu',
          loc: { section: 'Dien Bien Phu & the Fall of French Indochina, 1954', para: '1' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:cold-war' }
  ],
  sides: [
    {
      key: 'viet-minh',
      name: 'Viet Minh',
      cites: [
        {
          source: 'loc-vietnam-country-study-1987',
          loc: { section: 'Dien Bien Phu', para: '4' }
        }
      ]
    },
    {
      key: 'france',
      name: 'French garrison',
      polity: 'polity:french-fourth-republic',
      cites: [
        {
          source: 'loc-vietnam-country-study-1987',
          loc: { section: 'Dien Bien Phu', para: '4' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:ho-chi-minh',
      role: 'leader',
      side: 'viet-minh',
      cites: [
        {
          source: 'state-dept-milestones-dien-bien-phu',
          loc: { section: 'Dien Bien Phu & the Fall of French Indochina, 1954', para: '1' }
        }
      ]
    },
    {
      name: 'Giap',
      role: 'commander',
      side: 'viet-minh',
      cites: [
        {
          source: 'loc-vietnam-country-study-1987',
          loc: { section: 'Dien Bien Phu', para: '3' }
        }
      ]
    },
    {
      name: 'Henri Navarre',
      role: 'commander',
      side: 'france',
      cites: [
        {
          source: 'loc-vietnam-country-study-1987',
          loc: { section: 'Dien Bien Phu', para: '2' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'combatants',
      side: 'viet-minh',
      value: {
        alts: [
          {
            value: { min: 50000, qualifier: 'nearly' },
            cites: [
              {
                source: 'loc-vietnam-country-study-1987',
                loc: { section: 'Dien Bien Phu', para: '4' }
              }
            ]
          }
        ]
      }
    },
    {
      key: 'combatants',
      side: 'france',
      value: {
        alts: [
          {
            value: { min: 15000 },
            cites: [
              {
                source: 'loc-vietnam-country-study-1987',
                loc: { section: 'Dien Bien Phu', para: '4' }
              }
            ]
          }
        ]
      }
    },
    {
      key: 'deaths',
      side: 'viet-minh',
      value: {
        alts: [
          {
            value: { min: 25000, qualifier: 'about' },
            cites: [
              {
                source: 'loc-vietnam-country-study-1987',
                loc: { section: 'Dien Bien Phu', para: '4' }
              }
            ]
          }
        ]
      }
    },
    {
      key: 'deaths',
      side: 'france',
      value: {
        alts: [
          {
            value: { min: 1500, qualifier: 'over' },
            cites: [
              {
                source: 'loc-vietnam-country-study-1987',
                loc: { section: 'Dien Bien Phu', para: '4' }
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
          id: 'q1',
          text: 'On May 7, 1954, the French-held garrison at Dien Bien Phu in Vietnam fell after a four month siege led by Vietnamese nationalist Ho Chi Minh. After the fall of Dien Bien Phu, the French pulled out of the region.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-dien-bien-phu',
            loc: { section: 'Dien Bien Phu & the Fall of French Indochina, 1954', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1953-1960/dien-bien-phu'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'The newly appointed commander of French forces in Vietnam, General Henri Navarre, decided soon after his arrival in Vietnam that it was essential to halt a Viet Minh offensive underway in neighboring Laos. To do so, Navarre believed it was necessary for the French to capture and hold the town of Dien Bien Phu, sixteen kilometers from the Laotian border. For the Viet Minh, control of Dien Bien Phu was an important link in the supply route from China. In November 1953, the French occupied the town with paratroop battalions and began reinforcing it with units from the French military post at nearby Lai Chau.',
          lang: 'en',
          cite: {
            source: 'loc-vietnam-country-study-1987',
            loc: { section: 'Dien Bien Phu', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/vietnam/24.htm' }
        },
        {
          id: 'q3',
          text: 'In February 1954, a peace conference to settle the Korean and Indochinese conflicts was set for April in Geneva, and negotiations in Indochina were scheduled to begin on May 8. Viet Minh strategists, led by Giap, concluded that a successful attack on a French fortified camp, timed to coincide with the peace talks, would give Hanoi the necessary leverage for a successful conclusion of the negotiations.',
          lang: 'en',
          cite: {
            source: 'loc-vietnam-country-study-1987',
            loc: { section: 'Dien Bien Phu', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/vietnam/24.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'Accordingly, the siege of Dien Bien Phu began on March 13, by which time the Viet Minh had concentrated nearly 50,000 regular troops, 55,000 support troops, and almost 100,000 transport workers in the area. Chinese aid, consisting mainly of ammunition, petroleum, and some large artillery pieces carried a distance of 350 kilometers from the Chinese border, reached 1,500 tons per month by early 1954. The French garrison of 15,000, which depended on supply by air, was cut off by March 27, when the Viet Minh artillery succeeded in making the airfield unusable. An elaborate system of tunnels dug in the mountainsides enabled the Viet Minh to protect its artillery pieces by continually moving them to prevent discovery. Several hundred kilometers of trenches permitted the attackers to move progressively closer to the French encampment. In the final battle, human wave assaults were used to take the perimeter defenses, which yielded defensive guns that were then turned on the main encampment. The French garrison surrendered on May 7, ending the siege that had cost the lives of about 25,000 Vietnamese and more than 1,500 French troops.',
          lang: 'en',
          cite: {
            source: 'loc-vietnam-country-study-1987',
            loc: { section: 'Dien Bien Phu', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/vietnam/24.htm' }
        },
        {
          id: 'q5',
          text: 'Though President Eisenhower was determined to prevent a communist victory in Vietnam, the U.S. Congress and officials in the Administration were equally determined not to intervene unless they could do so as a part of a larger coalition. Britain and other members of NATO declined to participate in rescuing what they thought was a lost cause.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-dien-bien-phu',
            loc: { section: 'Dien Bien Phu & the Fall of French Indochina, 1954', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1953-1960/dien-bien-phu'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'The following day, peace talks on Indochina began in Geneva, attended by the DRV, the Associated State of Vietnam, Cambodia, Laos, France, Britain, China, the Soviet Union, and the United States. In July a compromise agreement was reached consisting of two documents: a cease-fire and a final declaration. The ceasefire agreement, which was signed only by France and the DRV, established a provisional military demarcation line at about the 17°N parallel and required the regroupment of all French military forces south of that line and of all Viet Minh military forces north of the line.',
          lang: 'en',
          cite: {
            source: 'loc-vietnam-country-study-1987',
            loc: { section: 'Dien Bien Phu', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/vietnam/24.htm' }
        },
        {
          id: 'q7',
          text: 'The United States did not sign the second agreement, establishing instead its own government in South Vietnam.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-dien-bien-phu',
            loc: { section: 'Dien Bien Phu & the Fall of French Indochina, 1954', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1953-1960/dien-bien-phu'
          }
        },
        {
          id: 'q8',
          text: 'The Geneva Agreements were viewed with doubt and dissatisfaction on all sides.',
          lang: 'en',
          cite: {
            source: 'loc-vietnam-country-study-1987',
            loc: { section: 'The Aftermath of Geneva', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/vietnam/25.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1954-05-07' },
            cites: [
              {
                source: 'eisenhower-library-presidential-years',
                loc: { section: 'Presidential Years' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'May 7, 1954: French garrison at Dien Bien Phu surrenders to the Viet Minh.',
        lang: 'en',
        cite: {
          source: 'eisenhower-library-presidential-years',
          loc: { section: 'Presidential Years' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://www.eisenhowerlibrary.gov/eisenhowers/presidential-years'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1954-05-08' },
            cites: [
              {
                source: 'eisenhower-library-presidential-years',
                loc: { section: 'Presidential Years' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'May 8-July 21, 1954: Geneva Conference on Indochina results in Geneva Accords partitioning Vietnam at the 17th Parallel and provides for unifying elections in two years.',
        lang: 'en',
        cite: {
          source: 'eisenhower-library-presidential-years',
          loc: { section: 'Presidential Years' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://www.eisenhowerlibrary.gov/eisenhowers/presidential-years'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ae/Victory_in_Battle_of_Dien_Bien_Phu.jpg/1280px-Victory_in_Battle_of_Dien_Bien_Phu.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Victory_in_Battle_of_Dien_Bien_Phu.jpg',
    credit: { institution: 'Vietnam People\'s Army Museum System' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'vo-nguyen-giap-1998-dien-bien-phu', perspective: 'southeast-asian' },
    { source: 'rocolle-1968-pourquoi-dien-bien-phu', perspective: 'european' },
    { source: 'roy-1963-la-bataille-de-dien-bien-phu', perspective: 'european' }
  ]
})
