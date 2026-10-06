import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'sinking-of-the-titanic',
  names: [
    { text: 'Sinking of the Titanic', lang: 'en', role: 'primary' },
    {
      text: '“Titanic” Disaster, 1912',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'britannica-1922-titanic-disaster',
          loc: { section: '“Titanic” Disaster, 1912', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  type: 'disaster',
  start: {
    alts: [
      {
        value: { d: '1912-04-15' },
        cites: [
          {
            source: 'britannica-1922-titanic-disaster',
            loc: { section: '“Titanic” Disaster, 1912', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['north-america', 'europe', 'global'],
  prominence: 2,
  places: [
    {
      ref: 'place:north-atlantic-ocean',
      cites: [
        {
          source: 'britannica-1922-titanic-disaster',
          loc: { section: '“Titanic” Disaster, 1912', para: '1' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'deaths',
      value: {
        alts: [
          {
            value: { min: 1513 },
            cites: [
              {
                source: 'britannica-1922-titanic-disaster',
                loc: { section: '“Titanic” Disaster, 1912', para: '1' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'British Wreck Commissioner (Lord Mersey)' },
              { kind: 'organization', name: 'Encyclopædia Britannica' }
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
          text: '“TITANIC” DISASTER, 1912. — No single event in 1912 could compare, in the intensity of its universal appeal to human emotion, with the awful disaster to the British steamship “Titanic.” At 2:20 A.M. on April 15, that great White Star liner, the largest afloat, on her maiden voyage, went to the bottom of the Atlantic in lat. 41º 46\' N., long. 50º 14\' W., about 2¾ h. after striking at full speed on an iceberg, with a loss of 1,513 souls out of 2,224 on board.',
          lang: 'en',
          cite: {
            source: 'britannica-1922-titanic-disaster',
            loc: { section: '“Titanic” Disaster, 1912', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/1922_Encyclop%C3%A6dia_Britannica/%E2%80%9CTitanic%E2%80%9D_Disaster,_1912'
          }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q2',
          text: 'The exact figures remained doubtful, but those given are from Lord Mersey\'s report.',
          lang: 'en',
          cite: {
            source: 'britannica-1922-titanic-disaster',
            loc: { section: '“Titanic” Disaster, 1912', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/1922_Encyclop%C3%A6dia_Britannica/%E2%80%9CTitanic%E2%80%9D_Disaster,_1912'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q3',
          text: 'It had been supposed that such a vessel was unsinkable, and the tragedy raised numerous questions as to methods of ship construction, and additional provision of life-saving equipment.',
          lang: 'en',
          cite: {
            source: 'britannica-1922-titanic-disaster',
            loc: { section: '“Titanic” Disaster, 1912', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/1922_Encyclop%C3%A6dia_Britannica/%E2%80%9CTitanic%E2%80%9D_Disaster,_1912'
          }
        },
        {
          id: 'q4',
          text: 'The “Titanic” had nominally boat accommodation for double the number saved, and the 20 boats launched were meant to hold 1,178 persons instead of the 652 they actually contained when they left the ship; moreover, the disaster occurred under exceptional conditions for getting people safely off, in the way of smooth water and fine weather.',
          lang: 'en',
          cite: {
            source: 'britannica-1922-titanic-disaster',
            loc: { section: '“Titanic” Disaster, 1912', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/1922_Encyclop%C3%A6dia_Britannica/%E2%80%9CTitanic%E2%80%9D_Disaster,_1912'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q5',
          text: 'Apart from the “Californian\'s” wireless operator having gone to bed, however, Lord Mersey was satisfied that if her captain had realized the situation properly she could have saved “many, if not all, of the lives that were lost”; for evidence showed that distress rockets sent up on the “Titanic” were actually seen from the “Californian,” though no action was taken in response to them. The incredibility of such a disaster appears, in that case, to have paralysed the capacity for interference.',
          lang: 'en',
          cite: {
            source: 'britannica-1922-titanic-disaster',
            loc: { section: '“Titanic” Disaster, 1912', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/1922_Encyclop%C3%A6dia_Britannica/%E2%80%9CTitanic%E2%80%9D_Disaster,_1912'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/23/LuxuriesVersusLifeboatsPuckMagazine1912.jpg/1280px-LuxuriesVersusLifeboatsPuckMagazine1912.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:LuxuriesVersusLifeboatsPuckMagazine1912.jpg',
    credit: { institution: 'Library of Congress', creator: 'Udo J. Keppler' },
    license: { id: 'public-domain' }
  }
})
