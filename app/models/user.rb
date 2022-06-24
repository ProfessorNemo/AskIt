# frozen_string_literal: true

class User < ApplicationRecord
  # ролей может быть сколько угодно, наприер 3 - superadmin....
  # Например: "u.admin_role?" - здесь role - suffix
  enum role: { basic: 0, moderator: 1, admin: 2 }, _suffix: :role
  # роль должна быть
  validates :role, presence: true

  # создаем виртуальный аттрибут "old_password", в БД он попадать не будет. Чтобы
  # на объекте "user" существовал метод "old_password", с помощью которого
  # будем отрисовывать новое текстовое поле в форме, а потом проверять его значение
  attr_accessor :old_password, :remember_token, :admin_edit

  # "has_secure_password" -  метод, который умеет защищать пароли. Пропишем валидации сами:
  has_secure_password validations: false

  has_many :questions, dependent: :destroy
  has_many :answers, dependent: :destroy

  # before_save - функция обратного вызова, которая выполняется каждый раз перед тем,
  # как запись сохраняется в БД, когда email изменился с прошлого сохранения
  before_save :set_gravatar_hash, if: :email_changed?

  # Пароль д.б. подтвержден. "confirmation: true" - встроенная валидация, которая
  # будет проверять, что аттрибут "password" имеет такое же значение, как другое
  # поле, название которого записывается как "password".
  # "allow_blank: true" - при обновелнии учетной записи юзер может не захотеть менять
  # пароль, т.е. он может оставить его пустым.
  # length: {minimum: 8, maximum: 70} - мин. и макс. длина пароля
  validates :password, confirmation: true, allow_blank: true,
                       length: { minimum: 8, maximum: 70 }

  # Эту валидацию нужно запускать только при обновлении записи и только  в том случае,
  # если новый пароль был указан. Если нет - значит юзер пароль менять не хочет, - игнорируем.
  # Если юзера меняет админ, тогда эту валидацию делать не нужно
  validate :correct_old_password, on: :update, if: -> { password.present? && !admin_edit }

  # Проверка корректности введенного email, чтобы не ввести левый email!
  # https://github.com/micke/valid_email2
  # Опция mx — тип записи в DNS, который связан с почтовыми серверами. Т.е. он умеет проверять по DNS,
  # существует ли такая доменная зона вообще, или нет. Обращение к DNS занимает какое-то время, поэтому
  # обойдемся без обращения.
  validates :email, presence: true, uniqueness: true, 'valid_email_2/email': true

  # проверка для сложности пароля
  validate :password_complexity

  validate :password_presence

  # сгенерировать token, на основе которого будем делать хэш
  def remember_me
    # self - чтобы пристыковать виртуальный аттрибут "remember_token" к текущему юзеру
    # rubocop:disable Rails/SkipsModelValidations
    self.remember_token = SecureRandom.urlsafe_base64
    # поместить token в табличку
    update_column :remember_token_digest, digest(remember_token)
    # rubocop:enable Rails/SkipsModelValidations
  end

  # Когда юзер выходит из системы, нам нужно всю информацию о нем очистить
  def forget_me
    # rubocop:disable Rails/SkipsModelValidations
    update_column :remember_token_digest, nil
    # rubocop:enable Rails/SkipsModelValidations
    # не обязательно, в целях полноты
    self.remember_token = nil
  end

  # Проверить, что тот token, который нам передается и тот, которы в БД - одно и то же
  def remember_token_authenticated?(remember_token)
    return false if remember_token_digest.blank?

    # Хэш "remember_token_digest" такой же, который получается из строки "remember_token"
    BCrypt::Password.new(remember_token_digest).is_password?(remember_token)
  end

  private

  # функция обратного вызова
  def set_gravatar_hash
    return if email.blank?

    # Генерируем хэш на основе email-юзера, удаляем пробелы сначала и конца и преобразуем
    # его к нижнему регистру - это требования граватара. Потом на основе этого делаем хэш.
    hash = Digest::MD5.hexdigest email.strip.downcase

    # присвоить сохраняемой в данный момент записи (для которой выполнен callback) gravatar_hash
    # и установить его в значение hash. Перед тем, как юзера сохранить (user.save), к нему
    # пристыкуется еще значение "self.gravatar_hash = hash"
    self.gravatar_hash = hash
  end

  # сгенерировать хэш на основе строки
  def digest(string)
    cost = if ActiveModel::SecurePassword
              .min_cost
             BCrypt::Engine::MIN_COST
           else
             BCrypt::Engine.cost
           end
    BCrypt::Password.create(string, cost: cost)
  end

  # "password_digest_was" - метод (создает RoR автоматически), который говорит, что нужно
  # вытащить старый digest, который в БД, а не новый, который хранится в памяти. Сделаем digest
  # на основе старого пароля (old_password) и сравним с тем, какой  в БД (password_digest_was).
  # Если дайджесты совпали, значит старый пароль введен верно.
  def correct_old_password
    return if BCrypt::Password.new(password_digest_was).is_password?(old_password)

    errors.add :old_password, 'is incorrect'
  end

  # проверка для сложности пароля
  def password_complexity
    # Regexp extracted from https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
    return if password.blank? || password =~ /(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/

    msg = 'complexity requirement not met. Length should be 8-70 characters and ' \
          'include: 1 uppercase, 1 lowercase, 1 digit and 1 special character'
    errors.add :password, msg
  end

  # Нужно добавить для пароля сообщение, что он пустой, но не в том случае, если
  # "password_digest" был уже указан. Если пароль был задал раньше, то в этом случа
  # пароль можно указывать, а можно не указывать
  def password_presence
    errors.add(:password, :blank) if password_digest.blank?
  end
end
