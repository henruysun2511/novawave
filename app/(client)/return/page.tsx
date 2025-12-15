"use client";

import { useToast } from "@/libs/toast";
import { Spin } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function PaymentReturnPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const toast = useToast();

  const status = searchParams.get("status");
  const orderCode = searchParams.get("orderCode");

  useEffect(() => {
    if (!status) return;

    if (status === "PAID") {
      toast.success("Thanh toán thành công 🎉");
      setTimeout(() => {
        router.replace("/");
      }, 1500);
    } else {
      toast.error("Thanh toán thất bại hoặc bị huỷ");
      setTimeout(() => {
        router.replace("/");
      }, 1500);
    }
  }, [status]);

  return (
    <div className="flex items-center justify-center h-screen">
      <Spin size="large" />
    </div>
  );
}