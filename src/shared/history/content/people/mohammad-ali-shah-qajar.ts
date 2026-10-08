import { definePerson } from '../../schema'

export default definePerson({
  id: 'mohammad-ali-shah-qajar',
  names: [
    { text: 'Mohammad Ali Shah Qajar', lang: 'en', role: 'primary' },
    { text: 'محمدعلی شاه قاجار', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-08',
  died: {
    alts: [
      {
        value: { d: '1924-04' },
        cites: [
          {
            source: 'iranica-yarshater-iranian-history-islamic-period-5',
            loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Qajar period' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  roles: ['monarch'],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Moẓaffar al-Din Shah’s son and successor Moḥammad-ʿAli Shah (1907-09) first feigned sympathy with the constitutionalists, signed the Constitution, and swore allegiance to it by the Qurʾān.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-iranian-history-islamic-period-5',
            loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Qajar period' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/iran-ii2-islamic-period-page-5/'
          }
        },
        {
          id: 'q2',
          text: 'However, being of an autocratic bent, he soon assumed an anti-constitutionalist posture and finally in 1908 had the Parliament shelled by Russian Cossacks in the service of the government.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-iranian-history-islamic-period-5',
            loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Qajar period' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/iran-ii2-islamic-period-page-5/'
          }
        },
        {
          id: 'q3',
          text: 'Moḥammad-ʿAlī Shah was considered to have lost his right to the throne by opposing and seeking the overthrow of the constitutional order and by taking bast, or sanctuary, in the Russian embassy when the armed contingents of the constitutionalists seized control of Tehran.',
          lang: 'en',
          cite: {
            source: 'iranica-sheikh-ol-islami-ahmad-shah',
            loc: { section: 'AḤMAD SHAH QĀJĀR', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/ahmad-shah-qajar-1909-1925-the-seventh-and-last-ruler-of-the-qajar-dynasty/'
          }
        }
      ]
    },
    {
      kind: 'later-life',
      quotes: [
        {
          id: 'q4',
          text: 'Moḥammad-ʿAli Shah took refuge in the Russian embassy and, following an agreement worked out with the help of the British and Russian embassies, resigned his kingship and left for Russia. His later attempt to regain his throne (July 1911) failed, and he returned to Europe, where he died in San Remo, Italy, in April 1924.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-iranian-history-islamic-period-5',
            loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Qajar period' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/iran-ii2-islamic-period-page-5/'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cb/Mohammad_Ali_Shah_Qajar.png/1280px-Mohammad_Ali_Shah_Qajar.png',
    page: 'https://commons.wikimedia.org/wiki/File:Mohammad_Ali_Shah_Qajar.png',
    title: 'Shah of Persia, Mohammed Ali Mirzi, Dec. 19, 1907',
    credit: { institution: 'Library of Congress', creator: 'Bain News Service' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'malekzadeh-1949-tarikh-e-enqelab-e-mashrutiyat', perspective: 'iranian' },
    { source: 'bamdad-1968-sharh-e-hal-e-rejal-e-iran', perspective: 'iranian' }
  ]
})
