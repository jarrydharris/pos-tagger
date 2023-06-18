import './App.css'
import {Button, Paper, Switch, TextField, Tooltip} from "@mui/material";
import {ReactElement, useState} from "react";

const text_process_url = "http://127.0.0.1:5000/api/v1/process_text"

interface Token {
    word: string,
    class: string,
}

const classes: Record<string, string> = {
    ADJ: "adjective",
    ADP: "adposition",
    ADV: "adverb",
    AUX: "auxiliary",
    CCONJ: "coordinating conjunction",
    DET: "determiner",
    INTJ: "interjection",
    NOUN: "noun",
    NUM: "numeral",
    PART: "particle",
    PRON: "pronoun",
    PROPN: "proper noun",
    PUNCT: "punctuation",
    SCONJ: "subordinating conjunction",
    SYM: "symbol",
    VERB: "verb",
    X: "other",
}

function DisplayToken(token: Token, showPOS: boolean): ReactElement {

    const properties = Object.entries(token)
        .filter(([key]) => key !== 'word')
        .map(([_, value]) => value).join(' ');

    const className = showPOS ? properties : '';
    return (
        <Tooltip key={token.word} title={classes[className]}>
            <span className={className}>{token.word}</span>
        </Tooltip>
    )
}

function App() {
    const [inputText, setInputText] = useState<string>('');
    const [outputText, setOutputText] = useState<Array<Token>>([]);
    const [showPOS, setShowPOS] = useState<boolean>(false);

    function handlePosChange (event: React.ChangeEvent<HTMLInputElement>) {
        setShowPOS(event.target.checked);
    };

    function processText(text: string): Promise<Response> {
        return fetch(text_process_url,
            {
                method: 'POST',
                body: JSON.stringify({text: text}),
                headers: {'Content-Type': 'application/json'}
            }
        );
    }

    async function handleButtonPress(inputText: string) {
        await processText(inputText)
            .then(response => response.json())
            .then((data) => {
                setOutputText([]);
                const newOutputText: Array<Token> = [];
                data.forEach((token: Token) => {
                    newOutputText.push(token)
                });
                setOutputText(newOutputText);
            });
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
                    {outputText.map((token: Token) => DisplayToken(token, showPOS))}
                </Paper>
                <Switch
                    role="pos-toggle"
                    checked={showPOS}
                    onChange={handlePosChange}
                />Toggle parts of speech
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

