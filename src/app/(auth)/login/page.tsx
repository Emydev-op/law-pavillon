"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { Formik, Form, Field } from "formik";
import { useRouter } from "next/navigation";
import { loginSchema } from "@/utils/schema/auth";
import { CustomInput } from "@/components/custom/custom-input";
import { LoginFormValues } from "./types";
import { useLoginMutation } from "@/redux/services/auth/authApi";
import { routePath } from "@/utils/routes";

export default function Login() {
  const router = useRouter();

  const [login, { isLoading }] = useLoginMutation();

  const initialValues: LoginFormValues = {
    email: "",
    password: "",
  };

  const handleSubmit = (payload: LoginFormValues) => {
    login(payload)
      .unwrap()
      .then(() => {
        router.push(routePath.MAIN.OVERVIEW);
      })
      .catch((err) => {
        if (process.env.NODE_ENV === "development")
          console.log("login Error.", err);
      });
  };

  return (
    <section className="w-full">
      <h3 className="text-black font-bold text-2xl mb-9">Sign In</h3>
      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        {({ errors, touched, isValid, dirty }) => (
          <Form className="space-y-4">
            <Field name="email">
              {({ field }: any) => (
                <CustomInput
                  {...field}
                  type="email"
                  label="Email"
                  placeholder="Enter your email"
                  error={
                    touched.email && errors.email ? errors.email : undefined
                  }
                />
              )}
            </Field>

            <Field name="password">
              {({ field }: any) => (
                <CustomInput
                  {...field}
                  type="password"
                  label="Password"
                  placeholder="Enter password"
                  passwordToggle={true}
                  error={
                    touched.password && errors.password
                      ? errors.password
                      : undefined
                  }
                />
              )}
            </Field>
            <p className="text-sm text-black-02 mb-8 mt-8">
              Can’t access your account?{" "}
              <Link href={"#"} className="font-semibold text-primary underline">
                Reset Password
              </Link>
            </p>
            <Button
              type="submit"
              disabled={isLoading}
              variant={isValid && dirty ? "main" : "maindisabled"}
              className="w-full"
              loading={isLoading}
            >
              Sign in
            </Button>
          </Form>
        )}
      </Formik>
    </section>
  );
}
