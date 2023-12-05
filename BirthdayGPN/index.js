const TelegeramApi = require("node-telegram-bot-api");

const token = "6653702940:AAGS3kq4JPMSC621R83itjEW3k52zm12Ghc";

const bot = new TelegeramApi(token, {polling: true});

const notes = new Map();
notes.set("5.12", ["@Ilgiz_Sharafutdinov", "@Hairianee"]);
console.log(notes);
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

  //   bot.onText(/notes/, function (msg, match) {
  //     console.log(notes);
  //   });

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
        if (new Date().getHours() === 10) {
          await bot.sendSticker(
            -4077749408,
            "https://tlgrm.eu/_/stickers/711/2ce/7112ce51-3cc1-42ca-8de7-62e7525dc332/10.webp",
          );
          return bot.sendMessage(
            -4077749408,
            `С днём рождения ${notes
              .get(`${new Date().getDate()}.${new Date().getMonth() + 1}`)
              .map(arr => arr)}`,
          );
        }
      }
    }
  }, 1000);
};

start();
