class ApplicationController < ActionController::Base
  # модуль для правильного разбиения по страничкам
  include Pagy::Backend
  include ErrorHandling
end
