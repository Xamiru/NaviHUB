import type { SeedCourseDef, SeedLesson } from '../japaneseSeed'

// JLPT N4 Grammar II (2026-10-16): the N4 core the first N4 course did not
// reach — concession, obligation, regret, quoting, nominalizing and the rest.
// Step 8, right after JLPT N4 Grammar. Keys are frozen.

// ---- 2026-11-17: N4 points the two N4 courses still lacked (plan slice 3).
// Declared first because N4B_COURSE below lists them at their positions.

const N4B_HOU_GA_II: SeedLesson = {
  key: 'n4b.hou-ga-ii',
  kind: 'grammar',
  title: 'Advice: ～たほうがいい・～ないほうがいい',
  body: `ほうがいい (literally "that side is better") gives advice.

Formation:
・do it: た-form + ほうがいい — 早く寝たほうがいい。 "You'd better go to bed early."
・don't do it: ない-form + ほうがいい — 無理しないほうがいい。 "You'd better not overdo it."
Polite: ほうがいいです. Softer: ほうがいいと思います, ほうがいいですよ.

Every class:
・行く → 行ったほうがいい / 行かないほうがいい
・食べる → 食べたほうがいい / 食べないほうがいい
・する → したほうがいい / しないほうがいい
・来る → 来たほうがいい（きた） / 来ないほうがいい（こない）

Why the past form for "do it" but the plain negative for "don't"? The た-form pictures the action as done ("having gone to bed early is better"), which makes the advice firm and aimed at this person. The dictionary form (寝るほうがいい) exists, but sounds like a general comparison rather than advice. The negative takes ない: 行かなかったほうがいい is not used for advice.

With adjectives and nouns, ほうがいい compares two options (the N4 comparison lesson): 安いほうがいい "the cheaper one is better", 電車のほうがいい "the train is better".

Nearest neighbours: ～なければならない is obligation, not advice. ～ばいい ("all you need to do is…") offers a method; ほうがいい warns that the other choice is worse.

The common mistake: giving it straight to a superior. ほうがいい is direct; to a teacher or a boss, soften it: ～たほうがいいかもしれません.`,
  cards: [
    { front: '風邪なら、早く寝たほうがいいよ。', reading: 'かぜなら、はやくねたほうがいいよ。', back: 'If you have a cold, you should go to bed early.' },
    { front: '無理しないほうがいいですよ。', reading: 'むりしないほうがいいですよ。', back: "You'd better not overdo it." },
    { front: '夜遅く公園を歩かないほうがいい。', reading: 'よるおそくこうえんをあるかないほうがいい。', back: "It's better not to walk in the park late at night." },
    { front: '雨が降りそうだから、傘を持っていったほうがいい。', reading: 'あめがふりそうだから、かさをもっていったほうがいい。', back: 'It looks like rain, so you should take an umbrella.' },
    { front: '医者に行ったほうがいいと思います。', reading: 'いしゃにいったほうがいいとおもいます。', back: 'I think you should see a doctor.' },
    { front: 'そのことは誰にも言わないほうがいい。', reading: 'そのことはだれにもいわないほうがいい。', back: "You'd better not tell anyone about that." },
    { front: '日本語は毎日少しずつ勉強したほうがいいです。', reading: 'にほんごはまいにちすこしずつべんきょうしたほうがいいです。', back: "It's best to study Japanese a little every day." }
  ]
}

