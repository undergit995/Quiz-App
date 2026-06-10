import React from "react";
import { Box, Button, useTheme } from "@mui/material";
import { SnackbarProvider, enqueueSnackbar } from "notistack";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { deleteTrainers, getTrainers } from "../../Redux/Redux";
import { SecondaryButton } from "../../Components/styledComponents/Buttons";
import { Link } from "react-router-dom";

import CustomTable from "../../Components/styledComponents/Reusable Components/Table";
import { useEffect } from "react"

export default function AdminTrainers() {
  const theme = useTheme();
  const dispatch = useDispatch();

  const trainerList = useSelector(
    (state) => state.trainer.trainer
  );

  const columns = [
    {
      id: "name",
      label: "Name",
      minWidth: 170,
    },
    {
      id: "email",
      label: "Email",
      minWidth: 170,
    },
    {
      id: "authentication",
      label: "Authentication",
      minWidth: 150,
    },
  ];

  const rows = trainerList.map((trainer) => ({
    id: trainer._id,
    name: trainer.name,
    email: trainer.email,
    authentication: trainer.isVerfied
      ? "Verified"
      : "Not Verified",
  }));

  const header = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };

  async function fetchTrainers() {
    try {
      const res = await axios.get(
        "https://quiz-backend-cw2w.onrender.com/admin/trainers",
        header
      );

      dispatch(getTrainers(res.data));
    } catch (error) {
      enqueueSnackbar("Server Error", {
        variant: "error",
      });
    }
  }

  async function handleDelete(id) {
    try {
      await axios.delete(
        `https://quiz-backend-cw2w.onrender.com/admin/deleteTrainer/${id}`,
        header
      );

      dispatch(deleteTrainers(id));

      enqueueSnackbar("Trainer Deleted", {
        variant: "success",
      });
    } catch (error) {
      enqueueSnackbar("Server Error", {
        variant: "error",
      });
    }
  }

  React.useEffect(() => {
    fetchTrainers();
  }, []);

  return (
    <Box>
      <SnackbarProvider />

      <Box sx={{ width: "80%", m: "auto", mt: 2 }}>
        <CustomTable
          columns={columns}
          rows={rows}
          actions={(rows) => (
            <>
              <Link
                to={`/admindashboard/edittrainers/${rows.id}`}
                state={rows.id}
              >
                <SecondaryButton>
                  Edit
                </SecondaryButton>
              </Link>

              <SecondaryButton
                onClick={() => handleDelete(rows.id)}
              >
                Delete
              </SecondaryButton>
            </>
          )}
        />
      </Box>

      <Link to={`/admindashboard/edittrainers/add`}>
        <Button
          sx={{
            border: `1px solid ${theme.colorSchemes.dark.palette.primary.main}`,
            borderRadius: 12,
            mt: 2,
          }}
        >
          Add Trainer
        </Button>
      </Link>
    </Box>
  );
}