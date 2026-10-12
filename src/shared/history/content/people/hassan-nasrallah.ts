import { definePerson } from '../../schema'

export default definePerson({
  id: 'hassan-nasrallah',
  names: [
    { text: 'Hassan Nasrallah', lang: 'en', role: 'primary' },
    { text: 'حسن نصر الله', lang: 'ar', role: 'native' },
    { text: 'Ḥasan Naṣr-Allāh', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-13',
  born: {
    alts: [
      {
        value: { d: '1960-08-31' },
        cites: [
          {
            source: 'lc-names-nasrallah-hasan-no2007033197',
            loc: { section: 'Naṣr Allāh, Ḥasan, 1960-2024' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '2024' },
        cites: [
          {
            source: 'lc-names-nasrallah-hasan-no2007033197',
            loc: { section: 'Naṣr Allāh, Ḥasan, 1960-2024' }
          },
          {
            source: 'hrw-2025-world-report-lebanon',
            loc: { section: 'World Report 2025: Lebanon' }
          }
        ]
      }
    ]
  },
  diedIn: {
    ref: 'place:beirut',
    cites: [
      {
        source: 'lc-names-nasrallah-hasan-no2007033197',
        loc: { section: 'Naṣr Allāh, Ḥasan, 1960-2024' }
      },
      {
        source: 'hrw-2025-world-report-lebanon',
        loc: { section: 'World Report 2025: Lebanon' }
      }
    ]
  },
  regions: ['mena'],
  roles: ['cleric', 'politician'],
  offices: [
    {
      title: 'Secretary-General of Hezbollah',
      end: {
        alts: [
          {
            value: { d: '2024' },
            cites: [
              {
                source: 'hrw-2025-world-report-lebanon',
                loc: { section: 'World Report 2025: Lebanon' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-mervin-shiites-in-lebanon',
          loc: { section: 'SHIʿITES IN LEBANON' }
        },
        {
          source: 'hrw-2025-world-report-lebanon',
          loc: { section: 'World Report 2025: Lebanon' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The rivalry between AMAL and Hezbollah has regularly provoked skirmishes between the two forces. The confrontation reached its peak in 1988, with the “war for the supremacy over southern Lebanon,” which finally ended in January 1989 with the intervention of Syrian diplomats and of ʿAli-Akbar Welāyati, the then Persian minister of foreign affairs. In that year, the first congress of the Hezbollah elected Sobḥi Ṭofayli, a cleric, its general secretary. In 1991, ʿAbbās Musawi was elected, and the Party of God began to cooperate with other political organizations. Musawi was assassinated by the Israelis in 1992, as several other leaders of the Hezbollah had been, such as Rāḡeb Ḥarb in 1984. Ḥasan Naṣr-Allāh was elected to replace Musawi.',
          lang: 'en',
          cite: {
            source: 'iranica-mervin-shiites-in-lebanon',
            loc: { section: 'SHIʿITES IN LEBANON' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/shiites-in-lebanon'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'Dubbed "Operation Truthful Promise" by Hezbollah, the raid fulfilled Hezbollah leader\'s Hassan Nasrallah\'s longstanding aim to take IDF soldiers hostage in order to pressure Israel to release remaining Lebanese prisoners in Israeli prisons,[58] and to seek the return of the disputed Israeli-occupied Sheba` Farms area to Lebanese control.',
          lang: 'en',
          cite: {
            source: 'hrw-2007-09-05-why-they-died-civilian-casualties-in-lebanon-during-the-2006-war',
            loc: { section: 'Why They Died: Civilian Casualties in Lebanon during the 2006 War' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/report/2007/09/05/why-they-died/civilian-casualties-lebanon-during-2006-war'
          }
        },
        {
          id: 'q3',
          text: 'Israel conducted several strikes on the southern suburbs of Beirut, which, between September and October 2024, killed top Hezbollah commanders, including Hezbollah’s secretary-general Hassan Nasrallah, the head of Hezbollah’s executive council Hashem Saffieddine, the head of Hezbollah’s central council Nabil Qaouk, and senior military commanders Ibrahim Akil, Ahmad Wehbe and Ali Karaki, among others.',
          lang: 'en',
          cite: {
            source: 'hrw-2025-world-report-lebanon',
            loc: { section: 'World Report 2025: Lebanon' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/world-report/2025/country-chapters/lebanon'
          }
        }
      ]
    }
  ]
})
