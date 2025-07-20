import {
  Box,
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  Button,
  Chip,
} from "@mui/material";
import { statusColors, statusLabels } from "../models/item";

type Props = {
  search: string;
  onSearchChange: (val: string) => void;
  filter: string;
  onFilterChange: (val: string) => void;
  sort: string;
  onSortChange: (val: string) => void;
};

export function FilterBar({
  search,
  onSearchChange,
  filter,
  onFilterChange,
  sort,
  onSortChange,
}: Props) {
  return (
    <Box>
      <TextField
        label="🔍 ค้นหา"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        fullWidth
        margin="normal"
      />

      <Box sx={{ display: "flex", mt: 2, gap: 2 }}>
        <FormControl fullWidth>
          <InputLabel>กรองสถานะ</InputLabel>
          <Select
            value={filter}
            label="กรองสถานะ"
            onChange={(e) => onFilterChange(e.target.value)}
            sx={{
              "& .MuiSelect-select": {
                fontSize: "0.875rem",
              },
            }}
          >
            <MenuItem value="all">ทั้งหมด</MenuItem>
            <MenuItem value="available">
              <Chip
                label={statusLabels["available"]}
                color={statusColors["available"] as any}
              />
            </MenuItem>{" "}
            <MenuItem value="low">
              <Chip
                label={statusLabels["low"]}
                color={statusColors["low"] as any}
              />
            </MenuItem>
            <MenuItem value="out">
              <Chip
                label={statusLabels["out"]}
                color={statusColors["out"] as any}
              />
            </MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>เรียงตาม</InputLabel>
          <Select
            value={sort}
            label="เรียงตาม"
            onChange={(e) => onSortChange(e.target.value)}
          >
            <MenuItem value="name">ชื่อ A-Z</MenuItem>
            <MenuItem value="updated">วันที่อัปเดตล่าสุด</MenuItem>

            <MenuItem value="category">หมวดหมู่</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant="outlined"
          color="warning"
          onClick={() => {
            onSearchChange("");
            onFilterChange("all");
            onSortChange("updated");
          }}
          sx={{
            width: "fit-content",
            flexShrink: 0,
          }}
        >
          ล้างค่า
        </Button>
      </Box>
    </Box>
  );
}
