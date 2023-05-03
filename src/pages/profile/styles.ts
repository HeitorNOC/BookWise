import { styled } from "@stitches/react";

export const Content = styled("div", {
  display: "flex",
  flexDirection: "column",
  marginTop: 20,
  padding: "40px 96px"
})

export const Navbar = styled("div", {
  '.lower': {
    '.input': {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
  
      input: {
        background: '#0E1116',
        padding: '14px 20px',
        border: '1px solid #303F73',
        borderRadius: '4px',
        width: '624px',
        height: '48px',
  
        color: "$gray200",
        fontSize: 14,
  
        '&::placeholder': {
          color: "$gray400",
          fontSize: 14
        },
  
        '&:focus': {
          boxShadow: '0 0 0 0',
          outline: 0,
        },
  
  
      }
    },
  }
})

export const Main = styled("div", {

})

export const Right = styled("div", {
  
})