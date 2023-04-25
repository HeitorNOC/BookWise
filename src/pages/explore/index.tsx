import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { Container, SideContentDown, SideContentUpper, Sidebar,Button, DialogOverlay, DialogContent, DialogTitle, Fieldset, IconButton } from "../home/styles"
import Logo from '../../assets/images/Logo.png'
import Image from "next/image";
import { Binoculars, ChartLineUp, SignIn, SignOut, User, X } from "@phosphor-icons/react";
import * as Dialog from '@radix-ui/react-dialog';
import Google from '../../assets/images/logos_google-icon.png'
import Github from '../../assets/images/akar-icons_github-fill.png'

export default function Explore() {
  const router = useRouter()
  const session = useSession()

  function handleHome() {
    router.push('/home')
  }

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

  async function handleLogOut() {
    await signOut({callbackUrl: '/'})
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
                  <div className="selected1">
                    <Binoculars size={24} />
                    <p>Explorar</p>
                  </div>
                  <div>
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
                  <div className="selected1">
                    <Binoculars size={24} />
                    <p>Explorar</p>
                  </div>

                </div>
              </SideContentUpper>
              <SideContentDown>
                <div>


                  <Dialog.Root>
                    <Dialog.Trigger asChild>
                      <div className="login">
                        <Button variant="login">Fazer Login</Button>
                        <SignIn size={24} color="#50B2C0" />

                      </div>

                    </Dialog.Trigger>
                    <Dialog.Portal>
                      <DialogOverlay />
                      <DialogContent>
                        <DialogTitle>Faça login para deixar sua avaliação</DialogTitle>

                        <Fieldset>
                          <Dialog.Close asChild>
                            <div onClick={handleConnectGoogle}>
                              <Image src={Google} alt="google" />
                              <h4>Entrar com Google</h4>
                            </div>
                          </Dialog.Close>
                        </Fieldset>
                        <Fieldset>
                          <Dialog.Close asChild>
                            <div onClick={handleConnectGithub}>
                              <Image src={Github} alt="github" />
                              <h4>Entrar com Github</h4>
                            </div>
                          </Dialog.Close>
                        </Fieldset>

                        <Dialog.Close asChild>
                          <IconButton aria-label="Close">
                            <X size={24} color="#8D95AF" />
                          </IconButton>
                        </Dialog.Close>
                      </DialogContent>
                    </Dialog.Portal>
                  </Dialog.Root>
                </div>
              </SideContentDown>
            </Sidebar>
            
          </Container>
        )
      }
    </>
  )
}