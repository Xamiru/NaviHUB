import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'naser-al-din-shahs-first-european-journey',
  names: [
    { text: 'Naser al-Din Shah’s first European journey', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  type: 'other',
  start: {
    alts: [
      {
        value: { d: '1873' },
        cites: [
          {
            source: 'iranica-cronin-army-qajar',
            loc: { section: 'ARMY v. Qajar Period, (4) Mirzā Ḥosayn Khan', para: '2' }
          },
          {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '32'
            }
          },
          {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '24'
            }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:berlin',
      cites: [
        {
          source: 'iranica-bast-germany-diplomatic-relations',
          loc: { section: 'GERMANY i. German-Persian diplomatic relations', para: '10' }
        }
      ]
    },
    {
      ref: 'place:london',
      cites: [
        {
          source: 'iranica-amanat-great-britain-ii',
          loc: {
            section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
            para: '24'
          }
        }
      ]
    },
    { ref: 'place:saint-petersburg' }
  ],
  partOf: [
    { ref: 'period:reign-of-naser-al-din-shah-qajar' },
    { ref: 'period:qajar-dynasty' }
  ],
  participants: [
    {
      ref: 'person:naser-al-din-shah-qajar',
      role: 'head-of-state',
      cites: [
        {
          source: 'iranica-cronin-army-qajar',
          loc: { section: 'ARMY v. Qajar Period, (4) Mirzā Ḥosayn Khan', para: '2' }
        }
      ]
    },
    {
      name: 'Sir Moses Montefiore',
      role: 'participant',
      cites: [
        {
          source: 'iranica-amanat-great-britain-ii',
          loc: {
            section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
            para: '24'
          }
        }
      ]
    },
    {
      name: 'Baron Lionel de Rothschild',
      role: 'participant',
      cites: [
        {
          source: 'iranica-amanat-great-britain-ii',
          loc: {
            section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
            para: '24'
          }
        }
      ]
    },
    {
      name: 'Sir Albert Sassoon',
      role: 'participant',
      cites: [
        {
          source: 'iranica-amanat-great-britain-ii',
          loc: {
            section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
            para: '24'
          }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:founding-of-the-persian-cossack-brigade', rel: 'related' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'He granted a concession for railroad construction and other economic projects to a Briton, Baron Julius de Reuter, and visited Russia and Britain himself.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE QAJARS, 1795-1925', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/iran/12.htm' }
        },
        {
          id: 'q2',
          text: 'Apparently the shah had been deeply impressed, during his first trip to Europe in 1873, by the military spectacles performed before him and during that trip he made a request to the German government for the loan of officers.',
          lang: 'en',
          cite: {
            source: 'iranica-cronin-army-qajar',
            loc: { section: 'ARMY v. Qajar Period, (4) Mirzā Ḥosayn Khan', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/army-v/'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'In 1873, Nāṣer-al-Din Shah visited Russia and suggested that Russia and Iran join efforts to “pacify” Turcoman tribes. He offered his assistance again in the next year, according to the Russian minister in Tehran, A. F. Berger, but the Russian government rejected his offer.',
          lang: 'en',
          cite: {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '32'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
          }
        },
        {
          id: 'q4',
          text: 'During the 1873 and 1889 royal tours of England, with the help of the British government, influential Jewish figures such as Sir Moses Montefiore, Baron Lionel de Rothschild, and Sir Albert Sassoon urged Nāṣer-al-Din Shah to improve the condition of the Persian Jewry.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '24'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/great-britain-ii/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'The establishment of diplomatic relations between the newly founded German Empire and Persia is due to the German-Persian treaty of friendship, navigation, and commerce signed in May 1873.',
          lang: 'en',
          cite: {
            source: 'iranica-bast-germany-diplomatic-relations',
            loc: { section: 'GERMANY i. German-Persian diplomatic relations', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/germany-i'
          }
        },
        {
          id: 'q6',
          text: 'The most important item on foreign policy in the 1873 treaty was Article XVIII, which declared amongst other things that if “Persia becomes involved in a dispute with another power, the German Government declares itself ready to use, at the request of the Shah’s Government, its good offices to aid in adjusting the dispute” (Martin, p. 22).',
          lang: 'en',
          cite: {
            source: 'iranica-bast-germany-diplomatic-relations',
            loc: { section: 'GERMANY i. German-Persian diplomatic relations', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/germany-i'
          }
        },
        {
          id: 'q7',
          text: 'These concerted efforts, to which the shah responded positively, no doubt helped curtailing the recurrence of severe persecutions and eventually led to the lifting of the hated religious tax (jeziya) in 1882 for Zoroastrians but only partially for others.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '24'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/great-britain-ii/'
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
            value: { d: '1873-05-31', notAfter: '1873-06-08' },
            cites: [
              {
                source: 'iranica-bast-germany-diplomatic-relations',
                loc: { section: 'GERMANY i. German-Persian diplomatic relations', para: '10' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'It was ratified on the occasion of Nāṣer-al-Dīn Shah’s state visit to Berlin (31 May-8 June 1873).',
        lang: 'en',
        cite: {
          source: 'iranica-bast-germany-diplomatic-relations',
          loc: { section: 'GERMANY i. German-Persian diplomatic relations', para: '10' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/germany-i'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/23/In_Memory_of_the_Visit_of_the_Shah_of_Persia_to_the_City_of_London%2C_June_20%2C_1873_MET_DP-180-058.jpg/1280px-In_Memory_of_the_Visit_of_the_Shah_of_Persia_to_the_City_of_London%2C_June_20%2C_1873_MET_DP-180-058.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:In_Memory_of_the_Visit_of_the_Shah_of_Persia_to_the_City_of_London,_June_20,_1873_MET_DP-180-058.jpg',
    credit: { institution: 'The Metropolitan Museum of Art', creator: 'Alfred Wyon' },
    license: { id: 'cc0' }
  },
  archive: [
    {
      id: 'shah-diary-1874',
      mediaKind: 'document',
      title: 'The diary of H.M. the Shah of Persia, during his tour through Europe in A.D. 1873. By J.W. Redhouse. A verbatim translation',
      date: { d: '1874' },
      url: 'https://archive.org/download/diaryofhmshahofp00nasiuoft/diaryofhmshahofp00nasiuoft.pdf',
      page: 'https://archive.org/details/diaryofhmshahofp00nasiuoft',
      credit: {
        institution: 'Robarts - University of Toronto (Internet Archive)',
        creator: 'Nasir al-Din Shah, Shah of Iran, 1831-1896; James W. Redhouse'
      },
      license: { id: 'public-domain' },
      bytes: 26480236
    }
  ]
})
