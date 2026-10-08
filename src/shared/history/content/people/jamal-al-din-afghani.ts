import { definePerson } from '../../schema'

export default definePerson({
  id: 'jamal-al-din-afghani',
  names: [
    { text: 'Jamal al-Din al-Afghani', lang: 'en', role: 'primary' },
    { text: 'سید جمال‌الدین اسدآبادی', lang: 'fa', role: 'native' },
    {
      text: 'Jamal ad Din al Afghani',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'THE QAJARS, 1795-1925', para: '6' }
        }
      ]
    },
    {
      text: 'Asadabadi',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'THE QAJARS, 1795-1925', para: '6' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1838' },
        cites: [
          {
            source: 'iranica-yarshater-iranian-history-islamic-period-5',
            loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Qajar period' }
          },
          {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1897' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1897' },
        cites: [
          {
            source: 'iranica-keddie-afgani-jamal-al-din',
            loc: { section: 'AFḠĀNĪ, JAMĀL-AL-DĪN', para: '17' }
          },
          {
            source: 'iranica-yarshater-iranian-history-islamic-period-5',
            loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Qajar period' }
          },
          {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1897' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'mena', 'south-asia', 'europe'],
  roles: ['activist', 'writer', 'journalist'],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'AFḠĀNĪ (ʿASADĀBĀDI), JAMĀL-AL-DĪN (1254-1314/1838 or 39-97; Figure 1), an outstanding ideologist and political activist of the late 19th century Muslim world, whose influence has continued strong in many Muslim countries.',
          lang: 'en',
          cite: {
            source: 'iranica-keddie-afgani-jamal-al-din',
            loc: { section: 'AFḠĀNĪ, JAMĀL-AL-DĪN', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/afgani-jamal-al-din'
          }
        },
        {
          id: 'q2',
          text: 'Although for much of his life he claimed to be of Afghan origin, probably in order to present himself as a Sunni Muslim and to escape oppression by the Iranian government, overwhelming documentation now proves that he was born and spent his childhood in Iran.',
          lang: 'en',
          cite: {
            source: 'iranica-keddie-afgani-jamal-al-din',
            loc: { section: 'AFḠĀNĪ, JAMĀL-AL-DĪN', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/afgani-jamal-al-din'
          }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q3',
          text: 'Life. Jamāl-al-dīn was born in the village of Asadābād, near Hamadān, into a family of local sayyeds.',
          lang: 'en',
          cite: {
            source: 'iranica-keddie-afgani-jamal-al-din',
            loc: { section: 'AFḠĀNĪ, JAMĀL-AL-DĪN', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/afgani-jamal-al-din'
          }
        }
      ]
    },
    {
      kind: 'ideas',
      quotes: [
        {
          id: 'q4',
          text: 'But from his first appearance in Afghanistan until his death, Afḡānī’s interests were much more political than religious.',
          lang: 'en',
          cite: {
            source: 'iranica-keddie-afgani-jamal-al-din',
            loc: { section: 'AFḠĀNĪ, JAMĀL-AL-DĪN', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/afgani-jamal-al-din'
          }
        },
        {
          id: 'q5',
          text: 'In fact, it is only after 1883 that Afḡānī published the pan-Islamic ideas that have come to be associated with him.',
          lang: 'en',
          cite: {
            source: 'iranica-keddie-afgani-jamal-al-din',
            loc: { section: 'AFḠĀNĪ, JAMĀL-AL-DĪN', para: '23' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/afgani-jamal-al-din'
          }
        }
      ]
    },
    {
      kind: 'later-life',
      quotes: [
        {
          id: 'q6',
          text: 'Afḡānī had tried to establish relations with the Ottoman Sultan Abdülhamid at least as early as 1885; in 1892 these efforts came to fruition when a member of the Ottoman court, using a combination of threats and promises, asked Afḡānī to come to reside in Turkey.',
          lang: 'en',
          cite: {
            source: 'iranica-keddie-afgani-jamal-al-din',
            loc: { section: 'AFḠĀNĪ, JAMĀL-AL-DĪN', para: '17' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/afgani-jamal-al-din'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q7',
          text: 'Afḡānī died of cancer of the jaw in 1897. His illness is well attested and there is no good evidence for the story that the sultan poisoned him. In his years at Istanbul he was not allowed to publish, and after a short time his influence with the sultan declined, so that at the time of his death he was at a low point in his career.',
          lang: 'en',
          cite: {
            source: 'iranica-keddie-afgani-jamal-al-din',
            loc: { section: 'AFḠĀNĪ, JAMĀL-AL-DĪN', para: '17' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/afgani-jamal-al-din'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q8',
          text: 'Influence. Afḡānī’s anti-imperialism and his stress on certain virtues in the early periods of Islam with appropriate interpretations of the Qurʾān and Hadith entered the mainstream of Islamic modernism, reformism, nationalism, movements for self strengthening, and anti-imperialism. Although more a reformer than a conservative, his emphasis on self strengthening and defense of the Muslim world against the West, as well as his frequent dissimulation of his true ideas, allowed his legacy to be used by groups much more conservative than himself. Nonetheless, his writings and example had an immediate modernist influence, particularly on Egyptian and Iranian nationalists.',
          lang: 'en',
          cite: {
            source: 'iranica-keddie-afgani-jamal-al-din',
            loc: { section: 'AFḠĀNĪ, JAMĀL-AL-DĪN', para: '26' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/afgani-jamal-al-din'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Al_afghani.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Al_afghani.jpg',
    credit: { institution: 'E. G. Browne, The Persian Revolution (Cambridge University Press, 1910)' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'rafii-1967-jamal-al-din-al-afghani', perspective: 'arab' }
  ]
})
