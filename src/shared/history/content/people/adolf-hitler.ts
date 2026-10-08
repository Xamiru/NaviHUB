import { definePerson } from '../../schema'

export default definePerson({
  id: 'adolf-hitler',
  names: [
    { text: 'Adolf Hitler', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-07',
  born: {
    alts: [
      {
        value: { d: '1889-04-20' },
        cites: [
          {
            source: 'lemo-biografie-adolf-hitler',
            loc: { section: 'Adolf Hitler 1889-1945', para: '2' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  roles: ['politician'],
  offices: [
    {
      title: 'leader of the NSDAP',
      start: {
        alts: [
          {
            value: { d: '1921-07-29' },
            cites: [
              {
                source: 'lemo-biografie-adolf-hitler',
                loc: { section: 'Adolf Hitler 1889-1945', para: '33' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'lemo-biografie-adolf-hitler',
          loc: { section: 'Adolf Hitler 1889-1945', para: '33' }
        },
        {
          source: 'loc-germany-country-study-1995',
          loc: { section: 'Hitler and the Rise of National Socialism', para: '1' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q1',
          text: 'Adolf Hitler was born in the Austrian border town of Braunau am Inn in 1889. When he was seventeen, he was refused admission to the Vienna Art Academy, having been found insufficiently talented. He remained in Vienna, however, where he led a bohemian existence, acquiring an ideology based on belief in a German master race that was threatened by an international Jewish conspiracy responsible for many of the world\'s problems.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Hitler and the Rise of National Socialism', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/38.htm' }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'Hitler remained in Vienna until 1913, when he moved to Munich. After serving with bravery in the German army during World War I, he joined the right-wing Bavarian German Workers\' Party in 1919. The following year, the party changed its name to the National Socialist German Workers\' Party (National-Sozialistische Deutsche Arbeiterpartei--NSDAP). Its members were known as Nazis, a term derived from the German pronunciation of "National." In 1921 Hitler assumed leadership of the NSDAP.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Hitler and the Rise of National Socialism', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/germany/38.htm' }
        },
        {
          id: 'q5',
          text: 'General Ludendorff supported the former corporal in the Beer Hall Putsch of November 1923 in Munich, an attempt to overthrow the Bavarian government. The putsch failed, and Hitler received a light sentence of five years, of which he served less than one.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Hitler and the Rise of National Socialism', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/germany/38.htm' }
        },
        {
          id: 'q4',
          text: 'After the failure of the putsch, Hitler turned to "legal revolution" as the means to power and chose two parallel paths to take the Nazis to that goal. First, the NSDAP would employ propaganda to create a national mass party capable of coming to power through electoral successes.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Hitler and the Rise of National Socialism', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/38.htm' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/32/Bundesarchiv_Bild_183-S33882%2C_Adolf_Hitler.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Bundesarchiv_Bild_183-S33882,_Adolf_Hitler.jpg',
    credit: { institution: 'Bundesarchiv' },
    license: {
      id: 'cc-by-sa',
      version: '3.0 de',
      url: 'https://creativecommons.org/licenses/by-sa/3.0/de/deed.en'
    }
  }
})
