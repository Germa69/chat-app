import React from "react";
import $ from "jquery";
import { TweenMax, Sine } from "gsap";
import { FaGoogle, FaFacebookSquare } from "react-icons/fa";
import {
    signInWithPopup,
    FacebookAuthProvider,
    getAdditionalUserInfo,
} from "firebase/auth";
import { auth, db } from "../../firebase/config";
import { collection, addDoc, serverTimestamp  } from "firebase/firestore"; 
import "./style.scss";

export default function Login() {
    const signInWithFacebook = async () => {
        const provider = new FacebookAuthProvider();
        // Khi người dùng đăng nhập thành công, người dùng mới thì tiến hành ghi dữ liệu vào trong db thông tin user.
        const data = await signInWithPopup(auth, provider);
        const result = getAdditionalUserInfo(data);

        if (result?.isNewUser) {
            await addDoc(collection(db, "users"), {
                displayName: data.user.displayName,
                email: data.user.email,
                photoURL: data.user.photoURL,
                uid: data.user.uid,
                providerId: result.providerId,
                createdAt: serverTimestamp()
            });
        } else {
            console.log("Người dùng cũ");
        }
    };

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
        $("#wrapper").fadeOut(800, function () {
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

                    <button
                        className="btn btn-social"
                        onClick={signInWithFacebook}
                    >
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
