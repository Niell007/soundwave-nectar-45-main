import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Loader2 } from "lucide-react";

interface Profile {
  id: string;
  username: string | null;
  is_admin: boolean;
  created_at: string;
}

const UserManagement = () => {
  const queryClient = useQueryClient();
  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  const { data: profiles, isLoading } = useQuery({
    queryKey: ["profiles"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Profile[];
    },
  });

  const toggleAdminMutation = useMutation({
    mutationFn: async ({ userId, isAdmin }: { userId: string; isAdmin: boolean }) => {
      const { error } = await supabase.rpc("set_admin_status", {
        user_id: userId,
        is_admin: isAdmin,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
      toast({
        title: "Success",
        description: "User admin status updated successfully",
      });
    },
    onError: (error) => {
      console.error("Toggle admin error:", error);
      toast({
        title: "Error",
        description: "Failed to update user admin status",
        variant: "destructive",
      });
    },
    onSettled: () => {
      setIsProcessing(null);
    },
  });

  const handleToggleAdmin = async (userId: string, currentStatus: boolean) => {
    setIsProcessing(userId);
    toggleAdminMutation.mutate({ userId, isAdmin: !currentStatus });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">User Management</h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Username</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Admin Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {profiles?.map((profile) => (
            <TableRow key={profile.id}>
              <TableCell>{profile.username || "No username"}</TableCell>
              <TableCell>
                {new Date(profile.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell>{profile.is_admin ? "Admin" : "User"}</TableCell>
              <TableCell>
                <Button
                  variant={profile.is_admin ? "destructive" : "default"}
                  size="sm"
                  onClick={() => handleToggleAdmin(profile.id, profile.is_admin)}
                  disabled={isProcessing === profile.id}
                >
                  {isProcessing === profile.id ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : profile.is_admin ? (
                    "Remove Admin"
                  ) : (
                    "Make Admin"
                  )}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default UserManagement;