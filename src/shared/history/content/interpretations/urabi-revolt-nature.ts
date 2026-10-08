import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'urabi-revolt-nature',
  about: ['event:urabi-revolt', 'person:ahmed-urabi'],
  topic: 'nature',
  researched: '2026-10-08',
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
      id: 'bona-fide-national-movement',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Lord Cromer (Evelyn Baring)' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'There can be no doubt that the Arabi movement was in some respects a bona fide national movement.',
          lang: 'en',
          cite: {
            source: 'cromer-1908-modern-egypt-vol-1',
            loc: { section: 'Part I, Chapter XIV', page: '249' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://archive.org/download/modernegypt0001crom_z1y4/modernegypt0001crom_z1y4_djvu.txt'
          }
        },
        {
          id: 'q6',
          text: 'It was, in a great degree, a movement of the Egyptians against Turkish rule.',
          lang: 'en',
          cite: {
            source: 'cromer-1908-modern-egypt-vol-1',
            loc: { section: 'Part II, Chapter XVII', page: '324' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://archive.org/download/modernegypt0001crom_z1y4/modernegypt0001crom_z1y4_djvu.txt'
          }
        }
      ]
    },
    {
      id: 'urabi-a-figurehead',
      category: 'contemporary',
      holders: [
        { kind: 'media', name: 'Encyclopædia Britannica, 11th edition (1911)' }
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
      ],
      reception: [
        {
          id: 'q7',
          text: 'The note had the opposite effect from that intended, producing an upsurge in anti-European feeling, a shift in leadership of the nationalist movement from the moderates in the assembly to the military, and the formation of a new government with Urabi as minister of war.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'From Intervention to Occupation, 1876-82', para: '14' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/egypt/25.htm' }
        }
      ]
    },
    {
      id: 'egyptians-against-circassian-oppression',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Ahmed Urabi', ref: 'person:ahmed-urabi' }
      ],
      statements: [
        {
          id: 'q8',
          text: 'We colonels were now once more with our regiments, and as native Egyptians subject to much oppression.',
          lang: 'en',
          cite: {
            source: 'blunt-1922-secret-history-of-the-english-occupation-of-egypt',
            loc: {
              section: 'Appendix I. Arabi\'s Account of his Life and of the Events of 1881-1882',
              page: '370'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://archive.org/download/cu31924028725657/cu31924028725657_djvu.txt'
          }
        },
        {
          id: 'q9',
          text: 'It was the plan to weed the whole army of its native officers.',
          lang: 'en',
          cite: {
            source: 'blunt-1922-secret-history-of-the-english-occupation-of-egypt',
            loc: {
              section: 'Appendix I. Arabi\'s Account of his Life and of the Events of 1881-1882',
              page: '370'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://archive.org/download/cu31924028725657/cu31924028725657_djvu.txt'
          }
        },
        {
          id: 'q10',
          text: '"Your petition," he said, "is muhlik" (a hanging matter). "What is it you want? to change the Ministry? And what would you put in its place? Whom do you propose to carry on the government?" And I answered him, "Ye saat le Basha, is Egypt then a woman who has borne but eight sons and then been barren ?" By this I meant himself and the seven ministers under him.',
          lang: 'en',
          cite: {
            source: 'blunt-1922-secret-history-of-the-english-occupation-of-egypt',
            loc: {
              section: 'Appendix I. Arabi\'s Account of his Life and of the Events of 1881-1882',
              page: '371'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://archive.org/download/cu31924028725657/cu31924028725657_djvu.txt'
          }
        }
      ]
    }
  ]
})
