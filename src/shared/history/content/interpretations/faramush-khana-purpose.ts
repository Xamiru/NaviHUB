import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'faramush-khana-purpose',
  about: ['event:faramush-khana', 'person:malkom-khan'],
  topic: 'motives',
  researched: '2026-10-08',
  framing: {
    id: 'q1',
    text: 'Malkom’s purpose in assembling these dignitaries was varyingly presented by himself and interpreted by others.',
    lang: 'en',
    cite: {
      source: 'iranica-algar-freemasonry-qajar',
      loc: { section: 'FREEMASONRY ii. In the Qajar Period', para: '7' }
    },
    provenance: {
      via: 'web',
      at: '2026-10-06',
      url: 'https://www.iranicaonline.org/articles/freemasonry-ii-in-the-qajar-period'
    }
  },
  positions: [
    {
      id: 'malkom-self-presentations',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Hamid Algar' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'In a treatise written apparently while the farāmūš-ḵāna was still functioning, he defended it against actual or anticipated charges of subverting religion; if secrecy characterized its functioning, he explained, this was precisely because prudential concealment (ketmān) was a well-established principle of Shiʿite Islam, and the goal of masonry was nothing other than establishing fraternity among the believers (Resāla-ye farāmūš-ḵāna, cited in Rāʾīn, 1969, I, pp. 545-54).',
          lang: 'en',
          cite: {
            source: 'iranica-algar-freemasonry-qajar',
            loc: { section: 'FREEMASONRY ii. In the Qajar Period', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/freemasonry-ii-in-the-qajar-period'
          }
        },
        {
          id: 'q3',
          text: 'Instead, he ascribed to Freemasonry straightforward worldly purposes such as the fostering of modern learning, civic virtue, and social solidarity (Āḵūndzāda, pp. 294-95).',
          lang: 'en',
          cite: {
            source: 'iranica-algar-freemasonry-qajar',
            loc: { section: 'FREEMASONRY ii. In the Qajar Period', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/freemasonry-ii-in-the-qajar-period'
          }
        }
      ]
    },
    {
      id: 'westernizing-reform',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Hamid Algar' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'From this, and from the content of treatises on governmental reform that Malkom wrote during the years when the farāmūš-ḵāna was operating, it may be deduced that his purpose was to gather together under his leadership members of the Persian elite who might be disposed to some degree of westernizing reform.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-freemasonry-qajar',
            loc: { section: 'FREEMASONRY ii. In the Qajar Period', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/freemasonry-ii-in-the-qajar-period'
          }
        }
      ]
    },
    {
      id: 'subversion-and-babis',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Hamid Algar' },
        { kind: 'scholar', name: 'Denis M. MacEoin' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'It was therefore easy for courtiers hostile to Malkom to persuade the ruler that all potential sources of subversion had to be blocked. Moreover, suspicions persisted that the farāmūš-ḵāna was hostile to Islam and even harbored Bābīs, despite the presence in it of a handful of ʿolamāʾ and Malkom’s own protestations of religiosity.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-freemasonry-qajar',
            loc: { section: 'FREEMASONRY ii. In the Qajar Period', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/freemasonry-ii-in-the-qajar-period'
          }
        },
        {
          id: 'q6',
          text: 'It is, in fact, important to remember that the farāmūš-ḵānas were regarded by many as centers for Babi recruitment and proselytizing (Gobineau, Religions et philosophies, p. 274).',
          lang: 'en',
          cite: {
            source: 'iranica-maceoin-azali-babism',
            loc: { section: 'AZALI BABISM', para: '7' }
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
