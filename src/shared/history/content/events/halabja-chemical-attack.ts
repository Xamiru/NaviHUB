import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'halabja-chemical-attack',
  names: [
    { text: 'Halabja chemical attack', lang: 'en', role: 'primary' },
    { text: 'کیمیابارانی هەڵەبجە', lang: 'ku', role: 'native' },
    { text: 'هجوم حلبجة الكيميائي', lang: 'ar', role: 'native' },
    { text: 'بمباران شیمیایی حلبچه', lang: 'fa', role: 'alternative' },
    { text: 'Halabja massacre', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-08',
  type: 'massacre',
  start: {
    alts: [
      {
        value: { d: '1988-03-16' },
        cites: [
          {
            source: 'iranica-gieling-iraq-vii-iran-iraq-war',
            loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '42' }
          },
          {
            source: 'hrw-1993-genocide-in-iraq-the-anfal-campaign-against-the-kurds',
            loc: { section: 'Chapter 1: Introduction', para: '21' }
          },
          {
            source: 'hrw-1993-genocide-in-iraq-the-anfal-campaign-against-the-kurds',
            loc: { section: 'The First Anfal', para: '46' }
          },
          {
            source: 'white-house-2003-03-16-global-message-remembering-halabja',
            loc: { section: 'Global Message: Special Edition - Remembering Halabja', para: '3' }
          }
        ]
      }
    ]
  },
  regions: ['mena'],
  prominence: 2,
  places: [
    {
      ref: 'place:halabja',
      cites: [
        {
          source: 'iranica-gieling-iraq-vii-iran-iraq-war',
          loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '42' }
        }
      ]
    }
  ],
  partOf: [
    {
      ref: 'event:iran-iraq-war',
      cites: [
        {
          source: 'iranica-gieling-iraq-vii-iran-iraq-war',
          loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '42' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:republic-of-iraq',
      cites: [
        {
          source: 'iranica-gieling-iraq-vii-iran-iraq-war',
          loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '42' }
        }
      ]
    },
    {
      ref: 'polity:islamic-republic-of-iran',
      cites: [
        {
          source: 'hrw-1993-genocide-in-iraq-the-anfal-campaign-against-the-kurds',
          loc: { section: 'The First Anfal', para: '45' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'iraq',
      name: 'Iraq',
      polity: 'polity:republic-of-iraq',
      cites: [
        {
          source: 'hrw-1993-genocide-in-iraq-the-anfal-campaign-against-the-kurds',
          loc: { section: 'Chapter 1: Introduction', para: '21' }
        }
      ]
    },
    {
      key: 'iran',
      name: 'Iran and Iraqi Kurdish peshmerga',
      polity: 'polity:islamic-republic-of-iran',
      cites: [
        {
          source: 'hrw-1993-genocide-in-iraq-the-anfal-campaign-against-the-kurds',
          loc: { section: 'The First Anfal', para: '43' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:saddam-hussein',
      role: 'leader',
      side: 'iraq',
      cites: [
        {
          source: 'hrw-1993-genocide-in-iraq-the-anfal-campaign-against-the-kurds',
          loc: { section: 'The First Anfal', para: '59' }
        }
      ]
    },
    {
      name: 'Tariq Aziz',
      role: 'diplomat',
      side: 'iraq',
      cites: [
        {
          source: 'hrw-1993-genocide-in-iraq-the-anfal-campaign-against-the-kurds',
          loc: { section: 'The First Anfal', para: '52' }
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
            value: { min: 3200, qualifier: 'over' },
            cites: [
              {
                source: 'hrw-1993-genocide-in-iraq-the-anfal-campaign-against-the-kurds',
                loc: { section: 'The First Anfal', para: '53' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'Middle East Watch (Human Rights Watch)' }
            ]
          },
          {
            value: { min: 4000 },
            cites: [
              {
                source: 'iranica-gieling-iraq-vii-iran-iraq-war',
                loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '42' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Saskia M. Gieling' }
            ]
          },
          {
            value: { min: 4000, max: 7000 },
            cites: [
              {
                source: 'hrw-1993-genocide-in-iraq-the-anfal-campaign-against-the-kurds',
                loc: { section: 'The First Anfal', para: '53' }
              }
            ],
            heldBy: [
              { kind: 'public', name: 'Kurdish and Iranian estimates' }
            ]
          },
          {
            value: { min: 5000 },
            cites: [
              {
                source: 'white-house-2003-03-16-global-message-remembering-halabja',
                loc: { section: 'Global Message: Special Edition - Remembering Halabja', para: '3' }
              }
            ],
            heldBy: [
              { kind: 'state', name: 'United States (2003)' }
            ]
          }
        ]
      }
    }
  ],
  related: [
    {
      ref: 'event:iran-iraq-war',
      rel: 'related',
      cites: [
        {
          source: 'iranica-gieling-iraq-vii-iran-iraq-war',
          loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '42' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'On 16 March, the Iraqi air force used poison gas to attack Ḥalabja, an Iraqi town which had been captured by Iranian forces and their Iraqi Kurdish allies the day before. At least 4,000 people were killed, most of them civilians.',
          lang: 'en',
          cite: {
            source: 'iranica-gieling-iraq-vii-iran-iraq-war',
            loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '42' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/iraq-vii-iran-iraq-war'
          }
        },
        {
          id: 'q2',
          text: 'Halabja was a bustling Kurdish town with a busy commercial section and a number of government offices. Villagers displaced from their homes by the war had swollen its population of 40,000 to 60,000 or more.',
          lang: 'en',
          cite: {
            source: 'hrw-1993-genocide-in-iraq-the-anfal-campaign-against-the-kurds',
            loc: { section: 'The First Anfal', para: '42' }
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
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'According to Teheran radio, the offensive--conducted by a joint force of PUK peshmerga and pasdaran--was in retaliation for the Iraqi regime\'s recent chemical attacks on the Kurds.',
          lang: 'en',
          cite: {
            source: 'hrw-1993-genocide-in-iraq-the-anfal-campaign-against-the-kurds',
            loc: { section: 'The First Anfal', para: '43' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.hrw.org/reports/1993/iraqanfal/ANFAL3.htm'
          }
        },
        {
          id: 'q4',
          text: 'But the greater strategic importance of Halabja was its location just seven miles east of Darbandikhan Lake, whose dam controls a significant part of the water supply to the Iraqi capital, Baghdad.',
          lang: 'en',
          cite: {
            source: 'hrw-1993-genocide-in-iraq-the-anfal-campaign-against-the-kurds',
            loc: { section: 'The First Anfal', para: '42' }
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
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'Halabja had been subjected to three days of heavy Iranian shelling from the surrounding hills, beginning on March 13.',
          lang: 'en',
          cite: {
            source: 'hrw-1993-genocide-in-iraq-the-anfal-campaign-against-the-kurds',
            loc: { section: 'The First Anfal', para: '44' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.hrw.org/reports/1993/iraqanfal/ANFAL3.htm'
          }
        },
        {
          id: 'q6',
          text: 'The Iraqi counterattack began in the mid-morning of March 16, with conventional airstrikes and artillery shelling from the town of Sayed Sadeq to the north.',
          lang: 'en',
          cite: {
            source: 'hrw-1993-genocide-in-iraq-the-anfal-campaign-against-the-kurds',
            loc: { section: 'The First Anfal', para: '46' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.hrw.org/reports/1993/iraqanfal/ANFAL3.htm'
          }
        },
        {
          id: 'q7',
          text: 'In the afternoon, at about 3:00, those who remained in the shelters became aware of an unusual smell.',
          lang: 'en',
          cite: {
            source: 'hrw-1993-genocide-in-iraq-the-anfal-campaign-against-the-kurds',
            loc: { section: 'The First Anfal', para: '47' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.hrw.org/reports/1993/iraqanfal/ANFAL3.htm'
          }
        },
        {
          id: 'q8',
          text: 'There would, however, be no homes to return to, for virtually every structure in Halabja was leveled with dynamite and bulldozers after Iraqi forces finally retook the city.',
          lang: 'en',
          cite: {
            source: 'hrw-1993-genocide-in-iraq-the-anfal-campaign-against-the-kurds',
            loc: { section: 'The First Anfal', para: '51' }
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
      kind: 'consequences',
      quotes: [
        {
          id: 'q9',
          text: 'Halabja was exemplary collective punishment of the most brutal kind, carried out in bald defiance of all international prohibitions on the use of chemical weapons.',
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
        },
        {
          id: 'q10',
          text: 'Yet Halabja, while remaining the single greatest atrocity of the war against the Kurds, was not part of Anfal.',
          lang: 'en',
          cite: {
            source: 'hrw-1993-genocide-in-iraq-the-anfal-campaign-against-the-kurds',
            loc: { section: 'The First Anfal', para: '57' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.hrw.org/reports/1993/iraqanfal/ANFAL3.htm'
          }
        },
        {
          id: 'q11',
          text: 'On March 16, 1988, the Iraqi air force dropped a devastating mix of mustard and nerve gas on citizens in this city - 5,000 were killed immediately, several thousand died later, and an estimated 10,000 people are maimed or still suffering the effects of this attack.',
          lang: 'en',
          cite: {
            source: 'white-house-2003-03-16-global-message-remembering-halabja',
            loc: { section: 'Global Message: Special Edition - Remembering Halabja', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://georgewbush-whitehouse.archives.gov/news/releases/2003/03/text/20030316-4.html'
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
            value: { d: '1988-03-13' },
            cites: [
              {
                source: 'hrw-1993-genocide-in-iraq-the-anfal-campaign-against-the-kurds',
                loc: { section: 'The First Anfal', para: '43' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'On March 13, the Iranians officially announced that they had launched a new offensive named Zafar 7 in the Halabja area.',
        lang: 'en',
        cite: {
          source: 'hrw-1993-genocide-in-iraq-the-anfal-campaign-against-the-kurds',
          loc: { section: 'The First Anfal', para: '43' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.hrw.org/reports/1993/iraqanfal/ANFAL3.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1988-03-15' },
            cites: [
              {
                source: 'hrw-1993-genocide-in-iraq-the-anfal-campaign-against-the-kurds',
                loc: { section: 'The First Anfal', para: '45' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'By the night of March 15 they were openly parading through the streets, accompanied by Iraqi Kurds, greeting the townspeople and chanting "God is Great! Khomeini is our leader!"',
        lang: 'en',
        cite: {
          source: 'hrw-1993-genocide-in-iraq-the-anfal-campaign-against-the-kurds',
          loc: { section: 'The First Anfal', para: '45' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.hrw.org/reports/1993/iraqanfal/ANFAL3.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1988-03-16' },
            cites: [
              {
                source: 'hrw-1993-genocide-in-iraq-the-anfal-campaign-against-the-kurds',
                loc: { section: 'The First Anfal', para: '49' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'Those who had the strength fled toward the Iranian border. A freezing rain had turned the ground to mud, and many of the refugees went barefoot.',
        lang: 'en',
        cite: {
          source: 'hrw-1993-genocide-in-iraq-the-anfal-campaign-against-the-kurds',
          loc: { section: 'The First Anfal', para: '49' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.hrw.org/reports/1993/iraqanfal/ANFAL3.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1988-03' },
            cites: [
              {
                source: 'hrw-1993-genocide-in-iraq-the-anfal-campaign-against-the-kurds',
                loc: { section: 'The First Anfal', para: '53' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'In the days following the mass gassing, the Iranian government, well aware of the implications, ferried in journalists from Teheran, including a number of foreigners.',
        lang: 'en',
        cite: {
          source: 'hrw-1993-genocide-in-iraq-the-anfal-campaign-against-the-kurds',
          loc: { section: 'The First Anfal', para: '53' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.hrw.org/reports/1993/iraqanfal/ANFAL3.htm'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9f/Wall_of_Names_of_Victims_of_1988_Chemical_Attack_-_With_Memorial_Hall_Reflected_-_Halabja_-_Kurdistan_-_Iraq.jpg/1280px-Wall_of_Names_of_Victims_of_1988_Chemical_Attack_-_With_Memorial_Hall_Reflected_-_Halabja_-_Kurdistan_-_Iraq.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Wall_of_Names_of_Victims_of_1988_Chemical_Attack_-_With_Memorial_Hall_Reflected_-_Halabja_-_Kurdistan_-_Iraq.jpg',
    credit: { creator: 'Adam Jones, Ph.D.' },
    license: { id: 'cc-by-sa', version: '3.0', url: 'https://creativecommons.org/licenses/by-sa/3.0' }
  }
})
