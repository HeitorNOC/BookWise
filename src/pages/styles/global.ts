import { globalCss } from "@stitches/react";

export const globalStyles = globalCss({
  '*': {
    boxSizing: 'border-box',
    padding: 0,
    margin: 0,

    
  },

  body: {
    backgroundColor: "#0E1116",
    color: "White",
    '-webkit-font-smoothing': 'antialiased',

    maxWidth: '97%',
    maxHeight: '70%'
    
  },
});