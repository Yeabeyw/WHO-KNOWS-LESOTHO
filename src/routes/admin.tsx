import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowLeft, BarChart3, CheckCircle2, Clock, Heart, Users, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { getResults } from "./-api.game-results";

const ADMIN_PASSWORD = "admin123"; // Change this in production!

export const Route = createFileRoute("/admin")({
  component: AdminDashboard,
});

function AdminDashboard() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      loadDashboard();
    } else {
      setError("Invalid password");
    }
  };

  const loadDashboard = async () => {
    setLoading(true);
    try {
      const data = await getResults();
      setResults(data.results || []);
      setStats(data.stats || null);
    } catch (err) {
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <main className="min-h-screen bg-background text-foreground flex items-center justify-center px-5">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-2xl">Admin Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Input
                  type="password"
                  placeholder="Enter admin password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full"
                />
                {error && <p className="text-destructive text-sm mt-2">{error}</p>}
              </div>
              <Button type="submit" className="w-full">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="topline" />
      <header className="site-header">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-3 px-5 sm:px-8">
          <Button variant="ghost" onClick={() => navigate({ to: "/" })} className="gap-2">
            <ArrowLeft size={18} /> Back to Game
          </Button>
          <h1 className="font-display text-xl font-bold">Admin Dashboard</h1>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        {loading ? (
          <p className="text-center text-muted-foreground">Loading...</p>
        ) : error ? (
          <p className="text-center text-destructive">{error}</p>
        ) : (
          <>
            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-4 mb-8">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Games</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Users className="text-primary" size={20} />
                    <span className="text-3xl font-bold">{stats?.totalGames || 0}</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Average Score</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <BarChart3 className="text-primary" size={20} />
                    <span className="text-3xl font-bold">{stats?.averageScore || 0}/10</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Page Followers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Heart className="text-primary" size={20} />
                    <span className="text-3xl font-bold">{stats?.followers || 0}</span>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Follow Rate</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="text-primary" size={20} />
                    <span className="text-3xl font-bold">{stats?.followerRate || 0}%</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Results Table */}
            <Card>
              <CardHeader>
                <CardTitle>Game Results</CardTitle>
              </CardHeader>
              <CardContent>
                {results.length === 0 ? (
                  <p className="text-center text-muted-foreground py-8">No game results yet</p>
                ) : (
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Date</TableHead>
                          <TableHead>Score</TableHead>
                          <TableHead>Performance</TableHead>
                          <TableHead>Followed Page</TableHead>
                          <TableHead>User Agent</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {results.map((result) => (
                          <TableRow key={result.id}>
                            <TableCell className="whitespace-nowrap">
                              <div className="flex items-center gap-2">
                                <Clock size={14} className="text-muted-foreground" />
                                {new Date(result.timestamp).toLocaleString()}
                              </div>
                            </TableCell>
                            <TableCell>
                              <span className="font-bold text-lg">{result.score}/10</span>
                            </TableCell>
                            <TableCell>
                              {result.score >= 8 ? (
                                <Badge className="bg-green-500 hover:bg-green-600">Excellent</Badge>
                              ) : result.score >= 5 ? (
                                <Badge className="bg-yellow-500 hover:bg-yellow-600">Good</Badge>
                              ) : (
                                <Badge variant="destructive">Needs Practice</Badge>
                              )}
                            </TableCell>
                            <TableCell>
                              {result.followedPage ? (
                                <Badge className="bg-green-500 hover:bg-green-600 gap-1">
                                  <CheckCircle2 size={14} /> Yes
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="gap-1">
                                  <XCircle size={14} /> No
                                </Badge>
                              )}
                            </TableCell>
                            <TableCell className="max-w-xs truncate text-muted-foreground text-xs">
                              {result.userAgent || "Unknown"}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        )}
      </section>
    </main>
  );
}
