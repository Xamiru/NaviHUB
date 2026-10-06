import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'murder-of-alexander-griboedov-responsibility',
  about: ['event:murder-of-alexander-griboedov'],
  topic: 'responsibility',
  researched: '2026-10-06',
  positions: [
    {
      id: 'griboedov-provocation',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Hedāyat' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'His behavior, according to Persian sources, was abominable.',
          lang: 'en',
          cite: {
            source: 'iranica-bournoutian-griboedov',
            loc: { section: 'GRIBOEDOV, ALEXANDER SERGEEVICH', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/griboedov-alexander-sergeevich/'
          }
        },
        {
          id: 'q2',
          text: 'He and his staff insulted Muslims in the bāzār and took a number of Christian women, who had converted to Islam, to the Mission.',
          lang: 'en',
          cite: {
            source: 'iranica-bournoutian-griboedov',
            loc: { section: 'GRIBOEDOV, ALEXANDER SERGEEVICH', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/griboedov-alexander-sergeevich/'
          }
        }
      ]
    },
    {
      id: 'refuge-and-women',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Elena Andreeva', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'Griboedov’s men would search for women of Georgian and Armenian origin and would take them to Griboedof’s residence. Incited by Āḡā Yaʿqub, he demanded that two Georgian women who had converted to Islam and were in the harem of Allāhyār Khan Āṣaf-al-Dawla, a prominent aristocrat related to the royal family, be turned over to him.',
          lang: 'en',
          cite: {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '25'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
          }
        },
        {
          id: 'q4',
          text: 'The rumor spread that they had been forced to renounce Islam.',
          lang: 'en',
          cite: {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '25'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
          }
        }
      ],
      standing: {
        label: 'majority',
        quote: {
          id: 'q5',
          text: 'The most commonly accepted version of this controversial event is that Griboedov gave refuge at the Russian Mission to Āḡā Yaʿqub Khan, an important eunuch of Armenian origin in the shah’s service and in charge of a large amount of money belonging to the royal household.',
          lang: 'en',
          cite: {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '25'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
          }
        }
      }
    },
    {
      id: 'colleagues-blamed-griboedov',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Ivan Simonich' },
        { kind: 'participant', name: 'Alexander Diugamel' }
      ],
      statements: [
        {
          id: 'q6',
          text: 'Several of Griboedov’s colleagues, including Ivan Simonich and Alexander Diugamel, both of whom served as Russian ministers in Tehran after Griboedov, later accused him of an arrogant and even humiliating behavior towards the shah and his ministers.',
          lang: 'en',
          cite: {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '25'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
          }
        },
        {
          id: 'q7',
          text: 'They claimed that it was both disrespectful and ignorant of Griboedov to keep the women in the Russian Mission building.',
          lang: 'en',
          cite: {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '25'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
          }
        }
      ]
    },
    {
      id: 'british-agents-and-reactionaries',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'B. P. Balaian' },
        { kind: 'scholar', name: 'I. K. Enikolopov' }
      ],
      statements: [
        {
          id: 'q8',
          text: 'Russian sources claim that British agents, who feared Russian influence in Tehran, and Persian reactionaries, who were not satisfied with the Torkamānčāy treaty, were responsible for inciting the mob (Balaian, Enikolopov).',
          lang: 'en',
          cite: {
            source: 'iranica-bournoutian-griboedov',
            loc: { section: 'GRIBOEDOV, ALEXANDER SERGEEVICH', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/griboedov-alexander-sergeevich/'
          }
        }
      ]
    }
  ]
})
