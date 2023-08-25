import { useContext, useEffect, useState } from "react";
import Followers from "../services/follow.service";
import { UserContext } from "../Context/Context";
import { styled } from "styled-components";


export default function Follow(props){
    const [followed, setfollowed] = useState();
    const [params, setParams] = useState()
    const [isProcessing, setIsProcessing] = useState(false);
    const {user} = useContext(UserContext)

    function follower(){
        setIsProcessing(true)
    
        if(followed === false){
          Followers.follow(params)
          .then(res => {
            setfollowed(true)
            setIsProcessing(false)
          })
          .catch(err => {
            setIsProcessing(false)
            alert(err.response.data)
          })
        }else{
          Followers.unfollow(params)
          .then(res => {
            setfollowed(false)
            setIsProcessing(false)
          })
          .catch(err => {
            setIsProcessing(false)
            alert(err.response.data)
          })
        }
       
      }

    useEffect(()=>{
        const fetchFollowers = async () => {
            try {
              const params = {
                followerId: user.id,
                followingId: parseInt(props.id),
              };
              setParams(params)
              
              const followersResponse = await Followers.getfollowers(params)
              if(followersResponse.data.length === 0)
              setfollowed(false)
              else{
              setfollowed(true)
              }
              
            } catch (error) {
              console.log(error.response.data);
            }
          };
          fetchFollowers()
    },[props])
    return (
        <FollowContainer
        data-test="follow-btn"
        color={followed === false? '#FFFFFF':'#1877f2'}
        background={followed === false? '#1877f2':'#FFFFFF'}
        onClick={() => !isProcessing && follower()}
        disabled={isProcessing}
      >
        {followed === false? 'follow':'Unfollow'}
      </FollowContainer>
    )
}

const FollowContainer = styled.div`
  width: 112px;
  height: 31px;
  border-radius: 5px;
  background-color: ${props => props.background};
  color: ${props => props.color};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;