# frozen_string_literal: true

class QuestionsController < ApplicationController
  before_action :set_question!, only: %i[show destroy edit update]
  # информация на экран о конкретной записи
  def show
    @question = @question.decorate
    @answer = @question.answers.build

    # сортировка, created_at - поле в БД
    # @answers =.........params[:page].per(2) - сколько показывать ответов на странице (по 3 ответа)
    # @answers = @question.answers.order(created_at: :desc).page(params[:page]).per(3)

    # или альтернатива с лимитированием (вывести 2 первых ответа)
    # @answers = Answer.where(question: @question).limit(2).order created_at: :desc
    # методы можно один за другим использоваться (по цепочке)

    @pagy, @answers = pagy @question.answers.order(created_at: :desc)
    @answers = @answers.decorate
  end

  # удалить вопрос
  def destroy
    @question.destroy
    flash[:success] = t('.success')
    redirect_to questions_path
  end

  # редактировать вопрос
  def edit; end

  # обновить наш вопрос с новыми параметрами
  def update
    if @question.update question_params
      flash[:success] = t('.success')
      redirect_to questions_path
    else
      render :edit
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
    @pagy, @questions = pagy Question.order(created_at: :desc)
    @questions  = @questions.decorate
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
      flash[:success] = t('.success')
      redirect_to questions_path
    else
      # нужно отрендерить еще раз представление "new.html.erb"
      render :new
    end
  end

  private

  # из присланных параметров найти вопрос и достать только title и body
  def question_params
    params.require(:question).permit(:title, :body)
  end

  def set_question!
    @question = Question.find params[:id]
  end
end
