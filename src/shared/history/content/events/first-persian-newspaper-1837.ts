import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'first-persian-newspaper-1837',
  names: [
    { text: 'Kaghaz-e Akhbar, the first Persian newspaper', lang: 'en', role: 'primary' },
    { text: 'کاغذ اخبار', lang: 'fa', role: 'native' },
    {
      text: 'Aḵbār-e waqāyeʿ',
      lang: 'fa-Latn',
      role: 'alternative',
      cites: [
        { source: 'iranica-floor-cap', loc: { section: 'ČĀP', para: '20' } }
      ]
    }
  ],
  researched: '2026-10-06',
  type: 'cultural',
  start: {
    alts: [
      {
        value: { d: '1837-01' },
        cites: [
          { source: 'iranica-floor-cap', loc: { section: 'ČĀP', para: '20' } }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Willem M. Floor' }
        ]
      },
      {
        value: { d: '1837-05' },
        cites: [
          {
            source: 'iranica-nabavi-journalism-qajar',
            loc: { section: 'JOURNALISM i. Qajar Period, During the 19th century', para: '1' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Negin Nabavi' }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 3,
  places: [
    {
      ref: 'place:tehran',
      cites: [
        { source: 'iranica-floor-cap', loc: { section: 'ČĀP', para: '20' } }
      ]
    }
  ],
  partOf: [
    { ref: 'period:reign-of-mohammad-shah-qajar' }
  ],
  participants: [
    {
      name: 'Mīrzā Ṣāleḥ Šīrāzī',
      role: 'organizer',
      cites: [
        { source: 'iranica-floor-cap', loc: { section: 'ČĀP', para: '20' } },
        { source: 'iranica-amanat-aqasi', loc: { section: 'ĀQĀSĪ, ḤĀJJĪ MĪRZĀ', para: '15' } }
      ]
    },
    {
      ref: 'person:haji-mirza-aqasi',
      role: 'participant',
      cites: [
        { source: 'iranica-amanat-aqasi', loc: { section: 'ĀQĀSĪ, ḤĀJJĪ MĪRZĀ', para: '15' } }
      ]
    }
  ],
  related: [
    { ref: 'event:first-printing-press-in-tabriz', rel: 'related' }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'One of them was Mīrzā Ṣāleḥ Šīrāzī, who, according to his own report (pp. 344-45), apprenticed himself to a London publishing house that specialized in printing the New Testament in Persian, Hindi, Syriac, Arabic, and other languages.',
          lang: 'en',
          cite: { source: 'iranica-floor-cap', loc: { section: 'ČĀP', para: '11' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/cap-print-printing-a-persian-word-probably-derived-from-hindi-chapna/'
          }
        },
        {
          id: 'q2',
          text: 'In 1244-­45/1829-30 he was a member of an embassy to St. Petersburg, from which he returned with several print­ing presses, which were set up in Tabrīz under the directorship of his friend Āqā ʿAlī.',
          lang: 'en',
          cite: { source: 'iranica-floor-cap', loc: { section: 'ČĀP', para: '11' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/cap-print-printing-a-persian-word-probably-derived-from-hindi-chapna/'
          }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q3',
          text: 'The contents included foreign and local news, the latter emphasizing progress and reforms under Moḥammad Shah (Mīrzā Ṣāleḥ, ed. Rāʾīn, pp. 19-21).',
          lang: 'en',
          cite: { source: 'iranica-floor-cap', loc: { section: 'ČĀP', para: '20' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/cap-print-printing-a-persian-word-probably-derived-from-hindi-chapna/'
          }
        },
        {
          id: 'q4',
          text: 'The paper lasted three years.',
          lang: 'en',
          cite: { source: 'iranica-floor-cap', loc: { section: 'ČĀP', para: '20' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/cap-print-printing-a-persian-word-probably-derived-from-hindi-chapna/'
          }
        },
        {
          id: 'q5',
          text: 'It was fourteen years before another appeared, the weekly Rūz-nāma-ye waqāyeʿ-a ettefāqīya, founded by Mīrzā Taqī Khan Amīr(-e) Kabīr.',
          lang: 'en',
          cite: { source: 'iranica-floor-cap', loc: { section: 'ČĀP', para: '20' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/cap-print-printing-a-persian-word-probably-derived-from-hindi-chapna/'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q6',
          text: 'Whereas in the previous seventy years (that is, from 1837 when the first newspaper, Aḵbār, was published) at most 91 publications had been issued in Iran, in the one year that followed the constitution alone, some 99 newspapers were published',
          lang: 'en',
          cite: {
            source: 'iranica-nabavi-journalism-qajar',
            loc: {
              section: 'JOURNALISM i. Qajar Period, During the Constitutional Revolution',
              para: '1'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/journalism-i-qajar-period/'
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
            value: { d: '1837-05-01' },
            cites: [
              { source: 'iranica-floor-cap', loc: { section: 'ČĀP', para: '20' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'The first newspaper to be issued regularly was also founded by him, on 25 Moḥarram 1253/1 May 1837; it was called Aḵbār-e waqāyeʿ (Current news [from Tehran]) and was printed by lithography.',
        lang: 'en',
        cite: { source: 'iranica-floor-cap', loc: { section: 'ČĀP', para: '20' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/cap-print-printing-a-persian-word-probably-derived-from-hindi-chapna/'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/63/The_Rabi_al-Thani_1253_%285_July_1837_%E2%80%93_2_August_1837%29_issue_of_Kaghaz-e_Akhbar.jpg/1280px-The_Rabi_al-Thani_1253_%285_July_1837_%E2%80%93_2_August_1837%29_issue_of_Kaghaz-e_Akhbar.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:The_Rabi_al-Thani_1253_(5_July_1837_%E2%80%93_2_August_1837)_issue_of_Kaghaz-e_Akhbar.jpg',
    credit: { institution: 'British Library' },
    license: { id: 'public-domain' }
  }
})
