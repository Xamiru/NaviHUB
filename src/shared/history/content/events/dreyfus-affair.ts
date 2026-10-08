import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'dreyfus-affair',
  names: [
    { text: 'Dreyfus affair', lang: 'en', role: 'primary' },
    { text: 'Affaire Dreyfus', lang: 'fr', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'crisis',
  start: {
    alts: [
      {
        value: { d: '1894-12-22' },
        cites: [
          { source: 'lemo-chronik-1894', loc: { section: 'Chronik 1894', para: '61' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1906-07-12' },
        cites: [
          { source: 'britannica-1911-dreyfus', loc: { section: 'DREYFUS, ALFRED', para: '1' } }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:paris',
      cites: [
        {
          source: 'loc-israel-country-study-1988',
          loc: { section: 'Political Zionism', para: '5' }
        }
      ]
    }
  ],
  polities: [
    { ref: 'polity:french-third-republic' }
  ],
  participants: [
    {
      ref: 'person:alfred-dreyfus',
      role: 'victim',
      cites: [
        { source: 'lemo-chronik-1894', loc: { section: 'Chronik 1894', para: '62' } }
      ]
    },
    {
      name: 'Émile Zola',
      role: 'journalist',
      cites: [
        { source: 'lemo-chronik-1898', loc: { section: 'Chronik 1898', para: '3' } }
      ]
    },
    {
      name: 'Émile Loubet',
      role: 'head-of-state',
      cites: [
        { source: 'lemo-chronik-1899', loc: { section: 'Chronik 1899', para: '43' } }
      ]
    },
    {
      ref: 'person:theodor-herzl',
      role: 'witness',
      cites: [
        {
          source: 'loc-israel-country-study-1988',
          loc: { section: 'Political Zionism', para: '5' }
        }
      ]
    },
    {
      name: 'Colonel Picquart',
      role: 'participant',
      cites: [
        {
          source: 'britannica-1911-anti-semitism',
          loc: { section: 'ANTI-SEMITISM', para: '32' }
        }
      ]
    },
    {
      name: 'Major Esterhazy',
      role: 'perpetrator',
      cites: [
        {
          source: 'britannica-1911-anti-semitism',
          loc: { section: 'ANTI-SEMITISM', para: '32' }
        }
      ]
    },
    {
      name: 'Colonel Henry',
      role: 'perpetrator',
      cites: [
        {
          source: 'britannica-1911-anti-semitism',
          loc: { section: 'ANTI-SEMITISM', para: '32' }
        }
      ]
    },
    {
      ref: 'person:georges-clemenceau',
      role: 'participant',
      cites: [
        {
          source: 'britannica-1911-anti-semitism',
          loc: { section: 'ANTI-SEMITISM', para: '32' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:first-zionist-congress',
      rel: 'contributed-to',
      cites: [
        {
          source: 'loc-israel-country-study-1988',
          loc: { section: 'Political Zionism', para: '5' }
        },
        {
          source: 'loc-israel-country-study-1988',
          loc: { section: 'Political Zionism', para: '6' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q13',
          text: 'The Dreyfus Case registers the climax not only of French, but of European anti-Semitism. It was the most ambitious and most unscrupulous attempt yet made to prove the nationalist hypothesis of the anti-Semites, and in its failure it afforded the most striking illustration of the dangers of the whole movement by bringing France to the verge of revolution.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-anti-semitism',
            loc: { section: 'ANTI-SEMITISM', para: '32' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Anti-Semitism'
          }
        },
        {
          id: 'q1',
          text: 'The turning point in Herzl\'s thinking on the Jewish question occurred during the 1894 Paris trial of Alfred Dreyfus, a Jewish officer in the French army, on charges of treason (the sale of military secrets to Germany). Dreyfus was convicted, and although he was eventually cleared, his career was ruined.',
          lang: 'en',
          cite: {
            source: 'loc-israel-country-study-1988',
            loc: { section: 'Political Zionism', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/israel/9.htm' }
        },
        {
          id: 'q2',
          text: 'The trial and later exoneration sharply divided French society and unleashed widespread anti-Semitic demonstrations and riots throughout France.',
          lang: 'en',
          cite: {
            source: 'loc-israel-country-study-1988',
            loc: { section: 'Political Zionism', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/israel/9.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q3',
          text: 'To Herzl\'s shock and dismay, many members of the French intellectual, social, and political elites--precisely those elements of society into which the upwardly mobile emancipated Jews wished to be assimilated--were the most vitriolic in their antiSemitic stance.',
          lang: 'en',
          cite: {
            source: 'loc-israel-country-study-1988',
            loc: { section: 'Political Zionism', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/israel/9.htm' }
        },
        {
          id: 'q4',
          text: 'The Dreyfus affair proved for Herzl, as the 1881 pogroms had for Pinsker, that Jews would always be an alien element in the societies in which they resided as long as they remained stateless.',
          lang: 'en',
          cite: {
            source: 'loc-israel-country-study-1988',
            loc: { section: 'Political Zionism', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/israel/9.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1894-12-22' },
            cites: [
              { source: 'lemo-chronik-1894', loc: { section: 'Chronik 1894', para: '61' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'His name was, however, unknown to the general public till he was arrested on the 15th of October 1894 on a charge of selling military secrets to Germany, condemned, publicly degraded (January 4, 1895), and transported (March 10) to the Ile du Diable, French Guiana.',
        lang: 'en',
        cite: { source: 'britannica-1911-dreyfus', loc: { section: 'DREYFUS, ALFRED', para: '1' } },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Dreyfus,_Alfred'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1897' },
            cites: [
              {
                source: 'britannica-1911-anti-semitism',
                loc: { section: 'ANTI-SEMITISM', para: '32' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'The first step was taken towards the end of 1897 by a brother of Captain Dreyfus, who, in a letter to the minister of war, denounced Major Esterhazy as the real author of the Bordereau. The authorities, supported by parliament, declined to reopen the Dreyfus Case, but they ordered a court-martial on Esterhazy, which was held with closed doors and resulted in his acquittal.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-anti-semitism',
          loc: { section: 'ANTI-SEMITISM', para: '32' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Anti-Semitism'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1898-01-13' },
            cites: [
              {
                source: 'britannica-1911-zola',
                loc: { section: 'ZOLA, ÉMILE ÉDOUARD CHARLES ANTOINE', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'At an early stage he came to the conclusion that Dreyfus was the innocent victim of a nefarious conspiracy, and on the 13th of January 1898, with his usual intrepidity, he published in the Aurore newspaper, in the form of a letter beginning with the words J\'accuse, a terrible denunciation of all those who had had a hand in hounding down that unfortunate officer.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-zola',
          loc: { section: 'ZOLA, ÉMILE ÉDOUARD CHARLES ANTOINE', para: '3' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Zola,_%C3%89mile_%C3%89douard_Charles_Antoine'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1898-08' },
            cites: [
              {
                source: 'britannica-1911-anti-semitism',
                loc: { section: 'ANTI-SEMITISM', para: '32' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'In August 1898 their efforts found their first reward. A re-examination of the documents in the case by M. Cavaignac, then minister of war, showed that one was undoubtedly forged. Colonel Henry, of the intelligence department of the war office, then confessed that he had fabricated the document, and, on being sent to Mont Valérien under arrest, cut his throat.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-anti-semitism',
          loc: { section: 'ANTI-SEMITISM', para: '32' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Anti-Semitism'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1899-06-03' },
            cites: [
              { source: 'lemo-chronik-1899', loc: { section: 'Chronik 1899', para: '31' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'Brisson’s cabinet transmitted to the court of cassation an application for the revision of the case against Dreyfus; and that tribunal, after an elaborate inquiry, which fully justified Zola’s famous letter, quashed and annulled the proceedings of the court-martial, and remitted the accused to another court-martial, to be held at Rennes.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-anti-semitism',
          loc: { section: 'ANTI-SEMITISM', para: '33' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Anti-Semitism'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1899-09-09' },
            cites: [
              {
                source: 'britannica-1911-dreyfus',
                loc: { section: 'DREYFUS, ALFRED', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'It was not till 1899 that the unfortunate prisoner was brought back to France for retrial by court-martial, and even then, so strong was the anti-Semitic and military prejudice, he was again found guilty “with extenuating circumstances” at Rennes (September 9), though ten days later he was “pardoned” by President Loubet.',
        lang: 'en',
        cite: { source: 'britannica-1911-dreyfus', loc: { section: 'DREYFUS, ALFRED', para: '1' } },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Dreyfus,_Alfred'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1906-07-12' },
            cites: [
              {
                source: 'britannica-1911-dreyfus',
                loc: { section: 'DREYFUS, ALFRED', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'It was not till the Cour de Cassation ordered a further investigation, and on the 12th of July 1906 decided that his conviction had been based on a forgery and that Dreyfus was innocent, that the agitation came to a final conclusion.',
        lang: 'en',
        cite: { source: 'britannica-1911-dreyfus', loc: { section: 'DREYFUS, ALFRED', para: '1' } },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Dreyfus,_Alfred'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/52/Degradation_alfred_dreyfus.jpg/1280px-Degradation_alfred_dreyfus.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Degradation_alfred_dreyfus.jpg',
    credit: { institution: 'Bibliothèque nationale de France', creator: 'Henri Meyer' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'bredin-1983-laffaire', perspective: 'european' },
    { source: 'duclert-1994-laffaire-dreyfus', perspective: 'european' }
  ]
})
