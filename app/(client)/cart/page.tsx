import { DeleteOutlined, MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Checkbox, InputNumber, Tooltip } from "antd";

export default function Cart() {
    return (
        <>
            <div className="p-6">
                <h3 className="uppercase text-3xl font-extrabold text-white mb-5 hover:text-green transition">
                    Giỏ hàng
                </h3>

                <div className="bg-[var(--background-tertiary)] p-6 rounded-xl shadow-lg">
                    <table className="w-full text-left border-collapse text-base">
                        <thead>
                            <tr className="text-text-primary border-b border-[#2a2a2a]">
                                <th className="py-3">STT</th>
                                <th className="py-3">Sản phẩm</th>
                                <th className="py-3">Số lượng</th>
                                <th className="py-3">Giá</th>
                                <th className="py-3">Hành động</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr className="text-text-primary border-b border-[#2a2a2a] hover:bg-[#1a1a1a] transition">
                                <td className="py-4">1</td>

                                <td className="py-4 flex items-center gap-4">
                                    <img
                                        className="w-[55px] h-[55px] object-cover rounded-lg"
                                        src="https://product.hstatic.net/1000152881/product/0__2__7983795bc66e400eb81bf5c8462e9a78.jpg"
                                        alt=""
                                    />
                                    <p className="font-medium text-text-primary">Tai nghe không dây</p>
                                </td>

                                <td className="py-4">
                                    <div className="flex items-center gap-2 bg-[#1c1c1c] px-2 py-1 rounded-lg w-fit">
                                        <Button
                                            icon={<MinusOutlined />}
                                            className="!border-none hover:!bg-[#333]"
                                        />
                                        <InputNumber
                                            min={1}
                                            max={999}
                                            defaultValue={1}
                                            className="w-12 text-center text-white"
                                        />
                                        <Button
                                            icon={<PlusOutlined />}
                                            className="!border-none hover:!bg-[#333]"
                                        />
                                    </div>
                                </td>

                                <td className="py-4 font-semibold text-green">
                                    1.000.000 đ
                                </td>

                                <td className="py-4">
                                    <div className="flex items-center">
                                        <Checkbox className="scale-160 mr-5" />
                                        <Tooltip title="Xóa khỏi giỏ hàng">
                                            <DeleteOutlined className="bg-red-500 p-1.5 rounded-sm cursor-pointer" />
                                        </Tooltip>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    {/* Footer */}
                    <div className="mt-6 flex justify-between items-center bg-[#1c1c1c] p-4 rounded-lg">
                        <div className="text-xl font-semibold text-text-primary">
                            Tổng tiền: <span className="text-green">1.000.000 đ</span>
                        </div>

                        <Button
                            type="primary"
                            className="!bg-green !px-8 !py-5 !text-lg hover:!bg-green-600"
                        >
                            Mua hàng
                        </Button>
                    </div>
                </div>
            </div>

        </>
    )
}