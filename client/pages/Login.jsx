import React, { useState } from "react";
import { Form, message } from "antd";
import { Link } from "react-router-dom";

import { loginUser } from "../apicalls/auth";
import Footer from "./Footer";

function Login() {
  async function onFinish(values) {
    const response = await loginUser(values);
    console.log(response);
    if (response.success) {
      message.success(response.message);
      localStorage.setItem("token", response.data);
      window.location.href = "/";
    } else {
      message.error(response.message);
    }
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            name="email"
            label={
              <label className="mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Email
              </label>
            }
          >
            <input
              type="email"
              id="email"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder=""
              required
            />
          </Form.Item>

          <Form.Item
            label={
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Password
              </label>
            }
            name="password"
          >
            <input
              type="password"
              id="password"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              required
            />
          </Form.Item>
          <div className="flex flex-col gap-2">
            <button
              type="submit"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Login
            </button>
            <Link to="/register">
              Not a member?{" "}
              <span className="text-sky-500 font-medium">Register</span>
            </Link>
          </div>
        </Form>
        <div className="mt-6 rounded-lg text-slate-700 border-2 p-6">
          Demo Credentials:
          <p>Email : test@test.com</p>
          <p>Password : test</p>
        </div>
      </div>
      <Footer/>
    </>
  );
}

export default Login;
