import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'iraqi-revolution-of-1958',
  names: [
    { text: 'Iraqi revolution of 1958', lang: 'en', role: 'primary' },
    { text: 'ثورة 14 تموز', lang: 'ar', role: 'native' },
    {
      text: 'July 14 Revolution',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-iraq-country-study-1988',
          loc: { section: 'REPUBLICAN IRAQ', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-07',
  type: 'revolution',
  start: {
    alts: [
      {
        value: { d: '1958-07-14' },
        cites: [
          {
            source: 'loc-iraq-country-study-1988',
            loc: { section: 'REPUBLICAN IRAQ', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['mena'],
  prominence: 2,
  places: [
    {
      ref: 'place:baghdad',
      cites: [
        {
          source: 'loc-iraq-country-study-1988',
          loc: { section: 'REPUBLICAN IRAQ', para: '1' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'Abd al Karim Qasim',
      role: 'leader',
      cites: [
        {
          source: 'loc-iraq-country-study-1988',
          loc: { section: 'REPUBLICAN IRAQ', para: '1' }
        }
      ]
    },
    {
      name: 'Abd as Salaam Arif',
      role: 'leader',
      cites: [
        {
          source: 'loc-iraq-country-study-1988',
          loc: { section: 'REPUBLICAN IRAQ', para: '1' }
        }
      ]
    },
    {
      name: 'Faisal II',
      role: 'victim',
      cites: [
        {
          source: 'loc-iraq-country-study-1988',
          loc: { section: 'REPUBLICAN IRAQ', para: '1' }
        },
        {
          source: 'iranica-yarshater-chronology-part-3',
          loc: { section: 'Chronology of Iranian History Part 3, 1958' }
        }
      ]
    },
    {
      name: 'Nuri as Said',
      role: 'victim',
      cites: [
        {
          source: 'loc-iraq-country-study-1988',
          loc: { section: 'REPUBLICAN IRAQ', para: '1' }
        },
        {
          source: 'iranica-yarshater-chronology-part-3',
          loc: { section: 'Chronology of Iranian History Part 3, 1958' }
        }
      ]
    },
    {
      name: 'Abd al Ilah',
      role: 'victim',
      cites: [
        {
          source: 'loc-iraq-country-study-1988',
          loc: { section: 'REPUBLICAN IRAQ', para: '1' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:baghdad-pact', rel: 'preceded-by' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The Hashimite monarchy was overthrown on July 14, 1958, in a swift, predawn coup executed by officers of the Nineteenth Brigade under the leadership of Brigadier Abd al Karim Qasim and Colonel Abd as Salaam Arif.',
          lang: 'en',
          cite: {
            source: 'loc-iraq-country-study-1988',
            loc: { section: 'REPUBLICAN IRAQ', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/iraq/21.htm' }
        },
        {
          id: 'q2',
          text: 'Put in its historical context, the July 14 Revolution was the culmination of a series of uprisings and coup attempts that began with the 1936 Bakr Sidqi coup and included the 1941 Rashid Ali military movement, the 1948 Wathbah Uprising, and the 1952 and 1956 protests.',
          lang: 'en',
          cite: {
            source: 'loc-iraq-country-study-1988',
            loc: { section: 'REPUBLICAN IRAQ', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/iraq/21.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'In 1958 King Hussein of Jordan and Abd al Ilah proposed a union of Hashimite monarchies to counter the recently formed Egyptian- Syrian union. At this point, the monarchy found itself completely isolated.',
          lang: 'en',
          cite: {
            source: 'loc-iraq-country-study-1988',
            loc: { section: 'IRAQ AS AN INDEPENDENT MONARCHY', para: '28' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/iraq/20.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'The coup was triggered when King Hussein, fearing that an anti-Western revolt in Lebanon might spread to Jordan, requested Iraqi assistance. Instead of moving toward Jordan, however, Colonel Arif led a battalion into Baghdad and immediately proclaimed a new republic and the end of the old regime.',
          lang: 'en',
          cite: {
            source: 'loc-iraq-country-study-1988',
            loc: { section: 'REPUBLICAN IRAQ', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/iraq/21.htm' }
        },
        {
          id: 'q5',
          text: 'King Faisal II and Abd al Ilah were executed, as were many others in the royal family. Nuri as Said also was killed after attempting to escape disguised as a veiled woman.',
          lang: 'en',
          cite: {
            source: 'loc-iraq-country-study-1988',
            loc: { section: 'REPUBLICAN IRAQ', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/iraq/21.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'The revolution radically altered Iraq\'s social structure, destroying the power of the landed shaykhs and the absentee landlords while enhancing the position of the urban workers, the peasants, and the middle class. In altering the old power structure, however, the revolution revived long-suppressed sectarian, tribal, and ethnic conflicts. The strongest of these conflicts were those between Kurds and Arabs and between Sunnis and Shias.',
          lang: 'en',
          cite: {
            source: 'loc-iraq-country-study-1988',
            loc: { section: 'REPUBLICAN IRAQ', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/iraq/21.htm' }
        },
        {
          id: 'q7',
          text: 'Despite a shared military background, the group of Free Officers (see Glossary) that carried out the July 14 Revolution was plagued by internal dissension.',
          lang: 'en',
          cite: {
            source: 'loc-iraq-country-study-1988',
            loc: { section: 'REPUBLICAN IRAQ', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/iraq/21.htm' }
        },
        {
          id: 'q8',
          text: 'The Shah of Iran was shaken, fearing a similar fate for himself and viewing the upheaval in Baghdad as a “clear and imminent” source of threats to regional stability (Ramazani, 1975, p. 281).',
          lang: 'en',
          cite: {
            source: 'iranica-kechichian-baghdad-pact',
            loc: { section: 'BAGHDAD PACT', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/baghdad-pact/'
          }
        },
        {
          id: 'q9',
          text: '1958 A coup d’état in Iraq results in the assassinations of King Faisal, premier Nuri al-Saʿid, and scores of other high officials.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-3',
            loc: { section: 'Chronology of Iranian History Part 3, 1958' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-3/'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/8e/Abd_al-Karim_Qasim_in_first_conference_After_14_July_Revolution.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Abd_al-Karim_Qasim_in_first_conference_After_14_July_Revolution.jpg',
    credit: { institution: 'iraq-archive.com' },
    license: { id: 'public-domain' }
  }
})
