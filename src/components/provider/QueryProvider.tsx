"use client"; // Bắt buộc phải có dòng này

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";

export default function QueryProvider({ children }: { children: React.ReactNode }) {
  // Sử dụng useState để đảm bảo QueryClient chỉ được tạo một lần duy nhất
  // Tránh việc tạo lại client mới mỗi khi component re-render
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000, // Dữ liệu sẽ cũ sau 1 phút
            refetchOnWindowFocus: false, // Không tự load lại khi chuyển tab
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}