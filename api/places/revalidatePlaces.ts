"use server";

import { ADMIN_USER_ID } from "@/constants/auth";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export const revalidatePlaces = async (placeId?: string) => {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user || user.id !== ADMIN_USER_ID) {
    throw new Error("관리자만 실행할 수 있습니다.");
  }

  revalidatePath("/");
  revalidatePath("/places");

  if (placeId) {
    revalidatePath(`/places/${placeId}`);
  }
};
