# frozen_string_literal: true

module Commentable
  extend ActiveSupport::Concern

  # К любой модели можем подключить этот модуль и тогда у модели будет
  # много комментариев и это виртуальное отношение будет называться "commentable"
  included do
    has_many :comments, as: :commentable, dependent: :destroy
  end
end
