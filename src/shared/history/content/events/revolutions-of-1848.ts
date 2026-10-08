import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'revolutions-of-1848',
  names: [
    { text: 'Revolutions of 1848', lang: 'en', role: 'primary' },
    {
      text: 'springtime of the peoples',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'ehne-fogacci-national-construction-and-european-issues',
          loc: { section: 'National Construction and European Issues', para: '21' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'revolution',
  start: {
    alts: [
      {
        value: { d: '1848-02' },
        cites: [
          {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The Revolutions of 1848', para: '1' }
          },
          {
            source: 'ehne-hauch-gender-and-revolution-in-europe',
            loc: { section: 'Gender and revolution in Europe, 19th-20th centuries', para: '13' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1849' },
        cites: [
          {
            source: 'ehne-hauch-gender-and-revolution-in-europe',
            loc: { section: 'Gender and revolution in Europe, 19th-20th centuries', para: '14' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 1,
  places: [
    {
      ref: 'place:paris',
      cites: [
        {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'The Revolutions of 1848', para: '1' }
        }
      ]
    },
    {
      ref: 'place:berlin',
      cites: [
        {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'The Revolutions of 1848', para: '2' }
        }
      ]
    },
    {
      ref: 'place:vienna',
      cites: [
        {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'The Revolutions of 1848', para: '2' }
        }
      ]
    }
  ],
  polities: [
    { ref: 'polity:austrian-empire' },
    { ref: 'polity:kingdom-of-prussia' },
    { ref: 'polity:french-second-republic' }
  ],
  related: [
    { ref: 'event:french-revolution-of-1848', rel: 'related' },
    { ref: 'event:frankfurt-parliament', rel: 'related' },
    { ref: 'event:hungarian-revolution-of-1848', rel: 'related' }
  ],
  participants: [
    {
      ref: 'person:klemens-von-metternich',
      role: 'head-of-government',
      cites: [
        {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'The Revolutions of 1848', para: '2' }
        },
        {
          source: 'loc-austria-country-study-1994',
          loc: { section: 'Revolutionary Rise and Fall', para: '1' }
        }
      ]
    },
    {
      ref: 'person:nicholas-i-of-russia',
      role: 'head-of-state',
      cites: [
        { source: 'lemo-chronik-1849', loc: { section: 'Chronik 1849', para: '40' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'In 1848 liberal and nationalist ideologies sparked revolutions across Europe.',
          lang: 'en',
          cite: {
            source: 'loc-austria-country-study-1994',
            loc: { section: 'Revolutionary Rise and Fall', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/austria/23.htm' }
        },
        {
          id: 'q2',
          text: 'Numerous German cities were shaken by uprisings in which crowds consisting mainly of the urban poor, but also of students and members of the liberal middle class, stormed their rulers\' palaces and demanded fundamental reform.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The Revolutions of 1848', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/25.htm' }
        },
        {
          id: 'q3',
          text: 'The rulers of both cities, like rulers elsewhere, quickly acceded to the demands of their rebellious subjects and promised constitutions and representative government.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The Revolutions of 1848', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/25.htm' }
        }
      ]
    },
    {
      kind: 'causes',
      quotes: [
        {
          id: 'q4',
          text: 'Europe endured hard times during much of the 1840s.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The Revolutions of 1848', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/25.htm' }
        },
        {
          id: 'q5',
          text: 'An economic depression added to the hardship, spreading discontent among the poor and the middle class alike.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The Revolutions of 1848', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/25.htm' }
        },
        {
          id: 'q6',
          text: 'Popular expectations of war caused a financial panic in the Habsburg Empire that worked to the advantage of the revolutionaries.',
          lang: 'en',
          cite: {
            source: 'loc-austria-country-study-1994',
            loc: { section: 'Revolutionary Rise and Fall', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/austria/23.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q7',
          text: 'As conservative political authority gave way before the revolutionary forces, two bold military commanders began to reassert control over the situation, often ignoring or contravening timid orders from the court.',
          lang: 'en',
          cite: {
            source: 'loc-austria-country-study-1994',
            loc: { section: 'Revolutionary Rise and Fall', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/austria/23.htm' }
        },
        {
          id: 'q8',
          text: 'General Alfred Windischgrätz routed the revolutionaries from Prague and Vienna and reestablished order by military force.',
          lang: 'en',
          cite: {
            source: 'loc-austria-country-study-1994',
            loc: { section: 'Revolutionary Rise and Fall', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/austria/23.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q9',
          text: 'Conservative governments fell, and Metternich fled to Britain.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The Revolutions of 1848', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/25.htm' }
        },
        {
          id: 'q10',
          text: 'The European revolutionary wave of 1848 had stopped at the gates of tsarist Russia.',
          lang: 'en',
          cite: {
            source: 'ehne-hauch-gender-and-revolution-in-europe',
            loc: { section: 'Gender and revolution in Europe, 19th-20th centuries', para: '20' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/en/encyclopedia/themes/gender-and-europe/gender-and-revolution-in-europe-19th-20th-century/gender-and-revolution-in-europe-19th-20th-centuries'
          }
        },
        {
          id: 'q11',
          text: 'The revolution of 1830 led to the establishment of a monarchy in Belgium, just as the movements of 1848 mainly led the advocates of the national idea to favour conservative solutions.',
          lang: 'en',
          cite: {
            source: 'ehne-fogacci-national-construction-and-european-issues',
            loc: { section: 'National Construction and European Issues', para: '22' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/en/encyclopedia/themes/political-europe/national-construction-and-european-issues/national-construction-and-european-issues'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q12',
          text: 'From the viewpoint of gender, the European revolution of 1848-1849 revealed how much the bourgeois gender order had taken root in ways of thinking a half-century after the French Revolution.',
          lang: 'en',
          cite: {
            source: 'ehne-hauch-gender-and-revolution-in-europe',
            loc: { section: 'Gender and revolution in Europe, 19th-20th centuries', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/en/encyclopedia/themes/gender-and-europe/gender-and-revolution-in-europe-19th-20th-century/gender-and-revolution-in-europe-19th-20th-centuries'
          }
        },
        {
          id: 'q13',
          text: 'In 1848, complementarity between the genders was also expressed through “social maternity,” as revolutionary women collected money, fed combatants, treated the wounded and embroidered flags.',
          lang: 'en',
          cite: {
            source: 'ehne-hauch-gender-and-revolution-in-europe',
            loc: { section: 'Gender and revolution in Europe, 19th-20th centuries', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/en/encyclopedia/themes/gender-and-europe/gender-and-revolution-in-europe-19th-20th-century/gender-and-revolution-in-europe-19th-20th-centuries'
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
            value: { d: '1848-03-13', notAfter: '1848-03-15' },
            cites: [
              { source: 'lemo-chronik-1848', loc: { section: 'Chronik 1848', para: '19' } },
              { source: 'lemo-chronik-1848', loc: { section: 'Chronik 1848', para: '18' } },
              {
                source: 'britannica-1911-kossuth',
                loc: { section: 'KOSSUTH, LAJOS', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q22',
        text: 'In March 1848, revolution erupted in Vienna, forcing Austria\'s Chancellor Klemens von Metternich to flee the capital.',
        lang: 'en',
        cite: {
          source: 'loc-hungary-country-study-1989',
          loc: { section: 'The Revolution of March 1848', para: '1' }
        },
        provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/hungary/21.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1848-03-17' },
            cites: [
              { source: 'lemo-chronik-1848', loc: { section: 'Chronik 1848', para: '23' } },
              { source: 'lemo-chronik-1848', loc: { section: 'Chronik 1848', para: '22' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q23',
        text: 'In Venice the people, under the leadership of Manin, rose in arms and forced the military and civil governors (Counts Zichy and Palffy) to sign a capitulation on the 22nd of March, after which the republic was proclaimed.',
        lang: 'en',
        cite: { source: 'britannica-1911-italy', loc: { section: 'ITALY', para: '1529' } },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Italy'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1848-03-18', notAfter: '1848-03-19' },
            cites: [
              { source: 'lemo-chronik-1848', loc: { section: 'Chronik 1848', para: '25' } },
              { source: 'lemo-chronik-1848', loc: { section: 'Chronik 1848', para: '24' } },
              {
                source: 'britannica-1911-germany-history',
                loc: { section: 'GERMANY: History', para: '224' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q24',
        text: 'though the riot which broke out in Berlin on the 15th of March was suppressed by the troops with but little bloodshed, the king shrank with horror from the thought of fighting his “beloved Berliners,” and when on the night of the 18th the fighting was renewed, he entered into negotiation with the insurgents, negotiations that resulted in the withdrawal of the troops from Berlin.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-germany-history',
          loc: { section: 'GERMANY: History', para: '224' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Germany/History'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1848-06-13', notAfter: '1848-06-16' },
            cites: [
              { source: 'lemo-chronik-1848', loc: { section: 'Chronik 1848', para: '61' } },
              { source: 'lemo-chronik-1848', loc: { section: 'Chronik 1848', para: '60' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q17',
        text: 'In Prag findet der Pfingstaufstand statt.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1848', loc: { section: 'Chronik 1848', para: '61' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1848.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1848-10-31' },
            cites: [
              { source: 'lemo-chronik-1848', loc: { section: 'Chronik 1848', para: '100' } },
              { source: 'lemo-chronik-1848', loc: { section: 'Chronik 1848', para: '99' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q25',
        text: 'On October 30, 1848, imperial troops entered Vienna and suppressed a workers\' uprising, effectively ending the revolution everywhere in the empire except Hungary, where Kossuth\'s army had overcome Jelacic\'s forces.',
        lang: 'en',
        cite: {
          source: 'loc-hungary-country-study-1989',
          loc: { section: 'The Revolution of March 1848', para: '2' }
        },
        provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/hungary/21.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1849-02-09' },
            cites: [
              { source: 'britannica-1911-italy', loc: { section: 'ITALY', para: '1531' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q26',
        text: 'This meant a complete rupture; on the 5th of February 1849 a constituent assembly was summoned, and on the 9th it voted the downfall of the temporal […] power and proclaimed the republic.',
        lang: 'en',
        cite: { source: 'britannica-1911-italy', loc: { section: 'ITALY', para: '1531' } },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Italy'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1849-05-21' },
            cites: [
              { source: 'lemo-chronik-1849', loc: { section: 'Chronik 1849', para: '40' } },
              { source: 'lemo-chronik-1849', loc: { section: 'Chronik 1849', para: '39' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q27',
        text: 'Meanwhile the humiliating defeats of the imperial army and the course of events in Hungary had compelled the court of Vienna to accept the assistance which the emperor Nicholas I. of Russia had proffered in the loftiest spirit of the Holy Alliance.',
        lang: 'en',
        cite: { source: 'britannica-1911-hungary', loc: { section: 'HUNGARY', para: '534' } },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Hungary'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1849-07-23' },
            cites: [
              { source: 'lemo-chronik-1849', loc: { section: 'Chronik 1849', para: '59' } },
              { source: 'lemo-chronik-1849', loc: { section: 'Chronik 1849', para: '58' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q21',
        text: 'Mit der Kapitulation der badischen Revolutionäre in der Festung Rastatt nach dreiwöchiger Belagerung durch preußische Truppen unter Führung des „Kartätschenprinzen“ Wilhelm von Preußen fällt die letzte Bastion von Anhängern der Revolution in Deutschland.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1849', loc: { section: 'Chronik 1849', para: '59' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1849.html'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f4/Barrikadenkampf_Alexanderplatz_1848.jpg/1280px-Barrikadenkampf_Alexanderplatz_1848.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Barrikadenkampf_Alexanderplatz_1848.jpg',
    credit: { creator: 'A. Klaus' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'agulhon-1973-1848-ou-lapprentissage-de-la-republique', perspective: 'european' },
    { source: 'siemann-1985-die-deutsche-revolution-von-1848-49', perspective: 'european' }
  ]
})
