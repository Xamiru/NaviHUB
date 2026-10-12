import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: '2006-lebanon-war-causes',
  about: ['event:2006-lebanon-war'],
  topic: 'causes',
  positions: [
    {
      id: 'israel-an-act-of-war-by-the-government-of-lebanon',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Israel' },
        { kind: 'participant', name: 'Ehud Olmert' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'Prime Minister Olmert declared Hezbollah\'s raid into Israel and the capture of the two IDF soldiers an "act of war" by the government of Lebanon, and stated that "Lebanon is responsible and Lebanon will bear the consequences of its actions."',
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
          text: 'The fighting may have been sparked by Hezbollah’s cross-border raid, but Israel’s decision to expand a border clash into a full scale war was likely motivated by an intent to preempt Iran.',
          lang: 'en',
          cite: {
            source: 'iranica-menashri-parsi-israel-i-relations-with-iran',
            loc: { section: 'ISRAEL i. RELATIONS WITH IRAN', para: '89' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/israel-i-relations-with-iran/'
          }
        }
      ]
    },
    {
      id: 'hezbollah-prisoner-exchange',
      category: 'official',
      holders: [
        { kind: 'party', name: 'Hezbollah' },
        { kind: 'participant', name: 'Hassan Nasrallah', ref: 'person:hassan-nasrallah' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'Immediately following the raid, Hezbollah stated that it would return the abducted soldiers to Israel through "indirect negotiations" resulting in a "trade" with Lebanese prisoners held in Israeli prisons.',
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
          id: 'q4',
          text: 'Human Rights Watch has criticized Hezbollah for illegally refusing to confirm the fate of the two abducted soldiers or to permit the International Committee of the Red Cross access to them. We have also criticized Hezbollah for holding these detainees as hostages whose release is conditioned on Israel\'s release of a large number of its detainees.',
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
      id: 'menashri-parsi-israel-sought-to-preempt-iran',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'David Menashri', discipline: 'area-specialist' },
        { kind: 'scholar', name: 'Trita Parsi', discipline: 'area-specialist' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'Israel, with a potential future showdown with Iran in mind, seemed to have sought an opportunity to neutralize Hezbollah and Hamas in order to weaken Iran’s deterrence and retaliation capabilities.',
          lang: 'en',
          cite: {
            source: 'iranica-menashri-parsi-israel-i-relations-with-iran',
            loc: { section: 'ISRAEL i. RELATIONS WITH IRAN', para: '89' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/israel-i-relations-with-iran/'
          }
        }
      ]
    }
  ],
  researched: '2026-10-13'
})
