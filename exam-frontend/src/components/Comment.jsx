import { Box, Button, Input } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
const Comment = () => {
    const [comment, setComment] = useState("");
    const [data, setData] = useState([]);
    useEffect(() => {
        axios
            .get("https://6486ccf3beba6297278f2f89.mockapi.io/comments")
            .then((res) => {
                setData(res.data);
            })
            .catch((e) => {
                console.log(e);
            });
    }, []);
    const PostComment = () => {
        axios
            .post("https://6486ccf3beba6297278f2f89.mockapi.io/comments", {
                user: localStorage.getItem("user"),
                comment,
            })
            .then()
            .catch((e) => {
                console.log(e);
            });
    };
    return (
        <>
            <Input
                placeholder="comment"
                onChange={(e) => {
                    setComment(e.target.value);
                }}
            ></Input>
            <Button colorScheme="red" onClick={() => PostComment()}>
                Comment
            </Button>
            {data.map((item) => {
                return (
                    <Box key={item.id} m={2} p={2} bg={"gray.50"}>
                        <Box color={"red.600"}>{item.user}</Box>
                        {item.comment}
                    </Box>
                );
            })}
        </>
    );
};

export default Comment;
