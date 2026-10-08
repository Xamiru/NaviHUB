import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'qajar-iran-nature',
  about: ['polity:qajar-iran'],
  topic: 'nature',
  positions: [
    {
      id: 'absolute-monarchy-under-the-sharia',
      category: 'contemporary',
      holders: [
        { kind: 'media', name: 'Encyclopædia Britannica (1911)' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'Up to the year 1906 the government of Persia was an absolute monarchy, and resembled in its principal features that of the Ottoman Empire, with the exception, however, that the monarch was not the religious head of the community.',
          lang: 'en',
          cite: { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '758' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Persia'
          }
        }
      ]
    },
    {
      id: 'weak-central-authority',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'Iranian central authority was weak; revenues were generally inadequate to maintain the court, bureaucracy, and army; the ruling class was divided and corrupt; and the people suffered exploitation by their rulers and governors.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE QAJARS, 1795-1925', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iran/12.htm' }
        }
      ]
    },
    {
      id: 'centralized-monarchy-without-a-modern-state',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Abbas Amanat' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'Yet the shah’s complacency, rooted in a culture of conquest, was never distant enough from the tribal norms and familial mores so as to allow, with few exceptions, the budding of a modern state, even to the extent that his Ottoman and Egyptian contemporaries were able to achieve.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-fath-ali-shah',
            loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '36' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/fath-ali-shah'
          }
        }
      ]
    }
  ],
  researched: '2026-10-08'
})
