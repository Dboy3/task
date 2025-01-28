import React from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";

interface Option {
  value: string;
  label: string;
}

interface FormData {
  role: string; // Role is required and must be a string
}

const schema = yup.object({
  role: yup.string().required("The role is required"),
});

const CustomSelect: React.FC<{
  value: string;
  onchange(value: string): void;
  options: Option[];
}> = ({ value, onchange, options }) => {
  return (
    <select value={value} onChange={(e) => onchange(e.target.value)}>
      <option value="">Select a role</option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
};

const RoleForm = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
    defaultValues: {
      role: "",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="role">Role: </label>
        <Controller
          name="role"
          control={control}
          render={({ field }) => (
            <CustomSelect
              value={field.value}
              onchange={field.onChange}
              options={[
                { value: "admin", label: "Admin" },
                { value: "editor", label: "Editor" },
                { value: "viewer", label: "Viewer" },
              ]}
            />
          )}
        />
        {errors.role && <p style={{ color: "red" }}>{errors.role.message}</p>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default RoleForm;
