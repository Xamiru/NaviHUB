import { definePeriod } from '../../schema'

export default definePeriod({
  id: 'gran-colombia',
  names: [
    { text: 'Gran Colombia', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  periodType: 'regime',
  start: {
    alts: [
      {
        value: { d: '1819-02' },
        cites: [
          {
            source: 'loc-colombia-country-study-1988',
            loc: { section: 'Gran Colombia', para: '1' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1830' },
        cites: [
          {
            source: 'loc-colombia-country-study-1988',
            loc: { section: 'Gran Colombia', para: '4' }
          }
        ]
      }
    ]
  },
  regions: ['latin-america'],
  prominence: 2,
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'As victory over Spain became increasingly apparent, leaders from present-day Venezuela, Colombia, and Panana convened a congress in February 1819 in Angostura (present-day Ciudad Bolívar, Venezuela) and agreed to unite in a republic to be known as Gran Colombia.',
          lang: 'en',
          cite: {
            source: 'loc-colombia-country-study-1988',
            loc: { section: 'Gran Colombia', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/colombia/13.htm' }
        },
        {
          id: 'q2',
          text: 'In 1821 the Cúcuta Congress wrote a constitution for the new republic.',
          lang: 'en',
          cite: {
            source: 'loc-colombia-country-study-1988',
            loc: { section: 'Gran Colombia', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/colombia/13.htm' }
        },
        {
          id: 'q3',
          text: 'The Cúcuta political arrangement was highly centralized and provided for a government based on popular representation with a bicameral Congress, a president, and a Supreme Court consisting of five magistrates.',
          lang: 'en',
          cite: {
            source: 'loc-colombia-country-study-1988',
            loc: { section: 'Gran Colombia', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/colombia/13.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'In the meantime, the Bolivarian dream of Gran Colombia was proving to be politically unworkable.',
          lang: 'en',
          cite: {
            source: 'loc-venezuela-country-study-1990',
            loc: { section: 'The Epic of Independence', para: '9' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/venezuela/4.htm' }
        },
        {
          id: 'q5',
          text: 'Nonetheless, political rivalries and regional jealousies progressively weakened the authority of the new central state.',
          lang: 'en',
          cite: {
            source: 'loc-colombia-country-study-1988',
            loc: { section: 'Gran Colombia', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/colombia/13.htm' }
        },
        {
          id: 'q6',
          text: 'In 1826 General José Antonio Páez led a Venezuelan revolt against Gran Colombia.',
          lang: 'en',
          cite: {
            source: 'loc-colombia-country-study-1988',
            loc: { section: 'Gran Colombia', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/colombia/13.htm' }
        },
        {
          id: 'q7',
          text: 'In August 1828, Bolívar assumed dictatorial powers and attempted to install a constitution that he had developed for Bolivia and Peru. Unpopular with a large portion of the New Grenadine populace, this constitution called for increased central authority and a president-for-life who could also name his own successor.',
          lang: 'en',
          cite: {
            source: 'loc-colombia-country-study-1988',
            loc: { section: 'Gran Colombia', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/colombia/13.htm' }
        },
        {
          id: 'q8',
          text: 'Even the tremendous prestige of Bolívar could not overcome the historical reality of nationalism, and in 1829 Páez led Venezuela in its separation from Gran Colombia.',
          lang: 'en',
          cite: {
            source: 'loc-venezuela-country-study-1990',
            loc: { section: 'The Epic of Independence', para: '10' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/venezuela/4.htm' }
        },
        {
          id: 'q9',
          text: 'That same year, the divisive forces at work within the republic achieved a major triumph as the Venezuelan and Ecuadorian portions of the republic seceded.',
          lang: 'en',
          cite: {
            source: 'loc-colombia-country-study-1988',
            loc: { section: 'Gran Colombia', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/colombia/13.htm' }
        }
      ]
    }
  ]
})
