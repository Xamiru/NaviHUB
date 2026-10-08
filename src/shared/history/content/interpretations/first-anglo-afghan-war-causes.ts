import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'first-anglo-afghan-war-causes',
  about: ['event:first-anglo-afghan-war'],
  topic: 'causes',
  researched: '2026-10-08',
  positions: [
    {
      id: 'manifesto-and-pretense',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'The manifesto stated that in order to insure the welfare of India, the British must have a trustworthy ally on India\'s western frontier.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'The First Anglo-Afghan War', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/afghanistan/13.htm' }
        },
        {
          id: 'q2',
          text: 'The British denied that they were invading Afghanistan, instead claiming they were merely supporting its legitimate Shuja government "against foreign interference and factious opposition."',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'The First Anglo-Afghan War', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/afghanistan/13.htm' }
        },
        {
          id: 'q3',
          text: 'The British pretense that their troops were merely supporting Shuja\'s small army in retaking what was once his throne fooled no one.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'The First Anglo-Afghan War', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/afghanistan/13.htm' }
        }
      ]
    },
    {
      id: 'russia-and-central-asian-markets',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Ludwig W. Adamec' },
        { kind: 'scholar', name: 'James Alfred Norris' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'Long before 1838 the British in India had been alarmed by the Russian advance into Central Asia and by the interest of the czar’s agents in Persia and Afghanistan.',
          lang: 'en',
          cite: {
            source: 'iranica-adamec-norris-anglo-afghan-wars',
            loc: { section: 'ANGLO-AFGHAN WARS i. First Anglo-Afghan War (1838-42)', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/anglo-afghan-wars'
          }
        },
        {
          id: 'q5',
          text: 'At stake was the market for Russian or British products in Central Asia.',
          lang: 'en',
          cite: {
            source: 'iranica-adamec-norris-anglo-afghan-wars',
            loc: { section: 'ANGLO-AFGHAN WARS i. First Anglo-Afghan War (1838-42)', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/anglo-afghan-wars'
          }
        },
        {
          id: 'q6',
          text: 'The British sought to save Herat from Persia and thus to hold the Russians at bay in the west.',
          lang: 'en',
          cite: {
            source: 'iranica-adamec-norris-anglo-afghan-wars',
            loc: { section: 'ANGLO-AFGHAN WARS i. First Anglo-Afghan War (1838-42)', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/anglo-afghan-wars'
          }
        }
      ]
    },
    {
      id: 'herat-campaign',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Abbas Amanat', discipline: 'historian' }
      ],
      statements: [
        {
          id: 'q7',
          text: 'It emboldened Yār-Moḥammad in his anti-Qajar stance, contributed to Khorasan’s insecurity, demonstrated Persia’s vulnerability to a naval threat in the Persian Gulf, and encouraged deeper British involvement in Afghanistan from 1839 onwards.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-herat-vi',
            loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/herat-vi'
          }
        }
      ]
    }
  ]
})
