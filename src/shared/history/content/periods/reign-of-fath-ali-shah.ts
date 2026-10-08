import { definePeriod } from '../../schema'

export default definePeriod({
  id: 'reign-of-fath-ali-shah',
  names: [
    { text: 'Reign of Fath-Ali Shah Qajar', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  periodType: 'reign',
  start: {
    alts: [
      {
        value: { d: '1797-07-28' },
        cites: [
          {
            source: 'iranica-amanat-fath-ali-shah',
            loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '4' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Abbas Amanat' }
        ]
      },
      {
        value: { d: '1798-03-21' },
        cites: [
          {
            source: 'iranica-busse-abbas-mirza',
            loc: { section: 'ʿABBĀS MĪRZĀ QAJAR', para: '2' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Heribert Busse' }
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
  regions: ['iran'],
  prominence: 2,
  parent: 'period:qajar-dynasty',
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'To further consolidate Qajar control over the provinces, Fatḥ-ʿAlī Shah initiated the policy of dispatching his young sons to provinces not only as tokens of his personal power but also to replace the unreliable Qajar and other military chiefs.',
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
        },
        {
          id: 'q2',
          text: 'Despite its shortcomings, the shah’s policy of appointing princes to provincial governments fostered a period of relative calm and recovery in the first quarter of the 19th century, even though it engendered a new source of tensions within the royal family, especially on the question of succession.',
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
        },
        {
          id: 'q3',
          text: 'The encounter with neighboring European powers was a sobering experience for Fatḥ-ʿAlī Shah.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-fath-ali-shah',
            loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/fath-ali-shah'
          }
        },
        {
          id: 'q4',
          text: 'Coming at the outset of Europe’s imperial expansion, it transformed the shah’s image as the majestic king of kings (šāhanšāh) at the turn of the century to that of a vulnerable ruler of a declining kingdom a quarter of a century later.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-fath-ali-shah',
            loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/fath-ali-shah'
          }
        },
        {
          id: 'q5',
          text: 'During this period Fatḥ-ʿAlī Shah’s court was a frequented venue for ephemeral alliances and baffling imperial contests.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-fath-ali-shah',
            loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '10' }
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
          text: 'At the outset of his reign the shah still stood a fair chance to slow down, if not repel completely, the torrent of European military expansion and imperial diplomacy which began to impact his country. By the end of his reign, his compounding financial troubles and military and technological disadvantages brought his country to the brink of political collapse hastened by an ensuing war of succession after his death.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-fath-ali-shah',
            loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '36' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/fath-ali-shah'
          }
        },
        {
          id: 'q6',
          text: 'Yet the shah’s complacency, rooted in a culture of conquest, was never distant enough from the tribal norms and familial mores so as to allow, with few exceptions, the budding of a modern state, even to the extent that his Ottoman and Egyptian contemporaries were able to achieve.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-fath-ali-shah',
            loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '36' }
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
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e1/Portrait_in_oils_of_Fath_%E2%80%98Ali_Shah_Qajar%2C_ruler_of_Iran_from_1797_to_1834%2C_by_his_court_painter_Mihr_%27Ali%2C_Tehran%2C_about_1810.jpg/1280px-Portrait_in_oils_of_Fath_%E2%80%98Ali_Shah_Qajar%2C_ruler_of_Iran_from_1797_to_1834%2C_by_his_court_painter_Mihr_%27Ali%2C_Tehran%2C_about_1810.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Portrait_in_oils_of_Fath_%E2%80%98Ali_Shah_Qajar,_ruler_of_Iran_from_1797_to_1834,_by_his_court_painter_Mihr_%27Ali,_Tehran,_about_1810.jpg',
    credit: { institution: 'Victoria and Albert Museum', creator: 'Mihr \'Ali' },
    license: { id: 'public-domain' }
  }
})
