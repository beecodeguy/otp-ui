import React, {
  ChangeEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { OTPFieldsInterface } from "../types";
import { cn } from "../utils";

const OTPField = ({
  otpFieldCount = 4,
  handleOTPVerification,
  error,
  className,
}: OTPFieldsInterface) => {
  const [password, setPassword] = useState<string[]>(
    Array(otpFieldCount).fill("")
  );

  const itemsRef = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    //Handle onInputFilled
    if (password.every((val) => val !== "")) {
      const otp = password.join("");
      handleOTPVerification?.(otp);
    }
  }, [password, handleOTPVerification]);

  const passwordSetter = (value: string, index: number) => {
    setPassword((prev) => {
      const newPassword = [...prev];
      newPassword[index] = value;
      return newPassword;
    });
  };

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>, i: number) => {
      const { value } = e.target;
      passwordSetter(value, i);

      // Focus to next input on value change
      if (value != "" && i < otpFieldCount - 1) {
        itemsRef.current[i + 1].focus();
      }
    },
    [otpFieldCount]
  );

  // Handles Key strokes
  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    i: number
  ) => {
    {
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        const nextIndex =
          (i + (e.key === "ArrowRight" ? 1 : otpFieldCount - 1)) %
          otpFieldCount;
        itemsRef.current[nextIndex].focus();
      }

      if (e.key === "Backspace" && itemsRef.current[i].value !== "") {
        e.preventDefault();
        itemsRef.current[i].value = "";
        passwordSetter("", i);

        if (i > 0) itemsRef.current[i - 1].focus();
      }
    }
  };

  return (
    <div
      className={cn(
        "text-center flex flex-col justify-center items-center",
        className
      )}
    >
      <div className="flex space-x-4">
        {Array(otpFieldCount)
          .fill("")
          .map((_, index) => (
            <input
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              ref={(ref) => (itemsRef.current[index] = ref as HTMLInputElement)}
              onChange={(e) => handleChange(e, index)}
              className="w-[40px] h-[40px] p-2 outline-none border border-slate-400 focus:border-green-500"
              type="text"
              maxLength={1}
              inputMode="numeric"
              onKeyDown={(e) => handleKeyDown(e, index)}
            />
          ))}
      </div>
      <span className="text-red-600">{error}</span>
    </div>
  );
};

export default OTPField;
