import { Container } from "../explore/styles"
import { SideContentDown, SideContentUpper, Sidebar } from "../home/styles"
import Image from "next/image";
import Logo from '../../assets/images/Logo.png'
import { Binoculars, ChartLineUp, SignOut, User } from "@phosphor-icons/react";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

export default function Profile() {

  const router = useRouter()
  const session = useSession()

  function handleHome() {
    router.push('/home')
  }

  async function handleLogOut() {
    await signOut({ callbackUrl: '/' })
  }

  return (
    <>
      {
        session.data ? (
          <Container>
            <Sidebar>
              <SideContentUpper>
                <div>
                  <Image src={Logo} alt="logo" />
                </div>
                <div className="items">
                  <div onClick={handleHome}>
                    <ChartLineUp size={24} />
                    <p> Início</p>
                  </div>
                  <div >
                    <Binoculars size={24} />
                    <p>Explorar</p>
                  </div>
                  <div className="selected2">
                    <User size={24} />
                    <p>Perfil</p>
                  </div>

                </div>
              </SideContentUpper>
              <SideContentDown>
                <div className="loged">
                  <Image src={session.data.user.avatar_url} alt="avatar" width={32} height={32} style={{ borderRadius: 999 }} />
                  <p>{session.data.user.name.split(' ', 1)}</p>
                  <SignOut size={20} color="#F75A68" style={{ cursor: "pointer" }} onClick={handleLogOut} />
                </div>
              </SideContentDown>
            </Sidebar>
            

          </Container>
        ) : (
          <h1>Página não encontrada</h1>
        )
      }
    </>
  )
}