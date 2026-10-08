import { definePerson } from '../../schema'

export default definePerson({
  id: 'the-bab',
  names: [
    { text: 'The Báb', lang: 'en', role: 'primary' },
    { text: 'باب', lang: 'fa', role: 'native' },
    { text: 'Sayyed ʿAli-Moḥammad Širāzi', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1819-10-20' },
        cites: [
          {
            source: 'iranica-maceoin-bab',
            loc: { section: 'BĀB, ʿAli Moḥammad Širāzi', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1850-07-08' },
        cites: [
          {
            source: 'iranica-algar-amir-kabir',
            loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '4' }
          },
          {
            source: 'iranica-maceoin-bab',
            loc: { section: 'BĀB, ʿAli Moḥammad Širāzi', para: '13' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Hamid Algar' },
          { kind: 'public', name: 'several contemporary sources' }
        ]
      },
      {
        value: { d: '1850-07-09' },
        cites: [
          {
            source: 'iranica-maceoin-bab',
            loc: { section: 'BĀB, ʿAli Moḥammad Širāzi', para: '13' }
          }
        ],
        heldBy: [
          { kind: 'public', name: 'the Bahais' }
        ]
      }
    ]
  },
  bornIn: {
    ref: 'place:shiraz',
    cites: [
      {
        source: 'iranica-maceoin-bab',
        loc: { section: 'BĀB, ʿAli Moḥammad Širāzi', para: '1' }
      }
    ]
  },
  diedIn: {
    ref: 'place:tabriz',
    cites: [
      {
        source: 'iranica-algar-amir-kabir',
        loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '4' }
      }
    ]
  },
  regions: ['iran'],
  roles: ['other'],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'BĀB, SAYYED ʿALĪ MOḤAMMAD ŠĪRĀZĪ (1235/1819-1266/1850), the founder of Babism.',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-bab',
            loc: { section: 'BĀB, ʿAli Moḥammad Širāzi', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/bab-ali-mohammad-sirazi'
          }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q2',
          text: 'Born in Shiraz on 1 Moḥarram 1235/20 October 1819, he belonged to a family of Ḥosaynī sayyeds, most of whom were engaged in mercantile activities in Shiraz and Būšehr.',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-bab',
            loc: { section: 'BĀB, ʿAli Moḥammad Širāzi', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/bab-ali-mohammad-sirazi'
          }
        },
        {
          id: 'q3',
          text: 'In 1255/1839-40, he headed for the ʿatabāt in Iraq, where he spent a year, mostly in Karbalāʾ, where he regularly attended the classes of the then head of the Shaikhi school, Ḥājj Sayyed Kāẓem Raštī (q.v.) and where he became acquainted with several of the latter’s younger disciples, including a number who later became his own followers.',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-bab',
            loc: { section: 'BĀB, ʿAli Moḥammad Širāzi', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/bab-ali-mohammad-sirazi'
          }
        }
      ]
    },
    {
      kind: 'ideas',
      quotes: [
        {
          id: 'q4',
          text: 'In his early works, he describes himself as the “remembrance” (ḏekr) of the imam, the “servant of the baqīyat Allāh” (i.e., of the Hidden Imam), and the “seal of the gates” (ḵātem al-abwāb) and makes it clear that he has been sent by the Hidden Imam to prepare men for his imminent advent.',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-bab',
            loc: { section: 'BĀB, ʿAli Moḥammad Širāzi', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/bab-ali-mohammad-sirazi'
          }
        },
        {
          id: 'q5',
          text: 'During the later period of the Bāb’s confinement in Mākū, he began to advance claims even more startling than those of bāb and nāʾeb.',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-bab',
            loc: { section: 'BĀB, ʿAli Moḥammad Širāzi', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/bab-ali-mohammad-sirazi'
          }
        },
        {
          id: 'q6',
          text: 'In the works written between then and his execution in July, 1850, notably in the later parts of the Persian Bayān, he claimed to be, not merely the Imam Mahdī, but a theophanic representation of the godhead, a divine manifestation (maẓhar-e elāhī) empowered to reveal a new Šarīʿa, the basic outline of which may be found in the Persian and Arabic Bayāns.',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-bab',
            loc: { section: 'BĀB, ʿAli Moḥammad Širāzi', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/bab-ali-mohammad-sirazi'
          }
        }
      ]
    },
    {
      kind: 'later-life',
      quotes: [
        {
          id: 'q7',
          text: 'According to Dr. William Cormick, an Irish physician who treated the Bāb following his bastinado in Tabrīz in 1848, he was “a very mild and delicate-looking man, rather small in stature and very fair for a Persian, with a melodious soft voice, which struck me much.',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-bab',
            loc: { section: 'BĀB, ʿAli Moḥammad Širāzi', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/bab-ali-mohammad-sirazi'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q8',
          text: 'The struggle between a group of Babis and state forces in Māzandarān (September, 1848-May, 1849) caused considerable anxiety in the early months of Nāṣer-al-Dīn Shah’s reign, but its eventual suppression and the fact that it had been restricted to a rural area lessened the fear of the government. When, however, violence broke out in the urban centers of Neyrīz and Zanjān in May, 1850, Mīrzā Taqī Khan Amīr Neẓām decided to take the extreme step of having the Bāb put to death. He was, accordingly, brought to Tabrīz at the end of June, 1850, and executed by firing squad in the barracks square there at noon on either July 8 or 9.',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-bab',
            loc: { section: 'BĀB, ʿAli Moḥammad Širāzi', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/bab-ali-mohammad-sirazi'
          }
        },
        {
          id: 'q9',
          text: '(The Bahais celebrate this event on 9 July, stating that it occurred on 28 Šaʿbān 1266, but several contemporary sources give the date as 8 July—see Momen, op. cit., p. 78 and n.)',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-bab',
            loc: { section: 'BĀB, ʿAli Moḥammad Širāzi', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/bab-ali-mohammad-sirazi'
          }
        },
        {
          id: 'q10',
          text: 'Wishing to prevent further outbreaks of Bābī insurrectionary fervor by doing away with the founder of Babism, Amīr Kabīr gave orders for the execution of Sayyed ʿAlī-Moḥammad Bāb, which took place in Tabrīz on 27 Šaʿbān 1266/8 July 1850.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-amir-kabir',
            loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/amir-e-kabir-mirza-taqi-khan'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q11',
          text: 'The Bāb’s fame has endured chiefly within the context of Bahaism (see bahai faith) in which he plays an important role as an independent divine manifestation in some respects equal, in others subordinate to, Mīrzā Ḥosayn-ʿAlī Bahāʾ-Allāh, for whom he is held to act as a herald (mobaššer).',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-bab',
            loc: { section: 'BĀB, ʿAli Moḥammad Širāzi', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/bab-ali-mohammad-sirazi'
          }
        }
      ]
    }
  ],
  furtherReading: [
    { source: 'ivanov-1939-babidskie-vosstaniia-v-irane', perspective: 'russian-soviet' },
    {
      source: 'vahman-2010-yeksad-o-shast-sal-mobarezeh-ba-diyanat-e-bahai',
      perspective: 'iranian'
    }
  ]
})
