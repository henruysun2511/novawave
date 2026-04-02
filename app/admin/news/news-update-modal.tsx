"use client";
import TextEditor from "@/components/common/text-editor";
import { useToast } from "@/hooks/useToast";
import { useUploadFile } from "@/hooks/useUploadFIle";
import { useUpdateNews } from "@/queries/useNewsQuery";
import { NewsStatus } from "@/types/constant.type";
import { Button, Col, Form, Input, Modal, Row, Select } from "antd";
import { useEffect } from "react";

interface Props {
  open: boolean;
  news: any;
  onCancel: () => void;
}

export default function NewsUpdateModal({ open, news, onCancel }: Props) {
  const [form] = Form.useForm();
  const { mutate: updateNews, isPending } = useUpdateNews();
  const { uploadFile } = useUploadFile();
  const toast = useToast();

  // Reset form và set giá trị khi mở modal hoặc news thay đổi
  useEffect(() => {
    if (open && news) {
      form.setFieldsValue({
        title: news.title,
        status: news.status,
        imageUrl: news.imageUrl,
        content: news.content,
      });
    } else if (!open) {
      form.resetFields();
    }
  }, [news, open, form]);

  // Hàm xử lý upload ảnh trong trình soạn thảo
  const handleImageUpload = async (file: File): Promise<string> => {
    try {
      const res = await uploadFile(file);
      return res.url; // Trả về URL để chèn vào Editor
    } catch (error) {
      toast.error("Upload ảnh thất bại");
      return "";
    }
  };

  const onFinish = (values: any) => {
    if (!news?._id) return;

    updateNews(
      { id: news._id, data: values },
      {
        onSuccess: () => {
          toast.success("Cập nhật tin tức thành công");
          onCancel();
        },
        onError: (error: any) => {
          toast.error(error?.response?.data?.message || "Có lỗi xảy ra");
        },
      }
    );
  };

  return (
    <Modal
      title="Chỉnh sửa tin tức"
      open={open}
      onCancel={onCancel}
      footer={null}
      width={1000}
      centered
      destroyOnClose // Đảm bảo component con được render lại sạch sẽ
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Row gutter={16}>
          <Col span={18}>
            <Form.Item
              name="title"
              label="Tiêu đề"
              rules={[{ required: true, message: "Vui lòng nhập tiêu đề" }]}
            >
              <Input placeholder="Nhập tiêu đề tin tức" />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="status" label="Trạng thái">
              <Select
                options={[
                  { value: NewsStatus.DRAFT, label: "Bản nháp" },
                  { value: NewsStatus.PUBLISHED, label: "Xuất bản" },
                  { value: NewsStatus.ARCHIVED, label: "Đã lưu trữ" },
                ]}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name="imageUrl" label="Link ảnh đại diện">
          <Input placeholder="Dán URL ảnh hoặc để trống nếu không đổi" />
        </Form.Item>

        <Form.Item 
            name="content" 
            label="Nội dung chi tiết"
            rules={[{ required: true, message: "Vui lòng nhập nội dung" }]}
        >
          <TextEditor
            value={form.getFieldValue("content")} // Lấy giá trị hiện tại của form
            onImageUpload={handleImageUpload}
            onChange={(val) => form.setFieldsValue({ content: val })}
          />
        </Form.Item>

        <div className="flex justify-end gap-2 mt-4">
          <Button onClick={onCancel} disabled={isPending}>
            Hủy bỏ
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={isPending}
            className="bg-green"
          >
            Lưu thay đổi
          </Button>
        </div>
      </Form>
    </Modal>
  );
}