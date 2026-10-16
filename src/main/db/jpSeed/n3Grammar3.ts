import type { SeedCourseDef } from '../japaneseSeed'

// JLPT N3 Grammar III (2026-10-16): the N3 points the first two N3 courses did
// not reach — connectors, hypotheticals, comparison, the という family, wishes
// and the rest. Right after JLPT N3 Grammar II. Keys are frozen.

export const N3C_COURSE: SeedCourseDef = {
  title: 'JLPT N3 Grammar III',
  description:
    'The rest of the N3 core: connectors, hypotheticals, role and viewpoint, comparison, wishes, ' +
    'the という family and more. Do this right after JLPT N3 Grammar II.',
  level: 'N3',
  lessons: [
    {
      key: 'n3c.adding',
      kind: 'grammar',
      title: 'その上・それに・それと・それとも — adding and choosing',
      body: `Four sentence-starting connectors that link one idea to the next.

Adding:
・その上 — "on top of that". Written or careful speech; the added point usually makes the first one stronger.
  この店は安い。その上、とても美味しい。 — "This place is cheap. On top of that, it's really tasty."
・それに — "besides, and also". The everyday spoken version; good for piling up reasons.
  今日は疲れた。それに、雨も降っている。 — "I'm tired today. Besides, it's raining."
・それと — "and, oh, also". Adds one more item, often an afterthought when ordering or listing.
  コーヒーをください。それと、水も。 — "A coffee, please. And some water too."

Choosing:
・それとも — "or" between two questions. It only joins questions; for "A or B" inside one statement use か (コーヒーか紅茶).
  コーヒーにする？それとも、紅茶？ — "Coffee? Or tea?"

Compare その上 and それに: both add, but その上 sounds more formal and suits writing, while それに is what you hear in conversation.`,
      cards: [
        { front: 'この部屋は広い。その上、駅から近い。', reading: 'このへやはひろい。そのうえ、えきからちかい。', back: 'This room is spacious. On top of that, it is close to the station.' },
        { front: '彼は頭がいい。その上、スポーツも得意だ。', reading: 'かれはあたまがいい。そのうえ、スポーツもとくいだ。', back: "He's smart. On top of that, he's good at sports." },
        { front: '今日は行きたくない。それに、お金もない。', reading: 'きょうはいきたくない。それに、おかねもない。', back: "I don't want to go today. Besides, I have no money." },
        { front: 'パンを買ってきて。それと、牛乳も。', reading: 'パンをかってきて。それと、ぎゅうにゅうも。', back: 'Go buy some bread. Oh, and milk too.' },
        { front: '歩いて行く？それとも、バスに乗る？', reading: 'あるいていく？それとも、バスにのる？', back: 'Shall we walk? Or take the bus?' },
        { front: '肉にしますか、それとも魚にしますか。', reading: 'にくにしますか、それともさかなにしますか。', back: 'Will you have the meat, or the fish?' }
      ]
    },
    {
      key: 'n3c.explaining',
      kind: 'grammar',
      title: 'つまり・なぜなら・そのため・その結果 — explaining and concluding',
      body: `Connectors that restate, give a reason, or state a result.

・つまり — "in other words, so basically". Restates or sums up what came before.
  彼は父の兄だ。つまり、私のおじだ。 — "He's my father's older brother. In other words, my uncle."
・なぜなら～からだ — "the reason is that…". It comes AFTER the statement it explains, and the sentence normally ends in からだ / のだ.
  旅行は中止だ。なぜなら、台風が来るからだ。 — "The trip is off. The reason is that a typhoon is coming."
・そのため(に) — "for that reason / because of that". Neutral, common in writing and news.
  電車が止まった。そのため、多くの人が遅刻した。 — "The trains stopped. Because of that, many people were late."
・その結果 — "as a result". Points to the outcome of a process.
  毎日練習した。その結果、試合に勝った。 — "I practiced every day. As a result, I won the match."

Compare なぜなら with から/ので: から and ので attach to the reason inside one sentence (雨だから行かない). なぜなら opens a separate sentence and sounds formal or argumentative; in casual talk people say だって instead.`,
      cards: [
        { front: '明日は休みだ。つまり、ゆっくり寝られる。', reading: 'あしたはやすみだ。つまり、ゆっくりねられる。', back: 'Tomorrow is a day off. In other words, I can sleep in.' },
        { front: 'つまり、君は行きたくないんだね。', reading: 'つまり、きみはいきたくないんだね。', back: "So basically, you don't want to go." },
        { front: '私は反対だ。なぜなら、危険すぎるからだ。', reading: 'わたしははんたいだ。なぜなら、きけんすぎるからだ。', back: "I'm against it. The reason is that it's too dangerous." },
        { front: '大雨が降った。そのため、試合は延期になった。', reading: 'おおあめがふった。そのため、しあいはえんきになった。', back: 'There was heavy rain. Because of that, the match was postponed.' },
        { front: '彼は毎日勉強した。その結果、大学に合格した。', reading: 'かれはまいにちべんきょうした。そのけっか、だいがくにごうかくした。', back: 'He studied every day. As a result, he got into university.' },
        { front: '値段を下げた。その結果、売り上げが伸びた。', reading: 'ねだんをさげた。そのけっか、うりあげがのびた。', back: 'We lowered the price. As a result, sales went up.' }
      ]
    },
    {
      key: 'n3c.tokoroga',
      kind: 'grammar',
      title: 'ところが・それなのに・ただし — but, unexpectedly',
      body: `Three ways to start a sentence with "but", each with its own flavour.

・ところが — "however, but then". The second sentence is a surprise: what happened was not what you expected. It describes facts, so it cannot be followed by your own request or intention.
  すぐ終わると思った。ところが、三時間もかかった。 — "I thought it would be over quickly. But it took a whole three hours."
・それなのに — "and yet, even so". Like のに, it carries frustration or blame.
  何度も注意した。それなのに、彼はまた遅れた。 — "I warned him again and again. And yet he was late again."
・ただし — "however, provided that". Adds a condition or exception to what was just said; common in rules and notices.
  入場は無料です。ただし、予約が必要です。 — "Entry is free. However, a reservation is required."

Compare ところが with しかし: しかし is a plain "however" for any contrast; ところが specifically flags that reality went against expectation.`,
      cards: [
        { front: '晴れると思っていた。ところが、急に雨が降り出した。', reading: 'はれるとおもっていた。ところが、きゅうにあめがふりだした。', back: 'I thought it would be sunny. But suddenly it started to rain.' },
        { front: '簡単だと思った。ところが、全然できなかった。', reading: 'かんたんだとおもった。ところが、ぜんぜんできなかった。', back: "I thought it was easy. But I couldn't do it at all." },
        { front: '一生懸命作った。それなのに、誰も食べてくれなかった。', reading: 'いっしょうけんめいつくった。それなのに、だれもたべてくれなかった。', back: 'I worked hard to make it. And yet nobody ate any.' },
        { front: '約束した。それなのに、彼女は来なかった。', reading: 'やくそくした。それなのに、かのじょはこなかった。', back: 'She promised. And yet she never came.' },
        { front: '写真を撮ってもいいです。ただし、フラッシュは禁止です。', reading: 'しゃしんをとってもいいです。ただし、フラッシュはきんしです。', back: 'You may take photos. However, flash is prohibited.' },
        { front: '参加は自由だ。ただし、遅刻は認めない。', reading: 'さんかはじゆうだ。ただし、ちこくはみとめない。', back: 'Taking part is optional. However, lateness will not be accepted.' }
      ]
    },
    {
      key: 'n3c.neg-adverbs',
      kind: 'grammar',
      title: '決して・まったく・少しも・めったに～ない — strong negatives',
      body: `These adverbs only make sense with a negative ending. Hearing one early in a sentence tells you a ない is coming.

・決して～ない — "never, by no means". A strong vow or firm denial.
  このことは決して忘れない。 — "I will never forget this."
・まったく～ない — "not at all". Neutral and very common. (With a positive verb, まったく means "totally / honestly!": まったく、困ったな。)
  まったく分からない。 — "I don't understand at all."
・少しも～ない — "not even a little". Same meaning as ちっとも～ない, which is more casual.
  少しも疲れていない。 — "I'm not tired in the slightest."
・めったに～ない — "rarely, hardly ever". About frequency, not degree.
  父はめったに怒らない。 — "My father rarely gets angry."

Compare 全然～ない (N4): 全然 is the casual all-purpose "not at all"; まったく is neutral; 決して adds resolve and suits promises and warnings.`,
      cards: [
        { front: '君のことは決して忘れない。', reading: 'きみのことはけっしてわすれない。', back: 'I will never forget you.' },
        { front: '決して諦めてはいけない。', reading: 'けっしてあきらめてはいけない。', back: 'You must never give up.' },
        { front: '彼の言っていることがまったく分からない。', reading: 'かれのいっていることがまったくわからない。', back: "I don't understand what he's saying at all." },
        { front: 'その映画は少しも面白くなかった。', reading: 'そのえいがはすこしもおもしろくなかった。', back: "That movie wasn't the least bit interesting." },
        { front: 'この町では雪はめったに降らない。', reading: 'このまちではゆきはめったにふらない。', back: 'It rarely snows in this town.' },
        { front: '兄はめったに電話をくれない。', reading: 'あにはめったにでんわをくれない。', back: 'My older brother hardly ever calls me.' }
      ]
    },
    {
      key: 'n3c.moshi',
      kind: 'grammar',
      title: 'もし・もしも・もしかすると — if, and maybe',
      body: `もし is not a conditional by itself; it warns that a conditional (たら・ば・なら・ても) is on its way and makes the "if" feel more hypothetical.

・もし～たら / もし～なら — "if".
  もし時間があったら、手伝ってください。 — "If you have time, please help."
・もしも — a stronger, more dramatic もし: "if, by any chance / if ever".
  もしも私がいなくなったら、どうする？ — "If I were ever gone, what would you do?"
・もし～ても — "even if". もし adds the sense that the case is unlikely.
  もし失敗しても、また挑戦すればいい。 — "Even if you fail, you can just try again."
・もしかすると / もしかしたら～かもしれない — "maybe, possibly". This one is not a condition at all: it softens a guess and usually ends in かもしれない.
  もしかすると、彼はもう帰ったかもしれない。 — "Maybe he has already gone home."

Watch the difference: もし always needs a conditional ending; もしかすると needs a guess ending (かもしれない・だろう).`,
      cards: [
        { front: 'もし宝くじが当たったら、世界旅行に行きたい。', reading: 'もしたからくじがあたったら、せかいりょこうにいきたい。', back: "If I won the lottery, I'd want to travel the world." },
        { front: 'もし嫌なら、断ってもいいよ。', reading: 'もしいやなら、ことわってもいいよ。', back: "If you don't want to, it's fine to say no." },
        { front: 'もしも地球が止まったら、どうなるだろう。', reading: 'もしもちきゅうがとまったら、どうなるだろう。', back: 'I wonder what would happen if the Earth ever stopped.' },
        { front: 'もし雨が降っても、試合は行われる。', reading: 'もしあめがふっても、しあいはおこなわれる。', back: 'Even if it rains, the match will be held.' },
        { front: 'もしかすると、明日は雪になるかもしれない。', reading: 'もしかすると、あしたはゆきになるかもしれない。', back: 'It might possibly snow tomorrow.' },
        { front: 'もしかしたら、彼が犯人かもしれない。', reading: 'もしかしたら、かれがはんにんかもしれない。', back: 'Maybe he is the culprit.' }
      ]
    },
    {
      key: 'n3c.toshitara',
      kind: 'grammar',
      title: '～としたら・～とすれば・～とすると — supposing that',
      body: `と + する in a conditional form means "if we suppose that…". It sets up an assumption, often one you are not sure is true, and then reasons from it.

Formation: plain form + としたら / とすれば / とすると. Nouns and な-adjectives take だ: 本当だとしたら.
  もし百万円あるとしたら、何に使う？ — "Supposing you had a million yen, what would you spend it on?"
  彼の話が本当だとすれば、大変なことだ。 — "If what he says is true, this is serious."

The three are close in meaning:
・としたら — the most common in speech; good for imaginary situations.
・とすれば — a little more logical and written in tone.
・とすると — often used to draw a conclusion from something just learned: "in that case…".
  電車が遅れているとすると、会議に間に合わない。 — "If the train is delayed, then we won't make the meeting."

Compare plain たら: 雨が降ったら行かない is a simple condition. 雨が降るとしたら puts the rain forward as a hypothesis to think about.`,
      cards: [
        { front: '一日だけ透明人間になれるとしたら、何をする？', reading: 'いちにちだけとうめいにんげんになれるとしたら、なにをする？', back: 'If you could be invisible for just one day, what would you do?' },
        { front: '生まれ変わるとしたら、鳥になりたい。', reading: 'うまれかわるとしたら、とりになりたい。', back: 'If I were to be reborn, I would want to be a bird.' },
        { front: 'その話が本当だとすれば、彼は無実だ。', reading: 'そのはなしがほんとうだとすれば、かれはむじつだ。', back: 'If that story is true, he is innocent.' },
        { front: '今から出るとすれば、八時には着く。', reading: 'いまからでるとすれば、はちじにはつく。', back: "If we leave now, we'll arrive by eight." },
        { front: '店が休みだとすると、どこで食べようか。', reading: 'みせがやすみだとすると、どこでたべようか。', back: 'If the restaurant is closed, then where shall we eat?' },
        { front: '彼が来ないとすると、人数が足りない。', reading: 'かれがこないとすると、にんずうがたりない。', back: "If he isn't coming, then we don't have enough people." }
      ]
    },
    {
      key: 'n3c.toshite',
      kind: 'grammar',
      title: '～として — as (a role or capacity)',
      body: `Noun + として means "as", in the sense of a role, position, status or purpose.
  彼は医者として病院で働いている。 — "He works at the hospital as a doctor."
  留学生として日本に来た。 — "I came to Japan as an exchange student."

Before another noun it becomes としての: 親としての責任 — "my responsibility as a parent".

With は or も it marks a point of view: 私としては、反対だ — "Speaking for myself, I'm against it." 個人としても — "as an individual too".

Compare ～にとって (next lesson): として is about the role someone plays or the label something has; にとって is about whose point of view a judgment comes from.
・彼は先生として厳しい。 — "As a teacher, he is strict." (his role)
・この本は先生にとって大切だ。 — "This book is important to the teacher." (the teacher's viewpoint)`,
      cards: [
        { front: '彼女は通訳として会議に参加した。', reading: 'かのじょはつうやくとしてかいぎにさんかした。', back: 'She took part in the meeting as an interpreter.' },
        { front: 'この部屋は物置として使っている。', reading: 'このへやはものおきとしてつかっている。', back: 'We use this room as a storeroom.' },
        { front: '趣味として絵を描いている。', reading: 'しゅみとしてえをかいている。', back: 'I paint as a hobby.' },
        { front: '親としての責任を果たしたい。', reading: 'おやとしてのせきにんをはたしたい。', back: 'I want to fulfil my responsibilities as a parent.' },
        { front: '私としては、この案に賛成です。', reading: 'わたしとしては、このあんにさんせいです。', back: 'Speaking for myself, I am in favour of this plan.' },
        { front: '彼はキャプテンとしてチームをまとめた。', reading: 'かれはキャプテンとしてチームをまとめた。', back: 'As captain, he held the team together.' }
      ]
    },
    {
      key: 'n3c.nitotte',
      kind: 'grammar',
      title: '～にとって — for, from the viewpoint of',
      body: `Noun + にとって means "for (someone)" or "to (someone)": whose point of view a judgment or value comes from.
  この写真は私にとって宝物だ。 — "This photo is a treasure to me."
  子供にとって、遊びは大切な勉強だ。 — "For children, play is an important kind of learning."

The rest of the sentence is an evaluation: important, difficult, necessary, a problem. It does not take actions or feelings shown towards someone; for that use に対して (N3 Grammar II):
・先生は学生に対して厳しい。 — "The teacher is strict with the students." (attitude towards them)
・この問題は学生にとって難しい。 — "This problem is hard for the students." (from their side)

Before a noun it becomes にとっての: 私にとっての幸せ — "happiness as I see it".`,
      cards: [
        { front: 'この指輪は私にとって大切な物だ。', reading: 'このゆびわはわたしにとってたいせつなものだ。', back: 'This ring is precious to me.' },
        { front: '外国人にとって、敬語は難しい。', reading: 'がいこくじんにとって、けいごはむずかしい。', back: 'Honorific language is difficult for foreigners.' },
        { front: '健康は誰にとっても一番の財産だ。', reading: 'けんこうはだれにとってもいちばんのざいさんだ。', back: "Health is everyone's greatest asset." },
        { front: '彼にとって、この試合は最後のチャンスだ。', reading: 'かれにとって、このしあいはさいごのチャンスだ。', back: 'For him, this match is the last chance.' },
        { front: '猫にとって、この暑さはつらいだろう。', reading: 'ねこにとって、このあつさはつらいだろう。', back: 'This heat must be hard on the cat.' },
        { front: '私にとっての幸せは、家族と過ごす時間だ。', reading: 'わたしにとってのしあわせは、かぞくとすごすじかんだ。', back: 'For me, happiness is time spent with my family.' }
      ]
    },
    {
      key: 'n3c.kawarini',
      kind: 'grammar',
      title: '～かわりに・～にかわって — instead of, in exchange for',
      body: `かわり (代わり / 替わり) means "substitute". It has three uses.

1. Instead of (doing X, do Y): verb plain form + かわりに.
  映画を見るかわりに、本を読んだ。 — "Instead of watching a movie, I read a book."
2. In exchange for: one thing balances another. Plain form + かわりに; な-adjectives take な (大変なかわりに).
  料理を作ってもらうかわりに、皿を洗う。 — "In exchange for you cooking, I'll wash the dishes."
  この部屋は狭いかわりに、家賃が安い。 — "This room is small, but in return the rent is cheap."
3. In place of someone: noun + の + かわりに, or the more formal noun + にかわって.
  母のかわりに、私が行きます。 — "I'll go in place of my mother."
  社長にかわって、ご挨拶申し上げます。 — "On behalf of the president, I would like to say a few words."

にかわって also describes one thing replacing another over time: 手紙にかわって、メールが使われるようになった — "Email came to be used in place of letters."`,
      cards: [
        { front: '電車で行くかわりに、自転車で行った。', reading: 'でんしゃでいくかわりに、じてんしゃでいった。', back: 'Instead of going by train, I went by bike.' },
        { front: '英語を教えるかわりに、日本語を教えてもらった。', reading: 'えいごをおしえるかわりに、にほんごをおしえてもらった。', back: 'In exchange for teaching English, I was taught Japanese.' },
        { front: 'この仕事は大変なかわりに、給料がいい。', reading: 'このしごとはたいへんなかわりに、きゅうりょうがいい。', back: 'This job is hard, but in return the pay is good.' },
        { front: '風邪をひいた田中さんのかわりに、私が出席した。', reading: 'かぜをひいたたなかさんのかわりに、わたしがしゅっせきした。', back: 'I attended in place of Tanaka, who had a cold.' },
        { front: '部長にかわって、私が説明いたします。', reading: 'ぶちょうにかわって、わたしがせつめいいたします。', back: 'I will explain on behalf of the department manager.' },
        { front: '最近は現金にかわって、カードで払う人が増えた。', reading: 'さいきんはげんきんにかわって、カードではらうひとがふえた。', back: 'These days, more people pay by card instead of cash.' }
      ]
    },
    {
      key: 'n3c.nioite',
      kind: 'grammar',
      title: '～において・～における — in, at (formal)',
      body: `Noun + において is a formal "in / at / on", marking the place, time, field or situation where something happens. It is the written, official counterpart of で.
  会議は第一会議室において行われる。 — "The meeting will be held in Conference Room 1."
  現代社会において、情報は重要だ。 — "In modern society, information is important."

Before a noun it becomes における: 日本における英語教育 — "English education in Japan".

When to use it: speeches, announcements, reports, news and academic writing. In conversation, で sounds natural and において sounds stiff:
・教室で勉強する。 — everyday
・教育の現場において — formal

において also marks an area of comparison or ability: 技術において、この会社は世界一だ — "In technology, this company is the best in the world."`,
      cards: [
        { front: '卒業式は体育館において行われます。', reading: 'そつぎょうしきはたいいくかんにおいておこなわれます。', back: 'The graduation ceremony will be held in the gymnasium.' },
        { front: '現代において、スマホは欠かせない。', reading: 'げんだいにおいて、スマホはかかせない。', back: 'In the present day, smartphones are indispensable.' },
        { front: 'スピードにおいて、彼に勝てる選手はいない。', reading: 'スピードにおいて、かれにかてるせんしゅはいない。', back: 'In terms of speed, no player can beat him.' },
        { front: '人生において大切なものは何だろう。', reading: 'じんせいにおいてたいせつなものはなんだろう。', back: 'What are the important things in life, I wonder?' },
        { front: '日本における少子化は深刻な問題だ。', reading: 'にほんにおけるしょうしかはしんこくなもんだいだ。', back: "Japan's falling birth rate is a serious problem." },
        { front: '職場における人間関係に悩んでいる。', reading: 'しょくばにおけるにんげんかんけいになやんでいる。', back: "I'm struggling with relationships at work." }
      ]
    },
    {
      key: 'n3c.kurabete',
      kind: 'grammar',
      title: '～に比べて・～ほど～はない — compared with, nothing is as',
      body: `Two ways to compare beyond より.

・Noun + に比べて (比べると) — "compared with". It sets a reference point, often for a change or a difference in degree.
  去年に比べて、今年は雪が多い。 — "Compared with last year, there's more snow this year."
  兄に比べると、弟は背が低い。 — "Compared with his older brother, the younger one is short."

・A ほど + adjective + noun はない — "there is no (noun) as (adjective) as A". A superlative said through a negative: A is the most.
  富士山ほど美しい山はない。 — "No mountain is as beautiful as Mount Fuji."
  くらい (ぐらい) works the same way: 彼くらい優しい人はいない — "There's no one as kind as him."

Compare より: AはBより大きい states a simple fact. に比べて sounds more measured and is common in reports; ほど～はない is emphatic and personal.`,
      cards: [
        { front: '東京に比べて、大阪は物価が安い。', reading: 'とうきょうにくらべて、おおさかはぶっかがやすい。', back: 'Compared with Tokyo, prices in Osaka are low.' },
        { front: '昔に比べて、体力が落ちた。', reading: 'むかしにくらべて、たいりょくがおちた。', back: 'Compared with the old days, my stamina has dropped.' },
        { front: '去年に比べると、今年の夏は涼しい。', reading: 'きょねんにくらべると、ことしのなつはすずしい。', back: "Compared with last year, this summer is cool." },
        { front: '家族ほど大切なものはない。', reading: 'かぞくほどたいせつなものはない。', back: 'Nothing is as precious as family.' },
        { front: '試験の前の日ほど嫌な日はない。', reading: 'しけんのまえのひほどいやなひはない。', back: 'There is no day as awful as the day before an exam.' },
        { front: '彼くらい正直な人はいない。', reading: 'かれくらいしょうじきなひとはいない。', back: 'There is no one as honest as him.' }
      ]
    },
    {
      key: 'n3c.kara-nikakete',
      kind: 'grammar',
      title: '～から～にかけて — from… through…',
      body: `A から B にかけて marks a stretch of time or space from A to B, without exact edges: "from about A through B".
  今夜から明日の朝にかけて、雨が降るでしょう。 — "Rain is expected from tonight through tomorrow morning."
  関東から東北にかけて、大雪になった。 — "There was heavy snow from Kanto across to Tohoku."

Compare から～まで (N5): まで gives a clear end point (九時から五時まで — "from nine to five"). にかけて is vaguer and describes something spread over the range: weather, seasons, regions, a period when something happens.

Without から, noun + にかけて means "around / through" a single span: 年末にかけて忙しくなる — "Things get busy toward the end of the year."`,
      cards: [
        { front: '三月から四月にかけて、桜が咲く。', reading: 'さんがつからしがつにかけて、さくらがさく。', back: 'The cherry blossoms bloom from March through April.' },
        { front: '午後から夜にかけて、風が強くなるでしょう。', reading: 'ごごからよるにかけて、かぜがつよくなるでしょう。', back: 'The wind will likely get stronger from the afternoon into the night.' },
        { front: '九州から四国にかけて、大雨が降った。', reading: 'きゅうしゅうからしこくにかけて、おおあめがふった。', back: 'Heavy rain fell from Kyushu across to Shikoku.' },
        { front: '肩から背中にかけて痛い。', reading: 'かたからせなかにかけていたい。', back: 'It hurts from my shoulders down my back.' },
        { front: '年末から正月にかけて、実家に帰る。', reading: 'ねんまつからしょうがつにかけて、じっかにかえる。', back: "I'm going back to my parents' home from the end of the year through New Year." },
        { front: '週末にかけて、天気が崩れるらしい。', reading: 'しゅうまつにかけて、てんきがくずれるらしい。', back: 'Apparently the weather will turn bad toward the weekend.' }
      ]
    },
    {
      key: 'n3c.koto-ni-shiteiru',
      kind: 'grammar',
      title: '～ことにしている — I make it a rule to',
      body: `Verb (plain form) + ことにしている describes a personal rule or habit you decided on and keep to: "I make a point of…".
  毎朝、三十分走ることにしている。 — "I make it a rule to run for thirty minutes every morning."
  夜十時以降は、何も食べないことにしている。 — "I make a point of not eating anything after 10 p.m."

How it fits with ことにする (N4 Grammar II):
・ことにする — "decide to": the moment of choosing. 明日から走ることにした — "I've decided to start running tomorrow."
・ことにしている — the decision kept as an ongoing rule.

Compare ことになっている: that is a rule or arrangement made by someone else or by circumstance (会社では、制服を着ることになっている — "At the company, we're supposed to wear a uniform"). ことにしている is your own choice.`,
      cards: [
        { front: '寝る前に、日記を書くことにしている。', reading: 'ねるまえに、にっきをかくことにしている。', back: 'I make it a rule to write in my diary before bed.' },
        { front: 'エレベーターは使わないことにしている。', reading: 'エレベーターはつかわないことにしている。', back: "I make a point of not using the elevator." },
        { front: '週末は仕事のメールを見ないことにしている。', reading: 'しゅうまつはしごとのメールをみないことにしている。', back: "I make it a rule not to check work email on weekends." },
        { front: '一日に一度は家族に電話することにしている。', reading: 'いちにちにいちどはかぞくにでんわすることにしている。', back: 'I make a point of calling my family once a day.' },
        { front: '甘い物は週に一回だけ食べることにしている。', reading: 'あまいものはしゅうにいっかいだけたべることにしている。', back: 'I make it a rule to eat sweets only once a week.' },
        { front: '知らない番号からの電話には出ないことにしている。', reading: 'しらないばんごうからのでんわにはでないことにしている。', back: "I make a point of not answering calls from unknown numbers." }
      ]
    },
    {
      key: 'n3c.koto-wa-ga',
      kind: 'grammar',
      title: '～ことは～が — it is true that…, but',
      body: `X ことは X が repeats the same word to grant a point and then limit it: "it's true that X, but…". The admission is grudging; the important part comes after が or けど.

Formation: the same word appears twice. Plain form + ことは + plain form (often the same form) + が / けど.
  行くことは行くが、少し遅れる。 — "I am going, but I'll be a bit late."
  このカレーは辛いことは辛いけど、美味しい。 — "This curry is spicy, sure, but it's good."
  な-adjectives: 便利なことは便利だが、高い。 — "It's convenient, I'll grant you, but expensive."

The past can sit in either position: 読んだことは読んだが、よく覚えていない — "I did read it, but I don't remember it well."

The effect is like English "I did go, but…" with stress on did: it concedes the fact while hinting it was not enough.`,
      cards: [
        { front: '料理はできることはできるが、上手ではない。', reading: 'りょうりはできることはできるが、じょうずではない。', back: "I can cook, sure, but I'm not good at it." },
        { front: 'その映画は見たことは見たけど、寝てしまった。', reading: 'そのえいがはみたことはみたけど、ねてしまった。', back: 'I did watch that movie, but I fell asleep.' },
        { front: 'このアパートは静かなことは静かだが、駅から遠い。', reading: 'このアパートはしずかなことはしずかだが、えきからとおい。', back: "This apartment is quiet, I'll grant you, but it's far from the station." },
        { front: '高いことは高いが、品質はいい。', reading: 'たかいことはたかいが、ひんしつはいい。', back: "It's expensive, true, but the quality is good." },
        { front: '宿題は終わったことは終わったけど、自信がない。', reading: 'しゅくだいはおわったことはおわったけど、じしんがない。', back: "I did finish my homework, but I'm not confident about it." },
        { front: '英語は話せることは話せるが、ゆっくりだ。', reading: 'えいごははなせることははなせるが、ゆっくりだ。', back: 'I can speak English, but only slowly.' }
      ]
    },
    {
      key: 'n3c.sa',
      kind: 'grammar',
      title: '～さ — turning adjectives into "-ness"',
      body: `Replace the final い of an い-adjective, or add to a な-adjective stem, with さ and you get a noun for the degree of that quality: "-ness", "how (big) it is".

・高い → 高さ — height
・重い → 重さ — weight
・寒い → 寒さ — the cold
・静か → 静かさ — quietness
・いい → よさ — goodness (いい always changes to よ)

  この山の高さは三千メートルだ。 — "The height of this mountain is 3,000 metres."
  寒さに負けないで。 — "Don't let the cold get the better of you."

さ is neutral and measurable: it names the amount of the quality. Its partner ～み (N2) names the feeling or character of a quality and works with only a few adjectives (甘み — "a sweet taste", 楽しみ — "something to look forward to").`,
      cards: [
        { front: 'この箱の重さはどのくらいですか。', reading: 'このはこのおもさはどのくらいですか。', back: 'About how heavy is this box?' },
        { front: '冬の寒さには慣れていない。', reading: 'ふゆのさむさにはなれていない。', back: "I'm not used to the winter cold." },
        { front: '彼の優しさに感動した。', reading: 'かれのやさしさにかんどうした。', back: 'I was moved by his kindness.' },
        { front: '海の深さを測った。', reading: 'うみのふかさをはかった。', back: 'They measured the depth of the sea.' },
        { front: 'この町の良さは、人が温かいことだ。', reading: 'このまちのよさは、ひとがあたたかいことだ。', back: 'The good thing about this town is that the people are warm.' },
        { front: '夜の静かさが好きだ。', reading: 'よるのしずかさがすきだ。', back: 'I love the quiet of the night.' }
      ]
    },
    {
      key: 'n3c.tate-saichuu',
      kind: 'grammar',
      title: '～たて・～最中に — freshly done, right in the middle of',
      body: `Two ways to pin an action to a moment.

・Verb ます-stem + たて — "freshly, just (done)". Used for things that are best right after they are made or done, and for people new to a role.
  焼きたてのパン — "freshly baked bread"
  入社したての頃 — "back when I had just joined the company" (する verbs: stem し + たて)
  Common set words: 焼きたて、できたて、取れたて、塗りたて (wet paint).

・Noun + の最中に / verb ている + 最中に — "right in the middle of". Usually something interrupts.
  食事の最中に、電話が鳴った。 — "Right in the middle of the meal, the phone rang."
  話している最中に、寝てしまった。 — "I fell asleep right in the middle of talking."

Compare ～ところ (N3 Grammar): している ところだ just says you are in the middle of something; 最中に stresses the very height of it, and the main clause is usually an interruption.`,
      cards: [
        { front: '焼きたてのパンはいい匂いがする。', reading: 'やきたてのパンはいいにおいがする。', back: 'Freshly baked bread smells great.' },
        { front: 'できたての料理を食べてください。', reading: 'できたてのりょうりをたべてください。', back: 'Please eat the food while it is fresh off the stove.' },
        { front: 'ペンキ塗りたてなので、触らないでください。', reading: 'ペンキぬりたてなので、さわらないでください。', back: "Wet paint, so please don't touch." },
        { front: '会議の最中に、携帯が鳴ってしまった。', reading: 'かいぎのさいちゅうに、けいたいがなってしまった。', back: 'My phone went off right in the middle of the meeting.' },
        { front: '試験の最中に、お腹が痛くなった。', reading: 'しけんのさいちゅうに、おなかがいたくなった。', back: 'My stomach started hurting right in the middle of the exam.' },
        { front: 'シャワーを浴びている最中に、停電した。', reading: 'シャワーをあびているさいちゅうに、ていでんした。', back: 'The power went out right in the middle of my shower.' }
      ]
    },
    {
      key: 'n3c.tsuideni',
      kind: 'grammar',
      title: '～ついでに — while you are at it',
      body: `ついでに means "while (doing X), also do Y": you take advantage of one action to do a second, smaller one.

Formation: verb plain form + ついでに; noun + の + ついでに.
  買い物に行くついでに、郵便局に寄った。 — "While I was out shopping, I stopped by the post office."
  散歩のついでに、パンを買ってきた。 — "I picked up some bread on my walk."

On its own at the start of a request, ついでに means "while you're at it":
  ついでに、ゴミも出してくれる？ — "While you're at it, could you take out the trash too?"

Compare ～ながら (N4): ながら means two actions happen at the same moment (歩きながら話す). ついでに means the second action piggybacks on the first trip or occasion; they need not be simultaneous.`,
      cards: [
        { front: '駅に行くついでに、手紙を出してきた。', reading: 'えきにいくついでに、てがみをだしてきた。', back: 'On my way to the station, I posted a letter.' },
        { front: '東京に出張したついでに、友達に会った。', reading: 'とうきょうにしゅっちょうしたついでに、ともだちにあった。', back: 'While I was in Tokyo on business, I met up with a friend.' },
        { front: '掃除のついでに、窓も拭いた。', reading: 'そうじのついでに、まどもふいた。', back: 'While I was cleaning, I wiped the windows too.' },
        { front: 'コンビニに行くなら、ついでに飲み物を買ってきて。', reading: 'コンビニにいくなら、ついでにのみものをかってきて。', back: "If you're going to the convenience store, grab me a drink while you're there." },
        { front: '図書館に行ったついでに、隣の公園を散歩した。', reading: 'としょかんにいったついでに、となりのこうえんをさんぽした。', back: 'While I was at the library, I took a walk in the park next door.' },
        { front: 'ごみを出すついでに、郵便受けを見てきた。', reading: 'ごみをだすついでに、ゆうびんうけをみてきた。', back: 'While taking out the trash, I checked the mailbox.' }
      ]
    },
    {
      key: 'n3c.tegoran',
      kind: 'grammar',
      title: '～てごらん・～てくれと言う — try it, and "told me to"',
      body: `Two patterns for urging and requests.

・Verb て-form + ごらん — "try (doing it) and see". A gentle invitation from someone older or senior: a parent to a child, a teacher to a student. It is the plain command of ご覧になる, so never use it towards a superior.
  食べてごらん。美味しいよ。 — "Try it. It's good."
  もう一度言ってごらん。 — "Go on, say it once more."

・Verb て-form + くれと言う / 頼む — reporting a direct, blunt request: "(someone) told me to…". It is the quoted form of the command てくれ.
  兄に、手伝ってくれと言われた。 — "My older brother told me to help him."
  彼は金を貸してくれと頼んできた。 — "He asked me to lend him money."

Compare ように言う (N4 Grammar II): 手伝うように言われた reports the request neutrally. てくれと言われた keeps the bluntness of the original words.`,
      cards: [
        { front: 'この問題、自分で解いてごらん。', reading: 'このもんだい、じぶんでといてごらん。', back: 'Try solving this problem by yourself.' },
        { front: '目を閉じて、よく聞いてごらん。', reading: 'めをとじて、よくきいてごらん。', back: 'Close your eyes and listen carefully.' },
        { front: '怖くないから、触ってごらん。', reading: 'こわくないから、さわってごらん。', back: "It's not scary — go on, touch it." },
        { front: '友達に、宿題を見せてくれと言われた。', reading: 'ともだちに、しゅくだいをみせてくれといわれた。', back: 'My friend told me to show him my homework.' },
        { front: '父は、もっと早く帰ってくれと言った。', reading: 'ちちは、もっとはやくかえってくれといった。', back: 'My father told me to come home earlier.' },
        { front: '彼女に、一人にしてくれと頼まれた。', reading: 'かのじょに、ひとりにしてくれとたのまれた。', back: 'She asked me to leave her alone.' }
      ]
    },
    {
      key: 'n3c.tehajimete',
      kind: 'grammar',
      title: '～てはじめて — only after… (do you realize)',
      body: `Verb て-form + はじめて (初めて) means "not until X did Y happen": X was the trigger, and only then came a realization or a change.
  病気になってはじめて、健康の大切さが分かった。 — "Only after I got sick did I understand how important health is."
  一人暮らしをしてはじめて、親のありがたさを知った。 — "It wasn't until I lived alone that I appreciated my parents."

The main clause is usually a realization (分かる・気づく・知る) or something becoming possible. It does not take a request or a plan.

Compare てから (N5): てから is a plain "after". てはじめて stresses that the second thing could not have happened before the first.`,
      cards: [
        { front: '失って初めて、その大切さに気づいた。', reading: 'うしなってはじめて、そのたいせつさにきづいた。', back: 'Only after losing it did I realize how precious it was.' },
        { front: '日本に来て初めて、四季の美しさを知った。', reading: 'にほんにきてはじめて、しきのうつくしさをしった。', back: 'Only after coming to Japan did I learn how beautiful the four seasons are.' },
        { front: '親になって初めて、親の苦労が分かった。', reading: 'おやになってはじめて、おやのくろうがわかった。', back: "Only after becoming a parent did I understand my parents' hardships." },
        { front: '実際にやってみて初めて、難しさが分かる。', reading: 'じっさいにやってみてはじめて、むずかしさがわかる。', back: "You don't see how hard it is until you actually try it." },
        { front: '言われて初めて、間違いに気づいた。', reading: 'いわれてはじめて、まちがいにきづいた。', back: 'I only noticed the mistake when someone pointed it out.' },
        { front: '海外に住んで初めて、自分の国のことを考えた。', reading: 'かいがいにすんではじめて、じぶんのくにのことをかんがえた。', back: "It wasn't until I lived abroad that I thought about my own country." }
      ]
    },
    {
      key: 'n3c.wishes',
      kind: 'grammar',
      title: '～といいなあ・～ますように・～かなあ — hopes and wonderings',
      body: `Soft ways to voice a hope or a doubt.

・Plain form + といいなあ (といいね・といいんだけど) — "I hope…, it would be nice if…". For things outside your control.
  明日、晴れるといいなあ。 — "I hope it's sunny tomorrow."
  合格するといいね。 — "I hope you pass."
  ばいい / たらいい work the same way: 晴れたらいいなあ.

・ます-form + ように — a wish or prayer: "may…, please let…". Heard at shrines, on New Year cards and in heartfelt wishes.
  試験に合格できますように。 — "Please let me pass the exam."
  皆が幸せでありますように。 — "May everyone be happy."

・Plain form + かなあ (かな) — "I wonder…". Talking to yourself, or a soft question that does not push for an answer.
  彼は来るかなあ。 — "I wonder if he'll come."
  With ない it can become a wish: 早く夏休みにならないかなあ — "I wish summer break would hurry up and come."`,
      cards: [
        { front: '週末は天気がいいといいなあ。', reading: 'しゅうまつはてんきがいいといいなあ。', back: 'I hope the weather is nice this weekend.' },
        { front: '早く元気になるといいね。', reading: 'はやくげんきになるといいね。', back: 'I hope you get well soon.' },
        { front: '家族みんなが健康でいられますように。', reading: 'かぞくみんながけんこうでいられますように。', back: 'May my whole family stay healthy.' },
        { front: '明日の試合に勝てますように。', reading: 'あしたのしあいにかてますように。', back: 'Please let us win tomorrow\'s match.' },
        { front: 'このケーキ、美味しいかなあ。', reading: 'このケーキ、おいしいかなあ。', back: 'I wonder if this cake is any good.' },
        { front: '早く週末にならないかなあ。', reading: 'はやくしゅうまつにならないかなあ。', back: 'I wish the weekend would hurry up and come.' }
      ]
    },
    {
      key: 'n3c.ba-noni',
      kind: 'grammar',
      title: '～ば～のに・～たらよかったのに — if only',
      body: `A conditional followed by のに expresses regret or frustration about something that is not so: "if only…".

Formation: ば-form (or たら) + the result + のに.
  お金があれば、買えるのに。 — "If only I had money, I could buy it."
  もう少し背が高ければいいのに。 — "If only I were a bit taller."

Looking back on the past, ～ばよかったのに / ～たらよかったのに means "you should have…":
  もっと早く言えばよかったのに。 — "You should have said so sooner."
  With yourself as the subject it is regret: 行けばよかった — "I should have gone." (のに is dropped for your own regret more often than not.)

The feeling is stronger than plain ば: のに adds "but it isn't so, and that's a shame / annoying". Compare ～ばよかった (N4 Grammar II), which is the plain regret without the complaint.

In literary style, ものを replaces のに: 言ってくれればよかったものを — "If only you'd told me."`,
      cards: [
        { front: '時間があれば、もっと遊べるのに。', reading: 'じかんがあれば、もっとあそべるのに。', back: 'If only I had time, I could play more.' },
        { front: '日本語がもっと話せたら、いいのに。', reading: 'にほんごがもっとはなせたら、いいのに。', back: 'If only I could speak Japanese better.' },
        { front: '車があれば、すぐに行けるのに。', reading: 'くるまがあれば、すぐにいけるのに。', back: 'If only I had a car, I could get there right away.' },
        { front: '傘を持ってくればよかったのに。', reading: 'かさをもってくればよかったのに。', back: 'You should have brought an umbrella.' },
        { front: '相談してくれたらよかったのに。', reading: 'そうだんしてくれたらよかったのに。', back: "I wish you'd talked it over with me." },
        { front: '毎日が日曜日だったらいいのに。', reading: 'まいにちがにちようびだったらいいのに。', back: 'If only every day were Sunday.' },
        { front: '早く医者に行けば治ったものを。', reading: 'はやくいしゃにいけばなおったものを。', back: "If only you'd seen a doctor sooner, it would have healed." }
      ]
    },
    {
      key: 'n3c.toieba',
      kind: 'grammar',
      title: '～というと・～といえば — speaking of, when you say',
      body: `Both take a topic and bring up what it calls to mind.

・Noun + といえば — "speaking of X, (the thing that comes to mind is) Y". Common when someone mentions a topic and you link to it.
  夏といえば、花火だ。 — "When you think of summer, it's fireworks."
  そういえば — "that reminds me" — is the everyday form: そういえば、明日は休みだね。

・Noun + というと — very close to といえば, also "when it comes to". It can also check what someone meant: "when you say X, do you mean…?"
  京都というと、お寺が有名だ。 — "When it comes to Kyoto, it's famous for its temples."
  田中さんというと、あの背の高い人ですか。 — "When you say Tanaka, do you mean the tall one?"

Compare ～って (casual): 夏って暑いよね just makes summer the topic. といえば goes further: it says what the topic brings to mind.`,
      cards: [
        { front: '日本料理といえば、やっぱり寿司だ。', reading: 'にほんりょうりといえば、やっぱりすしだ。', back: "When you think of Japanese food, it's got to be sushi." },
        { front: '冬といえば、こたつでみかんだね。', reading: 'ふゆといえば、こたつでみかんだね。', back: 'Winter means tangerines under the kotatsu, right?' },
        { front: 'そういえば、彼から連絡がない。', reading: 'そういえば、かれかられんらくがない。', back: "That reminds me — I haven't heard from him." },
        { front: '北海道というと、雪のイメージがある。', reading: 'ほっかいどうというと、ゆきのイメージがある。', back: 'Hokkaido makes me think of snow.' },
        { front: '山田さんというと、眼鏡をかけた人ですか。', reading: 'やまださんというと、めがねをかけたひとですか。', back: 'When you say Yamada, do you mean the person with glasses?' },
        { front: '秋というと、何を思い出しますか。', reading: 'あきというと、なにをおもいだしますか。', back: 'What comes to mind when you think of autumn?' }
      ]
    },
    {
      key: 'n3c.toiuyori',
      kind: 'grammar',
      title: '～というより・～といっても — rather than, even though I say',
      body: `Two ways to adjust a word you just used.

・A というより B — "more B than A". A is not wrong, but B describes it better.
  今日は暖かいというより、暑い。 — "Today is hot rather than warm."
  彼は友達というより、家族だ。 — "He's more family than friend."

・A といっても — "although I say A, (don't imagine too much)". It shrinks the listener's expectations.
  料理ができるといっても、簡単な物だけだ。 — "I say I can cook, but only simple things."
  旅行といっても、近くの温泉に行っただけだ。 — "I call it a trip, but we only went to a nearby hot spring."

Both take plain forms; nouns and な-adjectives attach directly (友達というより、静かといっても; だ may be added before といっても).`,
      cards: [
        { front: 'この部屋は涼しいというより、寒い。', reading: 'このへやはすずしいというより、さむい。', back: 'This room is cold rather than cool.' },
        { front: '彼女は可愛いというより、美しい。', reading: 'かのじょはかわいいというより、うつくしい。', back: "She's more beautiful than cute." },
        { front: 'これは趣味というより、仕事だ。', reading: 'これはしゅみというより、しごとだ。', back: "This is more of a job than a hobby." },
        { front: '英語が話せるといっても、日常会話程度だ。', reading: 'えいごがはなせるといっても、にちじょうかいわていどだ。', back: 'I say I speak English, but only at the everyday-conversation level.' },
        { front: '休みといっても、一日だけだ。', reading: 'やすみといっても、いちにちだけだ。', back: "I call it a break, but it's only one day." },
        { front: '庭があるといっても、とても狭い。', reading: 'にわがあるといっても、とてもせまい。', back: "I say there's a garden, but it's tiny." }
      ]
    },
    {
      key: 'n3c.donnani-kotoka',
      kind: 'grammar',
      title: 'どんなに～ことか — how very…!',
      body: `どんなに (or どれほど / どれだけ) + plain form + ことか is an exclamation of degree: "how very…!", "you have no idea how much…". It is not a question, even though it looks like one.
  あなたに会えて、どんなに嬉しいことか。 — "You have no idea how happy I am to see you."
  合格の知らせを、どれほど待ったことか。 — "How long I waited for news that I'd passed!"

Formation: な-adjectives take な (どんなに心配なことか); verbs often appear in the past (どれだけ泣いたことか).

The tone is emotional and slightly literary; in speech the こと is often dropped: どんなに嬉しいか。 Compare どんなに～ても (N3 Grammar), which means "no matter how much".`,
      cards: [
        { front: '連絡がなくて、どんなに心配したことか。', reading: 'れんらくがなくて、どんなにしんぱいしたことか。', back: "You didn't get in touch — you have no idea how worried I was." },
        { front: 'この日をどれほど待ったことか。', reading: 'このひをどれほどまったことか。', back: 'How long I have waited for this day!' },
        { front: '母の手紙を読んで、どれだけ泣いたことか。', reading: 'ははのてがみをよんで、どれだけないたことか。', back: "How much I cried reading my mother's letter!" },
        { front: '一人で暮らすのは、どんなに寂しいことか。', reading: 'ひとりでくらすのは、どんなにさびしいことか。', back: 'How lonely it is to live alone!' },
        { front: '君がいてくれて、どんなに助かったことか。', reading: 'きみがいてくれて、どんなにたすかったことか。', back: 'You have no idea how much having you here helped.' },
        { front: '平和な毎日が、どれほど幸せなことか。', reading: 'へいわなまいにちが、どれほどしあわせなことか。', back: 'How fortunate it is to have peaceful days!' }
      ]
    },
    {
      key: 'n3c.nanka',
      kind: 'grammar',
      title: '～なんか・～なんて — things like (playing it down)',
      body: `なんか and なんて are casual particles that play down whatever they follow, or show surprise or contempt for it.

・Noun + なんか — "something like, things like". Either a soft example or a put-down.
  飲み物はお茶なんかどう？ — "How about something like tea to drink?" (soft example)
  宿題なんか、やりたくない。 — "Homework? I don't want to do it." (dismissive)
  私なんか — "someone like me" (modest or self-deprecating)

・Noun / plain form + なんて — the same scorn or surprise, often about a whole statement.
  彼が結婚するなんて、信じられない。 — "Him, getting married? I can't believe it."
  勉強なんてつまらない。 — "Studying is boring."

なんか is also a filler meaning "kind of, like": なんか変だね — "It's kind of weird, huh." The polite version of the example sense is など.`,
      cards: [
        { front: 'お土産に、お菓子なんかどうですか。', reading: 'おみやげに、おかしなんかどうですか。', back: 'How about something like sweets as a souvenir?' },
        { front: 'お前なんか、もう友達じゃない。', reading: 'おまえなんか、もうともだちじゃない。', back: "I'm not friends with the likes of you anymore!" },
        { front: '私なんか、まだまだです。', reading: 'わたしなんか、まだまだです。', back: "Someone like me still has a long way to go." },
        { front: '幽霊なんているわけがない。', reading: 'ゆうれいなんているわけがない。', back: "There's no such thing as ghosts." },
        { front: '一人で海外に行くなんて、すごいね。', reading: 'ひとりでかいがいにいくなんて、すごいね。', back: "Going abroad on your own? That's amazing." },
        { front: 'なんか、今日は疲れたな。', reading: 'なんか、きょうはつかれたな。', back: "I'm kind of tired today." }
      ]
    },
    {
      key: 'n3c.nishitemo',
      kind: 'grammar',
      title: '～にしても・～にしろ — even if, whichever',
      body: `にしても is a concession: "even if / even granting X". It admits something and then says it does not change the point.

Formation: noun / plain form + にしても.
  冗談にしても、言い過ぎだ。 — "Even as a joke, that's going too far."
  忙しいにしても、電話くらいできるだろう。 — "Even if you're busy, you could at least call."

Doubled, it covers every option: A にしても B にしても — "whether A or B".
  行くにしても行かないにしても、早く決めて。 — "Whether you go or not, decide soon."

にしろ / にせよ mean the same and sound firmer; にせよ is more written.
  いずれにしろ、もう遅い。 — "Either way, it's too late now."

Compare ても: 雨が降っても行く is a simple concession. にしても often admits something the listener said or that is understood, then pushes back.`,
      cards: [
        { front: '遅れるにしても、連絡はするべきだ。', reading: 'おくれるにしても、れんらくはするべきだ。', back: 'Even if you are going to be late, you should get in touch.' },
        { front: '安いにしても、この品質はひどい。', reading: 'やすいにしても、このひんしつはひどい。', back: "Even if it's cheap, this quality is terrible." },
        { front: '子供のいたずらにしても、ひどすぎる。', reading: 'こどものいたずらにしても、ひどすぎる。', back: "Even for a child's prank, that's too much." },
        { front: '賛成するにしても反対するにしても、理由を言ってください。', reading: 'さんせいするにしてもはんたいするにしても、りゆうをいってください。', back: 'Whether you agree or disagree, please give your reasons.' },
        { front: 'いずれにしろ、明日までに返事をください。', reading: 'いずれにしろ、あしたまでにへんじをください。', back: 'Either way, please give me an answer by tomorrow.' },
        { front: '何を食べるにせよ、野菜も食べなさい。', reading: 'なにをたべるにせよ、やさいもたべなさい。', back: 'Whatever you eat, eat some vegetables too.' }
      ]
    },
    {
      key: 'n3c.maru-de',
      kind: 'grammar',
      title: 'まるで～ようだ・みたいだ — just like (similes)',
      body: `まるで ("just, exactly") placed before ようだ / みたいだ turns them into a simile: something is like something it is not.
  彼女の手はまるで氷のように冷たい。 — "Her hands are as cold as ice."
  まるで夢を見ているみたいだ。 — "It's just like being in a dream."

Formation: noun + の + ようだ / noun + みたいだ; verbs and adjectives in plain form.
・ようだ / ような / ように — neutral, also written.
・みたいだ / みたいな / みたいに — casual speech.

Without まるで, ようだ can mean "it seems" (N4: 雨が降っているようだ — "It seems to be raining"). まるで tells you it is a comparison, not a guess.

Compare ～らしい: 子供らしい means "typical of a child, as a child should be"; まるで子供のようだ means "just like a child" (said of someone who is not one).`,
      cards: [
        { front: 'まるで夢のような一日だった。', reading: 'まるでゆめのようないちにちだった。', back: 'It was a day just like a dream.' },
        { front: '彼はまるで子供のように泣いた。', reading: 'かれはまるでこどものようにないた。', back: 'He cried just like a child.' },
        { front: 'この絵はまるで写真みたいだ。', reading: 'このえはまるでしゃしんみたいだ。', back: 'This painting looks just like a photograph.' },
        { front: '外はまるで冬のように寒い。', reading: 'そとはまるでふゆのようにさむい。', back: "It's as cold as winter outside." },
        { front: 'まるで何もなかったように、二人は話している。', reading: 'まるでなにもなかったように、ふたりははなしている。', back: 'The two are chatting as if nothing had happened.' },
        { front: '彼女の歌声はまるで天使みたいだ。', reading: 'かのじょのうたごえはまるでてんしみたいだ。', back: 'Her singing voice is just like an angel\'s.' }
      ]
    },
    {
      key: 'n3c.you-to-suru',
      kind: 'grammar',
      title: '～ようとする・～ようとしない — try to, be about to, refuse to',
      body: `Volitional form + とする has two meanings, told apart by context.

1. "Try to, attempt to" — often an attempt that fails or is interrupted.
  ドアを開けようとしたが、鍵がかかっていた。 — "I tried to open the door, but it was locked."
2. "Be about to, be just on the point of".
  家を出ようとした時、電話が鳴った。 — "Just as I was about to leave the house, the phone rang."

The negative ～ようとしない means "won't even try, refuses to" and describes someone else's stubbornness, not your own:
  息子は野菜を食べようとしない。 — "My son refuses to eat vegetables."

Compare ～てみる (N4): てみる means "try it and see what happens" — the action is done. ようとする is the effort or the moment before; the action may never happen.`,
      cards: [
        { front: '起きようとしたが、体が動かなかった。', reading: 'おきようとしたが、からだがうごかなかった。', back: "I tried to get up, but my body wouldn't move." },
        { front: '寝ようとした時、地震が起きた。', reading: 'ねようとしたとき、じしんがおきた。', back: 'Just as I was about to go to sleep, there was an earthquake.' },
        { front: '電車に乗ろうとしたら、ドアが閉まった。', reading: 'でんしゃにのろうとしたら、ドアがしまった。', back: 'Just as I tried to board the train, the doors closed.' },
        { front: '彼は何度聞いても、理由を言おうとしない。', reading: 'かれはなんどきいても、りゆうをいおうとしない。', back: 'No matter how often I ask, he refuses to say why.' },
        { front: '猫は薬を飲もうとしない。', reading: 'ねこはくすりをのもうとしない。', back: "The cat won't take its medicine." },
        { front: '思い出そうとしても、名前が出てこない。', reading: 'おもいだそうとしても、なまえがでてこない。', back: "Even when I try to remember, the name won't come." }
      ]
    },
    {
      key: 'n3c.te-miseru',
      kind: 'grammar',
      title: '～てみせる — show how, I\'ll show you',
      body: `Verb て-form + みせる ("show") has two uses.

1. Doing something so that someone can see how it is done: "demonstrate, show by doing".
  先生が黒板に書いてみせた。 — "The teacher wrote it on the board to show us."
2. A determined declaration: "I'll definitely do it — just watch". The speaker is confident and a little defiant.
  次の試合では、絶対に勝ってみせる。 — "In the next match, I'll win — you'll see."

It can also mean putting on an outward show: 平気な顔をしてみせた — "I put on a brave face."

Compare てみる (N4): てみる is "try it and see what happens". てみせる in its second use is not a trial at all: the speaker announces a success they intend to make happen.`,
      cards: [
        { front: '今度こそ、合格してみせる。', reading: 'こんどこそ、ごうかくしてみせる。', back: "This time, I'll pass — just watch." },
        { front: 'いつか必ず、夢を叶えてみせる。', reading: 'いつかかならず、ゆめをかなえてみせる。', back: "One day I'll make my dream come true, you'll see." },
        { front: '必ず犯人を見つけてみせる。', reading: 'かならずはんにんをみつけてみせる。', back: "I'll find the culprit, I swear." },
        { front: '母は料理を作ってみせてくれた。', reading: 'はははりょうりをつくってみせてくれた。', back: 'My mother showed me how to cook by making the dish.' },
        { front: '店員が実際に使ってみせてくれた。', reading: 'てんいんがじっさいにつかってみせてくれた。', back: 'The shop assistant showed me by actually using it.' },
        { front: '彼は心配させまいと、笑ってみせた。', reading: 'かれはしんぱいさせまいと、わらってみせた。', back: 'He put on a smile so as not to worry anyone.' }
      ]
    }
  ]
}
