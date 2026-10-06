import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'babi-succession-dispute',
  about: ['event:babi-bahai-schism', 'person:sobh-e-azal', 'person:bahaullah'],
  topic: 'legitimacy',
  researched: '2026-10-06',
  positions: [
    {
      id: 'azal-designated-successor',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Denis M. MacEoin' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'Numerous references in writings by the Bāb from this period seem to provide strong evidence that Azal (also referred to as al-Waḥīd, Ṭaḷʿat al-Nūr, and al-Ṯamara) was regarded by him as his chief deputy following the deaths of most of the original Babi hierarchy, and as the future head of the movement.',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-azali-babism',
            loc: { section: 'AZALI BABISM', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/azali-babism'
          }
        }
      ]
    },
    {
      id: 'azal-nominal-leader',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Juan R. I. Cole' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'But surprisingly, the Bāb appears to have indicated for Mīrzā Yaḥyā Ṣobḥ-e Azal (then around nineteen) a high station or leadership position, at least nominally, in Babism.',
          lang: 'en',
          cite: { source: 'iranica-cole-baha-allah', loc: { section: 'BAHĀʾ-ALLĀH', para: '6' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/baha-allah'
          }
        },
        {
          id: 'q3',
          text: 'The young Azal, however, seems to have possessed little widespread authority or legitimacy, and the 1850s saw the Babi community splinter into a number a regional sects headed by various claimants to theophanic status.',
          lang: 'en',
          cite: { source: 'iranica-cole-baha-allah', loc: { section: 'BAHĀʾ-ALLĀH', para: '6' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/baha-allah'
          }
        },
        {
          id: 'q4',
          text: 'Azal, who followed a policy of keeping himself incognito, provided little effective leadership.',
          lang: 'en',
          cite: {
            source: 'iranica-cole-bahaism-i',
            loc: { section: 'BAHAISM i. The Faith', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/bahaism-index/bahaism-i'
          }
        }
      ]
    },
    {
      id: 'appointment-a-ruse',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Baháʼu\'lláh', ref: 'person:bahaullah' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'Bahāʾ-Allāh and his supporters in any case held that the Bāb’s appointment of Azal had been a ruse to draw the fire of Iranian officials from Bahāʾ-Allāh.',
          lang: 'en',
          cite: { source: 'iranica-cole-baha-allah', loc: { section: 'BAHĀʾ-ALLĀH', para: '14' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/baha-allah'
          }
        },
        {
          id: 'q6',
          text: 'For his followers, Bahāʾ-Allāh’s assertion that he was an independent manifestation of God able to found a new dispensation made Azal’s position as head of the old Babi religion irrelevant.',
          lang: 'en',
          cite: { source: 'iranica-cole-baha-allah', loc: { section: 'BAHĀʾ-ALLĀH', para: '14' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/baha-allah'
          }
        }
      ]
    },
    {
      id: 'azal-legitimate-successor',
      category: 'contemporary',
      holders: [
        { kind: 'organization', name: 'Azalis' }
      ],
      statements: [
        {
          id: 'q7',
          text: 'Ṣobḥ-e Azal responded by asserting his own claims and resisting the wholesale changes in doctrine and practice introduced by his brother.',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-azali-babism',
            loc: { section: 'AZALI BABISM', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/azali-babism'
          }
        }
      ]
    }
  ]
})
