import { createClient, SupabaseClient } from "@supabase/supabase-js";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Signup from "./Signup";
import React from "react";

const supabase: SupabaseClient = createClient(
  "https://rfgnubwzhqzpkttafojn.supabase.co",
  "sb_publishable_gLq9mShgW_mQu6NDFGdN1g_K_i8sBxt"
);

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route
          index
          element={
            <ProtectedRoute>
              <Signup supabase={supabase} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<string | null>(null);

  React.useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setState(user?.id ?? null);
      if (!user) {
        supabase.auth.signInWithOAuth({
          provider: "google",
        });
      }
    });
  }, []);
  return <>{state ? children : <h1>Wins and Loses</h1>}</>;
}

export default App;
