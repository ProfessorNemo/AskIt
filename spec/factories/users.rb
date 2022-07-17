FactoryBot.define do
  factory :user do
    name { 'John' }
    email  { 'test@example.ru' }
    password_digest { '123' }
  end
end
