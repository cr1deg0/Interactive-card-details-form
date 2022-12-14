import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import App from './App'

describe('validate cardholder name input field', () => {
  test('name input exists, it is required, has a placeholder and initial value is empty', () => {
    render(<App />);
    expect(getNameInput()).toBeInTheDocument();
    expect(getNameInput()).toBeRequired();
    expect(getNameInput()).toHaveAttribute('placeholder','e.g. Jane Appleseed')
    expect(getNameInput()).toHaveDisplayValue('');
  });

  test('name input hooked to form state', () => {
    render(<App />);
    userEvent.type(getNameInput(), 'rose bud');
    expect(getNameInput()).toHaveDisplayValue('rose bud');
  });

  test('typed name displayed in front card', () => {
    render(<App />);
    const frontCardName = screen.getByTestId('card-name');
    userEvent.type(getNameInput(), 'rose bud');
    expect(frontCardName).toHaveTextContent(/rose bud/i);
  })

  test('error displayed when incorrect name format', () => {
    render(<App />);
    userEvent.type(getNameInput(), 'r');
    expect(screen.getByText(/Enter your name as it appears in your card/)).toBeInTheDocument();
    userEvent.clear(getNameInput());
    expect(screen.getByText(/Can't be blank/)).toBeInTheDocument();
  });

  test('error disappears with correct name format', () => {
    render(<App />);
    userEvent.type(getNameInput(), 'r');
    expect(screen.getByText(/Enter your name as it appears in your card/)).toBeInTheDocument();
    userEvent.type(getNameInput(), 'ose bud');
    expect(screen.queryByText(/Enter your name as it appears in your card/)).toBeNull();
  });
});

describe('validate card number input field', () => {

  test('number input exists, it is required, has a placeholder and initial value is empty', () => {
    render(<App />);
    expect(getNumberInput()).toBeInTheDocument();
    expect(getNumberInput()).toBeRequired();
    expect(getNumberInput()).toHaveAttribute('placeholder','e.g. 1234 5678 9123 0000')
    expect(getNumberInput()).toHaveDisplayValue('');
  });

  test('number input hooked to form state', () => {
    render(<App />);
    userEvent.type(getNumberInput(), '444');
    expect(getNumberInput()).toHaveDisplayValue('444');
  });

  test('typed number displayed in front card', () => {
    render(<App />);
    const frontCardNumber = screen.getByTestId('card-number');
    userEvent.type(getNumberInput(), '4444 44');
    expect(frontCardNumber).toHaveTextContent(/4444 44/i);
  });

  test('error displayed when incorrect number format', () => {
    render(<App />);
    userEvent.type(getNumberInput(), '444');
    expect(screen.getByText(/Invalid card number/)).toBeInTheDocument();
    userEvent.clear(getNumberInput());
    expect(screen.getByText(/Can't be blank/)).toBeInTheDocument();
  });

  test('error disappears with correct number format', () => {
    render(<App />);
    userEvent.type(getNumberInput(), '4');
    expect(screen.getByText(/Invalid card number/)).toBeInTheDocument();
    userEvent.type(getNumberInput(), '444 4444 4444 4');
    expect(screen.queryByText(/Invalid card number/)).toBeNull();
  });

  test('Visa card suppported, 13 or 16 digits starting with 4', () => {
    render(<App />);
    userEvent.type(getNumberInput(), '4444 4444 4444 4');
    expect(screen.queryByText(/Invalid card number/)).toBeNull();
    userEvent.type(getNumberInput(), '123');
    expect(screen.queryByText(/Invalid card number/)).toBeNull();
  });

  test('American Express supported, starts with 34 or 37 and has 15 digits.', () => {
    render(<App />);
    userEvent.type(getNumberInput(), '3412 1234 1234 123');
    expect(screen.queryByText(/Invalid card number/)).toBeNull();
    userEvent.clear(getNumberInput());
    userEvent.type(getNumberInput(), '3712 1234 1234 123');
    expect(screen.queryByText(/Invalid card number/)).toBeNull();
  });

  test('MasterCard supported, start with the numbers 51 through 55 or with the numbers 2221 through 2720 and has 16 digits.', () => {
    render(<App />);
    //non exhaustive test
    userEvent.type(getNumberInput(), '5412 1234 1234 1233');
    expect(screen.queryByText(/Invalid card number/)).toBeNull();
    userEvent.clear(getNumberInput());
    userEvent.type(getNumberInput(), '2540 1234 1234 1234');
    expect(screen.queryByText(/Invalid card number/)).toBeNull();
  });
});

describe('validate card month expiry input field', () => {
  
  test('expiry month input exists, it is required, has a placeholder and initial value is empty', () => {
    render(<App />);
    expect(getMonthInput()).toBeInTheDocument();
    expect(getMonthInput()).toBeRequired();
    expect(getMonthInput()).toHaveAttribute('placeholder', 'MM')
    expect(getMonthInput()).toHaveDisplayValue('');
  });

  test('expiry month input hooked to form state', () => {
    render(<App />);
    userEvent.type(getMonthInput(), '02');
    expect(getMonthInput()).toHaveDisplayValue('02');
  });

  test('typed expiry date displayed in front card', () => {
    render(<App />);
    const frontCardExpiry = screen.getByTestId('card-expiry-date');
    userEvent.type(getMonthInput(), '07');
    userEvent.type(getYearInput(), '24')
    expect(frontCardExpiry).toHaveTextContent('07/24');
  });

  test('error displayed when incorrect month format', () => {
    render(<App />);
    userEvent.type(getMonthInput(), 'a');
    expect(screen.getByText(/Wrong month format/)).toBeInTheDocument();
    userEvent.clear(getMonthInput());
    userEvent.type(getMonthInput(), '23');
    expect(screen.getByText(/Wrong month format/)).toBeInTheDocument();
    userEvent.clear(getMonthInput());
    expect(screen.getByText(/Can't be blank/)).toBeInTheDocument();
  });

  test('error disappears with correct month format', () => {
    render(<App />);
    userEvent.type(getMonthInput(), '1');
    expect(screen.getByText(/Wrong month format/)).toBeInTheDocument();
    userEvent.type(getMonthInput(), '2');
    expect(screen.queryByText(/Wrong month format/)).toBeNull();
  });
});

describe('validate card year expiry input field', () => {

  test('expiry year input exists, it is required, has a placeholder and initial value is empty', () => {
    render(<App />);
    expect(getYearInput()).toBeInTheDocument();
    expect(getYearInput()).toBeRequired();
    expect(getYearInput()).toHaveAttribute('placeholder', 'YY')
    expect(getYearInput()).toHaveDisplayValue('');
  });

  test('expiry year input hooked to form state', () => {
    render(<App />);
    userEvent.type(getYearInput(), '24');
    expect(getYearInput()).toHaveDisplayValue('24');
  });

  test('error displayed when incorrect year format', () => {
    render(<App />);
    userEvent.type(getYearInput(), 'as');
    expect(screen.getByText(/Wrong year format/)).toBeInTheDocument();
    userEvent.clear(getYearInput());
    userEvent.type(getYearInput(), '1');
    expect(screen.getByText(/Wrong year format/)).toBeInTheDocument();
    userEvent.clear(getYearInput());
    expect(screen.getByText(/Can't be blank/)).toBeInTheDocument();
  });

  test('error disappears with correct year format', () => {
    render(<App />);
    userEvent.type(getYearInput(), '2');
    expect(screen.getByText(/Wrong year format/)).toBeInTheDocument();
    userEvent.type(getYearInput(), '2');
    expect(screen.queryByText(/Wrong year format/)).toBeNull();
  });
});

describe('validate card CVC input field', () => {

  test('cvc input exists, it is required, has a placeholder and initial value is empty', () => {
    render(<App />);
    expect(getCvcInput()).toBeInTheDocument();
    expect(getCvcInput()).toBeRequired();
    expect(getCvcInput()).toHaveAttribute('placeholder', 'e.g. 123')
    expect(getCvcInput()).toHaveDisplayValue('');
  });

  test('cvc input hooked to form state', () => {
    render(<App />);
    userEvent.type(getCvcInput(), '24');
    expect(getCvcInput()).toHaveDisplayValue('24');
  });

  test('typed cvc displayed in back card', () => {
    render(<App />);
    const backCardCvc = screen.getByTestId('card-cvc');
    userEvent.type(getCvcInput(), '1234');
    expect(backCardCvc).toHaveTextContent('1234');
  });

  test('error displayed when incorrect cvc format', () => {
    render(<App />);
    userEvent.type(getCvcInput(), 'as');
    expect(screen.getByText(/Wrong cvc format/i)).toBeInTheDocument();
    userEvent.clear(getCvcInput());
    userEvent.type(getCvcInput(), '1');
    expect(screen.getByText(/Wrong cvc format/i)).toBeInTheDocument();
    userEvent.clear(getCvcInput());
    expect(screen.getByText(/Can't be blank/)).toBeInTheDocument();
  });

  test('error disappears with correct year format', () => {
    render(<App />);
    userEvent.type(getCvcInput(), '2');
    expect(screen.getByText(/Wrong cvc format/i)).toBeInTheDocument();
    userEvent.type(getCvcInput(), '224');
    expect(screen.queryByText(/Wrong cvc format/i)).toBeNull();
  });
});

describe('validate form submission and app routing', () => {
  test('app returns to empty form after thank you page', async () => {
    render(<App />);
    userEvent.type(getNameInput(), 'rose bud');
    userEvent.type(getNumberInput(), '4444 4444 4444 4');
    userEvent.type(getMonthInput(), '11');
    userEvent.type(getYearInput(), '23');
    userEvent.type(getCvcInput(), '123');
    userEvent.click(getConfirmBtn());
    userEvent.click(getContinueBtn());
    expect(getNameInput()).toHaveValue('');
    expect(getNumberInput()).toHaveDisplayValue('');
    expect(getMonthInput()).toHaveDisplayValue('');
    expect(getYearInput()).toHaveDisplayValue('');
    expect(getCvcInput()).toHaveDisplayValue('');
  })
  test('submit button disabled initially', () => {
    render(<App />);
    expect(getConfirmBtn()).toHaveAttribute('aria-disabled', 'true');
    userEvent.click(getConfirmBtn());
    expect(screen.queryByText(/thank you/i)).toBeNull();
  })
  test('cannot submit form if invalid field', () => {
    render(<App />);
    userEvent.type(getNameInput(), 'r');
    userEvent.type(getNumberInput(), '4444 4444 4444 4');
    userEvent.type(getMonthInput(), '11');
    userEvent.type(getYearInput(), '23');
    userEvent.type(getCvcInput(), '123');
    userEvent.click(getConfirmBtn());
    expect(screen.queryByText(/thank you/i)).toBeNull()
  })
  test('cannot submit form if there is one empty field', () => {
    render(<App />);
    userEvent.type(getNameInput(), 'rose bud');
    userEvent.type(getNumberInput(), '4444 4444 4444 4');
    userEvent.type(getMonthInput(), '11');
    userEvent.type(getYearInput(), '');
    userEvent.type(getCvcInput(), '123');
    userEvent.click(getConfirmBtn());
    expect(screen.queryByText(/thank you/i)).toBeNull()
  })
  test('form submits when all fields are filled in and are valid', async () => {
    render(<App />);
    userEvent.type(getNameInput(), 'rose bud');
    userEvent.type(getNumberInput(), '4444 4444 4444 4');
    userEvent.type(getMonthInput(), '11');
    userEvent.type(getYearInput(), '23');
    userEvent.type(getCvcInput(), '123');
    userEvent.click(getConfirmBtn());
    expect(await screen.findByText(/thank you/i)).toBeInTheDocument();
  })
});

function getNameInput() {
  return screen.getByRole('textbox',{
    name: /^cardholder name/i
  })
}

function getNumberInput() {
  return screen.getByRole('textbox', {
    name: /^card number/i
  })
}

function getMonthInput() {
  return screen.getByRole('textbox', {
    name: /expiry month/i
  })
}

function getYearInput() {
  return screen.getByRole('textbox', {
    name: /expiry year/i
  })
}

function getCvcInput() {
  return screen.getByRole('textbox', {
    name: /cvc/i
  })
}

function getConfirmBtn() {
  return screen.getByText(/confirm/i)
}

function getContinueBtn() {
  return screen.getByText(/continue/i)
}