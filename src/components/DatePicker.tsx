import React, { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { useTodos } from "@/store/Todo";
import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const DateCalendarValue = () => {
  const [open, setOpen] = useState(false); // Use dayjs() to get the current date
  const handleClose = () => {
    setOpen(false);
    setOpenModal(null);
  };

  const [value, setValue] = useState<dayjs.Dayjs | null>(dayjs()); // Use dayjs() to get the current date
  const { handleDate, openModal, setOpenModal } = useTodos();

  useEffect(() => {
    if (openModal) {
      setOpen(true);
    }
  }, [openModal]);

  const HandleBoth = () => {
    handleDate(value);
    handleClose();
    setOpenModal(false);
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={["DateCalendar"]}>
        <div>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <DemoItem label="Select a Task Date">
                <DateCalendar
                  value={value}
                  onChange={(newValue) => setValue(newValue)}
                />
                <div className="flex flex-row justify-end">
                  <Button onClick={handleClose}>Cancel</Button>
                  <Button onClick={HandleBoth}>OK</Button>
                </div>
              </DemoItem>
            </Box>
          </Modal>
        </div>
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default DateCalendarValue;
