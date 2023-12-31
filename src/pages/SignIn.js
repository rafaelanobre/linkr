import React, { useContext } from 'react'
import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { UserContext } from '../Context/Context';

export default function SignInPage() {
  const [formNewUser, setFormNewUser] = useState({ email: '', password: '' })
  const [btstats, setBtstats] = useState(false)
  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()

  const updateFormNewUser = (e) => {
    const { id, value } = e.target;
    const newForm = { ...formNewUser, [id]: value };
    setFormNewUser(newForm);
  }

  function sendsignin(e) {
    e.preventDefault();
    if (!formNewUser.email || !formNewUser.password) {
      alert("Please fill in all required fields.");
      return;
    }

    setBtstats(true);

    axios.post(`${process.env.REACT_APP_API_URI}/`, formNewUser)
      .then((x) => {
        setBtstats(false)
        setUser(x.data)
        const productJSON = JSON.stringify(x.data);
        sessionStorage.setItem("User", productJSON)
        navigate('/timeline')
      })
      .catch(erro => {
        console.log(erro.response)
        alert(erro.response);
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
      <FormContainer>
        <form onSubmit={sendsignin}>
          <input data-test="email" disabled={btstats} type="email" name="email" id="email" onChange={updateFormNewUser} value={formNewUser['email']} placeholder="E-mail" />
          <input data-test="password" disabled={btstats} placeholder="password" id="password" type="password" value={formNewUser['password']} onChange={updateFormNewUser} />

          {btstats ? <button data-test="login-btn" disabled={btstats} type="submit"><ThreeDots color="rgba(255, 255, 255, 1)" height={13} width={51} /></button> : <button data-test="login-btn" disabled={btstats} type="submit">Log In</button>}
        </form>

        <Link data-test="sign-up-link" to={`/sign-up`}>
          <p>First time? Create an account!</p>
        </Link>
      </FormContainer>

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

const FormContainer = styled.div` 
font-family: 'Oswald', sans-serif;
color: #fff;
width: 37%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
font-size: 24px;
gap: 12px;

p{
color: #fff;

font-family: Lato;
font-size: 20px;
font-weight: 400;
line-height: 24px;
letter-spacing: 0em;
text-align: left;
text-decoration: underline;

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
      padding-top: 100px;
      padding-left: 18px;
      justify-content: start;
      gap: 60px;
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
