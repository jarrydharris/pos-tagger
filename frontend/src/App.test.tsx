import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import App from "./App.tsx"

describe("<App /> renders", () => {
    test('Parts of speech header', () => {
        render(<App/>);
        expect(screen.getByRole('heading', {name: /Parts of speech Tool/i})).toBeInTheDocument();
    });
    test('output textbox', () => {
        render(<App/>);
        expect(screen.getByRole('output-display')).toBeInTheDocument();
    });
    test('input textbox', () => {
        render(<App/>);
        expect(screen.getByRole('input-textbox')).toBeInTheDocument();
    });
    test('submit button', () => {
        render(<App/>);
        expect(screen.getByText('Process text')).toBeInTheDocument();
    });
    test('pos toggle', () => {
        render(<App/>);
        expect(screen.getByRole('pos-toggle')).toBeInTheDocument();
    });
    test('pos toggle text', () => {
        render(<App/>);
        expect(screen.getByText('Toggle parts of speech')).toBeInTheDocument();
    });
});

describe("<Paper/> renders",  () => {
    test('Display Token component on button click', async () => {
        render(<App/>)
        const textField = screen.getByRole('input-textbox');
        const paperOutput = screen.getByRole('output-display');
        const button = screen.getByRole('button', {name: 'Process text'});

        // User clicks textfield, types in text
        await userEvent.click(textField);
        await userEvent.type(textField, 'This')
        expect(textField).toHaveTextContent("This");

        // User clicks button to process text
        await userEvent.tab();
        await userEvent.click(button);

        // User sees output
        await userEvent.tab();
        expect(paperOutput).toHaveTextContent("This");

    });
})