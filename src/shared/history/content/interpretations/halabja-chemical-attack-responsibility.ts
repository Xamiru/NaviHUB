import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'halabja-chemical-attack-responsibility',
  about: ['event:halabja-chemical-attack'],
  topic: 'responsibility',
  framing: {
    id: 'q1',
    text: 'In the first, the March 16 poison gas attack on the Kurdish city of Halabja, near the border with Iran, the Iranian authorities made it their business to show off the site to the international press within a few days of the bombing.',
    lang: 'en',
    cite: {
      source: 'hrw-1993-genocide-in-iraq-the-anfal-campaign-against-the-kurds',
      loc: { section: 'Chapter 1: Introduction', para: '21' }
    },
    provenance: {
      via: 'web',
      at: '2026-10-08',
      url: 'https://www.hrw.org/reports/1993/iraqanfal/ANFAL1.htm'
    }
  },
  positions: [
    {
      id: 'iraqi-state-attack',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Middle East Watch (Human Rights Watch)' },
        { kind: 'scholar', name: 'Saskia M. Gieling' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'The testimony of survivorsestablishes beyond reasonable doubt that Halabja was an Iraqi action, launched in response to the brief capture of the city by Iraqi peshmerga assisted by Iranian Revolutionary Guards (pasdaran). The thousands who died, virtually all of them civilians, were victims of the Iraqi regime.',
          lang: 'en',
          cite: {
            source: 'hrw-1993-genocide-in-iraq-the-anfal-campaign-against-the-kurds',
            loc: { section: 'Chapter 1: Introduction', para: '21' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.hrw.org/reports/1993/iraqanfal/ANFAL1.htm'
          }
        },
        {
          id: 'q3',
          text: 'Halabja was a symbolic show of Iraqi force in a war that Iran could never win.',
          lang: 'en',
          cite: {
            source: 'hrw-1993-genocide-in-iraq-the-anfal-campaign-against-the-kurds',
            loc: { section: 'The First Anfal', para: '56' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.hrw.org/reports/1993/iraqanfal/ANFAL3.htm'
          }
        }
      ]
    },
    {
      id: 'both-sides-used-gas',
      category: 'revisionist',
      holders: [
        { kind: 'scholar', name: 'Stephen C. Pelletiere' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'It is now fairly certain that Iranian gas killed the Kurds.',
          lang: 'en',
          cite: {
            source: 'hrw-1993-genocide-in-iraq-the-anfal-campaign-against-the-kurds',
            loc: { section: 'Chapter 1: Introduction', para: '97' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.hrw.org/reports/1993/iraqanfal/ANFAL1.htm'
          }
        }
      ],
      reception: [
        {
          id: 'q5',
          text: 'The supposed factual basis for this conclusion is that the Halabja victims had blue lips, characteristic of the effects of cyanide gas--which Iraq was not believed to possess. Cyanide gas, a metabolic poison, would indeed produce blue lips, but they are far from being a specific indicator of its use. Nerve agents, which are acetylcholinesterase inhibitors that cause respiratory paralysis, would also turnvictims\' lips blue.',
          lang: 'en',
          cite: {
            source: 'hrw-1993-genocide-in-iraq-the-anfal-campaign-against-the-kurds',
            loc: { section: 'Chapter 1: Introduction', para: '98' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.hrw.org/reports/1993/iraqanfal/ANFAL1.htm'
          }
        },
        {
          id: 'q6',
          text: 'Books on the Iran-Iraq War have routinely echoed the unsubstantiated report that both sides had used chemical weapons in Halabja.',
          lang: 'en',
          cite: {
            source: 'hrw-1993-genocide-in-iraq-the-anfal-campaign-against-the-kurds',
            loc: { section: 'Chapter 1: Introduction', para: '97' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.hrw.org/reports/1993/iraqanfal/ANFAL1.htm'
          }
        }
      ]
    },
    {
      id: 'us-government-2003',
      category: 'official',
      holders: [
        { kind: 'state', name: 'United States' }
      ],
      statements: [
        {
          id: 'q7',
          text: 'This weekend, we remember the victims of Saddam Hussein\'s heinous chemical weapons attack on the people of Halabja, a city in northern Iraqi, and other villages attacked in the Al-Anfal campaign.',
          lang: 'en',
          cite: {
            source: 'white-house-2003-03-16-global-message-remembering-halabja',
            loc: { section: 'Global Message: Special Edition - Remembering Halabja', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://georgewbush-whitehouse.archives.gov/news/releases/2003/03/text/20030316-4.html'
          }
        },
        {
          id: 'q8',
          text: 'Saddam Hussein must never be allowed to use weapons of mass destruction again.',
          lang: 'en',
          cite: {
            source: 'white-house-2003-03-16-global-message-remembering-halabja',
            loc: { section: 'Global Message: Special Edition - Remembering Halabja', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://georgewbush-whitehouse.archives.gov/news/releases/2003/03/text/20030316-4.html'
          }
        }
      ],
      reception: [
        {
          id: 'q13',
          text: 'In the largest chemical attack of all, the March 16 bombing of the Kurdish town of Halabja, between 3,200 and 5,000 residents died.',
          lang: 'en',
          cite: {
            source: 'hrw-1993-genocide-in-iraq-the-anfal-campaign-against-the-kurds',
            loc: { section: 'Genocide in Iraq: The Anfal Campaign Against the Kurds' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.hrw.org/reports/1993/iraqanfal/ANFALINT.htm'
          }
        }
      ]
    },
    {
      id: 'iranian-state-narrative',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Islamic Republic of Iran' },
        { kind: 'participant', name: 'Ali Khamenei', ref: 'person:ali-khamenei' }
      ],
      statements: [
        {
          id: 'q9',
          text: 'In Halabja, he used chemical weapons and in our country too, he used them many times.',
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
          id: 'q14',
          text: 'On 30 March 1984, after allegations by Iran that Iraq had used chemical weapons, the President of the UN Security Council stated there was unanimous agreement among UN-appointed experts that chemical weapons had been used in the war.',
          lang: 'en',
          cite: {
            source: 'iranica-gieling-iraq-iran-iraq-war',
            loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '33' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/iraq-vii-iran-iraq-war/'
          }
        }
      ]
    },
    {
      id: 'iraqi-state-narrative',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Republic of Iraq' }
      ],
      statements: [
        {
          id: 'q10',
          text: 'Like all covetous invaders, the Zionist Khomeinyite forces relied on some of those who betrayed the homeland and people in the northern area of Iraq--those who our good Kurdish people expelled from their ranks. Those elements performed shameful services for foreigners. Among their shameful acts was facilitating the missions of the invading forces in entering in the Halabja border villages in the Suleimaniyeh Governorate.',
          lang: 'en',
          cite: {
            source: 'hrw-1993-genocide-in-iraq-the-anfal-campaign-against-the-kurds',
            loc: { section: 'The First Anfal', para: '62' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.hrw.org/reports/1993/iraqanfal/ANFAL3.htm'
          }
        },
        {
          id: 'q11',
          text: '"The loss of Halabja is a regrettable thing," remarked Foreign Minister and Revolutionary Command Council member Tariq Aziz, adding, "Members of Jalal al-Talabani\'s group are in the area and these traitors collaborate with the Iranian enemy."',
          lang: 'en',
          cite: {
            source: 'hrw-1993-genocide-in-iraq-the-anfal-campaign-against-the-kurds',
            loc: { section: 'The First Anfal', para: '52' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.hrw.org/reports/1993/iraqanfal/ANFAL3.htm'
          }
        }
      ],
      reception: [
        {
          id: 'q12',
          text: 'As the news of Halabja spread throughout Iraq, those who asked were told by Ba\'athist officials that Iran had been responsible. A Kurdish student of English at Mosul University recalled his shock and disbelief at the news; he and his fellow Kurds were convinced that Iraqi government forces had carried out the attack, but dared not protest for fear of arrest.',
          lang: 'en',
          cite: {
            source: 'hrw-1993-genocide-in-iraq-the-anfal-campaign-against-the-kurds',
            loc: { section: 'The First Anfal', para: '52' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.hrw.org/reports/1993/iraqanfal/ANFAL3.htm'
          }
        }
      ]
    }
  ],
  researched: '2026-10-09'
})
