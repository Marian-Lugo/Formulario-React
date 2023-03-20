import { styled } from "@mui/material/styles"
import { TextField, Button } from "@mui/material"


export const DivFormSecurePlace=styled("div")({
    display:"flex",
    justifyContent:"center",
    alignItems:"center"
});

export const FormFormSecurePlace=styled("form")({
    marginTop:"10vh",
    padding:"20px 0 20px 0",
    width:"450px",
    minHeight:"500px",
    border:"1px solid black"
});

export const TextFieldFormSecurePlace=styled(TextField)({
    width: "90%",
    marginBottom:"10px",
});

export const ButtonFormSecurePlace=styled(Button)({
    width: "90%",
    marginTop:"15px"
})

export const ButtonImagen=styled(Button)({
    marginTop:"15px",
    width: "90%",
})
