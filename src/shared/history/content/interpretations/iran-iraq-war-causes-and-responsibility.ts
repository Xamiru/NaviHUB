import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'iran-iraq-war-causes-and-responsibility',
  about: ['event:iran-iraq-war'],
  topic: 'responsibility',
  framing: {
    id: 'q1',
    text: 'There were several factors which jointly or independently appear to have influenced the Iraqi regime’s decision to initiate a war. These factors can be divided into aims and motives: Saddam Hussein’s ambition for political and economic hegemony in the Persian Gulf; achieving control of the entire Shatt al-Arab waterway and capturing territories claimed by Iraq; strengthening Iraqi security and counteracting the effect of Iran’s Islamic revolution on the large Iraqi Shiʿite population. The post-revolutionary political turmoil in Iran, the collapse of Iranian armed forces, as well as the encouragement by the elites of the Iranian ancien regime in exile, evidently were perceived by Iraqi leaders as circumstances offering an ideal opportunity to wage war.',
    lang: 'en',
    cite: {
      source: 'iranica-gieling-iraq-vii-iran-iraq-war',
      loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '11' }
    },
    provenance: {
      via: 'web',
      at: '2026-10-08',
      url: 'https://www.iranicaonline.org/articles/iraq-vii-iran-iraq-war'
    }
  },
  positions: [
    {
      id: 'saddams-decision',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Phebe Marr' },
        { kind: 'scholar', name: 'Helen Chapin Metz' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'Above all, Iraq launched the war in an effort to consolidate its rising power in the Arab world and to replace Iran as the dominant Persian Gulf state.',
          lang: 'en',
          cite: {
            source: 'loc-iraq-country-study-1988',
            loc: { section: 'THE IRAN-IRAQ WAR', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iraq/101.htm' }
        },
        {
          id: 'q3',
          text: 'Phebe Marr, a noted analyst of Iraqi affairs, stated that "the war was more immediately the result of poor political judgement and miscalculation on the part of Saddam Hussein," and "the decision to invade, taken at a moment of Iranian weakness, was Saddam\'s".',
          lang: 'en',
          cite: {
            source: 'loc-iraq-country-study-1988',
            loc: { section: 'THE IRAN-IRAQ WAR', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iraq/101.htm' }
        }
      ]
    },
    {
      id: 'mutual-hostility-and-revolutionary-export',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Saskia M. Gieling' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'Saddam Hussein also aspired to economic and military hegemony in the Persian Gulf.',
          lang: 'en',
          cite: {
            source: 'iranica-gieling-iraq-vii-iran-iraq-war',
            loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/iraq-vii-iran-iraq-war'
          }
        },
        {
          id: 'q5',
          text: 'Finally, Saddam Hussein no doubt also counted on taking advantage of the internal unrest in Iran.',
          lang: 'en',
          cite: {
            source: 'iranica-gieling-iraq-vii-iran-iraq-war',
            loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '17' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/iraq-vii-iran-iraq-war'
          }
        }
      ]
    },
    {
      id: 'iraqi-self-defence',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Republic of Iraq' },
        { kind: 'participant', name: 'Saddam Hussein', ref: 'person:saddam-hussein' }
      ],
      statements: [
        {
          id: 'q6',
          text: '“obliged to exercise its legitimate right to self-defense of sovereignty and territorial integrity and to recover its territories by force, considering that the Iranian Government had barred the way to all legally recognized ways to resolve the issues emanating from its obligations”',
          lang: 'en',
          cite: {
            source: 'iranica-gieling-iraq-vii-iran-iraq-war',
            loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/iraq-vii-iran-iraq-war'
          }
        }
      ],
      reception: [
        {
          id: 'q7',
          text: 'There is also evidence the Iraqis hoped to bring about the overthrow of the Khomeini regime and to establish a more moderate government in Iran.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'The Bani Sadr Presidency', para: '12' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iran/25.htm' }
        },
        {
          id: 'q8',
          text: 'The Iraqi claim of sovereignty over all contested territories and waterways revived the old territorial dispute between the two countries',
          lang: 'en',
          cite: {
            source: 'iranica-gieling-iraq-vii-iran-iraq-war',
            loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/iraq-vii-iran-iraq-war'
          }
        }
      ]
    },
    {
      id: 'imposed-war',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Islamic Republic of Iran' },
        { kind: 'participant', name: 'Ali Khamenei', ref: 'person:ali-khamenei' }
      ],
      statements: [
        {
          id: 'q9',
          text: 'The first point is that as I said, the enemy waged the war with the purpose of overthrowing the Islamic Republic and the Islamic government, replacing it with a weak and docile government, thus re-dominating the country, but the enemy failed.',
          lang: 'en',
          cite: {
            source: 'khamenei-ir-2020-10-05-seven-realities-imposed-war',
            loc: {
              section: 'Seven realities of the 8-year Imposed War the enemy seeks to distort',
              para: '5'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/2024/https://english.khamenei.ir/news/8001/Seven-realities-of-the-8-year-Imposed-War-the-enemy-seeks-to'
          }
        },
        {
          id: 'q10',
          text: 'They gave him Mirage to bombard us, Super Etendard for striking our ships as well as giving him satellite information on the movement of our forces and the places where they stated.',
          lang: 'en',
          cite: {
            source: 'khamenei-ir-2020-10-05-seven-realities-imposed-war',
            loc: {
              section: 'Seven realities of the 8-year Imposed War the enemy seeks to distort',
              para: '36'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/2024/https://english.khamenei.ir/news/8001/Seven-realities-of-the-8-year-Imposed-War-the-enemy-seeks-to'
          }
        }
      ],
      reception: [
        {
          id: 'q11',
          text: 'Besides insisting on a complete withdrawal of Iraqi forces, Iran demanded the overthrow of Saddam Hussein and the Ba’th regime, a substantial reparation, and the repatriation of 100,000 Shiʿites expelled from Iraq in 1980',
          lang: 'en',
          cite: {
            source: 'iranica-gieling-iraq-vii-iran-iraq-war',
            loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '28' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/iraq-vii-iran-iraq-war'
          }
        },
        {
          id: 'q12',
          text: 'In his speeches, Khomeini stressed the fact that Iran was continuing its war effort against the Ba’th regime and Saddam Hussein in order to establish an Islamic republic in Iraq',
          lang: 'en',
          cite: {
            source: 'iranica-gieling-iraq-vii-iran-iraq-war',
            loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '32' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/iraq-vii-iran-iraq-war'
          }
        }
      ]
    }
  ],
  researched: '2026-10-08'
})
