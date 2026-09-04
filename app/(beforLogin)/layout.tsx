import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/");
  }
  return <div className="w-full max-w-screen-lg py-20 px-5">{children}</div>;
};

export default layout;
