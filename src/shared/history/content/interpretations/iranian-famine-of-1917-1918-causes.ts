import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'iranian-famine-of-1917-1918-causes',
  about: ['event:iranian-famine-of-1917-1918'],
  topic: 'causes',
  researched: '2026-10-06',
  positions: [
    {
      id: 'drought-and-requisitioning',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Touraj Atabaki' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'Nor was nature benevolent to the country’s poor: successive seasonal droughts caused widespread famine during 1917/1918. Requisition and confiscation of foodstuffs by occupying armies to feed their soldiers added to the famine.',
          lang: 'en',
          cite: {
            source: 'eo1418-atabaki-persia-iran',
            loc: { section: 'Iranian Politics and Society in Wartime', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/persiairan/'
          }
        },
        {
          id: 'q2',
          text: 'The requisitioning of pack animals, mules and camels for the oil industry15 in Khuzestan, and for the British and Russian armed forces, left the country’s transport network in serious disarray, and disrupted the distribution of foodstuffs and other goods throughout the country – with disastrous consequences.',
          lang: 'en',
          cite: {
            source: 'eo1418-atabaki-persia-iran',
            loc: { section: 'Iranian Politics and Society in Wartime', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/persiairan/'
          }
        }
      ]
    },
    {
      id: 'foreign-intervention-and-misrule',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Yousef Motavalli Haghighi' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'Foreign intervention and the irresponsibility of the governors of Khorasan in the last years of the First World War caused famine, exorbitant prices for food and goods, and made life difficult for the Khorasani masses.',
          lang: 'en',
          cite: {
            source: 'iranica-motavalli-haghighi-khorasan-qajar-pahlavi',
            loc: { section: 'KHORASAN xi. History in the Qajar and Pahlavi Periods', para: '26' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/khorasan-xi-history-in-the-qajar-and-pahlavi-periods'
          }
        }
      ]
    },
    {
      id: 'hoarding-and-speculation',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Touraj Atabaki' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'In Tehran, the situation was “aggravated by hoarding and short-selling to the customers by bakers”.',
          lang: 'en',
          cite: {
            source: 'eo1418-atabaki-persia-iran',
            loc: { section: 'Iranian Politics and Society in Wartime', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/persiairan/'
          }
        }
      ]
    }
  ]
})
