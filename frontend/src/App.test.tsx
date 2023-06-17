import {render, screen} from '@testing-library/react'
import App from "./App.tsx";

describe("<App />", () => {
    render(<App/>);
    test('renders Parts of speech header', () => {
        expect(screen.getByText('Parts of speech Tool')).toBeInTheDocument();
    });
});


