import { ADMIN_USER_ID } from "@/constants/auth";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import React from "react";

const PlaceAddLayout = async ({ children }: { children: React.ReactNode }) => {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // 관리자 구분
  const isAdmin = Boolean(user?.id && user?.id === ADMIN_USER_ID);

  if (!isAdmin) {
    redirect("/");
  }

  return <>{children}</>;
};

export default PlaceAddLayout;
