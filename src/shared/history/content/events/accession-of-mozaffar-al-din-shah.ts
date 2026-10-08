import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'accession-of-mozaffar-al-din-shah',
  names: [
    { text: 'Accession of Moẓaffar-al-Din Shah', lang: 'en', role: 'primary' },
    { text: 'به تخت نشستن مظفرالدین شاه', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'other',
  start: {
    alts: [
      {
        value: { d: '1896-05', notAfter: '1896-06' },
        cites: [
          {
            source: 'iranica-calmard-ayn-al-dawla',
            loc: { section: 'ʿAYN-AL-DAWLA, ʿABD-AL-MAJĪD', para: '4' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1896-06-08' },
        cites: [
          {
            source: 'browne-1910-persian-revolution',
            loc: { section: 'The Persian Revolution of 1905–1909', page: '98' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 2,
  places: [
    { ref: 'place:tehran' }
  ],
  related: [
    {
      ref: 'event:assassination-of-naser-al-din-shah',
      rel: 'caused-by',
      cites: [
        {
          source: 'iranica-gustafson-afzal-al-molk-kermani',
          loc: { section: 'AFŻAL-AL-MOLK KERMĀNI, ḠOLĀM-ḤOSAYN', para: '5' }
        }
      ]
    }
  ],
  polities: [
    { ref: 'polity:qajar-iran' }
  ],
  participants: [
    {
      ref: 'person:mozaffar-al-din-shah',
      role: 'head-of-state',
      cites: [
        {
          source: 'iranica-calmard-ayn-al-dawla',
          loc: { section: 'ʿAYN-AL-DAWLA, ʿABD-AL-MAJĪD', para: '4' }
        },
        {
          source: 'iranica-yarshater-iranian-history-islamic-period-5',
          loc: {
            section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, The Qajar dynasty (1779-1924)'
          }
        }
      ]
    },
    {
      ref: 'person:amin-al-soltan',
      role: 'head-of-government',
      cites: [
        {
          source: 'iranica-calmard-ayn-al-dawla',
          loc: { section: 'ʿAYN-AL-DAWLA, ʿABD-AL-MAJĪD', para: '4' }
        }
      ]
    },
    {
      name: 'ʿAyn-al-Dawla',
      role: 'participant',
      cites: [
        {
          source: 'iranica-calmard-ayn-al-dawla',
          loc: { section: 'ʿAYN-AL-DAWLA, ʿABD-AL-MAJĪD', para: '4' }
        }
      ]
    },
    {
      name: 'Nāṣer-al-Molk',
      role: 'diplomat',
      cites: [
        {
          source: 'iranica-bakhash-naser-al-molk',
          loc: { section: 'NĀṢER-AL-MOLK, ABU’L-QĀSEM', para: '6' }
        }
      ]
    },
    {
      name: 'Afżal-al-Molk Kermāni',
      role: 'participant',
      cites: [
        {
          source: 'iranica-gustafson-afzal-al-molk-kermani',
          loc: { section: 'AFŻAL-AL-MOLK KERMĀNI, ḠOLĀM-ḤOSAYN', para: '5' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ee/Portrait_of_Mozaffar_ad-Din_Shah_Qajar_by_Abdullah_Mirza_Qajar.JPG/1280px-Portrait_of_Mozaffar_ad-Din_Shah_Qajar_by_Abdullah_Mirza_Qajar.JPG',
    page: 'https://commons.wikimedia.org/wiki/File:Portrait_of_Mozaffar_ad-Din_Shah_Qajar_by_Abdullah_Mirza_Qajar.JPG',
    credit: {
      institution: 'Institute for Iranian Contemporary Historical Studies',
      creator: 'Abdullah Mirza Qajar'
    },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The next Qajar king, Moẓaffar-al-Din Shah (r. 1896-1907) was a weak, pleasure-loving, simple-minded, and considerate king.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-iranian-history-islamic-period-5',
            loc: {
              section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, The Qajar dynasty (1779-1924)'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/iran-ii2-islamic-period-page-5/'
          }
        },
        {
          id: 'q2',
          text: 'Royal extravagance and the absence of incoming revenues exacerbated financial problems.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'The Constitutional Revolution', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iran/13.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Nāṣer-al-Din Shah (r. 1848-96) was assassinated in 1896.',
          lang: 'en',
          cite: {
            source: 'iranica-gustafson-afzal-al-molk-kermani',
            loc: { section: 'AFŻAL-AL-MOLK KERMĀNI, ḠOLĀM-ḤOSAYN', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/afzal-al-molk-kermani-gholam-hosayn/'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'Moẓaffar-al-Din Shah issued a royal command (farmān) appointing Afżal-al-Molk his official registrar of events and court historian.',
          lang: 'en',
          cite: {
            source: 'iranica-gustafson-afzal-al-molk-kermani',
            loc: { section: 'AFŻAL-AL-MOLK KERMĀNI, ḠOLĀM-ḤOSAYN', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/afzal-al-molk-kermani-gholam-hosayn/'
          }
        },
        {
          id: 'q5',
          text: 'Afżal-al-Molk penned the official account of the coronation and early history of Moẓaffar-al-Din’s ascension to power',
          lang: 'en',
          cite: {
            source: 'iranica-gustafson-afzal-al-molk-kermani',
            loc: { section: 'AFŻAL-AL-MOLK KERMĀNI, ḠOLĀM-ḤOSAYN', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/afzal-al-molk-kermani-gholam-hosayn/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'The shah quickly spent two large loans from Russia, partly on trips to Europe.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'The Constitutional Revolution', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iran/13.htm' }
        },
        {
          id: 'q7',
          text: 'Public anger fed on the shah\'s propensity for granting concessions to Europeans in return for generous payments to him and his officials.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'The Constitutional Revolution', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iran/13.htm' }
        },
        {
          id: 'q8',
          text: 'It was during his reign that liberal and clerical elements joined forces to oppose the despotic and harsh prime minister ʿAyn al-Dawla (q.v.) and demanded a constitutional charter.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-iranian-history-islamic-period-5',
            loc: {
              section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, The Qajar dynasty (1779-1924)'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/iran-ii2-islamic-period-page-5/'
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
            value: { d: '1896-06-08' },
            cites: [
              {
                source: 'browne-1910-persian-revolution',
                loc: { section: 'The Persian Revolution of 1905–1909', page: '98' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: '(Crowned June 8, 1896 ; died January 4, 1907.)',
        lang: 'en',
        cite: {
          source: 'browne-1910-persian-revolution',
          loc: { section: 'The Persian Revolution of 1905–1909', page: '98' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://archive.org/download/persianrevolutio00browuoft/persianrevolutio00browuoft_djvu.txt'
        }
      }
    }
  ],
  furtherReading: [
    { source: 'nazem-al-eslam-1983-tarikh-e-bidari-ye-iranian', perspective: 'iranian' }
  ]
})
