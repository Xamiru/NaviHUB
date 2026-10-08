import { definePolity } from '../../schema'

export default definePolity({
  id: 'united-states',
  names: [
    { text: 'United States', lang: 'en', role: 'primary' },
    {
      text: 'United States of America',
      lang: 'en',
      role: 'official',
      cites: [
        {
          source: 'britannica-1911-united-states',
          loc: { section: 'UNITED STATES, THE', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  polityType: 'republic',
  start: {
    alts: [
      {
        value: { d: '1776-07-04' },
        cites: [
          {
            source: 'state-dept-countries-united-kingdom',
            loc: { section: 'The United Kingdom: Summary', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['north-america'],
  prominence: 1,
  capitals: [
    {
      ref: 'place:washington-dc',
      cites: [
        {
          source: 'britannica-1911-united-states-constitution-and-government',
          loc: { section: 'VII.—Constitution and Government', para: '59' }
        }
      ]
    }
  ],
  cshapes: [
    { set: 'early', code: 30 },
    { set: 'world', code: 2 }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f9/Declaration_of_Independence_%281819%29%2C_by_John_Trumbull.jpg/1280px-Declaration_of_Independence_%281819%29%2C_by_John_Trumbull.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Declaration_of_Independence_(1819),_by_John_Trumbull.jpg',
    credit: { institution: 'United States Capitol', creator: 'John Trumbull' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'UNITED STATES, THE, the short title usually given to the great federal republic which had its origin in the revolt of the British colonies in North America, when, in the Declaration of Independence, they described themselves as “The Thirteen United States of America.”',
          lang: 'en',
          cite: {
            source: 'britannica-1911-united-states',
            loc: { section: 'UNITED STATES, THE', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/United_States,_The'
          }
        },
        {
          id: 'q2',
          text: 'In the American Union, and in every state of the Union, there exists a documentary or rigid constitution, creating and defining the powers of every authority in the government.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-united-states-constitution-and-government',
            loc: { section: 'VII.—Constitution and Government', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/United_States,_The/Constitution_and_Government'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'The United States of America declared its independence from the United Kingdom of Great Britain on July 4, 1776. However, the American Revolutionary War continued until the British General Cornwallis surrendered to General George Washington on October 19, 1781.',
          lang: 'en',
          cite: {
            source: 'state-dept-countries-united-kingdom',
            loc: { section: 'The United Kingdom: Summary', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/countries/united-kingdom'
          }
        },
        {
          id: 'q4',
          text: 'When, in 1776, the thirteen colonies threw off their allegiance to the British Crown and took the title of states, they proceeded to unite themselves in a league by the Articles of Confederation of 1781. This scheme of union proved defective, for its central authority, an assembly called Congress, was hopelessly weak. It had neither an executive nor a judiciary, nor had it proper means of coercing a recalcitrant state. Its weakness became so apparent, especially after the pressure of the war with Great Britain had been removed, that the opinion of the wisest men called for a closer and more effective union. Thus the present Constitution was drafted by a convention in 1787, was ratified by nine states (the prescribed number) in 1788, and was set to work under George Washington as first president in 1789.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-united-states-constitution-and-government',
            loc: { section: 'VII.—Constitution and Government', para: '74' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/United_States,_The/Constitution_and_Government'
          }
        }
      ]
    }
  ],
  furtherReading: [
    { source: 'tocqueville-1839-de-la-democratie-en-amerique', perspective: 'european' },
    { source: 'marti-1940-escenas-norteamericanas', perspective: 'latin-american' },
    {
      source: 'vazquez-meyer-1982-mexico-frente-a-estados-unidos',
      perspective: 'latin-american'
    }
  ]
})
