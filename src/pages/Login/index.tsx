import { Container, Left, LoginType, Options, Right } from "./styles";
import Hero from '../../assets/images/Home.png'
import Google from '../../assets/images/logos_google-icon.png'
import Github from '../../assets/images/akar-icons_github-fill.png'
import Rocket from '../../assets/images/RocketLaunch.png'
import Image from "next/image";
import { useRouter } from "next/router";

const router = useRouter()

export default function Login() {
  function login(type: string) {
    if (type == "Google") {
      router.push("/Google")
    } else if (type == "Github") {
      router.push("/Github")
    } else if (type == "Rocket") {
      router.push("/Rocket")
    }
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
          <LoginType onClick={() => login("Google")}>
            <Image src={Google} alt="Google"/>
            <h3>Entrar com Google</h3>
          </LoginType>
          <LoginType onClick={() => login("Github")}>
            <Image src={Github} alt="Github"/>
            <h3>Entrar com Github</h3>
          </LoginType>
          <LoginType onClick={() => login("Rocket")}>
            <Image src={Rocket} alt="Rocket"/>
            <h3>Acessar como visitante</h3>
          </LoginType>
        </Options>
      </Right>
    </Container>
  )
}