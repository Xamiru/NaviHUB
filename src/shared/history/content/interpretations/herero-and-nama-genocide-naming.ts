import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'herero-and-nama-genocide-naming',
  about: ['event:herero-and-nama-genocide'],
  topic: 'naming',
  researched: '2026-10-09',
  positions: [
    {
      id: 'germany-2021',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Germany' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'We will now officially call these events what they are from today’s perspective: a genocide.',
          lang: 'en',
          cite: {
            source: 'german-foreign-office-namibia-2021',
            loc: {
              section: 'Foreign Minister Maas on the conclusion of negotiations with Namibia',
              para: '4'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.auswaertiges-amt.de/en/newsroom/news/-/2463598'
          }
        }
      ],
      reception: [
        {
          id: 'q4',
          text: 'Words themselves are striking, for after exterminating the large majority of Herero, colonial authorities imprisoned the survivors in “concentration camps.”',
          lang: 'en',
          cite: {
            source: 'ehne-patin-herero-and-nama',
            loc: {
              section: 'The massacre of the Herero and Nama: A colonial laboratory for genocide?',
              para: '20'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://ehne.fr/en/encyclopedia/themes/europe-europeans-and-world/europe-and-colonial-wars/massacre-herero-and-nama-a-colonial-laboratory-genocide'
          }
        }
      ]
    },
    {
      id: 'first-genocide',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Nicolas Patin', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q2',
          text: '“Containing the indigenous”? This project directly led to the total military extermination of the Herero people, and to the first genocide of the twentieth century.',
          lang: 'en',
          cite: {
            source: 'ehne-patin-herero-and-nama',
            loc: { section: 'The first genocide of the twentieth century', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/en/encyclopedia/themes/europe-europeans-and-world/europe-and-colonial-wars/massacre-herero-and-nama-a-colonial-laboratory-genocide'
          }
        },
        {
          id: 'q3',
          text: 'The massacre of the Herero and the Nama has recently been considered the first genocide of the twentieth century, before that of the Armenians. It also featured one of the grim modus operandi of the genocide from 1915, namely long marches through the desert leading to the death of an entire population. Women and children were exterminated by German soldiers as part of a coordinated undertaking; the unequivocal order from Von Trotha left no doubt as to the ultimate goal of this colonial policy: the complete disappearance of the Herero.',
          lang: 'en',
          cite: {
            source: 'ehne-patin-herero-and-nama',
            loc: { section: 'A German “special path”?', para: '19' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://ehne.fr/en/encyclopedia/themes/europe-europeans-and-world/europe-and-colonial-wars/massacre-herero-and-nama-a-colonial-laboratory-genocide'
          }
        }
      ]
    }
  ]
})
