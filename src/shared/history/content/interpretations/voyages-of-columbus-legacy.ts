import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'voyages-of-columbus-legacy',
  about: ['event:voyages-of-columbus', 'person:christopher-columbus'],
  topic: 'legacy',
  framing: {
    id: 'q1',
    text: 'After five centuries, Columbus remains a mysterious and controversial figure who has been variously described as one of the greatest mariners in history, a visionary genius, a mystic, a national hero, a failed administrator, a naive entrepreneur, and a ruthless and greedy imperialist.',
    lang: 'en',
    cite: {
      source: 'loc-1492-christopher-columbus',
      loc: { section: 'Christopher Columbus: Man and Myth', para: '1' }
    },
    provenance: { via: 'web', at: '2026-10-16', url: 'https://www.loc.gov/exhibits/1492/columbus.html' }
  },
  positions: [
    {
      id: 'columbus-in-his-own-words',
      category: 'contemporary',
      holders: [
        {
          kind: 'participant',
          name: 'Christopher Columbus',
          ref: 'person:christopher-columbus'
        }
      ],
      statements: [
        {
          id: 'q2',
          text: 'Your Highnesses, as Catholic Christians, and princes who love and promote the holy Christian faith, and are enemies of the doctrine of Mahomet, and of all idolatry and heresy, determined to send me, Christopher Columbus, to the above-mentioned countries of India, to see the said princes, people, and territories, and to learn their disposition and the proper method of converting them to our holy faith; and furthermore directed that I should not proceed by land to the East, as is customary, but by a Westerly route',
          lang: 'en',
          cite: {
            source: 'fordham-columbus-journal-1492',
            loc: { section: 'Extracts from Journal' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://sourcebooks.fordham.edu/source/columbus1.asp'
          }
        },
        {
          id: 'q3',
          text: 'At daybreak great multitudes of men came to the shore, all young and of fine shapes, very handsome;',
          lang: 'en',
          cite: {
            source: 'fordham-columbus-journal-1492',
            loc: { section: 'Extracts from Journal' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://sourcebooks.fordham.edu/source/columbus1.asp'
          }
        }
      ]
    },
    {
      id: 'visionary-mariner',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, 1492: An Ongoing Voyage' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'The widely published report of his voyage of 1492 made Columbus famous throughout Europe and secured for him the title of Admiral of the Ocean Sea and further royal patronage.',
          lang: 'en',
          cite: {
            source: 'loc-1492-christopher-columbus',
            loc: { section: 'Christopher Columbus: Man and Myth', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.loc.gov/exhibits/1492/columbus.html'
          }
        }
      ]
    },
    {
      id: 'may-be-said-to-have-founded-the-west-indian-slave-trade',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Encyclopædia Britannica (11th edition, 1911)' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'On the 2nd of February 1494 he sent home, by Antonio de Torres, that despatch to their Catholic highnesses by which he may be said to have founded the West Indian slave trade.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-columbus-christopher',
            loc: { section: 'Columbus, Christopher', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Columbus%2C_Christopher'
          }
        },
        {
          id: 'q6',
          text: 'Five ship-loads of Indians were sent off to Seville (24th June 1495) to be sold as slaves; and a tribute was imposed upon their fellows, which must be looked upon as the origin of that system of repartimientos or encomiendas which was afterwards to work such mischief among the conquered.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-columbus-christopher',
            loc: { section: 'Columbus, Christopher', para: '17' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Columbus%2C_Christopher'
          }
        }
      ]
    },
    {
      id: 'disaster-for-the-peoples-of-the-caribbean',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, 1492: An Ongoing Voyage' }
      ],
      statements: [
        {
          id: 'q7',
          text: 'The arrival of Europeans proved disastrous for the people of the Caribbean.',
          lang: 'en',
          cite: {
            source: 'loc-1492-europe-claims-america',
            loc: { section: 'Europe Claims America: The Atlantic Joined', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.loc.gov/exhibits/1492/eurocla.html'
          }
        },
        {
          id: 'q8',
          text: 'Within 20 years, it is estimated that native population of Hispaniola dropped from one million to 30,000.',
          lang: 'en',
          cite: {
            source: 'loc-1492-europe-claims-america',
            loc: { section: 'Europe Claims America: The Atlantic Joined', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.loc.gov/exhibits/1492/eurocla.html'
          }
        }
      ]
    },
    {
      id: 'native-peoples-between-welcome-and-resistance',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, 1492: An Ongoing Voyage' }
      ],
      statements: [
        {
          id: 'q9',
          text: 'The Indian peoples sometimes greeted Europeans warmly, provided them with food, and taught them important new survival skills.',
          lang: 'en',
          cite: {
            source: 'loc-1492-europe-claims-america',
            loc: { section: 'Europe Claims America: The Atlantic Joined', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.loc.gov/exhibits/1492/eurocla.html'
          }
        },
        {
          id: 'q10',
          text: 'Some used the newcomers as allies against old enemies.',
          lang: 'en',
          cite: {
            source: 'loc-1492-europe-claims-america',
            loc: { section: 'Europe Claims America: The Atlantic Joined', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.loc.gov/exhibits/1492/eurocla.html'
          }
        }
      ]
    },
    {
      id: 'a-symbol-whose-meaning-is-contested',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Paul Halsall', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q11',
          text: 'The meaning of this voyage is highly contested.',
          lang: 'en',
          cite: {
            source: 'fordham-columbus-journal-1492-introduction',
            loc: { section: 'Introduction' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://sourcebooks.fordham.edu/source/columbus1.asp'
          }
        },
        {
          id: 'q12',
          text: 'On the one hand, it is witness to the tremendous vitality and verve of late medieval and early modern Europe - which was on the verge of acquiring a world hegemony. On the other hand, the direct result of this and later voyages was the virtual extermination, by ill-treatment and disease, of the vast majority of the Native inhabitants, and the enormous growth of the transatlantic slave trade.',
          lang: 'en',
          cite: {
            source: 'fordham-columbus-journal-1492-introduction',
            loc: { section: 'Introduction' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://sourcebooks.fordham.edu/source/columbus1.asp'
          }
        }
      ]
    }
  ],
  researched: '2026-10-16'
})
