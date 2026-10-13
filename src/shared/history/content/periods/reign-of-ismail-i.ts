import { definePeriod } from '../../schema'

export default definePeriod({
  id: 'reign-of-ismail-i',
  names: [
    { text: 'Reign of Ismail I', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-13',
  periodType: 'reign',
  start: {
    alts: [
      {
        value: { d: '1501' },
        cites: [
          {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '7' }
          },
          {
            source: 'iranica-savory-esmail-i-safawi-biography',
            loc: { section: 'ESMĀʿĪL I ṢAFAWĪ i. Biography', para: '2' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1524' },
        cites: [
          {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '14' }
          },
          {
            source: 'iranica-savory-karamustafa-esmail-i-safawi',
            loc: { section: 'ESMĀʿĪL I ṢAFAWĪ', para: '1' }
          }
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
        },
        {
          id: 'q2',
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
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'Internal divisions and the plague prevented the Āq Qoyunlu from resisting Esmāʿil’s conquest of Fārs in 1503.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        },
        {
          id: 'q4',
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
          id: 'q5',
          text: 'The main rivals of the Safavids were to be the Ottomans.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        },
        {
          id: 'q6',
          text: 'Esmāʿil also continued to search for allies against the Ottomans, offering his daughter’s hand in marriage to the ruler of Širvān, and, most importantly, set out to rebuild his weakened army by introducing a corps of musketeers.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '12' }
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
          text: 'The reaction of the qezelbāš was one of disillusionment.',
          lang: 'en',
          cite: {
            source: 'iranica-savory-esmail-i-safawi-biography',
            loc: { section: 'ESMĀʿĪL I ṢAFAWĪ i. Biography', para: '22' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/esmail-i-safawi/esmail-i-safawi-i-biography'
          }
        },
        {
          id: 'q8',
          text: 'This drastic step, which had no precedent in the history of Islamic states, was a logical one',
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
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/71/Shah_Ismail_I_Safavid%2C_Behzad.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Shah_Ismail_I_Safavid,_Behzad.jpg',
    credit: { creator: 'Kamāl ud-Dīn Behzād' },
    license: { id: 'public-domain' }
  }
})
