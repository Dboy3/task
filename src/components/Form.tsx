import React from "react";
import formSchema from "../formSchema/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

interface User {
  name: string;
  age: number;
  date?: string;
}

const Form: React.FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<User>({
    resolver: yupResolver(formSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<User> = (data) => {
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-2 flex flex-col font gap-4 bg-gray-950 m-4 rounded-md"
    >
      <div className="flex gap-4">
        <label htmlFor="name">Name : </label>
        <input
          {...register("name")}
          className="bg-slate-800 p-1 rounded-md"
          type="text"
          id="name"
        />
        {errors.name && <p>{errors.name.message}</p>}
      </div>

      <div className="flex gap-4">
        <label htmlFor="age">Age : </label>
        <input
          {...register("age")}
          className="bg-slate-800 p-1 rounded-md"
          type="number"
          id="age"
        />
        {errors.age && <p>{errors.age.message}</p>}
      </div>

      <div className="flex gap-4">
        <input
          {...register("date")}
          className="bg-slate-800 text-white p-3 rounded-md border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          type="date"
          id="age"
        />
      </div>
      {errors.date && <p>{errors.date.message}</p>}

      <button>submit</button>
    </form>
  );
};

export default Form;
