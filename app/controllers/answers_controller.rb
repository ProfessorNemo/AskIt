# frozen_string_literal: true

class AnswersController < ApplicationController
  # модуль для якорей
  include ActionView::RecordIdentifier
  # и для create и для destroy
  # порядок action важен: сначала идет вопрос, потом ответ
  before_action :set_question!

  before_action :set_answer!, except: :create

  def create
    # создаваемые ответы привязываем к вопросу
    @answer = @question.answers.build answer_params

    if @answer.save
      flash[:success] = t '.success'
      # переводит пользователя на машрут, который заново обрабатывается
      # обращается к нужному представлению "show", и все перем-е устанавливаются
      redirect_to question_path(@question)
    else
      # декарирование вопроса если ответ сохранить не удалось
      @question = @question.decorate
      # сортировка ответов по убыванию (самый свежий - сверху). Определим переменную
      # @answers, ибо render выдает только разметку на экран
      @pagy, @answers = pagy @question.answers.order created_at: :desc
      @answers = @answers.decorate
      # по умолчанию RoR искала бы в директории "Answers"
      render 'questions/show'
    end
  end

  def destroy
    @answer.destroy
    flash[:success] = t '.success'
    redirect_to question_path(@question)
  end

  def edit; end

  def update
    if @answer.update answer_params
      flash[:success] = t '.success'
      # + переброска к конкретному ответу на странице вопроса
      # <%= tag.article class: 'mb-3 card', id: dom_id(answer) do %> <% end %>
      redirect_to question_path(@question, anchor: dom_id(@answer))
    else
      render :edit
    end
  end

  private

  def answer_params
    params.require(:answer).permit(:body)
  end

  # метод, который может вернуть ошибку
  def set_question!
    # проверить,что вопрос для которого пишется ответ,существует
    @question = Question.find params[:question_id]
  end

  def set_answer!
    # ":id" => @answers (id ответа)
    @answer = @question.answers.find params[:id]
  end
end