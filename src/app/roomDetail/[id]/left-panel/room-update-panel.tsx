"use client";

import { useToast } from "@/hooks/useToast";
import { useUploadFile } from "@/hooks/useUploadFIle";
import { useUpdateRoom } from "@/queries/useRoomQuery";
import { UpdateRoomDto } from "@/types/body.type";
import { RoomDetail } from "@/types/object.type";
import { EditOutlined, SaveOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, Upload } from "antd";
import { useEffect, useState } from "react";

interface Props {
  room: RoomDetail;
}

export function RoomUpdatePanel({ room }: Props) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  
  const updateRoomMutation = useUpdateRoom();
  const { uploadFile } = useUploadFile();

  // Khởi tạo dữ liệu Form khi room hoặc panel mở ra
  useEffect(() => {
    if (room) {
      form.setFieldsValue({
        name: room.name,
        description: room.description,
        // Chuyển URL ảnh thành mảng fileList để Ant Design Upload nhận diện được ảnh cũ
        imageUpload: room.imageUrl 
          ? [{
              uid: "-1",
              name: "room-image.jpg",
              status: "done",
              url: room.imageUrl,
            }]
          : [],
      });
    }
  }, [room, form]);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      let finalImageUrl = room.imageUrl; // Mặc định dùng lại ảnh cũ

      // Lấy file vật lý từ mảng fileList
      const imageFile = values.imageUpload?.[0]?.originFileObj;
      
      // Nếu có file mới (người dùng vừa chọn từ máy tính) thì mới upload
      if (imageFile) {
        const res = await uploadFile(imageFile);
        finalImageUrl = res.url;
      }

      const updateData: UpdateRoomDto = {
        name: values.name,
        description: values.description,
        imageUrl: finalImageUrl,
      };

      await updateRoomMutation.mutateAsync({
        id: room._id,
        data: updateData,
      });
      
      toast.success("Cập nhật thông tin phòng thành công!");
    } catch (error) {
      console.error(error);
      toast.error("Có lỗi xảy ra khi cập nhật.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
    color: "#fff",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  };

  return (
    <div className="p-8 max-w-2xl mx-auto bg-[#121212]/50 rounded-[32px] border border-white/10 backdrop-blur-2xl shadow-2xl mt-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <EditOutlined className="text-emerald-500" /> Cài đặt phòng
        </h2>
        <p className="text-gray-400 text-sm">Chỉnh sơ lại diện mạo phòng nghe nhạc của bạn</p>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        requiredMark={false}
      >
        <Form.Item 
          label={<span className="text-gray-300 font-medium">Tên phòng</span>} 
          name="name"
          rules={[{ required: true, message: 'Vui lòng nhập tên phòng' }]}
        >
          <Input 
            style={inputStyle}
            className="h-12 rounded-xl hover:border-emerald-500/50 focus:border-emerald-500 transition-all text-white" 
          />
        </Form.Item>

        <Form.Item label={<span className="text-gray-300 font-medium">Mô tả</span>} name="description">
          <Input.TextArea style={inputStyle} rows={4} className="rounded-xl text-white pt-3" />
        </Form.Item>

        <Form.Item 
          label={<span className="text-gray-300 font-medium">Ảnh bìa phòng</span>}
          name="imageUpload"
          valuePropName="fileList"
          // Đồng bộ fileList từ sự kiện Upload vào Form
          getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
        >
          <Upload
            listType="picture-card" // Tự động có preview ảnh đẹp
            beforeUpload={() => false} // Chặn tự động upload của Antd
            maxCount={1}
            className="room-upload-dark"
          >
            <div className="text-white flex flex-col items-center">
              <UploadOutlined className="text-xl mb-2" />
              <div className="text-xs">Tải ảnh mới</div>
            </div>
          </Upload>
        </Form.Item>

        <Form.Item className="mb-0 mt-8">
          <Button
            type="primary"
            htmlType="submit"
            icon={<SaveOutlined />}
            loading={loading || updateRoomMutation.isPending}
            className="w-full bg-emerald-500 hover:bg-emerald-600 border-none h-12 rounded-xl font-bold text-lg shadow-[0_0_20px_-5px_rgba(16,185,129,0.5)] transition-all"
          >
            Lưu thay đổi
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}