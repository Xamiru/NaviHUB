import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'abolition-of-capitulations-in-iran',
  names: [
    { text: 'Abolition of capitulations in Iran', lang: 'en', role: 'primary' },
    { text: 'لغو کاپیتولاسیون', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'reform',
  start: {
    alts: [
      {
        value: { d: '1927-04-25' },
        cites: [
          { source: 'iranica-aqeli-davar', loc: { section: 'DĀVAR, ʿALĪ-AKBAR', para: '4' } },
          { source: 'iranica-yeganeh-civil-code', loc: { section: 'CIVIL CODE', para: '3' } }
        ]
      },
      {
        value: { d: '1928' },
        cites: [
          {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE ERA OF REZA SHAH', para: '9' }
          },
          {
            source: 'iranica-milani-iraq-pahlavi',
            loc: { section: 'IRAQ vi. PAHLAVI PERIOD, 1921-79', para: '8' }
          },
          {
            source: 'iranica-ferrier-anglo-iranian-relations-pahlavi',
            loc: { section: 'ANGLO-IRANIAN RELATIONS iii. Pahlavi period', para: '14' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 3,
  partOf: [
    { ref: 'period:pahlavi-dynasty' },
    { ref: 'period:reign-of-reza-shah' }
  ],
  polities: [
    { ref: 'polity:pahlavi-iran' }
  ],
  participants: [
    {
      ref: 'person:reza-shah-pahlavi',
      role: 'head-of-state',
      cites: [
        { source: 'iranica-aqeli-davar', loc: { section: 'DĀVAR, ʿALĪ-AKBAR', para: '4' } },
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'THE ERA OF REZA SHAH', para: '9' }
        }
      ]
    },
    {
      ref: 'person:ali-akbar-davar',
      role: 'organizer',
      cites: [
        { source: 'iranica-aqeli-davar', loc: { section: 'DĀVAR, ʿALĪ-AKBAR', para: '4' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q2',
          text: 'The capitulatory privileges of all foreigners living in Iran are abolished and foreign nationals become subject to Persian jurisdiction, ending a humiliating legacy from the Qajar era.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1927' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-2/'
          }
        },
        {
          id: 'q1',
          text: 'In 1928 he abolished the capitulations under which Europeans in Iran had, since the nineteenth century, enjoyed the privilege of being subject to their own consular courts rather than to the Iranian judiciary.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE ERA OF REZA SHAH', para: '9' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/iran/15.htm' }
        },
        {
          id: 'q3',
          text: 'On 5 Ordībehešt 1306 Š./25 April 1927 the new legal system was inaugurated in the presence of Reżā Shah, who at the same time officially terminated the capitulations',
          lang: 'en',
          cite: { source: 'iranica-aqeli-davar', loc: { section: 'DĀVAR, ʿALĪ-AKBAR', para: '4' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/davar-ali-akbar/'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q4',
          text: 'The first was to revoke the system of capitulation that authorized foreign powers to try their citizens in special consular courts, which were the judicial symbol of foreign interference with Iran’s national sovereignty.',
          lang: 'en',
          cite: {
            source: 'iranica-floor-judicial-system-20th-century',
            loc: {
              section: 'JUDICIAL AND LEGAL SYSTEMS v. JUDICIAL SYSTEM IN THE 20TH CENTURY',
              para: '20'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/judicial-and-legal-systems-v-judicial-system-in-the-20th-century/'
          }
        },
        {
          id: 'q5',
          text: 'In 1306 Š./1927 the government decided to revoke capitulations (q.v.) to foreign powers, which had permitted their citizens to be tried in special courts, and to bring the entire judiciary under Persian control; in exchange the foreign powers insisted that the government take measures to centralize and modernize the Persian judicial system',
          lang: 'en',
          cite: { source: 'iranica-aqeli-davar', loc: { section: 'DĀVAR, ʿALĪ-AKBAR', para: '4' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/davar-ali-akbar/'
          }
        },
        {
          id: 'q6',
          text: 'Reza Shah and his reformist advisors decided early on to deal with the legal system, all the more so as he was intensely against the system ofcapitulation which placed foreign nationals outside the jurisdiction of Persian courts, and its cancellation required a proper and responsible juridical system that could be presented to foreign powers as reliable.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-iranian-history-islamic-period-5',
            loc: {
              section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Reza Shah Pahlavi (1925-41)'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/iran-ii2-islamic-period-page-5/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q7',
          text: 'It had to be approved by 20 Ordibehešt, because that was the day the government intended to abolish the capitulations, which provided a major incentive to the deputies.',
          lang: 'en',
          cite: {
            source: 'iranica-floor-judicial-system-20th-century',
            loc: {
              section: 'JUDICIAL AND LEGAL SYSTEMS v. JUDICIAL SYSTEM IN THE 20TH CENTURY',
              para: '22'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/judicial-and-legal-systems-v-judicial-system-in-the-20th-century/'
          }
        },
        {
          id: 'q8',
          text: 'The two countries moved closer to the resolution of their legal dispute when in 1928 Reza Shah abolished the capitulatory regime in Iran, rendering it hypocritical for Iran to demand capitulatory rights for Persians in Iraq.',
          lang: 'en',
          cite: {
            source: 'iranica-milani-iraq-pahlavi',
            loc: { section: 'IRAQ vi. PAHLAVI PERIOD, 1921-79', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/iraq-vi-pahlavi-period-1921-79/'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e3/Davar_49.jpg/1280px-Davar_49.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Davar_49.jpg',
    credit: { institution: 'Bagher Agheli, Davar va Adliyeh (Tehran, 1990)' },
    license: { id: 'public-domain' }
  }
})
