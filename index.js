const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const {v4: uuid} = require('uuid');

app.use(express.static(path.join(__dirname,'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');

var products = [
    {
        id: uuid(),
        product: 'Tomato',
        category: 'Vegetable',
        price: '5.99'
    },
    {
        id: uuid(),
        product: 'Apple',
        comment: 'Fruit',
        price: '8.99'
    },
    {
        id: uuid(),
        product: 'Blueberry',
        comment: 'Fruit',
        price: '5.99'
    },
    {
        id: uuid(),
        product: 'Cherry',
        comment: 'Fruit',
        price: '5.75'
    },
    {
        id: uuid(),
        product: 'Carrot',
        comment: 'Vegetable',
        price: '4.99'
    },
    {
        id: uuid(),
        product: 'Mint',
        comment: 'Herb',
        price: '4.99'
    }

];

app.get('/', (req,res)=> {
    res.render('index');
})

app.get('/products', (req,res) => {
    res.render('products/index', { products })
})

app.get('/products/new', (req, res) => {
    res.render('products/new');
})

app.post('/products',(req,res)=> {
    const {product, comment} = req.body;
    products.push({product, comment, id: uuid()});
    res.redirect('/products');
})

app.get('/products/:id',(req,res) => {
    const { id } = req.params;
    const product = products.find(c => c.id === id);
    res.render('products/show', { product });
})

app.get('/products/:id/edit', (req,res) => {
    const { id } = req.params;
    const product = products.find(c => c.id === id);
    res.render('products/edit', { product });
})

app.patch('/products/:id', (req,res)=> {
    const { id } = req.params;
    const newCommentText = req.body.comment;
    console.log(newCommentText);
    const foundComment = products.find(c => c.id === id);
    console.log('Testing');
    foundComment.comment = newCommentText;
    res.redirect('/products');
})

app.delete('/products/:id', (req,res)=> {
    const { id } = req.params;
    products = products.filter(c => c.id !== id);
    res.redirect('/products');
})

app.get('/about', (req,res) => {
    res.render('about');
})

app.listen(3000, () => {
    console.log("LISTENING ON PORT 3000!");
});