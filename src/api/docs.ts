/*********** SCHEMAS *********** */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         firstname:
 *           type: string
 *           description: firstname of user
 *         username:
 *           type: string
 *           description: the user's name
 *         lastname:
 *           type: string
 *           description: lastnameofuser
 *         email:
 *           type: string
 *           descripton: email
 *         password:
 *           type: string
 *           description: password for new account
 *         role:
 *           type: string
 *           description: can be CLIENT or MANAGER. default CLIENT
 *         newpassword:
 *           type: string
 *           description: NEW password
 *       example:
 *         firstname: Félix
 *         lastname: Panduro
 *         email: fpanduro@gmail.com
 *         password: felixfelicis
 *         role: CLIENT
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - name
 *         - description
 *       properties:
 *         id:
 *           type: number
 *           description: identifier
 *         name:
 *           type: string
 *           description: name's category
 *         description:
 *           type: string
 *           description: a few about category
 *       example:
 *         name: Toys
 *         description: Many types of toys for children
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       required:
 *         - createdById
 *         - categoryId
 *         - name
 *         - price
 *         - stock
 *       properties:
 *         id:
 *           type: number
 *           description: identifier
 *         name:
 *           type: string
 *           description: Product's category
 *         description:
 *           type: string
 *           description: a few about product
 *         category:
 *           type: string
 *           description: category name
 *         price:
 *           type: number
 *           description: Product's price
 *         stock:
 *           type: number
 *           description: stock of product
 *         disabled:
 *           type: boolean
 *           description: is disabled? default FALSE
 *         createdById:
 *           type: number
 *           description: Who created it ID
 *         categoryId:
 *           type: number
 *           description: Category ID
 *       example:
 *         name: Car 3
 *         description: Red car
 *         category: toys
 *         price: 122.9
 *         stock: 39
 *         createdById: 1
 *         categoryId: 1
 *
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Cart:
 *       type: object
 *       required:
 *         - userId
 *         - productId
 *         - quantity
 *       properties:
 *         id:
 *           type: number
 *           description: identifier
 *         userId:
 *           type: number
 *           description: User identifier
 *         productId:
 *           type: number
 *           description: Product Identifier
 *         quantity:
 *           type: number
 *           description: how much products
 *       example:
 *         name: Toys
 *         description: Many types of toys for children
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Like:
 *       type: object
 *       required:
 *         - userId
 *         - productId
 *       properties:
 *         id:
 *           type: number
 *           description: identifier
 *         userId:
 *           type: number
 *           description: user that Like the product
 *         productId:
 *           type: number
 *           description: ProductID liked
 *       example:
 *         userId: 1
 *         description: 1
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Order:
 *       type: object
 *       required:
 *         - userId
 *         - productId
 *       properties:
 *         id:
 *           type: number
 *           description: identifier
 *         userId:
 *           type: number
 *           description: ID of User owner
 *         total:
 *           type: number
 *           description: total to pay
 *         state:
 *           type: string
 *           description: can be SENT, WALK and RECEIVED
 *       example:
 *         total: 188.96
 *         state: SENT
 */

/*********** SCHEMAS *********** */

/**
 * @swagger
 * /auth/signup:
 *   post:
 *     summary: POST a new USER
 *     tags: [Auth]
 *     requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *          example:
 *            firstname: Félix
 *            lastname: Panduro
 *            username: ElJuelix24
 *            email: fpanduro@gmail.com
 *            password: felixfelicis
 *            role: CLIENT
 *     responses:
 *       201:
 *         description: User Created
 *       503:
 *         description: Intern error, servicio unavailable
 *       422:
 *         description: Process OK, but bad data
 */

/**
 * @swagger
 * /auth/signin:
 *   post:
 *     summary: Start Sesion and GET TOKEN
 *     tags: [Auth]
 *     requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *          example:
 *            email: fpanduro@gmail.com
 *            password: felixfelicis
 *     responses:
 *       201:
 *         description: Token Generated
 *       403:
 *         description: Unauthorize, Password not match
 *       422:
 *         description: Process OK, but bad data
 *       503:
 *         description: Servicio UNAVAILABLE
 */

