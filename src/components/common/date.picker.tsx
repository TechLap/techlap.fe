import { forwardRef } from "react";
import DatePicker, { registerLocale } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { vi } from "date-fns/locale";

registerLocale("vi", vi);

interface CustomInputProps {
  value?: string;
  onClick?: () => void;
}

const CustomInput = forwardRef<HTMLInputElement, CustomInputProps>(
  ({ value, onClick }, ref) => (
    <input
      type="text"
      value={value}
      style={{ border: "none", outline: "none", flex: 1 }}
      placeholder="Chọn ngày"
      onClick={onClick}
      ref={ref}
      readOnly
    />
  )
);

interface DateFilterProps {
  value?: Date | null;
  onChange: (date: Date | null) => void;
}

const DateFilter = ({ value, onChange }: DateFilterProps) => {
  return (
    <DatePicker
      selected={value}
      onChange={onChange}
      customInput={<CustomInput />}
      placeholderText="Chọn ngày..."
      dateFormat="dd/MM/yyyy"
      isClearable
      locale="vi"
      closeOnScroll={true}
      shouldCloseOnSelect={false}
    />
  );
};

export default DateFilter;
