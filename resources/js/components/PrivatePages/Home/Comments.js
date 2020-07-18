import React, { useState, useEffect, useContext } from "react";
import { fetchService } from "../../../services/fetch/fetchService";
import { GET_COMMENT } from "../../../constants/routes";
import { SocketContext } from "../../../context/SocketProvider";

const Comments = props => {

    const [comments, setComments] = useState([]);
    const { socket } = useContext(SocketContext);


    useEffect(() => {
        fetchComment();
        
    }, []);

    const fetchComment = async() => {
        try {
            const [res, status] = await fetchService(GET_COMMENT(props.id));
            if (status === 200) {
                setComments(res.data)
            }
        } catch (error) {
            
        }
    }

    return (
        <div className="coment-item-container" ref={comments}>
            {
                comments.map(comment =>
                    <CommentItem key={`cooment${comment.id} post${props.id}`}
                        author={comment.user.first_name} content={comment.content} />
                )
            }
        </div>
    );
}

export default Comments;