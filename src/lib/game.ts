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
  { prompt: "What is the capital city of Lesotho?", answers: ["Maseru", "Hlotse", "Mafeteng", "Qacha’s Nek"], correct: 0, category: "Places" },
  { prompt: "Lesotho is completely surrounded by which country?", answers: ["Botswana", "South Africa", "Eswatini", "Zimbabwe"], correct: 1, category: "Geography" },
  { prompt: "What is Lesotho often called?", answers: ["The Golden Kingdom", "The Mountain Kingdom", "The Desert Kingdom", "The Island Kingdom"], correct: 1, category: "Identity" },
  { prompt: "Who founded the Basotho nation?", answers: ["King Letsie III", "Moshoeshoe I", "Shaka Zulu", "Mohlomi"], correct: 1, category: "History" },
  { prompt: "What is the traditional Basotho hat called?", answers: ["Mokorotlo", "Kofia", "Sombrero", "Fez"], correct: 0, category: "Culture" },
  { prompt: "Which of these is one of Lesotho’s ten districts?", answers: ["Gaborone", "Butha-Buthe", "Polokwane", "Mbabane"], correct: 1, category: "Districts" },
  { prompt: "What is the official language spoken alongside English in Lesotho?", answers: ["Setswana", "isiZulu", "Sesotho", "siSwati"], correct: 2, category: "Language" },
  { prompt: "Which famous dam is part of the Lesotho Highlands Water Project?", answers: ["Katse Dam", "Kariba Dam", "Aswan Dam", "Gariep Dam"], correct: 0, category: "Landmarks" },
  { prompt: "What is Lesotho’s currency called?", answers: ["Pula", "Lilangeni", "Loti", "Kwacha"], correct: 2, category: "Everyday life" },
  { prompt: "Which symbol appears on Lesotho’s national flag?", answers: ["A lion", "A mokorotlo hat", "A mountain", "A star"], correct: 1, category: "National symbols" },
];

export const getResultMessage = (score: number) => {
  if (score <= 3) return "You need to explore Lesotho more! 😂";
  if (score <= 6) return "Not bad! You know a little about Lesotho. 🇱🇸";
  if (score <= 8) return "Impressive! You know Lesotho pretty well! 🔥";
  return "WOW! You are a true Lesotho expert! 👑🇱🇸";
};
