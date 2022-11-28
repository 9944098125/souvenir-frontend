import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { Button } from "@mui/material";
import UpdateQA from "./UpdateQA";
import { Box, Stack, Typography } from "@mui/material";

function QAItem(props) {
  const { qa, deleteQA, showEditor, updateQA } = props;

  const deleteQAReducer = useSelector((state) => state.deleteQAReducer);

  return (
    <Fragment>
      <Box
        key={qa._id}
        sx={{
          background: "white",
          borderRadius: "8px",
          width: {
            xs: "250px",
            sm: "450px",
            md: "650px",
            lg: "1100px",
          },
          height: "100%",
          mb: 3,
          p: 5,
        }}
      >
        <Stack
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: { xs: "flex-start", md: "space-between" },
            alignItems: { xs: "center" },
          }}
        >
          <Stack direction="row" alignItems="center">
            <Typography
              sx={{
                fontWeight: "700",
                fontSize: "18px",
                color: "red",
              }}
            >
              {qa.question}
            </Typography>
          </Stack>
          <Button
            sx={{
              background: "pink",
              borderRadius: "8px",
              width: "150px",
              color: "black",
              mb: 2,
              ml: 3,
              p: 1,
              fontWeight: "800",
              "&:hover": { background: "yellow" },
            }}
            type="button"
            onClick={() => updateQA(qa)}
          >
            <BorderColorIcon sx={{ color: "green" }} />
          </Button>
        </Stack>

        <Stack
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: { xs: "center", md: "space-between" },
            alignItems: "flex-start",
          }}
        >
          <Stack
            direction="row"
            justifyContent={"flex-start"}
            alignItems={"flex-start"}
          >
            <Typography
              sx={{
                fontWeight: "500",
                fontSize: "18px",
                color: "black",
              }}
              variant="div"
              dangerouslySetInnerHTML={{ __html: qa.answer }}
            ></Typography>
          </Stack>
          <Button
            type="button"
            onClick={() => deleteQA(qa._id)}
            sx={{
              background: "black",
              borderRadius: "8px",
              width: "150px",
              color: "red",
              display: "flex",
              alignItems: "center",
              mb: 2,
              ml: 3,
              p: 1,
              fontWeight: "800",
              "&:hover": { background: "black" },
            }}
          >
            {/* {deleteQAReducer.loading && (
              <CircularProgress sx={{ height: "10px", width: "10px" }} />
            )} */}
            <DeleteOutlineIcon sx={{ color: "red" }} />
            {deleteQAReducer.loading && <p className="text-white">...</p>}
          </Button>
        </Stack>
        {showEditor.id === qa._id && showEditor.boolean && (
          <UpdateQA showEditor={showEditor} qa={qa} />
        )}
      </Box>
    </Fragment>
  );
}

export default QAItem;
