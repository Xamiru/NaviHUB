import { definePerson } from '../../schema'

export default definePerson({
  id: 'abbas-ii',
  names: [
    { text: 'Abbas II', lang: 'en', role: 'primary' },
    { text: 'شاه عباس دوم', lang: 'fa', role: 'native', translit: 'Šāh ʿAbbās-e Dovvom' },
    {
      text: 'ʿAbbās II',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'iranica-matthee-abbas-ii', loc: { section: 'ʿABBĀS II', para: '1' } }
      ]
    }
  ],
  researched: '2026-10-13',
  born: {
    alts: [
      {
        value: { d: '1632-08-30' },
        cites: [
          { source: 'iranica-matthee-abbas-ii', loc: { section: 'ʿABBĀS II', para: '1' } }
        ]
      },
      {
        value: { d: '1632-12' },
        cites: [
          { source: 'iranica-matthee-abbas-ii', loc: { section: 'ʿABBĀS II', para: '1' } }
        ]
      },
      {
        value: { d: '1633-01-15' },
        cites: [
          { source: 'iranica-matthee-abbas-ii', loc: { section: 'ʿABBĀS II', para: '1' } }
        ]
      }
    ]
  },
  died: {
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
  bornIn: {
    ref: 'place:qazvin',
    cites: [
      { source: 'iranica-matthee-abbas-ii', loc: { section: 'ʿABBĀS II', para: '1' } }
    ]
  },
  regions: ['iran'],
  roles: ['monarch'],
  offices: [
    {
      title: 'Shah of Iran',
      polity: 'polity:safavid-iran',
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
          }
        ]
      },
      cites: [
        { source: 'iranica-matthee-abbas-ii', loc: { section: 'ʿABBĀS II', para: '2' } },
        { source: 'iranica-matthee-abbas-ii', loc: { section: 'ʿABBĀS II', para: '15' } }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/c/c1/Shah_Abbas_II%2C_%28ruled_1642-1666%29%2C_Aga_Khan_trust_of_culture_%28painting_dated_to_17-18th_century%29.png',
    page: 'https://commons.wikimedia.org/wiki/File:Shah_Abbas_II,_(ruled_1642-1666),_Aga_Khan_trust_of_culture_(painting_dated_to_17-18th_century).png',
    credit: { institution: 'Aga Khan Museum' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The reign of his son and successor, Shah ʿAbbās II, has been called the Indian summer of the Safavid era, in reference to his success in recapturing Kandahar, and the favorable conditions foreign observers detected in his realm.',
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
      kind: 'early-life',
      quotes: [
        {
          id: 'q3',
          text: 'ʿAbbās II, aged nine-and-a-half, was enthroned in Kashan on Thursday 15 Ṣafar 1052/May 15, 1642, four days after the death of his father, Shah Ṣafi I (r. 1038-52/1629-42) and following a meeting of the state council presided over by grand vizier Mirzā Moḥammad Sāru Taqi.',
          lang: 'en',
          cite: { source: 'iranica-matthee-abbas-ii', loc: { section: 'ʿABBĀS II', para: '2' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/abbas-ii'
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
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
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
          text: 'Shah ʿAbbās II’s foreign policy was marked by caution and calculation.',
          lang: 'en',
          cite: { source: 'iranica-matthee-abbas-ii', loc: { section: 'ʿABBĀS II', para: '8' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/abbas-ii'
          }
        },
        {
          id: 'q7',
          text: 'Shah ʿAbbās II was an energetic builder, although not on the scale of his great-grandfather.',
          lang: 'en',
          cite: { source: 'iranica-matthee-abbas-ii', loc: { section: 'ʿABBĀS II', para: '13' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/abbas-ii'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q8',
          text: 'Shah ʿAbbās II died, not yet thirty-five years old, on 20 Rabiʿ I 1077/25 September 1666 (or 26 Rabiʿ II 1077/26 October 1666) in Ašraf (present-day Behšahr), the winter resort town that Shah ʿAbbās I had built in Mazandaran.',
          lang: 'en',
          cite: { source: 'iranica-matthee-abbas-ii', loc: { section: 'ʿABBĀS II', para: '15' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/abbas-ii'
          }
        },
        {
          id: 'q9',
          text: 'Contemporary observers offer different opinions about the cause of his death.',
          lang: 'en',
          cite: { source: 'iranica-matthee-abbas-ii', loc: { section: 'ʿABBĀS II', para: '16' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/abbas-ii'
          }
        }
      ]
    }
  ]
})
