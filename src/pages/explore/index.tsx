import React from "react"
import { ReactDOM } from "react"
import { signIn, signOut, useSession } from "next-auth/react"
import { useRouter } from "next/router"
import { SideContentDown, SideContentUpper, Sidebar, Button, DialogOverlay, DialogContent, DialogTitle, Fieldset, IconButton } from "../home/styles"
import Logo from '../../assets/images/Logo.png'
import Image from "next/image";
import { Binoculars, BookOpen, BookmarkSimple, ChartLineUp, Check, MagnifyingGlass, SignIn, SignOut, Star, StarHalf, User, X } from "@phosphor-icons/react";
import * as Dialog from '@radix-ui/react-dialog';
import Google from '../../assets/images/logos_google-icon.png'
import Github from '../../assets/images/akar-icons_github-fill.png'
import { Content, Main, NavDown, NavUpper, Navbar, Container, Category, Book, DialogMain, FieldsetBook, FieldsetRatings } from "./styles";
import { ChangeEventHandler, useEffect, useState } from "react";
import { api } from "@/lib/axios";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"



interface Books {
  name: string
  id: string
  total_pages: number
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
    categoryId: string
    category: {
      name: string
    }
  }]
}

interface Categories {
  category: {
    id: string
    name: string
  }
}

const updateRatingSchema = z.object({
  description: z.string(),
})

type UpdateRatingData = z.infer<typeof updateRatingSchema>


