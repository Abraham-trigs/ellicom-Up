"use client";

import { useEffect } from "react";
import { useTeamStore } from "@/store/TeamStore";

export default function TeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { fetchTeam } = useTeamStore();

  useEffect(() => {
    fetchTeam(); // Load once for all child routes
  }, [fetchTeam]);

  return <>{children}</>;
}
