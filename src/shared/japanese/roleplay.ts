export interface RoleplayChoice {
  id: string
  japanese: string
  reading: string
  note: string
  nextNodeId: string | null
}

export interface RoleplayNode {
  id: string
  speaker: string
  line: string
  reading: string
  goal: string
  required: string[][]
  choices: RoleplayChoice[]
}

export interface RoleplayScenario {
  id: string
  title: string
  level: string
  purpose: string
  startNodeId: string
  nodes: RoleplayNode[]
}

export interface RoleplayCheck {
  matched: number
  total: number
  missing: string[]
}

function normalize(value: string): string {
  return value
    .normalize('NFKC')
    .toLowerCase()
    .replace(/[\s。、！？!?「」『』]/g, '')
}

export function checkRoleplayResponse(text: string, node: RoleplayNode): RoleplayCheck {
  const answer = normalize(text)
  const missing = node.required
    .filter((alternatives) => !alternatives.some((part) => answer.includes(normalize(part))))
    .map((alternatives) => alternatives.join(' / '))
  return { matched: node.required.length - missing.length, total: node.required.length, missing }
}

export function roleplayNode(scenario: RoleplayScenario, id: string): RoleplayNode | null {
  return scenario.nodes.find((node) => node.id === id) ?? null
}

export function nextRoleplayScenario(
  scenarios: RoleplayScenario[],
  recentScenarioIds: string[],
  currentId: string
): RoleplayScenario {
  if (scenarios.length === 0) throw new Error('At least one role-play scenario is required')
  const candidates = scenarios.filter((scenario) => scenario.id !== currentId)
  if (candidates.length === 0) return scenarios[0]
  const recent = recentScenarioIds.slice(0, Math.max(12, scenarios.length))
  const countFor = (id: string): number => recent.filter((item) => item === id).length
  const newestIndex = (id: string): number => {
    const index = recent.indexOf(id)
    return index < 0 ? Number.POSITIVE_INFINITY : index
  }
  return [...candidates].sort(
    (a, b) =>
      countFor(a.id) - countFor(b.id) ||
      newestIndex(b.id) - newestIndex(a.id) ||
      scenarios.indexOf(a) - scenarios.indexOf(b)
  )[0]
}