const N4B_TE_SHIMAU: SeedLesson = {
  key: 'n4b.te-shimau',
  kind: 'grammar',
  title: '～てしまう — done completely, or done by mistake',
  body: `てしまう adds one of two meanings to an action, and the context tells you which.

1. Completely, all of it (often with もう or 全部):
宿題を全部やってしまった。 — "I finished all my homework."
この本はもう読んでしまいました。 — "I've already read this book to the end."

2. Regret: it happened and cannot be undone, or you did it without meaning to:
財布をなくしてしまった。 — "I've lost my wallet." (and I'm upset)
電車で寝てしまいました。 — "I fell asleep on the train."

Formation: て-form + しまう, which conjugates as a Group 1 verb: しまいます, しまった, しまわない. With a で-form: 飲んで → 飲んでしまう.

In speech it contracts: てしまう → ちゃう, でしまう → じゃう (食べちゃった, 飲んじゃった); the Manga & VN Japanese course covers these.

Nearest neighbours:
・plain past: 財布をなくした states a fact; 財布をなくしてしまった adds "and I wish I hadn't".
・ておく: done on purpose, in advance. てしまう is either finished off or regretted.

The common mistake: reading every てしまう as regret. 晩ご飯の前に、レポートを書いてしまいます means "I'll get the report written before dinner", sense 1, with no regret at all.`,
  cards: [
    { front: '宿題を全部やってしまった。', reading: 'しゅくだいをぜんぶやってしまった。', back: 'I finished all my homework.' },
    { front: '財布をなくしてしまった。', reading: 'さいふをなくしてしまった。', back: "I've lost my wallet." },
    { front: '電車で寝てしまいました。', reading: 'でんしゃでねてしまいました。', back: 'I fell asleep on the train.' },
    { front: '妹のケーキを食べてしまった。', reading: 'いもうとのケーキをたべてしまった。', back: "I ended up eating my younger sister's cake." },
    { front: 'この本はもう読んでしまいました。', reading: 'このほんはもうよんでしまいました。', back: "I've already read this book to the end." },
    { front: '大事な約束を忘れてしまった。', reading: 'だいじなやくそくをわすれてしまった。', back: 'I forgot an important appointment.' },
    { front: '晩ご飯の前に、レポートを書いてしまいます。', reading: 'ばんごはんのまえに、レポートをかいてしまいます。', back: "I'll get the report written before dinner." }
  ]
}

const N4B_TE_IKU_KURU: SeedLesson = {
  key: 'n4b.te-iku-kuru',
  kind: 'grammar',
  title: '～ていく・～てくる — direction in space and in time',
  body: `いく ("go") and くる ("come") after a て-form add a direction, measured from the speaker.

1. Movement: do something and go, or do something and come (back):
・傘を持っていきます。 — "I'll take an umbrella (with me)." (away from here)
・ちょっとパンを買ってくる。 — "I'll just go and buy some bread (and come back)."
・弟が走ってきた。 — "My younger brother came running over (to me)."
The everyday いってきます ("I'm off, see you later") is this pattern.

2. Change over time:
・てくる — a change that has built up to now: だんだん寒くなってきました。 "It has been getting colder."
・ていく — a change that will go on from now: これからも人口は減っていくでしょう。 "The population will keep falling from here on."

Rule of thumb: くる points toward the speaker (here, now); いく points away (there, the future).

Formation: て-form + いく or くる, conjugated like 行く and 来る: 持っていきます, 持っていった, 買ってきます, 買ってきた, 買ってこない. In this use they are usually written in kana.

ている vs ていく: 傘を持っている is "I have an umbrella (on me)"; 傘を持っていく is "I'll take an umbrella along". In speech ていく shortens to てく: 持ってく.

The common mistake: the wrong direction. Asking someone to bring something to you is 持ってきてください; 持っていってください sends it away from you.`,
  cards: [
    { front: '傘を持っていきます。', reading: 'かさをもっていきます。', back: "I'll take an umbrella." },
    { front: 'ちょっとパンを買ってくる。', reading: 'ちょっとパンをかってくる。', back: "I'll just go and buy some bread." },
    { front: '明日、ノートを持ってきてください。', reading: 'あした、ノートをもってきてください。', back: 'Please bring your notebook tomorrow.' },
    { front: '弟が走ってきた。', reading: 'おとうとがはしってきた。', back: 'My younger brother came running over.' },
    { front: 'だんだん寒くなってきました。', reading: 'だんだんさむくなってきました。', back: 'It has been getting colder.' },
    { front: '最近、日本語が分かってきた。', reading: 'さいきん、にほんごがわかってきた。', back: "Lately I've started to understand Japanese." },
    { front: 'これからも人口は減っていくでしょう。', reading: 'これからもじんこうはへっていくでしょう。', back: 'The population will probably keep falling from here on.' }
  ]
}

