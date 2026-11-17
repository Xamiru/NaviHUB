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
あ、バスが来ました。 — "Oh, the bus is here."

は adds contrast when two things are compared: 肉は食べますが、魚は食べません。 — "Meat I eat, but fish I don't."`,
  cards: [
    { front: '誰が来ましたか。', reading: 'だれがきましたか。', back: 'Who came?' },
    { front: '田中さんが来ました。', reading: 'たなかさんがきました。', back: 'Tanaka came. (answering who)' },
    { front: '私は猫が好きです。', reading: 'わたしはねこがすきです。', back: 'I like cats.' },
    { front: '妹は英語が分かります。', reading: 'いもうとはえいごがわかります。', back: 'My younger sister understands English.' },
    { key: 'あ、雨が降っています。', front: 'あ、バスが来ました。', reading: 'あ、バスがきました。', back: 'Oh, the bus is here.' },
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
    { key: '子供の時、先生になりたかったです。', front: '昨日は映画を見たかったです。', reading: 'きのうはえいがをみたかったです。', back: 'I wanted to see a movie yesterday.' },
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
    { key: '図書館に本を借りに行った。', front: '図書館に本を借りに行きました。', reading: 'としょかんにほんをかりにいきました。', back: 'I went to the library to borrow a book.' },
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
    { key: '薬を飲んで、元気になった。', front: '薬を飲んで、元気になりました。', reading: 'くすりをのんで、げんきになりました。', back: 'I took some medicine and got better.' },
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

Watch the verb in that last one. 開く（あく） means "to open" with no object (the window opens), so its ている is the state. 開ける（あける） means "to open something", so its ている is the action: 窓を開けています — "(I'm) opening the window." Many verbs come in pairs like this; the N4 courses cover them.

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
    { front: '今、窓を開けています。', reading: 'いま、まどをあけています。', back: "I'm opening the window now." },
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

Group 1 (u-verbs): final -u → the -a sound of the same kana row, + ない
・う → わ: 買う → 買わない (わ, not あ)
・く → か: 書く → 書かない
・ぐ → が: 泳ぐ → 泳がない
・す → さ: 話す → 話さない
・つ → た: 待つ → 待たない
・ぬ → な: 死ぬ → 死なない
・ぶ → ば: 遊ぶ → 遊ばない
・む → ま: 飲む → 飲まない
・る → ら: 帰る → 帰らない (the Group 1 る-verbs: 帰る, 入る, 走る, 知る…)
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

// ---- 2026-11-17: the N5 points the course still lacked (plan slice 3) ----

export const N5_NUMBERS: SeedLesson = {
  key: 'n5.numbers',
  kind: 'grammar',
  title: 'Numbers past ten: 11 to 99, hundreds, thousands and 万',
  body: `Japanese numbers are built the way they are written: say the tens, then the units.

・11 to 19: 十 + unit — 十一（じゅういち）、十五（じゅうご）、十九（じゅうきゅう）
・20 to 99: unit + 十 + unit — 二十（にじゅう）、二十五（にじゅうご）、九十九（きゅうじゅうきゅう）

In numbers above ten, four is よん, seven is なな and nine is きゅう: 四十（よんじゅう）、七十（ななじゅう）、九十（きゅうじゅう）.

Hundreds (百, ひゃく) and thousands (千, せん) work the same way, with sound changes to learn by heart:
・三百（さんびゃく）、六百（ろっぴゃく）、八百（はっぴゃく）; the rest are regular: 二百（にひゃく）、五百（ごひゃく）
・三千（さんぜん）、八千（はっせん）; the rest are regular: 二千（にせん）、五千（ごせん）
・百 and 千 alone mean one hundred and one thousand, with no 一 in front.

The big difference from English is 万（まん）, ten thousand. Japanese groups large numbers in fours, not threes:
・一万（いちまん） — 10,000 (here the 一 is needed)
・十万（じゅうまん） — 100,000
・百万（ひゃくまん） — 1,000,000
So 30,000 yen is 三万円（さんまんえん）, never "thirty thousand".

Ages count with 歳（さい） and follow the same sound changes as other counters: 一歳（いっさい）、八歳（はっさい）、十歳（じゅっさい）. One age has its own word: twenty is 二十歳, read はたち.

