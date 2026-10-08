import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'eureka-stockade-naming',
  about: ['event:eureka-stockade'],
  topic: 'naming',
  positions: [
    {
      id: 'massacre',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Raffaello Carboni' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'On the day of judgment it will go milder with the Emperor Nicholas, than with the man, whoever he may be, that prompted and counted on the Eureka massacre on the Sunday morning, December 3rd, 1854.',
          lang: 'en',
          cite: { source: 'carboni-1855-eureka-stockade', loc: { section: 'The Eureka Stockade' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/The_Eureka_Stockade'
          }
        },
        {
          id: 'q2',
          text: 'I challenge contradiction from any bona fide digger, who was present at the stockade during the massacre on the morning of December 3rd, 1854.',
          lang: 'en',
          cite: { source: 'carboni-1855-eureka-stockade', loc: { section: 'The Eureka Stockade' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/The_Eureka_Stockade'
          }
        }
      ]
    },
    {
      id: 'riots',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Encyclopædia Britannica (1911)' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'The discontent culminated, at Ballarat in December 1854, in riots in which there was a considerable loss of life both amongst the miners and the troops.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-victoria-australia',
            loc: { section: 'VICTORIA', para: '96' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Victoria_(Australia)'
          }
        }
      ]
    },
    {
      id: 'democratic-watershed',
      category: 'official',
      holders: [
        {
          kind: 'organization',
          name: 'Museum of Australian Democracy at Old Parliament House'
        }
      ],
      statements: [
        {
          id: 'q4',
          text: 'It is hailed as a watershed in Australian democracy, replacing the hated monthly licensing system and effectively giving the right to vote to those holding a Miner’s Right.',
          lang: 'en',
          cite: {
            source: 'moad-exploring-democracy-raffaello-carboni',
            loc: { section: 'Raffaello Carboni' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://explore.moadoph.gov.au/people/raffaello-carboni.html'
          }
        }
      ]
    }
  ],
  researched: '2026-10-08'
})
