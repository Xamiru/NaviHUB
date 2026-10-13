import { definePerson } from '../../schema'

export default definePerson({
  id: 'shah-safi',
  names: [
    { text: 'Shah Safi', lang: 'en', role: 'primary' },
    { text: 'شاه صفی', lang: 'fa', role: 'native', translit: 'Šāh Ṣafi' },
    {
      text: 'Shah Ṣafi I',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'iranica-matthee-shah-safi-i', loc: { section: 'SHAH ṢAFI I', para: '1' } }
      ]
    },
    {
      text: 'Sām Mirzā',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'iranica-matthee-shah-safi-i', loc: { section: 'SHAH ṢAFI I', para: '2' } }
      ]
    }
  ],
  researched: '2026-10-13',
  born: {
    alts: [
      {
        value: { d: '1611' },
        cites: [
          { source: 'iranica-matthee-shah-safi-i', loc: { section: 'SHAH ṢAFI I', para: '1' } }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1642-05-12' },
        cites: [
          { source: 'iranica-matthee-shah-safi-i', loc: { section: 'SHAH ṢAFI I', para: '1' } },
          {
            source: 'iranica-matthee-shah-safi-i',
            loc: { section: 'SHAH ṢAFI I', para: '22' }
          },
          {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '47' }
          }
        ]
      }
    ]
  },
  diedIn: {
    ref: 'place:qazvin',
    cites: [
      { source: 'iranica-matthee-shah-safi-i', loc: { section: 'SHAH ṢAFI I', para: '22' } }
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
            value: { d: '1629' },
            cites: [
              {
                source: 'iranica-matthee-safavid-dynasty',
                loc: { section: 'SAFAVID DYNASTY', para: '45' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1642-05-12' },
            cites: [
              {
                source: 'iranica-matthee-shah-safi-i',
                loc: { section: 'SHAH ṢAFI I', para: '1' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-matthee-safavid-dynasty',
          loc: { section: 'SAFAVID DYNASTY', para: '45' }
        },
        { source: 'iranica-matthee-shah-safi-i', loc: { section: 'SHAH ṢAFI I', para: '1' } }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/Shah_of_Persia_Sefi_I.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Shah_of_Persia_Sefi_I.jpg',
    credit: { creator: 'Adam Olearius' },
    license: { id: 'cc-by-sa', version: '4.0', url: 'https://creativecommons.org/licenses/by-sa/4.0' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Shah Ṣafi, the first of the Safavid rulers to have spent his youth in the confines of the harem, came to the throne in an atmosphere of discord and rebellion, with provincial forces taking advantage of the death of the ruler to try and regain autonomy.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '45' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        },
        {
          id: 'q2',
          text: 'Shah Ṣafi died in 1642, aged thirty-one, and exhausted from excessive drinking.',
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
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q3',
          text: 'Shah Ṣafi I, whose original name was Abu’l-Naṣr Sām Mirzā, was the son of Moḥammad-Bāqer Mirzā (also known as Ṣafi Mirza), Shah ʿAbbās I’s eldest son, and Moḥammad-Bāqer Mirzā’s Georgian wife, Delāram Ḵānom.',
          lang: 'en',
          cite: { source: 'iranica-matthee-shah-safi-i', loc: { section: 'SHAH ṢAFI I', para: '2' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/%e1%b9%a3afi-i-shah'
          }
        },
        {
          id: 'q4',
          text: 'He was the first Safavid ruler to be thus cloistered from the world before coming to power.',
          lang: 'en',
          cite: { source: 'iranica-matthee-shah-safi-i', loc: { section: 'SHAH ṢAFI I', para: '2' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/%e1%b9%a3afi-i-shah'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q5',
          text: 'Ṣafi’s accession was also the first in which the high clergy participated',
          lang: 'en',
          cite: { source: 'iranica-matthee-shah-safi-i', loc: { section: 'SHAH ṢAFI I', para: '4' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/%e1%b9%a3afi-i-shah'
          }
        },
        {
          id: 'q6',
          text: 'The expedition into Iraq was followed by a massive purge in Isfahan culminating in a bloody massacre in early 1632',
          lang: 'en',
          cite: { source: 'iranica-matthee-shah-safi-i', loc: { section: 'SHAH ṢAFI I', para: '8' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/%e1%b9%a3afi-i-shah'
          }
        },
        {
          id: 'q7',
          text: 'Following this, the Safavids, aware of their military weakness, in 1639 concluded the Peace of Qaṣr-e Širin or Ḏohāb',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-iraq-iv-safavid-period',
            loc: { section: 'IRAQ iv. RELATIONS IN THE SAFAVID PERIOD', para: '22' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/iraq-iv-safavid-period'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q8',
          text: 'Shah Ṣafi died on Monday, 12 Safar 1052/12 May 1642, in Qazvin, on his way to recapture Qandahar, exhausted from drinking, although Olearius claimed that he was poisoned (Olearius, p. 664; NA Coll.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-shah-safi-i',
            loc: { section: 'SHAH ṢAFI I', para: '22' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/%e1%b9%a3afi-i-shah'
          }
        },
        {
          id: 'q9',
          text: 'He was given to drinking, having switched to alcohol shortly after coming to power at the advice of his physicians, who thought wine an antidote to maʿjun, the opium-based drug with which he had been plied in the harem',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-shah-safi-i',
            loc: { section: 'SHAH ṢAFI I', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/%e1%b9%a3afi-i-shah'
          }
        }
      ]
    }
  ]
})
