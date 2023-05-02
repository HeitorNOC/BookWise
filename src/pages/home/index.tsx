import { signIn, signOut, useSession } from "next-auth/react";
import { BookSection, BookSectionDesc, BookSectionProfile, Container, Content, ContentTitle, Right, RightBook, RightDesc, SideContentDown, SideContentUpper, Sidebar, Button, DialogOverlay, DialogContent, DialogTitle, Fieldset, IconButton } from "./styles";
import Logo from '../../assets/images/Logo.png'
import Image from "next/image";
import { Binoculars, CaretRight, ChartLineUp, SignIn, SignOut, Star, User, X } from '@phosphor-icons/react'
import * as Dialog from '@radix-ui/react-dialog';


import Google from '../../assets/images/logos_google-icon.png'
import Github from '../../assets/images/akar-icons_github-fill.png'
import { useState, useEffect } from "react";

import { api } from "@/lib/axios";
import { formatDistanceToNow } from "date-fns";

import { ptBR } from 'date-fns/locale';
import { useRouter } from "next/router";

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
    created_at: Date | string
    email: string
    emailVerified: Date | null | string
  }
}

interface PopBooks {
  name: string
  ratings: {
    id: string
    rate: number
    description: string
    created_at: string
    book_id: string
    user_id: string
  }
  cover_url: string
  author: string

}

interface LastBookRatingByUserLoged {
  book: {
    author: string
    cover_url: string
    id: string
    name: string
    summary: string
    total_pages: number
    created_at: string | Date
  }
  distance: string
  created_at: string | Date
  rate: number
  user: {
    id: string
    name: string
    avatar_url: string
    created_at: Date | string
    email: string
    emailVerified: Date | null | string
  }
}



