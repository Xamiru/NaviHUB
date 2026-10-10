import { describe, expect, it } from 'vitest'
import {
  authorizationHeader,
  BOOK_QUERY,
  CHARACTERS_QUERY,
  creditRole,
  EDITIONS_QUERY,
  errorMessage,
  findWikipediaTitle,
  graphqlErrorMessage,
  normalizeBook,
  parseCharacters,
  parseEditions,
  parseSearchResults,
  parseSeriesBooks,
  parseTags,
  parseTopRows,
  SEARCH_QUERY,
  SERIES_QUERY,
  seriesRelations,
  TOP_QUERY,
  topOrderBy,
  topWhere
} from '../src/main/hardcoverCore'

// The pure half of the Hardcover importer. The API documents fields but not the
// JSON inside cached_* / links / search results, so these pin the shapes the
// importer accepts — and that anything else yields nothing instead of throwing.

describe('documents', () => {
  it('each query has exactly one top-level field (each costs one request)', () => {
    for (const q of [SEARCH_QUERY, BOOK_QUERY, SERIES_QUERY, CHARACTERS_QUERY, EDITIONS_QUERY, TOP_QUERY]) {
      // Drop the operation header and every argument list, then count the
      // names that open a selection set at depth 1.
      let body = q.slice(q.indexOf('{') + 1)
      while (/\([^()]*\)/.test(body)) body = body.replace(/\([^()]*\)/g, '')
      let depth = 0
      let top = 0
      let token = ''
      for (const ch of body) {
        if (ch === '{') {
          if (depth === 0 && token.trim()) top++
          depth++
          token = ''
        } else if (ch === '}') {
          depth--
          token = ''
        } else if (depth === 0) token += ch
      }
      expect(top, q).toBe(1)
    }
  })
})

describe('requests', () => {
  it('adds exactly one Bearer prefix', () => {
    expect(authorizationHeader('abc')).toBe('Bearer abc')
    expect(authorizationHeader('  Bearer abc ')).toBe('Bearer abc')
    expect(authorizationHeader('bearer abc')).toBe('Bearer abc')
    expect(authorizationHeader('"Authorization: Bearer ab\ncd"')).toBe('Bearer abcd')
    expect(authorizationHeader("  'abc'  ")).toBe('Bearer abc')
  })

  it('turns HTTP and GraphQL failures into readable messages', () => {
    expect(errorMessage(401, { error: 'invalid_token', error_description: 'token expired' })).toMatch(/\(token expired\).*Settings/)
    expect(errorMessage(403, { error: 'insufficient_scope', error_description: 'needs books:read' })).toMatch(
      /needs books:read/
    )
    expect(errorMessage(429, null)).toMatch(/rate limit/)
    expect(errorMessage(500, { error: 'An unknown error occurred' })).toBe(
      'Hardcover request failed (500): An unknown error occurred'
    )
    expect(graphqlErrorMessage([{ message: 'field "x" not found' }])).toBe('Hardcover error: field "x" not found')
    expect(graphqlErrorMessage([])).toBeNull()
    expect(graphqlErrorMessage(undefined)).toBeNull()
  })
})

describe('parseSearchResults', () => {
  const results = {
    found: 2,
    hits: [
      {
        document: {
          id: '312460',
          title: 'Dune',
          author_names: ['Frank Herbert'],
          release_year: 1965,
          pages: 617,
          featured_series: { position: 1, series: { name: 'Dune' } },
          image: { url: 'https://assets.hardcover.app/dune.jpg' }
        }
      },
      { document: { id: 'not-a-number', title: 'Broken' } },
      { document: { id: 99, title: 'No extras', image: { url: 'http://insecure.example/x.jpg' } } }
    ]
  }

  it('reads Typesense hits, as an object or a JSON string', () => {
    for (const input of [results, JSON.stringify(results)]) {
      expect(parseSearchResults(input)).toEqual([
        {
          id: 312460,
          title: 'Dune',
          authors: 'Frank Herbert',
          year: 1965,
          pages: 617,
          series: 'Dune #1',
          coverUrl: 'https://assets.hardcover.app/dune.jpg'
        },
        { id: 99, title: 'No extras', authors: null, year: null, pages: null, series: null, coverUrl: null }
      ])
    }
  })

  it('yields nothing for an unknown shape', () => {
    expect(parseSearchResults(null)).toEqual([])
    expect(parseSearchResults('{not json')).toEqual([])
    expect(parseSearchResults({ results: [] })).toEqual([])
  })
})

