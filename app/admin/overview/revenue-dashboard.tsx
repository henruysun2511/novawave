import Title from "@/components/ui/title";
import { useRevenueDashboard } from "@/queries/useDashboardQuery";
import { Column } from "@ant-design/charts";
import { Select, Spin } from "antd";
import { useState } from "react";

const { Option } = Select;

export default function RevenueDashboard() {
    const [params, setParams] = useState({ year: 2025 });
    const { data, isLoading } = useRevenueDashboard(params);
    const dashboard = data?.data;

    if (isLoading) return <Spin size="large" />;

    // chuẩn bị data cho chart
    const chartData = dashboard?.map((item: any) => ({
        month: `Tháng ${item.month}`,
        count: item.count,
    }));

    const config = {
        data: chartData,
        xField: "month",
        yField: "count",
        label: {
            position: "inside",
            style: {
                fill: "#FFFFFF",
                opacity: 0.8,
            },
        },
        xAxis: {
            title: {
                text: "Tháng",
                style: { fill: "#fff" },
            },
            label: { style: { fill: "#fff" } },
        },
        yAxis: {
            title: {
                text: "Số lượng user",
                style: { fill: "#fff" },
            },
            label: { style: { fill: "#fff" } },
        },
        color: "#1890ff",
        theme: "dark" as any,
    };
    return (
        <>
            <div className="bg-[var(--background-secondary)] p-8 rounded-2xl">
                <Title>Biểu đồ doanh thu</Title>
                <div className="mb-5"></div>
                <Select
                    value={params.year}
                    onChange={(value) => setParams({ year: value })}
                    style={{ width: 120, marginBottom: 20 }}
                >
                    <Option value={2023}>2023</Option>
                    <Option value={2024}>2024</Option>
                    <Option value={2025}>2025</Option>
                    <Option value={2026}>2026</Option>
                </Select>
                <div className="mb-10"></div>

                <Column {...config} />
            </div>
        </>
    )
}