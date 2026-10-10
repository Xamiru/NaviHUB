import { definePeriod } from '../../schema'

export default definePeriod({
  id: 'presidency-of-akbar-hashemi-rafsanjani',
  names: [
    { text: 'Presidency of Akbar Hashemi Rafsanjani', lang: 'en', role: 'primary' },
    { text: 'ریاست‌جمهوری اکبر هاشمی رفسنجانی', lang: 'fa', role: 'native' },
    { text: 'Rafsanjani era', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-10',
  periodType: 'regime',
  start: {
    alts: [
      {
        value: { d: '1989' },
        cites: [
          {
            source: 'iranica-yarshater-chronology-part-4',
            loc: { section: 'Chronology of Iranian History Part 4, 1989–97' }
          },
          {
            source: 'iranica-azimi-bakhash-kakar-elections',
            loc: { section: 'ELECTIONS', para: '88' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1997-08-03' },
        cites: [
          {
            source: 'hrw-1998-world-report-iran',
            loc: { section: 'World Report 1998: Iran', para: '2' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 2,
  parent: 'polity:islamic-republic-of-iran',
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The cleric ʿAli-Akbar Hāšemi Rafsanjāni, a wealthy pistachio grower from Kerman, author of a book on Amir Kabir, active in the Islamic Revolution, a close confidant of Ayatollah Khomeini and former speaker of the Majles, is elected president. He is reelected in 1993.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-4',
            loc: { section: 'Chronology of Iranian History Part 4, 1989–97' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-4/'
          }
        },
        {
          id: 'q2',
          text: 'ʿAlī-Akbar Hāšemī Rafsanjānī succeeded him in 1989 with enhanced powers.',
          lang: 'en',
          cite: {
            source: 'iranica-azimi-bakhash-kakar-elections',
            loc: { section: 'ELECTIONS', para: '88' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.iranicaonline.org/articles/elections/'
          }
        },
        {
          id: 'q3',
          text: 'The amended Constitution of 1989 abolished the prime minister’s post and transferred his powers to the president',
          lang: 'en',
          cite: {
            source: 'iranica-azimi-bakhash-kakar-elections',
            loc: { section: 'ELECTIONS', para: '88' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.iranicaonline.org/articles/elections/'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'Following the end of the war in 1988 and Ayatollah Khomeini’s death in 1989, Iran experienced a period of economic growth under President Ali-Akbar Hāšemi Rafsanjāni (Rafsanjani), and a relaxation of cultural restrictions introduced by his Minister of Culture and Islamic Guidance (Wazir-e farhang o eršād-e eslāmi), Sayyed Mohammad Khatami (Moḥammad Ḵātami).',
          lang: 'en',
          cite: {
            source: 'iranica-shahidi-journalism-iii-post-revolution-era',
            loc: { section: 'JOURNALISM iii. Post-Revolution Era', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.iranicaonline.org/articles/journalism-iii-post-revolution-era'
          }
        },
        {
          id: 'q5',
          text: 'However, with the end of the war a move was begun to dismantle many of the state controls.',
          lang: 'en',
          cite: {
            source: 'iranica-nowshirvani-economy-x-under-the-islamic-republic',
            loc: { section: 'ECONOMY x. UNDER THE ISLAMIC REPUBLIC', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.iranicaonline.org/articles/economy-x-under-the-islamic-republic'
          }
        },
        {
          id: 'q6',
          text: 'The radicals’ attempt to gain attention was outweighed by the neutral position that the Rafsanjāni government espoused.',
          lang: 'en',
          cite: {
            source: 'iranica-potter-gulf-war-and-persia',
            loc: { section: 'GULF WAR and PERSIA', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.iranicaonline.org/articles/gulf-war-and-persia'
          }
        },
        {
          id: 'q7',
          text: 'Diplomatic ties with Britain, which had been broken off over the Salman Rushdie affair, are resumed.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-4',
            loc: { section: 'Chronology of Iranian History Part 4, 1990' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-4/'
          }
        },
        {
          id: 'q8',
          text: 'Šāpur Baḵtiār, last prime minister of Iran prior to the 1979 Revolution, is assassinated in Paris, allegedly by agents of the Islamic Republic.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-4',
            loc: { section: 'Chronology of Iranian History Part 4, 1991' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-4/'
          }
        },
        {
          id: 'q9',
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
      kind: 'consequences',
      quotes: [
        {
          id: 'q10',
          text: 'After the war large current account deficits financed by short-term foreign loans emerged.',
          lang: 'en',
          cite: {
            source: 'iranica-nowshirvani-economy-x-under-the-islamic-republic',
            loc: { section: 'ECONOMY x. UNDER THE ISLAMIC REPUBLIC', para: '21' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.iranicaonline.org/articles/economy-x-under-the-islamic-republic'
          }
        },
        {
          id: 'q11',
          text: 'By 1993, however, opposition to further liberalization measures, especially to the reduction in consumer subsidies, had slowed down the reform process considerably.',
          lang: 'en',
          cite: {
            source: 'iranica-nowshirvani-economy-x-under-the-islamic-republic',
            loc: { section: 'ECONOMY x. UNDER THE ISLAMIC REPUBLIC', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.iranicaonline.org/articles/economy-x-under-the-islamic-republic'
          }
        },
        {
          id: 'q12',
          text: 'Khatami\'s predecessor as president, Hojatoleslam Rafsanjani, did not withdraw from the political scene.',
          lang: 'en',
          cite: {
            source: 'hrw-1998-world-report-iran',
            loc: { section: 'World Report 1998: Iran', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.hrw.org/legacy/worldreport/Mideast-04.htm'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ac/Akbar_Hashemi_Rafsanjani_Portrait_%284%29%28cropped%29.jpg/1280px-Akbar_Hashemi_Rafsanjani_Portrait_%284%29%28cropped%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Akbar_Hashemi_Rafsanjani_Portrait_(4)(cropped).jpg',
    credit: { institution: 'National Library and Archives of Iran' },
    license: { id: 'public-domain' }
  }
})
