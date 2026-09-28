<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep quiz questions, public page URL, and share URL configuration in `src/lib/game.ts` so game content and links stay consistent across the interface.
- Keep timed gameplay and sharing in the home route's client state; no persistence is needed for the brief's core game and an unconnected leaderboard must not imply global rankings.
