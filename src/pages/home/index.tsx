import { signIn, signOut, useSession } from "next-auth/react";
import { BookSection, BookSectionDesc, BookSectionProfile, Container, Content, ContentTitle, Right, RightBook, RightDesc, SideContentDown, SideContentUpper, Sidebar, Button, DialogOverlay, DialogContent, DialogTitle, Fieldset, IconButton } from "./styles";
import Logo from '../../assets/images/Logo.png'
import Image from "next/image";
import { Binoculars, CaretRight, ChartLineUp, SignIn, SignOut, Star, User, X } from '@phosphor-icons/react'
import * as Dialog from '@radix-ui/react-dialog';
import Avatar from '../../assets/images/Avatar.png'
import Hobbit from '../../assets/images/o-hobbit.png'
//import Book from '../../assets/images/Book.png'
import Google from '../../assets/images/logos_google-icon.png'
import Github from '../../assets/images/akar-icons_github-fill.png'
import { useState, useEffect } from "react";
import { prisma } from "@/lib/prisma";
import { api } from "@/lib/axios";
import { formatDistanceToNow } from "date-fns";
//import { Book } from "@prisma/client";
import { ptBR } from 'date-fns/locale';

interface Book {
  book: {
    author: string
    cover_url: string
    created_at: string
    id: string
    name: string
    summary: string
    total_pages: number
  }
  book_id: string
  rate: number
  created_at: Date | string 
  distance: string
  user: {
    id: string
    name: string
    avatar_url: string
    created_at: Date
    email: string
    emailVerified: Date | null
  }
}



export default function Home() {
  const [books, setBooks] = useState<Array<Book>>();

  const session = useSession()

  useEffect(() => {
    async function fetchBooks() {

      const { data } = await api.get('/books');
      setBooks(data)
      
      console.log(books)
    }

    fetchBooks();
  }, []);

  books?.map((item) => {
    const distance = formatDistanceToNow(new Date(item.created_at), {locale: ptBR, addSuffix: true})
    item['distance'] = distance
  }) 
  

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
    await signOut()
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
                  <div className="selected">
                    <ChartLineUp size={24} />
                    <p> Início</p>
                  </div>
                  <div>
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
            <Content>
              <ContentTitle>
                <div>
                  <ChartLineUp size={32} />
                  <p> Início</p>
                </div>

                <p>Sua última leitura</p>
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
              <p style={{ marginBottom: 16, marginTop: 28 }}>Avaliações mais recentes</p>
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
                <Image src={Hobbit} alt="Book" width={64} height={94} />
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
        ) : (
          <Container>
            <Sidebar>
              <SideContentUpper>
                <div>
                  <Image src={Logo} alt="logo" />
                </div>
                <div className="items">
                  <div className="selected">
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
            <Content>
              <ContentTitle>
                <div>
                  <ChartLineUp size={32} />
                  <p> Início</p>
                </div>

                <p>Avaliações mais recentes</p>
              </ContentTitle>
              {books?.map((item) => {
                return (
                  <BookSection>
                    <BookSectionProfile>
                      <div>
                        <Image src={item.user.avatar_url} alt="avatar" width={40} height={40} style={{ borderRadius: 999 }} />
                        <div>
                          <h4>{item.user.name}</h4>
                          <p>{item.distance}</p>
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
                )
              })}

            </Content>
            <Right>
              <RightDesc>
                <p>Livros populares</p>
                <p className="arrow">Ver todos <CaretRight size={16} color="#8381D9" /></p>
              </RightDesc>
              <RightBook>
                <Image src={Hobbit} alt="Book" width={64} height={94} />
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
