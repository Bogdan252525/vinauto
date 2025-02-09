import { hashSync } from "bcrypt"
import { UserRole, ProductStatus } from '@prisma/client'

export const users = [
	{
		firstName: 'Vasya',
		lastName: 'Pupkin',
		email: 'user@test.com',
		password: hashSync('111111', 10),
		verified: new Date(),
	},
	{
		firstName: 'Masha',
		lastName: 'Dubina',
		email: 'admin@test.com',
		password: hashSync('111111', 10),
		verified: new Date(),
		role: UserRole.ADMIN,
	},
	{
		firstName: 'Kolya',
		lastName: 'Yolya',
		email: 'user2@test.com',
		password: hashSync('111111', 10),
		verified: new Date(),
	},
	{
		firstName: 'Lyuda',
		lastName: 'Pupkina',
		email: 'user3@test.com',
		password: hashSync('111111', 10),
		verified: new Date(),
	},
	{
		firstName: 'Aleksey',
		lastName: 'Blabla',
		email: 'user4@test.com',
		password: hashSync('111111', 10),
		verified: new Date(),
	},
	{
		firstName: 'Lyusya',
		lastName: 'Xoxo',
		email: 'user5@test.com',
		password: hashSync('111111', 10),
		verified: new Date(),
	},
]

export const categories = [
	{
		name: 'Автоелектроніка'
	},
	{
		name: 'Універсальні аксесуари'
	},
	{
		name: 'Автосвітло'
	},
	{
		name: 'Автохімія та автокосметика'
	},
	{
		name: 'Лакофарбова продукція'
	},
	{
		name: 'Ковпаки колісні'
	},
	{
		name: 'Бризговики модельні'
	},
]