const N4B_JIDOUSHI: SeedLesson = {
  key: 'n4b.jidoushi',
  kind: 'grammar',
  title: 'Transitive and intransitive pairs: 閉める・閉まる',
  body: `Many verbs come in pairs: one where someone does something TO something (transitive, the thing takes を), and one where it simply happens (intransitive, the thing takes が).

・窓を閉める — "close the window" (someone closes it) / 窓が閉まる — "the window closes"
・電気を消す — "turn off the light" / 電気が消える — "the light goes out"
・会議を始める — "start the meeting" / 会議が始まる — "the meeting starts"

The particle is the lesson: を with the transitive verb, が with the intransitive one.

The shapes repeat, so learn them as patterns (transitive first):
・-eru / -aru: 閉める・閉まる, 始める・始まる, 止める・止まる, 決める・決まる
・-eru / -u: 開ける・開く, 付ける・付く, 続ける・続く
・-su / -eru: 消す・消える, 出す・出る, 壊す・壊れる
・-osu / -iru: 落とす・落ちる, 起こす・起きる
・入れる・入る follows 開ける・開く (-eru transitive, -u intransitive), but the stem changes (い／はい), so learn it as a pair

Japanese often uses the intransitive verb for something that just happened, which avoids naming who did it: コップが割れた "the glass broke" sounds gentler than コップを割った "I broke the glass".

With ている and てある (from the N4 course):
・intransitive + ている — the state after the change: 窓が開いている "the window is open"
・transitive + てある — left that way on purpose: 窓が開けてある "the window has been left open (by someone)"

The common mistake: the right verb with the wrong particle. 電気が消した ✗ and 窓を閉まった ✗ — say 電気を消した and 窓が閉まった. The Confusables page drills these pairs.`,
  cards: [
    { front: 'ドアが閉まりました。', reading: 'ドアがしまりました。', back: 'The door closed.' },
    { front: '寒いから、窓を閉めてください。', reading: 'さむいから、まどをしめてください。', back: "It's cold, so please close the window." },
    { front: '急に電気が消えた。', reading: 'きゅうにでんきがきえた。', back: 'Suddenly the lights went out.' },
    { front: '寝る前に電気を消した。', reading: 'ねるまえにでんきをけした。', back: 'I turned off the light before going to bed.' },
    { front: '会議は九時に始まります。', reading: 'かいぎはくじにはじまります。', back: 'The meeting starts at nine.' },
    { front: 'では、会議を始めましょう。', reading: 'では、かいぎをはじめましょう。', back: "Well then, let's start the meeting." },
    { front: 'コップが落ちて、割れた。', reading: 'コップがおちて、われた。', back: 'The glass fell and broke.' },
    { front: 'かばんに財布を入れました。', reading: 'かばんにさいふをいれました。', back: 'I put my wallet in my bag.' }
  ]
}

