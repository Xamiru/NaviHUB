import type { SeedLesson } from '../japaneseSeed'

// N5 grammar the original JLPT N5 Foundations course skipped (2026-10-16): the
// subject particle が, wants, invitations, ている, permission, the plain
// negative, reasons and the rest of the N5 core. Spliced into N5_COURSE at the
// point each one is needed. Keys are frozen (japaneseSeedKeys.lock.json).

export const N5_KOSOADO: SeedLesson = {
  key: 'n5.kosoado',
  kind: 'grammar',
  title: 'こそあど: this, that, that over there, which',
  body: `Japanese points with four families of words, all built from the same four prefixes:

・こ — near me (the speaker)
・そ — near you (the listener)
・あ — away from both of us
・ど — which? (the question form)

Things on their own: これ・それ・あれ・どれ
これは何ですか。 — "What is this?"

Before a noun (never alone): この・その・あの・どの
この本は高いです。 — "This book is expensive."

Places: ここ・そこ・あそこ・どこ
トイレはどこですか。 — "Where is the toilet?"

The difference between これ and この trips everyone up at first: これ stands in for the thing, この needs a noun after it. これは本です and この本は… are both right; この is never followed directly by は.`,
  cards: [
    { front: 'これは私の傘です。', reading: 'これはわたしのかさです。', back: 'This is my umbrella.' },
    { front: 'それは何ですか。', reading: 'それはなんですか。', back: 'What is that (near you)?' },
    { front: 'あの人は先生です。', reading: 'あのひとはせんせいです。', back: 'That person over there is a teacher.' },
    { front: 'この店は安いです。', reading: 'このみせはやすいです。', back: 'This shop is cheap.' },
    { front: '駅はあそこです。', reading: 'えきはあそこです。', back: 'The station is over there.' },
    { front: 'どの電車に乗りますか。', reading: 'どのでんしゃにのりますか。', back: 'Which train will you take?' }
  ]
}

export const N5_GA: SeedLesson = {
  key: 'n5.ga',
  kind: 'grammar',
  title: 'が: the subject, and は vs が',
  body: `が marks the SUBJECT — the one who does the action or has the quality. は marks the TOPIC — what the sentence is about. Often they point at the same thing, and the choice changes the emphasis:

・田中さんは来ました。 — "As for Tanaka, (he) came." (talking about Tanaka)
・田中さんが来ました。 — "TANAKA came." (answering "who came?")

Four places where が is the natural choice:

1. After a question word — question words are never topics:
誰が来ましたか。 — "Who came?"　何がいいですか。 — "What would be good?"

2. Answering such a question — the new information takes が:
田中さんが来ました。 — "Tanaka came."

3. With 好き・嫌い・上手・下手・分かる・できる・ある・いる, the thing liked, understood or existing takes が:
私は猫が好きです。 — "I like cats."
日本語が分かります。 — "I understand Japanese."

4. Describing something you have just noticed:
あ、雨が降っています。 — "Oh, it's raining."

は adds contrast when two things are compared: 肉は食べますが、魚は食べません。 — "Meat I eat, but fish I don't."`,
  cards: [
    { front: '誰が来ましたか。', reading: 'だれがきましたか。', back: 'Who came?' },
    { front: '田中さんが来ました。', reading: 'たなかさんがきました。', back: 'Tanaka came. (answering who)' },
    { front: '私は猫が好きです。', reading: 'わたしはねこがすきです。', back: 'I like cats.' },
    { front: '妹は英語が分かります。', reading: 'いもうとはえいごがわかります。', back: 'My younger sister understands English.' },
    { front: 'あ、雨が降っています。', reading: 'あ、あめがふっています。', back: "Oh, it's raining." },
    { front: '肉は食べますが、魚は食べません。', reading: 'にくはたべますが、さかなはたべません。', back: "Meat I eat, but fish I don't." }
  ]
}

