import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'haydars-death-who-killed-him',
  about: ['event:death-of-haydar-and-the-imprisonment-of-his-sons'],
  topic: 'responsibility',
  positions: [
    {
      id: 'combined-aq-qoyunlu-and-shirvani-forces',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Roger M. Savory', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'Ḥaydar led them on a razzia against the “infidels” of Circassia and Daḡestān. This involved crossing the territory of the Šīrvānšāh Farroḵ-yasār, who appealed for help to his son-in-law, the Aq Qoyunlu chief Yaʿqūb, and the combined Aq Qoyunlu and the Šīrvānī forces defeated Ḥaydar on 29 Rajab 893/9 July 1488 at Ṭabarsarān near Darband; Ḥaydar was killed in battle',
          lang: 'en',
          cite: {
            source: 'iranica-savory-esmail-i-safawi-biography',
            loc: { section: 'ESMĀʿĪL I ṢAFAWĪ i. Biography', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/esmail-i-safawi/esmail-i-safawi-i-biography'
          }
        }
      ]
    },
    {
      id: 'aq-qoyunlu-troops-sent-by-yaqub',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Rosemarie Quiring-Zoche', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'On the occasion of a foray into Georgia, Ḥaydar sought to avenge the death of his father, Shaikh Jonayd (killed in 864/1460), by attacking the Šervānšāh, who was one of Yaʿqūb’s vassals; Yaʿqūb sent troops who defeated and killed Ḥaydar and captured his three sons.',
          lang: 'en',
          cite: {
            source: 'iranica-quiring-zoche-aq-qoyunlu',
            loc: { section: 'AQ QOYUNLŪ', para: '19' }
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
      id: 'aq-qoyunlu-beheaded-him',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Kioumars Ghereghlou', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'The Āq Quyunlu beheaded Ḥaydar, and his severed head was later buried in Tabriz.',
          lang: 'en',
          cite: { source: 'iranica-haydar-safavi', loc: { section: 'ḤAYDAR ṢAFAVI', para: '4' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/haydar-safavi'
          }
        }
      ]
    }
  ],
  researched: '2026-10-16'
})
