import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'council-of-trent',
  names: [
    { text: 'Council of Trent', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-13',
  type: 'conference',
  start: {
    alts: [
      {
        value: { d: '1545-12-13' },
        cites: [
          {
            source: 'catholic-encyclopedia-council-of-trent',
            loc: { section: 'Council of Trent', para: '1' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1563-12-04' },
        cites: [
          {
            source: 'catholic-encyclopedia-council-of-trent',
            loc: { section: 'Council of Trent', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:trent',
      cites: [
        {
          source: 'catholic-encyclopedia-council-of-trent',
          loc: { section: 'Council of Trent', para: '1' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'Pope Paul III',
      role: 'head-of-state',
      cites: [
        {
          source: 'britannica-1911-trent-council-of',
          loc: { section: 'Trent, Council of', para: '1' }
        }
      ]
    },
    {
      name: 'Pope Pius IV',
      role: 'head-of-state',
      cites: [
        {
          source: 'britannica-1911-trent-council-of',
          loc: { section: 'Trent, Council of', para: '5' }
        }
      ]
    },
    {
      ref: 'person:charles-v',
      role: 'head-of-state',
      cites: [
        {
          source: 'britannica-1911-trent-council-of',
          loc: { section: 'Trent, Council of', para: '1' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:reformation',
      rel: 'response-to',
      cites: [
        {
          source: 'catholic-encyclopedia-council-of-trent',
          loc: { section: 'Council of Trent', para: '1' }
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
          text: 'The nineteenth ecumenical council opened at Trent on 13 December, 1545, and closed there on 4 December, 1563.',
          lang: 'en',
          cite: {
            source: 'catholic-encyclopedia-council-of-trent',
            loc: { section: 'Council of Trent', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'https://www.newadvent.org/cathen/15030c.htm' }
        },
        {
          id: 'q2',
          text: 'The Council of Trent (1545–1563) has a long antecedent history of great significance for the fortunes of the Catholic Church.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-trent-council-of',
            loc: { section: 'Trent, Council of', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Trent,_Council_of'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'On 28 November, 1518, Luther had appealed from the pope to a general council because he was convinced that he would be condemned at Rome for his heretical doctrines.',
          lang: 'en',
          cite: {
            source: 'catholic-encyclopedia-council-of-trent',
            loc: { section: 'Council of Trent', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'https://www.newadvent.org/cathen/15030c.htm' }
        },
        {
          id: 'q4',
          text: 'The emperor indeed-though, as a statesman, he had found himself in frequent opposition to the papal policy of his day-had never entertained the slightest doubt as to the truth of Catholic doctrine, and had rendered inestimable services to the Church in the perilous years which followed the emergence of Protestantism.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-trent-council-of',
            loc: { section: 'Trent, Council of', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Trent,_Council_of'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'The decrees were confirmed on 26 Jan., 1564, by Pius IV in the Bull "Benedictus Deus," and were accepted by Catholic countries, by some with reservations.',
          lang: 'en',
          cite: {
            source: 'catholic-encyclopedia-council-of-trent',
            loc: { section: 'Council of Trent', para: '26' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'https://www.newadvent.org/cathen/15030c.htm' }
        },
        {
          id: 'q6',
          text: 'From the discussions of the council it is evident that pronounced differences of opinion existed within it even on most important subjects, and that these differences were not reconciled.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-trent-council-of',
            loc: { section: 'Trent, Council of', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Trent,_Council_of'
          }
        },
        {
          id: 'q7',
          text: 'The reformatory enactments touch on numerous phases of ecclesiastical life—administration, discipline, appointment to spiritual offices, the marriage law (decretum de reformatione matrimonii “Tametsif,” sessio xxiv.), the duties of the clergy, and so forth.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-trent-council-of',
            loc: { section: 'Trent, Council of', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Trent,_Council_of'
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
            value: { d: '1545-12-13' },
            cites: [
              {
                source: 'catholic-encyclopedia-council-of-trent',
                loc: { section: 'Council of Trent', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'The pope, however, alarmed by the threat of a colloquy in Germany, recognized the inadvisability of his dilatory tactics, and at last ordered the synod to be opened (December 13, 1545).',
        lang: 'en',
        cite: {
          source: 'britannica-1911-trent-council-of',
          loc: { section: 'Trent, Council of', para: '2' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Trent,_Council_of'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1546-04-08' },
            cites: [
              {
                source: 'britannica-1911-trent-council-of',
                loc: { section: 'Trent, Council of', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'On the 8th of April 1546 the doctrine of the Holy Scriptures and tradition (sessio iv.) was proclaimed; on the 17th of June 1546, the doctrine of original sin (sessio v.); on the 13th of January 1547, the doctrine of justification (sessio vi.); and on the 3rd of March 1547, the decree concerning the sacraments in general, and baptism and confirmation in particular (sessio vii.).',
        lang: 'en',
        cite: {
          source: 'britannica-1911-trent-council-of',
          loc: { section: 'Trent, Council of', para: '3' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Trent,_Council_of'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1551' },
            cites: [
              {
                source: 'britannica-1911-trent-council-of',
                loc: { section: 'Trent, Council of', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'Pope Julius III., the former legate Del Monte, could not elude the necessity of convening the council again, and, though personally he took no greater interest in the scheme than his predecessor in office, caused it to resume its labours on the 1st of May 1551 (sessio xi.), under the presidency of the legate, Cardinal Crescentio.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-trent-council-of',
          loc: { section: 'Trent, Council of', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Trent,_Council_of'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1562-01-18' },
            cites: [
              {
                source: 'britannica-1911-trent-council-of',
                loc: { section: 'Trent, Council of', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'On the 29th of November 1560 he announced the convocation of the council; and on the 18th of January 1562 it was actually reopened (sessio xvii.).',
        lang: 'en',
        cite: {
          source: 'britannica-1911-trent-council-of',
          loc: { section: 'Trent, Council of', para: '5' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Trent,_Council_of'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1563-12-04' },
            cites: [
              {
                source: 'catholic-encyclopedia-council-of-trent',
                loc: { section: 'Council of Trent', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'On 4 December the following were promulgated: a dogmatic decree on indulgences; a decree on fasts and feast days; a further decree on the preparation by the pope of editions of the Missal, the Breviary, and a catechism, and of a list of forbidden books.',
        lang: 'en',
        cite: {
          source: 'catholic-encyclopedia-council-of-trent',
          loc: { section: 'Council of Trent', para: '26' }
        },
        provenance: { via: 'web', at: '2026-10-13', url: 'https://www.newadvent.org/cathen/15030c.htm' }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/5d/Alessandro_Farnese_%281468-1549%29%2C_Pope_Paul_III_%281534-1549%29_by_Scipione_Pulzone_after_Titian.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Alessandro_Farnese_(1468-1549),_Pope_Paul_III_(1534-1549)_by_Scipione_Pulzone_after_Titian.jpg',
    credit: { creator: 'Scipione Pulzone, after Titian' },
    license: { id: 'public-domain' }
  }
})
