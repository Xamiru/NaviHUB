import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'nigerian-civil-war-genocide-question',
  about: ['event:nigerian-civil-war'],
  topic: 'nature',
  framing: {
    id: 'q1',
    text: 'The “genocide” in Nigeria raises a number of questions. Did the government intend to wipe out the Ibos as suggested by the statements of some of the war generals, or to politically confine the Ibos to a position of inferiority and subordination as later events indicate?',
    lang: 'en',
    cite: {
      source: 'ssrc-amadi-2007-story-of-biafra',
      loc: {
        section: 'Colonial Legacy, Elite Dissension and the Making of Genocide: The Story of Biafra',
        para: '5'
      }
    },
    provenance: {
      via: 'web',
      at: '2026-10-07',
      url: 'https://items.ssrc.org/how-genocides-end/colonial-legacy-elite-dissension-and-the-making-of-genocide-the-story-of-biafra/'
    }
  },
  positions: [
    {
      id: 'near-genocide',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Sam Amadi' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'There is no doubt from the evidence of international and local observers of the pogroms of 1966 and the three year civil war that Biafran civilians, especially Ibos, were victims of gross cruelty reminiscent of the Jewish genocide.',
          lang: 'en',
          cite: {
            source: 'ssrc-amadi-2007-story-of-biafra',
            loc: {
              section: 'Colonial Legacy, Elite Dissension and the Making of Genocide: The Story of Biafra',
              para: '11'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://items.ssrc.org/how-genocides-end/colonial-legacy-elite-dissension-and-the-making-of-genocide-the-story-of-biafra/'
          }
        },
        {
          id: 'q3',
          text: 'One characteristic of the Ibo massacres between 1967 and 1970 that made them come short of genocide, that is, to be near-genocides, is that they were brought to a halt by the aggressors themselves.',
          lang: 'en',
          cite: {
            source: 'ssrc-amadi-2007-story-of-biafra',
            loc: {
              section: 'Colonial Legacy, Elite Dissension and the Making of Genocide: The Story of Biafra',
              para: '30'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://items.ssrc.org/how-genocides-end/colonial-legacy-elite-dissension-and-the-making-of-genocide-the-story-of-biafra/'
          }
        }
      ]
    },
    {
      id: 'no-evidence-found',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'Because charges of genocide had fueled international sympathy for Biafra, the FMG allowed a team of international experts to observe the surrender and to look for evidence. Subsequently, the observers testified that they found no evidence of genocide or systematic destruction of property, although there was considerable evidence of famine and death as a result of the war.',
          lang: 'en',
          cite: {
            source: 'loc-nigeria-country-study-1991',
            loc: { section: 'Civil War', para: '16' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/nigeria/23.htm' }
        }
      ]
    }
  ],
  researched: '2026-10-07'
})
