import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: '2006-lebanon-war-civilian-deaths',
  about: ['event:2006-lebanon-war'],
  topic: 'responsibility',
  positions: [
    {
      id: 'israel-hezbollah-used-civilians-as-shields',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Israel' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'Israeli officials contend that the reason for the high fatality rate was not indiscriminate targeting by Israeli forces, but the Hezbollah military\'s allegedly routine practice of hiding among civilians and using them as "shields" in the fighting.',
          lang: 'en',
          cite: {
            source: 'hrw-2007-09-05-why-they-died-civilian-casualties-in-lebanon-during-the-2006-war',
            loc: { section: 'Why They Died: Civilian Casualties in Lebanon during the 2006 War' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/report/2007/09/05/why-they-died/civilian-casualties-lebanon-during-2006-war'
          }
        }
      ],
      reception: [
        {
          id: 'q2',
          text: 'For the reasons set forth below, Human Rights Watch\'s assessment of Hezbollah\'s practices does not support the Israeli contention that Hezbollah violations were the principal cause of Lebanese civilian casualties.',
          lang: 'en',
          cite: {
            source: 'hrw-2007-09-05-why-they-died-civilian-casualties-in-lebanon-during-the-2006-war',
            loc: { section: 'Why They Died: Civilian Casualties in Lebanon during the 2006 War' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/report/2007/09/05/why-they-died/civilian-casualties-lebanon-during-2006-war'
          }
        },
        {
          id: 'q3',
          text: 'Our research shows that the primary reason for the high Lebanese civilian death toll was Israel\'s frequent failure to abide by a fundamental obligation of the laws of war: the duty to distinguish between military targets, which can be legitimately attacked, and civilians, who are not subject to attack.',
          lang: 'en',
          cite: {
            source: 'hrw-2007-09-05-why-they-died-civilian-casualties-in-lebanon-during-the-2006-war',
            loc: { section: 'Why They Died: Civilian Casualties in Lebanon during the 2006 War' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/report/2007/09/05/why-they-died/civilian-casualties-lebanon-during-2006-war'
          }
        }
      ]
    },
    {
      id: 'hrw-hezbollah-also-violated-the-laws-of-war',
      category: 'contemporary',
      holders: [
        { kind: 'organization', name: 'Human Rights Watch' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'Hezbollah at times violated the laws of war in its deployment of forces in Lebanon.',
          lang: 'en',
          cite: {
            source: 'hrw-2007-09-05-why-they-died-civilian-casualties-in-lebanon-during-the-2006-war',
            loc: { section: 'Why They Died: Civilian Casualties in Lebanon during the 2006 War' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.hrw.org/report/2007/09/05/why-they-died/civilian-casualties-lebanon-during-2006-war'
          }
        }
      ]
    }
  ],
  researched: '2026-10-13'
})
