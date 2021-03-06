import { SET_EN, SET_RU } from "./actions"

const en = {
  auth: {
    windowTitle: "Welcome!",
    loginLabel: "Enter login",
    passLabel: "Enter password",
    privacyPlc: "privacy policy",
    loginBtn: "Sign in",
    regBtn: "Sign up",
    idha: "I don't have account",
    iha: "I have account",
    forgotPass: "forgot password"
  },
  forgot: {
    windowTitle: "Forgot password",
    loginLabel: "Enter login",
    approveBtn: "Approve"
  },
  menu: {
    windowTitle: "Workshop",
    plcTitle: "Americano",
    ml: "ml",
    gr: "gr",
    createBtn: "add",
    deleteBtn: "delete"
  },
  admin: {
    rateTitle: "Rating:",
    windowTitle: "Control panel",
    currencyLabel: "Currency",
    titleLabel: "Title",
    countryLabel: "Country",
    cityLabel: "City",
    streetLabel: "Street",
    buildLabel: "Build",
    secretWord: "Secret word",
    saveBtn: "save",
    logoutBtn: "log out",
    copiedText: "copied! Send this code to ",
    botLink: "bot",
    genText: "Connect with Telegram",
    genBtn: "connect",
    changePass: "Change password",
    newPassPlc: "new password",
    repPassPlc: "repeat password",
    changeBtn: "change"
  },
  helpLine: {
    helperName: "Eva",
    tgConnect: "Please connect with Telegram Bot",
    fillInfo: "Please fill information, secret word isn't required",
    tryAgain: "Please try again",
    loginExist: "Login already exist"
  },
  successLine: {
    passChanged: "Password changed",
    infoSaved: "Info saved"
  },
  footer: {
    bca: "buy coffee author"
  },
  links: {
    here: "here"
  }
}

const ru = {
  auth: {
    windowTitle: "Привет!",
    loginLabel: "Введите логин",
    passLabel: "Введите пароль",
    privacyPlc: "политика приватности",
    loginBtn: "Войти",
    regBtn: "Регистрация",
    idha: "У меня нет аккаунта",
    iha: "У меня есть аккаунт",
    forgotPass: "забыл пароль"
  },
  forgot: {
    windowTitle: "Забыл пароль",
    loginLabel: "Введите логин",
    approveBtn: "Подтвердить"
  },
  menu: {
    windowTitle: "Мастерская",
    plcTitle: "Американо",
    ml: "мл",
    gr: "гр",
    createBtn: "добавить",
    deleteBtn: "удалить"
  },
  admin: {
    rateTitle: "Рейтинг:",
    windowTitle: "Панель управления",
    currencyLabel: "Валюта",
    titleLabel: "Имя заведения",
    countryLabel: "Страна",
    cityLabel: "Город",
    streetLabel: "Улица",
    buildLabel: "Строение",
    secretWord: "Секретное слово",
    saveBtn: "сохранить",
    logoutBtn: "выйти из аккаунта",
    copiedText: "Скопировано! Отправьте этот код ",
    botLink: "боту",
    genText: "Связать с Телеграм",
    genBtn: "связать",
    changePass: "Сменить пароль",
    newPassPlc: "новый пароль",
    repPassPlc: "повторить пароль",
    changeBtn: "сменить"
  },
  helpLine: {
    helperName: "Ева",
    tgConnect: "Пожалуйста свяжите аккаунт с Телеграм Ботом",
    fillInfo: "Пожалуйста заполните информацию, серкетное слово не обязательно",
    tryAgain: "Пожалуйста попробуйте ещё раз",
    loginExist: "Такой логин уже используется"
  },
  successLine: {
    passChanged: "Пароль изменён",
    infoSaved: "Информация сохранена"
  },
  footer: {
    bca: "купить кофе автору"
  },
  links: {
    here: "здесь"
  }
}

export function TranslateReducer(state = {}, action) {
  switch (action.type) {
    case SET_EN:
      localStorage.setItem("lang", "en")
      return { ...state, t: en, curLang: "en" }
    case SET_RU:
      localStorage.setItem("lang", "ru")
      return { ...state, t: ru, curLang: "ru" }
    default:
      return state
  }
}