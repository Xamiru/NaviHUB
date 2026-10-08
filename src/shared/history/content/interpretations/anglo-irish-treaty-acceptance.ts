import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'anglo-irish-treaty-acceptance',
  about: ['event:anglo-irish-treaty'],
  topic: 'legitimacy',
  researched: '2026-10-09',
  positions: [
    {
      id: 'recommend-the-treaty',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'A. Griffith' },
        { kind: 'participant', name: 'M. Collins' },
        { kind: 'participant', name: 'R. Barton' },
        { kind: 'participant', name: 'W. Cosgrave' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'Following a discussion of the terms of the Treaty the following members declared in favour of recommending it to the Dáil: - A. Griffith, M. Collins, R. Barton, W. Cosgrave, K O\'Higgins (no vote).',
          lang: 'en',
          cite: { source: 'difp-1921-12-08-cabinet-minutes', loc: { section: 'No. 215', para: '4' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.difp.ie/volume-1/1921/anglo-irish-treaty/215/'
          }
        },
        {
          id: 'q2',
          text: 'Mr Griffith would recommend document on basis of its merits - the remaining members on basis of signature.',
          lang: 'en',
          cite: { source: 'difp-1921-12-08-cabinet-minutes', loc: { section: 'No. 215', para: '5' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.difp.ie/volume-1/1921/anglo-irish-treaty/215/'
          }
        }
      ]
    },
    {
      id: 'reject-the-treaty',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'The President of Dáil Éireann' },
        { kind: 'participant', name: 'Cathal Brugha' },
        { kind: 'participant', name: 'A. Stack' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'The following declared against recommending Treaty to Dáil: President, Cathal Brugha and A. Stack.',
          lang: 'en',
          cite: { source: 'difp-1921-12-08-cabinet-minutes', loc: { section: 'No. 215', para: '6' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.difp.ie/volume-1/1921/anglo-irish-treaty/215/'
          }
        },
        {
          id: 'q4',
          text: 'The President to issue a statement to the press defining his position and that of the Min[ister]s of H[ome]A[ffairs] and Def[ence].',
          lang: 'en',
          cite: { source: 'difp-1921-12-08-cabinet-minutes', loc: { section: 'No. 215', para: '8' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.difp.ie/volume-1/1921/anglo-irish-treaty/215/'
          }
        }
      ]
    },
    {
      id: 'end-of-centuries-of-strife',
      category: 'official',
      holders: [
        { kind: 'state', name: 'United Kingdom' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'It is my earnest hope that by the Articles of Agreement now submitted to you the strife of centuries may be ended, and that Ireland, as a free partner in the Commonwealth of Nations forming the British Empire, will secure the fulfilment of her national ideals.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1921-12-14-irish-free-state',
            loc: { section: 'HC Deb 14 December 1921 vol 149 c5', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://api.parliament.uk/historic-hansard/commons/1921/dec/14/irish-free-state'
          }
        }
      ],
      reception: [
        {
          id: 'q7',
          text: 'This compromise had provoked a civil war in Ireland, but by 1923 the pro-Treaty side had emerged victorious and the partition of the country had become permanent.',
          lang: 'en',
          cite: {
            source: 'eo1418-leeson-post-war-conflict-great-britain-and-ireland',
            loc: { section: 'Post-war Conflict (Great Britain and Ireland)' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://encyclopedia.1914-1918-online.net/article/post-war-conflict-great-britain-and-ireland/'
          }
        }
      ]
    },
    {
      id: 'no-military-solution',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Sir Samuel Hoare' }
      ],
      statements: [
        {
          id: 'q6',
          text: 'The Irish problem is not a military problem. A military solution could not touch it.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1921-12-14-debate-on-the-address',
            loc: { section: 'HC Deb 14 December 1921 vol 149 cc6-26', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://api.parliament.uk/historic-hansard/commons/1921/dec/14/debate-on-the-address'
          }
        }
      ]
    }
  ]
})
