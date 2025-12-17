"use client";
import SideBar from "@/components/admin/sidebar/sidebar";
import { useAuthStore } from "@/stores/useAuthStore";
import { Role } from "@/types/constant.type";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


const roleAccessMap: Record<string, Role[]> = {
  "/admin/overview": [Role.SUPER_ADMIN, Role.ADMIN],
  "/admin/account": [Role.SUPER_ADMIN, Role.ADMIN],
  "/admin/permission": [Role.SUPER_ADMIN, Role.ADMIN],
  "/admin/role": [Role.SUPER_ADMIN, Role.ADMIN],
  "/admin/plan": [Role.SUPER_ADMIN, Role.ADMIN],
  "/admin/song": [Role.SUPER_ADMIN, Role.CONTENT_MODERATOR],
  "/admin/report": [Role.SUPER_ADMIN, Role.CONTENT_MODERATOR],
  "/admin/verification": [Role.SUPER_ADMIN, Role.CONTENT_MODERATOR],
  "/admin/genre": [Role.SUPER_ADMIN, Role.CONTENT_MODERATOR],
  "/admin/playlist": [Role.SUPER_ADMIN, Role.CONTENT_MODERATOR],
  "/admin/advertisement": [Role.SUPER_ADMIN, Role.ADMIN],
  "/admin/product": [Role.SUPER_ADMIN, Role.ADMIN, Role.COMMERCE_MANAGER],
  "/admin/artist/profile": [Role.ARTIST],
  "/admin/artist/song": [Role.ARTIST],
  "/admin/artist/album": [Role.ARTIST],
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { roleName, isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (!isAuthenticated) {
      const path = window.location.pathname;
      if (!path.startsWith("/auth")) router.replace("/");
      return;
    }

    if (!roleName) return; // chưa load role → skip

    const path = window.location.pathname;
    const allowedRoles = Object.entries(roleAccessMap).find(([key]) =>
      path.startsWith(key)
    )?.[1];

    if (allowedRoles && !allowedRoles.includes(roleName as Role)) {
      router.replace("/403");
    }
  }, [isAuthenticated, roleName, router]);

  if (!isAuthenticated || !roleName) return null; // hoặc loading spinner

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="w-[15%] flex-shrink-0">
        <SideBar />
      </div>

      <div className="w-[85%] flex flex-col">
        <div className="flex-1 overflow-y-auto px-10 py-8 bg-custom-gradient scrollbar-hidden">
          {children}
        </div>
      </div>
    </div>
  );
}
