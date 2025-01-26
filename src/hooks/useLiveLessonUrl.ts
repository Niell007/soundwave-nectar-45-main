import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const useLiveLessonUrl = () => {
  return useQuery({
    queryKey: ["live_lesson_url"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("settings")
        .select("value")
        .eq("key", "live_lesson_url")
        .single();

      if (error) throw error;
      return data?.value as string;
    },
  });
};
