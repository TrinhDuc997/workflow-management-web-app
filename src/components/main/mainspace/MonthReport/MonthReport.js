import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { tasksAPI } from "../../../../api";
import DayReport from "./DayReport";

function MonthReport(props) {
  const { listTaskAccordingMonth = [] } = props || {};
  console.log(
    "🚀 ~ file: MonthReport.js:17 ~ MonthReport ~ listTaskAccordingMonth:",
    listTaskAccordingMonth
  );
  let keyDataTask = [];
  for (const key in listTaskAccordingMonth) {
    keyDataTask.push(key);
  }
  return (
    <Box pl={"1rem"} pr={"1rem"} height={"100%"}>
      <Paper sx={{ width: "100%", overflow: "hidden", height: "100%" }}>
        {keyDataTask.length === 0 ? (
          <Typography variant="h6" textAlign={"center"} mt={"20px"}>
            Tháng Này Chưa Có Dữ Liệu
          </Typography>
        ) : (
          <TableContainer sx={{ maxHeight: "100%", pb: "3rem" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Ngày</TableCell>
                  <TableCell align="right">Tổng công việc</TableCell>
                  <TableCell align="right">Tổng tiền</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {keyDataTask.map((key) => {
                  const dataTasksAccordingDay = listTaskAccordingMonth[key];
                  return (
                    <DayReport
                      key={key}
                      date={key}
                      dataTasksAccordingDay={dataTasksAccordingDay}
                    />
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Box>
  );
}

export default MonthReport;
