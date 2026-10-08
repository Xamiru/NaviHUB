import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'amir-kabir-legacy',
  about: ['person:amir-kabir', 'event:reforms-of-amir-kabir'],
  topic: 'legacy',
  researched: '2026-10-08',
  positions: [
    {
      id: 'european-observers',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Robert Grant Watson' },
        { kind: 'participant', name: 'Lady Sheil (Mary Leonora Woulfe Sheil)' }
      ],
      statements: [
        {
          id: 'q6',
          text: 'Meerza Teki Khan, who was at this time appointed to be the Ameer-i-Nizam, or commander-in-chief of the Persian army, owed his elevation entirely to his talents and his services. He was a man altogether of a different nature from that of his countrymen in general. Belisarius did not tower over the degenerate Romans of his day more than did the Ameer-i-Nizam over his contemporaries, the successors of the adversaries of " the last of the Roman generals." The race of modern Persians cannot be said to be altogether effete, since so recently it has been able to produce a man such as was the Ameer-i-Nizam.',
          lang: 'en',
          cite: {
            source: 'watson-1866-history-of-persia',
            loc: { section: 'Chapter XII. The Ameer-i-Nizam', page: '364' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://archive.org/download/historyofpersiaf00watsrich/historyofpersiaf00watsrich_djvu.txt'
          }
        },
        {
          id: 'q7',
          text: 'Thus perished, by the hands of Persians, the man who had done so much to regenerate Persia : the only man who possessed at the same time the ability, the patriotism, the energy and the integrity required to enable a Persian Minister to conduct the vessel of State in safety past the shoals and rocks which lay in her course.',
          lang: 'en',
          cite: {
            source: 'watson-1866-history-of-persia',
            loc: { section: 'Chapter XIII. Remembrance of his Administration', page: '404' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://archive.org/download/historyofpersiaf00watsrich/historyofpersiaf00watsrich_djvu.txt'
          }
        },
        {
          id: 'q8',
          text: 'The Shah was not much blamed, but the instigators, high as was their station, were execrated as murderers. The patriotism evinced in the earnest desire of the Ameer to elevate Persia was remembered, and his faults were pardoned.',
          lang: 'en',
          cite: {
            source: 'sheil-1856-glimpses-of-life-and-manners-in-persia',
            loc: { section: 'Chapter XVII' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://archive.org/download/glimpsesoflifema00sheiiala/glimpsesoflifema00sheiiala_djvu.txt'
          }
        }
      ]
    },
    {
      id: 'servant-of-the-state',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Hamid Algar' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'Amīr Kabīr should be seen primarily, however, as an unusually loyal and effective servant of the traditional state whose primary objective was the strengthening of the central government.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-amir-kabir',
            loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/amir-e-kabir-mirza-taqi-khan'
          }
        },
        {
          id: 'q5',
          text: 'He was only incidentally an agent of modernization and westernization, themes that were elaborated later by men of an ideological disposition alien to the great administrator and man of affairs that was Amīr Kabīr.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-amir-kabir',
            loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/amir-e-kabir-mirza-taqi-khan'
          }
        }
      ]
    }
  ],
  framing: {
    id: 'q3',
    text: 'Modern Iranian historiography has done him more justice, depicting him as one of the few capable and honest statesmen to emerge in the Qajar period and the progenitor of various political and social changes that came about half a century later.',
    lang: 'en',
    cite: {
      source: 'iranica-algar-amir-kabir',
      loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '15' }
    },
    provenance: {
      via: 'web',
      at: '2026-10-06',
      url: 'https://www.iranicaonline.org/articles/amir-e-kabir-mirza-taqi-khan'
    }
  }
})
