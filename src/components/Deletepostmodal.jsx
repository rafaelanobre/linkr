import React, { useState } from 'react'
import styled from "styled-components"


export default function Deletepostmodal({ isOpen, children, setOpenOption }) {
    const [openDeleteModal, setOpenDeleteModal] = useState(false)

    if (isOpen) {
        return (
            <BackgroundDelet>
                <DelBox>
                    <TextConfirm>
                        {children}
                    </TextConfirm>
                    <OptionButton>
                        <button onClick={setOpenOption} >No, go back</button>
                        <button>Yes, delete it</button>
                    </OptionButton>
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
    button{
        cursor: pointer;
    }
`

const DelBox = styled.div`
    position: fixed;
    display: flex;
    flex-direction: column;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 150px;
    background-color: #333333;
    border-radius: 50px;

`

//<Deletepostmodal isOpen={openDeleteModal} setOpenOption={()=>setOpenDeleteModal(!openDeleteModal)} >
//<h2>Are you sure you want</h2>
//<h2>to delete this post?</h2>
//</Deletepostmodal>
