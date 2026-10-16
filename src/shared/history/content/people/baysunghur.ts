import { definePerson } from '../../schema'

export default definePerson({
  id: 'baysunghur',
  names: [
    { text: 'Baysunghur', lang: 'en', role: 'primary' },
    {
      text: 'Bāysonḡor',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-roemer-baysongor',
          loc: { section: 'BĀYSONḠOR, ḠĪĀṮ-AL-DĪN', para: '1' }
        }
      ]
    },
    { text: 'بایسنقر', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-16',
  born: {
    alts: [
      {
        value: { d: '1397-09-16' },
        cites: [
          {
            source: 'iranica-roemer-baysongor',
            loc: { section: 'BĀYSONḠOR, ḠĪĀṮ-AL-DĪN', para: '1' }
          },
          {
            source: 'loc-name-authority-baysongor',
            loc: { section: 'MARC field 046: birth and death dates' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1433-12-20' },
        cites: [
          {
            source: 'iranica-roemer-baysongor',
            loc: { section: 'BĀYSONḠOR, ḠĪĀṮ-AL-DĪN', para: '1' }
          },
          {
            source: 'loc-name-authority-baysongor',
            loc: { section: 'MARC field 046: birth and death dates' }
          }
        ]
      }
    ]
  },
  bornIn: {
    ref: 'place:herat',
    cites: [
      {
        source: 'iranica-roemer-baysongor',
        loc: { section: 'BĀYSONḠOR, ḠĪĀṮ-AL-DĪN', para: '1' }
      }
    ]
  },
  diedIn: {
    ref: 'place:herat',
    cites: [
      {
        source: 'iranica-roemer-baysongor',
        loc: { section: 'BĀYSONḠOR, ḠĪĀṮ-AL-DĪN', para: '1' }
      }
    ]
  },
  regions: ['iran', 'russia-central-asia'],
  roles: ['other', 'artist'],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e6/Baysunghur_in_1429_in_Herat._Frontispiece_detail_of_Kalila_wa_Dimna%2C_Topkapi_R.1022.jpg/1280px-Baysunghur_in_1429_in_Herat._Frontispiece_detail_of_Kalila_wa_Dimna%2C_Topkapi_R.1022.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Baysunghur_in_1429_in_Herat._Frontispiece_detail_of_Kalila_wa_Dimna,_Topkapi_R.1022.jpg',
    credit: { institution: 'Topkapı Palace Museum', creator: '1429 artist' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'BĀYSONḠOR, ḠĪĀT-AL-DĪN B. ŠĀHROḴ B. TĪMŪR (799-837/1397-1433), also called Sultan Bāysonḡor Bahādor Khan, Timurid prince who played an important role as a statesman and a patron of art and architecture and was himself a first-class calligrapher.',
          lang: 'en',
          cite: {
            source: 'iranica-roemer-baysongor',
            loc: { section: 'BĀYSONḠOR, ḠĪĀṮ-AL-DĪN', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/baysongor'
          }
        },
        {
          id: 'q2',
          text: 'Bāysonḡor was an outstanding representative of Islamic culture of the Turco-Iranian type, whose distinctiveness and worth have only in recent decades received adequate appreciation in modern scholarship.',
          lang: 'en',
          cite: {
            source: 'iranica-roemer-baysongor',
            loc: { section: 'BĀYSONḠOR, ḠĪĀṮ-AL-DĪN', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/baysongor'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q3',
          text: 'Bāysonḡor played a big part in the administration of the Timurid empire.',
          lang: 'en',
          cite: {
            source: 'iranica-roemer-baysongor',
            loc: { section: 'BĀYSONḠOR, ḠĪĀṮ-AL-DĪN', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/baysongor'
          }
        },
        {
          id: 'q4',
          text: 'He was appointed governor-general (wālī) of Ṭūs, Nīšāpūr, and Astarābād when he was seventeen years old, and according to Faṣīḥ',
          lang: 'en',
          cite: {
            source: 'iranica-roemer-baysongor',
            loc: { section: 'BĀYSONḠOR, ḠĪĀṮ-AL-DĪN', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/baysongor'
          }
        },
        {
          id: 'q5',
          text: 'Bāysonḡor fought in campaigns against the most dangerous enemies of the Timurids.',
          lang: 'en',
          cite: {
            source: 'iranica-roemer-baysongor',
            loc: { section: 'BĀYSONḠOR, ḠĪĀṮ-AL-DĪN', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/baysongor'
          }
        }
      ]
    },
    {
      kind: 'works',
      quotes: [
        {
          id: 'q6',
          text: 'Another son of Šāhroḵ, Bāysonḡor (q.v.; 1397-1433) was an outstanding calligrapher, a poet, and a fun-loving prince, who preferred the company of artists and men of letters to martial or political pursuits.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-iran-ii2-islamic-period-page-3',
            loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period (page 3)', para: '26' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/iran-ii2-islamic-period-page-3'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q8',
          text: 'In both contemporary and modern historical works, Bāysonḡor is overshadowed by his elder brother Oloḡ Beg (796-853/1393-1449).',
          lang: 'en',
          cite: {
            source: 'iranica-roemer-baysongor',
            loc: { section: 'BĀYSONḠOR, ḠĪĀṮ-AL-DĪN', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/baysongor'
          }
        }
      ]
    }
  ]
})
