import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'tripartite-treaty-of-alliance-1942',
  names: [
    { text: 'Tripartite Treaty of Alliance (1942)', lang: 'en', role: 'primary' },
    { text: 'پیمان سه‌جانبه', lang: 'fa', role: 'native' },
    {
      text: 'Union Treaty',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-mamedova-russia-iranian-soviet-relations',
          loc: { section: 'RUSSIA ii. IRANIAN-SOVIET RELATIONS (1917-1991)', para: '20' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  type: 'treaty',
  start: {
    alts: [
      {
        value: { d: '1942-01-29' },
        cites: [
          {
            source: 'iranica-kuniholm-azerbaijan-1941-1947',
            loc: { section: 'AZERBAIJAN v. History from 1941 to 1947', para: '3' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'europe', 'russia-central-asia'],
  prominence: 2,
  partOf: [
    { ref: 'event:second-world-war' },
    { ref: 'period:reign-of-mohammad-reza-shah' }
  ],
  related: [
    {
      ref: 'event:anglo-soviet-invasion-of-iran',
      rel: 'response-to',
      cites: [
        {
          source: 'iranica-kuniholm-azerbaijan-1941-1947',
          loc: { section: 'AZERBAIJAN v. History from 1941 to 1947', para: '3' }
        }
      ]
    },
    { ref: 'event:iran-crisis-of-1946', rel: 'related' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The terms of occupation, meanwhile, were set in the Tripartite Treaty of Alliance (29 January, 1942), under which Britain and Russia agreed to respect the territorial integrity, sovereignty, and political independence of Iran (Art. 1) and to withdraw from Iran within six months of an armistice between the allied and axis powers (Art. 5).',
          lang: 'en',
          cite: {
            source: 'iranica-kuniholm-azerbaijan-1941-1947',
            loc: { section: 'AZERBAIJAN v. History from 1941 to 1947', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/azerbaijan-v/'
          }
        },
        {
          id: 'q2',
          text: 'The Tripartite Treaty is signed between Iran, Britain, and the Soviet Union, allowing the Allies to remain in Iran for the duration of the War.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-3',
            loc: { section: 'Chronology of Iranian History Part 3, 1942' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-3/'
          }
        },
        {
          id: 'q3',
          text: 'In addition, in January 1942 Iran signed a tripartite treaty of alliance with Britain and the Soviet Union under which Iran agreed to extend nonmilitary assistance to the war effort. The two Allied powers, in turn, agreed to respect Iran\'s independence and territorial integrity and to withdraw their troops from Iran within six months of the end of hostilities.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'WORLD WAR II AND THE AZARBAIJAN CRISIS', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/iran/16.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q4',
          text: 'In spite of this treaty, however, and the Declaration Regarding Iran (1 December, 1943), which provided for British, Russian, and American commitments to Iran’s sovereignty and territorial integrity, Soviet policies ignored Iran’s political independence.',
          lang: 'en',
          cite: {
            source: 'iranica-kuniholm-azerbaijan-1941-1947',
            loc: { section: 'AZERBAIJAN v. History from 1941 to 1947', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/azerbaijan-v/'
          }
        },
        {
          id: 'q5',
          text: 'By March 2, the date set under the Tripartite Treaty for the withdrawal of all foreign troops from Iran, British and U.S. troops had withdrawn, but Soviet troops had not.',
          lang: 'en',
          cite: {
            source: 'iranica-kuniholm-azerbaijan-1941-1947',
            loc: { section: 'AZERBAIJAN v. History from 1941 to 1947', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/azerbaijan-v/'
          }
        }
      ]
    }
  ]
})
