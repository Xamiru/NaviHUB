import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'iranian-famine-of-1917-1918',
  names: [
    { text: 'Iranian famine of 1917–1918', lang: 'en', role: 'primary' },
    { text: 'قحطی بزرگ', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-06',
  type: 'famine',
  start: {
    alts: [
      {
        value: { d: '1917' },
        cites: [
          {
            source: 'eo1418-atabaki-persia-iran',
            loc: { section: 'Iranian Politics and Society in Wartime', para: '9' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1918' },
        cites: [
          {
            source: 'eo1418-atabaki-persia-iran',
            loc: { section: 'Iranian Politics and Society in Wartime', para: '9' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 2,
  places: [
    {
      ref: 'place:tehran',
      cites: [
        {
          source: 'eo1418-atabaki-persia-iran',
          loc: { section: 'Iranian Politics and Society in Wartime', para: '10' }
        }
      ]
    },
    {
      ref: 'place:kermanshah',
      cites: [
        {
          source: 'eo1418-atabaki-persia-iran',
          loc: { section: 'Iranian Politics and Society in Wartime', para: '10' }
        }
      ]
    },
    {
      ref: 'place:hamadan',
      cites: [
        {
          source: 'eo1418-atabaki-persia-iran',
          loc: { section: 'Iranian Politics and Society in Wartime', para: '11' }
        }
      ]
    },
    {
      ref: 'place:mashhad',
      cites: [
        {
          source: 'iranica-motavalli-haghighi-khorasan-qajar-pahlavi',
          loc: { section: 'KHORASAN xi. History in the Qajar and Pahlavi Periods', para: '26' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:reign-of-ahmad-shah-qajar' },
    { ref: 'period:qajar-dynasty' }
  ],
  related: [
    {
      ref: 'event:iran-in-the-first-world-war',
      rel: 'caused-by',
      cites: [
        {
          source: 'eo1418-atabaki-persia-iran',
          loc: { section: 'Iranian Politics and Society in Wartime', para: '9' }
        },
        {
          source: 'iranica-motavalli-haghighi-khorasan-qajar-pahlavi',
          loc: { section: 'KHORASAN xi. History in the Qajar and Pahlavi Periods', para: '26' }
        }
      ]
    },
    { ref: 'event:influenza-pandemic-of-1918', rel: 'related' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Not only the political scene looked gloomy in Iran during those years. For most of Iran’s working poor, the First World War brought nothing but misery.',
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
          text: 'And if that were not enough, a series of severe droughts from 1916 on further depleted agricultural supplies. By early February 1918, the famine spread all over the country, and panicked crowds in major cities began to loot bakeries and food stores.',
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
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'In the western city of Kermanshah, confrontations between the hungry poor and the police ended in casualties.',
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
        },
        {
          id: 'q4',
          text: 'A British officer in north-west Iran and south Caucasus refers in his eyewitness account to the devastating famine and disease in Hamadan, which brought 30 percent of the city’s 50,000 inhabitants to the verge of starvation, and caused many deaths. Cases of cannibalism were also reported.',
          lang: 'en',
          cite: {
            source: 'eo1418-atabaki-persia-iran',
            loc: { section: 'Iranian Politics and Society in Wartime', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/persiairan/'
          }
        },
        {
          id: 'q5',
          text: 'These measures encouraged productivity and while famine ruled in the rest of Iran, agricultural production in Gilān reached an all time high.',
          lang: 'en',
          cite: {
            source: 'iranica-dailami-jangali-movement',
            loc: { section: 'JANGALI MOVEMENT', para: '32' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/jangali-movement'
          }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q6',
          text: 'Beyond deaths from starvation, epidemics also killed many people.',
          lang: 'en',
          cite: {
            source: 'eo1418-atabaki-persia-iran',
            loc: { section: 'Iranian Politics and Society in Wartime', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/persiairan/'
          }
        },
        {
          id: 'q7',
          text: 'Although there is no accurate report on casualties among the people of Khorasan during the period of World War I, it was, according to some estimates, one of the deadliest eras in Iran and in the history of Khorasan in the modern period (Majd, 2008, pp. 59-67, tr. pp. 85-91).',
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
      kind: 'aftermath',
      quotes: [
        {
          id: 'q8',
          text: 'Nevertheless, in this turbulent post-war era neither the national government nor foreign powers were in a position to do much to alleviate the human crises. The devastation caused by famine and contagious diseases continued for many years.',
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
