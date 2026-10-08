import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'kingdom-of-hawaii-overthrow-legitimacy',
  about: ['polity:kingdom-of-hawaii'],
  topic: 'legitimacy',
  researched: '2026-10-09',
  positions: [
    {
      id: 'monarchy-forfeited-by-its-own-act',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Encyclopædia Britannica (11th edition, 1911)' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'She had a new constitution drawn up, practically providing for an absolute monarchy, and disfranchising a large class of citizens who had voted since 1887; this constitution (drawn up, so the royal party declared, in reply to a petition signed by thousands of natives) she undertook to force on the country after proroguing the legislature on the 14th of January 1893, but her ministers shrank from the responsibility of so revolutionary an act, and with difficulty prevailed upon her to postpone the execution of her design. An uprising similar to that of 1887 declared the monarchy forfeited by its own act.',
          lang: 'en',
          cite: { source: 'britannica-1911-hawaii', loc: { section: 'HAWAII', para: '43' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Hawaii'
          }
        }
      ]
    },
    {
      id: 'contrary-to-the-will-of-native-hawaiians',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'National Archives and Records Administration' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'The overthrow of Lili\'uokalani and imposition of the Republic of Hawaii was contrary to the will of the native Hawaiians.',
          lang: 'en',
          cite: {
            source: 'nara-milestone-joint-resolution-annexing-hawaii',
            loc: {
              section: 'Joint Resolution to Provide for Annexing the Hawaiian Islands to the United States (1898)',
              para: '10'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.archives.gov/milestone-documents/joint-resolution-for-annexing-the-hawaiian-islands'
          }
        }
      ]
    }
  ]
})
