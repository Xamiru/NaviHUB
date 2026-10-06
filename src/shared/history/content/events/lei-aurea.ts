import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'lei-aurea',
  names: [
    { text: 'Lei Áurea', lang: 'pt', role: 'primary' },
    {
      text: 'Golden Law',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-brazil-country-study-1997',
          loc: { section: 'The Second Empire, 1840-89', para: '23' }
        }
      ]
    },
    {
      text: 'Lei nº 3.353, de 13 de maio de 1888',
      lang: 'pt',
      role: 'official',
      cites: [
        { source: 'lei-aurea-1888', loc: { section: 'Lei nº 3353 de 13 de Maio de 1888' } }
      ]
    }
  ],
  researched: '2026-10-06',
  type: 'law',
  start: {
    alts: [
      {
        value: { d: '1888-05-13' },
        cites: [
          { source: 'lei-aurea-1888', loc: { section: 'Lei nº 3353 de 13 de Maio de 1888' } },
          {
            source: 'loc-brazil-country-study-1997',
            loc: { section: 'The Second Empire, 1840-89', para: '23' }
          },
          { source: 'lemo-chronik-1888', loc: { section: 'Chronik 1888', para: '29' } },
          { source: 'lemo-chronik-1888', loc: { section: 'Chronik 1888', para: '30' } }
        ]
      }
    ]
  },
  regions: ['latin-america'],
  prominence: 2,
  places: [
    {
      ref: 'place:rio-de-janeiro',
      cites: [
        { source: 'lei-aurea-1888', loc: { section: 'Lei nº 3353 de 13 de Maio de 1888' } }
      ]
    }
  ],
  participants: [
    {
      name: 'Princess Isabel',
      role: 'head-of-state',
      cites: [
        {
          source: 'loc-brazil-country-study-1997',
          loc: { section: 'The Second Empire, 1840-89', para: '22' }
        }
      ]
    },
    {
      name: 'Rodrigo Augusto da Silva',
      role: 'signatory',
      cites: [
        { source: 'lei-aurea-1888', loc: { section: 'Lei nº 3353 de 13 de Maio de 1888' } }
      ]
    },
    {
      ref: 'person:pedro-ii-of-brazil',
      role: 'head-of-state',
      cites: [
        { source: 'lei-aurea-1888', loc: { section: 'Lei nº 3353 de 13 de Maio de 1888' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Aufhebung der Sklaverei in Brasilien.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1888', loc: { section: 'Chronik 1888', para: '30' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1888.html'
          }
        },
        {
          id: 'q2',
          text: 'The so-called Golden Law of May 13, 1888, which ended slavery, was not an act of great bravery but a recognition that slavery was no longer viable.',
          lang: 'en',
          cite: {
            source: 'loc-brazil-country-study-1997',
            loc: { section: 'The Second Empire, 1840-89', para: '23' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/brazil/13.htm' }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q3',
          text: 'A Princeza Imperial Regente, em nome de Sua Magestade o Imperador o Senhor D. PEDRO II, Faz saber a todos os subditos do Imperio que a Assembléa Geral decretou e Ella sancionou a Lei seguinte:',
          lang: 'pt',
          cite: { source: 'lei-aurea-1888', loc: { section: 'Lei nº 3353 de 13 de Maio de 1888' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://pt.wikisource.org/wiki/Lei_%C3%81urea'
          }
        },
        {
          id: 'q4',
          text: 'Artigo 1º É declarada extincta desde a data d\'esta Lei a escravidão no Brasil.',
          lang: 'pt',
          cite: { source: 'lei-aurea-1888', loc: { section: 'Lei nº 3353 de 13 de Maio de 1888' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://pt.wikisource.org/wiki/Lei_%C3%81urea'
          }
        },
        {
          id: 'q5',
          text: 'Artigo 2º Revogam-se as disposições em contrario.',
          lang: 'pt',
          cite: { source: 'lei-aurea-1888', loc: { section: 'Lei nº 3353 de 13 de Maio de 1888' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://pt.wikisource.org/wiki/Lei_%C3%81urea'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q6',
          text: 'In 1871 the Rio Branco cabinet approved a law freeing newborns and requiring masters to care for them until age eight, at which time they would either be turned over to the government for compensation or the owner would have use of their labor until age twenty-one. In 1884 a law freed slaves over sixty years of age.',
          lang: 'en',
          cite: {
            source: 'loc-brazil-country-study-1997',
            loc: { section: 'The Second Empire, 1840-89', para: '20' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/brazil/13.htm' }
        },
        {
          id: 'q7',
          text: 'Because of manumissions (many on condition of remaining on the plantations) and the massive flight of slaves, the overall numbers declined from 1,240,806 in 1884 to 723,419 in 1887,',
          lang: 'en',
          cite: {
            source: 'loc-brazil-country-study-1997',
            loc: { section: 'The Second Empire, 1840-89', para: '20' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/brazil/13.htm' }
        },
        {
          id: 'q8',
          text: 'Meanwhile, slaves left the plantations in great numbers, and an active underground supported runaways.',
          lang: 'en',
          cite: {
            source: 'loc-brazil-country-study-1997',
            loc: { section: 'The Second Empire, 1840-89', para: '22' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/brazil/13.htm' }
        },
        {
          id: 'q9',
          text: 'The system was coming apart, and even planters realized that abolition was the way to prevent chaos.',
          lang: 'en',
          cite: {
            source: 'loc-brazil-country-study-1997',
            loc: { section: 'The Second Empire, 1840-89', para: '22' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/brazil/13.htm' }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q10',
          text: 'Slavery ended, but the plantation survived and so did the basic attitudes of a class society.',
          lang: 'en',
          cite: {
            source: 'loc-brazil-country-study-1997',
            loc: { section: 'The Second Empire, 1840-89', para: '23' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/brazil/13.htm' }
        },
        {
          id: 'q11',
          text: 'No freedmen\'s bureaus or schools were established to improve the lives of the former slaves; they were left at the bottom of the socioeconomic scale, where their descendants remain in the 1990s.',
          lang: 'en',
          cite: {
            source: 'loc-brazil-country-study-1997',
            loc: { section: 'The Second Empire, 1840-89', para: '23' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/brazil/13.htm' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c9/Arquivo_Senado_Lei_%C3%81urea_%2852067423182%29.jpg/1280px-Arquivo_Senado_Lei_%C3%81urea_%2852067423182%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Arquivo_Senado_Lei_%C3%81urea_(52067423182).jpg',
    credit: { institution: 'Senado Federal', creator: 'Agência Senado' },
    license: { id: 'cc-by', version: '2.0' }
  }
})
