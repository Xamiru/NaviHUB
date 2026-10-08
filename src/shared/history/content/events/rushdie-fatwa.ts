import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'rushdie-fatwa',
  names: [
    { text: 'Khomeini’s fatwa against Salman Rushdie', lang: 'en', role: 'primary' },
    { text: 'فتوای امام خمینی درباره سلمان رشدی', lang: 'fa', role: 'native' },
    { text: 'Rushdie affair', lang: 'en', role: 'alternative' },
    { text: 'Satanic Verses affair', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-08',
  type: 'religious',
  start: {
    alts: [
      {
        value: { d: '1989-02-14' },
        cites: [
          { source: 'iranica-algar-fatwa', loc: { section: 'FATWĀ', para: '30' } },
          {
            source: 'iranica-algar-khomeini-life',
            loc: { section: 'KHOMEINI i. Life', para: '104' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:tehran',
      cites: [
        { source: 'hansard-commons-1989-02-21-iran', loc: { section: 'Iran', para: '3' } }
      ]
    },
    {
      ref: 'place:london',
      cites: [
        {
          source: 'iranica-algar-khomeini-life',
          loc: { section: 'KHOMEINI i. Life', para: '104' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:islamic-republic-of-iran',
      cites: [
        { source: 'iranica-algar-fatwa', loc: { section: 'FATWĀ', para: '30' } }
      ]
    },
    {
      ref: 'polity:united-kingdom',
      cites: [
        { source: 'hansard-commons-1989-02-21-iran', loc: { section: 'Iran', para: '1' } }
      ]
    }
  ],
  sides: [
    {
      key: 'iran',
      name: 'Iran',
      polity: 'polity:islamic-republic-of-iran',
      cites: [
        { source: 'iranica-algar-fatwa', loc: { section: 'FATWĀ', para: '30' } }
      ]
    },
    {
      key: 'uk',
      name: 'United Kingdom',
      polity: 'polity:united-kingdom',
      cites: [
        { source: 'hansard-commons-1989-02-21-iran', loc: { section: 'Iran', para: '1' } }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:ruhollah-khomeini',
      role: 'leader',
      side: 'iran',
      cites: [
        { source: 'iranica-algar-fatwa', loc: { section: 'FATWĀ', para: '30' } },
        {
          source: 'iranica-algar-khomeini-life',
          loc: { section: 'KHOMEINI i. Life', para: '104' }
        }
      ]
    },
    {
      ref: 'person:ali-khamenei',
      role: 'head-of-state',
      side: 'iran',
      cites: [
        { source: 'hansard-commons-1989-02-21-iran', loc: { section: 'Iran', para: '4' } }
      ]
    },
    {
      name: 'Salman Rushdie',
      role: 'participant',
      cites: [
        { source: 'iranica-algar-fatwa', loc: { section: 'FATWĀ', para: '30' } }
      ]
    },
    {
      name: 'Geoffrey Howe',
      role: 'diplomat',
      side: 'uk',
      cites: [
        { source: 'hansard-commons-1989-02-21-iran', loc: { section: 'Iran', para: '1' } }
      ]
    }
  ],
  related: [
    {
      ref: 'event:death-of-ruhollah-khomeini',
      rel: 'followed-by',
      cites: [
        {
          source: 'iranica-algar-khomeini-life',
          loc: { section: 'KHOMEINI i. Life', para: '129' }
        }
      ]
    },
    { ref: 'event:iran-iraq-war', rel: 'related' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The fatwā of Ḵomeynī which had the greatest global impact was, of course, that issued on 25 Bahman 1367 Š./14 February 1989 calling for the execution of Salman Rushdie, author of a novel, The Satanic Verses, widely regarded by Muslims as obscenely blasphemous, as well as those responsible for the publication and dissemination of the work',
          lang: 'en',
          cite: { source: 'iranica-algar-fatwa', loc: { section: 'FATWĀ', para: '30' } },
          provenance: { via: 'web', at: '2026-10-08', url: 'https://www.iranicaonline.org/articles/fatwa' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'The book had already enraged Muslims across the world, not only because of the alleged episode in the life of the Prophet that furnished its title, but also because of its depiction of a brothel staffed by women bearing the names of his wives as well as other offensive material hiding behind a veneer of fiction in the novel.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-khomeini-life',
            loc: { section: 'KHOMEINI i. Life', para: '104' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/20260928150602/https://www.iranicaonline.org/articles/khomeini-i-life/'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'On 22 February 1989, eight days after issuing the fatwā condemning Rushdie, Khomeini addressed a lengthy message to all the strata of the religious institution—the marājeʿ, the ṭalaba, the leaders of congregational and Friday prayer; it was entitled Manšur-e ruḥā niyat. Part of its content was, however, obliquely addressed to the public at large.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-khomeini-life',
            loc: { section: 'KHOMEINI i. Life', para: '105' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/20260928150602/https://www.iranicaonline.org/articles/khomeini-i-life/'
          }
        },
        {
          id: 'q4',
          text: 'In Brussels yesterday, I discussed these death threats with Foreign Ministers of the European Community. All the Governments of the Twelve fully shared our sense of outrage at the incitement to murder.',
          lang: 'en',
          cite: { source: 'hansard-commons-1989-02-21-iran', loc: { section: 'Iran', para: '6' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://api.parliament.uk/historic-hansard/commons/1989/feb/21/iran'
          }
        },
        {
          id: 'q5',
          text: 'In those circumstances, the Government have concluded that, in our own particular case, it is neither possible nor sensible to conduct a normal relationship with Iran.',
          lang: 'en',
          cite: { source: 'hansard-commons-1989-02-21-iran', loc: { section: 'Iran', para: '7' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://api.parliament.uk/historic-hansard/commons/1989/feb/21/iran'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'Following Ayatollah Khomeini\'s original statement, there were clear signs that some in the Iranian Government wished to distance themselves from the threat of violence.',
          lang: 'en',
          cite: { source: 'hansard-commons-1989-02-21-iran', loc: { section: 'Iran', para: '4' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://api.parliament.uk/historic-hansard/commons/1989/feb/21/iran'
          }
        },
        {
          id: 'q7',
          text: 'The Iranian Government broke diplomatic relations with the United Kingdom on 7 March.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1989-03-08-iran-diplomatic-relations',
            loc: { section: 'Iran (Diplomatic Relations)', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://api.parliament.uk/historic-hansard/commons/1989/mar/08/iran-diplomatic-relations'
          }
        },
        {
          id: 'q8',
          text: 'The 12 European Economic Community (EEC) countries recall their ambassadors from Tehran over the Salman Rushdie affair.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-4',
            loc: { section: 'Chronology of Iranian History Part 4, 1989' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-4/'
          }
        },
        {
          id: 'q9',
          text: 'Diplomatic ties with Britain, which had been broken off over the Salman Rushdie affair, are resumed.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-4',
            loc: { section: 'Chronology of Iranian History Part 4, 1990' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-4/'
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
            value: { d: '1989-02-14' },
            cites: [
              { source: 'iranica-algar-fatwa', loc: { section: 'FATWĀ', para: '30' } },
              {
                source: 'iranica-algar-khomeini-life',
                loc: { section: 'KHOMEINI i. Life', para: '104' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'Of far greater impact was the fatwā Khomeini issued on 14 February 1989 calling for the execution of Salman Rushdie, author of The Satanic Verses, and all those who, aware of its contents, were involved in its publication',
        lang: 'en',
        cite: {
          source: 'iranica-algar-khomeini-life',
          loc: { section: 'KHOMEINI i. Life', para: '104' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://web.archive.org/web/20260928150602/https://www.iranicaonline.org/articles/khomeini-i-life/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1989-02-18' },
            cites: [
              {
                source: 'iranica-algar-khomeini-life',
                loc: { section: 'KHOMEINI i. Life', para: '104' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'Four days later, Rushdie issued a statement from London regretting the offence that he had caused to Muslims.',
        lang: 'en',
        cite: {
          source: 'iranica-algar-khomeini-life',
          loc: { section: 'KHOMEINI i. Life', para: '104' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://web.archive.org/web/20260928150602/https://www.iranicaonline.org/articles/khomeini-i-life/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1989-02-18' },
            cites: [
              {
                source: 'iranica-algar-khomeini-life',
                loc: { section: 'KHOMEINI i. Life', para: '104' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Hamid Algar' }
            ]
          },
          {
            value: { d: '1989-02-19' },
            cites: [
              {
                source: 'hansard-commons-1989-02-21-iran',
                loc: { section: 'Iran', para: '5' }
              }
            ],
            heldBy: [
              { kind: 'state', name: 'United Kingdom' }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'However, on Sunday last, Ayatollah Khomeini made a further statement, renewing most explicitly the threat to Mr. Rushdie\'s life.',
        lang: 'en',
        cite: { source: 'hansard-commons-1989-02-21-iran', loc: { section: 'Iran', para: '5' } },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://api.parliament.uk/historic-hansard/commons/1989/feb/21/iran'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1989-02-20' },
            cites: [
              {
                source: 'hansard-commons-1989-02-21-iran',
                loc: { section: 'Iran', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'The Twelve Foreign Ministers issued a statement, whose text has been placed in the Library of the House, in which they rejected Khomeini\'s threats as an affront to international standards of behaviour which could not be tolerated. We all reaffirmed our commitment to ensure the protection of the life and property of our citizens. We agreed and announced two immediate steps: suspension of any exchanges of high-level official visits between Iran and our countries and the recall of heads of mission from Tehran.',
        lang: 'en',
        cite: { source: 'hansard-commons-1989-02-21-iran', loc: { section: 'Iran', para: '6' } },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://api.parliament.uk/historic-hansard/commons/1989/feb/21/iran'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1989-02-21' },
            cites: [
              { source: 'hansard-commons-1989-02-21-iran', loc: { section: 'Iran' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'We have therefore decided to withdraw all the United Kingdom-based staff from our embassy in Tehran.',
        lang: 'en',
        cite: { source: 'hansard-commons-1989-02-21-iran', loc: { section: 'Iran', para: '7' } },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://api.parliament.uk/historic-hansard/commons/1989/feb/21/iran'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1989-03-07' },
            cites: [
              {
                source: 'hansard-commons-1989-03-08-iran-diplomatic-relations',
                loc: { section: 'Iran (Diplomatic Relations)', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'We have made clear throughout that, as with any other country, normal relations between Britain and Iran must depend on Iran\'s fulfilment of her international obligations, in particular by renouncing the use or threat of violence against our citizens.',
        lang: 'en',
        cite: {
          source: 'hansard-commons-1989-03-08-iran-diplomatic-relations',
          loc: { section: 'Iran (Diplomatic Relations)', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://api.parliament.uk/historic-hansard/commons/1989/mar/08/iran-diplomatic-relations'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3c/Hayfestival-2016-Salman-Rushdie-1-cu.jpg/1280px-Hayfestival-2016-Salman-Rushdie-1-cu.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Hayfestival-2016-Salman-Rushdie-1-cu.jpg',
    credit: { institution: 'Wikimedia Commons', creator: 'Andrew Lih' },
    license: { id: 'cc-by-sa', version: '3.0', url: 'https://creativecommons.org/licenses/by-sa/3.0' }
  },
  furtherReading: [
    {
      source: 'shamshiri-2003-bala-ye-salman-rushdi-va-ayat-e-shaytani',
      perspective: 'iranian'
    },
    { source: 'rifat-sayyid-ahmad-1993-ayat-e-shaytani', perspective: 'arab' }
  ]
})