export const products = [
	{
		name: 'FM-модулятор Sertec 216 TOYOTA + пульт.',
		description: "Пульт дистанційного керування цифровий дисплей, що показує хвилю, гучність, порядковий номер пісні. Діапазон хвиль: понад 200 хвиль, 87,5 мгц — 108 мгц, з проміжком 0.1 мГц, з запам'ятовуванням останніх налаштувань (хвиля, лад пісні тощо)2.0 USB-вхід із високою швидкістю передавання, живиться від гнізда автомобільного прикурювача (12 В. ПТ), зчитує пісні в МР3 форматі з USB флеш диска (якщо модулятор не має вбудованої пам'яті) або з SD карти та передає радіохвильовий на автомагнітолу по однаково налаштованій хвилі.4 основні функції: відтворення/пауза/вперед/назад/ і настроювання хвилі, регулювання гучності.",
		price: 230,
		stock: 3,
		isOnSale: true,
		categoryId: 1,
	},
	{
		name: 'Світлодіодна стрічка біла на білій основі в силіконі',
		description: "Світлодіодна стрічка — оптимальний варіант для створення декоративної або основної підсвітки в приміщенні, для підсвічування на кухні, підсвічування вітрин і багато чого іншого.",
		price: 230,
		stock: 5,
		categoryId: 1,
	},
	{
		name: 'Вогнегасник порошковий',
		description: "Вогнегасник автомобільний ОП-1(з) (ВП-1(з), порошковий закачний (з манометром), за бажанням може комплектуватися кронштейном. Для гуртових покупців — паковання в коробці по дванадцять штук. Сертифікат, паспорт. Гарантія — 12 місяців із дня продажу. Подальше технічне обслуговування. Детальніше: https://autotochka.vn.ua/ua/p440675177-ognetushitel-avtomobilnyj-poroshkovyj.html",
		price: 309,
		status: ProductStatus.OUT_OF_STOCK,
		categoryId: 2,
	},
	{
		name: 'Аптечка АМА-1 в сумці',
		description: "Аптечка АМА-1 призначена для укомплектована легкових, вантажних автомобілів, автобусів, маршрутних таксі а так само тракторів.Укомплектована згідно ГОСТ 3961-2000, зміна №2 від 09.01.2013 р Термін зберігання аптечки встановлюють по терміну придатності лікарського засобу з найменшим строком зберігання з дня відправки від підприємства виробника.",
		price: 0,
		stock: 7,
		categoryId: 2,
	},
	{
		name: 'Галогенка H1 12V 55W "Philips"',
		description: "Philips — це виробник якісних автоламп, що вже давно зарекомендував себе, які забезпечують довгий і безперебійний термін експлуатації.Робоча напруга — 12 В.Потужність автолампи — 55 Вт",
		price: 128,
		status: ProductStatus.OUT_OF_STOCK,
		stock: 4,
		categoryId: 3,
	},
	{
		name: 'Ксенонова лампа H1 CYCLON STANDART',
		description: "Лампа ксенон CYCLON H1 6000K/5000K/4300K 12 V 35 W  — це якісне автомобільне освітлення, яке вирізняється надійністю, стабільністю і високою потужністю.  Газ ксенон під великим тиском закачаний у колбу з двома електродами, де забезпечує насичене, рівномірне та яскраве світіння, а також довгий термін експлуатації. Лампи відрізняються ресурсом роботи до 2000 годин,  світловою температурою 6000K/5000K/4300K. Лампи ксенон економні в споживанні енергії, гарантують солідну освітлену зону, безпеку та комфорт водіння.  Детальніше: https://autotochka.vn.ua/ua/p363108831-ksenonovaya-lampa-cyclon.html",
		price: 214,
		stock: 9,
		categoryId: 3,
	},
	{
		name: 'Мастило біла BS80',
		description: "Мастило біла BS80, APP, 400ml, 212008 універсальне змащувальне засіб з вмістом РТFЕ з нейтральним рН. Призначено для використання при температурі -30*С до + 180*С. Стійко на вплив кислот, солей та лугів невеликій концентрації. Видаляє воду і захищає метал від корозії. Оберігає від замерзання рухливі металеві частини машин. Детальніше: https://autotochka.vn.ua/ua/p1515928048-smazka-belaya-bs80.html",
		price: 215,
		stock: 3,
		isOnSale: true,
		categoryId: 4,
	},
	{
		name: 'Клей для монтажу дзеркал заднього виду SLP99, APP, 2ml, 040504',
		description: "Клей для монтажу дзеркал заднього виду SLP99, APP, 2ml, 040504 – це комплект, що складається з метакрилово-уретанового однокомпонентного клею та каталітичної плівки для вклеювання дзеркала заднього виду до переднього скла. Клей також може застосовуватися для кріплення тримачів бокового скла. Застосована композиція смол згладжує різницю в тепловій розширюваності скла та основи дзеркала. Стійкий до температури від -50 до 150°С.",
		price: 225,
		stock: 5,
		categoryId: 4,
	},
	{
		name: 'Антигравий Polfill під пістолет, 100, чорний, 1kg, 43148',
		description: "Антигравий Polfill під пістолет, 100, чорний, 1kg, 43148 створене на основі синтетичних смол, ефективне і продуктивне засіб, призначений для захисту елементів кузова автомобіля від корозії. Створює адгезивное, міцне еластичне покриття з чіткою структурою, завдяки якому дуже добре захищає підлогу, пороги, рами і т. п. від впливу каменів і шкідливого впливу атмосферних умов, а також солей і масел. Володіє також хорошими звукоізоляційними властивостями. Ідеально підходить для ситуацій, що вимагають нанесення більш товстих захисних шарів, що дозволяють відновлення заводських фактур. Після висихання може покриватись будь-якими покривними лаками. Призначено для напилення пістолетом типу UBS.",
		price: 220,
		stock: 5,
		categoryId: 5,
	},
	{
		name: 'Анстисиликон (добавка) Dyo 0.5 l',
		description: "Dyo проводиться Турецької корпорацією Yaşar Paint Group. Yaşar Paint Group на ринку ЛКП вже більше 85 років і продовжує розвиватися з кожним днем об'єднуючи досвід минулого і технології майбутнього . Yaşar Paint Group співпрацює більш ніж з 40 країнами по всьому світу.Анстисиликон (добавка) Dyo 0.5 l -засіб-добавка в фарбу. Застосовується для уникнення появи кратерів на пофарбованій поверхні. У процесі роботи розчиняє жирові сполуки, які можуть залишитися на поверхні окрашеваемой деталі або потрапити до складу фарби під час роботи (краплі в повітрі, масло з компресора тощо). Виробником рекомендовано додавати 2% антисиликона у фарбу. Тільки для акрилових продуктів.",
		price: 230,
		stock: 5,
		categoryId: 5,
	},
	{
		name: 'КОВПАКИ ДЛЯ ДИСКІВ SJS/SKS 200/R14 КОЛПАКИ НА КОЛЕСА (З ЛОГОТИПОМ АВТО) К-Т.-4 ШТУКИ.',
		description: "Автомобільні ковпаки SJS/SKS виробляються в Туреччині. Ковпаки для коліс SJS/SKS коплектуются емблемами авто. Зроблені ковпаки для автомобіля з унікального сплаву пластмас, що робить ковпаки гнучкими. Ви можете згинати навпіл автоколпаки , і при цьому вони не будуть ламатися.Вони здатні до самостійного відновлення навіть після сильної деформації, без втрати початкових характеристик і зовнішнього вигляду. Комплект автомобільних ковпаків SJS/SKS складається з чотирьох штук і коробки Детальніше: https://autotochka.vn.ua/ua/p1107297107-kolpaki-dlya-diskov.html",
		price: 902,
		stock: 5,
		categoryId: 6,
	},
	{
		name: 'КОВПАК НА КОЛЕСА SJS/SKS 300/R15 (З ЛОГОТИПОМ АВТО)',
		description: "Автомобільні ковпаки SJS/SKS виробляються в Туреччині.  Ковпаки для коліс SJS/SKS коплектуються емблемами авто. Зроблені ковпаки для автомобіля  з унікального сплаву пластмас, що робить ковпаки  гнучкими. Ви можете згинати навпіл автоковпаки, і водночас вони не ламаються. Вони здатні до самостійного відновлення навіть після сильної деформації, без втрати початкових характеристик і зовнішнього вигляду. Комплект автомобільних ковпаків SJS/SKS складається з чотирьох штук і коробки",
		price: 903,
		stock: 5,
		categoryId: 6,
	},
	{
		name: 'Бризковики Audi A4 (B6) 2001-2004г. (Польща)',
		description: "Предметом пропозиції є універсальні бризковики виробництва Польща, з гнучкого пластику (поліетилену), призначені для самостійного встановлення на передній і задній осях автомобіля. Дані бризковики міряли та встановлювалися на відповідну марку автомобіля.Ціна вказана за кілька бризковиків передніх або кілька задніх. Купувати можна як комплект 4 штуки, так і 2 шт. передніх або задніх",
		price: 285,
		stock: 5,
		categoryId: 7,
	},
	{
		name: 'Бризковики BMW 3 (E30) 1982-1994 р. (Польща)',
		description: "Предметом пропозиції є універсальні бризковики виробництва Польща, з гнучкого пластику (поліетилену), призначені для самостійного встановлення на передній і задній осях автомобіля. Дані бризковики міряли та встановлювалися на відповідну марку автомобіля.Ціна вказана за кілька бризковиків передніх або кілька задніх.Купувати можна як комплект 4 штуки, так і 2 шт. передніх або задніхl",
		price: 285,
		stock: 5,
		categoryId: 7,
	},
]

