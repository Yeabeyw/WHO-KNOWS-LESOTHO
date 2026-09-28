import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, Check, CheckCircle2, Clock3, Copy, ExternalLink, Facebook, Flag, Heart, RotateCcw, Share2, Trophy, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FACEBOOK_PAGE_URL, GAME_NAME, GAME_URL, QUESTIONS, getResultMessage } from "@/lib/game";
import { saveResult } from "./-api.game-results";
import mountains from "@/assets/lesotho-mountains.jpg";
import brand from "@/assets/tvision-forge-logo.jpeg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Who Knows Lesotho? — The 10-Question Challenge" },
    { name: "description", content: "Think you know Lesotho? Answer 10 quick questions about the Mountain Kingdom, see your score, and challenge your friends." },
    { property: "og:title", content: "Who Knows Lesotho? 🇱🇸" },
    { property: "og:description", content: "10 questions. 30 seconds each. Think you know the Mountain Kingdom? Play and share your score!" },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  component: Index,
});

type Phase = "welcome" | "playing" | "result";
type Difficulty = "Easy" | "Medium" | "Hard" | "Very Hard" | "Extreme";
const LETTERS = ["A", "B", "C", "D"];
const getLink = () => GAME_URL || (typeof window !== "undefined" ? `${window.location.origin}/` : "");

