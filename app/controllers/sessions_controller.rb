# frozen_string_literal: true

class SessionsController < ApplicationController
  # пользователь в систему не вошел
  before_action :require_no_authentication, only: %i[new create]
  # пользователь в систему уже вошел
  before_action :require_authentication, only: :destroy

  # будем отрисовывать форму без объекта и просто говорить, на какой url отправить
  def new; end

  def create
    # render plain: params.to_yaml and return
    # user - найти юзера по его емэйлу
    # user - не нужно делать переменной образца класса потому что в
    # представлениях она нигде не будет фигурировать
    # Если email был введен не правильный и юзера с таким email нет, то user = nil
    # попытка вызвать метод authenticate относительно nil закончится ошибкой, поэтому
    # ставим апмперсанд после user, условие "if" обратится в ложное и произойдет переход в ветку "else"
    # authenticate - метод из "has_secure_password" в модели "user". Данный метод принимает строку
    # конвертирует ее в хэш и сверяет с тем хэшем, который есть в БД.
    user = User.find_by email: params[:email]
    if user&.authenticate(params[:password])
      do_sign_in user
    else
      # flash[:warning] = 'Incorrect email and/or password!'
      # redirect_to session_path
      # или
      flash.now[:warning] = t '.invalid_creds'
      render :new
    end
  end

  def destroy
    sign_out
    flash[:success] = t '.success'
    redirect_to root_path, status: :see_other
  end

  private

  def do_sign_in(user)
    sign_in user
    # запомнить пользователя, если он того хочет
    remember(user) if params[:remember_me] == '1'
    flash[:success] = t('.success', name: current_user.name_or_email)
    redirect_to root_path
  end
end
