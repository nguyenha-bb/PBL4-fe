import BackGround from '~/layouts/components/BackGround';

function Matching({ socket, onlineUsers, user }) {
    // console.log(onlineUsers);
    // console.log(socket);
    // socket.on('hello', (data) => console.log(data));
    // if(socket) {
    //     console.log('jojo');
    //     socket.on('hello', (data) => console.log(data));
    //     console.log(socket);
    // } else {
    //     console.log(socket);
    //     console.log('huhuhu');
    // }
    return <BackGround isMatching socket={socket} onlineUsers={onlineUsers} user={user}/>;
}

export default Matching;
