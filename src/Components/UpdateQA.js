import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateQAAction } from "../Redux/Actions/updateQAAction";
import ReactQuill from "react-quill";
import { Box, Typography, TextField, Button } from "@mui/material";
import AlertModal from "./Modal";

function UpdateQA({ showEditor, qa, updateQA }) {
  const dispatch = useDispatch();

  const alert = useSelector((state) => state.alert);

  const [question, setQuestion] = useState(
    showEditor.boolean && showEditor.dataWithId.question
  );
  const [textInput, setTextInput] = useState({
    rawData: "",
    formattedData: showEditor.boolean && showEditor.dataWithId.answer,
  });
  const [errors, setErrors] = useState({
    textInput: false,
    question: false,
  });

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

  const updateSuccess = (qaId) => {
    if (!question) {
      setErrors((pre) => {
        return { ...pre, question: true };
      });
    }
    if (!textInput) {
      setErrors((pre) => {
        return { ...pre, textInput: true };
      });
    }
    if (question && textInput) {
      const body = {
        question: question,
        answer: textInput.formattedData,
      };
      dispatch(updateQAAction(qaId, body));
    }
  };

  return (
    <Fragment>
      <Box
        sx={{
          p: 1,
          background: "white",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {alert.message && <AlertModal show={true} />}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 5,
          }}
        >
          <TextField
            label="Enter Question"
            variant="standard"
            sx={{ width: "80%", mb: 4 }}
            name="question"
            value={question}
            onChange={handleQuestionChange}
            type="text"
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
              placeholder="Enter your suggestion here"
              value={textInput.formattedData}
              onChange={handleTextInputChange}
              style={{
                width: "90%",
                borderRadius: "5px",
                border: `2px solid ${errors.textInput ? "red" : "grey"}`,
                fontSize: "16px",
                padding: "25px",
                color: "black",
              }}
            />
          </Box>
          {errors.textInput.rawData && (
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
          <Box
            sx={{
              display: "flex",
              alignItems: "stretch",
              justifyContent: "center",
            }}
          >
            <Button
              type="submit"
              sx={{
                background: "orange",
                color: "white",
                borderRadius: "8px",
                width: "100%",
                mt: 3,
                mb: 4,
                ml: 2,
                "&:hover": {
                  background: "red",
                },
              }}
              onClick={() => updateSuccess(qa._id)}
            >
              Submit
            </Button>
          </Box>
        </Box>
      </Box>
    </Fragment>
  );
}

export default UpdateQA;
