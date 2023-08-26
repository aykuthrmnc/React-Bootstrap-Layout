import { HTMLInputTypeAttribute, InputHTMLAttributes, useState } from "react";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { Controller, Control as RHFControl } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import BaseReactSelect, { Props as ReactSelectProps } from "react-select";
import BaseReactSelectAsync, { AsyncProps as ReactSelectAsyncProps } from "react-select/async";
import BaseReactSelectCreatable, { CreatableProps as ReactSelectCreatableProps } from "react-select/creatable";
import BaseReactSelectAsyncCreatable, { AsyncCreatableProps as ReactSelectAsyncCreatableProps } from "react-select/async-creatable";
import BaseReactDatetime, { DatetimepickerProps } from "react-datetime";
import BaseReactDropzone from "react-dropzone";
import BasePhoneInput from "react-phone-number-input";
import phoneInputTr from "react-phone-number-input/locale/tr";
import "moment/dist/locale/tr";
import moment from "moment";
import classNames from "classnames";
import { FaEye, FaEyeSlash, FaSearch } from "react-icons/fa";
import { FaMinus, FaPlus } from "react-icons/fa6";
// import BaseReactDatePicker, { registerLocale } from "react-datepicker";
// import tr from "date-fns/locale/tr";
// registerLocale("tr", tr);

type Props = InputHTMLAttributes<HTMLInputElement> & {
  endIcon?: boolean;
  label?: any;
  id?: string;
  type?: string;
  name: string;
  as?: any;
  placeholder?: string;
  register?: any;
  errors?: any;
  control?: RHFControl<any>;
  className?: string;
  classNameLabel?: string;
  classNameContainer?: string;
  textClassName?: string;
  refCallback?: any;
  action?: React.ReactNode;
  rows?: number;
  labelRequired?: boolean;
  onChangeValue?: any;
  repeaterError?: any;
  disabled?: boolean | undefined;
  [x: string]: any;
};

const Input = ({ children }: Props) => {
  return children;
};

interface InputProps {
  as?: any;
  id?: string;
  name: string;
  label?: any;
  type?: HTMLInputTypeAttribute;
  className?: string;
  classNameLabel?: string;
  classNameSearch?: string;
  classNameContainer?: string;
  placeholder?: string;
  size?: string;
  rows?: number;
  required?: boolean;
  disabled?: boolean;
  searchIcon?: any;
  showPasswordButton?: boolean;
  register?: any;
  errors?: any;
  [x: string]: any;
}

const Control = ({
  as,
  id,
  name,
  label,
  type = "text",
  className,
  classNameLabel,
  classNameSearch,
  classNameContainer,
  placeholder,
  size,
  rows,
  disabled,
  required,
  searchIcon,
  showPasswordButton = false,
  register,
  errors,
  ...props
}: InputProps) => {
  const [inputType, setInputType] = useState(type);

  return (
    <Form.Group className={classNameContainer}>
      {label && (
        <Form.Label className={classNameLabel} htmlFor={id}>
          {label} {required && <span className="text-danger">*</span>}
        </Form.Label>
      )}
      <div className="position-relative">
        {type === "search" && (
          <div className={classNames(classNameSearch, "pe-none position-absolute top-0 bottom-0 d-flex align-items-center ps-3")}>
            {searchIcon ?? <FaSearch />}
          </div>
        )}
        <Form.Control
          as={as}
          id={id}
          name={name}
          type={inputType}
          className={classNames(className, { "ps-7": type === "search", "pe-7": showPasswordButton })}
          placeholder={placeholder}
          isInvalid={errors?.[name] ? true : false}
          disabled={disabled}
          size={size}
          rows={rows}
          {...(register && register(name))}
          {...props}
        />
        {type === "password" && showPasswordButton && (
          <button
            type="button"
            title={inputType === "password" ? "Göster" : "Gizle"}
            onClick={() => setInputType(inputType === "password" ? "text" : "password")}
            className={"border-0 bg-transparent position-absolute top-0 bottom-0 end-0 d-flex align-items-center px-3 text-reset"}
          >
            {inputType === "password" ? <FaEye /> : <FaEyeSlash />}
          </button>
        )}
      </div>

      {errors && (
        <ErrorMessage errors={errors} name={name} render={({ message }: any) => <div className="d-block invalid-feedback">{message}</div>} />
      )}
    </Form.Group>
  );
};

