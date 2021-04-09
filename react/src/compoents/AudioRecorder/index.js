import { useReactMediaRecorder } from "react-media-recorder";
import { useState, useEffect } from "react";
import { Api } from "../../config";
import {
  Button
} from "@material-ui/core";

export const RecordView = ({ setAudio, value, audioValue }) => {
  const [AudioInput, setAudioInput] = useState("");
  const [ABlob, setABlob] = useState(null);
  const [IsAudioRecord, setIsAudioRecord] = useState(false);

  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
  } = useReactMediaRecorder({ audio: true, onStop, type: "audio/wav" });

  function onStop(e, r) {
    setABlob(r);
  }

  useEffect(() => {

    const fileName = "new" + "-" + Date.now() + "-" + "author";

    const audioFile = new File([ABlob], `${fileName}.wav`, {
      type: "audio/wav",
      lastModified: Date.now(),
    });

    setAudio(audioFile);
  }, [mediaBlobUrl]);

  return (
    <div style={{width: "100%"}}>
      <p>{status}</p>
      {!IsAudioRecord && value == "Edit" ?
        <audio src={Api.baseUrl + "/" + audioValue} type="audio/wav" controls /> :
        <> <button onClick={startRecording}>Start Recording</button>
          <button onClick={stopRecording}>Stop Recording</button></>
      }
      {value == "Edit" && <Button onClick={() => setIsAudioRecord(!IsAudioRecord)}>Record Audio</Button>}
      {/* <audio src={mediaBlobUrl} controls />  */}
    </div>
  );
};
