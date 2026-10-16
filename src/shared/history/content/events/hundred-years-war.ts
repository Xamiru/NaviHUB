import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'hundred-years-war',
  names: [
    { text: 'Hundred Years’ War', lang: 'en', role: 'primary' },
    {
      text: 'Hundred Years War',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'loc-guide-joan-of-arc', loc: { section: 'Joan of Arc', para: '1' } }
      ]
    }
  ],
  researched: '2026-10-16',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1337' },
        cites: [
          {
            source: 'britannica-1911-hundred-years-war',
            loc: { section: 'Hundred Years\' War', para: '1' }
          },
          { source: 'loc-guide-joan-of-arc', loc: { section: 'Joan of Arc', para: '1' } }
        ]
      },
      {
        value: { d: '1339' },
        cites: [
          {
            source: 'loc-subject-hundred-years-war',
            loc: { section: 'MARC field 150: heading' }
          }
        ],
        heldBy: [
          { kind: 'organization', name: 'Library of Congress Subject Headings' }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1453' },
        cites: [
          {
            source: 'britannica-1911-hundred-years-war',
            loc: { section: 'Hundred Years\' War', para: '6' }
          },
          { source: 'loc-guide-joan-of-arc', loc: { section: 'Joan of Arc', para: '1' } },
          {
            source: 'loc-subject-hundred-years-war',
            loc: { section: 'MARC field 150: heading' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:orleans',
      cites: [
        {
          source: 'britannica-1911-hundred-years-war',
          loc: { section: 'Hundred Years\' War', para: '6' }
        }
      ]
    },
    {
      ref: 'place:rouen',
      cites: [
        {
          source: 'britannica-1911-hundred-years-war',
          loc: { section: 'Hundred Years\' War', para: '6' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:kingdom-of-england',
      cites: [
        {
          source: 'britannica-1911-hundred-years-war',
          loc: { section: 'Hundred Years\' War', para: '1' }
        }
      ]
    },
    {
      ref: 'polity:kingdom-of-france',
      cites: [
        {
          source: 'britannica-1911-hundred-years-war',
          loc: { section: 'Hundred Years\' War', para: '1' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'england',
      name: 'England',
      polity: 'polity:kingdom-of-england',
      cites: [
        {
          source: 'britannica-1911-hundred-years-war',
          loc: { section: 'Hundred Years\' War', para: '1' }
        }
      ]
    },
    {
      key: 'france',
      name: 'France',
      polity: 'polity:kingdom-of-france',
      cites: [
        {
          source: 'britannica-1911-hundred-years-war',
          loc: { section: 'Hundred Years\' War', para: '1' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:joan-of-arc',
      role: 'commander',
      side: 'france',
      cites: [
        {
          source: 'britannica-1911-hundred-years-war',
          loc: { section: 'Hundred Years\' War', para: '6' }
        }
      ]
    },
    {
      name: 'Edward III',
      role: 'leader',
      side: 'england',
      cites: [
        {
          source: 'britannica-1911-hundred-years-war',
          loc: { section: 'Hundred Years\' War', para: '2' }
        }
      ]
    },
    {
      name: 'Henry V',
      role: 'commander',
      side: 'england',
      cites: [
        {
          source: 'britannica-1911-hundred-years-war',
          loc: { section: 'Hundred Years\' War', para: '5' }
        }
      ]
    },
    {
      name: 'Charles VII',
      role: 'leader',
      side: 'france',
      cites: [
        {
          source: 'britannica-1911-hundred-years-war',
          loc: { section: 'Hundred Years\' War', para: '6' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:wars-of-the-roses',
      rel: 'followed-by',
      cites: [
        {
          source: 'britannica-1911-hundred-years-war',
          loc: { section: 'Hundred Years\' War', para: '6' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'HUNDRED YEARS’ WAR. This name is given to the protracted conflict between France and England from 1337 to 1453, which continued through the reigns of the French kings Philip VI., John II., Charles V., Charles VI., Charles VII., and of the English kings Edward III., Richard II., Henry IV., Henry V. and Henry VI.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-hundred-years-war',
            loc: { section: 'Hundred Years\' War', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Hundred_Years%27_War'
          }
        },
        {
          id: 'q2',
          text: 'The future king of France was somewhat in doubt of his claim to the throne, as was his mother who doubted his legitimacy. Even his close advisors were skeptical. This unstable period known as the Hundred Years\' War (1337-1453) was marked by constant warfare between France and England.',
          lang: 'en',
          cite: { source: 'loc-guide-joan-of-arc', loc: { section: 'Joan of Arc', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://guides.loc.gov/feminism-french-women-history/famous/joan-of-arc'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'The principal causes of the war, which broke out in Guienne in 1337, were the disputes arising in connexion with the French possessions of the English kings, in respect to which they were vassals of the kings of France; the pretensions of Edward III. to the French throne after the accession of Philip VI.; Philip’s intervention in the affairs of Flanders and Scotland; and, finally, the machinations of Robert of Artois.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-hundred-years-war',
            loc: { section: 'Hundred Years\' War', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Hundred_Years%27_War'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'During Philip VI.’s reign fortune favoured the English.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-hundred-years-war',
            loc: { section: 'Hundred Years\' War', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Hundred_Years%27_War'
          }
        },
        {
          id: 'q5',
          text: 'In 1356 the battle of Poitiers (September 19), in which John was taken prisoner, was the signal for conflicts in Paris between Stephen Marcel and the dauphin, and for the outbreak of the Jacquerie.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-hundred-years-war',
            loc: { section: 'Hundred Years\' War', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Hundred_Years%27_War'
          }
        },
        {
          id: 'q6',
          text: 'The treaty of Brétigny, concluded on the 8th of May 1360, procured France several years’ repose.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-hundred-years-war',
            loc: { section: 'Hundred Years\' War', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Hundred_Years%27_War'
          }
        },
        {
          id: 'q7',
          text: 'Under Charles V. hostilities at first obtained only between French, Anglo-Navarrais (Du Guesclin’s victory at Cocherel, May 16, 1364) and Bretons.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-hundred-years-war',
            loc: { section: 'Hundred Years\' War', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Hundred_Years%27_War'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q8',
          text: 'From this time on the English lost ground steadily, and the treaty of Arras (March 20, 1435), by which good relations were established between Charles VII. and Philip the Good, duke of Burgundy, dealt them a final blow.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-hundred-years-war',
            loc: { section: 'Hundred Years\' War', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Hundred_Years%27_War'
          }
        },
        {
          id: 'q9',
          text: 'The defeat of Sir Thomas Kyriel, one of Bedford’s veteran captains, at Formigny in 1450, and the taking of Cherbourg, completed the conquest of the province.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-hundred-years-war',
            loc: { section: 'Hundred Years\' War', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Hundred_Years%27_War'
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
            value: { d: '1346' },
            cites: [
              {
                source: 'britannica-1911-hundred-years-war',
                loc: { section: 'Hundred Years\' War', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'In 1346, while the French were trying to invade Guienne, Edward III. landed in Normandy, ravaged that province, part of the Île de France and Picardy, defeated the French army at Créçy on the 26th of August 1346, and besieged Calais, which surrendered on the 3rd of August 1347.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-hundred-years-war',
          loc: { section: 'Hundred Years\' War', para: '2' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Hundred_Years%27_War'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1415' },
            cites: [
              {
                source: 'britannica-1911-hundred-years-war',
                loc: { section: 'Hundred Years\' War', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'In 1415 his son, Henry V., landed in Normandy on the expiry of the truce of the 25th of September 1413, which had been extended in 1414 and 1415. He won the victory of Agincourt (October 25, 1415), and then seized Caen and part of Normandy, while France was exhausting herself in the feuds of Armagnacs and Burgundians.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-hundred-years-war',
          loc: { section: 'Hundred Years\' War', para: '5' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Hundred_Years%27_War'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1429' },
            cites: [
              {
                source: 'britannica-1911-hundred-years-war',
                loc: { section: 'Hundred Years\' War', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'Orleans, the last bulwark of royalty, had been besieged since the 12th of October 1428, and was on the point of surrender when Joan of Arc appeared. She saved Orleans (May 8, 1429), defeated the English at Patay on the 16th of June, had Charles VII. crowned at Reims on the 17th of July, was taken at Compiègne on the 24th of May 1430, and was burned at Rouen on the 30th of May 1431',
        lang: 'en',
        cite: {
          source: 'britannica-1911-hundred-years-war',
          loc: { section: 'Hundred Years\' War', para: '6' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Hundred_Years%27_War'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1453' },
            cites: [
              {
                source: 'britannica-1911-hundred-years-war',
                loc: { section: 'Hundred Years\' War', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'Guienne revolted against France, whereupon Talbot returned there with an army of 5000 men, but was vanquished and killed at Castillon on the 17th of July 1453. Bordeaux capitulated on the 9th of October, and the Hundred Years’ War was terminated by the expulsion of the English, who were by this time so fully occupied with the Wars of the Roses as to be unable to take the offensive against France anew.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-hundred-years-war',
          loc: { section: 'Hundred Years\' War', para: '6' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Hundred_Years%27_War'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ec/SiegeOfOrleans1429.jpg/1280px-SiegeOfOrleans1429.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:SiegeOfOrleans1429.jpg',
    credit: { institution: 'Bibliothèque nationale de France' },
    license: { id: 'public-domain' }
  }
})