export const N5_MASHOU: SeedLesson = {
  key: 'n5.mashou',
  kind: 'grammar',
  title: "Let's: ～ましょう・～ましょうか・～ませんか",
  body: `Swap the ます ending to invite or offer:

・～ましょう — "let's…" (a suggestion the speaker is keen on)
一緒に帰りましょう。 — "Let's go home together."

・～ましょうか — "shall we…?" / "shall I…?" (an offer)
窓を開けましょうか。 — "Shall I open the window?"

・～ませんか — "won't you…?" (the politest invitation, leaving room to say no)
映画を見に行きませんか。 — "Would you like to go and see a movie?"

Accepting: いいですね。行きましょう。 — "Sounds good. Let's go."
Declining softly: すみません、今日はちょっと…。 — "Sorry, today is a bit…" (the sentence is left hanging on purpose)

The casual versions come later: 行こう ("let's go") is the volitional form.`,
  cards: [
    { front: '一緒に帰りましょう。', reading: 'いっしょにかえりましょう。', back: "Let's go home together." },
    { front: 'ちょっと休みましょう。', reading: 'ちょっとやすみましょう。', back: "Let's take a short break." },
    { front: '窓を開けましょうか。', reading: 'まどをあけましょうか。', back: 'Shall I open the window?' },
    { front: '映画を見に行きませんか。', reading: 'えいがをみにいきませんか。', back: 'Would you like to go and see a movie?' },
    { front: 'いいですね。行きましょう。', reading: 'いいですね。いきましょう。', back: "Sounds good. Let's go." },
    { front: 'すみません、今日はちょっと…。', reading: 'すみません、きょうはちょっと…。', back: 'Sorry, today is a bit… (a soft no)' }
  ]
}

export const N5_TAI: SeedLesson = {
  key: 'n5.tai',
  kind: 'grammar',
  title: 'Wants: ～たい and ほしい',
  body: `Wanting to DO something: ます-stem + たい. The result is an い-adjective, so it conjugates like one:

・食べます → 食べたい — "want to eat"
・食べたくない — "don't want to eat"
・食べたかった — "wanted to eat"
Add です to be polite: 日本に行きたいです。 — "I want to go to Japan."

The thing you want to do may take を or が: 水が飲みたい / 水を飲みたい — both are fine.

Wanting a THING: ほしい, also an い-adjective, with the thing marked by が:
新しいパソコンがほしいです。 — "I want a new computer."

Both are about the speaker's own wishes (or a question to the listener). Saying what someone else wants needs different grammar (～たがっている), so 彼は行きたいです sounds odd; use 彼は行きたがっています later on.`,
  cards: [
    { front: '日本に行きたいです。', reading: 'にほんにいきたいです。', back: 'I want to go to Japan.' },
    { front: '今日は何も食べたくない。', reading: 'きょうはなにもたべたくない。', back: "I don't want to eat anything today." },
    { front: '子供の時、先生になりたかったです。', reading: 'こどものとき、せんせいになりたかったです。', back: 'When I was a child, I wanted to be a teacher.' },
    { front: '冷たい水が飲みたい。', reading: 'つめたいみずがのみたい。', back: 'I want to drink some cold water.' },
    { front: '新しいパソコンがほしいです。', reading: 'あたらしいパソコンがほしいです。', back: 'I want a new computer.' },
    { front: '誕生日に何がほしいですか。', reading: 'たんじょうびになにがほしいですか。', back: 'What do you want for your birthday?' }
  ]
}

export const N5_NI_IKU: SeedLesson = {
  key: 'n5.ni-iku',
  kind: 'grammar',
  title: 'Going somewhere to do something: ～に行く・～に来る',
  body: `ます-stem + に + a verb of motion (行く・来る・帰る) gives the purpose of the trip:

・買います → 買いに行く — "go to buy"
・食べます → 食べに来る — "come to eat"

The place takes に or へ as usual, and the purpose sits right before the motion verb:
デパートへ靴を買いに行きます。 — "I'm going to the department store to buy shoes."

With a する-noun, the noun itself can carry the purpose: 勉強に行く ("go to study"), 散歩に行く ("go for a walk"), 旅行に行く ("go on a trip").`,
  cards: [
    { front: 'デパートへ靴を買いに行きます。', reading: 'デパートへくつをかいにいきます。', back: "I'm going to the department store to buy shoes." },
    { front: '友達が遊びに来ました。', reading: 'ともだちがあそびにきました。', back: 'A friend came over to hang out.' },
    { front: '昼ご飯を食べに帰ります。', reading: 'ひるごはんをたべにかえります。', back: "I'm going home to have lunch." },
    { front: '図書館に本を借りに行った。', reading: 'としょかんにほんをかりにいった。', back: 'I went to the library to borrow a book.' },
    { front: '毎朝、公園に散歩に行きます。', reading: 'まいあさ、こうえんにさんぽにいきます。', back: 'I go for a walk in the park every morning.' },
    { front: '夏休みに沖縄へ旅行に行きたい。', reading: 'なつやすみにおきなわへりょこうにいきたい。', back: 'I want to go on a trip to Okinawa in the summer holidays.' }
  ]
}

