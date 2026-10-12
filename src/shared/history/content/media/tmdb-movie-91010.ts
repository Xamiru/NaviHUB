import { defineMedia } from '../../schema'

export default defineMedia({
  title: { mediaType: 'movie', source: 'tmdb', externalId: '91010', title: 'Game Change', year: 2012 },
  links: [
    { target: 'event:2008-united-states-presidential-election', kind: 'dramatisation-of' }
  ],
  researched: '2026-10-12'
})
