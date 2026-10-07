import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'bombardment-of-the-majles',
  names: [
    { text: 'Bombardment of the Majles', lang: 'en', role: 'primary' },
    { text: 'به توپ بستن مجلس', lang: 'fa', role: 'native' },
    { text: 'royal coup d’état of 1908', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-07',
  type: 'coup',
  start: {
    alts: [
      {
        value: { d: '1908-06-23' },
        cites: [
          {
            source: 'iranica-algar-behbahani',
            loc: { section: 'BEHBAHĀNĪ, ʿABD-ALLĀH', para: '8' }
          },
          {
            source: 'iranica-amanat-baqer-khan',
            loc: { section: 'BĀQER KHAN SĀLĀR-E MELLI', para: '3' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 2,
  places: [
    { ref: 'place:tehran' }
  ],
  partOf: [
    { ref: 'event:persian-constitutional-revolution' }
  ],
  participants: [
    {
      ref: 'person:mohammad-ali-shah-qajar',
      role: 'leader',
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-2',
          loc: { section: 'Chronology of Iranian History Part 2, 1908' }
        }
      ]
    },
    {
      name: 'Colonel Liakhov',
      role: 'commander',
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-2',
          loc: { section: 'Chronology of Iranian History Part 2, 1908' }
        }
      ]
    },
    {
      ref: 'person:abdollah-behbahani',
      role: 'victim',
      cites: [
        {
          source: 'iranica-algar-behbahani',
          loc: { section: 'BEHBAHĀNĪ, ʿABD-ALLĀH', para: '8' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'Mindful of Tsar Nicholas II’s dissolution of the first Duma, he attempted to abolish the Constitution (mašrūṭa) in favor of Russian-style absolutism.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-constitutional-revolution-intellectual-background',
            loc: { section: 'CONSTITUTIONAL REVOLUTION i. Intellectual background', para: '39' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/constitutional-revolution-i'
          }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q2',
          text: 'Moḥammad-ʿAli Shah orders Colonel Liakhov, Russian commander of the Cossack Brigade, to shell the Majles, overthrowing the Constitutional government. A number of Constitutionalists, including Jahāngir Khan Ṣur-e Esrāfil and Malek-al-Motekallemin, the famous liberal orator, are executed. Some 70 constitutionalists and Majles deputies, including Sayyed Ḥasan Taqizādeh, take refuge in the British Legation and are saved.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1908' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-2/'
          }
        },
        {
          id: 'q3',
          text: 'With his universally acknowledged courage, Behbahānī made his way to the Maǰles on the day of the bombardment, later seeking refuge in the garden of Amīn-al-dawla behind the Maǰles building.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-behbahani',
            loc: { section: 'BEHBAHĀNĪ, ʿABD-ALLĀH', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/abdallah-behbahani/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q4',
          text: 'The shelling of the Majles leads to the re-establishment of arbitrary rule by Moḥammad-ʿAli Shah.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1908' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-2/'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cb/Mohammad_Ali_Shah_Qajar.png/1280px-Mohammad_Ali_Shah_Qajar.png',
    page: 'https://commons.wikimedia.org/wiki/File:Mohammad_Ali_Shah_Qajar.png',
    title: 'Shah of Persia, Mohammed Ali Mirzi, Dec. 19, 1907',
    credit: { institution: 'Library of Congress', creator: 'Bain News Service' },
    license: { id: 'public-domain' }
  }
})
