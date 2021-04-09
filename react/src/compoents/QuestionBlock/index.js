import React, { useState,useEffect } from 'react';
import { Grid, Button, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { createQuestionBlock } from '../../services';
const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    containerClass: {
        marginTop: 5
    }
}));
function QuestionBlock({value, setOpen}) {
    const [Name, setName] = useState('');
    const [popup, setpopup] = useState(true);

    const classes = useStyles();

    function handleSubmit() {
        var formData = new FormData();
        formData.append('name', Name);

        createQuestionBlock(formData).then(res => {
            setpopup(false)
        })
    }

    useEffect(() => {
        setOpen(popup);
    }, [popup])
    return (

        <Grid container item xs={12} spacing={2} className={classes.containerClass}>
            <Grid item container xs={12} >
                <Grid item xs={4} >
                    <TextField
                        id="outlined-number"
                        label="BlockName"
                        type="text"
                        value={Name}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        fullWidth
                        variant="outlined"
                        onChange={(e) => setName(e.target.value)}
                    /></Grid>
            </Grid>
            <Grid item container xs={12}><Button variant="contained" color="primary" onClick={handleSubmit}>Submit</Button></Grid>
        </Grid>

    )
}
export default QuestionBlock;