import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'opening-of-the-karun-river-significance',
  about: ['event:opening-of-the-karun-river'],
  topic: 'significance',
  researched: '2026-10-08',
  positions: [
    {
      id: 'enlightened-policy',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Marquess of Salisbury' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'I believe the result of the negotiations is due to a very great extent to the spontaneous act of the Shah of Persia himself.',
          lang: 'en',
          cite: {
            source: 'hansard-lords-1888-12-11-persia-opening-of-the-karun-river',
            loc: { section: 'HL Deb 11 December 1888 vol 331 cc1738-9', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://api.parliament.uk/historic-hansard/lords/1888/dec/11/question-observations-1'
          }
        },
        {
          id: 'q6',
          text: 'To a very great extent, quite spontaneously, he has resolved upon this act of wisdom, which benefits not England only, but all the commercial nations of the globe; and I heartily hope that it will be the beginning of measures which will be beneficial not specially to England alone, but above all to the Persian people themselves.',
          lang: 'en',
          cite: {
            source: 'hansard-lords-1888-12-11-persia-opening-of-the-karun-river',
            loc: { section: 'HL Deb 11 December 1888 vol 331 cc1738-9', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://api.parliament.uk/historic-hansard/lords/1888/dec/11/question-observations-1'
          }
        }
      ]
    },
    {
      id: 'minimal-impact',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Abbas Amanat' },
        { kind: 'scholar', name: 'Shahbaz Shahnavaz' }
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
        }
      ]
    }
  ]
})
