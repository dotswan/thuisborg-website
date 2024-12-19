import Datetime from './Datetime.vue'
import DatetimePopup from './DatetimePopup.vue'
const version = '__VERSION__'

export default {
  install: (app, options) => {
    app.component('datetime', Datetime)
    app.component('datetime-popup', DatetimePopup)
  }
}

export {
  version
}
