import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'bangladesh-war-death-toll',
  about: ['event:bangladesh-liberation-war'],
  topic: 'casualties',
  framing: {
    id: 'q1',
    text: 'The number of people killed, raped, or displaced could be only vaguely estimated.',
    lang: 'en',
    cite: {
      source: 'loc-bangladesh-country-study-1989',
      loc: { section: 'Fall of the Bangabandhu, 1972-75', para: '1' }
    },
    provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/bangladesh/19.htm' }
  },
  positions: [
    {
      id: 'bangladesh-three-million',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Bangladesh' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'Independence of Bangladesh was gained through a nine-month guerilla war against the Pakistan Army, and their collaborators including paramilitary Razakars which resulted in the death of about 3 million people, as per Awami league and Indian sources, in the Bangladesh War of Independence and Bangladesh Genocide.',
          lang: 'en',
          cite: {
            source: 'bd-govt-portal-the-independent-day',
            loc: { section: 'The Independent Day' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://beautifulbangladesh.gov.bd/district-event/dhaka/events/157'
          }
        }
      ],
      reception: [
        {
          id: 'q6',
          text: 'Unfortunately, most of these estimates are ‘guesstimates’',
          lang: 'en',
          cite: {
            source: 'adhikari-2025-death-toll-among-the-bangladeshi-refugees-of-1971',
            loc: { section: 'Death toll among the Bangladeshi refugees of the 1971 war' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.ebi.ac.uk/europepmc/webservices/rest/PMC11970699/fullTextXML'
          }
        }
      ]
    },
    {
      id: 'pakistan-reports-unauthenticated',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Pakistan' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'I am conscious of the pressure of public opinion in the United States much of it based on unauthenticated, and in some cases biased, reports inspired by the Indian Government—which has created an impression quite different from the true state of affairs in Pakistan.',
          lang: 'en',
          cite: { source: 'frus1969-76v11-doc-29', loc: { section: 'Document 29' } },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/historicaldocuments/frus1969-76v11/d29'
          }
        }
      ],
      reception: [
        {
          id: 'q5',
          text: 'The West Pakistani press waged a vigorous but ultimately futile campaign to counteract newspaper and radio accounts of wholesale atrocities.',
          lang: 'en',
          cite: {
            source: 'loc-bangladesh-country-study-1989',
            loc: { section: 'The War for Bangladeshi Independence, 1971', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/bangladesh/17.htm' }
        }
      ]
    },
    {
      id: 'journalists-estimates',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'By the end of summer as many as 300,000 people were thought to have lost their lives.',
          lang: 'en',
          cite: {
            source: 'loc-bangladesh-country-study-1989',
            loc: { section: 'The War for Bangladeshi Independence, 1971', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/bangladesh/17.htm' }
        }
      ]
    }
  ],
  researched: '2026-10-09'
})