export const N5_NARU: SeedLesson = {
  key: 'n5.naru',
  kind: 'grammar',
  title: 'Becoming: ～くなる・～になる',
  body: `なる means "to become". What something becomes attaches differently by word type:

・い-adjective: drop い, add く → 寒い → 寒くなる — "get cold"
・な-adjective: + に → 元気 → 元気になる — "get well"
・noun: + に → 医者 → 医者になる — "become a doctor"

なる is a group 1 verb: なります, なりました, なって.

Common with time and change words: だんだん ("gradually"), もう ("already"):
だんだん暗くなりました。 — "It gradually got dark."
もう春になりました。 — "It's already spring."

The same shapes work with する for making something so on purpose: 部屋をきれいにする — "make the room tidy".`,
  cards: [
    { front: '冬は寒くなります。', reading: 'ふゆはさむくなります。', back: 'It gets cold in winter.' },
    { front: 'だんだん暗くなりました。', reading: 'だんだんくらくなりました。', back: 'It gradually got dark.' },
    { front: '薬を飲んで、元気になった。', reading: 'くすりをのんで、げんきになった。', back: 'I took some medicine and got better.' },
    { front: '兄は医者になりました。', reading: 'あにはいしゃになりました。', back: 'My older brother became a doctor.' },
    { front: 'もう十時になりました。', reading: 'もうじゅうじになりました。', back: "It's already ten o'clock." },
    { front: '部屋をきれいにしてください。', reading: 'へやをきれいにしてください。', back: 'Please tidy up the room.' }
  ]
}

export const N5_ADVERB: SeedLesson = {
  key: 'n5.adverb',
  kind: 'grammar',
  title: 'Adverbs from adjectives: ～く・～に',
  body: `To describe HOW something is done, turn an adjective into an adverb:

・い-adjective: い → く — 早い → 早く起きる "get up early"
・な-adjective: + に — 静か → 静かに話す "speak quietly"

They sit before the verb:
字をきれいに書いてください。 — "Please write the characters neatly."

いい becomes よく: よく分かりました ("I understood well"). よく also means "often": よく映画を見ます ("I often watch movies") — context decides.`,
  cards: [
    { front: '明日は早く起きます。', reading: 'あしたははやくおきます。', back: "I'll get up early tomorrow." },
    { front: '図書館では静かに話してください。', reading: 'としょかんではしずかにはなしてください。', back: 'Please speak quietly in the library.' },
    { front: '字をきれいに書いてください。', reading: 'じをきれいにかいてください。', back: 'Please write the characters neatly.' },
    { front: 'もっと大きく書いて。', reading: 'もっとおおきくかいて。', back: 'Write it bigger.' },
    { front: 'よく分かりました。', reading: 'よくわかりました。', back: 'I understood well.' },
    { front: '弟はよく映画を見ます。', reading: 'おとうとはよくえいがをみます。', back: 'My younger brother often watches movies.' }
  ]
}

export const N5_TEIRU: SeedLesson = {
  key: 'n5.teiru',
  kind: 'grammar',
  title: '～ている: happening now, and a lasting state',
  body: `て-form + いる does two jobs, and the verb decides which:

1. An action in progress (verbs that take time: eat, read, rain, wait):
今、本を読んでいます。 — "I'm reading a book now."

2. A state that lasts after a change (verbs of change: marry, open, wear, go out):
結婚しています。 — "I'm married." (not "I'm getting married")
窓が開いています。 — "The window is open."

Three verbs that describe a state and are almost always used with ている:
・知っています — "I know" (its negative is 知りません, not 知っていません)
・住んでいます — "I live (somewhere)"
・持っています — "I have / own"

It also describes habits: 毎朝走っています — "I run every morning".

In speech the い often drops: 読んでる, 知ってる (the casual てる form).`,
  cards: [
    { front: '今、本を読んでいます。', reading: 'いま、ほんをよんでいます。', back: "I'm reading a book now." },
    { front: '外で雨が降っています。', reading: 'そとであめがふっています。', back: "It's raining outside." },
    { front: '姉は結婚しています。', reading: 'あねはけっこんしています。', back: 'My older sister is married.' },
    { front: '窓が開いています。', reading: 'まどがあいています。', back: 'The window is open.' },
    { front: '私は東京に住んでいます。', reading: 'わたしはとうきょうにすんでいます。', back: 'I live in Tokyo.' },
    { front: 'あの人の名前を知っていますか。', reading: 'あのひとのなまえをしっていますか。', back: "Do you know that person's name?" }
  ]
}

