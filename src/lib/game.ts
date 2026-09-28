export const GAME_NAME = "Who Knows Lesotho?";
export const FACEBOOK_PAGE_URL = "https://www.facebook.com/profile.php?id=61594758214323";
// Use the current published address by default so shared links always return to this game.
export const GAME_URL = "";

export type Question = {
  prompt: string;
  answers: [string, string, string, string];
  correct: number;
  category: string;
  difficulty: number;
};

export type DifficultyLevel = 1 | 2 | 3 | 4 | 5;

export const DIFFICULTY_LABELS: Record<DifficultyLevel, string> = {
  1: "Easy",
  2: "Medium",
  3: "Hard",
  4: "Expert",
  5: "Basotho Only"
};

export const QUESTIONS: Question[] = [
  // Level 1 - Easy
  { prompt: "What is the capital city of Lesotho?", answers: ["Maseru", "Hlotse", "Mafeteng", "Qacha's Nek"], correct: 0, category: "Places", difficulty: 1 },
  { prompt: "Lesotho is completely surrounded by which country?", answers: ["Botswana", "South Africa", "Eswatini", "Zimbabwe"], correct: 1, category: "Geography", difficulty: 1 },
  { prompt: "What is the traditional Basotho hat called?", answers: ["Mokorotlo", "Kofia", "Sombrero", "Fez"], correct: 0, category: "Culture", difficulty: 1 },
  { prompt: "What is the official language spoken alongside English in Lesotho?", answers: ["Setswana", "isiZulu", "Sesotho", "siSwati"], correct: 2, category: "Language", difficulty: 1 },
  { prompt: "What is Lesotho's currency called?", answers: ["Pula", "Lilangeni", "Loti", "Kwacha"], correct: 2, category: "Everyday life", difficulty: 1 },
  { prompt: "Which symbol appears on Lesotho's national flag?", answers: ["A lion", "A mokorotlo hat", "A mountain", "A star"], correct: 1, category: "National symbols", difficulty: 1 },
  
  // Level 2 - Medium
  { prompt: "What is Lesotho often called?", answers: ["The Golden Kingdom", "The Mountain Kingdom", "The Desert Kingdom", "The Island Kingdom"], correct: 1, category: "Identity", difficulty: 2 },
  { prompt: "Who founded the Basotho nation?", answers: ["King Letsie III", "Moshoeshoe I", "Shaka Zulu", "Mohlomi"], correct: 1, category: "History", difficulty: 2 },
  { prompt: "Which of these is one of Lesotho's ten districts?", answers: ["Gaborone", "Butha-Buthe", "Polokwane", "Mbabane"], correct: 1, category: "Districts", difficulty: 2 },
  { prompt: "Which famous dam is part of the Lesotho Highlands Water Project?", answers: ["Katse Dam", "Kariba Dam", "Aswan Dam", "Gariep Dam"], correct: 0, category: "Landmarks", difficulty: 2 },
  
  // Level 3 - Hard
  { prompt: "Which district is the highest in elevation?", answers: ["Qacha's Nek", "Mokhotlong", "Berea", "Mafeteng"], correct: 1, category: "Geography", difficulty: 3 },
  { prompt: "What is the traditional Basotho blanket pattern called 'Seanamarena' associated with?", answers: ["Wealth and status", "Marriage only", "Farming", "Mourning"], correct: 0, category: "Culture", difficulty: 3 },
  { prompt: "Which mountain is the highest point in Lesotho?", answers: ["Thaba Bosiu", "Qiloane", "Thabana Ntlenyana", "Machache"], correct: 2, category: "Geography", difficulty: 3 },
  { prompt: "Which river forms part of the border between Lesotho and South Africa?", answers: ["Senqunyane", "Caledon (Mohokare)", "Malibamatšo", "Matsoku"], correct: 1, category: "Geography", difficulty: 3 },
  { prompt: "What is the Sesotho name for the Caledon River?", answers: ["Senqu", "Mohokare", "Malibamatšo", "Matsoku"], correct: 1, category: "Geography", difficulty: 3 },
  { prompt: "Which district contains Thaba-Tseka town?", answers: ["Thaba-Tseka", "Mokhotlong", "Leribe", "Butha-Buthe"], correct: 0, category: "Districts", difficulty: 3 },
  { prompt: "Which of these is NOT one of Lesotho's four major rivers in the Lesotho Highlands Water Project?", answers: ["Malibamatšo", "Senqunyane", "Matsoku", "Makhaleng"], correct: 3, category: "Geography", difficulty: 3 },
  { prompt: "Where did Moshoeshoe I establish his first major mountain stronghold?", answers: ["Thaba Bosiu", "Qacha's Nek", "Mafeteng", "Morija"], correct: 0, category: "History", difficulty: 3 },
  
  // Level 4 - Expert
  { prompt: "Moshoeshoe I was born in which place?", answers: ["Thaba-Bosiu", "Menkhoaneng", "Butha-Buthe", "Morija"], correct: 1, category: "History", difficulty: 4 },
  { prompt: "What was Moshoeshoe I's birth name?", answers: ["Lepoqo", "Letsie", "Makoanyane", "Sekonyela"], correct: 0, category: "History", difficulty: 4 },
  { prompt: "Moshoeshoe I belonged to which clan?", answers: ["Bataung", "Koena", "Bafokeng", "Batlokoa"], correct: 1, category: "History", difficulty: 4 },
  { prompt: "Which mountain did Moshoeshoe move to around 1820?", answers: ["Thaba Bosiu", "Qiloane", "Butha-Buthe Mountain", "Thabana Ntlenyana"], correct: 2, category: "History", difficulty: 4 },
  { prompt: "Which geographical zone covers the largest area of Lesotho?", answers: ["Lowlands", "Foothills", "Mountains", "Senqu River Valley"], correct: 2, category: "Geography", difficulty: 4 },
  { prompt: "Approximately what percentage of Lesotho is classified as mountainous?", answers: ["17%", "31%", "59%", "72%"], correct: 2, category: "Geography", difficulty: 4 },
  { prompt: "What is the lowest approximate elevation found in Lesotho?", answers: ["900 m", "1,388 m", "1,750 m", "2,000 m"], correct: 1, category: "Geography", difficulty: 4 },
  { prompt: "Which two countries' coordinates roughly define Lesotho's location?", answers: ["10–15°S and 20–25°E", "28–31°S and 27–30°E", "20–25°S and 30–35°E", "30–35°S and 20–25°E"], correct: 1, category: "Geography", difficulty: 4 },
  { prompt: "Which place is associated with the beginning of Moshoeshoe I's journey to Thaba-Bosiu?", answers: ["Menkhoaneng", "Morija", "Maseru", "Qacha's Nek"], correct: 0, category: "History", difficulty: 4 },
  { prompt: "How many administrative districts does Lesotho have?", answers: ["8", "9", "10", "12"], correct: 2, category: "Districts", difficulty: 4 },
  
  // Level 5 - Basotho Only (Very Hard - Open-ended questions for future implementation)
  // These are currently stored as reference for future open-ended question feature
];

export const getResultMessage = (score: number) => {
  if (score <= 3) return "You need to explore Lesotho more! 😂";
  if (score <= 6) return "Not bad! You know a little about Lesotho. 🇱🇸";
  if (score <= 8) return "Impressive! You know Lesotho pretty well! 🔥";
  return "WOW! You are a true Lesotho expert! 👑🇱🇸";
};