interface FloatingInputProps {
  as?: any;
  id?: string;
  name: string;
  label: any;
  type?: HTMLInputTypeAttribute;
  className?: string;
  classNameLabel?: string;
  classNameContainer?: string;
  placeholder?: string;
  size?: string;
  rows?: number;
  required?: boolean;
  disabled?: boolean;
  register?: any;
  errors?: any;
}

const FloatingControl = ({
  as,
  id,
  name,
  label,
  type = "text",
  className,
  classNameLabel,
  classNameContainer,
  placeholder = " ",
  size,
  rows,
  disabled,
  required,
  register,
  errors,
  ...props
}: FloatingInputProps) => {
  return (
    <>
      <FloatingLabel className={classNameContainer} label={label} controlId={id || name}>
        <Form.Control
          as={as}
          id={id}
          name={name}
          type={type}
          className={classNames(className)}
          placeholder={placeholder}
          isInvalid={errors?.[name] ? true : false}
          disabled={disabled}
          size={size}
          rows={rows}
          {...(register && register(name))}
          {...props}
        />
        {/* {label && (
          <Form.Label className={classNameLabel} htmlFor={id}>
            {label}
          </Form.Label>
        )} */}
      </FloatingLabel>
      {errors && (
        <ErrorMessage errors={errors} name={name} render={({ message }: any) => <div className="d-block invalid-feedback">{message}</div>} />
      )}
    </>
  );
};

interface SelectProps {
  id?: string;
  name: string;
  label?: any;
  className?: string;
  classNameLabel?: string;
  classNameContainer?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  size?: string;
  register?: any;
  errors?: any;
  children: React.ReactNode;
}

const Select = ({
  id,
  name,
  label,
  className,
  classNameLabel,
  classNameContainer,
  placeholder,
  disabled,
  required,
  size,
  register,
  errors,
  children,
  ...props
}: SelectProps) => {
  return (
    <Form.Group className={classNameContainer}>
      {label && (
        <Form.Label className={classNameLabel}>
          {label} {required && <span className="text-danger">*</span>}
        </Form.Label>
      )}
      <Form.Select
        id={id}
        name={name}
        className={className}
        isInvalid={errors?.[name] ? true : false}
        disabled={disabled}
        size={size}
        {...(register && register(name))}
        {...props}
      >
        {placeholder && (
          <option value="" hidden>
            {placeholder}
          </option>
        )}
        {children}
      </Form.Select>

      {errors && (
        <ErrorMessage errors={errors} name={name} render={({ message }: any) => <div className="d-block invalid-feedback">{message}</div>} />
      )}
    </Form.Group>
  );
};

interface CheckProps {
  id?: string;
  name: string;
  label?: any;
  className?: string;
  classNameLabel?: string;
  classNameContainer?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  type?: "checkbox" | "radio";
  size?: string;
  title?: string;
  register?: any;
  errors?: any;
  [x: string]: any;
}

const Check = ({
  id,
  name,
  label,
  className,
  classNameLabel,
  classNameContainer,
  placeholder,
  disabled,
  required,
  type,
  size,
  title,
  register,
  errors,
  ...props
}: CheckProps) => {
  return (
    <Form.Group className={classNameContainer}>
      {label && (
        <Form.Label className={classNameLabel}>
          {label} {required && <span className="text-danger">*</span>}
        </Form.Label>
      )}
      <Form.Check
        id={id}
        name={name}
        type={type}
        className={className}
        placeholder={placeholder}
        isInvalid={errors?.[name] ? true : false}
        disabled={disabled}
        size={size}
        label={title}
        {...(register && register(name))}
        {...props}
      />

      {errors && (
        <ErrorMessage errors={errors} name={name} render={({ message }: any) => <div className="d-block invalid-feedback">{message}</div>} />
      )}
    </Form.Group>
  );
};

interface RangeProps {
  id?: string;
  name: string;
  label?: any;
  className?: string;
  classNameLabel?: string;
  classNameContainer?: string;
  disabled?: boolean;
  required?: boolean;
  register?: any;
  errors?: any;
}

