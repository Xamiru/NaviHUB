import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'alhambra-decree',
  names: [
    { text: 'Alhambra Decree', lang: 'en', role: 'primary' },
    {
      text: 'Edict of Expulsion',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-law-alhambra-decree-521-years-later',
          loc: { section: 'Alhambra Decree: 521 Years Later', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-16',
  type: 'law',
  start: {
    alts: [
      {
        value: { d: '1492-03-31' },
        cites: [
          {
            source: 'marcus-1938-the-jew-in-the-medieval-world',
            loc: { section: 'The Expulsion from Spain, 1492 CE (editor’s notes)', para: '2' }
          },
          {
            source: 'loc-law-alhambra-decree-521-years-later',
            loc: { section: 'Alhambra Decree: 521 Years Later', para: '1' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1492-08-01' },
        cites: [
          {
            source: 'marcus-1938-the-jew-in-the-medieval-world',
            loc: { section: 'The Expulsion from Spain, 1492 CE (editor’s notes)', para: '2' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:granada',
      cites: [
        {
          source: 'loc-law-alhambra-decree-521-years-later',
          loc: { section: 'Alhambra Decree: 521 Years Later', para: '1' }
        },
        {
          source: 'marcus-1938-the-expulsion-from-spain-1492',
          loc: { section: 'The Expulsion from Spain, 1492 CE', para: '1' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:ferdinand-ii-of-aragon',
      role: 'organizer',
      cites: [
        {
          source: 'loc-1492-mediterranean-world',
          loc: { section: 'The Mediterranean World', para: '7' }
        }
      ]
    },
    {
      ref: 'person:isabella-i-of-castile',
      role: 'organizer',
      cites: [
        {
          source: 'loc-1492-mediterranean-world',
          loc: { section: 'The Mediterranean World', para: '7' }
        }
      ]
    },
    {
      name: 'Isaac Abravanel',
      role: 'negotiator',
      cites: [
        {
          source: 'marcus-1938-the-expulsion-from-spain-1492',
          loc: { section: 'The Expulsion from Spain, 1492 CE', para: '4' }
        }
      ]
    },
    {
      name: 'Abraham Seneor',
      role: 'negotiator',
      cites: [
        {
          source: 'marcus-1938-the-expulsion-from-spain-1492',
          loc: { section: 'The Expulsion from Spain, 1492 CE', para: '4' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'displaced',
      value: {
        alts: [
          {
            value: { min: 250000, qualifier: 'about' },
            cites: [
              {
                source: 'marcus-1938-the-expulsion-from-spain-1492',
                loc: { section: 'The Expulsion from Spain, 1492 CE', para: '3' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Jacob Rader Marcus', discipline: 'historian' }
            ]
          },
          {
            value: { min: 100000, max: 800000 },
            cites: [
              {
                source: 'marcus-1938-the-expulsion-from-spain-1492',
                loc: { section: 'The Expulsion from Spain, 1492 CE', para: '3' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Jacob Rader Marcus', discipline: 'historian' }
            ]
          }
        ]
      }
    }
  ],
  related: [
    {
      ref: 'event:fall-of-granada',
      rel: 'preceded-by',
      cites: [
        {
          source: 'loc-1492-mediterranean-world',
          loc: { section: 'The Mediterranean World', para: '7' }
        }
      ]
    },
    {
      ref: 'event:voyages-of-columbus',
      rel: 'related',
      cites: [
        { source: 'fordham-columbus-journal-1492', loc: { section: 'Extracts from Journal' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Perhaps it is better known by its other name: The Edict of Expulsion. It was in the city of Granada, in the spring of 1492 that the Catholic Monarchs, Isabelle of Castile and Ferdinand of Aragon, decided to banish the Jews from Spain.',
          lang: 'en',
          cite: {
            source: 'loc-law-alhambra-decree-521-years-later',
            loc: { section: 'Alhambra Decree: 521 Years Later', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://blogs.loc.gov/law/2013/03/alhambra-decree-521-years-later/'
          }
        },
        {
          id: 'q2',
          text: 'According to the decree, Jews were to be banished from all the realms under the joint crowns of Isabelle and Ferdinand.',
          lang: 'en',
          cite: {
            source: 'loc-law-alhambra-decree-521-years-later',
            loc: { section: 'Alhambra Decree: 521 Years Later', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://blogs.loc.gov/law/2013/03/alhambra-decree-521-years-later/'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Everywhere in sixteenth-century Europe, it was assumed that religious unity was necessary for political unity, but only in Spain was there such a sense of urgency in enforcing religious conformity.',
          lang: 'en',
          cite: {
            source: 'loc-spain-country-study-1988',
            loc: { section: 'THE GOLDEN AGE', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/spain/7.htm' }
        },
        {
          id: 'q4',
          text: 'The Inquisition, a state-controlled Castilian tribunal, authorized by papal bull in 1478, that soon extended throughout Spain, had the task of enforcing uniformity of religious practice.',
          lang: 'en',
          cite: {
            source: 'loc-spain-country-study-1988',
            loc: { section: 'THE GOLDEN AGE', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/spain/7.htm' }
        },
        {
          id: 'q5',
          text: 'In 1391 the preaching of a priest of Seville, Fernando Martinez, led to the first general massacre of the Jews, who were envied for their prosperity and hated because they were the king’s tax collectors.',
          lang: 'en',
          cite: { source: 'britannica-1911-spain', loc: { section: 'SPAIN', para: '651' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Spain'
          }
        },
        {
          id: 'q6',
          text: 'The Inquisition was at first established (in 1480) in the dominions of Castile only, but it was extended in 1486 to Catalonia and in 1487 to Aragon, in spite of strong protests.',
          lang: 'en',
          cite: { source: 'britannica-1911-spain', loc: { section: 'SPAIN', para: '671' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Spain'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q7',
          text: 'The actual decree of expulsion was signed March 31 and announced the first of May, the 19th day of the Omer. The Jews were to leave during in May, June, and July and be out of the country by August I, the 8th of Ab.',
          lang: 'en',
          cite: {
            source: 'marcus-1938-the-jew-in-the-medieval-world',
            loc: { section: 'The Expulsion from Spain, 1492 CE (editor’s notes)', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://sourcebooks.fordham.edu/halsall/jewish/1492-jews-spain1.asp'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q8',
          text: 'Despite such repressions, the extraordinary cultural diversity of late medieval Iberia left an enduring legacy in art, architecture, language, music, foodways, agriculture, and urban life.',
          lang: 'en',
          cite: {
            source: 'loc-1492-mediterranean-world',
            loc: { section: 'The Mediterranean World', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.loc.gov/exhibits/1492/mediterr.html'
          }
        }
      ]
    },
    {
      kind: 'memory',
      quotes: [
        {
          id: 'q9',
          text: 'One might think that the Edict of Expulsion is only a dark chapter out of a distant past.',
          lang: 'en',
          cite: {
            source: 'loc-law-alhambra-decree-521-years-later',
            loc: { section: 'Alhambra Decree: 521 Years Later', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://blogs.loc.gov/law/2013/03/alhambra-decree-521-years-later/'
          }
        },
        {
          id: 'q10',
          text: 'However, as with many laws that record humanity’s past inhumanity to man, the decree was not revoked until much later.',
          lang: 'en',
          cite: {
            source: 'loc-law-alhambra-decree-521-years-later',
            loc: { section: 'Alhambra Decree: 521 Years Later', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://blogs.loc.gov/law/2013/03/alhambra-decree-521-years-later/'
          }
        },
        {
          id: 'q11',
          text: 'How much later? It was revoked 476 years later on Monday, December 16, 1968, when the Spanish government finally rendered the statute without effect.',
          lang: 'en',
          cite: {
            source: 'loc-law-alhambra-decree-521-years-later',
            loc: { section: 'Alhambra Decree: 521 Years Later', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://blogs.loc.gov/law/2013/03/alhambra-decree-521-years-later/'
          }
        },
        {
          id: 'q12',
          text: 'At present, Spain has sought to make further amends with the Jews of Spanish (also known as Sephardic) ancestry for the transgression committed against them in 1492.',
          lang: 'en',
          cite: {
            source: 'loc-law-alhambra-decree-521-years-later',
            loc: { section: 'Alhambra Decree: 521 Years Later', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://blogs.loc.gov/law/2013/03/alhambra-decree-521-years-later/'
          }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q13',
          text: 'After the King had captured the city of Granada from the Moors, and it had surrendered to him on the 7th [2d] of January of the year just mentioned, he ordered the expulsion of all the Jews in all parts of his kingdom-in the kingdoms of Castile, Catalonia, Aragon, Galicia, Majorca, Minorca, the Basque provinces, the islands of Sardinia and Sicily, and the kingdom of Valencia.',
          lang: 'en',
          cite: {
            source: 'marcus-1938-the-expulsion-from-spain-1492',
            loc: { section: 'The Expulsion from Spain, 1492 CE', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://sourcebooks.fordham.edu/halsall/jewish/1492-jews-spain1.asp'
          }
        },
        {
          id: 'q14',
          text: 'In the course of the three months\' respite granted them they endeavoured to effect an arrangement permitting them to stay on in the country, and they felt confident of success.',
          lang: 'en',
          cite: {
            source: 'marcus-1938-the-expulsion-from-spain-1492',
            loc: { section: 'The Expulsion from Spain, 1492 CE', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://sourcebooks.fordham.edu/halsall/jewish/1492-jews-spain1.asp'
          }
        },
        {
          id: 'q15',
          text: 'Then they saw that there was evil determined against them by the King, and they gave up the hope of remaining.',
          lang: 'en',
          cite: {
            source: 'marcus-1938-the-expulsion-from-spain-1492',
            loc: { section: 'The Expulsion from Spain, 1492 CE', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://sourcebooks.fordham.edu/halsall/jewish/1492-jews-spain1.asp'
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
            value: { d: '1492' },
            cites: [
              { source: 'britannica-1911-spain', loc: { section: 'SPAIN', para: '671' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'The first duties of the Inquisition were to deal with the converted Jews and Mahommedans, respectively known as Marranos and Moriscoes, and with those who still professed their religions. The latter were dealt with by expulsion, which in the case of the Jews was enforced in 1492, and in the case of the subject Mahommedans or Mudejares in 1502.',
        lang: 'en',
        cite: { source: 'britannica-1911-spain', loc: { section: 'SPAIN', para: '671' } },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Spain'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d4/Expulsi%C3%B3n_de_los_jud%C3%ADos.jpg/1280px-Expulsi%C3%B3n_de_los_jud%C3%ADos.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Expulsi%C3%B3n_de_los_jud%C3%ADos.jpg',
    credit: { creator: 'Emilio Sala' },
    license: { id: 'public-domain' }
  }
})
