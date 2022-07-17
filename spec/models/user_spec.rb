# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User do
  # let(:user) { User.new({ name: 'John', email: 'test@example.ru', password_digest: '123' }) }

  context 'validates' do
    # specify { expect(user.name).to be_truthy }

    it 'email is required' do
      user = build(:user)
      expect(user.email).to be_truthy
    end

    it 'name is required' do
      user = build(:user, name: nil)
      expect(user).not_to be_valid
    end

    it 'email is required' do
      user = build(:user, email: nil)
      expect(user).not_to be_valid
    end

    it 'password_digest is required' do
      user = build(:user, password_digest: nil)
      expect(user).not_to be_valid
    end

    it 'is admin' do
      user = build(:user, password_digest: '123')
      expect(user.password_digest).to eq('123')
    end

    it '#build' do
      user = build(:user)
      expect(user.name).to eq('John')
    end

    it 'email is correct' do
      user = build(:user_with_incorrect_email)
      expect(user).not_to be_valid
    end

    it 'is admin' do
      user = attributes_for(:user)
      expect(user).not_to be_empty
      puts user.inspect
    end
  end
end
