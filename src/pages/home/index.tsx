import { useSession } from "next-auth/react";
import { BookSection, BookSectionDesc, BookSectionProfile, Container, Content, ContentTitle, Right, RightBook, RightDesc, SideContentDown, SideContentUpper, Sidebar, Button, DialogOverlay, DialogContent, DialogTitle, DialogDescription, Fieldset, Label, Input, Flex, IconButton } from "./styles";
import Logo from '../../assets/images/Logo.png'
import Image from "next/image";
import { Binoculars, CaretRight, ChartLineUp, SignIn, Star } from '@phosphor-icons/react'
import * as Dialog from '@radix-ui/react-dialog';
import { Cross2Icon } from '@radix-ui/react-icons';
import Avatar from '../../assets/images/Avatar.png'
import Hobbit from '../../assets/images/o-hobbit.png'
import Book from '../../assets/images/Book.png'

export default function Home() {
  const session = useSession()

  const isUserLogedIn = session.status != 'unauthenticated'

  function handleLogin() {

  }


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


                  <Dialog.Root>
                    <Dialog.Trigger asChild>
                      <div className="login">
                        <Button variant="login">Fazer Login</Button>
                        <SignIn size={24} color="#50B2C0"/>
                        
                      </div>

                    </Dialog.Trigger>
                    <Dialog.Portal>
                      <DialogOverlay />
                      <DialogContent>
                        <DialogTitle>Fazer Login</DialogTitle>
                        <DialogDescription>
                          Make changes to your profile here. Click save when you're done.
                        </DialogDescription>
                        <Fieldset>
                          <Label htmlFor="name">Name</Label>
                          <Input id="name" defaultValue="Pedro Duarte" />
                        </Fieldset>
                        <Fieldset>
                          <Label htmlFor="username">Username</Label>
                          <Input id="username" defaultValue="@peduarte" />
                        </Fieldset>
                        <Flex css={{ marginTop: 25, justifyContent: 'flex-end' }}>
                          <Dialog.Close asChild>
                            <Button variant="green">Save changes</Button>
                          </Dialog.Close>
                        </Flex>
                        <Dialog.Close asChild>
                          <IconButton aria-label="Close">
                            <Cross2Icon />
                          </IconButton>
                        </Dialog.Close>
                      </DialogContent>
                    </Dialog.Portal>
                  </Dialog.Root>
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
                    <Star size={16} weight="fill" color="#8381D9" />
                    <Star size={16} weight="fill" color="#8381D9" />
                    <Star size={16} weight="fill" color="#8381D9" />
                    <Star size={16} weight="fill" color="#8381D9" />
                    <Star size={16} weight="fill" color="#8381D9" />
                  </div>

                </BookSectionProfile>
                <BookSectionDesc>
                  <Image src={Hobbit} alt="book" width={100} height={152} />
                  <div>
                    <div>
                      <h4>O Hobbit</h4>
                      <p>J.R.R. Tolkien</p>
                    </div>
                    <p>Semper et sapien proin vitae nisi. Feugiat neque integer donec et aenean posuere amet ultrices. Cras fermentum id pulvinar varius leo a in. Amet libero pharetra nunc elementum fringilla velit ipsum. Sed vulputate massa velit nibh...</p>
                  </div>
                </BookSectionDesc>
              </BookSection>
            </Content>
            <Right>
              <RightDesc>
                <p>Livros populares</p>
                <p className="arrow">Ver todos <CaretRight size={16} color="#8381D9" /></p>
              </RightDesc>
              <RightBook>
                <Image src={Book} alt="Book" width={64} height={94} />
                <div className="flex">
                  <div>
                    <h4>A revolução dos bichos</h4>
                    <p>George Orwell</p>
                  </div>
                  <div className="star">
                    <Star size={16} weight="fill" color="#8381D9" />
                    <Star size={16} weight="fill" color="#8381D9" />
                    <Star size={16} weight="fill" color="#8381D9" />
                    <Star size={16} weight="fill" color="#8381D9" />
                    <Star size={16} weight="fill" color="#8381D9" />
                  </div>
                </div>
              </RightBook>
            </Right>
          </Container>
        )
      }
    </>
  )
}