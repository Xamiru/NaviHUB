import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'meiji-constitution',
  names: [
    { text: 'Meiji Constitution', lang: 'en', role: 'primary' },
    {
      text: 'Constitution of the Empire of Japan',
      lang: 'en',
      role: 'official',
      cites: [
        {
          source: 'constitution-of-japan-1889-official-translation',
          loc: { section: 'The Constitution of Japan' }
        }
      ]
    },
    { text: '大日本帝國憲法', lang: 'ja', role: 'native' }
  ],
  researched: '2026-10-07',
  type: 'law',
  start: {
    alts: [
      {
        value: { d: '1889-02-11' },
        cites: [
          { source: 'lemo-chronik-1889', loc: { section: 'Chronik 1889', para: '13' } },
          { source: 'lemo-chronik-1889', loc: { section: 'Chronik 1889', para: '14' } }
        ]
      }
    ]
  },
  regions: ['east-asia'],
  prominence: 2,
  partOf: [
    { ref: 'period:meiji-era' }
  ],
  participants: [
    {
      ref: 'person:emperor-meiji',
      role: 'head-of-state',
      cites: [
        { source: 'lemo-chronik-1889', loc: { section: 'Chronik 1889', para: '14' } }
      ]
    },
    {
      ref: 'person:ito-hirobumi',
      role: 'leader',
      cites: [
        {
          source: 'loc-japan-country-study-1994',
          loc: { section: 'The Development of Representative Government', para: '5' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q2',
          text: 'When finally granted by the emperor as a sign of his sharing his authority and giving rights and liberties to his subjects, the 1889 Constitution of the Empire of Japan (the Meiji Constitution) provided for the Imperial Diet (Teikoku Gikai), composed of a popularly elected House of Representatives with a very limited franchise of male citizens who paid ¥15 in national taxes, about 1 percent of the population; the House of Peers, composed of nobility and imperial appointees; and a cabinet responsible to the emperor and independent of the legislature.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'The Development of Representative Government', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/japan/25.htm' }
        },
        {
          id: 'q1',
          text: 'Mit Verkündung der Verfassung durch Kaiser Mutsuhito (1852-1912) wird Japan konstitutionelle Monarchie.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1889', loc: { section: 'Chronik 1889', para: '14' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1889.html'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'He called for elections to be held by 1882 and for a national assembly to be convened by 1883; in doing so, he precipitated a political crisis that ended with an 1881 imperial rescript declaring the establishment of a national assembly in 1890 and dismissing Okuma.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'The Development of Representative Government', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/japan/25.htm' }
        },
        {
          id: 'q4',
          text: 'Rejecting the British model, Iwakura and other conservatives borrowed heavily from the Prussian constitutional system.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'The Development of Representative Government', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/japan/25.htm' }
        },
        {
          id: 'q5',
          text: 'In their place, the Privy Council was established in 1888 to evaluate the forthcoming constitution and to advise the emperor.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'The Development of Representative Government', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/japan/25.htm' }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q6',
          text: 'Whereas, We make it the joy and glory of Our heart to behold the prosperity of Our country, and they welfare of Our subjects, We do hereby, in virtue of the supreme power We inherit from Our Imperial Ancestors, promulgate the present immutable fundamental law, for the sake of Our present subjects and their descendants.',
          lang: 'en',
          cite: {
            source: 'constitution-of-japan-1889-official-translation',
            loc: { section: 'The Constitution of Japan' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/The_Constitution_of_Japan:_With_the_Laws_Appertaining_Thereto,_and_the_Imperial_Oath_and_Speech/Part_1'
          }
        },
        {
          id: 'q7',
          text: 'Article I.—The Empire of Japan shall be reigned over and governed by a line of Emperors unbroken for ages eternal.',
          lang: 'en',
          cite: {
            source: 'constitution-of-japan-1889-official-translation',
            loc: { section: 'The Constitution of Japan' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/The_Constitution_of_Japan:_With_the_Laws_Appertaining_Thereto,_and_the_Imperial_Oath_and_Speech/Part_1'
          }
        },
        {
          id: 'q8',
          text: 'Article IV.—The Emperor is the head of the Empire, combining in Himself the rights of sovereignty, and exercises them according to the provisions of the present Constitution.',
          lang: 'en',
          cite: {
            source: 'constitution-of-japan-1889-official-translation',
            loc: { section: 'The Constitution of Japan' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/The_Constitution_of_Japan:_With_the_Laws_Appertaining_Thereto,_and_the_Imperial_Oath_and_Speech/Part_1'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q9',
          text: 'Nevertheless, in spite of these institutional changes, sovereignty still resided in the emperor on the basis of his divine ancestry.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'The Development of Representative Government', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/japan/25.htm' }
        },
        {
          id: 'q10',
          text: 'The first national election was held in 1890, and 300 members were elected to the House of Representatives.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'The Development of Representative Government', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/japan/25.htm' }
        },
        {
          id: 'q11',
          text: 'The Meiji Constitution was to last as the fundamental law until 1947.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'The Development of Representative Government', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/japan/25.htm' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/59/Illustration_of_the_Ceremony_for_the_Promulgation_of_the_Constitution_of_Great_Japan.jpg/1280px-Illustration_of_the_Ceremony_for_the_Promulgation_of_the_Constitution_of_Great_Japan.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Illustration_of_the_Ceremony_for_the_Promulgation_of_the_Constitution_of_Great_Japan.jpg',
    credit: { institution: 'Museum of Fine Arts, Boston', creator: 'Utagawa Kunisada III' },
    license: { id: 'public-domain' }
  },
  archive: [
    {
      id: 'ito-commentaries-on-the-constitution-1906',
      mediaKind: 'document',
      title: 'Commentaries on the constitution of the empire of Japan',
      date: { d: '1906' },
      url: 'https://archive.org/download/commentariesonco00itohuoft/commentariesonco00itohuoft.pdf',
      page: 'https://archive.org/details/commentariesonco00itohuoft',
      credit: { institution: 'University of Toronto (Internet Archive)', creator: 'Hirobumi Ito' },
      license: { id: 'public-domain' },
      bytes: 15078675
    }
  ]
})
