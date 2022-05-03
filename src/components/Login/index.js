import React from "react";
import $ from "jquery";
import { TweenMax, Sine } from "gsap";
import { FaGoogle, FaFacebookSquare } from "react-icons/fa";
import { signInWithPopup, FacebookAuthProvider } from 'firebase/auth';
import { authentication } from '../firebase/config';
import "./style.scss";

export default function Login() {

    const signInWithFacebook = async () => {
        const provider = new FacebookAuthProvider();
        const data = await signInWithPopup(authentication, provider);
        console.log({data});
    }

    function handleShowDiv() {
        $("#avatar-button").fadeOut("slow", function () {
            $("#wrapper").fadeIn();
            TweenMax.from("#wrapper", 0.4, { scale: 0, ease: Sine.easeInOut });
            TweenMax.to("#wrapper", 0.4, { scale: 1, ease: Sine.easeInOut });
        });
    }

    function handleHideDiv() {
        TweenMax.from("#wrapper", 0.4, { scale: 1, ease: Sine.easeInOut });
        TweenMax.to("#wrapper", 0.4, {
            left: "0px",
            scale: 0,
            ease: Sine.easeInOut,
        });
        $("#wrapper").fadeOut(800, function(){
            $("#avatar-button").fadeIn(800);
        });
    }

    return (
        <div className="background-layout">
            <div id="avatar-button" onClick={handleShowDiv}>
                <img
                    src="https://dqcgrsy5v35b9.cloudfront.net/cruiseplanner/assets/img/icons/login-w-icon.png"
                    alt=""
                ></img>
            </div>

            <div id="wrapper">
                <h1 className="heading">Đăng nhập</h1>

                <span className="close-btn" onClick={handleHideDiv}>
                    <img
                        src="https://cdn4.iconfinder.com/data/icons/miu/22/circle_close_delete_-128.png"
                        alt=""
                    ></img>
                </span>

                <div className="wrap-btn">
                    <button className="btn btn-social">
                        <span id="arrow">
                            <img
                                src="https://github.com/atloomer/atloomer.github.io/blob/master/img/iconmonstr-arrow-48-240.png?raw=true"
                                alt=""
                            />
                        </span>
                        <span id="icon">
                            <FaGoogle />
                            &nbsp;Google
                        </span>
                    </button>

                    <button className="btn btn-social" onClick={signInWithFacebook}>
                        <span id="arrow">
                            <img
                                src="https://github.com/atloomer/atloomer.github.io/blob/master/img/iconmonstr-arrow-48-240.png?raw=true"
                                alt=""
                            />
                        </span>
                        <span id="icon">
                            <FaFacebookSquare />
                            &nbsp;Facebook
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
}


