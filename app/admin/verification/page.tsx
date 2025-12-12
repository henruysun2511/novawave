"use client";
import Title from "@/components/ui/title";
import { useVerificationList } from "@/queries/useArtistQuery";
import { useState } from "react";
import { VerificationTable } from "./verification-table";

export default function VerificationManagementPage() {
    const [params, setParams] = useState({ page: 1, size: 10 });

    const { data, isPending } = useVerificationList(params);

    return (
        <div>
            <Title>Kiểm duyệt hồ sơ nghệ sĩ</Title>
            <div className="mb-8"></div>

            <VerificationTable
                data={data?.data ?? []}
                loading={isPending}
                pagination={{
                    current: data?.meta?.page,
                    pageSize: data?.meta?.size,
                    total: data?.meta?.totalElements,
                    onChange: (page: number) => setParams({ ...params, page }),
                }}
            />
        </div>
    );
}