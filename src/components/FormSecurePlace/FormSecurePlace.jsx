import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addPlace } from "api/places";
import Notification from "../Notification/Notification";
import {
  DivFormSecurePlace,
  FormFormSecurePlace,
  TextFieldFormSecurePlace,
  ButtonImagen,
  ButtonFormSecurePlace,
} from "./FormSecurePlaceStyles";

// Definicion del componente

export default function FormSecurePlace() {
  const navigate = useNavigate();

  const [image, setImage] = useState();
  
    const changeImage=(e)=>{
      setImage(e.target.files[0]); 
      const base64=convertB64(file);
      console.log(image);
    };
    
  
  const [form, setForm] = useState({
    name: "",
    description: "",
    state: "",
    city: "",
    suburb: "",
    street: "",
    postCode: "",
    image: "",
  });
  const [formError, setFormError] = useState({
    name: { error: false, message: "" },
    description: { error: false, message: "" },
    state: { error: false, message: "" },
    city: { error: false, message: "" },
    suburb: { error: false, message: "" },
    street: { error: false, message: "" },
    postCode: { error: false, message: "" },
    image: { error: false, message: "" },
  });

  const [loading, setLoading] = useState(false);

  const [notification, setNotification] = useState({
    open: false,
    message: "",
    severity: "",
  });

  const handleComprove = () => {
    const regExpPostCode = /^\d{5}$/;
    const {
      name,
      description,
      state, 
      city, 
      suburb,
      street, 
      postCode, 
      // image,
    } = form;
    const internalForm = { ...formError };
    let isCorrect = true;

    // const [image, setImage] = useState();

    if (name === "") {
      internalForm.name.error = true;
      internalForm.name.message = "Completa el campo Nombre";
      isCorrect = false;
    } else {
      internalForm.name.error = false;
      internalForm.name.message = "";
    }
    if (description === "") {
      internalForm.description.error = true;
      internalForm.description.message = "Completa el campo Descripcion";
      isCorrect = false;
    } else {
      internalForm.description.error = false;
      internalForm.description.message = "";
    }
   
    if (state === "") {
      internalForm.state.error = true;
      internalForm.state.message = "Completa el campo Estado";
      isCorrect = false;
    } else {
      internalForm.state.error = false;
      internalForm.state.message = "";
    }
   
    if (city === "") {
      internalForm.city.error = true;
      internalForm.city.message = "Completa el campo Ciudad";
      isCorrect = false;
    } else {
      internalForm.city.error = false;
      internalForm.city.message = "";
    }
   
    if (suburb === "") {
      internalForm.suburb.error = true;
      internalForm.suburb.message = "Completa el campo Colonia";
      isCorrect = false;
    } else {
      internalForm.suburb.error = false;
      internalForm.suburb.message = "";
    }
    
    if (street === "") {
      internalForm.street.error = true;
      internalForm.street.message = "Completa el campo Calle";
      isCorrect = false;
    } else {
      internalForm.street.error = false;
      internalForm.street.message = "";
    }
   
    if (postCode === "") {
      internalForm.postCode.error = true;
      internalForm.postCode.message = "Completa el campo Codigo Postal";
      isCorrect = false;
    } else if (!regExpPostCode.test(postCode)) {
      internalForm.postCode.error = true;
      internalForm.postCode.message =
        "El codigo postal debe tener 5 digitos";
    } else {
      internalForm.postCode.error = false;
      internalForm.postCode.message = "";
    }
    
    if (image === "") {
      internalForm.image.error = true;
      internalForm.image.message = "Completa el campo";
      isCorrect = false;
    } else {
      internalForm.image.error = false;
      internalForm.image.message = "";
    }

    setFormError(internalForm);
    return isCorrect;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const allFine = handleComprove();
    if (allFine) {
      console.log("Form", form);
      const response = await addPlace(form);
      console.log(response);
      if (response.status !== 200) {
        setNotification({
          open: true,
          message: "Ocurrio un error",
          severity: "Error",
        });
        setLoading(false);
        return;
      }

      navigate("/places", { replace: true });
    }
    setLoading(false);
  };



  const handleChange = (e) => {
    const nameInput = e.target.name;
    const valueInput = e.target.value;

    const internalForm = form;

    internalForm[nameInput] = valueInput;

    setForm(internalForm);
  };

  const convertB64=(file) =>{
    return new Promise((resolve, reject)=>{

      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload=(()=>{
        resolve(fileReader.result);
      });

      fileReader.onerror=((error)=>{
        reject(error);
      });
    })
  };
  
  

  

  return (
    <DivFormSecurePlace>
      {notification.open && (
        <Notification
          notification={notification}
          setNotification={setNotification}
        />
      )}

      <FormFormSecurePlace onSubmit={handleSubmit}>
        <h1>Lugares Seguros</h1>
        <TextFieldFormSecurePlace
          error={formError.name.error}
          helperText={formError.name.error && formError.name.message}
          id={
            formError.name.error
              ? "outlined-error-helper-text"
              : "outlined-basic"
          }
          label="Nombre"
          name="name"
          variant="outlined"
          onChange={handleChange}
        />

        <TextFieldFormSecurePlace
          error={formError.description.error}
          helperText={
            formError.description.error && formError.description.message
          }
          id={
            formError.description.error
              ? "outlined-error-helper-text"
              : "outlined-basic"
          }
          label="Descripción"
          name="description"
          variant="outlined"
          onChange={handleChange}
        />

        <TextFieldFormSecurePlace
          error={formError.state.error}
          helperText={
            formError.state.error && formError.state.message
          }
          id={
            formError.state.error
              ? "outlined-error-helper-text"
              : "outlined-basic"
          }
          label="Estado"
          name="state"
          variant="outlined"
          onChange={handleChange}
        />

        <TextFieldFormSecurePlace
          error={formError.city.error}
          helperText={
            formError.city.error && formError.city.message
          }
          id={
            formError.city.error
              ? "outlined-error-helper-text"
              : "outlined-basic"
          }
          label="Ciudad"
          name="city"
          variant="outlined"
          onChange={handleChange}
        />

        <TextFieldFormSecurePlace
          error={formError.suburb.error}
          helperText={
            formError.suburb.error && formError.suburb.message
          }
          id={
            formError.suburb.error
              ? "outlined-error-helper-text"
              : "outlined-basic"
          }
          label="Colonia"
          name="suburb"
          variant="outlined"
          onChange={handleChange}
        />

        <TextFieldFormSecurePlace
          error={formError.street.error}
          helperText={
            formError.street.error && formError.street.message
          }
          id={
            formError.street.error
              ? "outlined-error-helper-text"
              : "outlined-basic"
          }
          label="Calle"
          name="street"
          variant="outlined"
          onChange={handleChange}
        />

        <TextFieldFormSecurePlace
          error={formError.postCode.error}
          helperText={
            formError.postCode.error &&
            formError.postCode.message
          }
          id={
            formError.postCode.error
              ? "outlined-error-helper-text"
              : "outlined-basic"
          }
          label="Número"
          name="postCode"
          variant="outlined"
          onChange={handleChange}
        />

        <ButtonImagen variant="contained" component="label" onChange={changeImage}>
        <input value= "image" name="image" type="file"  onChange={handleChange}/>
        </ButtonImagen>

        <ButtonFormSecurePlace
          type="submit"
          variant="contained"
          color="primary"
          desabled={loading.toString()}
        >
          {loading ? "Enviando datos..." : "Enviar Datos"}
        </ButtonFormSecurePlace>
      </FormFormSecurePlace>
    </DivFormSecurePlace>
  );
}