The common mistake is counting zeros in threes. Split them in fours from the right instead: 1,000,000 → 100|0000 → 百万.`,
  cards: [
    { front: 'この時計は二万円です。', reading: 'このとけいはにまんえんです。', back: 'This watch is 20,000 yen.' },
    { front: '父は四十五歳です。', reading: 'ちちはよんじゅうごさいです。', back: 'My father is forty-five.' },
    { front: 'このかばんは三千円です。', reading: 'このかばんはさんぜんえんです。', back: 'This bag is 3,000 yen.' },
    { front: 'クラスの学生は二十一人です。', reading: 'クラスのがくせいはにじゅういちにんです。', back: 'There are twenty-one students in the class.' },
    { front: 'ジュースは百五十円です。', reading: 'ジュースはひゃくごじゅうえんです。', back: 'The juice is 150 yen.' },
    { front: 'この本は八百円です。', reading: 'このほんははっぴゃくえんです。', back: 'This book is 800 yen.' },
    { front: 'この車は三百万円です。', reading: 'このくるまはさんびゃくまんえんです。', back: 'This car is three million yen.' },
    { front: '姉は二十歳です。', reading: 'あねははたちです。', back: 'My older sister is twenty.' }
  ]
}

export const N5_DONNA: SeedLesson = {
  key: 'n5.donna',
  kind: 'grammar',
  title: 'More question words: どんな・どう・いくつ・何歳',
  body: `Four more question words, each for a different kind of question. Like the others, each sits where the answer will go.

・どんな + noun — "what kind of": どんな人ですか。 — "What kind of person are they?" どんな is always followed by a noun.
・どう — "how": 日本の生活はどうですか。 — "How is life in Japan?" どう stands before です on its own.
・いくつ — "how many", for things counted ひとつ、ふたつ…: りんごはいくつありますか。 — "How many apples are there?"
・何歳（なんさい） — "how old": 弟さんは何歳ですか。 — "How old is your younger brother?" The answer uses 歳: 三歳です。 The polite way to ask an adult is おいくつですか。

どんな vs どう, the pair learners mix up: どんな asks for a description of a noun; どう asks how something is or was.
・どんな本ですか。 — "What kind of book is it?" → 面白い本です。
・テストはどうでしたか。 — "How was the test?" → 簡単でした。

The common mistake: どう before a noun. どう本ですか ✗ — a noun after the question word needs どんな.`,
  cards: [
    { front: 'どんな人ですか。', reading: 'どんなひとですか。', back: 'What kind of person are they?' },
    { front: 'どんな本ですか。', reading: 'どんなほんですか。', back: 'What kind of book is it?' },
    { front: '日本の生活はどうですか。', reading: 'にほんのせいかつはどうですか。', back: 'How is life in Japan?' },
    { front: 'テストはどうでしたか。', reading: 'テストはどうでしたか。', back: 'How was the test?' },
    { key: 'りんごはいくつですか。', front: 'りんごはいくつありますか。', reading: 'りんごはいくつありますか。', back: 'How many apples are there?' },
    { front: '弟さんは何歳ですか。', reading: 'おとうとさんはなんさいですか。', back: 'How old is your younger brother?' },
    { front: 'お母さんはおいくつですか。', reading: 'おかあさんはおいくつですか。', back: 'How old is your mother? (polite)' }
  ]
}

export const N5_KARA_MADE: SeedLesson = {
  key: 'n5.kara-made',
  kind: 'grammar',
  title: 'From and until: ～から～まで',
  body: `から marks a starting point and まで an end point, in time or in space. Both follow a noun directly.

・time: 九時から五時まで — "from nine to five"
・place: 駅から家まで — "from the station to my house"

Either can appear alone:
・銀行は九時からです。 — "The bank opens at nine." (literally "is from nine")
・授業は三時までです。 — "Class is until three."

With a verb, まで is the end of a stretch of time or distance:
・月曜日から金曜日まで働きます。 — "I work from Monday to Friday."
・家から駅まで歩きます。 — "I walk from home to the station."

This から ("from") follows a noun. A different から, which gives a reason and follows a whole clause, comes later in the course. And まで means "until"; "by (a deadline)" is までに, an N4 point.

