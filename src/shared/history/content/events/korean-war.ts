import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'korean-war',
  names: [
    { text: 'Korean War', lang: 'en', role: 'primary' },
    { text: '한국 전쟁', lang: 'ko', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1950-06-25' },
        cites: [
          {
            source: 'eisenhower-library-korean-war',
            loc: { section: 'Korean War', para: '1' }
          },
          {
            source: 'loc-north-korea-country-study-1993',
            loc: { section: 'THE KOREAN WAR', para: '3' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1953-07-27' },
        cites: [
          {
            source: 'loc-south-korea-country-study-1990',
            loc: { section: 'The Korean War, 1950-53', para: '4' }
          },
          {
            source: 'eisenhower-library-korean-war',
            loc: { section: 'Korean War', para: '5' }
          },
          {
            source: 'eisenhower-library-presidential-years',
            loc: { section: 'Presidential Years' }
          }
        ]
      }
    ]
  },
  regions: ['east-asia', 'north-america'],
  prominence: 1,
  places: [
    {
      ref: 'place:seoul',
      cites: [
        {
          source: 'loc-south-korea-country-study-1990',
          loc: { section: 'The Korean War, 1950-53', para: '3' }
        },
        { source: 'eisenhower-library-korean-war', loc: { section: 'Korean War', para: '3' } }
      ]
    }
  ],
  partOf: [
    { ref: 'period:cold-war' }
  ],
  polities: [
    { ref: 'polity:united-states' }
  ],
  sides: [
    {
      key: 'north',
      name: 'Northern Korean People\'s Army',
      cites: [
        { source: 'eisenhower-library-korean-war', loc: { section: 'Korean War', para: '1' } }
      ]
    },
    {
      key: 'un',
      name: 'combined United Nations forces',
      cites: [
        { source: 'eisenhower-library-korean-war', loc: { section: 'Korean War', para: '1' } }
      ]
    },
    {
      key: 'china',
      name: 'Chinese People\'s Volunteer Army',
      polity: 'polity:peoples-republic-of-china',
      cites: [
        {
          source: 'loc-north-korea-country-study-1993',
          loc: { section: 'THE KOREAN WAR', para: '4' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:kim-il-sung',
      role: 'leader',
      side: 'north',
      cites: [
        {
          source: 'loc-north-korea-country-study-1993',
          loc: { section: 'THE KOREAN WAR', para: '2' }
        }
      ]
    },
    {
      name: 'Syngman Rhee',
      role: 'head-of-state',
      side: 'un',
      cites: [
        {
          source: 'state-dept-milestones-korean-war',
          loc: { section: 'Korean War and Japan’s Recovery', para: '4' }
        }
      ]
    },
    {
      ref: 'person:harry-s-truman',
      role: 'head-of-state',
      side: 'un',
      cites: [
        { source: 'eisenhower-library-korean-war', loc: { section: 'Korean War', para: '1' } },
        {
          source: 'loc-south-korea-country-study-1990',
          loc: { section: 'The Korean War, 1950-53', para: '4' }
        }
      ]
    },
    {
      ref: 'person:douglas-macarthur',
      role: 'commander',
      side: 'un',
      cites: [
        { source: 'eisenhower-library-korean-war', loc: { section: 'Korean War', para: '1' } },
        {
          source: 'loc-south-korea-country-study-1990',
          loc: { section: 'The Korean War, 1950-53', para: '4' }
        }
      ]
    },
    {
      name: 'Matthew B. Ridgway',
      role: 'commander',
      side: 'un',
      cites: [
        { source: 'eisenhower-library-korean-war', loc: { section: 'Korean War', para: '4' } }
      ]
    },
    {
      ref: 'person:dwight-d-eisenhower',
      role: 'head-of-state',
      side: 'un',
      cites: [
        { source: 'eisenhower-library-korean-war', loc: { section: 'Korean War', para: '5' } }
      ]
    }
  ],
  figures: [
    {
      key: 'combatants',
      side: 'north',
      value: {
        alts: [
          {
            value: { min: 150000, max: 200000 },
            cites: [
              {
                source: 'loc-south-korea-country-study-1990',
                loc: { section: 'The Korean War, 1950-53', para: '2' }
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
          text: 'After five years of simmering tensions on the Korean peninsula, the Korean War began on June 25, 1950, when the Northern Korean People\'s Army invaded South Korea in a coordinated general attack at several strategic points along the 38th parallel, the line dividing communist North Korea from the non-communist Republic of Korea in the south. North Korea aimed to militarily conquer South Korea and therefore unify Korea under the communist North Korean regime.',
          lang: 'en',
          cite: {
            source: 'eisenhower-library-korean-war',
            loc: { section: 'Korean War', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.eisenhowerlibrary.gov/research/online-documents/korean-war'
          }
        },
        {
          id: 'q2',
          text: 'Only in 1953 did the two sides reach an uneasy truce, thus crystallizing the division between North and South that exists today.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-korean-war',
            loc: { section: 'Korean War and Japan’s Recovery', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1945-1952/korean-war'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'During World War II the United States and the Soviet Union agreed to temporarily divide Korea at the 38th parallel in order to oversee the removal of Japanese forces.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-korean-war',
            loc: { section: 'Korean War and Japan’s Recovery', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1945-1952/korean-war'
          }
        },
        {
          id: 'q4',
          text: 'By June 1950, North Korean forces numbered between 150,000 and 200,000 troops, organized into ten infantry divisions, one tank division, and one air force division.',
          lang: 'en',
          cite: {
            source: 'loc-south-korea-country-study-1990',
            loc: { section: 'The Korean War, 1950-53', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/south-korea/10.htm' }
        }
      ]
    },
    {
      kind: 'causes',
      quotes: [
        {
          id: 'q5',
          text: 'Although many aspects of the Korean War remained murky, it seemed that the beginning of conventional war in June 1950 was mainly Kim\'s decision, and that the key enabling factor was the existence of as many as 100,000 troops with battle experience in China.',
          lang: 'en',
          cite: {
            source: 'loc-north-korea-country-study-1993',
            loc: { section: 'THE KOREAN WAR', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/north-korea/15.htm' }
        },
        {
          id: 'q6',
          text: 'Assuming that the United States did not consider South Korea of vital interest, Kim’s army attacked the South in June 1950 almost conquering the entire peninsula.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-korean-war',
            loc: { section: 'Korean War and Japan’s Recovery', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1945-1952/korean-war'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q7',
          text: 'The first several months of the war were characterized by armies advancing and retreating up and down the Korean peninsula. The initial North Korean attack drove United Nations Command forces to a narrow perimeter around the port of Pusan in the southern tip of the peninsula. After the front stabilized at the Pusan perimeter, General MacArthur surprised the North Koreans in September 1950 with an amphibious landing at Inchon behind North Korean lines, forcing the North Koreans to retreat behind the 38th parallel.',
          lang: 'en',
          cite: {
            source: 'eisenhower-library-korean-war',
            loc: { section: 'Korean War', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.eisenhowerlibrary.gov/research/online-documents/korean-war'
          }
        },
        {
          id: 'q8',
          text: 'In October, the United Nations, urged by the United States Government, approved the movement of UN forces across the 38th parallel into North Korea in an effort to unify the country under a non-communist government. In spite of warnings issued by the Chinese Government, the United Nations forces moved toward the Yalu River, marking the North Korean border with Manchuria. Discounting the significance of initial Chinese attacks in late October, MacArthur ordered the UNC to launch an offensive, taking the forces to the Yalu. In late November the Chinese attacked in full strength, pushing the UNC in disarray south of the 38th parallel with the communist forces seizing the South Korean capital, Seoul.',
          lang: 'en',
          cite: {
            source: 'eisenhower-library-korean-war',
            loc: { section: 'Korean War', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.eisenhowerlibrary.gov/research/online-documents/korean-war'
          }
        },
        {
          id: 'q9',
          text: 'In early 1951 the Chinese offensive lost its momentum and the UNC, bolstered by the revitalized 8th U.S. Army led by General Matthew B. Ridgway, retook Seoul and advanced back to the 38th parallel. From July 1951, until the end of hostilities the battle lines remained relatively stable and the conflict became a stalemate.',
          lang: 'en',
          cite: {
            source: 'eisenhower-library-korean-war',
            loc: { section: 'Korean War', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.eisenhowerlibrary.gov/research/online-documents/korean-war'
          }
        },
        {
          id: 'q10',
          text: 'By then, the war had involved China and the Soviet Union, which had dispatched air force divisions to Manchuria in support of North Korea and had furnished the Chinese and North Koreans with arms, tanks, military supplies, fuel, foodstuffs, and medicine. Fifteen member-nations of the United Nations had contributed armed forces and medical units to South Korea.',
          lang: 'en',
          cite: {
            source: 'loc-south-korea-country-study-1990',
            loc: { section: 'The Korean War, 1950-53', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/south-korea/10.htm' }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q11',
          text: 'President Eisenhower sought an end to hostilities in Korea through a combination of diplomacy and military muscle-flexing. On July 27, 1953, seven months after President Eisenhower\'s inauguration as the 34th President of the United States, an armistice was signed, ending organized combat operations and leaving the Korean Peninsula divided much as it had been since the close of World War II at the 38th parallel.',
          lang: 'en',
          cite: {
            source: 'eisenhower-library-korean-war',
            loc: { section: 'Korean War', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.eisenhowerlibrary.gov/research/online-documents/korean-war'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q12',
          text: 'The war left indelible marks on the Korean Peninsula and the world surrounding it. The entire peninsula was reduced to rubble; casualties on both sides were enormous. The chances for peaceful unification had been remote even before 1950, but the war dashed all such hopes.',
          lang: 'en',
          cite: {
            source: 'loc-south-korea-country-study-1990',
            loc: { section: 'The Korean War, 1950-53', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/south-korea/10.htm' }
        },
        {
          id: 'q13',
          text: 'By the time the armistice was signed in 1953, North Korea had been devastated by three years of bombing attacks that had left almost no modern buildings standing.',
          lang: 'en',
          cite: {
            source: 'loc-north-korea-country-study-1993',
            loc: { section: 'THE KOREAN WAR', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/north-korea/15.htm' }
        },
        {
          id: 'q14',
          text: 'The Korean U.N. "police action" prevented North Korea from imposing its communist rule on South Korea. Also, the United States\' actions in Korea demonstrated America\'s willingness to combat aggression, strengthened President Eisenhower\'s hand in Europe as he sought to organize European military defense under the North Atlantic Treaty Organization, and insured that the United States would pursue its military buildup called for in the famous cold war document, National Security Council Policy Paper No. 68.',
          lang: 'en',
          cite: {
            source: 'eisenhower-library-korean-war',
            loc: { section: 'Korean War', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.eisenhowerlibrary.gov/research/online-documents/korean-war'
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
            value: { d: '1950-06-26' },
            cites: [
              {
                source: 'loc-south-korea-country-study-1990',
                loc: { section: 'The Korean War, 1950-53', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'On June 26, 1950, Truman ordered the use of United States planes and naval vessels against North Korean forces, and on June 30 United States ground troops were dispatched.',
        lang: 'en',
        cite: {
          source: 'loc-south-korea-country-study-1990',
          loc: { section: 'The Korean War, 1950-53', para: '4' }
        },
        provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/south-korea/10.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1950-09-15' },
            cites: [
              {
                source: 'loc-south-korea-country-study-1990',
                loc: { section: 'The Korean War, 1950-53', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'When Douglas MacArthur, the commanding general of the United Nations forces in Korea, launched his amphibious attack and landed at Inch\'on on September 15, the course of the war changed abruptly.',
        lang: 'en',
        cite: {
          source: 'loc-south-korea-country-study-1990',
          loc: { section: 'The Korean War, 1950-53', para: '4' }
        },
        provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/south-korea/10.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1952-12-02' },
            cites: [
              {
                source: 'eisenhower-library-korean-war',
                loc: { section: 'Korean War', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q17',
        text: 'Acting on a campaign pledge, President-elect Dwight D. Eisenhower went to Korea on December 2, 1952.',
        lang: 'en',
        cite: { source: 'eisenhower-library-korean-war', loc: { section: 'Korean War', para: '5' } },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://www.eisenhowerlibrary.gov/research/online-documents/korean-war'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1953-07-27' },
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
        id: 'q18',
        text: 'July 27, 1953: Korean war ended with signing of armistice at Panmunjon calling for demilitarized zone and voluntary repatriation of prisoners. The 38th parallel is established as boundary between North and South Korea.',
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
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ac/A_soldier_of_the_Republic_of_Korea_Army_eating_lunch_in_a_war-destroyed_house_in_Munsan-ni%2C_Korea%2C_as_a_field_ration..._-_NARA_-_530635.tif/lossy-page1-1280px-A_soldier_of_the_Republic_of_Korea_Army_eating_lunch_in_a_war-destroyed_house_in_Munsan-ni%2C_Korea%2C_as_a_field_ration..._-_NARA_-_530635.tif.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:A_soldier_of_the_Republic_of_Korea_Army_eating_lunch_in_a_war-destroyed_house_in_Munsan-ni,_Korea,_as_a_field_ration..._-_NARA_-_530635.tif',
    credit: { institution: 'U.S. National Archives and Records Administration' },
    license: { id: 'public-domain' }
  },
  archive: [
    {
      id: 'stalemate-in-korea-1951',
      mediaKind: 'video',
      title: 'Stalemate In Korea',
      date: { d: '1951' },
      url: 'https://archive.org/download/CB-113/CB-113%20Stalemate%20In%20Korea%201951.mp4',
      page: 'https://archive.org/details/CB-113',
      credit: { institution: 'Internet Archive', creator: 'United States. Department of the Army' },
      license: { id: 'public-domain', url: 'https://creativecommons.org/publicdomain/mark/1.0/' },
      bytes: 151656388,
      durationSec: 1122
    }
  ],
  furtherReading: [
    { source: 'ams-2000-kangmei-yuanchao-zhanzheng-shi', perspective: 'chinese' },
    { source: 'shen-2004-mao-zedong-sidalin-yu-chaoxian-zhanzheng', perspective: 'chinese' },
    { source: 'torkunov-2000-zagadochnaya-voina', perspective: 'russian-soviet' },
    { source: 'wada-2002-chosen-senso-zenshi', perspective: 'japanese' }
  ]
})