/**
 * @swagger
 * /auth/signout:
 *   put:
 *     summary: Navigate to PROFILE using the TOKEN
 *     tags: [Auth]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK, Token destroyed
 *       503:
 *         description: Servicio UNAVAILABLE
 */

/**
 * @swagger
 * /password/recovery:
 *   post:
 *     summary: Password Forget, Request a Token
 *     tags: [Password Recovery]
 *     requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *          example:
 *            email: fpanduro@gmail.com
 *     responses:
 *       422:
 *         description: Bad DATA
 *       503:
 *         description: Servicio UNAVAILABLE
 *       200:
 *         description: OK, Navigate to MAIL
 *   put:
 *     summary: Password Forget, Process RECOVERY
 *     tags: [Password Recovery]
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *          example:
 *            email: fpanduro@gmail.com
 *            newpassword: NEWPASSWORD
 *     responses:
 *       422:
 *         description: Bad DATA
 *       503:
 *         description: Servicio UNAVAILABLE
 *       200:
 *         description: OK, Password CHANGUED
 */

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Add Category, Request a Token MANAGER
 *     tags: [Category]
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Category'
 *          example:
 *            name: Toys
 *            description: Many types of toys for children
 *     responses:
 *       422:
 *         description: Bad DATA
 *       503:
 *         description: Servicio UNAVAILABLE
 *       200:
 *         description: OK, Category CREATED
 */

/**
 * @swagger
 * /products/{id}:
 *   post:
 *     summary: Add Product, Request a Token MANAGER
 *     tags: [Product]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *      - in: path
 *        name: id
 *        description : id of Category
 *        schema:
 *          type: interger
 *     requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Product'
 *          example:
 *            name: Car 3
 *            description: Red car
 *            category: toys
 *            price: 122.9
 *            stock: 39
 *     responses:
 *       422:
 *         description: Bad DATA
 *       503:
 *         description: Servicio UNAVAILABLE
 *       201:
 *         description: OK, Product CREATED
 *   put:
 *     summary: UPDATE Product, Request a Token MANAGER
 *     tags: [Product]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *      - in: path
 *        name: id
 *        description : id of Product
 *        schema:
 *          type: interger
 *     requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Product'
 *          example:
 *            name: Car 4
 *            description: GREEN car
 *            category: toys
 *            price: 299.9
 *            stock: 100
 *     responses:
 *       422:
 *         description: Bad DATA
 *       503:
 *         description: Servicio UNAVAILABLE
 *       201:
 *         description: OK, Product UPDATED
 *   delete:
 *     summary: DELETE Product, Request a Token MANAGER
 *     tags: [Product]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *      - in: path
 *        name: id
 *        description : id of Product
 *        schema:
 *          type: interger
 *     responses:
 *       422:
 *         description: Bad DATA
 *       503:
 *         description: Servicio UNAVAILABLE
 *       200:
 *         description: OK, Product DELETED
 *   get:
 *     summary: GET Products detailed
 *     tags: [Product]
 *     parameters:
 *      - in: path
 *        name: id
 *        description : id of Product
 *        schema:
 *          type: interger
 *     responses:
 *       422:
 *         description: Bad DATA
 *       503:
 *         description: Servicio UNAVAILABLE
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /products/disable/{id}:
 *   put:
 *     summary: UPDATE Product for DISABLED, Request a Token MANAGER
 *     tags: [Product]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *      - in: path
 *        name: id
 *        description : id of Product
 *        schema:
 *          type: interger
 *     responses:
 *       422:
 *         description: Bad DATA
 *       503:
 *         description: Servicio UNAVAILABLE
 *       201:
 *         description: OK, Product UPDATED
 */

