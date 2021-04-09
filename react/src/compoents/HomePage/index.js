import React, { useEffect, useState } from "react";
import { Grid, Button, Typography, Modal, Backdrop } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import QuestionForm from "../QuestionForm";
import QuestionBlock from "../QuestionBlock";
import { getquestionBlockData, getquestionsData } from "../../services";
import VideoRecorder from "react-video-recorder";
import AudioRecorder from "react-audio-recorder";
import { RecordView } from "../AudioRecorder";
import { ReactMediaRecorder } from "react-media-recorder";
import { Api } from "../../config";

const useStyles = makeStyles((theme) => ({
  btnClass: {
    // marginLeft: 16,
    // marginTop: 2,
    // padding: 14,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  qBlocksSide: {
    backgroundColor: 'lightgrey',
    cursor: 'pointer',

  },
  homeBlock: {
    backgroundColor: 'wheat'
  }
}));
function Questions() {
  const [OpenFrom, setOpenForm] = useState("");
  const [BlockId, setBlockId] = useState(null);
  const [Open, setOpen] = useState(false);
  const [IsBtn, setIsBtn] = useState(false);
  const [BlockData, setBlockData] = useState([]);
  const [EditData, setEditData] = useState('');
  const [BlockQuestionDetail, setBlockQuestionDetail] = useState([]);
  const classes = useStyles();
  function addQuestion() {
    setOpenForm("Create");
  }

  
  useEffect(() => {
    getquestionBlockData().then((res) => {
      setBlockData(res);
    });
  }, [Open]);

  function handleBlock(id) {
    // setOpenForm("Create");
    setIsBtn(true);
    setBlockId(id)
    getquestionsData(id).then((res) => {
      setBlockQuestionDetail(res);
    });
  }
  function onEdit(data) {
    setOpenForm("Edit");
    setEditData(data);
  }

  return (
    <Grid container justifyContent="flex-start" className={classes.homeBlock} xs={12}>

      <Grid item container xs={2} >
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={Open}
          onClose={() => setOpen(false)}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <QuestionBlock setOpen={setOpen}/>
        </Modal>
        <Grid item xs={12} className={classes.qBlocksSide}>
          <div>
            <Button
              variant="contained"
              color="primary"
              onClick={() => setOpen(true)}
            >
              Add Question Block
          </Button>
            {BlockData &&
              BlockData.data &&
              BlockData.data.length > 0 &&
              BlockData.data.map((i, j) => {
                return (
                  <p
                    onClick={() => handleBlock(i._id)}
                  >
                    {i.name}
                  </p>
                );
              })}
          </div>
        </Grid>

      </Grid>
      <Grid item container xs={10}>
        <Grid item xs={3}>
          <div style={{height:800, overflowY: 'scroll',}}>
            {BlockQuestionDetail &&
              BlockQuestionDetail.data &&
              BlockQuestionDetail.data.questions &&
              BlockQuestionDetail.data.questions.length > 0 &&
              BlockQuestionDetail.data.questions.map((i, j) => {
                return (
                  <div onClick={()=>{onEdit(i)}}>
                    <video width="250" height="200" controls={false}>
                      <source src={Api.baseUrl + "/" + i.video} type="video/webm" />
                    </video> 
                    <p>{i.question} </p>
                  </div>)
              })

            }
            
          </div>
          {BlockId && <Button
              className={classes.btnClass}
              variant="contained"
              color="primary"
              onClick={addQuestion}
            >
              Add Questions
          </Button>}

        </Grid>
        <Grid container item xs={9}>
          {OpenFrom ? <QuestionForm value={OpenFrom} BlockId={BlockId} data={EditData}/> : ""}
        </Grid>

      </Grid>
    </Grid>
  );
}
export default Questions;
