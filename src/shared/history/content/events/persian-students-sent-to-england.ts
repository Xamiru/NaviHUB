import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'persian-students-sent-to-england',
  names: [
    { text: 'First Persian students sent to England', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  type: 'reform',
  start: {
    alts: [
      {
        value: { d: '1811' },
        cites: [
          {
            source: 'iranica-matin-asgari-education-abroad',
            loc: { section: 'EDUCATION xxi. EDUCATION ABROAD', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'europe'],
  prominence: 3,
  places: [
    { ref: 'place:tabriz' }
  ],
  partOf: [
    { ref: 'period:qajar-dynasty' }
  ],
  participants: [
    {
      ref: 'person:abbas-mirza',
      role: 'organizer',
      cites: [
        {
          source: 'iranica-matin-asgari-education-abroad',
          loc: { section: 'EDUCATION xxi. EDUCATION ABROAD', para: '1' }
        }
      ]
    },
    {
      ref: 'person:mirza-bozorg-qaem-maqam',
      role: 'organizer',
      cites: [
        {
          source: 'iranica-matin-asgari-education-abroad',
          loc: { section: 'EDUCATION xxi. EDUCATION ABROAD', para: '1' }
        }
      ]
    },
    {
      name: 'Mīrzā Ṣāleḥ Šīrāzī',
      role: 'participant',
      cites: [
        {
          source: 'iranica-matin-asgari-education-abroad',
          loc: { section: 'EDUCATION xxi. EDUCATION ABROAD', para: '1' }
        }
      ]
    },
    {
      name: 'Mīrzā Jaʿfar Khan Tabrīzī',
      role: 'participant',
      cites: [
        {
          source: 'iranica-matin-asgari-education-abroad',
          loc: { section: 'EDUCATION xxi. EDUCATION ABROAD', para: '1' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'Persian awareness of a need to learn from Europeans arose in the wake of major military defeats and territorial losses in two wars with Russia in the early 19th century.',
          lang: 'en',
          cite: {
            source: 'iranica-matin-asgari-education-abroad',
            loc: { section: 'EDUCATION xxi. EDUCATION ABROAD', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/education-xxii-education-abroad-1/'
          }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q2',
          text: 'In 1226/1811 Crown Prince ʿAbbās Mīrzā (q.v.) and his vizier, Mīrzā Bozorg Qāʾem-Maqām, sent two Persians to study in England, followed by five more in 1230/1815. They were to study engineering, medicine, and military technology.',
          lang: 'en',
          cite: {
            source: 'iranica-matin-asgari-education-abroad',
            loc: { section: 'EDUCATION xxi. EDUCATION ABROAD', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/education-xxii-education-abroad-1/'
          }
        },
        {
          id: 'q3',
          text: 'ʿAbbās Mīrzā had sent a number of students to England to become familiar with modern technology.',
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
      kind: 'legacy',
      quotes: [
        {
          id: 'q4',
          text: 'Among the second group were Mīrzā Ṣāleḥ Šīrāzī, who wrote the first detailed account of a parliamentary system published in Persia and in 1252/1836 issued the first Persian printed book and newspaper, and Mīrzā Jaʿfar Khan Tabrīzī, who as Mošīr-al-Dawla became a close adviser to Nāṣer-al-Dīn Shah',
          lang: 'en',
          cite: {
            source: 'iranica-matin-asgari-education-abroad',
            loc: { section: 'EDUCATION xxi. EDUCATION ABROAD', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/education-xxii-education-abroad-1/'
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
            value: { d: '1819' },
            cites: [
              { source: 'iranica-floor-cap', loc: { section: 'ČĀP', para: '11' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q5',
        text: 'One of them was Mīrzā Ṣāleḥ Šīrāzī, who, according to his own report (pp. 344-45), apprenticed himself to a London publishing house that specialized in printing the New Testament in Persian, Hindi, Syriac, Arabic, and other languages. He returned to Iran in 1234/1819, taking with him a small printing press and some other materials (p. 353).',
        lang: 'en',
        cite: { source: 'iranica-floor-cap', loc: { section: 'ČĀP', para: '11' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/cap-print-printing-a-persian-word-probably-derived-from-hindi-chapna/'
        }
      }
    }
  ]
})
