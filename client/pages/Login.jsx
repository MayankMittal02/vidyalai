import React, { useState } from 'react'
import { Form, message } from 'antd';
import { Link } from 'react-router-dom';

import { loginUser } from '../apicalls/auth';

function Login() {


    async function onFinish(values) {

        const response = await loginUser(values)
        console.log(response)
        if (response.success) {
            message.success(response.message);
            localStorage.setItem("token", response.data);
            window.location.href = "/";

        }
        else {
            message.error(response.message);
        }
    }



    return (
        <>
        <div>
            Demo Credentials
            <p>
            Email : test@test.com
            </p>
            <p>
            Password : test
            </p>
        </div>
            <Form layout="vertical" onFinish={onFinish}>
                <Form.Item name="email" label={<label style={{ color: "black" }}>Email</label>}>
                    <input type="text" />
                </Form.Item>

                <Form.Item
                    label={<label style={{ color: "black" }}>Password</label>}
                    name="password"
                >
                    <input type="password" />
                </Form.Item>
                <div className="flex flex-col gap-2">
                    <button
                        type="submit"
                        className="primary-outlined-btn mt-2 w-113"
                    >
                        Login
                    </button>
                    <Link to="/register" >

                        Not a member? Register
                    </Link>
                </div>
            </Form>
        </>
    )
}

export default Login