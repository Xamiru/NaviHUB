import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'safavid-order-militant-shiism-when-and-why',
  about: ['event:safavid-order-under-junayd-and-haydar'],
  topic: 'causes',
  framing: {
    id: 'q1',
    text: 'Much about the early Safavid order remains unclear.',
    lang: 'en',
    cite: {
      source: 'iranica-matthee-safavid-dynasty',
      loc: { section: 'SAFAVID DYNASTY', para: '6' }
    },
    provenance: { via: 'web', at: '2026-10-16', url: 'https://www.iranicaonline.org/articles/safavids' }
  },
  positions: [
    {
      id: 'khwaja-ali-and-ghulat-shiism',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Hamid Algar', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'The transformation of the Safavids from a hereditary Sufi order of conventional Sunnite orientation into a politico-military grouping espousing a deviant species of Shiʿism began with Ṣafi-al-Din’s grandson, Ḵᵛāja ʿAli (d. 833/1429), a full half century after his death.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-shiism-in-iran-since-the-safavids',
            loc: {
              section: 'IRAN ix. RELIGIONS IN IRAN (2) Islam in Iran (2.3) Shiʿism in Iran Since the Safavids',
              para: '5'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/iran-ix23-shiism-in-iran-since-the-safavids'
          }
        }
      ]
    },
    {
      id: 'jonayd-and-the-anatolian-turn',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Kathryn Babayan', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'Jonayd had altered the character of the Ṣafaviya from a Sufi order to an Alid messianic movement with far-reaching political aspirations.',
          lang: 'en',
          cite: { source: 'iranica-jonayd', loc: { section: 'JONAYD', para: '3' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/jonayd'
          }
        }
      ]
    },
    {
      id: 'turkmen-followers-popular-shiism',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Rudi Matthee', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'Under Shaikh Jonayd, the order became more militant, turning towards an extremist form of Shiʿism (ḡoluw, see ḠOLĀT) replete with shamanistic and animistic elements that included a belief in reincarnation and the transmigration of souls, as well as the notion of a leader invested with divine attributes, the mahdi',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        },
        {
          id: 'q5',
          text: 'Originally, they seem to have harbored Sunni convictions, but under Ḵᵛāja ʿAli they are said to have gravitated toward Shiʿism under the influence of their main supporters—Turkmen tribes who adhered to a popular brand of Shiʿism.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        }
      ]
    },
    {
      id: 'mid-fifteenth-century-adoption',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q6',
          text: 'Sometime in the mid-fifteenth century, the Safavids adopted Shia Islam, and their movement became highly millenarian in character.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE SAFAVIDS, 1501-1722', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/iran/11.htm' }
        }
      ]
    },
    {
      id: 'sunni-shii-contrast-doubtful',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Rosemarie Quiring-Zoche', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q7',
          text: 'The argument that there was a clear-cut contrast between the Sunnism of the Āq Qoyunlū and the Shiʿism of the Qara Qoyunlū and the Ṣafawīya rests mainly on later Safavid sources and must be considered doubtful.',
          lang: 'en',
          cite: {
            source: 'iranica-quiring-zoche-aq-qoyunlu',
            loc: { section: 'AQ QOYUNLŪ', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/aq-qoyunlu-confederation'
          }
        }
      ]
    },
    {
      id: 'sunni-historian-at-the-aq-qoyunlu-court',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Fażl-Allāh b. Ruzbehān Ḵonji', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q8',
          text: '“[His adepts] openly called Shaikh Jonayd ‘God’ (Elāh) and his son [Ḥaydar] ‘son of God’ (ebn Allāh). They praised him thus: “He is the Living One, there is no God but he.”',
          lang: 'en',
          cite: { source: 'iranica-jonayd', loc: { section: 'JONAYD', para: '10' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/jonayd'
          }
        }
      ]
    }
  ],
  researched: '2026-10-16'
})
