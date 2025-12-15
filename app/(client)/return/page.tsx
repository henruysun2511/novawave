import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';
import { useQueryClient } from '@tanstack/react-query';
import { Button, Result, Spin, Typography } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const { Text } = Typography;

export default function PaymentCallbackPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const queryClient = useQueryClient();
    
    const status = searchParams.get('status');
    const orderCode = searchParams.get('orderCode');
    const isSuccess = status === 'PAID';

    const [message, setMessage] = useState('Đang xử lý giao dịch...');
    const HOMEPAGE_URL = '/';
    const REDIRECT_DELAY = 3000;

    useEffect(() => {
        if (!status) {
            setMessage('Không tìm thấy thông tin giao dịch.');
            return;
        }

        if (isSuccess) {
            setMessage(`Thanh toán thành công (Mã đơn: ${orderCode}). Đang cập nhật gói dịch vụ...`);
            
            queryClient.invalidateQueries({ queryKey: ['userProfile'] });
            queryClient.invalidateQueries({ queryKey: ['plans'] }); 
            
            const timer = setTimeout(() => {
                router.push(HOMEPAGE_URL);
            }, REDIRECT_DELAY); 

            return () => clearTimeout(timer);
        } else {
            setMessage(`Giao dịch thất bại hoặc bị hủy (Trạng thái: ${status}).`);
            const timer = setTimeout(() => {
                router.push(HOMEPAGE_URL); 
            }, REDIRECT_DELAY);
            return () => clearTimeout(timer);
        }

    }, [status, orderCode, isSuccess, router, queryClient]);


    const resultStatus = isSuccess ? 'success' : 'error';
    const ResultIcon = isSuccess ? CheckCircleFilled : CloseCircleFilled;

    return (
        <div className="flex justify-center items-center h-screen bg-[#121212]">
            <Result
                status={resultStatus}
                icon={<ResultIcon className={`text-6xl ${isSuccess ? 'text-green' : 'text-red-500'}`} />}
                title={<span className="text-white text-3xl">{isSuccess ? 'Thanh toán thành công!' : 'Thanh toán thất bại!'}</span>}
                subTitle={
                    <>
                        <Text className="text-gray-400 block">{message}</Text>
                        <Text className="text-gray-400 mt-2 block">Tự động chuyển hướng sau {REDIRECT_DELAY / 1000} giây.</Text>
                        {!isSuccess && <Text className='text-gray-500'>Vui lòng thử lại.</Text>}
                        {isSuccess && <Spin size="small" className='mt-3' />}
                    </>
                }
                extra={[
                    <Button 
                        type="primary" 
                        key="home" 
                        onClick={() => router.push(HOMEPAGE_URL)}
                        className="bg-green hover:bg-green/80"
                    >
                        Về trang chủ ngay
                    </Button>,
                ]}
            />
        </div>
    );
}