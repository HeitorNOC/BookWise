import { Dialog } from "@radix-ui/react-dialog";
import { styled } from "@stitches/react";
import { DialogContent, contentShow } from "../home/styles";

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
  display: "grid",
  gridTemplateColumns: "1fr 1fr 1fr 1fr ",
  alignItems: "center",
  justifyContent: "center",
  marginTop: 42,
  gap: 20
})

export const Book = styled("div", {
  display: "flex",
  //justifyContent: "space-between",
  //alignItems: "center",
  background: "$gray700",
  borderRadius: 8,
  padding: "16px 20px",
  cursor: "pointer",

  '.left': {
    marginRight: 20
  },

  '.right': {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },

  '.upper': {
    h4: {
      fontWeight: 700,
      fontSize: 16,
      color: "$gray100"
    },
    p: {
      fontWeight: 400,
      fontSize: 14,
      colort: "$gray400"
    }
  }
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

export const DialogMain = styled(DialogContent, {
  backgroundColor: '$gray700',
  borderRadius: 6,
  boxShadow: 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  position: 'fixed',
  top: '25%',
  left: '30%',
  transform: 'translate(-50%, -50%)',
  //width: '100%',
  maxWidth: '46%',
  maxHeight: '100vh',
  paddingTop: 64,
  paddingLeft: 48,
  paddingRigth: 48,
  animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  '&:focus': { outline: 'none' },
  fontFamily: 'Nunito, sans-serif'
});

export const FieldsetBook = styled('fieldset', {
  all: 'unset',
  display: 'flex',
  gap: 20,
  alignItems: 'center',
  marginBottom: 15,
  maxWidth: 564,

  
});
export const FieldsetRatings = styled('fieldset', {
  all: 'unset',
  display: 'flex',
  gap: 20,
  alignItems: 'center',
  marginBottom: 15,
  maxWidth: 564,
  
});