const Range = ({
  // min, max, step,
  id,
  name,
  label,
  className,
  classNameLabel,
  classNameContainer,
  disabled,
  required,
  register,
  errors,
  ...props
}: RangeProps) => {
  return (
    <Form.Group className={classNameContainer}>
      {label && (
        <Form.Label className={classNameLabel}>
          {label} {required && <span className="text-danger">*</span>}
        </Form.Label>
      )}
      <Form.Range id={id} name={name} className={className} disabled={disabled} {...(register && register(name))} {...props} />

      {errors && (
        <ErrorMessage errors={errors} name={name} render={({ message }: any) => <div className="d-block invalid-feedback">{message}</div>} />
      )}
    </Form.Group>
  );
};

const styles = {
  input: (base: any) => ({
    ...base,
    color: "var(--bs-body-color)",
    padding: "0.75px 0",
    margin: "0",
  }),
  control: (base: any, { isFocused }: any) => ({
    ...base,
    color: "var(--bs-body-color)",
    backgroundColor: "var(--bs-body-bg)",
    // minHeight: 45.38,
    fontSize: "14px",
    border: isFocused ? "var(--bs-border-width) solid var(--bs-primary) !important" : "var(--bs-border-width) solid var(--bs-border-color)",
    "&:hover": {
      borderColor: "var(--bs-border-color)",
    },
    borderRadius: "var(--bs-border-radius)",
    boxShadow: "none",
  }),
  valueContainer: (base: any) => ({
    ...base,
    padding: "0.5rem 1rem",
  }),
  menu: (base: any) => ({
    ...base,
    zIndex: 99,
    fontSize: "14px",
    color: "var(--bs-body-color)",
    backgroundColor: "var(--bs-body-bg)",
    border: "var(--bs-border-width) solid var(--bs-border-color)",
  }),
  option: (base: any, { isDisabled, isFocused, isSelected }: any) => {
    return {
      ...base,
      backgroundColor: isDisabled ? "" : isSelected ? "var(--bs-primary)" : isFocused ? "var(--bs-primary)" : undefined,
      color: isDisabled ? "#ccc" : isSelected ? "#fff" : isFocused ? "#fff" : undefined,
      cursor: isDisabled ? "not-allowed" : "default",
      ":active": {
        ...base[":active"],
        backgroundColor: !isDisabled ? (isSelected ? undefined : "var(--bs-primary)") : undefined,
        color: "#fff",
      },
    };
  },
  singleValue: (base: any) => ({
    ...base,
    color: "var(--bs-body-color)",
  }),
  multiValue: (base: any) => {
    return {
      ...base,
      backgroundColor: "transparent",
    };
  },
  multiValueLabel: (base: any) => ({
    ...base,
    color: "white",
    backgroundColor: "var(--bs-primary)",
  }),
  multiValueRemove: (base: any) => ({
    ...base,
    color: "white",
    backgroundColor: "var(--bs-primary)",
    ":hover": {
      backgroundColor: "var(--bs-primary)",
    },
  }),
  // indicatorSeparator: (base) => ({
  //   ...base,
  //   backgroundColor: "var(--bs-border-color)",
  // }),
  // clearIndicator: (base) => ({
  //   ...base,
  //   color: "var(--bs-border-color)",
  // }),
  // dropdownIndicator: (base) => ({
  //   ...base,
  //   color: "var(--bs-border-color)",
  // })
};

interface RSProps extends ReactSelectProps {
  id?: string;
  name: string;
  label?: any;
  className?: string;
  classNameLabel?: string;
  classNameContainer?: string;
  placeholder?: string;
  required?: boolean;
  options?: any;
  onChangeValue?: Function;
  control?: any;
  register?: any;
  errors?: any;
  baseStyles?: any;
}