export const N5_TEMOII: SeedLesson = {
  key: 'n5.temoii',
  kind: 'grammar',
  title: 'May and must not: ～てもいい・～てはいけない',
  body: `Permission: て-form + もいい(です) — "it's all right to…, you may…"
写真を撮ってもいいですか。 — "May I take a photo?"
Answer yes: はい、いいですよ。 / はい、どうぞ。

Prohibition: て-form + はいけない(いけません) — "you must not…"
ここでたばこを吸ってはいけません。 — "You must not smoke here."

Answering a request for permission with no: すみません、ちょっと…。 is the gentle way; いけません is for rules, not for refusing a friend.

In speech: ～てもいい → ～ていい, and ～てはいけない → ～ちゃいけない / ～ちゃだめ (the casual forms in manga).`,
  cards: [
    { front: '写真を撮ってもいいですか。', reading: 'しゃしんをとってもいいですか。', back: 'May I take a photo?' },
    { front: 'はい、どうぞ。', reading: 'はい、どうぞ。', back: 'Yes, go ahead.' },
    { front: 'この部屋を使ってもいいですよ。', reading: 'このへやをつかってもいいですよ。', back: 'You can use this room.' },
    { front: 'ここでたばこを吸ってはいけません。', reading: 'ここでたばこをすってはいけません。', back: 'You must not smoke here.' },
    { front: '授業中に寝てはいけない。', reading: 'じゅぎょうちゅうにねてはいけない。', back: 'You must not sleep during class.' },
    { front: '先に帰ってもいい？', reading: 'さきにかえってもいい？', back: 'Is it OK if I go home first? (casual)' }
  ]
}

export const N5_MAE: SeedLesson = {
  key: 'n5.mae',
  kind: 'grammar',
  title: 'Order of events: ～前に・～後で・～てから',
  body: `Three ways to say what happens first:

・dictionary form + 前に — "before doing" (the verb is always dictionary form, even in the past)
寝る前に歯を磨きます。 — "I brush my teeth before I go to bed."
With nouns: 食事の前に — "before the meal"

・た-form + 後で — "after doing"
宿題をした後で、ゲームをする。 — "After doing my homework, I'll play games."
With nouns: 授業の後で — "after class"

・て-form + から — "after doing (and only then)"; stresses the order:
手を洗ってから、食べてください。 — "Please eat after you've washed your hands."

前に and 後で can also stand alone as "before" and "later": 後で電話します — "I'll call you later".`,
  cards: [
    { front: '寝る前に歯を磨きます。', reading: 'ねるまえにはをみがきます。', back: 'I brush my teeth before I go to bed.' },
    { front: '食事の前に手を洗いましょう。', reading: 'しょくじのまえにてをあらいましょう。', back: "Let's wash our hands before the meal." },
    { front: '宿題をした後で、ゲームをする。', reading: 'しゅくだいをしたあとで、ゲームをする。', back: "After doing my homework, I'll play games." },
    { front: '授業の後で、図書館に行きます。', reading: 'じゅぎょうのあとで、としょかんにいきます。', back: "I'll go to the library after class." },
    { front: '手を洗ってから、食べてください。', reading: 'てをあらってから、たべてください。', back: 'Please eat after washing your hands.' },
    { front: '後で電話します。', reading: 'あとででんわします。', back: "I'll call you later." }
  ]
}

