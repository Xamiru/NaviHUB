import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'mykonos-restaurant-assassinations-significance',
  about: ['event:mykonos-restaurant-assassinations'],
  topic: 'significance',
  framing: {
    id: 'q1',
    text: 'Foreign commentators pondered last week\'s ruling by a German court that the Iranian government had ordered the killing of Kurdish dissidents at a restaurant in Berlin in 1992.',
    lang: 'en',
    cite: {
      source: 'usia-1997-04-16-daily-digest-german-court-ruling-on-mykonos-killings',
      loc: { section: 'Daily Digest 4/16: German Court Ruling on Mykonos Killings' }
    },
    provenance: { via: 'web', at: '2026-10-10', url: 'https://irp.fas.org/news/1997/970416-mr.htm' }
  },
  positions: [
    {
      id: 'a-rogue-state-and-a-failed-dialogue',
      category: 'contemporary',
      holders: [
        { kind: 'media', name: 'Deutschlandfunk (Cologne)' },
        { kind: 'media', name: 'ZDF (Heute)' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'Never before has a court in Europe characterized the Iranian government so clearly as a rogue state....',
          lang: 'en',
          cite: {
            source: 'usia-1997-04-16-daily-digest-german-court-ruling-on-mykonos-killings',
            loc: { section: 'Daily Digest 4/16: German Court Ruling on Mykonos Killings' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://irp.fas.org/news/1997/970416-mr.htm' }
        },
        {
          id: 'q3',
          text: 'This policy is now in ruins, and it will be a long time before it can be even partially repaired....',
          lang: 'en',
          cite: {
            source: 'usia-1997-04-16-daily-digest-german-court-ruling-on-mykonos-killings',
            loc: { section: 'Daily Digest 4/16: German Court Ruling on Mykonos Killings' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://irp.fas.org/news/1997/970416-mr.htm' }
        }
      ]
    },
    {
      id: 'dialogue-must-go-on',
      category: 'contemporary',
      holders: [
        { kind: 'media', name: 'Süddeutsche Zeitung (Munich)' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'In view of the U.S. experience, a total freeze in relations is exactly what should not happen as a result of the Mykonos verdict.',
          lang: 'en',
          cite: {
            source: 'usia-1997-04-16-daily-digest-german-court-ruling-on-mykonos-killings',
            loc: { section: 'Daily Digest 4/16: German Court Ruling on Mykonos Killings' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://irp.fas.org/news/1997/970416-mr.htm' }
        },
        {
          id: 'q5',
          text: 'The \'critical dialogue\' may be over, but Germany and Europe have no choice but to maintain cool relations with Tehran....',
          lang: 'en',
          cite: {
            source: 'usia-1997-04-16-daily-digest-german-court-ruling-on-mykonos-killings',
            loc: { section: 'Daily Digest 4/16: German Court Ruling on Mykonos Killings' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://irp.fas.org/news/1997/970416-mr.htm' }
        }
      ]
    },
    {
      id: 'a-western-campaign-to-isolate-iran',
      category: 'contemporary',
      holders: [
        { kind: 'media', name: 'Al-Watan (Doha)' },
        { kind: 'media', name: 'Pravda (Moscow)' }
      ],
      statements: [
        {
          id: 'q6',
          text: 'The United States believes that the German court decision is sufficient to provide support for a long awaited strike on Iran.',
          lang: 'en',
          cite: {
            source: 'usia-1997-04-16-daily-digest-german-court-ruling-on-mykonos-killings',
            loc: { section: 'Daily Digest 4/16: German Court Ruling on Mykonos Killings' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://irp.fas.org/news/1997/970416-mr.htm' }
        },
        {
          id: 'q7',
          text: 'As the West has clearly set out to carry out its threat to isolate Iran, Germany, surprisingly, is the one which sets the tone in this campaign....',
          lang: 'en',
          cite: {
            source: 'usia-1997-04-16-daily-digest-german-court-ruling-on-mykonos-killings',
            loc: { section: 'Daily Digest 4/16: German Court Ruling on Mykonos Killings' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://irp.fas.org/news/1997/970416-mr.htm' }
        }
      ]
    }
  ],
  researched: '2026-10-10'
})
