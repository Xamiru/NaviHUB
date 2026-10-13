import { definePerson } from '../../schema'

export default definePerson({
  id: 'tahmasp-ii',
  names: [
    { text: 'Tahmasp II', lang: 'en', role: 'primary' },
    { text: 'شاه طهماسب دوم', lang: 'fa', role: 'native' },
    {
      text: 'Ṭahmāsb II',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '3' } }
      ]
    },
    {
      text: 'Tahmasp II, Shah of Iran',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'lc-names-n78069638', loc: { section: 'Tahmasp II, Shah of Iran, -1743' } }
      ]
    }
  ],
  researched: '2026-10-13',
  died: {
    alts: [
      {
        value: { d: '1743' },
        cites: [
          { source: 'lc-names-n78069638', loc: { section: 'Tahmasp II, Shah of Iran, -1743' } }
        ],
        heldBy: [
          { kind: 'organization', name: 'Library of Congress' }
        ]
      },
      {
        value: { d: '1739', approx: true },
        cites: [
          { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '23' } }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Ernest Tucker', discipline: 'historian' }
        ]
      }
    ]
  },
  regions: ['iran'],
  roles: ['monarch'],
  offices: [
    {
      title: 'Shah of Iran',
      polity: 'polity:safavid-iran',
      start: {
        alts: [
          {
            value: { d: '1722' },
            cites: [
              {
                source: 'iranica-tucker-nader-shah',
                loc: { section: 'NĀDER SHAH', para: '3' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1732-08' },
            cites: [
              {
                source: 'iranica-tucker-nader-shah',
                loc: { section: 'NĀDER SHAH', para: '9' }
              }
            ]
          }
        ]
      },
      cites: [
        { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '3' } },
        { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '9' } }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/c/c6/Gold_coin_of_Tahmasp_II%2C_minted_in_Isfahan.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Gold_coin_of_Tahmasp_II,_minted_in_Isfahan.jpg',
    credit: { institution: 'Classical Numismatic Group' },
    license: { id: 'cc-by-sa', version: '2.5', url: 'https://creativecommons.org/licenses/by-sa/2.5' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'One was Solṭān Ḥosayn’s son Ṭahmāsb, who escaped to Qazvin, where he was proclaimed Shah Ṭahmāsb II.',
          lang: 'en',
          cite: { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '3' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/nader-shah'
          }
        },
        {
          id: 'q2',
          text: 'The elimination of these manipulators of the popular resentment left the field clear for Sultan Ḥosayn’s only surviving son Ṭahmāsp, who was then a refugee in Māzandarān.',
          lang: 'en',
          cite: {
            source: 'iranica-balland-asraf-gilzay',
            loc: { section: 'AŠRAF ḠILZAY', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/asraf-gilzay-the-afghan-chief-who-ruled-as-shah-over-part-of-iran-from-1137-1725-to-1142-1729'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q3',
          text: 'As time passed, Ṭahmāsp emerged as the only serious rival to Ašraf, and all the more so when he won the allegiance of several chiefs of the two strongest Turkish groups in northeastern Iran, the Qāǰār and the Afšār tribes.',
          lang: 'en',
          cite: {
            source: 'iranica-balland-asraf-gilzay',
            loc: { section: 'AŠRAF ḠILZAY', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/asraf-gilzay-the-afghan-chief-who-ruled-as-shah-over-part-of-iran-from-1137-1725-to-1142-1729'
          }
        },
        {
          id: 'q4',
          text: 'With this promotion, Nāder assumed the title Ṭahmāsb-qoli (servant of Ṭahmāsb).',
          lang: 'en',
          cite: { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '6' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/nader-shah'
          }
        },
        {
          id: 'q5',
          text: 'Two years later, while Nāder was busy driving the remnants of Afghan forces back to their homeland, Ṭahmāsp II launched a campaign against the Ottomans that ended in his defeat',
          lang: 'en',
          cite: {
            source: 'iranica-tucker-ottoman-persian-relations-afsharid-zand',
            loc: { section: 'OTTOMAN-PERSIAN RELATIONS ii. AFSHARID AND ZAND PERIODS', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/ottoman-persian-relations-ii'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q6',
          text: 'While his father was away, Reżā-qoli feared a pro-Safavid revolt and had Moḥammad Ḥasan (the leader of the Qajars between 1726 and 1759) execute Ṭahmāsb and his sons.',
          lang: 'en',
          cite: { source: 'iranica-tucker-nader-shah', loc: { section: 'NĀDER SHAH', para: '23' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/nader-shah'
          }
        },
        {
          id: 'q7',
          text: 'On pretext of incapacity, he dethroned Ṭahmasp II. in 1732, and sent him a prisoner into Khorasan, where he was murdered some years afterwards by Nadir’s son while the conqueror was absent on his Indian expedition.',
          lang: 'en',
          cite: { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1088' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Persia'
          }
        }
      ]
    }
  ]
})