describe('tags', () => {
  it('maps Genre/Mood/Content Warning, dedups case-insensitively, caps and drops free-form tags', () => {
    const tags = parseTags({
      Genre: [
        { tag: 'Science fiction' },
        { tag: 'Fiction' },
        { tag: 'fiction' },
        ...Array.from({ length: 10 }, (_, i) => ({ tag: `G${i}` }))
      ],
      Mood: ['adventurous', { tag: 'dark' }],
      'Content Warning': [{ tag: 'Violence' }],
      Tag: [{ tag: 'owned' }]
    })
    expect(tags).toEqual([
      { category: 'genre', names: ['Science fiction', 'Fiction', 'G0', 'G1', 'G2', 'G3', 'G4', 'G5'] },
      { category: 'mood', names: ['adventurous', 'dark'] },
      { category: 'content warning', names: ['Violence'] }
    ])
  })

  it('accepts snake-case keys and a JSON string; ignores arrays and junk', () => {
    expect(parseTags(JSON.stringify({ content_warning: [{ tag: 'Death' }] }))[2]).toEqual({
      category: 'content warning',
      names: ['Death']
    })
    expect(parseTags([{ tag: 'x' }])).toEqual([])
    expect(parseTags(null)).toEqual([])
  })
})

describe('credits', () => {
  it('maps contribution text to roles, authors first', () => {
    expect(creditRole(null)).toEqual({ role: 'writer', note: null })
    expect(creditRole('Author')).toEqual({ role: 'writer', note: null })
    expect(creditRole('Illustrator')).toEqual({ role: 'artist', note: 'Illustrator' })
    expect(creditRole('Cover Artist')).toEqual({ role: 'artist', note: 'Cover Artist' })
    expect(creditRole('Translator')).toEqual({ role: 'staff', note: 'Translator' })
  })
})

describe('findWikipediaTitle', () => {
  it('walks any shape for an English article', () => {
    expect(findWikipediaTitle([{ title: 'Goodreads', url: 'https://goodreads.com/x' }, { url: 'https://en.wikipedia.org/wiki/Dune_(novel)' }])).toBe(
      'Dune (novel)'
    )
    expect(findWikipediaTitle({ wikipedia: 'https://en.m.wikipedia.org/wiki/Les_Mis%C3%A9rables#Plot' })).toBe(
      'Les Misérables'
    )
    expect(findWikipediaTitle(['https://fr.wikipedia.org/wiki/Dune'])).toBeNull()
    expect(findWikipediaTitle(null)).toBeNull()
  })
})

describe('normalizeBook', () => {
  const raw = {
    id: 312460,
    title: 'Dune',
    subtitle: null,
    description: 'Arrakis.',
    slug: 'dune',
    release_date: '1965-08-01',
    release_year: 1965,
    pages: null,
    audio_seconds: 79200,
    rating: '4.27',
    ratings_count: 5000,
    users_count: 40000,
    book_category_id: 1,
    literary_type_id: 1,
    image: { url: 'https://assets.hardcover.app/dune.jpg' },
    cached_tags: { Genre: [{ tag: 'Science fiction' }] },
    links: [{ url: 'https://en.wikipedia.org/wiki/Dune_(novel)' }],
    default_physical_edition: { pages: 617, publisher: { id: 7, name: 'Chilton Books' } },
    contributions: [
      { contribution: 'Translator', author: { id: 2, name: 'T. Ranslator' } },
      { contribution: null, author: { id: 1, name: 'Frank Herbert', born_date: '1920-10-08', image: { url: 'https://a/fh.jpg' } } },
      { contribution: null, author: { id: 1, name: 'Frank Herbert' } },
      { contribution: null, author: { id: null, name: 'No id' } }
    ],
    book_series: [
      { position: 9, details: null, featured: false, series: { id: 20, name: 'Dune Chronicles omnibus', books_count: 9 } },
      { position: 1, details: '1', featured: true, series: { id: 10, name: 'Dune', books_count: 23, primary_books_count: 6, is_completed: true } }
    ]
  }

  it('normalizes every field the importer writes', () => {
    const b = normalizeBook(raw)!
    expect(b).toMatchObject({
      id: 312460,
      title: 'Dune',
      synopsis: 'Arrakis.',
      releaseDate: '1965-08-01',
      pages: 617,
      audioSeconds: 79200,
      rating: 85,
      ratingsCount: 5000,
      readers: 40000,
      category: 'Book',
      literaryType: 'Fiction',
      coverUrl: 'https://assets.hardcover.app/dune.jpg',
      publisher: { id: 7, name: 'Chilton Books' },
      wikipediaTitle: 'Dune (novel)'
    })
    expect(b.credits.map((c) => [c.person.name, c.role, c.note])).toEqual([
      ['Frank Herbert', 'writer', null],
      ['T. Ranslator', 'staff', 'Translator']
    ])
    expect(b.credits[0].person.birthday).toBe('1920-10-08')
    // The featured series leads; primary_books_count beats books_count.
    expect(b.series.map((s) => [s.id, s.position, s.count])).toEqual([
      [10, 1, 6],
      [20, 9, 9]
    ])
  })

  it('falls back to the release year, and leaves an unrated book unrated', () => {
    const b = normalizeBook({ ...raw, release_date: null, rating: 4.5, ratings_count: 0, book_category_id: 10 })!
    expect(b.releaseDate).toBe('1965-01-01')
    expect(b.rating).toBeNull()
    expect(b.category).toBe('Light Novel')
    expect(normalizeBook(null)).toBeNull()
    expect(normalizeBook({ title: 'no id' })).toBeNull()
  })
})

