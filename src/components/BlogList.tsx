import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import BlogPost from "./BlogPost";

interface Post {
  id: number;
  title: string;
  content: string;
  image_url: string | null | undefined;
  created_at: string;
}

const BlogList = () => {
  const { data: posts, isLoading } = useQuery({
    queryKey: ["blog-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return <div>Loading posts...</div>;
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {posts?.map((post: Post) => (
        <BlogPost
          key={post.id}
          title={post.title}
          content={post.content}
          imageUrl={post.image_url || undefined}
          createdAt={post.created_at}
        />
      ))}
    </div>
  );
};

export default BlogList;