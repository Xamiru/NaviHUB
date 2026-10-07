import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'persian-coup-of-1921',
  names: [
    { text: 'Persian coup d’état of 1921', lang: 'en', role: 'primary' },
    { text: 'کودتای ۱۲۹۹', lang: 'fa', role: 'native' },
    {
      text: 'Coup d’état of 1299/1921',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-shambayati-coup-detat-of-1921',
          loc: { section: 'COUP D’ETAT OF 1299/1921', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-07',
  type: 'coup',
  start: {
    alts: [
      {
        value: { d: '1921-02-21' },
        cites: [
          {
            source: 'iranica-shambayati-coup-detat-of-1921',
            loc: { section: 'COUP D’ETAT OF 1299/1921', para: '4' }
          },
          {
            source: 'iranica-yarshater-iranian-history-islamic-period-5',
            loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Qajar period' }
          },
          {
            source: 'iranica-sheikh-ol-islami-ahmad-shah',
            loc: { section: 'AḤMAD SHAH QĀJĀR', para: '12' }
          },
          {
            source: 'iranica-shahnavaz-kazal-khan',
            loc: { section: 'ḴAZʿAL KHAN', para: '28' }
          }
        ]
      },
      {
        value: { d: '1921-02-22' },
        cites: [
          {
            source: 'iranica-ashraf-conspiracy-theories',
            loc: { section: 'CONSPIRACY THEORIES', para: '10' }
          }
        ]
      },
      {
        value: { d: '1921-02-23' },
        cites: [
          {
            source: 'iranica-ferrier-anglo-iranian-relations-pahlavi',
            loc: { section: 'ANGLO-IRANIAN RELATIONS iii. Pahlavi period', para: '6' }
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
          source: 'iranica-shambayati-coup-detat-of-1921',
          loc: { section: 'COUP D’ETAT OF 1299/1921', para: '4' }
        }
      ]
    },
    {
      ref: 'place:qazvin',
      cites: [
        {
          source: 'iranica-shambayati-coup-detat-of-1921',
          loc: { section: 'COUP D’ETAT OF 1299/1921', para: '4' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:qajar-dynasty' }
  ],
  participants: [
    {
      ref: 'person:reza-shah-pahlavi',
      role: 'leader',
      cites: [
        {
          source: 'iranica-shambayati-coup-detat-of-1921',
          loc: { section: 'COUP D’ETAT OF 1299/1921', para: '1' }
        }
      ]
    },
    {
      ref: 'person:seyyed-zia-al-din-tabatabai',
      role: 'leader',
      cites: [
        {
          source: 'iranica-shambayati-coup-detat-of-1921',
          loc: { section: 'COUP D’ETAT OF 1299/1921', para: '1' }
        }
      ]
    },
    {
      ref: 'person:ahmad-shah-qajar',
      role: 'head-of-state',
      cites: [
        {
          source: 'iranica-sheikh-ol-islami-ahmad-shah',
          loc: { section: 'AḤMAD SHAH QĀJĀR', para: '12' }
        }
      ]
    },
    {
      name: 'Edmund Ironside',
      role: 'participant',
      cites: [
        {
          source: 'iranica-shambayati-coup-detat-of-1921',
          loc: { section: 'COUP D’ETAT OF 1299/1921', para: '2' }
        },
        {
          source: 'iranica-shambayati-coup-detat-of-1921',
          loc: { section: 'COUP D’ETAT OF 1299/1921', para: '8' }
        }
      ]
    },
    {
      name: 'Aḥmad Āqā (Amīr-Aḥmadī)',
      role: 'commander',
      cites: [
        {
          source: 'iranica-shambayati-coup-detat-of-1921',
          loc: { section: 'COUP D’ETAT OF 1299/1921', para: '2' }
        }
      ]
    },
    {
      name: 'Masʿūd Khan (Keyhān)',
      role: 'participant',
      cites: [
        {
          source: 'iranica-shambayati-coup-detat-of-1921',
          loc: { section: 'COUP D’ETAT OF 1299/1921', para: '2' }
        }
      ]
    },
    {
      name: 'Kāẓem Khan (Sayyāḥ)',
      role: 'participant',
      cites: [
        {
          source: 'iranica-shambayati-coup-detat-of-1921',
          loc: { section: 'COUP D’ETAT OF 1299/1921', para: '2' }
        }
      ]
    },
    {
      name: 'Herman Norman',
      role: 'diplomat',
      cites: [
        {
          source: 'iranica-shambayati-coup-detat-of-1921',
          loc: { section: 'COUP D’ETAT OF 1299/1921', para: '8' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:deposition-of-the-qajar-dynasty',
      rel: 'led-to',
      cites: [
        {
          source: 'iranica-shambayati-coup-detat-of-1921',
          loc: { section: 'COUP D’ETAT OF 1299/1921', para: '1' }
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
          text: 'COUP D’ETAT OF 1299/1921, the military coup that eventually led to the founding of the Pahlavi dynasty.',
          lang: 'en',
          cite: {
            source: 'iranica-shambayati-coup-detat-of-1921',
            loc: { section: 'COUP D’ETAT OF 1299/1921', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/coup-detat-of-1299-1921/'
          }
        },
        {
          id: 'q2',
          text: 'The coup was directed not at the Qajar monarchy as such but at the cabinet of Sepahdār-e Aʿẓam Fatḥ-Allāh-e Akbar and the oligarchy of land­owners and bureaucratic officials that controlled the regime.',
          lang: 'en',
          cite: {
            source: 'iranica-shambayati-coup-detat-of-1921',
            loc: { section: 'COUP D’ETAT OF 1299/1921', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/coup-detat-of-1299-1921/'
          }
        },
        {
          id: 'q3',
          text: 'The agreement was already dead when, in February 1921, Persian Cossacks Brigade officer Reza Khan, in collaboration with prominent journalist Sayyid Zia ad Din Tabatabai, marched into Tehran and seized power, inaugurating a new phase in Iran\'s modern history.',
          lang: 'en',
          cite: { source: 'loc-iran-country-study-1987', loc: { section: 'World War I', para: '2' } },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/iran/14.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q4',
          text: 'During the tumultuous years of the Constitutional Revolution (q.v.) and World War I provincial leaders and foreign powers had gained ascendancy in Persia, and the Qajar state had lacked the financial and mili­tary means to assert its sovereignty.',
          lang: 'en',
          cite: {
            source: 'iranica-shambayati-coup-detat-of-1921',
            loc: { section: 'COUP D’ETAT OF 1299/1921', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/coup-detat-of-1299-1921/'
          }
        },
        {
          id: 'q5',
          text: 'The action by Reżā Khan and his colleagues came at a moment of national crisis and a general belief that upon the withdrawal of British and Soviet forces local communist forces in Gīlān would march on Tehran and the shah’s government would collapse.',
          lang: 'en',
          cite: {
            source: 'iranica-sheikh-ol-islami-ahmad-shah',
            loc: { section: 'AḤMAD SHAH QĀJĀR', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/ahmad-shah-qajar-1909-1925-the-seventh-and-last-ruler-of-the-qajar-dynasty/'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q6',
          text: 'Martial law was imposed on Tehran: All gatherings were banned, the press was suspended, government departments were closed for reorganiza­tion, and bars, gambling clubs, and theaters were closed down',
          lang: 'en',
          cite: {
            source: 'iranica-shambayati-coup-detat-of-1921',
            loc: { section: 'COUP D’ETAT OF 1299/1921', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/coup-detat-of-1299-1921/'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q7',
          text: 'At any rate, his failure to create a strong constituency for himself and his policies allowed his opponents to gather their strength and bring about the downfall of his cabinet, only three months after its formation, leaving Reżā Khan in sole control of the government.',
          lang: 'en',
          cite: {
            source: 'iranica-shambayati-coup-detat-of-1921',
            loc: { section: 'COUP D’ETAT OF 1299/1921', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/coup-detat-of-1299-1921/'
          }
        },
        {
          id: 'q8',
          text: 'The successful coup, which took place on 3 Esfand 1299 Š./23 February 1921, was followed five days later by the denunciation by Sayyed Żīāʾ-al-dīn, then Prime Minister, of the Anglo-Persian agreement of 9 August 1919 (q.v,), an action which greatly incensed Lord Curzon, the Foreign Secretary.',
          lang: 'en',
          cite: {
            source: 'iranica-ferrier-anglo-iranian-relations-pahlavi',
            loc: { section: 'ANGLO-IRANIAN RELATIONS iii. Pahlavi period', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/anglo-iranian-relations-iii/'
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
            value: { d: '1921-02-18' },
            cites: [
              {
                source: 'iranica-shambayati-coup-detat-of-1921',
                loc: { section: 'COUP D’ETAT OF 1299/1921', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'Under these circumstances, on Friday, 29 Bahman 1299/18 February 1921, 2,200 men of the Cossack Brigade (q.v.) and 100 gendarmes began a march from Qazvīn to­ward Tehran under the command of Reżā Khan, ignoring repeated royal orders to return to their barracks',
        lang: 'en',
        cite: {
          source: 'iranica-shambayati-coup-detat-of-1921',
          loc: { section: 'COUP D’ETAT OF 1299/1921', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/coup-detat-of-1299-1921/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1921-02-21' },
            cites: [
              {
                source: 'iranica-shambayati-coup-detat-of-1921',
                loc: { section: 'COUP D’ETAT OF 1299/1921', para: '4' }
              }
            ]
          },
          {
            value: { d: '1921-02-22' },
            cites: [
              {
                source: 'iranica-ashraf-conspiracy-theories',
                loc: { section: 'CONSPIRACY THEORIES', para: '10' }
              }
            ]
          },
          {
            value: { d: '1921-02-23' },
            cites: [
              {
                source: 'iranica-ferrier-anglo-iranian-relations-pahlavi',
                loc: { section: 'ANGLO-IRANIAN RELATIONS iii. Pahlavi period', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'The capture of Tehran, which was secured on Monday (3 Esfand/21 February), was almost bloodless.',
        lang: 'en',
        cite: {
          source: 'iranica-shambayati-coup-detat-of-1921',
          loc: { section: 'COUP D’ETAT OF 1299/1921', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/coup-detat-of-1299-1921/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1921-04' },
            cites: [
              {
                source: 'iranica-shahnavaz-kazal-khan',
                loc: { section: 'ḴAZʿAL KHAN', para: '28' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'In April 1921, he became the minister of war, and in October, the prime minister, while keeping the army under his command all along.',
        lang: 'en',
        cite: { source: 'iranica-shahnavaz-kazal-khan', loc: { section: 'ḴAZʿAL KHAN', para: '28' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/kazal-khan/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1921-05' },
            cites: [
              {
                source: 'iranica-ferrier-anglo-iranian-relations-pahlavi',
                loc: { section: 'ANGLO-IRANIAN RELATIONS iii. Pahlavi period', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'Initially the omens were not thought to be auspicious because of Iranian resentment against British interests and activities and some pessimistic British assessments of the durability of the new Iranian régime, seemingly confirmed by the rapid ousting of Sayyed Żīāʾ-al-dīn in May, 1921.',
        lang: 'en',
        cite: {
          source: 'iranica-ferrier-anglo-iranian-relations-pahlavi',
          loc: { section: 'ANGLO-IRANIAN RELATIONS iii. Pahlavi period', para: '6' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/anglo-iranian-relations-iii/'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/%D8%A7%D8%B9%D9%84%D8%A7%D9%85%DB%8C%D9%87_%DB%B9_%D9%85%D8%A7%D8%AF%D9%87%E2%80%8C%D8%A7%DB%8C_%D8%AD%DA%A9%D9%85_%D9%85%DB%8C%DA%A9%D9%86%D9%85_%D8%B5%D8%A7%D8%AF%D8%B1%D9%87_%D8%A7%D8%B2_%D8%B3%D9%88%DB%8C_%D8%B1%D8%B6%D8%A7%D8%AE%D8%A7%D9%86_%D8%B1%D8%A6%DB%8C%D8%B3_%D8%AF%DB%8C%D9%88%DB%8C%D8%B2%DB%8C%D9%88%D9%86_%D9%82%D8%B2%D8%A7%D9%82.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:%D8%A7%D8%B9%D9%84%D8%A7%D9%85%DB%8C%D9%87_%DB%B9_%D9%85%D8%A7%D8%AF%D9%87%E2%80%8C%D8%A7%DB%8C_%D8%AD%DA%A9%D9%85_%D9%85%DB%8C%DA%A9%D9%86%D9%85_%D8%B5%D8%A7%D8%AF%D8%B1%D9%87_%D8%A7%D8%B2_%D8%B3%D9%88%DB%8C_%D8%B1%D8%B6%D8%A7%D8%AE%D8%A7%D9%86_%D8%B1%D8%A6%DB%8C%D8%B3_%D8%AF%DB%8C%D9%88%DB%8C%D8%B2%DB%8C%D9%88%D9%86_%D9%82%D8%B2%D8%A7%D9%82.jpg',
    credit: { institution: 'Institute for Iranian Contemporary Historical Studies' },
    license: { id: 'public-domain' }
  },
  archive: [
    {
      id: 'balfour-recent-happenings-in-persia-1922',
      mediaKind: 'document',
      title: 'Recent happenings in Persia',
      url: 'https://archive.org/download/recenthappenings00balfrich/recenthappenings00balfrich.pdf',
      page: 'https://archive.org/details/recenthappenings00balfrich',
      credit: {
        institution: 'University of California Libraries (Internet Archive)',
        creator: 'Balfour, James Moncreiff, b. 1878'
      },
      license: { id: 'public-domain' },
      bytes: 22300624,
      date: { d: '1922' }
    }
  ]
})
