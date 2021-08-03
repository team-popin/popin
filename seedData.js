const categories = [
  {name: 'Music'},
  {name: 'Legal'},
  {name: 'Medicine'},
  {name: 'Therapy'},
  {name: 'Business'},
  {name: 'Technology'},
  {name: 'Cooking'},
  {name: 'Friendship'}

]
const orders = [
  {isPurchased: true},
  {isPurchased: false},
  {isPurchased: true},
  {isPurchased: false},
  {isPurchased: false},
  {isPurchased: false},
  {isPurchased: false},
  {isPurchased: true},
  {isPurchased: true},
  {isPurchased: true},
  {isPurchased: true},
  {isPurchased: true},
  {isPurchased: true},
];

const product = [
  {name: 'Guitar Lesson',
  price: 15,
  description: 'Learn to play guitar or just get some help at a moment\'s notice. From beginner to professional!'},
  {name: 'Flute Lesson',
  price: 15,
  description: 'Learn to play flute or just get some help at a moment\'s notice. From beginner to professional!'},
  {name: 'Drum Lesson',
  price: 30,
  description: 'Learn to play drums or just get some help at a moment\'s notice. From beginner to professional!'},
  {name: 'Piano Lesson',
  price: 20,
  description: 'Instant help for playing piano!'},
  {name: 'Business Law Consultation',
  price: 150,
  description: 'Get legal consultation about any of your business needs on demand from one of the nations leading firms.'},
  {name: 'Immigration Legal Services',
  price: 75,
  description: 'Helpful walkthroughs and advice about your immigration process to the United States.'},
  {name: 'Family Tele-Medicine',
  price: 45,
  description: 'Feeling sick or need a referral? Call with me today!'},
  {name: 'iPhone Help',
  price: 15,
  description: 'Need help using your new iPhone? I\'ll gladly help!'},
  {name: 'BBQ Master',
  price: 15,
  description: 'Beef, pork, fish, chicken... you name it! I\'ll show you how to cook it better than any other!'},
  {name: 'Wedding Catering Consultation',
  price: 20,
  description: 'Learn the best strategies and come up with a plan for your wedding\'s catering.'},
  {name: 'Caring Friend',
  price: 15,
  description: 'Sometimes you just need an extra ear to hear you out. I\'ll be sure to listen to you the whole way through and do my best to make you comfortable and heard!'}
];



const productTimeSlot = [
  {dateTime: '2021-08-10 10:00'},
  {dateTime: '2021-08-10 10:30'},
  {dateTime: '2021-08-10 11:00'},
  {dateTime: '2021-08-10 12:00'},
  {dateTime: '2021-08-10 13:00'},
  {dateTime: '2021-08-10 14:00'},
  {dateTime: '2021-08-10 11:00'},
  {dateTime: '2021-08-10 11:30'},
  {dateTime: '2021-08-10 12:00'},
  {dateTime: '2021-08-10 18:00'},
  {dateTime: '2021-08-10 19:00'},
  {dateTime: '2021-08-10 20:00'},
  {dateTime: '2021-08-11 09:00'},
  {dateTime: '2021-08-11 09:30'},
  {dateTime: '2021-08-11 10:00'},
  {dateTime: '2021-08-11 17:00'},
  {dateTime: '2021-08-11 18:00'},
  {dateTime: '2021-08-11 19:00'},
];

C

module.exports = {
  categories,
  orders,
  product,
  productTimeSlot
}
