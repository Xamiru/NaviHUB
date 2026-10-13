import { definePeriod } from '../../schema'

export default definePeriod({
  id: 'zand-period',
  names: [
    { text: 'Zand period', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-13',
  periodType: 'dynasty',
  start: {
    alts: [
      {
        value: { d: '1751' },
        cites: [
          { source: 'iranica-perry-zand-dynasty', loc: { section: 'ZAND DYNASTY', para: '1' } }
        ],
        heldBy: [
          { kind: 'scholar', name: 'John R. Perry', discipline: 'historian' }
        ]
      },
      {
        value: { d: '1750' },
        cites: [
          {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE SAFAVIDS, 1501-1722', para: '9' }
          }
        ],
        heldBy: [
          { kind: 'organization', name: 'Library of Congress' }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1794' },
        cites: [
          {
            source: 'iranica-perry-zand-dynasty',
            loc: { section: 'ZAND DYNASTY', para: '10' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 2,
  parent: 'polity:zand-iran',
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Finally Karim Khan Zand (1750-79) was able to defeat his rivals and to unify the country, except for Khorasan, under a loose form of central control.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE SAFAVIDS, 1501-1722', para: '9' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/iran/11.htm' }
        },
        {
          id: 'q2',
          text: 'Karim Khan did not attempt to recover the Afsharid Khorasan which became a tributary of the Afghan monarch Aḥmad-Šāh Dorrāni (r. 1747-73; see AFGHANISTAN x).',
          lang: 'en',
          cite: { source: 'iranica-perry-zand-dynasty', loc: { section: 'ZAND DYNASTY', para: '3' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/zand-dynasty'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'Karim Khan, who had meanwhile returned to Isfahan in January 1751 with an augmented army, sought out and defeated his rival in Baḵtiāri country.',
          lang: 'en',
          cite: {
            source: 'iranica-perry-karim-khan-zand',
            loc: { section: 'KARIM KHAN ZAND', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/karim-khan-zand'
          }
        },
        {
          id: 'q4',
          text: 'Karim Khan then advanced into Azarbaijan, successively defeating the Afšār and Donboli forces and taking Tabriz and Urmia in February 1763.',
          lang: 'en',
          cite: {
            source: 'iranica-perry-karim-khan-zand',
            loc: { section: 'KARIM KHAN ZAND', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/karim-khan-zand'
          }
        },
        {
          id: 'q5',
          text: 'ʿAli-Morād Khan (r. 1781-85) was faced with a resurgence of Qajar power and established his capital strategically at Isfahan.',
          lang: 'en',
          cite: { source: 'iranica-perry-zand-dynasty', loc: { section: 'ZAND DYNASTY', para: '7' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/zand-dynasty'
          }
        },
        {
          id: 'q6',
          text: 'Loṭf-ʿAli Khan surprised Kerman in 1794 and held it for four months before the Qajars were admitted by treachery.',
          lang: 'en',
          cite: {
            source: 'iranica-perry-zand-dynasty',
            loc: { section: 'ZAND DYNASTY', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/zand-dynasty'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q7',
          text: 'The dynasty’s reputation rests on its founder Karim Khan, who was able not only to weld together an army from the different Iranian pastoral tribes of the Zagros but also to build a measure of trust and some lasting alliances with the bureaucrats and magnates of the major cities of western and southern Persia (Isfahan, Shiraz, Tabriz, and Kerman).',
          lang: 'en',
          cite: {
            source: 'iranica-perry-zand-dynasty',
            loc: { section: 'ZAND DYNASTY', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/zand-dynasty'
          }
        },
        {
          id: 'q8',
          text: 'Karim Khan made it a personal rule not to appropriate windfalls: just as in his years of struggle he distributed booty among his troops and new allies, so in the period of consolidation he refused to confiscate the residue of those deceased without immediate heir, and when, during the rebuilding of Shiraz, a pot of gold coins was unearthed, he shared it out among the workers on the site.',
          lang: 'en',
          cite: {
            source: 'iranica-perry-karim-khan-zand',
            loc: { section: 'KARIM KHAN ZAND', para: '19' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/karim-khan-zand'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/6/68/Karim_Khan_Zand_with_his_horse_and_groom%2C_by_Abu%27l_Hasan_Ghafari%2C_Iran%2C_October-November_1794.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Karim_Khan_Zand_with_his_horse_and_groom,_by_Abu%27l_Hasan_Ghafari,_Iran,_October-November_1794.jpg',
    credit: { institution: 'Christie\'s', creator: 'Abu\'l Hasan Ghaffari' },
    license: { id: 'public-domain' }
  }
})
