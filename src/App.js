import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import DefaultLayout from './layouts';
import { io } from 'socket.io-client';
import { AppProvider } from './components/AppContext/AppContext';
// import React, { useEffect, useState } from 'react';

function App() {
    // const [loading, setLoading] = useState(true);

    // useEffect(() => {
    //     // Mô phỏng thời gian tải trang (thay bằng mã tải dữ liệu thực tế của bạn)
    //     setTimeout(() => {
    //         setLoading(false);
    //     }, 2000);
    // }, []);
    const [socket, setSocket] = useState(null);
    useEffect(() => {
        const newSocket = io('http://192.168.241.219:3001');
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, []);
    return (
        <AppProvider>
            <Router>
                <div className="App">
                    <Routes>
                        {publicRoutes.map((route, index) => {
                            const Page = route.component;

                            let Layout = DefaultLayout;

                            if (route.layout) Layout = route.layout;
                            else if (route.layout === null) Layout = DefaultLayout;

                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout socket={socket}>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                    </Routes>
                </div>
            </Router>
        </AppProvider>
    );
}

export default App;
