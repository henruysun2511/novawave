import Title from "@/components/ui/title";
import { useArtistDashboard } from "@/queries/useDashboardQuery";
import { Area } from "@ant-design/charts";
import { Select, Spin } from "antd";
import { useState } from "react";

const { Option } = Select;

export default function ArtistDashboard() {
    const [params, setParams] = useState({ year: 2025 });
    const { data, isLoading } = useArtistDashboard(params);
    const dashboard = data?.data;
    console.log(dashboard)

    if (isLoading) return <Spin size="large" />;


    const chartData = dashboard?.map((item: any) => ({
        month: `Tháng ${item.month}`,
        count: item.count,
    }));

    const config = {
        data: chartData,
        xField: "month",
        yField: "count",
        smooth: true, 
        areaStyle: {
            fill: "l(270) 0:#1DB954 1:#000000",
        },
        line: {
            color: "#1DB954",
            size: 3,
        },
        point: {
            size: 5,
            shape: "circle",
            style: {
                fill: "#1DB954",
                stroke: "#000",
                lineWidth: 2,
            },
        },
        xAxis: {
            label: { style: { fill: "#fff" } },
            title: { text: "Tháng", style: { fill: "#fff" } },
        },
        yAxis: {
            label: { style: { fill: "#fff" } },
            title: { text: "Số lượng nghệ sĩ", style: { fill: "#fff" } },
        },
        tooltip: {
            showMarkers: true,
        },
        theme: "dark" as any,
    };

    return (
        <>
            <div className="bg-[var(--background-secondary)] p-8 rounded-2xl">
                <Title>Biểu đồ số lượng nghệ sĩ đăng kí hồ sơ</Title>
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

                <Area {...config} />
            </div>
        </>
    )
}