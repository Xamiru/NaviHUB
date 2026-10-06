import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'slave-trade-abolition-debate-1807',
  about: ['event:slave-trade-act-1807'],
  topic: 'other',
  researched: '2026-10-06',
  positions: [
    {
      id: 'immediate-abolition',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Lord Milton' },
        { kind: 'participant', name: 'William Wilberforce' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'As long as the trade was continued, Britain would be giving a premium to rapine and murder, and preventing the progress of civilization on the coast of Africa.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1807-02-23-slave-trade-abolition-bill',
            loc: { section: 'HC Deb 23 February 1807 vol 8 cc945-95' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://api.parliament.uk/historic-hansard/commons/1807/feb/23/slave-trade-abolition-bill'
          }
        },
        {
          id: 'q2',
          text: 'All that he imputed to the West-India planters was, that they had yielded to the circumstances under which they existed.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1807-02-23-slave-trade-abolition-bill',
            loc: { section: 'HC Deb 23 February 1807 vol 8 cc945-95' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://api.parliament.uk/historic-hansard/commons/1807/feb/23/slave-trade-abolition-bill'
          }
        }
      ]
    },
    {
      id: 'continuation',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'General Gascoyne' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'he should, rather than that our colonies should remain uncultivated, wish the slave trade to be continued.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1807-02-23-slave-trade-abolition-bill',
            loc: { section: 'HC Deb 23 February 1807 vol 8 cc945-95' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://api.parliament.uk/historic-hansard/commons/1807/feb/23/slave-trade-abolition-bill'
          }
        }
      ]
    },
    {
      id: 'gradual-abolition',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Mr. Bathurst' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'he was not prepared to go so far as the policy of immediately abolishing it.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1807-02-23-slave-trade-abolition-bill',
            loc: { section: 'HC Deb 23 February 1807 vol 8 cc945-95' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://api.parliament.uk/historic-hansard/commons/1807/feb/23/slave-trade-abolition-bill'
          }
        },
        {
          id: 'q5',
          text: 'He recommended a tax on the importation of fresh negroes, as a measure which would ultimately lead to a total abolition.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1807-02-23-slave-trade-abolition-bill',
            loc: { section: 'HC Deb 23 February 1807 vol 8 cc945-95' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://api.parliament.uk/historic-hansard/commons/1807/feb/23/slave-trade-abolition-bill'
          }
        }
      ]
    }
  ]
})
