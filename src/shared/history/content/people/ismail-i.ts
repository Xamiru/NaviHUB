import { definePerson } from '../../schema'

export default definePerson({
  id: 'ismail-i',
  names: [
    { text: 'Ismail I', lang: 'en', role: 'primary' },
    { text: 'اسماعیل صفوی', lang: 'fa', role: 'native', translit: 'Esmāʿīl-e Ṣafavī' },
    {
      text: 'Shah Esmāʿil I',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-matthee-safavid-dynasty',
          loc: { section: 'SAFAVID DYNASTY', para: '7' }
        }
      ]
    },
    {
      text: 'Ḵaṭāʾī',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-karamustafa-esmail-i-safawi-poetry',
          loc: { section: 'ESMĀʿĪL I ṢAFAWĪ ii. His Poetry', para: '2' }
        }
      ]
    }
  ],
  researched: '2026-10-13',
  born: {
    alts: [
      {
        value: { d: '1487-07-17' },
        cites: [
          {
            source: 'iranica-savory-karamustafa-esmail-i-safawi',
            loc: { section: 'ESMĀʿĪL I ṢAFAWĪ', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1524-05-23' },
        cites: [
          {
            source: 'iranica-savory-karamustafa-esmail-i-safawi',
            loc: { section: 'ESMĀʿĪL I ṢAFAWĪ', para: '1' }
          },
          {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '14' }
          }
        ]
      }
    ]
  },
  bornIn: {
    ref: 'place:ardabil',
    cites: [
      {
        source: 'iranica-savory-karamustafa-esmail-i-safawi',
        loc: { section: 'ESMĀʿĪL I ṢAFAWĪ', para: '1' }
      }
    ]
  },
  regions: ['iran'],
  roles: ['monarch', 'military', 'writer'],
  offices: [
    {
      title: 'Shah of Iran',
      polity: 'polity:safavid-iran',
      start: {
        alts: [
          {
            value: { d: '1501' },
            cites: [
              {
                source: 'iranica-matthee-safavid-dynasty',
                loc: { section: 'SAFAVID DYNASTY', para: '7' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1524-05-23' },
            cites: [
              {
                source: 'iranica-savory-karamustafa-esmail-i-safawi',
                loc: { section: 'ESMĀʿĪL I ṢAFAWĪ', para: '1' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-matthee-safavid-dynasty',
          loc: { section: 'SAFAVID DYNASTY', para: '7' }
        },
        {
          source: 'iranica-savory-karamustafa-esmail-i-safawi',
          loc: { section: 'ESMĀʿĪL I ṢAFAWĪ', para: '1' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/f/f8/Portrait_of_Shah_Ismail_I._Inscribed_%22Ismael_Sophy_Rex_Pers%22._Painted_by_Cristofano_dell%27Altissimo%2C_dated_1552-1568.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Portrait_of_Shah_Ismail_I._Inscribed_%22Ismael_Sophy_Rex_Pers%22._Painted_by_Cristofano_dell%27Altissimo,_dated_1552-1568.jpg',
    credit: { creator: 'Cristofano dell’Altissimo' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The reign of Esmāʿīl is one of the most important in the history of Persia.',
          lang: 'en',
          cite: {
            source: 'iranica-savory-esmail-i-safawi-biography',
            loc: { section: 'ESMĀʿĪL I ṢAFAWĪ i. Biography', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/esmail-i-safawi/esmail-i-safawi-i-biography'
          }
        },
        {
          id: 'q2',
          text: 'It was under Ḥaydar’s son, Esmāʿil, that the Safavids evolved from a messianic movement to a political dynasty led by a shah rather than a shaikh.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '7' }
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
          text: 'Shah Esmāʿīl came to power as the culmination of two centuries of promotion of the Safavid cause, initially through quiet propaganda carried on by the leaders of a local Sufi order in Gīlān, and ultimately through the militant and revolutionary activity by supporters of the Safavid family among the Turkman tribes of eastern Anatolia, the southern Caucasus, and elsewhere.',
          lang: 'en',
          cite: {
            source: 'iranica-savory-esmail-i-safawi-biography',
            loc: { section: 'ESMĀʿĪL I ṢAFAWĪ i. Biography', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/esmail-i-safawi/esmail-i-safawi-i-biography'
          }
        },
        {
          id: 'q4',
          text: 'Having lived under the protection of the ruler of Gilān for five years, in 1499 Esmāʿil emerged from the Caspian region, defeated the Širvānšāhs, and set out to wrest control of western Persia from the Āq Qoyunlu.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '7' }
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
          id: 'q5',
          text: 'With Azarbaijan seized, Esmāʿil, barely 15 years of age, inaugurated Safavid political rule in 1501 by proclaiming himself shah in Tabriz, having coins struck in his name and declaring the city his capital.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        },
        {
          id: 'q6',
          text: 'By the capture of Baghdad, Esmāʿīl extended Safavid rule outside Persia proper into “L’Iran extérieur.”',
          lang: 'en',
          cite: {
            source: 'iranica-savory-esmail-i-safawi-biography',
            loc: { section: 'ESMĀʿĪL I ṢAFAWĪ i. Biography', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/esmail-i-safawi/esmail-i-safawi-i-biography'
          }
        },
        {
          id: 'q7',
          text: 'In 1510, Esmāʿil defeated Moḥammad Šaybāni Khan and took Marv and Herat, thus extending his realm from the ancient Mongol capital to that of the successors of the Timurids.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        },
        {
          id: 'q8',
          text: 'After Čālderān Esmāʿīl went into mourning and never again led his troops into battle.',
          lang: 'en',
          cite: { source: 'iranica-mccaffrey-calderan', loc: { section: 'ČĀLDERĀN', para: '13' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/calderan-battle'
          }
        }
      ]
    },
    {
      kind: 'works',
      quotes: [
        {
          id: 'q9',
          text: 'Shah Esmāʿīl wrote poetry under the pen-name Ḵaṭāʾī.',
          lang: 'en',
          cite: {
            source: 'iranica-karamustafa-esmail-i-safawi-poetry',
            loc: { section: 'ESMĀʿĪL I ṢAFAWĪ ii. His Poetry', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/esmail-i-safawi/esmail-i-safawi-ii-his-poetry'
          }
        },
        {
          id: 'q10',
          text: 'Esmāʿīl was a skillful poet who used prevalent themes and images in lyric and didactic-religious poetry with ease and some degree of originality.',
          lang: 'en',
          cite: {
            source: 'iranica-karamustafa-esmail-i-safawi-poetry',
            loc: { section: 'ESMĀʿĪL I ṢAFAWĪ ii. His Poetry', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/esmail-i-safawi/esmail-i-safawi-ii-his-poetry'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q11',
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
        }
      ]
    }
  ]
})
