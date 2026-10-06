import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'herero-and-nama-genocide-and-nazi-violence',
  about: ['event:herero-and-nama-genocide'],
  topic: 'significance',
  researched: '2026-10-06',
  framing: {
    id: 'q1',
    text: 'Our understanding of the massacre of the Herero and Nama is evidently informed by our understanding of the genocide of European Jewish populations: numerous well-documented aspects of the “Final Solution to the Jewish Question” are present in German colonial policy.',
    lang: 'en',
    cite: {
      source: 'ehne-patin-herero-and-nama',
      loc: { section: 'A German “special path”?', para: '20' }
    },
    provenance: {
      via: 'web',
      at: '2026-10-06',
      url: 'https://ehne.fr/en/encyclopedia/themes/europe-europeans-and-world/europe-and-colonial-wars/massacre-herero-and-nama-a-colonial-laboratory-genocide'
    }
  },
  positions: [
    {
      id: 'colonial-model',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Jürgen Zimmerer' },
        { kind: 'scholar', name: 'Sven Lindqvist' },
        { kind: 'scholar', name: 'Enzo Traverso' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'Their study revived, belatedly, the notion of a German Sonderweg or “special path,” which would explain how German history had led to Auschwitz. Through the crucial book by Sven Lindqvist, Exterminate All the Brutes! (1992) and, above all, through J. Zimmerer’s work, the question of colonial violence as a model for Nazi violence was raised, a question that was also explored by Enzo Traverso.',
          lang: 'en',
          cite: {
            source: 'ehne-patin-herero-and-nama',
            loc: { section: 'A German “special path”?', para: '21' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/en/encyclopedia/themes/europe-europeans-and-world/europe-and-colonial-wars/massacre-herero-and-nama-a-colonial-laboratory-genocide'
          }
        }
      ]
    },
    {
      id: 'missing-history',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Nicolas Patin', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'Still, one could say that we are missing a genuine cultural history for the transmission of colonial thought, and especially a social history for the actors of these crimes, one that would refine what, in spite of everything, seems obvious.',
          lang: 'en',
          cite: {
            source: 'ehne-patin-herero-and-nama',
            loc: { section: 'A German “special path”?', para: '22' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/en/encyclopedia/themes/europe-europeans-and-world/europe-and-colonial-wars/massacre-herero-and-nama-a-colonial-laboratory-genocide'
          }
        }
      ]
    }
  ]
})
