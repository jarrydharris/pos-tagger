import './App.css'
import {Button, Paper, Switch, TextField} from "@mui/material";
import {useState} from "react";



function App() {
    const [inputText, setInputText] = useState<string>('');
    const [outputText, setOutputText] = useState<string>('');

    function processText(text: string) {
        return text;
    }

    function handleButtonPress(inputText: string) {
        const processedText = processText(inputText);
        setOutputText(processedText);
    }

    return (
        <>
            <h1>Parts of speech Tool</h1>
            <div role="output-container">
                <Paper
                    variant="outlined"
                    sx={output_style}
                    role="output-display"
                >
                    {outputText}
                </Paper>
                <Switch role="pos-toggle"/>Toggle parts of speech
            </div>
            <div id="input-container">
                <TextField
                    data-testid='input-textbox'
                    id="outlined-multiline-static"
                    label="Write text here"
                    multiline
                    rows={4}
                    role="input-textbox"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    InputProps={inputProps}
                    InputLabelProps={inputLabelProps}
                    sx={input_style}
                />
                <Button
                    sx={buttonStyle}
                    onClick={() => handleButtonPress(inputText)}
                    variant="outlined"
                >Process text</Button>
            </div>
        </>
    )
}

export default App

const output_style = {
    color: 'rgba(255, 255, 255, 0.87)',
    width: '100%',
    height: '200px',
    boxSizing: 'border-box',
    backgroundColor: '#2e2e2e',
    textAlign: 'left',
    borderColor: 'rgba(255, 255, 255, 0.87)',
    padding: '0.75em',
}

const input_style = {
    color: 'rgba(255, 255, 255, 0.87)',
    width: '100%',
    backgroundColor: '#2e2e2e',
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderColor: 'rgba(255, 255, 255, 0.87)', // Set your desired border color here
        },
        '&:hover fieldset': {
            borderColor: '#646cff',
        }
    }
}

const inputProps = {
    sx: {
        color: 'rgba(255, 255, 255, 0.87)',
    },

}

const buttonStyle = {
    marginTop:"0.5em",
    color: 'rgba(255, 255, 255, 0.87)',
    backgroundColor: '#2e2e2e',
    borderColor: 'rgba(255, 255, 255, 0.87)'
}

const inputLabelProps = {
    sx: {
        color: 'rgba(255, 255, 255, 0.87)'
    }
}

