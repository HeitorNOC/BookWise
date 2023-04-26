import { styled } from "@stitches/react";

export const Container = styled('div', {
  display: "flex",


  //width: 'calc(100vw - 50px)',
  overflow: 'hidden',
  height: 1080
})

export const Content = styled("div", {
  display: "flex",
  flexDirection: "column",
  marginTop: 20,
  padding: "40px 96px"
})
export const Navbar = styled("div", {
  display: "flex",
  flexDirection: "column"

})
export const Main = styled("div", {

})
export const NavUpper = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",

  '.desc': {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,

  },
  '.input': {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    input: {
      background: '#0E1116',
      padding: '14px 20px',
      border: '1px solid #303F73',
      borderRadius: '4px',
      width: '433px',
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
})


export const NavDown = styled("div", {
  display: "flex",
  alignItems: "center",
  marginTop: 40,


})

export const Category = styled("div", {
  display: "flex",
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '4px 16px',
  gap: '8px',
  marginRight: 12,
  cursor: "pointer",

  border: '1px solid #8381D9',
  borderRadius: '999px',

  p: {
    fontSize: 16,
    color: "#8381D9"
  },

  variants: {
    active: {
      true: {
        background: "#2A2879",
        borderColor: "#2A2879",
        color: "#F8F9FC",
      },
    },
  },
})