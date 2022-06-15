# frozen_string_literal: true

Rails.application.routes.draw do
  # например localhost/ru/questions, localhost/en/questions, localhost/questions
  # locale: /#{I18n.available_locales.join("|")}/ - проверка, что запрошенная локаль входит
  # в массив %i[en ru], а ("|") - "или" (локаль или такая, или такая.....)
  scope '(:locale)', locale: /#{I18n.available_locales.join("|")}/ do
    # create - будет проверять корректность введенных данных и пускать пользователя в систему
    # new - отображать форму для входа
    # destroy - позволить юзерам из системы выходить
    # при входе юзера в систему он создает новую сессия
    # Если хотим, чтоб не было никаких идентификаторов в маршрутах, пишем
    # "resource" а не "resources"
    resource :session, only: %i[new create destroy]

    resources :users, only: %i[new create edit update]

    resources :questions do
      resources :answers, except: %i[new show]
    end

    namespace :admin do
      resources :users, only: %i[index create show destroy]
    end

    # не нужен маршрут "new", потому что форма рендериться на другой странице
    # и "show", поскольку не нужно показывать каждый вопрос на отдельной странице

    # resources :questions, only: %i[index new edit create update destroy show]

    # контроллер "questions" должен обрабатывать методом - "index"
    # Я хотел бы, чтобы при заходе на мой сайт пользователи писали к примеру "localhost/questions"
    # в своей адресной строке браузера. Нажатие enter и отправляется GEt запрос. Поэтому, как только придет
    # # GEt-запрос с адресом /questions, тогда направляй его на контроллер "questions"
    # get '/questions', to: 'questions#index'

    # # маршрут к созданию нового вопроса пользователем и метод "new"
    # get '/questions/new', to: 'questions#new'

    # # :id - переменная поля (идентификатор вопроса), edit - редактир.запись
    # get '/questions/:id/edit', to: 'questions#edit'

    # # маршрут к месту создания вопроса
    # post '/questions', to: 'questions#create'

    # корневой маршрут
    root 'pages#index'
  end
end
