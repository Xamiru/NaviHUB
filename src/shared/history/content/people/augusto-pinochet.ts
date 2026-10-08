import { definePerson } from '../../schema'

export default definePerson({
  id: 'augusto-pinochet',
  names: [
    { text: 'Augusto Pinochet', lang: 'en', role: 'primary' },
    {
      text: 'Augusto Pinochet Ugarte',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'bcn-resena-augusto-pinochet-ugarte',
          loc: { section: 'Reseña Biográfica Augusto Pinochet Ugarte', para: '26' }
        }
      ]
    }
  ],
  researched: '2026-10-09',
  born: {
    alts: [
      {
        value: { d: '1915-11-25' },
        cites: [
          {
            source: 'bcn-resena-augusto-pinochet-ugarte',
            loc: { section: 'Reseña Biográfica Augusto Pinochet Ugarte', para: '12' }
          },
          {
            source: 'bcn-resena-augusto-pinochet-ugarte',
            loc: { section: 'Reseña Biográfica Augusto Pinochet Ugarte', para: '52' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '2006-12-10' },
        cites: [
          {
            source: 'bcn-resena-augusto-pinochet-ugarte',
            loc: { section: 'Reseña Biográfica Augusto Pinochet Ugarte', para: '15' }
          }
        ]
      }
    ]
  },
  regions: ['latin-america'],
  roles: ['military', 'head-of-state'],
  offices: [
    {
      title: 'president of the Government Junta',
      start: {
        alts: [
          {
            value: { d: '1973-09-11' },
            cites: [
              {
                source: 'bcn-resena-augusto-pinochet-ugarte',
                loc: { section: 'Reseña Biográfica Augusto Pinochet Ugarte', para: '69' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'bcn-resena-augusto-pinochet-ugarte',
          loc: { section: 'Reseña Biográfica Augusto Pinochet Ugarte', para: '69' }
        }
      ]
    },
    {
      title: 'head of state of Chile',
      start: {
        alts: [
          {
            value: { d: '1974-12-17' },
            cites: [
              {
                source: 'bcn-resena-augusto-pinochet-ugarte',
                loc: { section: 'Reseña Biográfica Augusto Pinochet Ugarte', para: '21' }
              },
              {
                source: 'bcn-resena-augusto-pinochet-ugarte',
                loc: { section: 'Reseña Biográfica Augusto Pinochet Ugarte', para: '26' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1990-03-11' },
            cites: [
              {
                source: 'bcn-resena-augusto-pinochet-ugarte',
                loc: { section: 'Reseña Biográfica Augusto Pinochet Ugarte', para: '23' }
              },
              {
                source: 'bcn-resena-augusto-pinochet-ugarte',
                loc: { section: 'Reseña Biográfica Augusto Pinochet Ugarte', para: '81' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'bcn-resena-augusto-pinochet-ugarte',
          loc: { section: 'Reseña Biográfica Augusto Pinochet Ugarte', para: '26' }
        }
      ]
    },
    {
      title: 'commander in chief of the army',
      start: {
        alts: [
          {
            value: { d: '1973-08-23' },
            cites: [
              {
                source: 'bcn-resena-augusto-pinochet-ugarte',
                loc: { section: 'Reseña Biográfica Augusto Pinochet Ugarte', para: '25' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'Biblioteca del Congreso Nacional de Chile' }
            ]
          },
          {
            value: { d: '1973-08-24' },
            cites: [
              {
                source: 'state-dept-milestones-allende-years-and-pinochet-coup',
                loc: { section: 'The Allende Years and the Pinochet Coup, 1969–1973', para: '9' }
              }
            ],
            heldBy: [
              {
                kind: 'organization',
                name: 'Office of the Historian, U.S. Department of State'
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1998-03-10' },
            cites: [
              {
                source: 'bcn-resena-augusto-pinochet-ugarte',
                loc: { section: 'Reseña Biográfica Augusto Pinochet Ugarte', para: '25' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'bcn-resena-augusto-pinochet-ugarte',
          loc: { section: 'Reseña Biográfica Augusto Pinochet Ugarte', para: '24' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/ff/Augusto_Pinochet_foto_oficial.jpg/1280px-Augusto_Pinochet_foto_oficial.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Augusto_Pinochet_foto_oficial.jpg',
    credit: {
      institution: 'Archivo General Histórico del Ministerio de Relaciones Exteriores de Chile',
      creator: 'Ministerio de Relaciones Exteriores de Chile'
    },
    license: {
      id: 'cc-by',
      version: '2.0',
      url: 'https://creativecommons.org/licenses/by/2.0/cl/deed.en'
    }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Pinochet soon emerged as the dominant figure and very shortly afterward as president. After a brief flirtation with corporatist ideas, the government evolved into a one-man dictatorship, with the rest of the junta acting as a sort of legislature.',
          lang: 'en',
          cite: {
            source: 'loc-chile-country-study-1994',
            loc: { section: 'Military Rule', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/chile/31.htm' }
        },
        {
          id: 'q2',
          text: 'Augusto Pinochet (Valparaíso, 25 de noviembre de 1915 – Santiago, 10 de diciembre de 2006). Militar y político. Ejerció la Jefatura de Estado (de facto) entre el 17 de diciembre de 1974 y el 10 de marzo de 1981, y con rango constitucional entre el 11 de marzo de 1981 y el 11 de marzo de 1990. Senador vitalicio entre el 11 de marzo de 1998 y el 4 de julio de 2002. Comandante en Jefe del Ejército entre el 23 de agosto de 1973 y el 10 de marzo de 1998',
          lang: 'es',
          cite: {
            source: 'bcn-resena-augusto-pinochet-ugarte',
            loc: { section: 'Reseña Biográfica Augusto Pinochet Ugarte', para: '26' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.bcn.cl/historiapolitica/resenas_parlamentarias/wiki/Augusto_Pinochet_Ugarte'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q3',
          text: 'Prats was succeeded as Defense Minister and Army Commander by General Augusto Pinochet on August 24, 1973.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-allende-years-and-pinochet-coup',
            loc: { section: 'The Allende Years and the Pinochet Coup, 1969–1973', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1969-1976/allende'
          }
        },
        {
          id: 'q4',
          text: 'Encabezó la Junta de Gobierno que asumió el mando del país, junto con el general Gustavo Leigh Guzmán como comandante de la Fuerza Aérea, el almirante José Toribio Merino Castro como comandante de la Marina y el general César Mendoza Durán como director general de Carabineros. En virtud del Decreto Ley N.º 1 del 11 de septiembre de 1973, se convirtió en el Presidente de la Junta de Gobierno.',
          lang: 'es',
          cite: {
            source: 'bcn-resena-augusto-pinochet-ugarte',
            loc: { section: 'Reseña Biográfica Augusto Pinochet Ugarte', para: '69' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.bcn.cl/historiapolitica/resenas_parlamentarias/wiki/Augusto_Pinochet_Ugarte'
          }
        },
        {
          id: 'q5',
          text: 'The worst human rights abuses occurred in the first four years of the junta, when thousands of civilians were murdered, jailed, tortured, brutalized, or exiled, especially those linked with the Popular Unity parties. The secret police, reporting to Pinochet through the National Intelligence Directorate (Dirección Nacional de Inteligencia--DINA), replaced in 1977 by the National Information Center (Centro Nacional de Información--CNI), kept dissidents living in fear of arrest, torture, murder, or "disappearance."',
          lang: 'en',
          cite: {
            source: 'loc-chile-country-study-1994',
            loc: { section: 'Military Rule', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/chile/31.htm' }
        },
        {
          id: 'q6',
          text: 'Pinochet established iron control over the armed forces as well as the government, although insisting that they were separate entities. He made himself not only the chief executive of the state but also the commander in chief of the military. He shuffled commands to ensure that loyalists controlled all the key posts. He appointed many new generals and had others retire, so that by the 1980s all active-duty generals owed their rank to Pinochet.',
          lang: 'en',
          cite: {
            source: 'loc-chile-country-study-1994',
            loc: { section: 'Military Rule', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/chile/31.htm' }
        }
      ]
    },
    {
      kind: 'later-life',
      quotes: [
        {
          id: 'q7',
          text: 'Tras la derrota en el Plebiscito, en conformidad con la 29a disposición transitoria de la Constitución Política, permaneció como Presidente de la República hasta el 11 de marzo de 1990.',
          lang: 'es',
          cite: {
            source: 'bcn-resena-augusto-pinochet-ugarte',
            loc: { section: 'Reseña Biográfica Augusto Pinochet Ugarte', para: '81' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.bcn.cl/historiapolitica/resenas_parlamentarias/wiki/Augusto_Pinochet_Ugarte'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q8',
          text: 'De acuerdo a las Comisiones Rettig (1991) y Valech (2004), la cifra total de víctimas de violaciones a los Derechos Humanos, calificadas oficialmente, alcanza a 40.175 personas, incluyendo ejecutados políticos, detenidos desaparecidos y víctimas de prisión política y tortura.',
          lang: 'es',
          cite: {
            source: 'bcn-resena-augusto-pinochet-ugarte',
            loc: { section: 'Reseña Biográfica Augusto Pinochet Ugarte', para: '72' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.bcn.cl/historiapolitica/resenas_parlamentarias/wiki/Augusto_Pinochet_Ugarte'
          }
        }
      ]
    }
  ],
  furtherReading: [
    { source: 'moulian-1997-chile-actual', perspective: 'latin-american' },
    {
      source: 'chile-1991-informe-de-la-comision-nacional-de-verdad-y-reconciliacion',
      perspective: 'latin-american'
    }
  ]
})
