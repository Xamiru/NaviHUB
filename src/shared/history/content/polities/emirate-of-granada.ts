import { definePolity } from '../../schema'

export default definePolity({
  id: 'emirate-of-granada',
  names: [
    { text: 'Emirate of Granada', lang: 'en', role: 'primary' },
    {
      text: 'Kingdom of Granada',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-1492-mediterranean-world',
          loc: { section: 'The Mediterranean World', para: '7' }
        }
      ]
    },
    {
      text: 'Nasrid dynasty',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'britannica-1911-granada-city',
          loc: { section: 'Granada (city)', para: '6' }
        }
      ]
    }
  ],
  researched: '2026-10-16',
  polityType: 'emirate',
  start: {
    alts: [
      {
        value: { d: '1238' },
        cites: [
          {
            source: 'britannica-1911-granada-city',
            loc: { section: 'Granada (city)', para: '6' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1492' },
        cites: [
          {
            source: 'britannica-1911-granada-city',
            loc: { section: 'Granada (city)', para: '6' }
          },
          {
            source: 'loc-spain-country-study-1988',
            loc: { section: 'THE GOLDEN AGE', para: '4' }
          }
        ]
      }
    ]
  },
  regions: ['europe', 'mena'],
  prominence: 2,
  capitals: [
    {
      ref: 'place:granada',
      cites: [
        {
          source: 'britannica-1911-granada-city',
          loc: { section: 'Granada (city)', para: '6' }
        }
      ]
    }
  ],
  cshapes: [
    { set: 'early', code: 238445 }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'From 1229 to 1238 Granada formed part of the kingdom of Murcia; but in the last-named year it passed into the hands of Abu Abdullah Mahommed Ibn Al Ahmar, prince of Jaen and founder of the dynasty of the Nasrides.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-granada-city',
            loc: { section: 'Granada (city)', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Granada_(city)'
          }
        },
        {
          id: 'q2',
          text: 'In the very year of Columbus\' first voyage, the monarchs conquered the last Muslim kingdom of Granada and expelled all Jews who refused to convert to Christianity.',
          lang: 'en',
          cite: {
            source: 'loc-1492-mediterranean-world',
            loc: { section: 'The Mediterranean World', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.loc.gov/exhibits/1492/mediterr.html'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'A crisis arose in 1462, when an endeavour to control the Abencerrages resulted in the dethronement of Abu Nasr Saad, and the accession of his son, Muley Abu’l Hassan, whose name is preserved in that of Mulhacen, the loftiest peak of the Sierra Nevada, and in a score of legends.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-granada-city',
            loc: { section: 'Granada (city)', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Granada_(city)'
          }
        },
        {
          id: 'q4',
          text: 'Their encouragement of commerce—notably the silk trade with Italy—rendered Granada the wealthiest of Spanish cities; their patronage of art, literature and science attracted many learned Moslems, such as the historian Ibn Khaldun and the geographer Ibn Batuta, to their court, and resulted in a brilliant civilization, of which the Alhambra is the supreme monument.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-granada-city',
            loc: { section: 'Granada (city)', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Granada_(city)'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'Immediately after the expulsion of the Moors in 1492, their conquerors began, by successive acts of vandalism, to spoil the marvellous beauty of the Alhambra.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-alhambra-the',
            loc: { section: 'Alhambra, The', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Alhambra,_The'
          }
        },
        {
          id: 'q6',
          text: 'The expulsion of the Moors from Granada was contemporaneous with the discovery of the New World.',
          lang: 'en',
          cite: { source: 'britannica-1911-spain', loc: { section: 'SPAIN', para: '549' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Spain'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/34/Emirate_of_Granada.svg',
    page: 'https://commons.wikimedia.org/wiki/File:Emirate_of_Granada.svg',
    credit: { creator: 'Amitchell125' },
    license: { id: 'cc-by-sa', version: '4.0', url: 'https://creativecommons.org/licenses/by-sa/4.0' }
  }
})
