import { definePerson } from '../../schema'

export default definePerson({
  id: 'abbas-mirza',
  names: [
    { text: 'Abbas Mirza', lang: 'en', role: 'primary' },
    { text: 'عباس میرزا', lang: 'fa', role: 'native' },
    {
      text: 'Nāyeb-al-salṭana',
      lang: 'fa-Latn',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-busse-abbas-mirza',
          loc: { section: 'ʿABBĀS MĪRZĀ QAJAR', para: '2' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1789-08-26' },
        cites: [
          {
            source: 'iranica-busse-abbas-mirza',
            loc: { section: 'ʿABBĀS MĪRZĀ QAJAR', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1833-10-25' },
        cites: [
          {
            source: 'iranica-busse-abbas-mirza',
            loc: { section: 'ʿABBĀS MĪRZĀ QAJAR', para: '8' }
          }
        ]
      },
      {
        value: { d: '1833-11' },
        cites: [
          {
            source: 'iranica-amanat-herat-vi',
            loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '9' }
          }
        ]
      }
    ]
  },
  diedIn: {
    ref: 'place:mashhad',
    cites: [
      {
        source: 'iranica-busse-abbas-mirza',
        loc: { section: 'ʿABBĀS MĪRZĀ QAJAR', para: '8' }
      }
    ]
  },
  regions: ['iran'],
  roles: ['military', 'politician'],
  offices: [
    {
      title: 'crown prince (Nāyeb-al-salṭana)',
      polity: 'polity:qajar-iran',
      lang: 'en',
      start: {
        alts: [
          {
            value: { d: '1799-03-20' },
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
            value: { d: '1833-10-25' },
            cites: [
              {
                source: 'iranica-busse-abbas-mirza',
                loc: { section: 'ʿABBĀS MĪRZĀ QAJAR', para: '8' }
              }
            ]
          },
          {
            value: { d: '1833-11' },
            cites: [
              {
                source: 'iranica-amanat-herat-vi',
                loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '9' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-busse-abbas-mirza',
          loc: { section: 'ʿABBĀS MĪRZĀ QAJAR', para: '2' }
        }
      ]
    },
    {
      title: 'governor of Azarbaijan',
      polity: 'polity:qajar-iran',
      start: {
        alts: [
          {
            value: { d: '1799' },
            cites: [
              {
                source: 'iranica-busse-abbas-mirza',
                loc: { section: 'ʿABBĀS MĪRZĀ QAJAR', para: '3' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-busse-abbas-mirza',
          loc: { section: 'ʿABBĀS MĪRZĀ QAJAR', para: '3' }
        },
        {
          source: 'iranica-amanat-fath-ali-shah',
          loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '9' }
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
          text: 'ʿABBĀS MĪRZĀ, son of Fatḥ-ʿAlī Shah and father of the line of Qajar rulers from Moḥammad Shah on.',
          lang: 'en',
          cite: {
            source: 'iranica-busse-abbas-mirza',
            loc: { section: 'ʿABBĀS MĪRZĀ QAJAR', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/abbas-mirza'
          }
        },
        {
          id: 'q2',
          text: 'He was born on 4 Ḏu’l-ḥeǰǰa 1203/26 August 1789 in the town of Navā, Māzandarān.',
          lang: 'en',
          cite: {
            source: 'iranica-busse-abbas-mirza',
            loc: { section: 'ʿABBĀS MĪRZĀ QAJAR', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/abbas-mirza'
          }
        },
        {
          id: 'q3',
          text: 'On 13 Šavvāl 1213/20 March 1799 he made ʿAbbās Mīrzā crown prince with the title Nāyeb-al-salṭana.',
          lang: 'en',
          cite: {
            source: 'iranica-busse-abbas-mirza',
            loc: { section: 'ʿABBĀS MĪRZĀ QAJAR', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/abbas-mirza'
          }
        },
        {
          id: 'q4',
          text: 'Most significantly, ʿAbbās Mīrzā was assigned to the governorship of Azarbaijan, a position which he held for the remaining thirty five years of his life.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-fath-ali-shah',
            loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '9' }
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
      kind: 'career',
      quotes: [
        {
          id: 'q5',
          text: 'ʿAbbās Mīrzā was assigned the governorship of Azarbaijan; it was a threatened province, like Khorasan in the northeast, where the shah proceeded in the spring of 1799. Thus it was natural that the crown prince should have been dispatched to subdue the Kurd Jaʿfar-qolī Khan Dombalī, who was asserting a territorial claim to Azarbaijan. After a victory near Salmās, ʿAbbās Mīrzā marched to Ḵoy and then returned to Tabrīz. Although the crown prince’s brothers who were also appointed governors of important provinces in the same year as himself usually took up permanent residence in their provincial capitals, ʿAbbās Mīrzā clearly did not live in Tabrīz all the time. In fact, Mīrzā Bozorg had built him the palace of Negārestān near Tehran (Tancoigne, pp. 179f.). In 1803, ʿAbbās Mīrzā was in Tehran, where, in autumn or winter, his marriage to the daughter of a Devellū prince was solemnized with great pomp (Hedāyat, IX, pp. 373f.). When the Russians overran Ganǰa in 1804, he left Tehran and marched to the relief of Erevan, which was under siege from Russian forces. When the Russians retreated to Tiflis, the shah, then at the Russian front, left Azarbaijan in the hands of “experienced amirs.” Fatḥ-ʿAlī Shah returned to Tehran in the fall, while ʿAbbās Mīrzā remained in Tabrīz and made preparations for the following year’s campaign. In the summer of 1805 the crown prince fought with moderate success against the Russians; only then was he formally appointed governor of “Azarbaijan and Qarabāḡ, from Qaplān Kūh to Darband”',
          lang: 'en',
          cite: {
            source: 'iranica-busse-abbas-mirza',
            loc: { section: 'ʿABBĀS MĪRZĀ QAJAR', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/abbas-mirza'
          }
        },
        {
          id: 'q6',
          text: 'Under ʿAbbās Mīrzā, thanks to its geographical position and the political situation, Tabrīz became the gateway for entry of modern influences.',
          lang: 'en',
          cite: {
            source: 'iranica-busse-abbas-mirza',
            loc: { section: 'ʿABBĀS MĪRZĀ QAJAR', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/abbas-mirza'
          }
        },
        {
          id: 'q7',
          text: 'Western ideas entered first via Turkey and Russia, later through the French and British embassies in Azarbaijan.',
          lang: 'en',
          cite: {
            source: 'iranica-busse-abbas-mirza',
            loc: { section: 'ʿABBĀS MĪRZĀ QAJAR', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/abbas-mirza'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q8',
          text: 'ʿAbbās Mīrzā died at Mašhad, aged forty-four, on 10 Jomādā II 1249/25 October 1833, and was buried in the shrine of Imam Reżā',
          lang: 'en',
          cite: {
            source: 'iranica-busse-abbas-mirza',
            loc: { section: 'ʿABBĀS MĪRZĀ QAJAR', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/abbas-mirza'
          }
        },
        {
          id: 'q9',
          text: 'ʿAbbās Mirzā, eldest son and heir apparent of Fatḥ-ʿAli Shah, a brave and patriotic prince who headed Persian forces in the Irano-Russian wars, dies at 41.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-1',
            loc: { section: 'Chronology of Iranian History Part 1, 1833' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-1/'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a0/Abbas_Mirza_in_battle.jpg/1280px-Abbas_Mirza_in_battle.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Abbas_Mirza_in_battle.jpg',
    credit: { institution: 'Brown University Library', creator: 'Hippolyte Bellangé' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'nafisi-1965-tarikh-e-ejtemai-va-siyasi-ye-iran', perspective: 'iranian' },
    { source: 'potto-1885-kavkazskaia-voina', perspective: 'russian-soviet' }
  ]
})
