// Shared History fixture catalog: small, satisfying every validator rule.
// All text is test filler, not History content.
import type { CatalogEntry } from '../src/shared/history/model'
import {
  defineEvent,
  defineInterpretation,
  defineMedia,
  definePerson,
  defineSource,
  type Quote
} from '../src/shared/history/schema'

export const provenance = { via: 'local-copy' as const, at: '2026-10-12' }
export const q = (id: string, source = 'book-a'): Quote => ({
  id,
  text: 'Fixture text.',
  lang: 'en',
  cite: { source, loc: { page: '12' } },
  provenance
})

export function fixture(): CatalogEntry[] {
  const bookA = defineSource({
    id: 'book-a',
    type: 'book',
    title: 'Fixture Book',
    lang: 'en',
    contributors: [{ name: 'A. Author', role: 'author' }],
    publisher: 'Press',
    date: '2008'
  })
  const original = defineSource({
    id: 'book-fa',
    type: 'book',
    title: 'کتاب',
    lang: 'fa',
    contributors: [{ name: 'B. Author', role: 'author' }],
    date: '1990'
  })
  const translation = defineSource({
    id: 'book-fa-en',
    type: 'book',
    title: 'The Book',
    lang: 'en',
    contributors: [{ name: 'C. Translator', role: 'translator' }],
    date: '1995',
    translationOf: 'book-fa'
  })
  const web = defineSource({
    id: 'web-page',
    type: 'web',
    title: 'A page',
    lang: 'en',
    contributors: [],
    publisher: 'An institution',
    date: '2020',
    url: 'https://example.org/page',
    accessed: '2026-10-12'
  })
  const event = defineEvent({
    id: 'sample-revolution',
    names: [
      { text: 'Sample Revolution', lang: 'en', role: 'primary' },
      { text: 'نام', lang: 'fa', role: 'native' },
      {
        text: 'Contested name',
        lang: 'en',
        role: 'contested',
        usedBy: [{ kind: 'state', name: 'A State' }],
        cites: [{ source: 'book-a', loc: { page: '3' } }]
      }
    ],
    researched: '2026-10-12',
    type: 'revolution',
    start: { alts: [{ value: { d: '1978-01-07' }, cites: [{ source: 'book-a', loc: { page: '1' } }] }] },
    end: { alts: [{ value: { d: '1979-02-11' }, cites: [{ source: 'book-a', loc: { page: '2' } }] }] },
    regions: ['iran'],
    prominence: 1,
    sides: [{ key: 'state', name: 'The state', cites: [{ source: 'book-a', loc: { page: '4' } }] }],
    participants: [
      { ref: 'person:sample-person', role: 'leader', side: 'state', cites: [{ source: 'book-a', loc: { page: '5' } }] }
    ],
    figures: [
      {
        key: 'deaths',
        value: {
          alts: [
            { value: { min: 100 }, cites: [{ source: 'book-a', loc: { page: '6' } }] },
            { value: { min: 200, max: 300 }, cites: [{ source: 'web-page', loc: { section: 'Deaths' } }] }
          ]
        }
      }
    ],
    sections: [
      {
        kind: 'overview',
        quotes: [
          q('q1'),
          {
            ...q('q2', 'book-fa'),
            lang: 'fa',
            translation: {
              text: 'Translated.',
              lang: 'en',
              cite: { source: 'book-fa-en', loc: { page: '9' } },
              provenance
            }
          }
        ]
      }
    ],
    course: [{ date: { alts: [{ value: { d: '1978-09-08' }, cites: [{ source: 'book-a', loc: { page: '7' } }] }] }, quote: q('q3') }],
    archive: [
      {
        id: 'a1',
        mediaKind: 'audio',
        title: 'A recording',
        date: { d: '1978-09' },
        url: 'https://archive.example.org/file.mp3',
        credit: { institution: 'An archive' },
        license: { id: 'public-domain' }
      }
    ]
  })
  const person = definePerson({
    id: 'sample-person',
    names: [{ text: 'Sample Person', lang: 'en', role: 'primary' }],
    researched: '2026-10-12',
    born: { alts: [{ value: { d: '1902', approx: true }, cites: [{ source: 'book-a', loc: { page: '8' } }] }] },
    regions: ['iran'],
    roles: ['cleric'],
    sections: [{ kind: 'overview', quotes: [q('p1')] }]
  })
  const interp = defineInterpretation({
    id: 'sample-revolution-causes',
    about: ['event:sample-revolution'],
    topic: 'causes',
    researched: '2026-10-12',
    positions: [
      {
        id: 'scholar',
        category: 'scholarly',
        holders: [{ kind: 'scholar', name: 'A. Author', discipline: 'historian' }],
        statements: [q('s1')],
        standing: { label: 'mainstream', quote: q('s2') }
      },
      {
        id: 'official',
        category: 'official',
        holders: [{ kind: 'state', name: 'A State' }],
        statements: [q('s3', 'web-page')]
      },
      {
        id: 'fringe',
        category: 'fringe',
        holders: [{ kind: 'public', name: 'Various' }],
        statements: [q('s4')],
        reception: [q('s5')]
      }
    ]
  })
  const media = defineMedia({
    title: { mediaType: 'movie', source: 'tmdb', externalId: '68734', title: 'Argo', year: 2012 },
    researched: '2026-10-12',
    links: [
      {
        target: 'event:sample-revolution',
        kind: 'set-during',
        accuracy: [q('m1')],
        portrayals: [{ person: 'person:sample-person', characterName: 'Someone' }]
      }
    ]
  })
  return [
    { path: 'sources/book-a.ts', entity: bookA },
    { path: 'sources/book-fa.ts', entity: original },
    { path: 'sources/book-fa-en.ts', entity: translation },
    { path: 'sources/web-page.ts', entity: web },
    { path: 'events/sample-revolution.ts', entity: event },
    { path: 'people/sample-person.ts', entity: person },
    { path: 'interpretations/sample-revolution-causes.ts', entity: interp },
    { path: 'media/tmdb-movie-68734.ts', entity: media }
  ]
}

