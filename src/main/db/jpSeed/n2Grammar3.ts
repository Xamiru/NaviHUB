import type { SeedCourseDef } from '../japaneseSeed'

// JLPT N2 Grammar III (2026-10-16): the N2 connectors and the formal
// noun-particle compounds (をめぐって, に際して, に基づいて, …) the first two
// N2 courses did not reach. Right after JLPT N2 Grammar II. Keys are frozen.

export const N2C_COURSE: SeedCourseDef = {
  title: 'JLPT N2 Grammar III',
  description:
    'Connectors for adding, concluding, contrasting and changing topic, and the formal particle compounds ' +
    'of news and writing (をめぐって, に際して, に基づいて and more). Do this right after JLPT N2 Grammar II.',
  level: 'N2',
  lessons: [
    {
      key: 'n2c.adding',
      kind: 'grammar',
      title: 'しかも・おまけに・なお・ちなみに — adding more',
      body: `Four connectors that add information, each with a different job.

・しかも — "and what's more". The added point makes the first one stronger, in either direction (good or bad).
  この店は安い。しかも、美味しい。 — "This place is cheap. And what's more, it's tasty."
・おまけに — "on top of that". Informal in tone, and usually piles one bad thing on another.
  道に迷った。おまけに、雨まで降ってきた。 — "We got lost. On top of that, it started raining."
・なお — "furthermore, note that". Written; adds a supplementary note, typically at the end of a notice.
  説明会は十時からです。なお、駐車場はありません。 — "The briefing starts at ten. Please note there is no parking."
・ちなみに — "incidentally, by the way". A side fact related to the topic.
  この寺は八百年前に建てられた。ちなみに、入場は無料だ。 — "This temple was built 800 years ago. Incidentally, entry is free."

Compare その上・それに (N3 Grammar III): those are neutral "besides". しかも stresses that the addition is even more striking; おまけに sounds like a complaint.`,
      cards: [
        { front: '彼は医者で、しかも小説家でもある。', reading: 'かれはいしゃで、しかもしょうせつかでもある。', back: "He's a doctor, and what's more, a novelist too." },
        { front: 'このパソコンは軽い。しかも、電池が長持ちする。', reading: 'このパソコンはかるい。しかも、でんちがながもちする。', back: 'This laptop is light. And what is more, the battery lasts a long time.' },
        { front: '財布をなくした。おまけに、風邪までひいた。', reading: 'さいふをなくした。おまけに、かぜまでひいた。', back: 'I lost my wallet. On top of that, I caught a cold.' },
        { front: '締め切りは金曜日です。なお、遅れた場合は受け付けません。', reading: 'しめきりはきんようびです。なお、おくれたばあいはうけつけません。', back: 'The deadline is Friday. Please note that late submissions will not be accepted.' },
        { front: 'この映画は実話に基づいている。ちなみに、監督は主人公の息子だ。', reading: 'このえいがはじつわにもとづいている。ちなみに、かんとくはしゅじんこうのむすこだ。', back: "This film is based on a true story. Incidentally, the director is the protagonist's son." },
        { front: '彼は五月三日生まれだ。ちなみに、私の誕生日も同じ日です。', reading: 'かれはごがつみっかうまれだ。ちなみに、わたしのたんじょうびもおなじひです。', back: 'He was born on May 3rd. Incidentally, my birthday is on the same day too.' }
      ]
    },
    {
      key: 'n2c.therefore',
      kind: 'grammar',
      title: 'したがって・そこで・それで・すると — so, and then',
      body: `Connectors that lead from one sentence to what follows from it.

・したがって — "therefore, consequently". Logical and formal; common in reports and arguments.
  人口が減っている。したがって、労働力が不足している。 — "The population is shrinking. Consequently, there is a labour shortage."
・そこで — "so (we did something about it)". The second sentence is an action taken to deal with the situation.
  道が分からなかった。そこで、地元の人に聞いた。 — "I didn't know the way. So I asked a local."
・それで — "and so, that's why". Everyday cause and result; also "and then?" when urging a story on: それで、どうなったの？
・すると — "and then, thereupon". Something happened right after, often unexpectedly. Also "in that case" when drawing a conclusion: すると、犯人は彼か — "In that case, he's the culprit?"
  ボタンを押した。すると、ドアが開いた。 — "I pressed the button. And then the door opened."

Compare それで and そこで: それで reports a result; そこで introduces a deliberate response.`,
      cards: [
        { front: '彼は十八歳未満だ。したがって、この契約はできない。', reading: 'かれはじゅうはっさいみまんだ。したがって、このけいやくはできない。', back: 'He is under eighteen. Therefore, he cannot sign this contract.' },
        { front: '客が減った。そこで、店は値段を下げることにした。', reading: 'きゃくがへった。そこで、みせはねだんをさげることにした。', back: 'Customers fell off. So the shop decided to lower its prices.' },
        { front: '寝坊した。それで、授業に遅れた。', reading: 'ねぼうした。それで、じゅぎょうにおくれた。', back: "I overslept. That's why I was late for class." },
        { front: 'それで、結局どうなったの？', reading: 'それで、けっきょくどうなったの？', back: 'And so, what happened in the end?' },
        { front: '窓を開けた。すると、冷たい風が入ってきた。', reading: 'まどをあけた。すると、つめたいかぜがはいってきた。', back: 'I opened the window. Then a cold wind came in.' },
        { front: '鍵がない？すると、誰かが持って行ったのか。', reading: 'かぎがない？すると、だれかがもっていったのか。', back: 'The key is gone? Then someone must have taken it.' }
      ]
    },
    {
      key: 'n2c.contrast',
      kind: 'grammar',
      title: 'だが・ただ・もっとも・それでも — but, although',
      body: `Four ways to push back against the previous sentence.

・だが — "but, however". The plain-style (だ) twin of ですが; firm, common in writing and narration.
  努力した。だが、結果は出なかった。 — "I made the effort. But the results didn't come."
・ただ — "only, the one thing is". Softens: everything is fine except one point.
  いい部屋だ。ただ、少し狭い。 — "It's a nice room. The only thing is, it's a bit small."
・もっとも — "mind you, admittedly". Adds a qualification that partly corrects what was just said.
  彼は天才だ。もっとも、努力もしているが。 — "He's a genius. Mind you, he works hard too."
・それでも — "even so, still". The situation is admitted, and the result holds anyway.
  何度も失敗した。それでも、諦めなかった。 — "I failed again and again. Even so, I didn't give up."

Compare ただ and ただし (N3 Grammar III): ただ adds a personal reservation; ただし adds a formal condition or exception, as in rules.`,
      cards: [
        { front: '計画は完璧だった。だが、誰も実行しなかった。', reading: 'けいかくはかんぺきだった。だが、だれもじっこうしなかった。', back: 'The plan was perfect. But nobody carried it out.' },
        { front: '彼女は優しい。ただ、時間にはルーズだ。', reading: 'かのじょはやさしい。ただ、じかんにはルーズだ。', back: "She's kind. The only thing is, she's sloppy about time." },
        { front: 'この薬はよく効く。ただ、眠くなることがある。', reading: 'このくすりはよくきく。ただ、ねむくなることがある。', back: 'This medicine works well. The only thing is, it can make you drowsy.' },
        { front: '明日は休みだ。もっとも、急な仕事が入らなければの話だが。', reading: 'あしたはやすみだ。もっとも、きゅうなしごとがはいらなければのはなしだが。', back: "Tomorrow's a day off — that is, if no urgent work comes in." },
        { front: '医者に止められた。それでも、彼は酒をやめない。', reading: 'いしゃにとめられた。それでも、かれはさけをやめない。', back: "His doctor told him to stop. Even so, he won't quit drinking." },
        { front: 'みんなに反対された。それでも、私はこの道を選ぶ。', reading: 'みんなにはんたいされた。それでも、わたしはこのみちをえらぶ。', back: 'Everyone was against it. Even so, I am choosing this path.' }
      ]
    },
    {
      key: 'n2c.rephrase',
      kind: 'grammar',
      title: 'すなわち・要するに・というのは・ということは — that is, so',
      body: `Connectors for restating, summing up, explaining and inferring.

・すなわち — "that is, namely". A formal equals sign: A すなわち B.
  日本の首都、すなわち東京 — "the capital of Japan, namely Tokyo"
・要するに — "in short, the point is". Sums up a longer stretch, often bluntly.
  要するに、お金が足りないということだ。 — "In short, we don't have enough money."
・というのは — "the reason is, that's because". Starts a sentence that explains the previous one; it usually ends in からだ / のだ.
  今日は早く帰ります。というのは、子供が熱を出したからです。 — "I'm leaving early today. That's because my child has a fever."
・ということは — "which means, so". Draws a conclusion from what was just said.
  電気が消えている。ということは、誰もいないのか。 — "The lights are off. Which means nobody's home?"

Compare つまり (N3 Grammar III): つまり is the everyday "in other words"; すなわち is its written, exact counterpart, and 要するに is a summing-up that often cuts a long story short.`,
      cards: [
        { front: '一月一日、すなわち元日は休みです。', reading: 'いちがつついたち、すなわちがんじつはやすみです。', back: "January 1st, namely New Year's Day, is a holiday." },
        { front: '要するに、君は何が言いたいの？', reading: 'ようするに、きみはなにがいいたいの？', back: 'In short, what are you trying to say?' },
        { front: '要するに、準備が足りなかったんだ。', reading: 'ようするに、じゅんびがたりなかったんだ。', back: "The point is, we weren't prepared enough." },
        { front: '旅行は中止です。というのは、台風が近づいているからです。', reading: 'りょこうはちゅうしです。というのは、たいふうがちかづいているからです。', back: "The trip is cancelled. That's because a typhoon is approaching." },
        { front: '彼は来ないと言った。ということは、私たちだけで行くのか。', reading: 'かれはこないといった。ということは、わたしたちだけでいくのか。', back: "He said he's not coming. Which means we're going on our own?" },
        { front: '切符が売り切れ？ということは、今日は帰れないね。', reading: 'きっぷがうりきれ？ということは、きょうはかえれないね。', back: "Tickets are sold out? So we can't get home today." }
      ]
    },
    {
      key: 'n2c.topic-shift',
      kind: 'grammar',
      title: 'さて・それはそうと・それなら — moving on',
      body: `Connectors that steer the conversation.

・さて — "now, well then". Moves to the next topic or stage, often in speeches, meetings and storytelling.
  さて、次の議題に移りましょう。 — "Now, let's move on to the next item."
・それはそうと — "by the way, that aside". Drops the current topic for something that just came to mind; ところで (N4) is the neutral version.
  それはそうと、昨日の試合見た？ — "That aside, did you see yesterday's match?"
・それなら — "in that case, if so". Takes what the other person just said as a premise and responds to it.
  A: 疲れた。 B: それなら、少し休もう。 — "A: I'm tired. B: In that case, let's take a break."

Compare それなら and すると: それなら answers someone (advice, decisions); すると draws a logical conclusion.`,
      cards: [
        { front: 'さて、そろそろ始めましょうか。', reading: 'さて、そろそろはじめましょうか。', back: 'Well then, shall we get started?' },
        { front: 'さて、ここで問題です。', reading: 'さて、ここでもんだいです。', back: "Now, here's a question for you." },
        { front: 'それはそうと、例の件はどうなった？', reading: 'それはそうと、れいのけんはどうなった？', back: 'By the way, what happened with that matter?' },
        { front: 'それはそうと、お腹すかない？', reading: 'それはそうと、おなかすかない？', back: "That aside, aren't you hungry?" },
        { front: 'バスがない？それなら、タクシーで行こう。', reading: 'バスがない？それなら、タクシーでいこう。', back: "No buses? In that case, let's take a taxi." },
        { front: '忙しかったの？それなら、最初からそう言ってよ。', reading: 'いそがしかったの？それなら、さいしょからそういってよ。', back: 'Were you busy? If so, you should have said so from the start.' }
      ]
    },
    {
      key: 'n2c.aruiwa',
      kind: 'grammar',
      title: 'あるいは・または・もしくは — or (formal)',
      body: `The formal ways to say "or", between nouns or between whole clauses.

・または — "or". The standard written "or", common in forms and instructions.
  黒または青のペンで書いてください。 — "Please write in black or blue pen."
・あるいは — "or, or perhaps". Like または, and it can also mean "possibly" on its own: あるいは、そうかもしれない — "Perhaps that's so."
  電話、あるいはメールで連絡してください。 — "Please contact us by phone or email."
・もしくは — "or (else)". The most formal; legal and official texts.
  本人もしくは代理人が来てください。 — "The person themselves or their representative must come."

In conversation, plain か is the everyday "or" (コーヒーか紅茶), and それとも joins two questions (N3 Grammar III).`,
      cards: [
        { front: '現金またはカードでお支払いください。', reading: 'げんきんまたはカードでおしはらいください。', back: 'Please pay by cash or card.' },
        { front: '明日あるいは明後日に伺います。', reading: 'あしたあるいはあさってにうかがいます。', back: "I'll visit tomorrow or the day after." },
        { front: 'あるいは、彼の言う通りかもしれない。', reading: 'あるいは、かれのいうとおりかもしれない。', back: 'Perhaps he is right.' },
        { front: '申込書は郵送、または窓口に直接提出してください。', reading: 'もうしこみしょはゆうそう、またはまどぐちにちょくせつていしゅつしてください。', back: 'Please submit the application form by post, or hand it in directly at the counter.' },
        { front: '保護者もしくは学校の先生の署名が必要です。', reading: 'ほごしゃもしくはがっこうのせんせいのしょめいがひつようです。', back: "A signature from a parent or guardian, or a schoolteacher, is required." },
        { front: '参加するか、あるいは欠席の連絡をしてください。', reading: 'さんかするか、あるいはけっせきのれんらくをしてください。', back: 'Please either attend or let us know you will be absent.' }
      ]
    },
    {
      key: 'n2c.sorega-datte',
      kind: 'grammar',
      title: 'それが・だって — well, actually / because',
      body: `Two conversational replies.

・それが — "well, actually (things didn't go as you'd think)". The reply to a question when the answer is disappointing or surprising.
  A: 試験、どうだった？ B: それが、全然できなかったんだ。 — "A: How was the exam? B: Well, actually, I couldn't do it at all."
・だって — "because, but". Gives your reason or excuse, often defensively; the sentence typically ends in もん or んだ. It is casual and can sound childish.
  A: どうして食べないの？ B: だって、辛いんだもん。 — "A: Why aren't you eating? B: Because it's spicy!"

Compare なぜなら (N3 Grammar III): the same "because" job, but formal and argumentative. だって is the casual, personal version.

Do not confuse sentence-starting だって with だって after a noun, which means "even" (子供だって分かる — "Even a child gets it") or passes on hearsay (明日休みだって — "Apparently tomorrow's off").`,
      cards: [
        { front: 'それが、実は彼女と別れたんだ。', reading: 'それが、じつはかのじょとわかれたんだ。', back: 'Well, actually, my girlfriend and I broke up.' },
        { front: 'それが、まだ返事が来ないんです。', reading: 'それが、まだへんじがこないんです。', back: "Well, the thing is, I still haven't had a reply." },
        { front: 'だって、電車が止まったんだもん。', reading: 'だって、でんしゃがとまったんだもん。', back: 'Because the train stopped, okay?' },
        { front: 'だって、誰も教えてくれなかったじゃない。', reading: 'だって、だれもおしえてくれなかったじゃない。', back: "But nobody told me!" },
        { front: 'それが、すっかり忘れてたんだ。', reading: 'それが、すっかりわすれてたんだ。', back: 'Well, actually, I completely forgot.' },
        { front: 'だって、怖かったんだもん。', reading: 'だって、こわかったんだもん。', back: 'But I was scared!' }
      ]
    },
    {
      key: 'n2c.nitsuki-nite',
      kind: 'grammar',
      title: '～につき・～にて — due to, at (notices)',
      body: `Two formal particles you mostly meet on signs, notices and announcements.

・Noun + につき — "due to, because of". A stiff, written reason: 工事中につき、通行止め — "Road closed due to construction."
  It also means "per": 一人につき二枚まで — "Up to two per person."
・Noun + にて — the formal written form of で: "at, in, by, with".
  会議は本社にて行います。 — "The meeting will be held at head office."
  メールにてお知らせします。 — "We will inform you by email."
  本日にて終了 — "Ending today."

In speech both sound bureaucratic; use ので / で instead. Recognizing them is what matters for reading notices and business email.`,
      cards: [
        { front: '本日は定休日につき、お休みです。', reading: 'ほんじつはていきゅうびにつき、おやすみです。', back: 'Closed today, as it is our regular day off.' },
        { front: '改装中につき、しばらく閉店いたします。', reading: 'かいそうちゅうにつき、しばらくへいてんいたします。', back: 'Closed for a while due to renovation.' },
        { front: 'お菓子はお一人様につき三個までです。', reading: 'おかしはおひとりさまにつきさんこまでです。', back: 'Sweets are limited to three per person.' },
        { front: '詳細は後日メールにてお知らせします。', reading: 'しょうさいはごじつメールにておしらせします。', back: 'We will send the details by email at a later date.' },
        { front: '式は市民ホールにて行われます。', reading: 'しきはしみんホールにておこなわれます。', back: 'The ceremony will be held at the civic hall.' },
        { front: '受付は五時にて終了いたします。', reading: 'うけつけはごじにてしゅうりょういたします。', back: 'Reception closes at five o\'clock.' }
      ]
    },
    {
      key: 'n2c.wo-hajime',
      kind: 'grammar',
      title: '～をはじめ(として)・～をはじめとする — starting with',
      body: `Noun + をはじめ names the leading or most typical example of a group, and the rest of the sentence covers the whole group: "X and others, starting with X, including X".
  社長をはじめ、社員全員が出席した。 — "All the staff attended, starting with the president."
  をはじめとして is the same, a little more formal.

Before a noun it becomes をはじめとする / をはじめとした:
  東京をはじめとする大都市 — "big cities such as Tokyo"

The example given is a prominent one, not a random member, and the main clause usually says something about everyone (全員・みんな・多くの〜). Compare など ("and so on"), which just lists examples without singling one out.`,
      cards: [
        { front: '両親をはじめ、家族みんなが応援してくれた。', reading: 'りょうしんをはじめ、かぞくみんながおうえんしてくれた。', back: 'My whole family supported me, starting with my parents.' },
        { front: '寿司をはじめ、日本料理は海外でも人気だ。', reading: 'すしをはじめ、にほんりょうりはかいがいでもにんきだ。', back: 'Japanese food, such as sushi, is popular abroad too.' },
        { front: '校長先生をはじめとして、多くの先生が参加した。', reading: 'こうちょうせんせいをはじめとして、おおくのせんせいがさんかした。', back: 'Many teachers took part, starting with the principal.' },
        { front: '京都をはじめとする古い町には、多くの観光客が来る。', reading: 'きょうとをはじめとするふるいまちには、おおくのかんこうきゃくがくる。', back: 'Old towns such as Kyoto draw many tourists.' },
        { front: 'この病院には、内科をはじめ十以上の科がある。', reading: 'このびょういんには、ないかをはじめじゅういじょうのかがある。', back: 'This hospital has over ten departments, starting with internal medicine.' },
        { front: 'サッカーをはじめとしたスポーツが盛んな町だ。', reading: 'サッカーをはじめとしたスポーツがさかんなまちだ。', back: "It's a town where sports such as football are popular." }
      ]
    },
    {
      key: 'n2c.wo-megutte',
      kind: 'grammar',
      title: '～をめぐって・～をめぐる — over, surrounding (a dispute)',
      body: `Noun + をめぐって means "over, concerning, surrounding" a topic that people argue, compete or debate about. めぐる literally means "to go around": many views circling one issue.
  遺産をめぐって、兄弟が争っている。 — "The siblings are fighting over the inheritance."
  新しい法律をめぐって、議論が続いている。 — "Debate continues over the new law."

Before a noun it becomes をめぐる: 土地をめぐる問題 — "a dispute over land".

The main clause is almost always conflict or discussion: 争う、対立する、議論する、意見が分かれる. Compare について (N3 Grammar II), which is a neutral "about": 歴史について話す is just talking; 歴史をめぐって対立する means there are opposing sides.`,
      cards: [
        { front: '一人の女性をめぐって、二人の男が争った。', reading: 'ひとりのじょせいをめぐって、ふたりのおとこがあらそった。', back: 'Two men fought over one woman.' },
        { front: '駅前の開発をめぐって、住民の意見が分かれている。', reading: 'えきまえのかいはつをめぐって、じゅうみんのいけんがわかれている。', back: 'Residents are divided over the development in front of the station.' },
        { front: 'その事件をめぐって、様々な噂が流れた。', reading: 'そのじけんをめぐって、さまざまなうわさがながれた。', back: 'All sorts of rumours spread about the incident.' },
        { front: '優勝をめぐって、三つのチームが激しく戦っている。', reading: 'ゆうしょうをめぐって、みっつのチームがはげしくたたかっている。', back: 'Three teams are fighting hard for the championship.' },
        { front: '環境問題をめぐる議論は、まだ終わらない。', reading: 'かんきょうもんだいをめぐるぎろんは、まだおわらない。', back: 'The debate over environmental issues is still not over.' },
        { front: '給料をめぐる交渉が続いている。', reading: 'きゅうりょうをめぐるこうしょうがつづいている。', back: 'Negotiations over pay are continuing.' }
      ]
    },
    {
      key: 'n2c.wo-moto-ni',
      kind: 'grammar',
      title: '～をもとに(して)・～に基づいて — based on',
      body: `Two ways to say "based on", with a real difference.

・Noun + をもとに(して) — "using X as the material or starting point". The result is something new made from it.
  実話をもとにした映画 — "a film based on a true story"
  この小説は祖母の話をもとに書いた。 — "I wrote this novel drawing on my grandmother's stories."
・Noun + に基づいて — "on the basis of, in accordance with". The result follows X as its grounds or rule.
  データに基づいて判断する。 — "We judge on the basis of the data."
  法律に基づいて処分された。 — "He was punished in accordance with the law."

Before a noun: をもとにした / に基づいた or に基づく (事実に基づく話 — "a story based on facts").

Rule of thumb: をもとに for creative works and materials (stories, recipes, designs); に基づいて for decisions, rules, evidence and plans.`,
      cards: [
        { front: 'この映画は有名な漫画をもとに作られた。', reading: 'このえいがはゆうめいなまんがをもとにつくられた。', back: 'This film was made based on a famous manga.' },
        { front: 'アンケートの結果をもとにして、新しい商品を開発した。', reading: 'アンケートのけっかをもとにして、あたらしいしょうひんをかいはつした。', back: 'We developed a new product based on the survey results.' },
        { front: '母のレシピをもとに、カレーを作ってみた。', reading: 'ははのレシピをもとに、カレーをつくってみた。', back: "I tried making curry based on my mother's recipe." },
        { front: '調査結果に基づいて、計画を立てた。', reading: 'ちょうさけっかにもとづいて、けいかくをたてた。', back: 'We drew up the plan on the basis of the survey results.' },
        { front: '規則に基づいて、処分を決めます。', reading: 'きそくにもとづいて、しょぶんをきめます。', back: 'We will decide the penalty in accordance with the rules.' },
        { front: 'これは事実に基づく話です。', reading: 'これはじじつにもとづくはなしです。', back: 'This is a story based on fact.' }
      ]
    },
    {
      key: 'n2c.wo-toshite',
      kind: 'grammar',
      title: '～を～として・～を中心に — taking X as, centred on',
      body: `Two patterns that assign a role or a centre.

・A を B として / とする — "treating A as B, with A as B". The setter-up version of として (N3 Grammar III).
  彼をリーダーとしてチームを作った。 — "We formed a team with him as leader."
  優勝を目標として練習する。 — "We train with winning the title as our goal."
  Before a noun: を～とする (医療を目的とする団体 — "an organization whose aim is medical care").
・Noun + を中心に(して) — "centred on, focusing on". The core around which things gather.
  駅を中心に町が広がっている。 — "The town spreads out around the station."
  若者を中心に人気がある。 — "It's popular, especially with young people."

Before a noun: を中心とした / を中心とする (東京を中心とした地域 — "the area centred on Tokyo").`,
      cards: [
        { front: '山田さんを代表として、会議に派遣した。', reading: 'やまださんをだいひょうとして、かいぎにはけんした。', back: 'We sent Yamada to the meeting as our representative.' },
        { front: '合格を目標として、毎日勉強している。', reading: 'ごうかくをもくひょうとして、まいにちべんきょうしている。', back: 'I study every day with passing as my goal.' },
        { front: 'この会は日本語の練習を目的としている。', reading: 'このかいはにほんごのれんしゅうをもくてきとしている。', back: 'The purpose of this group is to practise Japanese.' },
        { front: 'このゲームは中高生を中心に流行している。', reading: 'このゲームはちゅうこうせいをちゅうしんにりゅうこうしている。', back: 'This game is popular, mainly among middle and high school students.' },
        { front: '台風は九州を中心に大きな被害をもたらした。', reading: 'たいふうはきゅうしゅうをちゅうしんにおおきなひがいをもたらした。', back: 'The typhoon caused great damage, centred on Kyushu.' },
        { front: '彼を中心としたグループが計画を立てた。', reading: 'かれをちゅうしんとしたグループがけいかくをたてた。', back: 'A group centred around him drew up the plan.' }
      ]
    },
    {
      key: 'n2c.wo-tsuujite',
      kind: 'grammar',
      title: '～を通じて・～を通して — through, throughout',
      body: `Noun + を通じて / を通して has two meanings.

1. Through (a means or intermediary):
  友人を通じて彼女と知り合った。 — "I got to know her through a friend."
  インターネットを通して情報を集める。 — "I gather information through the internet."
2. Throughout (a whole period or area):
  この地方は一年を通じて暖かい。 — "This region is warm all year round."
  生涯を通して、彼は絵を描き続けた。 — "Throughout his life, he kept painting."

The two forms are largely interchangeable. A loose tendency: を通じて suits communication channels and periods; を通して suits a deliberate method or the experience you go through (経験を通して学ぶ — "learn through experience").

Compare によって (N3 Grammar): によって marks a means or cause in general; を通じて stresses something passing through a channel or across a span.`,
      cards: [
        { front: '先輩を通じて、今の会社を紹介してもらった。', reading: 'せんぱいをつうじて、いまのかいしゃをしょうかいしてもらった。', back: 'I was introduced to my current company through a senior colleague.' },
        { front: 'ボランティア活動を通して、多くのことを学んだ。', reading: 'ボランティアかつどうをとおして、おおくのことをまなんだ。', back: 'I learned a great deal through volunteer work.' },
        { front: 'この島は一年を通じて観光客が多い。', reading: 'このしまはいちねんをつうじてかんこうきゃくがおおい。', back: 'This island has lots of tourists all year round.' },
        { front: 'テレビを通じて、事件が全国に伝えられた。', reading: 'テレビをつうじて、じけんがぜんこくにつたえられた。', back: 'The incident was reported nationwide through television.' },
        { front: '音楽を通して、世界中に友達ができた。', reading: 'おんがくをとおして、せかいじゅうにともだちができた。', back: 'Through music, I made friends all over the world.' },
        { front: '彼は生涯を通じて、平和のために働いた。', reading: 'かれはしょうがいをつうじて、へいわのためにはたらいた。', back: 'Throughout his life, he worked for peace.' }
      ]
    },
    {
      key: 'n2c.wo-kikkake',
      kind: 'grammar',
      title: '～をきっかけに・～を契機に — taking X as the trigger',
      body: `Noun + をきっかけに(して) means "with X as the trigger, prompted by X": a one-off event that started a new action or change.
  留学をきっかけに、日本の文化に興味を持った。 — "Studying abroad was what got me interested in Japanese culture."
  ある本をきっかけに、作家になろうと決めた。 — "A certain book prompted me to decide to become a writer."

With a verb, use the nominalizer: 引っ越したのをきっかけに — "with moving house as the trigger".

を契機に(して) / を契機として means the same and is more formal; it suits turning points in history, society or a career:
  戦争を契機に、国の制度が大きく変わった。 — "The war became the turning point for great changes in the national system."

The main clause is a new start or change, not a simple consequence.`,
      cards: [
        { front: '病気をきっかけに、たばこをやめた。', reading: 'びょうきをきっかけに、たばこをやめた。', back: 'Getting sick was what made me quit smoking.' },
        { front: 'アニメをきっかけに、日本語の勉強を始めた。', reading: 'アニメをきっかけに、にほんごのべんきょうをはじめた。', back: 'Anime was what got me started studying Japanese.' },
        { front: '結婚したのをきっかけに、仕事を変えた。', reading: 'けっこんしたのをきっかけに、しごとをかえた。', back: 'Getting married prompted me to change jobs.' },
        { front: 'ささいなことをきっかけに、二人は喧嘩を始めた。', reading: 'ささいなことをきっかけに、ふたりはけんかをはじめた。', back: 'Something trivial set the two of them off fighting.' },
        { front: 'オリンピックを契機に、町が大きく変わった。', reading: 'オリンピックをけいきに、まちがおおきくかわった。', back: 'The Olympics became the turning point that transformed the city.' },
        { front: '事故を契機として、安全対策が見直された。', reading: 'じこをけいきとして、あんぜんたいさくがみなおされた。', back: 'Prompted by the accident, safety measures were reviewed.' }
      ]
    },
    {
      key: 'n2c.wo-komete',
      kind: 'grammar',
      title: '～を込めて・～を頼りに — filled with, relying on',
      body: `Two compounds about what you put into an action, and what you lean on.

・Noun + を込めて — "with (feeling) poured in". Love, gratitude, prayers or anger put into something you make or do.
  感謝の気持ちを込めて、手紙を書いた。 — "I wrote a letter full of gratitude."
  心を込めて料理を作る。 — "I cook with all my heart."
  Before a noun: を込めた (愛を込めたプレゼント).

・Noun + を頼りに(して) — "relying on, guided by". The thing you depend on to manage or find your way.
  地図を頼りに、山道を歩いた。 — "I walked the mountain path relying on a map."
  わずかな記憶を頼りに、生まれた家を探した。 — "Guided only by faint memories, I searched for the house where I was born."`,
      cards: [
        { front: '愛を込めて、このセーターを編みました。', reading: 'あいをこめて、このセーターをあみました。', back: 'I knitted this sweater with love.' },
        { front: '平和への願いを込めて、鐘を鳴らした。', reading: 'へいわへのねがいをこめて、かねをならした。', back: 'They rang the bell with prayers for peace.' },
        { front: '心を込めて歌います。', reading: 'こころをこめてうたいます。', back: 'I will sing with all my heart.' },
        { front: '星の光を頼りに、夜の森を進んだ。', reading: 'ほしのひかりをたよりに、よるのもりをすすんだ。', back: 'We made our way through the night forest by the light of the stars.' },
        { front: '辞書を頼りに、日本語の小説を読んだ。', reading: 'じしょをたよりに、にほんごのしょうせつをよんだ。', back: 'I read a Japanese novel with the help of a dictionary.' },
        { front: '彼は兄を頼りにして、東京に出てきた。', reading: 'かれはあにをたよりにして、とうきょうにでてきた。', back: 'He came to Tokyo counting on his older brother.' }
      ]
    },
    {
      key: 'n2c.ni-saishite',
      kind: 'grammar',
      title: '～に際して・～にあたり・～に先立ち — on the occasion of, before',
      body: `Formal ways to tie an action to a special occasion. All three take a noun or a verb's dictionary form, and all belong to speeches, notices and business writing.

・に際して — "on the occasion of, when (doing something special)".
  入学に際して、必要な書類を提出してください。 — "Please submit the necessary documents upon enrolment."
・にあたって / にあたり — "on the occasion of, in undertaking". Used for important milestones, often with a resolution or a greeting. にあたり is the more formal.
  開会にあたり、一言ご挨拶申し上げます。 — "On the opening of this meeting, allow me to say a few words."
・に先立って / に先立ち — "prior to, ahead of". The action comes before the event as preparation.
  試合に先立ち、開会式が行われた。 — "An opening ceremony was held ahead of the match."

Compare 時 (N5): 入学の時 is any "when". These three mark a one-off, significant occasion, and sound ceremonious.`,
      cards: [
        { front: '出国に際して、パスポートを確認します。', reading: 'しゅっこくにさいして、パスポートをかくにんします。', back: 'We will check your passport on departure from the country.' },
        { front: '契約に際して、印鑑が必要です。', reading: 'けいやくにさいして、いんかんがひつようです。', back: 'A personal seal is required when signing the contract.' },
        { front: '新しい事業を始めるにあたって、資金を集めた。', reading: 'あたらしいじぎょうをはじめるにあたって、しきんをあつめた。', back: 'In starting the new business, we raised funds.' },
        { front: '卒業にあたり、先生方に感謝を申し上げます。', reading: 'そつぎょうにあたり、せんせいがたにかんしゃをもうしあげます。', back: 'On my graduation, I would like to thank my teachers.' },
        { front: '映画の公開に先立ち、試写会が開かれた。', reading: 'えいがのこうかいにさきだち、ししゃかいがひらかれた。', back: 'A preview screening was held ahead of the film\'s release.' },
        { front: '工事に先立って、住民への説明会を行った。', reading: 'こうじにさきだって、じゅうみんへのせつめいかいをおこなった。', back: 'Before the construction, a briefing was held for residents.' }
      ]
    },
    {
      key: 'n2c.ni-kakawarazu',
      kind: 'grammar',
      title: '～にかかわらず・～にもかかわらず — regardless of, despite',
      body: `Two patterns that look alike and mean different things.

・にかかわらず — "regardless of, whether or not". It follows a noun that covers a range (天候、年齢、経験) or a pair of opposites (晴雨、有無、行く行かない).
  年齢にかかわらず、誰でも参加できます。 — "Anyone can take part, regardless of age."
  参加するしないにかかわらず、返事をください。 — "Whether or not you attend, please reply."
・にもかかわらず — "despite, in spite of (a fact)". It follows a real fact, and the result goes against what that fact would lead you to expect.
  雨にもかかわらず、大勢の人が集まった。 — "Despite the rain, a large crowd gathered."
  努力したにもかかわらず、失敗した。 — "Despite my efforts, I failed."

Formation for にもかかわらず: plain form + にもかかわらず; nouns attach directly or with である, and な-adjectives take である (雨にもかかわらず、静かであるにもかかわらず).

The quick test: にかかわらず = "it makes no difference which"; にもかかわらず = "even though it was so". にもかかわらず is a formal のに, without のに's emotion.`,
      cards: [
        { front: '経験の有無にかかわらず、応募できます。', reading: 'けいけんのうむにかかわらず、おうぼできます。', back: 'You can apply whether or not you have experience.' },
        { front: '天候にかかわらず、試合は行われます。', reading: 'てんこうにかかわらず、しあいはおこなわれます。', back: 'The match will take place regardless of the weather.' },
        { front: '好き嫌いにかかわらず、全部食べなさい。', reading: 'すききらいにかかわらず、ぜんぶたべなさい。', back: 'Eat it all, whether you like it or not.' },
        { front: '熱があるにもかかわらず、彼は会社に来た。', reading: 'ねつがあるにもかかわらず、かれはかいしゃにきた。', back: 'Despite having a fever, he came to work.' },
        { front: '平日にもかかわらず、店は混んでいた。', reading: 'へいじつにもかかわらず、みせはこんでいた。', back: 'Even though it was a weekday, the shop was crowded.' },
        { front: '何度も注意されたにもかかわらず、彼はまた遅刻した。', reading: 'なんどもちゅういされたにもかかわらず、かれはまたちこくした。', back: 'Despite being warned again and again, he was late again.' }
      ]
    },
    {
      key: 'n2c.ni-tomonatte',
      kind: 'grammar',
      title: '～に伴って・～に応じて — along with, according to',
      body: `Two compounds that tie one change to another.

・Noun / verb dictionary form + に伴って (に伴い) — "along with, as X happens, Y happens too". One change brings another with it; formal and common in news.
  人口の増加に伴って、住宅が不足してきた。 — "Along with the population growth, housing has become scarce."
  Before a noun: に伴う (地震に伴う津波 — "the tsunami that came with the earthquake").
・Noun + に応じて — "according to, in response to". The response is adjusted to fit X.
  収入に応じて、税金が決まる。 — "Tax is set according to income."
  客の注文に応じて、料理を作る。 — "We cook to the customer's order."
  Before a noun: に応じた (能力に応じた仕事 — "work suited to one's ability").

Compare につれて (N2 Grammar II): につれて describes a gradual, proportional change. に伴って can be a single event bringing a consequence, and に応じて is about matching something to circumstances.`,
      cards: [
        { front: '経済の発展に伴って、環境問題が深刻になった。', reading: 'けいざいのはってんにともなって、かんきょうもんだいがしんこくになった。', back: 'Along with economic growth, environmental problems became serious.' },
        { front: '台風の接近に伴い、電車の運転を見合わせます。', reading: 'たいふうのせっきんにともない、でんしゃのうんてんをみあわせます。', back: 'With the typhoon approaching, train services are suspended.' },
        { front: '引っ越しに伴う手続きは面倒だ。', reading: 'ひっこしにともなうてつづきはめんどうだ。', back: 'The paperwork that comes with moving is a pain.' },
        { front: '季節に応じて、メニューを変えている。', reading: 'きせつにおうじて、メニューをかえている。', back: 'We change the menu according to the season.' },
        { front: '予算に応じて、プランをお選びいただけます。', reading: 'よさんにおうじて、プランをおえらびいただけます。', back: 'You can choose a plan to suit your budget.' },
        { front: 'レベルに応じたクラスに分かれて勉強する。', reading: 'レベルにおうじたクラスにわかれてべんきょうする。', back: 'We study in classes divided according to level.' }
      ]
    },
    {
      key: 'n2c.ni-sotte',
      kind: 'grammar',
      title: '～に沿って・～に応えて・～に反して — along, in response to, contrary to',
      body: `Three noun + に compounds about how an action relates to an expectation or a line.

・に沿って — "along; in line with". Literally along a road or river, figuratively following a plan or policy.
  川に沿って歩いた。 — "I walked along the river."
  マニュアルに沿って作業してください。 — "Please work in line with the manual."
・に応えて — "in response to, living up to". You answer someone's hopes, request or support.
  ファンの声援に応えて、選手は手を振った。 — "In response to the fans' cheers, the player waved."
  期待に応えられるよう頑張ります。 — "I'll do my best to live up to your expectations."
・に反して — "contrary to, against". Something turned out against an expectation, or breaks a rule.
  予想に反して、試合に負けた。 — "Contrary to expectations, we lost the match."
  規則に反して — "in violation of the rules"

Before a noun: に沿った、に応えた / に応える、に反する (法律に反する行為 — "an act contrary to the law").`,
      cards: [
        { front: '線路に沿って、桜の木が並んでいる。', reading: 'せんろにそって、さくらのきがならんでいる。', back: 'Cherry trees line the railway track.' },
        { front: '会社の方針に沿って、計画を立てた。', reading: 'かいしゃのほうしんにそって、けいかくをたてた。', back: 'We drew up the plan in line with company policy.' },
        { front: '客の要望に応えて、営業時間を延ばした。', reading: 'きゃくのようぼうにこたえて、えいぎょうじかんをのばした。', back: 'In response to customer requests, we extended our opening hours.' },
        { front: '親の期待に応えたいと思っている。', reading: 'おやのきたいにこたえたいとおもっている。', back: "I want to live up to my parents' expectations." },
        { front: '天気予報に反して、一日中晴れていた。', reading: 'てんきよほうにはんして、いちにちじゅうはれていた。', back: 'Contrary to the forecast, it was sunny all day.' },
        { front: 'それは法律に反する行為だ。', reading: 'それはほうりつにはんするこういだ。', back: 'That is an act against the law.' }
      ]
    },
    {
      key: 'n2c.ni-watatte',
      kind: 'grammar',
      title: '～にわたって — over, across (a whole span)',
      body: `Noun + にわたって (にわたり) means "over, throughout, spanning": something continues across the whole of a long period, a wide area, or many items.
  会議は五時間にわたって続いた。 — "The meeting went on for five hours."
  広い範囲にわたって、停電した。 — "The power went out over a wide area."
  Before a noun: にわたる (三日間にわたる祭り — "a festival lasting three days").

The noun gives the extent: a length of time (十年、三日間), a range of places (全国、各地) or of things (多方面、全ページ). The phrasing stresses that the span is large.

Compare から～にかけて (N3 Grammar III): にかけて roughly marks start and end points; にわたって takes the whole stretch as one block and stresses its size.`,
      cards: [
        { front: '工事は三か月にわたって行われる。', reading: 'こうじはさんかげつにわたっておこなわれる。', back: 'The construction will be carried out over three months.' },
        { front: '台風の被害は全国にわたった。', reading: 'たいふうのひがいはぜんこくにわたった。', back: 'The typhoon damage spread across the whole country.' },
        { front: '彼は十年にわたって、この研究を続けてきた。', reading: 'かれはじゅうねんにわたって、このけんきゅうをつづけてきた。', back: 'He has continued this research for ten years.' },
        { front: '手術は八時間にわたった。', reading: 'しゅじゅつははちじかんにわたった。', back: 'The operation lasted eight hours.' },
        { front: '二日間にわたる会議がやっと終わった。', reading: 'ふつかかんにわたるかいぎがやっとおわった。', back: 'The two-day conference finally ended.' },
        { front: '彼女の活動は多方面にわたっている。', reading: 'かのじょのかつどうはたほうめんにわたっている。', back: 'Her activities span many fields.' }
      ]
    },
    {
      key: 'n2c.ni-kakete-wa',
      kind: 'grammar',
      title: '～にかけては — when it comes to (a skill)',
      body: `Noun + にかけては (にかけても) means "when it comes to X, (someone) is the best". It praises a person's skill or knowledge in one specific area, usually with a confident or proud tone.
  料理にかけては、母に勝てる人はいない。 — "When it comes to cooking, nobody can beat my mother."
  足の速さにかけては、自信がある。 — "When it comes to running speed, I'm confident."

The main clause is a strong positive evaluation: 誰にも負けない、一番だ、自信がある、右に出る者はいない.

Compare について / に関して (N3 Grammar II): those are a neutral "about". にかけては narrows to one field in order to praise ability in it; it does not take neutral or negative statements.`,
      cards: [
        { front: '数学にかけては、クラスで彼女が一番だ。', reading: 'すうがくにかけては、クラスでかのじょがいちばんだ。', back: "When it comes to maths, she's the best in the class." },
        { front: '歌の上手さにかけては、彼の右に出る者はいない。', reading: 'うたのうまさにかけては、かれのみぎにでるものはいない。', back: 'When it comes to singing, no one can top him.' },
        { front: '早起きにかけては、誰にも負けない。', reading: 'はやおきにかけては、だれにもまけない。', back: 'When it comes to getting up early, nobody beats me.' },
        { front: 'ゲームの知識にかけては、弟は専門家並みだ。', reading: 'ゲームのちしきにかけては、おとうとはせんもんかなみだ。', back: 'When it comes to knowledge of games, my brother is on a par with an expert.' },
        { front: '交渉にかけては、彼女はプロ中のプロだ。', reading: 'こうしょうにかけては、かのじょはプロちゅうのプロだ。', back: 'When it comes to negotiating, she is a pro among pros.' },
        { front: 'この店はラーメンの味にかけては、どこにも負けない。', reading: 'このみせはラーメンのあじにかけては、どこにもまけない。', back: 'When it comes to the taste of its ramen, this shop is second to none.' }
      ]
    },
    {
      key: 'n2c.viewpoint',
      kind: 'grammar',
      title: '～にしたら・～からすると・～から見ると・～から言うと — from the viewpoint of',
      body: `Several ways to say "from X's point of view", each with its own slant.

・Person + にしたら (にすれば) — "for X, if you were X". You imagine how someone else feels. Only people.
  子供にしたら、毎日の塾はつらいだろう。 — "For the kids, cram school every day must be hard."
・Noun + からすると / からすれば — "judging from, from the standpoint of". A judgment based on a viewpoint or on evidence.
  あの態度からすると、彼は反省していない。 — "Judging from that attitude, he isn't sorry."
・Noun + から見ると / から見れば — "seen from". The angle from which something looks a certain way.
  外国人から見ると、日本の習慣は不思議に見える。 — "Seen through foreign eyes, Japanese customs look strange."
・Noun + から言うと / から言えば — "in terms of, speaking from". A judgment by a particular criterion or role.
  結論から言うと、計画は中止だ。 — "To give you the conclusion first: the plan is off."

Compare にとって (N3 Grammar III): にとって states what something means to someone (important, difficult). にしたら adds sympathy: you put yourself in their shoes.`,
      cards: [
        { front: '親にしたら、子供の安全が一番の心配だ。', reading: 'おやにしたら、こどものあんぜんがいちばんのしんぱいだ。', back: "For parents, their children's safety is the biggest worry." },
        { front: '彼にすれば、迷惑な話だろう。', reading: 'かれにすれば、めいわくなはなしだろう。', back: "From his point of view, it must be a nuisance." },
        { front: 'この足跡からすると、犯人は大柄な男だ。', reading: 'このあしあとからすると、はんにんはおおがらなおとこだ。', back: 'Judging from these footprints, the culprit is a large man.' },
        { front: '子供の目から見ると、大人の世界は不思議だ。', reading: 'こどものめからみると、おとなのせかいはふしぎだ。', back: "Seen through a child's eyes, the adult world is strange." },
        { front: '専門家の立場から言えば、この計画には問題がある。', reading: 'せんもんかのたちばからいえば、このけいかくにはもんだいがある。', back: "Speaking from an expert's standpoint, this plan has problems." },
        { front: '値段から言うと、こちらの方がお得だ。', reading: 'ねだんからいうと、こちらのほうがおとくだ。', back: 'In terms of price, this one is the better deal.' }
      ]
    },
    {
      key: 'n2c.ni-yori',
      kind: 'grammar',
      title: '～により・～による — by, due to (formal)',
      body: `により is the formal, written form of によって (N3 Grammar). It has the same range of meanings:

・Cause — "due to, because of": 強風により、電車が止まった。 — "Trains stopped due to strong winds."
・Means — "by means of": 投票により、代表を選ぶ。 — "Representatives are chosen by vote."
・Agent of a passive — "by": この寺は有名な建築家により設計された。 — "This temple was designed by a famous architect."
・Variation — "depending on": 地域により、方言が違う。 — "Dialects differ by region."

Before a noun it becomes による: 地震による被害 — "damage caused by the earthquake".

により and による are what you see in news, signs and official writing; in speech, によって or で is more natural.`,
      cards: [
        { front: '大雪により、高速道路が通行止めになった。', reading: 'おおゆきにより、こうそくどうろがつうこうどめになった。', back: 'The motorway was closed due to heavy snow.' },
        { front: '話し合いにより、問題が解決した。', reading: 'はなしあいにより、もんだいがかいけつした。', back: 'The problem was resolved through discussion.' },
        { front: 'この法律は国会により定められた。', reading: 'このほうりつはこっかいによりさだめられた。', back: 'This law was enacted by the Diet.' },
        { front: '人により、考え方は様々だ。', reading: 'ひとにより、かんがえかたはさまざまだ。', back: 'Ways of thinking vary from person to person.' },
        { front: '不注意による事故が増えている。', reading: 'ふちゅういによるじこがふえている。', back: 'Accidents caused by carelessness are on the rise.' },
        { front: '台風による被害は大きかった。', reading: 'たいふうによるひがいはおおきかった。', back: 'The damage caused by the typhoon was great.' }
      ]
    },
    {
      key: 'n2c.ni-suginai',
      kind: 'grammar',
      title: '～に過ぎない・～にほかならない — merely, nothing other than',
      body: `Two endings that look similar and point in opposite directions.

・に過ぎない — "merely, no more than". It plays something down: it is only that, nothing bigger.
  それは噂に過ぎない。 — "That's nothing more than a rumour."
  私は一社員に過ぎません。 — "I'm merely an ordinary employee."
・にほかならない — "nothing other than, precisely". It insists that something is exactly this and nothing else; often explains a cause.
  成功したのは、努力の結果にほかならない。 — "The success is nothing other than the result of hard work."
  Often with から: 彼が怒ったのは、君を心配しているからにほかならない — "He got angry precisely because he worries about you."

Formation: noun or plain form + に過ぎない; noun + にほかならない (a clause goes in front of から or ため: ～からにほかならない).

Compare ただの: ただの噂だ says the same as 噂に過ぎない in a plainer register.`,
      cards: [
        { front: 'これは私の個人的な意見に過ぎない。', reading: 'これはわたしのこじんてきないけんにすぎない。', back: 'This is merely my personal opinion.' },
        { front: '彼の話は言い訳に過ぎない。', reading: 'かれのはなしはいいわけにすぎない。', back: "What he says is nothing but an excuse." },
        { front: '合格者は受験者の一割に過ぎなかった。', reading: 'ごうかくしゃはじゅけんしゃのいちわりにすぎなかった。', back: 'Those who passed were a mere ten percent of the candidates.' },
        { front: 'この勝利は、チーム全員の努力にほかならない。', reading: 'このしょうりは、チームぜんいんのどりょくにほかならない。', back: "This victory is nothing other than the whole team's effort." },
        { front: '親が厳しいのは、子供を愛しているからにほかならない。', reading: 'おやがきびしいのは、こどもをあいしているからにほかならない。', back: 'Parents are strict precisely because they love their children.' },
        { front: '彼の行動は裏切りにほかならない。', reading: 'かれのこうどうはうらぎりにほかならない。', back: 'His actions are nothing short of betrayal.' }
      ]
    },
    {
      key: 'n2c.no-moto-de',
      kind: 'grammar',
      title: '～の下で・～の上では — under, on paper',
      body: `Two noun + の compounds.

・の下で (のもとで) — "under (someone's guidance, a condition or a system)". Not a physical "below" here, but being under someone's influence or within a set of conditions.
  有名な先生の下で、ピアノを習った。 — "I studied piano under a famous teacher."
  厳しい条件の下で、研究が行われた。 — "The research was carried out under strict conditions."
・の上では — "in terms of, according to (on paper)". What a document, a number or a rule says, often contrasted with reality.
  暦の上では、もう春だ。 — "According to the calendar, it's already spring." (but it's still cold)
  データの上では、問題はない。 — "On paper, there's no problem."

When written 下, read it もと in this pattern (の下で — のもとで); the plain place word 木の下 is きのした.`,
      cards: [
        { front: '彼は祖父の下で、大工の仕事を学んだ。', reading: 'かれはそふのもとで、だいくのしごとをまなんだ。', back: 'He learned carpentry under his grandfather.' },
        { front: '新しい監督の下で、チームは強くなった。', reading: 'あたらしいかんとくのもとで、チームはつよくなった。', back: 'Under the new manager, the team grew stronger.' },
        { front: '両親の愛情の下で、すくすく育った。', reading: 'りょうしんのあいじょうのもとで、すくすくそだった。', back: "I grew up healthy under my parents' love." },
        { front: '計算の上では、間に合うはずだ。', reading: 'けいさんのうえでは、まにあうはずだ。', back: 'According to the calculations, we should make it in time.' },
        { front: '法律の上では、彼にも権利がある。', reading: 'ほうりつのうえでは、かれにもけんりがある。', back: 'Legally speaking, he has rights too.' },
        { front: '数字の上では景気は回復しているが、実感はない。', reading: 'すうじのうえではけいきはかいふくしているが、じっかんはない。', back: "On paper the economy is recovering, but it doesn't feel like it." }
      ]
    }
  ]
}
