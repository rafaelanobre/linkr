import React from 'react'
import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";

export default function SignInPage() {
  const [formNewUser, setFormNewUser] = useState({ email: '', password: ''})
  const [btstats, setBtstats] = useState(false)
  const navigate = useNavigate()

  const updateFormNewUser = (e) => {
    const { id, value } = e.target;
    const newForm = { ...formNewUser, [id]: value };
    setFormNewUser(newForm);
  }

  function sendsignin(e) {
    e.preventDefault();

    setBtstats(true);

    console.log(formNewUser)
    const cadastro = axios.post(`${process.env.REACT_APP_API_URI}/`,
      formNewUser
    )
    console.log(cadastro)
    cadastro.then((x) => {
      setBtstats(false)
      console.log(x.data)
      navigate('/timeline')
    })
    cadastro.catch(erro => {
      console.log(erro.response.data)
      alert(erro.response.data);
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
          <input disabled={btstats} type="email" name="email" id="email" onChange={updateFormNewUser} value={formNewUser['email']} placeholder="E-mail" />
          <input disabled={btstats} placeholder="password" id="password" type="password" required value={formNewUser['password']} onChange={updateFormNewUser} />

          {btstats ? <button disabled={btstats} type="submit"><ThreeDots color="rgba(255, 255, 255, 1)" height={13} width={51} /></button> : <button disabled={btstats} type="submit">Log In</button>}
        </form>

        <Link to={`/sign-up`}>
        First time? Create an account!
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
  background-color:#484848;
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
  
`

const FormContainer = styled.div` 
font-family: 'Oswald', sans-serif;
color: #fff;
text-decoration: none;
width: 37%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
font-size: 24px;
gap: 12px;
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
width: 429px;
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
  `
