const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');
const mongoConnect = require('./util/database').mongoConnect;
const User = require('./models/userM');

// const Product = require('./models/productM');
// const User = require('./models/userM');
// const Cart = require('./models/cartM');
// const CartItem = require('./models/cart-itemM');
// const Order = require('./models/orderM');
// const OrderItem = require('./models/order-itemsM');
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

 const adminRoutes = require('./routes/admin');
 const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
    User.findById("5cdfb62f3b9a911f00b1bfc3")
        .then(user => {
            req.user = new User(user.username,user.email,user.cart,user._id);
            next();
        })
        .catch(err => console.log(err));
})
 app.use('/admin', adminRoutes);
 app.use(shopRoutes);

app.use(errorController.get404);

mongoConnect(() => {
    app.listen(3000);
    })

