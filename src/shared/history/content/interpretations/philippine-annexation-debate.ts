import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'philippine-annexation-debate',
  about: ['event:philippine-american-war'],
  topic: 'legitimacy',
  researched: '2026-10-08',
  framing: {
    id: 'q1',
    text: 'The decision by U.S. policymakers to annex the Philippines was not without domestic controversy.',
    lang: 'en',
    cite: {
      source: 'state-dept-milestones-philippine-american-war',
      loc: { section: 'The Philippine-American War, 1899–1902', para: '4' }
    },
    provenance: { via: 'web', at: '2026-10-06', url: 'https://history.state.gov/milestones/1899-1913/war' }
  },
  positions: [
    {
      id: 'annexationists',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Albert J. Beveridge' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'The Opposition tells us that we ought not to govern a people without their consent.',
          lang: 'en',
          cite: {
            source: 'beveridge-1898-march-of-the-flag',
            loc: { section: 'The March of the Flag', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/The_March_of_the_Flag'
          }
        },
        {
          id: 'q5',
          text: 'Would not the people of the Philippines prefer the just, humane, civilizing government of this Republic to the savage, bloody rule of pillage and extortion from which we have rescued them?',
          lang: 'en',
          cite: {
            source: 'beveridge-1898-march-of-the-flag',
            loc: { section: 'The March of the Flag', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/The_March_of_the_Flag'
          }
        },
        {
          id: 'q6',
          text: 'Shall we abandon them, with Germany, England, Japan, hungering for them?',
          lang: 'en',
          cite: {
            source: 'beveridge-1898-march-of-the-flag',
            loc: { section: 'The March of the Flag', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/The_March_of_the_Flag'
          }
        }
      ]
    },
    {
      id: 'opponents',
      category: 'contemporary',
      holders: [
        { kind: 'organization', name: 'American Anti-Imperialist League' }
      ],
      statements: [
        {
          id: 'q7',
          text: 'We earnestly condemn the policy of the present National Administration in the Philippines. It seeks to extinguish the spirit of 1776 in those islands. We deplore the sacrifice of our soldiers and sailors, whose bravery deserves admiration even in an unjust war.',
          lang: 'en',
          cite: {
            source: 'fordham-1899-platform-of-the-american-anti-imperialist-league',
            loc: { section: 'Platform of the American Anti-Imperialist League', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://sourcebooks.fordham.edu/mod/1899antiimp.asp'
          }
        },
        {
          id: 'q8',
          text: 'We demand the immediate cessation of the war against liberty',
          lang: 'en',
          cite: {
            source: 'fordham-1899-platform-of-the-american-anti-imperialist-league',
            loc: { section: 'Platform of the American Anti-Imperialist League', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://sourcebooks.fordham.edu/mod/1899antiimp.asp'
          }
        }
      ]
    },
    {
      id: 'filipino-republic',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Emilio Aguinaldo', ref: 'person:emilio-aguinaldo' }
      ],
      statements: [
        {
          id: 'q9',
          text: 'This singular comedy could not continue for a great length of time',
          lang: 'en',
          cite: {
            source: 'aguinaldo-1899-true-version-of-the-philippine-revolution',
            loc: { section: 'XIX. Outbreak of Hostilities' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.gutenberg.org/cache/epub/12996/pg12996.txt'
          }
        },
        {
          id: 'q10',
          text: 'Limited are our warlike resources, but we will continue this unjust, bloody, and unequal struggle, not for the love of war--which we abhor--but to defend our incontrovertible rights of Liberty and Independence (so dearly won in war with Spain) and our territory which is threatened by the ambitions of _a party_ that is trying to subjugate us.',
          lang: 'en',
          cite: {
            source: 'aguinaldo-1899-true-version-of-the-philippine-revolution',
            loc: { section: 'XIX. Outbreak of Hostilities' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.gutenberg.org/cache/epub/12996/pg12996.txt'
          }
        }
      ]
    }
  ]
})
