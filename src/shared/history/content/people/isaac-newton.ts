import { definePerson } from '../../schema'

export default definePerson({
  id: 'isaac-newton',
  names: [
    { text: 'Isaac Newton', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-13',
  born: {
    alts: [
      {
        value: { d: '1642' },
        cites: [
          {
            source: 'britannica-1911-newton-sir-isaac',
            loc: { section: 'Newton, Sir Isaac', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1727' },
        cites: [
          {
            source: 'britannica-1911-newton-sir-isaac',
            loc: { section: 'Newton, Sir Isaac', para: '1' }
          },
          {
            source: 'britannica-1911-newton-sir-isaac',
            loc: { section: 'Newton, Sir Isaac', para: '113' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  roles: ['scientist'],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/39/GodfreyKneller-IsaacNewton-1689.jpg/1280px-GodfreyKneller-IsaacNewton-1689.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:GodfreyKneller-IsaacNewton-1689.jpg',
    credit: { creator: 'Godfrey Kneller' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'In January 1684 Sir Christopher Wren, Halley and Hooke were led to discuss the law of gravity, and, although probably they all agreed in the truth of the law of the inverse square, yet this truth was not looked upon as established.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-newton-sir-isaac',
            loc: { section: 'Newton, Sir Isaac', para: '50' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Newton,_Sir_Isaac'
          }
        },
        {
          id: 'q2',
          text: 'The third book was presented to the Society on the 6th of April 1687, and the whole work published about midsummer in that year.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-newton-sir-isaac',
            loc: { section: 'Newton, Sir Isaac', para: '65' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Newton,_Sir_Isaac'
          }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q3',
          text: 'His father (also Isaac Newton) who farmed a small freehold property of his own, died before his son’s birth, a few months after his marriage to Hannah Ayscough, a daughter of James Ayscough of Market-Overton.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-newton-sir-isaac',
            loc: { section: 'Newton, Sir Isaac', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Newton,_Sir_Isaac'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q4',
          text: 'On the 21st of December 1671 he was proposed as a candidate for admission into the Royal Society by Dr Seth Ward, bishop of Salisbury, and on the 11th of January 1672 he was elected a fellow of the Society.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-newton-sir-isaac',
            loc: { section: 'Newton, Sir Isaac', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Newton,_Sir_Isaac'
          }
        }
      ]
    },
    {
      kind: 'works',
      quotes: [
        {
          id: 'q5',
          text: 'The work, as might have been expected, caused a great deal of excitement throughout Europe, and the whole of the impression was very soon sold.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-newton-sir-isaac',
            loc: { section: 'Newton, Sir Isaac', para: '65' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Newton,_Sir_Isaac'
          }
        },
        {
          id: 'q6',
          text: 'In 1691 a copy of the Principia was hardly to be procured.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-newton-sir-isaac',
            loc: { section: 'Newton, Sir Isaac', para: '65' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Newton,_Sir_Isaac'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q7',
          text: 'On the 28th of February 1727, feeling well, he went to London to preside at a meeting of the Royal Society; but the fatigue which attended this duty brought on a violent return of his former complaint, and he returned to Kensington on the 4th of March, when Dr Mead and Dr Chesselden pronounced his disease to be stone.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-newton-sir-isaac',
            loc: { section: 'Newton, Sir Isaac', para: '113' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Newton,_Sir_Isaac'
          }
        }
      ]
    }
  ]
})
