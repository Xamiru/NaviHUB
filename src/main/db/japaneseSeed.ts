import type Database from 'better-sqlite3'

// Starter content for the Japanese learning section, shipped as independent
// packs: the N5 foundations course, an N5 kanji course, and a casual/manga-
// speech course. Each pack is seeded once, guarded by its OWN settings flag
// (existing installs already carry the first flag, so later packs still land),
// and the user can freely edit or delete any of it without it coming back.
//
// Takes the db as a parameter (rather than importing connection.ts) so tests
// can run it against an in-memory database.

interface SeedCard {
  front: string
  reading?: string
  back: string
  pos?: string
  notes?: string
  onyomi?: string
  kunyomi?: string
  exampleJp?: string
  exampleReading?: string
  exampleEn?: string
}

interface SeedLesson {
  kind: 'grammar' | 'vocab' | 'kanji'
  title: string
  body?: string
  cards: SeedCard[]
}

interface SeedCourse {
  title: string
  description: string
  lessons: SeedLesson[]
}

const N5_COURSE: SeedCourse = {
  title: 'JLPT N5 Foundations',
  description:
    'Core beginner grammar and vocabulary, roughly following the JLPT N5 syllabus. ' +
    'Read a lesson, mark it as learned, then practice it in Review and Quiz.',
  lessons: [
    {
      kind: 'vocab',
      title: 'Greetings & set phrases',
      cards: [
        { front: 'おはようございます', back: 'good morning', pos: 'expression' },
        { front: 'こんにちは', back: 'hello / good afternoon', pos: 'expression' },
        { front: 'こんばんは', back: 'good evening', pos: 'expression' },
        { front: 'さようなら', back: 'goodbye', pos: 'expression' },
        { front: 'おやすみなさい', back: 'good night', pos: 'expression' },
        { front: 'ありがとうございます', back: 'thank you', pos: 'expression' },
        { front: 'すみません', back: 'excuse me / sorry', pos: 'expression' },
        { front: 'ごめんなさい', back: 'I am sorry', pos: 'expression' },
        { front: 'はい', back: 'yes', pos: 'expression' },
        { front: 'いいえ', back: 'no', pos: 'expression' },
        { front: 'お願いします', reading: 'おねがいします', back: 'please (requesting)', pos: 'expression' },
        { front: 'はじめまして', back: 'nice to meet you', pos: 'expression' },
        {
          front: 'いただきます',
          back: 'said before eating',
          pos: 'expression',
          notes: 'Literally "I humbly receive".'
        },
        { front: 'ごちそうさまでした', back: 'said after eating', pos: 'expression' },
        { front: 'いってきます', back: "I'm off (leaving home)", pos: 'expression' },
        { front: 'ただいま', back: "I'm home", pos: 'expression' }
      ]
    },
    {
      kind: 'grammar',
      title: 'Topics with は',
      body: `は marks the TOPIC of the sentence — what the sentence is about. Written with the kana は but pronounced "wa" when used as a particle.

Pattern: [topic] は [comment]。

私は学生です。 — "As for me, (I) am a student."

The topic is often dropped entirely once it is clear from context; Japanese prefers to omit what is obvious:

（私は）日本人です。 — "(I) am Japanese."

は is not a subject marker. It sets the frame for the sentence; whatever follows is a statement about that frame. Contrast with が (introduced later), which points at the grammatical subject itself.`,
      cards: [
        { front: '私は学生です。', reading: 'わたしはがくせいです。', back: 'I am a student.' },
        { front: 'これは本です。', reading: 'これはほんです。', back: 'This is a book.' },
        {
          front: '田中さんは先生です。',
          reading: 'たなかさんはせんせいです。',
          back: 'Mr. Tanaka is a teacher.'
        }
      ]
    },
    {
      kind: 'grammar',
      title: 'です / だ — polite and plain',
      body: `です is the polite copula — "is / am / are". Its plain (casual) form is だ.

X は Y です。 — polite: "X is Y."
X は Y だ。 — plain: "X is Y."

Use です with strangers, teachers, and in most learning materials. Plain だ appears in casual speech, diaries and inner monologue — and is often dropped altogether:

これはペンです。 → これ、ペン(だ)。

Negative and past of です:
・じゃないです / ではありません — "is not"
・でした — "was"
・じゃなかったです / ではありませんでした — "was not"`,
      cards: [
        { front: '私は元気です。', reading: 'わたしはげんきです。', back: 'I am fine.' },
        { front: 'それは犬だ。', reading: 'それはいぬだ。', back: 'That is a dog. (plain)' },
        {
          front: '山田さんは医者ではありません。',
          reading: 'やまださんはいしゃではありません。',
          back: 'Ms. Yamada is not a doctor.'
        }
      ]
    },
    {
      kind: 'vocab',
      title: 'People & family',
      cards: [
        { front: '人', reading: 'ひと', back: 'person', pos: 'noun' },
        { front: '男', reading: 'おとこ', back: 'man', pos: 'noun' },
        { front: '女', reading: 'おんな', back: 'woman', pos: 'noun' },
        { front: '子供', reading: 'こども', back: 'child', pos: 'noun' },
        { front: '友達', reading: 'ともだち', back: 'friend', pos: 'noun' },
        { front: '家族', reading: 'かぞく', back: 'family', pos: 'noun' },
        { front: '父', reading: 'ちち', back: '(my) father', pos: 'noun' },
        { front: '母', reading: 'はは', back: '(my) mother', pos: 'noun' },
        { front: 'お父さん', reading: 'おとうさん', back: "father (someone's / addressing)", pos: 'noun' },
        { front: 'お母さん', reading: 'おかあさん', back: "mother (someone's / addressing)", pos: 'noun' },
        { front: '兄', reading: 'あに', back: '(my) older brother', pos: 'noun' },
        { front: '姉', reading: 'あね', back: '(my) older sister', pos: 'noun' },
        { front: '弟', reading: 'おとうと', back: 'younger brother', pos: 'noun' },
        { front: '妹', reading: 'いもうと', back: 'younger sister', pos: 'noun' },
        { front: '先生', reading: 'せんせい', back: 'teacher', pos: 'noun' },
        { front: '学生', reading: 'がくせい', back: 'student', pos: 'noun' }
      ]
    },
    {
      kind: 'grammar',
      title: 'Questions with か and question words',
      body: `Add か to the end of a statement to turn it into a question — no word-order change, and no question mark needed:

これは本です。 → これは本ですか。 — "Is this a book?"

Common question words:
・何（なに／なん） — what
・誰（だれ） — who
・どこ — where
・いつ — when
・どれ — which one
・いくら — how much

The question word simply sits where the answer would go:

トイレはどこですか。 — "Where is the toilet?"
それはいくらですか。 — "How much is that?"`,
      cards: [
        { front: 'これは何ですか。', reading: 'これはなんですか。', back: 'What is this?' },
        { front: 'トイレはどこですか。', reading: 'トイレはどこですか。', back: 'Where is the toilet?' },
        { front: 'あの人は誰ですか。', reading: 'あのひとはだれですか。', back: 'Who is that person?' }
      ]
    },
    {
      kind: 'vocab',
      title: 'Numbers & time',
      cards: [
        { front: '一', reading: 'いち', back: 'one', pos: 'number' },
        { front: '二', reading: 'に', back: 'two', pos: 'number' },
        { front: '三', reading: 'さん', back: 'three', pos: 'number' },
        { front: '四', reading: 'よん', back: 'four', pos: 'number' },
        { front: '五', reading: 'ご', back: 'five', pos: 'number' },
        { front: '六', reading: 'ろく', back: 'six', pos: 'number' },
        { front: '七', reading: 'なな', back: 'seven', pos: 'number' },
        { front: '八', reading: 'はち', back: 'eight', pos: 'number' },
        { front: '九', reading: 'きゅう', back: 'nine', pos: 'number' },
        { front: '十', reading: 'じゅう', back: 'ten', pos: 'number' },
        { front: '百', reading: 'ひゃく', back: 'hundred', pos: 'number' },
        { front: '千', reading: 'せん', back: 'thousand', pos: 'number' },
        { front: '今日', reading: 'きょう', back: 'today', pos: 'noun' },
        { front: '明日', reading: 'あした', back: 'tomorrow', pos: 'noun' },
        { front: '昨日', reading: 'きのう', back: 'yesterday', pos: 'noun' },
        { front: '今', reading: 'いま', back: 'now', pos: 'noun' },
        { front: '時間', reading: 'じかん', back: 'time; hour', pos: 'noun' }
      ]
    },
    {
      kind: 'grammar',
      title: 'Verb groups and the ます form',
      body: `Japanese verbs come in three groups. Dictionary form ends in -u; the polite ます form is what you'll use most at first.

Group 1 (u-verbs): the final -u column changes to -i, then ます.
・飲む → 飲みます (drink)　・書く → 書きます (write)　・話す → 話します (speak)

Group 2 (ru-verbs): drop る, add ます.
・食べる → 食べます (eat)　・見る → 見ます (see)

Group 3 (irregular — only two):
・する → します (do)　・来る（くる） → 来ます（きます） (come)

ます covers present AND future: 飲みます = "drink / will drink". Time words like 毎日 (every day) or 明日 (tomorrow) make it clear which.`,
      cards: [
        { front: '毎日水を飲みます。', reading: 'まいにちみずをのみます。', back: 'I drink water every day.' },
        { front: '七時に起きます。', reading: 'しちじにおきます。', back: 'I get up at seven.' },
        {
          front: '日本語を勉強します。',
          reading: 'にほんごをべんきょうします。',
          back: 'I study Japanese.'
        }
      ]
    },
    {
      kind: 'vocab',
      title: 'Everyday verbs I',
      cards: [
        { front: '行く', reading: 'いく', back: 'to go', pos: 'verb (u)' },
        { front: '来る', reading: 'くる', back: 'to come', pos: 'verb (irregular)' },
        { front: '帰る', reading: 'かえる', back: 'to return home', pos: 'verb (u)' },
        { front: '食べる', reading: 'たべる', back: 'to eat', pos: 'verb (ru)' },
        { front: '飲む', reading: 'のむ', back: 'to drink', pos: 'verb (u)' },
        { front: '見る', reading: 'みる', back: 'to see; to watch', pos: 'verb (ru)' },
        { front: '聞く', reading: 'きく', back: 'to listen; to ask', pos: 'verb (u)' },
        { front: '読む', reading: 'よむ', back: 'to read', pos: 'verb (u)' },
        { front: '書く', reading: 'かく', back: 'to write', pos: 'verb (u)' },
        { front: '話す', reading: 'はなす', back: 'to speak', pos: 'verb (u)' },
        { front: '買う', reading: 'かう', back: 'to buy', pos: 'verb (u)' },
        { front: '会う', reading: 'あう', back: 'to meet', pos: 'verb (u)' },
        { front: '起きる', reading: 'おきる', back: 'to get up; to wake', pos: 'verb (ru)' },
        { front: '寝る', reading: 'ねる', back: 'to sleep; to go to bed', pos: 'verb (ru)' },
        { front: '立つ', reading: 'たつ', back: 'to stand', pos: 'verb (u)' },
        { front: '座る', reading: 'すわる', back: 'to sit', pos: 'verb (u)' }
      ]
    },
    {
      kind: 'grammar',
      title: 'Objects and targets: を and に',
      body: `を marks the DIRECT OBJECT — the thing the action is done to. As a particle it is pronounced "o".

パンを食べます。 — "(I) eat bread."

に marks a TARGET or POINT: destinations, specific times, and the receiver of an action.

・destination: 学校に行きます。 — "go to school"
・time: 七時に起きます。 — "get up at seven"
・receiver: 友達に手紙を書きます。 — "write a letter to a friend"

A sentence can use both at once: [receiver]に [object]を [verb].`,
      cards: [
        { front: 'パンを食べます。', reading: 'パンをたべます。', back: 'I eat bread.' },
        { front: '学校に行きます。', reading: 'がっこうにいきます。', back: 'I go to school.' },
        {
          front: '友達に手紙を書きます。',
          reading: 'ともだちにてがみをかきます。',
          back: 'I write a letter to my friend.'
        }
      ]
    },
    {
      kind: 'vocab',
      title: 'Places & directions',
      cards: [
        { front: '家', reading: 'いえ', back: 'house; home', pos: 'noun' },
        { front: '学校', reading: 'がっこう', back: 'school', pos: 'noun' },
        { front: '駅', reading: 'えき', back: 'station', pos: 'noun' },
        { front: '銀行', reading: 'ぎんこう', back: 'bank', pos: 'noun' },
        { front: '病院', reading: 'びょういん', back: 'hospital', pos: 'noun' },
        { front: '図書館', reading: 'としょかん', back: 'library', pos: 'noun' },
        { front: '公園', reading: 'こうえん', back: 'park', pos: 'noun' },
        { front: '店', reading: 'みせ', back: 'shop', pos: 'noun' },
        { front: 'レストラン', back: 'restaurant', pos: 'noun' },
        { front: 'トイレ', back: 'toilet', pos: 'noun' },
        { front: '上', reading: 'うえ', back: 'up; above; on top', pos: 'noun' },
        { front: '下', reading: 'した', back: 'down; below; under', pos: 'noun' },
        { front: '中', reading: 'なか', back: 'inside; middle', pos: 'noun' },
        { front: '外', reading: 'そと', back: 'outside', pos: 'noun' },
        { front: '右', reading: 'みぎ', back: 'right (side)', pos: 'noun' },
        { front: '左', reading: 'ひだり', back: 'left (side)', pos: 'noun' }
      ]
    },
    {
      kind: 'grammar',
      title: 'Location and direction: で and へ',
      body: `で marks WHERE an action happens:

図書館で勉強します。 — "(I) study at the library."

Compare with に, which marks where something exists or arrives. Rough rule: action happening at a place → で; existence at / movement to a place → に.

へ marks DIRECTION of movement, much like に for destinations. As a particle it is pronounced "e". With motion verbs the two are nearly interchangeable:

日本へ行きます。 ≈ 日本に行きます。 — "go to Japan"

で also marks the MEANS of doing something: バスで行きます — "go by bus"; 日本語で話します — "speak in Japanese".`,
      cards: [
        {
          front: '図書館で勉強します。',
          reading: 'としょかんでべんきょうします。',
          back: 'I study at the library.'
        },
        { front: '日本へ行きたいです。', reading: 'にほんへいきたいです。', back: 'I want to go to Japan.' },
        { front: 'バスで駅へ行きます。', reading: 'バスでえきへいきます。', back: 'I go to the station by bus.' }
      ]
    },
    {
      kind: 'grammar',
      title: 'Negative and past: ません / ました / ませんでした',
      body: `The ます ending conjugates for polarity and tense — the verb itself doesn't change further:

・食べます — eat / will eat
・食べません — don't / won't eat
・食べました — ate
・食べませんでした — didn't eat

That's the whole polite system: swap the ending, done.

Time words usually pin down the tense: 昨日 (yesterday) + ました, 明日 (tomorrow) + ます.`,
      cards: [
        { front: '肉を食べません。', reading: 'にくをたべません。', back: "I don't eat meat." },
        { front: '昨日映画を見ました。', reading: 'きのうえいがをみました。', back: 'I watched a movie yesterday.' },
        {
          front: '今朝コーヒーを飲みませんでした。',
          reading: 'けさコーヒーをのみませんでした。',
          back: "I didn't drink coffee this morning."
        }
      ]
    },
    {
      kind: 'vocab',
      title: 'Food & drink',
      cards: [
        { front: '水', reading: 'みず', back: 'water', pos: 'noun' },
        { front: 'お茶', reading: 'おちゃ', back: 'tea', pos: 'noun' },
        { front: 'コーヒー', back: 'coffee', pos: 'noun' },
        { front: '牛乳', reading: 'ぎゅうにゅう', back: 'milk', pos: 'noun' },
        { front: 'ご飯', reading: 'ごはん', back: 'rice; meal', pos: 'noun' },
        { front: 'パン', back: 'bread', pos: 'noun' },
        { front: '肉', reading: 'にく', back: 'meat', pos: 'noun' },
        { front: '魚', reading: 'さかな', back: 'fish', pos: 'noun' },
        { front: '野菜', reading: 'やさい', back: 'vegetables', pos: 'noun' },
        { front: '果物', reading: 'くだもの', back: 'fruit', pos: 'noun' },
        { front: '卵', reading: 'たまご', back: 'egg', pos: 'noun' },
        { front: '寿司', reading: 'すし', back: 'sushi', pos: 'noun' },
        { front: 'お酒', reading: 'おさけ', back: 'alcohol; sake', pos: 'noun' },
        { front: '朝ご飯', reading: 'あさごはん', back: 'breakfast', pos: 'noun' },
        { front: '昼ご飯', reading: 'ひるごはん', back: 'lunch', pos: 'noun' },
        { front: '晩ご飯', reading: 'ばんごはん', back: 'dinner', pos: 'noun' }
      ]
    },
    {
      kind: 'grammar',
      title: 'い-adjectives',
      body: `い-adjectives end in い and conjugate by themselves — no です needed for the grammar, though polite speech adds です anyway:

・高い — is expensive / tall
・高くない — is not expensive
・高かった — was expensive
・高くなかった — was not expensive

Before a noun they attach directly: 高い山 — "a tall mountain".

Watch out: いい (good) conjugates from its older form よい → よくない, よかった, よくなかった.`,
      cards: [
        { front: 'この本は面白いです。', reading: 'このほんはおもしろいです。', back: 'This book is interesting.' },
        { front: '今日は暑いです。', reading: 'きょうはあついです。', back: 'It is hot today.' },
        {
          front: 'その映画は面白くなかったです。',
          reading: 'そのえいがはおもしろくなかったです。',
          back: 'That movie was not interesting.'
        }
      ]
    },
    {
      kind: 'vocab',
      title: 'Core adjectives',
      cards: [
        { front: '大きい', reading: 'おおきい', back: 'big', pos: 'i-adjective' },
        { front: '小さい', reading: 'ちいさい', back: 'small', pos: 'i-adjective' },
        { front: '新しい', reading: 'あたらしい', back: 'new', pos: 'i-adjective' },
        { front: '古い', reading: 'ふるい', back: 'old (things)', pos: 'i-adjective' },
        { front: '高い', reading: 'たかい', back: 'tall; expensive', pos: 'i-adjective' },
        { front: '安い', reading: 'やすい', back: 'cheap', pos: 'i-adjective' },
        { front: 'いい', back: 'good', pos: 'i-adjective', notes: 'Conjugates from よい: よくない, よかった.' },
        { front: '悪い', reading: 'わるい', back: 'bad', pos: 'i-adjective' },
        { front: '暑い', reading: 'あつい', back: 'hot (weather)', pos: 'i-adjective' },
        { front: '寒い', reading: 'さむい', back: 'cold (weather)', pos: 'i-adjective' },
        { front: '面白い', reading: 'おもしろい', back: 'interesting; funny', pos: 'i-adjective' },
        { front: '美味しい', reading: 'おいしい', back: 'delicious', pos: 'i-adjective' },
        { front: '難しい', reading: 'むずかしい', back: 'difficult', pos: 'i-adjective' },
        { front: '簡単', reading: 'かんたん', back: 'easy; simple', pos: 'na-adjective' },
        { front: '静か', reading: 'しずか', back: 'quiet', pos: 'na-adjective' },
        { front: '元気', reading: 'げんき', back: 'healthy; energetic', pos: 'na-adjective' },
        { front: '好き', reading: 'すき', back: 'liked; favorite', pos: 'na-adjective' }
      ]
    },
    {
      kind: 'grammar',
      title: 'な-adjectives and possessive の',
      body: `な-adjectives behave like nouns: they need な before a noun and です／だ to end a sentence.

・静かです。 — "It is quiet."
・静かな町 — "a quiet town" (な appears only before a noun)
・静かじゃないです — "is not quiet"　・静かでした — "was quiet"

好き (like) and 嫌い (dislike) are な-adjectives, and what you like takes が:
私は犬が好きです。 — "I like dogs."

の links two nouns, most often as the possessive:
・私の傘 — "my umbrella"
・日本語の本 — "a Japanese(-language) book"`,
      cards: [
        { front: 'ここは静かな公園です。', reading: 'ここはしずかなこうえんです。', back: 'This is a quiet park.' },
        { front: '私は犬が好きです。', reading: 'わたしはいぬがすきです。', back: 'I like dogs.' },
        { front: 'これは私の傘です。', reading: 'これはわたしのかさです。', back: 'This is my umbrella.' }
      ]
    },
    {
      kind: 'grammar',
      title: 'て-form and てください',
      body: `The て-form connects verbs to other words and chains actions. Formation from the ます-stem:

Group 1 (u-verbs) by final sound:
・う・つ・る → って（買う→買って、待つ→待って）
・む・ぶ・ぬ → んで（飲む→飲んで、遊ぶ→遊んで）
・く → いて（書く→書いて）／ ぐ → いで（泳ぐ→泳いで）
・す → して（話す→話して）
・exception: 行く→行って

Group 2 (ru-verbs): る → て（食べる→食べて）
Group 3: する→して、来る→来て（きて）

Two everyday uses:
・requests: てください — 待ってください "please wait"
・chaining: 朝ご飯を食べて、学校に行きます — "eat breakfast, then go to school"`,
      cards: [
        { front: 'ちょっと待ってください。', reading: 'ちょっとまってください。', back: 'Please wait a moment.' },
        { front: '窓を開けてください。', reading: 'まどをあけてください。', back: 'Please open the window.' },
        {
          front: '朝ご飯を食べて、学校に行きます。',
          reading: 'あさごはんをたべて、がっこうにいきます。',
          back: 'I eat breakfast and then go to school.'
        }
      ]
    },
    {
      kind: 'vocab',
      title: 'Everyday verbs II',
      cards: [
        { front: 'する', back: 'to do', pos: 'verb (irregular)' },
        { front: '勉強する', reading: 'べんきょうする', back: 'to study', pos: 'verb (irregular)' },
        { front: '働く', reading: 'はたらく', back: 'to work', pos: 'verb (u)' },
        { front: '休む', reading: 'やすむ', back: 'to rest; to take a day off', pos: 'verb (u)' },
        { front: '作る', reading: 'つくる', back: 'to make', pos: 'verb (u)' },
        { front: '使う', reading: 'つかう', back: 'to use', pos: 'verb (u)' },
        { front: '待つ', reading: 'まつ', back: 'to wait', pos: 'verb (u)' },
        { front: '歩く', reading: 'あるく', back: 'to walk', pos: 'verb (u)' },
        { front: '走る', reading: 'はしる', back: 'to run', pos: 'verb (u)' },
        { front: '泳ぐ', reading: 'およぐ', back: 'to swim', pos: 'verb (u)' },
        { front: '教える', reading: 'おしえる', back: 'to teach; to tell', pos: 'verb (ru)' },
        { front: '分かる', reading: 'わかる', back: 'to understand', pos: 'verb (u)' },
        { front: '知る', reading: 'しる', back: 'to know', pos: 'verb (u)' },
        { front: '入る', reading: 'はいる', back: 'to enter', pos: 'verb (u)' },
        { front: '出る', reading: 'でる', back: 'to exit; to leave', pos: 'verb (ru)' },
        { front: '遊ぶ', reading: 'あそぶ', back: 'to play; to hang out', pos: 'verb (u)' }
      ]
    },
    {
      kind: 'grammar',
      title: 'Existence: います / あります and counters',
      body: `Two verbs mean "there is / to exist":

・います — living things (people, animals)
・あります — inanimate things (objects, plants, events)

The thing that exists takes が; the location takes に:

机の上に本があります。 — "There is a book on the desk."
公園に子供がいます。 — "There are children in the park."

Counting uses COUNTERS matched to the thing's shape or type:
・〜人（にん） people: 一人（ひとり）、二人（ふたり）、三人（さんにん）…
・〜匹（ひき） small animals: 一匹（いっぴき）、二匹（にひき）、三匹（さんびき）…
・〜つ generic: 一つ（ひとつ）、二つ（ふたつ）、三つ（みっつ）…

The counter usually sits right before the verb: 猫が二匹います。`,
      cards: [
        {
          front: '机の上に本があります。',
          reading: 'つくえのうえにほんがあります。',
          back: 'There is a book on the desk.'
        },
        {
          front: '公園に子供が三人います。',
          reading: 'こうえんにこどもがさんにんいます。',
          back: 'There are three children in the park.'
        },
        { front: '猫が二匹います。', reading: 'ねこがにひきいます。', back: 'There are two cats.' }
      ]
    },
    {
      kind: 'vocab',
      title: 'Daily life & objects',
      cards: [
        { front: '本', reading: 'ほん', back: 'book', pos: 'noun' },
        { front: 'ペン', back: 'pen', pos: 'noun' },
        { front: '机', reading: 'つくえ', back: 'desk', pos: 'noun' },
        { front: '椅子', reading: 'いす', back: 'chair', pos: 'noun' },
        { front: '車', reading: 'くるま', back: 'car', pos: 'noun' },
        { front: '電車', reading: 'でんしゃ', back: 'train', pos: 'noun' },
        { front: '自転車', reading: 'じてんしゃ', back: 'bicycle', pos: 'noun' },
        { front: '電話', reading: 'でんわ', back: 'telephone', pos: 'noun' },
        { front: '時計', reading: 'とけい', back: 'clock; watch', pos: 'noun' },
        { front: '傘', reading: 'かさ', back: 'umbrella', pos: 'noun' },
        { front: '鞄', reading: 'かばん', back: 'bag', pos: 'noun' },
        { front: '服', reading: 'ふく', back: 'clothes', pos: 'noun' },
        { front: '靴', reading: 'くつ', back: 'shoes', pos: 'noun' },
        { front: 'お金', reading: 'おかね', back: 'money', pos: 'noun' },
        { front: '映画', reading: 'えいが', back: 'movie', pos: 'noun' },
        { front: '音楽', reading: 'おんがく', back: 'music', pos: 'noun' },
        { front: '天気', reading: 'てんき', back: 'weather', pos: 'noun' }
      ]
    },
    {
      kind: 'grammar',
      title: 'Connecting: と, も and the plain past た-form',
      body: `と joins nouns — a closed "and" list (only nouns, all items named):

犬と猫 — "dogs and cats"

も means "also / too" and REPLACES は・が・を:

私も行きます。 — "I will go too."
寿司も食べました。 — "(I) ate sushi too."

The plain past た-form is the casual counterpart of ました. Make it from the て-form by swapping て→た（で→だ）:

食べて→食べた　飲んで→飲んだ　行って→行った

昨日寿司を食べた。 — "(I) ate sushi yesterday." (casual)

The た-form also appears inside larger patterns later (たことがある "have done before"), so it's worth knowing early.`,
      cards: [
        { front: '犬と猫が好きです。', reading: 'いぬとねこがすきです。', back: 'I like dogs and cats.' },
        { front: '私も行きます。', reading: 'わたしもいきます。', back: 'I will go too.' },
        { front: '昨日寿司を食べた。', reading: 'きのうすしをたべた。', back: 'I ate sushi yesterday. (casual)' }
      ]
    }
  ]
}

