# test-cloud
это сервис, который позволяет вам хранить файлы на собственном сервере. Вы можете работать с файлами с любого устройства, подключенного к интернету.

## Возможности веб-интерфейса
0. Регистрация личных аккаунтов.
1. Загрузка файлов размером до 1 ГБ.
2. Хранение файлов неограниченное время.
3. Передача файлов по зашифрованному соединению.
4. Получение публичных ссылок на загруженные файлы для обмена ими.

## Требования

Перед началом работы убедитесь, что ваша машина соответствует следующим требованиям:

| Зависимость |   Версия   |
| ---------- | :---------: |
| Node       | >= v10.13.0 |
| NPM        |  >= v6.4.1  |
| MongoDB    |  >= v4.4    |

## Быстрый старт

```bash
# клонируем гит репозиторий в папку `test-cloud`
git clone https://github.com/lain9293/test-cloud.git

# установим зависимости проекта
cd test-cloud && npm install
```

### Запустим приложение

Для **разработки**:

```bash
npm run dev
```

> В режиме разработки, API-интерфейсы вызываются через настроенный прокси-сервер в параметре `devServer` webpack.

Для **продакшена**:

Необходимо предварительно создать файл окружения `.env` со значениями переменных.

```bash
npm run build && npm start
```

## Лицензия

MIT
