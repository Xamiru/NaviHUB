import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'great-northern-war',
  names: [
    { text: 'Great Northern War', lang: 'en', role: 'primary' },
    {
      text: 'Twenty-one Years’ War',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'britannica-1911-peter-i', loc: { section: 'PETER I.', para: '6' } }
      ]
    }
  ],
  researched: '2026-10-13',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1700' },
        cites: [
          { source: 'britannica-1911-peter-i', loc: { section: 'PETER I.', para: '6' } },
          {
            source: 'loc-finland-country-study-1988',
            loc: { section: 'Finland and the Swedish Empire', para: '3' }
          }
        ]
      },
      {
        value: { d: '1699' },
        cites: [
          {
            source: 'britannica-1911-charles-xii',
            loc: { section: 'Charles XII.', para: '2' }
          }
        ],
        heldBy: [
          {
            kind: 'organization',
            name: 'Encyclopædia Britannica, 11th edition (article on Charles XII.)'
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1721' },
        cites: [
          {
            source: 'loc-finland-country-study-1988',
            loc: { section: 'Finland and the Swedish Empire', para: '4' }
          },
          { source: 'britannica-1911-peter-i', loc: { section: 'PETER I.', para: '6' } }
        ]
      }
    ]
  },
  regions: ['europe', 'russia-central-asia'],
  prominence: 2,
  polities: [
    {
      ref: 'polity:russian-empire',
      cites: [
        { source: 'britannica-1911-peter-i', loc: { section: 'PETER I.', para: '8' } }
      ]
    }
  ],
  sides: [
    {
      key: 'northern-alliance',
      name: 'Denmark, Poland and Russia',
      cites: [
        {
          source: 'loc-finland-country-study-1988',
          loc: { section: 'Finland and the Swedish Empire', para: '3' }
        }
      ]
    },
    {
      key: 'sweden',
      name: 'Sweden',
      cites: [
        {
          source: 'loc-finland-country-study-1988',
          loc: { section: 'Finland and the Swedish Empire', para: '3' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:peter-the-great',
      role: 'leader',
      side: 'northern-alliance',
      cites: [
        { source: 'britannica-1911-peter-i', loc: { section: 'PETER I.', para: '6' } }
      ]
    },
    {
      name: 'Charles XII',
      role: 'leader',
      side: 'sweden',
      cites: [
        {
          source: 'loc-finland-country-study-1988',
          loc: { section: 'Finland and the Swedish Empire', para: '3' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:war-of-the-spanish-succession',
      rel: 'related',
      cites: [
        { source: 'britannica-1911-charles-xii', loc: { section: 'Charles XII.', para: '5' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The Great Northern War began in 1700 when Denmark, Poland, and Russia formed an alliance to take advantage of Sweden\'s apparent weakness at that time and to partition the Swedish empire.',
          lang: 'en',
          cite: {
            source: 'loc-finland-country-study-1988',
            loc: { section: 'Finland and the Swedish Empire', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/finland/9.htm' }
        },
        {
          id: 'q2',
          text: 'The year 1700 is memorable in Russian history as the starting-point of Peter’s long and desperate struggle for the hegemony of the north.',
          lang: 'en',
          cite: { source: 'britannica-1911-peter-i', loc: { section: 'PETER I.', para: '6' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Peter_I.'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Beginning in the mid-sixteenth century, Sweden\'s ambitious foreign policy brought it into conflict with the three other main powers that had an interest in the Baltic: Denmark, Poland, and Russia.',
          lang: 'en',
          cite: {
            source: 'loc-finland-country-study-1988',
            loc: { section: 'Finland and the Swedish Empire', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/finland/9.htm' }
        },
        {
          id: 'q4',
          text: 'The possession of an ice-free seaboard was essential to her natural development, the creation of a fleet would follow inevitably upon the acquisition of such a seaboard; and she could not hope to obtain her due share of the trade and commerce of the world till she possessed both.',
          lang: 'en',
          cite: { source: 'britannica-1911-peter-i', loc: { section: 'PETER I.', para: '6' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Peter_I.'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'As a result of the war, Sweden\'s power was much reduced, and Russia replaced Sweden as the main power in the Baltic.',
          lang: 'en',
          cite: {
            source: 'loc-finland-country-study-1988',
            loc: { section: 'Finland and the Swedish Empire', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/finland/9.htm' }
        },
        {
          id: 'q6',
          text: 'In surrendering the pick of her Baltic provinces, Sweden had surrendered along with them the hegemony of the north, and all her pretensions to be considered a great power.',
          lang: 'en',
          cite: { source: 'britannica-1911-peter-i', loc: { section: 'PETER I.', para: '6' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Peter_I.'
          }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q7',
          text: 'Of the nearly 60,000 Finns who served in the Swedish army, only about 10,000 survived the Great Northern War.',
          lang: 'en',
          cite: {
            source: 'loc-finland-country-study-1988',
            loc: { section: 'Finland and the Swedish Empire', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/finland/9.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1700' },
            cites: [
              {
                source: 'loc-finland-country-study-1988',
                loc: { section: 'Finland and the Swedish Empire', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'Sweden\'s youthful king Charles XII surprised them, however, with a series of military victories that knocked Denmark out of the war in 1700 and Poland, in 1706.',
        lang: 'en',
        cite: {
          source: 'loc-finland-country-study-1988',
          loc: { section: 'Finland and the Swedish Empire', para: '3' }
        },
        provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/finland/9.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1709' },
            cites: [
              {
                source: 'loc-finland-country-study-1988',
                loc: { section: 'Finland and the Swedish Empire', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'The impetuous Swedish king then marched on Moscow, but he met disaster at the battle of Poltava in 1709.',
        lang: 'en',
        cite: {
          source: 'loc-finland-country-study-1988',
          loc: { section: 'Finland and the Swedish Empire', para: '3' }
        },
        provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/finland/9.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1709' },
            cites: [
              {
                source: 'britannica-1911-poltava-town',
                loc: { section: 'Poltava (town)', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'Peter the Great of Russia defeated Charles XII. of Sweden in the immediate neighbourhood on the 27th of June 1709, and the victory is commemorated by a column over 50 ft. in height.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-poltava-town',
          loc: { section: 'Poltava (town)', para: '2' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Poltava_(town)'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1718' },
            cites: [
              {
                source: 'loc-finland-country-study-1988',
                loc: { section: 'Finland and the Swedish Empire', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'Charles attempted to compensate for Sweden\'s territorial losses in the Baltic by conquering Norway, but he was killed in action there in 1718.',
        lang: 'en',
        cite: {
          source: 'loc-finland-country-study-1988',
          loc: { section: 'Finland and the Swedish Empire', para: '3' }
        },
        provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/finland/9.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1721' },
            cites: [
              {
                source: 'loc-finland-country-study-1988',
                loc: { section: 'Finland and the Swedish Empire', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'The Great Northern War ended on August 30, 1721, with the signing of the Peace of Uusikaupunki (Swedish, Nystad), by which Sweden ceded most of its territories on the southern and the eastern shores of the Baltic Sea.',
        lang: 'en',
        cite: {
          source: 'loc-finland-country-study-1988',
          loc: { section: 'Finland and the Swedish Empire', para: '4' }
        },
        provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/finland/9.htm' }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/39/%27The_Victory_at_Poltava%27_by_Alexander_Evstafyevich_Kotzebue%2C_1862%2C_Hermitage.JPG/1280px-%27The_Victory_at_Poltava%27_by_Alexander_Evstafyevich_Kotzebue%2C_1862%2C_Hermitage.JPG',
    page: 'https://commons.wikimedia.org/wiki/File:%27The_Victory_at_Poltava%27_by_Alexander_Evstafyevich_Kotzebue,_1862,_Hermitage.JPG',
    credit: { institution: 'Hermitage Museum', creator: 'Alexander von Kotzebue' },
    license: { id: 'public-domain' }
  },
  places: [
    {
      ref: 'place:poltava',
      cites: [
        {
          source: 'britannica-1911-poltava-town',
          loc: { section: 'Poltava (town)', para: '2' }
        }
      ]
    },
    {
      ref: 'place:saint-petersburg',
      cites: [
        { source: 'britannica-1911-peter-i', loc: { section: 'PETER I.', para: '13' } }
      ]
    }
  ]
})
