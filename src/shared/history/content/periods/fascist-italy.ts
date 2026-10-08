import { definePeriod } from '../../schema'

export default definePeriod({
  id: 'fascist-italy',
  names: [
    { text: 'Fascist Italy', lang: 'en', role: 'primary' },
    { text: 'Italia fascista', lang: 'it', role: 'native' }
  ],
  researched: '2026-10-08',
  periodType: 'regime',
  start: {
    alts: [
      {
        value: { d: '1922-10-30' },
        cites: [
          { source: 'lemo-chronik-1922', loc: { section: 'Chronik 1922', para: '189' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1943-07-25' },
        cites: [
          {
            source: 'ehne-toson-quest-ce-que-le-fascisme',
            loc: { section: 'Qu’est-ce que le fascisme ? Définition et histoire', para: '8' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  parent: 'polity:kingdom-of-italy',
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Issu du mot italien fascio (faisceau), il désigne tout d’abord l’expérience historique du mouvement, puis parti politique, de Benito Mussolini en Italie de 1919 à 1945, qui instaure une dictature à partir de 1925.',
          lang: 'fr',
          cite: {
            source: 'ehne-toson-quest-ce-que-le-fascisme',
            loc: { section: 'Qu’est-ce que le fascisme ? Définition et histoire', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/fr/encyclopedie/th%C3%A9matiques/l\'europe-politique/les-modeles-politiques-pour-faire-l\'europe/qu\'est-ce-que-le-fascisme-definition-et-histoire'
          }
        },
        {
          id: 'q2',
          text: 'En 1925, les lois dites fascistissimes instaurent une dictature autoritaire dans la péninsule.',
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
        },
        {
          id: 'q3',
          text: 'Elle se caractérise par un régime à parti unique qui repose sur le culte de son chef, une sacralisation du politique (la « religion politique » étudiée par Emilio Gentile), un encadrement de la population à travers des organisations de masse (l’Opera Nazionale Balilla, puis Gioventù Italiana del Littorio, pour la jeunesse, l’Opera Nazionale Dopolavoro pour l’encadrement des loisirs…) et le déploiement d’organes de répression comme l’OVRA, la police politique secrète du régime.',
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
      kind: 'aftermath',
      quotes: [
        {
          id: 'q4',
          text: 'Le 25 juillet 1943, après que les Alliés ont débarqué en Sicile, le gouvernement de Mussolini est destitué.',
          lang: 'fr',
          cite: {
            source: 'ehne-toson-quest-ce-que-le-fascisme',
            loc: { section: 'Qu’est-ce que le fascisme ? Définition et histoire', para: '8' }
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
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/7d/Benito_Mussolini_marching_into_Rome.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Benito_Mussolini_marching_into_Rome.jpg',
    credit: { institution: 'The Outlook (29 November 1922)', creator: 'Wide World Photos' },
    license: { id: 'public-domain' }
  }
})
