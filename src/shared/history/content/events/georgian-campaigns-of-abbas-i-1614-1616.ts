import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'georgian-campaigns-of-abbas-i-1614-1616',
  names: [
    { text: 'Georgian campaigns of Abbas I', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-13',
  type: 'invasion',
  start: {
    alts: [
      {
        value: { d: '1614' },
        cites: [
          {
            source: 'iranica-hitchins-georgia-ii-iranian-georgian-relations',
            loc: { section: 'GEORGIA ii. History of Iranian-Georgian Relations', para: '11' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'russia-central-asia'],
  prominence: 3,
  places: [
    {
      ref: 'place:tbilisi',
      cites: [
        {
          source: 'iranica-hitchins-georgia-ii-iranian-georgian-relations',
          loc: { section: 'GEORGIA ii. History of Iranian-Georgian Relations', para: '12' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:safavid-iran',
      cites: [
        {
          source: 'iranica-hitchins-georgia-ii-iranian-georgian-relations',
          loc: { section: 'GEORGIA ii. History of Iranian-Georgian Relations', para: '11' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:abbas-i',
      role: 'leader',
      cites: [
        {
          source: 'iranica-hitchins-georgia-ii-iranian-georgian-relations',
          loc: { section: 'GEORGIA ii. History of Iranian-Georgian Relations', para: '11' }
        }
      ]
    },
    {
      name: 'Teimuraz',
      role: 'participant',
      cites: [
        {
          source: 'iranica-hitchins-georgia-ii-iranian-georgian-relations',
          loc: { section: 'GEORGIA ii. History of Iranian-Georgian Relations', para: '12' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'deaths',
      value: {
        alts: [
          {
            value: { min: 70000, qualifier: 'up-to' },
            cites: [
              {
                source: 'iranica-hitchins-georgia-ii-iranian-georgian-relations',
                loc: { section: 'GEORGIA ii. History of Iranian-Georgian Relations', para: '11' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Keith Hitchins', discipline: 'historian' }
            ]
          }
        ]
      }
    }
  ],
  related: [
    {
      ref: 'event:ottoman-safavid-war-1603-1618',
      rel: 'related',
      cites: [
        {
          source: 'iranica-hitchins-georgia-ii-iranian-georgian-relations',
          loc: { section: 'GEORGIA ii. History of Iranian-Georgian Relations', para: '10' }
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
          text: 'ʿAbbās’s measures in Kartli and Kakheti represented a continuation of his predecessors’ efforts to integrate eastern Georgia fully into the Safavid empire.',
          lang: 'en',
          cite: {
            source: 'iranica-hitchins-georgia-ii-iranian-georgian-relations',
            loc: { section: 'GEORGIA ii. History of Iranian-Georgian Relations', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/georgia-ii-history'
          }
        },
        {
          id: 'q2',
          text: 'In Georgia it established a rough balance between the two rivals, as Kartli, Kakheti, and eastern Samtskhe (Masq) fell into the Persian sphere of influence, and Imereti and western Samtskhe into the Ottoman.',
          lang: 'en',
          cite: {
            source: 'iranica-hitchins-georgia-ii-iranian-georgian-relations',
            loc: { section: 'GEORGIA ii. History of Iranian-Georgian Relations', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/georgia-ii-history'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Shah Ṭahmāsb used the opportunity to tighten Persian predominance in eastern Georgia by imposing Persian social and political institutions and by placing converts to Islam on the thrones of Kartli and Kakheti.',
          lang: 'en',
          cite: {
            source: 'iranica-hitchins-georgia-ii-iranian-georgian-relations',
            loc: { section: 'GEORGIA ii. History of Iranian-Georgian Relations', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/georgia-ii-history'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'When nobles of Kakheti rose in revolt in 1615, his troops ravaged the country, a punishment from which it never fully recovered',
          lang: 'en',
          cite: {
            source: 'iranica-hitchins-georgia-ii-iranian-georgian-relations',
            loc: { section: 'GEORGIA ii. History of Iranian-Georgian Relations', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/georgia-ii-history'
          }
        },
        {
          id: 'q6',
          text: 'He invited the exiled Teimuraz/Ṭahmūraṯ to return home and proclaimed him king of Kartli and Kakheti.',
          lang: 'en',
          cite: {
            source: 'iranica-hitchins-georgia-ii-iranian-georgian-relations',
            loc: { section: 'GEORGIA ii. History of Iranian-Georgian Relations', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/georgia-ii-history'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q7',
          text: 'Georgia, where Shah Ṭahmāsp engaged in a number of campaigns in the 1540s and 1550s, was never properly subjugated.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '20' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
          }
        },
        {
          id: 'q8',
          text: 'Intensifying the practice of appointing ḡolāms to high positions, he gave them a more prominent place in the ranks of the military where they served to counterbalance the Qezelbāš as members of a standing army answerable to the shah himself.',
          lang: 'en',
          cite: {
            source: 'iranica-matthee-safavid-dynasty',
            loc: { section: 'SAFAVID DYNASTY', para: '33' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/safavids'
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
            value: { d: '1602' },
            cites: [
              {
                source: 'iranica-hitchins-georgia-ii-iranian-georgian-relations',
                loc: { section: 'GEORGIA ii. History of Iranian-Georgian Relations', para: '10' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'When he resumed war with the Ottoman Empire in 1602 he forced Giorgi X of Kartli (1599-1605) and Aleksandre II of Kakheti (1574-1605) to join the campaign.',
        lang: 'en',
        cite: {
          source: 'iranica-hitchins-georgia-ii-iranian-georgian-relations',
          loc: { section: 'GEORGIA ii. History of Iranian-Georgian Relations', para: '10' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/georgia-ii-history'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1614' },
            cites: [
              {
                source: 'iranica-hitchins-georgia-ii-iranian-georgian-relations',
                loc: { section: 'GEORGIA ii. History of Iranian-Georgian Relations', para: '11' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'ʿAbbās undertook another campaign in 1614 against Kartli and Kakheti, replacing their kings with Muslims.',
        lang: 'en',
        cite: {
          source: 'iranica-hitchins-georgia-ii-iranian-georgian-relations',
          loc: { section: 'GEORGIA ii. History of Iranian-Georgian Relations', para: '11' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/georgia-ii-history'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b6/Gremi_%2835282856333%29.jpg/1280px-Gremi_%2835282856333%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Gremi_(35282856333).jpg',
    credit: { creator: 'Arian Zwegers' },
    license: { id: 'cc-by', version: '2.0', url: 'https://creativecommons.org/licenses/by/2.0' }
  }
})
