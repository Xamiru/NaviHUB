import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'battle-of-karnal',
  names: [
    { text: 'Battle of Karnal', lang: 'en', role: 'primary' },
    {
      text: 'Battle of Karnāl',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '24' } }
      ]
    }
  ],
  researched: '2026-10-13',
  type: 'battle',
  start: {
    alts: [
      {
        value: { d: '1739-02-24' },
        cites: [
          {
            source: 'iranica-bonakdarian-india-afsharid-zand-periods',
            loc: { section: 'INDIA vii. RELATIONS: THE AFSHARID AND ZAND PERIODS', para: '7' }
          }
        ]
      }
    ]
  },
  regions: ['south-asia', 'iran'],
  prominence: 3,
  places: [
    {
      ref: 'place:karnal',
      cites: [
        {
          source: 'iranica-bonakdarian-india-afsharid-zand-periods',
          loc: { section: 'INDIA vii. RELATIONS: THE AFSHARID AND ZAND PERIODS', para: '7' }
        }
      ]
    }
  ],
  partOf: [
    {
      ref: 'event:nader-shahs-invasion-of-india',
      cites: [
        {
          source: 'iranica-bonakdarian-india-afsharid-zand-periods',
          loc: { section: 'INDIA vii. RELATIONS: THE AFSHARID AND ZAND PERIODS', para: '7' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'persia',
      name: 'Persians',
      polity: 'polity:afsharid-iran',
      cites: [
        {
          source: 'iranica-bonakdarian-india-afsharid-zand-periods',
          loc: { section: 'INDIA vii. RELATIONS: THE AFSHARID AND ZAND PERIODS', para: '7' }
        }
      ]
    },
    {
      key: 'mughal',
      name: 'Mughals',
      polity: 'polity:mughal-empire',
      cites: [
        {
          source: 'iranica-bonakdarian-india-afsharid-zand-periods',
          loc: { section: 'INDIA vii. RELATIONS: THE AFSHARID AND ZAND PERIODS', para: '7' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:nader-shah',
      role: 'commander',
      side: 'persia',
      cites: [
        {
          source: 'iranica-bonakdarian-india-afsharid-zand-periods',
          loc: { section: 'INDIA vii. RELATIONS: THE AFSHARID AND ZAND PERIODS', para: '7' }
        }
      ]
    },
    {
      name: 'Moḥammad Shah',
      role: 'head-of-state',
      side: 'mughal',
      cites: [
        {
          source: 'iranica-bonakdarian-india-afsharid-zand-periods',
          loc: { section: 'INDIA vii. RELATIONS: THE AFSHARID AND ZAND PERIODS', para: '7' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'deaths',
      side: 'mughal',
      value: {
        alts: [
          {
            value: { min: 10000, qualifier: 'about' },
            cites: [
              {
                source: 'iranica-bonakdarian-india-afsharid-zand-periods',
                loc: { section: 'INDIA vii. RELATIONS: THE AFSHARID AND ZAND PERIODS', para: '7' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Mansour Bonakdarian', discipline: 'historian' }
            ]
          }
        ]
      }
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'On February 24, the decisive battle of Karnal got underway, with the Mughal ruler Moḥammad Shah having reached the city earlier in the month.',
          lang: 'en',
          cite: {
            source: 'iranica-bonakdarian-india-afsharid-zand-periods',
            loc: { section: 'INDIA vii. RELATIONS: THE AFSHARID AND ZAND PERIODS', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/india-vii-relations-the-afsharid-and-zand-periods'
          }
        },
        {
          id: 'q2',
          text: 'The victory on the plain of Karnal, whether accomplished by sheer fighting or the intervention of treachery, was the natural outcome of the previous situation, and the submission of the emperor followed as a matter of course.',
          lang: 'en',
          cite: { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1096' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Persia'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'The superior rapid-firing musket power of the Persian jazāyerčis and the mounted swivel zanburaks assured Nāder’s victory in the battle, with an estimated ten thousand Indians and a much smaller number of Iranian soldiers killed.',
          lang: 'en',
          cite: {
            source: 'iranica-bonakdarian-india-afsharid-zand-periods',
            loc: { section: 'INDIA vii. RELATIONS: THE AFSHARID AND ZAND PERIODS', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/india-vii-relations-the-afsharid-and-zand-periods'
          }
        },
        {
          id: 'q4',
          text: 'Three years later the Persian monarch, Nadir Shah, after defeating the Mogul army at Karnal, entered Delhi in triumph.',
          lang: 'en',
          cite: { source: 'britannica-1911-delhi', loc: { section: 'DELHI', para: '13' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Delhi'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q5',
          text: 'After a successful offensive that culminated in the final defeat of the Mughal forces at the battle of Karnāl near Delhi in February 1739, Nāder made the Mughal emperor Moḥammad Šāh (r. 1719-48) his vassal and divested him of a large part of his fabulous riches, including the Peacock Throne and the Koh-i-Noor diamond.',
          lang: 'en',
          cite: { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '24' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/nader-shah'
          }
        },
        {
          id: 'q6',
          text: 'The next month, Nāder, accompanied by his vanquished “host,” reached the Mughal capital Delhi.',
          lang: 'en',
          cite: {
            source: 'iranica-bonakdarian-india-afsharid-zand-periods',
            loc: { section: 'INDIA vii. RELATIONS: THE AFSHARID AND ZAND PERIODS', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/india-vii-relations-the-afsharid-and-zand-periods'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/63/Battle_of_Karnal.jpg/1280px-Battle_of_Karnal.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Battle_of_Karnal.jpg',
    credit: { institution: 'Victoria and Albert Museum' },
    license: { id: 'public-domain' }
  }
})
