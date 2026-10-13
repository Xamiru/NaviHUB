import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'treaty-of-ganja-1735',
  names: [
    { text: 'Treaty of Ganja', lang: 'en', role: 'primary' },
    {
      text: 'Russo-Persian alliance of 1735',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '11' } }
      ]
    }
  ],
  researched: '2026-10-13',
  type: 'treaty',
  start: {
    alts: [
      {
        value: { d: '1735-03' },
        cites: [
          { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '11' } }
        ]
      }
    ]
  },
  regions: ['iran', 'russia-central-asia'],
  prominence: 3,
  places: [
    {
      ref: 'place:ganja',
      cites: [
        { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '11' } }
      ]
    }
  ],
  sides: [
    {
      key: 'russia',
      name: 'Russia',
      polity: 'polity:russian-empire',
      cites: [
        { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '11' } }
      ]
    },
    {
      key: 'persia',
      name: 'Persia',
      polity: 'polity:safavid-iran',
      cites: [
        { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '11' } }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:nader-shah',
      role: 'signatory',
      side: 'persia',
      cites: [
        { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '11' } }
      ]
    }
  ],
  related: [
    {
      ref: 'event:russo-persian-war-1722-1723',
      rel: 'followed-by',
      cites: [
        {
          source: 'iranica-andreeva-russia-relations',
          loc: {
            section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
            para: '8'
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
          id: 'q1',
          text: 'Russia and Persia then signed a defensive alliance in March 1735 at Ganja.',
          lang: 'en',
          cite: { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '11' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/nader-shah'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'Ṭahmāsb took Nāder’s absence in Khorasan as his own chance to attack the Ottomans and pursued a disastrous campaign (January 1731–January 1732), in which the Ottomans actually reoccupied much of the territory recently lost to Nāder.',
          lang: 'en',
          cite: { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '8' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/nader-shah'
          }
        },
        {
          id: 'q3',
          text: 'Now regent, Nāder resumed hostilities against the Ottomans.',
          lang: 'en',
          cite: { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '9' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/nader-shah'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q4',
          text: 'By the end of 1735, Nāder felt that he had gained enough prestige through a series of victories and had secured the immediate military situation well enough to assume the throne himself.',
          lang: 'en',
          cite: { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '12' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/nader-shah'
          }
        },
        {
          id: 'q5',
          text: 'Thereafter, relations between Iran and Russia remained limited until the late 18th century, when Catherine the Great (r. 1762-96) resumed expansionist policies.',
          lang: 'en',
          cite: {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '8'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
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
            value: { d: '1732' },
            cites: [
              {
                source: 'iranica-andreeva-russia-relations',
                loc: {
                  section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
                  para: '8'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q6',
        text: 'Three weeks later, Russia and Persia signed the Treaty of Rašt',
        lang: 'en',
        cite: { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '8' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/nader-shah'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1735' },
            cites: [
              {
                source: 'iranica-tucker-nader-shah',
                loc: { section: 'NĀDER SHAH', para: '11' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'There followed another series of Ottoman-Persian battles in the Caucasus, and Nāder’s capture of Ganja, during the siege of which Russian engineers provided assistance.',
        lang: 'en',
        cite: { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '11' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/nader-shah'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1735' },
            cites: [
              {
                source: 'iranica-andreeva-russia-relations',
                loc: {
                  section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
                  para: '8'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'Peter the Great died in 1725, and Empress Anna (r. 1730-40) agreed in the treaties of Rasht (1732) and Ganja (1735) to withdraw Russian forces from all Iranian territories',
        lang: 'en',
        cite: {
          source: 'iranica-andreeva-russia-relations',
          loc: {
            section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
            para: '8'
          }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/61/Louis_Caravaque_-_%D0%9F%D0%BE%D1%80%D1%82%D1%80%D0%B5%D1%82_%D0%B8%D0%BC%D0%BF%D0%B5%D1%80%D0%B0%D1%82%D1%80%D0%B8%D1%86%D1%8B_%D0%90%D0%BD%D0%BD%D1%8B_%D0%98%D0%BE%D0%B0%D0%BD%D0%BD%D0%BE%D0%B2%D0%BD%D1%8B_-_Google_Art_Project.jpg/1280px-Louis_Caravaque_-_%D0%9F%D0%BE%D1%80%D1%82%D1%80%D0%B5%D1%82_%D0%B8%D0%BC%D0%BF%D0%B5%D1%80%D0%B0%D1%82%D1%80%D0%B8%D1%86%D1%8B_%D0%90%D0%BD%D0%BD%D1%8B_%D0%98%D0%BE%D0%B0%D0%BD%D0%BD%D0%BE%D0%B2%D0%BD%D1%8B_-_Google_Art_Project.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Louis_Caravaque_-_%D0%9F%D0%BE%D1%80%D1%82%D1%80%D0%B5%D1%82_%D0%B8%D0%BC%D0%BF%D0%B5%D1%80%D0%B0%D1%82%D1%80%D0%B8%D1%86%D1%8B_%D0%90%D0%BD%D0%BD%D1%8B_%D0%98%D0%BE%D0%B0%D0%BD%D0%BD%D0%BE%D0%B2%D0%BD%D1%8B_-_Google_Art_Project.jpg',
    credit: { creator: 'Louis Caravaque' },
    license: { id: 'public-domain' }
  }
})
