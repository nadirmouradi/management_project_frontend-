import React, { useState } from "react";
import Loginpic from "../../assets/loginpic.jpg";
import { Link } from "react-router-dom";
import axios from "axios";
const SignIn = () => {
  const [values, setValues] = useState({
    email: "",
    motDePasse: ""
  });
  const [errors, setErrors] = useState({});

  const handleInput = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let formIsValid = true;
    const newErrors = {};

    if (!values.email) {
      formIsValid = false;
      newErrors.email = "L'email est requis";
    }

    if (!values.motDePasse) {
      formIsValid = false;
      newErrors.motDePasse = "Le mot de passe est requis";
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/signin",
          values
        );
        console.log(response.data);
        // Save JWT token and user data to sessionStorage
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("user", JSON.stringify(response.data.user));
        // Redirect to member dashboard
        window.location.href = "/member-dashboard";
      } catch (err) {
        console.log(err.response.data);
        if (err.response && err.response.data) {
          const errorMessage = err.response.data.error;
          setErrors({ email: errorMessage });
        }
      }
    }
  };

  return (
    <div className="flex w-full h-screen">
      <div className="bg-white w-full lg:w-1/2 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <h1 className="text-3xl font-semibold">Connexion</h1>
          <p className="font-medium text-md text-[#429BEE] mt-4">
            Bienvenue! Veuillez entrer vos coordonnées
          </p>
          <div className="mt-6">
            <form onSubmit={handleSubmit}>
              <div className="mb-2">
                <label className="text-md font-medium">Adresse e-mail</label>
                <input
                  className="w-full border-2 border-gray-100 rounded-lg p-2 mt-1 bg-transparent"
                  placeholder="Entrez votre adresse e-mail"
                  type="email"
                  name="email"
                  value={values.email}
                  onChange={handleInput}
                />
                {errors.email && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.email}
                  </div>
                )}
              </div>
              <div className="mb-2">
                <label className="text-md font-medium">Mot de passe</label>
                <input
                  className="w-full border-2 border-gray-100 rounded-lg p-2 mt-1 bg-transparent"
                  type="password"
                  placeholder="Entrez votre mot de passe"
                  name="motDePasse"
                  value={values.motDePasse}
                  onChange={handleInput}
                />
                {errors.motDePasse && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.motDePasse}
                  </div>
                )}
              </div>
              <div className="mt-4">
                <Link to="/forgot-password" className="font-medium text-sm text-[#429BEE]">
                  Mot de passe oublié ?
                </Link>
              </div>
              <div className="mt-6 flex flex-col gap-y-2">
                <button className="py-2 rounded-lg hover:bg-[#2E8AE1] focus:ring bg-[#429BEE] text-white text-md font-bold">
                  Se connecter
                </button>
                <div className="mt-4 flex justify-center items-center space-x-2">
                  <p className="font-medium text-sm">Pas encore de compte ?</p>
                  <Link to="/signup" className="text-[#429BEE] text-sm font-medium ml-2">S'inscrire</Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex w-1/2">
        <img src={Loginpic} alt="Login" className="object-cover w-full h-full" />
      </div>
    </div>
  );
};

export default SignIn;
