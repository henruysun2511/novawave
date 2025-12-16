import { usePurchaseHistory } from "@/queries/usePurchaseHistoryQuery";
import { Card, Col, Divider, Image, Row, Spin, Tag, Typography } from "antd";
const { Title, Text } = Typography;

export default function UserPurchaseHistory() {
  const { data, isLoading } = usePurchaseHistory();
  const history = data?.data?.data || [];

  if (isLoading) return <Spin />;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-transparent">
      {history.map((order: any, index: number) => {
        const totalPrice = order.products.reduce(
          (sum: number, p: any) =>
            sum + p.productId.price * p.quantity,
          0
        );

        return (
          <Card key={order._id} className="mb-6 rounded-xl shadow">
            {/* ---- Header ---- */}
            <Row justify="space-between" align="middle">
              <Col>
                <Text strong>Đơn hàng #{order._id || index + 1}</Text>
              </Col>
              <Col>
                <Tag color={order.status === "DELIVERED" ? "green" : "blue"}>
                  {order.status === "DELIVERED"
                    ? "Đã giao"
                    : "Đang giao"}
                </Tag>
              </Col>
            </Row>

            <Divider />

            {/* ---- Shipping ---- */}
            <Title level={5}>Thông tin giao hàng</Title>
            <Row gutter={[16, 8]}>
              <Col span={12}>
                <Text strong>Người nhận:</Text>{" "}
                {order.shippingAddress.fullName}
              </Col>
              <Col span={12}>
                <Text strong>SĐT:</Text>{" "}
                {order.shippingAddress.phone}
              </Col>
              <Col span={24}>
                <Text strong>Địa chỉ:</Text>{" "}
                {order.shippingAddress.address}
              </Col>
            </Row>

            <Divider />

            {/* ---- Products ---- */}
            <Title level={5}>Sản phẩm</Title>

            {order.products.map((item: any, idx: number) => (
              <Row
                key={idx}
                gutter={16}
                align="middle"
                className="mb-4"
              >
                <Col span={4}>
                  <Image
                    width={64}
                    height={64}
                    style={{ objectFit: "cover", borderRadius: 8 }}
                    src={item.productId.img}
                  />
                </Col>

                <Col span={10}>
                  <Text strong>{item.productId.name}</Text>
                  <br />
                  <Text type="secondary">
                    {item.productId.price.toLocaleString()}đ
                  </Text>
                </Col>

                <Col span={4}>x{item.quantity}</Col>

                <Col span={6} className="text-right">
                  <Text strong>
                    {(item.productId.price * item.quantity).toLocaleString()}đ
                  </Text>
                </Col>
              </Row>
            ))}

            <Divider />

            {/* ---- Total ---- */}
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