import { HTMLInputTypeAttribute, InputHTMLAttributes } from "react";
import { Form } from "react-bootstrap";
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

interface InputProps {
  as?: any;
  id?: string;
  name: string;
  label?: any;
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

const Input = ({ children }: Props) => {
  return children;
};

const Control = ({
  as,
  id,
  name,
  label,
  type = "text",
  className,
  classNameLabel,
  classNameContainer,
  placeholder,
  size,
  rows,
  disabled,
  required,
  register,
  errors,
  ...props
}: InputProps) => {
  return (
    <Form.Group className={classNameContainer}>
      {label && <Form.Label className={classNameLabel}>{label}</Form.Label>}
      <Form.Control
        as={as}
        id={id}
        name={name}
        type={type}
        className={className}
        placeholder={placeholder}
        isInvalid={errors?.[name] ? true : false}
        disabled={disabled}
        size={size}
        rows={rows}
        {...(register && register(name))}
        {...props}
      />

      {errors && (
        <ErrorMessage errors={errors} name={name} render={({ message }: any) => <div className="d-block invalid-feedback">{message}</div>} />
      )}
    </Form.Group>
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
  children: React.ReactNode;
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
  children,
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
      >
        {children}
      </Form.Check>

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
            className={`react-select react-select-container ${errors?.[name] ? "is-invalid" : ""} ${className}`}
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
          {label} {required && <span className="text-sm text-red-600">*</span>}
        </label>
      )}

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <BaseReactSelectAsync
            className={`react-select react-select-container ${errors?.[name] ? "is-invalid" : ""} ${className}`}
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

      {errors && <ErrorMessage errors={errors} name={name} render={({ message }: any) => <div className="text-sm text-red-600">{message}</div>} />}
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
          {label} {required && <span className="text-sm text-red-600">*</span>}
        </label>
      )}

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <BaseReactSelectCreatable
            className={`react-select react-select-container ${errors?.[name] ? "is-invalid" : ""} ${className}`}
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

      {errors && <ErrorMessage errors={errors} name={name} render={({ message }: any) => <div className="text-sm text-red-600">{message}</div>} />}
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
          {label} {required && <span className="text-sm text-red-600">*</span>}
        </label>
      )}

      <Controller
        control={control}
        name={name}
        render={({ field: { onChange, value } }) => (
          <BaseReactSelectAsyncCreatable
            className={`react-select react-select-container ${errors?.[name] ? "is-invalid" : ""} ${className}`}
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

      {errors && <ErrorMessage errors={errors} name={name} render={({ message }: any) => <div className="text-sm text-red-600">{message}</div>} />}
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
            className={`form-control ${errors?.name ? "is-invalid" : ""}`}
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
            // dateFormat="DD-MM-yyyy"
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
Input.Select = Select;
Input.Check = Check;
Input.Range = Range;
Input.ReactSelect = ReactSelect;
Input.ReactSelectAsync = ReactSelectAsync;
Input.ReactSelectCreatable = ReactSelectCreatable;
Input.ReactSelectAsyncCreatable = ReactSelectAsyncCreatable;
Input.ReactDatePicker = ReactDatePicker;

export default Input;
