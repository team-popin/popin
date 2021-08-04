const categories = [
  { name: "Music" },
  { name: "Legal" },
  { name: "Medicine" },
  { name: "Business" },
  { name: "Technology" },
  { name: "Cooking" },
  { name: "Language" },
  { name: "Friendship" },
];
const orders = [
  { isPurchased: true },
  { isPurchased: false },
  { isPurchased: true },
  { isPurchased: false },
  { isPurchased: false },
  { isPurchased: false },
  { isPurchased: false },
  { isPurchased: true },
  { isPurchased: true },
  { isPurchased: true },
  { isPurchased: true },
  { isPurchased: true },
  { isPurchased: true },
];

//11 Total Products
const products = [
  {
    name: "Guitar Lesson",
    price: 15,
    description:
      "Learn to play guitar or just get some help at a moment's notice. From beginner to professional!",
  },
  {
    name: "Flute Lesson",
    price: 15,
    description:
      "Learn to play flute or just get some help at a moment's notice. From beginner to professional!",
  },
  {
    name: "Piano Lesson",
    price: 20,
    description: "Instant help for playing piano!",
  },
  {
    name: "Russian Lesson",
    price: 20,
    description: "Instant help with Russian!",
  },
  {
    name: "Business Consultation",
    price: 150,
    description:
      "Get strategic consultation about any of your business needs on demand from one of the nations leading firms.",
  },
  {
    name: "Immigration Legal Services",
    price: 75,
    description:
      "Helpful walkthroughs and advice about your immigration process to the United States.",
  },
  {
    name: "Family Tele-Medicine",
    price: 45,
    description: "Feeling sick or need a referral? Call with me today!",
  },
  {
    name: "iPhone Help",
    price: 15,
    description: "Need help using your new iPhone? I'll gladly help!",
  },
  {
    name: "BBQ Master",
    price: 15,
    description:
      "Beef, pork, fish, chicken... you name it! I'll show you how to cook it better than any other!",
  },
  {
    name: "Wedding Catering Consultation",
    price: 20,
    description:
      "Learn the best strategies and come up with a plan for your wedding's catering.",
  },
  {
    name: "Caring Friend",
    price: 15,
    description:
      "Sometimes you just need an extra ear to hear you out. I'll be sure to listen to you the whole way through and do my best to make you comfortable and heard!",
  },
  {
    name: "Drum Lesson",
    price: 30,
    description:
      "Learn to play drums or just get some help at a moment's notice. From beginner to professional!",
  },
];

//20 Product Time Slots
const productTimeSlotsRaw = [
  { dateTime: "2021-08-10 10:00" },
  { dateTime: "2021-08-10 10:30" },
  { dateTime: "2021-08-10 11:00" },
  { dateTime: "2021-08-10 12:00" },
  { dateTime: "2021-08-10 13:00" },
  { dateTime: "2021-08-10 14:00" },
  { dateTime: "2021-08-10 15:00" },
  { dateTime: "2021-08-10 16:30" },
  { dateTime: "2021-08-10 17:00" },
  { dateTime: "2021-08-10 18:00" },
  { dateTime: "2021-08-10 19:00" },
  { dateTime: "2021-08-10 20:00" },
  { dateTime: "2021-08-11 09:00" },
  { dateTime: "2021-08-11 09:30" },
  { dateTime: "2021-08-11 10:00" },
  { dateTime: "2021-08-11 12:30" },
  { dateTime: "2021-08-11 13:00" },
  { dateTime: "2021-08-11 17:00" },
  { dateTime: "2021-08-11 18:00" },
  { dateTime: "2021-08-11 19:00" },
];
const productTimeSlots = productTimeSlotsRaw.sort((a, b) => a.dateTime - b.dateTime);

//10 Total Users
const users = [
  {
    email: "user1@email.com",
    password: "password123",
    firstName: "Jane",
    lastName: "Doe",
    bio: "Hello, I am Jane. I am a master of Guitar and drums.",
  },
  {
    email: "user2@email.com",
    password: "password123",
    firstName: "David",
    lastName: "Smith",
    bio: "Hello, I am David. Come with me, and you will be a flute master.",
  },
  {
    email: "user3@email.com",
    password: "password123",
    firstName: "Nick",
    lastName: "Hawthorne",
    bio: "Hello, I am Nick. I have my doctorate in pinao from Juleeard",
  },
  {
    email: "user4@email.com",
    password: "password123",
    firstName: "Albina",
    lastName: "Johnson",
    bio: "Hello, I am Albina. I am a native Russian. Come learn Russian with me!",
  },
  {
    email: "user5@email.com",
    password: "password123",
    firstName: "Jason",
    lastName: "Daws",
    bio: "Hello, I am Jason. I went to Harvard Law. That explains all.",
  },
  {
    email: "user6@email.com",
    password: "password12613",
    firstName: "Deidre",
    lastName: "Patch",
    bio: "I have helped over 2000 people and over 300 families immigrate to the US from Asia and Europe.",
  },
  {
    email: "user7@email.com",
    password: "password12613",
    firstName: "Christian",
    lastName: "Elm",
    bio: "I have been practicing Family Medicine for over 25 years. I would be please to have you as my patient. I can give you advice and referrals!",
  },
  {
    email: "user8@email.com",
    password: "password1263",
    firstName: "Peter",
    lastName: "Lee",
    bio: "Hello, I am Peter. I have experience using all technology and would love to help you with your computer or mobile devices.",
  },
  {
    email: "user9@email.com",
    password: "password1243",
    firstName: "Sarah",
    lastName: "Zhao",
    bio: "Hello, I am Sarah. I have been a BBQ pitmaster for over 45 years. I have the best BBQ in all of Kanasas City. Yee haw!",
  },
  {
    email: "user10@email.com",
    password: "password1263",
    firstName: "Doc",
    lastName: "Sanders",
    bio: "Hello, I am Doc. I have catered over 3000 weddings. I am a master chef and also the host of Netflix's 'Catering Boss'",
  },
  {
    email: "user11@email.com",
    password: "password1235",
    firstName: "Nathan",
    lastName: "Lampart",
    bio: "Hello, I am Nathan. I am a good friend. There is nothing like being a friend with someone else.",
  },
];

module.exports = {
  categories,
  orders,
  products,
  productTimeSlots,
  users,
};
