Rails.application.routes.draw do
  resources :users, only: %i[new create edit update]

  resources :questions do
    resources :answers, except: %i[new show]
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