const ReactSelect = ({
  id,
  name,
  label,
  className,
  classNameLabel,
  classNameContainer,
  placeholder = "Seçiniz...",
  required,
  control,
  register,
  errors,
  options,
  onChangeValue,
  isMulti = false,
  isClearable = true,
  isLoading = false,
  baseStyles = styles,
  ...props
}: RSProps) => {
  return (
    <Form.Group className={classNameContainer}>
      {label && (
        <Form.Label className={classNameLabel}>
          {label} {required && <span className="text-danger">*</span>}
        </Form.Label>
      )}

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <BaseReactSelect
            inputId={id}
            className={classNames(className, "react-select react-select-container", {
              "is-invalid": errors?.[name],
            })}
            classNamePrefix="react-select"
            placeholder={placeholder}
            noOptionsMessage={() => "Bulunamadı"}
            options={options}
            isMulti={isMulti}
            isClearable={isClearable}
            // filterOption={(option, query) => String(option.data.label).toLocaleLowerCase("tr").includes(query.toLocaleLowerCase("tr"))}
            value={value}
            onChange={(e) => {
              onChange(e);
              if (onChangeValue) {
                onChangeValue(e);
              }
            }}
            styles={baseStyles}
            {...props}
          />
        )}
      />

      {errors && (
        <ErrorMessage errors={errors} name={name} render={({ message }: any) => <div className="d-block invalid-feedback">{message}</div>} />
      )}
    </Form.Group>
  );
};

interface RSAProps extends ReactSelectAsyncProps<any, any, any> {
  id?: string;
  name: string;
  label?: any;
  className?: string;
  classNameLabel?: string;
  classNameContainer?: string;
  placeholder?: string;
  required?: boolean;
  options?: any;
  onChangeValue?: Function;
  control?: any;
  register?: any;
  errors?: any;
}

const ReactSelectAsync = ({
  id,
  name,
  label,
  className,
  classNameLabel,
  classNameContainer,
  placeholder = "Seçiniz...",
  required,
  control,
  register,
  errors,
  options,
  onChangeValue,
  isMulti = false,
  isClearable = true,
  isLoading = false,
  ...props
}: RSAProps) => {
  return (
    <div className={classNameContainer}>
      {label && (
        <Form.Label className={classNameLabel}>
          {label} {required && <span className="text-danger">*</span>}
        </Form.Label>
      )}

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <BaseReactSelectAsync
            inputId={id}
            className={classNames(className, "react-select react-select-container", {
              "is-invalid": errors?.[name],
            })}
            classNamePrefix="react-select"
            placeholder={placeholder}
            noOptionsMessage={() => "Bulunamadı"}
            loadOptions={options}
            // options={options}
            isMulti={isMulti}
            isClearable={isClearable}
            // filterOption={(option, query) => String(option.data.label).toLocaleLowerCase("tr").includes(query.toLocaleLowerCase("tr"))}
            value={value}
            onChange={(e) => {
              onChange(e);
              if (onChangeValue) {
                onChangeValue(e);
              }
            }}
            // escapeClearsValue
            cacheOptions
            defaultOptions
            loadingMessage={() => "Yükleniyor..."}
            isLoading={isLoading}
            styles={styles}
            {...props}
          />
        )}
      />

      {errors && (
        <ErrorMessage
          errors={errors}
          name={errors?.[name]?.value ? name + ".value" : name}
          render={({ message }: any) => <div className="d-block invalid-feedback">{message}</div>}
        />
      )}
    </div>
  );
};

interface RSCProps extends ReactSelectCreatableProps<any, any, any> {
  id?: string;
  name: string;
  label?: any;
  className?: string;
  classNameLabel?: string;
  classNameContainer?: string;
  placeholder?: string;
  required?: boolean;
  options?: any;
  onChangeValue?: Function;
  control?: any;
  register?: any;
  errors?: any;
}

const ReactSelectCreatable = ({
  id,
  name,
  label,
  className,
  classNameLabel,
  classNameContainer,
  placeholder = "Seçiniz...",
  required,
  control,
  register,
  errors,
  options,
  onChangeValue,
  isMulti = false,
  isClearable = true,
  isLoading = false,
  ...props
}: RSCProps) => {
  return (
    <div className={classNameContainer}>
      {label && (
        <label className={classNameLabel}>
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <BaseReactSelectCreatable
            inputId={id}
            className={classNames(className, "react-select react-select-container", {
              "is-invalid": errors?.[name],
            })}
            classNamePrefix="react-select"
            placeholder={placeholder}
            noOptionsMessage={() => "Bulunamadı"}
            options={options}
            isMulti={isMulti}
            isClearable={isClearable}
            // filterOption={(option, query) => String(option.data.label).toLocaleLowerCase("tr").includes(query.toLocaleLowerCase("tr"))}
            value={value}
            onChange={(e) => {
              onChange(e);
              if (onChangeValue) {
                onChangeValue(e);
              }
            }}
            formatCreateLabel={(e: any) => e + " oluştur"}
            onCreateOption={props.onCreateOption}
            loadingMessage={() => "Yükleniyor..."}
            isLoading={isLoading}
            styles={styles}
            {...props}
          />
        )}
      />

      {errors && (
        <ErrorMessage
          errors={errors}
          name={name + ".value"}
          render={({ message }: any) => <div className="d-block invalid-feedback">{message}</div>}
        />
      )}
    </div>
  );
};

