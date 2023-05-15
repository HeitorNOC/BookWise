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

export const DialogMain = styled("div", {
  backgroundColor: '$gray800',
  
  
  borderRadius: 6,
  boxShadow: 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  position: 'fixed',
  top: '49%',
  left: '78.5%',
  transform: 'translate(-50%, -50%)',
  //width: '100%',
  maxWidth: '46%',
  maxHeight: '100vh',
  padding: "64px 48px",
  paddingBottom: 0,
  animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  '&:focus': { outline: 'none' },
  fontFamily: 'Nunito, sans-serif',
  overflowY: "auto",
  overflowX: "hidden",
  
});

export const FieldsetBook = styled('fieldset', {
  backgroundColor: '$gray700',
  all: 'unset',
  
  display: 'flex',
  gap: 20,
  alignItems: 'center',
  marginBottom: 15,
  maxWidth: 564,
  padding: "24px 32px",
  
  

  '.upper': {
    display: "flex",
    gap: 32,
    marginBottom: 40,

    '.right': {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      '.topDesc': {

        h3: {
          fontWeight: 700,
          fontSize: 18,
          lineHeight: "140%",
          color: "$gray100",
          
          marginBottom: 8
        },

        p: {
          fontWeight: 400,
          fontSize: 16,
          lineHeight: "160%",

          color: "$gray300"
        }
      },

      '.bottomDesc': {
        p: {
          fontWeight: 400,
          fontSize: 14,
          lineHeight: "160%",
          color: "$gray400",
          marginTop: 4
        }
      }
    }
  },

  '.lower': {
    display: "flex",
    
    '.lowerDesc': {
      display: "flex",
      padding: "24px 0",
      alignItems: "center",
      marginRight: 56,

      div: {
        marginLeft: 16,

        p: {
          fontWeight: 400,
          fontSize: 16,
          lineHeight: "160%",

          color: "$gray300"
        },

        h4: {
          fontWeight: 700,
          fontSize: 16,
          lineHeight: "140%",
        }
      }
    }
  }
});
export const FieldsetRatings = styled('fieldset', {
  all: 'unset',
  backgroundColor: "#181C2A",
  display: 'flex',
  flexDirection: "column",
  gap: 20,
  
  marginTop: 16,
  maxWidth: 629,
  padding: "0 48px",
  borderRadius: 8,
  overflowY: "auto",
  overflowX: "hidden",
  '.otherAvaliation': {
    borderRadius: 8,
  },

  '.yourAvaliation': {
    borderRadius: 8
  },

  '.upper': {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 24,

    '.stars': {
      display: "flex",
    },

    '.profile': {
      display: "flex",
      alignItems: "center",
      gap: 16
    }
  },

  '.form': {
    p: {
      paddingBottom: 24
    },
    span: {
      display: "flex",
      justifyContent: "flex-end",
      marginTop: "-20px",
      marginRight: 5
    },

    input: {
      top:0,
      width: 629,
      //height: 164,
      border: "none",
      display: "flex",
      alignItems: "flex-start",
      paddingBottom: 164,
      paddingLeft: 10,
      paddingTop: 10,
      color: "$gray300",
      background: "#0E1116",
      

      '&::placeholder': {
        
        position: "absolute",
        fontWeight: 400,
        fontSize: 14,
        lineHeight: "160%",
        top: 10,
        left: 10,
      }
    }
  },

  '.lower': {
      
    display: 'flex',
    justifyContent: "flex-end",
    gap: 8,
    marginTop: 12,

    '.icon': {
      padding: 8,
      borderRadius: 4,
      background: "#252D4A",
      cursor: "pointer"
    }
  },
  
  
});