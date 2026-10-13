import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'spanish-conquest-of-the-inca-empire',
  names: [
    { text: 'Spanish conquest of the Inca Empire', lang: 'en', role: 'primary' },
    {
      text: 'Conquest of Peru',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'britannica-1911-pizarro-francisco',
          loc: { section: 'Pizarro, Francisco', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-13',
  type: 'invasion',
  start: {
    alts: [
      {
        value: { d: '1532-11' },
        cites: [
          {
            source: 'loc-peru-country-study-1992',
            loc: { section: 'Pizarro and the Conquistadors', para: '4' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1572' },
        cites: [
          {
            source: 'loc-peru-country-study-1992',
            loc: { section: 'Consolidation of Control', para: '2' }
          }
        ]
      }
    ]
  },
  regions: ['latin-america'],
  prominence: 2,
  places: [
    {
      ref: 'place:cajamarca',
      cites: [
        {
          source: 'loc-peru-country-study-1992',
          loc: { section: 'Pizarro and the Conquistadors', para: '4' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:spanish-empire',
      cites: [
        {
          source: 'loc-peru-country-study-1992',
          loc: { section: 'Pizarro and the Conquistadors', para: '2' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'spanish',
      name: 'Spanish',
      polity: 'polity:spanish-empire',
      cites: [
        {
          source: 'loc-peru-country-study-1992',
          loc: { section: 'Pizarro and the Conquistadors', para: '2' }
        }
      ]
    },
    {
      key: 'inca',
      name: 'Inca',
      cites: [
        {
          source: 'loc-peru-country-study-1992',
          loc: { section: 'Pizarro and the Conquistadors', para: '4' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'Francisco Pizarro',
      role: 'leader',
      side: 'spanish',
      cites: [
        {
          source: 'loc-peru-country-study-1992',
          loc: { section: 'Pizarro and the Conquistadors', para: '2' }
        }
      ]
    },
    {
      name: 'Atahualpa',
      role: 'head-of-state',
      side: 'inca',
      cites: [
        {
          source: 'loc-peru-country-study-1992',
          loc: { section: 'Pizarro and the Conquistadors', para: '4' }
        }
      ]
    },
    {
      name: 'Manco Cápac II',
      role: 'leader',
      side: 'inca',
      cites: [
        {
          source: 'loc-peru-country-study-1992',
          loc: { section: 'Consolidation of Control', para: '2' }
        }
      ]
    },
    {
      name: 'Diego de Almagro',
      role: 'commander',
      side: 'spanish',
      cites: [
        {
          source: 'britannica-1911-pizarro-francisco',
          loc: { section: 'Pizarro, Francisco', para: '1' }
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
          text: 'Pizarro\'s overwhelming victory at Cajamarca in which he not only captured Atahualpa, but devastated the Inca\'s army, estimated at between 5,000 and 6,000 warriors, dealt a paralyzing and demoralizing blow to the empire, already weakened by civil war.',
          lang: 'en',
          cite: {
            source: 'loc-peru-country-study-1992',
            loc: { section: 'Pizarro and the Conquistadors', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/peru/4.htm' }
        },
        {
          id: 'q2',
          text: 'Having participated in the indigenous wars and slave raids on Hispañiola, Spain\'s first outpost in the New World, the tough, shrewd, and audacious Spaniard was with Vasco Nuñez de Balboa when he first glimpsed the Pacific Ocean in 1513 and was a leader in the conquest of Nicaragua (1522).',
          lang: 'en',
          cite: {
            source: 'loc-peru-country-study-1992',
            loc: { section: 'Pizarro and the Conquistadors', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/peru/4.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'While the Inca empire flourished, Spain was beginning to rise to prominence in the Western world.',
          lang: 'en',
          cite: {
            source: 'loc-peru-country-study-1992',
            loc: { section: 'Pizarro and the Conquistadors', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/peru/4.htm' }
        },
        {
          id: 'q4',
          text: 'Beginning in 1524, Pizarro proceeded to mount several expeditions, financed mainly from his own capital, from Panama south along the west coast of South America.',
          lang: 'en',
          cite: {
            source: 'loc-peru-country-study-1992',
            loc: { section: 'Pizarro and the Conquistadors', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/peru/4.htm' }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q5',
          text: '"To our Indian eyes," wrote Felipe Guamán Poma de Ayala, the author of Nueva crónica y buen gobierno (New Chronicle and Good Government), "the Spaniards looked as if they were shrouded like corpses. Their faces were covered with wool, leaving only the eyes visible, and the caps which they wore resembled little red pots on top of their heads."',
          lang: 'en',
          cite: {
            source: 'loc-peru-country-study-1992',
            loc: { section: 'Pizarro and the Conquistadors', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/peru/4.htm' }
        },
        {
          id: 'q6',
          text: '"The Spaniards began to fire their muskets and charged upon the Indians, killing them like ants. At the sound of the explosions and the jingle of bells on the horses\' harnesses, the shock of arms and the whole amazing novelty of their attackers\' appearance, the Indians were terrorstricken . They were desperate to escape from being trampled by the horses, and in their headlong flight a lot of them were crushed to death."',
          lang: 'en',
          cite: {
            source: 'loc-peru-country-study-1992',
            loc: { section: 'Pizarro and the Conquistadors', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/peru/4.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q7',
          text: 'Further consolidation of Spanish power in Peru, however, was slowed during the next few years by both indigenous resistance and internal divisions among the victorious Spaniards.',
          lang: 'en',
          cite: {
            source: 'loc-peru-country-study-1992',
            loc: { section: 'Consolidation of Control', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/peru/5.htm' }
        },
        {
          id: 'q8',
          text: 'The continuing violent and rapacious behavior of many Spaniards, however, as well as the harsh overall effects of the new colonial order, caused many to alter this assessment.',
          lang: 'en',
          cite: {
            source: 'loc-peru-country-study-1992',
            loc: { section: 'Consolidation of Control', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/peru/5.htm' }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q9',
          text: 'Native American resistance took another form during the 1560s with the millenarian religious revival in Huamanga known as Taki Onqoy (literally "dancing sickness"), which preached the total rejection of Spanish religion and customs.',
          lang: 'en',
          cite: {
            source: 'loc-peru-country-study-1992',
            loc: { section: 'Consolidation of Control', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/peru/5.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1531' },
            cites: [
              {
                source: 'loc-peru-country-study-1992',
                loc: { section: 'Pizarro and the Conquistadors', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'After several failures, Pizarro arrived in northern Peru late in 1531 with a small force of about 180 men and 30 horses.',
        lang: 'en',
        cite: {
          source: 'loc-peru-country-study-1992',
          loc: { section: 'Pizarro and the Conquistadors', para: '3' }
        },
        provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/peru/4.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1532-11' },
            cites: [
              {
                source: 'loc-peru-country-study-1992',
                loc: { section: 'Pizarro and the Conquistadors', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'On November 15, 1532, Pizarro arrived in Cajamarca, the Inca\'s summer residence located in the Andean highlands of northern Peru, and insisted on an audience with Atahualpa.',
        lang: 'en',
        cite: {
          source: 'loc-peru-country-study-1992',
          loc: { section: 'Pizarro and the Conquistadors', para: '4' }
        },
        provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/peru/4.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1533-08' },
            cites: [
              { source: 'britannica-1911-peru', loc: { section: 'Peru', para: '198' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'The murder of the Inca Atahualpa was perpetrated on the 29th of August 1533, and on the 15th of November Pizarro entered Cuzco.',
        lang: 'en',
        cite: { source: 'britannica-1911-peru', loc: { section: 'Peru', para: '198' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Peru'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1533-11' },
            cites: [
              {
                source: 'loc-peru-country-study-1992',
                loc: { section: 'Consolidation of Control', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'Then on November 15, 1533, exactly a year after arriving at Cajamarca, Pizarro, reinforced with an army of 5,000 native American auxiliaries, captured the imperial city and placed Manco Cápac II, kin of Huáscar and his faction, on the Inca throne as a Spanish puppet.',
        lang: 'en',
        cite: {
          source: 'loc-peru-country-study-1992',
          loc: { section: 'Consolidation of Control', para: '1' }
        },
        provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/peru/5.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1536' },
            cites: [
              {
                source: 'loc-peru-country-study-1992',
                loc: { section: 'Consolidation of Control', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'This change led Manco Cápac II to balk at his subservient role as a Spanish puppet and to rise in rebellion in 1536.',
        lang: 'en',
        cite: {
          source: 'loc-peru-country-study-1992',
          loc: { section: 'Consolidation of Control', para: '2' }
        },
        provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/peru/5.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1572' },
            cites: [
              {
                source: 'loc-peru-country-study-1992',
                loc: { section: 'Consolidation of Control', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'Ultimately unable to defeat the Spaniards, Manco retreated to Vilcabamba in the remote Andean interior where he established an independent Inca kingdom, replete with a miniature royal court, that held out until 1572.',
        lang: 'en',
        cite: {
          source: 'loc-peru-country-study-1992',
          loc: { section: 'Consolidation of Control', para: '2' }
        },
        provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/peru/5.htm' }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/f/f4/Atawallpa_Pizarro_tinkuy.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Atawallpa_Pizarro_tinkuy.jpg',
    credit: { creator: 'Felipe Huaman Puma de Ayala' },
    license: { id: 'public-domain' }
  }
})