The common mistake: adding に. に marks a point in time, but it is not used for "until": 五時まで, not 五時にまで.`,
  cards: [
    { front: '授業は九時から三時までです。', reading: 'じゅぎょうはくじからさんじまでです。', back: 'Classes are from nine to three.' },
    { front: '銀行は何時から何時までですか。', reading: 'ぎんこうはなんじからなんじまでですか。', back: "What are the bank's opening hours?" },
    { front: '月曜日から金曜日まで働きます。', reading: 'げつようびからきんようびまではたらきます。', back: 'I work from Monday to Friday.' },
    { front: '家から駅まで歩きます。', reading: 'いえからえきまであるきます。', back: 'I walk from home to the station.' },
    { front: '東京から大阪まで新幹線で行きました。', reading: 'とうきょうからおおさかまでしんかんせんでいきました。', back: 'I went from Tokyo to Osaka by bullet train.' },
    { front: '昨日は夜十一時まで勉強しました。', reading: 'きのうはよるじゅういちじまでべんきょうしました。', back: 'Yesterday I studied until eleven at night.' }
  ]
}

export const N5_TO_DE: SeedLesson = {
  key: 'n5.to-de',
  kind: 'grammar',
  title: 'With, by and because of: と (together) and で (means, cause)',
  body: `と after a person means "with", doing something together:
・友達と映画を見ました。 — "I watched a movie with a friend."
・家族と旅行します。 — "I travel with my family."
The opposite is 一人で（ひとりで）, "alone, by myself".

と and に with 会う ("meet"): 友達に会う marks the friend as the person you meet; 友達と会う is a meeting the two of you arranged together. Both are correct.

で after a tool, a vehicle or a language gives the MEANS, "with, by, in":
・箸で食べます。 — "I eat with chopsticks."
・バスで行きます。 — "I go by bus."
・日本語で話します。 — "I speak in Japanese."

で after an event or an illness can also give the CAUSE, usually of something that happened to you:
・風邪で会社を休みました。 — "I took the day off work with a cold."
・雨で電車が遅れました。 — "The train was late because of the rain."

So で has three jobs: where an action happens (図書館で), how (バスで) and why (風邪で). The noun before it tells you which.

The common mistake: と for a tool. "I write with a pen" is ペンで書きます; ペンと書きます would mean the pen is writing alongside you.`,
  cards: [
    { front: '友達と映画を見ました。', reading: 'ともだちとえいがをみました。', back: 'I watched a movie with a friend.' },
    { front: '夏休みに家族と旅行します。', reading: 'なつやすみにかぞくとりょこうします。', back: "I'm travelling with my family in the summer holidays." },
    { front: '箸で食べます。', reading: 'はしでたべます。', back: 'I eat with chopsticks.' },
    { front: 'ペンで名前を書きます。', reading: 'ペンでなまえをかきます。', back: 'I write my name with a pen.' },
    { front: '風邪で会社を休みました。', reading: 'かぜでかいしゃをやすみました。', back: 'I took the day off work with a cold.' },
    { front: '雨で電車が遅れました。', reading: 'あめででんしゃがおくれました。', back: 'The train was late because of the rain.' },
    { front: '先生と日本語で話しました。', reading: 'せんせいとにほんごではなしました。', back: 'I talked with the teacher in Japanese.' }
  ]
}

export const N5_HINDO: SeedLesson = {
  key: 'n5.hindo',
  kind: 'grammar',
  title: 'How often: 週に三回 and frequency words',
  body: `To say how many times in a period: period + に + number + 回（かい）.
・週に三回 — "three times a week"
・一日に二回 — "twice a day"
・月に一回 — "once a month"
・年に二回 — "twice a year"

回 counts times, with the usual small ッ: 一回（いっかい）、二回（にかい）、三回（さんかい）、六回（ろっかい）、八回（はっかい）、十回（じゅっかい）. To ask: 何回（なんかい）.

Frequency words sit before the verb. From most to least often:
・いつも — always
・よく — often
・時々（ときどき） — sometimes
・たまに — once in a while
Two more, あまり and 全然, need a negative verb; they have their own lesson later.

毎 + a period means "every": 毎日 (every day), 毎週 (every week), 毎月 (every month), 毎年 (every year), 毎朝 (every morning).

Without に is also normal, in speech too: 週三回. 週に三回 is the safe full form to learn first.

