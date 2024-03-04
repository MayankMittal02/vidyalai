import React from 'react'
import { Form, message } from 'antd';
import { Link } from 'react-router-dom';
import { registerUser } from '../apicalls/auth';

function Register() {


    async function onFinish(values) {

        const response = await registerUser(values)
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
            <Form layout="vertical" onFinish={onFinish}>
                <Form.Item name='name' label={<label style={{ color: "black" }}>Name</label>}>
                    <input type="text" style={{ padding: "5px" }} />
                </Form.Item>
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
                        Register
                    </button>
                    <Link to="/login" className="col"
                    >
                        Already a member? Login
                    </Link>
                </div>
            </Form>
        </>
    )
}

export default Register