import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'anglo-persian-war-causes',
  about: ['event:anglo-persian-war-1856-1857'],
  topic: 'causes',
  researched: '2026-10-06',
  positions: [
    {
      id: 'murray-affair',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Jean Calmard' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'In 1853, Sheil was succeeded in Tehran by Charles Augustus Murray, who had no Indian experience and has been strongly criticized by both contemporaries and historians (e.g., Sir D. Wright, The English amongst the Persians, repr. London, 1977, p. 23); his troubles in Tehran were among the causes of the Anglo-Persian war.',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-anglo-persian-war',
            loc: { section: 'ANGLO-PERSIAN WAR (1856-57)', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/anglo-persian-war-1856-57'
          }
        },
        {
          id: 'q2',
          text: 'His lack of experience in Eastern diplomacy had disastrous results.',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-anglo-persian-war',
            loc: { section: 'ANGLO-PERSIAN WAR (1856-57)', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/anglo-persian-war-1856-57'
          }
        }
      ]
    },
    {
      id: 'herat-sovereignty-and-british-prestige',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Abbas Amanat', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'The Hāšem Khan affair, with all its personal nuances (which included Nuri accusing Murray of an illicit sexual relationship with Hāšem Khan’s wife, a sister-in-law of the shah), served only as the immediate cause, if not a mere pretext, for a break in relations with England.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '17'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/great-britain-ii/'
          }
        },
        {
          id: 'q4',
          text: 'Concern with honor and prestige, perpetuated by Russophobic envoys like McNeill, Sheil and Murray, was as influential in the British decision to go to war with Persia over Herat as the illusionary notion of the vitality of Herat as the “gateway” to India.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '17'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/great-britain-ii/'
          }
        }
      ]
    },
    {
      id: 'shah-ambitions',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Abbas Amanat', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'The shah’s motives were partly military glory, but more than anything he feared the rise of a united Afghanistan under the aegis of the British as a threat to Persia’s eastern frontiers.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-herat-vi',
            loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '19' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/herat-vi'
          }
        },
        {
          id: 'q6',
          text: 'Most significantly, the British preoccupation with the Crimean War and its setbacks in late 1854 and early 1855 gave a false impression to Nāṣer-al-Din Shah that, if he could secure the backing of the new tsar of Russia, Alexander II, he would then be able to capture Herat and put an end to half a century of domestic feuding and colonial scrambles.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-herat-vi',
            loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '19' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/herat-vi'
          }
        }
      ]
    },
    {
      id: 'british-defence-of-herat-claim',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q7',
          text: 'Meanwhile, Britain twice landed troops in Iran to prevent the Qajars from reasserting a claim to Herat, lost after the fall of the Safavids.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE QAJARS, 1795-1925', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/iran/12.htm' }
        }
      ]
    }
  ]
})
