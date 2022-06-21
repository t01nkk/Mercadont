import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector"; //Con esto le dejamos a i18next la tarea de definir el lenguaje por defecto
import { initReactI18next } from "react-i18next";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "es", //Lenguaje por defecto si no existe la traducción para X cadena en el lenguaje actual.
    returnObjects: true,
    joinArrays: "\n",
    resources: {
      //Acá van las traducciones, básicamente.
      es: {
        translation: {
          navigation: {
            goBack: "Volver a Inicio",
            returnToCart: "Volver al carrito",
            return: "Volver atrás",
          },
          errors: {
            error_name: "Se requiere un nombre",
            error_country: "Se requiere un país",
            error_city: "Se requiere una ciudad",
            error_province: "Se requiere una provincia",
            error_addressFormLetters_validate:
              "Solo se aceptan caracteres alfabéticos",
            error_addressFormAlphaNumbers_validate:
              "Solo se aceptan caracteres alfanuméricos",
          },
          accountDetails: {
            btnEditProfile: "Editar",
            info: "Información personal",
            email: "Correo: ",
            name: "Nombre: ",
            lastname: "Apellido: ",
            country: "País: ",
            city: "Ciudad: ",
            province: "Provincia: ",
            street: "Calle: ",
            postalCode: "Código postal: ",
          },
          accountDetailsForm: {
            toastInfo: "Tu información ha sido actualizada con éxito.",
            changePassword: "Cambiar la contraseña",
            askPasswordChange:
              "¿Estás seguro de querer modificar tu actual contraseña?",
            confirmPasswordChange:
              "Contraseña actualizada. Por favor revise su casilla de correo.",
            updateInfo: "Actualizar información",
            email: "Dirección de correo",
            name: "Nombre",
            lastname: "Apellido",
            password: "Contraseña",
            image: "Foto de perfil",
            address: "Dirección: ",
            city: "Ciudad",
            country: "País",
            postalCode: "Código postal",
            province: "Provincia",
            street: "Calle y altura",
            submit: "Editar",
          },
          articleFavorites: {
            price: "Precio: ",
            rating: "Valoración general: ",
            productDetails: "Ver detalles",
            removeFavorite: "Remover favorito",
          },
          favorites: {
            favorites: "Tus productos favoritos",
          },
          cart: {
            qty: "Uds: ",
            removeFromCart: "Producto apartado del carrito",
            removeEverythingFromCart: "Carrito vaciado con éxito.",
            confirmClearCart: "¿Estás de acuerdo en vaciar tu carrito entero?",
            emptyTheCart: "Vaciar el carrito",
            welcome: "Bienvenido a tu carrito",

            emptyCart: "Tu carrito se encuentra vacío.",
            totalPrice: "Precio total de la compra: ",
            buy: "Comprar",

            successfulPurchase: "Compra en proceso, porfavor revise su mail",
            cancelPurchaseSuccess: "Compra cancelada con éxito",
            addressDetailsMissing:
              "Por favor completa los datos de tu domicilio",
            noStock: "El stock es insuficiente",
          },
          categoriesComp: {
            error_pos_numbers: "Solo se aceptan números positivos",
            error_valid_numbers: "Por favor utilice valores válidos",
            error_valid_cats: "Por favor elija categorías apropiadas",
            priceRange: "Precio",
            minPrice: "$Min",
            maxPrice: "$Max",
            search: "Buscar",
            sortBy: "Orden",
            asc: "Ascendente",
            des: "Descendente",
            noCats:
              "No pudimos hallar ningún producto con las categorías seleccionadas",
          },
          createUserTest: {
            errors_mail_required: "Se requiere una dirección de correo.",
            errors_mail_invalid:
              "Dirección de correo inválida. Prueba con otra.",
            errors_mail_checkemail:
              "Por favor checkea tu email para verificar tu cuenta!",
            errors_mail_taken: "Dirección de correo ya está en uso.",
            errors_password: "Se requiere una contraseña.",
            errors_password_invalid:
              "La contraseña debe tener entre 8 y 16 caracteres, debe contener contener caracteres en mayúsculas y minúsculas, y al menos 1 número.",
            errors_password_match: "Las contraseñas deben coincidir.",
            createAccount: "Crear una cuenta nueva",
            accountCreated:
              "Por favor, chequea tu mail para confirmar tu cuenta",
            name: "Primer nombre",
            email: "Dirección de correo",
            password: "Contraseña",
            confirmPassword: "Confirmar contraseña",
          },
          dateHistory: {
            dateOfPurchase: "Fecha de la compra: ",
            address: "Dirección",
            email: "Correo",
            quantityOfProduct: "Cantidad de productos: ",
            total: "Monto total: ",
            review: "Compartir tu opinión",
            price: "Precio",
          },
          formQA: {
            mustLogInToAsk:
              "Necesitas estar registrado para poder realizarle preguntas al vendedor",
            postedQuestion: "¡Pregunta realizada con éxito!",
            askSeller: "Hacerle una pregunta al vendedor",
            askAQuestion: "Pregunta algo...",
            postQuestion: "Realizar la pregunta",
          },
          adminLoggedNavBar: {
            admin: "ADMIN",
            user: "Usuarios",
            buys: "Compras",

            inventory: "Inventario",
            sell: "Vender",
            adminCategories: "Administrar categorías",
            logOut: "Cerrar sesión",
            qas: "P&R",
            switch: "Cambiar a modo usuario",
          },
          adminUnloggedNavBar: {
            switch: "Cambiar a modo usuario",
          },
          adminBuys: {
            pending: "Pendientes",
            accepted: "Aceptadas",
            rejected: "Rechazadas",
            confirmPurchase: "¡Confirmado! Enviando correo al comprador",
            cancelPurchase: "Rechazado. Se ha enviado un correo al comprador.",
            acceptPurchase: "Confirmar entrega del pedido",
            rejectPurchase: "Rechazar entrega del pedido",
          },
          adminCreateCategory: {
            created: "¡Nueva categoría añadida!",
            postCategory: "Crear nueva categoría",
            name: "Nombre de la categoría",
            submit: "Añadir nueva categoría",
          },
          adminAddCategories: {
            update: "¡Categoría actualizada con éxito!",
            delete: "Categoría borrada con éxito",
          },
          adminEditProduct: {
            delete: "Producto borrado con éxito",
            deleteProduct: "Eliminar",
            update: "Editar producto",
            updated: "¡Producto actualizado con éxito!",
            status: "Estado: ",
            active: "Disponible",
            inactive: "No disponible",
            fixErrors: "Por favor corrija los errores y reintente",
            confirmDelete: "¿Estás seguro de querer eliminar este producto?",
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
            errors_categories:
              "Es obligatorio introducir al menos una categoria",
            errors_stock:
              "Es obligatorio introducir la cantidad de unidades disponibles.",
            postProduct: "Nuevo producto",
            name: "Nombre",
            price: "Precio",
            description: "Descripción",
            categories: "Categorías",
            image: "Imagen",
            status: "Disponibilidad:",
            stock: "Unidades disponibles:",
            submit: "¡Publicar!",
            select: "Seleccionar",
            productSubmitted: "¡Producto añadido exitosamente!",
          },
          adminUser: {
            manageRoles: "Administrar roles de usuario",
            setAdmin: "Convertir en administrador",
            username: "Nombre de usuario: ",
            email: "Dirección de correo: ",
            admin: "Administrador: ",
          },
          adminQaS: {
            solvedQuestions: "Preguntas resueltas",
            pendingQuestions: "Preguntas pendientes",
            answered: "Contestadas",
            pending: "Pendientes",
            noPending: "No hay preguntas pendientes",
            fillThisSpace: "Por favor rellene este campo",
            view: "Ver el producto",
            product: "Producto: ",
            questionDate: "Pregunta realizada el: ",
            question: "Pregunta: ",
            answer: "Respuesta: ",
            lackingAnswer: "Aún no respondida",
            edit: "Modificar",
            answerQuestion: "Responder a la pregunta",
            submit: "Responder",
            answerAdded: "¡Respuesta añadida!",
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
            confirmLogOut: "¿Estás seguro de querer cerrar sesión?",
            cart: "Carrito",
            history: "Historial",
            language: "Idioma",
            loggedOut: "Sesión cerrada. Hasta luego",
          },
          adminHome: {
            filter: "Filtrar:",
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
            reset: "Limpiar filtros",
          },
          home: {
            promoCard: {
              cuotes: {
                title: "Aceptamos Paypal",
                subTitle: "Visa/Mastercard",
              },
              return: {
                title: "Devolución gratis",
                subTitle: "Cambios sin cargo",
              },
              delivery: { title: "Envíos Express", subTitle: "CABA y GBA" },
            },
            recommended: "Recomendados",
            rating: "Mejor puntuados",
            mostSold: "¡Más vendidos!",
            altAddToCart: "¡Añadido al carrito!",
            altAlreadyInCart: "El producto ya se encuentra en tu carrito",
            altAddToFavs: "¡Añadido a favoritos!",
            altRemoveFromFavorites: "Producto eliminado de favoritos",
            mustBeLoggedIn:
              "Necesitas estar registrado para añadir productos a tu lista de favoritos",
            logInProducts:
              "Necesitas ingresar para añadir productos al carrito",
          },
          history: {
            shoppingHistory: "Historial de compras",
            instructions: "Haga click sobre las órdenes para ver los detalles",
            submit: "Enviar",
            sendReview: "¡Reseña enviada con éxito!",
          },
          loginAdmin: {
            login: "Ingreso a Administración",
            wrongCredentials: "Credenciales incorrectas",
          },
          logInForm: {
            errors_mail_required: "Se requiere una dirección de correo.",
            errors_mail_invalid:
              "Dirección de correo inválida. Prueba con otra.",
            errors_password: "Se requiere una contraseña.",
            logIn: "¡Bienvenido!",
            mail: "Dirección de correo",
            password: "Contraseña",
            submit: "Ingresar",
            logInGoogle: "Ingresar con Google",
            notUser: "¿No tienes una cuenta?",
            newUser: "Crear un nuevo usuario",
            loggedIn: "¡Ingreso exitoso!",
            checkEmailConfirmation: "Revisa tu correo para la confirmación",
            banned: "Tu cuenta ha sido baneada."
          },
          productDetailsInfo: {
            categories: "Categorías: ",
            description: "Detalles del producto: ",
            stock: "Unidades disponibles:",
            price: "Precio: ",
            productReviews: "Reseñas acerca de este producto",
            qa: "Preguntas acerca de este producto: ",
            q: "P: ",
            a: "R: ",
          },
          searchBar: {
            placeholder: "Buscar",
            language: "Idioma",
          },
          searchedProducts: {
            noValidInputs: "Por favor ingrese números válidos",
          },
          sendBuys: {
            price: "Precio: ",
            amount: "Cantidad: ",
            totalPerProduct: "Total por producto: ",
            productsList: "Lista de productos:",
            paymentMethod: "Elija su método de pago preferido",
            card: "Pago con tarjeta",
            cardPay: "Realizar la compra con tarjeta",
            paypal: "Pago mediante PayPal",
            paypalProcessing: "Procesando el pago. Aguarde unos instantes...",
            paypalConfirm: "Realizar la compra mediante PayPal",
            totalPrice: "Precio total: ",
            processingCard: "Procesando el pago. Aguarde un instante...",
            insuficientQuantity: "El stock actual es insuficiente.",
            error: "Hubo un problema con tu compra.",
            cardProblem: "Hubo un problema con tu tarjeta",
            chooseAddress: "Elegir una dirección de envío",
            accountAddress: "Mi dirección",
            newAddress: "Agregar nueva dirección",
            fillShippingAddress: "Por favor complete el formulario de envío",
            addressNotComplete:
              "Complete su información personal para continuar",
          },
        },
      },
      en: {
        translation: {
          navigation: {
            goBack: "Return to home",
            returnToCart: "Return to your cart",
            return: "Return",
          },
          errors: {
            error_name: "Name is required",
            error_country: "Country is required",
            error_city: "City is required",
            error_province: "State is required",
          },
          accountDetails: {
            btnEditProfile: "Edit",
            info: "Personal information",
            email: "Email: ",
            name: "Name: ",
            lastname: "Lastname: ",
            country: "Country: ",
            city: "City: ",
            province: "State: ",
            street: "Street: ",
            postalCode: "Postal code: ",
          },
          accountDetailsForm: {
            toastInfo: "Your information has been successfully updated.",
            changePassword: "Change password",
            askPasswordChange:
              "Are you sure you want to change your current password?",
            confirmPasswordChange:
              "Password updated. Please check your email account.",
            updateInfo: "Update information",
            email: "Email address",
            name: "Name",
            lastname: "Lastname",
            password: "Password",
            image: "Profile avatar",
            address: "Address: ",
            city: "City",
            country: "Country",
            postalCode: "Postal code",
            province: "State",
            street: "Street",
            submit: "Edit",
          },
          articleFavorites: {
            price: "Price: ",
            rating: "Rating: ",
            productDetails: "View details",
            removeFavorite: "Remove favorite",
          },
          favorites: {
            favorites: "Favorites",
          },
          cart: {
            qty: "Qty: ",
            removeFromCart: "Product removed from the cart",
            removeEverythingFromCart: "Cart successfully emptied out.",
            confirmClearCart:
              "Are you really sure you want to discard your entire cart?",
            emptyTheCart: "Discard the cart",
            welcome: "Welcome to your shopping cart",
            emptyCart: "Your shopping cart is currently empty",
            totalPrice: "Total purchase price: ",
            buy: "Buy",
            successfulPurchase: "Purchase successfully done!",
            cancelPurchaseSuccess: "Purchase successfully cancelled",
            addressDetailsMissing:
              "Please complete your missing billing address",
            noStock: "Stock not available",
          },
          categoriesComp: {
            error_pos_numbers: "Only positive numbers allowed",
            error_valid_numbers: "Please use valid values",
            error_valid_cats: "Please choose the appropiate categories",
            priceRange: "Price",
            minPrice: "$Min",
            maxPrice: "$Max",
            search: "Search",
            sortBy: "Order",
            asc: "Ascending",
            des: "Descending",
            noCats: "We couldn't find any product with the chosen categories",
          },
          createUserTest: {
            errors_mail_required: "Email address is required.",
            errors_mail_invalid:
              "Email address invalid. Please try another one.",
            errors_mail_taken: "This email is already taken.",
            errors_mail_checkemail:
              "Please check your email to verify your account!",
            errors_password: "Password is required.",
            errors_password_invalid:
              "Password must have between 8 to 16 characteres, uppercase and lowercase, and at least 1 number.",
            errors_password_match: "Passwords must match.",
            createAccount: "Create a new account",
            accountCreated:
              "Account successfully registered! Please, check your email account to confirm your registration",
            name: "Username",
            email: "Email address",
            password: "Password",
            confirmPassword: "Confirm password",
          },
          dateHistory: {
            dateOfPurchase: "Date of purchase: ",
            address: "Address: ",
            quantityOfProduct: "Product amount: ",
            email: "Email",
            total: "Total price: ",
            review: "Add review",
            price: "Price",
          },
          formQA: {
            mustLogInToAsk:
              "You need to be logged in to ask questions to the seller",
            postedQuestion: "Question successfully posted!",
            askSeller: "Ask a question to the seller",
            askAQuestion: "Ask something...",
            postQuestion: "Submit question",
          },
          adminLoggedNavBar: {
            admin: "ADMIN",
            user: "Users",
            buys: "Purchases",

            inventory: "Stock",
            sell: "Sell",
            adminCategories: "Administer categories",
            logOut: "Logout",
            qas: "Q&A",
            switch: "Switch to user mode",
          },
          adminUnloggedNavBar: {
            switch: "Switch to user mode",
          },
          adminBuys: {
            pending: "Pending",
            accepted: "Accepted",
            rejected: "Rejected",
            confirmPurchase: "Confirmed! Sending a mail to the buyer",
            cancelPurchase: "Rejected. A mail has been sent to the buyer",
            acceptPurchase: "Confirm purchase delivery",
            rejectPurchase: "Reject purchase delivery",
          },
          adminCreateCategory: {
            created: "New category added!",
            postCategory: "Create a new category",
            name: "Category name",
            submit: "Add new category",
          },
          adminAddCategories: {
            update: "Category successfully updated!",
            delete: "Category successfully deleted",
          },
          adminEditProduct: {
            delete: "Product successfully deleted",
            deleteProduct: "Delete",
            update: "Edit product",
            updated: "Product successfully updated!",
            status: "Status: ",
            active: "Active",
            inactive: "Inactive",
            fixErrors: "Please correct the mistakes and try again",
            confirmDelete:
              "Are you really sure you want to delete this product?",
          },
          adminProductCard: {
            edit: "Edit",
            rating: "Rating: ",
            stock: "Stock: ",
            status: "Status: ",
          },
          adminProductDetails: {
            update: "Update product",
            categories: "Categories: ",
            description: "Product description:",
            available: "Available: ",
            price: "Price: ",
          },
          adminSellProduct: {
            errors_name: "It's obligatory to introduce a name",
            errors_price: "It's obligatory to introduce a price",
            errors_description: "It's obligatory to introduce a description",
            errors_categories:
              "It's obligatory to introduce at least a category",
            errors_stock:
              "It's obligatory to introduce the amount of the stock",
            postProduct: "New product",
            name: "Name",
            price: "Price",
            description: "Description",
            categories: "Categories",
            image: "Image",
            status: "Status: ",
            stock: "Stock: ",
            submit: "Publish!",
            select: "Select",
            productSubmitted: "Product added successfully!",
          },
          adminUser: {
            manageRoles: "Manage user roles",
            setAdmin: "Set admin status",
            username: "Username: ",
            email: "Email addres: ",
            admin: "Administrator: ",
          },
          adminQaS: {
            solvedQuestions: "Solved questions",
            pendingQuestions: "Pending questions",
            answered: "Answered",
            pending: "Pending",
            noPending: "Theare are no pending questions at the moment",
            fillThisSpace: "Please fill this field",
            view: "View details",
            product: "Product: ",
            questionDate: "Question asked on:",
            question: "Question: ",
            answer: "Asnwer: ",
            lackingAnswer: "Still not answered",
            edit: "Modify",
            answerQuestion: "Answer the question",
            submit: "Submit answer",
            answerAdded: "Answer submitted!",
          },
          guestNavBar: {
            home: "Home",
            categories: "Categories",
            logIn: "Log in/Sign up",
            cart: "Cart",
          },

          loggedNavBar: {
            home: "Home",
            categories: "Categories",
            profile: "Profile",
            accountDetails: "Account details",
            favorites: "Favorites",
            logOut: "Log out",
            confirmLogOut: "Are you sure you want to log out?",
            cart: "Cart",
            history: "History",
            language: "Language",
            loggedOut: "Successfully logged out. See you later",
          },
          adminHome: {
            filter: "Filter:",
            name: "Name",
            stock: "Stock",
            rating: "Rating",
            price: "Price",
            status: "Status",
            active: "Active",
            inactive: "Inactive",
            category: "Category:",
            order: "Order:",
            valueAsc: "Ascending",
            valueDes: "Descending",
            reset: "Reset filters",
          },
          home: {
            recommended: "Recommended",
            rating: "Best rated",
            mostSold: "Most sold!",
            altAddToCart: "Added to the cart",
            altAlreadyInCart: "Product is already in the cart",
            
            altAddToFavs: "Added to favorites!",
            altRemoveFromFavorites: "Product removed from favorites",
            mustBeLoggedIn:
              "You need to be logged in to add products to your favorites list",
            logInProducts:
              "You need to be logged in to add products to your shopping cart",
            promoCard:{
              delivery: {
                title: "Express Shipping",
                subTitle: "CABA & GBA"
              },
              cuotes: {
                title: "Pay with PayPal",
                subTitle: "Visa/Mastercard"
              },
              return: {
                title: "Free returns",
                subTitle: "Change sizes for free"
              }
            }
          },
          history: {
            shoppingHistory: "Shopping history",
            instructions: "Click on the orders to see more info",
            submit: "Send",
            sendReview: "Review successfully sent!",
          },
          loginAdmin: {
            login: "Access to Administration",
            wrongCredentials: "Wrong credentials",
          },
          logInForm: {
            errors_mail_required: "Email address is required.",
            errors_mail_invalid: "Email address is invalid. Try another one.",
            errors_password: "Password is required.",
            logIn: "Welcome!",
            mail: "Email address",
            password: "Password",
            submit: "Log in",
            logInGoogle: "Log in Google",
            notUser: "Don't have an account yet?",
            newUser: "Create a new user",
            loggedIn: "Successfully logged in!",
            checkEmailConfirmation: "Check your email for confirmation",
            banned: "Your account has been banned"
          },
          productDetailsInfo: {
            categories: "Categories: ",
            description: "Product details: ",
            stock: "Stock:",
            price: "Price: ",
            productReviews: "Reviews about this product",
            qa: "Questions about this product: ",
            q: "Q: ",
            a: "A: ",
          },
          searchBar: {
            placeholder: "Search",
            language: "Language",
          },
          searchedProducts: {
            noValidInputs: "Please use valid inputs",
          },
          sendBuys: {
            price: "Price: ",
            amount: "Amount: ",
            totalPerProduct: "Total per product: ",
            productsList: "Products list:",
            paymentMethod: "Choose your preferred payment method",
            card: "Payment with debit/credit card",
            cardPay: "Purchase with your card",
            paypal: "Pay with PayPal",
            paypalProcessing: "Processing payment. Please hold on a while...",
            processingCard: "Processing payment. Please hold on a while...",
            paypalConfirm: "Continue to PayPal",
            totalPrice: "Total price: ",
            insuficientQuantity: "Current is insuficient.",
            error: "There's been a problem with your purchase.",
            cardProblem: "There was a problem with your card",
            chooseAddress: "Choose a shipping address",
            accountAddress: "My address",
            newAddress: "Add a new shipping address",
            fillShippingAddress: "Please fill the shipping form first",
            addressNotComplete:
              "Information incomplete. Please, complete your profile info first",
          },
        },
      },
    },
  });

//Cuando queremos usarlo en un componente invocamos al hook useTranslation. Luego dentro de la lógica hacemos lo propio que con cualquier hook -> const {t} = useTranslation()
