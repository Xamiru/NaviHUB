import { definePerson } from '../../schema'

export default definePerson({
  id: 'abolhassan-banisadr',
  names: [
    { text: 'Abolhassan Banisadr', lang: 'en', role: 'primary' },
    { text: 'ابوالحسن بنی‌صدر', lang: 'fa', role: 'native' },
    { text: 'Abol-Hassan Bani-Sadr', lang: 'en', role: 'alternative' },
    { text: 'Abu’l-Ḥasan Banī-Ṣadr', lang: 'en', role: 'alternative' },
    { text: 'Abolhasan Bani-Sadr', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-08',
  regions: ['iran'],
  roles: ['politician', 'head-of-state'],
  offices: [
    {
      title: 'President of Iran',
      polity: 'polity:islamic-republic-of-iran',
      start: {
        alts: [
          {
            value: { d: '1980-01' },
            cites: [
              {
                source: 'loc-iran-country-study-1987',
                loc: { section: 'THE BANI SADR PRESIDENCY', para: '1' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1981-06-21' },
            cites: [
              {
                source: 'iranica-algar-khomeini-life',
                loc: { section: 'KHOMEINI i. Life', para: '73' }
              },
              {
                source: 'loc-iran-country-study-1987',
                loc: { section: 'THE BANI SADR PRESIDENCY', para: '17' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Hamid Algar' },
              { kind: 'organization', name: 'Federal Research Division, Library of Congress' }
            ]
          },
          {
            value: { d: '1981-06-22' },
            cites: [
              {
                source: 'oral-history-ir-2023-dismissal-of-bani-sadr',
                loc: { section: 'Dismissal of Bani-Sadr', para: '6' }
              }
            ],
            heldBy: [
              {
                kind: 'participant',
                name: 'Ruhollah Khomeini',
                ref: 'person:ruhollah-khomeini'
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'THE BANI SADR PRESIDENCY', para: '1' }
        },
        {
          source: 'iranica-azimi-bakhash-kakar-elections',
          loc: { section: 'ELECTIONS ii. Under the Islamic Republic, 1979-92', para: '7' }
        }
      ]
    },
    {
      title: 'Acting commander-in-chief of the armed forces',
      polity: 'polity:islamic-republic-of-iran',
      end: {
        alts: [
          {
            value: { d: '1981-06-10' },
            cites: [
              {
                source: 'loc-iran-country-study-1987',
                loc: { section: 'THE BANI SADR PRESIDENCY', para: '17' }
              },
              {
                source: 'iranica-algar-khomeini-life',
                loc: { section: 'KHOMEINI i. Life', para: '73' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'THE BANI SADR PRESIDENCY', para: '1' }
        },
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'THE BANI SADR PRESIDENCY', para: '17' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Abolhassan_Banisadr_portrait_1980_2.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Abolhassan_Banisadr_portrait_1980_2.jpg',
    credit: { institution: 'sarshomar.com (source named on the Commons file page)' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Abol-Hassan Bani-Sadr was elected president of the Islamic Republic of Iran in January 1980, but was subsequently impeached in June 1981.',
          lang: 'en',
          cite: {
            source: 'merip-1981-bani-sadr-interview',
            loc: { section: '“I Defeated the Ideology of the Regime”', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.merip.org/1981/10/i-defeated-the-ideology-of-the-regime/'
          }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q2',
          text: 'Although Bani-Ṣadr was the son of a religious scholar, Ayatollah Naṣr-Allāh Bani-Ṣadr, his education had been almost entirely secular',
          lang: 'en',
          cite: {
            source: 'iranica-algar-khomeini-life',
            loc: { section: 'KHOMEINI i. Life', para: '74' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/20260928150602/https://www.iranicaonline.org/articles/khomeini-i-life/'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q5',
          text: 'Bani-Ṣadr was elected first president of the Islamic Republic, and on 14 March, elections were held for the Majles. Almost immediately after his election, Bani-Ṣadr had difficulty forming a cabinet. The constitution provided for the president to nominate a prime minister, but his choice was subject to the approval of the Majles, dominated at the time by the Party of the Islamic Republic (Ḥezb-e Jomhuri-ye Eslāmi). This stipulation forced him to accept Moḥammad-ʿAli Rajāʾi, a person of thoroughly different orientation, and although Khomeini repeatedly called for consensus (waḥdat-e kalema) among the various political factions, differences were to remain intractable.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-khomeini-life',
            loc: { section: 'KHOMEINI i. Life', para: '72' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://web.archive.org/web/20260928150602/https://www.iranicaonline.org/articles/khomeini-i-life/'
          }
        },
        {
          id: 'q3',
          text: 'Abu’l-Ḥasan Baniṣadr is elected the first president of the Islamic Republic of Iran, with 75% of the vote.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-4',
            loc: { section: 'Chronology of Iranian History Part 4, 1980' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-4/'
          }
        },
        {
          id: 'q4',
          text: 'Bani Sadr\'s program as president was to reestablish central authority, gradually to phase out the Pasdaran and the revolutionary courts and committees and to absorb them into other government organizations, to reduce the influence of the clerical hierarchy, and to launch a program for economic reform and development.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE BANI SADR PRESIDENCY', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iran/25.htm' }
        },
        {
          id: 'q6',
          text: 'Like Bazargan, Bani Sadr found he was competing for primacy with the clerics and activists of the IRP. The struggle between the president and the IRP dominated the political life of the country during Bani Sadr\'s presidency.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE BANI SADR PRESIDENCY', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iran/25.htm' }
        }
      ]
    },
    {
      kind: 'later-life',
      quotes: [
        {
          id: 'q7',
          text: 'Bani Sadr remained in hiding for several weeks. Believing he was illegally impeached, he maintained his claim to the presidency, formed an alliance with Mojahedin leader Masoud Rajavi, and in July 1981 escaped with Rajavi from Iran to France. In Paris, Bani Sadr and Rajavi announced the establishment of the National Council of Resistance (NCR)',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'TERROR AND REPRESSION', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iran/26.htm' }
        },
        {
          id: 'q8',
          text: 'Enjoying the support of the president of France at the time, François Mitterand, Bani-Ṣadr and Rajavi established what they called the National Resistance Council',
          lang: 'en',
          cite: {
            source: 'iranica-algar-khomeini-life',
            loc: { section: 'KHOMEINI i. Life', para: '75' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/20260928150602/https://www.iranicaonline.org/articles/khomeini-i-life/'
          }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q9',
          text: 'People have not forgotten how I prevented Iran from collapsing after the Iraqi invasion. The army was finished and Saddam Hussein had invited thousands of journalists to celebrate his victory. I stopped this.',
          lang: 'en',
          cite: {
            source: 'merip-1981-bani-sadr-interview',
            loc: { section: '“I Defeated the Ideology of the Regime”', para: '30' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.merip.org/1981/10/i-defeated-the-ideology-of-the-regime/'
          }
        },
        {
          id: 'q10',
          text: 'The first time I felt he was not the man I believed him to be was when I went, with Beheshti, to discuss Khomeini’s objections to the new Islamic constitution. This was before the Council of Experts election in August 1979. He said that a woman could not be president of the republic. I reminded him that in Paris he had said this was possible. He replied: “Yes, I said many things in Paris. But I do not consider myself bound by them.”',
          lang: 'en',
          cite: {
            source: 'merip-1981-bani-sadr-interview',
            loc: { section: '“I Defeated the Ideology of the Regime”', para: '26' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.merip.org/1981/10/i-defeated-the-ideology-of-the-regime/'
          }
        }
      ]
    }
  ],
  furtherReading: [
    { source: 'banisadr-2001-dars-e-tajrobeh', perspective: 'iranian' },
    {
      source: 'banisadr-2006-nameha-az-aqa-ye-banisadr-be-aqa-ye-khomeini',
      perspective: 'iranian'
    }
  ],
  born: {
    alts: [
      {
        value: { d: '1933-03-22' },
        cites: [
          { source: 'lc-names-n79121475', loc: { section: 'Banī Ṣadr, Abū al-Ḥasan' } }
        ]
      },
      {
        value: { d: '1934-03-21' },
        cites: [
          { source: 'lc-names-n79121475', loc: { section: 'Banī Ṣadr, Abū al-Ḥasan' } }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '2021-10-09' },
        cites: [
          { source: 'lc-names-n79121475', loc: { section: 'Banī Ṣadr, Abū al-Ḥasan' } }
        ]
      }
    ]
  }
})
