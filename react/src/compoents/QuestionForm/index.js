import React, { useEffect, useState } from "react";
import {
  Grid,
  Button,
  Typography,
  Divider,
  Input,
  TextField,
  InputLabel,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { saveQuestionDetail, editQuestionDetail } from "../../services";
import VideoRecorder from "react-video-recorder";
import AudioRecorder from "react-audio-recorder";
import { RecordView } from "../AudioRecorder";
import { ReactMediaRecorder } from "react-media-recorder";
import { Api } from "../../config";
import SweetAlert from 'sweetalert-react';
import swal from 'sweetalert';

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  containerClass: {

  },
}));
function QuestionForm({ value, BlockId, data }) {
  const [Video, setVideo] = useState([]);
  const [Audio, setAudio] = useState([]);
  const [IsVideorecording, setIsVideorecording] = useState(false)
  const [Question, setQuestion] = useState("");
  const [QuestionId, setQuestionId] = useState("");
  const classes = useStyles();

  function handleSubmit() {
    var formData = new FormData();
    formData.append("audio", Audio);
    formData.append("video", Video);
    formData.append("question", Question);
    formData.append("blockId", BlockId);
    saveQuestionDetail(formData).then((res) => {
      if (res.status == 200) {
        sweetPopup();
      }
    });
  }
  function sweetPopup() {
    return (
      swal({
        title: "Success",
        text: "Success",
        icon: "success",
      })
    )
  }

  function handleEdit() {
    var formData = new FormData();
    formData.append("audio", Audio);
    formData.append("video", Video);
    formData.append("question", Question);
    formData.append("questionId", QuestionId);
    editQuestionDetail(formData).then((res) => {
      if (res.status == 200) {
        sweetPopup();
      }
    });
  }


  useEffect(() => {
    if (data) {
      setVideo(data.video);
      setAudio(data.audio);
      setQuestion(data.question);
      setQuestionId(data._id);
    }
  }, [data])

  return (<>
    <Grid item container xs={12} justify="center" >
      <Grid item xs={8} container >
        <div style={{
          height: "200px",
          width: "100%"
        }}>
          {!IsVideorecording && value == "Edit" ? <video width="250" height="200" controls={true}>
            <source src={Api.baseUrl + "/" + Video} type="video/webm" />
          </video> :

            <VideoRecorder
              onRecordingComplete={(videoBlob) => {
                // Do something with the video...

                const fileName = "new" + "-" + Date.now() + "-" + "author";

                const videoFile = new File([videoBlob], `${fileName}.webm`, {
                  type: "video/webm",
                  lastModified: Date.now(),
                });
                setVideo(videoFile);
              }}
            />}
          {value == "Edit" && <Button onClick={() => setIsVideorecording(!IsVideorecording)}>Record Video</Button>}
        </div>

        <RecordView setAudio={setAudio} value={value} audioValue={Audio} />
        <TextField
          id="outlined-number"
          label="Questions"
          type="text"
          value={Question}
          InputLabelProps={{
            shrink: true,
          }}
          fullWidth
          variant="outlined"
          onChange={(e) => setQuestion(e.target.value)}
        />
        <div>
          <Button variant="contained" color="primary" onClick={BlockId && value == "Edit" ? handleEdit : handleSubmit}>
            {BlockId && value == "Edit" ? "Update" : "Submit"}
          </Button>
        </div>
      </Grid>
    </Grid>

  </>
  );
}
export default QuestionForm;
