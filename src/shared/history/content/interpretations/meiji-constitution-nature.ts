import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'meiji-constitution-nature',
  about: ['event:meiji-constitution'],
  topic: 'nature',
  researched: '2026-10-09',
  positions: [
    {
      id: 'immutable-gift-of-the-emperor',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Empire of Japan' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'The rights of sovereignty of the State, We have inherited from Our Ancestors, and We shall bequeath them to Our descendants.',
          lang: 'en',
          cite: {
            source: 'constitution-of-japan-1889-official-translation',
            loc: { section: 'The Constitution of Japan' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/The_Constitution_of_Japan:_With_the_Laws_Appertaining_Thereto,_and_the_Imperial_Oath_and_Speech/Part_1'
          }
        },
        {
          id: 'q2',
          text: 'We now declare to respect and protect the security of the rights and of the property of Our people, and to secure to them the complete enjoyment of the same, within the extent of the provisions of the present Constitution and of the law.',
          lang: 'en',
          cite: {
            source: 'constitution-of-japan-1889-official-translation',
            loc: { section: 'The Constitution of Japan' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/The_Constitution_of_Japan:_With_the_Laws_Appertaining_Thereto,_and_the_Imperial_Oath_and_Speech/Part_1'
          }
        }
      ],
      reception: [
        {
          id: 'q5',
          text: 'The main leverage the Diet had was in its approval or disapproval of the budget, and it successfully wielded its authority henceforth.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'The Development of Representative Government', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/japan/25.htm' }
        }
      ]
    },
    {
      id: 'authoritarian-in-character',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'The new constitution specified a form of government that was still authoritarian in character, with the emperor holding the ultimate power and only minimal concessions made to popular rights and parliamentary mechanisms.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'The Development of Representative Government', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/japan/25.htm' }
        },
        {
          id: 'q4',
          text: 'Collectively, the genro made decisions reserved for the emperor, and the genro, not the emperor, controlled the government politically.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'The Development of Representative Government', para: '9' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/japan/25.htm' }
        }
      ]
    }
  ]
})
