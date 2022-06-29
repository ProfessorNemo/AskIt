# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include Authorization
  # модуль для правильного разбиения по страничкам
  include Pagy::Backend

  include ErrorHandling

  # юзера будем не просто находить, но еще и декорировать
  include Authentication

  include Internationalization
end
