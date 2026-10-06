import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'battle-of-trafalgar-significance',
  about: ['event:battle-of-trafalgar'],
  topic: 'significance',
  researched: '2026-10-06',
  framing: {
    id: 'q1',
    text: 'Perhaps in the case of few victories has the outcome been so different from that which has been assigned to it in the popular belief.',
    lang: 'en',
    cite: {
      source: 'holland-rose-1905-true-significance-of-trafalgar',
      loc: { section: 'The true significance of Trafalgar', para: '2' }
    },
    provenance: {
      via: 'web',
      at: '2026-10-06',
      url: 'https://www.napoleon.org/en/reading_room/articles/files/rose_trafalgar.asp'
    }
  },
  positions: [
    {
      id: 'saved-from-invasion',
      category: 'popular',
      holders: [
        { kind: 'public', name: 'British public' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'The impression that England’s safety from invasion resulted from the Battle of Trafalgar, was strengthened when men came to read the last despatches and letters of the hero.',
          lang: 'en',
          cite: {
            source: 'holland-rose-1905-true-significance-of-trafalgar',
            loc: { section: 'The true significance of Trafalgar', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.napoleon.org/en/reading_room/articles/files/rose_trafalgar.asp'
          }
        }
      ]
    },
    {
      id: 'napoleon-made-light',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Napoleon Bonaparte', ref: 'person:napoleon-bonaparte' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'Far from being “beaten to his narrow-bones”, the Emperor made light of “ce combat de Cadiz”, when he heard of it at Znaim in Moravia (18th November).',
          lang: 'en',
          cite: {
            source: 'holland-rose-1905-true-significance-of-trafalgar',
            loc: { section: 'The true significance of Trafalgar', para: '23' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.napoleon.org/en/reading_room/articles/files/rose_trafalgar.asp'
          }
        }
      ]
    },
    {
      id: 'rose-continental-war',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'John Holland Rose' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'We have now seen, from the Emperor’s own despatches, that it was the outbreak of war with Austria and Russia, along with Villeneuve’s tame retreat to Cadiz, which gave England a time of respite, while her great foe betook himself to guerrilla tactics on sea.',
          lang: 'en',
          cite: {
            source: 'holland-rose-1905-true-significance-of-trafalgar',
            loc: { section: 'The true significance of Trafalgar', para: '22' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.napoleon.org/en/reading_room/articles/files/rose_trafalgar.asp'
          }
        },
        {
          id: 'q5',
          text: 'nevertheless, its ultimate results in the sphere of European policy were incalculably great.',
          lang: 'en',
          cite: {
            source: 'holland-rose-1905-true-significance-of-trafalgar',
            loc: { section: 'The true significance of Trafalgar', para: '27' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.napoleon.org/en/reading_room/articles/files/rose_trafalgar.asp'
          }
        }
      ]
    }
  ]
})
