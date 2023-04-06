import { useSession } from "next-auth/react";
import { BookSection, BookSectionDesc, BookSectionProfile, Container, Content, ContentTitle, Right, RightBook, RightDesc, SideContentDown, SideContentUpper, Sidebar } from "./styles";
import Logo from '../../assets/images/Logo.png'
import Image from "next/image";
import { Binoculars, ChartLineUp, SignIn, Star } from '@phosphor-icons/react'
import Avatar from '../../assets/images/Avatar.png'
import Hobbit from '../../assets/images/o-hobbit.png'

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
                <div>
                  <ChartLineUp size={32} />
                  <p> Início</p>
                </div>

                <p>Avaliações mais recentes</p>
              </ContentTitle>
              <BookSection>
                <BookSectionProfile>
                  <div>
                    <Image src={Avatar} alt="avatar" />
                    <div>
                      <h4>Jaxson Dias</h4>
                      <p>Hoje</p>
                    </div>
                  </div>
                  <div className="star">
                    <Star size={24} weight="fill" />
                    <Star size={24} weight="fill" />
                    <Star size={24} weight="fill" />
                    <Star size={24} weight="fill" />
                    <Star size={24} weight="fill" />
                  </div>

                </BookSectionProfile>
                <BookSectionDesc>
                  <Image src={Hobbit} alt="book" width={100} height={152}/>
                  <div>
                    <h4>O Hobbit</h4>
                    <p><span>J.R.R. Tolkien</span></p>
                    <p>Semper et sapien proin vitae nisi. Feugiat neque integer donec et aenean posuere amet ultrices. Cras fermentum id pulvinar varius leo a in. Amet libero pharetra nunc elementum fringilla velit ipsum. Sed vulputate massa velit nibh...</p>
                  </div>
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