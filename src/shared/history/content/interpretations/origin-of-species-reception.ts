import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'origin-of-species-reception',
  about: ['event:publication-of-on-the-origin-of-species'],
  topic: 'significance',
  researched: '2026-10-06',
  positions: [
    {
      id: 'contrary-to-revelation',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Samuel Wilberforce' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'Mr. Darwin writes as a Christian, and we doubt not that he is one.',
          lang: 'en',
          cite: {
            source: 'wilberforce-1860-review-of-origin-of-species',
            loc: { section: 'On Darwin\'s Origin of Species, 1860', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://sourcebooks.fordham.edu/mod/1860wilberforce-darwin.asp'
          }
        },
        {
          id: 'q2',
          text: 'Nor can we doubt, secondly, that this view, which thus contradicts the revealed relation of creation to its Creator, is equally inconsistent with the fullness of His glory.',
          lang: 'en',
          cite: {
            source: 'wilberforce-1860-review-of-origin-of-species',
            loc: { section: 'On Darwin\'s Origin of Species, 1860', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://sourcebooks.fordham.edu/mod/1860wilberforce-darwin.asp'
          }
        }
      ]
    },
    {
      id: 'legitimate-science',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Asa Gray' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'Studying the facts and phenomena in reference to proximate causes, and endeavoring to trace back the series of cause and effect as far as possible, Darwin\'s aim and processes are strictly scientific, and his endeavor, whether successful or futile, must be regarded as a legitimate attempt to extend the domain of natural or physical science.',
          lang: 'en',
          cite: {
            source: 'gray-1860-review-of-origin-of-species',
            loc: { section: 'Review: The Origin of Species', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.darwinproject.ac.uk/people/about-darwin/origin-species/review-origin-species'
          }
        },
        {
          id: 'q4',
          text: 'In fact, the controversy now opened is not likely to be settled in an off-hand way, nor is it desirable that it should be.',
          lang: 'en',
          cite: {
            source: 'gray-1860-review-of-origin-of-species',
            loc: { section: 'Review: The Origin of Species', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.darwinproject.ac.uk/people/about-darwin/origin-species/review-origin-species'
          }
        }
      ]
    },
    {
      id: 'conversion-of-friends',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Darwin Correspondence Project' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'In particular, he rejoiced in the conversion (\'perversion\' as he jokingly called it) to his views of close friends like Charles Lyell, Joseph Dalton Hooker, and Thomas Henry Huxley, who each, in his own way, had hesitated in relinquishing orthodox concepts of creation.',
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
  ]
})
