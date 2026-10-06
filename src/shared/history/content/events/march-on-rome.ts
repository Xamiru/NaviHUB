import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'march-on-rome',
  names: [
    { text: 'March on Rome', lang: 'en', role: 'primary' },
    { text: 'Marcia su Roma', lang: 'it', role: 'native' },
    { text: 'Marche sur Rome', lang: 'fr', role: 'alternative' }
  ],
  researched: '2026-10-06',
  type: 'coup',
  start: {
    alts: [
      {
        value: { d: '1922-10-27', notAfter: '1922-10-28' },
        cites: [
          { source: 'lemo-chronik-1922', loc: { section: 'Chronik 1922', para: '187' } }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:rome',
      cites: [
        { source: 'lemo-chronik-1922', loc: { section: 'Chronik 1922', para: '188' } }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:benito-mussolini',
      role: 'leader',
      cites: [
        { source: 'lemo-chronik-1922', loc: { section: 'Chronik 1922', para: '188' } }
      ]
    },
    {
      name: 'Viktor Emanuel III.',
      role: 'head-of-state',
      cites: [
        { source: 'lemo-chronik-1922', loc: { section: 'Chronik 1922', para: '188' } }
      ]
    },
    {
      name: 'Luigi Facta',
      role: 'head-of-government',
      cites: [
        { source: 'lemo-chronik-1922', loc: { section: 'Chronik 1922', para: '188' } }
      ]
    }
  ],
  related: [
    {
      ref: 'period:fascist-italy',
      rel: 'led-to',
      cites: [
        {
          source: 'ehne-toson-quest-ce-que-le-fascisme',
          loc: { section: 'Qu’est-ce que le fascisme ? Définition et histoire', para: '6' }
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
          text: 'Auf Befehl von Mussolini beginnen etwa 40.000 Faschisten den "Marsch auf Rom". Da sich König Viktor Emanuel III. weigert, den Ausnahmezustand zu verhängen und das Militär einzusetzen, tritt Ministerpräsident Facta zurück.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1922', loc: { section: 'Chronik 1922', para: '188' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1922.html'
          }
        },
        {
          id: 'q2',
          text: 'À la suite de la Marche sur Rome en 1922, démonstration paramilitaire destinée à faire pression sur le gouvernement libéral, l’enlèvement et l’assassinat par un groupe fasciste du député socialiste Giacomo Matteotti en 1924 accélèrent le virage dictatorial du PNF.',
          lang: 'fr',
          cite: {
            source: 'ehne-toson-quest-ce-que-le-fascisme',
            loc: { section: 'Qu’est-ce que le fascisme ? Définition et histoire', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/fr/encyclopedie/th%C3%A9matiques/l\'europe-politique/les-modeles-politiques-pour-faire-l\'europe/qu\'est-ce-que-le-fascisme-definition-et-histoire'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Le fascisme comme mouvement politique apparaît avec la constitution des Fasci di combattimento (« faisceaux de combat ») par Benito Mussolini sur la Piazza San Sepolcro, à Milan, en 1919.',
          lang: 'fr',
          cite: {
            source: 'ehne-toson-quest-ce-que-le-fascisme',
            loc: { section: 'Qu’est-ce que le fascisme ? Définition et histoire', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/fr/encyclopedie/th%C3%A9matiques/l\'europe-politique/les-modeles-politiques-pour-faire-l\'europe/qu\'est-ce-que-le-fascisme-definition-et-histoire'
          }
        },
        {
          id: 'q4',
          text: 'Les squadristes s’illustrent notamment lors du biennio rosso (1919-1920), période de mobilisations paysannes et ouvrières durant laquelle ils répriment ce qu’ils perçoivent comme une menace de subversion socialiste.',
          lang: 'fr',
          cite: {
            source: 'ehne-toson-quest-ce-que-le-fascisme',
            loc: { section: 'Qu’est-ce que le fascisme ? Définition et histoire', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/fr/encyclopedie/th%C3%A9matiques/l\'europe-politique/les-modeles-politiques-pour-faire-l\'europe/qu\'est-ce-que-le-fascisme-definition-et-histoire'
          }
        },
        {
          id: 'q5',
          text: 'En 1921, le Parti national fasciste (PNF), dirigé par Benito Mussolini, est officiellement créé.',
          lang: 'fr',
          cite: {
            source: 'ehne-toson-quest-ce-que-le-fascisme',
            loc: { section: 'Qu’est-ce que le fascisme ? Définition et histoire', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/fr/encyclopedie/th%C3%A9matiques/l\'europe-politique/les-modeles-politiques-pour-faire-l\'europe/qu\'est-ce-que-le-fascisme-definition-et-histoire'
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
            value: { d: '1922-10-30' },
            cites: [
              { source: 'lemo-chronik-1922', loc: { section: 'Chronik 1922', para: '189' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q6',
        text: 'König Viktor Emanuel III. betraut Mussolini mit dem Amt des Ministerpräsidenten und übergeht damit eigenmächtig das italienische Parlament.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1922', loc: { section: 'Chronik 1922', para: '190' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1922.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1924-06-10' },
            cites: [
              { source: 'lemo-chronik-1924', loc: { section: 'Chronik 1924', para: '114' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'In Italien wird der Generalsekretär der Sozialistischen Partei, Giacomo Matteotti (1885-1924), von Faschisten entführt und ermordet.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1924', loc: { section: 'Chronik 1924', para: '116' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1924.html'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/7d/Benito_Mussolini_marching_into_Rome.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Benito_Mussolini_marching_into_Rome.jpg',
    credit: { creator: 'Wide World Photos' },
    license: { id: 'public-domain' }
  },
  archive: [
    {
      id: 'inno-dei-fascisti-1922',
      mediaKind: 'audio',
      title: 'Inno dei Fascisti',
      url: 'https://archive.org/download/loc-jukebox-65186-inno-dei-fascisti/jukebox-65186_inno-dei-fascisti.mp3',
      page: 'https://archive.org/details/loc-jukebox-65186-inno-dei-fascisti',
      credit: {
        institution: 'Hessel Digital Library (Internet Archive)',
        creator: 'gasteldo, g. ; cibelli, alfredo ; manni, marcello ; shilkret, nathaniel ; cibelli, eugenio ; righi, vezio'
      },
      license: { id: 'public-domain' },
      bytes: 2934743,
      date: { d: '1922-12-18' },
      durationSec: 183
    },
    {
      id: 'mussolini-political-speeches-1923',
      mediaKind: 'document',
      title: 'Mussolini as revealed in his political speeches, (November 1914 - August 1923)',
      url: 'https://archive.org/download/mussoliniasrevea00mussuoft/mussoliniasrevea00mussuoft.pdf',
      page: 'https://archive.org/details/mussoliniasrevea00mussuoft',
      credit: {
        institution: 'Robarts - University of Toronto (Internet Archive)',
        creator: 'Mussolini, Benito, 1883-1945'
      },
      license: { id: 'public-domain' },
      bytes: 29434916,
      date: { d: '1923' }
    }
  ]
})
