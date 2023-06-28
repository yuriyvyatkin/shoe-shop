## Интернет-магазин обуви

[![Build status](https://ci.appveyor.com/api/projects/status/yb5of3w0mf8dkl7l?svg=true)](https://ci.appveyor.com/project/yuriyvyatkin/ra-diploma-project-frontend)

[Демонстрация](https://yuriyvyatkin.github.io/ra-diploma-project-frontend/)

**🛠️ Стек**

React + React Context + React Router + React Helmet + Bootstrap + AppVeyor

**📚 Инструкция по работе с проектом**

##### 1. Клонирование

```
git clone https://github.com/yuriyvyatkin/shop.git
```

```
cd shop
```

##### 2. Установка зависимостей

```
npm install
```

##### 3. Запуск

```
npm start
```

**⚙️ Реализовано**:

  -  Постраничный роутинг

  -  Шапка и футер

  -  Статичные страницы (404, О Магазине, Контакты)

  -  Баннер

  -  Работа с HTTP

  -  Компонент "Хиты продаж"

  -  Каталог (компонент на главной странице и на странице каталога)

  -  Поиск по части названия и цвету

  -  Глобальное состояние

  -  Корзина и оформление заказа

  -  Loader/обработка ошибок

**🔀 Роутинг**:

  -  Из шапки можно попасть на следующие экраны:

      -  Логотип и ссылка "Главная" - ведут на главную страницу, URL - "/"
      -  Каталог - ведёт на страницу каталога, URL  - "/catalog.html"
      -  О магазине - ведёт на страницу "О магазине", URL - "/about.html"
      -  Контакты - ведёт на страницу "Контакты", URL - "/contacts.html"

  -  Из футера можно попасть на следующие экраны:

      -  О магазине - ведёт на страницу "О магазине", URL - "/about.html"
      -  Каталог - ведёт на страницу каталога, URL - "/catalog.html"
      -  Контакты - ведёт на страницу "Контакты", URL - "/contacts.html"
