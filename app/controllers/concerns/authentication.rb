# frozen_string_literal: true

# Вся логика, связанная со входом в систему
module Authentication
  extend ActiveSupport::Concern

  # rubocop:disable Metrics/BlockLength
  included do
    private

    # метод, который проверяет сессию и показывает, вошел юзер в систему или нет
    # Если @current_user = nil или false, то найти юзера если в сессии есть user_id,
    # иначе никого искать не нужно. Вдобавок задекорировать юзера.
    def current_user
      # если в сессии ничего нет, то мы смотрим, а не запоминали ли мы этого юзера раньше
      user = session[:user_id].present? ? user_from_session : user_from_token

      @current_user ||= user&.decorate
    end

    def user_from_session
      User.find_by(id: session[:user_id])
    end

    def user_from_token
      # Поиск по зашифрованному куки, чтобы пустить в систему.
      # Сессия очищается после закрытия браузера, но не куки.
      user = User.find_by(id: cookies.encrypted[:user_id])
      token = cookies.encrypted[:remember_token]

      return unless user&.remember_token_authenticated?(token)

      # сразу запишем в сессию, чтоб последующие проверки выполнялись быстрее,
      # пускаем юзера в систему и выдаем его в качестве результата работы метода
      sign_in user
      user
    end

    def user_signed_in?
      current_user.present?
    end

    def require_authentication
      return if user_signed_in?

      # rubocop:disable Rails/I18nLocaleTexts
      flash[:warning] = 'You are not signed in!'
      # rubocop:enable Rails/I18nLocaleTexts
      redirect_to root_path
    end

    # Если текущего пользователя нет, то мы сразу отсюда выходим,
    # если есть - делаем редирект и всё
    def require_no_authentication
      return unless user_signed_in?

      # rubocop:disable Rails/I18nLocaleTexts
      flash[:warning] = 'You are already signed in!'
      # rubocop:enable Rails/I18nLocaleTexts
      redirect_to root_path
    end

    def sign_in(user)
      session[:user_id] = user.id
    end

    # Кого мы запомнили и с помощью какого токена в куки.
    # Когда это комбинацию куки мы будем получать, проверим, что если все корректно,
    # то юзера пустим в систему без пароля.
    # encrypted - зашифр. куки, permanent - навсегда
    def remember(user)
      user.remember_me
      cookies.encrypted.permanent[:remember_token] = user.remember_token
      cookies.encrypted.permanent[:user_id] = user.id
    end

    def forget(user)
      # забудь меня
      user.forget_me
      cookies.delete :user_id
      cookies.delete :remember_token
    end

    def sign_out
      forget current_user
      # удалить информацию с сессии
      session.delete :user_id
      @current_user = nil
    end

    # для того, чтобы верхние 2 метода были доступны не только в контроллерах,
    # но и в представлениях (сделаем их еще и хэлперами)
    helper_method :current_user, :user_signed_in?
  end
  # rubocop:enable Metrics/BlockLength
end
