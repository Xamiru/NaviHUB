import { definePolity } from '../../schema'

export default definePolity({
  id: 'german-democratic-republic',
  names: [
    { text: 'German Democratic Republic', lang: 'en', role: 'primary' },
    { text: 'Deutsche Demokratische Republik', lang: 'de', role: 'native' },
    {
      text: 'East Germany',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'The German Democratic Republic', para: '3' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  polityType: 'republic',
  start: {
    alts: [
      {
        value: { d: '1949-10-07' },
        cites: [
          {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The German Democratic Republic', para: '4' }
          },
          {
            source: 'state-dept-countries-german-democratic-republic',
            loc: { section: 'East Germany (German Democratic Republic): Summary', para: '4' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1990-10-03' },
        cites: [
          { source: 'loc-germany-country-study-1995', loc: { section: 'History', para: '20' } },
          {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Introduction', para: '2' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  capitals: [
    {
      ref: 'place:berlin',
      cites: [
        {
          source: 'cshapes-2-dataset',
          loc: { section: 'German Democratic Republic (code 265), capital East Berlin' }
        }
      ]
    }
  ],
  cshapes: [
    { set: 'world', code: 265, from: 1949.77, to: 1990.753 }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/9/9a/Bundesarchiv_Bild_183-S88777%2C_Berlin%2C_DDR-Gr%C3%BCndung%2C_Massenkundgebung.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Bundesarchiv_Bild_183-S88777,_Berlin,_DDR-Gr%C3%BCndung,_Massenkundgebung.jpg',
    credit: { institution: 'Bundesarchiv' },
    license: {
      id: 'cc-by-sa',
      version: '3.0 de',
      url: 'https://creativecommons.org/licenses/by-sa/3.0/de/deed.en'
    }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'After World War II, Germany was occupied and divided into four zones administered by the main Allied powers. After tensions mounted between the Soviet Union on the one side, and the United States, Great Britain, and France on the other, the Western powers combined their zones and allowed the establishment of the Federal Republic of Germany. The Soviets responded by forming the German Democratic Republic (GDR) to govern their occupation zone. The United States refused to recognize the GDR until 1974. The GDR was absorbed by the FRG in 1990 when Germany reunified.',
          lang: 'en',
          cite: {
            source: 'state-dept-countries-german-democratic-republic',
            loc: { section: 'East Germany (German Democratic Republic): Summary', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/countries/german-democratic-republic'
          }
        },
        {
          id: 'q2',
          text: 'A socialist dictatorship was put in place and carefully watched by its Soviet masters. As in the Soviet Union, political opposition was suppressed, the press censored, and the economy owned and controlled by the state.',
          lang: 'en',
          cite: { source: 'loc-germany-country-study-1995', loc: { section: 'History', para: '17' } },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/germany/3.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'A new People\'s Council, elected during the Third People\'s Congress, was convened for the first time on October 7, 1949, and the constitution of the GDR went into effect the same day. The Soviet military administration was dissolved, and its administrative functions were transferred to East German authorities. The People\'s Council was renamed and began its work as the Volkskammer (People\'s Chamber), the parliament of the GDR.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The German Democratic Republic', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/germany/49.htm' }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q4',
          text: 'In late 1989, confronted with crushing economic problems, unable to control the borders of neighboring states, and told by the Soviet leadership not to expect outside help in quelling domestic protest, the GDR leadership resigned in the face of massive and constantly growing public demonstrations. After elections in the spring of 1990, the critics of the SED regime took over the government. On October 3, 1990, the GDR ceased to exist, and its territory and people were joined to the FRG. The division of Germany that had lasted decades was ended.',
          lang: 'en',
          cite: { source: 'loc-germany-country-study-1995', loc: { section: 'History', para: '20' } },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/germany/3.htm' }
        }
      ]
    }
  ],
  furtherReading: [
    { source: 'weber-1985-geschichte-der-ddr', perspective: 'european' },
    { source: 'wolle-1998-die-heile-welt-der-diktatur', perspective: 'european' }
  ]
})
