import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'srebrenica-massacre-recognition',
  about: ['event:srebrenica-massacre'],
  topic: 'naming',
  framing: {
    id: 'q1',
    text: 'The airing of the video engendered a great deal of national discussion in Serbia, forcing people to confront the fact of atrocities they had previously denied.',
    lang: 'en',
    cite: {
      source: 'hrw-2006-weighing-the-evidence-lessons-from-the-milosevic-trial',
      loc: { section: 'Weighing the Evidence', para: '42' }
    },
    provenance: {
      via: 'web',
      at: '2026-10-12',
      url: 'https://www.hrw.org/reports/2006/milosevic1206/milosevic1206.htm'
    }
  },
  positions: [
    {
      id: 'human-rights-watch-1995-mass-executions',
      category: 'contemporary',
      holders: [
        { kind: 'organization', name: 'Human Rights Watch/Helsinki' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'This report, based on an investigation by Human Rights Watch/Helsinki representatives from July 31 to August 23, records the events leading up to, during and immediately after the fall of the Srebrenica “safe area,” including gross violations of humanitarian law, as has been typical of Bosnian Serb military conduct to date.',
          lang: 'en',
          cite: {
            source: 'hrw-1995-the-fall-of-srebrenica-and-the-failure-of-un-peacekeeping',
            loc: { section: 'The Fall of Srebrenica and the Failure of UN Peacekeeping', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://www.hrw.org/report/1995/10/15/fall-srebrenica-and-failure-un-peacekeeping/bosnia-and-herzegovina'
          }
        }
      ]
    },
    {
      id: 'chauprade-no-evidence-of-genocide',
      category: 'fringe',
      holders: [
        { kind: 'participant', name: 'Aymeric Chauprade, Member of the European Parliament' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'Reiterates that, on the basis of the criteria laid down by the International Criminal Court, there is no evidence to accuse the Serbian minority of Bosnia-Herzegovina, or the Serbian people as a whole, of genocide in Srebrenica;',
          lang: 'en',
          cite: {
            source: 'chauprade-2015-05-14-motion-for-a-european-parliament-resolution-on-srebrenica',
            loc: { section: 'Motion for a European Parliament resolution on Srebrenica', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20190620211322/http://www.europarl.europa.eu/doceo/document/B-8-2015-0649_EN.html'
          }
        },
        {
          id: 'q4',
          text: 'Stresses that two parties were jointly responsible for the Bosnian War and that accusing one of them of genocide will stand in the way of genuine reconciliation and a lasting peace;',
          lang: 'en',
          cite: {
            source: 'chauprade-2015-05-14-motion-for-a-european-parliament-resolution-on-srebrenica',
            loc: { section: 'Motion for a European Parliament resolution on Srebrenica', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20190620211322/http://www.europarl.europa.eu/doceo/document/B-8-2015-0649_EN.html'
          }
        }
      ],
      reception: [
        {
          id: 'q5',
          text: 'Condemns in the strongest possible terms the genocide in Srebrenica; solemnly declares that such horrendous crimes must never happen again and states that it will do everything in its power to prevent such acts from recurring; rejects any denial, relativisation or misinterpretation of the genocide;',
          lang: 'en',
          cite: {
            source: 'european-parliament-2015-07-09-resolution-on-the-srebrenica-commemoration',
            loc: { section: 'Resolution on the Srebrenica Commemoration', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20241109112729/https://www.europarl.europa.eu/doceo/document/TA-8-2015-0276_EN.html'
          }
        },
        {
          id: 'q6',
          text: 'Calls on the Council and the Commission to commemorate appropriately the anniversary of the Srebrenica-Potočari act of genocide by supporting Parliament\'s recognition of 11 July as the day of commemoration of the Srebrenica genocide all over the EU',
          lang: 'en',
          cite: {
            source: 'european-parliament-2009-01-15-resolution-on-srebrenica',
            loc: { section: 'Resolution on Srebrenica', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-12',
            url: 'https://web.archive.org/web/20240409115332/https://www.europarl.europa.eu/doceo/document/TA-6-2009-0028_EN.html'
          }
        }
      ]
    }
  ],
  researched: '2026-10-12'
})
