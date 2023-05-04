import { styled } from "@stitches/react";

export const Container = styled('div', {
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "space-between",
  width: 'calc(100vw - 50px)',
  overflow: 'hidden',
  height: 1080
})

export const Content = styled("div", {
  display: "flex",
  flexDirection: "column",
  marginTop: 20,
  padding: "52px 96px"
})

export const Navbar = styled("div", {
  '.lower': {
    '.input': {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      marginBottom: 32,

      input: {
        background: '#0E1116',
        padding: '14px 20px',
        border: '1px solid #303F73',
        borderRadius: '4px',
        width: 608,
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
  },
  '.upper': {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",

    marginBottom: 40
  },


})

export const Main = styled("div", {

})

export const Right = styled("div", {
  display: "grid",
  alignItems: "center",
  justifyContent: "center",

  paddingTop: 136,
  paddingRight: 96,
  '.mid': {

    content: `''`,
    display: 'block',
    backgroundImage: 'linear-gradient(180deg, #7FD1CC 0%, #9694F5 100%)',
    position: 'absolute',
    right: '200px',
    top: 'calc(40% - 100px)',
    width: 32,
    height: 4,
    borderRadius: 'inherit',
    zIndex: 99,

  },

  '.upper': {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 20,

    '.desc': {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: 4,

      h2: {
        fontWeight: 700,
        fontSize: 20,
        color: "$gray100"
      },

      p: {
        fontWeight: 400,
        fontSize: 14,
        color: "$gray400"
      }
    }
  },

  '.lower': {
    marginTop: 116,

    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    gap: 20,
    '.section': {
      display: 'flex',
      justifyContent: "flex-start",
      alignItems: "center",
      gap: 20,

      p: {
        fontWeight: 400,
        fontSize: 14,
        color: "$gray300"
      },

      h2: {
        fontWeight: 700,
        fontSize: 16,
        color: "$gray200"
      }
    }
  }
})