import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'kristallnacht',
  names: [
    { text: 'Kristallnacht', lang: 'en', role: 'primary' },
    { text: 'Novemberpogrom', lang: 'de', role: 'native' },
    {
      text: 'Crystal Night',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'Total Mobilization, Resistance, and the Holocaust', para: '4' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'massacre',
  start: {
    alts: [
      {
        value: { d: '1938-11-09' },
        cites: [
          {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Total Mobilization, Resistance, and the Holocaust', para: '4' }
          },
          { source: 'lemo-chronik-1938', loc: { section: 'Chronik 1938', para: '188' } }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  partOf: [
    { ref: 'period:nazi-germany' }
  ],
  participants: [
    {
      name: 'Sturmabteilung (SA) and SS',
      role: 'perpetrator',
      cites: [
        { source: 'lemo-chronik-1938', loc: { section: 'Chronik 1938', para: '189' } }
      ]
    },
    {
      name: 'Herschel Grynszpan',
      role: 'participant',
      cites: [
        { source: 'lemo-chronik-1938', loc: { section: 'Chronik 1938', para: '187' } }
      ]
    },
    {
      name: 'Ernst vom Rath',
      role: 'victim',
      cites: [
        { source: 'lemo-chronik-1938', loc: { section: 'Chronik 1938', para: '187' } },
        { source: 'lemo-chronik-1938', loc: { section: 'Chronik 1938', para: '189' } }
      ]
    }
  ],
  figures: [
    {
      key: 'prisoners',
      value: {
        alts: [
          {
            value: { min: 25000, qualifier: 'over' },
            cites: [
              { source: 'lemo-chronik-1938', loc: { section: 'Chronik 1938', para: '189' } }
            ]
          }
        ]
      }
    }
  ],
  related: [
    { ref: 'event:the-holocaust', rel: 'related' },
    { ref: 'event:nuremberg-laws', rel: 'preceded-by' }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q7',
          text: 'The violent measures taken against the Jews in November, 1938, were nominally in retaliation for the killing of an official of the German Embassy in Paris.',
          lang: 'en',
          cite: {
            source: 'avalon-imt-judgment-war-crimes-and-crimes-against-humanity',
            loc: { section: 'PERSECUTION OF THE JEWS', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'https://avalon.law.yale.edu/imt/judwarcr.asp' }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q3',
          text: 'After the Kristallnacht (Crystal Night) of November 9, 1938, an organized act of violence perpetrated by Nazis against Jews in all parts of Germany, the persecution of Jews entered a new phase.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Total Mobilization, Resistance, and the Holocaust', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/42.htm' }
        },
        {
          id: 'q8',
          text: 'By the autumn of 1938, the Nazi policy towards the Jews had reached the stage where it was directed towards the complete exclusion of Jews from German life. Pogroms were organised which included the burning and demolishing of synagogues, the looting of Jewish businesses, and the arrest of prominent Jewish business men.',
          lang: 'en',
          cite: {
            source: 'avalon-imt-judgment-war-crimes-and-crimes-against-humanity',
            loc: { section: 'PERSECUTION OF THE JEWS', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'https://avalon.law.yale.edu/imt/judwarcr.asp' }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q5',
          text: 'Random acts of violence, by then commonplace, were replaced by the systematic isolation of the Jewish population in Germany, which had numbered about 600,000 in the early 1930s.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Total Mobilization, Resistance, and the Holocaust', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/42.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1938-11-12' },
            cites: [
              { source: 'lemo-chronik-1938', loc: { section: 'Chronik 1938', para: '190' } },
              {
                source: 'avalon-imt-judgment-war-crimes-and-crimes-against-humanity',
                loc: { section: 'PERSECUTION OF THE JEWS', para: '7' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'A collective fine of one billion marks was imposed on the Jews, the seizure of Jewish assets was authorised, and the movement of Jews was restricted by regulations to certain specified districts and hours.',
        lang: 'en',
        cite: {
          source: 'avalon-imt-judgment-war-crimes-and-crimes-against-humanity',
          loc: { section: 'PERSECUTION OF THE JEWS', para: '7' }
        },
        provenance: { via: 'web', at: '2026-10-07', url: 'https://avalon.law.yale.edu/imt/judwarcr.asp' }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/f/f9/Bundesarchiv_Bild_146-1970-083-44%2C_Magdeburg%2C_zerst%C3%B6rtes_j%C3%BCdisches_Gesch%C3%A4ft.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Bundesarchiv_Bild_146-1970-083-44,_Magdeburg,_zerst%C3%B6rtes_j%C3%BCdisches_Gesch%C3%A4ft.jpg',
    credit: { institution: 'Bundesarchiv', creator: 'H. Friedrich' },
    license: {
      id: 'cc-by-sa',
      version: '3.0',
      url: 'https://creativecommons.org/licenses/by-sa/3.0/de/deed.en'
    },
    title: 'Magdeburg, zerstörtes jüdisches Geschäft'
  },
  furtherReading: [
    { source: 'graml-1988-reichskristallnacht', perspective: 'european' }
  ]
})
