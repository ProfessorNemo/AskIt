# frozen_string_literal: true

class UserBulkExportService < ApplicationService
  def call
    compressed_filestream = output_stream

    # перемотка на начало, чтоб этот архив можно было отправить
    compressed_filestream.rewind

    # ** если не сохранять архив, то:
    compressed_filestream
    # ** или если требуется сохранить архив, то:
    # ActiveStorage::Blob.create_and_upload! io: compressed_filestream, filename: 'users.zip'
  end

  private

  # В сервисном объекте не доступен метод render_to_string, а только в контроллере.
  # Для того, чтоб его вызвать, создаем новую переменную "renderer = ActionController::Base.new"
  def output_stream
    renderer = ActionController::Base.new

    Zip::OutputStream.write_buffer do |zos|
      User.order(created_at: :desc).each do |user|
        zos.put_next_entry "user_#{user.id}.xlsx"
        zos.print renderer.render_to_string(
          layout: false, handlers: [:axlsx], formats: [:xlsx], template: 'admin/users/user', locals: { user: user }
        )
      end
    end
  end
end

# Если вы не хотите сохранять архив после отправки письма, то можно обойтись без ActiveStorage -
# просто передаем в mailer объект compressed_filestream и делаем .read для пристыковки к письму.
# Но в ряде случаев может потребоваться сохранить архив для дальнейших обращений:
# ActiveStorage::Blob.create_and_upload! io: compressed_filestream, filename: 'users.zip'
