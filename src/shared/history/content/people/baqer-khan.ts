import { definePerson } from '../../schema'

export default definePerson({
  id: 'baqer-khan',
  names: [
    { text: 'Baqer Khan', lang: 'en', role: 'primary' },
    { text: 'باقرخان', lang: 'fa', role: 'native' },
    {
      text: 'Sālār-e Mellī',
      lang: 'fa-Latn',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-amanat-baqer-khan',
          loc: { section: 'BĀQER KHAN SĀLĀR-E MELLI', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1870', notAfter: '1879' },
        cites: [
          {
            source: 'iranica-amanat-baqer-khan',
            loc: { section: 'BĀQER KHAN SĀLĀR-E MELLI', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1916-11' },
        cites: [
          {
            source: 'iranica-amanat-baqer-khan',
            loc: { section: 'BĀQER KHAN SĀLĀR-E MELLI', para: '6' }
          }
        ]
      }
    ]
  },
  bornIn: {
    ref: 'place:tabriz',
    cites: [
      {
        source: 'iranica-amanat-baqer-khan',
        loc: { section: 'BĀQER KHAN SĀLĀR-E MELLI', para: '1' }
      }
    ]
  },
  regions: ['iran'],
  roles: ['revolutionary', 'military'],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Son of Ḥājī Reżā, he was born in Tabrīz in the 1870s and was a bricklayer by profession before emerging as the chief lūṭī of the Ḵīābān quarter, one of the largest in Tabrīz, located in the extreme east of the city and home of some middle rank pro-Constitution ʿolamāʾ.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-baqer-khan',
            loc: { section: 'BĀQER KHAN SĀLĀR-E MELLI', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/baqer-khan-salar-melli/'
          }
        },
        {
          id: 'q2',
          text: 'Bāqer Khan was said to be a bold and short-tempered patriot, a good example of the popular hero with loyalties not only to his own quarter and city, but to the whole of the Constitutional ideals.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-baqer-khan',
            loc: { section: 'BĀQER KHAN SĀLĀR-E MELLI', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/baqer-khan-salar-melli/'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q3',
          text: 'In Moḥarram, 1335/November, 1916, in the confused days just before the British advance in northern Iraq, while wandering in the border villages near Qaṣr-e Šīrīn, he was offered overnight shelter by the Kurdish bandit Moḥammad-Amīn Ṭālebānī who on the same night murdered him and all his party and dumped their bodies nearby.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-baqer-khan',
            loc: { section: 'BĀQER KHAN SĀLĀR-E MELLI', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/baqer-khan-salar-melli/'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/4d/Sattar_khan_and_Bagir_khan.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Sattar_khan_and_Bagir_khan.jpg',
    credit: {
      institution: 'Azərbaycan Respublikası Prezidentinin İşlər İdarəsinin Siyasi Sənədlər Arxivi'
    },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'kasravi-1939-tarikh-e-hejdah-saleh-ye-azarbayjan', perspective: 'iranian' },
    { source: 'safai-1963-rahbaran-e-mashruteh', perspective: 'iranian' }
  ]
})
