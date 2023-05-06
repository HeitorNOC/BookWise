import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { SideContentDown, SideContentUpper, Sidebar, Button, DialogOverlay, DialogContent, DialogTitle, Fieldset, IconButton } from "../home/styles"
import Logo from '../../assets/images/Logo.png'
import Image from "next/image";
import { Binoculars, ChartLineUp, MagnifyingGlass, SignIn, SignOut, Star, StarHalf, User, X } from "@phosphor-icons/react";
import * as Dialog from '@radix-ui/react-dialog';
import Google from '../../assets/images/logos_google-icon.png'
import Github from '../../assets/images/akar-icons_github-fill.png'
import { Content, Main, NavDown, NavUpper, Navbar, Container, Category, Book, DialogMain, FieldsetBook, FieldsetRatings } from "./styles";
import { useEffect, useState } from "react";
import { api } from "@/lib/axios";



interface Books {
  name: string
  ratings: [{
    id: string
    rate: number
    description: string
    created_at: string
    user: {
      avatar_url: string
      created_at: string | Date
      email: string
      emailVerified: string | null
      id: string
      name: string
    }
  }]
  medRate: number
  cover_url: string
  author: string
  categories: [{
    bookId: string
    categoryId: string
  }]
}

interface Categories {
  category: {
    id: string
    name: string
  }
}



