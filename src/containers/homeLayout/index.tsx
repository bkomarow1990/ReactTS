import * as React from 'react';
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3';
import { Outlet } from "react-router";
import Navbar from "./Navbar";

const HomeLayout = () => {
    return (
        <>
        <GoogleReCaptchaProvider reCaptchaKey="6LcGVrcgAAAAAH4-U6DsX9rLB1008t6OssIS0DDN">
        <Navbar />
        <main>
            <div className="container">
                <Outlet />
            </div>
        </main>
        </GoogleReCaptchaProvider>
        </>
    );
}
export default HomeLayout;