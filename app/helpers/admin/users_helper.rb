# frozen_string_literal: true

module Admin
  module UsersHelper
    # возьмем ключи ролей { basic: 0, moderator: 1, admin: 2 }
    def user_roles
      User.roles.keys.map do |role|
        # текст роли + id роли
        # [role.titleize, role]
        [t(role, scope: 'global.user.roles'), role]
      end
    end
  end
end
