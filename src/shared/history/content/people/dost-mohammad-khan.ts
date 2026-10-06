import { definePerson } from '../../schema'

export default definePerson({
  id: 'dost-mohammad-khan',
  names: [
    { text: 'Dost Mohammad Khan', lang: 'en', role: 'primary' },
    { text: 'دوست محمد خان', lang: 'fa', role: 'native' },
    {
      text: 'Dōst Moḥammad Khan',
      lang: 'fa-Latn',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-adamec-norris-anglo-afghan-wars',
          loc: { section: 'ANGLO-AFGHAN WARS i. First Anglo-Afghan War (1838-42)', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  regions: ['south-asia'],
  roles: ['monarch'],
  sections: [
    {
      kind: 'career',
      quotes: [
        {
          id: 'q1',
          text: 'In the period between 1818 and 1826, Dōst-Moḥammad Khan (q.v.), the most daring of Fatḥ Khan’s brothers, in collaboration with the others, tried to impose a Bārakzi hegemony over all Afghan principalities.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-herat-vi',
            loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/herat-vi'
          }
        },
        {
          id: 'q2',
          text: 'Dōst-Moḥammad and his brother, Kohandel Khan, the governor of Kandahar, were sufficiently impressed by Russian might to offer their allegiance to her apparent ally, the shah of Persia.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-herat-vi',
            loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/herat-vi'
          }
        },
        {
          id: 'q3',
          text: 'Dost Mohammad fled with his loyal followers across the passes to Bamian, and ultimately to Bukhara.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'The First Anglo-Afghan War', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/afghanistan/13.htm' }
        },
        {
          id: 'q4',
          text: 'After he unsuccessfully attacked the British and their Afghan protégé, Dost Mohammad surrendered to them and was exiled in India in late 1840.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'The First Anglo-Afghan War', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/afghanistan/13.htm' }
        }
      ]
    },
    {
      kind: 'later-life',
      quotes: [
        {
          id: 'q5',
          text: 'Dōst Moḥammad returned to the capital in 1843.',
          lang: 'en',
          cite: {
            source: 'iranica-adamec-norris-anglo-afghan-wars',
            loc: { section: 'ANGLO-AFGHAN WARS i. First Anglo-Afghan War (1838-42)', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/anglo-afghan-wars'
          }
        },
        {
          id: 'q6',
          text: 'Already in March 1855, Dōst-Moḥammad had concluded a decisive treaty with the East India Company that recognized him as the amir of the whole of Afghanistan.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-herat-vi',
            loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '18' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/herat-vi'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/5b/Dost_Mohammad_Khan_of_Kabul.png/1280px-Dost_Mohammad_Khan_of_Kabul.png',
    page: 'https://commons.wikimedia.org/wiki/File:Dost_Mohammad_Khan_of_Kabul.png',
    credit: { institution: 'Victoria and Albert Museum', creator: 'Godfrey Vigne' },
    license: { id: 'public-domain' }
  },
  died: {
    alts: [
      {
        value: { d: '1863-06-09' },
        cites: [
          {
            source: 'iranica-balland-afghanistan-political-history',
            loc: { section: 'AFGHANISTAN x. Political History', para: '10' }
          }
        ]
      }
    ]
  }
})
