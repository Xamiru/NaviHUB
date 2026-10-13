import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'council-of-trent-assessment',
  about: ['event:council-of-trent'],
  topic: 'significance',
  framing: {
    id: 'q1',
    text: 'Its main object was the definitive determination of the doctrines of the Church in answer to the heresies of the Protestants; a further object was the execution of a thorough reform of the inner life of the Church by removing the numerous abuses that had developed in it.',
    lang: 'en',
    cite: {
      source: 'catholic-encyclopedia-council-of-trent',
      loc: { section: 'Council of Trent', para: '1' }
    },
    provenance: { via: 'web', at: '2026-10-13', url: 'https://www.newadvent.org/cathen/15030c.htm' }
  },
  positions: [
    {
      id: 'the-catholic-encyclopedia',
      category: 'scholarly',
      holders: [
        {
          kind: 'organization',
          name: 'The Catholic Encyclopedia (1913), a Catholic reference work'
        }
      ],
      statements: [
        {
          id: 'q2',
          text: 'The desire for the closing of the council grew stronger among all connected with it, and it was decided to close it as speedily as possible.',
          lang: 'en',
          cite: {
            source: 'catholic-encyclopedia-council-of-trent',
            loc: { section: 'Council of Trent', para: '26' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'https://www.newadvent.org/cathen/15030c.htm' }
        },
        {
          id: 'q3',
          text: 'After the fathers had agreed to lay the decisions before the pope for confirmation, the president, Cardinal Morone, declared the council to be closed.',
          lang: 'en',
          cite: {
            source: 'catholic-encyclopedia-council-of-trent',
            loc: { section: 'Council of Trent', para: '26' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'https://www.newadvent.org/cathen/15030c.htm' }
        }
      ],
      reception: [
        {
          id: 'q4',
          text: 'The resolutions include many that marked an advance; but the opportunity for a comprehensive and thorough reformation of the life of the Church—the necessity of which was recognized in the Catholic Church itself—was not embraced.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-trent-council-of',
            loc: { section: 'Trent, Council of', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Trent,_Council_of'
          }
        }
      ]
    },
    {
      id: 'britannica-1911',
      category: 'scholarly',
      holders: [
        {
          kind: 'organization',
          name: 'Encyclopædia Britannica, 11th edition (article on the Council of Trent)'
        }
      ],
      statements: [
        {
          id: 'q5',
          text: 'Hence came the necessity for reticence, equivocations and temporizing formulae.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-trent-council-of',
            loc: { section: 'Trent, Council of', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Trent,_Council_of'
          }
        },
        {
          id: 'q6',
          text: 'No alteration of the abuses which obtained in the Curia was effected, and no annulment of the customs, so lucrative to that body and deleterious to others, was attempted.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-trent-council-of',
            loc: { section: 'Trent, Council of', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Trent,_Council_of'
          }
        }
      ]
    },
    {
      id: 'protestant-and-counter-reformation-tensions',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Germany: A Country Study' }
      ],
      statements: [
        {
          id: 'q7',
          text: 'Adherents to both Calvinism and Lutheranism worked to spread their influence and gain converts in the face of the Counter-Reformation, the attempt of the Roman Catholic Church to regroup and reverse the spread of Protestantism.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The Counter-Reformation and Religious Tensions', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/germany/16.htm' }
        },
        {
          id: 'q8',
          text: 'An example of the social paranoia engendered by the religious tensions of the period is Protestant Germany\'s refusal until 1700 to accept the Gregorian calendar introduced by the papacy in 1582 because the reform entailed a one-time loss of the days between October 5 and 14.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The Counter-Reformation and Religious Tensions', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/germany/16.htm' }
        }
      ]
    }
  ],
  researched: '2026-10-13'
})
