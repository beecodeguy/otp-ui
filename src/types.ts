export type OTPFieldsInterface = {
  otpFieldCount: number;
  handleOTPVerification?: (OTPCode: string) => void;
  error?: string;
  className?: string;
};