import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'kashf-e-hijab',
  names: [
    { text: 'Kashf-e hijab', lang: 'en', role: 'primary' },
    { text: 'کشف حجاب', lang: 'fa', role: 'native', translit: 'kašf-e ḥejāb' },
    {
      text: 'Mandatory Unveiling Act of 1936',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-milani-gender-relations',
          loc: { section: 'GENDER RELATIONS i. In modern Persia', para: '9' }
        }
      ]
    }
  ],
  researched: '2026-10-07',
  type: 'reform',
  start: {
    alts: [
      {
        value: { d: '1936-01-08' },
        cites: [
          {
            source: 'iranica-saidi-sirjani-clothing-pahlavi',
            loc: { section: 'CLOTHING xi. In the Pahlavi and post-Pahlavi periods', para: '8' }
          },
          {
            source: 'khamenei-ir-2019-01-06-hijab-ban-atrocities',
            loc: { section: '6 major atrocities', para: '2' }
          }
        ]
      },
      {
        value: { d: '1936-01-07' },
        cites: [
          {
            source: 'iranica-sedghi-feminist-movements-pahlavi',
            loc: { section: 'FEMINIST MOVEMENTS iii. IN THE PAHLAVI PERIOD', para: '8' }
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
          source: 'iranica-saidi-sirjani-clothing-pahlavi',
          loc: { section: 'CLOTHING xi. In the Pahlavi and post-Pahlavi periods', para: '8' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:reign-of-reza-shah' }
  ],
  participants: [
    {
      ref: 'person:reza-shah-pahlavi',
      role: 'leader',
      cites: [
        {
          source: 'iranica-saidi-sirjani-clothing-pahlavi',
          loc: { section: 'CLOTHING xi. In the Pahlavi and post-Pahlavi periods', para: '8' }
        },
        {
          source: 'iranica-sedghi-feminist-movements-pahlavi',
          loc: { section: 'FEMINIST MOVEMENTS iii. IN THE PAHLAVI PERIOD', para: '8' }
        }
      ]
    },
    {
      name: 'ʿAlī-Aṣḡar Ḥekmat',
      role: 'organizer',
      cites: [
        {
          source: 'iranica-sedghi-feminist-movements-pahlavi',
          loc: { section: 'FEMINIST MOVEMENTS iii. IN THE PAHLAVI PERIOD', para: '8' }
        }
      ]
    },
    {
      name: 'Ḥājar Tarbīat',
      role: 'organizer',
      cites: [
        {
          source: 'iranica-sedghi-feminist-movements-pahlavi',
          loc: { section: 'FEMINIST MOVEMENTS iii. IN THE PAHLAVI PERIOD', para: '8' }
        }
      ]
    },
    {
      name: 'ʿAbd-al-Karim Ḥāʾeri Yazdi',
      role: 'participant',
      cites: [
        {
          source: 'iranica-algar-haeri',
          loc: { section: 'ḤĀʾERI, ʿABD-AL-KARIM YAZDI', para: '8' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:uniform-dress-law-of-1928', rel: 'related' }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'Reżā Shah visits Turkey and is impressed by Kemal Ataturk’s reforms, strengthening his resolve to accelerate the course of modernization in Iran, including the unveiling of women.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-3',
            loc: { section: 'Chronology of Iranian History Part 3, 1934' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-3/'
          }
        },
        {
          id: 'q3',
          text: 'Before the Gowharšād incident Reżā Shah had not personally stressed the necessity for change in women’s dress.',
          lang: 'en',
          cite: {
            source: 'iranica-saidi-sirjani-clothing-pahlavi',
            loc: { section: 'CLOTHING xi. In the Pahlavi and post-Pahlavi periods', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/clothing-xi/'
          }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q2',
          text: 'Reẓā Shah formulated his policy of banning the veil (čādor, q.v.) after his state visit to Turkey in the Summer of 1934.',
          lang: 'en',
          cite: {
            source: 'iranica-sedghi-feminist-movements-pahlavi',
            loc: { section: 'FEMINIST MOVEMENTS iii. IN THE PAHLAVI PERIOD', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/feminist-movements-iii/'
          }
        },
        {
          id: 'q4',
          text: 'Eventually, in 1314 Š./1936, Reżā Shah did abolish the veil, the first ruler in the region to do so (Atatürk had not banned the veil; see Keddie, pp. 108-09).',
          lang: 'en',
          cite: {
            source: 'iranica-saidi-sirjani-clothing-pahlavi',
            loc: { section: 'CLOTHING xi. In the Pahlavi and post-Pahlavi periods', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/clothing-xi/'
          }
        },
        {
          id: 'q5',
          text: 'Once confident of his power after the crushing of Shaikh Bohlūl’s rebellion, the shah appeared with his wife and daughters unveiled at a graduation ceremony at the government normal school (Dāneš-sarā-ye moqaddamātī) on 17 Day 1314 Š./8 January 1936.',
          lang: 'en',
          cite: {
            source: 'iranica-saidi-sirjani-clothing-pahlavi',
            loc: { section: 'CLOTHING xi. In the Pahlavi and post-Pahlavi periods', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/clothing-xi/'
          }
        },
        {
          id: 'q6',
          text: 'Women are banned from wearing of the traditional veil (čador).',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-3',
            loc: { section: 'Chronology of Iranian History Part 3, 1936' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-3/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q7',
          text: 'The opposition from clerical and conservative forces was suppressed and unveiling became official policy enforced through coercive measures.',
          lang: 'en',
          cite: {
            source: 'iranica-sedghi-feminist-movements-pahlavi',
            loc: { section: 'FEMINIST MOVEMENTS iii. IN THE PAHLAVI PERIOD', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/feminist-movements-iii/'
          }
        },
        {
          id: 'q8',
          text: 'Whereas the masses remained attached to the veil, the educated elite and many middle-class women welcomed unveiling',
          lang: 'en',
          cite: {
            source: 'iranica-sedghi-feminist-movements-pahlavi',
            loc: { section: 'FEMINIST MOVEMENTS iii. IN THE PAHLAVI PERIOD', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/feminist-movements-iii/'
          }
        },
        {
          id: 'q9',
          text: 'After Reżā Shah’s abdication in 1941, women’s rights and, more specifically, women’s appearance and clothing became a major source of controversy between the conservative and modernist forces.',
          lang: 'en',
          cite: {
            source: 'iranica-sedghi-feminist-movements-pahlavi',
            loc: { section: 'FEMINIST MOVEMENTS iii. IN THE PAHLAVI PERIOD', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/feminist-movements-iii/'
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
            value: { d: '1935-10-14' },
            cites: [
              {
                source: 'iranica-sedghi-feminist-movements-pahlavi',
                loc: { section: 'FEMINIST MOVEMENTS iii. IN THE PAHLAVI PERIOD', para: '8' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'A year later, ʿAlī-Aṣḡar Ḥekmat, the minister of education (wazīr-e maʿāref), called on his own initiative a number of leading women educators, veterans of the women’s movement from the 1920s and 1930s, to form the Ladies’ Center on 14 October 1935.',
        lang: 'en',
        cite: {
          source: 'iranica-sedghi-feminist-movements-pahlavi',
          loc: { section: 'FEMINIST MOVEMENTS iii. IN THE PAHLAVI PERIOD', para: '8' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/feminist-movements-iii/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1936-01-08' },
            cites: [
              {
                source: 'iranica-saidi-sirjani-clothing-pahlavi',
                loc: { section: 'CLOTHING xi. In the Pahlavi and post-Pahlavi periods', para: '8' }
              }
            ]
          },
          {
            value: { d: '1936-01-07' },
            cites: [
              {
                source: 'iranica-sedghi-feminist-movements-pahlavi',
                loc: { section: 'FEMINIST MOVEMENTS iii. IN THE PAHLAVI PERIOD', para: '8' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'he ordered all women to dress thenceforth in the European manner',
        lang: 'en',
        cite: {
          source: 'iranica-saidi-sirjani-clothing-pahlavi',
          loc: { section: 'CLOTHING xi. In the Pahlavi and post-Pahlavi periods', para: '8' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/clothing-xi/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1936' },
            cites: [
              {
                source: 'iranica-yarshater-chronology-part-3',
                loc: { section: 'Chronology of Iranian History Part 3, 1936' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'Reżā Shah’s queen and his daughters appear unveiled in a public ceremony at the new Teacher’s Training School in Tehran.',
        lang: 'en',
        cite: {
          source: 'iranica-yarshater-chronology-part-3',
          loc: { section: 'Chronology of Iranian History Part 3, 1936' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-3/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1937' },
            cites: [
              {
                source: 'iranica-sedghi-feminist-movements-pahlavi',
                loc: { section: 'FEMINIST MOVEMENTS iii. IN THE PAHLAVI PERIOD', para: '8' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'Soon after the enforcement of unveiling the Center was transformed in 1937 from a women’s association to an adult and young women’s educational and welfare center with Dawlatābādī as its director',
        lang: 'en',
        cite: {
          source: 'iranica-sedghi-feminist-movements-pahlavi',
          loc: { section: 'FEMINIST MOVEMENTS iii. IN THE PAHLAVI PERIOD', para: '8' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/feminist-movements-iii/'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8f/%D8%AD%D8%B6%D9%88%D8%B1_%D8%AE%D8%A7%D9%86%D9%88%D8%A7%D8%AF%D9%87_%D8%B3%D9%84%D8%B7%D9%86%D8%AA%DB%8C_%D8%AF%D8%B1_%D8%AF%D8%A7%D9%86%D8%B4%D8%B3%D8%B1%D8%A7%DB%8C_%D9%85%D9%82%D8%AF%D9%85%D8%A7%D8%AA%DB%8C_%D8%AA%D9%87%D8%B1%D8%A7%D9%86%D8%8C_%DB%B1%DB%B7_%D8%AF%DB%8C_%DB%B1%DB%B3%DB%B1%DB%B4.jpg/1280px-%D8%AD%D8%B6%D9%88%D8%B1_%D8%AE%D8%A7%D9%86%D9%88%D8%A7%D8%AF%D9%87_%D8%B3%D9%84%D8%B7%D9%86%D8%AA%DB%8C_%D8%AF%D8%B1_%D8%AF%D8%A7%D9%86%D8%B4%D8%B3%D8%B1%D8%A7%DB%8C_%D9%85%D9%82%D8%AF%D9%85%D8%A7%D8%AA%DB%8C_%D8%AA%D9%87%D8%B1%D8%A7%D9%86%D8%8C_%DB%B1%DB%B7_%D8%AF%DB%8C_%DB%B1%DB%B3%DB%B1%DB%B4.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:%D8%AD%D8%B6%D9%88%D8%B1_%D8%AE%D8%A7%D9%86%D9%88%D8%A7%D8%AF%D9%87_%D8%B3%D9%84%D8%B7%D9%86%D8%AA%DB%8C_%D8%AF%D8%B1_%D8%AF%D8%A7%D9%86%D8%B4%D8%B3%D8%B1%D8%A7%DB%8C_%D9%85%D9%82%D8%AF%D9%85%D8%A7%D8%AA%DB%8C_%D8%AA%D9%87%D8%B1%D8%A7%D9%86%D8%8C_%DB%B1%DB%B7_%D8%AF%DB%8C_%DB%B1%DB%B3%DB%B1%DB%B4.jpg',
    credit: { institution: 'Ettelaat' },
    license: { id: 'public-domain' }
  }
})
