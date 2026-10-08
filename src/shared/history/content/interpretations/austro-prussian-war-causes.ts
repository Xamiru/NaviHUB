import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'austro-prussian-war-causes',
  about: ['event:austro-prussian-war'],
  topic: 'causes',
  researched: '2026-10-08',
  positions: [
    {
      id: 'holstein',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'The immediate cause of the Seven Weeks\' War between Austria and Prussia in 1866 was Prussia\'s desire to annex the Duchy of Holstein.',
          lang: 'en',
          cite: {
            source: 'loc-austria-country-study-1994',
            loc: { section: 'The Loss of Leadership in Germany', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/austria/25.htm' }
        },
        {
          id: 'q2',
          text: 'In April 1866, however, Prussia plotted with Italy to wage a two-front war against Austria that would enable Prussia to gain Holstein and Italy to gain Venetia.',
          lang: 'en',
          cite: {
            source: 'loc-austria-country-study-1994',
            loc: { section: 'The Loss of Leadership in Germany', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/austria/25.htm' }
        },
        {
          id: 'q8',
          text: 'Nonetheless, by mid-1864 Franz Joseph realized that war was inevitable if Austrian leadership was to be preserved.',
          lang: 'en',
          cite: {
            source: 'loc-austria-country-study-1994',
            loc: { section: 'The Loss of Leadership in Germany', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/austria/25.htm' }
        }
      ]
    },
    {
      id: 'bismarck-provoked',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'As an ardent and aggressive Prussian nationalist, Bismarck had long been an opponent of Austria because both states sought primacy within the same area--Germany.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Bismarck and Unification', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/27.htm' }
        },
        {
          id: 'q4',
          text: 'Bismarck used a diplomatic dispute to provoke Austria to declare war on Prussia in 1866.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Bismarck and Unification', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/27.htm' }
        }
      ]
    },
    {
      id: 'wars-of-unification',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Deutsches Historisches Museum' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'Die im Nachhinein "Einigungskriege" genannten Kriege gegen Dänemark 1864, Österreich 1866 und Frankreich 1870/71 sind in diesem Sinne das Mittel, einen kleindeutschen bzw. großpreußischen Nationalstaat ohne Österreich zu verwirklichen.',
          lang: 'de',
          cite: {
            source: 'lemo-biografie-otto-von-bismarck',
            loc: { section: 'Otto von Bismarck 1815-1898', para: '68' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/biografie/otto-von-bismarck'
          }
        }
      ]
    },
    {
      id: 'french-errors',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Éric Anceau' }
      ],
      statements: [
        {
          id: 'q6',
          text: 'In particular, a succession of errors was made with regard to Bismarck’s Prussia.',
          lang: 'en',
          cite: {
            source: 'ehne-anceau-napoleon-iii-and-europe',
            loc: { section: 'Napoleon III and Europe' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/en/encyclopedia/themes/international-relations/arbiters-and-arbitration-in-europe-beginning-modern-times/napoleon-iii-and-europe'
          }
        },
        {
          id: 'q7',
          text: 'It firstly resulted in allowing Prussia to lash out at Austria in the name of the principle of nationalities, and then—after its resounding victory in Sadowa in July 1866, by which Prussia imposed itself in Germany',
          lang: 'en',
          cite: {
            source: 'ehne-anceau-napoleon-iii-and-europe',
            loc: { section: 'Napoleon III and Europe' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/en/encyclopedia/themes/international-relations/arbiters-and-arbitration-in-europe-beginning-modern-times/napoleon-iii-and-europe'
          }
        }
      ]
    }
  ]
})
