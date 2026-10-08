import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'first-geneva-convention',
  names: [
    { text: 'First Geneva Convention', lang: 'en', role: 'primary' },
    {
      text: 'Red Cross Convention',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'avalon-geneva-convention-1864',
          loc: {
            section: 'Amelioration of the Condition of the Wounded on the Field of Battle (Red Cross Convention); August 22, 1864'
          }
        }
      ]
    },
    {
      text: 'Convention for the Amelioration of the Condition of the Wounded in Armies in the Field',
      lang: 'en',
      role: 'official',
      cites: [
        {
          source: 'avalon-geneva-convention-1864',
          loc: {
            section: 'Amelioration of the Condition of the Wounded on the Field of Battle (Red Cross Convention); August 22, 1864'
          }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'treaty',
  start: {
    alts: [
      {
        value: { d: '1864-08-22' },
        cites: [
          {
            source: 'avalon-geneva-convention-1864',
            loc: {
              section: 'Amelioration of the Condition of the Wounded on the Field of Battle (Red Cross Convention); August 22, 1864'
            }
          },
          { source: 'lemo-chronik-1864', loc: { section: 'Chronik 1864', para: '35' } },
          { source: 'lemo-chronik-1864', loc: { section: 'Chronik 1864', para: '36' } }
        ]
      }
    ]
  },
  regions: ['europe', 'global'],
  prominence: 2,
  places: [
    {
      ref: 'place:geneva',
      cites: [
        {
          source: 'avalon-geneva-convention-1864',
          loc: {
            section: 'Amelioration of the Condition of the Wounded on the Field of Battle (Red Cross Convention); August 22, 1864'
          }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'Henry Dunant',
      role: 'organizer',
      cites: [
        { source: 'ehne-birebent-spirit-of-geneva', loc: { section: 'The Spirit of Geneva' } }
      ]
    },
    {
      name: 'G. H. Dufour',
      role: 'signatory',
      cites: [
        {
          source: 'avalon-geneva-convention-1864',
          loc: {
            section: 'Amelioration of the Condition of the Wounded on the Field of Battle (Red Cross Convention); August 22, 1864'
          }
        }
      ]
    },
    {
      name: 'G. Moynier',
      role: 'signatory',
      cites: [
        {
          source: 'avalon-geneva-convention-1864',
          loc: {
            section: 'Amelioration of the Condition of the Wounded on the Field of Battle (Red Cross Convention); August 22, 1864'
          }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q11',
          text: 'In August 1864, delegates from a dozen countries adopted the first Geneva Convention, which put a legal framework around these decisions and made it compulsory for armies to care for all wounded soldiers, whatever side they were on.',
          lang: 'en',
          cite: {
            source: 'icrc-founding-and-early-years-1863-1914',
            loc: { section: 'Founding and early years of the ICRC (1863-1914)', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.icrc.org/en/document/founding-and-early-years-icrc-1863-1914'
          }
        },
        {
          id: 'q1',
          text: 'That same year, twelve nations signed the first of a series of international conventions establishing standards for dealing with wounded soldiers.',
          lang: 'en',
          cite: {
            source: 'ehne-birebent-spirit-of-geneva',
            loc: { section: 'The Spirit of Geneva' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/en/encyclopedia/themes/international-relations/cultures-peace/spirit-geneva'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q4',
          text: 'For example, after witnessing the abandonment of thousands of wounded during the battle of Solferino (June 24, 1859), the Swiss man Henri Dunant created the Red Cross—known since 1919 as The International Red Cross and Red Crescent Movement—whose activities have increased exponentially in twentieth and twenty-first century conflicts.',
          lang: 'en',
          cite: {
            source: 'ehne-douzou-army-medical-services',
            loc: { section: 'Army Medical Services' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/en/encyclopedia/themes/wars-and-memories/combatants/army-medical-services'
          }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q5',
          text: 'Ambulances and military hospitals shall be acknowledged to be neuter, and, as such, shall be protected and respected by belligerents so long as any sick or wounded may be therein.',
          lang: 'en',
          cite: {
            source: 'avalon-geneva-convention-1864',
            loc: {
              section: 'Amelioration of the Condition of the Wounded on the Field of Battle (Red Cross Convention); August 22, 1864'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://avalon.law.yale.edu/19th_century/geneva04.asp'
          }
        },
        {
          id: 'q6',
          text: 'Wounded or sick soldiers shall be entertained and taken care of, to whatever nation they may belong.',
          lang: 'en',
          cite: {
            source: 'avalon-geneva-convention-1864',
            loc: {
              section: 'Amelioration of the Condition of the Wounded on the Field of Battle (Red Cross Convention); August 22, 1864'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://avalon.law.yale.edu/19th_century/geneva04.asp'
          }
        },
        {
          id: 'q7',
          text: 'The flag and the arm-badge shall bear a red cross on a white ground.',
          lang: 'en',
          cite: {
            source: 'avalon-geneva-convention-1864',
            loc: {
              section: 'Amelioration of the Condition of the Wounded on the Field of Battle (Red Cross Convention); August 22, 1864'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://avalon.law.yale.edu/19th_century/geneva04.asp'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q8',
          text: 'This question, which for a long time was the monopoly of the state, later took on an inter- and transnational dimension during the nineteenth century, with the appearance of organizations such as the Red Cross (1859) and the signing of the Geneva Conventions (1864-2005).',
          lang: 'en',
          cite: {
            source: 'ehne-douzou-army-medical-services',
            loc: { section: 'Army Medical Services' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/en/encyclopedia/themes/wars-and-memories/combatants/army-medical-services'
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
            value: { d: '1864' },
            cites: [
              {
                source: 'ehne-birebent-spirit-of-geneva',
                loc: { section: 'The Spirit of Geneva' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Christian Birebent' }
            ]
          },
          {
            value: { d: '1859' },
            cites: [
              {
                source: 'ehne-douzou-army-medical-services',
                loc: { section: 'Army Medical Services' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Anne-Claire Douzou' }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'Led by Henry Dunant (1828-1910), in 1864 a committee founded the Red Cross there.',
        lang: 'en',
        cite: { source: 'ehne-birebent-spirit-of-geneva', loc: { section: 'The Spirit of Geneva' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://ehne.fr/en/encyclopedia/themes/international-relations/cultures-peace/spirit-geneva'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1864-08-22' },
            cites: [
              {
                source: 'avalon-geneva-convention-1864',
                loc: {
                  section: 'Amelioration of the Condition of the Wounded on the Field of Battle (Red Cross Convention); August 22, 1864'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'Done at Geneva, the twenty-second day of the month of August of the year one thousand eight hundred and Sixty-four.',
        lang: 'en',
        cite: {
          source: 'avalon-geneva-convention-1864',
          loc: {
            section: 'Amelioration of the Condition of the Wounded on the Field of Battle (Red Cross Convention); August 22, 1864'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://avalon.law.yale.edu/19th_century/geneva04.asp'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/a/a5/Signing_of_the_first_geneva_convention.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Signing_of_the_first_geneva_convention.jpg',
    credit: { creator: 'Charles Édouard Armand-Dumaresq' },
    license: { id: 'public-domain' }
  },
  archive: [
    {
      id: 'dunant-souvenir-1862',
      mediaKind: 'document',
      title: 'Un Souvenir de Solferino',
      date: { d: '1862' },
      url: 'https://archive.org/download/unsouvenirdesol00dunagoog/unsouvenirdesol00dunagoog.pdf',
      page: 'https://archive.org/details/unsouvenirdesol00dunagoog',
      credit: { institution: 'Internet Archive', creator: 'Henry Dunant' },
      license: { id: 'public-domain' },
      bytes: 5142205
    }
  ],
  furtherReading: [
    {
      source: 'bugnion-1994-le-cicr-et-la-protection-des-victimes-de-la-guerre',
      perspective: 'european'
    }
  ]
})
