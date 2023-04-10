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
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  
  height: '100vh',
  paddingTop: 72,
  paddingLeft: 96,
  paddingRight: 64
})

export const Right = styled('div', {

})

export const SideContentUpper = styled('div', {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: 64,

  '.items': {
    display: "flex",
    flexDirection: "column",
    gap: 16,

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
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  marginBottom: 16,
  
  div: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 40,
    gap: 12,

    color: "$green100",

    p: {
      fontSize: 24,
      color: "$white",
      fontWeight: 700,
      
    }
  }
})

export const BookSection = styled('div', {
  display: "flex",
  
  flexDirection: "column",
  padding: 24,
  background: "$gray700",
  borderRadius: 8,

  maxWidth: 608,

  marginBottom: 12
})

export const BookSectionProfile = styled('div', {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: 32,

  div: {
    display: 'flex',
    alignItems: "center",
    justifyContent: "center",

    div: {
      display: 'grid',
      alignItems: "center",
      justifyContent: "center",
      marginLeft: 16,
      
      h4: {
        color: "$gray100",
        fontSize: 16,
        fontWeight: 400
      },

      p: {
        fontSize: 14,
        color: "$gray400"
      }
    }
  }
})

export const BookSectionDesc = styled('div', {
  display: "flex",
  justifyContent: "center",
  

  gap: 20,

  div: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 20,
    p: {
      flexWrap: "wrap",
      fontSize: 14,
      lineHeight: "160%",
      color: "$gray300"
    }
  }
})

export const RightDesc = styled('div', {

})

export const RightBook = styled('div', {

})