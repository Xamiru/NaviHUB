import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'constitutional-revision-of-1989',
  names: [
    {
      text: 'Revision of the Constitution of the Islamic Republic, 1989',
      lang: 'en',
      role: 'primary'
    },
    { text: 'بازنگری قانون اساسی جمهوری اسلامی ایران', lang: 'fa', role: 'native' },
    { text: 'Constitutional referendum of 1989', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-08',
  type: 'referendum',
  start: {
    alts: [
      {
        value: { d: '1989-07-28' },
        cites: [
          {
            source: 'iranica-arjomand-constitution-of-the-islamic-republic',
            loc: { section: 'CONSTITUTION OF THE ISLAMIC REPUBLIC', para: '32' }
          },
          { source: 'iranica-algar-fatwa', loc: { section: 'FATWĀ', para: '33' } }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 3,
  places: [
    { ref: 'place:tehran' }
  ],
  polities: [
    {
      ref: 'polity:islamic-republic-of-iran',
      cites: [
        {
          source: 'iranica-arjomand-constitution-of-the-islamic-republic',
          loc: { section: 'CONSTITUTION OF THE ISLAMIC REPUBLIC', para: '32' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:ruhollah-khomeini',
      role: 'leader',
      cites: [
        {
          source: 'iranica-arjomand-constitution-of-the-islamic-republic',
          loc: { section: 'CONSTITUTION OF THE ISLAMIC REPUBLIC', para: '31' }
        }
      ]
    },
    {
      ref: 'person:ali-khamenei',
      role: 'head-of-state',
      cites: [
        {
          source: 'iranica-arjomand-constitution-of-the-islamic-republic',
          loc: { section: 'CONSTITUTION OF THE ISLAMIC REPUBLIC', para: '32' }
        }
      ]
    },
    {
      ref: 'person:mir-hossein-mousavi',
      role: 'head-of-government',
      cites: [
        {
          source: 'iranica-arjomand-constitution-of-the-islamic-republic',
          loc: { section: 'CONSTITUTION OF THE ISLAMIC REPUBLIC', para: '31' }
        }
      ]
    },
    {
      name: 'Ali Meshkini',
      role: 'participant',
      cites: [
        {
          source: 'iranica-arjomand-constitution-of-the-islamic-republic',
          loc: { section: 'CONSTITUTION OF THE ISLAMIC REPUBLIC', para: '31' }
        }
      ]
    },
    {
      ref: 'person:akbar-hashemi-rafsanjani',
      role: 'participant',
      cites: [
        {
          source: 'iranica-azimi-bakhash-kakar-elections',
          loc: { section: 'ELECTIONS ii. Under the Islamic Republic, 1979-92', para: '7' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:death-of-ruhollah-khomeini', rel: 'followed-by' },
    {
      ref: 'event:iran-iraq-war',
      rel: 'related',
      cites: [
        {
          source: 'iranica-arjomand-constitution-of-the-islamic-republic',
          loc: { section: 'CONSTITUTION OF THE ISLAMIC REPUBLIC', para: '31' }
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
          text: 'The revised Constitution was approved by a majority of more than 97 percent in a referendum held simultaneously with the presidential elections on 6 Mordād 1368 Š./28 July 1989.',
          lang: 'en',
          cite: {
            source: 'iranica-arjomand-constitution-of-the-islamic-republic',
            loc: { section: 'CONSTITUTION OF THE ISLAMIC REPUBLIC', para: '32' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/constitution-of-the-islamic-republic/'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Ayatollah Khomeini announces the formation of a 13 member “Discretionary Council” (Šurā-ye maṣlaḥat) comprised of executive, legislative, and judicial leaders with the authority to overrule the veto power of the Guardianship Council. The new Council is empowered to review controversial bills in the event that Majles and the Guardianship Council fail to reach agreement on some theological or legal grounds.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-4',
            loc: { section: 'Chronology of Iranian History Part 4, 1988' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-4/'
          }
        },
        {
          id: 'q2',
          text: 'He declared that government in accordance with God’s absolute mandate (welāyat-e moṭlaqa-ye faqīh) is “the most important of the divine commandments and has priority over all derivative divine commandments. . . . [It is] one of the primary commandments of Islam and has priority over all derivative commandments, even over prayer, fasting and pilgrimage to Mecca.',
          lang: 'en',
          cite: {
            source: 'iranica-arjomand-constitution-of-the-islamic-republic',
            loc: { section: 'CONSTITUTION OF THE ISLAMIC REPUBLIC', para: '30' }
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
      kind: 'causes',
      quotes: [
        {
          id: 'q4',
          text: 'The constitutional implications of Khomeini’s statements on the absolute welāyat-e faqīh remained unclear, especially in relation to what would happen after his death. Meanwhile, friction between Ḵāmenaʾī and the clerical radicals in government, led by Prime Minister Mīr-Ḥosayn Mūsawī, over strategies for reconstruction greatly intensified after the cease-fire with Iraq in July 1988. This conflict led to open expressions of dissatisfaction with the constitutional division of executive power between the president and the prime minister.',
          lang: 'en',
          cite: {
            source: 'iranica-arjomand-constitution-of-the-islamic-republic',
            loc: { section: 'CONSTITUTION OF THE ISLAMIC REPUBLIC', para: '31' }
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
          id: 'q5',
          text: 'Within a week he had agreed and had assigned the task to a committee, subsequently Šūrā-ye bāznegarī-e qānūn-e asāsī (Council for the revision of the Constitution), of eighteen clerics and two laymen, to which the Majles was invited to elect five of its members. They were given two months to revise the existing constitutional provisions on leadership, centralization of authority in the executive, centralization of authority in the judiciary, centralization of management of the radio and television networks, the number of deputies in the Majles and its official designation as the National Islamic assembly, the role of the new Discretionary council, and subsequent constitutional amendments',
          lang: 'en',
          cite: {
            source: 'iranica-arjomand-constitution-of-the-islamic-republic',
            loc: { section: 'CONSTITUTION OF THE ISLAMIC REPUBLIC', para: '31' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/constitution-of-the-islamic-republic/'
          }
        },
        {
          id: 'q6',
          text: 'The committee met on 6 Ordībehešt/26 April and elected Ayatollah ʿAlī Meškīnī, president of the Assembly of experts, as its president.',
          lang: 'en',
          cite: {
            source: 'iranica-arjomand-constitution-of-the-islamic-republic',
            loc: { section: 'CONSTITUTION OF THE ISLAMIC REPUBLIC', para: '31' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/constitution-of-the-islamic-republic/'
          }
        },
        {
          id: 'q7',
          text: 'The only recorded subsequent instructions from Khomeini came in a letter of 19 Ordībehešt/9 May advising that the requirement of marjaʿīyat for the position of leadership be dropped and expressing his opinion that recognition as a mojtahed-e ʿādel by the Assembly of experts should suffice',
          lang: 'en',
          cite: {
            source: 'iranica-arjomand-constitution-of-the-islamic-republic',
            loc: { section: 'CONSTITUTION OF THE ISLAMIC REPUBLIC', para: '31' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/constitution-of-the-islamic-republic/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q8',
          text: 'The name of the Majles had been changed to “Islamic consultative assembly” throughout the Constitution. To provide for further constitutional amendments as they became necessary, a permanent šūrā-ye bāznegarī was established; it was to consist of the members of the Council of guardians and the Commission for determination, the heads of the three branches of government, five members of the Assembly of experts, ten members appointed by the leader, three delegates from the executive branch, three from the judicial branch, ten from the Majles, and three from the universities.',
          lang: 'en',
          cite: {
            source: 'iranica-arjomand-constitution-of-the-islamic-republic',
            loc: { section: 'CONSTITUTION OF THE ISLAMIC REPUBLIC', para: '33' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/constitution-of-the-islamic-republic/'
          }
        },
        {
          id: 'q9',
          text: 'The supreme judicial council was replaced by a single chief justice, to be appointed by the leader for five years (new Art. 157); the leader was also given the power to appoint and dismiss the director of the broadcasting networks and a media supervisory commission drawn from the three branches of government. The post of prime minister was abolished and all his functions transferred to the president (new Arts. 60, 69, 87, 125-27).',
          lang: 'en',
          cite: {
            source: 'iranica-arjomand-constitution-of-the-islamic-republic',
            loc: { section: 'CONSTITUTION OF THE ISLAMIC REPUBLIC', para: '34' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/constitution-of-the-islamic-republic/'
          }
        },
        {
          id: 'q10',
          text: 'The primary task, and the most difficult, was, of course, constitutional implementation of welāyat-e faqīh, the settlement of the leadership issue. In accordance with Khomeini’s instructions the requirement of marjaʿīyat was eliminated in amended Article 109, but, in addition, after his death some other important amendments were adopted. At its first session in 1362 Š./1983 the Assembly of experts had appointed a committee to lay down procedures for dismissal; previous requirements had focused on personal incapacity of the leader without addressing the possibility of “loss of qualifications” (Madani, II, pp. 98-118). Under amended Article 111 the Assembly of experts is empowered to dismiss the leader also “if it should become apparent that he had lacked some of the qualifications from the beginning.” This new formulation appears to grant the Assembly of experts unrestricted control over the leader, as the qualifications specified in Article 109 include, beside jurisprudential competence, “correct political and social perspective, administrative and managerial competence, courage, and adequate power for leadership.” Finally, the provision for a leadership council to fulfill the functions of the faqīh was eliminated in amended Articles 5 and 107, with the slight qualification, in Article 111, that a leadership council can function in emergencies, pending the speedy election of a new leader by the Assembly of experts. The powers of leadership were thus concentrated in a single person',
          lang: 'en',
          cite: {
            source: 'iranica-arjomand-constitution-of-the-islamic-republic',
            loc: { section: 'CONSTITUTION OF THE ISLAMIC REPUBLIC', para: '35' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/constitution-of-the-islamic-republic/'
          }
        },
        {
          id: 'q11',
          text: 'Article 109 of the Constitution approved on 11-12 Āḏar 1358 Š./2-3 December 1979 had listed as first among the qualifications of the rahbar (leader) suitability with respect to learning and piety as required for the functions of moftī and marjaʿ (lāzem barā-ye eftāʾ wa marjaʿīyat); it was now amended to read “suitability with respect to learning as required for the function of moftī in the different areas of jurisprudence” (lāzem barā-ye eftāʾ dar abwāb-e moḵtalef-e feqh), piety being specified as a separate qualification',
          lang: 'en',
          cite: { source: 'iranica-algar-fatwa', loc: { section: 'FATWĀ', para: '33' } },
          provenance: { via: 'web', at: '2026-10-08', url: 'https://www.iranicaonline.org/articles/fatwa' }
        },
        {
          id: 'q12',
          text: 'These figures could not be independently verified.',
          lang: 'en',
          cite: {
            source: 'iranica-azimi-bakhash-kakar-elections',
            loc: { section: 'ELECTIONS ii. Under the Islamic Republic, 1979-92', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/elections/'
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
            value: { d: '1988-01-06' },
            cites: [
              {
                source: 'iranica-arjomand-constitution-of-the-islamic-republic',
                loc: { section: 'CONSTITUTION OF THE ISLAMIC REPUBLIC', para: '30' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'Nevertheless, he finally overcame his reluctance, and, on 16 Dey 1366 Š./6 January 1988, he reprimanded President ʿAlī Ḵāmenaʾī for claiming that the authority of Islamic government could be exercised only within the framework of the ordinances (aḥkām) of Islamic law.',
        lang: 'en',
        cite: {
          source: 'iranica-arjomand-constitution-of-the-islamic-republic',
          loc: { section: 'CONSTITUTION OF THE ISLAMIC REPUBLIC', para: '30' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/constitution-of-the-islamic-republic/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1988-02-06' },
            cites: [
              {
                source: 'iranica-arjomand-constitution-of-the-islamic-republic',
                loc: { section: 'CONSTITUTION OF THE ISLAMIC REPUBLIC', para: '30' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'On 17 Bahman 1366 Š./6 February 1988 he appointed Majmaʿ-e taškīṣ-e maṣlaḥat-e neẓām (Commission for determination of the interest of the Islamic order), including the six clerical jurists of the Council of guardians and a number of other religious authorities, to deliberate on bills approved by the Majles and rejected by the Council of guardians',
        lang: 'en',
        cite: {
          source: 'iranica-arjomand-constitution-of-the-islamic-republic',
          loc: { section: 'CONSTITUTION OF THE ISLAMIC REPUBLIC', para: '30' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/constitution-of-the-islamic-republic/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1989-03-27' },
            cites: [
              {
                source: 'iranica-arjomand-constitution-of-the-islamic-republic',
                loc: { section: 'CONSTITUTION OF THE ISLAMIC REPUBLIC', para: '31' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'Furthermore, the resignation of Khomeini’s designated successor, Montaẓerī, on 7 Farvardīn 1368 Š./27 March 1989, added urgency to the need for constitutional resolution of the problem of the succession.',
        lang: 'en',
        cite: {
          source: 'iranica-arjomand-constitution-of-the-islamic-republic',
          loc: { section: 'CONSTITUTION OF THE ISLAMIC REPUBLIC', para: '31' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/constitution-of-the-islamic-republic/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1989-07-08' },
            cites: [
              {
                source: 'iranica-arjomand-constitution-of-the-islamic-republic',
                loc: { section: 'CONSTITUTION OF THE ISLAMIC REPUBLIC', para: '32' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'The Council for revision of the Constitution continued its work at full speed, holding its thirty-eighth and last session on 17 Tīr 1368 Š./8 July 1989.',
        lang: 'en',
        cite: {
          source: 'iranica-arjomand-constitution-of-the-islamic-republic',
          loc: { section: 'CONSTITUTION OF THE ISLAMIC REPUBLIC', para: '32' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://www.iranicaonline.org/articles/constitution-of-the-islamic-republic/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1989-07-28' },
            cites: [
              {
                source: 'iranica-arjomand-constitution-of-the-islamic-republic',
                loc: { section: 'CONSTITUTION OF THE ISLAMIC REPUBLIC', para: '32' }
              },
              { source: 'iranica-algar-fatwa', loc: { section: 'FATWĀ', para: '33' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q17',
        text: 'One of the modifications to the Constitution of the Islamic Republic that were approved in a referendum conducted jointly with the presidential elections of 6 Mordād 1368 Š./28 July 1989 seemed to point to a disjunction of the authority to issue fatwās from the function of marjaʿ and even from the position of mojtahed.',
        lang: 'en',
        cite: { source: 'iranica-algar-fatwa', loc: { section: 'FATWĀ', para: '33' } },
        provenance: { via: 'web', at: '2026-10-08', url: 'https://www.iranicaonline.org/articles/fatwa' }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Iranian_1989_rederendum_ballot.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Iranian_1989_rederendum_ballot.jpg',
    credit: { institution: 'National Library and Archives of Iran (Interior Ministry of Iran)' },
    license: { id: 'public-domain' }
  }
})
