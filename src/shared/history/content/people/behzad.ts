import { definePerson } from '../../schema'

export default definePerson({
  id: 'behzad',
  names: [
    { text: 'Behzad', lang: 'en', role: 'primary' },
    { text: 'کمال‌الدین بهزاد', lang: 'fa', role: 'native', translit: 'Kamāl-al-Dīn Behzād' },
    {
      text: 'Kamāl-al-Dīn Behzād',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-soucek-behzad-kamal-al-din',
          loc: { section: 'BEHZĀD, KAMĀL-AL-DĪN', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-16',
  died: {
    alts: [
      {
        value: { d: '1535', notAfter: '1536' },
        cites: [
          {
            source: 'iranica-soucek-behzad-kamal-al-din',
            loc: { section: 'BEHZĀD, KAMĀL-AL-DĪN', para: '6' }
          }
        ]
      }
    ]
  },
  diedIn: {
    ref: 'place:tabriz',
    cites: [
      {
        source: 'iranica-soucek-behzad-kamal-al-din',
        loc: { section: 'BEHZĀD, KAMĀL-AL-DĪN', para: '6' }
      }
    ]
  },
  regions: ['iran'],
  roles: ['artist'],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Behzād’s name has become synonymous with the high level of artistic skill displayed by the painters of this period, although the precise nature of his personal contribution is a matter of conjecture.',
          lang: 'en',
          cite: {
            source: 'iranica-soucek-behzad-kamal-al-din',
            loc: { section: 'BEHZĀD, KAMĀL-AL-DĪN', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/behzad-kamal-al-din'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'The Herat authors stress that Behzād was employed first by Mīr ʿAlī-Šīr Navāʾī and then by Sultan Ḥosayn Bāyqarā.',
          lang: 'en',
          cite: {
            source: 'iranica-soucek-behzad-kamal-al-din',
            loc: { section: 'BEHZĀD, KAMĀL-AL-DĪN', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/behzad-kamal-al-din'
          }
        },
        {
          id: 'q3',
          text: 'Amir Ruḥ-Allāh, known as Mirak Naqqāš, the prince’s librarian, can be given credit for being the first to recognize the extraordinary talents of the master painter and illustrator, Behzād, and for training him.',
          lang: 'en',
          cite: {
            source: 'iranica-roemer-hosayn-bayqara',
            loc: { section: 'ḤOSAYN BĀYQARĀ', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/hosayn-bayqara'
          }
        },
        {
          id: 'q4',
          text: 'Statements by Mīrzā Ḥaydar Dūḡlāt and Bābor also demonstrate that during the 9th/15th century at Herat Behzād was regarded as only one of several skilled painters active in the circles of ʿAlī-Šīr and Sultan Ḥosayn.',
          lang: 'en',
          cite: {
            source: 'iranica-soucek-behzad-kamal-al-din',
            loc: { section: 'BEHZĀD, KAMĀL-AL-DĪN', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/behzad-kamal-al-din'
          }
        }
      ]
    },
    {
      kind: 'works',
      quotes: [
        {
          id: 'q5',
          text: 'Behzād’s illustrations for a Būstān of Saʿdī made for the library of Sultan Ḥosayn Bāyqarā, with a text colophon of 893/1488, provide an indication of the nature of his accomplishments.',
          lang: 'en',
          cite: {
            source: 'iranica-soucek-behzad-kamal-al-din',
            loc: { section: 'BEHZĀD, KAMĀL-AL-DĪN', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/behzad-kamal-al-din'
          }
        },
        {
          id: 'q6',
          text: 'Foremost are the illustrations in a Būstān manuscript of Saʿdī preserved in the National Library of Egypt in Cairo.',
          lang: 'en',
          cite: {
            source: 'iranica-soucek-behzad-kamal-al-din',
            loc: { section: 'BEHZĀD, KAMĀL-AL-DĪN', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/behzad-kamal-al-din'
          }
        }
      ]
    },
    {
      kind: 'later-life',
      quotes: [
        {
          id: 'q7',
          text: 'Bābor links him with the patronage of Moḥammad Šaybānī (Šaybak) Khan, the ruler of Herat between 1507 and 1510.',
          lang: 'en',
          cite: {
            source: 'iranica-soucek-behzad-kamal-al-din',
            loc: { section: 'BEHZĀD, KAMĀL-AL-DĪN', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/behzad-kamal-al-din'
          }
        },
        {
          id: 'q8',
          text: 'Behzād probably spent the last years of his life in Tabrīz, where he was employed at the Safavid court.',
          lang: 'en',
          cite: {
            source: 'iranica-soucek-behzad-kamal-al-din',
            loc: { section: 'BEHZĀD, KAMĀL-AL-DĪN', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/behzad-kamal-al-din'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q9',
          text: 'Dūst-Moḥammad adds that Behzād died in Ṭahmāsb’s service and was buried in Tabrīz alongside Shaikh Kamāl Ḵojandī.',
          lang: 'en',
          cite: {
            source: 'iranica-soucek-behzad-kamal-al-din',
            loc: { section: 'BEHZĀD, KAMĀL-AL-DĪN', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/behzad-kamal-al-din'
          }
        },
        {
          id: 'q10',
          text: 'A chronogram gives the date of Behzād’s death as 935/1535-36.',
          lang: 'en',
          cite: {
            source: 'iranica-soucek-behzad-kamal-al-din',
            loc: { section: 'BEHZĀD, KAMĀL-AL-DĪN', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/behzad-kamal-al-din'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q11',
          text: 'The evaluation of Behzād as an artist of superlative achievement first appears during the Safavid period.',
          lang: 'en',
          cite: {
            source: 'iranica-soucek-behzad-kamal-al-din',
            loc: { section: 'BEHZĀD, KAMĀL-AL-DĪN', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/behzad-kamal-al-din'
          }
        }
      ]
    }
  ]
})