The common mistake: putting the number before the period. 三回週に ✗ — the period comes first: 週に三回.`,
  cards: [
    { front: '週に三回ジムに行きます。', reading: 'しゅうにさんかいジムにいきます。', back: 'I go to the gym three times a week.' },
    { front: '一日に二回歯を磨きます。', reading: 'いちにちににかいはをみがきます。', back: 'I brush my teeth twice a day.' },
    { front: '月に一回映画を見ます。', reading: 'つきにいっかいえいがをみます。', back: 'I watch a movie once a month.' },
    { front: '年に二回国に帰ります。', reading: 'ねんににかいくににかえります。', back: 'I go back to my home country twice a year.' },
    { front: '一週間に何回運動しますか。', reading: 'いっしゅうかんになんかいうんどうしますか。', back: 'How many times a week do you exercise?' },
    { front: '時々友達に電話します。', reading: 'ときどきともだちにでんわします。', back: 'I sometimes call my friends.' },
    { front: '父はいつも七時に帰ります。', reading: 'ちちはいつもしちじにかえります。', back: 'My father always comes home at seven.' }
  ]
}

export const N5_AMARI: SeedLesson = {
  key: 'n5.amari',
  kind: 'grammar',
  title: 'Not very, not at all: あまり・全然 + negative',
  body: `あまり and 全然（ぜんぜん） go with a negative to say how far from true something is.

・あまり + negative — "not very, not much, not often"
このカレーはあまり辛くないです。 — "This curry isn't very spicy."
あまりテレビを見ません。 — "I don't watch much TV."

・全然 + negative — "not at all, never"
全然分かりません。 — "I don't understand at all."
今日は全然寒くないです。 — "It's not cold at all today."

They work with verbs (ません, ない) and adjectives (くないです or くありません; じゃないです for な-adjectives and nouns).

From most to least: とても高い (very expensive) → 高い → あまり高くない → 全然高くない.

The common mistake: either word with an affirmative. あまり高いです ✗. You will hear 全然大丈夫 ("totally fine") in casual speech, but in your own sentences keep 全然 with a negative.`,
  cards: [
    { front: 'このカレーはあまり辛くないです。', reading: 'このカレーはあまりからくないです。', back: "This curry isn't very spicy." },
    { front: 'あまりテレビを見ません。', reading: 'あまりテレビをみません。', back: "I don't watch much TV." },
    { front: '全然分かりません。', reading: 'ぜんぜんわかりません。', back: "I don't understand at all." },
    { front: '今日は全然寒くないです。', reading: 'きょうはぜんぜんさむくないです。', back: "It's not cold at all today." },
    { front: '兄はあまり肉を食べません。', reading: 'あにはあまりにくをたべません。', back: "My older brother doesn't eat much meat." },
    { front: '昨日は全然勉強しませんでした。', reading: 'きのうはぜんぜんべんきょうしませんでした。', back: "I didn't study at all yesterday." },
    { front: 'この本はあまり面白くありませんでした。', reading: 'このほんはあまりおもしろくありませんでした。', back: "This book wasn't very interesting." }
  ]
}

export const N5_DAKE: SeedLesson = {
  key: 'n5.dake',
  kind: 'grammar',
  title: 'Only: だけ and しか～ない',
  body: `Both mean "only", but they are built differently and feel different.

だけ — a neutral "only, just". It follows the noun or number, and the verb stays as it is:
・水だけ飲みました。 — "I drank only water."
・一つだけください。 — "Just one, please."

しか — "nothing but", always with a NEGATIVE verb. It stresses that the amount is small, often too small:
・コーヒーしか飲みません。 — "I drink nothing but coffee."
・財布に千円しかありません。 — "I only have 1,000 yen in my wallet." (and that is not much)

Particles: だけ and しか replace が and を (水だけ, 水しか) and come after the others: 東京にだけ, 東京でしか.

The same fact, two feelings:
・三人だけ来ました。 — "Just three people came." (a plain fact)
・三人しか来ませんでした。 — "Only three people came." (fewer than hoped)