export default function Explore() {

  const {
    register,
    handleSubmit,
    formState: { isSubmitting }
  } = useForm<UpdateRatingData>({
    resolver: zodResolver(updateRatingSchema)
  })




  const [books, setBooks] = useState<Array<Books>>()
  const [activeBooks, setActiveBooks] = useState<Array<Books>>()
  const [categories, setCategories] = useState<Array<Categories>>()
  const [activeCategoryId, setActiveCategoryId] = useState<String>();
  const [textInput, setTextInput] = useState<string>()
  const [bookClicked, setBookClicked] = useState<Books>()
  const [starsClicked, setStarsClicked] = useState(0)
  const [inputControlled, setInputControlled] = useState<string | number | readonly string[] | undefined>("")
  const [caracterCount, setCaracterCount] = useState(inputControlled ? inputControlled?.toString.length : 0)

  async function handleUpdateRating(data: UpdateRatingData) {
    
     await api.put(`/books/ratings/${bookClicked?.id}`, {
      description: data.description,
      rate: starsClicked
    })

    router.reload() 
  }

  function handleCategoryClick(categoryId: string) {
    setActiveCategoryId(categoryId);
    if (categoryId == '0') {
      setActiveBooks(books)
      calculateMedRate()
    } else {
      let filteredBooks = books?.filter((item) => item.categories.find((category) => category.categoryId == categoryId))
      setActiveBooks(filteredBooks)
      calculateMedRate(filteredBooks)

    }

  }

  function calculateMedRate(arr?: any) {
    if (!arr) {

      const updatedBooks = books?.map(book => {
        const totalRates = book.ratings.reduce((accumulator, current) => accumulator + current.rate, 0);
        const medRate = totalRates / book.ratings.length;

        return {
          ...book,
          medRate
        };
      });

      setActiveBooks(updatedBooks);
    } else {
      const updatedBooks = arr.map((book: any) => {
        const totalRates = book.ratings.reduce((accumulator: any, current: any) => accumulator + current.rate, 0);
        const medRate = totalRates / book.ratings.length;

        return {
          ...book,
          medRate
        }
      })

      setActiveBooks(updatedBooks)
    }
  }


  const router = useRouter()
  const session = useSession()


  useEffect(() => {
    async function fetchBooks() {

      const { data } = await api.get('/books/explore');
      setBooks(data[0])
      setActiveBooks(data[0])
      setCategories(data[1])
      setCategories(prevCategories => [{ category: { id: "0", name: "Tudo" } }, ...prevCategories ?? []])
      setActiveCategoryId("0")
      calculateMedRate()


    }

    fetchBooks();
    


  }, [books?.length])

  


  function queueBooks(text: string) {
    if (text == '') {
      setActiveBooks(books)
      setActiveCategoryId("0")
      calculateMedRate()
    } else {
      let filteredBooks = books?.filter((item) => item.name.includes(text))
      setActiveBooks(filteredBooks)
      calculateMedRate(filteredBooks)
    }
  }

  function setQueue(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault()
    setTextInput(event.target.value)
  }


  function countStars(rate: Number | number, size?: number) {
    switch (true) {
      case rate == 0:
        return [<Star key={1} size={size ? size : 16} color="#8381D9" />, <Star key={2} size={size ? size : 16} color="#8381D9" />, <Star key={3} size={size ? size : 16} color="#8381D9" />, <Star key={4} size={size ? size : 16} color="#8381D9" />, <Star key={5} size={size ? size : 16} color="#8381D9" />]
      case rate == 0.5:
        return [<StarHalf size={size ? size : 16} key={1} color="#8381D9" />, <Star size={size ? size : 16} key={2} color="#8381D9" />, <Star size={size ? size : 16} key={3} color="#8381D9" />, <Star size={size ? size : 16} key={4} color="#8381D9" />, <Star size={size ? size : 16} key={5} color="#8381D9" />]
      case rate == 1:
        return [<Star size={size ? size : 16} key={1} weight="fill" color="#8381D9" />, <Star size={size ? size : 16} key={2} color="#8381D9" />, <Star size={size ? size : 16} key={3} color="#8381D9" />, <Star size={size ? size : 16} key={4} color="#8381D9" />, <Star size={size ? size : 16} key={5} color="#8381D9" />]
      case rate == 1.5:
        return [<Star size={size ? size : 16} key={1} weight="fill" color="#8381D9" />, <StarHalf size={size ? size : 16} key={2} color="#8381D9" />, <Star size={size ? size : 16} key={3} color="#8381D9" />, <Star size={size ? size : 16} key={4} color="#8381D9" />, <Star size={size ? size : 16} key={5} color="#8381D9" />]
      case rate == 2:
        return [<Star size={size ? size : 16} key={1} weight="fill" color="#8381D9" />, <Star size={size ? size : 16} key={2} weight="fill" color="#8381D9" />, <Star size={size ? size : 16} key={3} color="#8381D9" />, <Star size={size ? size : 16} key={4} color="#8381D9" />, <Star size={size ? size : 16} key={5} color="#8381D9" />]
      case rate == 2.5:
        return [<Star size={size ? size : 16} key={1} weight="fill" color="#8381D9" />, <Star size={size ? size : 16} key={2} weight="fill" color="#8381D9" />, <StarHalf size={size ? size : 16} key={3} color="#8381D9" />, <Star size={size ? size : 16} key={4} color="#8381D9" />, <Star size={size ? size : 16} key={5} color="#8381D9" />]
      case rate == 3:
        return [<Star size={size ? size : 16} key={1} weight="fill" color="#8381D9" />, <Star size={size ? size : 16} key={2} weight="fill" color="#8381D9" />, <Star size={size ? size : 16} key={3} weight="fill" color="#8381D9" />, <Star size={size ? size : 16} key={4} color="#8381D9" />, <Star size={size ? size : 16} key={5} color="#8381D9" />]
      case rate == 3.5:
        return [<Star size={size ? size : 16} key={1} weight="fill" color="#8381D9" />, <Star size={size ? size : 16} key={2} weight="fill" color="#8381D9" />, <Star size={size ? size : 16} key={3} weight="fill" color="#8381D9" />, <StarHalf size={size ? size : 16} key={4} color="#8381D9" />, <Star size={size ? size : 16} key={5} color="#8381D9" />]
      case rate == 4:
        return [<Star size={size ? size : 16} key={1} weight="fill" color="#8381D9" />, <Star size={size ? size : 16} key={2} weight="fill" color="#8381D9" />, <Star size={size ? size : 16} key={3} weight="fill" color="#8381D9" />, <Star size={size ? size : 16} key={4} weight="fill" color="#8381D9" />, <Star size={size ? size : 16} key={5} color="#8381D9" />]
      case rate == 4.5:
        return [<Star size={size ? size : 16} key={1} weight="fill" color="#8381D9" />, <Star size={size ? size : 16} key={2} weight="fill" color="#8381D9" />, <Star size={size ? size : 16} key={3} weight="fill" color="#8381D9" />, <Star size={size ? size : 16} key={4} weight="fill" color="#8381D9" />, <StarHalf size={size ? size : 16} key={5} color="#8381D9" />]
      case rate == 5:
        return [<Star size={size ? size : 16} key={1} weight="fill" color="#8381D9" />, <Star size={size ? size : 16} key={2} weight="fill" color="#8381D9" />, <Star size={size ? size : 16} key={3} weight="fill" color="#8381D9" />, <Star size={size ? size : 16} key={4} weight="fill" color="#8381D9" />, <Star size={size ? size : 16} key={5} weight="fill" color="#8381D9" />]
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

  let userLoged = session.data?.user ? true : false

  const onSubmit = (data:any, e:any) => console.log(data, e);
  const onError = (errors:any, e:any) => console.log(errors, e);

  return (
    <>
      {
        userLoged ? (
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
                  <Image src={session.data?.user.avatar_url || '/'} alt="avatar" width={32} height={32} style={{ borderRadius: 999 }} />
                  <p>{session.data?.user.name.split(' ', 1)}</p>
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
                    <button type="submit" onClick={() => queueBooks(textInput ? textInput : '')} style={{ borderStyle: "none", background: '#0E11size ? size : 16', position: "absolute", marginLeft: 390, cursor: "pointer" }}>

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
                      <Dialog.Root key={item.name}>
                        <Dialog.Trigger asChild>



                          <Book onClick={() => setBookClicked(item)} key={item.name}>

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
                                  countStars(item.medRate)?.map((star,) => {
                                    return (
                                      star
                                    )
                                  })

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
                                        countStars(bookClicked?.medRate ?? 0, 20)?.map((star) => (
                                          star
                                        ))

                                      }
                                      <p>{item.ratings.length} avaliações</p>
                                    </div>
                                  </div>
                                </div>
                                <div className="lower">
                                  <div className="lowerDesc">
                                    <BookmarkSimple size={24} color="#50B2C0" />
                                    <div>
                                      <p>Categoria</p>
                                      <div className="catDesc" style={{ display: "flex", gap: 4 }}>

                                        {item.categories.map((e, i) => {
                                          return (
                                            <h4 key={i}>
                                              {`${i == 0 ? `${e.category.name}, ` : `${e.category.name}`}`}
                                            </h4>
                                          )
                                        })}
                                      </div>
                                    </div>

                                  </div>
                                  <div className="lowerDesc">
                                    <BookOpen size={24} color="#50B2C0" />
                                    <div>
                                      <p>Páginas</p>
                                      <h4>{bookClicked?.total_pages ? bookClicked.total_pages : 0}</h4>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </FieldsetBook>
                            <p>Avaliações</p>
                            <FieldsetRatings >
                              <div className="ratingsDesc">
                              </div>
                              <div className="yourAvaliation">
                                <div className="upper">
                                  <div className="profile">
                                    <Image src={session.data?.user.avatar_url || '/'} alt="avatar" width={40} height={40} style={{ borderRadius: 999 }} />
                                    <h3>{session.data?.user.name}</h3>
                                  </div>
                                  <div className="stars">
                                    {
                                      countStars(starsClicked, 28)?.map((star, i) => {

                                        return (
                                          <div key={i} className="star" style={{ cursor: "pointer" }} onClick={() => setStarsClicked(i + 1)}>
                                            {star}
                                          </div>
                                        )
                                      })
                                    }
                                  </div>
                                </div>
                                <form onSubmit={handleSubmit(handleUpdateRating)}>

                                  <div className="form">
                                    <input {...register('description')} type="text" value={inputControlled} onChange={e => { setCaracterCount(e.target.value.length); setInputControlled(e.target.value) }} placeholder="Escreva sua avaliação" />
                                    <span>{caracterCount}/450</span>
                                  </div>
                                  <div className="lower">
                                    <div className="icon">

                                      <X size={24} color="#8381D9" />
                                    </div>
                                    <button type="submit" className="icon" disabled={isSubmitting}>

                                      <Check size={24} color="#50B2C0" />
                                    </button>
                                  </div>
                                </form>

                              </div>
                              
                              <div className="otherAvaliations" >
                                {
                                  item.ratings.map((rating) => {
                                    return (
                                      <div key={rating.id} className="otherAvaliation">
                                        <div style={{ width: 629 + 100, height: 12, backgroundColor: "#0E1116", marginLeft: "-50px", marginBottom: 20}}></div>
                                        <div className="upper">
                                          <div className="profile">
                                            <Image src={rating.user.avatar_url} alt="avatar" width={40} height={40} style={{ borderRadius: 999 }} />
                                            <div className="upperDesc">
                                              <h3>{rating.user.name}</h3>
                                              <p>{formatDistanceToNow(new Date(rating.created_at), { locale: ptBR, addSuffix: true })}</p>
                                            </div>
                                          </div>
                                          <div className="stars">
                                            {
                                              countStars(rating.rate, 28)?.map((star, i) => {

                                                return (
                                                  star
                                                )
                                              })
                                            }
                                          </div>
                                        </div>


                                        <div className="form">
                                          <p>{rating.description}</p>

                                        </div>



                                        
                                      </div>
                                    )
                                  })
                                }
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
                      <button type="submit" onClick={() => queueBooks(textInput ? textInput : '')} style={{ borderStyle: "none", background: '#0E11size ? size : 16', position: "absolute", marginLeft: 390, cursor: "pointer" }}>

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


