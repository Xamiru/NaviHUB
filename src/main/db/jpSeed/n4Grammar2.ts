import type { SeedCourseDef } from '../japaneseSeed'

// JLPT N4 Grammar II (2026-10-16): the N4 core the first N4 course did not
// reach — concession, obligation, regret, quoting, nominalizing and the rest.
// Step 8, right after JLPT N4 Grammar. Keys are frozen.

export const N4B_COURSE: SeedCourseDef = {
  title: 'JLPT N4 Grammar II',
  description:
    'The rest of the N4 core: even if, despite, obligation, regret, quoting, compound verbs and more. ' +
    'Do this right after JLPT N4 Grammar.',
  level: 'N4',
  lessons: [
    {
      key: 'n4b.temo',
      kind: 'grammar',
      title: '～ても — even if, even though',
      body: `て-form + も turns a condition into a concession: "even if / even though". The main clause happens regardless.

・雨が降っても、行きます。 — "Even if it rains, I'll go."
・何度読んでも、分からない。 — "No matter how many times I read it, I don't understand."

Formation by word type:
・verb: て-form + も — 食べても
・い-adjective: くて + も — 高くても
・な-adjective / noun: で + も — 静かでも、子供でも

With a question word it means "no matter what / who / how": 何を言っても — "whatever (you) say". いくら～ても means "no matter how much".

The negative ～なくても is "even if (you) don't": 急がなくても間に合う — "We'll make it even if we don't hurry."`,
      cards: [
        { front: '雨が降っても、行きます。', reading: 'あめがふっても、いきます。', back: "Even if it rains, I'll go." },
        { front: '何度読んでも、分からない。', reading: 'なんどよんでも、わからない。', back: "No matter how many times I read it, I don't understand." },
        { front: '高くても、この靴が買いたい。', reading: 'たかくても、このくつがかいたい。', back: 'Even if they are expensive, I want to buy these shoes.' },
        { front: '日曜日でも、店は開いています。', reading: 'にちようびでも、みせはあいています。', back: 'The shop is open even on Sundays.' },
        { front: '急がなくても間に合う。', reading: 'いそがなくてもまにあう。', back: "We'll make it even if we don't hurry." },
        { front: '誰に聞いても、答えは同じだった。', reading: 'だれにきいても、こたえはおなじだった。', back: 'Whoever I asked, the answer was the same.' }
      ]
    },
    {
      key: 'n4b.noni',
      kind: 'grammar',
      title: '～のに — even though (and that is frustrating)',
      body: `のに joins two facts that clash, and carries the speaker's surprise, complaint or regret:

一生懸命勉強したのに、試験に落ちた。 — "Even though I studied hard, I failed the exam."

Formation: plain form + のに; な-adjectives and nouns take な: 静かなのに、学生なのに.

Compare ～ても: ても is about a hypothetical or general "even if"; のに is about a real fact that already happened or is true, and it sounds emotional.
・雨が降っても行く。 — "I'll go even if it rains." (not yet raining)
・雨が降っているのに、傘を持っていない。 — "It's raining, and yet I have no umbrella." (annoyed)

Left hanging at the end of a sentence, のに is pure regret: もっと早く言えばよかったのに。 — "You should have said so sooner."`,
      cards: [
        { front: '一生懸命勉強したのに、試験に落ちた。', reading: 'いっしょうけんめいべんきょうしたのに、しけんにおちた。', back: 'Even though I studied hard, I failed the exam.' },
        { front: '雨が降っているのに、傘を持っていない。', reading: 'あめがふっているのに、かさをもっていない。', back: "It's raining, and yet I don't have an umbrella." },
        { front: '日曜日なのに、会社に行かなければならない。', reading: 'にちようびなのに、かいしゃにいかなければならない。', back: 'Even though it is Sunday, I have to go to work.' },
        { front: '約束したのに、彼は来なかった。', reading: 'やくそくしたのに、かれはこなかった。', back: "He promised, and yet he didn't come." },
        { front: 'この店は高いのに、おいしくない。', reading: 'このみせはたかいのに、おいしくない。', back: 'This restaurant is expensive, yet the food is not good.' },
        { front: 'もっと早く言えばよかったのに。', reading: 'もっとはやくいえばよかったのに。', back: 'You should have said so sooner.' }
      ]
    },
    {
      key: 'n4b.nakereba',
      kind: 'grammar',
      title: 'Must and need not: ～なければならない・～なくてもいい',
      body: `Obligation — "must, have to": ない-form, drop い, + ければならない (or なりません politely):
・行く → 行かない → 行かなければならない
毎日薬を飲まなければなりません。 — "I have to take medicine every day."

~なくてはいけない means the same and is equally common; the casual forms are なきゃ and なくちゃ.

No obligation — "don't have to": ない-form, drop い, + くてもいい:
明日は来なくてもいいです。 — "You don't have to come tomorrow."

These two are a pair: must / need not. "Must not" is a different pattern again (～てはいけない).`,
      cards: [
        { front: '毎日薬を飲まなければなりません。', reading: 'まいにちくすりをのまなければなりません。', back: 'I have to take medicine every day.' },
        { front: 'もう帰らなければならない。', reading: 'もうかえらなければならない。', back: 'I have to go home now.' },
        { front: '明日までにレポートを出さなくてはいけない。', reading: 'あしたまでにレポートをださなくてはいけない。', back: 'I have to hand in the report by tomorrow.' },
        { front: '明日は来なくてもいいです。', reading: 'あしたはこなくてもいいです。', back: "You don't have to come tomorrow." },
        { front: '全部食べなくてもいいよ。', reading: 'ぜんぶたべなくてもいいよ。', back: "You don't have to eat all of it." },
        { front: '靴を脱がなければなりませんか。', reading: 'くつをぬがなければなりませんか。', back: 'Do I have to take off my shoes?' }
      ]
    },
    {
      key: 'n4b.naide',
      kind: 'grammar',
      title: '～ないで — please don\'t, and without doing',
      body: `ない-form + で has two common uses.

1. Negative requests — ないでください, "please don't":
ここで写真を撮らないでください。 — "Please don't take photos here."
Casually just ないで: 行かないで！ — "Don't go!"

2. "Without doing" — the first action does not happen before the second:
朝ご飯を食べないで、学校に行った。 — "I went to school without eating breakfast."

The literary version of 2 is ～ずに (食べずに), met at N3.`,
      cards: [
        { front: 'ここで写真を撮らないでください。', reading: 'ここでしゃしんをとらないでください。', back: "Please don't take photos here." },
        { front: '心配しないでください。', reading: 'しんぱいしないでください。', back: "Please don't worry." },
        { front: '行かないで！', reading: 'いかないで！', back: "Don't go!" },
        { front: '朝ご飯を食べないで、学校に行った。', reading: 'あさごはんをたべないで、がっこうにいった。', back: 'I went to school without eating breakfast.' },
        { front: '辞書を使わないで、読んでみてください。', reading: 'じしょをつかわないで、よんでみてください。', back: 'Try reading it without using a dictionary.' },
        { front: '傘を持たないで出かけた。', reading: 'かさをもたないででかけた。', back: 'I went out without taking an umbrella.' }
      ]
    },
    {
      key: 'n4b.nasai',
      kind: 'grammar',
      title: '～なさい — commands from someone in charge',
      body: `ます-stem + なさい is a firm instruction — parents to children, teachers to students, exam instructions:

早く寝なさい。 — "Go to bed now."
次の文を読みなさい。 — "Read the following sentence."

It is stronger than ～てください and never used upward (to a boss or a stranger). Between friends it sounds bossy unless joking.

You will see it constantly on test papers: 答えなさい ("answer"), 選びなさい ("choose").`,
      cards: [
        { front: '早く寝なさい。', reading: 'はやくねなさい。', back: 'Go to bed now.' },
        { front: '野菜も食べなさい。', reading: 'やさいもたべなさい。', back: 'Eat your vegetables too.' },
        { front: '次の文を読みなさい。', reading: 'つぎのぶんをよみなさい。', back: 'Read the following sentence.' },
        { front: '正しい答えを選びなさい。', reading: 'ただしいこたえをえらびなさい。', back: 'Choose the correct answer.' },
        { front: 'ちゃんと手を洗いなさい。', reading: 'ちゃんとてをあらいなさい。', back: 'Wash your hands properly.' },
        { front: '静かにしなさい。', reading: 'しずかにしなさい。', back: 'Be quiet.' }
      ]
    },
    {
      key: 'n4b.quote',
      kind: 'grammar',
      title: 'Quoting: ～と言う・～と思う・～という',
      body: `と marks quoted words or thoughts.

Direct quote, in 「」:
田中さんは「明日行きます」と言いました。 — Tanaka said, "I'll go tomorrow."

Indirect quote, plain form before と:
田中さんは明日行くと言いました。 — "Tanaka said he would go tomorrow."
Reporting something said earlier is often ～と言っていました: 先生は試験は難しいと言っていました。

Thoughts and opinions: plain form + と思う:
明日は雨が降ると思います。 — "I think it will rain tomorrow."
With nouns and な-adjectives keep だ: 便利だと思う、学生だと思う.

Naming: A という B — "a B called A":
「月」という映画を見た。 — "I saw a movie called 'Tsuki'."`,
      cards: [
        { front: '田中さんは「明日行きます」と言いました。', reading: 'たなかさんは「あしたいきます」といいました。', back: 'Tanaka said, "I\'ll go tomorrow."' },
        { front: '田中さんは明日行くと言いました。', reading: 'たなかさんはあしたいくといいました。', back: 'Tanaka said he would go tomorrow.' },
        { front: '先生は試験は難しいと言っていました。', reading: 'せんせいはしけんはむずかしいといっていました。', back: 'The teacher said the exam would be difficult.' },
        { front: '明日は雨が降ると思います。', reading: 'あしたはあめがふるとおもいます。', back: 'I think it will rain tomorrow.' },
        { front: 'この町は便利だと思う。', reading: 'このまちはべんりだとおもう。', back: 'I think this town is convenient.' },
        { front: '「月」という映画を見た。', reading: '「つき」というえいがをみた。', back: 'I saw a movie called "Tsuki".' }
      ]
    },
    {
      key: 'n4b.embedded',
      kind: 'grammar',
      title: 'Questions inside sentences: ～か',
      body: `A question can sit inside a bigger sentence: put it in plain form and end it with か.

With a question word:
彼がどこに行ったか分かりません。 — "I don't know where he went."
会議は何時に始まるか教えてください。 — "Please tell me what time the meeting starts."

For a yes/no question, かどうか ("whether or not") works the same way:
明日来るかどうか、まだ分からない。

Nouns and な-adjectives drop だ before か: 誰が先生か ("who the teacher is"), どれが便利か.`,
      cards: [
        { front: '彼がどこに行ったか分かりません。', reading: 'かれがどこにいったかわかりません。', back: "I don't know where he went." },
        { front: '会議は何時に始まるか教えてください。', reading: 'かいぎはなんじにはじまるかおしえてください。', back: 'Please tell me what time the meeting starts.' },
        { front: 'どれがいいか、決められない。', reading: 'どれがいいか、きめられない。', back: "I can't decide which one is good." },
        { front: 'なぜ遅れたか説明してください。', reading: 'なぜおくれたかせつめいしてください。', back: 'Please explain why you were late.' },
        { front: '彼女がどこに住んでいるか知っていますか。', reading: 'かのじょがどこにすんでいるかしっていますか。', back: 'Do you know where she lives?' },
        { front: '何を買ったか忘れてしまった。', reading: 'なにをかったかわすれてしまった。', back: 'I forgot what I bought.' }
      ]
    },
    {
      key: 'n4b.shi',
      kind: 'grammar',
      title: '～し — and also (listing reasons)',
      body: `し after a plain form lists reasons or points, often implying "and that's not all":

この店は安いし、おいしいし、よく来ます。 — "This place is cheap, the food is good — I come here a lot."

One し can stand for a longer unspoken list: 今日は雨だし、家にいよう。 — "It's raining (among other things), so let's stay home."

Formation: plain form + し; nouns and な-adjectives take だ: 便利だし、学生だし.

も often joins it to stress the piling up: 時間もないし、お金もない。 — "No time, and no money either."`,
      cards: [
        { front: 'この店は安いし、おいしいし、よく来ます。', reading: 'このみせはやすいし、おいしいし、よくきます。', back: 'This place is cheap and the food is good, so I come here a lot.' },
        { front: '今日は雨だし、家にいよう。', reading: 'きょうはあめだし、いえにいよう。', back: "It's raining today, so let's stay home." },
        { front: '時間もないし、お金もない。', reading: 'じかんもないし、おかねもない。', back: "I don't have time, and I don't have money either." },
        { front: 'この部屋は広いし、駅にも近い。', reading: 'このへやはひろいし、えきにもちかい。', back: 'This apartment is spacious, and it is close to the station too.' },
        { front: '疲れたし、もう寝ます。', reading: 'つかれたし、もうねます。', back: "I'm tired, so I'm going to bed." },
        { front: '彼は優しいし、頭もいい。', reading: 'かれはやさしいし、あたまもいい。', back: "He's kind, and he's smart too." }
      ]
    },
    {
      key: 'n4b.made-ni',
      kind: 'grammar',
      title: 'Until and by: まで・までに',
      body: `Two particles, two very different meanings:

・まで — "until": the action continues up to that point.
五時まで働きます。 — "I work until five."

・までに — "by": a deadline; the action happens once, at some point before it.
五時までに帰ります。 — "I'll be back by five."

A quick test: if the verb describes something lasting (work, wait, sleep), it's まで; if it's a one-off completion (hand in, finish, arrive), it's までに.

まで also means "as far as" with places: 駅まで歩く ("walk as far as the station").`,
      cards: [
        { front: '五時まで働きます。', reading: 'ごじまではたらきます。', back: 'I work until five.' },
        { front: '五時までに帰ります。', reading: 'ごじまでにかえります。', back: "I'll be back by five." },
        { front: '金曜日までにレポートを出してください。', reading: 'きんようびまでにレポートをだしてください。', back: 'Please hand in the report by Friday.' },
        { front: '雨がやむまで待ちましょう。', reading: 'あめがやむまでまちましょう。', back: "Let's wait until the rain stops." },
        { front: '駅まで歩いて十分です。', reading: 'えきまであるいてじゅっぷんです。', back: "It's a ten-minute walk to the station." },
        { front: '夏休みが終わるまでに、この本を読みたい。', reading: 'なつやすみがおわるまでに、このほんをよみたい。', back: 'I want to read this book before the summer holidays end.' }
      ]
    },
    {
      key: 'n4b.ba-yokatta',
      kind: 'grammar',
      title: 'Regret: ～ばよかった',
      body: `ば-form + よかった — "it would have been good if (I had)…" — is how Japanese says "I should have…":

もっと勉強すればよかった。 — "I should have studied more."

The negative expresses the opposite regret — ～なければよかった (ない-form, drop い, add ければ):
あんなことを言わなければよかった。 — "I shouldn't have said that."

Ending with のに adds a sigh of frustration, often about someone else: 来ればよかったのに — "You should have come."

ば-form reminder: 行く→行けば、食べる→食べれば、する→すれば、来る→来れば.`,
      cards: [
        { front: 'もっと勉強すればよかった。', reading: 'もっとべんきょうすればよかった。', back: 'I should have studied more.' },
        { front: '傘を持ってくればよかった。', reading: 'かさをもってくればよかった。', back: 'I should have brought an umbrella.' },
        { front: 'あんなことを言わなければよかった。', reading: 'あんなことをいわなければよかった。', back: "I shouldn't have said something like that." },
        { front: '早く寝ればよかった。', reading: 'はやくねればよかった。', back: 'I should have gone to bed early.' },
        { front: 'あの時、買っておけばよかった。', reading: 'あのとき、かっておけばよかった。', back: 'I should have bought it back then.' },
        { front: '一緒に来ればよかったのに。', reading: 'いっしょにくればよかったのに。', back: 'You should have come with us.' }
      ]
    },
    {
      key: 'n4b.you-ni-suru',
      kind: 'grammar',
      title: '～ようにする — making an effort to',
      body: `Dictionary form (or ない-form) + ようにする: "make a point of doing / try to make sure that…" — an ongoing effort or habit:

毎日野菜を食べるようにしています。 — "I make a point of eating vegetables every day."
夜遅くコーヒーを飲まないようにしている。 — "I try not to drink coffee late at night."

~ようにしてください asks someone to make the effort: 遅れないようにしてください — "Please make sure you're not late."

Compare ～ようになる: なる is a change that happens by itself ("came to be able to"); する is the effort you put in.`,
      cards: [
        { front: '毎日野菜を食べるようにしています。', reading: 'まいにちやさいをたべるようにしています。', back: 'I make a point of eating vegetables every day.' },
        { front: '夜遅くコーヒーを飲まないようにしている。', reading: 'よるおそくコーヒーをのまないようにしている。', back: 'I try not to drink coffee late at night.' },
        { front: '遅れないようにしてください。', reading: 'おくれないようにしてください。', back: "Please make sure you're not late." },
        { front: 'できるだけ歩くようにしています。', reading: 'できるだけあるくようにしています。', back: 'I try to walk as much as possible.' },
        { front: '大事なことは忘れないようにしている。', reading: 'だいじなことはわすれないようにしている。', back: 'I make sure not to forget important things.' },
        { front: '毎晩十二時までに寝るようにしている。', reading: 'まいばんじゅうにじまでにねるようにしている。', back: 'I try to go to bed by midnight every night.' }
      ]
    },
    {
      key: 'n4b.koto-ni-naru',
      kind: 'grammar',
      title: '～ことになる — it has been decided (not by me)',
      body: `Dictionary form (or ない-form) + ことになる: "it has been decided / it has come about that…" — a decision made by circumstances or by others:

来月、大阪に転勤することになりました。 — "It's been decided that I'll be transferred to Osaka next month."

Compare ～ことにする (N4 lesson on こと patterns): にする is your own decision, になる is one that happened to you. Japanese speakers often use になる even for their own choices, to sound modest.

~ことになっている describes a rule or arrangement: 会議は月曜日にすることになっている — "Meetings are (set) on Mondays."`,
      cards: [
        { front: '来月、大阪に転勤することになりました。', reading: 'らいげつ、おおさかにてんきんすることになりました。', back: "It's been decided that I'll be transferred to Osaka next month." },
        { front: '来年、結婚することになりました。', reading: 'らいねん、けっこんすることになりました。', back: "We're getting married next year." },
        { front: '会議は中止することになった。', reading: 'かいぎはちゅうしすることになった。', back: 'It was decided to cancel the meeting.' },
        { front: '会議は月曜日にすることになっている。', reading: 'かいぎはげつようびにすることになっている。', back: 'Meetings are set for Mondays.' },
        { front: 'この部屋では靴を脱ぐことになっています。', reading: 'このへやではくつをぬぐことになっています。', back: 'In this room, the rule is to take off your shoes.' },
        { front: '明日から私が案内することになりました。', reading: 'あしたからわたしがあんないすることになりました。', back: "It's been arranged that I'll be your guide from tomorrow." }
      ]
    },
    {
      key: 'n4b.koto-ga-aru',
      kind: 'grammar',
      title: 'Sometimes: dictionary form + ことがある',
      body: `Dictionary form + ことがある means "there are times when… / sometimes":

朝ご飯を食べないことがある。 — "Sometimes I don't eat breakfast."
このバスは遅れることがあります。 — "This bus is sometimes late."

Don't mix it up with た-form + ことがある ("have done before", the N4 experience pattern):
・日本に行くことがある。 — "I sometimes go to Japan."
・日本に行ったことがある。 — "I have been to Japan."

The tense of the verb before こと is the whole difference.`,
      cards: [
        { front: '朝ご飯を食べないことがある。', reading: 'あさごはんをたべないことがある。', back: "Sometimes I don't eat breakfast." },
        { front: 'このバスは遅れることがあります。', reading: 'このバスはおくれることがあります。', back: 'This bus is sometimes late.' },
        { front: '週末は家で仕事をすることがある。', reading: 'しゅうまつはいえでしごとをすることがある。', back: 'I sometimes work from home at the weekend.' },
        { front: '日本に行くことがある。', reading: 'にほんにいくことがある。', back: 'I sometimes go to Japan.' },
        { front: '日本に行ったことがある。', reading: 'にほんにいったことがある。', back: 'I have been to Japan.' },
        { front: '冬でも暖かくなることがある。', reading: 'ふゆでもあたたかくなることがある。', back: 'Even in winter, it sometimes gets warm.' }
      ]
    },
    {
      key: 'n4b.te-hoshii',
      kind: 'grammar',
      title: '～てほしい — wanting someone else to do something',
      body: `ほしい ("want a thing") combines with the て-form to mean "want (someone) to do":

母に早く元気になってほしい。 — "I want my mother to get well soon."

The person you want to act takes に. The negative ～ないでほしい is "I don't want (you) to…":
誰にも言わないでほしい。 — "I don't want you to tell anyone."

Said directly to someone it is a strong request; ～てもらえますか or ～てくれませんか are softer.

Compare ～たい: たい is wanting to do something yourself; てほしい is wanting someone else to.`,
      cards: [
        { front: '母に早く元気になってほしい。', reading: 'ははにはやくげんきになってほしい。', back: 'I want my mother to get well soon.' },
        { front: '誰にも言わないでほしい。', reading: 'だれにもいわないでほしい。', back: "I don't want you to tell anyone." },
        { front: 'もっとゆっくり話してほしいです。', reading: 'もっとゆっくりはなしてほしいです。', back: 'I would like you to speak more slowly.' },
        { front: '子供には自由に育ってほしい。', reading: 'こどもにはじゆうにそだってほしい。', back: 'I want my children to grow up free.' },
        { front: '雨が早くやんでほしい。', reading: 'あめがはやくやんでほしい。', back: 'I want the rain to stop soon.' },
        { front: '先生に作文を直してほしいんですが。', reading: 'せんせいにさくぶんをなおしてほしいんですが。', back: "I'd like you to correct my essay, teacher." }
      ]
    },
    {
      key: 'n4b.you-ni-iu',
      kind: 'grammar',
      title: 'Indirect requests: ～ように言う・頼む',
      body: `Reporting a request or an instruction: dictionary form (or ない-form) + ように + 言う／頼む／伝える:

先生は学生に静かにするように言いました。 — "The teacher told the students to be quiet."
母に早く帰るように頼まれた。 — "My mother asked me to come home early."

The person told takes に. Negative: ～ないように言う ("told not to"):
医者にお酒を飲まないように言われた。 — "The doctor told me not to drink."

Passing on a message: 田中さんに電話するように伝えてください — "Please tell Tanaka to call."`,
      cards: [
        { front: '先生は学生に静かにするように言いました。', reading: 'せんせいはがくせいにしずかにするようにいいました。', back: 'The teacher told the students to be quiet.' },
        { front: '母に早く帰るように頼まれた。', reading: 'ははにはやくかえるようにたのまれた。', back: 'My mother asked me to come home early.' },
        { front: '医者にお酒を飲まないように言われた。', reading: 'いしゃにおさけをのまないようにいわれた。', back: 'The doctor told me not to drink.' },
        { front: '田中さんに電話するように伝えてください。', reading: 'たなかさんにでんわするようにつたえてください。', back: 'Please tell Tanaka to call.' },
        { front: '部長に資料を用意するように頼んだ。', reading: 'ぶちょうにしりょうをよういするようにたのんだ。', back: 'I asked the department manager to prepare the materials.' },
        { front: '子供に道で遊ばないように言った。', reading: 'こどもにみちであそばないようにいった。', back: 'I told the children not to play in the street.' }
      ]
    },
    {
      key: 'n4b.saserareru',
      kind: 'grammar',
      title: 'Made to do: the causative-passive ～させられる',
      body: `Combine the causative (make someone do) with the passive (have something done to you) and you get "be made to do" — something you did against your will:

子供の時、母に野菜を食べさせられた。 — "As a child, I was made to eat vegetables by my mother."

Formation:
・Group 2: 食べる → 食べさせる → 食べさせられる
・Group 3: する → させられる、来る → 来させられる（こさせられる）
・Group 1: 待つ → 待たせる → 待たせられる, usually shortened to 待たされる (a-row + される): 待たされる、飲まされる、行かされる
  (Verbs ending in す keep the long form: 話させられる)

The one who forced you takes に. The nuance is almost always "against my will" — a complaint.`,
      cards: [
        { front: '子供の時、母に野菜を食べさせられた。', reading: 'こどものとき、ははにやさいをたべさせられた。', back: 'As a child, I was made to eat vegetables by my mother.' },
        { front: '駅で一時間も待たされた。', reading: 'えきでいちじかんもまたされた。', back: 'I was kept waiting at the station for a whole hour.' },
        { front: '先輩にお酒を飲まされた。', reading: 'せんぱいにおさけをのまされた。', back: 'My senior made me drink.' },
        { front: '毎日漢字を書かされた。', reading: 'まいにちかんじをかかされた。', back: 'I was made to write kanji every day.' },
        { front: '会議で意見を話させられた。', reading: 'かいぎでいけんをはなさせられた。', back: 'I was made to give my opinion at the meeting.' },
        { front: '日曜日なのに、部屋の掃除をさせられた。', reading: 'にちようびなのに、へやのそうじをさせられた。', back: 'Even though it was Sunday, I was made to clean my room.' }
      ]
    },
    {
      key: 'n4b.compound',
      kind: 'grammar',
      title: 'Start, finish, keep: ～始める・～終わる・～続ける・～出す',
      body: `Add these verbs to a ます-stem to mark where in an action you are:

・～始める — begin to: 読み始める "start reading"
・～終わる — finish: 食べ終わる "finish eating"
・～続ける — keep on: 走り続ける "keep running"
・～出す — suddenly start (often uncontrollable): 泣き出す "burst into tears", 降り出す "start to rain"

They conjugate as verbs on their own: 読み始めました、食べ終わったら、話し続けている.

始める is neutral and deliberate; 出す is sudden: 雨が降り始めた (it began to rain) vs 雨が急に降り出した (it suddenly started pouring).

～上げる on a ます-stem means "finish completely", often with effort: 書き上げる (finish writing), 仕上げる (complete, put the finishing touches on).`,
      cards: [
        { front: 'この本を読み始めました。', reading: 'このほんをよみはじめました。', back: 'I started reading this book.' },
        { front: '食べ終わったら、皿を洗ってください。', reading: 'たべおわったら、さらをあらってください。', back: "When you've finished eating, please wash the dishes." },
        { front: '彼は三時間も話し続けた。', reading: 'かれはさんじかんもはなしつづけた。', back: 'He kept talking for three whole hours.' },
        { front: '急に雨が降り出した。', reading: 'きゅうにあめがふりだした。', back: 'It suddenly started to rain.' },
        { front: '子供が泣き出した。', reading: 'こどもがなきだした。', back: 'The child burst into tears.' },
        { front: 'レポートを書き終わるまで寝られない。', reading: 'レポートをかきおわるまでねられない。', back: "I can't go to bed until I finish writing the report." },
        { front: '三年かけて小説を書き上げた。', reading: 'さんねんかけてしょうせつをかきあげた。', back: 'I finished writing the novel after three years of work.' }
      ]
    },
    {
      key: 'n4b.ga-suru',
      kind: 'grammar',
      title: 'Sensations: 音・匂い・味・気 + がする',
      body: `To say something can be heard, smelled, tasted or sensed, the sensation takes が and the verb is する:

・音がする — there is a sound: 変な音がする "I hear a strange noise"
・匂いがする — there is a smell: いい匂いがする "something smells good"
・味がする — there is a taste: 甘い味がする "it tastes sweet"
・気がする — have a feeling: 誰かに見られている気がする "I feel like someone is watching me"

The sensation is usually described first: どこかで猫の鳴き声がした — "I heard a cat crying somewhere."

気がする is especially useful for soft opinions: 前に会った気がする — "I feel like we've met before."`,
      cards: [
        { front: '台所から変な音がする。', reading: 'だいどころからへんなおとがする。', back: "There's a strange noise coming from the kitchen." },
        { front: 'パンを焼くいい匂いがする。', reading: 'パンをやくいいにおいがする。', back: 'There is a nice smell of bread baking.' },
        { front: 'このスープはレモンの味がする。', reading: 'このスープはレモンのあじがする。', back: 'This soup tastes of lemon.' },
        { front: '誰かに見られている気がする。', reading: 'だれかにみられているきがする。', back: 'I feel like someone is watching me.' },
        { front: '前に会った気がします。', reading: 'まえにあったきがします。', back: "I feel like we've met before." },
        { front: 'どこかで猫の鳴き声がした。', reading: 'どこかでねこのなきごえがした。', back: 'I heard a cat crying somewhere.' }
      ]
    },
    {
      key: 'n4b.nominal',
      kind: 'grammar',
      title: 'Turning verbs into nouns: ～の・～こと',
      body: `To use a whole action as the subject or object of a sentence, add の or こと after the plain form:

・本を読むのが好きです。 — "I like reading books."
・日本語を話すことは難しい。 — "Speaking Japanese is difficult."

Often either works, but not always:
・Use の with verbs of perception (見る・聞く) and with 待つ・手伝う: 子供が遊んでいるのを見た — "I watched the children playing."
・Use こと in set patterns and before です when defining: 趣味は写真を撮ることです — "My hobby is taking photos." (の is wrong here)
・忘れる・知る take either: 電話するのを忘れた / 電話することを忘れた.

のは～だ puts focus on the end of the sentence: 私が一番好きなのはこの曲だ — "The one I like most is this song."`,
      cards: [
        { front: '本を読むのが好きです。', reading: 'ほんをよむのがすきです。', back: 'I like reading books.' },
        { front: '日本語を話すことは難しい。', reading: 'にほんごをはなすことはむずかしい。', back: 'Speaking Japanese is difficult.' },
        { front: '子供が遊んでいるのを見た。', reading: 'こどもがあそんでいるのをみた。', back: 'I watched the children playing.' },
        { front: '趣味は写真を撮ることです。', reading: 'しゅみはしゃしんをとることです。', back: 'My hobby is taking photos.' },
        { front: '電話するのを忘れた。', reading: 'でんわするのをわすれた。', back: 'I forgot to call.' },
        { front: '私が一番好きなのはこの曲だ。', reading: 'わたしがいちばんすきなのはこのきょくだ。', back: 'The one I like most is this song.' }
      ]
    }
  ]
}
