import { InputHTMLAttributes } from "react";
import { Form } from "react-bootstrap";
import { Controller, Control as RHFControl } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import BaseReactSelect from "react-select";
import BaseReactSelectAsync from "react-select/async";
import BaseReactSelectCreatable from "react-select/creatable";
import BaseReactSelectAsyncCreatable from "react-select/async-creatable";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
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

const Input = ({ children }: InputProps) => {
  return children;
};

const Control = ({
  as,
  classNameContainer,
  label,
  classNameLabel,
  id,
  name,
  type,
  placeholder,
  endIcon,
  register,
  errors,
  rows,
  className,
  disabled,
  size,
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

const Select = ({
  classNameContainer,
  label,
  classNameLabel,
  id,
  name,
  placeholder,
  endIcon,
  register,
  errors,
  className,
  disabled,
  size,
  children,
  ...props
}: InputProps) => {
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

const Check = ({
  classNameContainer,
  label,
  classNameLabel,
  id,
  name,
  type,
  placeholder,
  endIcon,
  register,
  errors,
  className,
  disabled,
  size,
  title,
  children,
  ...props
}: InputProps) => {
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

const Range = ({
  // min, max, step,
  classNameContainer,
  label,
  classNameLabel,
  id,
  name,
  endIcon,
  register,
  errors,
  className,
  disabled,
  children,
  ...props
}: InputProps) => {
  return (
    <Form.Group className={classNameContainer}>
      {label && <Form.Label className={classNameLabel}>{label}</Form.Label>}
      <Form.Range id={id} name={name} className={className} disabled={disabled} {...(register && register(name))} {...props}>
        {children}
      </Form.Range>

      {errors && (
        <ErrorMessage errors={errors} name={name} render={({ message }: any) => <div className="d-block invalid-feedback">{message}</div>} />
      )}
    </Form.Group>
  );
};

const ReactSelect = ({
  classNameContainer,
  label,
  classNameLabel,
  id,
  name,
  type,
  placeholder = "Seçiniz...",
  endIcon,
  register,
  errors,
  rows,
  className,
  disabled,
  size,
  children,
  options,
  isCreatable = false,
  isAsync = false,
  isLoading = false,
  isMulti = false,
  isClearable = true,
  ...props
}: InputProps) => {
  return (
    <Form.Group className={classNameContainer}>
      {label && <Form.Label className={classNameLabel}>{label}</Form.Label>}

      <Controller
        control={props.control}
        name={name}
        render={({ field: { onChange, value, ref } }) => (
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
              if (props.onChange) {
                props.onChange(e);
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

const ReactSelectAsync = ({
  classNameContainer,
  label,
  classNameLabel,
  id,
  name,
  type,
  placeholder = "Seçiniz...",
  endIcon,
  register,
  errors,
  rows,
  className,
  disabled,
  size,
  children,
  options,
  isCreatable = false,
  isAsync = false,
  isLoading = false,
  isMulti = false,
  isClearable = true,
  ...props
}: InputProps) => {
  return (
    <Form.Group className={classNameContainer}>
      {label && <Form.Label className={classNameLabel}>{label}</Form.Label>}

      <Controller
        control={props.control}
        name={name}
        render={({ field: { onChange, value, ref } }) => (
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
              if (props.onChange) {
                props.onChange(e);
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

      {errors && (
        <ErrorMessage errors={errors} name={name} render={({ message }: any) => <div className="d-block invalid-feedback">{message}</div>} />
      )}
    </Form.Group>
  );
};

const ReactSelectCreatable = ({
  classNameContainer,
  label,
  classNameLabel,
  id,
  name,
  type,
  placeholder = "Seçiniz...",
  endIcon,
  register,
  errors,
  rows,
  className,
  disabled,
  size,
  children,
  options,
  isCreatable = false,
  isAsync = false,
  isLoading = false,
  isMulti = false,
  isClearable = true,
  ...props
}: InputProps) => {
  return (
    <Form.Group className={classNameContainer}>
      {label && <Form.Label className={classNameLabel}>{label}</Form.Label>}

      <Controller
        control={props.control}
        name={name}
        render={({ field: { onChange, value, ref } }) => (
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
              if (props.onChange) {
                props.onChange(e);
              }
            }}
            formatCreateLabel={(e: any) => e + " oluştur"}
            onCreateOption={props.onCreateOption}
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

const ReactSelectAsyncCreatable = ({
  classNameContainer,
  label,
  classNameLabel,
  id,
  name,
  type,
  placeholder = "Seçiniz...",
  endIcon,
  register,
  errors,
  rows,
  className,
  disabled,
  size,
  children,
  options,
  isCreatable = false,
  isAsync = false,
  isLoading = false,
  isMulti = false,
  isClearable = true,
  ...props
}: InputProps) => {
  return (
    <Form.Group className={classNameContainer}>
      {label && <Form.Label className={classNameLabel}>{label}</Form.Label>}

      <Controller
        control={props.control}
        name={name}
        render={({ field: { onChange, value, ref } }) => (
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
              if (props.onChange) {
                props.onChange(e);
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

export default Input;
