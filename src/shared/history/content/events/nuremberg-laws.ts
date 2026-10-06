import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'nuremberg-laws',
  names: [
    { text: 'Nuremberg Laws', lang: 'en', role: 'primary' },
    { text: 'Nürnberger Gesetze', lang: 'de', role: 'native' }
  ],
  researched: '2026-10-06',
  type: 'law',
  start: {
    alts: [
      {
        value: { d: '1935-09-15' },
        cites: [
          {
            source: 'avalon-nca-1416-ps-reich-citizenship-law',
            loc: { section: 'Document No. 1416-PS: Reich Citizenship Law of 15 September 1935' }
          },
          {
            source: 'avalon-nca-1416-ps-reich-citizenship-law',
            loc: { section: 'Document No. 1416-PS: Reich Citizenship Law of 15 September 1935' }
          }
        ]
      },
      {
        value: { d: '1935-09-10' },
        cites: [
          { source: 'lemo-chronik-1935', loc: { section: 'Chronik 1935', para: '164' } }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:nuremberg',
      cites: [
        {
          source: 'avalon-nca-1416-ps-reich-citizenship-law',
          loc: { section: 'Document No. 1416-PS: Reich Citizenship Law of 15 September 1935' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:nazi-germany' }
  ],
  participants: [
    {
      ref: 'person:adolf-hitler',
      role: 'signatory',
      cites: [
        {
          source: 'avalon-nca-1416-ps-reich-citizenship-law',
          loc: { section: 'Document No. 1416-PS: Reich Citizenship Law of 15 September 1935' }
        },
        {
          source: 'avalon-nca-1416-ps-reich-citizenship-law',
          loc: { section: 'Document No. 1416-PS: Reich Citizenship Law of 15 September 1935' }
        }
      ]
    },
    {
      name: 'Wilhelm Frick',
      role: 'signatory',
      cites: [
        {
          source: 'avalon-nca-1416-ps-reich-citizenship-law',
          loc: { section: 'Document No. 1416-PS: Reich Citizenship Law of 15 September 1935' }
        },
        {
          source: 'avalon-nca-1416-ps-reich-citizenship-law',
          loc: { section: 'Document No. 1416-PS: Reich Citizenship Law of 15 September 1935' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:the-holocaust', rel: 'related' }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'Upon taking power, the Nazis began immediately to rid Germany of its Jewish citizens.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Total Mobilization, Resistance, and the Holocaust', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/42.htm' }
        },
        {
          id: 'q2',
          text: 'In the Aryan Paragraph of 1933, the regime decreed that Jews could not hold civil service positions.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Total Mobilization, Resistance, and the Holocaust', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/42.htm' }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q3',
          text: 'The Nuremberg Laws of 1935 deprived Jews of the right to citizenship and restricted relationships between "Aryans" (racially pure Germans) and Jews.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Total Mobilization, Resistance, and the Holocaust', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/42.htm' }
        },
        {
          id: 'q4',
          text: 'Auf dem Reichsparteitag verkündet Hitler die "Nürnberger Gesetze". Die Diskriminierung von Juden wird auf eine rechtliche Grundlage nach biologistischen Kriterien gestellt.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1935', loc: { section: 'Chronik 1935', para: '165' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1935.html'
          }
        },
        {
          id: 'q5',
          text: '1. A citizen of the Reich is only that subject, who is of German- or kindred blood and who, through his conduct, shows that he is both desirous and fit to serve faithfully the German people and Reich.',
          lang: 'en',
          cite: {
            source: 'avalon-nca-1416-ps-reich-citizenship-law',
            loc: { section: 'Document No. 1416-PS: Reich Citizenship Law of 15 September 1935' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'https://avalon.law.yale.edu/imt/1416-ps.asp' }
        },
        {
          id: 'q6',
          text: '3. Only the citizen of the Reich enjoys full political rights in accordance with the provision of the laws.',
          lang: 'en',
          cite: {
            source: 'avalon-nca-1416-ps-reich-citizenship-law',
            loc: { section: 'Document No. 1416-PS: Reich Citizenship Law of 15 September 1935' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'https://avalon.law.yale.edu/imt/1416-ps.asp' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1935-08-10' },
            cites: [
              { source: 'lemo-chronik-1935', loc: { section: 'Chronik 1935', para: '148' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'Die Standesämter in Deutschland dürfen keine Ehen mehr zwischen Juden und Nichtjuden schließen.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1935', loc: { section: 'Chronik 1935', para: '149' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1935.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1935-11-07' },
            cites: [
              { source: 'lemo-chronik-1935', loc: { section: 'Chronik 1935', para: '198' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'Die ersten willkürlichen Urteile gegen Juden wegen "Rassenschande" werden auf Grundlage der "Nürnberger Gesetze" verhängt.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1935', loc: { section: 'Chronik 1935', para: '200' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1935.html'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/0/04/RGBL_I_1935_S_1334.png',
    page: 'https://commons.wikimedia.org/wiki/File:RGBL_I_1935_S_1334.png',
    credit: {
      institution: 'Österreichische Nationalbibliothek',
      creator: 'Reichsministerium des Innern'
    },
    license: { id: 'public-domain' }
  }
})
