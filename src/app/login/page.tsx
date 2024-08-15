"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Formik, Form } from "formik";
import TextInput from "@/components/CommonComponents/TextInput";
import { loginUser } from "@/services/auth.service";
import { loginValidationSchema } from "@/validation-schemas/auth.validation";

const Login = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values: typeof initialValues) => {
    try {
      const response = await loginUser(values);
      console.log("Login successful:", response);
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="hidden bg-muted lg:block">
        <Image
          src="/placeholder.svg"
          alt="Image"
          width={1920}
          height={1080}
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <div className="flex items-center justify-center py-12 px-3">
        <div className="mx-auto grid w-[400px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <Formik
            initialValues={initialValues}
            validationSchema={loginValidationSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form className="grid gap-4">
                <TextInput
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="info@example.com"
                />
                <TextInput
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="example@123"
                />
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default Login;
