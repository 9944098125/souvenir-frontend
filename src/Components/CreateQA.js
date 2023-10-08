import React, { Fragment, useEffect, useState } from "react";
import {
  Stack,
  Box,
  Button,
  TextField,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
  FormLabel,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { createQAAction } from "./../Redux/Actions/createQAAction";
import { useNavigate } from "react-router-dom";
import AlertModal from "./Modal";
import { logout } from "./../Redux/Actions/loginAction";
import DocumentTitle from "./DocumentTitle";

function CreateQA() {
  DocumentTitle("Souvenir -> Create Question and Answer");
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const alert = useSelector((state) => state.alert);
  const LoginDetails = useSelector((state) => state.auth);

  const [question, setQuestion] = useState("");
  const [textInput, setTextInput] = useState({
    rawData: "",
    formattedData: "",
  });
  const [errors, setErrors] = useState({
    textInput: false,
    question: false,
    toolId: false,
  });
  const [toolId, setToolId] = useState("");

  const onChangeToolId = (e) => {
    setToolId(e.target.value);
  };

  const handleTextInputChange = (inputData, delta, source, editor) => {
    setErrors((pre) => {
      return { ...pre, textInput: false };
    });
    setTextInput({ formattedData: inputData, rawData: editor.getText() });
  };

  const handleQuestionChange = (e) => {
    setErrors((pre) => {
      return { ...pre, question: false };
    });
    setQuestion(e.target.value);
  };

  const submitSuccess = () => {
    if (question) {
      if (textInput.rawData.trim() === "") {
        setErrors((pre) => {
          return { ...pre, textInput: true };
        });
      } else if (!question) {
        setErrors((pre) => {
          return { ...pre, question: true };
        });
      } else {
        const body = {
          question: question,
          answer: textInput.formattedData,
          userId: localStorage.getItem("user_id"),
          toolId: toolId,
        };
        // console.log("answer: ", body);
        dispatch(createQAAction(body));
      }
    } else {
      setErrors((pre) => {
        return { textInput: true, question: true };
      });
    }
    if (!toolId) {
      setErrors((pre) => {
        return { ...pre, toolId: true };
      });
    }
  };

  useEffect(() => {
    if (alert.type === "success") {
      Navigate("/get");
    }
  }, [alert, Navigate]);

  useEffect(() => {
    if (LoginDetails.isAuthenticated === false) {
      dispatch(logout);
      Navigate("/");
    }
  }, [LoginDetails.isAuthenticated, Navigate, dispatch]);

  return (
    <Fragment>
      {alert.message && <AlertModal show={true} />}
      <Box
        sx={{
          minHeight: "100vh",
          maxHeight: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundImage: "linear-gradient(lightpink, white)",
          p: 3,
        }}
      >
        <Typography
          sx={{
            fontWeight: "700",
            fontStyle: "italic",
            mb: 5,
            mt: 5,
            fontSize: { xs: "20px", sm: "25px", md: "30px", lg: "35px" },
          }}
        >
          Note Down Question and Answer and save them to your account...
        </Typography>
        <Stack direction="row" alignItems="center">
          <FormControl error={errors.toolId}>
            <FormLabel>Choose one option</FormLabel>
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
                value="9"
                control={<Radio />}
                label="Python"
                sx={{ mr: { xs: 3, md: 6 } }}
              />
              <FormControlLabel
                value="8"
                control={<Radio />}
                label="Others"
                sx={{ mr: { xs: 3, md: 6 } }}
              />
            </RadioGroup>
          </FormControl>
        </Stack>
        <TextField
          label="Enter Question"
          variant="standard"
          sx={{
            width: "80%",
            mb: 4,
            mt: 5,
            fontSize: "21px",
          }}
          style={{ color: "white" }}
          name="question"
          value={question}
          onChange={handleQuestionChange}
          type="text"
          error={errors.question}
        />
        {errors.question && (
          <Box
            sx={{
              width: { sm: "90%", xs: "98%" },
              display: "flex",
              justifyContent: "flex-start",
              marginTop: "10px",
              ml: 20,
              mb: 3,
            }}
          >
            <Typography variant="body" color="error">
              Question is required
            </Typography>
          </Box>
        )}
        <Box
          sx={{
            width: { sm: "90%", xs: "98%" },
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginX: "auto",
          }}
        >
          <ReactQuill
            placeholder="Enter your Answer here"
            value={textInput.formattedData}
            onChange={handleTextInputChange}
            fontSize={"25px"}
            style={{
              width: "85%",
              borderRadius: "5px",
              border: `2px solid ${errors.textInput ? "red" : "white"}`,
            }}
          />
        </Box>
        {errors.textInput && (
          <Box
            sx={{
              width: { sm: "90%", xs: "98%" },
              display: "flex",
              justifyContent: "flex-start",
              marginTop: "20px",
              ml: 20,
              mb: 5,
            }}
          >
            <Typography variant="body" color="error">
              Answer is required
            </Typography>
          </Box>
        )}
        <Button
          type="button"
          sx={{
            background: "#FF6310",
            color: "white",
            borderRadius: "8px",
            width: "80%",
            mt: 3,
            mb: 4,
            "&:hover": {
              background: "#FF6347",
            },
          }}
          onClick={submitSuccess}
        >
          Submit
        </Button>
      </Box>
    </Fragment>
  );
}

export default CreateQA;
