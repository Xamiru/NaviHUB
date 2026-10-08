import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'reza-shah-pahlavi-legacy',
  about: ['person:reza-shah-pahlavi', 'period:reign-of-reza-shah'],
  topic: 'legacy',
  researched: '2026-10-09',
  positions: [
    {
      id: 'great-modernizer',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Ehsan Yarshater' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'Motivated by a strong sense of nationalism and intent on achieving glory for the land that he came to rule, he accomplished by the dint of his forceful personality and his determination, within a mere 16 years, a stunning record of reform and set the country on the road to modernization.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-iranian-history-islamic-period-5',
            loc: {
              section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Reza Shah Pahlavi (1925-41)'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/iran-ii2-islamic-period-page-5/'
          }
        },
        {
          id: 'q2',
          text: 'It is difficult to find in the long Persian history another monarch, with the possible exception of Cyrus, Darius I, and the Sasanid Ardašir I, who achieved so much in so little time.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-iranian-history-islamic-period-5',
            loc: {
              section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Reza Shah Pahlavi (1925-41)'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/iran-ii2-islamic-period-page-5/'
          }
        }
      ]
    },
    {
      id: 'autocrat',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' },
        { kind: 'scholar', name: 'Ehsan Yarshater' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'In accomplishing all this, however, he took away effective power from the Majlis, muzzled the press, and arrested opponents of the government.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE ERA OF REZA SHAH', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/iran/15.htm' }
        },
        {
          id: 'q4',
          text: 'As time went on, the shah grew increasingly avaricious and amassed great tracts of land.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE ERA OF REZA SHAH', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/iran/15.htm' }
        },
        {
          id: 'q5',
          text: 'He lived a simple life, but his accumulation of property in Māzandarān as well as his increasingly dictatorial behavior that cowed the people into sycophantic submission marred his otherwise most remarkable record of accomplishments, and subverted the results of the Constitutional movement, paving the way for a leftist outlook among the educated classes after his downfall.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-iranian-history-islamic-period-5',
            loc: {
              section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Reza Shah Pahlavi (1925-41)'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/iran-ii2-islamic-period-page-5/'
          }
        },
        {
          id: 'q8',
          text: 'The court of Reżā Shah at first functioned as an unelected parliament, instituting legislation that was both modern in conception and autocratic.',
          lang: 'en',
          cite: {
            source: 'iranica-sheikholeslami-courts-and-courtiers-reza-shah',
            loc: {
              section: 'COURTS AND COURTIERS viii. In the reign of Reżā Shah Pahlavī',
              para: '9'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/courts-and-courtiers-viii'
          }
        }
      ]
    },
    {
      id: 'british-instrument',
      category: 'fringe',
      holders: [
        { kind: 'public', name: 'Many people in Persia' }
      ],
      statements: [
        {
          id: 'q6',
          text: 'It was firmly believed by many people that the British raised Reżā Shah to glory and threw him out when he became useless.',
          lang: 'en',
          cite: {
            source: 'iranica-ashraf-conspiracy-theories',
            loc: { section: 'CONSPIRACY THEORIES', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/conspiracy-theories/'
          }
        }
      ],
      reception: [
        {
          id: 'q7',
          text: 'The myth of sīāsat-e Engelīs surfaced once again during the Allied occupation of Persia in 1320 Š./1941 and its aftermath.',
          lang: 'en',
          cite: {
            source: 'iranica-ashraf-conspiracy-theories',
            loc: { section: 'CONSPIRACY THEORIES', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/conspiracy-theories/'
          }
        }
      ]
    },
    {
      id: 'islamic-republic',
      category: 'official',
      holders: [
        {
          kind: 'state',
          name: 'Islamic Republic of Iran (Office of the Supreme Leader, Khamenei.ir)'
        }
      ],
      statements: [
        {
          id: 'q9',
          text: 'The one who took the biggest step in favor of the Western culture—that is, in reality, the West’s hegemony over Iran—and in favor of the British colonization, was Reza-Khan.',
          lang: 'en',
          cite: {
            source: 'khamenei-ir-2019-01-06-hijab-ban-atrocities',
            loc: { section: '6 major atrocities', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://web.archive.org/web/20240929190515id_/https://english.khamenei.ir/news/6222/6-major-atrocities-by-Reza-Khan-Pahlavi-in-banning-hijab-for'
          }
        },
        {
          id: 'q10',
          text: 'This ignorant bully --Reza Khan-- came to power and yielded to the enemies.',
          lang: 'en',
          cite: {
            source: 'khamenei-ir-2019-01-06-hijab-ban-atrocities',
            loc: { section: '6 major atrocities', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://web.archive.org/web/20240929190515id_/https://english.khamenei.ir/news/6222/6-major-atrocities-by-Reza-Khan-Pahlavi-in-banning-hijab-for'
          }
        }
      ],
      reception: [
        {
          id: 'q11',
          text: 'Although Reżā Khan had actually attempted a coup with German aid as early as 1335/1917 (Kaḥḥālzāda, pp. 299-308), the British did play a major role in the coup d’etat of 3 Esfand 1299 Š./22 February 1921, which brought him to power',
          lang: 'en',
          cite: {
            source: 'iranica-ashraf-conspiracy-theories',
            loc: { section: 'CONSPIRACY THEORIES', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/conspiracy-theories/'
          }
        }
      ]
    }
  ]
})
