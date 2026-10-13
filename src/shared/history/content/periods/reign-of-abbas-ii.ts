import { definePeriod } from '../../schema'

export default definePeriod({
  id: 'reign-of-abbas-ii',
  names: [
    { text: 'Reign of Abbas II', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-13',
  periodType: 'reign',
  start: {
    alts: [
      {
        value: { d: '1642-05-15' },
        cites: [
          { source: 'iranica-matthee-abbas-ii', loc: { section: 'ʿABBĀS II', para: '2' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1666-09-25' },
        cites: [
          { source: 'iranica-matthee-abbas-ii', loc: { section: 'ʿABBĀS II', para: '15' } }
        ]
      },
      {
        value: { d: '1666-10-26' },
        cites: [
          { source: 'iranica-matthee-abbas-ii', loc: { section: 'ʿABBĀS II', para: '15' } }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 2,
  parent: 'polity:safavid-iran',
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Although there was a recovery with the reign of Shah Abbas II (1642- 66), in general the Safavid Empire declined after the death of Shah Abbas.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE SAFAVIDS, 1501-1722', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/iran/11.htm' }
        },
        {
          id: 'q2',
          text: 'A measure of justice and stability indeed marked the reign of Shah ʿAbbās II.',
          lang: 'en',
          cite: { source: 'iranica-matthee-abbas-ii', loc: { section: 'ʿABBĀS II', para: '6' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/abbas-ii'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'Mounting the throne at age ten, Shah ʿAbbās II escaped an overly long childhood dependence on the forces that dominated the harem.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '47' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        },
        {
          id: 'q4',
          text: 'Shah ʿAbbās took effective power in 1055/late 1645 by ridding himself of Mirzā “Sāru” Taqi and Jāni Khan, using Jāni Khan to remove his octogenarian, exceedingly powerful grand vizier, and then turning on Jāni Khan',
          lang: 'en',
          cite: { source: 'iranica-matthee-abbas-ii', loc: { section: 'ʿABBĀS II', para: '4' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/abbas-ii'
          }
        },
        {
          id: 'q5',
          text: 'The expedition to Kandahar, which had been lost to the Mughals under Shah Ṣafi I, counts as Shah ʿAbbās II’s main military venture and as the last significant military campaign of the Safavids.',
          lang: 'en',
          cite: { source: 'iranica-matthee-abbas-ii', loc: { section: 'ʿABBĀS II', para: '11' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/abbas-ii'
          }
        },
        {
          id: 'q6',
          text: 'One was a shift from tolerance for expressions of popular religiosity to a growing emphasis on a strict interpretation of the faith.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '48' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q7',
          text: 'Following his success in regaining Kandahar, the shah appears to have lost his grip on power.',
          lang: 'en',
          cite: { source: 'iranica-matthee-abbas-ii', loc: { section: 'ʿABBĀS II', para: '14' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/abbas-ii'
          }
        },
        {
          id: 'q8',
          text: 'The most important manifestation of the shah’s efforts to increase the flow of revenue to the center is the expansion of crown (ḵāṣṣa) land.',
          lang: 'en',
          cite: { source: 'iranica-matthee-abbas-ii', loc: { section: 'ʿABBĀS II', para: '12' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/abbas-ii'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/9d/Shah_Abbas_II_and_a_minister%2C_I%27timad_al-Daulah%2C_seated_in_discussion._Probably_Delhi%2C_after_Safavid_Persian_originals%2C_19th_Century.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Shah_Abbas_II_and_a_minister,_I%27timad_al-Daulah,_seated_in_discussion._Probably_Delhi,_after_Safavid_Persian_originals,_19th_Century.jpg',
    credit: { institution: 'Bonhams' },
    license: { id: 'public-domain' }
  }
})