const N4B_MIERU: SeedLesson = {
  key: 'n4b.mieru',
  kind: 'grammar',
  title: 'Can see, can hear: 見える・聞こえる vs 見られる・聞ける',
  body: `English "can see" and "can hear" cover two different ideas, and Japanese splits them.

見える and 聞こえる — it reaches your eyes or ears by itself, with no effort. What is seen or heard takes が:
・窓から富士山が見えます。 — "You can see Mount Fuji from the window."
・外から子供の声が聞こえる。 — "I can hear children's voices outside."

見られる and 聞ける (the potential forms) — you are able to, because there is a chance or a means:
・この映画はネットで見られます。 — "You can watch this movie online."
・このアプリでラジオが聞けます。 — "You can listen to the radio with this app."

The test: is it about your senses (見える) or about opportunity (見られる)?
・眼鏡がないと、よく見えない。 — "Without my glasses I can't see well." (eyesight)
・忙しくて、ドラマが見られない。 — "I'm too busy to watch the drama." (no chance to)

見える and 聞こえる are Group 2 verbs and never take を: 富士山を見える ✗.

見える has a second meaning, "look, seem": 若く見える "looks young".

The common mistake in writing: 見れる for 見られる. The shorter form is everywhere in speech (ら-dropping), but write 見られる.`,
  cards: [
    { front: '窓から富士山が見えます。', reading: 'まどからふじさんがみえます。', back: 'You can see Mount Fuji from the window.' },
    { front: '外から子供の声が聞こえる。', reading: 'そとからこどものこえがきこえる。', back: "I can hear children's voices outside." },
    { front: 'この映画はネットで見られます。', reading: 'このえいがはネットでみられます。', back: 'You can watch this movie online.' },
    { front: 'このアプリでラジオが聞けます。', reading: 'このアプリでラジオがきけます。', back: 'You can listen to the radio with this app.' },
    { front: '眼鏡がないと、よく見えない。', reading: 'めがねがないと、よくみえない。', back: "Without my glasses I can't see well." },
    { front: '忙しくて、ドラマが見られない。', reading: 'いそがしくて、ドラマがみられない。', back: "I'm too busy to watch the drama." },
    { front: 'すみません、声がよく聞こえません。', reading: 'すみません、こえがよくきこえません。', back: "Sorry, I can't hear you well." }
  ]
}

const N4B_YOU_NI_NARU: SeedLesson = {
  key: 'n4b.you-ni-naru',
  kind: 'grammar',
  title: '～ようになる・～なくなる — a change in ability or habit',
  body: `なる ("become") after a verb needs ように: dictionary form (often a potential) + ようになる. It describes a change that came about gradually, not a single event.

・ability: potential + ようになる — "has become able to"
泳げるようになりました。 — "I've learned to swim." (I couldn't before)
・habit: dictionary form + ようになる — "has started to (regularly)"
毎朝走るようになった。 — "I've started running every morning."

The negative change: ない-form, い → く, + なる — "no longer"
・肉を食べなくなった。 — "I've stopped eating meat."
・弟は最近ゲームをしなくなりました。 — "My younger brother has stopped playing games lately."

Nearest neighbours:
・ようにする, the lesson before: you make an effort. 早く起きるようにしている "I make a point of getting up early" vs 早く起きるようになった "I've got into the habit of getting up early" (it just happened).
・ことになる: a decision made for you, not a gradual change.
・Adjectives and nouns need no ように: 上手になる, 寒くなる.

The common mistake: a verb straight before なる. 泳げるになった ✗ and 食べるなった ✗ — a verb needs ように, or なく for the negative.`,
  cards: [
    { front: '泳げるようになりました。', reading: 'およげるようになりました。', back: "I've learned to swim." },
    { front: '毎朝走るようになった。', reading: 'まいあさはしるようになった。', back: "I've started running every morning." },
    { front: '肉を食べなくなった。', reading: 'にくをたべなくなった。', back: "I've stopped eating meat." },
    { front: '漢字が少し書けるようになった。', reading: 'かんじがすこしかけるようになった。', back: 'I can write a few kanji now.' },
    { front: '弟は最近ゲームをしなくなりました。', reading: 'おとうとはさいきんゲームをしなくなりました。', back: 'My younger brother has stopped playing games lately.' },
    { front: 'やっと自転車に乗れるようになった。', reading: 'やっとじてんしゃにのれるようになった。', back: 'At last I can ride a bike.' },
    { front: '雨の日は、バスで行くようになりました。', reading: 'あめのひは、バスでいくようになりました。', back: "On rainy days I've started taking the bus." }
  ]
}

