import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: '1954-guatemalan-coup-foreign-role',
  researched: '2026-10-08',
  about: ['event:1954-guatemalan-coup'],
  topic: 'foreign-role',
  positions: [
    {
      id: 'liberation-broadcast',
      category: 'contemporary',
      holders: [
        {
          kind: 'organization',
          name: 'PBSUCCESS Headquarters (broadcast in the name of the National Liberation movement)'
        }
      ],
      statements: [
        {
          id: 'q1',
          text: '“This is not a foreign intervention, but an uprising of the honest, Christian, freedom-loving people of Guat (sic) to liberate our homeland from the foreign intervention which has already taken place, from control by the Soviet Union which has made Guat an advanced outpost of international commie aggression, from rule by Soviet puppets.”',
          lang: 'en',
          cite: {
            source: 'frus-1952-1954-guatemala',
            loc: { section: 'Document 202. Editorial Note', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/historicaldocuments/frus1952-54Guat/d202'
          }
        }
      ]
    },
    {
      id: 'us-official-record',
      category: 'official',
      holders: [
        { kind: 'state', name: 'United States (Office of the Historian, Department of State)' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'The CIA operation in Guatemala is an important instance of the use of covert action to implement U.S. foreign policy, and this volume provides a detailed account of that action.',
          lang: 'en',
          cite: { source: 'frus-1952-1954-guatemala', loc: { section: 'Preface', para: '9' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/historicaldocuments/frus1952-54Guat/preface'
          }
        }
      ]
    },
    {
      id: 'nsarchive',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'National Security Archive' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'The result is a surprisingly critical study of the agency\'s first covert operation in Latin America.',
          lang: 'en',
          cite: {
            source: 'nsarchive-ebb-4-cia-and-assassinations-guatemala-1954',
            loc: { section: 'CIA and Assassinations: The Guatemala 1954 Documents', para: '23' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'https://nsarchive2.gwu.edu/NSAEBB/NSAEBB4/' }
        },
        {
          id: 'q4',
          text: 'It also provides countless new details of a covert mission plagued by disastrous military planning and failed security measures: according to Cullather, "Operation Success" barely succeeded.',
          lang: 'en',
          cite: {
            source: 'nsarchive-ebb-4-cia-and-assassinations-guatemala-1954',
            loc: { section: 'CIA and Assassinations: The Guatemala 1954 Documents', para: '23' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'https://nsarchive2.gwu.edu/NSAEBB/NSAEBB4/' }
        }
      ]
    }
  ]
})