export const N5_NAI: SeedLesson = {
  key: 'n5.nai',
  kind: 'grammar',
  title: 'The plain negative: ～ない and ～なかった',
  body: `ません has a plain (casual) counterpart: the ない-form. It is the base for many later patterns, so learn the formation carefully:

Group 1 (u-verbs): final -u → -a + ない
・書く → 書かない　・飲む → 飲まない　・話す → 話さない
・う becomes わ, not あ: 買う → 買わない
・ある has no ない-form: its negative is just ない (お金がない)

Group 2 (ru-verbs): drop る + ない
・食べる → 食べない　・見る → 見ない

Group 3: する → しない、来る → 来ない（こない）

Past negative: ない → なかった (it conjugates like an い-adjective)
・食べなかった — "didn't eat"

The four plain forms side by side:
・食べる (do)　・食べない (don't)　・食べた (did)　・食べなかった (didn't)`,
  cards: [
    { front: '今日は学校に行かない。', reading: 'きょうはがっこうにいかない。', back: "I'm not going to school today." },
    { front: '私はお酒を飲まない。', reading: 'わたしはおさけをのまない。', back: "I don't drink alcohol." },
    { front: 'お金がない。', reading: 'おかねがない。', back: "I don't have any money." },
    { front: '彼は昨日来なかった。', reading: 'かれはきのうこなかった。', back: "He didn't come yesterday." },
    { front: '朝ご飯を食べなかった。', reading: 'あさごはんをたべなかった。', back: "I didn't eat breakfast." },
    { front: '何も買わなかった。', reading: 'なにもかわなかった。', back: "I didn't buy anything." }
  ]
}

export const N5_KARA: SeedLesson = {
  key: 'n5.kara',
  kind: 'grammar',
  title: 'Because: ～から',
  body: `から after a clause gives the reason; the result follows:

[reason] から、[result]。
雨が降っているから、出かけません。 — "It's raining, so I won't go out."

から attaches to polite or plain forms (match the politeness of the whole sentence):
・高いですから、買いません。 (polite)
・高いから、買わない。 (casual)
With nouns and な-adjectives, use だ in casual speech: 休みだから — "because it's a holiday".

Answering "why?" (どうして / なぜ) with the reason alone: どうして来なかったの？ — 忙しかったから。 ("Because I was busy.")

Don't confuse it with the から that means "from" (駅から "from the station") — that one follows a noun directly.`,
  cards: [
    { front: '雨が降っているから、出かけません。', reading: 'あめがふっているから、でかけません。', back: "It's raining, so I won't go out." },
    { front: '高いから、買わない。', reading: 'たかいから、かわない。', back: "It's expensive, so I won't buy it." },
    { front: '休みだから、ゆっくり寝たい。', reading: 'やすみだから、ゆっくりねたい。', back: "It's a day off, so I want to sleep in." },
    { front: 'どうして来なかったの？', reading: 'どうしてこなかったの？', back: "Why didn't you come?" },
    { front: '忙しかったから。', reading: 'いそがしかったから。', back: 'Because I was busy.' },
    { front: '危ないですから、触らないでください。', reading: 'あぶないですから、さわらないでください。', back: "It's dangerous, so please don't touch it." }
  ]
}

export const N5_KEDO: SeedLesson = {
  key: 'n5.kedo',
  kind: 'grammar',
  title: 'But: ～が・～けど',
  body: `Two ways to say "but" between clauses:

・が — neutral to polite, common in writing and with です/ます:
日本語は難しいですが、楽しいです。 — "Japanese is hard, but it's fun."

・けど — conversational (けれど, けれども are softer and more formal versions):
行きたいけど、時間がない。 — "I want to go, but I don't have time."

Both also soften a lead-in where English would just pause:
すみませんが、駅はどこですか。 — "Excuse me, (but) where is the station?"

And both can trail off, leaving the rest unsaid — a polite way to hint:
明日はちょっと忙しいんですけど…。 — "Tomorrow I'm a bit busy, but…"

This が is a conjunction after a full clause; the subject が comes after a noun. 高いですが、 vs 雨が — the word before it tells you which.`,
  cards: [
    { front: '日本語は難しいですが、楽しいです。', reading: 'にほんごはむずかしいですが、たのしいです。', back: "Japanese is hard, but it's fun." },
    { front: '行きたいけど、時間がない。', reading: 'いきたいけど、じかんがない。', back: "I want to go, but I don't have time." },
    { front: 'この店は安いけど、おいしくない。', reading: 'このみせはやすいけど、おいしくない。', back: "This place is cheap, but it isn't good." },
    { front: 'すみませんが、駅はどこですか。', reading: 'すみませんが、えきはどこですか。', back: 'Excuse me, where is the station?' },
    { front: '明日はちょっと忙しいんですけど…。', reading: 'あしたはちょっといそがしいんですけど…。', back: "Tomorrow I'm a bit busy, but… (a hint)" },
    { front: '昨日は晴れましたが、今日は雨です。', reading: 'きのうははれましたが、きょうはあめです。', back: "It was sunny yesterday, but today it's raining." }
  ]
}

