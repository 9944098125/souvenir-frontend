import React, { Fragment, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import AlertModal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { getQAAction } from "./../Redux/Actions/getQAAction";
import usePagination from "./Pagination";
import { deleteQAAction } from "../Redux/Actions/deleteQAAction";
import { logout } from "./../Redux/Actions/loginAction";
import Navbar from "./Navbar";
import QAItem from "./QAItem";
import {
  Stack,
  FormControlLabel,
  Radio,
  RadioGroup,
  Pagination,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import DocumentTitle from "./DocumentTitle";

function GetQA() {
  DocumentTitle("Souvenir -> Get Questions and Answers");
  const dispatch = useDispatch();
  const Navigate = useNavigate();
  const LoginDetails = useSelector((state) => state.auth);
  const questionsArray = useSelector((state) => state.getQAReducer);

  const oldData = {
    question: "",
    answer: "",
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [showEditor, setShowEditor] = useState({
    id: "",
    boolean: false,
    dataWithId: { ...oldData },
  });
  // console.log(showEditor.dataWithId);

  const [toolId, setToolId] = useState("1");

  const onChangeToolId = (e) => {
    setToolId(e.target.value);
  };

  const userId = localStorage.getItem("user_id");
  const PER_PAGE = 5;
  let responseData = [];

  if (Array.isArray(questionsArray.questionsArray)) {
    responseData = questionsArray.questionsArray;
  } else {
    responseData = [];
  }
  // console.log(responseData, "is the res");
  const filteredData = responseData.filter((item) =>
    item.question.toLowerCase().includes(searchTerm.toLowerCase())
  );
  // console.log('filtered', filteredData)

  const questionsPaginatedData = usePagination(filteredData, PER_PAGE);

  const paginationHandler = (event, value) => {
    questionsPaginatedData.jump(value);
  };

  const logout1 = () => {
    dispatch(logout);
    Navigate("/");
  };

  const alert = useSelector((state) => state.alert);

  function deleteQA(qaId) {
    dispatch(deleteQAAction(qaId));
    setTimeout(() => {
      Navigate("/create");
    }, 0.001);
  }

  useEffect(() => {
    dispatch(getQAAction(userId, toolId));
  }, [dispatch, userId, showEditor, toolId]);

  const updateQA = (qa) => {
    setShowEditor({
      id: qa._id,
      boolean: !showEditor.boolean,
      dataWithId: { ...qa },
    });
    console.log("qa", showEditor.dataWithId, qa, showEditor.boolean);
  };

  useEffect(() => {
    if (alert.type === "success") {
      setShowEditor(false);
      // window.location.reload();
    }
  }, [showEditor, alert, questionsPaginatedData]);

  useEffect(() => {
    if (LoginDetails.isAuthenticated === false) {
      dispatch(logout);
      Navigate("/");
    }
  }, [LoginDetails.isAuthenticated, Navigate, dispatch]);

  const changeSearchTerm = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Fragment>
      <Box
        sx={{
          // backgroundImage: "linear-gradient(rgb(6, 107, 65), lightgreen)",
          minHeight: "100vh",
          maxHeight: "100%",
          width: "100%",
          p: 5,
        }}
      >
        <Navbar logout1={logout1} />
        {alert.message && <AlertModal show={true} />}
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            mt: 10,
            backgroundColor: "white",
            display: "flex",
            alignItems: "center",
            borderRadius: "12px",
            width: "100%",
            p: 1,
          }}
        >
          <img
            src="https://cdn0.iconfinder.com/data/icons/very-basic-2-android-l-lollipop-icon-pack/24/search-512.png"
            style={{
              height: "25px",
              width: "25px",
              marginLeft: "10px",
              fontWeight: "900",
            }}
            alt="search"
          />
          <TextField
            variant="outlined"
            label="Search"
            sx={{
              width: "100%",
              borderRadius: "12px",
            }}
            placeholder="Search By Question from 1st page..."
            name="searchTerm"
            value={searchTerm}
            onChange={changeSearchTerm}
          />
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          sx={{ mt: { xs: 10, md: 7 } }}
        >
          <RadioGroup
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
            }}
            aria-labelledby="demo-radio-buttons-group-label"
            value={toolId}
            name="toolId"
            onChange={onChangeToolId}
          >
            <FormControlLabel
              value="1"
              control={<Radio />}
              label="React Js"
              sx={{ mr: { xs: 3, md: 6 } }}
            />
            <FormControlLabel
              value="2"
              control={<Radio />}
              label="Node Js"
              sx={{ mr: { xs: 3, md: 6 } }}
            />
            <FormControlLabel
              value="3"
              control={<Radio />}
              label="Angular"
              sx={{ mr: { xs: 3, md: 6 } }}
            />
            <FormControlLabel
              value="4"
              control={<Radio />}
              label="Java"
              sx={{ mr: { xs: 3, md: 6 } }}
            />
            <FormControlLabel
              value="5"
              control={<Radio />}
              label="React Native"
              sx={{ mr: { xs: 3, md: 6 } }}
            />
            <FormControlLabel
              value="6"
              control={<Radio />}
              label="JavaScript"
              sx={{ mr: { xs: 3, md: 6 } }}
            />
            <FormControlLabel
              value="7"
              control={<Radio />}
              label="MongoDB"
              sx={{ mr: { xs: 3, md: 6 } }}
            />
            <FormControlLabel
              value="8"
              control={<Radio />}
              label="Others"
              sx={{ mr: { xs: 3, md: 6 } }}
            />
          </RadioGroup>
        </Stack>
        {questionsArray.errorMsg && (
          <Stack direction="row" justifyContent="center" alignItems="center">
            <Typography sx={{ color: "red", fontSize: "35px" }}>
              {questionsArray.errorMsg}
            </Typography>
          </Stack>
        )}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            mt: 10,
          }}
        >
          {questionsPaginatedData.currentData().map((qa, idx) => (
            <QAItem
              key={idx}
              qa={qa}
              deleteQA={deleteQA}
              showEditor={showEditor}
              updateQA={updateQA}
            />
          ))}
        </Box>
        <Stack direction="row" justifyContent="center" alignItems="center">
          <Pagination
            count={questionsPaginatedData.maxPage}
            page={questionsPaginatedData.currentPage}
            color="error"
            shape="circular"
            variant="outlined"
            default={questionsPaginatedData.currentPage}
            onChange={paginationHandler}
          />
        </Stack>
      </Box>
    </Fragment>
  );
}

export default GetQA;
