import type { SeedCourseDef } from '../japaneseSeed'

// JLPT N2 Grammar IV (2026-10-16): the N2 clause patterns — resolve, limits,
// excess, strong feelings, judgments and the rest — the earlier N2 courses did
// not reach. Right after JLPT N2 Grammar III. Keys are frozen.

export const N2D_COURSE: SeedCourseDef = {
  title: 'JLPT N2 Grammar IV',
  description:
    'The rest of the N2 core: since-then resolve, as long as, too much, worth the effort, can\'t stand it, ' +
    'naturally, depending on and more. Do this right after JLPT N2 Grammar III.',
  level: 'N2',
  lessons: [
    {
      key: 'n2d.karaniwa',
      kind: 'grammar',
      title: '～からには・～以上(は)・～上は — now that, since',
      body: `Three ways to say "since (this is so), then (I must / you should)". The first clause is a fact or a commitment; the second is a resolution, duty or strong judgment that follows from it.

・からには — "now that, seeing that". The most common in speech.
  約束したからには、守らなければならない。 — "Now that I've promised, I have to keep it."
・以上(は) — "since, as long as". A little more formal and logical.
  学生である以上、勉強するのは当然だ。 — "As long as you're a student, studying is a given."
・上は — "now that". Formal and literary; often for a grave decision.
  こうなった上は、もう逃げられない。 — "Now that it has come to this, there's no escape."

Formation: plain form + からには / 以上 / 上は; nouns and な-adjectives take である (学生である以上).

The second clause must be a resolution, obligation, request or strong conclusion (～なければならない、～べきだ、～つもりだ、～てください). A neutral result does not fit: 日本に来たからには、富士山に登りたい works; 日本に来たからには、雨が降った does not.`,
      cards: [
        { front: 'やると決めたからには、最後までやる。', reading: 'やるときめたからには、さいごまでやる。', back: "Now that I've decided to do it, I'll see it through to the end." },
        { front: '試合に出るからには、優勝を目指したい。', reading: 'しあいにでるからには、ゆうしょうをめざしたい。', back: 'Since I am entering the tournament, I want to aim for the title.' },
        { front: '引き受けた以上、責任を持ってやります。', reading: 'ひきうけたいじょう、せきにんをもってやります。', back: "Since I've taken it on, I'll do it responsibly." },
        { front: 'プロである以上、言い訳はできない。', reading: 'プロであるいじょう、いいわけはできない。', back: "As long as you're a professional, you can't make excuses." },
        { front: 'ここまで来た上は、前に進むしかない。', reading: 'ここまできたうえは、まえにすすむしかない。', back: "Now that we've come this far, there's nothing for it but to press on." },
        { front: '日本に住む以上、日本のルールを守るべきだ。', reading: 'にほんにすむいじょう、にほんのルールをまもるべきだ。', back: 'As long as you live in Japan, you should follow its rules.' }
      ]
    },
    {
      key: 'n2d.kagiri',
      kind: 'grammar',
      title: '～限り(は)・～ない限り — as long as, unless',
      body: `限り (かぎり, "limit") sets the condition under which something holds.

・Plain form + 限り(は) — "as long as, while". The statement holds within that condition.
  私が生きている限り、君を守る。 — "As long as I live, I'll protect you."
  ここにいる限りは、安全だ。 — "As long as you're here, you're safe."
・Verb ない-form + 限り — "unless". Nothing changes unless this happens.
  謝らない限り、許さない。 — "Unless you apologize, I won't forgive you."
  よほどのことがない限り、遅刻はしない。 — "Barring something serious, I won't be late."

It also means "as far as (my knowledge goes)": 私の知る限り、彼は独身だ — "As far as I know, he's single." And with a noun, "only, limited to": 今日限りの特価 — "a special price for today only".

Compare ～ば (N4): 謝れば許す is a plain condition. ない限り stresses that it is the one and only way.`,
      cards: [
        { front: '体が動く限り、働き続けたい。', reading: 'からだがうごくかぎり、はたらきつづけたい。', back: 'As long as my body can move, I want to keep working.' },
        { front: '雨が降らない限り、試合は行われる。', reading: 'あめがふらないかぎり、しあいはおこなわれる。', back: 'Unless it rains, the match will be held.' },
        { front: '努力しない限り、上手にはならない。', reading: 'どりょくしないかぎり、じょうずにはならない。', back: "Unless you put in the effort, you won't get better." },
        { front: '私が知っている限り、彼は嘘をつく人ではない。', reading: 'わたしがしっているかぎり、かれはうそをつくひとではない。', back: "As far as I know, he isn't someone who lies." },
        { front: 'このチケットは今日限り有効です。', reading: 'このチケットはきょうかぎりゆうこうです。', back: 'This ticket is valid for today only.' },
        { front: '本人の許可がない限り、写真は公開しない。', reading: 'ほんにんのきょかがないかぎり、しゃしんはこうかいしない。', back: "We won't publish the photo without the person's permission." }
      ]
    },
    {
      key: 'n2d.amari',
      kind: 'grammar',
      title: '～あまり(に) — so much that (too much)',
      body: `あまり means "excess". As a clause ending it says a feeling or state went so far that it caused a result, usually an unwanted one.

Formation: verb plain form / noun + の + あまり(に).
  心配のあまり、眠れなかった。 — "I was so worried that I couldn't sleep."
  急ぐあまり、財布を忘れた。 — "I was in such a hurry that I forgot my wallet."
  な-adjectives take な: 熱心なあまり — "being so keen".

The first part is usually an emotion or an intense state (驚き、嬉しさ、悲しみ、緊張、心配); the result is involuntary (泣く、倒れる、声が出ない), not a decision.

Also: あまりの + noun + に means "with such (noun)": あまりの暑さに、倒れそうだった — "The heat was so intense I nearly collapsed." Do not confuse with あまり～ない ("not very", N4).`,
      cards: [
        { front: '嬉しさのあまり、泣いてしまった。', reading: 'うれしさのあまり、ないてしまった。', back: 'I was so happy I burst into tears.' },
        { front: '緊張のあまり、声が出なかった。', reading: 'きんちょうのあまり、こえがでなかった。', back: 'I was so nervous that no sound came out.' },
        { front: '勝ちたいと思うあまり、ミスが増えた。', reading: 'かちたいとおもうあまり、ミスがふえた。', back: 'I wanted to win so badly that I made more mistakes.' },
        { front: '驚きのあまり、言葉を失った。', reading: 'おどろきのあまり、ことばをうしなった。', back: 'I was so shocked I was lost for words.' },
        { front: 'あまりの寒さに、手が動かなかった。', reading: 'あまりのさむさに、てがうごかなかった。', back: 'It was so cold that my hands would not move.' },
        { front: '子供を心配するあまり、親は口うるさくなる。', reading: 'こどもをしんぱいするあまり、おやはくちうるさくなる。', back: 'Parents worry so much about their children that they turn into nags.' }
      ]
    },
    {
      key: 'n2d.kai',
      kind: 'grammar',
      title: '～かいがあって・～かいもなく — paid off, in vain',
      body: `かい (甲斐) means "worth, reward for effort". The pattern says whether an effort paid off.

・Verb た-form / noun + の + かいがあって — "the effort paid off, and…".
  練習したかいがあって、試合に勝った。 — "The practice paid off: we won the match."
  努力のかいがあって、合格した。 — "My hard work paid off and I passed."
・Verb た-form / noun + の + かいもなく — "in spite of (the effort), in vain".
  看病のかいもなく、犬は死んでしまった。 — "Despite all our nursing, the dog died."

As a compound, verb ます-stem + がい means "worth doing": やりがいのある仕事 — "a rewarding job", 生きがい — "a reason for living".

The effort in the first half is usually one the speaker values: training, studying, caring, waiting.`,
      cards: [
        { front: '早起きしたかいがあって、いい席が取れた。', reading: 'はやおきしたかいがあって、いいせきがとれた。', back: 'Getting up early paid off: we got good seats.' },
        { front: '毎日勉強したかいがあって、日本語が話せるようになった。', reading: 'まいにちべんきょうしたかいがあって、にほんごがはなせるようになった。', back: 'Studying every day paid off, and now I can speak Japanese.' },
        { front: '応援のかいもなく、チームは負けてしまった。', reading: 'おうえんのかいもなく、チームはまけてしまった。', back: 'Despite all our cheering, the team lost.' },
        { front: '急いだかいもなく、電車に乗り遅れた。', reading: 'いそいだかいもなく、でんしゃにのりおくれた。', back: 'Rushing was in vain: I missed the train.' },
        { front: '長い時間待ったかいがあった。', reading: 'ながいじかんまったかいがあった。', back: 'It was worth the long wait.' },
        { front: 'この仕事は大変だが、やりがいがある。', reading: 'このしごとはたいへんだが、やりがいがある。', back: 'This job is tough, but it is rewarding.' }
      ]
    },
    {
      key: 'n2d.ka-naika',
      kind: 'grammar',
      title: '～か～ないかのうちに・～たかと思ったら — no sooner than',
      body: `Two patterns for one thing following another almost instantly.

・Verb (dictionary or た-form) + か + verb ない-form + かのうちに — "no sooner had X (or not even quite) than Y". The second event begins at the very moment, or even before, the first is complete.
  ベルが鳴るか鳴らないかのうちに、学生たちは教室を飛び出した。 — "The bell had barely rung when the students rushed out of the classroom."
・Verb た-form + かと思ったら / かと思うと — "just when (I noticed) X, Y". Often a surprising, rapid change, and the speaker describes what they saw.
  空が暗くなったかと思ったら、雨が降り出した。 — "No sooner had the sky gone dark than it began to rain."
  弟は帰ってきたかと思うと、すぐ出かけた。 — "My brother had only just come home when he went out again."

Both describe observed events, not your own plans, so the main clause is not a request or intention.

Compare たとたん (N2 Grammar II): たとたん stresses suddenness right after X; these two stress that X had hardly happened at all.`,
      cards: [
        { front: '横になるかならないかのうちに、眠ってしまった。', reading: 'よこになるかならないかのうちに、ねむってしまった。', back: 'I had barely lain down when I fell asleep.' },
        { front: '映画が終わるか終わらないかのうちに、彼は席を立った。', reading: 'えいががおわるかおわらないかのうちに、かれはせきをたった。', back: 'The film had hardly ended when he stood up.' },
        { front: '子供が泣いたかと思ったら、もう笑っている。', reading: 'こどもがないたかとおもったら、もうわらっている。', back: 'One moment the child was crying, the next it was already laughing.' },
        { front: '彼女は来たかと思うと、すぐに帰ってしまった。', reading: 'かのじょはきたかとおもうと、すぐにかえってしまった。', back: 'No sooner had she arrived than she left again.' },
        { front: '雷が光ったかと思うと、大きな音がした。', reading: 'かみなりがひかったかとおもうと、おおきなおとがした。', back: 'No sooner had the lightning flashed than there was a huge crash.' },
        { front: '席に着くか着かないかのうちに、授業が始まった。', reading: 'せきにつくかつかないかのうちに、じゅぎょうがはじまった。', back: 'I had barely sat down when the lesson began.' }
      ]
    },
    {
      key: 'n2d.ka-maika',
      kind: 'grammar',
      title: '～か～まいか — whether or not to',
      body: `Volitional form + か + まい-form + か expresses being torn between doing something and not doing it: "whether or not to".
  行こうか行くまいか、迷っている。 — "I'm torn about whether or not to go."
  言おうか言うまいか、ずっと考えていた。 — "I kept wondering whether or not to say it."

まい is the negative volitional (N2 Grammar II): "will not, shall not". The pattern pairs "let's do it" with "let's not" and is almost always followed by 迷う、悩む or 考える.

Formation of まい: godan verbs use the dictionary form (行くまい、言うまい); ichidan verbs use the dictionary form or the stem (食べるまい / 食べまい); する → するまい / すまい, 来る → 来るまい / こまい.

In casual speech, ～しようかどうしようか or ～か～ないか is more common; か～まいか is written or literary.`,
      cards: [
        { front: '買おうか買うまいか、店の前で迷った。', reading: 'かおうかかうまいか、みせのまえでまよった。', back: 'I stood in front of the shop, torn about whether to buy it.' },
        { front: '彼に本当のことを話そうか話すまいか悩んでいる。', reading: 'かれにほんとうのことをはなそうかはなすまいかなやんでいる。', back: "I'm agonizing over whether or not to tell him the truth." },
        { front: '会社を辞めようか辞めまいか、一晩中考えた。', reading: 'かいしゃをやめようかやめまいか、ひとばんじゅうかんがえた。', back: 'I spent all night deciding whether or not to quit my job.' },
        { front: '電話しようかするまいか、迷っているうちに夜になった。', reading: 'でんわしようかするまいか、まよっているうちによるになった。', back: 'While I hesitated over whether to call, night fell.' },
        { front: 'パーティーに行こうか行くまいか、まだ決めていない。', reading: 'パーティーにいこうかいくまいか、まだきめていない。', back: "I still haven't decided whether or not to go to the party." },
        { front: '告白しようかするまいか、彼は何日も悩んだ。', reading: 'こくはくしようかするまいか、かれはなんにちもなやんだ。', back: 'For days he agonized over whether to confess his feelings.' }
      ]
    },
    {
      key: 'n2d.karakoso',
      kind: 'grammar',
      title: '～からこそ・～てこそ — precisely because, only by',
      body: `こそ is an emphatic particle: "this one and no other". It strengthens a reason or a condition.

・Plain form + からこそ — "precisely because". The reason is stressed, often against what you might expect.
  君を信じているからこそ、厳しく言うんだ。 — "It's precisely because I believe in you that I'm being harsh."
  忙しいからこそ、休みが大切だ。 — "It's precisely because we're busy that rest matters."
・Verb て-form + こそ — "only by, only when". The value appears only once the action is done.
  自分でやってこそ、本当に分かる。 — "Only by doing it yourself do you truly understand."
  苦労してこそ、成功の喜びがある。 — "Only through hardship do you feel the joy of success."

からこそ does not take ので: ので is too soft to be stressed. Compare ばこそ (N1 Grammar II), the literary cousin of からこそ.`,
      cards: [
        { front: '好きだからこそ、もっと上手になりたい。', reading: 'すきだからこそ、もっとじょうずになりたい。', back: "It's precisely because I love it that I want to get better." },
        { front: '失敗したからこそ、学べることもある。', reading: 'しっぱいしたからこそ、まなべることもある。', back: 'Some things you can learn precisely because you failed.' },
        { front: '家族がいるからこそ、頑張れるんだ。', reading: 'かぞくがいるからこそ、がんばれるんだ。', back: "It's because I have my family that I can keep going." },
        { front: '健康であってこそ、仕事も楽しめる。', reading: 'けんこうであってこそ、しごともたのしめる。', back: 'Only when you are healthy can you enjoy your work too.' },
        { front: '現地に行ってこそ、その国の良さが分かる。', reading: 'げんちにいってこそ、そのくにのよさがわかる。', back: "Only by going there can you see what's good about a country." },
        { front: '毎日練習してこそ、上達するものだ。', reading: 'まいにちれんしゅうしてこそ、じょうたつするものだ。', back: 'Only by practising every day do you improve.' }
      ]
    },
    {
      key: 'n2d.karashite',
      kind: 'grammar',
      title: '～からして・～ことから — to start with, from the fact that',
      body: `Two patterns that reason from a piece of evidence.

・Noun + からして — "to start with, even (just) X". The most basic or first thing already shows the overall picture, usually negative.
  あの店は、店員の態度からして悪い。 — "That shop — even the staff's attitude is bad, to start with."
  It also means "judging from": 彼の話し方からして、関西の人だろう — "Judging from the way he talks, he must be from Kansai."
・Plain form + ことから — "from the fact that, because". Gives the basis for a name, a conclusion or a decision; written and explanatory.
  富士山が見えることから、この町は富士見町と呼ばれる。 — "Because Mount Fuji can be seen from it, this town is called Fujimi-cho."
  な-adjectives and nouns take な / である: 静かなことから、彼女が留守だと分かった.

Compare から: ～から gives a reason plainly. ことから stresses that a fact led to a conclusion or a name; からして picks out one telling detail.`,
      cards: [
        { front: 'この映画は、タイトルからしてつまらなそうだ。', reading: 'このえいがは、タイトルからしてつまらなそうだ。', back: 'This film looks dull — starting with the title.' },
        { front: '彼は服装からして、ただ者ではない。', reading: 'かれはふくそうからして、ただものではない。', back: 'Even just from his clothes, he is clearly no ordinary person.' },
        { front: 'あの表情からして、何かあったに違いない。', reading: 'あのひょうじょうからして、なにかあったにちがいない。', back: 'Judging from that expression, something must have happened.' },
        { front: '指紋が一致したことから、彼が犯人だと分かった。', reading: 'しもんがいっちしたことから、かれがはんにんだとわかった。', back: 'From the fact that the fingerprints matched, they knew he was the culprit.' },
        { front: '星の形に似ていることから、この花は「星草」と呼ばれる。', reading: 'ほしのかたちににていることから、このはなは「ほしくさ」とよばれる。', back: 'Because it resembles the shape of a star, this flower is called "star grass".' },
        { front: '電気がついていないことから、留守だと思った。', reading: 'でんきがついていないことから、るすだとおもった。', back: 'Since the lights were off, I assumed nobody was home.' }
      ]
    },
    {
      key: 'n2d.sou-ni-nai',
      kind: 'grammar',
      title: '～そうにない・～っこない — unlikely to, no way',
      body: `Two ways to say something is very unlikely or impossible.

・Verb ます-stem + そうにない (そうもない) — "not likely to, doesn't look as if". The negative of the "looks like" そう (N4).
  この仕事は今日中に終わりそうにない。 — "This work doesn't look like it'll be finished today."
  雨はやみそうもない。 — "The rain shows no sign of stopping."
・Verb ます-stem + っこない — "no way, there's no chance". Casual, emphatic, and often a little childish or exasperated.
  そんなの、できっこないよ。 — "There's no way I can do that!"
  宝くじなんて当たりっこない。 — "You'll never win the lottery."

っこない appears most with potential and simple verbs (できる、分かる、勝てる、言える). Compare わけがない (N3): 勝てるわけがない reasons logically; 勝てっこない just insists.`,
      cards: [
        { front: '道が混んでいて、間に合いそうにない。', reading: 'みちがこんでいて、まにあいそうにない。', back: "The roads are jammed — it doesn't look like we'll make it." },
        { front: 'この量は一人では食べられそうもない。', reading: 'このりょうはひとりではたべられそうもない。', back: "I don't think I could eat this much on my own." },
        { front: '彼女は当分、怒りがおさまりそうにない。', reading: 'かのじょはとうぶん、いかりがおさまりそうにない。', back: "Her anger doesn't look like it'll die down any time soon." },
        { front: 'あんな強いチームに、勝てっこない。', reading: 'あんなつよいチームに、かてっこない。', back: "There's no way we can beat a team that strong." },
        { front: '言ったって、分かりっこないよ。', reading: 'いったって、わかりっこないよ。', back: "Even if I tell you, there's no way you'd understand." },
        { front: '一日で百ページなんて、読めっこない。', reading: 'いちにちでひゃくページなんて、よめっこない。', back: "No way can I read a hundred pages in one day." }
      ]
    },
    {
      key: 'n2d.kiri',
      kind: 'grammar',
      title: '～たきり・～きり — since then (and nothing more), only',
      body: `きり marks a limit.

・Verb た-form + きり — "(did X) and then nothing since". Something happened once and the expected next step never came. Often followed by a negative.
  彼は朝出かけたきり、帰ってこない。 — "He went out this morning and hasn't come back since."
  一度会ったきりで、それ以来連絡がない。 — "We met just once, and I haven't heard from them since."
・Noun / number + きり — "only, just". Casual forms: っきり (二人っきり — "just the two of us").
  これきり — "this is the last time" / 一人きり — "all alone"
・きりがない — "there's no end to it": 欲を言えばきりがない — "If you start wanting more, there's no end."

Compare だけ (N5): だけ is a neutral "only". きり adds that it stopped there and nothing followed.

After a conditional, たらきりがない / ときりがない is the same "there's no end to it": 心配し出したらきりがない — "Once you start worrying, there's no end to it."`,
      cards: [
        { front: '兄は家を出たきり、もう五年も帰ってこない。', reading: 'あにはいえをでたきり、もうごねんもかえってこない。', back: 'My brother left home and has not been back for five years.' },
        { front: '祖母は去年倒れて、それきり寝たきりだ。', reading: 'そぼはきょねんたおれて、それきりねたきりだ。', back: 'My grandmother collapsed last year and has been bedridden ever since.' },
        { front: '彼女とは高校で別れたきり、会っていない。', reading: 'かのじょとはこうこうでわかれたきり、あっていない。', back: "I haven't seen her since we parted ways in high school." },
        { front: '二人きりで話がしたい。', reading: 'ふたりきりではなしがしたい。', back: 'I want to talk with you, just the two of us.' },
        { front: 'こんなことは、これきりにしてください。', reading: 'こんなことは、これきりにしてください。', back: 'Please let this be the last time this happens.' },
        { front: '文句を言い出したら、きりがない。', reading: 'もんくをいいだしたら、きりがない。', back: "Once you start complaining, there's no end to it." },
        { front: '細かいことを気にし出すときりがない。', reading: 'こまかいことをきにしだすときりがない。', back: "Once you start worrying about the details, there's no end to it." }
      ]
    },
    {
      key: 'n2d.dake-atte',
      kind: 'grammar',
      title: '～だけあって・～だけましだ — as you would expect, at least',
      body: `Two judgments built on だけ.

・Plain form / noun + だけあって (だけのことはある) — "as you'd expect from, living up to". A good result matches the reputation, effort or status.
  さすがプロだけあって、上手だ。 — "As you'd expect from a pro, they're good."
  高いだけあって、味がいい。 — "It's expensive, and it tastes as good as the price suggests."
  だけのことはある ends the sentence: 毎日練習しただけのことはある — "All that daily practice shows."
・Plain form + だけましだ — "at least, it could be worse". The situation is bad, but this one point is better than nothing.
  給料は安いが、仕事があるだけましだ。 — "The pay is low, but at least I have a job."

Compare だけに: だけに is like だけあって but the result can be negative too. だけあって is for praise.`,
      cards: [
        { front: 'さすが専門家だけあって、説明が分かりやすい。', reading: 'さすがせんもんかだけあって、せつめいがわかりやすい。', back: "As you'd expect from an expert, the explanation is easy to follow." },
        { front: '十年も住んでいただけあって、彼は町に詳しい。', reading: 'じゅうねんもすんでいただけあって、かれはまちにくわしい。', back: 'Having lived there ten years, he knows the town well, as you would expect.' },
        { front: 'このホテルは、有名なだけのことはある。', reading: 'このホテルは、ゆうめいなだけのことはある。', back: 'This hotel lives up to its reputation.' },
        { front: '雨だったが、風がないだけましだった。', reading: 'あめだったが、かぜがないだけましだった。', back: 'It rained, but at least there was no wind.' },
        { front: '怪我はしたが、命が助かっただけましだ。', reading: 'けがはしたが、いのちがたすかっただけましだ。', back: 'I was injured, but at least I survived.' },
        { front: '狭い部屋だけど、駅に近いだけましだ。', reading: 'せまいへやだけど、えきにちかいだけましだ。', back: "It's a small room, but at least it's close to the station." }
      ]
    },
    {
      key: 'n2d.te-irarenai',
      kind: 'grammar',
      title: '～ていられない・～てばかりはいられない — can\'t afford to keep',
      body: `ている + the potential negative: "can't (afford to) stay doing X". The situation does not allow it.

・Verb て-form + いられない — "can't keep on, can't just".
  こんな所でぐずぐずしていられない。 — "I can't hang around in a place like this."
  心配で、じっとしていられない。 — "I'm too worried to sit still."
・Verb て-form + ばかりはいられない — "can't just keep doing nothing but X". Usually about a feeling you must move past.
  いつまでも泣いてばかりはいられない。 — "I can't go on crying forever."
・Noun / adjective + では(じゃ)いられない — "can't remain": 子供のままではいられない — "I can't stay a child."

Compare ずにはいられない (N2 Grammar I): that is "can't help doing" (an urge you can't hold back). ていられない is "can't afford to keep doing" (circumstances push you on).`,
      cards: [
        { front: '試験まで一週間だから、遊んでいられない。', reading: 'しけんまでいっしゅうかんだから、あそんでいられない。', back: "The exam is a week away, so I can't fool around." },
        { front: '待っていられないので、先に行くよ。', reading: 'まっていられないので、さきにいくよ。', back: "I can't wait any longer, so I'm going on ahead." },
        { front: '寒くて、外に立っていられなかった。', reading: 'さむくて、そとにたっていられなかった。', back: "It was too cold to stand around outside." },
        { front: '失敗を嘆いてばかりはいられない。', reading: 'しっぱいをなげいてばかりはいられない。', back: "I can't just keep lamenting my failure." },
        { front: 'いつまでも親に頼ってばかりはいられない。', reading: 'いつまでもおやにたよってばかりはいられない。', back: "I can't keep relying on my parents forever." },
        { front: 'もう黙ってはいられない。', reading: 'もうだまってはいられない。', back: "I can't keep quiet any longer." }
      ]
    },
    {
      key: 'n2d.tamaranai',
      kind: 'grammar',
      title: '～てたまらない・～てしょうがない・～てならない・～てかなわない — unbearably',
      body: `Four て-form endings that say a feeling or sensation is overwhelming: "so … I can't stand it".

Formation: い-adjective くて, な-adjective で, verb て-form + the ending.

・てたまらない — "unbearably". Strong and direct, for feelings and physical states.
  喉が渇いてたまらない。 — "I'm dying of thirst."
・てしょうがない (てしかたがない) — "terribly, can't help it". The everyday spoken version.
  眠くてしょうがない。 — "I'm so sleepy I can't stand it."
・てならない — "can't help feeling". More formal; best with spontaneous feelings and verbs of thinking (思えてならない、気がしてならない).
  彼が犯人のような気がしてならない。 — "I can't shake the feeling that he's the culprit."
・てかなわない — "too much to bear". A complaint about something annoying or unpleasant.
  隣の工事がうるさくてかなわない。 — "The construction next door is unbearably noisy."

All describe the speaker's own feelings; for someone else add ようだ or らしい (彼は寂しくてたまらないようだ).`,
      cards: [
        { front: '久しぶりに家族に会えて、嬉しくてたまらない。', reading: 'ひさしぶりにかぞくにあえて、うれしくてたまらない。', back: "I'm overjoyed to see my family after so long." },
        { front: '足が痛くてたまらない。', reading: 'あしがいたくてたまらない。', back: 'My feet hurt like crazy.' },
        { front: '結果が気になってしょうがない。', reading: 'けっかがきになってしょうがない。', back: "I can't stop thinking about the result." },
        { front: '一人暮らしは寂しくてしかたがない。', reading: 'ひとりぐらしはさびしくてしかたがない。', back: 'Living alone is terribly lonely.' },
        { front: 'あの日のことが悔やまれてならない。', reading: 'あのひのことがくやまれてならない。', back: 'I cannot stop regretting what happened that day.' },
        { front: 'この部屋は夏になると暑くてかなわない。', reading: 'このへやはなつになるとあつくてかなわない。', back: 'This room gets unbearably hot in summer.' }
      ]
    },
    {
      key: 'n2d.dewanaika',
      kind: 'grammar',
      title: '～ではないか・～ようではないか — isn\'t it!, let\'s',
      body: `Two uses of the negative question ではないか, neither of which is a real question.

・Plain form + ではないか (じゃないか) — "isn't it!, you see!". An emphatic assertion, surprise or reproach; the voice falls at the end.
  なんだ、君じゃないか。 — "Why, if it isn't you!"
  約束が違うではないか。 — "This isn't what we agreed!"
・Volitional + ではないか (じゃないか) — "let's…!". A rousing call to a group, in speeches and writing.
  みんなで力を合わせようではないか。 — "Let us all join forces!"

Register: ではないか is formal or masculine; じゃないか is spoken; じゃない (no か) is the softer everyday version (いいじゃない — "Isn't that great!").

Compare でしょう (N4): でしょう? seeks agreement softly. ではないか asserts and often accuses.`,
      cards: [
        { front: '時間に遅れるなと言ったではないか。', reading: 'じかんにおくれるなといったではないか。', back: "Didn't I tell you not to be late!" },
        { front: 'なかなかいい絵ではないか。', reading: 'なかなかいいえではないか。', back: "Why, that's quite a good painting!" },
        { front: '危ないじゃないか、気をつけろ！', reading: 'あぶないじゃないか、きをつけろ！', back: "That's dangerous! Watch out!" },
        { front: '最後まで戦おうではないか。', reading: 'さいごまでたたかおうではないか。', back: 'Let us fight to the very end!' },
        { front: 'この町をもっと住みやすくしようではないか。', reading: 'このまちをもっとすみやすくしようではないか。', back: "Let's make this town a better place to live!" },
        { front: 'なんだ、まだ起きていたじゃないか。', reading: 'なんだ、まだおきていたじゃないか。', back: "Well, look — you're still up!" }
      ]
    },
    {
      key: 'n2d.tewanaranai',
      kind: 'grammar',
      title: '～てはならない・～ものではない — must not, one should not',
      body: `Two prohibitions with different weight.

・Verb て-form + はならない — "must not". A firm, formal prohibition: rules, laws, moral principles, written warnings.
  ここで見たことを、誰にも話してはならない。 — "You must not tell anyone what you saw here."
  過去の過ちを繰り返してはならない。 — "We must not repeat the mistakes of the past."
・Verb dictionary form + ものではない — "one shouldn't, it's not done". Advice about common sense or manners, often from an older person.
  人の悪口を言うものではない。 — "You shouldn't speak ill of people."
  夜遅くに電話するものではない。 — "It's not right to phone late at night."

Compare てはいけない (N5): the everyday "must not". てはならない is its formal, absolute version; ものではない is a lecture about how things are done.`,
      cards: [
        { front: 'この部屋に入ってはならない。', reading: 'このへやにはいってはならない。', back: 'You must not enter this room.' },
        { front: '戦争を二度と起こしてはならない。', reading: 'せんそうをにどとおこしてはならない。', back: 'War must never happen again.' },
        { front: '命を粗末にしてはならない。', reading: 'いのちをそまつにしてはならない。', back: 'You must not treat life lightly.' },
        { front: '食べ物を残すものではない。', reading: 'たべものをのこすものではない。', back: 'You should not leave food uneaten.' },
        { front: '目上の人に、そんな口をきくものではない。', reading: 'めうえのひとに、そんなくちをきくものではない。', back: "You shouldn't talk to your elders like that." },
        { front: '人の手紙を勝手に読むものではない。', reading: 'ひとのてがみをかってによむものではない。', back: "You shouldn't read other people's letters without asking." }
      ]
    },
    {
      key: 'n2d.temade',
      kind: 'grammar',
      title: '～てまで — even going so far as to',
      body: `Verb て-form + まで means "going as far as (doing X)": someone uses an extreme or unreasonable means to get something. The speaker usually finds it excessive, or asks whether it is worth it.
  借金してまで、旅行に行きたくない。 — "I don't want to go on a trip if it means going into debt."
  嘘をついてまで、勝ちたいのか。 — "Do you want to win so badly that you'd even lie?"

Often in the shape ～てまで～たくない / ～ことはない / ～のか, questioning the cost. It can also admire extreme effort: 徹夜してまで、作品を仕上げた — "They finished the work, even staying up all night."

The noun form is noun + までして: 借金までして — "even to the point of borrowing money".

てまでも is a stronger form of てまで: 命を捨ててまでも守りたい — "I'd protect it even at the cost of my life."`,
      cards: [
        { front: '友達を裏切ってまで、成功したくない。', reading: 'ともだちをうらぎってまで、せいこうしたくない。', back: "I don't want success if it means betraying my friends." },
        { front: '体を壊してまで、働く必要はない。', reading: 'からだをこわしてまで、はたらくひつようはない。', back: "There's no need to work so hard you ruin your health." },
        { front: '三時間も並んでまで、そのラーメンを食べたいの？', reading: 'さんじかんもならんでまで、そのラーメンをたべたいの？', back: 'Do you really want that ramen so badly that you would queue three hours?' },
        { front: '仕事を休んでまで、コンサートに行った。', reading: 'しごとをやすんでまで、コンサートにいった。', back: 'I even took time off work to go to the concert.' },
        { front: '親に反対されてまで、彼と結婚したいのか。', reading: 'おやにはんたいされてまで、かれとけっこんしたいのか。', back: "Do you want to marry him even against your parents' wishes?" },
        { front: '借金までして、車を買う必要はない。', reading: 'しゃっきんまでして、くるまをかうひつようはない。', back: "There's no need to go into debt just to buy a car." },
        { front: 'どんな犠牲を払ってまでも、この約束は守る。', reading: 'どんなぎせいをはらってまでも、このやくそくはまもる。', back: "I'll keep this promise, whatever the sacrifice." }
      ]
    },
    {
      key: 'n2d.touzen',
      kind: 'grammar',
      title: '～て当然だ・～のももっともだ — no wonder, naturally',
      body: `Two ways to call something natural or understandable.

・Plain form / て-form + 当然だ (当たり前だ) — "it's only natural". Often ～て当然だ for a result that obviously follows, or ～のは当然だ for a duty.
  あんなに練習したのだから、勝って当然だ。 — "After all that practice, it's only natural we won."
  約束を守るのは当然だ。 — "Keeping promises is a given."
・Plain form + のももっともだ — "it's understandable that, no wonder". You sympathize with someone's reaction.
  あんなことを言われたら、彼が怒るのももっともだ。 — "After being told something like that, no wonder he's angry."

Compare わけだ (N3): わけだ draws a logical conclusion ("so that's why"). のももっともだ shows sympathy; て当然だ states a norm.`,
      cards: [
        { front: 'そんなに食べたら、お腹が痛くなって当然だ。', reading: 'そんなにたべたら、おなかがいたくなってとうぜんだ。', back: "If you eat that much, of course your stomach will hurt." },
        { front: '子供が親を大切にするのは当然だ。', reading: 'こどもがおやをたいせつにするのはとうぜんだ。', back: 'It is only natural for children to cherish their parents.' },
        { front: '毎日遅くまで働いていたら、疲れて当たり前だ。', reading: 'まいにちおそくまではたらいていたら、つかれてあたりまえだ。', back: "If you work late every day, of course you'll be tired." },
        { front: '三年も待たされたのだから、彼女が怒るのももっともだ。', reading: 'さんねんもまたされたのだから、かのじょがおこるのももっともだ。', back: 'She was kept waiting three years — no wonder she is angry.' },
        { front: '初めての海外なら、不安になるのももっともだ。', reading: 'はじめてのかいがいなら、ふあんになるのももっともだ。', back: "If it's your first time abroad, it's understandable to feel nervous." },
        { front: 'あれだけ準備したんだから、合格して当然だよ。', reading: 'あれだけじゅんびしたんだから、ごうかくしてとうぜんだよ。', back: 'After all that preparation, of course you passed.' }
      ]
    },
    {
      key: 'n2d.to-iu-mono',
      kind: 'grammar',
      title: '～というものだ・～というものでもない — that\'s what it is, not necessarily',
      body: `Two endings that state, or deny, a general truth.

・Plain form + というものだ — "that's what (X) is, that's just how it is". A speaker's firm judgment presented as common sense.
  困っている人を助けるのが、友達というものだ。 — "Helping someone in trouble — that's what a friend is."
  今さら謝っても、遅いというものだ。 — "Apologizing now is simply too late."
・～ば (たら) ～というものでもない — "it doesn't follow that, it's not the case that just…". It denies a simple rule of thumb.
  高ければいいというものでもない。 — "Being expensive doesn't automatically make it good."
  練習すればうまくなるというものでもない。 — "It's not true that you'll get better just by practising."
  というものではない is the same, a little more direct.

Compare とは限らない (N2 Grammar II): とは限らない says there are exceptions. というものでもない attacks the assumption that A alone guarantees B.`,
      cards: [
        { front: '何でも人のせいにするのは、わがままというものだ。', reading: 'なんでもひとのせいにするのは、わがままというものだ。', back: 'Blaming others for everything — that is just selfishness.' },
        { front: '苦しい時に支え合うのが、家族というものだ。', reading: 'くるしいときにささえあうのが、かぞくというものだ。', back: "Supporting each other in hard times — that's what family is." },
        { front: '一人で全部やるのは、無理というものだ。', reading: 'ひとりでぜんぶやるのは、むりというものだ。', back: 'Doing it all alone is simply impossible.' },
        { front: '勉強時間が長ければいいというものでもない。', reading: 'べんきょうじかんがながければいいというものでもない。', back: "Longer study hours aren't automatically better." },
        { front: 'お金があれば幸せになれるというものではない。', reading: 'おかねがあればしあわせになれるというものではない。', back: "Having money doesn't mean you'll be happy." },
        { front: '早く行けばいいというものでもない。', reading: 'はやくいけばいいというものでもない。', back: "Getting there early isn't always the answer." }
      ]
    },
    {
      key: 'n2d.nai-mono-ka',
      kind: 'grammar',
      title: 'どうにか～ないものか — if only there were some way',
      body: `Verb ない-form + ものか (ものだろうか) is a strong wish that something might be possible, voiced as a question: "isn't there some way to…?, if only…". It is often paired with なんとか or どうにか ("somehow").
  なんとか彼を助けられないものか。 — "Isn't there some way we can help him?"
  どうにかして、この問題を解決できないものだろうか。 — "Is there no way at all to solve this problem?"

The verb is usually a potential (できない、られない) or a verb of something happening (ならない、やまない). The feeling is earnest, a little helpless.

Do not confuse it with ～ものか ("like hell", N2 Grammar I), which follows a positive form and rejects the idea: 負けるものか — "As if I'd lose!". ないものか wishes for the possibility instead.`,
      cards: [
        { front: 'なんとか今日中に終わらせられないものか。', reading: 'なんとかきょうじゅうにおわらせられないものか。', back: "Isn't there some way to get it finished today?" },
        { front: 'どうにかして、もう一度彼女に会えないものか。', reading: 'どうにかして、もういちどかのじょにあえないものか。', back: 'If only there were some way to see her again.' },
        { front: 'この雨、早くやまないものかな。', reading: 'このあめ、はやくやまないものかな。', back: 'I wish this rain would hurry up and stop.' },
        { front: 'もっと安く旅行できないものだろうか。', reading: 'もっとやすくりょこうできないものだろうか。', back: 'Is there no way to travel more cheaply?' },
        { front: '戦争のない世界にならないものか。', reading: 'せんそうのないせかいにならないものか。', back: 'If only the world could be free of war.' },
        { front: 'なんとか父の病気が治らないものか。', reading: 'なんとかちちのびょうきがなおらないものか。', back: "If only there were some way to cure my father's illness." }
      ]
    },
    {
      key: 'n2d.toshitemo',
      kind: 'grammar',
      title: '～としても — even if (we suppose)',
      body: `Plain form + としても means "even if (we suppose that)": a hypothetical concession. The first part may not be true, and even if it were, the result stays the same.
  たとえ反対されたとしても、私は行く。 — "Even if I'm opposed, I'm going."
  今から急いだとしても、間に合わないだろう。 — "Even if we hurried now, we probably wouldn't make it."

Nouns and な-adjectives take だ: 冗談だとしても — "even if it was a joke".

Compare ても (N4 Grammar II): ても can be real or hypothetical. としても stresses that the case is only being assumed. It is the concessive partner of としたら (N3 Grammar III): としたら sets up an assumption and draws a result; としても says the result holds anyway.

としたところで (としたって in speech) is a stronger "even if" that stresses the effort would be pointless: 今から急いだとしたところで、間に合わない — "Even if we hurried now, we wouldn't make it."`,
      cards: [
        { front: '宝くじが当たったとしても、仕事は辞めない。', reading: 'たからくじがあたったとしても、しごとはやめない。', back: "Even if I won the lottery, I wouldn't quit my job." },
        { front: '彼が謝ったとしても、許すつもりはない。', reading: 'かれがあやまったとしても、ゆるすつもりはない。', back: "Even if he apologized, I have no intention of forgiving him." },
        { front: 'それが本当だとしても、証拠がない。', reading: 'それがほんとうだとしても、しょうこがない。', back: "Even if that's true, there's no proof." },
        { front: '時間があったとしても、そんな所には行かない。', reading: 'じかんがあったとしても、そんなところにはいかない。', back: "Even if I had the time, I wouldn't go to a place like that." },
        { front: '失敗するとしても、やってみる価値はある。', reading: 'しっぱいするとしても、やってみるかちはある。', back: "Even if we fail, it's worth a try." },
        { front: '冗談だとしても、言っていいことと悪いことがある。', reading: 'じょうだんだとしても、いっていいこととわるいことがある。', back: 'Even if it was a joke, some things just should not be said.' },
        { front: '彼に頼んだとしたところで、引き受けてはくれないだろう。', reading: 'かれにたのんだとしたところで、ひきうけてはくれないだろう。', back: "Even if I asked him, he probably wouldn't take it on." }
      ]
    },
    {
      key: 'n2d.ni-tsuke',
      kind: 'grammar',
      title: '～につけ・～につけ～につけ — whenever, whether… or',
      body: `つけ is from 付ける. It has two patterns.

・Verb + につけ — "whenever, every time (it brings a feeling)". Mostly with verbs of perceiving (見る、聞く、考える), followed by a feeling or memory.
  この歌を聞くにつけ、故郷を思い出す。 — "Whenever I hear this song, I think of home."
  何かにつけ — "at every opportunity, for any little thing": 母は何かにつけ心配する — "My mother worries about every little thing."
・A につけ B につけ — "whether A or B". A and B are opposites (good/bad, happy/sad).
  良いにつけ悪いにつけ、彼は注目を集める。 — "For better or worse, he attracts attention."
  嬉しいにつけ悲しいにつけ、酒を飲む。 — "Happy or sad, I drink."

Compare たびに (N3): たびに is a neutral "every time". につけ stresses that each occasion stirs up the same feeling, and is more literary.`,
      cards: [
        { front: 'この写真を見るにつけ、楽しかった日々を思い出す。', reading: 'このしゃしんをみるにつけ、たのしかったひびをおもいだす。', back: 'Whenever I look at this photo, I remember the happy days.' },
        { front: '事故のニュースを聞くにつけ、胸が痛む。', reading: 'じこのニュースをきくにつけ、むねがいたむ。', back: 'Every time I hear news of an accident, my heart aches.' },
        { front: '父は何かにつけ、昔の話をする。', reading: 'ちちはなにかにつけ、むかしのはなしをする。', back: 'My father brings up the old days at every opportunity.' },
        { front: '暑いにつけ寒いにつけ、母は私の体を心配する。', reading: 'あついにつけさむいにつけ、はははわたしのからだをしんぱいする。', back: 'Hot weather or cold, my mother worries about my health.' },
        { front: '良いにつけ悪いにつけ、親の影響は大きい。', reading: 'よいにつけわるいにつけ、おやのえいきょうはおおきい。', back: "For better or worse, parents' influence is great." },
        { front: '彼の苦労を思うにつけ、自分が恥ずかしくなる。', reading: 'かれのくろうをおもうにつけ、じぶんがはずかしくなる。', back: 'Whenever I think of his hardships, I feel ashamed of myself.' }
      ]
    },
    {
      key: 'n2d.wa-tomokaku',
      kind: 'grammar',
      title: '～はともかく・～は抜きにして — setting aside',
      body: `Two ways to put one point to one side.

・Noun + はともかく(として) — "X aside, setting X aside". X may matter, but right now the speaker focuses on something more important.
  味はともかく、量が多い。 — "Taste aside, the portions are big."
  結果はともかく、全力を尽くした。 — "Whatever the result, I gave it my all."
・Noun + は抜きにして / を抜きにして — "without, leaving out". X is removed from the situation entirely.
  冗談は抜きにして、本当の話をしよう。 — "Joking aside, let's talk seriously."
  堅い話は抜きにして、楽しく飲みましょう。 — "Let's skip the formal talk and enjoy a drink."
  を抜きにしては～ない means "can't do without": 彼を抜きにしては、この計画は語れない — "You can't talk about this plan without him."

Compare はもちろん (N3 Grammar II): はもちろん includes X as obvious. はともかく sets X aside as not the point.`,
      cards: [
        { front: '見た目はともかく、この料理は美味しい。', reading: 'みためはともかく、このりょうりはおいしい。', back: 'Looks aside, this dish is delicious.' },
        { front: '冗談はともかく、本当にどうするつもり？', reading: 'じょうだんはともかく、ほんとうにどうするつもり？', back: 'Jokes aside, what are you actually going to do?' },
        { front: '他の人はともかく、私は賛成だ。', reading: 'ほかのひとはともかく、わたしはさんせいだ。', back: "I don't know about anyone else, but I'm in favour." },
        { front: '挨拶は抜きにして、さっそく本題に入りましょう。', reading: 'あいさつはぬきにして、さっそくほんだいにはいりましょう。', back: "Let's skip the greetings and get straight down to business." },
        { front: '仕事の話は抜きにして、楽しもう。', reading: 'しごとのはなしはぬきにして、たのしもう。', back: "Let's leave work talk out of it and have fun." },
        { front: '彼の協力を抜きにしては、成功はなかった。', reading: 'かれのきょうりょくをぬきにしては、せいこうはなかった。', back: 'Without his cooperation, there would have been no success.' }
      ]
    },
    {
      key: 'n2d.wa-madashimo',
      kind: 'grammar',
      title: '～はまだしも・～はもとより — X is one thing, not to mention X',
      body: `Two ways of comparing a lesser case with a greater one.

・Noun + はまだしも — "X would be one thing, but…". X is just about acceptable; what follows is not.
  一回はまだしも、三回も遅刻するなんて。 — "Once would be one thing, but late three times?"
  子供はまだしも、大人がそんなことをするとは。 — "From a child, maybe — but an adult doing that?"
・Noun + はもとより — "not to mention, of course". X is obviously included, and so is the next item. A formal はもちろん (N3 Grammar II).
  この店は味はもとより、雰囲気もいい。 — "The food is good, of course, and so is the atmosphere."
  彼は国内はもとより、海外でも知られている。 — "He is known at home, not to mention abroad."

The two point in opposite directions: はまだしも grants X and rejects what follows; はもとより takes X for granted and adds more.`,
      cards: [
        { front: '平日はまだしも、休日まで仕事の電話をしてくるなんて。', reading: 'へいじつはまだしも、きゅうじつまでしごとのでんわをしてくるなんて。', back: 'Weekdays are one thing, but calling about work on my days off too?' },
        { front: '少しの遅れはまだしも、一時間も待たせるのはひどい。', reading: 'すこしのおくれはまだしも、いちじかんもまたせるのはひどい。', back: 'A little lateness is one thing, but keeping me waiting a whole hour is too much.' },
        { front: '冗談はまだしも、嘘をつくのは許せない。', reading: 'じょうだんはまだしも、うそをつくのはゆるせない。', back: "Joking is one thing, but I can't forgive lying." },
        { front: 'この本は子供はもとより、大人にも人気がある。', reading: 'このほんはこどもはもとより、おとなにもにんきがある。', back: 'This book is popular with children, of course, and with adults too.' },
        { front: '彼女は英語はもとより、フランス語も話せる。', reading: 'かのじょはえいごはもとより、フランスごもはなせる。', back: 'She speaks English, of course, and French too.' },
        { front: '安全はもとより、使いやすさも大切だ。', reading: 'あんぜんはもとより、つかいやすさもたいせつだ。', back: 'Safety, of course, but ease of use matters too.' }
      ]
    },
    {
      key: 'n2d.mama-ni',
      kind: 'grammar',
      title: '～ままに・～もかまわず — as one pleases, without caring',
      body: `Two ways of acting without restraint.

・Verb + ままに / noun + の + ままに — "just as (one feels / is told), at the mercy of". You let something else steer you.
  気の向くままに、旅をした。 — "I travelled wherever my fancy took me."
  言われるままに、書類にサインした。 — "I signed the papers just as I was told."
  Compare まま (N3 Grammar II): まま is "as it is, unchanged". ままに adds "following, giving in to".
・Noun + もかまわず — "without caring about, regardless of". The person ignores something others would mind.
  人目もかまわず、大声で泣いた。 — "I cried out loud, not caring who saw."
  服が汚れるのもかまわず、子供を助けた。 — "They saved the child without a thought for their clothes."
  With a clause, use の: 雨が降っているのもかまわず.

Verb dictionary form + がまま(に) is a literary form of ままに: 言われるがままに — "just as I was told", あるがまま — "as it is".`,
      cards: [
        { front: '心の赴くままに、絵を描いている。', reading: 'こころのおもむくままに、えをかいている。', back: 'I paint just as my heart leads me.' },
        { front: '彼は欲望のままに生きている。', reading: 'かれはよくぼうのままにいきている。', back: 'He lives at the mercy of his desires.' },
        { front: '店員に勧められるままに、高い服を買ってしまった。', reading: 'てんいんにすすめられるままに、たかいふくをかってしまった。', back: 'I let the shop assistant talk me into buying expensive clothes.' },
        { front: '周りの迷惑もかまわず、電話で大声で話している。', reading: 'まわりのめいわくもかまわず、でんわでおおごえではなしている。', back: "Someone's talking loudly on the phone with no regard for the people around them." },
        { front: '雨に濡れるのもかまわず、子供たちは遊び続けた。', reading: 'あめにぬれるのもかまわず、こどもたちはあそびつづけた。', back: 'The children kept playing, not caring that they were getting soaked.' },
        { front: '彼女は値段もかまわず、好きな物を買う。', reading: 'かのじょはねだんもかまわず、すきなものをかう。', back: 'She buys whatever she likes, regardless of the price.' },
        { front: '自然のあるがままの姿を写真に撮りたい。', reading: 'しぜんのあるがままのすがたをしゃしんにとりたい。', back: 'I want to photograph nature just as it is.' }
      ]
    },
    {
      key: 'n2d.mono-ga-aru',
      kind: 'grammar',
      title: '～ものがある・～ものだから — there is something…, because',
      body: `Two uses of もの with different jobs.

・Plain form + ものがある — "there is something (moving, impressive) about it". The speaker is struck by a quality that is hard to pin down; it follows words of feeling or evaluation.
  彼の演奏には、人の心を打つものがある。 — "There is something about his playing that touches people's hearts."
  この景色には、何か懐かしいものがある。 — "There's something nostalgic about this scenery."
・Plain form + ものだから (もんだから) — "because, you see". Gives a personal reason or excuse, often apologetic, for something the speaker could not help.
  道が混んでいたものだから、遅れてしまいました。 — "The roads were jammed, you see, so I'm late."
  な-adjectives and nouns take な: 暇なものだから、子供なもんだから.

Compare から / ので: ものだから stresses that the situation left no choice, which is why it suits excuses. It is not used for orders or invitations in the main clause.`,
      cards: [
        { front: '彼女の言葉には、人を納得させるものがある。', reading: 'かのじょのことばには、ひとをなっとくさせるものがある。', back: 'There is something convincing about her words.' },
        { front: '子供の成長には、目を見張るものがある。', reading: 'こどものせいちょうには、めをみはるものがある。', back: "There is something astonishing about how children grow." },
        { front: 'この町の変わりようには、寂しいものがある。', reading: 'このまちのかわりようには、さびしいものがある。', back: "There's something sad about how much this town has changed." },
        { front: '目覚ましが鳴らなかったものだから、寝坊してしまった。', reading: 'めざましがならなかったものだから、ねぼうしてしまった。', back: "My alarm didn't go off, you see, so I overslept." },
        { front: 'あまりに美味しかったものだから、全部食べてしまった。', reading: 'あまりにおいしかったものだから、ぜんぶたべてしまった。', back: 'It was so delicious that I ended up eating it all.' },
        { front: '初めてなもんだから、よく分からなくて。', reading: 'はじめてなもんだから、よくわからなくて。', back: "It's my first time, you see, so I don't really get it." }
      ]
    },
    {
      key: 'n2d.mo-ba-mo',
      kind: 'grammar',
      title: '～も～ば～も — both… and',
      body: `A も + ば-form, B も lists two things of the same kind and says both are true: "both A and B, A as well as B".
  彼はお金もあれば、時間もある。 — "He has money and time too."
  この町は山もあれば、海もある。 — "This town has mountains as well as the sea."

Formation: noun + も + verb/adjective ば-form, noun + も + the same or a related predicate. な-adjectives and nouns use なら / であれば: 彼女は親切でもあれば、頭もいい.

It is often used for opposites, to say there is variety or "sometimes this, sometimes that":
  人生には、いい時もあれば、悪い時もある。 — "In life there are good times and bad times."

Compare ～し～し (N4 Grammar II): し lists reasons. も～ば～も lists two facts side by side, often to describe a mix.`,
      cards: [
        { front: '彼女は歌も上手なら、ダンスも上手だ。', reading: 'かのじょはうたもじょうずなら、ダンスもじょうずだ。', back: "She's good at singing and at dancing too." },
        { front: 'あの店は味もよければ、値段も安い。', reading: 'あのみせはあじもよければ、ねだんもやすい。', back: 'That place has good food and low prices too.' },
        { front: '勝つこともあれば、負けることもある。', reading: 'かつこともあれば、まけることもある。', back: 'Sometimes you win, sometimes you lose.' },
        { front: '雨の日もあれば、晴れの日もある。', reading: 'あめのひもあれば、はれのひもある。', back: 'There are rainy days and there are sunny days.' },
        { front: '賛成する人もいれば、反対する人もいる。', reading: 'さんせいするひともいれば、はんたいするひともいる。', back: 'Some people are for it, and some are against it.' },
        { front: '彼は英語も話せれば、中国語も話せる。', reading: 'かれはえいごもはなせれば、ちゅうごくごもはなせる。', back: 'He can speak English as well as Chinese.' }
      ]
    },
    {
      key: 'n2d.mo-douzen',
      kind: 'grammar',
      title: '～も同然だ — as good as, virtually',
      body: `Noun / plain form + も同然だ means "as good as, practically": not literally X, but no different from it in effect.
  この試合はもう勝ったも同然だ。 — "This match is as good as won."
  彼は家族も同然だ。 — "He's practically family."
  この車は新品も同然だ。 — "This car is as good as new."

Before a noun it becomes も同然の: ただも同然の値段 — "a price that's practically free".

Compare ～のようだ (N4): のようだ compares; も同然だ says the difference is so small it doesn't count. It often expresses a firm judgment, positive or negative (負けたも同然だ — "we've as good as lost").`,
      cards: [
        { front: 'ここまで来れば、ゴールしたも同然だ。', reading: 'ここまでくれば、ゴールしたもどうぜんだ。', back: "Once we've come this far, we've as good as reached the finish." },
        { front: '十年も一緒に住んでいる猫は、家族も同然だ。', reading: 'じゅうねんもいっしょにすんでいるねこは、かぞくもどうぜんだ。', back: "A cat that has lived with you for ten years is practically family." },
        { front: 'このスマホは一度しか使っていないから、新品も同然だ。', reading: 'このスマホはいちどしかつかっていないから、しんぴんもどうぜんだ。', back: "I've only used this phone once, so it's as good as new." },
        { front: '約束を破るなんて、嘘をついたも同然だ。', reading: 'やくそくをやぶるなんて、うそをついたもどうぜんだ。', back: 'Breaking a promise is as good as lying.' },
        { front: '主力選手が怪我をして、もう負けたも同然だ。', reading: 'しゅりょくせんしゅがけがをして、もうまけたもどうぜんだ。', back: "Our key player is injured — we've as good as lost." },
        { front: '古い家をただも同然の値段で買った。', reading: 'ふるいいえをただもどうぜんのねだんでかった。', back: 'I bought an old house for practically nothing.' }
      ]
    },
    {
      key: 'n2d.yori-hoka',
      kind: 'grammar',
      title: '～よりほか(は)ない・～ほかない — have no choice but to',
      body: `Verb dictionary form + よりほか(は)ない / ほか(は)ない means "there's nothing for it but to, have no other choice than". It is a formal, written version of しかない (N3).
  電車が止まったので、歩いて帰るよりほかない。 — "The trains have stopped, so there's nothing for it but to walk home."
  ここまで来たら、やるほかない。 — "Now that it's come to this, we just have to do it."

The tone is resigned: every other option has been ruled out. ほかしかたがない is a stronger, more emotional form: 待つよりほかしかたがない — "There's nothing to do but wait."

Compare ざるを得ない (N2 Grammar I): ざるを得ない means you are forced into something against your will. よりほかない simply means it is the only option left.`,
      cards: [
        { front: 'バスがもうないので、タクシーで帰るよりほかない。', reading: 'バスがもうないので、タクシーでかえるよりほかない。', back: "There are no more buses, so there's nothing for it but to take a taxi home." },
        { front: '誰も手伝ってくれないなら、自分でやるほかない。', reading: 'だれもてつだってくれないなら、じぶんでやるほかない。', back: 'If nobody will help, I have no choice but to do it myself.' },
        { front: '結果が出るまで、待つよりほかはない。', reading: 'けっかがでるまで、まつよりほかはない。', back: 'There is nothing to do but wait for the results.' },
        { front: '失敗したら、もう一度やり直すほかない。', reading: 'しっぱいしたら、もういちどやりなおすほかない。', back: 'If it fails, there is no choice but to start over.' },
        { front: 'こうなったら、正直に話すよりほかない。', reading: 'こうなったら、しょうじきにはなすよりほかない。', back: "Now that it's come to this, I'll just have to tell the truth." },
        { front: '薬が効かないなら、手術するほかないでしょう。', reading: 'くすりがきかないなら、しゅじゅつするほかないでしょう。', back: "If the medicine doesn't work, there'll be no choice but to operate." }
      ]
    },
    {
      key: 'n2d.ue-de',
      kind: 'grammar',
      title: '～上で — after, in (doing)',
      body: `上で has two main uses.

1. Verb た-form / noun + の + 上で — "after (doing X first), upon". X is a necessary first step before the main action.
  よく考えた上で、返事をします。 — "I'll answer after thinking it over carefully."
  相談の上で、決めましょう。 — "Let's decide after discussing it."
2. Verb dictionary form / noun + の + 上で — "in (doing), for the purpose of". The main clause is something important or necessary in that activity.
  日本語を勉強する上で、漢字は欠かせない。 — "In studying Japanese, kanji are indispensable."
  生活する上で、困ることはない。 — "There's nothing troubling me in daily life."

Compare てから (N5): てから is a simple "after". た上で stresses doing X carefully as a basis for Y, and is common in business and formal decisions.`,
      cards: [
        { front: '内容を確認した上で、サインしてください。', reading: 'ないようをかくにんしたうえで、サインしてください。', back: 'Please sign after checking the contents.' },
        { front: '両親と話し合った上で、留学を決めた。', reading: 'りょうしんとはなしあったうえで、りゅうがくをきめた。', back: 'I decided to study abroad after talking it over with my parents.' },
        { front: '詳しくは面接の上で、ご説明します。', reading: 'くわしくはめんせつのうえで、ごせつめいします。', back: 'We will explain the details once we have met you at the interview.' },
        { front: '仕事をする上で、一番大切なのは信頼だ。', reading: 'しごとをするうえで、いちばんたいせつなのはしんらいだ。', back: 'In doing a job, the most important thing is trust.' },
        { front: '外国で暮らす上で、言葉は大きな問題だ。', reading: 'がいこくでくらすうえで、ことばはおおきなもんだいだ。', back: 'When living abroad, language is a big issue.' },
        { front: '健康を保つ上で、睡眠は欠かせない。', reading: 'けんこうをたもつうえで、すいみんはかかせない。', back: 'For maintaining good health, sleep is essential.' }
      ]
    },
    {
      key: 'n2d.hanmen',
      kind: 'grammar',
      title: '～反面・～半面 — on the other hand',
      body: `反面 (はんめん, also written 半面) sets two contrasting sides of the same thing side by side: "while (X is so), on the other hand (Y)".
  この仕事は給料がいい反面、責任が重い。 — "This job pays well, but on the other hand the responsibility is heavy."
  都会は便利な反面、物価が高い。 — "Cities are convenient, but on the other hand prices are high."

Formation: plain form + 反面; な-adjectives take な or である, nouns take である (学生である反面).

Both sides describe one and the same subject. Compare 一方で (N2 Grammar II): 一方で can contrast two different subjects (兄は外向的な一方で、弟は内気だ). 反面 is about two aspects of one thing, like the two sides of a coin.`,
      cards: [
        { front: 'スマホは便利な反面、時間を無駄にしやすい。', reading: 'スマホはべんりなはんめん、じかんをむだにしやすい。', back: 'Smartphones are convenient, but they also make it easy to waste time.' },
        { front: '一人暮らしは自由な反面、寂しいこともある。', reading: 'ひとりぐらしはじゆうなはんめん、さびしいこともある。', back: 'Living alone is free, but on the other hand it can be lonely.' },
        { front: '彼は厳しい反面、とても優しいところもある。', reading: 'かれはきびしいはんめん、とてもやさしいところもある。', back: 'He is strict, but there is a very kind side to him too.' },
        { front: '有名になった反面、自由がなくなった。', reading: 'ゆうめいになったはんめん、じゆうがなくなった。', back: 'Becoming famous came at the cost of my freedom.' },
        { front: 'この薬はよく効く反面、副作用が強い。', reading: 'このくすりはよくきくはんめん、ふくさようがつよい。', back: 'This medicine works well, but its side effects are strong.' },
        { front: '田舎は自然が豊かな反面、交通が不便だ。', reading: 'いなかはしぜんがゆたかなはんめん、こうつうがふべんだ。', back: 'The countryside is rich in nature, but getting around is inconvenient.' }
      ]
    },
    {
      key: 'n2d.ori-sai',
      kind: 'grammar',
      title: '～折(に)・～際(に) — on the occasion of, when (formal)',
      body: `Two formal words for "when", common in letters, announcements and polite speech.

・Noun + の + 際(に) / verb + 際(に) — "when, at the time of". A formal 時, used in instructions and notices.
  お降りの際は、お忘れ物のないようご注意ください。 — "When getting off, please make sure you have all your belongings."
  緊急の際には、このボタンを押してください。 — "In an emergency, press this button."
・Noun + の + 折(に) / verb + 折(に) — "on the occasion of, when (there is a chance)". Softer and more personal; a good opportunity, often in letters.
  東京にお越しの折には、ぜひお立ち寄りください。 — "When you come to Tokyo, please do drop by."
  先日お会いした折に、お話ししたことですが…。 — "About what I mentioned when we met the other day…"

Compare 時 (N5): the everyday "when". 際 sounds official; 折 sounds polite and warm, and suits pleasant occasions rather than emergencies.`,
      cards: [
        { front: 'ご利用の際は、身分証明書をお持ちください。', reading: 'ごりようのさいは、みぶんしょうめいしょをおもちください。', back: 'Please bring identification when using the service.' },
        { front: '地震の際は、エレベーターを使わないでください。', reading: 'じしんのさいは、エレベーターをつかわないでください。', back: 'Do not use the elevators in the event of an earthquake.' },
        { front: '帰国する際に、空港で友達に会った。', reading: 'きこくするさいに、くうこうでともだちにあった。', back: 'When I was returning home, I ran into a friend at the airport.' },
        { front: 'お近くにお越しの折は、ぜひご連絡ください。', reading: 'おちかくにおこしのおりは、ぜひごれんらくください。', back: 'If you are ever in the area, please do get in touch.' },
        { front: '京都を訪れた折に、古い友人と再会した。', reading: 'きょうとをおとずれたおりに、ふるいゆうじんとさいかいした。', back: 'When I visited Kyoto, I met up with an old friend again.' },
        { front: '寒さ厳しい折、お体を大切になさってください。', reading: 'さむさきびしいおり、おからだをたいせつになさってください。', back: 'In this bitterly cold season, please take good care of yourself.' }
      ]
    },
    {
      key: 'n2d.shidai',
      kind: 'grammar',
      title: '～次第・～次第で・～次第だ — as soon as, depending on',
      body: `次第 (しだい) has three uses.

1. Verb ます-stem + 次第 — "as soon as". Formal; the main clause is the speaker's action or a request, not a past event.
  準備ができ次第、出発します。 — "We'll leave as soon as we're ready."
  分かり次第、ご連絡いたします。 — "We'll contact you as soon as we know."
2. Noun + 次第で / 次第だ — "depending on, it all depends on". The outcome is decided by X.
  結果は君の努力次第だ。 — "The outcome depends on your effort."
  天気次第で、予定を変える。 — "We'll change the plans depending on the weather."
3. Plain form + 次第です — "this is how it came about, that is why". A formal explanation of circumstances, in business speech and letters.
  急な用事ができたため、欠席させていただく次第です。 — "Something urgent has come up, which is why I must be absent."

Compare てすぐ (N4): てすぐ is the everyday "right after". 次第 (as soon as) looks ahead and is polite.`,
      cards: [
        { front: '雨がやみ次第、試合を再開します。', reading: 'あめがやみしだい、しあいをさいかいします。', back: 'The match will resume as soon as the rain stops.' },
        { front: '到着し次第、お電話ください。', reading: 'とうちゃくししだい、おでんわください。', back: 'Please call as soon as you arrive.' },
        { front: '合格できるかどうかは、これからの頑張り次第だ。', reading: 'ごうかくできるかどうかは、これからのがんばりしだいだ。', back: 'Whether you pass depends on how hard you work from now on.' },
        { front: '考え方次第で、人生は楽しくなる。', reading: 'かんがえかたしだいで、じんせいはたのしくなる。', back: 'Depending on how you look at it, life can become enjoyable.' },
        { front: '値段次第では、買ってもいい。', reading: 'ねだんしだいでは、かってもいい。', back: 'Depending on the price, I might buy it.' },
        { front: '以上のような理由で、お断りする次第です。', reading: 'いじょうのようなりゆうで、おことわりするしだいです。', back: 'For the reasons above, we must decline.' }
      ]
    },
    {
      key: 'n2d.kotonaku',
      kind: 'grammar',
      title: '～ことなく・～ないことには — without, unless',
      body: `Two negative patterns.

・Verb dictionary form + ことなく — "without (doing)". A formal ないで / ずに (N3 Grammar II), often for something kept up over a long time.
  彼は休むことなく、働き続けた。 — "He kept working without a break."
  諦めることなく、夢を追いかけた。 — "They chased their dream without giving up."
・Verb ない-form + ことには～ない — "unless (you do X), (Y won't happen)". X is the essential first step.
  実際に見ないことには、何とも言えない。 — "I can't say anything until I actually see it."
  食べてみないことには、美味しいかどうか分からない。 — "You can't tell if it's good unless you try it."

The main clause of ないことには is almost always negative (分からない、始まらない、できない). Compare ない限り (this course): ない限り is "unless" for a lasting condition; ないことには stresses a step that has to come first.

ことなしに(は) is its literary partner, "without (doing)"; with a negative main clause it means "unless": 努力することなしには、成功できない — "Without effort, you cannot succeed."`,
      cards: [
        { front: '彼女は一度も遅刻することなく、三年間通った。', reading: 'かのじょはいちどもちこくすることなく、さんねんかんかよった。', back: 'She attended for three years without once being late.' },
        { front: '誰にも知られることなく、彼は町を去った。', reading: 'だれにもしられることなく、かれはまちをさった。', back: 'He left town without anyone knowing.' },
        { front: '迷うことなく、彼はその道を選んだ。', reading: 'まようことなく、かれはそのみちをえらんだ。', back: 'He chose that path without hesitation.' },
        { front: '本人に聞かないことには、本当の理由は分からない。', reading: 'ほんにんにきかないことには、ほんとうのりゆうはわからない。', back: "You can't know the real reason unless you ask the person." },
        { front: 'やってみないことには、できるかどうか分からない。', reading: 'やってみないことには、できるかどうかわからない。', back: "You won't know if you can do it unless you try." },
        { front: '全員がそろわないことには、会議は始められない。', reading: 'ぜんいんがそろわないことには、かいぎははじめられない。', back: "We can't start the meeting until everyone is here." },
        { front: '人と関わることなしに、生きていくことはできない。', reading: 'ひととかかわることなしに、いきていくことはできない。', back: 'No one can go through life without dealing with other people.' }
      ]
    }
  ]
}
