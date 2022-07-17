# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    name { 'John' }
    sequence :email do |n|
      "test#{n}@example.com"
    end
    password_digest { '123' }

    factory :user_with_incorrect_email do
      email { 'test' }
    end
  end
end
