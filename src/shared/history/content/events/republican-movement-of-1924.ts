import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'republican-movement-of-1924',
  names: [
    { text: 'Republican movement of 1924', lang: 'en', role: 'primary' },
    { text: 'جمهوری‌خواهی', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'movement',
  start: {
    alts: [
      {
        value: { d: '1924-03-13' },
        cites: [
          {
            source: 'iranica-sheikh-ol-islami-ahmad-shah',
            loc: { section: 'AḤMAD SHAH QĀJĀR', para: '15' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1924-04-01' },
        cites: [
          {
            source: 'iranica-sheikh-ol-islami-ahmad-shah',
            loc: { section: 'AḤMAD SHAH QĀJĀR', para: '15' }
          }
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
        {
          source: 'iranica-sheikh-ol-islami-ahmad-shah',
          loc: { section: 'AḤMAD SHAH QĀJĀR', para: '15' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:qajar-dynasty' }
  ],
  polities: [
    { ref: 'polity:qajar-iran' }
  ],
  participants: [
    {
      ref: 'person:reza-shah-pahlavi',
      role: 'leader',
      cites: [
        {
          source: 'iranica-sheikh-ol-islami-ahmad-shah',
          loc: { section: 'AḤMAD SHAH QĀJĀR', para: '15' }
        },
        {
          source: 'iranica-yarshater-iranian-history-islamic-period-5',
          loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Qajar period' }
        }
      ]
    },
    {
      ref: 'person:ahmad-shah-qajar',
      role: 'head-of-state',
      cites: [
        {
          source: 'iranica-sheikh-ol-islami-ahmad-shah',
          loc: { section: 'AḤMAD SHAH QĀJĀR', para: '16' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:proclamation-of-the-republic-of-turkey',
      rel: 'related',
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-2',
          loc: { section: 'Chronology of Iranian History Part 2, 1924' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q2',
          text: 'On 13 March 1924, the Majlis met in extraordinary session and appointed a special committee to consider the question of proclaiming a republic.',
          lang: 'en',
          cite: {
            source: 'iranica-sheikh-ol-islami-ahmad-shah',
            loc: { section: 'AḤMAD SHAH QĀJĀR', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/ahmad-shah-qajar-1909-1925-the-seventh-and-last-ruler-of-the-qajar-dynasty/'
          }
        },
        {
          id: 'q1',
          text: 'With the shah’s departure, an extensive campaign, encouraged by Reżā Khan, was initiated in favor of the abolition of the monarchy and the establishment of a republic on the model of neighboring Turkey.',
          lang: 'en',
          cite: {
            source: 'iranica-sheikh-ol-islami-ahmad-shah',
            loc: { section: 'AḤMAD SHAH QĀJĀR', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/ahmad-shah-qajar-1909-1925-the-seventh-and-last-ruler-of-the-qajar-dynasty/'
          }
        },
        {
          id: 'q3',
          text: 'However, the ulema’s fear of anti-religious sentiments in the Republican regime of Turkey leads to widespread demonstrations against such regime change, but the clerics support the idea of Reżā Khan’s election as shah.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1924' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-2/'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'Iranian ʿolamāʾ , who feared that the proclamation of a republic in Iran would have similar consequences for the role of Islam and the religious establishment in their country (Survey of International Affairs 3, 1925, p. 537). They threw themselves into the anti-republican campaign and incited the people to invade Bahārestān Square, where the Majlis was on the point of debating the proposed constitutional changes.',
          lang: 'en',
          cite: {
            source: 'iranica-sheikh-ol-islami-ahmad-shah',
            loc: { section: 'AḤMAD SHAH QĀJĀR', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/ahmad-shah-qajar-1909-1925-the-seventh-and-last-ruler-of-the-qajar-dynasty/'
          }
        },
        {
          id: 'q5',
          text: 'The assembly adjourned without reaching a decision, and Reżā Khan soon thereafter journeyed to Qom, where he conferred with the powerful religious leaders. On his return to Tehran on April 1, he recommended that all discussion on establishing a republic cease.',
          lang: 'en',
          cite: {
            source: 'iranica-sheikh-ol-islami-ahmad-shah',
            loc: { section: 'AḤMAD SHAH QĀJĀR', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/ahmad-shah-qajar-1909-1925-the-seventh-and-last-ruler-of-the-qajar-dynasty/'
          }
        },
        {
          id: 'q6',
          text: 'From Paris Aḥmad Shah sought to turn this agitation to his own advantage. In March, 1924, he wired Reżā Khan instructing him to suppress the republican movement.',
          lang: 'en',
          cite: {
            source: 'iranica-sheikh-ol-islami-ahmad-shah',
            loc: { section: 'AḤMAD SHAH QĀJĀR', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/ahmad-shah-qajar-1909-1925-the-seventh-and-last-ruler-of-the-qajar-dynasty/'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/RezaKhanCab1.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:RezaKhanCab1.jpg',
    credit: { institution: 'Hossein Makki, Tarikh-e bistsaleh-ye Iran, vol. 3 (1979)' },
    license: { id: 'public-domain' }
  }
})