export const images = [
	{
		url: '/assets/img/products/fm-modulator.webp',
		productId: 1,
		isPrimary: true,
	},
	{
		url: '/assets/img/products/fm-modulator2.webp',
		productId: 1,
	},
	{
		url: '/assets/img/products/fm-modulator.webp',
		productId: 2,
		isPrimary: true,
	},
	{
		url: '/assets/img/products/fm-modulator2.webp',
		productId: 2,
	},
	{
		url: '/assets/img/products/powdered-vognegasnik.webp',
		productId: 3,
		isPrimary: true,
	},
	{
		url: '/assets/img/products/powdered-vognegasnik2.webp',
		productId: 3,
	},
	{
		url: '/assets/img/products/powdered-vognegasnik3.webp',
		productId: 3,
	},
	{
		url: '/assets/img/products/powdered-vognegasnik.webp',
		productId: 4,
		isPrimary: true,
	},
	{
		url: '/assets/img/products/powdered-vognegasnik2.webp',
		productId: 4,
	},
	{
		url: '/assets/img/products/powdered-vognegasnik3.webp',
		productId: 4,
	},
	{
		url: '/assets/img/products/halogen-lamp.webp',
		productId: 5,
		isPrimary: true,
	},
	{
		url: '/assets/img/products/halogen-lamp.webp',
		productId: 6,
		isPrimary: true,
	},
	{
		url: '/assets/img/products/white-grease.webp',
		productId: 7,
		isPrimary: true,
	},
	{
		url: '/assets/img/products/white-grease.webp',
		productId: 8,
		isPrimary: true,
	},
	{
		url: '/assets/img/products/anti-gravel-polfill.webp',
		productId: 9,
		isPrimary: true,
	},
	{
		url: '/assets/img/products/anti-gravel-polfill.webp',
		productId: 10,
		isPrimary: true,
	},
	{
		url: '/assets/img/products/wheel-covers.webp',
		productId: 11,
		isPrimary: true,
	},
	{
		url: '/assets/img/products/wheel-covers2.webp',
		productId: 11,
	},
	{
		url: '/assets/img/products/wheel-covers3.webp',
		productId: 11,
	},
	{
		url: '/assets/img/products/wheel-covers.webp',
		productId: 12,
		isPrimary: true,
	},
	{
		url: '/assets/img/products/wheel-covers2.webp',
		productId: 12,
	},
	{
		url: '/assets/img/products/wheel-covers3.webp',
		productId: 12,
	},
	{
		url: '/assets/img/products/audi-mud-flaps.webp',
		productId: 13,
		isPrimary: true,
	},
	{
		url: '/assets/img/products/audi-mud-flaps2.webp',
		productId: 13,
	},
	{
		url: '/assets/img/products/audi-mud-flaps3.webp',
		productId: 13,
	},
	{
		url: '/assets/img/products/audi-mud-flaps4.webp',
		productId: 13,
	},
	{
		url: '/assets/img/products/audi-mud-flaps.webp',
		productId: 14,
		isPrimary: true,
	},
	{
		url: '/assets/img/products/audi-mud-flaps2.webp',
		productId: 14,
	},
	{
		url: '/assets/img/products/audi-mud-flaps3.webp',
		productId: 14,
	},
	{
		url: '/assets/img/products/audi-mud-flaps4.webp',
		productId: 14,
	},
]

export const carts = [
	{
		userId: 1,
		totalAmount: 0,
		token: '11111'
	},
	{
		userId: 2,
		totalAmount: 0,
		token: '22222'
	},
]

export const cartItem = {
	productItemId: 1,
	cartId: 1,
	quantity: 2,
}