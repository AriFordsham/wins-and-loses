import { createClient, SupabaseClient, type User } from "@supabase/supabase-js";

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

type AuthState = "uninitialized" | "signed_out" | User;

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<AuthState>("uninitialized");

  React.useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setState(user ?? "signed_out");
      if (!user) {
        supabase.auth.signInWithOAuth({
          provider: "google",
          options: { redirectTo: import.meta.env.BASE_URL },
        });
      }
    });
  }, []);

  switch (state) {
    case "uninitialized":
      return <h1>Wins and Loses</h1>;
    case "signed_out":
      return (
        <button
          onClick={() =>
            supabase.auth.signInWithOAuth({
              provider: "google",
              options: {
                redirectTo: import.meta.env.BASE_URL,
              },
            })
          }
        >
          Sign in
        </button>
      );
    default:
      return <>{children}</>;
  }
}

export default App;
