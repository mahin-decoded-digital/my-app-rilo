import { useEffect, useMemo } from "react";
import { useHighScoresStore } from "@/store/highScoresStore";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Trophy } from "lucide-react";

function formatDate(ts: number) {
  const date = new Date(ts);
  return date.toLocaleString(undefined, { dateStyle: 'short', timeStyle: 'short' });
}

export default function HighScoresPage() {
  const highScores = useHighScoresStore((s) => s.highScores);
  const fetchHighScores = useHighScoresStore((s) => s.fetchHighScores);

  useEffect(() => {
    fetchHighScores();
  }, [fetchHighScores]);

  const sortedHighScores = useMemo(() =>
    [...(highScores ?? [])]
      .sort((a, b) => b.score - a.score || b.timestamp - a.timestamp),
    [highScores]
  );
  const hasScores = sortedHighScores.length > 0;

  return (
    <main className="py-10 px-4 min-h-[calc(100vh-4rem)] bg-gradient-to-b from-sky-100 to-blue-50 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-2 text-center flex items-center gap-2">
        <Trophy className="size-8 text-yellow-500 mr-1" aria-hidden />
        High Scores
      </h1>
      <Separator className="mb-6 max-w-lg mx-auto" />
      {hasScores ? (
        <Card className="w-full max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Top 10 Sessions</CardTitle>
          </CardHeader>
          <CardContent className="overflow-x-auto p-0">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted text-xs text-muted-foreground">
                  <th className="py-2 px-3">#</th>
                  <th className="py-2 px-3">Score</th>
                  <th className="py-2 px-3">Fish Caught</th>
                  <th className="py-2 px-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {(sortedHighScores ?? []).map((session, idx) => (
                  <tr key={session.id} className={idx === 0 ? "bg-yellow-50 font-bold" : idx === 1 ? "bg-gray-100" : idx === 2 ? "bg-amber-50" : "" }>
                    <td className="py-2 px-3">{idx + 1}</td>
                    <td className="py-2 px-3 text-primary font-semibold">{session.score}</td>
                    <td className="py-2 px-3 text-blue-700">{session.fishCaughtCount}</td>
                    <td className="py-2 px-3 text-xs text-muted-foreground">{formatDate(session.timestamp)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </CardContent>
        </Card>
      ) : (
        <Card className="max-w-xl mx-auto text-center mt-12 border-2 border-dashed border-yellow-200">
          <CardHeader>
            <div className="flex flex-col items-center">
              <Trophy className="w-14 h-14 text-yellow-300 mb-2" aria-hidden />
              <CardTitle className="text-xl text-muted-foreground font-semibold">No high scores yet.</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-3">Play a game to set your first fishing high score!</p>
          </CardContent>
        </Card>
      )}
    </main>
  );
}