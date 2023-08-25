import React from 'react'
import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

export default function SignUpPage() {
  const [formNewUser, setFormNewUser] = useState({ name: '', email: '', password: '', photo: '' })
  const [btstats, setBtstats] = useState(false)
  const navigate = useNavigate()

  const updateFormNewUser = (e) => {
    const { id, value } = e.target;
    const newForm = { ...formNewUser, [id]: value };
    setFormNewUser(newForm);
  }

  function sendsignup(e) {
    e.preventDefault();
    if (!formNewUser.email || !formNewUser.password || !formNewUser.name || !formNewUser.photo) {
      alert("Please fill in all required fields.");
      return;
    }

    setBtstats(true);

    axios.post(`${process.env.REACT_APP_API_URI}/sign-up`, formNewUser)
      .then((x) => {
        navigate('/')
      })
      .catch(erro => {
        alert(erro?.response.data);
        setBtstats(false)
      })

  }
  return (
    <PageContainer>
      <LeftContainer>
        <h1>linkr</h1>
        <h2>save, share and discover</h2>
        <h2>the best links on the web</h2>
      </LeftContainer>
      <SingUpContainer>
        <form onSubmit={sendsignup}>
          <input data-test="email" disabled={btstats} type="email" name="email" id="email" onChange={updateFormNewUser} value={formNewUser['email']} placeholder="E-mail" />
          <input data-test="password" disabled={btstats} placeholder="password" id="password" type="password"  value={formNewUser['password']} onChange={updateFormNewUser} />
          <input data-test="username" disabled={btstats} placeholder="username" type="text" id="name"  value={formNewUser['name']} onChange={updateFormNewUser} />
          <input data-test="picture-url" disabled={btstats} placeholder="picture url" type="url" id="photo" value={formNewUser['photo']} onChange={updateFormNewUser} />

          {btstats ? <button data-test="sign-up-btn" disabled={btstats} type="submit"><ThreeDots color="rgba(255, 255, 255, 1)" height={13} width={51} /></button> : <button data-test="sign-up-btn" disabled={btstats} type="submit">Sign Up</button>}
        </form>

        <Link data-test="login-link" to={`/`}>
          <p>Switch back to log in</p>
        </Link>
      </SingUpContainer>

    </PageContainer>
  )
}

const PageContainer = styled.div`
 font-family: 'Oswald', sans-serif;
  color: #151515;
  height: 100vh;
  width: 100vw;
  display: flex;
  background-color:#333333;
  @media screen and (max-width: 768px) {
    width: 100%;
    height: 100vh;
    flex-direction: column;
    justify-content: space-around;
    }
`

const LeftContainer = styled.div`
  width: 63%;
  background-color: #000;
    color: #fff;
  box-shadow: 4px 0px 4px 0px #00000040;
  display: flex;
  flex-direction: column;
  padding-top: 15%;
  padding-left: 11%;

  h1 {
    width: 422px;
      font-family: Passion One;
      font-size: 106px;
      font-weight: 700;
      line-height: 117px;
      letter-spacing: 0.05em;
      text-align: left;
     }

  h2{
    font-family: 'Oswald', sans-serif;
  font-size: 43px;
  font-weight: 700;
  line-height: 64px;
  text-align: left;
  }
  @media screen and (max-width: 768px) {
    padding-top: 5px;
  padding-left: 1px;
    width: 100%;
    height:25%;
    h1{
      width: none;
      font-size: 76px;
      line-height: 80px;
      text-align: center;
    }
    h2{
      
      font-size: 23px;
      line-height: 34px;
      text-align: center;
    }
    }
  
`

const SingUpContainer = styled.div` 

width: 37%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
font-size: 24px;
gap: 12px;
p{
color: #fff;
text-decoration: underline;
font-family: Lato;
font-size: 20px;
font-weight: 400;
line-height: 24px;
letter-spacing: 0em;
text-align: left;
}
button {
font-family: 'Oswald', sans-serif;
display: flex;
justify-content: center;
align-items: center;
color: #fff;
font-size: 27px;
font-weight: 700;
line-height: 40px;
text-align: left;
width: calc(85% - 10px);
height: 65px;     
border-radius: 6px;
border: solid 1px #1877F2;
background-color: #1877F2;
}
    
input {    
font-size: 27px;
font-weight: 700;
line-height: 40px;
letter-spacing: 0em;
text-align: left;
width: calc(85% - 10px);
border-radius: 5px;
outline: none;
border: 1px solid #ccc;
padding: 10px;

:focus {
border: 2px solid #ffb6b6;
margin: 0px;
}
}
form {
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
gap: 9px;
width: 100%;
border-radius: 5px;
    }  
    
    @media screen and (max-width: 768px) {
      align-items: center;
      margin-top: 0;
      padding-left: 18px;
      justify-content: center;
      gap: 115px;
      height:75%;
       width: 100%;
    form{
      height: 55px;
      font-size: 22px;
    }
    input{
      height: 55px;
      font-size: 22px;
    }
    button{
      width: calc(85% - 10px);
    }
    p{
      padding-top: 1px;
    }
    }

  `
