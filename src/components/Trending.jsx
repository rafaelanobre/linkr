import { Link } from "react-router-dom";
import { styled } from "styled-components";

export default function TrendingHashtags({trendingHashtags}){

    return(
        <AsideContent>
                <div>
                    <h3>trending</h3>
                </div>
                {trendingHashtags.length === 0 ? (
                    <p>There are no hashtags yet</p>
                ) : (
                    <>
                        {trendingHashtags.map((hashtag) => (
                            <Link to={`/hashtag/${hashtag.hashtag}`}>
                                <p key={hashtag.id}>#{hashtag.hashtag}</p>
                            </Link>
                        ))}
                    </>
                )}
            </AsideContent>
    )
}
const AsideContent = styled.div`
    background-color: #171717;
    min-width: 300px;
    padding-top: 1.5em;
    padding-bottom: 1.5em;
    border-radius: 1em;
    div{
        padding-left: 2em;
        padding-bottom: 1em;
        margin-bottom: 1em;
        border-bottom: #fff solid 1px;
    }
    p{
        padding-left: 2em;
        padding-bottom: 0.35em;
        font-size: 19px;
        font-weight: 600;
        letter-spacing: 0.95px;
        color: #fff;
        text-decoration: underline #171717;
    }
    @media screen and (max-width: 1020px){
        margin: auto;
        width: 100%;
    }
`