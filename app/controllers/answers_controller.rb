  # frozen_string_literal: true

  # rubocop:disable all
class AnswersController < ApplicationController
  include QuestionsAnswers
  # модуль для якорей
  include ActionView::RecordIdentifier
  # и для create и для destroy
  # порядок action важен: сначала идет вопрос, потом ответ
  before_action :set_question!
  before_action :set_answer!, except: :create
  before_action :authorize_answer!
  after_action :verify_authorized

  def create
    # создаваемые ответы привязываем к вопросу
    @answer = @question.answers.build answer_create_params
    @answer = @answer.decorate
    if @answer.save
      respond_to do |format|
        format.html do
          flash[:success] = t '.success'
          # переводит пользователя на машрут, который заново обрабатывается
          # обращается к нужному представлению "show", и все перем-е устанавливаются
          redirect_to question_path(@question)
        end

        format.turbo_stream do
          flash.now[:success] = t '.success'
        end
      end
    else
      load_question_answers(do_render: true)
    end
  end

  def destroy
    @answer.destroy
    respond_to do |format|
      format.html do
        flash[:success] = t '.success'
        redirect_to question_path(@question), status: :see_other
      end

      format.turbo_stream { flash.now[:success] = t('.success') }
    end
  end

  def edit; end

  def update
    if @answer.update answer_update_params
      respond_to do |format|
        format.html do
          flash[:success] = t '.success'
          # + переброска к конкретному ответу на странице вопроса
          # <%= tag.article class: 'mb-3 card', id: dom_id(answer) do %> <% end %>
          redirect_to question_path(@question, anchor: dom_id(@answer))
        end

        format.turbo_stream do
          @answer = @answer.decorate
          flash.now[:success] = t '.success'
        end
      end
    else
      render :edit
    end
  end

  private

  # в параметры для создания ответа юзером добавлен параметр "user_id"
  def answer_create_params
    params.require(:answer).permit(:body).merge(user_id: current_user.id)
  end

  def answer_update_params
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

  def authorize_answer!
    authorize(@answer || Answer)
  end
end
# rubocop:enable all