// Kanji cards: front = the character, reading = its most common reading,
// back = meaning, onyomi/kunyomi = comma-separated readings (kun readings show
// okurigana in parentheses), example_* = one common word using the kanji.
const N5_KANJI_COURSE: SeedCourse = {
  title: 'JLPT N5 Kanji',
  description:
    'The ~100 kanji of JLPT N5, grouped by theme. Recognizing these (plus your vocab) ' +
    'is the first big step toward reading manga and visual novels without furigana.',
  lessons: [
    {
      kind: 'kanji',
      title: 'Numbers & time',
      cards: [
        { front: '一', reading: 'いち', back: 'one', onyomi: 'イチ', kunyomi: 'ひと(つ)', exampleJp: '一つ', exampleReading: 'ひとつ', exampleEn: 'one (thing)' },
        { front: '二', reading: 'に', back: 'two', onyomi: 'ニ', kunyomi: 'ふた(つ)', exampleJp: '二人', exampleReading: 'ふたり', exampleEn: 'two people' },
        { front: '三', reading: 'さん', back: 'three', onyomi: 'サン', kunyomi: 'みっ(つ)', exampleJp: '三月', exampleReading: 'さんがつ', exampleEn: 'March' },
        { front: '四', reading: 'よん', back: 'four', onyomi: 'シ', kunyomi: 'よん, よっ(つ)', exampleJp: '四時', exampleReading: 'よじ', exampleEn: "four o'clock" },
        { front: '五', reading: 'ご', back: 'five', onyomi: 'ゴ', kunyomi: 'いつ(つ)', exampleJp: '五分', exampleReading: 'ごふん', exampleEn: 'five minutes' },
        { front: '六', reading: 'ろく', back: 'six', onyomi: 'ロク', kunyomi: 'むっ(つ)', exampleJp: '六百', exampleReading: 'ろっぴゃく', exampleEn: 'six hundred' },
        { front: '七', reading: 'なな', back: 'seven', onyomi: 'シチ', kunyomi: 'なな(つ)', exampleJp: '七時', exampleReading: 'しちじ', exampleEn: "seven o'clock" },
        { front: '八', reading:'はち', back: 'eight', onyomi: 'ハチ', kunyomi: 'やっ(つ)', exampleJp: '八月', exampleReading: 'はちがつ', exampleEn: 'August' },
        { front: '九', reading: 'きゅう', back: 'nine', onyomi: 'キュウ, ク', kunyomi: 'ここの(つ)', exampleJp: '九時', exampleReading: 'くじ', exampleEn: "nine o'clock" },
        { front: '十', reading: 'じゅう', back: 'ten', onyomi: 'ジュウ', kunyomi: 'とお', exampleJp: '十日', exampleReading: 'とおか', exampleEn: 'the 10th (of the month)' },
        { front: '百', reading: 'ひゃく', back: 'hundred', onyomi: 'ヒャク', exampleJp: '三百', exampleReading: 'さんびゃく', exampleEn: 'three hundred' },
        { front: '千', reading: 'せん', back: 'thousand', onyomi: 'セン', kunyomi: 'ち', exampleJp: '千円', exampleReading: 'せんえん', exampleEn: '1,000 yen' },
        { front: '万', reading: 'まん', back: 'ten thousand', onyomi: 'マン, バン', exampleJp: '一万', exampleReading: 'いちまん', exampleEn: 'ten thousand' },
        { front: '円', reading: 'えん', back: 'yen; circle', onyomi: 'エン', kunyomi: 'まる(い)', exampleJp: '百円', exampleReading: 'ひゃくえん', exampleEn: '100 yen' },
        { front: '年', reading: 'とし', back: 'year', onyomi: 'ネン', kunyomi: 'とし', exampleJp: '今年', exampleReading: 'ことし', exampleEn: 'this year' },
        { front: '月', reading: 'つき', back: 'month; moon', onyomi: 'ゲツ, ガツ', kunyomi: 'つき', exampleJp: '月曜日', exampleReading: 'げつようび', exampleEn: 'Monday' },
        { front: '日', reading: 'ひ', back: 'day; sun', onyomi: 'ニチ, ジツ', kunyomi: 'ひ, か', exampleJp: '日本', exampleReading: 'にほん', exampleEn: 'Japan' },
        { front: '時', reading: 'じ', back: 'time; hour', onyomi: 'ジ', kunyomi: 'とき', exampleJp: '時間', exampleReading: 'じかん', exampleEn: 'time' },
        { front: '分', reading: 'ふん', back: 'minute; part', onyomi: 'フン, ブン', kunyomi: 'わ(かる)', exampleJp: '半分', exampleReading: 'はんぶん', exampleEn: 'half' },
        { front: '週', reading: 'しゅう', back: 'week', onyomi: 'シュウ', exampleJp: '先週', exampleReading: 'せんしゅう', exampleEn: 'last week' },
        { front: '今', reading: 'いま', back: 'now', onyomi: 'コン', kunyomi: 'いま', exampleJp: '今日', exampleReading: 'きょう', exampleEn: 'today' }
      ]
    },
    {
      kind: 'kanji',
      title: 'People & body',
      cards: [
        { front: '人', reading: 'ひと', back: 'person', onyomi: 'ジン, ニン', kunyomi: 'ひと', exampleJp: '日本人', exampleReading: 'にほんじん', exampleEn: 'Japanese person' },
        { front: '男', reading: 'おとこ', back: 'man; male', onyomi: 'ダン', kunyomi: 'おとこ', exampleJp: '男の子', exampleReading: 'おとこのこ', exampleEn: 'boy' },
        { front: '女', reading: 'おんな', back: 'woman; female', onyomi: 'ジョ', kunyomi: 'おんな', exampleJp: '女の人', exampleReading: 'おんなのひと', exampleEn: 'woman' },
        { front: '子', reading: 'こ', back: 'child', onyomi: 'シ', kunyomi: 'こ', exampleJp: '子供', exampleReading: 'こども', exampleEn: 'child' },
        { front: '父', reading: 'ちち', back: 'father', onyomi: 'フ', kunyomi: 'ちち', exampleJp: 'お父さん', exampleReading: 'おとうさん', exampleEn: 'father' },
        { front: '母', reading: 'はは', back: 'mother', onyomi: 'ボ', kunyomi: 'はは', exampleJp: 'お母さん', exampleReading: 'おかあさん', exampleEn: 'mother' },
        { front: '友', reading: 'とも', back: 'friend', onyomi: 'ユウ', kunyomi: 'とも', exampleJp: '友達', exampleReading: 'ともだち', exampleEn: 'friend' },
        { front: '先', reading: 'さき', back: 'ahead; previous', onyomi: 'セン', kunyomi: 'さき', exampleJp: '先生', exampleReading: 'せんせい', exampleEn: 'teacher' },
        { front: '生', reading: 'せい', back: 'life; birth; raw', onyomi: 'セイ, ショウ', kunyomi: 'い(きる), う(まれる), なま', exampleJp: '学生', exampleReading: 'がくせい', exampleEn: 'student' },
        { front: '名', reading: 'な', back: 'name', onyomi: 'メイ', kunyomi: 'な', exampleJp: '名前', exampleReading: 'なまえ', exampleEn: 'name' },
        { front: '手', reading: 'て', back: 'hand', onyomi: 'シュ', kunyomi: 'て', exampleJp: '手紙', exampleReading: 'てがみ', exampleEn: 'letter' },
        { front: '足', reading: 'あし', back: 'foot; leg; to suffice', onyomi: 'ソク', kunyomi: 'あし, た(りる)', exampleJp: '足りる', exampleReading: 'たりる', exampleEn: 'to be enough' },
        { front: '目', reading: 'め', back: 'eye', onyomi: 'モク', kunyomi: 'め', exampleJp: '目がいい', exampleReading: 'めがいい', exampleEn: 'to have good eyesight' },
        { front: '口', reading: 'くち', back: 'mouth', onyomi: 'コウ', kunyomi: 'くち', exampleJp: '入り口', exampleReading: 'いりぐち', exampleEn: 'entrance' },
        { front: '耳', reading: 'みみ', back: 'ear', onyomi: 'ジ', kunyomi: 'みみ', exampleJp: '耳が遠い', exampleReading: 'みみがとおい', exampleEn: 'hard of hearing' }
      ]
    },
    {
      kind: 'kanji',
      title: 'Places & nature',
      cards: [
        { front: '山', reading: 'やま', back: 'mountain', onyomi: 'サン', kunyomi: 'やま', exampleJp: '富士山', exampleReading: 'ふじさん', exampleEn: 'Mt. Fuji' },
        { front: '川', reading: 'かわ', back: 'river', onyomi: 'セン', kunyomi: 'かわ', exampleJp: '川で泳ぐ', exampleReading: 'かわでおよぐ', exampleEn: 'to swim in the river' },
        { front: '田', reading: 'た', back: 'rice field', onyomi: 'デン', kunyomi: 'た', exampleJp: '田中さん', exampleReading: 'たなかさん', exampleEn: 'Mr./Ms. Tanaka' },
        { front: '空', reading: 'そら', back: 'sky; empty', onyomi: 'クウ', kunyomi: 'そら, あ(く)', exampleJp: '空港', exampleReading: 'くうこう', exampleEn: 'airport' },
        { front: '天', reading: 'てん', back: 'heaven; sky', onyomi: 'テン', exampleJp: '天気', exampleReading: 'てんき', exampleEn: 'weather' },
        { front: '気', reading: 'き', back: 'spirit; energy; mood', onyomi: 'キ, ケ', exampleJp: '元気', exampleReading: 'げんき', exampleEn: 'healthy; energetic' },
        { front: '雨', reading: 'あめ', back: 'rain', onyomi: 'ウ', kunyomi: 'あめ', exampleJp: '大雨', exampleReading: 'おおあめ', exampleEn: 'heavy rain' },
        { front: '電', reading: 'でん', back: 'electricity', onyomi: 'デン', exampleJp: '電気', exampleReading: 'でんき', exampleEn: 'electricity; light' },
        { front: '車', reading: 'くるま', back: 'car; vehicle', onyomi: 'シャ', kunyomi: 'くるま', exampleJp: '電車', exampleReading: 'でんしゃ', exampleEn: 'train' },
        { front: '駅', reading: 'えき', back: 'station', onyomi: 'エキ', exampleJp: '駅前', exampleReading: 'えきまえ', exampleEn: 'in front of the station' },
        { front: '道', reading: 'みち', back: 'road; way', onyomi: 'ドウ', kunyomi: 'みち', exampleJp: '道を渡る', exampleReading: 'みちをわたる', exampleEn: 'to cross the street' },
        { front: '国', reading: 'くに', back: 'country', onyomi: 'コク', kunyomi: 'くに', exampleJp: '外国', exampleReading: 'がいこく', exampleEn: 'foreign country' },
        { front: '外', reading: 'そと', back: 'outside', onyomi: 'ガイ', kunyomi: 'そと', exampleJp: '外国人', exampleReading: 'がいこくじん', exampleEn: 'foreigner' },
        { front: '店', reading: 'みせ', back: 'shop', onyomi: 'テン', kunyomi: 'みせ', exampleJp: '喫茶店', exampleReading: 'きっさてん', exampleEn: 'café' },
        { front: '学', reading: 'がく', back: 'study; learning', onyomi: 'ガク', kunyomi: 'まな(ぶ)', exampleJp: '学校', exampleReading: 'がっこう', exampleEn: 'school' },
        { front: '校', reading: 'こう', back: 'school', onyomi: 'コウ', exampleJp: '高校', exampleReading: 'こうこう', exampleEn: 'high school' },
        { front: '会', reading: 'かい', back: 'meeting; to meet', onyomi: 'カイ', kunyomi: 'あ(う)', exampleJp: '会社', exampleReading: 'かいしゃ', exampleEn: 'company' },
        { front: '社', reading: 'しゃ', back: 'company; shrine', onyomi: 'シャ', kunyomi: 'やしろ', exampleJp: '社長', exampleReading: 'しゃちょう', exampleEn: 'company president' }
      ]
    },
    {
      kind: 'kanji',
      title: 'Verbs & actions',
      cards: [
        { front: '行', reading: 'い(く)', back: 'to go', onyomi: 'コウ, ギョウ', kunyomi: 'い(く), おこな(う)', exampleJp: '銀行', exampleReading: 'ぎんこう', exampleEn: 'bank' },
        { front: '来', reading: 'く(る)', back: 'to come', onyomi: 'ライ', kunyomi: 'く(る)', exampleJp: '来週', exampleReading: 'らいしゅう', exampleEn: 'next week' },
        { front: '見', reading: 'み(る)', back: 'to see; to look', onyomi: 'ケン', kunyomi: 'み(る), み(せる)', exampleJp: '見せる', exampleReading: 'みせる', exampleEn: 'to show' },
        { front: '聞', reading: 'き(く)', back: 'to hear; to ask', onyomi: 'ブン', kunyomi: 'き(く)', exampleJp: '新聞', exampleReading: 'しんぶん', exampleEn: 'newspaper' },
        { front: '読', reading: 'よ(む)', back: 'to read', onyomi: 'ドク', kunyomi: 'よ(む)', exampleJp: '読書', exampleReading: 'どくしょ', exampleEn: 'reading (books)' },
        { front: '書', reading: 'か(く)', back: 'to write', onyomi: 'ショ', kunyomi: 'か(く)', exampleJp: '辞書', exampleReading: 'じしょ', exampleEn: 'dictionary' },
        { front: '話', reading: 'はな(す)', back: 'to speak; story', onyomi: 'ワ', kunyomi: 'はな(す), はなし', exampleJp: '電話', exampleReading: 'でんわ', exampleEn: 'telephone' },
        { front: '買', reading: 'か(う)', back: 'to buy', onyomi: 'バイ', kunyomi: 'か(う)', exampleJp: '買い物', exampleReading: 'かいもの', exampleEn: 'shopping' },
        { front: '食', reading: 'た(べる)', back: 'to eat; food', onyomi: 'ショク', kunyomi: 'た(べる)', exampleJp: '食堂', exampleReading: 'しょくどう', exampleEn: 'dining hall' },
        { front: '飲', reading: 'の(む)', back: 'to drink', onyomi: 'イン', kunyomi: 'の(む)', exampleJp: '飲み物', exampleReading: 'のみもの', exampleEn: 'drink; beverage' },
        { front: '立', reading: 'た(つ)', back: 'to stand', onyomi: 'リツ', kunyomi: 'た(つ)', exampleJp: '立ってください', exampleReading: 'たってください', exampleEn: 'please stand up' },
        { front: '休', reading: 'やす(む)', back: 'to rest', onyomi: 'キュウ', kunyomi: 'やす(む)', exampleJp: '休み', exampleReading: 'やすみ', exampleEn: 'holiday; break' },
        { front: '出', reading: 'で(る)', back: 'to exit; to put out', onyomi: 'シュツ', kunyomi: 'で(る), だ(す)', exampleJp: '出口', exampleReading: 'でぐち', exampleEn: 'exit' },
        { front: '入', reading: 'はい(る)', back: 'to enter; to put in', onyomi: 'ニュウ', kunyomi: 'はい(る), い(れる)', exampleJp: '入り口', exampleReading: 'いりぐち', exampleEn: 'entrance' },
        { front: '言', reading: 'い(う)', back: 'to say', onyomi: 'ゲン, ゴン', kunyomi: 'い(う)', exampleJp: '言葉', exampleReading: 'ことば', exampleEn: 'word; language' }
      ]
    },
    {
      kind: 'kanji',
      title: 'Adjectives, size & direction',
      cards: [
        { front: '大', reading: 'おお(きい)', back: 'big', onyomi: 'ダイ, タイ', kunyomi: 'おお(きい)', exampleJp: '大学', exampleReading: 'だいがく', exampleEn: 'university' },
        { front: '小', reading: 'ちい(さい)', back: 'small', onyomi: 'ショウ', kunyomi: 'ちい(さい), こ', exampleJp: '小学校', exampleReading: 'しょうがっこう', exampleEn: 'elementary school' },
        { front: '高', reading: 'たか(い)', back: 'tall; expensive', onyomi: 'コウ', kunyomi: 'たか(い)', exampleJp: '高校生', exampleReading: 'こうこうせい', exampleEn: 'high school student' },
        { front: '安', reading: 'やす(い)', back: 'cheap; peaceful', onyomi: 'アン', kunyomi: 'やす(い)', exampleJp: '安い店', exampleReading: 'やすいみせ', exampleEn: 'a cheap shop' },
        { front: '新', reading: 'あたら(しい)', back: 'new', onyomi: 'シン', kunyomi: 'あたら(しい)', exampleJp: '新聞', exampleReading: 'しんぶん', exampleEn: 'newspaper' },
        { front: '古', reading: 'ふる(い)', back: 'old (things)', onyomi: 'コ', kunyomi: 'ふる(い)', exampleJp: '古本', exampleReading: 'ふるほん', exampleEn: 'secondhand book' },
        { front: '長', reading: 'なが(い)', back: 'long; chief', onyomi: 'チョウ', kunyomi: 'なが(い)', exampleJp: '社長', exampleReading: 'しゃちょう', exampleEn: 'company president' },
        { front: '多', reading: 'おお(い)', back: 'many', onyomi: 'タ', kunyomi: 'おお(い)', exampleJp: '多分', exampleReading: 'たぶん', exampleEn: 'probably' },
        { front: '少', reading: 'すこ(し)', back: 'few; a little', onyomi: 'ショウ', kunyomi: 'すこ(し), すく(ない)', exampleJp: '少し', exampleReading: 'すこし', exampleEn: 'a little' },
        { front: '上', reading: 'うえ', back: 'up; above', onyomi: 'ジョウ', kunyomi: 'うえ, あ(がる), のぼ(る)', exampleJp: '上手', exampleReading: 'じょうず', exampleEn: 'good at' },
        { front: '下', reading: 'した', back: 'down; below', onyomi: 'カ, ゲ', kunyomi: 'した, さ(がる), くだ(さい)', exampleJp: '下手', exampleReading: 'へた', exampleEn: 'bad at' },
        { front: '中', reading: 'なか', back: 'inside; middle', onyomi: 'チュウ', kunyomi: 'なか', exampleJp: '中国', exampleReading: 'ちゅうごく', exampleEn: 'China' },
        { front: '右', reading: 'みぎ', back: 'right (side)', onyomi: 'ウ, ユウ', kunyomi: 'みぎ', exampleJp: '右手', exampleReading: 'みぎて', exampleEn: 'right hand' },
        { front: '左', reading: 'ひだり', back: 'left (side)', onyomi: 'サ', kunyomi: 'ひだり', exampleJp: '左側', exampleReading: 'ひだりがわ', exampleEn: 'left side' },
        { front: '前', reading: 'まえ', back: 'front; before', onyomi: 'ゼン', kunyomi: 'まえ', exampleJp: '名前', exampleReading: 'なまえ', exampleEn: 'name' },
        { front: '後', reading: 'あと', back: 'after; behind', onyomi: 'ゴ, コウ', kunyomi: 'あと, うし(ろ)', exampleJp: '午後', exampleReading: 'ごご', exampleEn: 'afternoon; p.m.' },
        { front: '間', reading: 'あいだ', back: 'interval; between', onyomi: 'カン, ケン', kunyomi: 'あいだ, ま', exampleJp: '時間', exampleReading: 'じかん', exampleEn: 'time' },
        { front: '半', reading: 'はん', back: 'half', onyomi: 'ハン', kunyomi: 'なか(ば)', exampleJp: '半分', exampleReading: 'はんぶん', exampleEn: 'half' }
      ]
    },
    {
      kind: 'kanji',
      title: 'School, days & everyday',
      cards: [
        { front: '本', reading: 'ほん', back: 'book; origin', onyomi: 'ホン', kunyomi: 'もと', exampleJp: '日本', exampleReading: 'にほん', exampleEn: 'Japan' },
        { front: '語', reading: 'ご', back: 'language; word', onyomi: 'ゴ', kunyomi: 'かた(る)', exampleJp: '日本語', exampleReading: 'にほんご', exampleEn: 'Japanese language' },
        { front: '文', reading: 'ぶん', back: 'sentence; text', onyomi: 'ブン, モン', exampleJp: '文法', exampleReading: 'ぶんぽう', exampleEn: 'grammar' },
        { front: '字', reading: 'じ', back: 'character; letter', onyomi: 'ジ', exampleJp: '漢字', exampleReading: 'かんじ', exampleEn: 'kanji' },
        { front: '英', reading: 'えい', back: 'England; brilliant', onyomi: 'エイ', exampleJp: '英語', exampleReading: 'えいご', exampleEn: 'English language' },
        { front: '私', reading: 'わたし', back: 'I; private', onyomi: 'シ', kunyomi: 'わたし', exampleJp: '私たち', exampleReading: 'わたしたち', exampleEn: 'we' },
        { front: '白', reading: 'しろ(い)', back: 'white', onyomi: 'ハク', kunyomi: 'しろ(い)', exampleJp: '面白い', exampleReading: 'おもしろい', exampleEn: 'interesting' },
        { front: '毎', reading: 'まい', back: 'every', onyomi: 'マイ', exampleJp: '毎日', exampleReading: 'まいにち', exampleEn: 'every day' },
        { front: '何', reading: 'なに', back: 'what', onyomi: 'カ', kunyomi: 'なに, なん', exampleJp: '何時', exampleReading: 'なんじ', exampleEn: 'what time' },
        { front: '水', reading: 'みず', back: 'water', onyomi: 'スイ', kunyomi: 'みず', exampleJp: '水曜日', exampleReading: 'すいようび', exampleEn: 'Wednesday' },
        { front: '火', reading: 'ひ', back: 'fire', onyomi: 'カ', kunyomi: 'ひ', exampleJp: '火曜日', exampleReading: 'かようび', exampleEn: 'Tuesday' },
        { front: '木', reading: 'き', back: 'tree; wood', onyomi: 'モク', kunyomi: 'き', exampleJp: '木曜日', exampleReading: 'もくようび', exampleEn: 'Thursday' },
        { front: '金', reading: 'かね', back: 'gold; money', onyomi: 'キン', kunyomi: 'かね', exampleJp: 'お金', exampleReading: 'おかね', exampleEn: 'money' },
        { front: '土', reading: 'つち', back: 'earth; soil', onyomi: 'ド', kunyomi: 'つち', exampleJp: '土曜日', exampleReading: 'どようび', exampleEn: 'Saturday' },
        { front: '曜', reading: 'よう', back: 'day of the week', onyomi: 'ヨウ', exampleJp: '日曜日', exampleReading: 'にちようび', exampleEn: 'Sunday' },
        { front: '午', reading: 'ご', back: 'noon', onyomi: 'ゴ', exampleJp: '午前', exampleReading: 'ごぜん', exampleEn: 'morning; a.m.' }
      ]
    }
  ]
}

