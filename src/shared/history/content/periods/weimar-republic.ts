import { definePeriod } from '../../schema'

export default definePeriod({
  id: 'weimar-republic',
  names: [
    { text: 'Weimar Republic', lang: 'en', role: 'primary' },
    { text: 'Weimarer Republik', lang: 'de', role: 'native' }
  ],
  researched: '2026-10-06',
  periodType: 'regime',
  start: {
    alts: [
      {
        value: { d: '1918-11-09' },
        cites: [
          {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The Weimar Republic, 1918-33', para: '1' }
          },
          { source: 'lemo-chronik-1918', loc: { section: 'Chronik 1918', para: '188' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1933' },
        cites: [
          {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The Weimar Republic, 1918-33' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The Weimar Republic, proclaimed on November 9, 1918, was born in the throes of military defeat and social revolution.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The Weimar Republic, 1918-33', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/35.htm' }
        },
        {
          id: 'q2',
          text: 'Ausrufung der demokratischen Republik durch Philipp Scheidemann (SPD) um 14 Uhr und der freien sozialistischen Räterepublik durch Karl Liebknecht wenig später.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1918', loc: { section: 'Chronik 1918', para: '190' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1918.html'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'Eröffnung der Verfassunggebenden Nationalversammlung. Wegen der politisch ungesicherten Lage in Berlin tagt die Versammlung in Weimar.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1919', loc: { section: 'Chronik 1919', para: '46' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1919.html'
          }
        },
        {
          id: 'q4',
          text: 'In mid-1919 the assembly ratified the constitution of the new Weimar Republic, so named because its constitution was drafted in the small city where the poets Goethe and Schiller had lived.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The Weimar Republic, 1918-33', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/35.htm' }
        },
        {
          id: 'q5',
          text: 'Thus, Germany had a truly democratic parliamentary system. However, the president had the right to dismiss the cabinet, dissolve the Reichstag, and veto legislation.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The Weimar Republic, 1918-33', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/35.htm' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/29/Enemy_Activities_-_Germany_After_Revolt_-_General_National_Assembly_at_Weimar._In_front_of_the_Evangelical_Church%2C_after_the_services_on_occasion_of_first_National_Assembly_opening_at_Weimar_-_NARA_-_31478711.jpg/1280px-thumbnail.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Enemy_Activities_-_Germany_After_Revolt_-_General_National_Assembly_at_Weimar._In_front_of_the_Evangelical_Church,_after_the_services_on_occasion_of_first_National_Assembly_opening_at_Weimar_-_NARA_-_31478711.jpg',
    credit: { institution: 'U.S. National Archives and Records Administration' },
    license: { id: 'public-domain' }
  }
})
