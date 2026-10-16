import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'ali-shir-navai-and-chaghatay-literature',
  names: [
    { text: 'Ali-Shir Navai and Chaghatay literature', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-16',
  type: 'cultural',
  start: {
    alts: [
      {
        value: { d: '1470' },
        cites: [
          {
            source: 'iranica-roemer-hosayn-bayqara',
            loc: { section: 'ḤOSAYN BĀYQARĀ', para: '1' }
          },
          {
            source: 'iranica-herat-iii-history-medieval-period',
            loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '20' }
          }
        ]
      }
    ]
  },
  end: {
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
          }
        ]
      }
    ]
  },
  regions: ['russia-central-asia', 'iran'],
  prominence: 3,
  places: [
    {
      ref: 'place:herat',
      cites: [
        { source: 'loc-uzbekistan-country-study-1996', loc: { section: 'Timur', para: '3' } }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:timurid-empire',
      cites: [
        {
          source: 'iranica-roemer-hosayn-bayqara',
          loc: { section: 'ḤOSAYN BĀYQARĀ', para: '11' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:ali-shir-navai',
      role: 'participant',
      cites: [
        {
          source: 'iranica-roemer-hosayn-bayqara',
          loc: { section: 'ḤOSAYN BĀYQARĀ', para: '11' }
        }
      ]
    },
    {
      ref: 'person:sultan-husayn-bayqara',
      role: 'head-of-state',
      cites: [
        {
          source: 'iranica-roemer-hosayn-bayqara',
          loc: { section: 'ḤOSAYN BĀYQARĀ', para: '11' }
        }
      ]
    },
    {
      ref: 'person:jami',
      role: 'participant',
      cites: [
        {
          source: 'iranica-chaghatay-language-and-literature',
          loc: { section: 'CHAGHATAY DYNASTY ii. Language and Literature', para: '12' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:herat-under-sultan-husayn-bayqara', rel: 'related' },
    { ref: 'event:jami-and-the-naqshbandi-order-in-herat', rel: 'related' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The apogee of Chaghatay literature was reached during the reign of the Timurid sultan Ḥosayn Bāyqarā, in the work of Mīr ʿAlī-Šīr Navāʾī, whose style remained a model for the ensuing period',
          lang: 'en',
          cite: {
            source: 'iranica-chaghatay-language-and-literature',
            loc: { section: 'CHAGHATAY DYNASTY ii. Language and Literature', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/chaghatay-language-and-literature'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'The appearance of literature in this Turkic language has been taken as indicative of the contemporary intellectual milieu in Herat, which was a product of the cultural symbiosis of Persian and Turkic-speaking peoples.',
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
        },
        {
          id: 'q3',
          text: 'Even when Chaghatay authors deliberately set out to write in Turkish they were not able to avoid using Persian words.',
          lang: 'en',
          cite: {
            source: 'iranica-chaghatay-language-and-literature',
            loc: { section: 'CHAGHATAY DYNASTY ii. Language and Literature', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/chaghatay-language-and-literature'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'Persian remained the predominant language not only of poetry but of literature in general, including historiography.',
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
          id: 'q5',
          text: 'Turkic still managed to develop an independent identity; an example from the pen of Mir ʿAli-Šir is Moḥākamat al-loḡatayn, or “Arbitration between the two languages” (1841; ed. R. Devereux, 1966), the bulk of which is devoted not to Persian but to Turkic.',
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
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q6',
          text: 'Navāʾī’s own works and the memoirs of the first Mughal emperor, Bābor (932-37/1526-30), guaranteed the establishment of this branch of Turkish, now known as Chaghatay, as a literary language',
          lang: 'en',
          cite: {
            source: 'iranica-central-asia-v',
            loc: { section: 'CENTRAL ASIA v. In the Mongol and Timurid Periods', para: '19' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/central-asia-v'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/09/Divan_%28Collected_Works%29_of_Mir_%27Ali_Shir_Nava%27i_MET_18533.jpg/1280px-Divan_%28Collected_Works%29_of_Mir_%27Ali_Shir_Nava%27i_MET_18533.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Divan_(Collected_Works)_of_Mir_%27Ali_Shir_Nava%27i_MET_18533.jpg',
    credit: { institution: 'Metropolitan Museum of Art', creator: 'Sultan Ali Mashhadi' },
    license: { id: 'cc0' }
  }
})
