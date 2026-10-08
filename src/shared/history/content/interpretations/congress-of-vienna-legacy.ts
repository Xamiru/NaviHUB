import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'congress-of-vienna-legacy',
  about: ['event:congress-of-vienna'],
  topic: 'legacy',
  researched: '2026-10-08',
  positions: [
    {
      id: 'lasting-order',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'After months of deliberations, the congress established an international political order that was to endure for nearly 100 years and that brought Europe a measure of peace.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The German Confederation, 1815-66', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/23.htm' }
        }
      ]
    },
    {
      id: 'austria-dependent',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'Although Austria emerged from the Congress of Vienna as one of the great powers in Europe, throughout the nineteenth century its status and territorial integrity depended on the support of at least one of the other great powers.',
          lang: 'en',
          cite: {
            source: 'loc-austria-country-study-1994',
            loc: { section: 'The Congress of Vienna', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/austria/20.htm' }
        },
        {
          id: 'q3',
          text: 'But the other great powers, which were better able to defend their interests by force, did not always share Austria\'s devotion to Metternich\'s creation.',
          lang: 'en',
          cite: {
            source: 'loc-austria-country-study-1994',
            loc: { section: 'The Congress of Vienna', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/austria/20.htm' }
        }
      ]
    },
    {
      id: 'wise-and-right',
      category: 'official',
      holders: [
        { kind: 'state', name: 'British government' },
        { kind: 'participant', name: 'Viscount Castlereagh' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'He maintained, that on the subject of Genoa the Congress had decided wisely and right—wisely with respect to Europe—right with respect to Genoa.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1815-03-20-address-respecting-the-congress-at-vienna',
            loc: { section: 'HC Deb 20 March 1815 vol 30 cc265-305', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://api.parliament.uk/historic-hansard/commons/1815/mar/20/address-respecting-the-congress-at-vienna'
          }
        },
        {
          id: 'q5',
          text: 'Nothing, therefore, could be less open to accusation than the great features of the arrangement.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1815-03-20-address-respecting-the-congress-at-vienna',
            loc: { section: 'HC Deb 20 March 1815 vol 30 cc265-305', para: '18' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://api.parliament.uk/historic-hansard/commons/1815/mar/20/address-respecting-the-congress-at-vienna'
          }
        }
      ]
    },
    {
      id: 'unholy-congress',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Samuel Whitbread' }
      ],
      statements: [
        {
          id: 'q6',
          text: 'With whom, too, was the noble lord pursuing this inconsistent course, in forcing people to abandon their ancient governments, and to submit to foreign powers, after those people had struggled with us to shake off the tyranny of Buonaparté, upon the promise of liberty and improved condition?',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1815-03-20-address-respecting-the-congress-at-vienna',
            loc: { section: 'HC Deb 20 March 1815 vol 30 cc265-305', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://api.parliament.uk/historic-hansard/commons/1815/mar/20/address-respecting-the-congress-at-vienna'
          }
        },
        {
          id: 'q7',
          text: 'But example seemed to have no influence whatever upon this unholy Congress, while promises and professions were totally abandoned.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1815-03-20-address-respecting-the-congress-at-vienna',
            loc: { section: 'HC Deb 20 March 1815 vol 30 cc265-305', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://api.parliament.uk/historic-hansard/commons/1815/mar/20/address-respecting-the-congress-at-vienna'
          }
        }
      ]
    }
  ]
})
