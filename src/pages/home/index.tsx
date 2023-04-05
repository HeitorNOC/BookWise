import { useSession } from "next-auth/react";
import { BookSection, BookSectionDesc, BookSectionProfile, Container, Content, ContentTitle, Right, RightBook, RightDesc, SideContentDown, SideContentUpper, Sidebar } from "./styles";
import Logo from '../../assets/images/Logo.png'
import Image from "next/image";
import { Binoculars, ChartLineUp, SignIn } from '@phosphor-icons/react'

export default function Home() {
  const session = useSession()

  const isUserLogedIn = session.status != 'unauthenticated'


  return (
    <>
      {
        isUserLogedIn ? (
          <div>
            <p>{session.data?.user.name}</p>
            <p>{session.data?.user.id}</p>
            <p>{session.data?.user.avatar_url}</p>
          </div>
        ) : (
          <Container>
            <Sidebar>
              <SideContentUpper>
                <div>
                  <Image src={Logo} alt="logo" />
                </div>
                <div className="items">
                  <div>
                    <ChartLineUp size={24} />
                    <p> Início</p>
                  </div>
                  <div>
                    <Binoculars size={24} />
                    <p>Explorar</p>
                  </div>

                </div>
              </SideContentUpper>
              <SideContentDown>
                <div>
                  <p>Fazer login </p>
                  <SignIn size={24} />
                </div>
              </SideContentDown>
            </Sidebar>
            <Content>
              <ContentTitle>

              </ContentTitle>
              <BookSection>
                <BookSectionProfile>

                </BookSectionProfile>
                <BookSectionDesc>

                </BookSectionDesc>
              </BookSection>
            </Content>
            <Right>
              <RightDesc>

              </RightDesc>
              <RightBook>

              </RightBook>
            </Right>
          </Container>
        )
      }
    </>
  )
}