export const N5_TOKI: SeedLesson = {
  key: 'n5.toki',
  kind: 'grammar',
  title: 'When: ～とき',
  body: `とき ("time") turns a clause into "when…". It attaches like a noun:

・verb (plain form) + とき: 寝るとき — "when (I) go to bed"
・い-adjective + とき: 寒いとき — "when it's cold"
・な-adjective + な + とき: 暇なとき — "when (I'm) free"
・noun + の + とき: 子供のとき — "when (I was) a child"

For action verbs, the tense before とき says whether that action had finished when the main one happened — not when it happened in time:
・日本に行くとき、カメラを買いました。 — "I bought a camera before going to Japan." (the trip had not happened yet)
・日本に行ったとき、カメラを買いました。 — "I bought a camera when I went to Japan." (bought there, after arriving)

State verbs such as ある and いる simply describe the situation: 時間があるとき — "when I have time".`,
  cards: [
    { front: '子供のとき、よく川で遊びました。', reading: 'こどものとき、よくかわであそびました。', back: 'When I was a child, I often played in the river.' },
    { front: '暇なとき、何をしますか。', reading: 'ひまなとき、なにをしますか。', back: 'What do you do when you are free?' },
    { front: '寒いとき、温かいお茶を飲みます。', reading: 'さむいとき、あたたかいおちゃをのみます。', back: "When it's cold, I drink hot tea." },
    { front: '寝るとき、電気を消してください。', reading: 'ねるとき、でんきをけしてください。', back: 'Please turn off the light when you go to bed.' },
    { front: '日本に行くとき、カメラを買いました。', reading: 'にほんにいくとき、カメラをかいました。', back: 'I bought a camera before going to Japan.' },
    { front: '日本に行ったとき、カメラを買いました。', reading: 'にほんにいったとき、カメラをかいました。', back: 'I bought a camera while I was in Japan.' }
  ]
}

export const N5_MOU: SeedLesson = {
  key: 'n5.mou',
  kind: 'grammar',
  title: 'Already and still: もう・まだ',
  body: `もう and まだ track whether something has happened yet:

・もう + affirmative past — "already": もう食べました。 "I've already eaten."
・まだ + negative — "not yet": まだ食べていません。 "I haven't eaten yet."

Note "not yet" uses ～ていません, not ～ませんでした: the state of not having done it continues.

Asked もう食べましたか？ ("Have you eaten yet?"), the answers are:
・はい、もう食べました。
・いいえ、まだです。 (short and natural)

Two more uses:
・もう + negative — "no longer": もう痛くない。 "It doesn't hurt anymore."
・まだ + affirmative — "still": まだ雨が降っている。 "It's still raining."`,
  cards: [
    { front: 'もう宿題をしました。', reading: 'もうしゅくだいをしました。', back: "I've already done my homework." },
    { front: 'まだ昼ご飯を食べていません。', reading: 'まだひるごはんをたべていません。', back: "I haven't had lunch yet." },
    { front: 'もう寝ましたか。', reading: 'もうねましたか。', back: 'Have you gone to bed already?' },
    { front: 'いいえ、まだです。', reading: 'いいえ、まだです。', back: 'No, not yet.' },
    { front: '薬を飲んだから、もう痛くない。', reading: 'くすりをのんだから、もういたくない。', back: "I took medicine, so it doesn't hurt anymore." },
    { front: 'まだ雨が降っている。', reading: 'まだあめがふっている。', back: "It's still raining." }
  ]
}