interface RSACProps extends ReactSelectAsyncCreatableProps<any, any, any> {
  id?: string;
  name: string;
  label?: any;
  className?: string;
  classNameLabel?: string;
  classNameContainer?: string;
  placeholder?: string;
  required?: boolean;
  options?: any;
  onChangeValue?: Function;
  control?: any;
  register?: any;
  errors?: any;
}

const ReactSelectAsyncCreatable = ({
  id,
  name,
  label,
  className,
  classNameLabel,
  classNameContainer,
  placeholder = "Seçiniz...",
  required,
  control,
  register,
  errors,
  options,
  onChangeValue,
  isMulti = false,
  isClearable = true,
  isLoading = false,
  ...props
}: RSACProps) => {
  return (
    <div className={classNameContainer}>
      {label && (
        <label className={classNameLabel}>
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <BaseReactSelectAsyncCreatable
            inputId={id}
            className={classNames(className, "react-select react-select-container", {
              "is-invalid": errors?.[name],
            })}
            classNamePrefix="react-select"
            placeholder={placeholder}
            noOptionsMessage={() => "Bulunamadı"}
            options={options}
            isMulti={isMulti}
            isClearable={isClearable}
            // filterOption={(option, query) => String(option.data.label).toLocaleLowerCase("tr").includes(query.toLocaleLowerCase("tr"))}
            value={value}
            onChange={(e) => {
              onChange(e);
              if (onChangeValue) {
                onChangeValue(e);
              }
            }}
            // escapeClearsValue
            cacheOptions
            defaultOptions
            loadingMessage={() => "Yükleniyor..."}
            isLoading={isLoading}
            formatCreateLabel={(e: any) => e + " oluştur"}
            onCreateOption={props.onCreateOption}
            styles={styles}
            {...props}
          />
        )}
      />

      {errors && (
        <ErrorMessage
          errors={errors}
          name={name + ".value"}
          render={({ message }: any) => <div className="d-block invalid-feedback">{message}</div>}
        />
      )}
    </div>
  );
};

// interface DatePickerProps {
//   id?: string;
//   name: string;
//   label?: any;
//   className?: string;
//   classNameLabel?: string;
//   classNameContainer?: string;
//   placeholder?: string;
//   disabled?: boolean;
//   required?: boolean;
//   control?: any;
//   register?: any;
//   errors?: any;
//   min?: any;
//   max?: any;
//   showTimeSelect?: any;
//   showMonthYearPicker?: any;
//   onChangeValue?: Function;
//   // [x: string]: any;
// }

// const ReactDatePicker = ({
//   id,
//   name,
//   label,
//   className,
//   classNameLabel,
//   classNameContainer,
//   placeholder = "Seçiniz...",
//   disabled = false,
//   required,
//   control,
//   register,
//   errors,
//   min,
//   max,
//   showTimeSelect,
//   showMonthYearPicker,
//   onChangeValue,
//   ...props
// }: DatePickerProps) => {
//   return (
//     <Form.Group className={classNameContainer}>
//       {label && (
//         <Form.Label className={classNameLabel} htmlFor={id}>
//           {label} {required && <span className="text-danger">*</span>}
//         </Form.Label>
//       )}

