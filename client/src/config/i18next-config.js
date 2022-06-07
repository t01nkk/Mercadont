import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector"; //Con esto le dejamos a i18next la tarea de definir el lenguaje por defecto
import { initReactI18next } from "react-i18next";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "es", //Lenguaje por defecto si no existe la traducción para X cadena en el lenguaje actual.
    resources: {
      //Acá van las traducciones, básicamente.
      es: {
            translation: {
              accountDetails: {
                    btnEditProfile: "Actualizar tu información",
                    info: "Tu información personal",
                    email: "Dirección de correo: ",
                    name: "Nombre: ",
                    lastname: "Apellido: ",
                    address: "Dirección: "
                },
              accountDetailsForm: {
                    toastInfo: 'Tu información ha sido actualizada con éxito.',
                    changePassword: "Cambiar la contraseña",
                    askPasswordChange: '¿Estás seguro de querer modificar tu actual contraseña?',
                    confirmPasswordChange: 'Contraseña actualiza. Por favor revise su casilla de correo.',
                    updateInfo: "Actualizar información",
                    email: "Dirección de correo",
                    name: "Nombre",
                    lastname: "Apellido",
                    password: "Contraseña",
                    image: "Foto de perfil"
              },
              articleFavorites: {
                  price: "Precio: ",
                  rating: "Valoración general: ",
                  productDetails: "Ver detalles del producto"
              },
              favorites: {
                favorites: "Favoritos",
              },
          cart: {
              removeFromCart: "Producto apartado del carrito",
              removeEverythingFromCart: "Carrito vaciado con éxito.",
              confirmClearCart: "¿Estás de acuerdo en vaciar tu carrito entero?",
              emptyTheCart: "Vaciar el carrito",
              welcome: "Bienvenido a tu carrito",
              emptyCart: "Tu carrito se encuentra vacío. Añádele algún producto",
              totalPrice: "Precio total de la compra: ",
              buy: "Realizar la compra"
              },
              formQA: {
                  mustLogInToAsk: "Necesitas estar registrado para poder realizarle preguntas al vendedor",
                  postedQuestion: "¡Pregunta realizada con éxito!",
                  askSeller: "Hacerle una pregunta al vendedor",
                  askAQuestion: "Pregunta algo...",
                  postQuestion: "Realizar la pregunta"
          },
          guestNavBar: {
            home: "Inicio",
            categories: "Categorías",
            logIn: "Iniciar sesión/Registrarse",
            cart: "Carrito",
              },
              loggedNavBar: {
                  home: "Inicio",
                  categories: "Categorías",
                  profile: "Perfil",
                  accountDetails: "Detalles de la cuenta",
                  favorites: "Favoritos",
                  logOut: "Cerrar sesión",
                  cart: "Carrito"
              },
              home: {
                  altAddToCart: "¡Añadido al carrito!",
                  altAlreadyInCart: "El producto ya se encuentra en tu carrito",
                  altAddToFavs: "¡Añadido a favoritos!",
                  altRemoveFromFavorites: "Producto eliminado de favoritos",
                  mustBeLoggedIn: "Necesitas estar registrado para añadir productos a tu lista de favoritos"
              },
              productDetailsInfo: {
                categories: "Categorías: ",
                  description: "Detalles del producto: ",
                  stock: "Stock actual: ",
                  price: "Precio: ",
                qa: "Preguntas acerca de este producto: "
              },
              searchBar: {
              placeholder: 'Buscar...'
              },
              sendBuys: {
                  productsList: "Lista de productos:",
                  paymentMethod: "Elija su método de pago preferido",
                  card: "Pago con tarjeta",
                  cardPay: "Realizar la compra con tarjeta",
                  paypal: "Pago mediante PayPal",
                  paypalProcessing: "Procesando el pago. Aguarde unos instantes...",
                  paypalConfirm: "Realizar la compra mediante PayPal"
              },
        },
      },
      en: {
        translation: {
          guestNavBar: {
            home: "Home",
            categories: "Categories",
            logIn: "Log in/Sign up",
            cart: "Cart",
          },
          cart: {
            removeFromCart: "Product removed from the cart",
          },
        },
      },
    },
  });

//Cuando queremos usarlo en un componente invocamos al hook useTranslation. Luego dentro de la lógica hacemos lo propio que con cualquier hook -> const {t} = useTranslation()
