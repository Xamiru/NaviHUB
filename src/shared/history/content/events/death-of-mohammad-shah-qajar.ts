import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'death-of-mohammad-shah-qajar',
  names: [
    { text: 'Death of Mohammad Shah Qajar', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  type: 'other',
  start: {
    alts: [
      {
        value: { d: '1848-09-05' },
        cites: [
          {
            source: 'iranica-calmard-mohammad-shah',
            loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 2,
  places: [
    {
      ref: 'place:tehran',
      cites: [
        {
          source: 'iranica-calmard-mohammad-shah',
          loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '1' }
        },
        {
          source: 'iranica-calmard-mohammad-shah',
          loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '24' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:qajar-dynasty' },
    { ref: 'period:reign-of-mohammad-shah-qajar' }
  ],
  related: [
    { ref: 'event:reforms-of-amir-kabir', rel: 'related' },
    { ref: 'event:shaykh-tabarsi-uprising', rel: 'related' }
  ],
  participants: [
    {
      ref: 'person:mohammad-shah-qajar',
      role: 'head-of-state',
      cites: [
        {
          source: 'iranica-calmard-mohammad-shah',
          loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '1' }
        }
      ]
    },
    {
      ref: 'person:naser-al-din-shah-qajar',
      role: 'head-of-state',
      cites: [
        {
          source: 'iranica-algar-amir-kabir',
          loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '3' }
        }
      ]
    },
    {
      ref: 'person:haji-mirza-aqasi',
      role: 'head-of-government',
      cites: [
        {
          source: 'iranica-calmard-mohammad-shah',
          loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '25' }
        }
      ]
    },
    {
      ref: 'person:amir-kabir',
      role: 'participant',
      cites: [
        {
          source: 'iranica-algar-amir-kabir',
          loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '3' }
        }
      ]
    },
    {
      name: 'Mahd-e ʿOlyā',
      role: 'participant',
      cites: [
        {
          source: 'iranica-calmard-mohammad-shah',
          loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '25' }
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
          text: 'MOḤAMMAD SHAH QĀJĀR, (b. Tabriz, 6 Ḏu’l-qaʿda 1222/5 January 1808; d. Tehran, 6 Šawwāl 1264/5 September 1848), the third ruler of the Qajar dynasty after his grandfather Fatḥ-ʿAli Shah.',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-mohammad-shah',
            loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/mohammad-shah'
          }
        },
        {
          id: 'q2',
          text: 'In late summer 1848, the Shah was overtaken by a combination of gout and erysipelas (Watson, p. 354; Elgood, p. 498).',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-mohammad-shah',
            loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '24' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/mohammad-shah'
          }
        },
        {
          id: 'q3',
          text: 'The shah died in the Qaṣr-e Moḥammadiya (also called Qaṣr-e Jadid), near Tehran, and was buried at Qom, close to shrine’s sanctuary (Fasāʾi, ed. Rastgār, I, pp. 786-87, tr. Busse, pp. 280-81; Ḵormuji, pp. 35-36; Sepehr, II, p. 211; Hedāyat, Rawżat al-ṣafā X, pp. 348-55).',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-mohammad-shah',
            loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '24' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/mohammad-shah'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q4',
          text: 'Deterioration of the shah’s health, who suffered another attack of gout in September 1845, sparkled a wave of opposition followed by several purges.',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-mohammad-shah',
            loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '23' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/mohammad-shah'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q5',
          text: 'Rumors about his impending death, and its further confirmation, aggravated insecurity throughout the country (on disturbances at Isfahan, Kermān, Shiraz, Yazd, etc., see Watson, pp. 360 ff.).',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-mohammad-shah',
            loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '24' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/mohammad-shah'
          }
        },
        {
          id: 'q6',
          text: 'After a final bid for political survival, Āqāsi took bast at the shrine of Shah ʿAbd-al-ʿAẓim near Tehran and was finally exiled to Karbalāʾ.',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-mohammad-shah',
            loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '25' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/mohammad-shah'
          }
        },
        {
          id: 'q7',
          text: 'Pending the arrival of Nāṣer-al-Din Shah and his vizier Mirzā Taqi Khan, the Queen Mother, Mahd-e ʿOlyā, headed at Tehran a sort of “republican regime” (ṭariqa-ye jomhuriya).',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-mohammad-shah',
            loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '25' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/mohammad-shah'
          }
        },
        {
          id: 'q8',
          text: 'The residents of Bārforūš (Bābol), alarmed by the arrival of a body of armed men immediately after the death of Moḥammad Shah, offered fierce resistance to their entry to the town.',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-babism-ii',
            loc: { section: 'BABISM ii. Babi executions and uprisings', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/babism-index/babism-ii-babi-executions-and-uprisings'
          }
        },
        {
          id: 'q9',
          text: 'The French condolences on the death of Moḥammad Shah were only presented in April 1849, by which time the Franco-Persian rapprochement of 1847 had already provoked the anti-French animosity of the Russian and English envoys.',
          lang: 'en',
          cite: {
            source: 'iranica-hellot-bellier-france-relations',
            loc: { section: 'FRANCE iii. RELATIONS WITH PERSIA 1789-1918', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/france-iii-relations-with-persia-1789-1918/'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Portrait_of_Muhammad_Shah_Qadjar_-_MV_6700_-_v1.JPG',
    page: 'https://commons.wikimedia.org/wiki/File:Portrait_of_Muhammad_Shah_Qadjar_-_MV_6700_-_v1.JPG',
    credit: { creator: 'Muhammad Hasan Afshar' },
    license: { id: 'public-domain' }
  }
})
