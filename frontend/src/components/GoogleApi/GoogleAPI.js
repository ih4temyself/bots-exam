import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GoogleLoginComponent = () => {
    const navigate = useNavigate();

    const handleSuccess = (response) => {
        console.log("Token:", response.credential);
        handleGoogleLogin(response.credential);
    };

    const handleGoogleLogin = async (token) => {
        try {
            const response = await fetch("http://127.0.0.1:8000/auth/google/callback/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token }),
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Access Token:", data.access_token);
                localStorage.setItem("access_token", data.access_token);

                navigate("/home");
            } else {
                console.error("Error:", data);
            }
        } catch (error) {
            console.error("Network Error:", error);
        }
    };

    useEffect(() => {
        const initializeGoogleSignIn = () => {
            window.google.accounts.id.initialize({
                client_id: "1067792808830-2pmlolgkkm3t7d151pol69l33imjvf5j.apps.googleusercontent.com",
                callback: handleSuccess,
            });

            window.google.accounts.id.renderButton(
                document.getElementById("google-signin-button"),
                {
                    theme: "outline",
                    size: "large",
                }
            );
        };

        if (window.google) {
            initializeGoogleSignIn();
        } else {
            const script = document.createElement("script");
            script.src = "https://accounts.google.com/gsi/client";
            script.async = true;
            script.defer = true;
            script.onload = initializeGoogleSignIn;
            document.body.appendChild(script);
        }
    }, [navigate]);

    return (
        <div>
            <div id="google-signin-button"></div>
        </div>
    );
};

export default GoogleLoginComponent;
