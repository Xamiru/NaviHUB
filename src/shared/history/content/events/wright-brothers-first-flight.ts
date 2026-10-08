import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'wright-brothers-first-flight',
  names: [
    { text: 'Wright brothers’ first powered flight', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  type: 'invention',
  start: {
    alts: [
      {
        value: { d: '1903-12-17' },
        cites: [
          {
            source: 'nasm-1903-wright-flyer',
            loc: { section: '1903 Wright Flyer', para: '4' }
          },
          {
            source: 'nasm-1903-wright-flyer',
            loc: { section: '1903 Wright Flyer', para: '12' }
          }
        ]
      }
    ]
  },
  regions: ['north-america', 'global'],
  prominence: 1,
  places: [
    {
      ref: 'place:kitty-hawk',
      cites: [
        { source: 'nasm-1903-wright-flyer', loc: { section: '1903 Wright Flyer', para: '4' } }
      ]
    }
  ],
  participants: [
    {
      name: 'Wilbur Wright',
      role: 'participant',
      cites: [
        { source: 'nasm-1903-wright-flyer', loc: { section: '1903 Wright Flyer', para: '4' } }
      ]
    },
    {
      name: 'Orville Wright',
      role: 'participant',
      cites: [
        { source: 'nasm-1903-wright-flyer', loc: { section: '1903 Wright Flyer', para: '4' } }
      ]
    },
    {
      name: 'Charles Taylor',
      role: 'participant',
      cites: [
        { source: 'nasm-1903-wright-flyer', loc: { section: '1903 Wright Flyer', para: '11' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'On December 17, 1903, the Wright brothers inaugurated the aerial age with their successful first flights of a heavier-than-air flying machine at Kitty Hawk, North Carolina. This airplane, known as the Wright Flyer, sometimes referred to as the Kitty Hawk Flyer, was the product of a sophisticated four-year program of research and development conducted by Wilbur and Orville Wright beginning in 1899.',
          lang: 'en',
          cite: {
            source: 'nasm-1903-wright-flyer',
            loc: { section: '1903 Wright Flyer', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://airandspace.si.edu/collection-objects/1903-wright-flyer/nasm_A19610048000'
          }
        },
        {
          id: 'q2',
          text: 'It was now Orville\'s turn. At 10:35 a.m. the Flyer lifted off the beach at Kitty Hawk for a 12-second flight, traveling 36 m (120 ft). Three more flights were made that morning, the brothers alternating as pilot. The second and third were in the range of two hundred feet. With Wilbur at the controls, the fourth and last flight covered 255.6 m (852 ft) in 59 seconds. With this final long, sustained effort, there was no question the Wrights had flown.',
          lang: 'en',
          cite: {
            source: 'nasm-1903-wright-flyer',
            loc: { section: '1903 Wright Flyer', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://airandspace.si.edu/collection-objects/1903-wright-flyer/nasm_A19610048000'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'The Wrights accomplished this by twisting, or warping, the tips of the wings in opposite directions via a series of lines attached to the outer edges of the wings that were manipulated by the pilot.',
          lang: 'en',
          cite: {
            source: 'nasm-1903-wright-flyer',
            loc: { section: '1903 Wright Flyer', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://airandspace.si.edu/collection-objects/1903-wright-flyer/nasm_A19610048000'
          }
        },
        {
          id: 'q4',
          text: 'They built a small wind tunnel in the fall of 1901 to gather a body of accurate aerodynamic data with which to design their next glider.',
          lang: 'en',
          cite: {
            source: 'nasm-1903-wright-flyer',
            loc: { section: '1903 Wright Flyer', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://airandspace.si.edu/collection-objects/1903-wright-flyer/nasm_A19610048000'
          }
        },
        {
          id: 'q5',
          text: 'The brothers conceived the propellers as rotary wings, producing a horizontal thrust force aerodynamically.',
          lang: 'en',
          cite: {
            source: 'nasm-1903-wright-flyer',
            loc: { section: '1903 Wright Flyer', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://airandspace.si.edu/collection-objects/1903-wright-flyer/nasm_A19610048000'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q6',
          text: 'Their seminal accomplishment encompassed not only the breakthrough first flight of an airplane, but also the equally important achievement of establishing the foundation of aeronautical engineering.',
          lang: 'en',
          cite: {
            source: 'nasm-1903-wright-flyer',
            loc: { section: '1903 Wright Flyer', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://airandspace.si.edu/collection-objects/1903-wright-flyer/nasm_A19610048000'
          }
        },
        {
          id: 'q7',
          text: 'On October 5, 1905, with the brothers\' third powered airplane, Wilbur made a spectacular 39-minute flight that covered 39.2 km (24.5 miles) over a closed course.',
          lang: 'en',
          cite: {
            source: 'nasm-1903-wright-flyer',
            loc: { section: '1903 Wright Flyer', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://airandspace.si.edu/collection-objects/1903-wright-flyer/nasm_A19610048000'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e3/First_flight3.jpg/1280px-First_flight3.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:First_flight3.jpg',
    credit: { institution: 'Library of Congress', creator: 'John T. Daniels' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'barros-2003-santos-dumont-e-a-invencao-do-voo', perspective: 'latin-american' }
  ]
})
