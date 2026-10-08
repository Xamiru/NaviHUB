import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'grand-mosque-seizure-significance',
  about: ['event:grand-mosque-seizure'],
  topic: 'significance',
  positions: [
    {
      id: 'saudi-minister-limited-significance',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'A Saudi Cabinet minister (unnamed)' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'The Minister did not think that the action had a great deal of political significance, although he said he had not had a chance to assess the full implications. He stated that the members of the Utayba tribe were very strong fundamentalist Muslims who lacked sophisticated leadership sufficient to translate their religious principles into overthrow of a civil government.',
          lang: 'en',
          cite: { source: 'frus1977-80v18-doc-201', loc: { section: 'Document 201' } },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/historicaldocuments/frus1977-80v18/d201'
          }
        },
        {
          id: 'q2',
          text: 'I asked the Minister what he thought the results of the takeover would be, and he replied rather calmly: “Sooner or later they will be captured and beheaded.”',
          lang: 'en',
          cite: { source: 'frus1977-80v18-doc-201', loc: { section: 'Document 201' } },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/historicaldocuments/frus1977-80v18/d201'
          }
        }
      ]
    },
    {
      id: 'us-ambassador-ringing-warning',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'John C. West, U.S. Ambassador to Saudi Arabia' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'Even though there was no connection between the two sets of events, the Mosque incident was a ringing warning to the SAG that “it can happen here.”',
          lang: 'en',
          cite: { source: 'frus1977-80v18-doc-206', loc: { section: 'Document 206' } },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/historicaldocuments/frus1977-80v18/d206'
          }
        }
      ]
    }
  ],
  researched: '2026-10-09'
})