const CASUAL_COURSE: SeedCourse = {
  title: 'Manga & VN Japanese',
  description:
    'The casual, spoken Japanese that fills manga and visual novel dialogue but ' +
    'textbooks barely touch: contractions, sentence-final particles, gendered speech ' +
    'and slang. Assumes the N5 Foundations grammar.',
  lessons: [
    {
      kind: 'grammar',
      title: 'てる / でる — the ている contraction',
      body: `In speech and dialogue, 〜ている almost always drops the い:

・食べている → 食べてる — "is eating"
・飲んでいる → 飲んでる — "is drinking"
・していた → してた — "was doing"

This is the single most common contraction in manga — expect it in nearly every panel. It conjugates exactly like ている: てる／てた／てない／てて.

The polite form contracts too in relaxed speech: 知ってます, 待ってました.`,
      cards: [
        { front: '何してるの？', reading: 'なにしてるの？', back: 'What are you doing?' },
        { front: '雨が降ってる。', reading: 'あめがふってる。', back: "It's raining." },
        { front: 'ずっと待ってたよ。', reading: 'ずっとまってたよ。', back: 'I was waiting the whole time!' }
      ]
    },
    {
      kind: 'grammar',
      title: 'ちゃう / じゃう — the てしまう contraction',
      body: `〜てしまう (to do completely / to do regrettably / to end up doing) contracts in speech:

・てしまう → ちゃう　・でしまう → じゃう
・てしまった → ちゃった　・でしまった → じゃった

食べてしまった → 食べちゃった — "I (accidentally / completely) ate it."

The nuance ranges from "oops" to "totally/all the way", read it from context:

・忘れちゃった — "I totally forgot" (oops)
・死んじゃう！ — "I'm gonna die!" (dramatic, everywhere in manga)

Future/volitional: 行っちゃおう — "let's just go".`,
      cards: [
        { front: '忘れちゃった。', reading: 'わすれちゃった。', back: 'I totally forgot.' },
        { front: '全部食べちゃったの？', reading: 'ぜんぶたべちゃったの？', back: 'You ate it ALL?' },
        { front: 'もう帰っちゃうの？', reading: 'もうかえっちゃうの？', back: "You're leaving already?" }
      ]
    },
    {
      kind: 'grammar',
      title: 'なきゃ / なくちゃ — casual obligation',
      body: `"Must do" in textbooks is なければならない／なくてはいけない. Dialogue contracts it hard, and usually drops the second half entirely:

・なければ → なきゃ
・なくては → なくちゃ

行かなきゃ（ならない） — "I have to go."
勉強しなくちゃ — "I gotta study."

Dropping ならない/いけない is standard; the bare なきゃ／なくちゃ IS the sentence. You'll also see 〜ないと used the same way: もう行かないと — "I'd better go".`,
      cards: [
        { front: 'もう行かなきゃ。', reading: 'もういかなきゃ。', back: 'I gotta go.' },
        { front: '勉強しなくちゃ。', reading: 'べんきょうしなくちゃ。', back: 'I have to study.' },
        { front: '早く逃げないと！', reading: 'はやくにげないと！', back: 'We have to run, now!' }
      ]
    },
    {
      kind: 'grammar',
      title: 'Sentence-final particles: よ・ね・な・ぞ・ぜ',
      body: `These carry the tone of a line — manga dialogue leans on them constantly:

・よ — asserting new info to the listener: 違うよ "that's wrong (I'm telling you)"
・ね — seeking agreement / softening: いい天気だね "nice weather, huh"
・よね — "…right?": これでいいよね
・な(あ) — talking to yourself, wishing: 腹減ったなあ "man, I'm hungry"
・ぞ — rough, self-assertive (mostly male): 行くぞ "we're going!"
・ぜ — rough, showy (male, very manga): やるぜ "let's do this!"

な directly after a dictionary-form verb is a PROHIBITION: 触るな！ "don't touch!" — different from the musing なあ.`,
      cards: [
        { front: 'いい天気だね。', reading: 'いいてんきだね。', back: 'Nice weather, huh?' },
        { front: 'それは違うよ。', reading: 'それはちがうよ。', back: "That's wrong, you know." },
        { front: '行くぞ！', reading: 'いくぞ！', back: "We're going! (rough)" }
      ]
    },
    {
      kind: 'grammar',
      title: 'Casual questions — の？ and dropped か',
      body: `Polite questions end in か. Casual speech usually drops it and asks with rising intonation, or ends in の:

・食べる？ — "You eating?" (plain verb + rising tone)
・食べるの？ — "You're eating?" (の asks for explanation, very common)
・何それ？ — "What's that?" (casual word order flip of それは何？)

の also answers: 食べるの — "(yes,) I'm eating." In male rough speech のか appears: 行くのか？

Bare か after plain forms sounds blunt/masculine: 来るか？ — often だ is dropped instead: 元気？ 大丈夫？`,
      cards: [
        { front: 'これ、食べるの？', reading: 'これ、たべるの？', back: 'You gonna eat this?' },
        { front: '大丈夫？', reading: 'だいじょうぶ？', back: 'You okay?' },
        { front: '何それ？', reading: 'なにそれ？', back: "What's that?" }
      ]
    },
    {
      kind: 'grammar',
      title: 'じゃない・だろ・でしょ — assertions and tag questions',
      body: `Three lookalikes that dialogue uses constantly:

・じゃない(か)  — as a falling-tone exclamation it's POSITIVE: いいじゃない！ "that's great!"; with rising tone it doubts: 嘘じゃない？ "isn't that a lie?"
・だろ(う) — "right? / probably" (masculine when clipped): 言っただろ "I told you, didn't I"
・でしょ(う) — the softer/neutral version: 分かるでしょ？ "you get it, right?"

On weather forecasts and predictions でしょう is the standard "probably": 明日は雨でしょう.`,
      cards: [
        { front: 'いいじゃない！', reading: 'いいじゃない！', back: "That's great! (exclamation)" },
        { front: '言っただろ。', reading: 'いっただろ。', back: "I told you, didn't I? (masc.)" },
        { front: '分かるでしょ？', reading: 'わかるでしょ？', back: 'You get it, right?' }
      ]
    },
    {
      kind: 'grammar',
      title: 'Masculine vs feminine speech',
      body: `Japanese fiction marks character gender/roughness through speech style — crucial for reading dialogue:

First person pronouns:
・私（わたし） neutral-polite ・あたし casual feminine
・僕（ぼく） soft masculine ・俺（おれ） rough masculine

Typical feminine markers: sentence-final わ(よ), かしら ("I wonder"), の as a statement, softer forms overall: 知らないわ.
Typical masculine markers: ぞ/ぜ, だろ, clipped か, rough contractions: 知らねえ (ない→ねえ), うるせえ.

Real people mix these freely; manga exaggerates them so you can tell who's talking without a name tag.`,
      cards: [
        { front: '俺が行くよ。', reading: 'おれがいくよ。', back: "I'll go. (rough masculine)" },
        { front: 'あたし、知らないわ。', reading: 'あたし、しらないわ。', back: "I don't know. (feminine)" },
        { front: 'そんなの知らねえよ。', reading: 'そんなのしらねえよ。', back: "How should I know?! (very rough)" }
      ]
    },
    {
      kind: 'grammar',
      title: 'Commands: imperatives, 〜な and volitional',
      body: `Manga is full of shouted commands the ます form never prepared you for:

Imperative (rough command):
・Group 1: う-row → え-row: 待つ→待て！, 頑張る→頑張れ！
・Group 2: る→ろ: 食べる→食べろ！, やめる→やめろ！
・する→しろ！, 来る→来い（こい）！

Prohibition: dictionary form + な: 触るな！ "don't touch!", 泣くな "don't cry".

Volitional ("let's"): ます-stem-based polite ましょう → plain form:
・Group 1: う-row → おう: 行く→行こう ・Group 2: る→よう: 食べよう ・する→しよう

一緒に行こう — "let's go together". Also used for "shall I…?": 手伝おうか？`,
      cards: [
        { front: '待て！', reading: 'まて！', back: 'Wait! (command)' },
        { front: '触るな！', reading: 'さわるな！', back: "Don't touch it!" },
        { front: '一緒に行こう。', reading: 'いっしょにいこう。', back: "Let's go together." }
      ]
    },
    {
      kind: 'grammar',
      title: 'って — casual quotes and topics',
      body: `って is the swiss-army particle of spoken Japanese, replacing longer patterns:

1. Quotation (= と言う): 好きだって言った — "(she) said she likes you". Alone at sentence end it reports: 行くって — "(he) says he's going."
2. Casual topic (= は/というのは): 田中さんって誰？ — "Who's Tanaka?"; 明日って何曜日？ — "What day is tomorrow, again?"
3. ってこと (= ということ): "meaning… / so that means…": 行かないってこと？ — "So you mean you're not going?"

If a line has って, first try reading it as "says/said" — then as "as for".`,
      cards: [
        { front: '明日って何曜日？', reading: 'あしたってなんようび？', back: 'What day is it tomorrow, again?' },
        { front: '田中さんって誰？', reading: 'たなかさんってだれ？', back: "Who's Tanaka?" },
        { front: '好きだって言った。', reading: 'すきだっていった。', back: '(She) said she likes you.' }
      ]
    },
    {
      kind: 'grammar',
      title: 'Trailing けど / のに — unfinished sentences',
      body: `Japanese dialogue loves ending mid-sentence; the trailing particle carries the unsaid part:

・けど literally "but": 行きたいんだけど… — "I'd like to go, (but…)" — a soft request or hesitation. あの、すみませんけど… — polite lead-in.
・のに "even though": 言ったのに… — "but I TOLD you…" — reproach/disappointment.
・し lists reasons and can also trail: 時間もないし… — "we don't have time, and…"

The 〜んだ／〜の before けど (行きたい**んだ**けど) adds the explanatory tone — extremely common combo.`,
      cards: [
        { front: '行きたいんだけど…。', reading: 'いきたいんだけど…。', back: 'I want to go, but… (trailing)' },
        { front: '言ったのに…。', reading: 'いったのに…。', back: 'But I told you…' },
        { front: '時間もないし…。', reading: 'じかんもないし…。', back: "We don't have time, and… (trailing)" }
      ]
    },
    {
      kind: 'vocab',
      title: 'Slang & interjections',
      cards: [
        { front: 'まじ', back: 'seriously?; for real', pos: 'slang', notes: 'まじで？ = "Seriously?!"' },
        { front: 'やばい', back: 'crazy; awesome; bad news', pos: 'slang', notes: 'Both "amazing" and "we\'re screwed" — read the panel.' },
        { front: 'すげえ', back: 'whoa; amazing', pos: 'slang', notes: 'Rough form of すごい.' },
        { front: 'うるさい', reading: 'うるさい', back: 'noisy; "shut up!"', pos: 'i-adjective', notes: 'Shouted as うるせえ in rough speech.' },
        { front: 'なんか', back: 'like; kinda; somehow', pos: 'filler', notes: 'Filler word, also "something like".' },
        { front: 'ほら', back: 'look!; see?', pos: 'interjection' },
        { front: 'おい', back: 'hey!', pos: 'interjection', notes: 'Rough attention-getter.' },
        { front: 'えっと', back: 'umm; let me see', pos: 'filler' },
        { front: 'だって', back: 'but; because (excuse)', pos: 'conjunction', notes: 'Whiny sentence-starter: だって、無理だもん.' },
        { front: 'ちょっと', back: 'a little; "hey, wait"', pos: 'adverb', notes: 'ちょっと！ alone = "hey!/excuse me!"' },
        { front: '別に', reading: 'べつに', back: 'not really; nothing special', pos: 'adverb', notes: 'The classic sulky answer.' },
        { front: 'うそ', reading: 'うそ', back: 'no way!; you\'re kidding (lit. lie)', pos: 'noun', notes: 'うそだろ！？ = "No way!"' },
        { front: 'やった', back: 'yay!; I did it!', pos: 'interjection' },
        { front: 'くそ', back: 'damn it', pos: 'interjection', notes: 'Also くっそ〜 when gritted through teeth.' }
      ]
    }
  ]
}

