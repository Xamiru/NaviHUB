import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: '1959-tibetan-uprising-naming',
  about: ['event:1959-tibetan-uprising'],
  topic: 'naming',
  positions: [
    {
      id: 'armed-rebellion',
      category: 'official',
      holders: [
        { kind: 'state', name: 'People’s Republic of China' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'With the support of foreign anti-China forces, the reactionary clique of Tibet\'s upper class elaborately plotted and instigated a full-scale armed rebellion in Lhasa on March 10, 1959.',
          lang: 'en',
          cite: {
            source: 'prc-white-paper-2009-fifty-years-of-democratic-reform-in-tibet',
            loc: { section: 'Fifty Years of Democratic Reform in Tibet' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://be.china-embassy.gov.cn/eng/zbjl/200903/t20090320_2088890.htm'
          }
        },
        {
          id: 'q2',
          text: 'However, some members of the Tibetan ruling class were hostile to reform, and wanted to preserve serfdom forever so as to maintain their own vested interests and privileges. They deliberately violated and undermined the "17-Article Agreement," and intensified their efforts to split the motherland, and finally they staged armed rebellions.',
          lang: 'en',
          cite: {
            source: 'prc-white-paper-2009-fifty-years-of-democratic-reform-in-tibet',
            loc: { section: 'Fifty Years of Democratic Reform in Tibet' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://be.china-embassy.gov.cn/eng/zbjl/200903/t20090320_2088890.htm'
          }
        },
        {
          id: 'q3',
          text: 'After the Dalai Lama left Lhasa, about 7,000 rebels gathered towage a full-scale attack on the Party, government and military institutions early in the morning on March 20, 1959. The PLA, driven beyond forbearance, launched, under orders, a counterattack at 10 a.m. the same day.',
          lang: 'en',
          cite: {
            source: 'prc-white-paper-2009-fifty-years-of-democratic-reform-in-tibet',
            loc: { section: 'Fifty Years of Democratic Reform in Tibet' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://be.china-embassy.gov.cn/eng/zbjl/200903/t20090320_2088890.htm'
          }
        }
      ]
    },
    {
      id: 'peaceful-uprising',
      category: 'official',
      holders: [
        { kind: 'participant', name: 'Tenzin Gyatso, the 14th Dalai Lama' },
        { kind: 'organization', name: 'Office of His Holiness the Dalai Lama' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'Today is the fiftieth anniversary of the Tibetan people’s peaceful uprising against Communist China’s repression in Tibet.',
          lang: 'en',
          cite: {
            source: 'dalai-lama-2009-03-10-statement-50th-anniversary-uprising',
            loc: {
              section: 'Statement on the Fiftieth Anniversary of the Tibetan National Uprising Day',
              para: '1'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.dalailama.com/messages/tibet/10th-march-archive/2009'
          }
        },
        {
          id: 'q5',
          text: 'From about 1956 onwards, however, the situation took a turn for the worse with the imposition of ultra-leftist policies in Tibet.',
          lang: 'en',
          cite: {
            source: 'dalai-lama-2009-03-10-statement-50th-anniversary-uprising',
            loc: {
              section: 'Statement on the Fiftieth Anniversary of the Tibetan National Uprising Day',
              para: '3'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.dalailama.com/messages/tibet/10th-march-archive/2009'
          }
        }
      ]
    }
  ],
  researched: '2026-10-07'
})
