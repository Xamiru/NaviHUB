import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'charles-gordon-character',
  about: ['person:charles-gordon', 'event:siege-of-khartoum'],
  topic: 'character',
  researched: '2026-10-08',
  positions: [
    {
      id: 'truly-religious-man',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Charles Moore Watson' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'His character was remarkable, and the influence he had over those with whom he came in contact was very striking.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-gordon-charles-george',
            loc: { section: 'GORDON, CHARLES GEORGE', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Gordon,_Charles_George'
          }
        },
        {
          id: 'q2',
          text: 'Though not holding to outward forms of religion, he was a truly religious man in the highest sense of the word, and was a constant student of the Bible. To serve God and to do his duty were the great objects of his life, and he died as he had lived, carrying out the work that lay before him to the best of his ability.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-gordon-charles-george',
            loc: { section: 'GORDON, CHARLES GEORGE', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Gordon,_Charles_George'
          }
        }
      ]
    },
    {
      id: 'quixotic-conduct',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Lord Cromer' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'We may admire, and for my own part I do very much admire General Gordon’s personal courage, his disinterestedness and his chivalrous feeling in favour of the beleaguered garrisons, but admiration of these qualities is no sufficient plea against a condemnation of his conduct on the ground that it was quixotic.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-gordon-charles-george',
            loc: { section: 'GORDON, CHARLES GEORGE', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Gordon,_Charles_George'
          }
        },
        {
          id: 'q4',
          text: 'He thought more of his personal opinions than of the interests of the state.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-gordon-charles-george',
            loc: { section: 'GORDON, CHARLES GEORGE', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Gordon,_Charles_George'
          }
        }
      ]
    },
    {
      id: 'hero-of-impulse',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'John Morley' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'Gordon, as Mr Gladstone said, was a hero of heroes.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-gordon-charles-george',
            loc: { section: 'GORDON, CHARLES GEORGE', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Gordon,_Charles_George'
          }
        },
        {
          id: 'q6',
          text: 'But as all who knew him admit, and as his own records testify, notwithstanding an undercurrent of shrewd common sense, he was the creature, almost the sport, of impulse;',
          lang: 'en',
          cite: {
            source: 'britannica-1911-gordon-charles-george',
            loc: { section: 'GORDON, CHARLES GEORGE', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Gordon,_Charles_George'
          }
        },
        {
          id: 'q7',
          text: 'Mr Gladstone always professed perplexity in understanding why the violent end of the gallant Cavagnari in Afghanistan stirred the world so little in comparison with the fate of Gordon. The answer is that Gordon seized the imagination of England, and seized it on its higher side.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-gordon-charles-george',
            loc: { section: 'GORDON, CHARLES GEORGE', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Gordon,_Charles_George'
          }
        }
      ]
    }
  ]
})
