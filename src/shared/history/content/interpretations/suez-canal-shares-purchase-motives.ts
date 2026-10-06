import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'suez-canal-shares-purchase-motives',
  about: ['event:purchase-of-the-suez-canal-shares'],
  topic: 'motives',
  researched: '2026-10-06',
  positions: [
    {
      id: 'political-transaction',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Benjamin Disraeli', ref: 'person:benjamin-disraeli' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'I have always, and do now recommend it to the country as a political transaction, and one which I believe is calculated to strengthen the Empire.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1876-02-21-suez-canal-shares',
            loc: { section: 'HC Deb 21 February 1876 vol 227 cc562-661', para: '41' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://api.parliament.uk/historic-hansard/commons/1876/feb/21/resolution-adjourned-debate'
          }
        },
        {
          id: 'q2',
          text: 'Because they think we are obtaining a great hold and interest in this important portion of Africa—because they believe that it secures to us a highway to our Indian Empire and our other dependencies, the people of England have from the first recognized the propriety and the wisdom of the step which we shall sanction tonight.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1876-02-21-suez-canal-shares',
            loc: { section: 'HC Deb 21 February 1876 vol 227 cc562-661', para: '41' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://api.parliament.uk/historic-hansard/commons/1876/feb/21/resolution-adjourned-debate'
          }
        }
      ]
    },
    {
      id: 'political-apprehensions',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'William Ewart Gladstone' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'These are the political apprehensions that occur to me, and indeed wherever I move on this subject the ground seems mined under my feet.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1876-02-21-suez-canal-shares',
            loc: { section: 'HC Deb 21 February 1876 vol 227 cc562-661', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://api.parliament.uk/historic-hansard/commons/1876/feb/21/resolution-adjourned-debate'
          }
        }
      ]
    }
  ]
})
