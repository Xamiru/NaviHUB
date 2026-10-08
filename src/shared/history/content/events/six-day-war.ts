import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'six-day-war',
  names: [
    { text: 'Six-Day War', lang: 'en', role: 'primary' },
    { text: 'מלחמת ששת הימים', lang: 'he', role: 'native' },
    {
      text: 'June 1967 War',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-israel-country-study-1988',
          loc: { section: '1967 AND AFTERWARD', para: '5' }
        }
      ]
    },
    {
      text: '1967 Arab-Israeli War',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'state-dept-milestones-arab-israeli-war-1967',
          loc: { section: 'The 1967 Arab-Israeli War', para: '1' }
        }
      ]
    },
    {
      text: 'النكسة',
      lang: 'ar',
      role: 'contested',
      translit: 'Naksa',
      usedBy: [
        { kind: 'organization', name: 'WAFA Palestinian News & Info Agency' }
      ],
      cites: [
        {
          source: 'wafa-2022-06-05-remembering-the-naksa',
          loc: { section: 'Remembering the Naksa, or setback, of 1967', para: '3' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1967-06-05' },
        cites: [
          {
            source: 'state-dept-milestones-arab-israeli-war-1967',
            loc: { section: 'The 1967 Arab-Israeli War', para: '12' }
          },
          {
            source: 'loc-israel-country-study-1988',
            loc: { section: '1967 AND AFTERWARD', para: '4' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1967-06-10' },
        cites: [
          {
            source: 'state-dept-milestones-arab-israeli-war-1967',
            loc: { section: 'The 1967 Arab-Israeli War', para: '12' }
          }
        ]
      }
    ]
  },
  regions: ['mena'],
  prominence: 2,
  places: [
    {
      ref: 'place:jerusalem',
      cites: [
        {
          source: 'loc-israel-country-study-1988',
          loc: { section: '1967 AND AFTERWARD', para: '5' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:cold-war' }
  ],
  sides: [
    {
      key: 'israel',
      name: 'Israel',
      polity: 'polity:state-of-israel',
      cites: [
        {
          source: 'state-dept-milestones-arab-israeli-war-1967',
          loc: { section: 'The 1967 Arab-Israeli War', para: '12' }
        }
      ]
    },
    {
      key: 'egypt',
      name: 'Egypt',
      polity: 'polity:republic-of-egypt',
      cites: [
        {
          source: 'state-dept-milestones-arab-israeli-war-1967',
          loc: { section: 'The 1967 Arab-Israeli War', para: '12' }
        }
      ]
    },
    {
      key: 'jordan',
      name: 'Jordan',
      cites: [
        {
          source: 'state-dept-milestones-arab-israeli-war-1967',
          loc: { section: 'The 1967 Arab-Israeli War', para: '12' }
        }
      ]
    },
    {
      key: 'syria',
      name: 'Syria',
      cites: [
        {
          source: 'state-dept-milestones-arab-israeli-war-1967',
          loc: { section: 'The 1967 Arab-Israeli War', para: '12' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:gamal-abdel-nasser',
      role: 'head-of-state',
      side: 'egypt',
      cites: [
        {
          source: 'loc-israel-country-study-1988',
          loc: { section: '1967 AND AFTERWARD', para: '2' }
        }
      ]
    },
    {
      name: 'Levi Eshkol',
      role: 'head-of-government',
      side: 'israel',
      cites: [
        {
          source: 'loc-israel-country-study-1988',
          loc: { section: '1967 AND AFTERWARD', para: '1' }
        },
        {
          source: 'loc-israel-country-study-1988',
          loc: { section: '1967 AND AFTERWARD', para: '7' }
        }
      ]
    },
    {
      name: 'Moshe Dayan',
      role: 'commander',
      side: 'israel',
      cites: [
        {
          source: 'loc-israel-country-study-1988',
          loc: { section: '1967 AND AFTERWARD', para: '3' }
        }
      ]
    },
    {
      name: 'King Hussein',
      role: 'head-of-state',
      side: 'jordan',
      cites: [
        {
          source: 'loc-israel-country-study-1988',
          loc: { section: '1967 AND AFTERWARD', para: '4' }
        }
      ]
    },
    {
      ref: 'person:lyndon-b-johnson',
      role: 'head-of-state',
      cites: [
        {
          source: 'state-dept-milestones-arab-israeli-war-1967',
          loc: { section: 'The 1967 Arab-Israeli War', para: '10' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/62/%D7%A6%D7%A0%D7%97%D7%A0%D7%99%D7%9D_%D7%91%D7%9B%D7%95%D7%AA%D7%9C_%D7%94%D7%9E%D7%A2%D7%A8%D7%91%D7%99.jpg/1280px-%D7%A6%D7%A0%D7%97%D7%A0%D7%99%D7%9D_%D7%91%D7%9B%D7%95%D7%AA%D7%9C_%D7%94%D7%9E%D7%A2%D7%A8%D7%91%D7%99.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:%D7%A6%D7%A0%D7%97%D7%A0%D7%99%D7%9D_%D7%91%D7%9B%D7%95%D7%AA%D7%9C_%D7%94%D7%9E%D7%A2%D7%A8%D7%91%D7%99.jpg',
    credit: {
      institution: 'National Photo Collection of Israel, Government Press Office (digital ID D327-047)',
      creator: 'David Rubinger'
    },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The June 1967 War was a watershed event in the history of Israel and the Middle East. After only six days of fighting, Israel had radically altered the political map of the region.',
          lang: 'en',
          cite: {
            source: 'loc-israel-country-study-1988',
            loc: { section: '1967 AND AFTERWARD', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/israel/25.htm' }
        },
        {
          id: 'q2',
          text: 'Between June 5 and June 10, Israel defeated Egypt, Jordan, and Syria and occupied the Sinai Peninsula, the Gaza Strip, the West Bank, East Jerusalem, and the Golan Heights.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-arab-israeli-war-1967',
            loc: { section: 'The 1967 Arab-Israeli War', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1961-1968/arab-israeli-war-1967'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'On May 16, Egypt demanded that the United Nations Emergency Force (UNEF), which had been deployed in the Sinai Peninsula and the Gaza Strip since 1957, withdraw from Israel’s border. Secretary-General U Thant replied that he would have to withdraw UNEF from all its positions, including Sharm al-Shaykh, which would put political pressure on Nasser to close the Straits of Tiran to Israeli shipping. Nasser remained adamant, and on May 22, after UNEF withdrew, he announced that he would close the Straits.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-arab-israeli-war-1967',
            loc: { section: 'The 1967 Arab-Israeli War', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1961-1968/arab-israeli-war-1967'
          }
        },
        {
          id: 'q4',
          text: 'The Eshkol government, to avoid the international pressure that forced Israel to retreat in 1956, sent Foreign Minister Abba Eban to Europe and the United States to convince Western leaders to pressure Nasser into reversing his course. In Israel, Eshkol\'s diplomatic waiting game and Nasser\'s threatening rhetoric created a somber mood. To reassure the public, Moshe Dayan, the hero of the 1956 Sinai Campaign, was appointed minister of defense and a National Unity Government was formed, which for the first time included Begin\'s Herut Party, the dominant element in Gahal.',
          lang: 'en',
          cite: {
            source: 'loc-israel-country-study-1988',
            loc: { section: '1967 AND AFTERWARD', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/israel/25.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'King Hussein of Jordan, misinformed by Nasser about Egyptian losses, authorized Jordanian artillery to fire on Jerusalem. Subsequently, both the Jordanians in the east and the Syrians in the north were quickly defeated.',
          lang: 'en',
          cite: {
            source: 'loc-israel-country-study-1988',
            loc: { section: '1967 AND AFTERWARD', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/israel/25.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'The new territories more than doubled the size of pre1967 Israel, placing under Israel\'s control more than 1 million Palestinian Arabs. In Israel, the ease of the victory, the expansion of the state\'s territory, and the reuniting of Jerusalem, the holiest place in Judaism, permanently altered political discourse. In the Arab camp, the war significantly weakened Nasserism, and led to the emergence of the Palestine Liberation Organization (PLO) as the leading representative of the Palestinian people and effective player in Arab politics.',
          lang: 'en',
          cite: {
            source: 'loc-israel-country-study-1988',
            loc: { section: '1967 AND AFTERWARD', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/israel/25.htm' }
        },
        {
          id: 'q7',
          text: 'Security Council Resolution 242, adopted on November 22, called for Israel’s withdrawal from “territories occupied in the recent conflict” in exchange for “termination of all claims or states of belligerency and respect for and acknowledgment of the sovereignty, territorial integrity and political independence of every State in the area and their right to live in peace within secure and recognized boundaries free from threats or acts of force.” Interpreted differently by Israelis and Arabs, this resolution would nonetheless remain the bedrock of all subsequent U.S. efforts to resolve the Arab-Israeli dispute.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-arab-israeli-war-1967',
            loc: { section: 'The 1967 Arab-Israeli War', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1961-1968/arab-israeli-war-1967'
          }
        },
        {
          id: 'q8',
          text: 'At Khartoum, Sudan, in the summer of 1967, the Arab states unanimously adopted their famous "three nos": no peace with Israel, no recognition of Israel, no negotiation with Israel concerning any Palestinian territory.',
          lang: 'en',
          cite: {
            source: 'loc-israel-country-study-1988',
            loc: { section: '1967 AND AFTERWARD', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/israel/25.htm' }
        },
        {
          id: 'q9',
          text: 'Nearly 400 thousand Palestinians were displaced by the Israeli onslaught adding to the hundreds of thousands of refugees displaced in 1948 by the invading Zionist pre-Israel militias. Around half were being displaced for the second time in less than 20 years.',
          lang: 'en',
          cite: {
            source: 'wafa-2022-06-05-remembering-the-naksa',
            loc: { section: 'Remembering the Naksa, or setback, of 1967', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'https://english.wafa.ps/Pages/Details/129536' }
        }
      ]
    }
  ]
})