const N4B_O_NI_NARU: SeedLesson = {
  key: 'n4b.o-ni-naru',
  kind: 'grammar',
  title: 'Polite verbs: お～になる (respect) and お～する (humble)',
  body: `Two patterns make most verbs polite. Which one you use depends on WHO does the action.

Respect (尊敬語), for what someone above you does: お + ます-stem + になる
・読む → お読みになる, 帰る → お帰りになる, 戻る → お戻りになる
この本をお読みになりましたか。 — "Have you read this book?"

Humble (謙譲語), for what you do for them: お + ます-stem + する (more polite: いたす)
・持つ → お持ちする, 送る → お送りする, 待つ → お待ちする
お荷物をお持ちします。 — "Let me carry your bags."
Many words of Chinese origin take ご instead of お (ご連絡する "contact (you)", ご案内する "show (you) the way", ご説明する "explain"); some common ones keep お (お電話する, お食事, お返事), so learn the prefix with the word.

Polite requests: お + ます-stem + ください — お待ちください "please wait", お入りください "please come in".

Some everyday verbs skip these patterns and use special words instead: いらっしゃる (be, go, come), 召し上がる (eat), おっしゃる (say), and the humble 参る, 申す, いただく. The keigo lessons in Manga & VN Japanese II list them. A verb with a one-kana stem, such as 見る or いる, has no お～になる form: use ご覧になる and いらっしゃる.

The common mistake: mixing up the directions. The humble form for the other person's action (先生がお持ちします ✗) lowers them; the respect form for your own (私がお帰りになります ✗) raises yourself.`,
  cards: [
    { front: '先生はもうお帰りになりましたか。', reading: 'せんせいはもうおかえりになりましたか。', back: 'Has the teacher gone home already? (respectful)' },
    { front: 'この本をお読みになりましたか。', reading: 'このほんをおよみになりましたか。', back: 'Have you read this book? (respectful)' },
    { front: '部長は何時にお戻りになりますか。', reading: 'ぶちょうはなんじにおもどりになりますか。', back: 'What time will the department head be back? (respectful)' },
    { front: 'お荷物をお持ちします。', reading: 'おにもつをおもちします。', back: 'Let me carry your bags. (humble)' },
    { front: '駅までお送りします。', reading: 'えきまでおおくりします。', back: "I'll see you to the station. (humble)" },
    { front: '後でご連絡します。', reading: 'あとでごれんらくします。', back: "I'll contact you later. (humble)" },
    { front: 'こちらでお待ちください。', reading: 'こちらでおまちください。', back: 'Please wait here.' }
  ]
}

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

Left hanging at the end of a sentence, のに is pure regret or complaint: あんなに練習したのに。 — "And after I practised so much." (The "should have" form ばよかったのに comes with ～ばよかった later in this course.)`,
      cards: [
        { front: '一生懸命勉強したのに、試験に落ちた。', reading: 'いっしょうけんめいべんきょうしたのに、しけんにおちた。', back: 'Even though I studied hard, I failed the exam.' },
        { front: '雨が降っているのに、傘を持っていない。', reading: 'あめがふっているのに、かさをもっていない。', back: "It's raining, and yet I don't have an umbrella." },
        { key: '日曜日なのに、会社に行かなければならない。', front: '日曜日なのに、会社に行きました。', reading: 'にちようびなのに、かいしゃにいきました。', back: 'Even though it was Sunday, I went to work.' },
        { front: '約束したのに、彼は来なかった。', reading: 'やくそくしたのに、かれはこなかった。', back: "He promised, and yet he didn't come." },
        { front: 'この店は高いのに、おいしくない。', reading: 'このみせはたかいのに、おいしくない。', back: 'This restaurant is expensive, yet the food is not good.' },
        { key: 'もっと早く言えばよかったのに。', front: 'あんなに練習したのに。', reading: 'あんなにれんしゅうしたのに。', back: 'And after I practised so much.' }
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
    N4B_HOU_GA_II,
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
    N4B_TE_SHIMAU,
    N4B_TE_IKU_KURU,
    N4B_JIDOUSHI,
    N4B_MIERU,
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
    N4B_YOU_NI_NARU,
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
    },
    N4B_O_NI_NARU
  ]
}