export default function Home() {
  const [books, setBooks] = useState<Array<Book>>();
  const [popBooks, setPopBooks] = useState<Array<PopBooks>>();
  const [lastBookRating, setLastBookRating] = useState<Array<LastBookRatingByUserLoged>>()

  const router = useRouter()
  const session = useSession()

  useEffect(() => {
    async function fetchBooks() {

      const { data } = await api.get('/books');
      setBooks(data[0])
      setPopBooks(data[1])
      if (data[2] != undefined || data[2] != null) {

        setLastBookRating(data[2])
      }
    }

    fetchBooks();
  }, []);

  books?.map((item) => {
    const distance = formatDistanceToNow(new Date(item.created_at), { locale: ptBR, addSuffix: true })
    item['distance'] = distance
  })

  if (lastBookRating != undefined) {
    lastBookRating?.map((item) => {
      const distance = formatDistanceToNow(new Date(item.created_at), { locale: ptBR, addSuffix: true })
      item['distance'] = distance
    })
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

  function handleExplore() {
    router.push('/explore')
  }

  function handleProfile() {
    router.push('/profile')
  }


  function countStars(rate: Number) {
    switch (true) {
      case rate == 0:
        return [<Star size={16} color="#8381D9" />, <Star size={16} color="#8381D9" />, <Star size={16} color="#8381D9" />, <Star size={16} color="#8381D9" />, <Star size={16} color="#8381D9" />]
      case rate == 1:
        return [<Star size={16} weight="fill" color="#8381D9" />, <Star size={16} color="#8381D9" />, <Star size={16} color="#8381D9" />, <Star size={16} color="#8381D9" />, <Star size={16} color="#8381D9" />]
      case rate == 2:
        return [<Star size={16} weight="fill" color="#8381D9" />, <Star size={16} weight="fill" color="#8381D9" />, <Star size={16} color="#8381D9" />, <Star size={16} color="#8381D9" />, <Star size={16} color="#8381D9" />]
      case rate == 3:
        return [<Star size={16} weight="fill" color="#8381D9" />, <Star size={16} weight="fill" color="#8381D9" />, <Star size={16} weight="fill" color="#8381D9" />, <Star size={16} color="#8381D9" />, <Star size={16} color="#8381D9" />]
      case rate == 4:
        return [<Star size={16} weight="fill" color="#8381D9" />, <Star size={16} weight="fill" color="#8381D9" />, <Star size={16} weight="fill" color="#8381D9" />, <Star size={16} weight="fill" color="#8381D9" />, <Star size={16} color="#8381D9" />]
      case rate == 5:
        return [<Star size={16} weight="fill" color="#8381D9" />, <Star size={16} weight="fill" color="#8381D9" />, <Star size={16} weight="fill" color="#8381D9" />, <Star size={16} weight="fill" color="#8381D9" />, <Star size={16} weight="fill" color="#8381D9" />]
    }
  }



  return (
    <>
      {
        session.data && lastBookRating != undefined ? (
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
                  <div onClick={handleExplore}>
                    <Binoculars size={24} />
                    <p>Explorar</p>
                  </div>
                  <div onClick={handleProfile}>
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
              <BookSection style={{ background: '#252D4A' }}>
                <BookSectionProfile>
                  <div>
                    <Image src={lastBookRating[0].user.avatar_url} alt="avatar" width={40} height={40} style={{ borderRadius: 999 }} />
                    <div>
                      <h4>{lastBookRating[0].user.name}</h4>
                      <p>{lastBookRating[0].distance}</p>
                    </div>
                  </div>
                  <div className="star">
                    {
                      countStars(Math.floor(lastBookRating[0].rate))?.map((star) => (
                        star
                      ))

                    }
                  </div>

                </BookSectionProfile>
                <BookSectionDesc>
                  <Image src={'/' + lastBookRating[0].book.cover_url} alt="book" width={100} height={152} />
                  <div>
                    <div>
                      <h4>{lastBookRating[0].book.name}</h4>
                      <p>{lastBookRating[0].book.author}</p>
                    </div>
                    <p>{lastBookRating[0].book.summary}</p>
                  </div>
                </BookSectionDesc>
              </BookSection>
              <p style={{ marginBottom: 16, marginTop: 28 }}>Avaliações mais recentes</p>

              {
                books?.map((item, index) => {
                  if (index <= 2) {
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
                            {
                              countStars(Math.floor(item.rate))?.map((star) => (
                                star
                              ))

                            }
                          </div>

                        </BookSectionProfile>
                        <BookSectionDesc>
                          <Image src={'/' + item.book.cover_url} alt="book" width={100} height={152} />
                          <div>
                            <div>
                              <h4>{item.book.name}</h4>
                              <p>{item.book.author}</p>
                            </div>
                            <p>{item.book.summary}</p>
                          </div>
                        </BookSectionDesc>
                      </BookSection>
                    )
                  }

                })
              }

            </Content>
            <Right>
              <RightDesc>
                <p>Livros populares</p>
                <p className="arrow">Ver todos <CaretRight size={16} color="#8381D9" /></p>
              </RightDesc>
              {
                popBooks?.map((actualItem) => {
                  return (
                    <RightBook>
                      <Image src={'/' + actualItem.cover_url} alt="Book" width={64} height={94} />
                      <div className="flex">
                        <div>
                          <h4>{actualItem.name}</h4>
                          <p>{actualItem.author}</p>
                        </div>
                        <div className="star">
                          {
                            countStars(Math.floor(actualItem.ratings.rate))?.map((star) => (
                              star
                            ))

                          }
                        </div>
                      </div>
                    </RightBook>
                  )
                })
              }
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
                  <div onClick={handleExplore}>
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

                        {
                          countStars(Math.floor(item.rate))?.map((star) => (
                            star
                          ))

                        }
                      </div>

                    </BookSectionProfile>
                    <BookSectionDesc>
                      <Image src={'/' + item.book.cover_url} alt="book" width={100} height={152} />
                      <div>
                        <div>
                          <h4>{item.book.name}</h4>
                          <p>{item.book.author}</p>
                        </div>
                        <p>{item.book.summary}</p>
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
              {
                popBooks?.map((actualItem) => {
                  return (
                    <RightBook>
                      <Image src={'/' + actualItem.cover_url} alt="Book" width={64} height={94} />
                      <div className="flex">
                        <div>
                          <h4>{actualItem.name}</h4>
                          <p>{actualItem.author}</p>
                        </div>
                        <div className="star">
                          {
                            countStars(Math.floor(actualItem.ratings.rate))?.map((star) => (
                              star
                            ))

                          }
                        </div>
                      </div>
                    </RightBook>
                  )
                })
              }

            </Right>
          </Container>
        )
      }
    </>
  )
}