export const N5_DESHOU: SeedLesson = {
  key: 'n5.deshou',
  kind: 'grammar',
  title: 'Probably: ～でしょう・～だろう',
  body: `でしょう after a plain form (or a noun / な-adjective without だ) means "probably, I suppose":

明日は雨でしょう。 — "It will probably rain tomorrow." (the weather forecast phrase)
彼はもう家に帰ったでしょう。 — "He has probably gone home already."

だろう is the plain version, used in casual speech (often by men) and in writing:
たぶん大丈夫だろう。 — "It'll probably be fine."

たぶん ("probably") often comes first to signal the guess early.

With a rising intonation, でしょう? checks agreement — "right?":
このケーキ、おいしいでしょう？ — "This cake is good, isn't it?"
(In casual speech this shortens to でしょ？ or だろ？.)`,
  cards: [
    { front: '明日は雨でしょう。', reading: 'あしたはあめでしょう。', back: 'It will probably rain tomorrow.' },
    { front: '彼はもう家に帰ったでしょう。', reading: 'かれはもういえにかえったでしょう。', back: 'He has probably gone home already.' },
    { front: 'この問題は難しいでしょう。', reading: 'このもんだいはむずかしいでしょう。', back: 'This problem is probably difficult.' },
    { front: 'たぶん大丈夫だろう。', reading: 'たぶんだいじょうぶだろう。', back: "It'll probably be fine." },
    { front: '週末は人が多いだろう。', reading: 'しゅうまつはひとがおおいだろう。', back: 'There will probably be a lot of people at the weekend.' },
    { front: 'このケーキ、おいしいでしょう？', reading: 'このケーキ、おいしいでしょう？', back: "This cake is good, isn't it?" }
  ]
}

export const N5_YA: SeedLesson = {
  key: 'n5.ya',
  kind: 'grammar',
  title: 'Lists that are not complete: ～や～(など)',
  body: `と lists every item ("A and B, and that's all"). や lists examples ("A and B, among others"):

・机の上に本とペンがあります。 — "On the desk there are a book and a pen." (just those)
・机の上に本やペンがあります。 — "On the desk there are books, pens and so on."

など ("etc.") can close a や-list to make the "and so on" explicit:
果物や野菜などを買いました。 — "I bought fruit, vegetables and the like."

Like と, や only joins nouns. In conversation, とか does the same job more casually: 漫画とかゲームとか — "manga, games, stuff like that".`,
  cards: [
    { front: '机の上に本やペンがあります。', reading: 'つくえのうえにほんやペンがあります。', back: 'There are books, pens and so on on the desk.' },
    { front: '果物や野菜などを買いました。', reading: 'くだものややさいなどをかいました。', back: 'I bought fruit, vegetables and the like.' },
    { front: '休みの日は掃除や洗濯をします。', reading: 'やすみのひはそうじやせんたくをします。', back: 'On my days off I do things like cleaning and laundry.' },
    { front: '京都や奈良に行きたいです。', reading: 'きょうとやならにいきたいです。', back: 'I want to go to places like Kyoto and Nara.' },
    { front: '犬や猫などの動物が好きです。', reading: 'いぬやねこなどのどうぶつがすきです。', back: 'I like animals such as dogs and cats.' },
    { front: '漫画とかゲームとか、よく買う。', reading: 'まんがとかゲームとか、よくかう。', back: 'I often buy manga, games, stuff like that.' }
  ]
}

export const N5_ICHIBAN: SeedLesson = {
  key: 'n5.ichiban',
  kind: 'grammar',
  title: 'The most: 一番',
  body: `一番 (literally "number one") before an adjective makes the superlative — "the most":

富士山は日本で一番高い山です。 — "Mount Fuji is the highest mountain in Japan."

The group being compared takes で ("in / among"):
・クラスで一番 — "the most in the class"
・家族の中で一番 — "the most in the family"
・果物の中で何が一番好きですか。 — "Of all fruit, which do you like best?"

Asking which is the most: 何・どこ・誰・いつ + が一番～ですか. Answers keep が: りんごが一番好きです。

一番 also works with verbs and adverbs: 一番よく食べる — "eat the most often".`,
  cards: [
    { front: '富士山は日本で一番高い山です。', reading: 'ふじさんはにほんでいちばんたかいやまです。', back: 'Mount Fuji is the highest mountain in Japan.' },
    { front: '果物の中で何が一番好きですか。', reading: 'くだもののなかでなにがいちばんすきですか。', back: 'Of all fruit, which do you like best?' },
    { front: 'りんごが一番好きです。', reading: 'りんごがいちばんすきです。', back: 'I like apples best.' },
    { front: '家族の中で父が一番背が高い。', reading: 'かぞくのなかでちちがいちばんせがたかい。', back: 'My father is the tallest in my family.' },
    { front: '一年で二月が一番寒いです。', reading: 'いちねんでにがつがいちばんさむいです。', back: 'February is the coldest month of the year.' },
    { front: 'クラスで誰が一番速く走りますか。', reading: 'クラスでだれがいちばんはやくはしりますか。', back: 'Who runs the fastest in the class?' }
  ]
}
