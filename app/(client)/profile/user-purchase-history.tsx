import { usePurchaseHistory } from "@/queries/usePurchaseHistoryQuery";
import { Card, Col, Divider, Row, Spin, Typography } from "antd";
const { Title, Text } = Typography;


export default function UserPurchaseHistory() {
  const { data, isLoading } = usePurchaseHistory();

  const rawData = data?.data?.data;
  const history = Array.isArray(rawData)
    ? rawData
    : rawData
    ? [rawData]
    : [];

  if (isLoading) return <Spin />;

  if (history.length === 0) {
    return (
      <div className="text-text-primary text-center">
        Chưa có đơn hàng
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-transparent">
      {history.map((order: any, index: number) => {
        const totalPrice = (order.products || []).reduce(
          (sum: number, item: any) =>
            sum + (item.price || 0) * (item.quantity || 0),
          0
        );

        return (
          <Card
            key={order._id || index}
            className="mb-6 rounded-xl shadow"
          >
            {/* Header */}
            <Row justify="space-between" align="middle">
              <Col>
                <Text strong>
                  Đơn hàng #{order._id}
                </Text>
              </Col>
            </Row>

            <Divider />

            {/* Shipping */}
            <Title level={5}>Thông tin giao hàng</Title>
            <Row gutter={[16, 8]}>
              <Col span={12}>
                <Text strong>Người nhận:</Text>{" "}
                {order.shippingAddress?.fullName}
              </Col>
              <Col span={12}>
                <Text strong>SĐT:</Text>{" "}
                {order.shippingAddress?.phone}
              </Col>
              <Col span={24}>
                <Text strong>Địa chỉ:</Text>{" "}
                {order.shippingAddress?.address}
              </Col>
            </Row>

            <Divider />

            <Title level={5}>Sản phẩm</Title>

            {order.products?.map((item: any, idx: number) => (
              <Row
                key={idx}
                gutter={16}
                align="middle"
                className="mb-4"
              >
                <Col span={4}>
                  {item.img ? (
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 rounded" />
                  )}
                </Col>

                <Col span={10}>
                  <Text strong>{item.name}</Text>
                  <br />
                  <Text type="secondary">
                    {item.price.toLocaleString()}đ
                  </Text>
                </Col>

                <Col span={4}>x{item.quantity}</Col>

                <Col span={6} className="text-right">
                  <Text strong>
                    {(item.price * item.quantity).toLocaleString()}đ
                  </Text>
                </Col>
              </Row>
            ))}

            <Divider />

            <Row justify="end">
              <Col>
                <Title level={4}>
                  Tổng tiền: {totalPrice.toLocaleString()}đ
                </Title>
              </Col>
            </Row>
          </Card>
        );
      })}
    </div>
  );
}
