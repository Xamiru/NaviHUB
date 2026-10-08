import { definePeriod } from '../../schema'

export default definePeriod({
  id: 'reign-of-mohammad-shah-qajar',
  names: [
    { text: 'Reign of Mohammad Shah Qajar', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  periodType: 'reign',
  start: {
    alts: [
      {
        value: { d: '1834-11-09' },
        cites: [
          {
            source: 'iranica-calmard-mohammad-shah',
            loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '7' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1848-09-05' },
        cites: [
          {
            source: 'iranica-calmard-mohammad-shah',
            loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 2,
  parent: 'period:qajar-dynasty',
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Moḥammad Shah’s reign was, in many ways, a period of renewed Sufi activities and a subsequent decline of the Oṣuli Imami clerical influence (Amanat, 1988, p. 109).',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-mohammad-shah',
            loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/mohammad-shah'
          }
        },
        {
          id: 'q2',
          text: 'Socio-economic difficulties were further aggravated by outbreaks of cholera.',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-mohammad-shah',
            loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '19' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/mohammad-shah'
          }
        },
        {
          id: 'q3',
          text: 'The absolute nature of the monarchy, inherited from the Safavids, was maintained.',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-mohammad-shah',
            loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '19' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/mohammad-shah'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'Moḥammad Shah’s expedition to Herat in 1838–39, to pacify the region and reassert Persian claim over the province, encountered further British opposition.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '12'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/great-britain-ii/'
          }
        },
        {
          id: 'q4',
          text: 'Soon after, the terms of the 1841 Treaty of Commerce gave Britain capitulatory advantages in custom duties and other areas on a par with those enjoyed by Russia after 27 years of Persian resistance (Hurewitz, II, p. 280).',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '12'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/great-britain-ii/'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Portrait_of_Muhammad_Shah_Qadjar_-_MV_6700_-_v1.JPG',
    page: 'https://commons.wikimedia.org/wiki/File:Portrait_of_Muhammad_Shah_Qadjar_-_MV_6700_-_v1.JPG',
    credit: { creator: 'Muhammad Hasan Afshar' },
    license: { id: 'public-domain' }
  }
})
