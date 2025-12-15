"use client";
import Footer from "@/components/client/footer/footer";
import Title from "@/components/ui/title";
import { useToast } from "@/libs/toast";
import { usePaymentPlan } from "@/queries/usePaymentQuery";
import { usePlans } from "@/queries/usePlanQuery";
import { PaymentPlanDto } from "@/types/body.type";
import { ArrowDownOutlined, AudioOutlined, ClockCircleOutlined, DollarCircleOutlined, MinusCircleOutlined } from "@ant-design/icons";
import { Button, Card, Typography } from "antd";
const { Text } = Typography;

export default function PlanPage() {
    const toast = useToast();

    const { data: plansRes, isLoading, isError } = usePlans();
    const plans = plansRes?.data.data || [];

    const formatCurrency = (amount: number | null | undefined) => {
        if (typeof amount !== 'number' || isNaN(amount)) {
            return '0 VNĐ';
        }
        return amount.toLocaleString('vi-VN') + ' VNĐ';
    };

    const { mutate: payPlanMutate, isPending: isPaying } = usePaymentPlan();


    const handleSubscribePlan = (planId: string) => {
        const payload: PaymentPlanDto = { planId };

        payPlanMutate(payload, {
            onSuccess: (res) => {
                const checkoutUrl = res.data?.checkoutUrl;

                if (checkoutUrl) {
                    toast.success("Khởi tạo thanh toán thành công! Đang chuyển hướng...");
                    window.location.href = checkoutUrl;
                } else {
                    toast.error("Thanh toán thành công nhưng không tìm thấy URL chuyển hướng.");
                }
            },
            onError: (error: any) => {
                const msg =
                    error?.response?.data?.message ||
                    "Có lỗi xảy ra trong quá trình thanh toán.";
                toast.error(Array.isArray(msg) ? msg.join(", ") : msg);
            },
        });
    };

    return (
        <>
            <div className="relative w-full h-[450px] mb-10">
                <img
                    src="https://i.pinimg.com/1200x/8f/09/15/8f091529f2188feb9fba2c85a3889125.jpg"
                    alt="Logo"
                    className="w-full h-full object-cover rounded-2xl"
                />
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute bottom-0 left-0 z-20 p-4 w-full">
                    <div className="text-base text-white mb-1">
                        Nghe nhạc thả ga không lo quảng cáo
                    </div>
                    <h3 className="uppercase text-7xl font-extrabold text-white mb-1 hover:text-green transition">
                        Mua gói prenium
                    </h3>
                </div>
            </div>

            <div className="p-6">
                <section className="mb-20">
                    <Title>
                        Vì sao bạn nên dùng Premium?
                    </Title>
                    <div className="mb-8"></div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                title: "Không quảng cáo",
                                desc: "Tận hưởng âm nhạc liền mạch, không bị gián đoạn.",
                                icon: <MinusCircleOutlined />,
                            },
                            {
                                title: "Chất lượng cao",
                                desc: "Âm thanh lossless, nghe đã tai hơn bao giờ hết.",
                                icon: <AudioOutlined />,
                            },
                            {
                                title: "Tải về offline",
                                desc: "Nghe nhạc mọi lúc, mọi nơi, kể cả khi không có mạng.",
                                icon: <ArrowDownOutlined />,
                            },
                        ].map((item, index) => (
                            <div
                                key={index}
                                className="bg-[#181818] p-8 rounded-2xl hover:bg-[#202020] transition flex flex-col items-center"
                            >
                                <div className="text-4xl mb-4 text-green">{item.icon}</div>
                                <h3 className="text-xl font-semibold text-green mb-2">
                                    {item.title}
                                </h3>
                                <p className="text-gray-400 text-center">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </section>

                <Title>
                    Các gói đăng kí
                </Title>
                <div className="mb-8"></div>
                {!isLoading && plans.length > 0 && (
                    <div className="flex gap-5 justify-center">
                        {plans.map((plan) => (
                            <Card
                                className="!bg-[var(--background-tertiary)] !rounder-2xl !border-none shadow-lg hover:shadow-xl transition duration-300"
                                style={{ width: 300 }}
                            >
                                <div className="flex flex-col items-center text-white">
                                    <Title>
                                        {plan.planName ?? "Đang cập nhật"}
                                    </Title>

                                    <div className="flex items-center gap-2 mb-3">
                                        <DollarCircleOutlined className="text-xl text-green" />
                                        <Text className="!text-white !text-2xl font-bold">
                                            {formatCurrency(plan.price)}
                                        </Text>
                                    </div>

                                    <div className="flex items-center gap-2 mb-4">
                                        <ClockCircleOutlined className="text-gray-400" />
                                        <Text className="!text-gray-400">
                                            Thời hạn: {plan.durationInMonths} tháng
                                        </Text>
                                    </div>

                                    <p className="text-gray-300 text-center italic mt-2 min-h-[50px]">
                                        {plan.description || "Không có mô tả chi tiết."}
                                    </p>
                                    <Button
                                        onClick={() => handleSubscribePlan(plan._id)}
                                        loading={isPaying}
                                        disabled={isPaying}
                                        type="primary" className="bg-green rounded-2xl">ĐĂNG KÍ GÓI</Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}

                {!isLoading && !isError && plans.length === 0 && (
                    <div className="text-center py-10 text-white text-xl">
                        Hiện chưa có gói dịch vụ nào được tạo.
                    </div>
                )}
            </div>


            <Footer />

        </>
    )
}