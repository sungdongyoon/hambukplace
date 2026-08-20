import { createClient } from "../lib/supabase/client";

// 이미지 storage 전송 함수
export const uploadPlaceImages = async (images: any) => {
  const supabase = await createClient();

  const files = images ?? [];
  const imageUrls: string[] = [];

  for (const file of files) {
    const filePath = `places/${crypto.randomUUID()}-.${file.name.split(".").pop() || "jpg"}`;

    const { error: uploadError } = await supabase.storage
      .from("place-images")
      .update(filePath, file);

    if (uploadError) {
      console.log("이미지 업로드 실패!", uploadError);
      throw new Error(uploadError.message);
    }

    const { data } = supabase.storage
      .from("place-images")
      .getPublicUrl(filePath);

    imageUrls.push(data.publicUrl);
  }

  return imageUrls;
};
