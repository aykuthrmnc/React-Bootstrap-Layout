import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import FormInput from "~/components/FormInput";
import Input from "~/components/Input";
import { LoginSchema } from "~/validation";

const Home = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (e: any) => {
    console.log(e);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input.Control label="E-posta" type="text" name="email" classNameContainer="mb-3" register={register} errors={errors} />
      <Input.Control label="Şifre" type="password" name="password" classNameContainer="mb-3" register={register} errors={errors} />
      <Input.Select label="Cinsiyet" name="select" classNameContainer="mb-3" register={register} errors={errors}>
        <option value="1">Erkek</option>
        <option value="2">Kadın</option>
      </Input.Select>
      <Input.Check title="dsadsa" type="checkbox" name="check" classNameContainer="mb-3" register={register} errors={errors} />
      <Input.Range label="Yaş" name="range" classNameContainer="mb-3" register={register} errors={errors} />
      <Input.ReactSelect
        label="Cinsiyet"
        name="reactselect"
        options={[
          { label: "Erkek", value: "1" },
          { label: "Kadın", value: "2" },
        ]}
        classNameContainer="mb-3"
        control={control}
        register={register}
        errors={errors}
      />
      <Input.ReactSelectCreatable
        label="Cinsiyet"
        name="reactselectcreatable"
        options={[
          { label: "Erkek", value: "1" },
          { label: "Kadın", value: "2" },
        ]}
        classNameContainer="mb-3"
        control={control}
        register={register}
        errors={errors}
        onCreateOption={(e: any) => console.log(e)}
      />
      <Input.ReactDatePicker label="Tarih" type="date" name="date" classNameContainer="mb-3" control={control} register={register} errors={errors} />

      {/* <FormInput label="Tarih" type="date" name="date" containerClass={"mb-3"} register={register} errors={errors} control={control} /> */}
      <Button type="submit">Kaydet</Button>
    </form>
  );
};
export default Home;
