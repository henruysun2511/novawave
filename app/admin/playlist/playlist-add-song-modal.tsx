
import useDebounce from "@/libs/debounce";
import { useToast } from "@/libs/toast";
import { useAddSongToPlaylist } from "@/queries/usePlaylistQuery";
import { useSongListByAdmin } from "@/queries/useSongQuery";
import { Button, Form, Modal, Select } from "antd";
import { useState } from "react";

interface PlaylistAddSongModalProps {
  open: boolean;
  onCancel: () => void;
  playlistId: string;
}

export default function PlaylistAddSongModal({
  open,
  onCancel,
  playlistId,
}: PlaylistAddSongModalProps) {
  const [form] = Form.useForm();
  const toast = useToast();

  const [searchText, setSearchText] = useState("");
  const debouncedSearch = useDebounce(searchText, 400);

  const { data: songSearch } = useSongListByAdmin({
    name: debouncedSearch,
  });

  const { mutate, isPending } = useAddSongToPlaylist();

  const handleFinish = (values: { songId: string }) => {
    mutate(
      {
        playlistId,
        songId: values.songId,
      },
      {
        onSuccess: (res: any) => {
          toast.success(res?.data?.message || "Đã thêm bài hát vào playlist");
          form.resetFields();
          onCancel();
        },
        onError: (err: any) => {
          toast.error(
            err?.response?.data?.message || "Thêm bài hát thất bại"
          );
        },
      }
    );
  };

  return (
    <Modal
      open={open}
      onCancel={() => {
        form.resetFields();
        onCancel();
      }}
      footer={null}
      title="Thêm bài hát vào playlist"
      centered
      width={600}
    >
      <Form form={form} layout="vertical" onFinish={handleFinish}>
        <Form.Item
          label={<span className="text-base">Chọn bài hát</span>}
          name="songId"
          rules={[{ required: true, message: "Vui lòng chọn bài hát" }]}
        >
          <Select
            showSearch
            placeholder="Tìm bài hát..."
            filterOption={false}
            onSearch={(value) => setSearchText(value)}
            options={(songSearch?.data ?? []).map((s: any) => ({
              label: s.name,
              value: s._id,
            }))}
          />
        </Form.Item>

        <Form.Item className="text-right mt-6">
          <Button onClick={onCancel} className="mr-2">
            Hủy
          </Button>
          <Button
            type="primary"
            htmlType="submit"
            loading={isPending}
            className="bg-green"
          >
            Thêm bài hát
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  );
}
