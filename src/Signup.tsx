import type { SupabaseClient } from "@supabase/supabase-js"
import React from "react";

function Signup({supabase}: {supabase: SupabaseClient}) {
    const [state, setState] = React.useState<string | null>(null);
  
    React.useEffect(() => {
      supabase.auth
        .getUser()
        .then(({ data: { user } }) => setState(user?.email ?? null));
    });

  return (
    <>
      <h1>You must be {state}!</h1>
    </>
  )
}

export default Signup