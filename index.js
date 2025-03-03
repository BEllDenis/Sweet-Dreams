// Настройка Express
let express = require(`express`);
let app = express();
let cors = require('cors')
let port = 3000;

//Инициализация сервера
app.listen(port, function () {
    console.log(`Сервер запущен: http://localhost:${port}`)
});

//Подключение политики cors, запрещающей подключение к сайту с разным портов.
app.use(cors({
    origin: ["http://localhost:5173", "https://sweetdreams-confectionary.ru"], 
    methods: ["GET", "POST"]
}));  

//Подключение библиотеки Express,у прощающей построение backend-составляющей сайта.
app.use(express.json());
app.use(express.static('public'));

// Настройка БД
let mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/SweetDreams');

// СОЗДАНИЕ СХЕМ ДАННЫХ ДЛЯ КОЛЕКЦИЙ.
let schemaUsers = new mongoose.Schema({
    Name: String,
    Surname: String,
    Gender: String,
    PhoneNumber: Number,
    Mail: String,
    Password: String
},
{ 
    //Создание временных "марок"    
    timestamps: true 
});

let Users = mongoose.model('users', schemaUsers);

let schemaProducts = new mongoose.Schema({
    ImagePath: String,
    Name: String,
    Description: String,
    Price: Number,
    Category: String,
    Weight: Number
},
{ 
    //Создание временных "марок"
    timestamps: true 
});

let Products = mongoose.model('products', schemaProducts);

let schemaReviews = new mongoose.Schema({
    UserID: String,
    ReviewText: String
},
{ 
    //Создание временных "марок"
    timestamps: true 
});

let Reviews = mongoose.model('reviews', schemaReviews);

// РОУТЫ

app.get('/users', async function (req, res) {
    let UsersObject = await Users.find({Gender: 'man'}).sort({ createdAt: -1});

    res.send(UsersObject);
});

app.get('/new_products', async function (req, res) {
    let NewProducts = await Products.find().sort({createdAt: -1}).limit(4);

    res.send(NewProducts);
});

app.get('/user_comments', async function (req, res) {
    let UserReviews = await Reviews.find().lean();

    for (i = 0; UserReviews.length > i; i++) {
        let User = await Users.findById(UserReviews[i].UserID);

        UserReviews[i].Name = User.Name;
        UserReviews[i].Surname = User.Surname;
        UserReviews[i].Gender = User.Gender;
    };

    res.send(UserReviews);
});

app.get('/catalog', async function (req, res) {
    try {
        const { SelectedCategories, SelectedTypeOfSort } = req.query;

        // Формируем фильтрацию
        let filter = {};
        
        if (SelectedCategories) {
            filter.Category = { 
                $in: Array.isArray(SelectedCategories) 
                    ? SelectedCategories 
                    : [SelectedCategories] 
            };
        } 
        else {
            // Если категории не переданы - возвращаем пустой результат
            filter.Category = { $in: [] };
        }

        // Формируем сортировку
        let sort = {};
        if (SelectedTypeOfSort) {
            switch(SelectedTypeOfSort) {
                case 'New': 
                    sort.createdAt = -1;
                    break;
                case 'PriceIncrease': 
                    sort.Price = 1;
                    break;
                case 'PriceDecrease': 
                    sort.Price = -1;
                    break;
            }
        }

        const products = await Products.find(filter).sort(sort);
        res.send(products);

    } catch (error) {
        console.error('Ошибка при получении каталога:', error);
        res.status(500).send('Internal Server Error');
    }
});




