import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'publication-of-on-the-origin-of-species',
  names: [
    { text: 'Publication of On the Origin of Species', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  type: 'discovery',
  start: {
    alts: [
      {
        value: { d: '1859-11' },
        cites: [
          {
            source: 'darwin-correspondence-project-1858-1859-origin',
            loc: { section: '1858-1859: Origin', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['europe', 'global'],
  prominence: 2,
  places: [
    {
      ref: 'place:london',
      cites: [
        { source: 'darwin-1859-on-the-origin-of-species', loc: { section: 'Title page' } }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:charles-darwin',
      role: 'leader',
      cites: [
        {
          source: 'darwin-correspondence-project-1858-1859-origin',
          loc: { section: '1858-1859: Origin', para: '1' }
        }
      ]
    },
    {
      name: 'Alfred Russel Wallace',
      role: 'participant',
      cites: [
        {
          source: 'darwin-correspondence-project-1858-1859-origin',
          loc: { section: '1858-1859: Origin', para: '1' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'When on board H.M.S. ‘Beagle,’ as naturalist, I was much struck with certain facts in the distribution of the inhabitants of South America, and in the geological relations of the present to the past inhabitants of that continent. These facts seemed to me to throw some light on the origin of species—that mystery of mysteries, as it has been called by one of our greatest philosophers.',
          lang: 'en',
          cite: { source: 'darwin-1859-on-the-origin-of-species', loc: { section: 'INTRODUCTION' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.gutenberg.org/cache/epub/1228/pg1228.txt'
          }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The years 1858 and 1859 were, without doubt, the most momentous of Darwin\'s life. From a quiet rural existence filled with steady work on his \'big book\' on species, he was jolted into action by the arrival of an unexpected letter from Alfred Russel Wallace. This letter led to the first announcement of Darwin\'s and Wallace\'s respective theories of organic change at the Linnean Society of London in July 1858 and prompted the composition and publication, in November 1859, of Darwin\'s major treatise On the origin of species by means of natural selection.',
          lang: 'en',
          cite: {
            source: 'darwin-correspondence-project-1858-1859-origin',
            loc: { section: '1858-1859: Origin', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.darwinproject.ac.uk/letters/darwins-life-letters/darwin-letters-1858-1859-origin'
          }
        },
        {
          id: 'q3',
          text: 'In considering the Origin of Species, it is quite conceivable that a naturalist, reflecting on the mutual affinities of organic beings, on their embryological relations, their geographical distribution, geological succession, and other such facts, might come to the conclusion that each species had not been independently created, but had descended, like varieties, from other species.',
          lang: 'en',
          cite: { source: 'darwin-1859-on-the-origin-of-species', loc: { section: 'INTRODUCTION' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.gutenberg.org/cache/epub/1228/pg1228.txt'
          }
        },
        {
          id: 'q4',
          text: 'There is grandeur in this view of life, with its several powers, having been originally breathed into a few forms or into one; and that, whilst this planet has gone cycling on according to the fixed law of gravity, from so simple a beginning endless forms most beautiful and most wonderful have been, and are being, evolved.',
          lang: 'en',
          cite: {
            source: 'darwin-1859-on-the-origin-of-species',
            loc: { section: 'CHAPTER XIV. RECAPITULATION AND CONCLUSION' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.gutenberg.org/cache/epub/1228/pg1228.txt'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'By the end of 1859, Darwin\'s work was being discussed in publications as diverse as The Times and the English Churchman, and Darwin himself was busy as never before: answering letters, justifying and explaining his views to friends, relations, and \'bitter opponents\'; compiling corrections for a second and then a third edition of his book; and enthusiastically negotiating for possible American, French, and German editions.',
          lang: 'en',
          cite: {
            source: 'darwin-correspondence-project-1858-1859-origin',
            loc: { section: '1858-1859: Origin', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.darwinproject.ac.uk/letters/darwins-life-letters/darwin-letters-1858-1859-origin'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cd/Origin_of_Species_title_page.jpg/1280px-Origin_of_Species_title_page.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Origin_of_Species_title_page.jpg',
    credit: { creator: 'John Murray' },
    license: { id: 'public-domain' }
  },
  archive: [
    {
      id: 'darwin-1859',
      mediaKind: 'document',
      title: 'On the origin of species by means of natural selection, or, The preservation of favoured races in the struggle for life',
      date: { d: '1859' },
      url: 'https://archive.org/download/onoriginspecies00darwa/onoriginspecies00darwa.pdf',
      page: 'https://archive.org/details/onoriginspecies00darwa',
      credit: {
        institution: 'Harvard University, Museum of Comparative Zoology, Ernst Mayr Library (Internet Archive)',
        creator: 'Charles Darwin'
      },
      license: { id: 'public-domain' },
      bytes: 62933303
    }
  ],
  furtherReading: [
    { source: 'timiryazev-1949-charlz-darvin-i-ego-uchenie', perspective: 'russian-soviet' }
  ]
})
