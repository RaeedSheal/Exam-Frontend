import { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Box, Text, Image, Link, Center } from "@chakra-ui/react";
import Like from "../components/Like";
import Navbar from "../components/Navbar";
import Comment from "../components/Comment";
const Home = () => {
    const [data, setData] = useState([]);

    const apikey = "AIzaSyCLWaM3rp4DqJPyBaCCMbbuFHdyOSlQlJI";
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=4&chart=mostPopular&key=${apikey}`;

    useEffect(() => {
        axios
            .get(url)
            .then((res) => {
                console.log(res.data.items);
                setData(res.data.items);
            })
            .catch((e) => {
                console.log(e);
            });
        if (localStorage.getItem("searchUrl") != "") {
            Filter(localStorage.getItem("searchUrl"));
        }
    }, []);
    const Filter = (searchUrl) => {
        axios
            .get(searchUrl)
            .then((res) => {
                setData(res.data.items);
            })
            .catch((e) => {
                console.log(e);
            });
    };

    ///////////////////////////////////////
    var tag = document.createElement("script");

    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName("script")[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    // 3. This function creates an <iframe> (and YouTube player)
    //    after the API code downloads.
    var player;
    function onYouTubeIframeAPIReady() {
        player = new YT.Player("player", {
            height: "390",
            width: "640",
            videoId: "M7lc1UVf-VE",
            playerVars: {
                playsinline: 1,
            },
            events: {
                onReady: onPlayerReady,
                onStateChange: onPlayerStateChange,
            },
        });
    }

    // 4. The API will call this function when the video player is ready.
    function onPlayerReady(event) {
        event.target.playVideo();
    }

    // 5. The API calls this function when the player's state changes.
    //    The function indicates that when playing a video (state=1),
    //    the player should play for six seconds and then stop.
    var done = false;
    function onPlayerStateChange(event) {
        if (event.data == YT.PlayerState.PLAYING && !done) {
            setTimeout(stopVideo, 6000);
            done = true;
        }
    }
    function stopVideo() {
        player.stopVideo();
    }
    ////////////////////////////////////////////////////
    return (
        <>
            <Navbar />
            {/* nav */}
            <Grid templateColumns={"3fr 1fr"}>
                <Grid templateRows={"1fr 3fr"} justifyContent={"center"}>
                    {/* Main */}
                    <Box m={5}>
                        <iframe
                            id="player"
                            type="text/html"
                            width="700"
                            height="410"
                            src="http://www.youtube.com/embed/M7lc1UVf-VE?enablejsapi=1&origin=http://example.com"
                        ></iframe>
                    </Box>
                    {/* Comments */}
                    <Box>
                        <Like />
                        <Comment />
                    </Box>
                </Grid>
                <Box>
                    {/* Side */}
                    <Link href="https://www.linkedin.com/in/raeed-alodhaylah-5a1051233/">
                        <Box>
                            {/* Ad */}{" "}
                            <Image src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAllBMVEUMZMX///8AYcQAWcFDf8nL3PIAWrzQ3vMAYcI0eclZjtAucslAgsz6/v3x9/sgbclOhM8AX8QAYsAAX70AV70AWMLm7vgAXb4sdsw5fsoRbsVmltK6z+iUt+AMZcGDrN3c6fNvnddiltWqwuPA0+r0+vyOrt+lweR9pduuyueUst9Lh81pldd1mtYdbcunxOXO4u7Z4fGRyVlRAAAEKUlEQVR4nO3ce1faMBzG8SblEpSCiUUuQrkMhsCc+v7f3Ko4KjW/yLY0WXOez9mf4Ml3vSW1NYoAAAAAAAAAAAAAAAAAAAAAAAAAAADgYiriIsqU72FURcapGnXHk5aMue+xVCCT6n56x960Z2OpMt8jsozz+Xve0Xqc+h6SXbKzYOeSfex7UBap+J591lThHI3awPxw5KGcVFUj0RayaRrI6UaUj8GTpfA9NivknApkvTC2YdwjC9lc+h6dBWpFB7JFCIXx1FDIRr6HZ0Fq2EkZewjgXNMnLhVH34a+x/fPeMdYOK3/gchvTIFsXf/ZKR+bC+u/DcW1cS/d1f84jFobU+H3ANYXadNU2PU9PAvkd0Ngz/forMgMhU/1P5Xm4h0ZmHQCOAzz68WEPNdsg9iE+ZH4QATeBTApPYqf9PvoKIh99E2qOxQ3jVvf47JHDT5fMl5GAQW+3tNvnF/4N3shwrhJc8Ljw/Q0Q13MJ4GcRc8IORjP99vZfpWlQe2gH3EZx7Gs/4IJAADqQ3DJX/+FM38vqHyKlA5Hhx+Pj49X43468P34CheEiz9Z+pTMlrvFaQ6YbNrblRpKf6vNbHRNKX2yT/kwSVd5XluzGGs//Ew9NfIGS/RYs3X2yUGzp7dpnMYu+zPql1mbp46f+XxeSCkVxrpt8+bmWJgJOTPeYP7m5QkWi4Wye0d94t3m3sNmtFao5OyLvle7zPnRaKlQCb6+IDBfXvddJ1oq5BH5WE7JXd/xwWilUKnJpYGM9a7dPk5mpfCWP18cmO+okdOtaKVwYHxm5ZP1wOWNPBuFneUfBTK2dHkzyEbhwfirco3NxOF+aqPw8rPMbzuHV34bhX+h4e6q6KnQ4ZM6ngrZyNlG9FXo7hfMvgp7zt7o8FXIDq52U2+FznbTKgovmgAsalq4mB0mQqjJYfvler98o6sWhevuYPh2C5jz4WD1ReMPR4soi4W91dmtXy7MK469o7mpvcLn8nRaSWPi9PzH/++FCXvW3LuXpoXxi6MllK1tqHtGLBMd0zccLYNtFR60W8T0wkqv7yTQVuGTfpfLuvRXkms3sxo7hQlx/yy7NayOO3Uq3MXExY148PFY6OZyYafwihqsXNJfGteoMCGXQoYfzxo1KmxSO2kkJvTLcXUq3BreraFnp3UqNLwT3aJPpnUqPNBjTV+CKDScFVv0t+pUaLiytegXq1BoCQoLKNRDYfVQWEChHgqrh8ICCvVQWD0UFlCoh8LqobCAQj0UVg+FBRTqobB6KCygUA+F1UNhAYV6KKweCgso1ENh9VBYQKEeCquHwkKAhe1SIf2UoaFwSP+/dB29FtTvUsbnH+Q3VxTDmxOq+zffskqJiOtFpZda+OV/M6uQKepLof0NWAAAAAAAAAAAAAAAAAAAAAAAAAAAgAr8Aj5RWY0PDbn2AAAAAElFTkSuQmCC"></Image>
                        </Box>
                    </Link>

                    {/* Videos */}
                    {data.map((item) => {
                        return (
                            <Text key={item.id.videoId}>
                                {item.snippet.title}
                                <Image
                                    src={item.snippet.thumbnails.default.url}
                                />
                            </Text>
                        );
                    })}
                </Box>
            </Grid>
        </>
    );
};

export default Home;
