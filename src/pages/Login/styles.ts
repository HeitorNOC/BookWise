import { styled } from "@stitches/react";

export const Container = styled('div', {
  maxWidth: 1440,
  maxHeight: "100vh",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  overflow: "hidden"
})

export const Left = styled('div', {
  padding: "20px 0 15px 20px",
})

export const Right = styled('div', {
  display: "flex",
  alignItems: "center",
  justifyContent: "center"
})

export const Options = styled('div', {
  display: "grid",
  alignItems: "center",
  justifyContent: "center",

  
  '.upper' : {
    h2 : {
      fontSize: 24,
      marginBottom: 2,
    },
    p: {
      fontWeight: 400,
      fontSize: "$md",
      lineHeight: "160%",
      color: "$gray200",
    },

    marginBottom: 40,
  }
  
})

export const LoginType = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  padding: '20px 24px',
  gap: 20,
  width: 372,
  backgroundColor: "$gray600",
  marginBottom: 16,
  borderRadius: 8,
})