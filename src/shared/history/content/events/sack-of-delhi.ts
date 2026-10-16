import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'sack-of-delhi',
  names: [
    { text: 'Sack of Delhi', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-16',
  type: 'invasion',
  start: {
    alts: [
      {
        value: { d: '1398' },
        cites: [
          {
            source: 'iranica-yarshater-iran-ii2-islamic-period-page-3',
            loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period (page 3)', para: '23' }
          },
          {
            source: 'iranica-hambly-delhi-sultanate-i',
            loc: { section: 'DELHI SULTANATE i. Political and cultural history', para: '7' }
          },
          { source: 'britannica-1911-delhi', loc: { section: 'DELHI', para: '12' } }
        ]
      },
      {
        value: { d: '1397' },
        cites: [
          {
            source: 'iranica-yarshater-chronology-part-1',
            loc: { section: 'Chronology of Iranian History Part 1, 1800' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Ehsan Yarshater', discipline: 'historian' }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1399-04' },
        cites: [
          { source: 'britannica-1911-timur', loc: { section: 'TIMŪR', para: '5' } }
        ]
      }
    ]
  },
  regions: ['south-asia'],
  prominence: 3,
  places: [
    {
      ref: 'place:delhi',
      cites: [
        { source: 'britannica-1911-delhi', loc: { section: 'DELHI', para: '12' } }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:timurid-empire',
      cites: [
        {
          source: 'iranica-yarshater-iran-ii2-islamic-period-page-3',
          loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period (page 3)', para: '23' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:timur',
      role: 'commander',
      cites: [
        { source: 'britannica-1911-timur', loc: { section: 'TIMŪR', para: '5' } }
      ]
    },
    {
      name: 'Mahmud Tughlak',
      role: 'head-of-state',
      cites: [
        { source: 'britannica-1911-delhi', loc: { section: 'DELHI', para: '12' } }
      ]
    }
  ],
  figures: [
    {
      key: 'deaths',
      value: {
        alts: [
          {
            value: { min: 100000, qualifier: 'about' },
            cites: [
              {
                source: 'iranica-yarshater-iran-ii2-islamic-period-page-3',
                loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period (page 3)', para: '23' }
              }
            ]
          }
        ]
      }
    }
  ],
  related: [
    { ref: 'event:five-years-campaign', rel: 'preceded-by' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'In 1398 he invaded India, sacked Delhi, and massacred some 100,000 people.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-iran-ii2-islamic-period-page-3',
            loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period (page 3)', para: '23' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/iran-ii2-islamic-period-page-3'
          }
        },
        {
          id: 'q2',
          text: 'Even before Tīmūr’s devastating raid on Punjab and Delhi in 800/1398-99, however, the Tughluqid state had contracted to a mere shadow of its former self, and the adventurers who ruled after Tīmūr’s withdrawal, Mallū Khan, Dawlat Khan Lōdī, and Ḵeżr Khan, had no claims to legitimacy and controlled little more than the countryside immediately surrounding Delhi.',
          lang: 'en',
          cite: {
            source: 'iranica-hambly-delhi-sultanate-i',
            loc: { section: 'DELHI SULTANATE i. Political and cultural history', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/delhi-sultanate/delhi-sultanate-i-political-and-cultural-history/'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Under the Tughluqids, especially Moḥammad b. Toḡloq (725-52/1325-51) and Fīrūz Shah (752-90/1351-88), the Delhi sultanate reached the zenith of its splendor (on the Tughluqids, see Haig; Husain, 1938; idem, 1963).',
          lang: 'en',
          cite: {
            source: 'iranica-hambly-delhi-sultanate-i',
            loc: { section: 'DELHI SULTANATE i. Political and cultural history', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/delhi-sultanate/delhi-sultanate-i-political-and-cultural-history/'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q6',
          text: 'The king fled to Gujarat, his army was defeated under the walls of Delhi, and the city surrendered.',
          lang: 'en',
          cite: { source: 'britannica-1911-delhi', loc: { section: 'DELHI', para: '12' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Delhi'
          }
        },
        {
          id: 'q7',
          text: 'The town, notwithstanding a promise of protection, was plundered and burned; the citizens were massacred.',
          lang: 'en',
          cite: { source: 'britannica-1911-delhi', loc: { section: 'DELHI', para: '12' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Delhi'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q9',
          text: 'The invaders at last retired, leaving Delhi without a government, and almost without inhabitants.',
          lang: 'en',
          cite: { source: 'britannica-1911-delhi', loc: { section: 'DELHI', para: '12' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Delhi'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q10',
          text: 'At the time of Tīmūr’s invasion of Hindustan (800/1398-99) the leading disciple of Čerāḡ-e Dehlī, Moḥammad Ḥosaynī “Gīsū Derāz” (d. 825/1422), abandoned Delhi for the Deccan, where he established himself at Golbarga',
          lang: 'en',
          cite: {
            source: 'iranica-hambly-delhi-sultanate-i',
            loc: { section: 'DELHI SULTANATE i. Political and cultural history', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/delhi-sultanate/delhi-sultanate-i-political-and-cultural-history/'
          }
        },
        {
          id: 'q11',
          text: 'It need scarcely be added that an immense quantity of spoil was conveyed away.',
          lang: 'en',
          cite: { source: 'britannica-1911-timur', loc: { section: 'TIMŪR', para: '5' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Tim%C5%ABr'
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
            value: { d: '1398' },
            cites: [
              { source: 'britannica-1911-delhi', loc: { section: 'DELHI', para: '12' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'In 1398, during the reign of Mahmud Tughlak, occurred the Tatar invasion of Timurlane.',
        lang: 'en',
        cite: { source: 'britannica-1911-delhi', loc: { section: 'DELHI', para: '12' } },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Delhi'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1398-09-12' },
            cites: [
              { source: 'britannica-1911-timur', loc: { section: 'TIMŪR', para: '5' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'In 1398, when Timūr was more than sixty years of age, Farishta tells us that, “informed of the commotions and civil wars of India,” he “began his expedition into that country,” and on the 12th of September “arrived on the banks of the Indus.”',
        lang: 'en',
        cite: { source: 'britannica-1911-timur', loc: { section: 'TIMŪR', para: '5' } },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Tim%C5%ABr'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1399-04' },
            cites: [
              { source: 'britannica-1911-timur', loc: { section: 'TIMŪR', para: '5' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'In April 1399, some three months after quitting the capital of Mahmūd Toghluk, Timūr was back in his own capital beyond the Oxus.',
        lang: 'en',
        cite: { source: 'britannica-1911-timur', loc: { section: 'TIMŪR', para: '5' } },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Tim%C5%ABr'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/7b/I.O._Islamic_137_f.284v_Timur%27s_Defeat_of_Amlu_Khan_and_the_Capture_of_Delhi_in_1398%2C_from_the_%27Zafarnama%27_by_Sharaf_al-Din%2C_1533_%28vellum%29.jpg/1280px-I.O._Islamic_137_f.284v_Timur%27s_Defeat_of_Amlu_Khan_and_the_Capture_of_Delhi_in_1398%2C_from_the_%27Zafarnama%27_by_Sharaf_al-Din%2C_1533_%28vellum%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:I.O._Islamic_137_f.284v_Timur%27s_Defeat_of_Amlu_Khan_and_the_Capture_of_Delhi_in_1398,_from_the_%27Zafarnama%27_by_Sharaf_al-Din,_1533_(vellum).jpg',
    credit: { institution: 'British Library', creator: 'Persian school, 1533' },
    license: { id: 'public-domain' }
  }
})
