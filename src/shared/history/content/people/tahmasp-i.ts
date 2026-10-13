import { definePerson } from '../../schema'

export default definePerson({
  id: 'tahmasp-i',
  names: [
    { text: 'Tahmasp I', lang: 'en', role: 'primary' },
    { text: 'شاه طهماسب', lang: 'fa', role: 'native', translit: 'Šāh Ṭahmāsp' },
    {
      text: 'Ṭahmāsp I',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'iranica-mitchell-tahmasp-i', loc: { section: 'ṬAHMĀSP I', para: '1' } }
      ]
    }
  ],
  researched: '2026-10-13',
  born: {
    alts: [
      {
        value: { d: '1514-02-22' },
        cites: [
          { source: 'iranica-mitchell-tahmasp-i', loc: { section: 'ṬAHMĀSP I', para: '1' } }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1576-05-14' },
        cites: [
          { source: 'iranica-mitchell-tahmasp-i', loc: { section: 'ṬAHMĀSP I', para: '1' } },
          {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '23' }
          }
        ]
      }
    ]
  },
  diedIn: {
    ref: 'place:qazvin',
    cites: [
      { source: 'iranica-mitchell-tahmasp-i', loc: { section: 'ṬAHMĀSP I', para: '1' } }
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
            value: { d: '1524-05-23' },
            cites: [
              {
                source: 'iranica-mitchell-tahmasp-i',
                loc: { section: 'ṬAHMĀSP I', para: '4' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1576-05-14' },
            cites: [
              {
                source: 'iranica-mitchell-tahmasp-i',
                loc: { section: 'ṬAHMĀSP I', para: '1' }
              }
            ]
          }
        ]
      },
      cites: [
        { source: 'iranica-mitchell-tahmasp-i', loc: { section: 'ṬAHMĀSP I', para: '4' } },
        { source: 'iranica-mitchell-tahmasp-i', loc: { section: 'ṬAHMĀSP I', para: '1' } }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/6/61/Portrait_of_Shah_Tahmasp_I._Inscribed_%22Tammas_Pers%22._Painted_by_Cristofano_dell%27Altissimo%2C_dated_1552-1568.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Portrait_of_Shah_Tahmasp_I._Inscribed_%22Tammas_Pers%22._Painted_by_Cristofano_dell%27Altissimo,_dated_1552-1568.jpg',
    credit: { creator: 'Cristofano dell’Altissimo' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Ṭahmāsp Mirzā, the eldest son of the Safavid dynastic founder, Shah Esmāʿil I, was designated early on as the successor to the throne.',
          lang: 'en',
          cite: { source: 'iranica-mitchell-tahmasp-i', loc: { section: 'ṬAHMĀSP I', para: '3' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/tahmasp-i'
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
      kind: 'career',
      quotes: [
        {
          id: 'q3',
          text: 'Ṭahmāsp’s puppet status continued with his accession to the throne on 23 May 1524, and the self-appointed status of Div Solṭān Rumlu (one of the Sufis of the Old Guard “ṣufiān-e qadimi”) as the shah’s vicegerent and the empire’s de facto ruler.',
          lang: 'en',
          cite: { source: 'iranica-mitchell-tahmasp-i', loc: { section: 'ṬAHMĀSP I', para: '4' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/tahmasp-i'
          }
        },
        {
          id: 'q4',
          text: 'Having gained the upper hand in the power struggle, Shah Ṭahmāsp managed to extend his authority and influence over a number of areas that under his father had been buffer regions or vassal states.',
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
          text: 'Between 1534 and 1554, Sulṭan Süleymān I, responding to Safavid harassment, conducted three campaigns against Persia, causing much devastation in Azarbaijan.',
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
          text: 'Shah Ṭahmāsp made great efforts to further implant Shiʿism and bring religious unity to Persia.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        },
        {
          id: 'q7',
          text: 'The reign of Shah Ṭahmāsp, a ruler of refined taste, saw a flourishing of the arts.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '21' }
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
      kind: 'death',
      quotes: [
        {
          id: 'q8',
          text: 'When Shah Ṭahmāsp died in 1576, the empire he had inherited from his father had not only been maintained but also expanded during the reign of the most successful and expansionary sultan known to the Ottoman Empire.',
          lang: 'en',
          cite: { source: 'iranica-mitchell-tahmasp-i', loc: { section: 'ṬAHMĀSP I', para: '10' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/tahmasp-i'
          }
        },
        {
          id: 'q9',
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
        }
      ]
    }
  ]
})
