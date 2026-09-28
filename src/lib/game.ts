export const GAME_NAME = "Who Knows Lesotho?";
export const FACEBOOK_PAGE_URL = "https://www.facebook.com/profile.php?id=61594758214323";
// Use the current published address by default so shared links always return to this game.
export const GAME_URL = "";

export type Question = {
  prompt: string;
  answers: [string, string, string, string];
  correct: number;
  category: string;
};

export const QUESTIONS: Question[] = [
  // LEVEL 1 — EASY
  { prompt: "What is the capital city of Lesotho?", answers: ["Leribe", "Maseru", "Mafeteng", "Mokhotlong"], correct: 1, category: "Easy" },
  { prompt: "What is Lesotho's currency?", answers: ["Rand", "Dollar", "Loti", "Pula"], correct: 2, category: "Easy" },
  { prompt: "What is Lesotho's national language?", answers: ["Zulu", "Sesotho", "Xhosa", "Setswana"], correct: 1, category: "Easy" },
  { prompt: "When did Lesotho gain independence?", answers: ["1965", "1966", "1967", "1970"], correct: 1, category: "Easy" },
  { prompt: "What is a person from Lesotho called?", answers: ["Lesothian", "Mosotho", "Basuthian", "Sothoan"], correct: 1, category: "Easy" },
  { prompt: "What is the traditional Basotho hat called?", answers: ["Mokorotlo", "Seanamarena", "Seshoeshoe", "Lekoko"], correct: 0, category: "Easy" },
  { prompt: "Which country completely surrounds Lesotho?", answers: ["Botswana", "Eswatini", "South Africa", "Zimbabwe"], correct: 2, category: "Easy" },
  { prompt: "What is Lesotho's national motto?", answers: ["Peace and Unity", "Khotso, Pula, Nala", "Peace and Prosperity", "Unity and Strength"], correct: 1, category: "Easy" },
  { prompt: "What is the highest mountain in Lesotho?", answers: ["Qiloane", "Thaba-Bosiu", "Thabana Ntlenyana", "Maloti"], correct: 2, category: "Easy" },
  { prompt: "Which famous waterfall is found in Semonkong?", answers: ["Maletsunyane Falls", "Victoria Falls", "Qiloane Falls", "Mohokare Falls"], correct: 0, category: "Easy" },
  // LEVEL 2 — MEDIUM
  { prompt: "Who founded the Basotho nation?", answers: ["Letsie III", "Moshoeshoe I", "Moshoeshoe II", "Leabua Jonathan"], correct: 1, category: "Medium" },
  { prompt: "Where was Moshoeshoe I born?", answers: ["Morija", "Menkhoaneng", "Maseru", "Thaba-Bosiu"], correct: 1, category: "Medium" },
  { prompt: "What was Moshoeshoe I's birth name?", answers: ["Lepoqo", "Mokhachane", "Letsie", "Sekonyela"], correct: 0, category: "Medium" },
  { prompt: "How many districts does Lesotho have?", answers: ["8", "9", "10", "12"], correct: 2, category: "Medium" },
  { prompt: "What is the Sesotho name for the Caledon River?", answers: ["Senqu", "Mohokare", "Malibamatšo", "Senqunyane"], correct: 1, category: "Medium" },
  { prompt: "Which town is home to the famous Morija Museum?", answers: ["Morija", "Roma", "Butha-Buthe", "Qacha's Nek"], correct: 0, category: "Medium" },
  { prompt: "Which district contains Mokhotlong town?", answers: ["Mokhotlong", "Thaba-Tseka", "Leribe", "Qacha's Nek"], correct: 0, category: "Medium" },
  { prompt: "Which traditional blanket is strongly associated with Basotho culture?", answers: ["Seanamarena", "Shweshwe", "Madiba", "Kente"], correct: 0, category: "Medium" },
  { prompt: "What is the name of Lesotho's national airline?", answers: ["Air Lesotho", "Maluti Air", "Maluti Sky", "None currently operates as a national airline"], correct: 3, category: "Medium" },
  { prompt: "What does Khotso, Pula, Nala mean?", answers: ["Peace, Rain, Prosperity", "Unity, Rain, Strength", "Peace, Land, Wealth", "Rain, Food, Peace"], correct: 0, category: "Medium" },
  // LEVEL 3 — HARD
  { prompt: "Which clan did Moshoeshoe I belong to?", answers: ["Batlokoa", "Koena", "Bataung", "Bafokeng"], correct: 1, category: "Hard" },
  { prompt: "Who was Moshoeshoe I's father?", answers: ["Mokhachane", "Lepoqo", "Letsie", "Sekonyela"], correct: 0, category: "Hard" },
  { prompt: "What was Lesotho called during British rule?", answers: ["Basutoland", "Sotho Kingdom", "Mountain Colony", "Southern Sotho"], correct: 0, category: "Hard" },
  { prompt: "In what year did Lesotho become a British territory?", answers: ["1843", "1868", "1871", "1884"], correct: 1, category: "Hard" },
  { prompt: "Which mountain became Moshoeshoe I's famous stronghold?", answers: ["Qiloane", "Thaba-Bosiu", "Thabana Ntlenyana", "Machache"], correct: 1, category: "Hard" },
  { prompt: "What is Thabana Ntlenyana's approximate elevation?", answers: ["2,482 m", "3,482 m", "4,482 m", "3,082 m"], correct: 1, category: "Hard" },
  { prompt: "Which river is known as the Senqu in Lesotho?", answers: ["Orange River", "Caledon River", "Vaal River", "Tugela River"], correct: 0, category: "Hard" },
  { prompt: "Which district is known for the Maloti Mountains and high-altitude terrain?", answers: ["Maseru", "Mokhotlong", "Mafeteng", "Berea"], correct: 1, category: "Hard" },
  { prompt: "What is the name of the famous rock formation shaped like a traditional Basotho hat?", answers: ["Qiloane", "Thaba-Bosiu", "Qeme", "Machache"], correct: 0, category: "Hard" },
  { prompt: "Which town is commonly associated with Lesotho's first university?", answers: ["Roma", "Mafeteng", "Mokhotlong", "Butha-Buthe"], correct: 0, category: "Hard" },
  // LEVEL 4 — VERY HARD
  { prompt: "In which year was Basutoland annexed to the Cape Colony?", answers: ["1868", "1871", "1884", "1903"], correct: 1, category: "Very Hard" },
  { prompt: "In which year was Basutoland restored to direct British Crown control?", answers: ["1871", "1880", "1884", "1903"], correct: 2, category: "Very Hard" },
  { prompt: "What was the name of the traditional council established under colonial administration?", answers: ["Basutoland National Council", "Lesotho National Council", "Basotho Parliament", "King's Council"], correct: 0, category: "Very Hard" },
  { prompt: "Which party won the first general election before independence?", answers: ["BCP", "BNP", "LCD", "MFP"], correct: 1, category: "Very Hard" },
  { prompt: "Who became Lesotho's first Prime Minister at independence?", answers: ["Ntsu Mokhehle", "Leabua Jonathan", "Mosisili", "Pakalitha Mosisili"], correct: 1, category: "Very Hard" },
  { prompt: "Which party formed the government after the 1993 election?", answers: ["BNP", "BCP", "LCD", "MFP"], correct: 1, category: "Very Hard" },
  { prompt: "What electoral system was introduced for the 2002 elections?", answers: ["First Past the Post", "Mixed Member Proportional", "Pure PR", "Two-round system"], correct: 1, category: "Very Hard" },
  { prompt: "What is the name of the major water-transfer project involving Lesotho and South Africa?", answers: ["Lesotho Highlands Water Project", "Maloti Water Project", "Senqu Water Scheme", "Southern Africa Water Project"], correct: 0, category: "Very Hard" },
  { prompt: "Which dam is associated with Phase I of the Lesotho Highlands Water Project?", answers: ["Katse Dam", "Mohale Dam", "Metolong Dam", "Muela Dam"], correct: 0, category: "Very Hard" },
  { prompt: "Which dam is associated with Phase I-B of the Lesotho Highlands Water Project?", answers: ["Katse", "Mohale", "Metolong", "Letseng"], correct: 1, category: "Very Hard" },
  // LEVEL 5 — EXTREME
  { prompt: "What was Moshoeshoe I's father's full name?", answers: ["Mokhachane", "Lepoqo", "Sekonyela", "Makoanyane"], correct: 0, category: "Extreme" },
  { prompt: "Which clan is traditionally associated with Moshoeshoe I's lineage?", answers: ["Koena", "Batlokoa", "Bataung", "Bafokeng"], correct: 0, category: "Extreme" },
  { prompt: "Which historical event occurred in 1865–1866 during the Basotho wars?", answers: ["War with the Orange Free State", "Independence from Britain", "Formation of the UN", "Establishment of Maseru"], correct: 0, category: "Extreme" },
  { prompt: "What treaty ended the first Basotho–Boer War?", answers: ["Treaty of Aliwal North", "Treaty of Thaba-Bosiu", "Treaty of Morija", "Treaty of Berea"], correct: 0, category: "Extreme" },
  { prompt: "Which treaty transferred Basutoland to British protection in 1868?", answers: ["Treaty of Aliwal North", "Treaty of Thaba Bosiu", "Treaty of Maseru", "Treaty of Natal"], correct: 0, category: "Extreme" },
  { prompt: "Which Basotho king succeeded Moshoeshoe I?", answers: ["Letsie I", "Griffith Lerotholi", "Moshoeshoe II", "Letsie III"], correct: 0, category: "Extreme" },
  { prompt: "What was the name of Moshoeshoe I's principal royal mountain stronghold?", answers: ["Butha-Buthe", "Thaba-Bosiu", "Qiloane", "Machache"], correct: 1, category: "Extreme" },
  { prompt: "Which Lesotho mountain is the highest peak in Southern Africa south of Kilimanjaro?", answers: ["Thabana Ntlenyana", "Qiloane", "Thaba-Bosiu", "Maloti"], correct: 0, category: "Extreme" },
  { prompt: "Which Lesotho dam is located near Mokhotlong and forms part of the Highlands Water Project?", answers: ["Katse", "Mohale", "Polihali", "Metolong"], correct: 2, category: "Extreme" },
  { prompt: "What is the traditional name of the Basotho nation commonly translated as 'people of the South'?", answers: ["Basotho", "Bakone", "Batswana", "AmaZulu"], correct: 0, category: "Extreme" },
];

export const getResultMessage = (score: number) => {
  if (score <= 3) return "You need to explore Lesotho more! 😂";
  if (score <= 6) return "Not bad! You know a little about Lesotho. 🇱🇸";
  if (score <= 8) return "Impressive! You know Lesotho pretty well! 🔥";
  return "WOW! You are a true Lesotho expert! 👑🇱🇸";
};
