import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'opening-of-the-karun-river-significance',
  about: ['event:opening-of-the-karun-river'],
  topic: 'significance',
  researched: '2026-10-06',
  positions: [
    {
      id: 'enlightened-policy',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Lord Salisbury' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'Salisbury instructed Wolff to express to the shah “cordial appreciation” by Her Majesty’s Government of this “spontaneous and enlightened policy” on his part',
          lang: 'en',
          cite: {
            source: 'iranica-shahnavaz-karun-river-opening',
            loc: { section: 'KARUN RIVER iii. The Opening of the Karun', para: '27' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/karun-river/karun_3'
          }
        }
      ]
    },
    {
      id: 'minimal-impact',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Abbas Amanat' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'The 1888 royal firman declaring Kārun a waterway open to shipping of all nations, however, was not what the British expected for the monopoly of the southern trade because the trade resulting from the opening never competed successfully with the trade of the north through the Caspian and Tabriz or even with the traditional Persian Gulf routes through Bušehr or Bandar ʿAbbās. Its impact on the southern markets was minimal.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '32'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/great-britain-ii/'
          }
        }
      ]
    },
    {
      id: 'significant-for-british-influence',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Shahbaz Shahnavaz' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'Nonetheless, the role of the Karun and the bank concessions in the subsequent expansion and consolidation of Britain’s economic and political influence in the south generally, and in Khuzestan particularly, was significant.',
          lang: 'en',
          cite: {
            source: 'iranica-shahnavaz-karun-river-opening',
            loc: { section: 'KARUN RIVER iii. The Opening of the Karun', para: '38' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/karun-river/karun_3'
          }
        },
        {
          id: 'q4',
          text: 'In the long run, however, this optimism proved to be unfounded.',
          lang: 'en',
          cite: {
            source: 'iranica-shahnavaz-karun-river-opening',
            loc: { section: 'KARUN RIVER iii. The Opening of the Karun', para: '27' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/karun-river/karun_3'
          }
        }
      ]
    }
  ]
})
