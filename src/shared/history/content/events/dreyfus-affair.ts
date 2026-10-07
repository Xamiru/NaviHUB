import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'dreyfus-affair',
  names: [
    { text: 'Dreyfus affair', lang: 'en', role: 'primary' },
    { text: 'Affaire Dreyfus', lang: 'fr', role: 'native' }
  ],
  researched: '2026-10-07',
  type: 'crisis',
  start: {
    alts: [
      {
        value: { d: '1894-12-22' },
        cites: [
          { source: 'lemo-chronik-1894', loc: { section: 'Chronik 1894', para: '61' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1906' },
        cites: [
          { source: 'lemo-chronik-1894', loc: { section: 'Chronik 1894', para: '62' } },
          { source: 'lemo-chronik-1899', loc: { section: 'Chronik 1899', para: '43' } }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:paris',
      cites: [
        {
          source: 'loc-israel-country-study-1988',
          loc: { section: 'Political Zionism', para: '5' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:alfred-dreyfus',
      role: 'victim',
      cites: [
        { source: 'lemo-chronik-1894', loc: { section: 'Chronik 1894', para: '62' } }
      ]
    },
    {
      name: 'Émile Zola',
      role: 'journalist',
      cites: [
        { source: 'lemo-chronik-1898', loc: { section: 'Chronik 1898', para: '3' } }
      ]
    },
    {
      name: 'Émile Loubet',
      role: 'head-of-state',
      cites: [
        { source: 'lemo-chronik-1899', loc: { section: 'Chronik 1899', para: '43' } }
      ]
    },
    {
      ref: 'person:theodor-herzl',
      role: 'witness',
      cites: [
        {
          source: 'loc-israel-country-study-1988',
          loc: { section: 'Political Zionism', para: '5' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:first-zionist-congress',
      rel: 'contributed-to',
      cites: [
        {
          source: 'loc-israel-country-study-1988',
          loc: { section: 'Political Zionism', para: '5' }
        },
        {
          source: 'loc-israel-country-study-1988',
          loc: { section: 'Political Zionism', para: '6' }
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
          text: 'The turning point in Herzl\'s thinking on the Jewish question occurred during the 1894 Paris trial of Alfred Dreyfus, a Jewish officer in the French army, on charges of treason (the sale of military secrets to Germany). Dreyfus was convicted, and although he was eventually cleared, his career was ruined.',
          lang: 'en',
          cite: {
            source: 'loc-israel-country-study-1988',
            loc: { section: 'Political Zionism', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/israel/9.htm' }
        },
        {
          id: 'q2',
          text: 'The trial and later exoneration sharply divided French society and unleashed widespread anti-Semitic demonstrations and riots throughout France.',
          lang: 'en',
          cite: {
            source: 'loc-israel-country-study-1988',
            loc: { section: 'Political Zionism', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/israel/9.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q3',
          text: 'To Herzl\'s shock and dismay, many members of the French intellectual, social, and political elites--precisely those elements of society into which the upwardly mobile emancipated Jews wished to be assimilated--were the most vitriolic in their antiSemitic stance.',
          lang: 'en',
          cite: {
            source: 'loc-israel-country-study-1988',
            loc: { section: 'Political Zionism', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/israel/9.htm' }
        },
        {
          id: 'q4',
          text: 'The Dreyfus affair proved for Herzl, as the 1881 pogroms had for Pinsker, that Jews would always be an alien element in the societies in which they resided as long as they remained stateless.',
          lang: 'en',
          cite: {
            source: 'loc-israel-country-study-1988',
            loc: { section: 'Political Zionism', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/israel/9.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1894-12-22' },
            cites: [
              { source: 'lemo-chronik-1894', loc: { section: 'Chronik 1894', para: '61' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q5',
        text: 'Der französische Hauptmann Alfred Dreyfus wird von einem Kriegsgericht wegen angeblicher Spionage für Deutschland zu lebenslanger Verbannung auf die Teufelsinsel verurteilt.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1894', loc: { section: 'Chronik 1894', para: '62' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1894.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1898-01-13' },
            cites: [
              { source: 'lemo-chronik-1898', loc: { section: 'Chronik 1898', para: '2' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q6',
        text: 'In der Pariser Tageszeitung L\'Aurore veröffentlicht der sozial engagierte Schriftsteller Émile Zola den Artikel "J\'accuse (dt. "Ich klage an"), in dem er die Freilassung des 1894 zu Unrecht verurteilten jüdischen Hauptmanns Alfred Dreyfus verlangt.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1898', loc: { section: 'Chronik 1898', para: '3' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1898.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1899-06-03' },
            cites: [
              { source: 'lemo-chronik-1899', loc: { section: 'Chronik 1899', para: '31' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'Der französische Kassationsgerichtshof hebt das 1894 verhängte Kriegsgerichtsurteil gegen den jüdischen Offizier Alfred Dreyfus auf.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1899', loc: { section: 'Chronik 1899', para: '32' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1899.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1899-09-09' },
            cites: [
              { source: 'lemo-chronik-1899', loc: { section: 'Chronik 1899', para: '42' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'Das Revisionsverfahren gegen den jüdischen Offizier Alfred Dreyfus in Rennes endet in offenem Rechtsbruch mit der Verurteilung zu zehn Jahren Festungshaft. Zehn Tage später wird Dreyfus von dem französischen Staatspräsidenten Émile Loubet (1838-1929) begnadigt.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1899', loc: { section: 'Chronik 1899', para: '43' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1899.html'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/52/Degradation_alfred_dreyfus.jpg/1280px-Degradation_alfred_dreyfus.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Degradation_alfred_dreyfus.jpg',
    credit: { institution: 'Bibliothèque nationale de France', creator: 'Henri Meyer' },
    license: { id: 'public-domain' }
  }
})
