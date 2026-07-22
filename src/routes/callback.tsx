import { useEffect } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/callback")({
  component: CallbackPage,
});

function CallbackPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    
    if (hash && hash.includes("access_token")) {
      const params = new URLSearchParams(hash.replace("#", ""));
      const accessToken = params.get("access_token");
      
      if (accessToken) {
        localStorage.setItem("huzzler_token", accessToken);
        window.history.replaceState(null, "", "/dashboard");
        navigate({ to: "/dashboard", replace: true });
        return;
      }
    }
    
    navigate({ to: "/dashboard", replace: true });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-charcoal text-white flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-white/20 border-t-primary" />
        <p className="text-sm font-semibold text-white/60">Completing sign in...</p>
      </div>
    </div>
  );
}
