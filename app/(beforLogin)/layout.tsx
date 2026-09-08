import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";
import React from "react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    notFound();
  }
  return (
    <div className="w-full max-w-screen-lg py-10 px-5 md:py-20 sm:px-10">
      {children}
    </div>
  );
};

export default layout;