The common mistake: しか with an affirmative verb. 水しか飲みました ✗ — しか needs ません or ない.`,
  cards: [
    { front: '水だけ飲みました。', reading: 'みずだけのみました。', back: 'I drank only water.' },
    { front: '一つだけください。', reading: 'ひとつだけください。', back: 'Just one, please.' },
    { front: '財布に千円しかありません。', reading: 'さいふにせんえんしかありません。', back: 'I only have 1,000 yen in my wallet.' },
    { front: '三人しか来ませんでした。', reading: 'さんにんしかきませんでした。', back: 'Only three people came.' },
    { front: '日曜日だけ休みます。', reading: 'にちようびだけやすみます。', back: 'I only take Sundays off.' },
    { front: '朝はコーヒーしか飲みません。', reading: 'あさはコーヒーしかのみません。', back: 'In the morning I drink nothing but coffee.' },
    { front: '少しだけ分かります。', reading: 'すこしだけわかります。', back: 'I understand just a little.' }
  ]
}

export const N5_ADJ_TE: SeedLesson = {
  key: 'n5.adj-te',
  kind: 'grammar',
  title: 'Joining descriptions: ～くて・～で',
  body: `To join two descriptions ("cheap and good"), the first one takes a て-form of its own:

・い-adjective: い → くて
安い → 安くて: 安くておいしいです。 — "It's cheap and tasty."
いい → よくて (from よい)

・な-adjective: + で
静か → 静かで: 静かできれいな公園です。 — "It's a quiet, pretty park."

・noun: + で
兄は医者で、姉は先生です。 — "My older brother is a doctor, and my older sister is a teacher."

Tense and politeness come only at the end of the sentence: 安くておいしかったです — "It was cheap and tasty."

The first half can also give a reason, especially for how you feel: 頭が痛くて、学校を休みました。 — "My head hurt, so I stayed home from school."

Keep both halves on the same side: 安くておいしい (two good points) sounds natural. For a contrast ("cheap but not good"), use the "but" words that come later in the course.

The common mistake: い-adjectives with で. 安いで ✗ → 安くて. And きれい is a な-adjective despite its final い: きれいで, never きれくて.`,
  cards: [
    { front: 'この店は安くておいしいです。', reading: 'このみせはやすくておいしいです。', back: 'This place is cheap and good.' },
    { front: 'この部屋は広くて明るいです。', reading: 'このへやはひろくてあかるいです。', back: 'This room is big and bright.' },
    { front: 'ここは静かできれいな公園です。', reading: 'ここはしずかできれいなこうえんです。', back: 'This is a quiet, pretty park.' },
    { front: '兄は医者で、姉は先生です。', reading: 'あにはいしゃで、あねはせんせいです。', back: 'My older brother is a doctor, and my older sister is a teacher.' },
    { front: '頭が痛くて、学校を休みました。', reading: 'あたまがいたくて、がっこうをやすみました。', back: 'My head hurt, so I stayed home from school.' },
    { front: '昨日のパーティーはにぎやかで楽しかったです。', reading: 'きのうのパーティーはにぎやかでたのしかったです。', back: "Yesterday's party was lively and fun." },
    { front: '田中さんは優しくて、親切な人です。', reading: 'たなかさんはやさしくて、しんせつなひとです。', back: 'Tanaka is a gentle, kind person.' }
  ]
}

export const N5_PLAIN: SeedLesson = {
  key: 'n5.plain',
  kind: 'grammar',
  title: 'Plain forms: the full chart, with だ and だった',
  body: `Every polite form has a plain (casual) partner. Friends and family speak in plain forms, diaries and manga are written in them, and many later patterns are built on them, so this chart is worth knowing by heart.

Verbs — present / negative / past / past negative. Group 1 makes its negative by changing the final -u to -a (う becomes わ) and its past from the て-form:
・Group 1 う: 買う / 買わない / 買った / 買わなかった
・Group 1 く: 書く / 書かない / 書いた / 書かなかった
・Group 1 ぐ: 泳ぐ / 泳がない / 泳いだ / 泳がなかった
・Group 1 す: 話す / 話さない / 話した / 話さなかった
・Group 1 つ: 待つ / 待たない / 待った / 待たなかった
・Group 1 ぶ: 遊ぶ / 遊ばない / 遊んだ / 遊ばなかった
・Group 1 む: 飲む / 飲まない / 飲んだ / 飲まなかった
・Group 1 る: 帰る / 帰らない / 帰った / 帰らなかった
・Group 1, the exception: 行く / 行かない / 行った (not 行いた) / 行かなかった
・Group 2: 食べる / 食べない / 食べた / 食べなかった
・する / しない / した / しなかった
・来る（くる） / 来ない（こない） / 来た（きた） / 来なかった（こなかった）
・ある / ない / あった / なかった

