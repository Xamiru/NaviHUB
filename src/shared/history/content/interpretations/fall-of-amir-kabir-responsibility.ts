import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'fall-of-amir-kabir-responsibility',
  about: ['event:fall-of-amir-kabir'],
  topic: 'responsibility',
  researched: '2026-10-06',
  positions: [
    {
      id: 'court-intrigue',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Hamid Algar' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'The downfall and death of Amīr Kabīr are to be attributed primarily to the continuing intrigues of the same persons who had opposed him when he was first appointed chief minister: Āqā Khan Nūrī and the queen mother. It appears that they persuaded Nāṣer-al-dīn Shah that Amīr Kabīr was planning to depose him and mount the throne himself.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-amir-kabir',
            loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/amir-e-kabir-mirza-taqi-khan'
          }
        },
        {
          id: 'q2',
          text: 'The young shah may have been inclined to believe these accusations because of a certain arrogance and disdain for protocol that Amīr Kabīr had shown since the beginning of his government career in Tabrīz.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-amir-kabir',
            loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/amir-e-kabir-mirza-taqi-khan'
          }
        }
      ]
    },
    {
      id: 'jealousy-and-fear',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'The power he concentrated in his hands, however, aroused jealousy within the bureaucracy and fear in the king.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE QAJARS, 1795-1925', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/iran/12.htm' }
        }
      ]
    },
    {
      id: 'british-abandonment',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Abbas Amanat', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'His desperate pleas for protection to the British envoy, Justin Sheil, fell on deaf ears.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '13'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/great-britain-ii/'
          }
        },
        {
          id: 'q5',
          text: 'A number of complex considerations, including a desire to consolidate the government of the pro-British Mirzā Āqā Khan Nuri, persuaded Sheil to abandon Amir Kabir to his fate.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '13'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/great-britain-ii/'
          }
        }
      ]
    }
  ]
})
