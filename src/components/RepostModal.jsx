import React, { useContext, useState } from 'react'
import styled from "styled-components"
import { UserContext } from '../Context/Context';
import axios from 'axios';
import { TailSpin } from 'react-loader-spinner';


export default function Repostmodal({ isOpen, setOpenOption, postId }) {
    const [loading, setLoading] = useState(false);
    const { user } = useContext(UserContext);


    const config = {
        headers: {
            Authorization: `Bearer ${user.token}`
        }
    }

    function Repost() {

        console.log(postId)
        console.log(config)

         setLoading(true)
         const p = axios.post(`${process.env.REACT_APP_API_URI}/repost`,{postId} , config)
         p.then((x) => {
             setLoading(false)            
             window.location.reload();
         })
         p.catch(erro => {
             setLoading(false)
             alert(erro.response.data)
             setOpenOption()
         })
    }


    if (isOpen) {
        return (
            <BackgroundDelet>
                <DelBox>
                    {loading ? (
                        <>
                            <TailSpin color="#6A459C" height={80} width={80} />
                            <p>Loading...</p>
                        </>
                    ) : (<>
                        <TextConfirm>
                            <h2>Do you want to re-post </h2>
                            <h2>this link?</h2>
                        </TextConfirm>
                        <OptionButton>
                            <button data-test="cancel" onClick={setOpenOption} >No, cancel</button>
                            <button data-test="confirm" onClick={Repost} >Yes, share!</button>
                        </OptionButton>
                    </>
                    )}

                </DelBox>
            </BackgroundDelet>
        )
    }
    return null
}

const BackgroundDelet = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgb(0,0,0,0.7);
    z-index: 1000;
   
`
const TextConfirm = styled.div`
    color: #FFF;
    text-align: center;
    font-family: Lato;
    font-size: 34px;
    font-style: normal;
    font-weight: 700;
    line-height: normal;
`
const OptionButton = styled.div`
    display: flex;
    justify-content: space-around;
    gap: 10px;
    button{
        width: 134px;
        height: 37px;
        cursor: pointer;
        border-radius: 5px;
        background: #fff;
        border-color: #fff;
        color: #1877F2;
        font-family: Lato;
        font-size: 18px;
        font-style: normal;
        font-weight: 700;
        line-height: normal;
    }
    :last-child{
        border-color: #1877F2;
        background: #1877F2;
        color: #fff;
    }
`

const DelBox = styled.div`
    height: 210px;
    width: 520px;
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    gap: 20%;
    background-color: #333333;
    border-radius: 50px;
`

