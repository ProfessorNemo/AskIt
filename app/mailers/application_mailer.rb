# frozen_string_literal: true

class ApplicationMailer < ActionMailer::Base
  # от кого будут письма приходить
  default from: 'admin@example.com'
  layout 'mailer'
end
