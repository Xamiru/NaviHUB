import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'reformation-nature',
  about: ['event:reformation', 'person:martin-luther'],
  topic: 'nature',
  framing: {
    id: 'q1',
    text: 'The terms “Reformation” and “Protestantism” are inherited by the modern historian; they are not of his devising, and come to him laden with reminiscences of all the exalted enthusiasms and bitter antipathies engendered by a period of fervid religious dissension.',
    lang: 'en',
    cite: { source: 'britannica-1911-reformation', loc: { section: 'Reformation', para: '1' } },
    provenance: {
      via: 'web',
      at: '2026-10-13',
      url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Reformation'
    }
  },
  positions: [
    {
      id: 'luther-in-his-own-words',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Martin Luther', ref: 'person:martin-luther' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'The true treasure of the Church is the Most Holy Gospel of the glory and the grace of God.',
          lang: 'en',
          cite: {
            source: 'luther-1915-disputation-on-indulgences',
            loc: { section: 'Disputation on Indulgences', para: '62' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/Ninety-Five_Theses'
          }
        },
        {
          id: 'q3',
          text: 'The treasures of the indulgences are nets with which they now fish for the riches of men.',
          lang: 'en',
          cite: {
            source: 'luther-1915-disputation-on-indulgences',
            loc: { section: 'Disputation on Indulgences', para: '66' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/Ninety-Five_Theses'
          }
        }
      ],
      reception: [
        {
          id: 'q4',
          text: 'Although one of the most influential figures in German history, Luther was only one of many who were critical of the Roman Catholic Church.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Martin Luther', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/germany/12.htm' }
        },
        {
          id: 'q5',
          text: 'Luther magnified the inherent potency of his ideas by articulating them in a language that was without rival in clarity and force.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Martin Luther', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/germany/12.htm' }
        }
      ]
    },
    {
      id: 'secular-grievances',
      category: 'scholarly',
      holders: [
        {
          kind: 'organization',
          name: 'Encyclopædia Britannica, 11th edition (article on the Reformation)'
        }
      ],
      statements: [
        {
          id: 'q6',
          text: 'That the religious elements in the Reformation have been greatly overestimated from a modern point of view can hardly be questioned, and one of the most distinguished students of Church history has ventured the assertion that “The motives, both remote and proximate, which led to the Lutheran revolt were largely secular rather than spiritual.”',
          lang: 'en',
          cite: { source: 'britannica-1911-reformation', loc: { section: 'Reformation', para: '4' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Reformation'
          }
        },
        {
          id: 'q7',
          text: 'The Church was not only organized like a modern bureaucracy, but performed many of the functions of a modern State.',
          lang: 'en',
          cite: { source: 'britannica-1911-reformation', loc: { section: 'Reformation', para: '6' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Reformation'
          }
        }
      ]
    },
    {
      id: 'catholic-rehabilitation',
      category: 'scholarly',
      holders: [
        {
          kind: 'organization',
          name: 'Encyclopædia Britannica, 11th edition (article on the Reformation)'
        }
      ],
      statements: [
        {
          id: 'q8',
          text: 'Singularly enough it is the modern Catholic scholars, Johannes Janssen above all, who, in their efforts further to discredit the Protestant revolt by rehabilitating the institutions which the reformers attacked, have done most to explain the success of the Reformation.',
          lang: 'en',
          cite: { source: 'britannica-1911-reformation', loc: { section: 'Reformation', para: '8' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Reformation'
          }
        },
        {
          id: 'q9',
          text: 'It may well be that his picture is too bright, and that in his obvious anxiety to prove the needlessness of an ecclesiastical revolution he has gone to the opposite extreme from the Protestants.',
          lang: 'en',
          cite: { source: 'britannica-1911-reformation', loc: { section: 'Reformation', para: '8' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Reformation'
          }
        }
      ]
    },
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
          id: 'q10',
          text: 'The sober contemplation of the incurable inner wounds of the new Church, the ceaseless quarrels of the preachers, the galling despotism of the temporal rulers, the growing contempt for the clergy, the servility to the princes, made him fairly writhe in anguish.',
          lang: 'en',
          cite: {
            source: 'catholic-encyclopedia-martin-luther',
            loc: { section: 'Martin Luther', para: '142' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'https://www.newadvent.org/cathen/09438b.htm' }
        },
        {
          id: 'q11',
          text: 'Above all the disintegration of moral and social life, the epidemic ravages of vice and immorality, and that in the very cradle of the Reformation, even in his very household, nearly drove him frantic.',
          lang: 'en',
          cite: {
            source: 'catholic-encyclopedia-martin-luther',
            loc: { section: 'Martin Luther', para: '142' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'https://www.newadvent.org/cathen/09438b.htm' }
        }
      ],
      reception: [
        {
          id: 'q12',
          text: 'The Protestant Reformation strengthened the long-standing trend toward particularism in Germany.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The Peace of Augsburg', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/germany/14.htm' }
        },
        {
          id: 'q13',
          text: 'On the eve of the Protestant Reformation, the institutions of the Holy Roman Empire were widely thought to be in need of improvement.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The Protestant Reformation', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/germany/11.htm' }
        }
      ]
    }
  ],
  researched: '2026-10-13'
})
