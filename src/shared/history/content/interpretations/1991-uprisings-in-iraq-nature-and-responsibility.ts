import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: '1991-uprisings-in-iraq-nature-and-responsibility',
  about: ['event:1991-uprisings-in-iraq'],
  topic: 'nature',
  positions: [
    {
      id: 'governor-of-basra-the-criminals',
      category: 'official',
      holders: [
        { kind: 'participant', name: 'Abdallah Taleb Azjan (Governor of Basra)' },
        { kind: 'state', name: 'Republic of Iraq' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'Basra Governor Abdallah Taleb Azjan was quoted by the Iraqi News Agency as saying on March 19 that the "criminals" targeted public utilities, schools, and citizens\' property, which they burned and ransacked, not even sparing the homes of elders, the Institute of the Deaf and Mute, and commercial shops. He accused them of stealing food and robbing homes, committing rape, killing innocent victims as well as party and government officials, and mutilating bodies.',
          lang: 'en',
          cite: {
            source: 'hrw-1992-endless-torment-the-1991-uprising-in-iraq',
            loc: {
              section: 'Endless Torment: The 1991 Uprising in Iraq and Its Aftermath',
              para: '301'
            }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://www.hrw.org/reports/1992/Iraq926.htm' }
        }
      ],
      reception: [
        {
          id: 'q2',
          text: 'The official explanation is likely to remain unconfirmed so long as Iraq does not permit independent investigators to conduct proper exhumations of mass graves in Iraq.',
          lang: 'en',
          cite: {
            source: 'hrw-1992-endless-torment-the-1991-uprising-in-iraq',
            loc: {
              section: 'Endless Torment: The 1991 Uprising in Iraq and Its Aftermath',
              para: '302'
            }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://www.hrw.org/reports/1992/Iraq926.htm' }
        }
      ]
    },
    {
      id: 'hrw-the-regime-responded-with-atrocities',
      category: 'contemporary',
      holders: [
        { kind: 'organization', name: 'Middle East Watch (Human Rights Watch)' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'One year later, the fate of thousands of Kurds and Shi\'a who were seized during the suppression of the uprising remains unknown.',
          lang: 'en',
          cite: {
            source: 'hrw-1992-endless-torment-the-1991-uprising-in-iraq',
            loc: {
              section: 'Endless Torment: The 1991 Uprising in Iraq and Its Aftermath',
              para: '3'
            }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://www.hrw.org/reports/1992/Iraq926.htm' }
        },
        {
          id: 'q4',
          text: 'In the south, the plight of the Shi\'a is no less dire, although less well-known because the area remains virtually closed to scrutiny by outside observers.',
          lang: 'en',
          cite: {
            source: 'hrw-1992-endless-torment-the-1991-uprising-in-iraq',
            loc: {
              section: 'Endless Torment: The 1991 Uprising in Iraq and Its Aftermath',
              para: '25'
            }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://www.hrw.org/reports/1992/Iraq926.htm' }
        }
      ]
    }
  ],
  researched: '2026-10-10'
})
