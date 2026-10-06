import { definePerson } from '../../schema'

export default definePerson({
  id: 'mirza-bozorg-qaem-maqam',
  names: [
    { text: 'Mirza Bozorg Qa’em-maqam', lang: 'en', role: 'primary' },
    { text: 'میرزا بزرگ قائم‌مقام فراهانی', lang: 'fa', role: 'native' },
    {
      text: 'Mīrzā ʿĪsā Farāhānī',
      lang: 'fa-Latn',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-busse-abbas-mirza',
          loc: { section: 'ʿABBĀS MĪRZĀ QAJAR', para: '2' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  died: {
    alts: [
      {
        value: { d: '1821' },
        cites: [
          {
            source: 'iranica-amanat-fath-ali-shah',
            loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '35' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  roles: ['politician'],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Mīrzā Bozorg Farāhānī the Qāʾem-maqām, minister to ʿAbbās Mīrzā in Azarbaijan and perhaps the most capable statesman of the Fatḥ-ʿAlī Shah period (d. 1237/1821)',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-fath-ali-shah',
            loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '35' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/fath-ali-shah'
          }
        },
        {
          id: 'q2',
          text: 'The crown prince was apparently carefully educated in the traditional manner—a process which must have been decisively influenced by Mīrzā Bozorg.',
          lang: 'en',
          cite: {
            source: 'iranica-busse-abbas-mirza',
            loc: { section: 'ʿABBĀS MĪRZĀ QAJAR', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/abbas-mirza'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q3',
          text: 'The Russians had been periodically interested in finding a negotiated settlement since the setbacks of 1805-6 and as recently as 1810, when Alexander Tormasov, who had replaced Gudovich as commander after his unsuccessful siege of Erevan, and Mirzā Bozorg Qāʾem-maqām had sought to arrange an armistice',
          lang: 'en',
          cite: {
            source: 'iranica-daniel-golestan-treaty',
            loc: { section: 'GOLESTĀN TREATY', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/golestan-treaty/'
          }
        },
        {
          id: 'q4',
          text: 'The treaty of Golestān was naturally a great disappointment for the Persians and was bitterly opposed by officials such as Mirzā Bozorg.',
          lang: 'en',
          cite: {
            source: 'iranica-daniel-golestan-treaty',
            loc: { section: 'GOLESTĀN TREATY', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/golestan-treaty/'
          }
        }
      ]
    }
  ]
})
