# frozen_string_literal: true

class PasswordResetMailer < ApplicationMailer
  # м-д, с помощью которого будет отправляться почта
  def reset_email
    # params устанавливается при вызове данного метода
    @user = params[:user]

    # mail - м-д, to: @user.email - кому отправить, subject - тема письма
    mail to: @user.email, subject: I18n.t('password_reset_mailer.reset_email.subject')
  end
end
