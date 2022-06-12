class Question < ApplicationRecord
  # создается отношение на стороне Question
  # если удаляется вопрос, то и все зависимые ответы
  has_many :answers, dependent: :destroy

  # Логика проверки двух полей в БД
  # Чтобы не отправляли пустые вопросы, используем проверки, чтобы
  # был title и body, т.е. true. И минимальная длина не меньше 2
  validates :title, presence: true, length: { minimum: 2 }
  validates :body, presence: true, length: { minimum: 2 }

  def formatted_created_at
    created_at.strftime('%Y-%m-%d %H:%M:%S')
  end
end