describe('series', () => {
  const data = {
    series: [
      {
        id: 10,
        name: 'Dune',
        book_series: [
          { position: 2, details: '2', book: { id: 2, title: 'Dune Messiah', release_year: 1969 } },
          { position: null, details: null, book: { id: 9, title: 'Companion', release_year: null } },
          { position: 1, details: '1', book: { id: 1, title: 'Dune', release_year: 1965 } },
          { position: 3, details: '3', book: { id: 3, title: 'Children of Dune', release_year: 1976 } },
          { position: 3, details: '3', book: { id: 3, title: 'dup', release_year: 1976 } }
        ]
      }
    ]
  }

  it('orders by position, unnumbered last, without duplicates', () => {
    expect(parseSeriesBooks(data).map((e) => e.bookId)).toEqual([1, 2, 3, 9])
    expect(parseSeriesBooks({ series: [] })).toEqual([])
  })

  it('places siblings around this book', () => {
    const rel = seriesRelations(2, 2, parseSeriesBooks(data))
    expect(rel.map((r) => [r.entry.bookId, r.relationType])).toEqual([
      [1, 'PREQUEL'],
      [3, 'SEQUEL'],
      [9, 'SAME_SERIES']
    ])
    expect(seriesRelations(9, null, parseSeriesBooks(data)).every((r) => r.relationType === 'SAME_SERIES')).toBe(
      true
    )
  })
})

describe('characters and editions', () => {
  it('reads characters, skipping malformed and duplicate rows', () => {
    expect(
      parseCharacters({
        book_characters: [
          { character: { id: 5, name: 'Paul Atreides', biography: 'Duke.' } },
          { character: { id: 5, name: 'Paul Atreides' } },
          { character: { name: 'No id' } }
        ]
      })
    ).toEqual([{ id: 5, name: 'Paul Atreides', description: 'Duke.' }])
  })

  it('reads editions with format labels', () => {
    expect(
      parseEditions({
        editions: [
          {
            id: 11,
            title: 'Dune',
            edition_format: 'Paperback',
            pages: 896,
            release_date: '2005-08-02',
            isbn_13: '9780441013593',
            reading_format_id: 1,
            publisher: { name: 'Ace' },
            language: { language: 'English' },
            image: { url: 'https://assets.hardcover.app/e.jpg' }
          },
          { id: 12, reading_format_id: 2, audio_seconds: 79200, pages: 0 }
        ]
      })
    ).toEqual([
      {
        id: 11,
        title: 'Dune',
        format: 'Paperback',
        readingFormat: 'Physical',
        pages: 896,
        releaseDate: '2005-08-02',
        isbn13: '9780441013593',
        isbn10: null,
        audioSeconds: null,
        publisher: 'Ace',
        language: 'English',
        coverUrl: 'https://assets.hardcover.app/e.jpg'
      },
      {
        id: 12,
        title: null,
        format: null,
        readingFormat: 'Audiobook',
        pages: null,
        releaseDate: null,
        isbn13: null,
        isbn10: null,
        audioSeconds: 79200,
        publisher: null,
        language: null,
        coverUrl: null
      }
    ])
  })
})

describe('bulk lists', () => {
  it('builds filters from documented columns only', () => {
    expect(topWhere({ sort: 'popular' })).toEqual({
      book_status_id: { _eq: 1 },
      canonical_id: { _is_null: true },
      compilation: { _eq: false },
      users_count: { _gt: 0 }
    })
    const w = topWhere({ sort: 'rated', format: 'fiction', yearFrom: 1950, yearTo: 1999 })
    expect(w.literary_type_id).toEqual({ _eq: 1 })
    expect(w.book_category_id).toEqual({ _in: [1, 2, 3, 8] })
    expect(w.release_year).toEqual({ _gte: 1950, _lte: 1999 })
    expect(w.ratings_count).toEqual({ _gte: 200 })
    expect(topWhere({ sort: 'popular', format: 'light_novel' }).book_category_id).toEqual({ _eq: 10 })
    expect(topOrderBy('popular')).toEqual([{ users_count: 'desc' }])
    expect(topOrderBy('rated')[0]).toEqual({ rating: 'desc_nulls_last' })
  })

  it('parses rows', () => {
    expect(
      parseTopRows({ books: [{ id: 1, title: 'Dune', release_year: 1965, rating: 4.266, image: { url: 'https://x/y.jpg' } }, { title: 'x' }] })
    ).toEqual([{ id: 1, title: 'Dune', year: 1965, coverUrl: 'https://x/y.jpg', rating: 4.27 }])
  })
})
