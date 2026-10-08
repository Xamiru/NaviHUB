import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'assassination-of-naser-al-din-shah',
  names: [
    { text: 'Assassination of Naser al-Din Shah', lang: 'en', role: 'primary' },
    { text: 'ترور ناصرالدین شاه', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'assassination',
  start: {
    alts: [
      {
        value: { d: '1896-05-01' },
        cites: [
          {
            source: 'iranica-keddie-afgani-jamal-al-din',
            loc: { section: 'AFḠĀNĪ, JAMĀL-AL-DĪN', para: '17' }
          },
          {
            source: 'iranica-yarshater-iranian-history-islamic-period-5',
            loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Qajar period' }
          },
          { source: 'browne-1910-persian-revolution', loc: { page: '59' } }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 1,
  places: [
    {
      ref: 'place:shah-abdol-azim-shrine',
      cites: [
        { source: 'browne-1910-persian-revolution', loc: { page: '59' } }
      ]
    }
  ],
  partOf: [
    { ref: 'period:reign-of-naser-al-din-shah-qajar' },
    { ref: 'period:qajar-dynasty' }
  ],
  polities: [
    { ref: 'polity:qajar-iran' }
  ],
  participants: [
    {
      ref: 'person:mirza-reza-kermani',
      role: 'perpetrator',
      cites: [
        {
          source: 'iranica-keddie-afgani-jamal-al-din',
          loc: { section: 'AFḠĀNĪ, JAMĀL-AL-DĪN', para: '17' }
        },
        {
          source: 'iranica-yarshater-iranian-history-islamic-period-5',
          loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Qajar period' }
        }
      ]
    },
    {
      ref: 'person:naser-al-din-shah-qajar',
      role: 'victim',
      cites: [
        {
          source: 'iranica-yarshater-iranian-history-islamic-period-5',
          loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Qajar period' }
        }
      ]
    },
    {
      ref: 'person:jamal-al-din-afghani',
      role: 'ideologue',
      cites: [
        {
          source: 'iranica-keddie-afgani-jamal-al-din',
          loc: { section: 'AFḠĀNĪ, JAMĀL-AL-DĪN', para: '17' }
        }
      ]
    },
    {
      ref: 'person:mozaffar-al-din-shah',
      role: 'head-of-state',
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-2',
          loc: { section: 'Chronology of Iranian History Part 2, 1896' }
        }
      ]
    }
  ],
  related: [
    { ref: 'period:reign-of-mozaffar-al-din-shah', rel: 'followed-by' },
    { ref: 'event:expulsion-of-jamal-al-din-afghani', rel: 'related' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q3',
          text: '1896 Assassination of Nāṣer-al-Din Shah by Mirzā Reżā Kermāni, follower of Jamāl-al-Din Afḡāni, a leading Iranian cleric and one of the influential leaders of the late 19th century pan-Islamic movement.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1896' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-2/'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'The last years of Naser ad Din Shah\'s reign were characterized by growing royal and bureaucratic corruption, oppression of the rural population, and indifference on the shah\'s part.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE QAJARS, 1795-1925', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/iran/12.htm' }
        },
        {
          id: 'q2',
          text: 'The tax machinery broke down, and disorder became endemic in the provinces.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE QAJARS, 1795-1925', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/iran/12.htm' }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q5',
          text: '1896 Accession of Moẓaffar-al-Din Shah.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1896' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-2/'
          }
        },
        {
          id: 'q6',
          text: 'When Nāṣer-al-Din Shah was assassinated in 1896, the Cossack Brigade commanded by Colonel Kosogovskiĭ maintained order and secured Moẓaffar-al-Din’s succession (Kosogovskiĭ, pp. 458-63).',
          lang: 'en',
          cite: {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '41'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
          }
        },
        {
          id: 'q7',
          text: 'Since the British were also interested in preventing the chaos that usually accompanied succession of a new shah in Iran, they supported their rivals’ efforts for a peaceful transition of power.',
          lang: 'en',
          cite: {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '41'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
          }
        },
        {
          id: 'q8',
          text: 'However, the three progressives at Trabzon, who had been in jail there since before the assassination was planned and had no connection with it, were returned to Iran and killed by crown prince Moḥammad ʿAlī Mīrzā in Tabrīz.',
          lang: 'en',
          cite: {
            source: 'iranica-keddie-afgani-jamal-al-din',
            loc: { section: 'AFḠĀNĪ, JAMĀL-AL-DĪN', para: '17' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/afgani-jamal-al-din'
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
            value: { d: '1896-05-01' },
            cites: [
              {
                source: 'iranica-keddie-afgani-jamal-al-din',
                loc: { section: 'AFḠĀNĪ, JAMĀL-AL-DĪN', para: '17' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q4',
        text: 'Mīrzā Reżā returned and on 1 May 1896, as Nāṣer-al-dīn Shah was preparing for the 50th lunar anniversary of his accession, Mīrzā Reżā pretended to offer a petition but instead shot the shah dead.',
        lang: 'en',
        cite: {
          source: 'iranica-keddie-afgani-jamal-al-din',
          loc: { section: 'AFḠĀNĪ, JAMĀL-AL-DĪN', para: '17' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/afgani-jamal-al-din'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1896-07' },
            cites: [
              {
                source: 'iranica-gustafson-kerman-qajar',
                loc: { section: 'KERMAN ix. History in the Qajar Period', para: '18' }
              },
              {
                source: 'iranica-bayat-aqa-khan-kermani',
                loc: { section: 'ĀQĀ KHAN KERMĀNĪ, MĪRZĀ ʿABD-AL-ḤOSAYN', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'He was extradited to Iran and executed in Tabriz in July 1896 after being implicated in planning the assassination of Nāṣer-al-Din Shah, carried out by fellow radical Mirzā Reżā Kermāni (Nāẓem-al-Eslām, I, p. 15).',
        lang: 'en',
        cite: {
          source: 'iranica-gustafson-kerman-qajar',
          loc: { section: 'KERMAN ix. History in the Qajar Period', para: '18' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/kerman-09-qajar-period'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/60/Antoin_Sevruguin_51_8_SI.jpg/1280px-Antoin_Sevruguin_51_8_SI.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Antoin_Sevruguin_51_8_SI.jpg',
    credit: {
      institution: 'Freer Gallery of Art and Arthur M. Sackler Gallery Archives, Smithsonian Institution',
      creator: 'Antoin Sevruguin'
    },
    license: { id: 'public-domain' }
  },
  archive: [
    {
      id: 'browne-persian-revolution-1910',
      mediaKind: 'document',
      title: 'The Persian revolution of 1905-1909',
      date: { d: '1910' },
      url: 'https://archive.org/download/persianrevolutio00browuoft/persianrevolutio00browuoft.pdf',
      page: 'https://archive.org/details/persianrevolutio00browuoft',
      credit: {
        institution: 'Robarts - University of Toronto (Internet Archive)',
        creator: 'Browne, Edward Granville, 1862-1926'
      },
      license: { id: 'public-domain' },
      bytes: 48843454
    }
  ],
  furtherReading: [
    { source: 'nateq-1984-karnameh-va-zamaneh-ye-mirza-reza-kermani', perspective: 'iranian' },
    { source: 'nazem-al-eslam-1983-tarikh-e-bidari-ye-iranian', perspective: 'iranian' }
  ]
})
