import { Container } from "../explore/styles"
import { BookSection, BookSectionDesc, BookSectionProfile, ContentTitle, SideContentDown, SideContentUpper, Sidebar } from "../home/styles"
import Image from "next/image";
import Logo from '../../assets/images/Logo.png'
import { Binoculars, ChartLineUp, MagnifyingGlass, SignOut, Star, User } from "@phosphor-icons/react";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import { Content, Main, Navbar, Right } from "./styles";
import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import { formatDistanceToNow, getYear } from "date-fns";
import { ptBR } from "date-fns/locale";

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
  rate: number
  created_at: Date | string
  distance: string

}

interface UserInfo {
  created_at: Date | string,
  name: string,
  avatar_url: string
  year: number | string
}

export default function Profile() {

  const [books, setBooks] = useState<Array<Book>>()
  const [profile, setProfile] = useState<UserInfo>()
  const [activeBooks, setActiveBooks] = useState<Array<Book>>()
  const [textInput, setTextInput] = useState<string>()

  const router = useRouter()
  const session = useSession()

  useEffect(() => {
    async function fetchBooks() {

      const { data } = await api.get('/books/myBooks');
      setBooks(data[0])
      setProfile(data[1])
      setActiveBooks(data[0])

    }

    fetchBooks();
  }, [])

  books?.map((item) => {
    const distance = formatDistanceToNow(new Date(item.created_at), { locale: ptBR, addSuffix: true })
    item['distance'] = distance
    console.log(books)
    console.log(profile)
  })

  if (profile != undefined) {
    let profileDistance = getYear(new Date(profile.created_at))
    profile['year'] = profileDistance
  }

  function queueBooks(text: string) {
    if (text == '') {
      setActiveBooks(books)
    } else {
      let filteredBooks = books?.filter((item) => item.book.name.includes(text))

      setActiveBooks(filteredBooks)
    }
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

  function setQueue(event: React.ChangeEvent<HTMLInputElement>) {
    event.preventDefault()
    setTextInput(event.target.value)
  }

  function handleHome() {
    router.push('/home')
  }

  async function handleLogOut() {
    await signOut({ callbackUrl: '/' })
  }

  return (
    <>
      {
        session.data && profile != undefined ? (
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
            <Content>
              <Navbar>
                <div className="upper">
                  <User size={32} color="#50B2C0" />
                  <h2>Perfil</h2>
                </div>
                <div className="lower">
                  <div className="input">
                    <input type="text" placeholder="Buscar livro ou autor" value={textInput} onChange={setQueue} />
                    <button type="submit" onClick={() => queueBooks(textInput ? textInput : '')} style={{ borderStyle: "none", background: '#0E1116', position: "absolute", marginLeft: 580, cursor: "pointer" }}>

                      <MagnifyingGlass size={20} color="#303F73" />
                    </button>
                  </div>
                </div>
              </Navbar>
              {activeBooks?.map((item) => {
                return (
                  <Main>
                    <ContentTitle>
                      <p>{item.distance}</p>
                    </ContentTitle>

                    <BookSection>
                      <BookSectionProfile>
                        <div>
                          <Image src={profile.avatar_url} alt="avatar" width={40} height={40} style={{ borderRadius: 999 }} />
                          <div>
                            <h4>{profile.name}</h4>
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
                  </Main>
                )
              })}
            </Content>
            <Right>

            </Right>

          </Container>
        ) : (
          <h1>Página não encontrada</h1>
        )
      }
    </>
  )
}