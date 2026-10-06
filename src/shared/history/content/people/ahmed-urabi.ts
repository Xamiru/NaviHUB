import { definePerson } from '../../schema'

export default definePerson({
  id: 'ahmed-urabi',
  names: [
    { text: 'Ahmed Urabi', lang: 'en', role: 'primary' },
    { text: 'أحمد عرابي', lang: 'ar', role: 'native' },
    {
      text: 'Arabi Pasha',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'britannica-1911-arabi-pasha', loc: { section: 'ARABI PASHA', para: '1' } }
      ]
    },
    {
      text: 'Ahmad ‛Arābī',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'britannica-1911-arabi-pasha', loc: { section: 'ARABI PASHA', para: '1' } }
      ]
    }
  ],
  researched: '2026-10-06',
  born: {
    alts: [
      {
        value: { d: '1839', notAfter: '1840' },
        cites: [
          { source: 'britannica-1911-arabi-pasha', loc: { section: 'ARABI PASHA', para: '1' } }
        ]
      }
    ]
  },
  regions: ['mena'],
  roles: ['military', 'revolutionary'],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'ARABI PASHA (c. 1839–), more correctly Ahmad ‛Arābī, to which in later years he added the epithet al-Misrī, “the Egyptian,” Egyptian soldier and revolutionary leader, was born in Lower Egypt in 1839 or 1840 of a fellah family.',
          lang: 'en',
          cite: { source: 'britannica-1911-arabi-pasha', loc: { section: 'ARABI PASHA', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Arabi_Pasha'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'Having entered the army as a conscript he was made an officer by Said Pasha in 1862,',
          lang: 'en',
          cite: { source: 'britannica-1911-arabi-pasha', loc: { section: 'ARABI PASHA', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Arabi_Pasha'
          }
        },
        {
          id: 'q3',
          text: 'The army society included Colonel Ahmad Urabi, who would become the leader of the nationalist movement,',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'From Intervention to Occupation, 1876-82', para: '12' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/egypt/25.htm' }
        },
        {
          id: 'q4',
          text: 'Not only were they able to force the appointment of a more sympathetic minister but by January 1882, Urabi joined the government as undersecretary for war.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'From Intervention to Occupation, 1876-82', para: '13' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/egypt/25.htm' }
        }
      ]
    },
    {
      kind: 'later-life',
      quotes: [
        {
          id: 'q5',
          text: 'In accordance with an understanding made with the British representative, Lord Dufferin, Arabi pleaded guilty, and sentence of death was immediately commuted to one of banishment for life to Ceylon. The same sentence was passed on Mahmud Sami and others. After Arabi’s exile had lasted for nearly twenty years, however, the khedive Abbas II. exercised his prerogative of mercy, and in May 1901 Arabi was permitted to return to Egypt.',
          lang: 'en',
          cite: { source: 'britannica-1911-arabi-pasha', loc: { section: 'ARABI PASHA', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Arabi_Pasha'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/e/ee/Ahmed_Orabi_1882.png',
    page: 'https://commons.wikimedia.org/wiki/File:Ahmed_Orabi_1882.png',
    credit: { institution: 'Czech Academy of Sciences' },
    license: { id: 'public-domain' }
  }
})