// Inserts one pack's course if its flag is absent. Flags live in settings
// rather than on the course row, so deleting or renaming a course never
// re-seeds it.
function seedPack(sqlite: Database.Database, flag: string, course: SeedCourse): void {
  const seeded = sqlite.prepare('SELECT value FROM settings WHERE key = ?').get(flag)
  if (seeded) return

  const insertCourse = sqlite.prepare(
    'INSERT INTO jp_course (title, description, sort_order) VALUES (?, ?, ?)'
  )
  const insertLesson = sqlite.prepare(
    'INSERT INTO jp_lesson (course_id, kind, title, body, sort_order) VALUES (?, ?, ?, ?, ?)'
  )
  const insertCard = sqlite.prepare(
    `INSERT INTO jp_card (lesson_id, sort_order, front, reading, back, pos, notes,
                          onyomi, kunyomi, example_jp, example_reading, example_en)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  )

  const tx = sqlite.transaction(() => {
    const next = (
      sqlite.prepare('SELECT COALESCE(MAX(sort_order), -1) + 1 AS next FROM jp_course').get() as {
        next: number
      }
    ).next
    const courseId = Number(
      insertCourse.run(course.title, course.description, next).lastInsertRowid
    )
    course.lessons.forEach((lesson, li) => {
      const lessonId = Number(
        insertLesson.run(courseId, lesson.kind, lesson.title, lesson.body ?? null, li).lastInsertRowid
      )
      lesson.cards.forEach((card, ci) => {
        insertCard.run(
          lessonId,
          ci,
          card.front,
          card.reading ?? null,
          card.back,
          card.pos ?? null,
          card.notes ?? null,
          card.onyomi ?? null,
          card.kunyomi ?? null,
          card.exampleJp ?? null,
          card.exampleReading ?? null,
          card.exampleEn ?? null
        )
      })
    })
    sqlite.prepare('INSERT INTO settings (key, value) VALUES (?, ?)').run(flag, '1')
  })
  tx()
}

export function seedJapanese(sqlite: Database.Database): void {
  seedPack(sqlite, 'japanese.seeded', N5_COURSE)
  seedPack(sqlite, 'japanese.seeded.kanji', N5_KANJI_COURSE)
  seedPack(sqlite, 'japanese.seeded.casual', CASUAL_COURSE)
}
