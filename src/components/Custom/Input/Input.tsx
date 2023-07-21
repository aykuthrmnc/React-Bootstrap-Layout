import { HTMLInputTypeAttribute, InputHTMLAttributes, useState } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import { Controller, Control as RHFControl } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import BaseReactSelect, { Props as ReactSelectProps } from "react-select";
import BaseReactSelectAsync, { AsyncProps as ReactSelectAsyncProps } from "react-select/async";
import BaseReactSelectCreatable, { CreatableProps as ReactSelectCreatableProps } from "react-select/creatable";
import BaseReactSelectAsyncCreatable, { AsyncCreatableProps as ReactSelectAsyncCreatableProps } from "react-select/async-creatable";
import BaseReactDatePicker, { registerLocale } from "react-datepicker";
import tr from "date-fns/locale/tr";
import "moment/locale/tr";
import moment from "moment";
import classNames from "classnames";
import { FaEye, FaEyeSlash, FaSearch } from "react-icons/fa";
registerLocale("tr", tr);

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
          {label}
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
          className={classNames(className, { "ps-5": type === "search", "pe-5": showPasswordButton })}
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
      {label && <Form.Label className={classNameLabel}>{label}</Form.Label>}
      <Form.Select
        id={id}
        name={name}
        className={className}
        placeholder={placeholder}
        isInvalid={errors?.[name] ? true : false}
        disabled={disabled}
        size={size}
        {...(register && register(name))}
        {...props}
      >
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
      {label && <Form.Label className={classNameLabel}>{label}</Form.Label>}
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
      {label && <Form.Label className={classNameLabel}>{label}</Form.Label>}
      <Form.Range id={id} name={name} className={className} disabled={disabled} {...(register && register(name))} {...props} />

      {errors && (
        <ErrorMessage errors={errors} name={name} render={({ message }: any) => <div className="d-block invalid-feedback">{message}</div>} />
      )}
    </Form.Group>
  );
};

interface RSProps extends ReactSelectProps {
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

const ReactSelect = ({
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
}: RSProps) => {
  return (
    <Form.Group className={classNameContainer}>
      {label && <Form.Label className={classNameLabel}>{label}</Form.Label>}

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <BaseReactSelect
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
        <label className={classNameLabel}>
          {label} {required && <span className="small text-danger">*</span>}
        </label>
      )}

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <BaseReactSelectAsync
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
            {...props}
          />
        )}
      />

      {errors && <ErrorMessage errors={errors} name={name} render={({ message }: any) => <div className="small text-danger">{message}</div>} />}
    </div>
  );
};

interface RSCProps extends ReactSelectCreatableProps<any, any, any> {
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
          {label} {required && <span className="small text-danger">*</span>}
        </label>
      )}

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <BaseReactSelectCreatable
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
            {...props}
          />
        )}
      />

      {errors && <ErrorMessage errors={errors} name={name} render={({ message }: any) => <div className="small text-danger">{message}</div>} />}
    </div>
  );
};

interface RSACProps extends ReactSelectAsyncCreatableProps<any, any, any> {
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
            {...props}
          />
        )}
      />

      {errors && <ErrorMessage errors={errors} name={name} render={({ message }: any) => <div className="small text-danger">{message}</div>} />}
    </div>
  );
};

interface DatePickerProps {
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

const ReactDatePicker = ({
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
}: DatePickerProps) => {
  return (
    <Form.Group className={classNameContainer}>
      {label && <Form.Label className={classNameLabel}>{label}</Form.Label>}

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <BaseReactDatePicker
            disabled={disabled}
            autoComplete="off"
            placeholderText={placeholder}
            wrapperClassName="d-block"
            className={classNames("form-control", {
              "is-invalid": errors?.[name],
            })}
            // timeFormat="HH:mm"
            // timeIntervals={15}
            // timeCaption="time"
            dateFormat="dd.MM.yyyy"
            name={name}
            showYearDropdown
            showMonthDropdown
            popperPlacement="bottom"
            // disabledKeyboardNavigation
            // value={value}
            selected={value ? new Date(value) : null}
            onChange={(e: any) => {
              onChange(e ? moment(e).format("YYYY-MM-DD") : null);
              if (props.onChangeValue) props.onChangeValue(e ? moment(e).format("YYYY-MM-DD") : null);
            }}
            isClearable
            locale={tr}
            minDate={min ? new Date(min) : null}
            maxDate={max ? new Date(max) : null}
          />
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
Input.ReactDatePicker = ReactDatePicker;

export default Input;