function Index() {
  const [phase, setPhase] = useState<Phase>("welcome");
  const [difficulty, setDifficulty] = useState<Difficulty | null>(null);
  const [gameQuestions, setGameQuestions] = useState<typeof QUESTIONS>([]);
  const [index, setIndex] = useState(0);
  const [seconds, setSeconds] = useState(30);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [showShare, setShowShare] = useState(false);
  const [copied, setCopied] = useState(false);
  const locked = useRef(false);
  const nextTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const question = gameQuestions[index];

  const start = (selectedDifficulty: Difficulty) => {
    if (nextTimer.current) clearTimeout(nextTimer.current);
    locked.current = false;
    setDifficulty(selectedDifficulty);
    // Filter questions by difficulty and shuffle
    const filtered = QUESTIONS.filter(q => q.category === selectedDifficulty);
    const shuffled = filtered.sort(() => Math.random() - 0.5);
    setGameQuestions(shuffled.slice(0, 10));
    setIndex(0); setScore(0); setSeconds(30); setSelected(null); setShowShare(false); setCopied(false); setPhase("playing");
  };

  const submitAnswer = useCallback((choice: number) => {
    const currentQuestion = gameQuestions[index];
    if (locked.current || !currentQuestion) return;
    locked.current = true;
    setSelected(choice);
    if (choice === currentQuestion.correct) setScore(current => current + 1);
    nextTimer.current = setTimeout(() => {
      if (index === gameQuestions.length - 1) setPhase("result");
      else setIndex(index + 1);
      setSelected(null);
    }, 950);
  }, [index, gameQuestions]);

  useEffect(() => {
    if (phase !== "playing") return;
    locked.current = false;
    setSeconds(30);
    const timer = setInterval(() => {
      setSeconds(current => {
        if (current <= 1) { clearInterval(timer); submitAnswer(-1); return 0; }
        return current - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [phase, index, submitAnswer]);

  useEffect(() => () => { if (nextTimer.current) clearTimeout(nextTimer.current); }, []);

  // Save game result when phase changes to result
  useEffect(() => {
    if (phase === "result") {
      saveResult({
        data: {
          score,
          timestamp: new Date().toISOString(),
          userAgent: typeof navigator !== "undefined" ? navigator.userAgent : undefined,
          followedPage: false, // This could be updated if we track actual follows
        }
      }).catch(console.error);
    }
  }, [phase, score]);

  const shareText = `🇱🇸 I scored ${score}/10 on ${GAME_NAME}! Think you can beat me? 🎮🔥 Play the challenge: ${getLink()}`;
  const shareFacebook = () => {
    const url = new URL("https://www.facebook.com/sharer/sharer.php");
    url.searchParams.set("u", getLink());
    window.open(url.toString(), "_blank", "noopener,noreferrer");
  };
  const shareWhatsApp = () => window.open(`https://wa.me/?text=${encodeURIComponent(shareText)}`, "_blank", "noopener,noreferrer");
  const copyLink = async () => {
    try { await navigator.clipboard.writeText(shareText); setCopied(true); setTimeout(() => setCopied(false), 2500); }
    catch { window.prompt("Copy your challenge", shareText); }
  };
  const shareNative = async () => {
    if (typeof navigator.share === "function") {
      try { await navigator.share({ title: GAME_NAME, text: `🇱🇸 I scored ${score}/10! Think you can beat me? 🎮🔥`, url: getLink() }); }
      catch { /* The share sheet can be dismissed without changing the game. */ }
    } else setShowShare(value => !value);
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="topline" />
      <header className="site-header">
        <div className="mx-auto flex h-full max-w-6xl items-center justify-between gap-3 px-5 sm:px-8">
          <div className="flex items-center gap-2.5 font-display text-lg font-bold text-foreground"><span className="lesotho-flag brand-flag" aria-label="Lesotho flag" role="img" /><span>WHO KNOWS <span className="text-primary">LESOTHO?</span></span></div>
          <div className="flex items-center gap-4">
            <a href="/admin" className="text-xs font-bold text-muted-foreground hover:text-primary hidden sm:block">Admin</a>
            <a href={FACEBOOK_PAGE_URL} target="_blank" rel="noopener noreferrer" className="header-social" aria-label="Visit Tvision Forge on Facebook"><Facebook size={18} fill="currentColor" /><span className="hidden sm:inline">Follow us</span><ExternalLink size={13} className="hidden sm:block" /></a>
          </div>
        </div>
      </header>

      {phase === "welcome" && <>
        <section className="welcome-hero relative isolate overflow-hidden">
          <img src={mountains} alt="Sunlit mountains and valleys in Lesotho" width={1536} height={1024} className="absolute inset-0 -z-20 h-full w-full object-cover object-center" />
          <div className="hero-shade absolute inset-0 -z-10" />
          <div className="hero-pattern pointer-events-none absolute inset-0 -z-10" />
          <div className="mx-auto flex min-h-[inherit] max-w-6xl flex-col justify-center px-5 py-14 sm:px-8">
            <div className="hero-copy max-w-[650px]">
              <span className="eyebrow-light mb-6 inline-flex items-center gap-2"><span className="inline-block size-2 rounded-full bg-highlight" /> THE ULTIMATE LESOTHO QUIZ</span>
              <h1 className="font-display text-[clamp(3.3rem,7vw,6.4rem)] font-black leading-[.98] text-hero-foreground">WHO KNOWS<br /><span className="text-highlight">LESOTHO?</span><span className="lesotho-flag hero-flag ml-3 inline-block align-middle" aria-label="Lesotho flag" role="img" /></h1>
              <p className="mt-7 font-display text-xl font-bold text-hero-foreground sm:text-2xl">Think you know Lesotho? Prove it.</p>
              <p className="mt-3 max-w-md text-base leading-relaxed text-hero-muted">Answer 10 quick questions and see how well you really know the Mountain Kingdom.</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button onClick={() => start("Easy")} size="lg" className="h-14 min-w-40 rounded-md px-6 text-base font-extrabold shadow-xl bg-green-600 hover:bg-green-700">🟢 EASY</Button>
                <Button onClick={() => start("Medium")} size="lg" className="h-14 min-w-40 rounded-md px-6 text-base font-extrabold shadow-xl bg-yellow-600 hover:bg-yellow-700">🟡 MEDIUM</Button>
                <Button onClick={() => start("Hard")} size="lg" className="h-14 min-w-40 rounded-md px-6 text-base font-extrabold shadow-xl bg-orange-600 hover:bg-orange-700">🟠 HARD</Button>
                <Button onClick={() => start("Very Hard")} size="lg" className="h-14 min-w-40 rounded-md px-6 text-base font-extrabold shadow-xl bg-red-600 hover:bg-red-700">🔴 VERY HARD</Button>
                <Button onClick={() => start("Extreme")} size="lg" className="h-14 min-w-40 rounded-md px-6 text-base font-extrabold shadow-xl bg-purple-600 hover:bg-purple-700">💀 EXTREME</Button>
              </div>
              <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm font-semibold text-hero-muted"><span className="flex items-center gap-2"><Zap size={17} className="text-highlight" /> 10 questions per level</span><span className="flex items-center gap-2"><Clock3 size={17} className="text-highlight" /> 30 seconds each</span><span className="flex items-center gap-2"><Trophy size={17} className="text-highlight" /> One epic score</span></div>
            </div>
          </div>
          <div className="hero-bottom-stripe" />
        </section>
        <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
          <div className="grid items-center gap-8 md:grid-cols-[1fr_auto]">
            <div><span className="section-kicker">A LITTLE KNOWLEDGE. A LOT OF PRIDE.</span><h2 className="mt-2 font-display text-3xl font-black leading-tight sm:text-4xl">How well do you know <span className="text-primary">the Kingdom in the Sky?</span></h2><p className="mt-3 max-w-xl text-muted-foreground">From mountains to music, history to hometowns — take the challenge and send your score to someone who thinks they know more.</p></div>
            <div className="flex items-center gap-3 border-l-4 border-highlight pl-5"><span className="font-display text-5xl font-black text-primary">10</span><span className="text-sm font-bold uppercase leading-tight text-muted-foreground">questions<br />to prove it</span></div>
          </div>
        </section>
      </>}

      {phase === "playing" && question && <section className="quiz-stage min-h-[calc(100vh-70px)] px-5 py-9 sm:py-14">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 flex items-center justify-between gap-3"><div className="flex items-center gap-2 text-xs font-extrabold uppercase text-primary"><Flag size={16} /> THE LESOTHO CHALLENGE</div><span className="text-sm font-bold text-muted-foreground">{index + 1} / {gameQuestions.length}</span></div>
          <div className="progress-track" role="progressbar" aria-label="Quiz progress" aria-valuenow={index + 1} aria-valuemin={0} aria-valuemax={gameQuestions.length}><div className="progress-fill" style={{ width: `${((index + 1) / gameQuestions.length) * 100}%` }} /></div>
          <div className="mt-7 flex items-end justify-between gap-3"><div><span className="section-kicker">QUESTION {String(index + 1).padStart(2, "0")} OF 10 · {question.category.toUpperCase()}</span><h1 className="mt-3 font-display text-3xl font-black leading-tight sm:text-5xl">{question.prompt}</h1></div><div className={`timer-pill shrink-0 ${seconds <= 10 ? "timer-urgent" : ""}`} aria-label={`${seconds} seconds remaining`}><Clock3 size={18} /><span>{seconds}s</span></div></div>
          <div className="mt-9 grid gap-3 sm:grid-cols-2">{question.answers.map((answer, choice) => {
            const revealed = selected !== null;
            const correct = choice === question.correct;
            return <Button key={choice} variant="outline" disabled={revealed} onClick={() => submitAnswer(choice)} className={`answer-option h-auto min-h-20 justify-start gap-4 whitespace-normal rounded-md p-4 text-left text-base font-bold ${revealed && correct ? "answer-correct" : ""} ${revealed && selected === choice && !correct ? "answer-wrong" : ""} ${revealed && !correct && selected !== choice ? "answer-dim" : ""}`}><span className="answer-letter">{LETTERS[choice]}</span><span className="flex-1">{answer}</span>{revealed && correct && <CheckCircle2 size={21} className="shrink-0" />}{revealed && selected === choice && !correct && <X size={21} className="shrink-0" />}</Button>;
          })}</div>
          <div className="mt-8 flex items-center justify-between gap-3 text-xs font-semibold text-muted-foreground"><span className="flex items-center gap-2"><span className="lesotho-flag small-flag" aria-label="Lesotho flag" role="img" />THE MOUNTAIN KINGDOM</span><span>{selected === -1 ? "Time’s up!" : selected !== null ? (selected === question.correct ? "That’s right!" : "Not quite!") : "Choose your answer"}</span></div>
        </div>
      </section>}

      {phase === "result" && <section className="results-stage min-h-[calc(100vh-70px)] px-5 py-10 sm:py-14"><div className="mx-auto max-w-3xl text-center">
        <div className="mx-auto mb-5 flex size-16 items-center justify-center rounded-full bg-highlight text-3xl">🏆</div><span className="section-kicker">THE RESULTS ARE IN</span><h1 className="mt-2 font-display text-4xl font-black sm:text-5xl">Your Lesotho score</h1>
        <div className="score-card relative mx-auto mt-8 max-w-xl overflow-hidden p-7 text-center sm:p-10"><div className="score-pattern pointer-events-none absolute inset-0" /><div className="relative"><p className="flex items-center justify-center gap-2 text-xs font-extrabold uppercase text-hero-muted">WHO KNOWS LESOTHO? <span className="lesotho-flag small-flag" aria-label="Lesotho flag" role="img" /></p><p className="mt-2 text-sm font-semibold text-hero-muted">{difficulty?.toUpperCase()} LEVEL</p><div className="mt-4 font-display text-[6rem] font-black leading-none text-highlight sm:text-[8rem]">{score}<span className="text-4xl text-hero-foreground sm:text-5xl">/10</span></div><p className="mt-4 font-display text-xl font-bold text-hero-foreground sm:text-2xl">{getResultMessage(score)}</p><div className="mx-auto mt-6 h-px max-w-64 bg-hero-foreground/20" /><p className="mt-5 text-sm font-semibold text-hero-muted">Can your friends beat your score?</p></div></div>
        <p className="mt-8 font-display text-lg font-bold">Share your score and challenge someone!</p>
        <div className="mx-auto mt-5 flex max-w-xl flex-col gap-3 sm:flex-row"><Button onClick={shareNative} className="h-12 flex-1 rounded-md text-sm font-extrabold"><Share2 size={18} /> SHARE MY SCORE</Button><Button onClick={() => setShowShare(value => !value)} variant="outline" className="h-12 flex-1 rounded-md border-primary text-sm font-extrabold text-primary"><Zap size={18} /> CHALLENGE A FRIEND</Button></div>
        {showShare && <div className="mx-auto mt-3 grid max-w-xl grid-cols-3 gap-2" aria-label="Share options"><Button variant="outline" onClick={shareWhatsApp} className="h-11 rounded-md px-2 text-xs font-bold">WhatsApp</Button><Button variant="outline" onClick={shareFacebook} className="h-11 rounded-md px-2 text-xs font-bold"><Facebook size={16} /> Facebook</Button><Button variant="outline" onClick={copyLink} className="h-11 rounded-md px-2 text-xs font-bold">{copied ? <Check size={16} /> : <Copy size={16} />}{copied ? "Copied" : "Copy"}</Button></div>}
        <div className="mt-10 border-t border-border pt-8"><img src={brand.url} alt="Tvision Forge" loading="lazy" width={1600} height={1073} className="mx-auto mb-4 h-20 w-auto mix-blend-multiply dark:mix-blend-normal" /><p className="font-display text-lg font-black">❤️ ENJOYED THE GAME?</p><p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">Visit our Facebook page and follow us for more challenges, games and content!</p><Button asChild className="mt-5 h-auto min-h-12 max-w-full whitespace-normal rounded-md px-6 py-3 text-center text-sm font-extrabold"><a href={FACEBOOK_PAGE_URL} target="_blank" rel="noopener noreferrer"><Heart size={17} /> VISIT & FOLLOW OUR FACEBOOK PAGE <ExternalLink size={15} /></a></Button></div>
        <Button variant="ghost" onClick={() => setPhase("welcome")} className="mt-7 h-11 font-bold"><RotateCcw size={17} /> PLAY AGAIN</Button>
      </div></section>}

      <footer className="border-t border-border bg-secondary/50 px-5 py-5"><div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground sm:px-3"><span className="flex items-center gap-2">Made with <span className="lesotho-flag small-flag" aria-label="Lesotho flag" role="img" /> for the Mountain Kingdom</span><div className="flex items-center gap-4"><a href="/admin" className="font-bold text-foreground hover:text-primary">Admin</a><a href={FACEBOOK_PAGE_URL} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 font-bold text-foreground hover:text-primary">A game by Tvision Forge <ArrowRight size={14} /></a></div></div></footer>
    </main>
  );
}
