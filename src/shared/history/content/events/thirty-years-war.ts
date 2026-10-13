import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'thirty-years-war',
  names: [
    { text: 'Thirty Years’ War', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-13',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1618' },
        cites: [
          {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Military Campaigns', para: '1' }
          },
          {
            source: 'britannica-1911-thirty-years-war',
            loc: { section: 'Thirty Years\' War', para: '1' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1648-10-24' },
        cites: [
          {
            source: 'britannica-1911-westphalia-treaty-of',
            loc: { section: 'Westphalia, Treaty of', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 1,
  places: [
    {
      ref: 'place:prague',
      cites: [
        {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'Military Campaigns', para: '1' }
        }
      ]
    },
    {
      ref: 'place:munster',
      cites: [
        {
          source: 'britannica-1911-westphalia-treaty-of',
          loc: { section: 'Westphalia, Treaty of', para: '1' }
        }
      ]
    },
    {
      ref: 'place:osnabruck',
      cites: [
        {
          source: 'britannica-1911-westphalia-treaty-of',
          loc: { section: 'Westphalia, Treaty of', para: '1' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:holy-roman-empire',
      cites: [
        {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'Military Campaigns', para: '1' }
        }
      ]
    },
    {
      ref: 'polity:kingdom-of-france',
      cites: [
        {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'Military Campaigns', para: '1' }
        }
      ]
    },
    {
      ref: 'polity:spanish-empire',
      cites: [
        {
          source: 'britannica-1911-thirty-years-war',
          loc: { section: 'Thirty Years\' War', para: '25' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'imperial',
      name: 'Imperial armies and the Catholic League',
      cites: [
        {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'Military Campaigns', para: '1' }
        }
      ]
    },
    {
      key: 'protestant',
      name: 'Protestant princes and their allies',
      cites: [
        {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'Military Campaigns', para: '1' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'Emperor Ferdinand II',
      role: 'head-of-state',
      side: 'imperial',
      cites: [
        {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'Military Campaigns', para: '1' }
        }
      ]
    },
    {
      name: 'Albrecht von Wallenstein',
      role: 'commander',
      side: 'imperial',
      cites: [
        {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'Military Campaigns', para: '1' }
        }
      ]
    },
    {
      name: 'Johann von Tilly',
      role: 'commander',
      side: 'imperial',
      cites: [
        {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'Military Campaigns', para: '1' }
        }
      ]
    },
    {
      name: 'Gustavus Adolphus',
      role: 'leader',
      side: 'protestant',
      cites: [
        {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'Military Campaigns', para: '2' }
        }
      ]
    },
    {
      name: 'Cardinal Richelieu',
      role: 'leader',
      side: 'protestant',
      cites: [
        {
          source: 'britannica-1911-thirty-years-war',
          loc: { section: 'Thirty Years\' War', para: '25' }
        }
      ]
    },
    {
      name: 'Count Maximilian von Trautmansdorff',
      role: 'negotiator',
      cites: [
        {
          source: 'britannica-1911-westphalia-treaty-of',
          loc: { section: 'Westphalia, Treaty of', para: '5' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:reformation',
      rel: 'caused-by',
      cites: [
        {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'Military Campaigns', para: '1' }
        }
      ]
    },
    { ref: 'event:council-of-trent', rel: 'related' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The Thirty Years\' War resulted from a local rebellion, but the admixture of religion transformed it into a European conflict that lasted for more than a generation and devastated Germany.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Military Campaigns', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/germany/17.htm' }
        },
        {
          id: 'q2',
          text: 'In 1618 Bohemian nobles opposed the decision of Emperor Matthias (r. 1608-19) to designate his Catholic cousin Ferdinand king of Bohemia.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Military Campaigns', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/germany/17.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Fifty years before the outbreak of the war the Convention of Passau had compromised the burning questions of the Reformation, but had left other equally important points as to the secularization of church lands and the consecration of Protestant bishops to the future.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-thirty-years-war',
            loc: { section: 'Thirty Years\' War', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Thirty_Years\'_War'
          }
        },
        {
          id: 'q4',
          text: 'By the early 1550s, it was apparent that a negotiated settlement was necessary.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The Peace of Augsburg', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/germany/14.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'The Peace of Westphalia largely settled German affairs for the next century and a half.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The Peace of Westphalia', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/germany/18.htm' }
        },
        {
          id: 'q6',
          text: 'As a result of these changes, the Holy Roman Empire lost much of what remained of its power and would never again be a significant actor on the international stage.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The Peace of Westphalia', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/germany/18.htm' }
        },
        {
          id: 'q7',
          text: 'Germany was less united in 1648 than in 1618, and German particularism had been strengthened once again.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The Peace of Westphalia', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/germany/18.htm' }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q8',
          text: 'The Thirty Years\' War had a devastating effect on the German people.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The Peace of Westphalia', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/germany/18.htm' }
        },
        {
          id: 'q9',
          text: 'Historians have usually estimated that between one-fourth and one-third of the population perished from direct military causes or from illness and starvation related to the war.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The Peace of Westphalia', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/germany/18.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1620' },
            cites: [
              {
                source: 'loc-germany-country-study-1995',
                loc: { section: 'Military Campaigns', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'In 1620, in an attempt to wrest control from the nobles, imperial armies and the Catholic League under General Johann von Tilly defeated the Protestant Bohemians at the Battle of White Mountain near Prague.',
        lang: 'en',
        cite: {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'Military Campaigns', para: '1' }
        },
        provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/germany/17.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1629' },
            cites: [
              {
                source: 'loc-germany-country-study-1995',
                loc: { section: 'Military Campaigns', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'In his time of triumph, Ferdinand overreached himself by publishing in 1629 the Edict of Restitution, which required that all properties of the Roman Catholic Church taken since 1552 be returned to their original owners.',
        lang: 'en',
        cite: {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'Military Campaigns', para: '2' }
        },
        provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/germany/17.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1634-02-25', julian: true },
            cites: [
              {
                source: 'britannica-1911-thirty-years-war',
                loc: { section: 'Thirty Years\' War', para: '22' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'But his army would not follow, the coup d\'état failed, and Wallenstein was murdered at Eger (15/25 February 1634).',
        lang: 'en',
        cite: {
          source: 'britannica-1911-thirty-years-war',
          loc: { section: 'Thirty Years\' War', para: '22' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Thirty_Years\'_War'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1635' },
            cites: [
              {
                source: 'britannica-1911-thirty-years-war',
                loc: { section: 'Thirty Years\' War', para: '25' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'Richelieu had, as the price of his assistance after Nördlingen, taken over the Alsatian fortresses held by Bernhard, and in May, just before the treaty of Prague was signed, he declared war on Spain.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-thirty-years-war',
          loc: { section: 'Thirty Years\' War', para: '25' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Thirty_Years\'_War'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1641-12' },
            cites: [
              {
                source: 'britannica-1911-thirty-years-war',
                loc: { section: 'Thirty Years\' War', para: '48' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'In December 1641 there began at Münster and Osnabrück in Westphalia the peace negotiations which, after eight more years of spasmodic fighting, were to close this ruinous war.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-thirty-years-war',
          loc: { section: 'Thirty Years\' War', para: '48' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Thirty_Years\'_War'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1648-10-24' },
            cites: [
              {
                source: 'britannica-1911-westphalia-treaty-of',
                loc: { section: 'Westphalia, Treaty of', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'The treaty was signed at Münster by the members of both conventions on the 24th of October 1648, and ratifications were exchanged on the 8th of February 1649.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-westphalia-treaty-of',
          loc: { section: 'Westphalia, Treaty of', para: '5' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Westphalia,_Treaty_of'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/60/The_Ratification_of_the_Treaty_of_Munster%2C_Gerard_Ter_Borch_%281648%29.jpg/1280px-The_Ratification_of_the_Treaty_of_Munster%2C_Gerard_Ter_Borch_%281648%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:The_Ratification_of_the_Treaty_of_Munster,_Gerard_Ter_Borch_(1648).jpg',
    credit: { creator: 'After Gerard ter Borch' },
    license: { id: 'public-domain' }
  }
})
