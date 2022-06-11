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
            country: "País: ",
            city: "Ciudad: ",
            province: "Provincia/Departamento: ",
            street: "Calle: ",
            postalCode: "Código postal: ",
          },
          accountDetailsForm: {
            toastInfo: "Tu información ha sido actualizada con éxito.",
            changePassword: "Cambiar la contraseña",
            askPasswordChange:
              "¿Estás seguro de querer modificar tu actual contraseña?",
            confirmPasswordChange:
              "Contraseña actualiza. Por favor revise su casilla de correo.",
            updateInfo: "Actualizar información",
            email: "Dirección de correo",
            name: "Nombre",
            lastname: "Apellido",
            password: "Contraseña",
            image: "Foto de perfil",
            address: "Dirección: ",
            city: "Ciudad...",
            country: "País...",
            postalCode: "Código postal...",
            province: "Provincia/Departamento...",
            street: "Calle y altura...",
          },
          articleFavorites: {
            price: "Precio: ",
            rating: "Valoración general: ",
            productDetails: "Ver detalles del producto",
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
            buy: "Realizar la compra",
          },
          createUserTest: {
            errors_mail_required: "Se requiere una dirección de correo.",
            errors_mail_invalid:
              "Dirección de correo inválida. Prueba con otra.",
            errors_password: "Se requiere una contraseña.",
            errors_password_invalid:
              "La contraseña debe tener entre 8 y 16 caracteres, debe contener contener caracteres en mayúsculas y minúsculas, y al menos 1 número.",
            errors_password_match: "Las contraseñas deben coincidir.",
            createAccount: "Crear una cuenta nueva",
            accountCreated: "¡Cuenta registrada exitosamente! Por favor, chequea tu mail para confirmar tu cuenta",
            name: "Primer nombre...",
            email: "Dirección de correo...",
            password: "Contraseña...",
            confirmPassword: "Confirmar contraseña...",
          },
          formQA: {
            mustLogInToAsk:
              "Necesitas estar registrado para poder realizarle preguntas al vendedor",
            postedQuestion: "¡Pregunta realizada con exito!",
            askSeller: "Hacerle una pregunta al vendedor",
            askAQuestion: "Pregunta algo...",
            postQuestion: "Realizar la pregunta",
          },
          adminLoggedNavBar: {
            inventory: "Inventario",
            sell: "Vender",
            adminCategories: "Administrar categorías",
            logOut: "Cerrar sesión",
            switch: "Cambiar a modo usuario",
          },
          adminUnloggedNavBar: {
            switch: "Cambiar a modo usuario",
          },
          adminCreateCategory: {
            created: "¡Nueva categoría añadida!",
            postCategory: "Crear nueva categoría",
            name: "Nombre de la categoría...",
            submit: "Añadir nueva categoría",
          },
          adminAddCategories: {
            update: "¡Categoría actualizada con éxito!",
            delete: "Categoría borrada con éxito",
          },
          adminEditProduct: {
            delete: "Producto borrado con éxito",
            deleteProduct: "Eliminar producto",
            update: "Actualizar el producto",
            updated: "¡Producto actualizado con éxito!",
          },
          adminProductCard: {
            edit: "Editar",
            rating: "Valoración: ",
            stock: "Disponibles: ",
            status: "Estado: ",
          },
          adminProductDetails: {
            update: "Actualizar producto",
            categories: "Categorías: ",
            description: "Detalle del producto: ",
            available: "Disponibles: ",
            price: "Precio: ",
          },
          adminSellProduct: {
            errors_name: "Es obligatorio introducir un nombre.",
            errors_price: "Es obligatorio introducir un precio.",
            errors_description: "Es obligatorio introducir una descripción.",
            errors_stock:
              "Es obligatorio introducir la cantidad de unidades disponibles.",
            postProduct: "Nuevo producto",
            name: "Nombre del producto...",
            price: "Precio del producto...",
            description: "Descripción del producto...",
            categories: "Categorías",
            image: "Imagen del producto...",
            status: "Disponibilidad del producto: ",
            stock: "Cantidad disponible: ",
            submit: "¡Publicar!",
            select: "Seleccionar",
          },

          guestNavBar: {
            home: "Inicio",
            categories: "Categorías",
            logIn: "Ingresar/Registrarse",
            cart: "Carrito",
          },

          loggedNavBar: {
            home: "Inicio",
            categories: "Categorías",
            profile: "Perfil",
            accountDetails: "Detalles de la cuenta",
            favorites: "Favoritos",
            logOut: "Cerrar sesión",
            cart: "Carrito",
          },
          adminHome: {
            filter: "Filtrar por:",
            name: "Nombre",
            stock: "Unidades disponibles",
            rating: "Valoración",
            price: "Precio",
            status: "Disponibilidad:",
            active: "Disponible",
            inactive: "No disponible",
            category: "Categoría:",
            order: "Orden:",
            valueAsc: "Ascendente",
            valueDes: "Descendente",
            reset: "Reestablecer los filtros",
          },
          home: {
            altAddToCart: "¡Añadido al carrito!",
            altAlreadyInCart: "El producto ya se encuentra en tu carrito",
            altAddToFavs: "¡Añadido a favoritos!",
            altRemoveFromFavorites: "Producto eliminado de favoritos",
            mustBeLoggedIn:
              "Necesitas estar registrado para añadir productos a tu lista de favoritos",
          },
          loginAdmin: {
            login: "Ingreso a Administración",
          },
          logInForm: {
            errors_mail_required: "Se requiere una dirección de correo.",
            errors_mail_invalid:
              "Dirección de correo inválida. Prueba con otra.",
            errors_password: "Se requiere una contraseña.",
            logIn: "¡Bienvenido!",
            mail: "Dirección de correo...",
            password: "Contraseña...",
            submit: "Ingresar",
            logInGoogle: "Ingresar con Google",
            notUser: "¿No tienes una cuenta?",
            newUser: "Crear un nuevo usuario",
          },
          productDetailsInfo: {
            categories: "Categorías: ",
            description: "Detalles del producto: ",
            stock: "Stock actual: ",
            price: "Precio: ",
            qa: "Preguntas acerca de este producto: ",
          },
          searchBar: {
            placeholder: "Buscar...",
          },
          sendBuys: {
            productsList: "Lista de productos:",
            paymentMethod: "Elija su método de pago preferido",
            card: "Pago con tarjeta",
            cardPay: "Realizar la compra con tarjeta",
            paypal: "Pago mediante PayPal",
            paypalProcessing: "Procesando el pago. Aguarde unos instantes...",
            paypalConfirm: "Realizar la compra mediante PayPal",
          },
        },
      },
      en: {
        translation: {
          loggedNavBar: {
            home: "Home",
            categories: "Categories",
            profile: "Profile",
            accountDetails: "Account Details",
            favorites: "Favorites",
            logOut: "Log out",
            cart: "Cart",
          },
          guestNavBar: {
            home: "Home",
            categories: "Categories",
            profile: "Profile",
            accountDetails: "Account Details",
            favorites: "Favorites",
            logOut: "Log out",
            cart: "Cart",
            logIn: "Login/Register",
          },
        },
      },
    },
  });

//Cuando queremos usarlo en un componente invocamos al hook useTranslation. Luego dentro de la lógica hacemos lo propio que con cualquier hook -> const {t} = useTranslation()
