import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'march-on-rome',
  names: [
    { text: 'March on Rome', lang: 'en', role: 'primary' },
    { text: 'Marcia su Roma', lang: 'it', role: 'native' },
    { text: 'Marche sur Rome', lang: 'fr', role: 'alternative' }
  ],
  researched: '2026-10-08',
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
  polities: [
    { ref: 'polity:kingdom-of-italy' }
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
          id: 'q8',
          text: 'Italian Socialist Benito Mussolini envisioned war as the prerequisite for revolution. He helped push Italy into World War I. After combat service and medical discharge in 1917, he demanded war until victory. In 1919, he founded the Fascist movement. Using veterans to smash political opposition, he seized power in October 1922.',
          lang: 'en',
          cite: { source: 'eo1418-sullivan-mussolini-benito', loc: { section: 'Summary' } },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://encyclopedia.1914-1918-online.net/article/mussolini-benito/'
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
          id: 'q9',
          text: 'Mussolini inaugurated his Fascist movement on 23 March 1919 before an audience including veterans (some from the black-shirted assault troops, the Arditi), Futurists, ex-Socialists, Syndicalists and Interventionists.',
          lang: 'en',
          cite: {
            source: 'eo1418-sullivan-mussolini-benito',
            loc: { section: 'Neither Left nor Right', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://encyclopedia.1914-1918-online.net/article/mussolini-benito/'
          }
        },
        {
          id: 'q10',
          text: 'Seventeen months passed before the violence of the 1919-1920 biennio rosso (“The Two Red Years”) revived Mussolini’s movement. The army and police proved unequal to peasant and worker strikes and unrest.',
          lang: 'en',
          cite: {
            source: 'eo1418-sullivan-mussolini-benito',
            loc: { section: 'Arms and the Man', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://encyclopedia.1914-1918-online.net/article/mussolini-benito/'
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
              { source: 'lemo-chronik-1922', loc: { section: 'Chronik 1922', para: '189' } },
              {
                source: 'eo1418-sullivan-mussolini-benito',
                loc: { section: 'Arms and the Man', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'Coalescing around a core of ex-officers and NCOs, the Fasci multiplied, bringing government forces welcome reinforcement. Official toleration and Mussolini’s skills helped him lead such groups to power in October 1922.',
        lang: 'en',
        cite: {
          source: 'eo1418-sullivan-mussolini-benito',
          loc: { section: 'Arms and the Man', para: '1' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://encyclopedia.1914-1918-online.net/article/mussolini-benito/'
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
  ],
  furtherReading: [
    { source: 'de-felice-1966-mussolini-il-fascista', perspective: 'european' },
    { source: 'gentile-2012-e-fu-subito-regime', perspective: 'european' }
  ]
})
