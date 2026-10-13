import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'abbas-is-military-reforms',
  names: [
    { text: 'Military reforms of Abbas I', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-13',
  type: 'reform',
  start: {
    alts: [
      {
        value: { d: '1588' },
        cites: [
          { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '6' } },
          {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '33' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 2,
  polities: [
    {
      ref: 'polity:safavid-iran',
      cites: [
        { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '6' } }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:abbas-i',
      role: 'leader',
      cites: [
        { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '6' } }
      ]
    },
    {
      ref: 'person:allahverdi-khan',
      role: 'commander',
      cites: [
        { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '6' } }
      ]
    }
  ],
  related: [
    {
      ref: 'event:accession-of-abbas-i',
      rel: 'caused-by',
      cites: [
        { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '6' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q19',
          text: 'Shah ʿAbbās embarked on a number of internal reforms designed to break the power of the Qezelbāš.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '33' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        },
        {
          id: 'q2',
          text: 'He counterbalanced the power of the qizilbash by creating a body of troops composed of Georgian and Armenian slaves who were loyal to the person of the shah.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE SAFAVIDS, 1501-1722', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/iran/11.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'From the moment of his accession, Shah ʿAbbās realized that he must impose his authority on the Qezelbāš or remain their tool.',
          lang: 'en',
          cite: { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '6' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/abbas-i'
          }
        },
        {
          id: 'q4',
          text: 'But the Qezelbāš were still the backbone of the military strength of that Safavid state; if he weakened them, he undermined the state.',
          lang: 'en',
          cite: { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '6' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/abbas-i'
          }
        },
        {
          id: 'q5',
          text: 'They formed the military elite of the fledgling state and provided the praetorian guard, the qurči cavalry, for the shah himself.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q6',
          text: 'The creation of a standing army gave rise to a problem of a different nature—a financial one.',
          lang: 'en',
          cite: { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '7' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/abbas-i'
          }
        },
        {
          id: 'q7',
          text: 'His solution was to form a new, standing army composed of recruits from the ranks of the ḡolāmān-e ḵāṣṣa-ye šarīfa (crown servants).',
          lang: 'en',
          cite: { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '6' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/abbas-i'
          }
        },
        {
          id: 'q8',
          text: 'The existing army unit of qollar, consisting of ḡolāms, was reorganized and expanded, and the position of qollar-āqāsi, the head of this corps, turned into one of the most elevated bureaucratic posts.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '33' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        },
        {
          id: 'q9',
          text: 'In order to provide the necessary funds for the new corps, the shah increased the number of provinces converted from the mamālek (“state”) to the ḵāṣṣa (“crown”) lands; in the latter, he appointed intendants who collected the taxes and remitted them directly to the royal treasury.',
          lang: 'en',
          cite: { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '7' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/abbas-i'
          }
        },
        {
          id: 'q10',
          text: 'In place of the office of amīr-al-omarā, Shah ʿAbbās created the office of sardār-e laškar, or commander-in-chief of the army; the name suggests the triumph of the Persian elements in the Safavid state, but, ironically, the office went initially to the Georgian ḡolām Allāhverdī Khan.',
          lang: 'en',
          cite: { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '8' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/abbas-i'
          }
        },
        {
          id: 'q11',
          text: 'The shah also intensified another policy initiated by his predecessors by removing a great deal of state land, given out in various kinds of fiefs (toyuls, soyurḡāls), from tribal overlordship and turning them into crown domain (ḵāṣṣa).',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '34' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q12',
          text: 'By the end of the reign of Shah ʿAbbās I, ḡolāms filled about one fifth of the high administrative posts, and this proportion grew under his successors.',
          lang: 'en',
          cite: { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '8' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/abbas-i'
          }
        },
        {
          id: 'q13',
          text: 'This policy, as extended by his successors, upset the balance between Qezelbāš and ḡolām troops and thus seriously weakened the military strength of the kingdom.',
          lang: 'en',
          cite: { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '7' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/abbas-i'
          }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1605', notAfter: '1606' },
            cites: [
              { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '12' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q17',
        text: 'It was not until 1014/1605-06 that Shah ʿAbbās felt strong enough to try conclusions with the Ottomans, but then success was rapid.',
        lang: 'en',
        cite: { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '12' } },
        provenance: { via: 'web', at: '2026-10-13', url: 'https://www.iranicaonline.org/articles/abbas-i' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1629' },
            cites: [
              { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '1' } },
              {
                source: 'iranica-matthee-safavid-dynasty',
                loc: { section: 'SAFAVID DYNASTY', para: '33' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q18',
        text: 'It has been estimated that by the end of Shah ʿAbbās’ reign some one-fifth of high-ranking officials were ḡolāms.',
        lang: 'en',
        cite: {
          source: 'iranica-matthee-safavid-dynasty',
          loc: { section: 'SAFAVID DYNASTY', para: '33' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/safavids'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Portrait_of_Isa_Khan%2C_Qurchibashi_of_Shah_%27Abbas_I._Ascribed_to_Bishn_Das%2C_Agra%2C_India%2C_dated_1618.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Portrait_of_Isa_Khan,_Qurchibashi_of_Shah_%27Abbas_I._Ascribed_to_Bishn_Das,_Agra,_India,_dated_1618.jpg',
    credit: { creator: 'Bishandas' },
    license: { id: 'public-domain' }
  }
})