//       <Controller
//         control={control}
//         name={name}
//         render={({ field: { onChange, value } }) => (
//           <BaseReactDatePicker
//             disabled={disabled}
//             autoComplete="off"
//             placeholderText={placeholder}
//             wrapperClassName="d-block"
//             className={classNames("form-control", {
//               "is-invalid": errors?.[name],
//             })}
//             // timeFormat="HH:mm"
//             // timeIntervals={15}
//             // timeCaption="time"
//             dateFormat={showTimeSelect ? "dd.MM.yyyy HH:mm" : "dd.MM.yyyy"}
//             id={id}
//             name={name}
//             showYearDropdown
//             showMonthDropdown
//             popperPlacement="bottom"
//             // disabledKeyboardNavigation
//             // value={value}
//             selected={value ? new Date(value) : null}
//             onChange={(e: any) => {
//               onChange(e ? moment(e).format(showTimeSelect ? "YYYY-MM-DD HH:mm" : "YYYY-MM-DD") : null);
//               if (onChangeValue) onChangeValue(e ? moment(e).format(showTimeSelect ? "YYYY-MM-DD HH:mm" : "YYYY-MM-DD") : null);
//             }}
//             isClearable
//             locale={tr}
//             minDate={min ? new Date(min) : null}
//             maxDate={max ? new Date(max) : null}
//             showTimeSelect={showTimeSelect}
//             showMonthYearPicker={showMonthYearPicker}
//             {...props}
//           />
//         )}
//       />

//       {errors && (
//         <ErrorMessage errors={errors} name={name} render={({ message }: any) => <div className="d-block invalid-feedback">{message}</div>} />
//       )}
//     </Form.Group>
//   );
// };

interface DateTimeProps extends DatetimepickerProps {
  id?: string;
  name: string;
  label?: any;
  className?: string;
  classNameLabel?: string;
  classNameContainer?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  control?: any;
  register?: any;
  errors?: any;
  onChangeValue?: Function;
  dateFormat?: string;
  dateChangeFormat?: string;
  // [x: string]: any;
}

const DateTime = ({
  id,
  name,
  label,
  className,
  classNameLabel,
  classNameContainer,
  placeholder = "Seçiniz...",
  disabled = false,
  required,
  control,
  register,
  errors,
  onChangeValue,
  dateFormat = "DD.MM.YYYY",
  dateChangeFormat = "YYYY-MM-DD",
  ...props
}: DateTimeProps) => {
  return (
    <Form.Group className={classNameContainer}>
      {label && (
        <Form.Label className={classNameLabel} htmlFor={id}>
          {label} {required && <span className="text-danger">*</span>}
        </Form.Label>
      )}
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <BaseReactDatetime
            className={`${errors?.[name] ? "is-invalid" : ""}`}
            dateFormat={dateFormat}
            timeFormat={false}
            value={value ? moment(value).format(dateFormat) : ""}
            onChange={(e: any) => {
              onChange(typeof e == "object" ? moment(e).format(dateChangeFormat) : "");
              if (onChangeValue) onChangeValue(typeof e == "object" ? moment(e).format(dateChangeFormat) : "");
            }}
            inputProps={{ placeholder, className: `form-control ${errors?.[name] ? "is-invalid" : ""}` }}
            locale="tr-TR"
            closeOnSelect
            {...props}
          />
        )}
      />
      {errors && (
        <ErrorMessage errors={errors} name={name} render={({ message }: any) => <div className="d-block invalid-feedback">{message}</div>} />
      )}
    </Form.Group>
  );
};

interface PhoneInputProps {
  id?: string;
  name: string;
  label?: any;
  className?: string;
  classNameLabel?: string;
  classNameContainer?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  control?: any;
  register?: any;
  errors?: any;
  min?: any;
  max?: any;
  [x: string]: any;
}

const PhoneInput = ({
  id,
  name,
  label,
  className,
  classNameLabel,
  classNameContainer,
  placeholder = "Seçiniz...",
  disabled = false,
  required,
  control,
  register,
  errors,
  min,
  max,
  ...props
}: PhoneInputProps) => {
  return (
    <Form.Group className={classNameContainer}>
      {label && (
        <Form.Label className={classNameLabel} htmlFor={id}>
          {label} {required && <span className="text-danger">*</span>}
        </Form.Label>
      )}

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <BasePhoneInput
            labels={phoneInputTr}
            disabled={disabled}
            className={classNames({
              "is-invalid": errors?.[name],
            })}
            inputComponent={Form.Control}
            id={id}
            name={name}
            value={value}
            placeholder={placeholder}
            defaultCountry="TR"
            onChange={(e: any) => {
              onChange(e);
              if (props.onChangeValue) props.onChangeValue(e);
            }}
          />
        )}
      />

      {errors && (
        <ErrorMessage errors={errors} name={name} render={({ message }: any) => <div className="d-block invalid-feedback">{message}</div>} />
      )}
    </Form.Group>
  );
};

