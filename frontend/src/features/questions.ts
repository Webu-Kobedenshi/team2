export type QuestionOption = {
  id: string;
  label: string;
};

export type Question = {
  id: string;
  text: string;
  conversationPrompt: string;
  options: QuestionOption[];
};

export const questions: Question[] = [
  {
    id: "bloodType",
    text: "あなたの血液型は？",
    conversationPrompt:
      "血液型あるあるを信じるか、自分に当てはまると思うものを話してみよう！",
    options: [
      { id: "a", label: "A" },
      { id: "b", label: "B" },
      { id: "o", label: "O" },
      { id: "ab", label: "AB" },
    ],
  },
  {
    id: "usualStyle",
    text: "普段は？",
    conversationPrompt:
      "最近どんな場所や過ごし方が楽しかったか、みんなで話してみよう！",
    options: [
      { id: "outdoor", label: "アウトドア" },
      { id: "indoor", label: "インドア" },
    ],
  },
  {
    id: "holidayStyle",
    text: "休日は？",
    conversationPrompt: "それぞれの理想の休日の過ごし方を聞いてみよう！",
    options: [
      { id: "withPeople", label: "人と過ごしたい" },
      { id: "aloneTime", label: "1人の時間大事" },
    ],
  },
  {
    id: "uncomfortablePlace",
    text: "苦手な場所は？",
    conversationPrompt:
      "どうして苦手なのか、印象に残っている出来事があれば話してみよう！",
    options: [
      { id: "highPlace", label: "高いところ" },
      { id: "hauntedHouse", label: "お化け屋敷" },
      { id: "narrowPlace", label: "狭いところ" },
    ],
  },
  {
    id: "specialAbility",
    text: "1日だけ能力を得るなら？",
    conversationPrompt: "選んだ能力で最初に何をしたいか、順番に話してみよう！",
    options: [
      { id: "invisible", label: "透明人間" },
      { id: "teleport", label: "瞬間移動" },
      { id: "stopTime", label: "時間停止" },
      { id: "readMind", label: "心を読む" },
    ],
  },
  {
    id: "loveOrFriendship",
    text: "1番の親友と好きな人が被ったら",
    conversationPrompt: "どちらを選んだか、話せる範囲で理由を聞いてみよう！",
    options: [
      { id: "love", label: "恋愛" },
      { id: "friendship", label: "友情" },
    ],
  },
  {
    id: "decisionStyle",
    text: "行動は？",
    conversationPrompt:
      "最近、直感で決めたことや、じっくり迷ったことを話してみよう！",
    options: [
      { id: "intuition", label: "直感で" },
      { id: "indecisive", label: "優柔不断" },
    ],
  },
  {
    id: "motivation",
    text: "モチベーションが上がるのは？",
    conversationPrompt:
      "どんな言葉や出来事でやる気が出たか、みんなで話してみよう！",
    options: [
      { id: "recognized", label: "誰かに評価されたとき" },
      { id: "selfSatisfied", label: "自分が納得できた時" },
    ],
  },
];
