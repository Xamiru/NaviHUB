import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'us-sanctions-on-iran-1995-1996',
  names: [
    { text: 'US sanctions on Iran, 1995–1996', lang: 'en', role: 'primary' },
    { text: 'تحریم‌های ایالات متحده علیه ایران (۱۳۷۴–۱۳۷۵)', lang: 'fa', role: 'native' },
    {
      text: 'Iran and Libya Sanctions Act',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'us-congress-1996-iran-and-libya-sanctions-act',
          loc: { section: 'Public Law 104-172' }
        }
      ]
    },
    { text: 'D\'Amato Act', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-10',
  type: 'law',
  start: {
    alts: [
      {
        value: { d: '1995-03-15' },
        cites: [
          {
            source: 'clinton-1995-executive-order-12957',
            loc: { section: 'Executive Order 12957' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1996-08-05' },
        cites: [
          {
            source: 'us-congress-1996-iran-and-libya-sanctions-act',
            loc: { section: 'Public Law 104-172 (enactment note)' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'north-america'],
  prominence: 2,
  polities: [
    {
      ref: 'polity:united-states',
      cites: [
        {
          source: 'clinton-1995-executive-order-12957',
          loc: { section: 'Executive Order 12957' }
        }
      ]
    },
    {
      ref: 'polity:islamic-republic-of-iran',
      cites: [
        {
          source: 'clinton-1995-executive-order-12957',
          loc: { section: 'Executive Order 12957' }
        }
      ]
    },
    {
      ref: 'polity:federal-republic-of-germany',
      cites: [
        {
          source: 'hrw-1998-world-report-iran',
          loc: { section: 'World Report 1998: Iran', para: '35' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:bill-clinton',
      role: 'head-of-state',
      cites: [
        {
          source: 'clinton-1995-executive-order-12957',
          loc: { section: 'Executive Order 12957' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:iran-hostage-crisis',
      rel: 'response-to',
      cites: [
        {
          source: 'iranica-nowshirvani-economy-x-under-the-islamic-republic',
          loc: { section: 'ECONOMY x. UNDER THE ISLAMIC REPUBLIC', para: '19' }
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
          text: 'Total trade ban with Iran imposed by the United States in response to Iran’s alleged sponsorship of terrorism.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-4',
            loc: { section: 'Chronology of Iranian History Part 4, 1995' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-4/'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'After the assumption of power by the provisional government, the contracts with the Oil Consortium and other foreign oil companies were canceled.',
          lang: 'en',
          cite: {
            source: 'iranica-nowshirvani-economy-x-under-the-islamic-republic',
            loc: { section: 'ECONOMY x. UNDER THE ISLAMIC REPUBLIC', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.iranicaonline.org/articles/economy-x-under-the-islamic-republic'
          }
        },
        {
          id: 'q3',
          text: 'Western Europe, especially Germany, remained the main destination of Persia’s non-oil exports, while the United States banned all non-oil imports from Persia in 1987.',
          lang: 'en',
          cite: {
            source: 'iranica-nowshirvani-economy-x-under-the-islamic-republic',
            loc: { section: 'ECONOMY x. UNDER THE ISLAMIC REPUBLIC', para: '19' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.iranicaonline.org/articles/economy-x-under-the-islamic-republic'
          }
        },
        {
          id: 'q4',
          text: 'The introduction of the U.S. policy of “Dual Containment” in May 1993 then sought to exclude both Iran and Iraq from Persian Gulf affairs.',
          lang: 'en',
          cite: {
            source: 'iranica-potter-gulf-war-and-persia',
            loc: { section: 'GULF WAR and PERSIA', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.iranicaonline.org/articles/gulf-war-and-persia'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'Human rights was one area of Iranian policy that the "critical dialogue" explicitly aimed to improve.',
          lang: 'en',
          cite: {
            source: 'hrw-1998-world-report-iran',
            loc: { section: 'World Report 1998: Iran', para: '35' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/legacy/worldreport/Mideast-04.htm'
          }
        },
        {
          id: 'q6',
          text: 'There were signs of some easing in the relationship between Iran and the United States, notably in the lifting of the prohibition of the export of U.S.- produced foodstuffs to Iran in May. The U.S. government emphasized that no change of policy should be read into the lifting of its embargo.',
          lang: 'en',
          cite: {
            source: 'hrw-2000-world-report-iran',
            loc: { section: 'World Report 2000: Iran', para: '38' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://www.hrw.org/legacy/wr2k/Mena-04.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q7',
          text: 'The E.U. decision to suspend "critical dialogue" and the election of President Khatami were conducive to narrowing the gap between U.S. and E.U. policy toward Iran.',
          lang: 'en',
          cite: {
            source: 'hrw-1998-world-report-iran',
            loc: { section: 'World Report 1998: Iran', para: '39' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/legacy/worldreport/Mideast-04.htm'
          }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q8',
          text: 'I, William J. Clinton, President of the United States of America, in order to take steps with respect to Iran in addition to those set forth in Executive Order No. 12957 of March 15, 1995, to deal with the unusual and extraordinary threat to the national security, foreign policy, and economy of the United States referred to in that order, hereby order:',
          lang: 'en',
          cite: {
            source: 'clinton-1995-executive-order-12959',
            loc: { section: 'Executive Order 12959' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://en.wikisource.org/wiki/Executive_Order_12959'
          }
        },
        {
          id: 'q9',
          text: 'Sanctions With Respect to Iran.--Except as provided in subsection (f), the President shall impose 2 or more of the sanctions described in paragraphs (1) through (6) of section 6 if the President determines that a person has, with actual knowledge, on or after the date of the enactment of this Act, made an investment of $40,000,000 or more (or any combination of investments of at least $10,000,000 each, which in the aggregate equals or exceeds $40,000,000 in any 12-month period), that directly and significantly contributed to the enhancement of Iran\'s ability to develop petroleum resources of Iran.',
          lang: 'en',
          cite: {
            source: 'us-congress-1996-iran-and-libya-sanctions-act',
            loc: { section: 'Public Law 104-172, Sec. 5(a)' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.govinfo.gov/content/pkg/PLAW-104publ172/html/PLAW-104publ172.htm'
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
            value: { d: '1997-06' },
            cites: [
              {
                source: 'hrw-1998-world-report-iran',
                loc: { section: 'World Report 1998: Iran', para: '39' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'At the June summit of the group of eight industrialized countries in Denver, the U.S., Russia, Japan, Canada and the major European powers were able to agree on common language "noting with interest" the election results and the "constructive role" of Iran in U.N. peace efforts in Tajikistan. These rare positive comments on Iran were coupled with a call for the Iranian government, "to respect the human rights of all Iranian citizens and to renounce the use of terrorism, including against Iranian citizens living abroad."',
        lang: 'en',
        cite: {
          source: 'hrw-1998-world-report-iran',
          loc: { section: 'World Report 1998: Iran', para: '39' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'https://www.hrw.org/legacy/worldreport/Mideast-04.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1999-05' },
            cites: [
              {
                source: 'hrw-2000-world-report-iran',
                loc: { section: 'World Report 2000: Iran', para: '38' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'The U.S. continued to express objections to Iranian policies in the areas of weapons proliferation, support for terrorism, and human rights.',
        lang: 'en',
        cite: {
          source: 'hrw-2000-world-report-iran',
          loc: { section: 'World Report 2000: Iran', para: '38' }
        },
        provenance: { via: 'web', at: '2026-10-10', url: 'https://www.hrw.org/legacy/wr2k/Mena-04.htm' }
      }
    }
  ],
  archive: [
    {
      id: 'a1',
      mediaKind: 'audio',
      title: 'Audio Recording of President Clinton\'s Remarks on Signing the Iran & Libya Sanction Act of 1996 and an Exchange with Reporters',
      date: { d: '1996-08-05' },
      url: 'https://upload.wikimedia.org/wikipedia/commons/9/9b/Audio_Recording_of_President_Clinton%27s_Remarks_on_Signing_the_Iran_%26_Libya_Sanction_Act_of_1996_and_an_Exchange_with_Reporters_-_DPLA_-_9fc00c49d287fbe52f335aa186920e3a.mp3',
      page: 'https://commons.wikimedia.org/wiki/File:Audio_Recording_of_President_Clinton%27s_Remarks_on_Signing_the_Iran_%26_Libya_Sanction_Act_of_1996_and_an_Exchange_with_Reporters_-_DPLA_-_9fc00c49d287fbe52f335aa186920e3a.mp3',
      credit: {
        institution: 'National Archives and Records Administration (William J. Clinton Presidential Library)'
      },
      license: { id: 'public-domain' }
    }
  ]
})
