import { definePerson } from '../../schema'

export default definePerson({
  id: 'mulla-sadra',
  names: [
    { text: 'Mulla Sadra', lang: 'en', role: 'primary' },
    { text: 'ملاصدرا', lang: 'fa', role: 'native', translit: 'Mollā Ṣadrā' },
    {
      text: 'Mollā Ṣadrā Širāzi',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-rizvi-molla-sadra',
          loc: { section: 'MOLLĀ ṢADRĀ ŠIRĀZI', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-13',
  born: {
    alts: [
      {
        value: { d: '1571', notAfter: '1572' },
        cites: [
          {
            source: 'iranica-rizvi-molla-sadra',
            loc: { section: 'MOLLĀ ṢADRĀ ŠIRĀZI', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1635', notAfter: '1636' },
        cites: [
          {
            source: 'iranica-rizvi-molla-sadra',
            loc: { section: 'MOLLĀ ṢADRĀ ŠIRĀZI', para: '1' }
          }
        ]
      }
    ]
  },
  bornIn: {
    ref: 'place:shiraz',
    cites: [
      {
        source: 'iranica-rizvi-molla-sadra',
        loc: { section: 'MOLLĀ ṢADRĀ ŠIRĀZI', para: '1' }
      }
    ]
  },
  regions: ['iran'],
  roles: ['scholar', 'writer'],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Entrance_of_Mulla_Sadra%27s_House_in_Kahak_Qom.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Entrance_of_Mulla_Sadra%27s_House_in_Kahak_Qom.jpg',
    credit: { creator: 'Ponaksom' },
    license: { id: 'cc-by-sa', version: '4.0', url: 'https://creativecommons.org/licenses/by-sa/4.0' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'MOLLĀ ṢADRĀ ŠIRĀZI, Ṣadr-al-Din Moḥammad b. Ebrāhim b. Yaḥyā Qawāmi Širāzi, arguably the most significant Islamic philosopher after Avicenna',
          lang: 'en',
          cite: {
            source: 'iranica-rizvi-molla-sadra',
            loc: { section: 'MOLLĀ ṢADRĀ ŠIRĀZI', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/molla-sadra'
          }
        },
        {
          id: 'q2',
          text: 'Best known as Mollā Ṣadrā, he was later given the title of Ṣadr-al-Motaʾallehin (Master of those who would be divine).',
          lang: 'en',
          cite: {
            source: 'iranica-rizvi-molla-sadra',
            loc: { section: 'MOLLĀ ṢADRĀ ŠIRĀZI', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/molla-sadra'
          }
        },
        {
          id: 'q3',
          text: 'He became famous as the thinker who revolutionized the doctrine of existence in Islamic metaphysics and extended the shift from Aristotelian substance metaphysics to (Neoplatonic) process metaphysics of change.',
          lang: 'en',
          cite: {
            source: 'iranica-rizvi-molla-sadra',
            loc: { section: 'MOLLĀ ṢADRĀ ŠIRĀZI', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/molla-sadra'
          }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q4',
          text: 'Mollā Ṣadrā was the sole child born into a courtly family in Shiraz in around 979/1571-72.',
          lang: 'en',
          cite: {
            source: 'iranica-rizvi-molla-sadra',
            loc: { section: 'MOLLĀ ṢADRĀ ŠIRĀZI', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/molla-sadra'
          }
        },
        {
          id: 'q5',
          text: 'A bright young man, his interest in intellectual pursuits was indulged by his father, and he moved first to Qazvin in 1000/1591 and then to Isfahan in 1006/1597',
          lang: 'en',
          cite: {
            source: 'iranica-rizvi-molla-sadra',
            loc: { section: 'MOLLĀ ṢADRĀ ŠIRĀZI', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/molla-sadra'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q6',
          text: 'Completing his training and possibly prompted by the death of his father in 1010/1601-02, he returned to Shiraz to work and teach; but, failing to find an adequate patron and facing the opposition and criticism of a city that had forgotten the value of the study of philosophy, he retreated to Kahak, a small village outside the holy city of Qom, to meditate upon his inquiries and initiate the composition of his main works, especially his philosophical and theological summa, al-Ḥekmaal-motaʿālia fi’l-asfār al-ʿaqliya al-arbaʿa (Transcendent wisdom of the four journeys of the intellect), popularly known as al-Asfār al-arbaʿa (The four journeys).',
          lang: 'en',
          cite: {
            source: 'iranica-rizvi-molla-sadra',
            loc: { section: 'MOLLĀ ṢADRĀ ŠIRĀZI', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/molla-sadra'
          }
        }
      ]
    },
    {
      kind: 'ideas',
      quotes: [
        {
          id: 'q7',
          text: 'A key figure of a group of thinkers whom Nasr and Corbin referred to as the “School of Isfahan,” he played a major role in intellectual life during the revitalization of philosophy under Shah ʿAbbās I (r. 996-1038/1588-1629) and later on in life was the most important teacher at the Madrasa-ye Khan in his hometown of Shiraz.',
          lang: 'en',
          cite: {
            source: 'iranica-rizvi-molla-sadra',
            loc: { section: 'MOLLĀ ṢADRĀ ŠIRĀZI', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/molla-sadra'
          }
        }
      ]
    }
  ]
})
