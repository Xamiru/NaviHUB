import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'afghan-capture-of-herat-1863',
  names: [
    { text: 'Afghan capture of Herat (1863)', lang: 'en', role: 'primary' },
    { text: 'تصرف هرات به دست دوست محمدخان', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'other',
  start: {
    alts: [
      {
        value: { d: '1863' },
        cites: [
          {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'The Second Anglo-Afghan War', para: '3' }
          },
          {
            source: 'iranica-norris-anglo-afghan-relations',
            loc: { section: 'ANGLO-AFGHAN RELATIONS', para: '9' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'south-asia'],
  prominence: 3,
  places: [
    {
      ref: 'place:herat',
      cites: [
        {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'The Second Anglo-Afghan War', para: '3' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:treaty-of-paris-1857', rel: 'preceded-by' },
    { ref: 'event:herat-crisis-of-1851-1853', rel: 'related' }
  ],
  polities: [
    { ref: 'polity:emirate-of-afghanistan' }
  ],
  participants: [
    {
      ref: 'person:dost-mohammad-khan',
      role: 'leader',
      cites: [
        {
          source: 'loc-afghanistan-country-study-2001',
          loc: { section: 'The Second Anglo-Afghan War', para: '3' }
        },
        {
          source: 'iranica-balland-afghanistan-political-history',
          loc: { section: 'AFGHANISTAN x. Political History', para: '10' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'In 1863 Dost Mohammad retook Herat with British acquiescence.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'The Second Anglo-Afghan War', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/afghanistan/14.htm' }
        },
        {
          id: 'q2',
          text: 'Relations began to improve from 1271/1855 onwards, and on 30 Jomādā I 1273/26 January 1857 the definitive Treaty of Peshawar restored them to such good effect, from both points of view, that Dōst Moḥammad deliberately refrained from intervening during the Indian Mutiny and the British acquiesced in his conquest of Herat in 1279/1863.',
          lang: 'en',
          cite: {
            source: 'iranica-norris-anglo-afghan-relations',
            loc: { section: 'ANGLO-AFGHAN RELATIONS', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/anglo-afghan-relations'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'The Treaty of Paris put a definite end to any Persian claims of sovereignty in Afghanistan.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-herat-vi',
            loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '22' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/herat-vi'
          }
        },
        {
          id: 'q4',
          text: 'In 1857 an addendum to the 1855 treaty permitted a British military mission to become a presence in Qandahar (but not to Kabul) during a conflict with the Iranians, who had attacked Herat in 1856.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'The Second Anglo-Afghan War', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/afghanistan/14.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'At Dōst Moḥammad’s death (21 Ḏu’l-ḥeǰǰa 1279/9 June 1863) Afghanistan existed again, although smaller than in Sadōzay times.',
          lang: 'en',
          cite: {
            source: 'iranica-balland-afghanistan-political-history',
            loc: { section: 'AFGHANISTAN x. Political History', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/afghanistan-x-political-history'
          }
        },
        {
          id: 'q6',
          text: 'Dōst Moḥammad died in 1279/1863, the ruler of a country at last more or less united.',
          lang: 'en',
          cite: {
            source: 'iranica-norris-anglo-afghan-relations',
            loc: { section: 'ANGLO-AFGHAN RELATIONS', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/anglo-afghan-relations'
          }
        },
        {
          id: 'q7',
          text: 'A few months later, Dost Mohammad died.',
          lang: 'en',
          cite: {
            source: 'loc-afghanistan-country-study-2001',
            loc: { section: 'The Second Anglo-Afghan War', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/afghanistan/14.htm' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bd/Herat_from_the_Citadel.png/1280px-Herat_from_the_Citadel.png',
    page: 'https://commons.wikimedia.org/wiki/File:Herat_from_the_Citadel.png',
    credit: { institution: 'The Illustrated London News' },
    license: { id: 'public-domain' }
  }
})
