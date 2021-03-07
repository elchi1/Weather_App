const express = require("express"); // вызываем express
const https = require("https"); // вызываем https формат
const bodyParser = require("body-parser"); // вызываем парсер


const app = express(); // в функцию express передаем переменной app
app.use(bodyParser.urlencoded({extended: true})); // через боди парсер



app.get("/",function(req,res){
  res.sendFile(__dirname + "/index.html"); // через sendFile отправляем(добавялем) наш html файл
});


app.post("/",function(req,res){

  const query = req.body.cityName; // клиент пишет свой город
  const apiId = ""; // наша апишка Чтобы все сработало добавьте свой API(зарегистрируйтесь на сайте open weather и все, вам выдадут личный апи)
  const units = "metric"; // мы хотим чтобы наши градусы показывали в метрической системе(Система Си)
  const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + units +"&appid=" + apiId;
  https.get(url,function(response){
    console.log(response.statusCode); // Здесь нам выдадут статус нашего response (200 - OK)

    response.on("data",function(data){
      const weatherData = JSON.parse(data); // В переменную weatherData(данные о погоде) заклдадываем парсер в формате JSON,
      const temp = weatherData.main.temp;  // В переменную temp обращаемся к данным погоды и извлекаем оттуда данные о нашей температуре
      const description = weatherData.weather[0].description; //также как в и temp, но здесь извлекаем описание погоды
      const icon = weatherData.weather[0].icon; // извлекаем уникальный номер иконки(icon)
      const iconImageUrl = "http://openweathermap.org/img/wn/"+ icon +"@2x.png"; // обращаемся к сайту и добавляем нашу иконку(icon)
      console.log(temp);
      console.log(description);
      res.write("<p>Description is "+ description+"</p>"); // Выводим описание на странице сайта
      res.write("<h1>The temperature in " + query + " is "+ temp + " degree Celcuis </h1>"); //Выводим температуру на странице сайта
      res.write("<img src="+iconImageUrl+">"); // Выводим картинку(иконку) на странице сайта
      // поскольку мы можем отправить только один раз то есть res.send мы можем использовать лишь раз в внутри этой функции, то мы все файлы 
      // которые хотели бы выложить должны написать командой .write как показано выше
      res.send();
    });
  });

});






app.listen("3000", function(){  // инструмент listen дает нам возможность открыть свой собственный локальный порт д
  console.log("Port 3000 is work"); // проверяем работает ли
});
