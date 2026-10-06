import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'urabi-revolt-nature',
  about: ['event:urabi-revolt', 'person:ahmed-urabi'],
  topic: 'nature',
  researched: '2026-10-06',
  positions: [
    {
      id: 'nationalist-movement',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'At this point, the goal of Urabi and his followers became not only the removal of all European influence from Egypt but also the overthrow of the khedive.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'From Intervention to Occupation, 1876-82', para: '14' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/egypt/25.htm' }
        }
      ]
    },
    {
      id: 'revolt-against-misgovernment',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Lord Cromer' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'The movement which he represented in the eye of Europe, whatever the motives of its leaders, “was in its essence a genuine revolt against misgovernment,”',
          lang: 'en',
          cite: { source: 'britannica-1911-arabi-pasha', loc: { section: 'ARABI PASHA', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Arabi_Pasha'
          }
        }
      ]
    },
    {
      id: 'urabi-a-figurehead',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Encyclopædia Britannica (1911)' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'In all that followed Arabi was put forward as the leader of the discontented Egyptians; he was in reality little more than the mouthpiece and puppet of abler men such as Ali Rubi and Mahmud Sami.',
          lang: 'en',
          cite: { source: 'britannica-1911-arabi-pasha', loc: { section: 'ARABI PASHA', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Arabi_Pasha'
          }
        },
        {
          id: 'q4',
          text: 'Arabi, as has been said, was rather the figurehead than the inspirer of the movement of 1881–1882; and was probably more honest, as he was certainly less intelligent, than those whose tool, in a large measure, he was.',
          lang: 'en',
          cite: { source: 'britannica-1911-arabi-pasha', loc: { section: 'ARABI PASHA', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Arabi_Pasha'
          }
        }
      ]
    }
  ]
})
