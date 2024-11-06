import React, { useState } from "react";
import Loginpic from "../../assets/loginpic.jpg";
import { Link } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [values, setValues] = useState({
    nom: "",
    prenom: "",
    email: "",
    motDePasse: "",
    confirmationMotDePasse: "",
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(""); // State for success message

  const handleInput = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let formIsValid = true;
    const newErrors = {};

    const validateName = (name) => {
      const regex = /^[a-zA-Z\s]*$/;
      return regex.test(name);
    };

    if (!values.nom) {
      formIsValid = false;
      newErrors.nom = "Le nom est requis";
    } else if (!validateName(values.nom)) {
      formIsValid = false;
      newErrors.nom = "Le nom ne doit contenir que des lettres";
    }

    if (!values.prenom) {
      formIsValid = false;
      newErrors.prenom = "Le prénom est requis";
    } else if (!validateName(values.prenom)) {
      formIsValid = false;
      newErrors.prenom = "Le prénom ne doit contenir que des lettres";
    }

    if (!values.email) {
      formIsValid = false;
      newErrors.email = "L'email est requis";
    }

    if (!values.motDePasse) {
      formIsValid = false;
      newErrors.motDePasse = "Le mot de passe est requis";
    } else if (!/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/.test(values.motDePasse)) {
      formIsValid = false;
      newErrors.motDePasse =
        "Le mot de passe doit contenir au moins un chiffre, une lettre majuscule, une lettre minuscule et être composé d'au moins 8 caractères";
    }

    if (!values.confirmationMotDePasse) {
      formIsValid = false;
      newErrors.confirmationMotDePasse =
        "La confirmation du mot de passe est requise";
    } else if (values.motDePasse !== values.confirmationMotDePasse) {
      formIsValid = false;
      newErrors.confirmationMotDePasse =
        "Les mots de passe ne correspondent pas";
    }

    setErrors(newErrors);
    return formIsValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post(
          "http://localhost:8080/api/signup",
          values
        );
        setSuccessMessage("Inscription réussie ! , Merci de verifier votre compte"); // Set success message
        setErrors({}); // Clear any previous errors
      } catch (err) {
        if (err.response) {
          const errorMessage = err.response.data.error;
          setErrors({ email: errorMessage });
          setSuccessMessage(""); // Clear success message on error
        }
      }
    }
  };

  return (
    <div className="flex w-full h-screen">
      <div className="bg-white w-full lg:w-1/2 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <h1 className="text-3xl font-semibold">Inscription</h1>
          <p className="font-medium text-md text-[#429BEE] mt-4">
            Bienvenue! Veuillez entrer vos coordonnées
          </p>
          
          {successMessage && ( // Display success message
            <div className="text-green-500 text-sm font-bold mt-4">
              {successMessage}
            </div>
          )}

          <div className="mt-6">
            <form onSubmit={handleSubmit}>
              {/* Form fields */}
              <div className="flex mb-2">
                <div className="flex flex-col mr-12">
                  <label className="text-md font-medium">Nom</label>
                  <input
                    className="w-full border-2 border-gray-100 rounded-lg p-2 mt-1 bg-transparent"
                    placeholder="Entrez votre nom"
                    name="nom"
                    value={values.nom}
                    onChange={handleInput}
                  />
                  {errors.nom && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.nom}
                    </div>
                  )}
                </div>
                <div className="flex flex-col">
                  <label className="text-md font-medium">Prénom</label>
                  <input
                    className="w-full border-2 border-gray-100 rounded-lg p-2 mt-1 bg-transparent"
                    placeholder="Entrez votre prénom"
                    name="prenom"
                    value={values.prenom}
                    onChange={handleInput}
                  />
                  {errors.prenom && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.prenom}
                    </div>
                  )}
                </div>
              </div>

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
                  placeholder="Entrez votre mot de passe"
                  name="motDePasse"
                  type="password"
                  value={values.motDePasse}
                  onChange={handleInput}
                />
                {errors.motDePasse && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.motDePasse}
                  </div>
                )}
              </div>

              <div className="mb-2">
                <label className="text-md font-medium">
                  Confirmer le mot de passe
                </label>
                <input
                  className="w-full border-2 border-gray-100 rounded-lg p-2 mt-1 bg-transparent"
                  placeholder="Confirmez votre mot de passe"
                  type="password"
                  name="confirmationMotDePasse"
                  value={values.confirmationMotDePasse}
                  onChange={handleInput}
                />
                {errors.confirmationMotDePasse && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.confirmationMotDePasse}
                  </div>
                )}
              </div>

              <div className="mt-6 flex flex-col gap-y-2">
                <button
                  type="submit"
                  className="py-2 rounded-lg hover:bg-[#2E8AE1] focus:ring bg-[#429BEE] text-white text-md font-bold"
                >
                  S'inscrire
                </button>
                <div className="mt-4 flex justify-center items-center space-x-2">
                  <p className="font-medium text-sm">Déjà membre ?</p>
                  <Link
                    to="/"
                    className="text-[#429BEE] text-sm font-medium ml-2"
                  >
                    Se connecter
                  </Link>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex w-1/2">
        <img
          src={Loginpic}
          alt="Login"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
};

export default SignUp;
