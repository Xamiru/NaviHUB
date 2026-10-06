import { definePerson } from '../../schema'

export default definePerson({
  id: 'fath-ali-shah-qajar',
  names: [
    { text: 'Fath-Ali Shah Qajar', lang: 'en', role: 'primary' },
    { text: 'فتحعلی‌شاه قاجار', lang: 'fa', role: 'native' },
    {
      text: 'Bābā Khan',
      lang: 'fa-Latn',
      role: 'former',
      cites: [
        {
          source: 'iranica-amanat-fath-ali-shah',
          loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '2' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  born: {
    alts: [
      {
        value: { d: '1769-05' },
        cites: [
          {
            source: 'iranica-amanat-fath-ali-shah',
            loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1834-10-24' },
        cites: [
          {
            source: 'iranica-amanat-fath-ali-shah',
            loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '1' }
          }
        ]
      },
      {
        value: { d: '1834-10-22' },
        cites: [
          {
            source: 'iranica-hambly-farmanfarma',
            loc: { section: 'FARMĀNFARMĀ, ḤOSAYN-ʿALĪ MĪRZĀ', para: '7' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  roles: ['monarch'],
  offices: [
    {
      title: 'shah of Iran',
      start: {
        alts: [
          {
            value: { d: '1797-07-28' },
            cites: [
              {
                source: 'iranica-amanat-fath-ali-shah',
                loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '4' }
              }
            ]
          },
          {
            value: { d: '1798-03-21' },
            cites: [
              {
                source: 'iranica-busse-abbas-mirza',
                loc: { section: 'ʿABBĀS MĪRZĀ QAJAR', para: '2' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1834-10-24' },
            cites: [
              {
                source: 'iranica-amanat-fath-ali-shah',
                loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '1' }
              }
            ]
          },
          {
            value: { d: '1834-10-22' },
            cites: [
              {
                source: 'iranica-hambly-farmanfarma',
                loc: { section: 'FARMĀNFARMĀ, ḤOSAYN-ʿALĪ MĪRZĀ', para: '7' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-amanat-fath-ali-shah',
          loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '4' }
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
          text: 'FATḤ-ʿALĪ SHAH QĀJĀR, the second ruler of the Qajar dynasty (b. Moḥarram 1183/May 1769; d. 19 Jomādā II 1250/ 24 October 1834; Plate I).',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-fath-ali-shah',
            loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/fath-ali-shah'
          }
        },
        {
          id: 'q2',
          text: 'Under Fath Ali (1797-1834), Mohammad Shah (1834-48), and Naser ad Din Shah (1848-96) a degree of order, stability, and unity returned to the country.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE QAJARS, 1795-1925', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/iran/12.htm' }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q3',
          text: 'Ascending the throne on 4 Ṣafar 1212/28 July 1797, he struck coins in Shiraz and Tehran first as Solṭān Bābā Khan and later as Fatḥ-ʿAlī Shah.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-fath-ali-shah',
            loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/fath-ali-shah'
          }
        },
        {
          id: 'q4',
          text: 'The official coronation took place in Tehran on 1 Šawwāl 1212 (feast of Feṭr) /19 March 1798',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-fath-ali-shah',
            loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/fath-ali-shah'
          }
        },
        {
          id: 'q5',
          text: 'Fatḥ-ʿAlī Shah’s letter of the same date to Napoleon not only reflects his bitter disappointment with the French conqueror’s unfulfilled promises but his astute effort to justify his new stand:',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-fath-ali-shah',
            loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '18' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/fath-ali-shah'
          }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q6',
          text: '“Supposing I was to call a Parliament at Teheran, and deliver up to it the whole power of taxation, I should then never get a penny—for no Persian parts with money, unless he is obliged to do it.”',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-fath-ali-shah',
            loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '21' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/fath-ali-shah'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q7',
          text: 'The reign of Fatḥ-ʿAlī Shah should be seen as the golden age of Shiʿite legalism when the production of a vast body of studies in feqh, oṣūl, and related fields transformed modern Shiʿite scholarship.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-fath-ali-shah',
            loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '30' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/fath-ali-shah'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e1/Portrait_in_oils_of_Fath_%E2%80%98Ali_Shah_Qajar%2C_ruler_of_Iran_from_1797_to_1834%2C_by_his_court_painter_Mihr_%27Ali%2C_Tehran%2C_about_1810.jpg/1280px-Portrait_in_oils_of_Fath_%E2%80%98Ali_Shah_Qajar%2C_ruler_of_Iran_from_1797_to_1834%2C_by_his_court_painter_Mihr_%27Ali%2C_Tehran%2C_about_1810.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Portrait_in_oils_of_Fath_%E2%80%98Ali_Shah_Qajar,_ruler_of_Iran_from_1797_to_1834,_by_his_court_painter_Mihr_%27Ali,_Tehran,_about_1810.jpg',
    credit: { institution: 'Victoria and Albert Museum', creator: 'Mihr \'Ali' },
    license: { id: 'public-domain' }
  }
})
