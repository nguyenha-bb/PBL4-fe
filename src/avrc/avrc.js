import { Socket } from 'socket.io-client';

class AVRC {
    constructor(io, fn, onCall, userID) {
        // this.iceCandidateEventListenerRegistered = false;
        // this.answerEventListenerRegistered = false;
        this.toUserID = userID;
        this.connection = new RTCPeerConnection({
            iceServers: [{ urls: 'stun:stun.l.google.com:19302' }],
        });
        // this.connection.setConfiguration()
        console.log('constructor');
        console.log(this.connection);

        this.io = io;
        this.remoteStream = new MediaStream();

        // if(!this.answerEventListenerRegistered) {
        // io.off("answer");
        io.on('answer', async (answer) => {
            console.log('answer fe');
            console.log(answer);
            try {
                onCall();
                let rtc_session_description = new RTCSessionDescription(answer);
                console.log(this.connection);
                await this.connection?.setRemoteDescription(rtc_session_description);
            } catch (error) {
                // throw error;
                console.log(error);
            }
        });
        //     this.answerEventListenerRegistered = true;
        // }

        io.on('offer', async (offer) => {
            console.log('offer fe');
            console.log(offer);
            this.offer = offer;
            // onCall();
        });

        this.connection.ontrack = (ev) => {
            if (ev.streams[0]) {
                fn(ev.streams[0]);
            }
        };

        let toUserID = this.toUserID;
        this.connection.onicecandidate = (e) => {
            if (e.candidate) {
                let candidate = e.candidate;
                io.emit('ice_candidate', { candidate, toUserID });
            }
        };
    }

    // async createOffer() {
    //     try {
    //         let offer = await this.connection?.createOffer();
    //         await this.connection?.setLocalDescription(offer);
    //         console.log(offer);

    //         this.io && this.io.on("ice_candidate", async (ice_candidate) => {
    //             console.log("ice_candidate fe");
    //             console.log(ice_candidate);
    //             try {
    //                 await this.connection?.addIceCandidate(ice_candidate);
    //             } catch (error) {
    //                 throw error;
    //             }
    //         });

    //         let toUserID = this.toUserID
    //         console.log('fe: ', toUserID);
    //         console.log(this.io);
    //         this.io?.emit("offer", {offer, toUserID});
    //     } catch (err) {
    //         throw err;
    //     }
    // }

    async createOffer() {
        try {
            let offer = await this.connection?.createOffer();
            await this.connection?.setLocalDescription(offer);
            console.log(offer);

            // if (!this.iceCandidateEventListenerRegistered) {
            // Đăng ký sự kiện "ice_candidate" chỉ một lần
            this.io &&
                this.io.on('ice_candidate', async (ice_candidate) => {
                    console.log('ice_candidate fe');
                    console.log(ice_candidate);
                    try {
                        await this.connection?.addIceCandidate(ice_candidate);
                    } catch (error) {
                        // throw error;
                        console.log(error);
                    }
                });
            // this.iceCandidateEventListenerRegistered = true;
            // }

            let toUserID = this.toUserID;
            console.log('fe: ', toUserID);
            console.log(this.io);
            this.io?.emit('offer', { offer, toUserID });
        } catch (err) {
            throw err;
        }
    }

    async startLocalStream(config) {
        try {
            this.localStream = await navigator.mediaDevices.getUserMedia(config);
            this.localStream.getTracks().forEach((track) => {
                this.localStream && this.connection?.addTrack(track, this.localStream);
            });
            return this.localStream;
        } catch (err) {
            console.log('Some issue during starting the stream');
            throw err;
        }
    }

    muteMic() {
        this.localStream.getAudioTracks().forEach((track) => (track.enabled = !track.enabled));
    }

    muteCam() {
        this.localStream.getVideoTracks().forEach((track) => (track.enabled = !track.enabled));
    }

    endCall() {
        console.log('close-call avrc');
        try {
            this.localStream.getTracks().forEach((track) => track.stop());
            this.remoteStream.getTracks().forEach((track) => track.stop());
        } catch (err) {
            console.log(err);
        }
        // this.connection.close();
        this.connection = null;
    }

    async getLocalStream() {
        return this.localStream;
    }

    async getConnectionStateChange(fn) {
        if (this.connection) {
            this.connection.onconnectionstatechange = () => {
                fn(this.connection?.connectionState === 'connected');
            };
        }
    }

    getRemoteStream() {
        return this.remoteStream;
    }

    async answerPhone() {
        if (!this.offer) {
            console.log('there is a phone call');
            return;
        }

        try {
            console.log(this.offer);
            const rtc_session_description = new RTCSessionDescription(this.offer);
            await this.connection?.setRemoteDescription(rtc_session_description);
            let answer = await this.connection?.createAnswer();
            await this.connection?.setLocalDescription(answer);

            let toUserID = this.toUserID;
            this.io && this.io.emit('answer', { answer, toUserID });
        } catch (err) {
            throw err;
        }
    }
}

export default AVRC;
