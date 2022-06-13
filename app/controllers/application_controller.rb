class ApplicationController < ActionController::Base
  # модуль для правильного разбиения по страничкам
  include Pagy::Backend
  include ErrorHandling
  # юзера будем не просто находить, но еще и декорировать
  include Authentication
end
