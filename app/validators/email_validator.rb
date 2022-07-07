# frozen_string_literal: true

class EmailValidator < ActiveModel::EachValidator
  def validate_each(rec, att, val)
    msg = I18n.t 'global.errors.invalid_format'
    rec.errors.add(att, (options[:message] || msg)) unless valid_email?(val)
  end

  private

  def valid_email?(value)
    URI::MailTo::EMAIL_REGEXP.match? value
  end
end

# Cобственный валидатор, который будет принимать значение email, введенное пользователем,
# и сравнивать его с регуляркой, которая у нас и так уже встроенная.
# Если совпадения не найдены, добавляем новую ошибку.
