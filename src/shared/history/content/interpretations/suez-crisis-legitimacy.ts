import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'suez-crisis-legitimacy',
  about: ['event:suez-crisis'],
  topic: 'legitimacy',
  researched: '2026-10-09',
  positions: [
    {
      id: 'separate-the-belligerents',
      category: 'official',
      holders: [
        { kind: 'state', name: 'United Kingdom' },
        { kind: 'participant', name: 'Sir Anthony Eden' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'I must tell the House that very grave issues are at stake, and that unless hostilities can quickly be stopped free passage through the Canal will be jeopardised.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1956-10-30-egypt-and-israel',
            loc: { section: 'HC Deb 30 October 1956 vol 558 cc1273-98', page: '1275' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://api.parliament.uk/historic-hansard/commons/1956/oct/30/egypt-and-israel-1'
          }
        },
        {
          id: 'q2',
          text: 'Further, in order to separate the belligerents and to guarantee freedom of transit through the Canal by the ships of all nations, we have asked the Egyptian Government to agree that Anglo-French forces should move temporarily—I repeat, temporarily—into key positions at Port Said, Ismailia and Suez.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1956-10-30-egypt-and-israel',
            loc: { section: 'HC Deb 30 October 1956 vol 558 cc1273-98', page: '1275' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://api.parliament.uk/historic-hansard/commons/1956/oct/30/egypt-and-israel-1'
          }
        }
      ],
      reception: [
        {
          id: 'q8',
          text: 'Moreover, the United States voted for U.N. resolutions publicly condemning the invasion and approving the creation of a U.N. peacekeeping force.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-suez-crisis',
            loc: { section: 'The Suez Crisis, 1956', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1953-1960/suez'
          }
        }
      ]
    },
    {
      id: 'breach-of-the-charter',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Hugh Gaitskell' },
        { kind: 'party', name: 'Labour Party (Her Majesty\'s Opposition)' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'All I can say is that in taking this decision the Government, in the view of Her Majesty\'s Opposition, have committed an act of disastrous folly whose tragic consequences we shall regret for years.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1956-10-31-middle-east-situation',
            loc: { section: 'HC Deb 31 October 1956 vol 558 cc1446-572', page: '1454' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://api.parliament.uk/historic-hansard/commons/1956/oct/31/middle-east-situation'
          }
        },
        {
          id: 'q4',
          text: 'Any impartial observer must recognise that this is in clear breach of the Charter of the United Nations.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1956-10-31-middle-east-situation',
            loc: { section: 'HC Deb 31 October 1956 vol 558 cc1446-572', page: '1458' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://api.parliament.uk/historic-hansard/commons/1956/oct/31/middle-east-situation'
          }
        }
      ]
    },
    {
      id: 'collusion-and-pretext',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Office of the Historian, U.S. Department of State' },
        { kind: 'organization', name: 'National Army Museum' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'At the same time, the British and French held secret military consultations with Israel, who regarded Nasser as a threat to its security, resulting in the creation of a joint plan to invade Egypt and overthrow its President.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-suez-crisis',
            loc: { section: 'The Suez Crisis, 1956', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/milestones/1953-1960/suez'
          }
        },
        {
          id: 'q6',
          text: 'Under the pretext of protecting the Canal from the two belligerents, Britain and France landed troops of their own a few days later.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-suez-crisis',
            loc: { section: 'The Suez Crisis, 1956', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/milestones/1953-1960/suez'
          }
        },
        {
          id: 'q7',
          text: 'Meanwhile, Britain had agreed to a French plan that had been secretly hatched with the Israelis. Israel would invade Sinai, distracting Nasser and allowing Britain and France to occupy the canal in the guise of peacemakers.',
          lang: 'en',
          cite: { source: 'nam-suez-crisis', loc: { section: 'Suez Crisis', para: '31' } },
          provenance: { via: 'web', at: '2026-10-08', url: 'https://www.nam.ac.uk/explore/suez-crisis' }
        }
      ]
    }
  ]
})
