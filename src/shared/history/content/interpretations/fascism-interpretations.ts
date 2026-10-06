import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'fascism-interpretations',
  about: ['event:march-on-rome', 'period:fascist-italy'],
  topic: 'nature',
  researched: '2026-10-06',
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
      id: 'crisis-of-capitalism',
      category: 'contemporary',
      holders: [
        { kind: 'school', name: 'Marxistes' }
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
        }
      ]
    },
    {
      id: 'unfinished-national-unity',
      category: 'contemporary',
      holders: [
        { kind: 'school', name: 'Courant libéral-démocrate' }
      ],
      statements: [
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
        }
      ]
    },
    {
      id: 'moral-sickness',
      category: 'contemporary',
      holders: [
        { kind: 'school', name: 'Libéraux' }
      ],
      statements: [
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
        }
      ]
    },
    {
      id: 'parenthesis',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Ivanoe Bonomi' },
        { kind: 'participant', name: 'Francesco Saverio Nitti' }
      ],
      statements: [
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
        }
      ]
    },
    {
      id: 'republic-memory',
      category: 'official',
      holders: [
        { kind: 'state', name: 'République italienne' }
      ],
      statements: [
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
        }
      ]
    },
    {
      id: 'ideology-and-culture',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'George L. Mosse' },
        { kind: 'scholar', name: 'Ernst Nolte' },
        { kind: 'scholar', name: 'Roger Griffin' }
      ],
      statements: [
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
        }
      ]
    },
    {
      id: 'practice-and-institutions',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Juan Linz' },
        { kind: 'scholar', name: 'Stanley Payne' },
        { kind: 'scholar', name: 'Emilio Gentile' }
      ],
      statements: [
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
        }
      ]
    },
    {
      id: 'fascism-in-action',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Robert Paxton' }
      ],
      statements: [
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
