import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'mikhail-kutuzov-reputation',
  about: ['person:mikhail-kutuzov'],
  topic: 'character',
  researched: '2026-10-06',
  framing: {
    id: 'q1',
    text: 'A study found in the memoirs of General Langeron, a French royalist who served in the Russian army during the Russo-Turkish war, offers a conflicting insight into the immortalisation of Kutuzov.',
    lang: 'en',
    cite: {
      source: 'fondation-napoleon-kutuzov',
      loc: { section: 'KUTUZOV, Mikhail Illarionovich Golenishchev', para: '2' }
    },
    provenance: {
      via: 'web',
      at: '2026-10-06',
      url: 'https://www.napoleon.org/en/reading_room/biographies/files/481511.asp'
    }
  },
  positions: [
    {
      id: 'immortalised',
      category: 'popular',
      holders: [
        { kind: 'public', name: 'Russian authors and historians' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'His body was transferred to Russia, and buried in the Cathedral of Our Lady of Kazan, St. Petersburg; immortality in the eyes of Russian authors and historians subsequently followed.',
          lang: 'en',
          cite: {
            source: 'fondation-napoleon-kutuzov',
            loc: { section: 'KUTUZOV, Mikhail Illarionovich Golenishchev', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.napoleon.org/en/reading_room/biographies/files/481511.asp'
          }
        }
      ]
    },
    {
      id: 'langeron',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Louis Alexandre Andrault de Langeron' }
      ],
      statements: [
        {
          id: 'q3',
          text: '“No-one had more spirit but less character than Kutuzov.',
          lang: 'en',
          cite: {
            source: 'fondation-napoleon-kutuzov',
            loc: { section: 'KUTUZOV, Mikhail Illarionovich Golenishchev', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.napoleon.org/en/reading_room/biographies/files/481511.asp'
          }
        },
        {
          id: 'q4',
          text: 'But this Kutuzov, so immoral in his behaviour and his principles, so mediocre as head of an army, had the quality (if one can indeed call it that) demanded by Cardinal Mazarin in all the generals in his service. He was lucky, except at Austerlitz – the disasters of which he cannot be blamed (for he was only leader in name). Fortune constantly favoured him: the miraculous campaign of 1812 was the glorious, crowning moment in this; it must have been greatly surprised to have become his success.',
          lang: 'en',
          cite: {
            source: 'fondation-napoleon-kutuzov',
            loc: { section: 'KUTUZOV, Mikhail Illarionovich Golenishchev', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.napoleon.org/en/reading_room/biographies/files/481511.asp'
          }
        }
      ]
    }
  ]
})
