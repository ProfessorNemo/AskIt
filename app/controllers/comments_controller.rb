# frozen_string_literal: true

# rubocop:disable all
class CommentsController < ApplicationController
  include QuestionsAnswers
  before_action :set_commentable!
  before_action :set_question
  after_action :verify_authorized

  def create
    # создать новый комментарий для commentable
    @comment = @commentable.comments.build comment_params
    authorize @comment
    @comment = @comment.decorate

    if @comment.save
      respond_to do |format|
        format.html do
          flash[:success] = t '.success'
          redirect_to question_path(@question)
        end

        format.turbo_stream { flash.now[:success] = t('.success') }
      end
    # редирект на элемент, для которого писался комментарий, но нет метода show
    # для контроллера "answers и нужного маршрута
    # redirect_to @commentable
    else
      load_question_answers do_render: true
    end
  end

  def destroy
    @comment = @commentable.comments.find params[:id]
    authorize @comment

    @comment.destroy
    respond_to do |format|
      format.html do
        flash[:success] = t '.success'
        redirect_to question_path(@question), status: :see_other
      end

      format.turbo_stream { flash.now[:success] = t('.success') }
    end
  end

  private

  def comment_params
    params.require(:comment).permit(:body).merge(user: current_user)
  end

  # В параметрах будем находить либо аттрибут question_id, либо answer_id
  # "!" - опасный м-д, в нем может возникнуть исключение "raise"
  def set_commentable!
    klass = [Question, Answer].detect { |c| params["#{c.name.underscore}_id"] }
    # Если не удалось понять, для какого класса создался комментарий - т.е. прислали левый запрос
    raise ActiveRecord::RecordNotFound if klass.blank?

    # klass = Question или klass = Answer. Затем находим конкретный вопрос или ответ,
    # для которого нужно написать комментарий. (underscore - к нижнему регистру)
    @commentable = klass.find(params["#{klass.name.underscore}_id"])
  end

  # Если @commentable - это Question, то - @commentable, если не Question - то Answer,
  # т.е. @commentable.question. И вытаскиваем ответ
  def set_question
    @question = @commentable.is_a?(Question) ? @commentable : @commentable.question
  end
end
# rubocop:enable all