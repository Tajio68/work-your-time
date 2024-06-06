"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface Props {
  mode: "REGISTER" | "LOGIN";
}

const ConnectForm = ({ mode }: Props) => {
  const router = useRouter();

  const formSchema = z.object({
    email: z.string().email({
      message: "E-mail is not valid",
    }),
    password: z.string(),
    confirmPassword: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (mode === "REGISTER") {
      try {
        const response = await fetch("http://localhost:3000/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
            confirmPassword: values.confirmPassword,
            authMethod: "CREDENTIALS",
          }),
        });
        switch (response.status) {
          case 201:
            const res = signIn("credentials", {
              email: values.email,
              password: values.password,
              confirmPassword: values.confirmPassword,
              authMethod: "CREDENTIALS",
            });
            router.push("/");
            break;
          case 409:
            alert("Email : " + values.email + " is already in use");
            break;
          case 406:
            alert("Passwords don't match");
            break;
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        authMethod: "CREDENTIALS",
      });

      if (res?.error) {
        console.error(res.error);
        alert("Error");
      }
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col space-y-8 w-5/6"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mail address</FormLabel>
              <FormControl>
                <Input
                  placeholder="Mail..."
                  {...field}
                  className="focus:shadow-lg focus:shadow-purple-500"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Password"
                  type="password"
                  className="focus:shadow-lg focus:shadow-purple-500"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {mode === "REGISTER" ? (
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Confirm your password"
                    type="password"
                    className="focus:shadow-lg focus:shadow-purple-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ) : null}

        <Button
          className="text-xl w-2/3 pc:w-1/3 self-center hover:bg-purple-700"
          type="submit"
        >
          {mode === "REGISTER" ? "Register" : "Log In"}
        </Button>
      </form>
    </Form>
  );
};

export default ConnectForm;
