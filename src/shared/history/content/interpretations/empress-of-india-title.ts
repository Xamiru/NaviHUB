import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'empress-of-india-title',
  about: ['event:proclamation-of-victoria-as-empress-of-india'],
  topic: 'significance',
  researched: '2026-10-06',
  positions: [
    {
      id: 'precious-possession',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Benjamin Disraeli', ref: 'person:benjamin-disraeli' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'By passing this Bill, then, and enabling Her Majesty to take this step, the House will show, in a manner that is unmistakable, that they look upon India as one of the most precious possessions of the Crown, and their pride that it is a part of her Empire and governed by Her Imperial Throne.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1876-02-17-royal-titles-bill',
            loc: { section: 'HC Deb 17 February 1876 vol 227 cc407-28', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://api.parliament.uk/historic-hansard/commons/1876/feb/17/leave'
          }
        }
      ]
    },
    {
      id: 'title-of-force',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Robert Lowe' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'Why should we give the idea that we won India by the sword, and that we mean to keep it by the sword?',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1876-02-17-royal-titles-bill',
            loc: { section: 'HC Deb 17 February 1876 vol 227 cc407-28', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://api.parliament.uk/historic-hansard/commons/1876/feb/17/leave'
          }
        },
        {
          id: 'q3',
          text: 'What I would urge in view of all this is that the assumption by Her Majesty to the title of Empress of India would not be a wise or judicious course.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1876-02-17-royal-titles-bill',
            loc: { section: 'HC Deb 17 February 1876 vol 227 cc407-28', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://api.parliament.uk/historic-hansard/commons/1876/feb/17/leave'
          }
        }
      ]
    },
    {
      id: 'taken-and-kept',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Sir George Campbell' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'Being connected with India himself, he was proud Her Majesty was about to take a title which would indicate that we had taken India, and that we meant to keep it.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1876-02-17-royal-titles-bill',
            loc: { section: 'HC Deb 17 February 1876 vol 227 cc407-28', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://api.parliament.uk/historic-hansard/commons/1876/feb/17/leave'
          }
        }
      ]
    },
    {
      id: 'not-english',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'W. E. Forster' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'I agree with my right hon. Friend that the word "Empress"—although I do not know that either the Minister or the Crown would suggest that title—is a word not very suited to English ideas, and the Imperial idea of government is not one very pleasing to English feelings.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1876-02-17-royal-titles-bill',
            loc: { section: 'HC Deb 17 February 1876 vol 227 cc407-28', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://api.parliament.uk/historic-hansard/commons/1876/feb/17/leave'
          }
        }
      ]
    }
  ]
})
