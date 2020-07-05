import React, { useState, useEffect, useContext } from "react";
import { SocketContext } from "../../context/SocketProvider";


const TestSocket = () => {
    const [data, setData] = useState([]);
    const { socket } = useContext(SocketContext);// get socket from context api

    useEffect(() => {

        socket.on('test', res => setData(datas => [...datas, res.message.test]));  //socket listen event

    }, []);

    return (
        <div className="container ">
            <div className="ant-col-lg-24">
                <div className="full-height-screen flex-center">
                    {
                        !data?"Listening...":
                        data.map(dt => {
                            return <div key={dt} style={{display: "block"}}>{dt}<br/></div>
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default TestSocket;
