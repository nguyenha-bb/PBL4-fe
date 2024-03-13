// Call.js
import classNames from 'classnames/bind';
import styles from './Call.module.scss';
import { AcceptCall, Camera, CameraSlash, Mic, MicSlash, PhoneSlash, VolumeLow, ZoomOut } from '~/components/Icon/Icon';
import images from '~/assets/images';

import React, { Fragment, useEffect, useRef, useState } from 'react';
import AVRC from '~/avrc/avrc'; // Replace with the actual library import
import Button from '~/components/Button';
import Lottie from 'lottie-react';
import CallAnimation from '../../utils/animation/call_animation.json';
import callsound from '../../utils/phonesound.mp3';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { handleGetInfoByID } from '~/services/userService';
import CountTimeCall from '~/components/CountTimeCall';

const cx = classNames.bind(styles);

function Call({ socket }) {
    const { idConver, id } = useParams();
    const location = useLocation();
    const localVideoRef = useRef();
    const remoteVideoRef = useRef();
    const [avrc, setAVRC] = useState(null);
    const [ringing, setRinging] = useState(false);
    const [, setIsTalking] = useState(false);
    const [connected, setConnected] = useState(false);
    const [audio, setAudio] = useState(null);
    const [isShowMic, setIsShowMic] = useState(true);
    const [isShowCam, setIsShowCam] = useState(true);
    const [userInfo, setUserInfo] = useState();
    console.log('location.state.to', location.state.to);
    const navigate = useNavigate();
    // const [isCamera, setCamera] = useState(true);

    const handleToggleMic = () => {
        // console.log(localVideoRef.current);
        // console.log(localVideoRef.current.autoplay);
        // localVideoRef.current.autoplay = false;
        // localVideoRef.current.pause();
        avrc?.muteMic();
        // setCamera(!isCamera);
        // setConnected(!connected);
        setIsShowMic(!isShowMic);
    };

    // const handleToggleCam = () => {
    //     // console.log(localVideoRef.current);
    //     // console.log(localVideoRef.current.autoplay);
    //     // localVideoRef.current.autoplay = false;
    //     // localVideoRef.current.pause();
    //     avrc?.muteCam()
    //     // setCamera(!isCamera);
    //     // setConnected(!connected);
    //     setIsShowCam(!isShowCam);
    // };

    useEffect(() => {
        const fetchApi = async () => {
            try {
                let data = await handleGetInfoByID(id);

                if (data && data.userData.errCode === 0) {
                    console.log(data.userData.user);
                    setUserInfo(data.userData.user);
                } else {
                    console.log('data.message ' + data.errMessage);
                }
            } catch (e) {
                console.log('error message', e.response);
            }
        };
        fetchApi();
        // window.addEventListener('hashchange', function(){
        //     console.log("User clicked the browser buttons. Detected using hashchange event.");
        //     socket.emit("close-call", {id});
        //     console.log(avrc);
        //     avrc?.endCall();
        //     navigate('/api/messages');
        // });

        // window.onhashchange = function() {
        //     //blah blah blah
        //     console.log("Detected using hashchange event");
        // }
    }, []);

    useEffect(() => {
        console.log('socket');
        console.log(socket);
        if (!socket) {
            console.log('socket is not defined');
        } else {
            console.log('created avrc');
            console.log(avrc);
            if (!avrc) {
                let _avrc = new AVRC(
                    socket,
                    (stream) => {
                        console.log('stream data:');
                        console.log(stream);
                        console.log(remoteVideoRef);
                        // remoteVideoRef.current = {}
                        if (remoteVideoRef.current) {
                            remoteVideoRef.current.srcObject = stream;
                        }
                        // let videoRef = remoteVideoRef.current;
                        // if (videoRef && stream) {
                        //     videoRef.srcObject = stream;
                        // }
                    },
                    () => {
                        // setRinging(true);
                        // let audio = new Audio(callsound);
                        // audio.play()
                        //     // .then(res => {})
                        //     // .catch(err => console.log(err))
                        // setAudio(audio);
                        console.log('pause ne');
                        audio.pause();
                    },
                    id,
                );
                _avrc.getConnectionStateChange((ch) => {
                    console.log('connected', ch);
                    setConnected(ch);
                });

                console.log('test audioooooo');
                let audio = new Audio(callsound);
                audio
                    .play()
                    .then((res) => {})
                    .catch((err) => console.log(err));
                setAudio(audio);

                setAVRC(_avrc);
            }
        }
    }, [socket]);

    useEffect(() => {
        // socket.off("receive-close-call")
        socket.on('receive-close-call', (data) => {
            console.log('receive-close-call');
            console.log(avrc);
            if (!audio?.paused) audio?.pause();
            avrc?.endCall();
            navigate('/api/messages');
        });
        if (avrc) {
            window.addEventListener(
                'popstate',
                function (event) {
                    // The popstate event is fired each time when the current history entry changes.

                    var r = this.confirm('You pressed a Back button! Are you sure?!');

                    if (r === true) {
                        // Call Back button programmatically as per user confirmation.
                        socket.emit('close-call', { id });
                        console.log(avrc);
                        console.log('check audio');
                        console.log(audio);
                        if (!audio?.paused) audio?.pause();
                        try {
                            avrc?.endCall();
                        } catch (err) {
                            // console.log(err);
                        }
                        console.log('before navigate');
                        navigate('/api/messages');
                        // this.history.back();
                        // Uncomment below line to redirect to the previous page instead.
                        // window.location = document.referrer // Note: IE11 is not supporting this.
                        this.history.pushState(null, null, window.location.pathname);
                    } else {
                        // Stay on the current page.
                        this.history.pushState(null, null, window.location.pathname);
                    }

                    this.history.pushState(null, null, window.location.pathname);
                },
                false,
            );
        }
    }, [avrc]);

    const handleFinishCall = async () => {
        console.log('close call fe');
        socket.emit('close-call', { id });
        console.log(avrc);
        console.log(audio);
        if (!audio?.paused) audio?.pause();
        avrc?.endCall();

        navigate('/api/messages');
    };

    useEffect(() => {
        const startStream = async () => {
            try {
                if (avrc) {
                    console.log('start stream');
                    let stream = await avrc?.startLocalStream({
                        audio: true,
                        // video: true,
                    });
                    console.log('local test');
                    console.log(localVideoRef);
                    console.log('location.state.from', location.state.from);

                    let videoRef = localVideoRef.current;
                    if (videoRef && stream) {
                        videoRef.srcObject = stream;
                    }

                    if (location.state.from) {
                        if (avrc) {
                            console.log('offer test');
                            console.log(avrc);
                            setTimeout(async () => {
                                await avrc?.createOffer();
                            }, 1000);
                        } else {
                            console.log('Cannot find avrc');
                        }
                    }
                }
            } catch (err) {
                console.log(err);
            }
        };
        startStream();

        // const createOfferApi = async() => {
        //     try {
        //         if(location.state.from) {
        //             if (avrc) {
        //                 setTimeout(async () => {
        //                     await avrc?.createOffer();
        //                 }, 1000)
        //             } else {
        //                 console.log("Cannot find avrc");
        //             }
        //         }
        //     }
        //     catch(err) {
        //         console.log(err);
        //     }
        // }
        // createOfferApi();
    }, [avrc, location.state.from]);

    const handleAcceptCall = () => {
        console.log('accept call');
        console.log(audio);
        console.log(avrc);
        console.log(audio);
        audio?.pause();
        console.log(audio);
        avrc?.answerPhone();
    };

    // const handleToggleSound = () => {

    // }

    console.log(localVideoRef);
    console.log(remoteVideoRef);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <div className={cx('status-header')}>Calling ...</div>
                {/* <ZoomOut className={cx('zoom-action')} /> */}
            </div>
            <div className={cx('body')}>
                {
                    // connected ?
                    // (
                    //     <div className={cx('body-call')}>
                    //         <div>hellooooooooo</div>
                    //         <video className={cx('local-video')} autoPlay={true} ref={localVideoRef} width={300} ></video>
                    //         <video className={cx('remote-video')} autoPlay={true} ref={remoteVideoRef} width={300}></video>
                    //     </div>
                    // )
                    // :
                    // (
                    <div className={cx('body-call')}>
                        {/* <div className={cx('main-call')}> */}
                        {/* {!connected ? ( */}
                        <Fragment>
                            <img
                                src={userInfo && images[userInfo.avatar]}
                                alt=""
                                className={cx(isShowMic && 'shadow-animation')}
                            />
                            <div className={cx('fullname')}>{userInfo && userInfo.fullName}</div>
                            {!connected ? <Lottie animationData={CallAnimation} loop={true} /> : <CountTimeCall />}
                        </Fragment>
                        {/* ) : ''} */}
                        {/* </div> */}
                        <video
                            className={cx('local-video')}
                            autoPlay={true}
                            ref={localVideoRef}
                            width={230}
                            height={180}
                            muted={true}
                        ></video>
                        <video
                            className={cx('remote-video')}
                            autoPlay={true}
                            ref={remoteVideoRef}
                            width={230}
                            height={180}
                        ></video>
                    </div>
                    // )
                    // : location.state.from ? (
                    //     <div className={cx('body-call')}>
                    //         {/* <div className={cx('main-call')}> */}
                    //             <img src={userInfo && images[userInfo.avatar]} alt="" />
                    //             <div className={cx('fullname')}>{userInfo && userInfo.fullName}</div>
                    //         {/* </div> */}
                    //         <video className={cx('local-video')} autoPlay={true} ref={localVideoRef} width={250} height={250} muted={true}></video>
                    //     </div>
                    // ) : location.state.to ? (
                    //     <div className={cx('body-call')}>
                    //         {/* <img src={images.cancer} alt="" />
                    //         <div className={cx('fullname')}>Hồng Diễm</div>
                    //         <video className={cx('local-video')} autoPlay={true} ref={localVideoRef} width={400} muted={true}></video> */}
                    //         {/* <div className={cx('total-time')}>01:28:30</div> */}
                    //     </div>
                    // ) : ''
                }
            </div>
            <div className={cx('footer')}>
                {connected ? (
                    <div className={cx('phone-function')}>
                        {/* <VolumeLow className={cx('icon')} /> */}

                        {/* {isShowCam ? (
                            <Camera className={cx('icon')} onClick={handleToggleCam} />
                        ) : (
                            <CameraSlash className={cx('icon')} onClick={handleToggleCam} />
                        )} */}

                        <div className={cx('mic-call', 'call-icon')} onClick={handleToggleMic}>
                            {isShowMic ? (
                                <Mic width="1.4em" height="1.4em" className={cx('icon')} />
                            ) : (
                                <MicSlash width="1.4em" height="1.4em" className={cx('icon')} />
                            )}
                        </div>
                        <div className={cx('phone-call', 'call-icon')} onClick={handleFinishCall}>
                            <PhoneSlash width="1.4em" height="1.4em" />
                        </div>
                    </div>
                ) : location.state.to ? (
                    <div className={cx('phone-function')}>
                        <div className={cx('accept-call', 'call-icon')} onClick={handleAcceptCall}>
                            <AcceptCall width="1.4em" height="1.4em" />
                        </div>
                        <div className={cx('phone-call', 'call-icon')} onClick={handleFinishCall}>
                            <PhoneSlash width="1.4em" height="1.4em" />
                        </div>
                    </div>
                ) : (
                    <div className={cx('phone-function')}>
                        {/* <VolumeLow className={cx('icon')} onClick={handleToggleSound}/> */}
                        {/* {isShowCam ? (
                            <Camera className={cx('icon')} onClick={handleToggleCam} />
                        ) : (
                            <CameraSlash className={cx('icon')} onClick={handleToggleCam} />
                        )} */}

                        <div className={cx('mic-call', 'call-icon')} onClick={handleToggleMic}>
                            {isShowMic ? (
                                <Mic width="1.4em" height="1.4em" className={cx('icon')} />
                            ) : (
                                <MicSlash width="1.4em" height="1.4em" className={cx('icon')} />
                            )}
                        </div>
                        <div className={cx('phone-call', 'call-icon')} onClick={handleFinishCall}>
                            <PhoneSlash width="1.4em" height="1.4em" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Call;
