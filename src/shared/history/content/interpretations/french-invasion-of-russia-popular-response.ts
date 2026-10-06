import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'french-invasion-of-russia-popular-response',
  about: ['event:french-invasion-of-russia'],
  topic: 'nature',
  researched: '2026-10-06',
  framing: {
    id: 'q1',
    text: 'What then was the Russian response to the Napoleonic invasion?',
    lang: 'en',
    cite: {
      source: 'hartley-1991-napoleon-in-russia',
      loc: { section: 'Napoleon in Russia: Saviour or anti-christ?', para: '3' }
    },
    provenance: {
      via: 'web',
      at: '2026-10-06',
      url: 'https://www.napoleon.org/en/reading_room/articles/files/napoleon_russia_saviour_antichrist.asp'
    }
  },
  positions: [
    {
      id: 'class-war',
      category: 'scholarly',
      holders: [
        { kind: 'school', name: 'Soviet historians' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'Soviet historians, and some Western historians, have interpreted these revolts in terms of class war.',
          lang: 'en',
          cite: {
            source: 'hartley-1991-napoleon-in-russia',
            loc: { section: 'Napoleon in Russia: Saviour or anti-christ?', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.napoleon.org/en/reading_room/articles/files/napoleon_russia_saviour_antichrist.asp'
          }
        }
      ]
    },
    {
      id: 'opportunity',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Janet M. Hartley', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'It seems more likely that the Grand Army gave the peasants not so much ideological inspiration as the opportunity to commit sporadic violence, taking advantage of the temporary collapse of law and order.',
          lang: 'en',
          cite: {
            source: 'hartley-1991-napoleon-in-russia',
            loc: { section: 'Napoleon in Russia: Saviour or anti-christ?', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.napoleon.org/en/reading_room/articles/files/napoleon_russia_saviour_antichrist.asp'
          }
        }
      ]
    },
    {
      id: 'patriotic-outburst',
      category: 'popular',
      holders: [
        { kind: 'public', name: 'Contemporary and later accounts' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'Although individuals might seek advantage from Napoleon, the general picture given by most contemporary and later accounts is one of a patriotic outburst against the invader.',
          lang: 'en',
          cite: {
            source: 'hartley-1991-napoleon-in-russia',
            loc: { section: 'Napoleon in Russia: Saviour or anti-christ?', para: '24' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.napoleon.org/en/reading_room/articles/files/napoleon_russia_saviour_antichrist.asp'
          }
        }
      ]
    }
  ]
})
