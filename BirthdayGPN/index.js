const TelegeramApi = require("node-telegram-bot-api");
const people = require("./people.json");
const axios = require("axios");
const proxy = require("https-proxy-agent");
const token = "6653702940:AAGS3kq4JPMSC621R83itjEW3k52zm12Ghc";

const OpenAI = require("openai");

const openaiapi = new OpenAI.OpenAI({
  // apiKey: "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",
  apiKey: "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",
  httpAgent: new proxy.HttpsProxyAgent("http://173.245.49.3:80"),
  defaultHeaders: {"Content-Type": "application/json"},
});

const bot = new TelegeramApi(token, {polling: true});

const citesUrl = ["Ufa", "Moscow", "Kazan'", "Omsk"];

// const urlWeather = `https://api.openweathermap.org/data/2.5/onecall?lat=54.7569&lon=56.0129&appid=4057aa5aa77e4f9c621dae0184debe81`;
// const urlWeather = `https://api.openweathermap.org/data/2.5/weather?lat=54.7105216&llon=55.835622&appid=be50eb1ea6d54e5d153bd213f89417a9`;

const cites = {
  Ufa: "Уфе",
  Moscow: "Москве",
  "Kazan'": "Казани",
  Omsk: "Омске",
};

const history = [];

const img = [
  "https://tlgrm.eu/_/stickers/711/2ce/7112ce51-3cc1-42ca-8de7-62e7525dc332/18.webp",
  "https://tlgrm.eu/_/stickers/711/2ce/7112ce51-3cc1-42ca-8de7-62e7525dc332/10.webp",
  "https://tlgrm.eu/_/stickers/3d2/135/3d213551-8cac-45b4-bdf3-e24a81b50526/39.webp",
  "https://tlgrm.eu/_/stickers/ccd/a8d/ccda8d5d-d492-4393-8bb7-e33f77c24907/21.webp",
  "https://tlgrm.eu/_/stickers/711/2ce/7112ce51-3cc1-42ca-8de7-62e7525dc332/3.webp",
  "https://tlgrm.eu/_/stickers/711/2ce/7112ce51-3cc1-42ca-8de7-62e7525dc332/17.webp",
  "https://tlgrm.eu/_/stickers/711/2ce/7112ce51-3cc1-42ca-8de7-62e7525dc332/19.webp",
  "https://tlgrm.eu/_/stickers/711/2ce/7112ce51-3cc1-42ca-8de7-62e7525dc332/16.webp",
  "https://tlgrm.eu/_/stickers/3d2/135/3d213551-8cac-45b4-bdf3-e24a81b50526/12.webp",
  "https://tlgrm.eu/_/stickers/3d2/135/3d213551-8cac-45b4-bdf3-e24a81b50526/37.webp",
];

const notes = new Map();
people.people.map(dr => {
  if (notes.get(dr.DayMount)) {
    return notes.set(dr.DayMount, [...notes.get(dr.DayMount), dr.name]);
  }
  notes.set(dr.DayMount, [dr.name]);
});

// const commands = [
//   {
//     command: "setbirthday",
//     description: "Установить дату вашего рождения",
//   },
//   {
//     command: "start",
//     description: "Начать общение",
//   },
//   {
//     command: "help",
//     description: "Раздел помощи",
//   },
// ];

const start = () => {
  //   bot.setMyCommands(commands);

  //   bot.on("message", async msg => {
  //     const text = msg.text;
  //     const chatId = msg.chat.id;
  //     // return bot.sendMessage(chatId, `Ты мне написал ${text}`);
  //     console.log(msg);
  //     if (text === "/setDateMyBirthday") {
  //       return bot.sendMessage(chatId, "Введите день вашего рождения(число)");
  //     }
  //     // return bot.sendMessage(chatId, "Не распознал команду");
  //   });

  //   bot.onText(/Ввести день и месяц (.+) (.+)/, async function (msg, match) {
  //     var userId = msg.from.id;
  //     var dayBirthDay = match[1];
  //     var monthBirthDayt = match[2];
  //     console.log(notes);
  //     if (!!notes.find(arr => arr.id === userId))
  //       return bot.sendMessage(userId, "Вы уже были добавлены в список");

  //     await notes.push({
  //       id: userId,
  //       day: dayBirthDay,
  //       month: monthBirthDayt,
  //       sendMessage: false,
  //     });
  //     console.log(notes);
  //     await bot.sendMessage(
  //       userId,
  //       "Отлично! Я обязательно напомню, если не сдохну :)",
  //     );
  //   });

  setInterval(async () => {
    for (let i = 0; i < notes.size; i++) {
      if (notes.get(`${new Date().getDate()}.${new Date().getMonth() + 1}`)) {
      if (new Date().getSeconds() === 0 && notes.get(`24.3`)) {
        await bot.sendSticker(-4077749408, img[Math.floor(Math.random() * 10)]);
        return bot.sendMessage(
          "-4077749408",
          `С днём рождения ${notes
            .get(`${new Date().getDate()}.${new Date().getMonth() + 1}`)
            .map(arr => arr)}`,
          //   .map(arr => arr)}`,
        );
          }
      }
    }
    if (new Date().getDay() == 4 && new Date().getHours() == 15) {
      return bot.sendMessage("-4077749408", "На созвон просыпаемся!!");
    }
    if (
      (new Date().getDay() == 4 && new Date().getHours() == 15) ||
      new Date().getSeconds() === 0
    ) {
      // citesUrl.map(async city => {
      //   const response = await axios.get(
      //     `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=be50eb1ea6d54e5d153bd213f89417a9`,
      //   );
      //   console.log(response.data);
      //   return bot.sendMessage(
      //     "-4077749408",
      //     `
      //   Сегоднящняя погода в ${cites[response.data.name]} ${(
      //       response.data.main.temp - 273.15
      //     ).toFixed(1)}
      //     Ощущается как ${(response.data.main.feels_like - 273.15).toFixed(1)}
      //     Минимальная температура сегодня ${(
      //       response.data.main.temp_min - 273.15
      //     ).toFixed(1)}
      //     Максимальная температура сегодня ${(
      //       response.data.main.temp_max - 273.15
      //     ).toFixed(1)}
      //     Видимость ${response.data.visibility}
      //   `,
      //   );
      // });
    }
    if (
      (new Date().getDay() == 4 && new Date().getHours() == 15) ||
      new Date().getSeconds() == 20 ||
      new Date().getSeconds() == 0 ||
      new Date().getSeconds() == 30
    ) {
      // history.push({})
      // const res = await openaiapi.chat.completions.create({
      //   messages: [
      //     {
      //       role: "user",
      //       content: "Hello",
      //       // "Напиши простенькую задачу для frontend javascript разработчика",
      //     },
      //   ],
      //   model: "gpt-3.5-turbo",
      //   response_format: {type: "json_object"},
      // });
      // return bot.sendMessage(
      //   "-4077749408",
      //   res.data.choices[0].message.content,
      // );
    }
    return null;
  }, 1000);
};

start();
