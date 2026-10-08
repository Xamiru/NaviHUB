import { definePerson } from '../../schema'

export default definePerson({
  id: 'qazi-muhammad',
  names: [
    { text: 'Qazi Muhammad', lang: 'en', role: 'primary' },
    { text: 'قاضی محمد', lang: 'fa', role: 'native' },
    {
      text: 'Qāżi Moḥammad',
      lang: 'fa-Latn',
      role: 'alternative',
      cites: [
        { source: 'iranica-ziai-qazi-mohammad', loc: { section: 'QAZI, Mohammad', para: '3' } }
      ]
    }
  ],
  researched: '2026-10-06',
  born: {
    alts: [
      {
        value: { d: '1893' },
        cites: [
          {
            source: 'iranica-ziai-qazi-mohammad',
            loc: { section: 'QAZI, Mohammad', para: '3' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1947' },
        cites: [
          {
            source: 'iranica-ziai-qazi-mohammad',
            loc: { section: 'QAZI, Mohammad', para: '3' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  roles: ['cleric', 'politician'],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Qāżi Moḥammad (1893-1947), founder of the Kurdish Democratic Party and head of the Republic of Mahābād, who was executed by hanging in 1947',
          lang: 'en',
          cite: {
            source: 'iranica-ziai-qazi-mohammad',
            loc: { section: 'QAZI, Mohammad', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/qazi-mohammad/'
          }
        },
        {
          id: 'q2',
          text: 'On December 15, Qāżī Moḥammad, an hereditary judge and religious leader of Mahābād, inaugurated the Kurdish Republic',
          lang: 'en',
          cite: {
            source: 'iranica-kuniholm-azerbaijan-1941-1947',
            loc: { section: 'AZERBAIJAN v. History from 1941 to 1947', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/azerbaijan-v/'
          }
        }
      ]
    },
    {
      kind: 'later-life',
      quotes: [
        {
          id: 'q3',
          text: 'By 21 Āḏar 1325 Š./13 December 1946, Pīšavarī had fled to Baku and Iranian forces entered Tabrīz. Two days later, on December 15, Qāżī Moḥammad announced the surrender of Mahābād.',
          lang: 'en',
          cite: {
            source: 'iranica-kuniholm-azerbaijan-1941-1947',
            loc: { section: 'AZERBAIJAN v. History from 1941 to 1947', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/azerbaijan-v/'
          }
        }
      ]
    }
  ]
})
