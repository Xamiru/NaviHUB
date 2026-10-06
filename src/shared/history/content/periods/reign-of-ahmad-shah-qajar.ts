import { definePeriod } from '../../schema'

export default definePeriod({
  id: 'reign-of-ahmad-shah-qajar',
  names: [
    { text: 'Reign of Ahmad Shah Qajar', lang: 'en', role: 'primary' },
    { text: 'سلطنت احمدشاه قاجار', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-06',
  periodType: 'reign',
  start: {
    alts: [
      {
        value: { d: '1909-07-16' },
        cites: [
          {
            source: 'iranica-sheikh-ol-islami-ahmad-shah',
            loc: { section: 'AḤMAD SHAH QĀJĀR', para: '1' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1925-10-31' },
        cites: [
          {
            source: 'iranica-sheikh-ol-islami-ahmad-shah',
            loc: { section: 'AḤMAD SHAH QĀJĀR', para: '16' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 2,
  parent: 'period:qajar-dynasty',
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'When ʿAżod-al-molk died on 22 September 1910, he was replaced as regent by Abu’l-Qāsem Nāṣer-al-molk, an Oxonian who counted among his contemporaries at Oxford Lord Curzon and Sir Edward Grey, both destined to become British foreign secretaries in the next decade.',
          lang: 'en',
          cite: {
            source: 'iranica-sheikh-ol-islami-ahmad-shah',
            loc: { section: 'AḤMAD SHAH QĀJĀR', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/ahmad-shah-qajar-1909-1925-the-seventh-and-last-ruler-of-the-qajar-dynasty/'
          }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q2',
          text: 'Thus, although Aḥmad Shah’s coronation on 21 July 1914 was marked by national jubilation, his popularity rapidly declined.',
          lang: 'en',
          cite: {
            source: 'iranica-sheikh-ol-islami-ahmad-shah',
            loc: { section: 'AḤMAD SHAH QĀJĀR', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/ahmad-shah-qajar-1909-1925-the-seventh-and-last-ruler-of-the-qajar-dynasty/'
          }
        },
        {
          id: 'q3',
          text: 'The first four years of Aḥmad Shah’s direct reign coincided with World War I and the occupation of Iran by various belligerent troops. During these eventful years, Aḥmad Shah played only a small part in the internal politics of his country, on the whole doing what his counselors (some pro-German, some pro-British, some pro-Russian) advised him to do.',
          lang: 'en',
          cite: {
            source: 'iranica-sheikh-ol-islami-ahmad-shah',
            loc: { section: 'AḤMAD SHAH QĀJĀR', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/ahmad-shah-qajar-1909-1925-the-seventh-and-last-ruler-of-the-qajar-dynasty/'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'Aḥmad Shah’s position was considerably affected when on 21 February 1921—exactly 40 days before the British troops were to begin their evacuation of Iran—a division of the Persian Cossack brigade under the command of Reżā Khan marched from Qazvīn to Tehran and occupied the capital.',
          lang: 'en',
          cite: {
            source: 'iranica-sheikh-ol-islami-ahmad-shah',
            loc: { section: 'AḤMAD SHAH QĀJĀR', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/ahmad-shah-qajar-1909-1925-the-seventh-and-last-ruler-of-the-qajar-dynasty/'
          }
        },
        {
          id: 'q5',
          text: 'From this moment, Reżā Khan became the real power in Iran behind the making and unmaking of successive cabinets. The political history of Iran during the remaining four years of Aḥmad Shah’s reign is the story of the struggle for supremacy between a frightened, weak, and pleasure-loving monarch and an astute and powerful minister of war aspiring to the throne.',
          lang: 'en',
          cite: {
            source: 'iranica-sheikh-ol-islami-ahmad-shah',
            loc: { section: 'AḤMAD SHAH QĀJĀR', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/ahmad-shah-qajar-1909-1925-the-seventh-and-last-ruler-of-the-qajar-dynasty/'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q6',
          text: 'On 31 October 1925, the Majlis approved a bill deposing the Qajars and entrusting the provisional government to Reżā Khan.',
          lang: 'en',
          cite: {
            source: 'iranica-sheikh-ol-islami-ahmad-shah',
            loc: { section: 'AḤMAD SHAH QĀJĀR', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/ahmad-shah-qajar-1909-1925-the-seventh-and-last-ruler-of-the-qajar-dynasty/'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/76/AhmadShahQajar2.jpg/1280px-AhmadShahQajar2.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:AhmadShahQajar2.jpg',
    credit: { institution: 'Library of Congress', creator: 'Bain News Service' },
    license: { id: 'public-domain' }
  }
})
