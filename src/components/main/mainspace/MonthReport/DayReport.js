import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import moment from "moment";

function DayReport(props) {
  const [open, setOpen] = React.useState(false);
  const { dataTasksAccordingDay = [], date = "" } = props || {};
  let totalAmountTask = 0,
    totalTasks = 0;
  dataTasksAccordingDay.forEach((i) => {
    const { unitPrice = 0, quantity = 0, materials = [] } = i || {};
    let totalAmountMaterial = 0;
    materials.forEach((subI) => {
      const { unitPrice, quantity = 0 } = subI || {};
      totalAmountMaterial += unitPrice * quantity;
    });
    totalAmountTask += unitPrice * quantity - totalAmountMaterial;
    totalTasks += quantity;
  });
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {moment(date).format("DD/MM/YYYY")}
        </TableCell>
        <TableCell align="right">{totalTasks}</TableCell>
        <TableCell align="right">
          {Number(totalAmountTask).toLocaleString()}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                DS công việc ngày {moment(date).format("DD/MM/YYYY")}
              </Typography>
              <Table
                size="small"
                aria-label="purchases"
                sx={{
                  borderRadius: "10px",
                  overflow: "hidden",
                  backgroundColor: "background.default",
                }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Tên Công Việc</TableCell>
                    <TableCell align="right">Số Lượng</TableCell>
                    <TableCell align="right">Đơn Giá</TableCell>
                    <TableCell align="right">Tổng Tiền Mua NVL</TableCell>
                    <TableCell align="right">Tổng Tiền Của Công Việc</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dataTasksAccordingDay.map((item, index) => {
                    const { materials, unitPrice, quantity } = item || {};
                    let totalAmountMaterial = 0;
                    materials.forEach((subI) => {
                      const { unitPrice, quantity = 0 } = subI || {};
                      totalAmountMaterial += unitPrice * quantity;
                    });
                    return (
                      <TableRow key={index}>
                        <TableCell component="th" scope="row">
                          {item.taskName}
                        </TableCell>
                        <TableCell align="right">{item.quantity}</TableCell>
                        <TableCell align="right">
                          {Number(item.unitPrice).toLocaleString()}
                        </TableCell>
                        <TableCell align="right">
                          {Number(totalAmountMaterial).toLocaleString()}
                        </TableCell>
                        <TableCell align="right">
                          {Number(
                            quantity * unitPrice - totalAmountMaterial
                          ).toLocaleString()}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default DayReport;
