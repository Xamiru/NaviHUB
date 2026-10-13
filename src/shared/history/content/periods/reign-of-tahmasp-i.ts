import { definePeriod } from '../../schema'

export default definePeriod({
  id: 'reign-of-tahmasp-i',
  names: [
    { text: 'Reign of Tahmasp I', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-13',
  periodType: 'reign',
  start: {
    alts: [
      {
        value: { d: '1524-05-23' },
        cites: [
          { source: 'iranica-mitchell-tahmasp-i', loc: { section: 'ṬAHMĀSP I', para: '4' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1576-05-14' },
        cites: [
          { source: 'iranica-mitchell-tahmasp-i', loc: { section: 'ṬAHMĀSP I', para: '1' } }
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
          text: 'Shah Esmāʿil died in 1524, to be succeeded by his ten-year old son Ṭahmāsp, at a time when Persia had begun to recover from the misery and devastation that had accompanied the early Safavid conquests.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        },
        {
          id: 'q2',
          text: 'By the time Shah Ṭahmāsp died in 1576, the Safavids had proven their staying power in the face of the powerful Qezelbāš, the persistent Ottoman threat, and a weakening ideology.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '23' }
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
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'Given Ṭahmāsp’s age, it is only natural that real power was initially held by a body of regents, which consisted of Div Solṭān Rumlu, amir al-omarāʾ and tutor (lala) of the new ruler, and Köpek Solṭān of the Ostājlu tribe.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        },
        {
          id: 'q4',
          text: 'In the northeast, he took on the Uzbeks, who had repeatedly invaded Khorasan, taking advantage of Persia’s military weakness.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '17' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        },
        {
          id: 'q5',
          text: 'The third Ottoman campaign, mounted in 1554-55, ended with the Peace of Amasya, which recognized Ottoman suzerainty over Iraq and eastern Anatolia while leaving Persia in control of Azarbaijan and the southeastern Caucasus.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '18' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        },
        {
          id: 'q6',
          text: 'Georgia, where Shah Ṭahmāsp engaged in a number of campaigns in the 1540s and 1550s, was never properly subjugated.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '20' }
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
          text: 'Shah Ṭahmāsp’s long rule witnessed an important transformation in Safavid ideology, continuing a shift in the shah’s status that had begun with the defeat at Čālderān.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '22' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        },
        {
          id: 'q8',
          text: 'Persia had benefited from two decades of relative peace.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '23' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/60/Iran%2C_Qazvin%2C_Safavid_period_-_Shah_Tahmasp_I_%281514-1576%29_Seated_in_a_Landscape_-_1917.1078_-_Cleveland_Museum_of_Art.tif/lossy-page1-1280px-Iran%2C_Qazvin%2C_Safavid_period_-_Shah_Tahmasp_I_%281514-1576%29_Seated_in_a_Landscape_-_1917.1078_-_Cleveland_Museum_of_Art.tif.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Iran,_Qazvin,_Safavid_period_-_Shah_Tahmasp_I_(1514-1576)_Seated_in_a_Landscape_-_1917.1078_-_Cleveland_Museum_of_Art.tif',
    credit: { institution: 'Cleveland Museum of Art' },
    license: { id: 'public-domain' }
  }
})
