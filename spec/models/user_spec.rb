require 'rails_helper'

RSpec.describe User do
  let(:user) { User.new({ name: 'John', email: 'test@example.ru', password_digest: '123' }) }

  context 'validates' do
    specify { expect(user.name).to be_truthy }

    it 'email is required' do
      user = build(:user)
      expect(user.email).to be_truthy
    end

    it 'password_digest is required' do
      user = build(:user, password_digest: nil)
      expect(user).not_to be_valid
    end

    it 'is admin' do
      expect(user.password_digest).to eq('123')
    end

    it '#build' do
      user = build(:user)
      expect(user.name).to eq('John')
    end
  end
end