The plain past is the て-form with て → た and で → だ: 書いて → 書いた, 飲んで → 飲んだ.

い-adjectives (just drop です):
・高い / 高くない / 高かった / 高くなかった
・いい / よくない / よかった / よくなかった

な-adjectives and nouns (です becomes だ):
・静かだ / 静かじゃない / 静かだった / 静かじゃなかった
・雨だ / 雨じゃない / 雨だった / 雨じゃなかった

Polite and plain say the same thing; only the distance to the listener changes: 昨日は雨でした (polite) = 昨日は雨だった (plain).

The common mistake: だ after an い-adjective. 高いだ ✗ — an い-adjective is complete on its own: 高い。 In casual speech だ is often dropped after nouns too: 雨だ → 雨。`,
  cards: [
    { front: '昨日は雨だった。', reading: 'きのうはあめだった。', back: 'It rained yesterday. (plain)' },
    { front: '昨日は暇じゃなかった。', reading: 'きのうはひまじゃなかった。', back: "I wasn't free yesterday. (plain)" },
    { front: 'テストは難しかった。', reading: 'テストはむずかしかった。', back: 'The test was hard. (plain)' },
    { front: 'その映画はよくなかった。', reading: 'そのえいがはよくなかった。', back: "That movie wasn't good. (plain)" },
    { front: '週末は家で本を読んだ。', reading: 'しゅうまつはいえでほんをよんだ。', back: 'I read a book at home at the weekend. (plain)' },
    { front: '友達は来なかった。', reading: 'ともだちはこなかった。', back: "My friend didn't come. (plain)" },
    { front: '今日は日曜日だ。', reading: 'きょうはにちようびだ。', back: 'Today is Sunday. (plain)' },
    { front: '昨日、図書館に行った。', reading: 'きのう、としょかんにいった。', back: 'I went to the library yesterday. (plain)' }
  ]
}

export const N5_NODE: SeedLesson = {
  key: 'n5.node',
  kind: 'grammar',
  title: 'Because, gently: ～ので',
  body: `ので gives a reason, like から, but it sounds softer and more objective: it presents the reason as a fact rather than as the speaker's argument.

Formation: plain form + ので
・verb: 熱があるので — "because I have a fever"
・い-adjective: 高いので — "because it's expensive"
・な-adjective and noun: な + ので, not だ: 静かなので, 休みなので
In very polite speech the first half can be polite too: ありますので, 休みですので.

ので vs から:
・ので sounds explanatory and polite, so it suits excuses and requests, especially to people above you: 熱があるので、今日は休みます。 — "I have a fever, so I'll take today off."
・から sounds more personal and direct, and it is the usual choice for strong feelings and opinions: この店は高いから、嫌いだ。 — "This shop is expensive, so I don't like it."
・から can stand alone as the answer to "why?" (忙しかったから。, 忙しかったからです。); ので is rarely used that way.

The common mistake: 休みだので ✗. Nouns and な-adjectives take な before ので: 休みなので.`,
  cards: [
    { front: '雨なので、試合は中止です。', reading: 'あめなので、しあいはちゅうしです。', back: "It's raining, so the match is cancelled." },
    { front: '頭が痛いので、今日は休みます。', reading: 'あたまがいたいので、きょうはやすみます。', back: "I have a headache, so I'll take today off." },
    { front: '時間がないので、タクシーで行きます。', reading: 'じかんがないので、タクシーでいきます。', back: "There's no time, so I'll go by taxi." },
    { front: '明日は早いので、今日は早く寝ます。', reading: 'あしたははやいので、きょうははやくねます。', back: "I have an early start tomorrow, so I'll go to bed early today." },
    { front: '道が分からなかったので、駅員さんに聞きました。', reading: 'みちがわからなかったので、えきいんさんにききました。', back: "I didn't know the way, so I asked a station attendant." },
    { front: 'この図書館は静かなので、よく来ます。', reading: 'このとしょかんはしずかなので、よくきます。', back: 'This library is quiet, so I come here often.' },
    { front: '熱があるので、病院に行きます。', reading: 'ねつがあるので、びょういんにいきます。', back: "I have a fever, so I'm going to the hospital." }
  ]
}
