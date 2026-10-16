import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'haydars-sons-release',
  about: ['event:death-of-haydar-and-the-imprisonment-of-his-sons'],
  topic: 'other',
  positions: [
    {
      id: 'allowed-to-return-in-1492',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Rosemarie Quiring-Zoche', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'Rostam, anxious to conciliate both the religious establishment and the popular Sufi orders, promptly allowed the sons of Shaikh Ḥaydar Ṣafawī to return to Ardabīl in 897/1492.',
          lang: 'en',
          cite: {
            source: 'iranica-quiring-zoche-aq-qoyunlu',
            loc: { section: 'AQ QOYUNLŪ', para: '21' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/aq-qoyunlu-confederation'
          }
        }
      ]
    },
    {
      id: 'released-and-rearrested-in-1493',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Roger M. Savory', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'In Šawwāl 898/August 1493, they were released from incarceration by Rostam, one of the contestants for the Aq Qoyunlu succession, who made use of the military support of their followers against one of his rivals',
          lang: 'en',
          cite: {
            source: 'iranica-savory-esmail-i-safawi-biography',
            loc: { section: 'ESMĀʿĪL I ṢAFAWĪ i. Biography', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/esmail-i-safawi/esmail-i-safawi-i-biography'
          }
        }
      ]
    }
  ],
  researched: '2026-10-16'
})
