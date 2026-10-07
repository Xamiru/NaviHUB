import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'herero-and-nama-genocide',
  names: [
    { text: 'Herero and Nama genocide', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-07',
  type: 'genocide',
  start: {
    alts: [
      {
        value: { d: '1904-01' },
        cites: [
          {
            source: 'ehne-patin-herero-and-nama',
            loc: { section: 'The first genocide of the twentieth century', para: '12' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1908' },
        cites: [
          {
            source: 'german-foreign-office-namibia-2021',
            loc: {
              section: 'Foreign Minister Maas on the conclusion of negotiations with Namibia',
              para: '4'
            }
          }
        ]
      }
    ]
  },
  regions: ['subsaharan-africa', 'europe'],
  prominence: 1,
  participants: [
    {
      name: 'Lothar von Trotha',
      role: 'perpetrator',
      cites: [
        {
          source: 'ehne-patin-herero-and-nama',
          loc: { section: 'The first genocide of the twentieth century', para: '13' }
        }
      ]
    },
    {
      name: 'Samuel Maharero',
      role: 'leader',
      cites: [
        {
          source: 'ehne-patin-herero-and-nama',
          loc: { section: 'The German Reich’s first colony', para: '9' }
        }
      ]
    },
    {
      name: 'Hendrik Witbooi',
      role: 'leader',
      cites: [
        {
          source: 'ehne-patin-herero-and-nama',
          loc: { section: 'The first genocide of the twentieth century', para: '15' }
        }
      ]
    },
    {
      name: 'Matthias Erzberger',
      role: 'participant',
      cites: [
        {
          source: 'ehne-patin-herero-and-nama',
          loc: { section: 'The first genocide of the twentieth century', para: '16' }
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
          text: 'The creation of the German Reich’s first colony, in southwestern Africa, unfolded to the detriment of indigenous peoples, especially the Herero and Nama. Beginning in 1904, the Germans responded to their demands with extremely violent military repression, which ended with the willful destruction of these populations.',
          lang: 'en',
          cite: {
            source: 'ehne-patin-herero-and-nama',
            loc: {
              section: 'The massacre of the Herero and Nama: A colonial laboratory for genocide?',
              para: '1'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/en/encyclopedia/themes/europe-europeans-and-world/europe-and-colonial-wars/massacre-herero-and-nama-a-colonial-laboratory-genocide'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'This land was of course in no way virgin territory. A number of peoples lived there, especially the Herero—whose language belongs to the Bantu language family—and the Nama, who speak a Khoisan language, to the south.',
          lang: 'en',
          cite: {
            source: 'ehne-patin-herero-and-nama',
            loc: { section: 'The German Reich’s first colony', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/en/encyclopedia/themes/europe-europeans-and-world/europe-and-colonial-wars/massacre-herero-and-nama-a-colonial-laboratory-genocide'
          }
        },
        {
          id: 'q3',
          text: 'Ten years later, facing the arrival of growing numbers of Germans, Samuel Maharero—considered the Chief of the Herero—reaffirmed his people’s rights, and protested against the sale of plots of land or minerals.',
          lang: 'en',
          cite: {
            source: 'ehne-patin-herero-and-nama',
            loc: { section: 'The German Reich’s first colony', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/en/encyclopedia/themes/europe-europeans-and-world/europe-and-colonial-wars/massacre-herero-and-nama-a-colonial-laboratory-genocide'
          }
        },
        {
          id: 'q4',
          text: 'In addition, a cattle plague killed over 80% of Herero herds in 1897, a catastrophe that forced many shepherds to work as day laborers on German farms.',
          lang: 'en',
          cite: {
            source: 'ehne-patin-herero-and-nama',
            loc: { section: 'The German Reich’s first colony', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/en/encyclopedia/themes/europe-europeans-and-world/europe-and-colonial-wars/massacre-herero-and-nama-a-colonial-laboratory-genocide'
          }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q5',
          text: 'It is estimated that 80% of the Herero and 50% of the Nama were killed by the Germans.',
          lang: 'en',
          cite: {
            source: 'ehne-patin-herero-and-nama',
            loc: { section: 'The first genocide of the twentieth century', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/en/encyclopedia/themes/europe-europeans-and-world/europe-and-colonial-wars/massacre-herero-and-nama-a-colonial-laboratory-genocide'
          }
        },
        {
          id: 'q6',
          text: 'These camps, especially those of Swakopmund and Shark Island, had an unequalled mortality rate: of the 4,000 men and 10,000 women and children detained there, nearly 7,862 died between 1904 and 1907, or more than 50%.',
          lang: 'en',
          cite: {
            source: 'ehne-patin-herero-and-nama',
            loc: { section: 'A German “special path”?', para: '20' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/en/encyclopedia/themes/europe-europeans-and-world/europe-and-colonial-wars/massacre-herero-and-nama-a-colonial-laboratory-genocide'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q7',
          text: 'In the metropole, the colonial war led to a political crisis, as members of the SPD [Social Democratic Party] and the Catholic party refused to fund this colonial war.',
          lang: 'en',
          cite: {
            source: 'ehne-patin-herero-and-nama',
            loc: { section: 'The first genocide of the twentieth century', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/en/encyclopedia/themes/europe-europeans-and-world/europe-and-colonial-wars/massacre-herero-and-nama-a-colonial-laboratory-genocide'
          }
        },
        {
          id: 'q8',
          text: 'The Reichstag was dissolved; the new election was named the “Hottentot Election” after the erroneous designation of the Nama as such.',
          lang: 'en',
          cite: {
            source: 'ehne-patin-herero-and-nama',
            loc: { section: 'The first genocide of the twentieth century', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/en/encyclopedia/themes/europe-europeans-and-world/europe-and-colonial-wars/massacre-herero-and-nama-a-colonial-laboratory-genocide'
          }
        }
      ]
    },
    {
      kind: 'memory',
      quotes: [
        {
          id: 'q9',
          text: 'This includes being unreserved and unflinching in naming the events of the German colonial period in what is now Namibia and in particular the atrocities between 1904 and 1908.',
          lang: 'en',
          cite: {
            source: 'german-foreign-office-namibia-2021',
            loc: {
              section: 'Foreign Minister Maas on the conclusion of negotiations with Namibia',
              para: '4'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.auswaertiges-amt.de/en/newsroom/news/-/2463598'
          }
        },
        {
          id: 'q10',
          text: 'Given Germany’s historical and moral responsibility, we will ask Namibia and the descendants of the victims for forgiveness.',
          lang: 'en',
          cite: {
            source: 'german-foreign-office-namibia-2021',
            loc: {
              section: 'Foreign Minister Maas on the conclusion of negotiations with Namibia',
              para: '5'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.auswaertiges-amt.de/en/newsroom/news/-/2463598'
          }
        },
        {
          id: 'q11',
          text: 'As a gesture of recognition of the immeasurable suffering inflicted on the victims, we want to support Namibia and the victims’ descendants with a substantial programme to the tune of 1.1 billion euro for reconstruction and development. The communities affected by the genocide will play a key role in shaping and implementing this programme. Legal claims for compensation cannot be derived from it.',
          lang: 'en',
          cite: {
            source: 'german-foreign-office-namibia-2021',
            loc: {
              section: 'Foreign Minister Maas on the conclusion of negotiations with Namibia',
              para: '6'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.auswaertiges-amt.de/en/newsroom/news/-/2463598'
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
            value: { d: '1904-01' },
            cites: [
              {
                source: 'ehne-patin-herero-and-nama',
                loc: { section: 'The first genocide of the twentieth century', para: '12' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'The colony, which now bore the name of German South West Africa (Deutsche Südwestafrika), saw the beginning of open conflict in January 1904 with the armed uprising of the Herero.',
        lang: 'en',
        cite: {
          source: 'ehne-patin-herero-and-nama',
          loc: { section: 'The first genocide of the twentieth century', para: '12' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://ehne.fr/en/encyclopedia/themes/europe-europeans-and-world/europe-and-colonial-wars/massacre-herero-and-nama-a-colonial-laboratory-genocide'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1904-08-11' },
            cites: [
              {
                source: 'ehne-patin-herero-and-nama',
                loc: { section: 'The first genocide of the twentieth century', para: '13' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'The battle of Waterberg on August 11, 1904 was decisive. The Germans surrounded the Herero. Blocked on the Omaheke steppe, the Herero—including women and children—died of thirst.',
        lang: 'en',
        cite: {
          source: 'ehne-patin-herero-and-nama',
          loc: { section: 'The first genocide of the twentieth century', para: '13' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://ehne.fr/en/encyclopedia/themes/europe-europeans-and-world/europe-and-colonial-wars/massacre-herero-and-nama-a-colonial-laboratory-genocide'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1904-10-02' },
            cites: [
              {
                source: 'ehne-patin-herero-and-nama',
                loc: { section: 'The first genocide of the twentieth century', para: '14' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'On October 2, 1904, von Trotha issued an order, which was later referred to as an “extermination order”: “The Herero people [...] must leave the land. If the populace does not do this I will force them with the Groot Rohr [cannon]. Within the German borders every Herero, with or without a gun, with or without cattle, will be shot. I will no longer accept women and children, I will drive them back to their people or I will let them be shot at”. Von Trotha did not hesitate to poison wells.',
        lang: 'en',
        cite: {
          source: 'ehne-patin-herero-and-nama',
          loc: { section: 'The first genocide of the twentieth century', para: '14' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://ehne.fr/en/encyclopedia/themes/europe-europeans-and-world/europe-and-colonial-wars/massacre-herero-and-nama-a-colonial-laboratory-genocide'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1906-11-30' },
            cites: [
              {
                source: 'ehne-patin-herero-and-nama',
                loc: { section: 'The first genocide of the twentieth century', para: '16' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'However, the arguments of the Reichstag member Matthias Erzberger on November 30, 1906 underscored that the mission of a true Christian people is to protect indigenous peoples.',
        lang: 'en',
        cite: {
          source: 'ehne-patin-herero-and-nama',
          loc: { section: 'The first genocide of the twentieth century', para: '16' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://ehne.fr/en/encyclopedia/themes/europe-europeans-and-world/europe-and-colonial-wars/massacre-herero-and-nama-a-colonial-laboratory-genocide'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8b/Nama_und_Damara_pg172_Johannes_Samuel_Maharero_Oberh%C3%A4uptling_der_Herero.jpg/1280px-Nama_und_Damara_pg172_Johannes_Samuel_Maharero_Oberh%C3%A4uptling_der_Herero.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Nama_und_Damara_pg172_Johannes_Samuel_Maharero_Oberh%C3%A4uptling_der_Herero.jpg',
    credit: { institution: 'British Library' },
    license: { id: 'public-domain' }
  }
})
