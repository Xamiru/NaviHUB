import type { SeedCourseDef } from '../japaneseSeed'

// JLPT N1 Grammar IV (2026-10-16): the N1 clause patterns — literary
// negatives, the instant one thing happens, reasons and conditions of formal
// writing, reported judgments and the rest. Right after JLPT N1 Grammar III.
// Keys are frozen.

export const N1D_COURSE: SeedCourseDef = {
  title: 'JLPT N1 Grammar IV',
  description:
    'Clause-level N1 patterns: literary negatives, the instant something happens, reasons and conditions of ' +
    'formal writing, reported judgments and emphatic endings. Do this right after JLPT N1 Grammar III.',
  level: 'N1',
  lessons: [
    {
      key: 'n1d.zujimai',
      kind: 'grammar',
      title: '～ずじまい・～ずとも — never got to, even without',
      body: `Two patterns built on the classical negative ず.

・Verb ない-stem + ずじまい(だ) — "ended up never doing". You meant to, the chance passed, and it never happened; often with regret. する → せずじまい.
  忙しくて、結局その映画は見ずじまいだった。 — "I was so busy I never did get to see that film."
  彼の本当の気持ちは、聞かずじまいになった。 — "I never ended up asking how he really felt."
・Verb ない-stem + ずとも — "even without doing". A literary ～なくても; the main clause says something is still possible or fine.
  言わずとも分かる。 — "You know without being told."
  急がずとも間に合う。 — "We'll make it even if we don't hurry."

Compare ないで終わる / ないままだった: the everyday way to say ずじまい. ずとも is common in set phrases (言わずとも、見ずとも).`,
      cards: [
        { front: '旅行中に雨が続いて、富士山は見ずじまいだった。', reading: 'りょこうちゅうにあめがつづいて、ふじさんはみずじまいだった。', back: 'It kept raining during the trip, so I never got to see Mount Fuji.' },
        { front: '買ったのに、一度も着ずじまいの服がたくさんある。', reading: 'かったのに、いちどもきずじまいのふくがたくさんある。', back: 'I have lots of clothes I bought and never once wore.' },
        { front: 'お礼を言おうと思っていたのに、言わずじまいになってしまった。', reading: 'おれいをいおうとおもっていたのに、いわずじまいになってしまった。', back: 'I meant to thank them, but never ended up doing it.' },
        { front: '結局、その理由は分からずじまいだった。', reading: 'けっきょく、そのりゆうはわからずじまいだった。', back: 'In the end, I never found out the reason.' },
        { front: '心配せずとも、すぐに慣れますよ。', reading: 'しんぱいせずとも、すぐになれますよ。', back: "You'll get used to it soon enough — no need to worry." },
        { front: 'わざわざ来ずとも、電話で十分です。', reading: 'わざわざこずとも、でんわでじゅうぶんです。', back: "There's no need to come all this way; a phone call is plenty." }
      ]
    },
    {
      key: 'n1d.zuniwa-okanai',
      kind: 'grammar',
      title: '～ずにはおかない・～ないではおかない — will surely, can\'t fail to',
      body: `Verb ない-stem + ずにはおかない (ないではおかない) has two senses.

1. Something inevitably causes a reaction — "can't fail to (move, surprise, make someone think)". The subject is usually a thing: a film, a book, an event.
  この映画は、見る人を感動させずにはおかない。 — "This film can't fail to move anyone who sees it."
2. A person's strong will — "I will definitely (do it), I won't let it go without".
  犯人を見つけ出さずにはおかない。 — "I will find the culprit, whatever it takes."

する becomes せずにはおかない. The verb in sense 1 is often causative (感動させる、考えさせる、驚かせる).

Compare ずにはいられない (N2 Grammar I): that is your own uncontrollable urge. ずにはおかない is an outside force that inevitably acts, or a fierce resolve.`,
      cards: [
        { front: '彼の演説は、聞く人の心を動かさずにはおかない。', reading: 'かれのえんぜつは、きくひとのこころをうごかさずにはおかない。', back: 'His speech cannot fail to stir the hearts of those who hear it.' },
        { front: 'この事件は、社会に大きな影響を与えずにはおかないだろう。', reading: 'このじけんは、しゃかいにおおきなえいきょうをあたえずにはおかないだろう。', back: 'This incident is bound to have a great impact on society.' },
        { front: 'その写真は、戦争の悲惨さを考えさせないではおかない。', reading: 'そのしゃしんは、せんそうのひさんさをかんがえさせないではおかない。', back: 'That photo cannot fail to make you think about the horrors of war.' },
        { front: 'あいつには必ず謝らせずにはおかない。', reading: 'あいつにはかならずあやまらせずにはおかない。', back: "I'll make them apologize, one way or another." },
        { front: '彼女の才能は、周りの人を驚かせずにはおかない。', reading: 'かのじょのさいのうは、まわりのひとをおどろかせずにはおかない。', back: 'Her talent never fails to astonish the people around her.' },
        { front: 'この不正は、徹底的に調べないではおかない。', reading: 'このふせいは、てっていてきにしらべないではおかない。', back: 'We will investigate this wrongdoing thoroughly, without fail.' }
      ]
    },
    {
      key: 'n1d.sumanai',
      kind: 'grammar',
      title: '～ではすまない・～ずにはすまない・～ずにすむ — won\'t end with, can get away without',
      body: `済む (すむ) means "to be settled, to get by". Several N1 patterns use it.

・Noun / plain form + ではすまない (だけではすまない) — "won't end with just, can't be settled by". The consequences go further.
  謝るだけではすまない問題だ。 — "This is a problem an apology alone won't fix."
  ただではすまないぞ。 — "You won't get away with this."
・Verb ない-stem + ずにはすまない (ないではすまない) — "can't get away without doing". Social or moral obligation requires it.
  迷惑をかけたのだから、謝らずにはすまない。 — "I caused trouble, so I can't get away without apologizing."
・Verb ない-stem + ずにすむ (ないですむ) — "can get by without, be spared". Relief that something proved unnecessary.
  早く気づいたので、大事にならずにすんだ。 — "We noticed early, so it didn't become serious."

する becomes せずにすむ / せずにはすまない.`,
      cards: [
        { front: 'こんなミスをしたら、注意だけではすまないだろう。', reading: 'こんなミスをしたら、ちゅういだけではすまないだろう。', back: 'Make a mistake like this and a warning alone will not be the end of it.' },
        { front: '子供の喧嘩ではすまない事態になった。', reading: 'こどものけんかではすまないじたいになった。', back: 'It turned into something far more serious than a children\'s squabble.' },
        { front: '会社に損害を与えたのだから、責任を取らずにはすまない。', reading: 'かいしゃにそんがいをあたえたのだから、せきにんをとらずにはすまない。', back: 'Having caused the company losses, I can\'t get away without taking responsibility.' },
        { front: '友人の結婚式だから、出席しないではすまない。', reading: 'ゆうじんのけっこんしきだから、しゅっせきしないではすまない。', back: "It's a friend's wedding, so I can't get away with not attending." },
        { front: 'バスに間に合ったので、走らずにすんだ。', reading: 'バスにまにあったので、はしらずにすんだ。', back: 'I made the bus, so I was spared from running.' },
        { front: '友達が貸してくれたので、新しく買わずにすんだ。', reading: 'ともだちがかしてくれたので、あたらしくかわずにすんだ。', back: 'A friend lent me one, so I got away without buying a new one.' }
      ]
    },
    {
      key: 'n1d.soba-kara',
      kind: 'grammar',
      title: '～そばから — no sooner than (again and again)',
      body: `Verb (dictionary or た-form) + そばから means "no sooner has X happened than Y undoes it", and it happens repeatedly. そば means "side, right next to": the second event follows right on the heels of the first.
  片付けるそばから、子供が散らかす。 — "No sooner do I tidy up than the kids make a mess again."
  覚えたそばから忘れてしまう。 — "I forget things as soon as I've learned them."

The pattern describes a habitual, frustrating cycle, not a single event. The speaker is usually annoyed or resigned.

Compare が早いか / や否や (this course): those describe one instant succession. そばから describes a cycle that keeps repeating.`,
      cards: [
        { front: '洗濯するそばから、子供が服を汚す。', reading: 'せんたくするそばから、こどもがふくをよごす。', back: 'No sooner do I do the laundry than the kids get their clothes dirty.' },
        { front: '雪かきをするそばから、また雪が積もる。', reading: 'ゆきかきをするそばから、またゆきがつもる。', back: 'As fast as I shovel the snow, more piles up.' },
        { front: '新しい単語は、習ったそばから忘れていく。', reading: 'あたらしいたんごは、ならったそばからわすれていく。', back: 'New words slip away as soon as I learn them.' },
        { front: '掃除するそばから、また埃が溜まる。', reading: 'そうじするそばから、またほこりがたまる。', back: 'No sooner do I clean than the dust piles up again.' },
        { front: '給料をもらったそばから、使ってしまう。', reading: 'きゅうりょうをもらったそばから、つかってしまう。', back: 'I spend my pay as soon as I get it.' },
        { front: '注意したそばから、また同じ間違いをする。', reading: 'ちゅういしたそばから、またおなじまちがいをする。', back: 'No sooner do I point it out than the same mistake happens again.' }
      ]
    },
    {
      key: 'n1d.ta-ga-saigo',
      kind: 'grammar',
      title: '～たが最後・～たら最後 — once (X happens), that\'s it',
      body: `Verb た-form + が最後 (たら最後) means "once X happens, (something bad) is inevitable and can't be undone". It warns that a single step leads to an irreversible result.
  あの人に話したが最後、町中に広まってしまう。 — "Once you tell that person, it'll be all over town."
  この本は読み始めたら最後、やめられない。 — "Once you start this book, you can't put it down."

The main clause is a strong, often negative consequence: ～ない、～てしまう、二度と～ない. たら最後 is a little more spoken than たが最後.

Compare たとたん (N2 Grammar II): たとたん is just "the moment that". たが最後 adds "and from then on there's no going back".`,
      cards: [
        { front: 'このソファーに座ったが最後、立ち上がれなくなる。', reading: 'このソファーにすわったがさいご、たちあがれなくなる。', back: "Once you sit on this sofa, you won't be able to get up." },
        { front: '彼は寝たが最後、何があっても起きない。', reading: 'かれはねたがさいご、なにがあってもおきない。', back: "Once he's asleep, nothing will wake him." },
        { front: 'あの店に入ったら最後、何か買わずには出られない。', reading: 'あのみせにはいったらさいご、なにかかわずにはでられない。', back: "Once you go into that shop, you can't leave without buying something." },
        { front: '一度嘘をついたが最後、信用は取り戻せない。', reading: 'いちどうそをついたがさいご、しんようはとりもどせない。', back: "Once you've told a lie, you can't win back trust." },
        { front: 'このゲームは始めたら最後、朝まで続けてしまう。', reading: 'このゲームははじめたらさいご、あさまでつづけてしまう。', back: 'Once you start this game, you end up playing until morning.' },
        { front: '秘密が漏れたが最後、計画は台無しだ。', reading: 'ひみつがもれたがさいご、けいかくはだいなしだ。', back: 'Once the secret gets out, the plan is ruined.' }
      ]
    },
    {
      key: 'n1d.hayai-ka',
      kind: 'grammar',
      title: '～が早いか・～や否や — the instant that',
      body: `Two literary ways to say one action follows another instantly: "the moment, no sooner than".

・Verb dictionary form + が早いか — "no sooner had X than Y". Very fast succession, often vivid narration.
  ベルが鳴るが早いか、生徒たちは教室を飛び出した。 — "No sooner had the bell rung than the students dashed out of the classroom."
・Verb dictionary form + や否や (やいなや) / や — "as soon as, the instant". Literally "whether or not": the second event begins before you could tell.
  ドアを開けるや否や、犬が飛びついてきた。 — "The instant I opened the door, the dog leapt at me."

Both describe actual past events, so the main clause is not a request, intention or command. Compare たとたん (N2 Grammar II) and か～ないかのうちに (N2 Grammar IV): the same idea in more everyday registers.`,
      cards: [
        { front: '彼は家に帰るが早いか、ベッドに倒れ込んだ。', reading: 'かれはいえにかえるがはやいか、ベッドにたおれこんだ。', back: 'No sooner had he got home than he collapsed onto the bed.' },
        { front: '新商品は店頭に並ぶが早いか、売り切れた。', reading: 'しんしょうひんはてんとうにならぶがはやいか、うりきれた。', back: 'The new product sold out the moment it hit the shelves.' },
        { front: '子供は母親の姿を見るが早いか、走り出した。', reading: 'こどもはははおやのすがたをみるがはやいか、はしりだした。', back: 'The instant the child saw its mother, it started running.' },
        { front: '試験終了のベルが鳴るや否や、教室は騒がしくなった。', reading: 'しけんしゅうりょうのベルがなるやいなや、きょうしつはさわがしくなった。', back: 'The instant the bell signalling the end of the exam rang, the classroom grew noisy.' },
        { front: 'そのニュースが流れるや否や、電話が鳴り始めた。', reading: 'そのニュースがながれるやいなや、でんわがなりはじめた。', back: 'The moment the news broke, the phones started ringing.' },
        { front: '彼女は席に着くや、手紙を書き始めた。', reading: 'かのじょはせきにつくや、てがみをかきはじめた。', back: 'As soon as she sat down, she began writing a letter.' }
      ]
    },
    {
      key: 'n1d.tara-tade',
      kind: 'grammar',
      title: '～たら～たで — if (it happens), then that brings its own problems',
      body: `The same verb or adjective repeated as たら … たで means "if X happens, well, then (there's a different issue)". Either way something is not ideal; or, when you didn't have X you wanted it, and now that you have it, it has its own drawbacks.
  お金がなければ困るが、あったらあったで心配が増える。 — "Having no money is a problem, but if you have it, that brings its own worries."
  子供が小さいときは大変だが、大きくなったらなったで別の苦労がある。 — "Small children are hard work, but when they grow up, that brings different hardships."

Formation: verb たら + same verb た + で; い-adjective かったら + かったで; な-adjective / noun なら + なで.
  暇なら暇で、退屈だ。 — "If I'm free, well, then I'm bored."

It can also be resigned acceptance: 失敗したら失敗したで、また挑戦すればいい — "If I fail, so be it; I'll just try again."`,
      cards: [
        { front: '雨が降らないと困るが、降ったら降ったで大変だ。', reading: 'あめがふらないとこまるが、ふったらふったでたいへんだ。', back: "No rain is a problem, but when it does rain, that's trouble too." },
        { front: '車がないと不便だが、あったらあったでお金がかかる。', reading: 'くるまがないとふべんだが、あったらあったでおかねがかかる。', back: 'Not having a car is inconvenient, but having one costs money.' },
        { front: '仕事がないと不安だが、忙しかったら忙しかったで疲れる。', reading: 'しごとがないとふあんだが、いそがしかったらいそがしかったでつかれる。', back: 'No work makes me anxious, but when I am busy, I get worn out instead.' },
        { front: '一人なら一人で、寂しいこともある。', reading: 'ひとりならひとりで、さびしいこともある。', back: 'Being on your own has its lonely moments too.' },
        { front: '断られたら断られたで、別の方法を考えればいい。', reading: 'ことわられたらことわられたで、べつのほうほうをかんがえればいい。', back: "If they say no, so be it — we'll just think of another way." },
        { front: '休みが少ないと文句を言うが、多かったら多かったで暇を持て余す。', reading: 'やすみがすくないともんくをいうが、おおかったらおおかったでひまをもてあます。', back: 'People complain about too few days off, but with too many, they get bored.' }
      ]
    },
    {
      key: 'n1d.te-yamanai',
      kind: 'grammar',
      title: '～てやまない — never cease to (hope, wish)',
      body: `Verb て-form + やまない means "never stop (feeling), sincerely and continuously". やむ means "to cease": the feeling goes on without end.

It is used almost only with verbs of wishing, loving and respecting: 願う、祈る、望む、期待する、愛する、尊敬する. The tone is formal and heartfelt, common in speeches, letters and messages.
  皆様のご健康を願ってやみません。 — "I sincerely wish you all good health."
  彼は生涯、故郷を愛してやまなかった。 — "All his life, he never stopped loving his hometown."

The subject is the speaker, or the feelings of a person described in writing. Compare たくてたまらない (N2 Grammar IV): that is an intense, almost physical desire. てやまない is a steady, dignified one.`,
      cards: [
        { front: '平和な世界が来ることを願ってやまない。', reading: 'へいわなせかいがくることをねがってやまない。', back: 'I never cease to hope for a world at peace.' },
        { front: '皆様のご活躍を期待してやみません。', reading: 'みなさまのごかつやくをきたいしてやみません。', back: 'I sincerely look forward to your continued success.' },
        { front: '彼女は恩師を尊敬してやまない。', reading: 'かのじょはおんしをそんけいしてやまない。', back: 'She has boundless respect for her former teacher.' },
        { front: '一日も早い回復を祈ってやみません。', reading: 'いちにちもはやいかいふくをいのってやみません。', back: 'I pray for your swift recovery.' },
        { front: '私が愛してやまないこの町を、守りたい。', reading: 'わたしがあいしてやまないこのまちを、まもりたい。', back: 'I want to protect this town that I love so deeply.' },
        { front: '子供たちの幸せを望んでやまない。', reading: 'こどもたちのしあわせをのぞんでやまない。', back: "I wish with all my heart for the children's happiness." }
      ]
    },
    {
      key: 'n1d.nai-made-mo',
      kind: 'grammar',
      title: '～ないまでも — even if not (as far as), at least',
      body: `Verb ない-form + までも means "even if not (to the full extent of X), at least (something less)". X is the ideal or extreme; the main clause settles for a lower level.
  毎日とは言わないまでも、週に一度は運動したい。 — "If not every day, I'd at least like to exercise once a week."
  優勝できないまでも、ベスト四には入りたい。 — "Even if we can't win it all, I want to make the semifinals at least."

The main clause usually has せめて, ぐらいは, べきだ or たい: a minimum the speaker hopes for or demands.

Compare ても (N4 Grammar II): ても is "even if". ないまでも specifically steps down from an ideal to a reachable minimum.`,
      cards: [
        { front: '満点とは言わないまでも、八十点は取りたい。', reading: 'まんてんとはいわないまでも、はちじゅってんはとりたい。', back: 'If not full marks, I would at least like to get eighty.' },
        { front: '毎日でないまでも、時々は連絡してほしい。', reading: 'まいにちでないまでも、ときどきはれんらくしてほしい。', back: 'If not every day, I want you to get in touch now and then at least.' },
        { front: 'お礼の品は送らないまでも、手紙くらいは書くべきだ。', reading: 'おれいのしなはおくらないまでも、てがみくらいはかくべきだ。', back: 'Even if you don\'t send a gift, you should at least write a letter.' },
        { front: '完全に治らないまでも、痛みが軽くなればいい。', reading: 'かんぜんになおらないまでも、いたみがかるくなればいい。', back: "Even if it doesn't heal completely, it'd be enough for the pain to ease." },
        { front: 'プロにはなれないまでも、人に教えられるくらいにはなりたい。', reading: 'プロにはなれないまでも、ひとにおしえられるくらいにはなりたい。', back: 'Even if I can\'t turn pro, I want to get good enough to teach others.' },
        { front: '手伝わないまでも、邪魔だけはしないでほしい。', reading: 'てつだわないまでも、じゃまだけはしないでほしい。', back: "Even if you won't help, at least don't get in the way." }
      ]
    },
    {
      key: 'n1d.naku-mo-nai',
      kind: 'grammar',
      title: '～なくもない・～ないものでもない — it\'s not that I couldn\'t',
      body: `Double negatives that make a hesitant, reluctant "yes": "it's not impossible, I could, I suppose".

・Verb ない-form / adjective + なくもない (なくはない) — "it's not that (I don't)". Soft and noncommittal.
  気持ちは分からなくもない。 — "I can sort of understand how you feel."
  言われてみれば、似ていなくもない。 — "Now that you mention it, they do look a bit alike."
・Verb ない-form + ものでもない — "it's not out of the question, I might". A grudging willingness, often with a condition.
  条件次第では、引き受けないものでもない。 — "Depending on the terms, I might take it on."

Compare ないことはない (N2 Grammar II): very close. なくもない sounds more hesitant; ないものでもない carries a sense of "if pushed, I'd consider it".`,
      cards: [
        { front: 'その意見にも、一理あると思わなくもない。', reading: 'そのいけんにも、いちりあるとおもわなくもない。', back: "I suppose I can see some sense in that opinion too." },
        { front: '辛い物は食べられなくもないが、あまり好きではない。', reading: 'からいものはたべられなくもないが、あまりすきではない。', back: "It's not that I can't eat spicy food, but I don't much like it." },
        { front: '彼の言い分も、分からなくはない。', reading: 'かれのいいぶんも、わからなくはない。', back: "I can kind of see where he's coming from." },
        { front: '頼み方によっては、手伝わないものでもない。', reading: 'たのみかたによっては、てつだわないものでもない。', back: 'Depending on how you ask, I might help.' },
        { front: '急げば、間に合わないものでもない。', reading: 'いそげば、まにあわないものでもない。', back: "If we hurry, it's not out of the question that we'll make it." },
        { front: '時間があれば、行けなくもないけど。', reading: 'じかんがあれば、いけなくもないけど。', back: 'If I have time, I suppose I could go.' }
      ]
    },
    {
      key: 'n1d.yashinai',
      kind: 'grammar',
      title: '～やしない・～もしないで — won\'t ever, without even',
      body: `Two emphatic negatives.

・Verb ます-stem + やしない (はしない, casual りゃしない) — "won't (at all), never". A strong, emotional denial, often exasperated. する → しやしない, 来る → 来やしない; い-adjectives go くはない → くありゃしない (楽しくありゃしない). りゃしない is the spoken contraction of the whole family (ありゃしない、分かりゃしない).
  そんなこと、誰も信じやしない。 — "Nobody would ever believe that."
  いくら待っても、来やしない。 — "No matter how long I wait, they never show up."
・Verb ます-stem or noun + もしないで (もせずに) — "without even (doing)". Someone skipped an obvious, minimal step; critical.
  よく調べもしないで、決めつけるな。 — "Don't jump to conclusions without even checking properly."
  彼は挨拶もしないで、帰ってしまった。 — "He went home without even saying goodbye."

Both are spoken and emotional. Compare ない: 信じない is a plain denial; 信じやしない stresses that it simply will not happen.`,
      cards: [
        { front: 'そんな嘘、誰もだまされやしないよ。', reading: 'そんなうそ、だれもだまされやしないよ。', back: 'Nobody would ever be fooled by a lie like that.' },
        { front: 'あいつは何度言っても、聞きやしない。', reading: 'あいつはなんどいっても、ききやしない。', back: 'No matter how many times I tell them, they never listen.' },
        { front: '一人で行ったって、楽しくありゃしない。', reading: 'ひとりでいったって、たのしくありゃしない。', back: "Going alone wouldn't be any fun at all." },
        { front: '中身を見もしないで、捨てないで。', reading: 'なかみをみもしないで、すてないで。', back: "Don't throw it away without even looking inside." },
        { front: '彼は練習もしないで、試合に出た。', reading: 'かれはれんしゅうもしないで、しあいにでた。', back: 'He entered the match without even practising.' },
        { front: '読みもせずに、文句を言うのはおかしい。', reading: 'よみもせずに、もんくをいうのはおかしい。', back: "It's ridiculous to complain without even reading it." }
      ]
    },
    {
      key: 'n1d.you-ni-mo',
      kind: 'grammar',
      title: '～ようにも～れない — want to but can\'t',
      body: `Volitional + にも + potential negative of the same verb means "even if I try to (or want to), I can't". Circumstances block the action entirely.
  連絡しようにも、電話番号が分からない。 — "Even if I wanted to contact them, I don't know their number."
  助けを呼ぼうにも、声が出なかった。 — "I tried to call for help, but no voice came out."

Usually the same verb appears twice (行こうにも行けない), but the second half can just state the obstacle, as in the examples above.

A related form with the dictionary form: Verb dictionary form + にも + potential negative — "can't (do) even if I want to": 笑うにも笑えない — "too awkward to laugh at", 泣くに泣けない — "can't even cry about it".

Compare たくても～ない (N4): たくても is the everyday "even though I want to". ようにも～れない sounds more formal and stresses that every attempt is blocked.`,
      cards: [
        { front: '外に出ようにも、雨がひどくて出られない。', reading: 'そとにでようにも、あめがひどくてでられない。', back: "I'd like to go out, but the rain is too heavy." },
        { front: '謝ろうにも、彼はもう引っ越してしまった。', reading: 'あやまろうにも、かれはもうひっこしてしまった。', back: 'I want to apologize, but he has already moved away.' },
        { front: '眠ろうにも、隣の部屋がうるさくて眠れない。', reading: 'ねむろうにも、となりのへやがうるさくてねむれない。', back: "I try to sleep, but the room next door is too noisy." },
        { front: '忘れようにも忘れられない思い出だ。', reading: 'わすれようにもわすれられないおもいでだ。', back: "It's a memory I couldn't forget even if I tried." },
        { front: 'あまりにひどい話で、笑うにも笑えなかった。', reading: 'あまりにひどいはなしで、わらうにもわらえなかった。', back: 'It was so awful I could not even laugh.' },
        { front: '買おうにも、お金が足りない。', reading: 'かおうにも、おかねがたりない。', back: "I'd buy it if I could, but I don't have enough money." }
      ]
    },
    {
      key: 'n1d.kurai-nara',
      kind: 'grammar',
      title: '～くらいなら — rather than (do that), I\'d sooner',
      body: `Verb dictionary form + くらいなら (ぐらいなら) means "if it comes to doing X, I'd rather do Y". X is something the speaker finds unbearable, and Y, though not ideal, is preferable.
  あんな人と結婚するくらいなら、一生独身でいい。 — "Rather than marry someone like that, I'd stay single all my life."
  途中でやめるくらいなら、最初からやらないほうがいい。 — "If you're going to quit halfway, better not to start."

The main clause usually has ～ほうがいい、～ほうがましだ or a strong decision. X is described with dislike.

Compare より (N5): AよりBのほうがいい is a neutral comparison. くらいなら shows that A is so bad that even B is better.`,
      cards: [
        { front: '満員電車に乗るくらいなら、歩いて行く。', reading: 'まんいんでんしゃにのるくらいなら、あるいていく。', back: "I'd rather walk than ride a packed train." },
        { front: '嘘をつくくらいなら、黙っていたほうがいい。', reading: 'うそをつくくらいなら、だまっていたほうがいい。', back: "It's better to stay silent than to lie." },
        { front: '後悔するくらいなら、今すぐ告白したほうがいい。', reading: 'こうかいするくらいなら、いますぐこくはくしたほうがいい。', back: "Rather than live with regret, you'd better confess your feelings now." },
        { front: 'あの店で待つくらいなら、家で作ったほうがましだ。', reading: 'あのみせでまつくらいなら、いえでつくったほうがましだ。', back: "I'd sooner cook at home than wait at that restaurant." },
        { front: '人に頭を下げるくらいなら、一人でやる。', reading: 'ひとにあたまをさげるくらいなら、ひとりでやる。', back: "I'd rather do it alone than go begging to people." },
        { front: '捨てるくらいなら、私にちょうだい。', reading: 'すてるくらいなら、わたしにちょうだい。', back: "If you're going to throw it away, give it to me instead." }
      ]
    },
    {
      key: 'n1d.tomonaku',
      kind: 'grammar',
      title: '～ともなく・～ともなしに — without really meaning to',
      body: `Verb dictionary form + ともなく (ともなしに) + verb means "(doing X) without really intending to, idly". The action happens absent-mindedly, with no clear purpose.
  見るともなくテレビを見ていた。 — "I was idly watching TV without really watching."
  聞くともなしに、隣の会話を聞いてしまった。 — "Without meaning to, I overheard the conversation next to me."

Often the same verb appears before ともなく and after it (見るともなく見る、聞くともなく聞く). It mostly goes with verbs of perception and thought: 見る、聞く、言う、考える.

With a question word it means "some (time / place / one), not clearly known": どこからともなく音楽が聞こえてきた — "Music drifted in from somewhere or other." 誰ともなく — "someone or other".`,
      cards: [
        { front: '窓の外を見るともなく見ていた。', reading: 'まどのそとをみるともなくみていた。', back: 'I was gazing absent-mindedly out of the window.' },
        { front: 'ラジオを聞くともなく聞いていたら、懐かしい曲が流れた。', reading: 'ラジオをきくともなくきいていたら、なつかしいきょくがながれた。', back: 'While I was half-listening to the radio, an old favourite came on.' },
        { front: '考えるともなく、昔のことを考えていた。', reading: 'かんがえるともなく、むかしのことをかんがえていた。', back: 'Without really meaning to, I was thinking about the old days.' },
        { front: '言うともなしにつぶやいた言葉が、彼女を傷つけた。', reading: 'いうともなしにつぶやいたことばが、かのじょをきずつけた。', back: 'Words I muttered without thinking hurt her.' },
        { front: 'どこからともなく、いい香りがしてきた。', reading: 'どこからともなく、いいかおりがしてきた。', back: 'A lovely scent drifted in from somewhere.' },
        { front: '誰からともなく、拍手が起こった。', reading: 'だれからともなく、はくしゅがおこった。', back: 'Applause broke out, started by no one in particular.' }
      ]
    },
    {
      key: 'n1d.ataranai',
      kind: 'grammar',
      title: '～にはあたらない・～には及ばない・～までもない — there\'s no need to',
      body: `Three ways to say something is unnecessary.

・Verb dictionary form + にはあたらない — "there's no call to (be surprised, criticize, praise)". The reaction is out of proportion; mostly with 驚く、非難する、悲観する、感心する.
  彼が合格したのは、驚くにはあたらない。 — "It's no surprise that he passed."
・Verb dictionary form / noun + には及ばない — "there's no need to (go that far)". Polite, often declining someone's offer: それには及びません — "That won't be necessary."
  わざわざ来ていただくには及びません。 — "There's no need for you to come all this way."
・Verb dictionary form + までもない — "it goes without saying, there's no need even to". The point is too obvious to need doing.
  言うまでもなく、健康が一番大切だ。 — "It goes without saying that health is most important."
  調べるまでもない — "It doesn't even need checking."

All three are formal. Compare 必要はない (N4): the everyday "there's no need".`,
      cards: [
        { front: '一度の失敗で、悲観するにはあたらない。', reading: 'いちどのしっぱいで、ひかんするにはあたらない。', back: "There's no call to despair over a single failure." },
        { front: '子供がいたずらをするのは当然で、怒るにはあたらない。', reading: 'こどもがいたずらをするのはとうぜんで、おこるにはあたらない。', back: "Children get up to mischief; there's no reason to get angry." },
        { front: 'ご心配には及びません。すぐに治ります。', reading: 'ごしんぱいにはおよびません。すぐになおります。', back: 'There is no need to worry. It will heal soon.' },
        { front: 'この程度の怪我なら、病院に行くには及ばない。', reading: 'このていどのけがなら、びょういんにいくにはおよばない。', back: "For an injury this minor, there's no need to go to hospital." },
        { front: '言うまでもないが、遅刻は厳禁だ。', reading: 'いうまでもないが、ちこくはげんきんだ。', back: 'It goes without saying, but lateness is strictly forbidden.' },
        { front: 'こんな簡単な問題は、考えるまでもない。', reading: 'こんなかんたんなもんだいは、かんがえるまでもない。', back: "A problem this easy doesn't even need thinking about." }
      ]
    },
    {
      key: 'n1d.made-da',
      kind: 'grammar',
      title: '～までだ・～までのことだ — I\'ll just, it\'s only that',
      body: `までだ has two uses.

1. Verb dictionary form + までだ (までのことだ) — "(if that fails), I'll simply…". The speaker calmly settles on a fallback, showing resolve.
  電車がないなら、歩いて帰るまでだ。 — "If there are no trains, I'll just walk home."
  断られたら、また頼むまでのことだ。 — "If they turn me down, I'll just ask again."
2. Verb た-form + までだ (までのことだ) — "I only (did it), nothing more". It plays down a reason or intent, often to brush off thanks or blame.
  当然のことをしたまでです。 — "I only did what anyone would."
  ちょっと聞いてみたまでだ。 — "I was just asking."

Compare しかない (N3): 歩くしかない is resigned ("I have no choice"). 歩くまでだ is cool and determined ("then I'll walk, simple as that").`,
      cards: [
        { front: '誰も手伝ってくれないなら、一人でやるまでだ。', reading: 'だれもてつだってくれないなら、ひとりでやるまでだ。', back: "If nobody will help, I'll just do it alone." },
        { front: '今年がだめなら、来年また受けるまでだ。', reading: 'ことしがだめなら、らいねんまたうけるまでだ。', back: "If it doesn't work out this year, I'll simply take it again next year." },
        { front: 'バスが来なければ、タクシーを使うまでのことだ。', reading: 'バスがこなければ、タクシーをつかうまでのことだ。', back: "If the bus doesn't come, I'll just take a taxi." },
        { front: 'お礼なんていいよ。仕事をしたまでだ。', reading: 'おれいなんていいよ。しごとをしたまでだ。', back: "No need to thank me. I was only doing my job." },
        { front: '思ったことを言ったまでです。', reading: 'おもったことをいったまでです。', back: "I only said what I thought." },
        { front: '気になったから、確認したまでのことだ。', reading: 'きになったから、かくにんしたまでのことだ。', back: 'It bothered me, so I just checked — nothing more.' }
      ]
    },
    {
      key: 'n1d.mono-to-suru',
      kind: 'grammar',
      title: '～ものとする・～ものとして — shall be deemed, on the assumption that',
      body: `Two formal patterns from rules, contracts and official writing.

・Plain form + ものとする — "shall (be), is to be deemed". States a rule or how something will be interpreted.
  期限までに連絡がない場合は、辞退したものとする。 — "If we have not heard from you by the deadline, you shall be deemed to have withdrawn."
  会員は、会費を毎月払うものとする。 — "Members shall pay the fee monthly."
・Plain form + ものとして — "assuming, treating it as if". Proceeding on a premise, sometimes one known to be untrue.
  反対意見はないものとして、話を進めます。 — "We'll proceed on the assumption there are no objections."
  この話は聞かなかったものとしてください。 — "Please act as though you never heard this."

Compare ことにする / たことにする (this course): たことにする is everyday "pretend it happened". ものとする is the legal register.`,
      cards: [
        { front: '本規則は、来月一日から施行するものとする。', reading: 'ほんきそくは、らいげつついたちからしこうするものとする。', back: 'These rules shall take effect from the first of next month.' },
        { front: '欠席の連絡がない場合は、出席するものとします。', reading: 'けっせきのれんらくがないばあいは、しゅっせきするものとします。', back: 'If no absence is reported, you will be considered to be attending.' },
        { front: '借りた物は、期限内に返却するものとする。', reading: 'かりたものは、きげんないにへんきゃくするものとする。', back: 'Borrowed items shall be returned by the deadline.' },
        { front: '全員の同意が得られたものとして、次に進みます。', reading: 'ぜんいんのどういがえられたものとして、つぎにすすみます。', back: "We'll move on, taking it that everyone agrees." },
        { front: '今の発言は、なかったものとして聞いてください。', reading: 'いまのはつげんは、なかったものとしてきいてください。', back: 'Please treat what I just said as though it had not been said.' },
        { front: '雨天の場合は、中止になったものとして扱います。', reading: 'うてんのばあいは、ちゅうしになったものとしてあつかいます。', back: 'In case of rain, it will be treated as cancelled.' }
      ]
    },
    {
      key: 'n1d.shimatsu',
      kind: 'grammar',
      title: '～始末だ — and in the end (it came to this)',
      body: `Verb dictionary form + 始末だ means "and in the end, it even came to (this bad result)". 始末 means "outcome, the way things ended up". The speaker describes a chain of bad behaviour or events ending in something even worse, with exasperation.
  彼は遅刻ばかりして、ついには無断で休む始末だ。 — "He was always late, and in the end he even took days off without telling anyone."
  兄弟喧嘩がひどくなり、警察を呼ぶ始末だった。 — "The siblings' fight got so bad that it ended with the police being called."

It often follows a description of a worsening situation and comes with あげく、ついには、とうとう. この始末だ / この始末 alone means "look at this mess": 何度言っても、この始末だ — "No matter how many times I tell you, this is the result."

Compare あげく (N2 Grammar I): あげく links a long process to its result. 始末だ is a complaint that the result is shameful.`,
      cards: [
        { front: '彼は借金を重ね、ついには家まで売る始末だ。', reading: 'かれはしゃっきんをかさね、ついにはいえまでうるしまつだ。', back: 'He piled up debts, and in the end even had to sell his house.' },
        { front: '息子は勉強しないどころか、学校をさぼる始末だ。', reading: 'むすこはべんきょうしないどころか、がっこうをさぼるしまつだ。', back: "Far from studying, my son has even taken to skipping school." },
        { front: '飲みすぎて、最後は道で寝てしまう始末だった。', reading: 'のみすぎて、さいごはみちでねてしまうしまつだった。', back: 'They drank too much and ended up asleep in the street.' },
        { front: '準備不足で、本番では台詞を忘れる始末だった。', reading: 'じゅんびぶそくで、ほんばんではせりふをわすれるしまつだった。', back: 'Underprepared, I even forgot my lines on the night.' },
        { front: '何度注意しても、この始末だ。', reading: 'なんどちゅういしても、このしまつだ。', back: 'No matter how many times I warn you, this is what happens.' },
        { front: '最初は小さな嘘だったが、最後は警察沙汰になる始末だ。', reading: 'さいしょはちいさなうそだったが、さいごはけいさつざたになるしまつだ。', back: 'It started as a small lie, and it ended with the police getting involved.' }
      ]
    },
    {
      key: 'n1d.ga-yue',
      kind: 'grammar',
      title: '～がゆえ(に)・～こととて・～とあって — because (formal)',
      body: `Three literary ways to give a reason.

・Plain form / noun + (である)がゆえ(に) — "because, owing to". Classical and weighty; before a noun it becomes がゆえの.
  若さがゆえに、過ちを犯した。 — "Because of youth, mistakes were made."
  愛するがゆえの厳しさ — "strictness born of love"
・Plain form / noun + の + こととて — "since, being (a situation that can't be helped)". An old-fashioned reason, often in apologies; the result is something that couldn't be helped.
  慣れぬこととて、ご迷惑をおかけしました。 — "Being unaccustomed to it, I caused you trouble."
・Plain form / noun + とあって — "since it is (a special occasion), naturally…". The reason is an unusual circumstance, and the result is what you'd expect from it.
  連休とあって、観光地はどこも混雑している。 — "It being a long weekend, tourist spots are crowded everywhere."

Compare から / ので: the everyday reasons. These three belong to writing, speeches and news.`,
      cards: [
        { front: '彼は正直であるがゆえに、損をすることが多い。', reading: 'かれはしょうじきであるがゆえに、そんをすることがおおい。', back: 'Because he is honest, he often loses out.' },
        { front: '貧しさゆえに、学校に行けない子供たちがいる。', reading: 'まずしさゆえに、がっこうにいけないこどもたちがいる。', back: 'There are children who cannot go to school because of poverty.' },
        { front: '何分にも子供のしたこととて、お許しください。', reading: 'なにぶんにもこどものしたこととて、おゆるしください。', back: 'As it was only what a child did, please forgive it.' },
        { front: '初めてのこととて、うまくできませんでした。', reading: 'はじめてのこととて、うまくできませんでした。', back: 'It being my first time, I could not do it well.' },
        { front: '人気歌手が来るとあって、会場は満員だった。', reading: 'にんきかしゅがくるとあって、かいじょうはまんいんだった。', back: 'With a popular singer appearing, the venue was packed.' },
        { front: '年に一度のセールとあって、朝から行列ができていた。', reading: 'ねんにいちどのセールとあって、あさからぎょうれつができていた。', back: 'It being the once-a-year sale, a queue had formed since morning.' }
      ]
    },
    {
      key: 'n1d.to-areba',
      kind: 'grammar',
      title: '～とあれば・～となると・～となれば・～となったら — if it comes to',
      body: `と + ある / なる in a conditional means "if it comes to, if it is a case of". The condition is a particular or serious situation, and the main clause says what follows from it.

・とあれば — "if it's for (X), if X is the case". Often with a strong commitment: for X, anything goes.
  子供のためとあれば、何でもする。 — "If it's for my children, I'll do anything."
・となると / となれば / となったら — "when it comes to (actually doing it), if it turns out to be". The situation becomes real, and that changes things.
  いざ自分がやるとなると、難しい。 — "When it comes to actually doing it yourself, it's hard."
  留学するとなれば、お金がたくさん必要だ。 — "If it comes to studying abroad, you'll need a lot of money."
  優勝するとなったら、大騒ぎになるだろう。 — "If we actually win, there'll be a huge fuss."

Compare なら (N4): なら is a general "if". These patterns stress that the situation is special or has become real.`,
      cards: [
        { front: '社長の命令とあれば、従うしかない。', reading: 'しゃちょうのめいれいとあれば、したがうしかない。', back: "If it's the president's order, we have no choice but to obey." },
        { front: '君の頼みとあれば、断れないな。', reading: 'きみのたのみとあれば、ことわれないな。', back: "If you're the one asking, I can't say no." },
        { front: '家を買うとなると、ローンを組まなければならない。', reading: 'いえをかうとなると、ローンをくまなければならない。', back: 'If it comes to buying a house, we will have to take out a loan.' },
        { front: '一人で全部やるとなれば、一週間はかかる。', reading: 'ひとりでぜんぶやるとなれば、いっしゅうかんはかかる。', back: "If I have to do it all alone, it'll take at least a week." },
        { front: 'いざ別れるとなったら、寂しくなった。', reading: 'いざわかれるとなったら、さびしくなった。', back: 'When it actually came to parting, I felt lonely.' },
        { front: '彼が出るとなると、この試合は面白くなる。', reading: 'かれがでるとなると、このしあいはおもしろくなる。', back: "If he's going to play, this match will get interesting." }
      ]
    },
    {
      key: 'n1d.to-iedomo',
      kind: 'grammar',
      title: '～といえども — even though, even (someone like)',
      body: `Plain form / noun + といえども means "even though, even if (X)". It is a literary concession: even granting X, the general rule still applies.
  子供といえども、ルールは守らなければならない。 — "Even children must follow the rules."
  いかなる理由があるといえども、暴力は許されない。 — "Whatever the reason, violence is not permitted."

A common shape is noun といえども ～ない / ～なければならない, often with たとえ or いかに: たとえ親友といえども、言えないこともある — "Even to a best friend, there are things you can't tell."

Compare とはいえ (N1 Grammar I): とはいえ admits a fact and then qualifies it ("it's spring, but still cold"). といえども stresses that even a special case is not exempt.`,
      cards: [
        { front: 'プロといえども、失敗することはある。', reading: 'プロといえども、しっぱいすることはある。', back: 'Even professionals sometimes fail.' },
        { front: '社長といえども、規則には従わなければならない。', reading: 'しゃちょうといえども、きそくにはしたがわなければならない。', back: 'Even the company president must follow the rules.' },
        { front: '冬といえども、この地方は暖かい。', reading: 'ふゆといえども、このちほうはあたたかい。', back: 'Even in winter, this region is warm.' },
        { front: '一円といえども、無駄にはできない。', reading: 'いちえんといえども、むだにはできない。', back: "We can't waste even a single yen." },
        { front: 'たとえ親といえども、子供の人生を決めることはできない。', reading: 'たとえおやといえども、こどものじんせいをきめることはできない。', back: "Not even parents can decide their children's lives." },
        { front: '小さな会社といえども、技術力は世界一だ。', reading: 'ちいさなかいしゃといえども、ぎじゅつりょくはせかいいちだ。', back: 'Small company though it is, its technical skill is the best in the world.' }
      ]
    },
    {
      key: 'n1d.to-kite-iru',
      kind: 'grammar',
      title: '～ときている — and on top of that (it\'s)',
      body: `Plain form / noun + ときている means "and what's more, it's (X)": the speaker adds one more striking feature to the description, which makes the conclusion even more natural. The tone is emphatic and conversational.
  この店は安くて、しかも美味しいときている。人気があるわけだ。 — "This place is cheap, and on top of that it's tasty. No wonder it's popular."
  彼は頭がいい上に、顔もいいときている。もてるはずだ。 — "He's clever, and handsome to boot. Of course he's popular."

The sentence after ときている often draws the obvious conclusion: ～わけだ、～はずだ、～のも無理はない. The feature can be good or bad: 狭いうえに家賃が高いときている — "It's cramped, and on top of that the rent is high."

Compare しかも (N2 Grammar III): しかも adds a point neutrally. ときている sounds emphatic and leads to a verdict.`,
      cards: [
        { front: 'この仕事は給料が安い上に、残業も多いときている。', reading: 'このしごとはきゅうりょうがやすいうえに、ざんぎょうもおおいときている。', back: 'This job pays badly, and on top of that there is lots of overtime.' },
        { front: '彼女は美人で、性格もいいときている。人気者なのも当然だ。', reading: 'かのじょはびじんで、せいかくもいいときている。にんきものなのもとうぜんだ。', back: "She's beautiful, and on top of that she has a lovely personality. No wonder she's popular." },
        { front: 'この町は不便で、冬は寒いときている。人が減るわけだ。', reading: 'このまちはふべんで、ふゆはさむいときている。ひとがへるわけだ。', back: 'This town is inconvenient, and the winters are cold to boot. No wonder people are leaving.' },
        { front: 'うちの犬はよく吠えるし、しかも大型犬ときている。', reading: 'うちのいぬはよくほえるし、しかもおおがたけんときている。', back: 'Our dog barks a lot, and on top of that it is a big one.' },
        { front: 'あのレストランは高い上に、量も少ないときている。', reading: 'あのレストランはたかいうえに、りょうもすくないときている。', back: 'That restaurant is expensive, and the portions are small to boot.' },
        { front: '試験は明日で、しかも全然勉強していないときている。', reading: 'しけんはあしたで、しかもぜんぜんべんきょうしていないときている。', back: "The exam is tomorrow, and on top of that I haven't studied at all." }
      ]
    },
    {
      key: 'n1d.to-sareru',
      kind: 'grammar',
      title: '～とされる・～とみられる・～とのことだ — is said to, is thought to (news style)',
      body: `Three reporting patterns common in news, reports and formal messages. They distance the writer from the claim.

・Plain form + とされる (とされている) — "is said to be, is regarded as". A widely accepted view, tradition or official position.
  この寺は日本最古の木造建築とされている。 — "This temple is regarded as the oldest wooden building in Japan."
・Plain form + とみられる (とみられている) — "is thought to be, is believed to be". A judgment by investigators, experts or the media based on evidence.
  火事の原因は、たばこの火とみられる。 — "The fire is believed to have been caused by a cigarette."
・Plain form + とのことだ (とのことです) — "I'm told that, apparently". Passes on a message or information heard from someone, in polite speech and business email.
  部長は今日、遅れて来るとのことです。 — "The manager says they'll be coming in late today."

Compare そうだ (N4): the everyday hearsay ending. These three sound official and impersonal.`,
      cards: [
        { front: '富士山は古くから神聖な山とされてきた。', reading: 'ふじさんはふるくからしんせいなやまとされてきた。', back: 'Mount Fuji has long been regarded as a sacred mountain.' },
        { front: '適度な運動は、健康に良いとされている。', reading: 'てきどなうんどうは、けんこうによいとされている。', back: 'Moderate exercise is said to be good for health.' },
        { front: '犯人は二十代の男とみられている。', reading: 'はんにんはにじゅうだいのおとことみられている。', back: 'The culprit is believed to be a man in his twenties.' },
        { front: '事故の原因は、スピードの出しすぎとみられる。', reading: 'じこのげんいんは、スピードのだしすぎとみられる。', back: 'The accident is thought to have been caused by speeding.' },
        { front: '田中さんから電話があって、少し遅れるとのことです。', reading: 'たなかさんからでんわがあって、すこしおくれるとのことです。', back: 'Tanaka called to say they will be a little late.' },
        { front: '会議は来週に延期とのことだ。', reading: 'かいぎはらいしゅうにえんきとのことだ。', back: "I'm told the meeting has been postponed to next week." }
      ]
    },
    {
      key: 'n1d.to-miete',
      kind: 'grammar',
      title: '～とみえて・～とみると — apparently (judging from), on seeing',
      body: `Two patterns built on みる / みえる.

・Plain form + とみえて (とみえる) — "apparently, it seems (judging from what I can see)". The speaker infers a state from visible evidence, which follows in the main clause.
  彼は疲れているとみえて、電車の中で眠っていた。 — "He must have been tired; he was asleep on the train."
  よほど嬉しかったとみえて、ずっと笑っている。 — "They must have been really happy — they've been smiling the whole time."
・Plain form + とみると (とみるや) — "as soon as (someone) sees that, on judging that". Someone notices a situation and immediately reacts.
  敵が弱いとみると、彼は一気に攻めた。 — "Seeing that the opponent was weak, he attacked all at once."

Compare らしい / ようだ (N4): とみえて is the same kind of inference, but literary, and it explicitly points to the evidence.`,
      cards: [
        { front: '外は寒いとみえて、皆コートを着ている。', reading: 'そとはさむいとみえて、みなコートをきている。', back: "It must be cold out — everyone's wearing a coat." },
        { front: 'よほどお腹が空いていたとみえて、子供はあっという間に食べ終わった。', reading: 'よほどおなかがすいていたとみえて、こどもはあっというまにたべおわった。', back: 'The child must have been starving, judging by how fast the food disappeared.' },
        { front: '誰も住んでいないとみえて、庭は荒れ放題だ。', reading: 'だれもすんでいないとみえて、にわはあれほうだいだ。', back: 'Nobody seems to live there; the garden is completely overgrown.' },
        { front: '雨が降りそうだとみると、彼女はすぐに洗濯物を取り込んだ。', reading: 'あめがふりそうだとみると、かのじょはすぐにせんたくものをとりこんだ。', back: 'Seeing that it looked like rain, she brought the washing in right away.' },
        { front: '相手が疲れたとみるや、選手は攻撃を強めた。', reading: 'あいてがつかれたとみるや、せんしゅはこうげきをつよめた。', back: 'The moment they judged the opponent was tired, the players stepped up the attack.' },
        { front: 'この店は人気があるとみえて、いつも行列ができている。', reading: 'このみせはにんきがあるとみえて、いつもぎょうれつができている。', back: 'This shop must be popular — there is always a queue.' }
      ]
    },
    {
      key: 'n1d.nagara',
      kind: 'grammar',
      title: '～ながらに・～ながらの・～ながらも — as is, even though',
      body: `ながら beyond "while doing" (N4).

・Noun / verb ます-stem + ながらに / ながらの — "while remaining (in a state), as it has always been". Fixed expressions:
  涙ながらに語った — "told it in tears"
  生まれながらの才能 — "a talent one was born with"
  昔ながらの町並み — "streets as they were in the old days"
  居ながらにして — "without leaving home"
・Verb ます-stem / adjective / noun + ながらも — "although, even though". A concession: the two facts clash. Written; like のに but without its emotion.
  狭いながらも、楽しい我が家。 — "Small though it is, it's our happy home."
  失敗だと知りながらも、彼は続けた。 — "Even knowing it was a mistake, he kept on."

Nouns and な-adjective stems attach directly (子供ながら、残念ながら). Compare のに (N4 Grammar II): のに complains; ながらも notes the contrast calmly.`,
      cards: [
        { front: '彼女は涙ながらに、事故の様子を話した。', reading: 'かのじょはなみだながらに、じこのようすをはなした。', back: 'In tears, she described what happened in the accident.' },
        { front: 'この店では、昔ながらの方法で豆腐を作っている。', reading: 'このみせでは、むかしながらのほうほうでとうふをつくっている。', back: 'This shop makes tofu the old-fashioned way.' },
        { front: '彼は生まれながらの指導者だ。', reading: 'かれはうまれながらのしどうしゃだ。', back: 'He is a born leader.' },
        { front: '小さいながらも、この会社の技術は高い。', reading: 'ちいさいながらも、このかいしゃのぎじゅつはたかい。', back: 'Small as it is, this company has excellent technology.' },
        { front: '子供ながらに、親の苦労が分かっていた。', reading: 'こどもながらに、おやのくろうがわかっていた。', back: "Even as a child, I understood my parents' hardships." },
        { front: '残念ながら、今回は不合格です。', reading: 'ざんねんながら、こんかいはふごうかくです。', back: 'Unfortunately, you did not pass this time.' }
      ]
    },
    {
      key: 'n1d.nara-nari',
      kind: 'grammar',
      title: '～なら～なりに — in its own way, for what it is',
      body: `A なら A なりに (or A なりに) means "in a way suited to A, as best A can". Each situation or person has its own appropriate way, even if limited.
  子供なら子供なりに、考えていることがある。 — "Children have their own way of thinking things through."
  お金がないならないなりに、楽しく暮らせる。 — "If you don't have money, you can still live happily in your own way."
  私なりに頑張った。 — "I did my best, in my own way."

Formation: noun / adjective / verb repeated with なら … なりに; なりの before a noun (彼なりの考え — "his own way of thinking").

The tone accepts limits but insists on effort or value within them. Compare らしい (N4): 子供らしい means "typical of a child". 子供なりに means "the way a child (realistically) can".`,
      cards: [
        { front: '初心者なら初心者なりに、できることがある。', reading: 'しょしんしゃならしょしんしゃなりに、できることがある。', back: 'Even a beginner can do something, in their own way.' },
        { front: '時間がないならないなりに、工夫すればいい。', reading: 'じかんがないならないなりに、くふうすればいい。', back: "If you're short on time, just find ways to make do." },
        { front: '彼なりに一生懸命やったのだから、責めないで。', reading: 'かれなりにいっしょうけんめいやったのだから、せめないで。', back: "He tried his best, in his own way, so don't blame him." },
        { front: '安い店には安い店なりの良さがある。', reading: 'やすいみせにはやすいみせなりのよさがある。', back: 'Cheap places have their own good points.' },
        { front: '私なりの方法で、問題を解決してみます。', reading: 'わたしなりのほうほうで、もんだいをかいけつしてみます。', back: "I'll try to solve the problem in my own way." },
        { front: '年を取れば取ったなりに、楽しみ方がある。', reading: 'としをとればとったなりに、たのしみかたがある。', back: 'Growing old brings its own ways of enjoying life.' }
      ]
    },
    {
      key: 'n1d.no-wa-gurai',
      kind: 'grammar',
      title: '～のは～ぐらいのものだ — the only one who… is',
      body: `Plain form + のは + noun + ぐらいのものだ (くらいのものだ) means "the only one who (does X) is Y, Y is about the only one". It singles out a rare exception, often with a slightly ironic or exasperated tone.
  こんな難しい問題が解けるのは、彼ぐらいのものだ。 — "He's about the only one who could solve a problem this hard."
  朝五時に起きているのは、うちの祖父くらいのものだ。 — "My grandfather is about the only one up at five in the morning."

The noun after のは is the doer or thing being singled out; the effect is "practically nobody else". Compare しか～ない (N4): 彼しか解けない states the fact flatly. のは～ぐらいのものだ is softer and more conversational, allowing for a rare exception.`,
      cards: [
        { front: '毎日あの店に通うのは、田中さんぐらいのものだ。', reading: 'まいにちあのみせにかようのは、たなかさんぐらいのものだ。', back: "Tanaka is about the only one who goes to that shop every day." },
        { front: '冬に海で泳ぐのは、あの人たちくらいのものだ。', reading: 'ふゆにうみでおよぐのは、あのひとたちくらいのものだ。', back: 'Those people are about the only ones who swim in the sea in winter.' },
        { front: '彼の冗談で笑うのは、母ぐらいのものだ。', reading: 'かれのじょうだんでわらうのは、ははぐらいのものだ。', back: "My mother is about the only one who laughs at his jokes." },
        { front: 'この町で夜遅くまで開いているのは、コンビニぐらいのものだ。', reading: 'このまちでよるおそくまであいているのは、コンビニぐらいのものだ。', back: "In this town, convenience stores are about the only places open late." },
        { front: '最近、手紙を書くのは年賀状ぐらいのものだ。', reading: 'さいきん、てがみをかくのはねんがじょうぐらいのものだ。', back: 'These days, New Year cards are about the only letters I write.' },
        { front: 'そんな古い歌を知っているのは、私ぐらいのものだろう。', reading: 'そんなふるいうたをしっているのは、わたしぐらいのものだろう。', back: "I'm probably about the only one who knows such an old song." }
      ]
    },
    {
      key: 'n1d.mo-nandemo',
      kind: 'grammar',
      title: '～でもなんでもない・～くもなんともない — not in the least',
      body: `Noun / adjective + でも + なんでもない (くもなんともない for い-adjectives) is an emphatic denial: "not (X) in the least, not at all". It rejects a word someone else used or might assume.
  あんな人、友達でもなんでもない。 — "That person is no friend of mine — nothing of the sort."
  こんな傷、痛くもなんともない。 — "A scratch like this doesn't hurt one bit."

Formation:
・noun / な-adjective + でもなんでもない (好きでもなんでもない)
・い-adjective + くもなんともない (怖くもなんともない)

The tone is often defiant or dismissive. Compare 全然～ない (N4): 全然痛くない is a plain "not at all". 痛くもなんともない pushes back against the suggestion that it might hurt.`,
      cards: [
        { front: 'こんな問題、難しくもなんともない。', reading: 'こんなもんだい、むずかしくもなんともない。', back: "A problem like this isn't hard in the slightest." },
        { front: '彼のことなんか、好きでもなんでもないよ。', reading: 'かれのことなんか、すきでもなんでもないよ。', back: "I don't like him — not one bit." },
        { front: '幽霊なんて、怖くもなんともない。', reading: 'ゆうれいなんて、こわくもなんともない。', back: "Ghosts don't scare me in the least." },
        { front: 'それは秘密でもなんでもない。皆知っている。', reading: 'それはひみつでもなんでもない。みなしっている。', back: "That's no secret at all. Everyone knows." },
        { front: 'こんなの、自慢でもなんでもない。', reading: 'こんなの、じまんでもなんでもない。', back: "This is nothing to brag about at all." },
        { front: '一人で食事をするのは、寂しくもなんともない。', reading: 'ひとりでしょくじをするのは、さびしくもなんともない。', back: "Eating alone doesn't make me lonely in the least." }
      ]
    },
    {
      key: 'n1d.to-ittara',
      kind: 'grammar',
      title: '～といったらない・～といったらありはしない — beyond words',
      body: `Noun / い-adjective + といったらない means "indescribably, beyond words, so (X) it's unbelievable". It stresses an extreme feeling or quality, good or bad.
  頂上から見た景色の美しさといったらない。 — "The view from the summit was beautiful beyond words."
  一人で留守番するのは、心細いといったらない。 — "Staying home alone is unbelievably nerve-racking."

The variants といったらありはしない / といったらありゃしない are spoken and usually express irritation or a strong negative feeling:
  あの人の態度の悪さといったらありゃしない。 — "That person's rudeness is just unbelievable."

Noun forms with さ (美しさ、悔しさ、恥ずかしさ) are common. Compare 限りだ (N1 Grammar III): 限りだ is formal and for feelings; といったらない is more emotional and also describes things outside the speaker.`,
      cards: [
        { front: '初めて優勝した時の嬉しさといったらなかった。', reading: 'はじめてゆうしょうしたときのうれしさといったらなかった。', back: 'The joy of winning for the first time was beyond words.' },
        { front: 'あの時の恥ずかしさといったらない。', reading: 'あのときのはずかしさといったらない。', back: 'I cannot even describe how embarrassing that was.' },
        { front: '真夏の満員電車の暑さといったらない。', reading: 'まなつのまんいんでんしゃのあつさといったらない。', back: 'The heat of a packed train in midsummer is unbelievable.' },
        { front: '彼の部屋の汚さといったらありゃしない。', reading: 'かれのへやのきたなさといったらありゃしない。', back: 'His room is unbelievably filthy.' },
        { front: '毎朝の満員電車は、つらいといったらありはしない。', reading: 'まいあさのまんいんでんしゃは、つらいといったらありはしない。', back: 'The packed train every morning is unbearably tough.' },
        { front: '子供の寝顔の可愛さといったらない。', reading: 'こどものねがおのかわいさといったらない。', back: 'A sleeping child\'s face is unbelievably cute.' }
      ]
    },
    {
      key: 'n1d.tsumori-de',
      kind: 'grammar',
      title: '～つもりで・～たことにする — as if, pretend it happened',
      body: `Two ways to treat something as true when it isn't.

・Verb た-form / noun + の + つもりで — "with the attitude that, as if". You act as though something were so, to motivate yourself or as a mindset.
  死んだつもりで頑張れば、何でもできる。 — "If you push on as if you were already dead, with nothing left to lose, you can do anything."
  旅行に行ったつもりで、その分を貯金した。 — "I saved that money, as if I'd spent it on a trip."
  It can also mean "intending to": 冗談のつもりで言った — "I meant it as a joke."
・Verb た-form + ことにする — "treat it as having happened, pretend that". Often a request: たことにしてください.
  この話は、聞かなかったことにしてください。 — "Please pretend you never heard this."
  今日のミスは、なかったことにしよう。 — "Let's act as though today's mistake never happened."

Compare つもりだ (N4): つもりだ is "I intend to". つもりで / たことにする are about imagining or pretending a state.`,
      cards: [
        { front: '本番のつもりで、練習してください。', reading: 'ほんばんのつもりで、れんしゅうしてください。', back: 'Please practise as if it were the real thing.' },
        { front: '新入社員になったつもりで、一から学び直した。', reading: 'しんにゅうしゃいんになったつもりで、いちからまなびなおした。', back: 'I relearned everything from scratch, as if I were a new employee.' },
        { front: '冗談のつもりで言ったのに、怒らせてしまった。', reading: 'じょうだんのつもりでいったのに、おこらせてしまった。', back: 'I said it as a joke, but I made them angry.' },
        { front: '今の話は、聞かなかったことにしてください。', reading: 'いまのはなしは、きかなかったことにしてください。', back: 'Please pretend you never heard what I just said.' },
        { front: '約束は、なかったことにしよう。', reading: 'やくそくは、なかったことにしよう。', back: "Let's forget the promise was ever made." },
        { front: '私が手伝ったことにしておいて。', reading: 'わたしがてつだったことにしておいて。', back: 'Just say I helped, okay?' }
      ]
    },
    {
      key: 'n1d.to-iuka',
      kind: 'grammar',
      title: '～というか～というか・～のやら～のやら — whether it\'s X or Y',
      body: `Two patterns for things you can't quite pin down.

・A というか B というか — "you could call it A, or maybe B". The speaker searches for the right word; A and B are two attempts at describing one impression.
  彼の行動は、大胆というか無謀というか、とにかく驚いた。 — "His actions were bold, or maybe reckless — anyway, I was amazed."
・A のやら B のやら — "whether A or B, I can't tell". Uncertainty, often with a little exasperation. With a question word: いつまで～のやら (who knows how long…).
  嬉しいのやら悲しいのやら、自分でも分からない。 — "Happy or sad, I can't even tell myself."
  いつになったら終わるのやら。 — "Who knows when it'll ever end."

Compare か～か (N4): 行くか行かないか分からない is a neutral "whether or not". のやら～のやら sounds puzzled and emotional; というか～というか is about finding the right description.`,
      cards: [
        { front: 'あの人は、正直というかばか正直というか、嘘がつけない。', reading: 'あのひとは、しょうじきというかばかしょうじきというか、うそがつけない。', back: "That person is honest — or rather, painfully honest. They just can't lie." },
        { front: '彼女の歌は、上手というか、心に響くというか、特別だ。', reading: 'かのじょのうたは、じょうずというか、こころにひびくというか、とくべつだ。', back: "Her singing is skilful, or maybe moving — anyway, it's special." },
        { front: 'この料理は、甘いというか辛いというか、不思議な味だ。', reading: 'このりょうりは、あまいというかからいというか、ふしぎなあじだ。', back: "This dish is sweet, or maybe spicy — it's a strange flavour." },
        { front: '息子は分かっているのやらいないのやら、返事もしない。', reading: 'むすこはわかっているのやらいないのやら、へんじもしない。', back: "Whether my son understands or not, I can't tell — he doesn't even answer." },
        { front: '雨はいつまで降り続くのやら。', reading: 'あめはいつまでふりつづくのやら。', back: 'Who knows how long this rain will go on.' },
        { front: '彼は何を考えているのやら、さっぱり分からない。', reading: 'かれはなにをかんがえているのやら、さっぱりわからない。', back: "I haven't the faintest idea what he's thinking." }
      ]
    }
  ]
}
