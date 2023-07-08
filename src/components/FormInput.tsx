import { InputHTMLAttributes } from "react";
import { Form } from "react-bootstrap";
import { Control, Controller } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
// import MaskedInput from 'react-text-mask';
import ReactDatePicker, { registerLocale } from "react-datepicker";
import { tr } from "date-fns/locale"; // the locale you want
import moment from "moment";
registerLocale("tr", tr);

type FormInputProps = InputHTMLAttributes<HTMLInputElement> & {
  endIcon?: boolean;
  label?: any;
  id?: string;
  type?: string;
  name: string;
  as?: string;
  placeholder?: string;
  register?: any;
  errors?: any;
  control?: Control<any>;
  className?: string;
  labelClassName?: string;
  containerClass?: string;
  textClassName?: string;
  refCallback?: any;
  action?: React.ReactNode;
  rows?: number;
  labelRequired?: boolean;
  onChangeValue?: any;
  repeaterError?: any;
  disabled?: boolean | undefined;
};

const TextInput = ({
  containerClass,
  label,
  labelClassName,
  id,
  type,
  name,
  placeholder,
  endIcon,
  register,
  errors,
  as,
  rows,
  className,
  repeaterError,
  disabled,
  ...props
}: FormInputProps) => {
  return (
    <>
      <Form.Group className={containerClass}>
        {label && <Form.Label className={labelClassName}>{label}</Form.Label>}
        <Form.Control
          type={type}
          placeholder={placeholder}
          name={name}
          as={as}
          id={id}
          className={className}
          isInvalid={errors?.[name] || repeaterError ? true : false}
          rows={rows}
          disabled={disabled}
          {...(register && register(name))}
          {...props}
        />

        {errors && (
          <ErrorMessage errors={errors} name={name} render={({ message }: any) => <div className="d-block invalid-feedback">{message}</div>} />
        )}
        {/* {errors && (errors[name] || repeaterError) ? (
          <Form.Control.Feedback type="invalid" className="d-block">
            {!repeaterError ? errors?.[name]?.["message"] : repeaterError?.["message"]}
          </Form.Control.Feedback>
        ) : null} */}
      </Form.Group>
    </>
  );
};

const CheckInput = ({ type, label, name, placeholder, register, errors, as, rows, className, refCallback, ...props }: FormInputProps) => {
  return (
    <>
      <Form.Check
        type={type}
        label={label}
        name={name}
        id={name}
        ref={(r: HTMLInputElement) => {
          if (refCallback) refCallback(r);
        }}
        className={className}
        isInvalid={errors && errors[name] ? true : false}
        {...(register ? register(name) : {})}
        {...props}
      />
      {errors && (
        <ErrorMessage errors={errors} name={name} render={({ message }: any) => <div className="d-block invalid-feedback">{message}</div>} />
      )}
    </>
  );
};

const SelectInput = ({ type, label, name, placeholder, register, errors, as, className, children, refCallback, ...props }: FormInputProps) => {
  return (
    <>
      <Form.Select
        type={type}
        label={label}
        name={name}
        id={name}
        ref={(r: HTMLInputElement) => {
          if (refCallback) refCallback(r);
        }}
        children={children}
        className={className}
        isInvalid={errors && errors[name] ? true : false}
        {...(register ? register(name) : {})}
        {...props}
      />
      {errors && (
        <ErrorMessage errors={errors} name={name} render={({ message }: any) => <div className="d-block invalid-feedback">{message}</div>} />
      )}
    </>
  );
};

