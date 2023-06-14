import { Button } from "@chakra-ui/react";
import { useState } from "react";
import {
    AiFillLike,
    AiOutlineLike,
    AiFillDislike,
    AiOutlineDislike,
} from "react-icons/ai";

const Like = () => {
    let [like, setLike] = useState(false);
    let [dislike, setDisLike] = useState(false);

    return (
        <>
            <Button
                onClick={() => {
                    setLike(!like);
                }}
            >
                {like ? <AiFillLike /> : <AiOutlineLike />}
            </Button>
            <Button
                onClick={() => {
                    setDisLike(!dislike);
                }}
            >
                {dislike ? <AiFillDislike /> : <AiOutlineDislike />}
            </Button>
        </>
    );
};

export default Like;
