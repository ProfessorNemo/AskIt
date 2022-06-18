# frozen_string_literal: true

class Comment < ApplicationRecord
  # данный комментарий принадлежит некой виртуальной модели, которую можно комментировать
  belongs_to :commentable, polymorphic: true
  belongs_to :user

  validates :body, presence: true, length: { minimum: 2 }
end
