import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'kargil-war-intruders',
  about: ['event:kargil-war'],
  topic: 'responsibility',
  framing: {
    id: 'q1',
    text: 'India claims that the May incursion was directly aided and abetted by Pakistan\'s armed forces, a claim denied in Islamabad.',
    lang: 'en',
    cite: {
      source: 'acronym-1999-06-the-kashmir-crisis',
      loc: { section: 'The Kashmir Crisis', para: '1' }
    },
    provenance: {
      via: 'web',
      at: '2026-10-10',
      url: 'https://www.acronym.org.uk/old/archive/textonly/dd/dd38/38kash.htm'
    }
  },
  positions: [
    {
      id: 'india-government-pakistani-regulars',
      category: 'official',
      holders: [
        { kind: 'state', name: 'India' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'In the midst of this, regulars of the Pakistan army and infiltrators have been sent across [the Line of Control].',
          lang: 'en',
          cite: {
            source: 'acronym-1999-06-the-kashmir-crisis',
            loc: { section: 'The Kashmir Crisis', para: '19' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.acronym.org.uk/old/archive/textonly/dd/dd38/38kash.htm'
          }
        },
        {
          id: 'q3',
          text: 'It is abundantly clear by now that the overwhelming majority of those who crossed over from Pakistan in the Kargil sector were Pakistani troops in pursuit of a misadventure, fully planned and conducted by the Pakistani authorities.',
          lang: 'en',
          cite: {
            source: 'acronym-1999-07-the-kashmir-dispute',
            loc: { section: 'The Kashmir Dispute', para: '23' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'http://www.acronym.org.uk/old/archive/dd/dd39/39kash.htm'
          }
        }
      ],
      reception: [
        {
          id: 'q4',
          text: 'The subsequent retreat of the militants, who had seized their positions with the backing of the Pakistani military, reduced the danger of Pakistan\'s diplomatic isolation but engendered widespread domestic condemnation and proved to be the final catalyst in prompting a military takeover.',
          lang: 'en',
          cite: {
            source: 'hrw-2000-world-report-pakistan',
            loc: { section: 'Human Rights Watch World Report 2000: Pakistan', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://www.hrw.org/legacy/wr2k/Asia-07.htm' }
        }
      ]
    },
    {
      id: 'pakistan-government-kashmiri-mujahideen',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Pakistan' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'It is true that the Mujahideen were present on several Kargil heights but it was part of their long freedom struggle and inseparable from it.',
          lang: 'en',
          cite: {
            source: 'acronym-1999-07-the-kashmir-dispute',
            loc: { section: 'The Kashmir Dispute', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'http://www.acronym.org.uk/old/archive/dd/dd39/39kash.htm'
          }
        },
        {
          id: 'q6',
          text: 'How can [the] Pakistan army withdraw if it is not there? ... They [the rebels] are not infiltrators, they are Kashmiris',
          lang: 'en',
          cite: {
            source: 'acronym-1999-06-the-kashmir-crisis',
            loc: { section: 'The Kashmir Crisis', para: '29' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'https://www.acronym.org.uk/old/archive/textonly/dd/dd38/38kash.htm'
          }
        }
      ],
      reception: [
        {
          id: 'q7',
          text: 'Meanwhile, Sharif alienated important elements in the army with his abrupt withdrawal of support in July for Muslim militants who had occupied strategic peaks overlooking Kargil, in the Indian-held portion of Kashmir.',
          lang: 'en',
          cite: {
            source: 'hrw-2000-world-report-pakistan',
            loc: { section: 'Human Rights Watch World Report 2000: Pakistan', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://www.hrw.org/legacy/wr2k/Asia-07.htm' }
        }
      ]
    }
  ],
  researched: '2026-10-10'
})
