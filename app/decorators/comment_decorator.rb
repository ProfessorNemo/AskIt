# frozen_string_literal: true

class CommentDecorator < ApplicationDecorator
  delegate_all
  decorates_association :user

  # commentable - либо ответ, либо вопрос
  def for?(commentable)
    # Если commentable задекорировал, то нужно вытащить конкретный образец класса,
    # потому что draper наворачивает аттрибуты на задекор-й объект.
    commentable = commentable.object if commentable.decorated?
    # self указывает на конкретный комментарий и когда говорим "self.commentable",
    # мы понимаем, для чего комментарий был оставлен (вопроса или ответа)
    commentable == self.commentable
  end
end
