import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'clavijos-embassy-to-samarkand',
  names: [
    { text: 'Clavijo’s embassy to Samarkand', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-16',
  type: 'expedition',
  start: {
    alts: [
      {
        value: { d: '1403-05-22' },
        cites: [
          {
            source: 'iranica-manz-dunaway-clavijo',
            loc: { section: 'CLAVIJO, RUY GONZÁLEZ DE', para: '4' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1406-03-24' },
        cites: [
          {
            source: 'iranica-manz-dunaway-clavijo',
            loc: { section: 'CLAVIJO, RUY GONZÁLEZ DE', para: '5' }
          }
        ]
      }
    ]
  },
  regions: ['russia-central-asia', 'europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:samarkand',
      cites: [
        {
          source: 'iranica-manz-dunaway-clavijo',
          loc: { section: 'CLAVIJO, RUY GONZÁLEZ DE', para: '4' }
        }
      ]
    },
    {
      ref: 'place:istanbul',
      cites: [
        {
          source: 'iranica-manz-dunaway-clavijo',
          loc: { section: 'CLAVIJO, RUY GONZÁLEZ DE', para: '4' }
        }
      ]
    },
    {
      ref: 'place:tabriz',
      cites: [
        {
          source: 'iranica-manz-dunaway-clavijo',
          loc: { section: 'CLAVIJO, RUY GONZÁLEZ DE', para: '5' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:timurid-empire',
      cites: [
        {
          source: 'iranica-manz-dunaway-clavijo',
          loc: { section: 'CLAVIJO, RUY GONZÁLEZ DE', para: '1' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:ruy-gonzalez-de-clavijo',
      role: 'diplomat',
      cites: [
        {
          source: 'iranica-manz-dunaway-clavijo',
          loc: { section: 'CLAVIJO, RUY GONZÁLEZ DE', para: '1' }
        }
      ]
    },
    {
      ref: 'person:timur',
      role: 'head-of-state',
      cites: [
        {
          source: 'iranica-manz-dunaway-clavijo',
          loc: { section: 'CLAVIJO, RUY GONZÁLEZ DE', para: '1' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:battle-of-ankara', rel: 'preceded-by' },
    { ref: 'event:death-of-timur', rel: 'followed-by' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'CLAVIJO, RUY GONZÁLEZ DE (d. 2 April 1412), ambassador from King Henry III of Castile and Leon (r. 1390-1406) to Tīmūr (Tamerlane; 771-807/1370-1405) in the years 805-08/1403-06 and author of an important travel account.',
          lang: 'en',
          cite: {
            source: 'iranica-manz-dunaway-clavijo',
            loc: { section: 'CLAVIJO, RUY GONZÁLEZ DE', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/clavijo'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Tīmūr, seeking to make common cause with European rulers against the Ottoman sultan Bayazid, also exchanged emissaries with the Paleologan rulers of Constantinople, Henry IV of England, the Venetians, the Genoese of Galata, the emperor of Trebizond, Charles VI of France, and Martin I of Aragon and Catalonia',
          lang: 'en',
          cite: {
            source: 'iranica-manz-dunaway-clavijo',
            loc: { section: 'CLAVIJO, RUY GONZÁLEZ DE', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/clavijo'
          }
        },
        {
          id: 'q4',
          text: 'At Easter in 1402 Henry III sent two envoys, Payo Gómez de Sotomayor and Hernán Sánchez de Palazuelos.',
          lang: 'en',
          cite: {
            source: 'iranica-manz-dunaway-clavijo',
            loc: { section: 'CLAVIJO, RUY GONZÁLEZ DE', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/clavijo'
          }
        },
        {
          id: 'q5',
          text: 'Henry responded by sending a second embassy, which included Clavijo; Friar Alonso Páez de Santa María, a teacher of theology; the royal guard Gómez de Salazar; Alfonso Fernández de Mesa; and others',
          lang: 'en',
          cite: {
            source: 'iranica-manz-dunaway-clavijo',
            loc: { section: 'CLAVIJO, RUY GONZÁLEZ DE', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/clavijo'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q9',
          text: 'The ambassadors returned via Bukhara to Qarābāḡ, in order to pay their respects to Tīmūr’s grandson ʿOmar Mīrzā.',
          lang: 'en',
          cite: {
            source: 'iranica-manz-dunaway-clavijo',
            loc: { section: 'CLAVIJO, RUY GONZÁLEZ DE', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/clavijo'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q11',
          text: 'The general accuracy of his account is confirmed by outside evidence, and his work is used as a source for the history of Timurid art',
          lang: 'en',
          cite: {
            source: 'iranica-manz-dunaway-clavijo',
            loc: { section: 'CLAVIJO, RUY GONZÁLEZ DE', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/clavijo'
          }
        },
        {
          id: 'q12',
          text: 'It contains a report of Tīmūr’s qūrīltāy, with particularly valuable descriptions of the physical layout, food, dress, and ceremonial connected with the feasts.',
          lang: 'en',
          cite: {
            source: 'iranica-manz-dunaway-clavijo',
            loc: { section: 'CLAVIJO, RUY GONZÁLEZ DE', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/clavijo'
          }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q14',
          text: 'Timour Beg was seated in a portal, in front of the entrance of a beautiful palace ; and he was sitting on the ground. Before him there was a fountain, which threw up the water very high, and in it there were some red apples. The lord was seated cross-legged, on silken embroidered carpets, amongst round pillows.',
          lang: 'en',
          cite: {
            source: 'clavijo-1859-narrative-of-the-embassy',
            loc: { page: '132', section: 'Narrative of the Embassy' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://archive.org/stream/narrativeembass00markgoog/narrativeembass00markgoog_djvu.txt'
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
            value: { d: '1403-05-22' },
            cites: [
              {
                source: 'iranica-manz-dunaway-clavijo',
                loc: { section: 'CLAVIJO, RUY GONZÁLEZ DE', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'The embassy set out from the port of Santa Maria near Cádiz on 22 May 1403, hoping to join Tīmūr in Georgia.',
        lang: 'en',
        cite: {
          source: 'iranica-manz-dunaway-clavijo',
          loc: { section: 'CLAVIJO, RUY GONZÁLEZ DE', para: '4' }
        },
        provenance: { via: 'web', at: '2026-10-16', url: 'https://www.iranicaonline.org/articles/clavijo' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1403-10-24' },
            cites: [
              {
                source: 'iranica-manz-dunaway-clavijo',
                loc: { section: 'CLAVIJO, RUY GONZÁLEZ DE', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q17',
        text: 'On 24 October the Spaniards arrived in Constantinople, where they were well received by Emperor Manuel.',
        lang: 'en',
        cite: {
          source: 'iranica-manz-dunaway-clavijo',
          loc: { section: 'CLAVIJO, RUY GONZÁLEZ DE', para: '4' }
        },
        provenance: { via: 'web', at: '2026-10-16', url: 'https://www.iranicaonline.org/articles/clavijo' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1404-09-04' },
            cites: [
              {
                source: 'iranica-manz-dunaway-clavijo',
                loc: { section: 'CLAVIJO, RUY GONZÁLEZ DE', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q18',
        text: 'As Tīmūr had by then left Georgia, the emissaries followed him to Samarqand via Erzincan (Arzenjān), Erzurum, Ḵᵛoy, Tabrīz, Solṭānīya, Ray/Tehran, Besṭām, Nīšāpūr, Ṭūs/Mašhad, Andḵūy, Balḵ, Termeḏ, and Keš. They rarely stopped for more than one or two nights and were everywhere provisioned, guided, and sent on without delay by Tīmūr’s officials. They arrived on the outskirts of Samarqand on 27 Ṣafar 804/4 September 1404 and on 2 Rabīʿ I/8 September presented their letters',
        lang: 'en',
        cite: {
          source: 'iranica-manz-dunaway-clavijo',
          loc: { section: 'CLAVIJO, RUY GONZÁLEZ DE', para: '4' }
        },
        provenance: { via: 'web', at: '2026-10-16', url: 'https://www.iranicaonline.org/articles/clavijo' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1404-11-21' },
            cites: [
              {
                source: 'iranica-manz-dunaway-clavijo',
                loc: { section: 'CLAVIJO, RUY GONZÁLEZ DE', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q19',
        text: 'According to Clavijo, the embassy’s departure was delayed because Tīmūr was suffering from an illness. Then, on 14 Jomādā I/18 November, his officials announced that the Spaniards were to leave immediately, without a final audience; the Persian sources, on the other hand, suggest that Tīmūr received and dispatched them. They departed on 17 Jomādā I/21 November, six days before Tīmūr’s departure for China',
        lang: 'en',
        cite: {
          source: 'iranica-manz-dunaway-clavijo',
          loc: { section: 'CLAVIJO, RUY GONZÁLEZ DE', para: '4' }
        },
        provenance: { via: 'web', at: '2026-10-16', url: 'https://www.iranicaonline.org/articles/clavijo' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1405-08-22' },
            cites: [
              {
                source: 'iranica-manz-dunaway-clavijo',
                loc: { section: 'CLAVIJO, RUY GONZÁLEZ DE', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q20',
        text: 'On 25 Ṣafar 808/22 August 1405 the Spaniards departed from Tabrīz, arriving in Trebizond on 17 September and in Constantinople on 22 October; they embarked for Genoa on 4 November and reached Henry’s court on 24 March 1406',
        lang: 'en',
        cite: {
          source: 'iranica-manz-dunaway-clavijo',
          loc: { section: 'CLAVIJO, RUY GONZÁLEZ DE', para: '5' }
        },
        provenance: { via: 'web', at: '2026-10-16', url: 'https://www.iranicaonline.org/articles/clavijo' }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Historia_del_gran_Tamorl%C3%A1n.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Historia_del_gran_Tamorl%C3%A1n.jpg',
    credit: { institution: 'Biblioteca Nacional de España', creator: 'Andrea Pescioni' },
    license: { id: 'public-domain' }
  }
})
