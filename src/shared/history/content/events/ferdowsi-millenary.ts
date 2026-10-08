import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'ferdowsi-millenary',
  names: [
    { text: 'Ferdowsi millenary celebration', lang: 'en', role: 'primary' },
    { text: 'جشن هزاره فردوسی', lang: 'fa', role: 'native' },
    { text: 'jašn-e hazāra', lang: 'fa-Latn', role: 'alternative' }
  ],
  researched: '2026-10-08',
  type: 'cultural',
  start: {
    alts: [
      {
        value: { d: '1934' },
        cites: [
          {
            source: 'iranica-yarshater-chronology-part-3',
            loc: { section: 'Chronology of Iranian History Part 3, 1934' }
          },
          {
            source: 'iranica-shahbazi-ferdowsi-millenary',
            loc: { section: 'FERDOWSI, ABU’L-QĀSEM iv. MILLENARY CELEBRATION', para: '2' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 3,
  places: [
    {
      ref: 'place:tehran',
      cites: [
        {
          source: 'iranica-shahbazi-ferdowsi-millenary',
          loc: { section: 'FERDOWSI, ABU’L-QĀSEM iv. MILLENARY CELEBRATION', para: '2' }
        }
      ]
    },
    {
      ref: 'place:mashhad',
      cites: [
        {
          source: 'iranica-shahbazi-ferdowsi-millenary',
          loc: { section: 'FERDOWSI, ABU’L-QĀSEM iv. MILLENARY CELEBRATION', para: '2' }
        }
      ]
    },
    {
      ref: 'place:tus',
      cites: [
        {
          source: 'iranica-shahbazi-ferdowsi-millenary',
          loc: { section: 'FERDOWSI, ABU’L-QĀSEM iv. MILLENARY CELEBRATION', para: '2' }
        },
        {
          source: 'iranica-shahbazi-ferdowsi-mausoleum',
          loc: { section: 'FERDOWSI, ABU’L-QĀSEM iii. MAUSOLEUM', para: '1' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:reign-of-reza-shah' }
  ],
  polities: [
    { ref: 'polity:pahlavi-iran' }
  ],
  participants: [
    {
      ref: 'person:reza-shah-pahlavi',
      role: 'head-of-state',
      cites: [
        {
          source: 'iranica-shahbazi-ferdowsi-millenary',
          loc: { section: 'FERDOWSI, ABU’L-QĀSEM iv. MILLENARY CELEBRATION', para: '2' }
        }
      ]
    },
    {
      ref: 'person:mohammad-ali-foroughi',
      role: 'organizer',
      cites: [
        {
          source: 'iranica-shahbazi-ferdowsi-millenary',
          loc: { section: 'FERDOWSI, ABU’L-QĀSEM iv. MILLENARY CELEBRATION', para: '2' }
        }
      ]
    },
    {
      name: 'Moḥtašem-al-Salṭana Ḥasan Esfandīārī',
      role: 'organizer',
      cites: [
        {
          source: 'iranica-shahbazi-ferdowsi-millenary',
          loc: { section: 'FERDOWSI, ABU’L-QĀSEM iv. MILLENARY CELEBRATION', para: '2' }
        }
      ]
    },
    {
      name: 'ʿĪsā Ṣadīq',
      role: 'organizer',
      cites: [
        {
          source: 'iranica-shahbazi-ferdowsi-millenary',
          loc: { section: 'FERDOWSI, ABU’L-QĀSEM iv. MILLENARY CELEBRATION', para: '2' }
        }
      ]
    },
    {
      name: 'Arthur Christensen',
      role: 'participant',
      cites: [
        {
          source: 'iranica-shahbazi-ferdowsi-millenary',
          loc: { section: 'FERDOWSI, ABU’L-QĀSEM iv. MILLENARY CELEBRATION', para: '2' }
        }
      ]
    },
    {
      name: 'Kayḵosrow Šāhroḵ',
      role: 'organizer',
      cites: [
        {
          source: 'iranica-shahbazi-ferdowsi-mausoleum',
          loc: { section: 'FERDOWSI, ABU’L-QĀSEM iii. MAUSOLEUM', para: '3' }
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
          text: 'Persians, aware of these developments and spurred by the patriotic sentiments motivated by the Constitutional Revolution (q.v.) and the works of fervently nationalistic poets and scholars, began to voice the necessity of the official recognition of Ferdowsī as the true “resurrector” (after the Arab conquest of Persia in the 7th century) of Iranian identity.',
          lang: 'en',
          cite: {
            source: 'iranica-shahbazi-ferdowsi-millenary',
            loc: { section: 'FERDOWSI, ABU’L-QĀSEM iv. MILLENARY CELEBRATION', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/ferdowsi-iv/'
          }
        },
        {
          id: 'q2',
          text: 'Construction of the tomb started in 1928, under the supervision of Šāhroḵ, and was finished in 1934, in time for Ferdowsī’s millenary celebration (q.v.).',
          lang: 'en',
          cite: {
            source: 'iranica-shahbazi-ferdowsi-mausoleum',
            loc: { section: 'FERDOWSI, ABU’L-QĀSEM iii. MAUSOLEUM', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/ferdowsi-iii/'
          }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q3',
          text: 'The International Ferdowsi Congress, commemorating the 1,000th anniversary of the poet’s death, is convened in Tehran with the participation of numerous foreign Iranologists. The monument of Ferdowsi’s tomb is inaugurated in Ṭus.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-3',
            loc: { section: 'Chronology of Iranian History Part 3, 1934' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-3/'
          }
        },
        {
          id: 'q4',
          text: 'The celebrations were held in Tehran, Mašhad, and Ṭūs (where the Ferdowsī mausoleum, q.v., was inaugurated in 1934) and lasted for nearly a month.',
          lang: 'en',
          cite: {
            source: 'iranica-shahbazi-ferdowsi-millenary',
            loc: { section: 'FERDOWSI, ABU’L-QĀSEM iv. MILLENARY CELEBRATION', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/ferdowsi-iv/'
          }
        },
        {
          id: 'q5',
          text: 'The gathering of some one hundred distinguished scholars as well as many dignitaries of various nationalities in Tehran and Mašhad was a most beneficial event for Iranian studies in general and for research on Ferdowsī and the Šāh-nāma in particular.',
          lang: 'en',
          cite: {
            source: 'iranica-shahbazi-ferdowsi-millenary',
            loc: { section: 'FERDOWSI, ABU’L-QĀSEM iv. MILLENARY CELEBRATION', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/ferdowsi-iv/'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q6',
          text: 'Of the papers read by the participants in the congress, thirty-three were printed (together with one sent earlier by Nöldeke, Taqīzāda’s articles originally published in Kāva in 1920-21, and Qazvīnī’s “Moqaddama-ye qadīm-e Šāh-nāma”) in Tehran in 1314 Š./1935, but publication was withheld until 1943 due to Reżā Shah’s displeasure with Taqīzāda',
          lang: 'en',
          cite: {
            source: 'iranica-shahbazi-ferdowsi-millenary',
            loc: { section: 'FERDOWSI, ABU’L-QĀSEM iv. MILLENARY CELEBRATION', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/ferdowsi-iv/'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/a/a3/Rpferdosi.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Rpferdosi.jpg',
    credit: { institution: 'Catherine and Jacques Legrand, Shah-i Iran (1999)' },
    license: { id: 'public-domain' }
  }
})