interface DropZoneProps {
  id?: string;
  name: string;
  label?: any;
  className?: string;
  classNameLabel?: string;
  classNameContainer?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  control?: any;
  errors?: any;
  multiple?: boolean;
  acceptedFiles?: any;
  [x: string]: any;
}

const ReactDropZone = ({
  id,
  name,
  label,
  className,
  classNameLabel,
  classNameContainer,
  required,
  control,
  errors,
  acceptedFiles = { "image/png": [".png"], "image/jpeg": [".jpg", ".jpeg"], "image/webp": [".webp"] },
  multiple = false,
}: DropZoneProps) => {
  return (
    <Form.Group className={classNameContainer}>
      {label && (
        <Form.Label className={classNameLabel} htmlFor={id}>
          {label} {required && <span className="text-danger">*</span>}
        </Form.Label>
      )}

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <BaseReactDropzone
            multiple={multiple}
            accept={acceptedFiles}
            onDrop={(files: any) => {
              onChange(files.map((file: any) => Object.assign(file, { preview: URL.createObjectURL(file) })));
            }}
          >
            {({ getRootProps, getInputProps, isFocused, isDragAccept, isDragReject }) => (
              <div
                {...getRootProps({
                  className: classNames("dropzone", className, {
                    isFocused: isFocused,
                    isAccept: isDragAccept,
                    isReject: isDragReject,
                  }),
                })}
              >
                <input {...getInputProps({ id })} />
                {value?.length ? (
                  <>
                    <aside className="dropzone-showcase">
                      {value?.map((file: any, key: number) => (
                        <div className="dropzone-showcase-item" key={key}>
                          <img alt={file.name} src={file.preview} onLoad={() => URL.revokeObjectURL(file.preview)} />
                        </div>
                      ))}
                    </aside>
                    <div>{value.length} dosya eklendi.</div>
                  </>
                ) : (
                  <div>Dosyaları Seçin veya Sürükleyin</div>
                )}
              </div>
            )}
          </BaseReactDropzone>
        )}
      />

      {errors && (
        <ErrorMessage errors={errors} name={name} render={({ message }: any) => <div className="d-block invalid-feedback">{message}</div>} />
      )}
    </Form.Group>
  );
};

interface CounterProps {
  id?: string;
  name: string;
  label?: any;
  className?: string;
  classNameLabel?: string;
  classNameContainer?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  control?: any;
  errors?: any;
  initialValue?: number;
  min?: number;
  max?: number;
  [x: string]: any;
}

const Counter = ({
  id,
  name,
  label,
  className,
  classNameLabel,
  classNameContainer,
  required,
  control,
  errors,
  initialValue = 1,
  min = 0,
  max = 99,
}: CounterProps) => {
  return (
    <Form.Group className={classNameContainer}>
      {label && (
        <Form.Label className={classNameLabel} htmlFor={id}>
          {label} {required && <span className="text-danger">*</span>}
        </Form.Label>
      )}

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value = initialValue } }) => (
          <div className="d-flex">
            <Button onClick={() => value > min && onChange(+value - 1)} className="d-flex align-items-center justify-content-center rounded-end-0">
              <FaMinus size="12" />
            </Button>
            <div className={classNames("text-center py-2 px-3", className)} style={{ minWidth: "50px" }}>
              {value}
            </div>
            <Button onClick={() => value < max && onChange(+value + 1)} className="d-flex align-items-center justify-content-center rounded-start-0">
              <FaPlus size="12" />
            </Button>
          </div>
        )}
      />

      {errors && (
        <ErrorMessage errors={errors} name={name} render={({ message }: any) => <div className="d-block invalid-feedback">{message}</div>} />
      )}
    </Form.Group>
  );
};

Input.Control = Control;
Input.FloatingControl = FloatingControl;
Input.Select = Select;
Input.Check = Check;
Input.Range = Range;
Input.ReactSelect = ReactSelect;
Input.ReactSelectAsync = ReactSelectAsync;
Input.ReactSelectCreatable = ReactSelectCreatable;
Input.ReactSelectAsyncCreatable = ReactSelectAsyncCreatable;
// <Input.ReactDatePicker = ReactDatePicker;
Input.DateTime = DateTime;
Input.PhoneInput = PhoneInput;
Input.ReactDropZone = ReactDropZone;
Input.Counter = Counter;

export default Input;