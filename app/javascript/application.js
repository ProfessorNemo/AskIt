// Entry point for the build script in your package.json
import * as bootstrap from "bootstrap"
import "@hotwired/turbo-rails"
import * as ActiveStorage from "@rails/activestorage"

// для правильной работы dropdawn подключение скриптов
import 'bootstrap/js/dist/dropdown'
// для отображения выпадающей формы
import 'bootstrap/js/dist/collapse'
import './scripts/select'

ActiveStorage.start()