"use client";
import Title from "@/components/ui/title";
import { useReportList } from "@/queries/useReportQuery";
import { ReportTargetType } from "@/types/constant.type";
import { FilterTargetType, ReportParam } from "@/types/param.type";
import { Select } from "antd";
import { useState } from "react";
import { ReportTable } from "./report-table";


export default function ReportManagementPage() {
    
    const [params, setParams] = useState<ReportParam>({ 
        page: 1, 
        size: 10,
        targetType: 'all', 
    });

    const apiParams = {
        page: params.page,
        size: params.size,
        ...(params.targetType && params.targetType !== 'all' && { targetType: params.targetType })
    };

    const { data: reportData, isPending } = useReportList(apiParams); 
    
    
    const handleFilterChange = (value: FilterTargetType) => {
        setParams(prev => ({
            ...prev,
            targetType: value,
            page: 1, 
        }));
    };


    const targetTypeOptions = [
        { value: 'all', label: 'Tất cả' },
        ...Object.values(ReportTargetType).map(type => ({ 
            value: type, 
            label: type.charAt(0).toUpperCase() + type.slice(1) 
        }))
    ];

    return (
        <div>
            <Title>Quản lý Báo cáo (Reports)</Title>
            <div className="mb-8"></div>
            
            <div className="mb-6 flex items-center gap-4">
                <span className="text-base text-text-primary">Lọc theo loại đối tượng:</span>
                <Select
                    style={{ width: 200 }} 
                    value={params.targetType}
                    onChange={handleFilterChange}
                    options={targetTypeOptions} 
                />
            </div>

            <ReportTable
                data={reportData?.data ?? []}
                loading={isPending}
                pagination={{
                    current: reportData?.meta?.page,
                    pageSize: reportData?.meta?.size,
                    total: reportData?.meta?.totalElements,
                    onChange: (page: number) => setParams({ ...params, page }),
                }}
            />
        </div>
    );
}