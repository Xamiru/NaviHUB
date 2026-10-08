import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'fall-of-qaem-maqam-farahani',
  names: [
    { text: 'Fall and killing of Qaem-Maqam Farahani', lang: 'en', role: 'primary' },
    { text: 'قتل قائم‌مقام فراهانی', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'assassination',
  start: {
    alts: [
      {
        value: { d: '1835-06-26' },
        cites: [
          {
            source: 'iranica-calmard-mohammad-shah',
            loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '9' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 2,
  partOf: [
    { ref: 'period:reign-of-mohammad-shah-qajar' },
    { ref: 'period:qajar-dynasty' }
  ],
  polities: [
    { ref: 'polity:qajar-iran' }
  ],
  participants: [
    {
      ref: 'person:abolqasem-qaem-maqam-farahani',
      role: 'victim',
      cites: [
        {
          source: 'iranica-calmard-mohammad-shah',
          loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '9' }
        }
      ]
    },
    {
      ref: 'person:mohammad-shah-qajar',
      role: 'head-of-state',
      cites: [
        {
          source: 'iranica-calmard-mohammad-shah',
          loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '9' }
        }
      ]
    },
    {
      ref: 'person:haji-mirza-aqasi',
      role: 'leader',
      cites: [
        {
          source: 'iranica-calmard-mohammad-shah',
          loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '9' }
        }
      ]
    },
    {
      name: 'Allāhyār Khan Āṣaf-al-Dawla Davallu',
      role: 'participant',
      cites: [
        {
          source: 'iranica-calmard-mohammad-shah',
          loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '9' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:qajar-succession-crisis-of-1834', rel: 'related' }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'Āqāsī’s growing influence upon Moḥammad Mīrzā and other princes enhanced his position in spite of Qāʾem-maqām’s acid criticism of his eccentric personality and teaching method.',
          lang: 'en',
          cite: { source: 'iranica-amanat-aqasi', loc: { section: 'ĀQĀSĪ, ḤĀJJĪ MĪRZĀ', para: '3' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/aqasff-ujuli-mnsz-adras-ivxni-ca'
          }
        },
        {
          id: 'q2',
          text: 'Upon Moḥammad Shah’s accession in Rabīʿa I, 1250/November, 1834, which he regarded as the realization of his tutor’s prognostications, Qāʾem-maqām assumed premiership, and this in effect guaranteed the consolidation of the throne through a troubled period of transition and in the face of fierce competition.',
          lang: 'en',
          cite: { source: 'iranica-amanat-aqasi', loc: { section: 'ĀQĀSĪ, ḤĀJJĪ MĪRZĀ', para: '4' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/aqasff-ujuli-mnsz-adras-ivxni-ca'
          }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q7',
          text: '1835 Murder of Abu’l-Qāsem Qāʾemmaqām by order of the shah and the appointment of Hājj Mirzā Āḡāsi as grand vizier.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1927' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-2/'
          }
        },
        {
          id: 'q3',
          text: 'Victim of slanderous accusations, he was arrested and murdered on the shah’s order on 29 Ṣafar 1251/26 June 1835 (Ḵormuji, p. 25; Eʿteżād-al-Salṭana, p. 398, 437-38; Fasāʾi, ed. Rasgār, p. 767; Solṭān-Aḥmad Mirzā, editor’s note, pp. 253-64).',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-mohammad-shah',
            loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/mohammad-shah'
          }
        },
        {
          id: 'q4',
          text: 'Shortly afterwards, the Shah appointed Āqāsi in his place.',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-mohammad-shah',
            loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/mohammad-shah'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'Āqāsi occupied a large part of his premiership (1835-48) to consolidate his own position, mostly by putting in place his own Azarbaijani allies (among them many Erevani emigrés from Māku) and challenging the influence of his opponents among the Qajar ruling elite.',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-mohammad-shah',
            loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/mohammad-shah'
          }
        },
        {
          id: 'q6',
          text: 'Āqāsī’s rise to premiership and his survival in that office for thirteen years was primarily due to the Shah’s attachment and unconditional trust in Āqāsī but also to Moḥammad Shah’s compliance with the early Qajar policy of employing weak ministers with no independent political base.',
          lang: 'en',
          cite: { source: 'iranica-amanat-aqasi', loc: { section: 'ĀQĀSĪ, ḤĀJJĪ MĪRZĀ', para: '5' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/aqasff-ujuli-mnsz-adras-ivxni-ca'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/58/Portrait_of_Muhammad_Shah_Qajar_and_his_Vizier_Haj_Mirza_Aghasi_MET_DP345140.jpg/1280px-Portrait_of_Muhammad_Shah_Qajar_and_his_Vizier_Haj_Mirza_Aghasi_MET_DP345140.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Portrait_of_Muhammad_Shah_Qajar_and_his_Vizier_Haj_Mirza_Aghasi_MET_DP345140.jpg',
    credit: { institution: 'Metropolitan Museum of Art' },
    license: { id: 'cc0' }
  },
  furtherReading: [
    { source: 'nateq-1988-iran-dar-rahyabi-ye-farhangi', perspective: 'iranian' },
    { source: 'bamdad-1968-sharh-e-hal-e-rejal-e-iran', perspective: 'iranian' }
  ]
})
