import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'fascism-interpretations',
  about: ['event:march-on-rome', 'period:fascist-italy'],
  topic: 'nature',
  researched: '2026-10-08',
  framing: {
    id: 'q1',
    text: 'Dès son apparition, les interprétations des contemporains se multiplient sur les origines du fascisme.',
    lang: 'fr',
    cite: {
      source: 'ehne-toson-quest-ce-que-le-fascisme',
      loc: { section: 'Qu’est-ce que le fascisme ? Définition et histoire', para: '11' }
    },
    provenance: {
      via: 'web',
      at: '2026-10-06',
      url: 'https://ehne.fr/fr/encyclopedie/th%C3%A9matiques/l\'europe-politique/les-modeles-politiques-pour-faire-l\'europe/qu\'est-ce-que-le-fascisme-definition-et-histoire'
    }
  },
  positions: [
    {
      id: 'fascist-doctrine-of-the-state',
      category: 'official',
      holders: [
        { kind: 'party', name: 'Partito Nazionale Fascista' },
        { kind: 'participant', name: 'Benito Mussolini' }
      ],
      statements: [
        {
          id: 'q11',
          text: 'Caposaldo della dottrina fascista è la concezione dello Stato, della sua essenza, dei suoi compiti, delle sue finalità. Per il fascismo lo Stato è un assoluto, davanti al quale individui e gruppi sono il relativo.',
          lang: 'it',
          cite: {
            source: 'mussolini-gentile-1932-dottrina-del-fascismo',
            loc: { section: 'Dottrina politica e sociale (di B. Mussolini)', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://it.wikisource.org/wiki/La_dottrina_del_fascismo'
          }
        },
        {
          id: 'q12',
          text: 'Il fascismo nega che il numero, per il semplice fatto di essere numero, possa dirigere le società umane; nega che questo numero possa governare attraverso una consultazione periodica;',
          lang: 'it',
          cite: {
            source: 'mussolini-gentile-1932-dottrina-del-fascismo',
            loc: { section: 'Dottrina politica e sociale (di B. Mussolini)', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://it.wikisource.org/wiki/La_dottrina_del_fascismo'
          }
        }
      ]
    },
    {
      id: 'comintern-open-terrorist-dictatorship',
      category: 'official',
      holders: [
        { kind: 'organization', name: 'Communist International' },
        { kind: 'participant', name: 'Georgi Dimitrov' }
      ],
      statements: [
        {
          id: 'q10',
          text: 'fascism in power was correctly described by the Thirteenth Plenum of the Executive Committee of the Communist International as the open terrorist dictatorship of the most reactionary, most chauvinistic and most imperialist elements of finance capital.',
          lang: 'en',
          cite: {
            source: 'dimitrov-1935-fascist-offensive',
            loc: {
              section: 'Main Report delivered at the Seventh World Congress of the Communist International'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.marxists.org/reference/archive/dimitrov/works/1935/08_02.htm'
          }
        }
      ]
    },
    {
      id: 'historiography-of-fascism',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Suzy Toson' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'Pour les marxistes, le fascisme est le produit de la crise du capitalisme et de la réaction anti-prolétarienne.',
          lang: 'fr',
          cite: {
            source: 'ehne-toson-quest-ce-que-le-fascisme',
            loc: { section: 'Qu’est-ce que le fascisme ? Définition et histoire', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/fr/encyclopedie/th%C3%A9matiques/l\'europe-politique/les-modeles-politiques-pour-faire-l\'europe/qu\'est-ce-que-le-fascisme-definition-et-histoire'
          }
        },
        {
          id: 'q3',
          text: 'Le courant libéral-démocrate l’envisage lui comme un révélateur d’une unité nationale italienne inachevée.',
          lang: 'fr',
          cite: {
            source: 'ehne-toson-quest-ce-que-le-fascisme',
            loc: { section: 'Qu’est-ce que le fascisme ? Définition et histoire', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/fr/encyclopedie/th%C3%A9matiques/l\'europe-politique/les-modeles-politiques-pour-faire-l\'europe/qu\'est-ce-que-le-fascisme-definition-et-histoire'
          }
        },
        {
          id: 'q4',
          text: 'Enfin, les libéraux l’interprètent comme le produit d\'une « maladie morale », une réaction contre le rationalisme et les valeurs héritées des Lumières.',
          lang: 'fr',
          cite: {
            source: 'ehne-toson-quest-ce-que-le-fascisme',
            loc: { section: 'Qu’est-ce que le fascisme ? Définition et histoire', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/fr/encyclopedie/th%C3%A9matiques/l\'europe-politique/les-modeles-politiques-pour-faire-l\'europe/qu\'est-ce-que-le-fascisme-definition-et-histoire'
          }
        },
        {
          id: 'q5',
          text: 'À rebours de ces approches explicatives, certaines grandes figures politiques de l’époque considèrent le fascisme comme une « parenthèse » dans l’histoire de l’Italie (Ivanoe Bonomi) ou encore comme un « accident de l’Histoire » (Francesco Saverio Nitti).',
          lang: 'fr',
          cite: {
            source: 'ehne-toson-quest-ce-que-le-fascisme',
            loc: { section: 'Qu’est-ce que le fascisme ? Définition et histoire', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/fr/encyclopedie/th%C3%A9matiques/l\'europe-politique/les-modeles-politiques-pour-faire-l\'europe/qu\'est-ce-que-le-fascisme-definition-et-histoire'
          }
        },
        {
          id: 'q6',
          text: 'En 1946, la jeune République italienne suit très majoritairement cette vision, menant à un refoulement mémoriel du fascisme et à une mémoire sélective de la dictature,',
          lang: 'fr',
          cite: {
            source: 'ehne-toson-quest-ce-que-le-fascisme',
            loc: { section: 'Qu’est-ce que le fascisme ? Définition et histoire', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/fr/encyclopedie/th%C3%A9matiques/l\'europe-politique/les-modeles-politiques-pour-faire-l\'europe/qu\'est-ce-que-le-fascisme-definition-et-histoire'
          }
        },
        {
          id: 'q7',
          text: 'La première privilégie la dimension idéologique et culturelle du fascisme (George L. Mosse, Ernst Nolte, Roger Griffin)',
          lang: 'fr',
          cite: {
            source: 'ehne-toson-quest-ce-que-le-fascisme',
            loc: { section: 'Qu’est-ce que le fascisme ? Définition et histoire', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/fr/encyclopedie/th%C3%A9matiques/l\'europe-politique/les-modeles-politiques-pour-faire-l\'europe/qu\'est-ce-que-le-fascisme-definition-et-histoire'
          }
        },
        {
          id: 'q8',
          text: 'quand la seconde s’appuie sur une analyse précise de la pratique politique et des institutions du fascisme (Juan Linz, Stanley Payne, Emilio Gentile).',
          lang: 'fr',
          cite: {
            source: 'ehne-toson-quest-ce-que-le-fascisme',
            loc: { section: 'Qu’est-ce que le fascisme ? Définition et histoire', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/fr/encyclopedie/th%C3%A9matiques/l\'europe-politique/les-modeles-politiques-pour-faire-l\'europe/qu\'est-ce-que-le-fascisme-definition-et-histoire'
          }
        },
        {
          id: 'q9',
          text: 'En 2004, Robert Paxton propose, pour le définir, de « saisir le fascisme en action » : il s’agit d’abord d’observer concrètement la manière dont les mouvements et les régimes fascistes s’insèrent dans le tissu social des idées.',
          lang: 'fr',
          cite: {
            source: 'ehne-toson-quest-ce-que-le-fascisme',
            loc: { section: 'Qu’est-ce que le fascisme ? Définition et histoire', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/fr/encyclopedie/th%C3%A9matiques/l\'europe-politique/les-modeles-politiques-pour-faire-l\'europe/qu\'est-ce-que-le-fascisme-definition-et-histoire'
          }
        }
      ]
    }
  ]
})
