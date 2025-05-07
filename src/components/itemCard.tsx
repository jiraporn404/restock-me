import {
  Button,
  Stack,
  Typography,
  Chip,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Item, ItemStatus, statusColors, statusLabels } from "../models/item";
import { useItems } from "../hooks/useItems";
import { MouseEvent, useState } from "react";
import { MoreVertIcon, EditIcon, DeleteIcon } from "../icons";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

type Props = {
  item: Item;
  onToggleStatus: (id: string) => void;
  onDelete?: (id: string) => void;
};

export function ItemCard({ item, onToggleStatus, onDelete }: Props) {
  const { categories, updateItem } = useItems();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [name, setName] = useState(item.name);
  const [category, setCategory] = useState(item.category);
  const [boughtAt, setBoughtAt] = useState(item.boughtAt);
  const [status, setStatus] = useState(item.status);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClickMenu = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setOpenEditDialog(true);
  };

  const handleToggleStatus = () => {
    onToggleStatus(item.id);
  };

  return (
    <Stack
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      px={2}
      py={1}
      border="1px solid #e0e0e0"
      borderRadius={2}
      width="100%"
      sx={{
        backgroundColor:
          item.status === "available"
            ? "#e8f5e9"
            : item.status === "low"
              ? "#fff8e1"
              : "#ffebee",
      }}
    >
      <Stack spacing={1} width={1}>
        <Stack
          direction="row"
          spacing={1}
          width={1}
          justifyContent="space-between"
        >
          <Typography fontSize={18} component={"span"}>
            {item.name}{" "}
            <Chip
              label={statusLabels[item.status]}
              color={statusColors[item.status] as any}
              onClick={handleToggleStatus}
            />
          </Typography>

          <IconButton
            aria-label="more"
            id="long-button"
            aria-controls={open ? "long-menu" : undefined}
            aria-expanded={open ? "true" : undefined}
            aria-haspopup="true"
            onClick={handleClickMenu}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseMenu}
          >
            <MenuItem
              onClick={() => {
                handleEdit();
                handleCloseMenu();
              }}
              sx={{ fontSize: 14 }}
            >
              <EditIcon color="primary" fontSize="small" sx={{ mr: 1 }} /> แก้ไข
            </MenuItem>
            <MenuItem
              onClick={() => {
                setOpenDeleteDialog(true);
                handleCloseMenu();
              }}
              sx={{ fontSize: 14 }}
            >
              <DeleteIcon color="error" fontSize="small" sx={{ mr: 1 }} /> ลบ
            </MenuItem>
          </Menu>
        </Stack>

        <Chip
          label={item.category}
          sx={{
            backgroundColor: categories.find((c) => c.name === item.category)
              ?.color,
            width: "fit-content",
          }}
        />
        <Stack direction="row" justifyContent="space-between">
          <Typography fontSize={12} color="text.secondary">
            ซื้อเมื่อ:{" "}
            {new Date(item.boughtAt).toLocaleString("th-TH", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            })}
          </Typography>
          <Typography fontSize={12} color="text.secondary">
            อัปเดต:{" "}
            {new Date(item.updatedAt).toLocaleString("th-TH", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Typography>
        </Stack>
      </Stack>
      {openDeleteDialog && (
        <Dialog
          open={openDeleteDialog}
          onClose={() => setOpenDeleteDialog(false)}
        >
          <DialogTitle>ยืนยันการลบ</DialogTitle>
          <DialogContent>คุณแน่ใจหรือไม่ว่าจะลบ "{item.name}"?</DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDeleteDialog(false)}>ยกเลิก</Button>
            <Button
              onClick={() => {
                onDelete?.(item.id);
                setOpenDeleteDialog(false);
              }}
              color="error"
            >
              ลบ
            </Button>
          </DialogActions>
        </Dialog>
      )}
      {openEditDialog && (
        <Dialog open={openEditDialog} onClose={() => setOpenEditDialog(false)}>
          <DialogTitle>แก้ไขข้อมูล</DialogTitle>
          <DialogContent>
            <Stack sx={{ mt: 1 }}>
              <TextField
                label="ชื่อ"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <FormControl fullWidth>
                <InputLabel>หมวดหมู่</InputLabel>
                <Select
                  label="หมวดหมู่"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.map((c) => (
                    <MenuItem key={c.name} value={c.name}>
                      <Chip
                        label={c.name}
                        sx={{
                          backgroundColor: c.color,
                          width: "fit-content",
                        }}
                      />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>สถานะ</InputLabel>
                <Select
                  label="สถานะ"
                  value={status}
                  onChange={(e) => setStatus(e.target.value as ItemStatus)}
                >
                  {Object.keys(statusLabels).map((s) => (
                    <MenuItem key={s} value={s}>
                      <Chip
                        label={statusLabels[s as ItemStatus]}
                        color={statusColors[s as ItemStatus] as any}
                        sx={{
                          width: "fit-content",
                        }}
                      />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <DatePicker
                label="ซื้อเมื่อ"
                value={dayjs(boughtAt)}
                onChange={(value) => setBoughtAt(value?.toISOString() ?? "")}
                format="DD/MM/YYYY"
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button color="error" onClick={() => setOpenEditDialog(false)}>
              ยกเลิก
            </Button>
            <Button
              onClick={() => {
                updateItem(item.id, { name, category, boughtAt, status });
                setOpenEditDialog(false);
              }}
            >
              บันทึก
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </Stack>
  );
}