const FormInput = ({
  label,
  id,
  type = "input",
  name,
  placeholder,
  endIcon,
  register,
  errors,
  control,
  className,
  labelClassName,
  containerClass,
  refCallback,
  children,
  action,
  rows,
  labelRequired,
  min,
  max,
  disabled,
  onChangeValue,
  ...props
}: FormInputProps) => {
  const hasEndIcon = endIcon !== undefined ? endIcon : true;

  return (
    <>
      {type === "hidden" ? (
        <input type={type} name={name} {...(register && register(name))} {...props} />
      ) : type === "select" ? (
        <Form.Group className={containerClass}>
          {label && <Form.Label className={labelClassName}>{label}</Form.Label>}

          <SelectInput
            type={type}
            name={name}
            placeholder={placeholder}
            errors={errors}
            register={register}
            as={type}
            className={className}
            children={children}
            {...props}
          />
        </Form.Group>
      ) : type === "checkbox" || type === "radio" ? (
        <Form.Group className={containerClass}>
          <CheckInput
            type={type}
            label={label}
            name={name}
            placeholder={placeholder}
            errors={errors}
            register={register}
            as={type}
            className={className}
            rows={rows}
            {...props}
          />
        </Form.Group>
      ) : type === "date" ? (
        <>
          {control ? (
            <Form.Group className={containerClass}>
              {label && <Form.Label className={labelClassName}>{label}</Form.Label>}
              <div>
                <Controller
                  control={control}
                  name={name}
                  render={({ field: { onChange, value, ref } }) => (
                    <ReactDatePicker
                      disabled={disabled || false}
                      autoComplete="off"
                      placeholderText={placeholder}
                      className={`form-control ${errors && errors[name] ? "is-invalid" : ""}`}
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
                        if (onChangeValue) onChangeValue(e ? moment(e).format("YYYY-MM-DD") : null);
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
                  <ErrorMessage
                    errors={errors}
                    name={name}
                    render={({ message }: any) => <div className="d-block invalid-feedback">{message}</div>}
                  />
                )}
              </div>
            </Form.Group>
          ) : (
            <Form.Group className={containerClass}>
              {label && <Form.Label className={labelClassName}>{label}</Form.Label>}
              <div>
                {/* @ts-ignore */}
                <ReactDatePicker
                  disabled={disabled || false}
                  autoComplete="off"
                  placeholderText={placeholder}
                  className={`form-control ${errors && errors[name] ? "is-invalid" : ""}`}
                  dateFormat="dd.MM.yyyy"
                  name={name}
                  // value={value}
                  disabledKeyboardNavigation
                  isClearable
                  locale={tr}
                  minDate={min ? new Date(min) : null}
                  maxDate={max ? new Date(max) : null}
                  {...props}
                  // dateFormat="DD-MM-yyyy"
                />

                {errors && (
                  <ErrorMessage
                    errors={errors}
                    name={name}
                    render={({ message }: any) => <div className="d-block invalid-feedback">{message}</div>}
                  />
                )}
              </div>
            </Form.Group>
          )}
        </>
      ) : type === "datetime-local" ? (
        <Form.Group className={containerClass}>
          {label && <Form.Label className={labelClassName}>{label}</Form.Label>}
          <Controller
            control={control}
            name={name}
            render={({ field: { onChange, value, ref } }) => (
              <ReactDatePicker
                disabled={disabled || false}
                autoComplete="off"
                placeholderText={placeholder}
                className={`form-control ${errors && errors[name] ? "is-invalid" : ""}`}
                dateFormat="dd.MM.yyyy HH:mm"
                // value={value}
                timeFormat="HH:mm"
                // timeIntervals={15}
                timeCaption="time"
                showTimeSelect
                showYearDropdown
                showMonthDropdown
                disabledKeyboardNavigation
                // monthsShown={31}
                selected={value ? new Date(value) : null}
                onChange={(e: any) => {
                  onChange(e ? moment(e).format("YYYY-MM-DD HH:mm") : null);
                  if (onChangeValue) onChangeValue(e);
                }}
                locale={tr}
                minDate={min ? new Date(min) : null}
                maxDate={max ? new Date(max) : null}
              />
            )}
          />
          {errors && (
            <ErrorMessage errors={errors} name={name} render={({ message }: any) => <div className="d-block invalid-feedback">{message}</div>} />
          )}
          {errors && errors[name] ? <Form.Control.Feedback type="invalid">{errors?.[name]?.["message"]}</Form.Control.Feedback> : null}
        </Form.Group>
      ) : (
        <TextInput
          id={id}
          type={type}
          name={name}
          placeholder={placeholder}
          endIcon={hasEndIcon}
          errors={errors}
          register={register}
          className={className}
          rows={rows}
          disabled={disabled}
          containerClass={containerClass}
          label={label}
          labelClassName={labelClassName}
          {...props}
        />
      )}
    </>
  );
};

export default FormInput;
