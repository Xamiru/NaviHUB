import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'qajar-capture-of-mashhad-1802',
  names: [
    { text: 'Qajar capture of Mashhad (1802)', lang: 'en', role: 'primary' },
    { text: 'تصرف مشهد به دست قاجاریان', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'battle',
  start: {
    alts: [
      {
        value: { d: '1802-05' },
        cites: [
          {
            source: 'iranica-amanat-fath-ali-shah',
            loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '8' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 3,
  places: [
    { ref: 'place:mashhad' }
  ],
  partOf: [
    { ref: 'period:reign-of-fath-ali-shah' }
  ],
  polities: [
    { ref: 'polity:qajar-iran' }
  ],
  participants: [
    {
      ref: 'person:fath-ali-shah-qajar',
      role: 'commander',
      cites: [
        {
          source: 'iranica-amanat-fath-ali-shah',
          loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '8' }
        }
      ]
    },
    {
      name: 'Ḥosayn Khan Qājār Qazvīnī',
      role: 'commander',
      cites: [
        {
          source: 'iranica-amanat-fath-ali-shah',
          loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '8' }
        }
      ]
    },
    {
      name: 'Solṭān Nāder Mīrzā',
      role: 'victim',
      cites: [
        {
          source: 'iranica-amanat-fath-ali-shah',
          loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '8' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Fatḥ-ʿAlī Shah’s first and second Khorasan campaigns in Moḥarram 1213/June 1798 and again in Ṣafar 1215/June 1800 failed despite much ravaging and destruction by the Qajar troops, but the third campaign in Moḥarram 1217/May 1802, which was led by the shah himself, was more successful, resulting in the capture of Mašhad by Ḥosayn Khan Qājār Qazvīnī (the Sardār).',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-fath-ali-shah',
            loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/fath-ali-shah'
          }
        },
        {
          id: 'q2',
          text: 'After the chief mojtahed of Mašhad, Mīrzā Moḥammad-Mahdī, switched to the Qajar side, Solṭān Nāder Mīrzā, Nāder Shah’s grandson, was captured and brought to Tehran where he was executed in Moḥarram 1218/March 1803 in the presence of the shah.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-fath-ali-shah',
            loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/fath-ali-shah'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q3',
          text: 'The capture of Mašhad was a boost to the shah’s prestige and a prelude to future campaigns for the conquest of Herat.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-fath-ali-shah',
            loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/fath-ali-shah'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8e/Main_Gate_of_Imam_Riza%2C_Mashhad%2C_Iran-1850s.jpg/1280px-Main_Gate_of_Imam_Riza%2C_Mashhad%2C_Iran-1850s.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Main_Gate_of_Imam_Riza,_Mashhad,_Iran-1850s.jpg',
    credit: { institution: 'Metropolitan Museum of Art' },
    license: { id: 'public-domain' }
  }
})
