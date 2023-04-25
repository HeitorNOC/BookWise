import { keyframes, styled } from "@stitches/react";
import { violet, blackA, mauve, green } from '@radix-ui/colors';
import * as Dialog from '@radix-ui/react-dialog';

export const Container = styled('div', {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: 'calc(100vw - 50px)',
  overflow: 'hidden',
  height: 1080
})

export const Sidebar = styled('div', {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  height: 1024,

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
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",

  height: 1024,
  paddingTop: 116,
  paddingRight: 96,
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

    '.selected': {
      color: "$gray100",

      '&::before': {
        content: `''`,
        display: 'block',
        backgroundImage: 'linear-gradient(180deg, #7FD1CC 0%, #9694F5 100%)',
        position: 'absolute',
        left: '70px',
        top: 'calc(17% - 3px)',
        width: 4,
        height: 24,
        borderRadius: 'inherit',
        zIndex: 99,
      }
    },

    '.selected1': {
      color: "$gray100",

      '&::before': {
        content: `''`,
        display: 'block',
        backgroundImage: 'linear-gradient(180deg, #7FD1CC 0%, #9694F5 100%)',
        position: 'absolute',
        left: '70px',
        top: 'calc(20% + 10px)',
        width: 4,
        height: 24,
        borderRadius: 'inherit',
        zIndex: 99,
      }
    },

    div: {

      display: "flex",
      alignItems: "center",
      padding: '8px 0px',
      gap: 12,
      color: "$gray400",
      cursor: "pointer",


    }
  }
})

export const SideContentDown = styled('div', {
  div: {
    display: "flex",
    //padding: 4,
    //gap: 12,
    color: "$green100",
  },

  '.login': {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
  },

  '.loged': {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",

    gap: 12,

    p: {
      color: "$gray200",
      fontSize: 14
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
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: 324,
  marginBottom: 20,

  p: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    fontSize: 14,
    color: "$gray100"
  },

  '.arrow': {
    marginRight: 20,
    fontWeight: 700,
    color: "$purple100"
  }

})

export const RightBook = styled('div', {
  display: "flex",
  marginBottom: 12,
  justifyContent: "center",
  background: "$gray700",
  padding: "16px 20px",
  borderRadius: 8,
  maxWidth: 324,

  h4: {
    fontWeight: 700,
    fontSize: 16,
    color: "$gray100",
    //flexWrap: 'wrap'
  },

  p: {
    fontSize: 14,
    color: "$gray400"
  },


  '.star': {
    display: "flex"
  },

  '.flex': {
    display: "flex",
    flexDirection: "column",
    marginLeft: 20,

    div: {
      marginBottom: 34
    }
  }
})

export const overlayShow = keyframes({
  '0%': { opacity: 0 },
  '100%': { opacity: 1 },
});

export const contentShow = keyframes({
  '0%': { opacity: 0, transform: 'translate(-50%, -48%) scale(.96)' },
  '100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
});

export const DialogOverlay = styled(Dialog.Overlay, {
  backgroundColor: blackA.blackA9,
  position: 'fixed',
  inset: 0,
  animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
});

export const DialogContent = styled(Dialog.Content, {
  backgroundColor: '$gray700',
  borderRadius: 6,
  boxShadow: 'hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px',
  position: 'fixed',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90vw',
  maxWidth: '516px',
  maxHeight: '67vh',
  padding: "56px 72px",
  animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  '&:focus': { outline: 'none' },
  fontFamily: 'Nunito, sans-serif'
});

export const DialogTitle = styled(Dialog.Title, {
  margin: 0,
  fontWeight: 500,
  color: "$gray200",
  fontSize: 16,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 40,

});

export const Button = styled('button', {
  all: 'unset',
  display: "flex",
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 4,
  //padding: '0 15px',
  fontSize: 15,
  lineHeight: 1,
  fontWeight: 500,
  height: 35,

  //gap: 12,


  variants: {
    variant: {
      violet: {
        backgroundColor: 'white',
        color: violet.violet11,
        boxShadow: `0 2px 10px ${blackA.blackA7}`,
        '&:hover': { backgroundColor: mauve.mauve3 },
        '&:focus': { boxShadow: `0 0 0 2px black` },
      },
      green: {
        backgroundColor: green.green4,
        color: green.green11,
        '&:hover': { backgroundColor: green.green5 },
        '&:focus': { boxShadow: `0 0 0 2px ${green.green7}` },
      },
      login: {

        fontWeight: 700,
        fontSize: 16,
        lineHeight: '160%',
        color: "$gray200",
        marginRight: 12

      }
    },
  },

  defaultVariants: {
    variant: 'violet',
  },
});

export const IconButton = styled('button', {
  all: 'unset',
  fontFamily: 'inherit',
  borderRadius: '100%',
  height: 25,
  width: 25,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: violet.violet11,
  position: 'absolute',
  top: 10,
  right: 10,

  '&:hover': { backgroundColor: violet.violet4 },
  '&:focus': { boxShadow: `0 0 0 2px ${violet.violet7}` },
});

export const Fieldset = styled('fieldset', {
  all: 'unset',
  display: 'flex',
  gap: 20,
  alignItems: 'center',
  marginBottom: 15,

  div: {
    display: "flex",
    alignItems: "center",
    gap: 20,
    background: "$gray600",
    paddingRight: 139,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 24,

    cursor: "pointer",

    h4: {
      color: "$gray200",
      fontSize: 18,
      fontWeight: 500
    }
  }
});



