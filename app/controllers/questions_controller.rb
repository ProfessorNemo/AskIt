# frozen_string_literal: true

class QuestionsController < ApplicationController
  include QuestionsAnswers
  # Проверка, что юзер вошел в систему во всех случаях, кроме когда он
  # просматривает все вопросы или конкретный вопрос. Но если он пытается создать
  # вопрос или отредактировать, то мы требуем, чтобы он вошел в систему, иначе
  # мы не может проверить его права доступа.
  before_action :require_authentication, except: %i[show index]
  before_action :set_question!, only: %i[show destroy edit update]
  # Проверяем, имеет ли пользователь право на выполнение запрошенного действия
  before_action :authorize_question!
  # М-д "verify_authorized" доступен из Pundit и он проверит, что мы в нашем "before_action"
  # проверили права доступа. Если проверены не были, то выскочит ошибка. Проверка во всех
  # действиях контроллера
  after_action :verify_authorized

  # информация на экран о конкретной записи
  def show
    load_question_answers
  end

  # удалить вопрос
  def destroy
    @question.destroy
    respond_to do |format|
      format.html do 
        flash[:success] = t('.success')
        redirect_to questions_path, status: :see_other
      end

      format.turbo_stream { flash.now[:success] = t('.success') }
    end
  end

  # редактировать вопрос
  def edit; end

  # обновить наш вопрос с новыми параметрами
  def update
    if @question.update question_params
      respond_to do |format|
        format.html do
          flash[:success] = t('.success')
          redirect_to questions_path
        end

        format.turbo_stream do
          @question = @question.decorate
          flash.now[:success] = t('.success')
        end
      end
    else
      render :edit, status: :unprocessable_entity
    end
  end

  # Вытащить из БД все вопросы,отсортировать и сохранить в переменную @questions
  # page - разбивает коллекцию по страницам
  # для того, чтобы определить, какую страницу хочет запросить пользователь
  # используется параметр "page"
  # def index
  #   @questions = Question.order(created_at: :desc).page params[:page]
  # end

  # pagy - выдаст объект, с помощью которого отрисовывается навигация и выдаст
  # вопросы, которые уже разбиты по страничкам
  def index
    @tags = Tag.where(id: params[:tag_ids]) if params[:tag_ids]
    @pagy, @questions = pagy Question.all_by_tags(@tags), link_extra: 'data-turbo-frame="pagination_pagy"'
    @questions = @questions.decorate
  end

  # инстанцируется новая запись пользователем
  def new
    # переменная образца класса Question
    @question = Question.new
  end

  # создается образец класса Question с параметрами "question_params"
  def create
    # Для текущего пользователя построить новый вопрос с такими то параметрами
    @question = current_user.questions.build question_params
    # если вопрос сохранить удалось, перенаправить пользователя по пути /questions
    # приходит ответ от сервера 302 "переходи на другую страницу"
    if @question.save
      respond_to do |format|
        format.html do
          flash[:success] = t('.success')
          redirect_to questions_path
        end

        format.turbo_stream do
          @question = @question.decorate
          # now - чтоб при перезагрузке страницы не появлялся
          flash.now[:success] = t('.success')
        end
      end
    else
      # нужно отрендерить еще раз представление "new.html.erb"
      render :new
    end
  end

  private

  # из присланных параметров найти вопрос и достать только title и body
  # "tag_ids: []" - т.е. на данной позиции может идти целый массив из "id",
  # и каждый id представляет собой один тег
  def question_params
    params.require(:question).permit(:title, :body, tag_ids: [])
  end

  def set_question!
    @question = Question.find params[:id]
  end

  # Нужно авторизовать конкретный вопрос или просто использовать модель. Т.е. если
  # вопрос есть, то мы делаем проверку относительно него. Если вопроса нет, то мы говорим
  # что юзер пытается делать что-то относительно ресурса вопроса.
  # Метод "authorize" доступен из Pundit, потому что в ApplicationController заинклюдили
  # concern "Authorization", а этот concern в свою очередь инклюдит Pundit
  def authorize_question!
    authorize(@question || Question)
  end
end
