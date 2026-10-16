import { definePerson } from '../../schema'

export default definePerson({
  id: 'ali-shir-navai',
  names: [
    { text: 'Ali-Shir Navai', lang: 'en', role: 'primary' },
    { text: 'علیشیر نوایی', lang: 'fa', role: 'native', translit: 'ʿAlī-Šīr Navāʾī' },
    {
      text: 'Mir ʿAli-Šir Navāʾi',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-roemer-hosayn-bayqara',
          loc: { section: 'ḤOSAYN BĀYQARĀ', para: '11' }
        }
      ]
    },
    {
      text: 'Fāni',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-roemer-hosayn-bayqara',
          loc: { section: 'ḤOSAYN BĀYQARĀ', para: '11' }
        }
      ]
    }
  ],
  researched: '2026-10-16',
  born: {
    alts: [
      {
        value: { d: '1441' },
        cites: [
          {
            source: 'iranica-roemer-hosayn-bayqara',
            loc: { section: 'ḤOSAYN BĀYQARĀ', para: '11' }
          },
          {
            source: 'iranica-chaghatay-language-and-literature',
            loc: { section: 'CHAGHATAY DYNASTY ii. Language and Literature', para: '7' }
          },
          {
            source: 'loc-name-authority-alisher-navoi',
            loc: { section: 'Alisher Navoiĭ, 1441-1501' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1501' },
        cites: [
          {
            source: 'iranica-roemer-hosayn-bayqara',
            loc: { section: 'ḤOSAYN BĀYQARĀ', para: '11' }
          },
          {
            source: 'iranica-chaghatay-language-and-literature',
            loc: { section: 'CHAGHATAY DYNASTY ii. Language and Literature', para: '7' }
          },
          {
            source: 'loc-name-authority-alisher-navoi',
            loc: { section: 'Alisher Navoiĭ, 1441-1501' }
          }
        ]
      }
    ]
  },
  regions: ['russia-central-asia', 'iran'],
  roles: ['writer', 'politician'],
  offices: [
    {
      title: 'Vizier of Sultan Ḥosayn Bāyqarā',
      polity: 'polity:timurid-empire',
      cites: [
        {
          source: 'iranica-losensky-jami-i-life-and-works',
          loc: { section: 'JĀMI i. Life and Works', para: '6' }
        },
        {
          source: 'iranica-courts-and-courtiers-v',
          loc: {
            section: 'COURTS AND COURTIERS v. Under the Timurid and Turkman dynasties',
            para: '14'
          }
        },
        {
          source: 'iranica-chaghatay-language-and-literature',
          loc: { section: 'CHAGHATAY DYNASTY ii. Language and Literature', para: '7' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/b/b0/Amir_Ali-Shir_Nava%27i_before_Sultan_Husayn_Bayqara_in_1486_Herat.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Amir_Ali-Shir_Nava%27i_before_Sultan_Husayn_Bayqara_in_1486_Herat.jpg',
    credit: { institution: 'Art and History Trust Collection' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The greatest Chaghataid writer, Ali Shir Nava\'i, was active in the city of Herat, now in northwestern Afghanistan, in the second half of the fifteenth century.',
          lang: 'en',
          cite: { source: 'loc-uzbekistan-country-study-1996', loc: { section: 'Timur', para: '3' } },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/uzbekistan/5.htm' }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'There was a kind of academy at the Herat court under the direction of Mir Ali-Šir, to which poets who passed a rigorous set of criteria were admitted.',
          lang: 'en',
          cite: {
            source: 'iranica-roemer-hosayn-bayqara',
            loc: { section: 'ḤOSAYN BĀYQARĀ', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/hosayn-bayqara'
          }
        },
        {
          id: 'q3',
          text: 'ʿAlišir joined the Naqšbandi order, with Jāmi as his spiritual director.',
          lang: 'en',
          cite: {
            source: 'iranica-losensky-jami-i-life-and-works',
            loc: { section: 'JĀMI i. Life and Works', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/jami-i'
          }
        },
        {
          id: 'q4',
          text: 'Major pious charitable foundations (waqf) were established in the last decades of the 15th century by Timurid princes and dignitaries, such as Mir ʿAli-Šir Navāʾi',
          lang: 'en',
          cite: {
            source: 'iranica-herat-iii-history-medieval-period',
            loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '21' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/herat-iii'
          }
        }
      ]
    },
    {
      kind: 'works',
      quotes: [
        {
          id: 'q5',
          text: 'Translation of Persian works into Chaghatay was common, for instance, Navāʾī’s translation of works by Jāmī',
          lang: 'en',
          cite: {
            source: 'iranica-chaghatay-language-and-literature',
            loc: { section: 'CHAGHATAY DYNASTY ii. Language and Literature', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/chaghatay-language-and-literature'
          }
        },
        {
          id: 'q6',
          text: 'Some three years after the death of Jāmi, ʿAlišir Navāʾi translated the Nafaḥāt into Chaghatay Turkish',
          lang: 'en',
          cite: {
            source: 'iranica-algar-jami-ii-and-sufism',
            loc: { section: 'JĀMI ii. And Sufism', para: '19' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/jami-ii'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q7',
          text: 'The close relations that Sultan Ḥosayn Bāyqarā maintained with his friend and adviser, not to mention his own education and literary interests, attest to the cultural osmosis between Turks and Persians; this reached its peak during Ḥosayn’s reign, due to the ruler’s patronage of and participation in the literary culture of both languages',
          lang: 'en',
          cite: {
            source: 'iranica-roemer-hosayn-bayqara',
            loc: { section: 'ḤOSAYN BĀYQARĀ', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/hosayn-bayqara'
          }
        }
      ]
    }
  ]
})