export default function Explore() {



  const [books, setBooks] = useState<Array<Books>>()
  const [activeBooks, setActiveBooks] = useState<Array<Books>>()
  const [categories, setCategories] = useState<Array<Categories>>()
  const [activeCategoryId, setActiveCategoryId] = useState<String>();
  const [textInput, setTextInput] = useState<string>()
  const [bookClicked, setBookClicked] = useState<Books>()


  function handleCategoryClick(categoryId: string) {
    setActiveCategoryId(categoryId);
    if (categoryId == '0') {
      setActiveBooks(books)
    } else {
      let filteredBooks = books?.filter((item) => item.categories.find((category) => category.categoryId == categoryId))
      setActiveBooks(filteredBooks)

    }

  }

  function calculateMedRate() {
    const updatedBooks = books?.map(book => {
      const totalRates = book.ratings.reduce((accumulator, current) => accumulator + current.rate, 0);
      const medRate = totalRates / book.ratings.length;
  
      return {
        ...book,
        medRate
      };
    });
    console.log()
    setActiveBooks(updatedBooks);
  }

  const router = useRouter()
  const session = useSession()

  useEffect(() => {
    async function fetchBooks() {

      const { data } = await api.get('/books/explore');
      setBooks(data[0])
      setCategories(data[1])
      setCategories(prevCategories => [{ category: { id: "0", name: "Tudo" } }, ...prevCategories ?? []])
      setActiveCategoryId("0")
      calculateMedRate()
      
    }

    fetchBooks();


  }, [])



  function queueBooks(text: string) {
    if (text == '') {
      setActiveBooks(books)
    } else {
      let filteredBooks = books?.filter((item) => item.name.includes(text))

      setActiveBooks(filteredBooks)
    }
  }

  function setQueue(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault()
    setTextInput(event.target.value)
  }


  function countStars(rate: Number) {
    switch (true) {
      case rate == 0:
        return [<Star size={16} color="#8381D9" />, <Star size={16} color="#8381D9" />, <Star size={16} color="#8381D9" />, <Star size={16} color="#8381D9" />, <Star size={16} color="#8381D9" />]
      case rate == 0.5:
        return [<StarHalf size={16} color="#8381D9" />, <Star size={16} color="#8381D9" />, <Star size={16} color="#8381D9" />, <Star size={16} color="#8381D9" />, <Star size={16} color="#8381D9" />]
      case rate == 1:
        return [<Star size={16} weight="fill" color="#8381D9" />, <Star size={16} color="#8381D9" />, <Star size={16} color="#8381D9" />, <Star size={16} color="#8381D9" />, <Star size={16} color="#8381D9" />]
      case rate == 1.5:
        return [<Star size={16} weight="fill" color="#8381D9" />, <StarHalf size={16} color="#8381D9" />, <Star size={16} color="#8381D9" />, <Star size={16} color="#8381D9" />, <Star size={16} color="#8381D9" />]
      case rate == 2:
        return [<Star size={16} weight="fill" color="#8381D9" />, <Star size={16} weight="fill" color="#8381D9" />, <Star size={16} color="#8381D9" />, <Star size={16} color="#8381D9" />, <Star size={16} color="#8381D9" />]
      case rate == 2.5:
        return [<Star size={16} weight="fill" color="#8381D9" />, <Star size={16} weight="fill" color="#8381D9" />, <StarHalf size={16} color="#8381D9" />, <Star size={16} color="#8381D9" />, <Star size={16} color="#8381D9" />]
      case rate == 3:
        return [<Star size={16} weight="fill" color="#8381D9" />, <Star size={16} weight="fill" color="#8381D9" />, <Star size={16} weight="fill" color="#8381D9" />, <Star size={16} color="#8381D9" />, <Star size={16} color="#8381D9" />]
      case rate == 3.5:
        return [<Star size={16} weight="fill" color="#8381D9" />, <Star size={16} weight="fill" color="#8381D9" />, <Star size={16} weight="fill" color="#8381D9" />, <StarHalf size={16} color="#8381D9" />, <Star size={16} color="#8381D9" />]
      case rate == 4:
        return [<Star size={16} weight="fill" color="#8381D9" />, <Star size={16} weight="fill" color="#8381D9" />, <Star size={16} weight="fill" color="#8381D9" />, <Star size={16} weight="fill" color="#8381D9" />, <Star size={16} color="#8381D9" />]
      case rate == 4.5:
        return [<Star size={16} weight="fill" color="#8381D9" />, <Star size={16} weight="fill" color="#8381D9" />, <Star size={16} weight="fill" color="#8381D9" />, <Star size={16} weight="fill" color="#8381D9" />, <StarHalf size={16} color="#8381D9" />]
      case rate == 5:
        return [<Star size={16} weight="fill" color="#8381D9" />, <Star size={16} weight="fill" color="#8381D9" />, <Star size={16} weight="fill" color="#8381D9" />, <Star size={16} weight="fill" color="#8381D9" />, <Star size={16} weight="fill" color="#8381D9" />]
    }
  }



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
    await signOut({ callbackUrl: '/' })
  }

  function handleProfile() {
    router.push('/profile')
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
              <Navbar>


                <NavUpper>
                  <div className="desc">
                    <Binoculars size={32} color="#50B2C0" />
                    <h2>Explorar</h2>
                  </div>
                  <div className="input">
                    <input type="text" placeholder="Buscar livro ou autor" value={textInput} onChange={setQueue} />
                    <button type="submit" onClick={() => queueBooks(textInput ? textInput : '')} style={{ borderStyle: "none", background: '#0E1116', position: "absolute", marginLeft: 390, cursor: "pointer" }}>

                      <MagnifyingGlass size={20} color="#303F73" />
                    </button>
                  </div>
                </NavUpper>
                <NavDown>
                  {
                    categories?.map(({ category }) => {
                      return (
                        <Category
                          key={category.id}
                          active={category.id == activeCategoryId ? true : false}
                          onClick={() => handleCategoryClick(category.id)}
                        >
                          <p>{category.name}</p>
                        </Category>
                      )
                    })
                  }
                </NavDown>

              </Navbar>
              <Main>
                {
                  activeBooks?.map((item) => {




                    return (
                      <Dialog.Root>
                        <Dialog.Trigger asChild>



                          <Book onClick={() => setBookClicked(item)}>

                            <div className="left">
                              <Image src={'/' + item.cover_url} alt="book" width={100} height={152} />
                            </div>
                            <div className="right">
                              <div className="upper">
                                <h4>{item.name}</h4>
                                <p>{item.author}</p>
                              </div>
                              <div className="lower">
                                {
                                  countStars(Math.floor(item.medRate))?.map((star) => (
                                    star
                                  ))

                                }
                              </div>
                            </div>
                          </Book>
                        </Dialog.Trigger>
                        <Dialog.Portal>
                          <DialogOverlay />
                          <DialogMain>


                            <FieldsetBook>
                              <div className="bookContainer">
                                <div className="upper">
                                  <div className="left">
                                    <Image src={'/' + bookClicked?.cover_url} alt="book" width={172} height={242} />
                                  </div>
                                  <div className="right">
                                    <div className="topDesc">
                                      <h3>{bookClicked?.name}</h3>
                                      <p>{bookClicked?.author}</p>
                                    </div>
                                    <div className="bottomDesc">
                                      {
                                        countStars(Math.floor(bookClicked?.medRate || 0))?.map((star) => (
                                          star
                                        ))

                                      }
                                    </div>
                                  </div>
                                </div>
                                <div className="lower">
                                  <div className="leftDesc"></div>
                                  <div className="rightDesc"></div>
                                </div>
                              </div>
                            </FieldsetBook>
                            <FieldsetRatings>
                              <div className="yourAvaliation">

                              </div>
                              <div className="otherAvaliations">

                              </div>
                            </FieldsetRatings>

                            <Dialog.Close asChild>
                              <IconButton aria-label="Close">
                                <X size={24} color="#8D95AF" />
                              </IconButton>
                            </Dialog.Close>
                          </DialogMain>
                        </Dialog.Portal>
                      </Dialog.Root>
                    )



                  })
                }
              </Main>

            </Content>

          </Container>
        ) : (
          <Container>
            <Dialog.Root>
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
                  </div>
                </SideContentDown>
              </Sidebar>
              <Content>
                <Navbar>


                  <NavUpper>
                    <div className="desc">
                      <Binoculars size={32} color="#50B2C0" />
                      <h2>Explorar</h2>
                    </div>
                    <div className="input">
                      <input type="text" placeholder="Buscar livro ou autor" value={textInput} onChange={setQueue} />
                      <button type="submit" onClick={() => queueBooks(textInput ? textInput : '')} style={{ borderStyle: "none", background: '#0E1116', position: "absolute", marginLeft: 390, cursor: "pointer" }}>

                        <MagnifyingGlass size={20} color="#303F73" />
                      </button>
                    </div>
                  </NavUpper>
                  <NavDown>
                    {
                      categories?.map(({ category }) => {
                        return (
                          <Category
                            key={category.id}
                            active={category.id == activeCategoryId ? true : false}
                            onClick={() => handleCategoryClick(category.id)}
                          >
                            <p>{category.name}</p>
                          </Category>
                        )
                      })
                    }
                  </NavDown>

                </Navbar>
                <Main>
                  {
                    activeBooks?.map((item) => {




                      return (
                        <Dialog.Trigger asChild>

                          <Book >

                            <div className="left">
                              <Image src={'/' + item.cover_url} alt="book" width={100} height={152} />
                            </div>
                            <div className="right">
                              <div className="upper">
                                <h4>{item.name}</h4>
                                <p>{item.author}</p>
                              </div>
                              <div className="lower">
                                {
                                  countStars(Math.floor(item.ratings[0].rate))?.map((star) => (
                                    star
                                  ))

                                }
                              </div>
                            </div>
                          </Book>
                        </Dialog.Trigger>
                      )



                    })
                  }
                </Main>
              </Content>
            </Dialog.Root>

          </Container>
        )
      }
    </>
  )
}