/**
 * @swagger
 * /products/category/{id}:
 *   get:
 *     summary: GET Product for Category
 *     tags: [Product]
 *     parameters:
 *      - in: path
 *        name: id
 *        description : id of Category
 *        schema:
 *          type: interger
 *     responses:
 *       422:
 *         description: Bad DATA
 *       503:
 *         description: Servicio UNAVAILABLE
 *       201:
 *         description: OK, Product UPDATED
 */

/**
 * @swagger
 * /products/img/{id}:
 *   post:
 *     summary: POST Product image, Request a Token MANAGER
 *     consumes:
 *      - multipart/form-data
 *     tags: [Product]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *      - in: path
 *        name: id
 *        description : id of Product
 *        schema:
 *          type: interger
 *     requestBody:
 *      content:
 *        image/jpg:
 *          schema:
 *            type: string
 *            format: gzip
 *     responses:
 *       422:
 *         description: Bad DATA
 *       503:
 *         description: Servicio UNAVAILABLE
 *       201:
 *         description: OK, IMG UPDATED
 */

/**
 * @swagger
 * /cart:
 *   post:
 *     summary: Add Products to CART, Request a Token CLIENT
 *     tags: [Cart]
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Cart'
 *          example:
 *            userId: 1
 *            productId: 1
 *            quantity: 10
 *     responses:
 *       422:
 *         description: Bad DATA
 *       503:
 *         description: Servicio UNAVAILABLE
 *       201:
 *         description: OK, CART item CREATED
 *   get:
 *     summary: GET my CART description, Request a Token CLIENT
 *     tags: [Cart]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       422:
 *         description: Bad DATA
 *       503:
 *         description: Servicio UNAVAILABLE
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /cart/{id}:
 *   delete:
 *     summary: DELETE Products from my CART, Request a Token CLIENT
 *     tags: [Cart]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *      - in: path
 *        name: id
 *        description : id of item Cart
 *        schema:
 *          type: interger
 *     responses:
 *       422:
 *         description: Bad DATA
 *       503:
 *         description: Servicio UNAVAILABLE
 *       200:
 *         description: OK, CART item CREATED
 *   put:
 *     summary: UPDATE item CART, Request a Token CLIENT
 *     tags: [Cart]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *      - in: path
 *        name: id
 *        description : id of item Cart
 *        schema:
 *          type: interger
 *     requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Cart'
 *          example:
 *            quantity: 1
 *     responses:
 *       422:
 *         description: Bad DATA
 *       503:
 *         description: Servicio UNAVAILABLE
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /like/{id}:
 *   put:
 *     summary: GIVE LIKE to a product, Request a Token CLIENT
 *     tags: [Like]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *      - in: path
 *        name: id
 *        description : id of item Product
 *        schema:
 *          type: interger
 *     responses:
 *       422:
 *         description: Bad DATA
 *       503:
 *         description: Servicio UNAVAILABLE
 *       200:
 *         description: OK, LIKE item CREATED
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: GET All Orders from DB, Request a Token MANAGER
 *     tags: [Order]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       422:
 *         description: Bad DATA
 *       503:
 *         description: Servicio UNAVAILABLE
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /orders/cli:
 *   get:
 *     summary: GET my Orders, Request a Token CLIENT
 *     tags: [Order]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       422:
 *         description: Bad DATA
 *       503:
 *         description: Servicio UNAVAILABLE
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /orders/cli/detail/{id}:
 *   get:
 *     summary: GET my Orders detail, Request a Token CLIENT
 *     tags: [Order]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *      - in: path
 *        name: id
 *        description : id of item Product
 *        schema:
 *          type: interger
 *     responses:
 *       422:
 *         description: Bad DATA
 *       503:
 *         description: Servicio UNAVAILABLE
 *       200:
 *         description: OK
 */

/**
 * @swagger
 * /cart/buy:
 *   put:
 *     summary: BUY from the cart, Request a Token CLIENT
 *     tags: [Cart]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       422:
 *         description: Bad DATA
 *       503:
 *         description: Servicio UNAVAILABLE
 *       200:
 *         description: OK
 */
