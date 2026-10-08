import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'downfall-of-hajji-ebrahim-kalantar',
  names: [
    { text: 'Downfall of Hajji Ebrahim Kalantar', lang: 'en', role: 'primary' },
    { text: 'قتل حاج ابراهیم کلانتر', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'other',
  start: {
    alts: [
      {
        value: { d: '1801-04-14' },
        cites: [
          {
            source: 'iranica-amanat-fath-ali-shah',
            loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '7' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 3,
  partOf: [
    { ref: 'period:reign-of-fath-ali-shah' }
  ],
  polities: [
    { ref: 'polity:qajar-iran' }
  ],
  participants: [
    {
      ref: 'person:fath-ali-shah-qajar',
      role: 'head-of-state',
      cites: [
        {
          source: 'iranica-amanat-fath-ali-shah',
          loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '7' }
        }
      ]
    },
    {
      name: 'Ebrāhīm Khan Šīrāzī',
      role: 'victim',
      cites: [
        {
          source: 'iranica-amanat-fath-ali-shah',
          loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '7' }
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
          text: 'Shortly before Ḥosaynqolī’s second revolt, on 1 Ḏu’l-ḥejja 1215/14 April 1801 Fatḥ-ʿAlī Shah also ordered the removal and later the execution of his first grand vizier, Ebrāhīm Khan Šīrāzī, on charges of treason and destroyed nearly his entire family.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-fath-ali-shah',
            loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/fath-ali-shah'
          }
        },
        {
          id: 'q2',
          text: 'He was falsely accused by the Māzandarān rival faction in the administration of being Ḥosaynqolī Khan’s co-conspirator, but the real reason for his downfall was the shah’s deep fear of his minister.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-fath-ali-shah',
            loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/fath-ali-shah'
          }
        },
        {
          id: 'q3',
          text: 'Ebrāhīm Khan was blinded in both eyes and his tongue was cut off, presumably because he dared to admonish the shah for ungratefulness toward him, before being sent into exile, where he was soon after put to death.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-fath-ali-shah',
            loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '7' }
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
          id: 'q4',
          text: 'His downfall ended the monopoly of the Fārs notables over the nascent Qajar administration in the southern provinces and allowed the shah greater control over appointments, revenue, and his private life.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-fath-ali-shah',
            loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/fath-ali-shah'
          }
        }
      ]
    }
  ]
})
