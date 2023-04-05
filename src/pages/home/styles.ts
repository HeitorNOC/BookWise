import { styled } from "@stitches/react";

export const Container = styled('div', {
  display: "flex",
  alignItems: "center",
  overflow: "hidden"
})

export const Sidebar = styled('div', {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  height: '100vh',

  marginTop: 20,
  marginBottom: 16,
  marginLeft: 20,
  borderRadius: 12,
  paddingTop: 40,
  paddingBottom: 24,
  paddingLeft: 52,
  paddingRight: 52,

  background: "$gray700"
})

export const Content = styled('div', {

})

export const Right = styled('div', {

})

export const SideContentUpper = styled('div', {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 64,

  '.items': {
    div: {
      display: "flex",
      alignItems: "center",
      padding: '8px 0px',
      gap: 12,
      color: "$gray400"


    }
  }
})

export const SideContentDown = styled('div', {
  div: {
    display: "flex",
    
    padding: 4,
    gap: 12,

    color: "$green100",

    p: {
      fontWeight: 700,
      fontSize: 16,
      lineHeight: '160%',
      color: "$gray200"
    }
  }

})

export const ContentTitle = styled('div', {

})

export const BookSection = styled('div', {

})

export const BookSectionProfile = styled('div', {

})

export const BookSectionDesc = styled('div', {

})

export const RightDesc = styled('div', {

})

export const RightBook = styled('div', {

})