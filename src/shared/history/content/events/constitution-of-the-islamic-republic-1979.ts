import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'constitution-of-the-islamic-republic-1979',
  names: [
    {
      text: 'Constitution of the Islamic Republic of Iran (1979)',
      lang: 'en',
      role: 'primary'
    },
    {
      text: 'قانون اساسی جمهوری اسلامی ایران',
      lang: 'fa',
      role: 'native',
      translit: 'Qānun-e asāsi-ye Jomhuri-ye Eslāmi-ye Irān'
    },
    {
      text: 'Constitution of 1358 Š.',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-arjomand-constitution-islamic-republic',
          loc: { section: 'CONSTITUTION OF THE ISLAMIC REPUBLIC', para: '9' }
        }
      ]
    }
  ],
  researched: '2026-10-09',
  type: 'law',
  start: {
    alts: [
      {
        value: { d: '1979-08-18' },
        cites: [
          {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'The New Constitution', para: '3' }
          }
        ],
        heldBy: [
          { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
        ]
      },
      {
        value: { d: '1979-08-12' },
        cites: [
          {
            source: 'iranica-algar-khomeini-life',
            loc: { section: 'KHOMEINI i. Life', para: '63' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Hamid Algar' }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1979-12-03' },
        cites: [
          {
            source: 'iranica-yarshater-chronology-part-4',
            loc: { section: 'Chronology of Iranian History Part 4, 1979' }
          },
          {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'The New Constitution', para: '3' }
          },
          {
            source: 'iranica-arjomand-constitution-islamic-republic',
            loc: { section: 'CONSTITUTION OF THE ISLAMIC REPUBLIC', para: '8' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 1,
  places: [
    {
      ref: 'place:tehran',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'The New Constitution', para: '3' }
        }
      ]
    },
    {
      ref: 'place:qom',
      cites: [
        {
          source: 'iranica-algar-khomeini-life',
          loc: { section: 'KHOMEINI i. Life', para: '63' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'event:iranian-revolution' }
  ],
  participants: [
    {
      ref: 'person:ruhollah-khomeini',
      role: 'leader',
      cites: [
        {
          source: 'iranica-algar-khomeini-life',
          loc: { section: 'KHOMEINI i. Life', para: '63' }
        },
        {
          source: 'iranica-arjomand-constitution-islamic-republic',
          loc: { section: 'CONSTITUTION OF THE ISLAMIC REPUBLIC', para: '5' }
        }
      ]
    },
    {
      name: 'Hosayn-Ali Montazeri',
      role: 'ideologue',
      cites: [
        {
          source: 'iranica-arjomand-constitution-islamic-republic',
          loc: { section: 'CONSTITUTION OF THE ISLAMIC REPUBLIC', para: '6' }
        },
        {
          source: 'iranica-arjomand-constitution-islamic-republic',
          loc: { section: 'CONSTITUTION OF THE ISLAMIC REPUBLIC', para: '7' }
        }
      ]
    },
    {
      ref: 'person:mohammad-beheshti',
      role: 'organizer',
      cites: [
        {
          source: 'iranica-arjomand-constitution-islamic-republic',
          loc: { section: 'CONSTITUTION OF THE ISLAMIC REPUBLIC', para: '8' }
        }
      ]
    },
    {
      ref: 'person:mehdi-bazargan',
      role: 'head-of-government',
      cites: [
        {
          source: 'iranica-arjomand-constitution-islamic-republic',
          loc: { section: 'CONSTITUTION OF THE ISLAMIC REPUBLIC', para: '5' }
        },
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'The New Constitution', para: '4' }
        }
      ]
    },
    {
      ref: 'person:kazem-shariatmadari',
      role: 'participant',
      cites: [
        {
          source: 'iranica-algar-khomeini-life',
          loc: { section: 'KHOMEINI i. Life', para: '81' }
        },
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'The New Constitution', para: '2' }
        }
      ]
    },
    {
      ref: 'person:abdul-rahman-ghassemlou',
      role: 'participant',
      cites: [
        {
          source: 'iranica-prunhuber-qasemlu',
          loc: { section: 'QĀSEMLU, ʿABD-AL-RAḤMĀN', para: '15' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:1979-islamic-republic-referendum',
      rel: 'preceded-by',
      cites: [
        {
          source: 'iranica-algar-khomeini-life',
          loc: { section: 'KHOMEINI i. Life', para: '63' }
        },
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'The New Constitution', para: '2' }
        }
      ]
    },
    {
      ref: 'event:iranian-revolution',
      rel: 'response-to',
      cites: [
        {
          source: 'iranica-algar-khomeini-life',
          loc: { section: 'KHOMEINI i. Life', para: '63' }
        }
      ]
    },
    {
      ref: 'event:iran-hostage-crisis',
      rel: 'related',
      cites: [
        {
          source: 'iranica-mohsen-milani-hostage-crisis',
          loc: { section: 'HOSTAGE CRISIS', para: '29' }
        },
        {
          source: 'iranica-algar-khomeini-life',
          loc: { section: 'KHOMEINI i. Life', para: '68' }
        }
      ]
    }
  ],
  polities: [
    { ref: 'polity:islamic-republic-of-iran' }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/28/Assembly_of_Experts_for_Constitution_1979.jpg/1280px-Assembly_of_Experts_for_Constitution_1979.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Assembly_of_Experts_for_Constitution_1979.jpg',
    credit: {
      institution: 'emam.com (Imam Khomeini site), photograph of the Assembly of Experts, 1979'
    },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'A Constituent Assembly approved the new Islamic Constitution, establishing the waliy-e faqih, or supreme leader endowed with all the powers of the government and immune from opposition or contradiction, as well as a Guardian Council to supervise the Majles and approve the qualification of individual candidates for the Parliament, among other powers.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-iranian-history-islamic-period-6',
            loc: {
              section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Moḥammad Reza Shah (1941-79)'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/iran-ii2-islamic-period-page-6/'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'After the overthrow of the Pahlavi monarchy in 1358 Š./1979 Persia was declared an Islamic republic. Until that time there had been virtually no discussion, outside religious circles, of the conception of welāyat-e faqīh (lit. “mandate of the jurist”) propounded by Ayatollah Ruhollah Khomeini (Rūḥ-Allāh Ḵomeynī; pp. 26-51). During the revolutionary turmoil of 1357 Š./1978-79 only the vaguer notion of “Islamic government” was current. It was only when the Majles-e ḵobragān (Assembly of experts; see below) began deliberations on a proposed constitution for the Islamic Republic in the summer of 1358 Š./1979 that welāyat-e faqīh began to emerge as the basis for the new document.',
          lang: 'en',
          cite: {
            source: 'iranica-arjomand-constitution-islamic-republic',
            loc: { section: 'CONSTITUTION OF THE ISLAMIC REPUBLIC', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/constitution-of-the-islamic-republic/'
          }
        },
        {
          id: 'q3',
          text: 'In a series of lectures delivered to his students in An Najaf in 1969 and 1970 and later published in book form under the title of Velayat-e Faqih (The Vice Regency of the Islamic Jurist), he argued that monarchy was a form of government abhorrent to Islam, that true Muslims must strive for the establishment of an Islamic state, and that the leadership of the state belonged by right to the faqih, or Islamic jurist.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'Khomeini and the Renewed Opposition', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/iran/20.htm' }
        },
        {
          id: 'q4',
          text: 'Khomeini himself does not appear at first to have attached much significance to drawing up a constitution. When, on 22 Dey 1357 Š./12 January 1979, he declared the formation of the Šūrā-ye enqelāb-e eslāmī (Council of the Islamic revolution), he specified as one of its tasks “the formation of a constituent assembly composed of the elected representatives of the people, in order to approve the new constitution of the Islamic Republic” (Algar, p. 8), but this item in the declaration originated with Prime Minister Mahdī Bāzargān and other liberals and Islamic modernists in the revolutionary coalition. The Bāzargān cabinet and the Šūrā, following the declaration, prepared a draft constitution during the spring of 1358 Š./1979. It was in many respects similar to that of 1325/1907, especially in its definition of the role of clerical authorities; in place of the committee of five mojtaheds (ranking theologians) specified in the supplement of 1325/1907, the Šūrā-ye negahbān (Council of guardians), consisting of five mojtaheds elected by the Majles from a list supplied by the marājeʿ-e taqlīd (supreme religious authority) and six nonclerical legal experts, was envisioned (Kātūzīān, p. 168). Khomeini was reportedly prepared, in June 1979, to accept this draft constitution with only minor changes. In fact, he proposed to bypass the promised constituent assembly and to submit the draft directly to a referendum.',
          lang: 'en',
          cite: {
            source: 'iranica-arjomand-constitution-islamic-republic',
            loc: { section: 'CONSTITUTION OF THE ISLAMIC REPUBLIC', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/constitution-of-the-islamic-republic/'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q8',
          text: 'The establishment of the supervening hierocratic authority and the veto power of the Council of guardians paved the way for the designation of the supreme jurist as leader of the Islamic Republic. With Beheštī in the chair, the militant clerics of the Assembly adopted the principle of welāyat-e faqīh. Ḥojjat-al-Eslām Rabbānī Amlašī, for instance, argued that it was time to “rescue” the institution of marjaʿīyat-e taqlīd by transforming it into welāyat-e faqīh, pointing out that, had plans for doing so been devised earlier, the Islamic Revolution might have triumphed fifteen or sixteen years earlier (Eṭṭelāʿāt, 20 Šahrīvar 1363 Š./11 September 1984). The Assembly then proceeded to institutionalize theocracy (see below). On this point it refused to compromise with the norms of national sovereignty and, on 16 Ābān 1358 Š./7 November 1979, rejected an article proposing that “the leader and the members of the leadership council of the Islamic Republic of Iran must be Persian citizens and [resident] in Persia” (Madanī, II, p. 177 n. 14). The Assembly concluded its deliberations in mid-November, and its draft constitution was ratified in the referendum of 11-12 Āḏar 1358 Š./2-3 December 1979.',
          lang: 'en',
          cite: {
            source: 'iranica-arjomand-constitution-islamic-republic',
            loc: { section: 'CONSTITUTION OF THE ISLAMIC REPUBLIC', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/constitution-of-the-islamic-republic/'
          }
        },
        {
          id: 'q9',
          text: 'Khomeini and the coalition of his conservative and leftist followers methodically undermined Bāzargān. Having won the overwhelming majority of the seats in the Assembly of Experts (Majles-e ḵobragān) in June of 1979, they drafted a constitution which legitimized the doctrine of sovereignty of the leading Shiʿite jurisprudent as representative of the Hidden Imam (welāyat-e faqih; see Ashraf, 1994, pp. 129-42, and Enayat, 1983, pp. 160-80). It was during the pivotal hostage crisis that the fate of this draft constitution was shaped and decided upon (see below).',
          lang: 'en',
          cite: {
            source: 'iranica-mohsen-milani-hostage-crisis',
            loc: { section: 'HOSTAGE CRISIS', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/hostage-crisis/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q10',
          text: 'The centerpiece of the new Constitution, however, is welāyat-e faqīh, which is enunciated in the preamble and embodied in Articles 5, 107, and 110.',
          lang: 'en',
          cite: {
            source: 'iranica-arjomand-constitution-islamic-republic',
            loc: { section: 'CONSTITUTION OF THE ISLAMIC REPUBLIC', para: '23' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/constitution-of-the-islamic-republic/'
          }
        },
        {
          id: 'q11',
          text: 'In October 1979, when it had become clear that the draft constitution would institutionalize clerical domination of the state, Bazargan and a number of his cabinet colleagues had attempted to persuade Khomeini to dissolve the Assembly of Experts, but Khomeini refused.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'The New Constitution', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/iran/24.htm' }
        },
        {
          id: 'q12',
          text: 'Šariʿatmadari criticized crucial elements of the constitution including welāyat-e faqih and called for a boycott of the referendum held on 3 December.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-khomeini-life',
            loc: { section: 'KHOMEINI i. Life', para: '81' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://web.archive.org/web/20260928150602/https://www.iranicaonline.org/articles/khomeini-i-life/'
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
            value: { d: '1979-06-18' },
            cites: [
              {
                source: 'iranica-algar-khomeini-life',
                loc: { section: 'KHOMEINI i. Life', para: '63' }
              },
              {
                source: 'loc-iran-country-study-1987',
                loc: { section: 'The New Constitution', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'The Khomeini regime unveiled a draft constitution on June 18.',
        lang: 'en',
        cite: {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'The New Constitution', para: '2' }
        },
        provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/iran/24.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1979-08-03' },
            cites: [
              {
                source: 'iranica-algar-khomeini-life',
                loc: { section: 'KHOMEINI i. Life', para: '63' }
              },
              {
                source: 'iranica-prunhuber-qasemlu',
                loc: { section: 'QĀSEMLU, ʿABD-AL-RAḤMĀN', para: '15' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q17',
        text: 'Elections for the Assembly of Experts (Majles-e ḵobragān) were held on 3 August 1979 with the goal of drafting a new constitution for the Islamic Republic.',
        lang: 'en',
        cite: {
          source: 'iranica-prunhuber-qasemlu',
          loc: { section: 'QĀSEMLU, ʿABD-AL-RAḤMĀN', para: '15' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://www.iranicaonline.org/articles/qasemlu/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1979-08-18' },
            cites: [
              {
                source: 'loc-iran-country-study-1987',
                loc: { section: 'Consolidation of the Islamic Republic', para: '3' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
            ]
          },
          {
            value: { d: '1979-08-12' },
            cites: [
              {
                source: 'iranica-algar-khomeini-life',
                loc: { section: 'KHOMEINI i. Life', para: '63' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Hamid Algar' }
            ]
          }
        ]
      },
      quote: {
        id: 'q21',
        text: 'A newly created seventy-three-member Assembly of Experts convened on August 18, 1979, to consider the draft constitution.',
        lang: 'en',
        cite: {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'Consolidation of the Islamic Republic', para: '3' }
        },
        provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/iran/24.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1979-09-12' },
            cites: [
              {
                source: 'iranica-yarshater-chronology-part-4',
                loc: { section: 'Chronology of Iranian History Part 4, 1979' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q18',
        text: 'September 12: The Assembly of Experts approves a clause in the new Constitution that grants supreme powers to the Supreme Leader (wali-ye faqih), Ayatollah Khomeini.',
        lang: 'en',
        cite: {
          source: 'iranica-yarshater-chronology-part-4',
          loc: { section: 'Chronology of Iranian History Part 4, 1979' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-4/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1979-12-03' },
            cites: [
              {
                source: 'iranica-yarshater-chronology-part-4',
                loc: { section: 'Chronology of Iranian History Part 4, 1979' }
              },
              {
                source: 'loc-iran-country-study-1987',
                loc: { section: 'The New Constitution', para: '3' }
              },
              {
                source: 'iranica-arjomand-constitution-islamic-republic',
                loc: { section: 'CONSTITUTION OF THE ISLAMIC REPUBLIC', para: '8' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q20',
        text: 'December 3: Ratification of the new Islamic Constitution after a final endorsement from the Assembly of Experts (Majles-e ḵobragān).',
        lang: 'en',
        cite: {
          source: 'iranica-yarshater-chronology-part-4',
          loc: { section: 'Chronology of Iranian History Part 4, 1979' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-09',
          url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-4/'
        }
      }
    }
  ],
  furtherReading: [
    { source: 'asmati-2010-hoquq-e-mellat-dar-qanun-e-asasi', perspective: 'iranian' }
  ]
})