export const ROLEPLAY_SCENARIOS: RoleplayScenario[] = [
  {
    id: 'cafe-repair',
    title: 'Correct a café order',
    level: 'Foundation to N4',
    purpose: 'Order politely, notice a mismatch, and repair it without restarting the exchange.',
    startNodeId: 'order',
    nodes: [
      {
        id: 'order',
        speaker: '店員',
        line: 'いらっしゃいませ。ご注文はお決まりですか。',
        reading: 'いらっしゃいませ。ごちゅうもんは おきまりですか。',
        goal: 'Order one hot coffee politely.',
        required: [['コーヒー'], ['ホット', '温かい'], ['ください', 'お願いします']],
        choices: [
          { id: 'direct', japanese: 'ホットコーヒーを一つください。', reading: 'ほっとこーひーを ひとつ ください。', note: 'Direct, complete, and natural.', nextNodeId: 'wrong' },
          { id: 'soft', japanese: '温かいコーヒーをお願いします。', reading: 'あたたかい こーひーを おねがいします。', note: 'A slightly softer request.', nextNodeId: 'wrong' },
          { id: 'menu', japanese: 'ホットコーヒーはありますか。', reading: 'ほっとこーひーは ありますか。', note: 'Checks availability before ordering.', nextNodeId: 'available' }
        ]
      },
      {
        id: 'available',
        speaker: '店員',
        line: 'はい、ございます。サイズはいかがなさいますか。',
        reading: 'はい、ございます。さいずは いかがなさいますか。',
        goal: 'Choose the small size and complete the order.',
        required: [['小さい', 'スモール', 'Sサイズ'], ['ください', 'お願いします']],
        choices: [
          { id: 'small', japanese: 'Sサイズをお願いします。', reading: 'えすさいずを おねがいします。', note: 'Concise and appropriate.', nextNodeId: 'wrong' },
          { id: 'small-native', japanese: '小さいサイズを一つください。', reading: 'ちいさい さいずを ひとつ ください。', note: 'Clear even without menu vocabulary.', nextNodeId: 'wrong' }
        ]
      },
      {
        id: 'wrong',
        speaker: '店員',
        line: 'お待たせしました。アイスコーヒーです。',
        reading: 'おまたせしました。あいすこーひーです。',
        goal: 'Politely say this is not the hot coffee you ordered.',
        required: [['アイス'], ['じゃなくて', 'ではなく', '頼んだのは'], ['ホット', '温かい']],
        choices: [
          { id: 'repair-soft', japanese: 'すみません、アイスではなくて、ホットをお願いしました。', reading: 'すみません、あいすではなくて、ほっとを おねがいしました。', note: 'Names both the mismatch and the intended order.', nextNodeId: 'finish' },
          { id: 'repair-short', japanese: 'すみません、アイスではなく、頼んだのはホットコーヒーです。', reading: 'すみません、あいすではなく、たのんだのは ほっとこーひーです。', note: 'Short but still names both sides of the correction.', nextNodeId: 'finish' }
        ]
      },
      {
        id: 'finish',
        speaker: '店員',
        line: '大変失礼しました。すぐにお取り替えします。',
        reading: 'たいへん しつれいしました。すぐに おとりかえします。',
        goal: 'Acknowledge the correction politely.',
        required: [['ありがとうございます', 'お願いします']],
        choices: [
          { id: 'thanks', japanese: 'ありがとうございます。お願いします。', reading: 'ありがとうございます。おねがいします。', note: 'Closes the repair without overexplaining.', nextNodeId: null },
          { id: 'simple', japanese: 'はい、お願いします。', reading: 'はい、おねがいします。', note: 'A natural brief close.', nextNodeId: null }
        ]
      }
    ]
  },
  {
    id: 'plans-negotiate',
    title: 'Negotiate plans with a friend',
    level: 'N4 to N3',
    purpose: 'Invite, respond to a scheduling conflict, and propose a concrete alternative.',
    startNodeId: 'invite',
    nodes: [
      {
        id: 'invite',
        speaker: '友達',
        line: '今週末、何か予定ある。',
        reading: 'こんしゅうまつ、なにか よてい ある。',
        goal: 'Invite your friend to see a movie on Saturday.',
        required: [['土曜日', '土曜'], ['映画'], ['行かない', '行きませんか', '見ない']],
        choices: [
          { id: 'casual', japanese: '土曜日、一緒に映画を見に行かない。', reading: 'どようび、いっしょに えいがを みに いかない。', note: 'Natural casual invitation.', nextNodeId: 'conflict' },
          { id: 'polite', japanese: '土曜日に映画を見に行きませんか。', reading: 'どようびに えいがを みに いきませんか。', note: 'Polite invitation; still fine with a friend.', nextNodeId: 'conflict' }
        ]
      },
      {
        id: 'conflict',
        speaker: '友達',
        line: '土曜日はバイトなんだ。日曜日なら空いてるよ。',
        reading: 'どようびは ばいとなんだ。にちようびなら あいてるよ。',
        goal: 'Accept Sunday and propose an afternoon time.',
        required: [['日曜日', '日曜'], ['午後', '三時', '3時', '昼'], ['どう', '大丈夫', '会おう']],
        choices: [
          { id: 'three', japanese: 'じゃあ、日曜日の午後三時はどう。', reading: 'じゃあ、にちようびの ごご さんじは どう。', note: 'Turns the alternative into a concrete plan.', nextNodeId: 'place' },
          { id: 'afternoon', japanese: '日曜日なら大丈夫。午後に会おう。', reading: 'にちようびなら だいじょうぶ。ごごに あおう。', note: 'Accepts and proposes a broad time.', nextNodeId: 'place' }
        ]
      },
      {
        id: 'place',
        speaker: '友達',
        line: 'いいね。どこで待ち合わせる。',
        reading: 'いいね。どこで まちあわせる。',
        goal: 'Choose the station entrance and confirm the plan.',
        required: [['駅'], ['入口', '改札'], ['会おう', '待ち合わせよう', 'お願いします']],
        choices: [
          { id: 'gate', japanese: '駅の改札で待ち合わせよう。', reading: 'えきの かいさつで まちあわせよう。', note: 'Specific and easy to act on.', nextNodeId: null },
          { id: 'entrance', japanese: '駅の入口で会おう。', reading: 'えきの いりぐちで あおう。', note: 'Short, casual confirmation.', nextNodeId: null }
        ]
      }
    ]
  },
  {
    id: 'story-interpretation',
    title: 'Discuss a story interpretation',
    level: 'N3 to advanced',
    purpose: 'State an interpretation, support it with evidence, and acknowledge another reading.',
    startNodeId: 'claim',
    nodes: [
      {
        id: 'claim',
        speaker: '読書会の相手',
        line: '最後に主人公が笑ったのは、うれしかったからだと思う。',
        reading: 'さいごに しゅじんこうが わらったのは、うれしかったからだと おもう。',
        goal: 'Disagree gently and say you think the smile hid anxiety.',
        required: [['そうかもしれない', '確かに', '分かる'], ['でも', 'ただ'], ['不安', '心配'], ['と思う', 'ように見えた']],
        choices: [
          { id: 'gentle', japanese: 'そうかもしれない。でも、不安を隠すために笑ったようにも見えた。', reading: 'そうかもしれない。でも、ふあんを かくすために わらったようにも みえた。', note: 'Acknowledges before offering a different reading.', nextNodeId: 'evidence' },
          { id: 'contrast', japanese: '確かにうれしそうだった。ただ、まだ心配していたと思う。', reading: 'たしかに うれしそうだった。ただ、まだ しんぱいしていたと おもう。', note: 'Balances agreement and qualification.', nextNodeId: 'evidence' }
        ]
      },
      {
        id: 'evidence',
        speaker: '読書会の相手',
        line: 'どうしてそう思ったの。',
        reading: 'どうして そう おもったの。',
        goal: 'Cite the earlier scene where the protagonist avoided answering.',
        required: [['前', 'さっき', 'その前'], ['答えなかった', '答えを避けた', '黙っていた'], ['から']],
        choices: [
          { id: 'cite', japanese: 'その前の場面で、質問に答えず黙っていたから。', reading: 'そのまえの ばめんで、しつもんに こたえず だまっていたから。', note: 'Links a concrete scene to the interpretation.', nextNodeId: 'nuance' },
          { id: 'avoid', japanese: '前に同じことを聞かれても、答えを避けていたからだよ。', reading: 'まえに おなじことを きかれても、こたえを さけていたからだよ。', note: 'Uses repeated behavior as evidence.', nextNodeId: 'nuance' }
        ]
      },
      {
        id: 'nuance',
        speaker: '読書会の相手',
        line: 'なるほど。でも、安心した気持ちも少しはあったんじゃない。',
        reading: 'なるほど。でも、あんしんした きもちも すこしは あったんじゃない。',
        goal: 'Accept that both emotions may be present while preserving your interpretation.',
        required: [['かもしれない', '可能性'], ['両方', '安心'], ['不安', '心配']],
        choices: [
          { id: 'both', japanese: 'そうかもしれない。安心と不安の両方があったのだと思う。', reading: 'そうかもしれない。あんしんと ふあんの りょうほうが あったのだと おもう。', note: 'Integrates the counterpoint without abandoning the claim.', nextNodeId: null },
          { id: 'weight', japanese: '安心もあったかもしれないけど、まだ不安のほうが強かったと思う。', reading: 'あんしんも あったかもしれないけど、まだ ふあんのほうが つよかったと おもう。', note: 'Concedes one point while preserving emphasis.', nextNodeId: null }
        ]
      }
    ]
  },
  {
    id: 'pharmacy-advice',
    title: 'Ask a pharmacist for advice',
    level: 'N4 to N3',
    purpose: 'Describe symptoms, answer a safety question, and confirm how to take medicine.',
    startNodeId: 'symptom',
    nodes: [
      {
        id: 'symptom',
        speaker: '薬剤師',
        line: '今日はどうされましたか。',
        reading: 'きょうは どうされましたか。',
        goal: 'Say that your throat has hurt since yesterday and you have no fever.',
        required: [['昨日から'], ['喉', 'のど'], ['痛い', '痛くて'], ['熱はない', '熱がない', '熱はありません']],
        choices: [
          { id: 'clear', japanese: '昨日から喉が痛いですが、熱はありません。', reading: 'きのうから のどが いたいですが、ねつは ありません。', note: 'Gives duration, symptom, and the useful negative detail.', nextNodeId: 'allergy' },
          { id: 'casual', japanese: '昨日から喉が痛くて、熱はないです。', reading: 'きのうから のどが いたくて、ねつは ないです。', note: 'Natural spoken description.', nextNodeId: 'allergy' }
        ]
      },
      {
        id: 'allergy',
        speaker: '薬剤師',
        line: '薬のアレルギーはありますか。',
        reading: 'くすりの あれるぎーは ありますか。',
        goal: 'Say you have no known allergies and ask whether the medicine causes drowsiness.',
        required: [['アレルギーはありません', 'アレルギーはない'], ['眠く', '眠気']],
        choices: [
          { id: 'drowsy', japanese: 'アレルギーはありません。この薬は眠くなりますか。', reading: 'あれるぎーは ありません。このくすりは ねむくなりますか。', note: 'Answers first, then asks about a practical side effect.', nextNodeId: 'dose' },
          { id: 'sleepiness', japanese: '特にありません。眠気が出る薬でしょうか。', reading: 'とくに ありません。ねむけが でる くすりでしょうか。', note: 'A slightly more formal side-effect question.', nextNodeId: 'dose' }
        ]
      },
      {
        id: 'dose',
        speaker: '薬剤師',
        line: '眠くなりにくい薬です。一日三回、食後に飲んでください。',
        reading: 'ねむくなりにくい くすりです。いちにち さんかい、しょくごに のんでください。',
        goal: 'Confirm the dose and when to take it.',
        required: [['一日三回'], ['食後'], ['ですね', '分かりました']],
        choices: [
          { id: 'confirm', japanese: '一日三回、食後ですね。分かりました。', reading: 'いちにち さんかい、しょくごですね。わかりました。', note: 'Repeats both instructions to prevent misunderstanding.', nextNodeId: null },
          { id: 'check', japanese: '食後に一日三回飲めばいいんですね。', reading: 'しょくごに いちにち さんかい のめば いいんですね。', note: 'Confirms the instruction as a condition.', nextNodeId: null }
        ]
      }
    ]
  },
  {
    id: 'station-reroute',
    title: 'Recover from a missed train',
    level: 'N4 to N3',
    purpose: 'Explain a travel problem, compare alternatives, and confirm the correct platform.',
    startNodeId: 'missed',
    nodes: [
      {
        id: 'missed',
        speaker: '駅員',
        line: 'どうされましたか。',
        reading: 'どうされましたか。',
        goal: 'Say you missed the express to Kyoto and ask for the next fastest route.',
        required: [['京都'], ['特急', '電車'], ['乗り遅れ', '間に合わなかった'], ['早い', '速い']],
        choices: [
          { id: 'route', japanese: '京都行きの特急に乗り遅れました。次に早い行き方を教えてください。', reading: 'きょうといきの とっきゅうに のりおくれました。つぎに はやい いきかたを おしえてください。', note: 'States the failed plan and asks for the relevant alternative.', nextNodeId: 'transfer' },
          { id: 'next', japanese: '京都への電車に間に合いませんでした。一番早く着く電車はどれですか。', reading: 'きょうとへの でんしゃに まにあいませんでした。いちばん はやく つく でんしゃは どれですか。', note: 'Focuses on arrival time rather than train type.', nextNodeId: 'transfer' }
        ]
      },
      {
        id: 'transfer',
        speaker: '駅員',
        line: '大阪で快速に乗り換えると、二十分ほど早く着きます。',
        reading: 'おおさかで かいそくに のりかえると、にじゅっぷんほど はやく つきます。',
        goal: 'Accept the transfer and ask which platform the first train uses.',
        required: [['大阪'], ['乗り換え'], ['何番線', 'ホーム']],
        choices: [
          { id: 'platform', japanese: '大阪で乗り換えます。最初の電車は何番線ですか。', reading: 'おおさかで のりかえます。さいしょの でんしゃは なんばんせんですか。', note: 'Accepts the route and asks one actionable question.', nextNodeId: 'confirm' },
          { id: 'home', japanese: 'その行き方にします。どのホームから乗ればいいですか。', reading: 'その いきかたに します。どの ほーむから のれば いいですか。', note: 'Uses a natural decision phrase before confirming the platform.', nextNodeId: 'confirm' }
        ]
      },
      {
        id: 'confirm',
        speaker: '駅員',
        line: '四番線です。十二時十分発の電車に乗ってください。',
        reading: 'よんばんせんです。じゅうにじ じゅっぷんはつの でんしゃに のってください。',
        goal: 'Repeat the platform and departure time to confirm.',
        required: [['四番線', '4番線'], ['十二時十分', '12時10分'], ['ですね']],
        choices: [
          { id: 'repeat', japanese: '四番線から十二時十分発ですね。ありがとうございます。', reading: 'よんばんせんから じゅうにじ じゅっぷんはつですね。ありがとうございます。', note: 'Repeats both details before closing.', nextNodeId: null },
          { id: 'short', japanese: '十二時十分に四番線ですね。分かりました。', reading: 'じゅうにじ じゅっぷんに よんばんせんですね。わかりました。', note: 'Concise confirmation.', nextNodeId: null }
        ]
      }
    ]
  },
  {
    id: 'noise-request',
    title: 'Make a careful noise complaint',
    level: 'N3',
    purpose: 'Raise a sensitive problem without accusation, give evidence, and agree on a solution.',
    startNodeId: 'raise',
    nodes: [
      {
        id: 'raise',
        speaker: '隣人',
        line: '何かご用ですか。',
        reading: 'なにか ごようですか。',
        goal: 'Apologize for bothering them and say music has been audible late at night.',
        required: [['すみません', '申し訳'], ['夜遅く'], ['音楽', '音'], ['聞こえ']],
        choices: [
          { id: 'soft', japanese: '突然すみません。最近、夜遅くに音楽が聞こえることがありまして。', reading: 'とつぜん すみません。さいきん、よる おそくに おんがくが きこえることが ありまして。', note: 'Uses an unfinished polite form to avoid sounding accusatory.', nextNodeId: 'detail' },
          { id: 'direct', japanese: 'お邪魔してすみません。夜遅くまで音が聞こえる日があるんです。', reading: 'おじゃまして すみません。よる おそくまで おとが きこえる ひが あるんです。', note: 'Direct but still frames it as an observed problem.', nextNodeId: 'detail' }
        ]
      },
      {
        id: 'detail',
        speaker: '隣人',
        line: 'それはすみません。何時ごろでしょうか。',
        reading: 'それは すみません。なんじごろでしょうか。',
        goal: 'Say it is usually after eleven and that you wake early for work.',
        required: [['十一時', '11時'], ['仕事'], ['早く起き', '朝早い']],
        choices: [
          { id: 'eleven', japanese: '十一時を過ぎてからが多いです。仕事で朝早く起きるので、少し困っています。', reading: 'じゅういちじを すぎてからが おおいです。しごとで あさ はやく おきるので、すこし こまっています。', note: 'Provides a concrete time and explains the impact.', nextNodeId: 'solution' },
          { id: 'work', japanese: 'だいたい十一時以降です。朝早い仕事なので、目が覚めてしまいます。', reading: 'だいたい じゅういちじ いこうです。あさ はやい しごとなので、めが さめてしまいます。', note: 'Explains the consequence without blaming intent.', nextNodeId: 'solution' }
        ]
      },
      {
        id: 'solution',
        speaker: '隣人',
        line: '分かりました。十時以降はヘッドホンを使います。',
        reading: 'わかりました。じゅうじ いこうは へっどほんを つかいます。',
        goal: 'Thank them and invite them to tell you if your own room is noisy.',
        required: [['ありがとうございます'], ['私の部屋', 'こちら'], ['教えて', '言って']],
        choices: [
          { id: 'mutual', japanese: 'ありがとうございます。私の部屋の音が気になるときも、遠慮なく教えてください。', reading: 'ありがとうございます。わたしの へやの おとが きになる ときも、えんりょなく おしえてください。', note: 'Closes with a reciprocal invitation.', nextNodeId: null },
          { id: 'thanks', japanese: '助かります。こちらもうるさかったら、いつでも言ってください。', reading: 'たすかります。こちらも うるさかったら、いつでも いってください。', note: 'Natural neighborly close.', nextNodeId: null }
        ]
      }
    ]
  },
  {
    id: 'deadline-negotiate',
    title: 'Negotiate a work deadline',
    level: 'N3 to N2',
    purpose: 'Report a risk early, explain the cause without excuses, and propose a recoverable plan.',
    startNodeId: 'status',
    nodes: [
      {
        id: 'status',
        speaker: '上司',
        line: '金曜日の資料、予定どおり出せそうですか。',
        reading: 'きんようびの しりょう、よていどおり だせそうですか。',
        goal: 'Say the analysis is delayed and Friday may be difficult.',
        required: [['分析'], ['遅れ', '時間がかか'], ['金曜日'], ['難しい', '難しそう', '間に合わない']],
        choices: [
          { id: 'risk', japanese: '分析作業が遅れており、このままだと金曜日の提出は難しそうです。', reading: 'ぶんせき さぎょうが おくれており、このままだと きんようびの ていしゅつは むずかしそうです。', note: 'Reports the risk before it becomes a missed deadline.', nextNodeId: 'cause' },
          { id: 'plain', japanese: '申し訳ありません。分析に時間がかかっていて、金曜日には間に合わない可能性があります。', reading: 'もうしわけ ありません。ぶんせきに じかんが かかっていて、きんようびには まにあわない かのうせいが あります。', note: 'States uncertainty accurately.', nextNodeId: 'cause' }
        ]
      },
      {
        id: 'cause',
        speaker: '上司',
        line: '原因と、いつなら出せるか教えてください。',
        reading: 'げんいんと、いつなら だせるか おしえてください。',
        goal: 'Explain that source data arrived late and propose Monday morning.',
        required: [['データ', '資料'], ['遅く', '遅れ'], ['月曜日', '月曜'], ['午前']],
        choices: [
          { id: 'monday', japanese: '元データの到着が遅れたためです。月曜日の午前中なら、確認まで終えて提出できます。', reading: 'もとでーたの とうちゃくが おくれた ためです。げつようびの ごぜんちゅうなら、かくにんまで おえて ていしゅつできます。', note: 'Pairs the cause with a concrete, quality-protected commitment.', nextNodeId: 'interim' },
          { id: 'plan', japanese: '必要なデータが遅く届きました。月曜の午前には完成版を出せます。', reading: 'ひつような でーたが おそく とどきました。げつようの ごぜんには かんせいばんを だせます。', note: 'Shorter but still actionable.', nextNodeId: 'interim' }
        ]
      },
      {
        id: 'interim',
        speaker: '上司',
        line: 'では、金曜日に途中版だけ共有できますか。',
        reading: 'では、きんようびに とちゅうばんだけ きょうゆうできますか。',
        goal: 'Agree and specify that the main findings will be included.',
        required: [['金曜日'], ['途中版', '暫定版'], ['主な', '主要'], ['結果', 'ポイント']],
        choices: [
          { id: 'agree', japanese: 'はい。金曜日には主な結果を入れた途中版を共有します。', reading: 'はい。きんようびには おもな けっかを いれた とちゅうばんを きょうゆうします。', note: 'Commits to a useful interim deliverable.', nextNodeId: null },
          { id: 'provisional', japanese: '承知しました。主要なポイントをまとめた暫定版を金曜日にお送りします。', reading: 'しょうちしました。しゅような ぽいんとを まとめた ざんていばんを きんようびに おおくりします。', note: 'Formal workplace confirmation.', nextNodeId: null }
        ]
      }
    ]
  },
  {
    id: 'return-product',
    title: 'Return a faulty product',
    level: 'N3 to N2',
    purpose: 'Explain a defect precisely, answer a troubleshooting question, and request an appropriate remedy.',
    startNodeId: 'defect',
    nodes: [
      {
        id: 'defect',
        speaker: '店員',
        line: 'こちらの商品はどうされましたか。',
        reading: 'こちらの しょうひんは どうされましたか。',
        goal: 'Say the headphones bought yesterday lose sound in the left side.',
        required: [['昨日'], ['ヘッドホン'], ['左'], ['音が出ない', '聞こえない', '途切れ']],
        choices: [
          { id: 'left', japanese: '昨日買ったヘッドホンですが、左側の音が途切れてしまいます。', reading: 'きのう かった へっどほんですが、ひだりがわの おとが とぎれてしまいます。', note: 'Names purchase time, item, side, and defect.', nextNodeId: 'tested' },
          { id: 'silent', japanese: '昨日購入したものです。左から音が出ないことがあります。', reading: 'きのう こうにゅうした ものです。ひだりから おとが でないことが あります。', note: 'Slightly more formal description.', nextNodeId: 'tested' }
        ]
      },
      {
        id: 'tested',
        speaker: '店員',
        line: '別の機器でも同じ症状が出ましたか。',
        reading: 'べつの ききでも おなじ しょうじょうが でましたか。',
        goal: 'Say you tried a phone and computer and the problem remained.',
        required: [['スマホ', '携帯'], ['パソコン', 'コンピューター'], ['同じ', '直らなかった']],
        choices: [
          { id: 'both', japanese: 'はい、スマホとパソコンの両方で試しましたが、同じでした。', reading: 'はい、すまほと ぱそこんの りょうほうで ためしましたが、おなじでした。', note: 'Answers the diagnostic question directly.', nextNodeId: 'remedy' },
          { id: 'remain', japanese: 'スマホでもパソコンでも確認しましたが、直りませんでした。', reading: 'すまほでも ぱそこんでも かくにんしましたが、なおりませんでした。', note: 'Shows basic troubleshooting is already complete.', nextNodeId: 'remedy' }
        ]
      },
      {
        id: 'remedy',
        speaker: '店員',
        line: '交換か返金ができますが、どちらになさいますか。',
        reading: 'こうかんか へんきんが できますが、どちらに なさいますか。',
        goal: 'Request an exchange and ask whether it can be tested first.',
        required: [['交換'], ['確認', '試す', 'テスト'], ['できますか', '可能']],
        choices: [
          { id: 'exchange', japanese: '交換をお願いします。受け取る前に動作を確認できますか。', reading: 'こうかんを おねがいします。うけとる まえに どうさを かくにんできますか。', note: 'Chooses the remedy and prevents a repeat problem.', nextNodeId: null },
          { id: 'test', japanese: '交換したいです。新しいものをここで試すことは可能でしょうか。', reading: 'こうかんしたいです。あたらしいものを ここで ためすことは かのうでしょうか。', note: 'Polite request to test the replacement.', nextNodeId: null }
        ]
      }
    ]
  },
  {
    id: 'clinic-symptoms',
    title: 'Explain symptoms at a clinic',
    level: 'N3',
    purpose: 'Describe duration and triggers, answer a follow-up, and confirm the care plan.',
    startNodeId: 'describe',
    nodes: [
      {
        id: 'describe',
        speaker: '医師',
        line: 'どんな症状がありますか。',
        reading: 'どんな しょうじょうが ありますか。',
        goal: 'Say you have had headaches for three days, especially in the evening.',
        required: [['三日', '3日'], ['頭痛', '頭が痛い'], ['夕方', '夜']],
        choices: [
          { id: 'three-days', japanese: '三日前から頭痛が続いていて、特に夕方にひどくなります。', reading: 'みっかまえから ずつうが つづいていて、とくに ゆうがたに ひどくなります。', note: 'Gives onset, persistence, and timing.', nextNodeId: 'other' },
          { id: 'evening', japanese: '三日ほど頭が痛いです。夜になると強くなる気がします。', reading: 'みっかほど あたまが いたいです。よるに なると つよくなる きがします。', note: 'Natural subjective description.', nextNodeId: 'other' }
        ]
      },
      {
        id: 'other',
        speaker: '医師',
        line: '吐き気や熱はありますか。',
        reading: 'はきけや ねつは ありますか。',
        goal: 'Say there is slight nausea but no fever.',
        required: [['少し', '軽い'], ['吐き気'], ['熱はない', '熱はありません']],
        choices: [
          { id: 'nausea', japanese: '少し吐き気がありますが、熱はありません。', reading: 'すこし はきけが ありますが、ねつは ありません。', note: 'Separates the positive and negative symptoms clearly.', nextNodeId: 'plan' },
          { id: 'mild', japanese: '軽い吐き気はあります。熱はないです。', reading: 'かるい はきけは あります。ねつは ないです。', note: 'Short and unambiguous.', nextNodeId: 'plan' }
        ]
      },
      {
        id: 'plan',
        speaker: '医師',
        line: '今日は休んで、水分を取ってください。明日も続くなら、もう一度来てください。',
        reading: 'きょうは やすんで、すいぶんを とってください。あしたも つづくなら、もういちど きてください。',
        goal: 'Confirm the instructions and when to return.',
        required: [['休む', '休ん'], ['水分'], ['明日'], ['続いたら', '続くなら', '治らなければ']],
        choices: [
          { id: 'confirm-care', japanese: '今日は休んで水分を取り、明日も続いたらまた来るんですね。', reading: 'きょうは やすんで すいぶんを とり、あしたも つづいたら また くるんですね。', note: 'Repeats both immediate care and the return condition.', nextNodeId: null },
          { id: 'understand', japanese: '分かりました。休んで水分を取り、明日治らなければ再受診します。', reading: 'わかりました。やすんで すいぶんを とり、あした なおらなければ さいじゅしんします。', note: 'Uses a more clinical word for returning.', nextNodeId: null }
        ]
      }
    ]
  },
  {
    id: 'interview-experience',
    title: 'Explain experience in an interview',
    level: 'N2',
    purpose: 'Present a concrete achievement, clarify personal contribution, and connect it to the new role.',
    startNodeId: 'achievement',
    nodes: [
      {
        id: 'achievement',
        speaker: '面接官',
        line: 'これまでの仕事で、特に成果を上げた経験を教えてください。',
        reading: 'これまでの しごとで、とくに せいかを あげた けいけんを おしえてください。',
        goal: 'Describe improving a support process and reducing response time by thirty percent.',
        required: [['対応', 'サポート'], ['改善'], ['三十パーセント', '30パーセント', '30%'], ['短縮', '減ら']],
        choices: [
          { id: 'metric', japanese: '問い合わせ対応の流れを改善し、平均対応時間を三十パーセント短縮しました。', reading: 'といあわせ たいおうの ながれを かいぜんし、へいきん たいおう じかんを さんじゅっぱーせんと たんしゅくしました。', note: 'Names the process, action, and measurable result.', nextNodeId: 'contribution' },
          { id: 'support', japanese: 'サポート業務を見直した結果、返答までの時間を約三十パーセント減らせました。', reading: 'さぽーと ぎょうむを みなおした けっか、へんとうまでの じかんを やく さんじゅっぱーせんと へらせました。', note: 'Uses result framing while keeping the metric.', nextNodeId: 'contribution' }
        ]
      },
      {
        id: 'contribution',
        speaker: '面接官',
        line: 'その中で、あなた自身は何を担当しましたか。',
        reading: 'そのなかで、あなた じしんは なにを たんとうしましたか。',
        goal: 'Say you analyzed delays, proposed templates, and trained the team.',
        required: [['分析'], ['テンプレート'], ['提案', '作成'], ['研修', '教え', '共有']],
        choices: [
          { id: 'owned', japanese: '遅れの原因を分析し、返信テンプレートを提案したうえで、チーム向けの研修を担当しました。', reading: 'おくれの げんいんを ぶんせきし、へんしん てんぷれーとを ていあんした うえで、ちーむむけの けんしゅうを たんとうしました。', note: 'Separates personal contribution from the team result.', nextNodeId: 'transfer' },
          { id: 'three-parts', japanese: '私は原因分析、テンプレート作成、チームへの共有を担当しました。', reading: 'わたしは げんいん ぶんせき、てんぷれーと さくせい、ちーむへの きょうゆうを たんとうしました。', note: 'Concise three-part responsibility statement.', nextNodeId: 'transfer' }
        ]
      },
      {
        id: 'transfer',
        speaker: '面接官',
        line: 'その経験を、当社でどう生かせると思いますか。',
        reading: 'その けいけんを、とうしゃで どう いかせると おもいますか。',
        goal: 'Connect analysis and team adoption to improving the company’s customer operations.',
        required: [['分析'], ['チーム', '現場'], ['顧客', 'お客様'], ['改善']],
        choices: [
          { id: 'apply', japanese: 'データ分析だけでなく、現場のチームが使える形まで落とし込む経験を、御社の顧客対応改善に生かせると考えています。', reading: 'でーた ぶんせきだけでなく、げんばの ちーむが つかえる かたちまで おとしこむ けいけんを、おんしゃの こきゃく たいおう かいぜんに いかせると かんがえています。', note: 'Connects method, adoption, and the employer’s need.', nextNodeId: null },
          { id: 'customer', japanese: '分析とチームへの定着を両方進め、お客様対応の改善に貢献したいです。', reading: 'ぶんせきと ちーむへの ていちゃくを りょうほう すすめ、おきゃくさま たいおうの かいぜんに こうけんしたいです。', note: 'Short future-facing close.', nextNodeId: null }
        ]
      }
    ]
  },
  {
    id: 'seminar-disagreement',
    title: 'Disagree in a seminar',
    level: 'N2 to N1',
    purpose: 'Challenge a claim respectfully, distinguish evidence from interpretation, and propose a testable revision.',
    startNodeId: 'challenge',
    nodes: [
      {
        id: 'challenge',
        speaker: '発表者',
        line: 'この結果から、利用者は機能の多さを最も重視していると言えます。',
        reading: 'この けっかから、りようしゃは きのうの おおさを もっとも じゅうししていると いえます。',
        goal: 'Acknowledge the result but question whether it supports that conclusion.',
        required: [['結果', 'データ'], ['興味深い', '理解'], ['ただ', '一方で', 'しかし'], ['結論', '言い切']],
        choices: [
          { id: 'evidence', japanese: '結果は興味深いと思います。ただ、このデータだけで機能の多さが最重要だと言い切れるでしょうか。', reading: 'けっかは おもしろいと おもいます。ただ、この でーただけで きのうの おおさが さいじゅうようだと いいきれるでしょうか。', note: 'Challenges the inference rather than the speaker.', nextNodeId: 'why' },
          { id: 'cautious', japanese: '分析の意図は理解できます。一方で、その結論を支えるには追加の根拠が必要ではないでしょうか。', reading: 'ぶんせきの いとは りかいできます。いっぽうで、その けつろんを ささえるには ついかの こんきょが ひつようでは ないでしょうか。', note: 'Formal academic disagreement.', nextNodeId: 'why' }
        ]
      },
      {
        id: 'why',
        speaker: '発表者',
        line: 'どの点が不足していると考えますか。',
        reading: 'どの てんが ふそくしていると かんがえますか。',
        goal: 'Explain that respondents may have equated feature count with value because price was not controlled.',
        required: [['価格'], ['条件', '統制'], ['機能'], ['価値', 'お得']],
        choices: [
          { id: 'confound', japanese: '価格条件が統制されていないため、回答者が機能の多さを価値の高さと捉えた可能性があります。', reading: 'かかく じょうけんが とうせいされていない ため、かいとうしゃが きのうの おおさを かちの たかさと とらえた かのうせいが あります。', note: 'Names a specific alternative explanation.', nextNodeId: 'revision' },
          { id: 'value', japanese: '価格が同じ条件ではないので、機能数そのものより、お得さを評価した可能性が残ります。', reading: 'かかくが おなじ じょうけんでは ないので、きのうすう そのものより、おとくさを ひょうかした かのうせいが のこります。', note: 'Separates feature preference from perceived value.', nextNodeId: 'revision' }
        ]
      },
      {
        id: 'revision',
        speaker: '発表者',
        line: 'では、どのような追加調査が有効でしょうか。',
        reading: 'では、どのような ついか ちょうさが ゆうこうでしょうか。',
        goal: 'Propose holding price constant and varying only the number of features.',
        required: [['価格'], ['一定', '同じ'], ['機能'], ['変え', '比較']],
        choices: [
          { id: 'test', japanese: '価格を一定にしたうえで、機能数だけを変えた選択肢を比較すると、仮説を検証しやすいと思います。', reading: 'かかくを いっていに した うえで、きのうすうだけを かえた せんたくしを ひかくすると、かせつを けんしょうしやすいと おもいます。', note: 'Turns criticism into a testable revision.', nextNodeId: null },
          { id: 'constant', japanese: '価格を同じにして機能数だけを変える追加調査が有効だと考えます。', reading: 'かかくを おなじにして きのうすうだけを かえる ついか ちょうさが ゆうこうだと かんがえます。', note: 'Concise experimental proposal.', nextNodeId: null }
        ]
      }
    ]
  },
  {
    id: 'client-apology',
    title: 'Repair a client mistake',
    level: 'N2 to N1',
    purpose: 'Own an error without evasion, explain containment, and rebuild trust with preventive action.',
    startNodeId: 'report',
    nodes: [
      {
        id: 'report',
        speaker: '取引先',
        line: '先ほど届いた資料ですが、数字が前回と違っています。',
        reading: 'さきほど とどいた しりょうですが、すうじが ぜんかいと ちがっています。',
        goal: 'Apologize, acknowledge your checking error, and say you will verify immediately.',
        required: [['申し訳'], ['確認', 'チェック'], ['私', 'こちら'], ['すぐ', '直ちに']],
        choices: [
          { id: 'own', japanese: '大変申し訳ございません。こちらの確認不足です。直ちに元データと照合いたします。', reading: 'たいへん もうしわけ ございません。こちらの かくにんぶそくです。ただちに もとでーたと しょうごういたします。', note: 'Owns the failure and names the immediate action.', nextNodeId: 'impact' },
          { id: 'verify', japanese: '申し訳ございません。私のチェックに不備がありました。すぐに正しい数字を確認します。', reading: 'もうしわけ ございません。わたしの ちぇっくに ふびが ありました。すぐに ただしい すうじを かくにんします。', note: 'Direct responsibility without an excuse.', nextNodeId: 'impact' }
        ]
      },
      {
        id: 'impact',
        speaker: '取引先',
        line: '今日の会議で使う予定ですが、間に合いますか。',
        reading: 'きょうの かいぎで つかう よていですが、まにあいますか。',
        goal: 'Promise a corrected version within thirty minutes and ask them not to use the current file.',
        required: [
          ['三十分', '30分'],
          ['修正版', '正しい資料'],
          ['使わない', '使わず', '破棄', '使用を控え', '使用なさらない']
        ],
        choices: [
          { id: 'contain', japanese: '三十分以内に修正版をお送りします。恐れ入りますが、それまで現在の資料は使用なさらないようお願いいたします。', reading: 'さんじゅっぷん いないに しゅうせいばんを おおくりします。おそれいりますが、それまで げんざいの しりょうは しようなさらないよう おねがいいたします。', note: 'Contains the error and gives a concrete recovery time.', nextNodeId: 'prevent' },
          { id: 'replace', japanese: '三十分で正しい資料に差し替えます。今のファイルは使わずにお待ちいただけますでしょうか。', reading: 'さんじゅっぷんで ただしい しりょうに さしかえます。いまの ふぁいるは つかわずに おまちいただけますでしょうか。', note: 'Clear operational request.', nextNodeId: 'prevent' }
        ]
      },
      {
        id: 'prevent',
        speaker: '取引先',
        line: '分かりました。今後は同じことがないようにしてください。',
        reading: 'わかりました。こんごは おなじことが ないように してください。',
        goal: 'State that two people will verify figures before future delivery.',
        required: [['今後'], ['二人', '複数'], ['確認'], ['提出', '送付']],
        choices: [
          { id: 'double-check', japanese: '承知いたしました。今後は提出前に二人で数値を確認する手順に改めます。', reading: 'しょうちいたしました。こんごは ていしゅつまえに ふたりで すうちを かくにんする てじゅんに あらためます。', note: 'Names a concrete process change.', nextNodeId: null },
          { id: 'two-person', japanese: '今後は送付前の確認を複数人で行い、再発を防ぎます。', reading: 'こんごは そうふまえの かくにんを ふくすうにんで おこない、さいはつを ふせぎます。', note: 'Formal prevention commitment.', nextNodeId: null }
        ]
      }
    ]
  }
]
