import { Container, Left, LoginType, Options, Right } from "./styles";
import Hero from '../../assets/images/Home.png'
import Google from '../../assets/images/logos_google-icon.png'
import Github from '../../assets/images/akar-icons_github-fill.png'
import Rocket from '../../assets/images/RocketLaunch.png'
import Image from "next/image";
import { useRouter } from "next/router";
import { signIn, useSession } from 'next-auth/react'
import { api } from "@/lib/axios";


export default function Login() {
  const router = useRouter()
  const session =  useSession()

  async function handleLogin() {
    console.log(session.status)
    if (session.status == 'authenticated') {
      console.log('oi')
      try {
        await api.post('/users', {
        name: session.data?.user.name,
        avatar_url: session.data?.user.avatar_url
      })
      } catch (e) {
        console.log(e)
      }
      
    }
  }

  async function handleConnectGoogle() {
    try {
      await signIn('google')
      
      
    } catch (err)  {
      console.log(err)
    }
  }
  
  async function handleConnectGithub() {
    await signIn('github')
    
    
  }
  
  function handleVisitor() {
    router.push("/home")
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