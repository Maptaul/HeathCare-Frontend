"use client";
import { useForm } from "@tanstack/react-form";
import { Button } from "../ui/button";
import { Field } from "../ui/field";
import { Input } from "../ui/input";
export default function LoginForm() {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: (data) => {
      console.log(data);
    },
  });
  return (
    <div>
      <p>login form</p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <form.Field name="email">
          {(field) => {
            return (
              <Field>
                <Input name={field.name} />
              </Field>
            );
          }}
        </form.Field>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
