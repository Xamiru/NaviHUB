import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'assassination-of-alexander-ii',
  names: [
    { text: 'Assassination of Alexander II', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  type: 'assassination',
  start: {
    alts: [
      {
        value: { d: '1881-03-13', julian: true },
        cites: [
          {
            source: 'frus-1881-foster-to-blaine-assassination-of-alexander-ii',
            loc: {
              section: 'Document 613: Mr. Foster to Mr. Blaine, St. Petersburg, March 14, 1881'
            }
          },
          {
            source: 'frus-1881-foster-to-blaine-assassination-of-alexander-ii',
            loc: {
              section: 'Document 613: Mr. Foster to Mr. Blaine, St. Petersburg, March 14, 1881'
            }
          },
          {
            source: 'frus-1881-foster-to-blaine-assassination-of-alexander-ii',
            loc: {
              section: 'Document 613: Mr. Foster to Mr. Blaine, St. Petersburg, March 14, 1881'
            }
          },
          { source: 'lemo-chronik-1881', loc: { section: 'Chronik 1881', para: '18' } },
          { source: 'lemo-chronik-1881', loc: { section: 'Chronik 1881', para: '19' } }
        ]
      }
    ]
  },
  regions: ['russia-central-asia', 'europe'],
  prominence: 1,
  places: [
    {
      ref: 'place:saint-petersburg',
      cites: [
        {
          source: 'frus-1881-foster-to-blaine-assassination-of-alexander-ii',
          loc: { section: 'Document 613: Mr. Foster to Mr. Blaine, St. Petersburg, March 14, 1881' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:reign-of-alexander-ii' }
  ],
  related: [
    {
      ref: 'period:reign-of-alexander-iii',
      rel: 'led-to',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '13' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:alexander-ii-of-russia',
      role: 'victim',
      cites: [
        {
          source: 'frus-1881-foster-to-blaine-assassination-of-alexander-ii',
          loc: { section: 'Document 613: Mr. Foster to Mr. Blaine, St. Petersburg, March 14, 1881' }
        }
      ]
    },
    {
      name: 'People\'s Will (Narodnaya volya)',
      role: 'perpetrator',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '24' }
        }
      ]
    },
    {
      ref: 'person:alexander-iii-of-russia',
      role: 'head-of-state',
      cites: [
        {
          source: 'frus-1881-foster-to-blaine-assassination-of-alexander-ii',
          loc: { section: 'Document 613: Mr. Foster to Mr. Blaine, St. Petersburg, March 14, 1881' }
        }
      ]
    },
    {
      name: 'John W. Foster',
      role: 'witness',
      cites: [
        {
          source: 'frus-1881-foster-to-blaine-assassination-of-alexander-ii',
          loc: { section: 'Document 613: Mr. Foster to Mr. Blaine, St. Petersburg, March 14, 1881' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'In 1881 revolutionaries assassinated Alexander II.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '13' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/6.htm' }
        },
        {
          id: 'q2',
          text: 'Der russische Zar Alexander II. (1818-1881) kommt in St. Petersburg bei einem von der Gruppe Narodnaja Wolja ("Volkswille") verübten Bombenattentat ums Leben.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1881', loc: { section: 'Chronik 1881', para: '19' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1881.html'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'This orientation became stronger three years later, when the group renamed itself the People\'s Will (Narodnaya volya), the name under which the radicals were responsible for the assassination of Alexander II in 1881.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '24' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/6.htm' }
        },
        {
          id: 'q4',
          text: 'Finally he decided in favour of the latter course, and on the very day of his death he signed a ukaz, creating a number of consultative commissions which might have been easily transformed into an assembly of notables.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-alexander-iii-tsar',
            loc: { section: 'ALEXANDER III. (tsar)', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Alexander_III._(tsar)'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'Emperor wounded in carriage to-day by bomb. Extent injury not yet known.',
          lang: 'en',
          cite: {
            source: 'frus-1881-foster-to-blaine-assassination-of-alexander-ii',
            loc: {
              section: 'Document 613: Mr. Foster to Mr. Blaine, St. Petersburg, March 14, 1881'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/historicaldocuments/frus1881/d617'
          }
        },
        {
          id: 'q6',
          text: 'Just before crossing the stable bridge of the Catharine Canal, at 1.45 p.m., a hand-bomb was thrown by a young man, dressed in the garb of a street-cleaner, directly under the Emperor’s carriage, shattering in its explosion the rear of the vehicle, but without injuring the Emperor. His Majesty jumped from the carriage, and while the guards were arresting the assailant a second bomb, thrown by another person, was exploded at the feet of the Emperor, shattering both his legs below the knees and inflicting other serious wounds on his person. He was placed in the sleigh of the military officer who accompanied him and driven immediately to the Winter Palace. The loss of blood was so great and the wounds so severe that he expired at 3.35 p.m., within less than two hours after this explosion.',
          lang: 'en',
          cite: {
            source: 'frus-1881-foster-to-blaine-assassination-of-alexander-ii',
            loc: {
              section: 'Document 613: Mr. Foster to Mr. Blaine, St. Petersburg, March 14, 1881'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/historicaldocuments/frus1881/d617'
          }
        },
        {
          id: 'q7',
          text: 'It is understood that one Cossack of the Emperor’s guard was killed, and one officer and a number of soldiers and civilians (variously estimated) were wounded by the explosion. The two authors of the assassination are believed to have been arrested.',
          lang: 'en',
          cite: {
            source: 'frus-1881-foster-to-blaine-assassination-of-alexander-ii',
            loc: {
              section: 'Document 613: Mr. Foster to Mr. Blaine, St. Petersburg, March 14, 1881'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/historicaldocuments/frus1881/d617'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q8',
          text: 'At a late hour last night the Czarevitch, the heir apparent, assumed the supreme power of the empire as Alexander III, and his proclamation of ascension of the throne, of which I inclose herewith a translation, was published this morning.',
          lang: 'en',
          cite: {
            source: 'frus-1881-foster-to-blaine-assassination-of-alexander-ii',
            loc: {
              section: 'Document 613: Mr. Foster to Mr. Blaine, St. Petersburg, March 14, 1881'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/historicaldocuments/frus1881/d617'
          }
        },
        {
          id: 'q9',
          text: 'He fell under the sacrilegious hand of assassins who had already many times placed his precious life in peril.',
          lang: 'en',
          cite: {
            source: 'frus-1881-foster-to-blaine-assassination-of-alexander-ii',
            loc: {
              section: 'Document 613: Mr. Foster to Mr. Blaine, St. Petersburg, March 14, 1881'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/historicaldocuments/frus1881/d617'
          }
        },
        {
          id: 'q10',
          text: 'He at once cancelled the ukaz before it was published,',
          lang: 'en',
          cite: {
            source: 'britannica-1911-alexander-iii-tsar',
            loc: { section: 'ALEXANDER III. (tsar)', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Alexander_III._(tsar)'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b2/Konstantin_Makovsky_Alexander_II_na_smertnom_odre_1881.jpg/1280px-Konstantin_Makovsky_Alexander_II_na_smertnom_odre_1881.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Konstantin_Makovsky_Alexander_II_na_smertnom_odre_1881.jpg',
    credit: { institution: 'State Tretyakov Gallery', creator: 'Konstantin Makovsky' },
    license: { id: 'public-domain' }
  }
})
