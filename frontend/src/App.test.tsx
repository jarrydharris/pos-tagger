import {render, screen} from '@testing-library/react'
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

