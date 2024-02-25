# beecode-otp-ui

This is simple Functional React Component that renders a set of `Input Fields` for entering `One Time Password (OTP)`.

## Inputs

- `otpFieldCount`: The number of OTP input fields to render.
- `handleOTPVerification`: A function to handle OTP verification. It takes the OTP code as a parameter `(optional)`.
- `error`: An optional error message to display.
- `className`: An optional CSS class name for styling.

- It also handles the `keystrokes` like `backspace` and `delete`

### Usage

**npm**
`npm install beecode-otp-ui`

**yarn**
`yarn add beecode-otp-ui`

```
import { OTPUI } from "beecode-otp-ui";

export default ReactComponent () {
  return {
    <OTPUI
      optFieldCount={3}
     />
  }
}
```

## Props

`otpFieldCount` -> `number` -> `required` -> Number of input fields required for OTP (Most used otps are of `4` or `6` nos)

`handleOTPVerification` -> `(OTPCode: string) => void` -> `optional` -> This function gets triggered once all the input fields are filled up. This will catch the entered value as string.

`error` -> `string` -> `optional` -> This will show the error message if passed

`className` -> `string` -> `optional` -> Any styles to overwrite (works with tailwindcss and tailwind-merge)
