import { Container, Left, LoginType, Options, Right } from "./styles";
import Hero from '../../assets/images/Home.png'
import Google from '../../assets/images/logos_google-icon.png'
import Github from '../../assets/images/akar-icons_github-fill.png'
import Rocket from '../../assets/images/RocketLaunch.png'
import Image from "next/image";

import { signIn, signOut, useSession } from 'next-auth/react'

export default function Login() {

  const session = useSession()
  
  async function handleConnectGoogle() {
      if (session.status != 'unauthenticated') {
        await signOut()
        
      }
      await signIn('google', { callbackUrl: '/home' }) 
  }
  
  async function handleConnectGithub() {
    if (session.status != 'unauthenticated') {
      await signOut()
      
    }
    await signIn('github', { callbackUrl: '/home' }) 
  }
  
  async function handleVisitor() {
    await signOut({callbackUrl: '/home'})
  }
  
  return (
    <Container>
      <Left>
        <Image 
          src={Hero}
          alt="BookWise"
        />
      </Left>
      <Right>
        <Options>
          <div className="upper">
            <h2>Boas vindas!</h2>
            <p>Faça seu login ou acesse como visitante.</p>
          </div>
          <LoginType onClick={handleConnectGoogle}>
            <Image src={Google} alt="Google"/>
            <h3>Entrar com Google</h3>
          </LoginType>
          <LoginType onClick={handleConnectGithub}>
            <Image src={Github} alt="Github"/>
            <h3>Entrar com Github</h3>
          </LoginType>
          <LoginType onClick={handleVisitor}>
            <Image src={Rocket} alt="Rocket"/>
            <h3>Acessar como visitante</h3>
          </LoginType>
        </Options>
      </Right>
    </Container>
  )
}