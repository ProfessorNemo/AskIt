# frozen_string_literal: true

module ApplicationHelper
  # модуль для фронтенда для выдачи на экран навигации для пользователя
  include Pagy::Frontend

  # данная навигация показывается в том случае, если количество страниц больше 1
  def pagination(obj)
    # raw - для обработки разметки правильным образом
    # rubocop:disable Rails/OutputSafety
    raw(pagy_bootstrap_nav(obj)) if obj.pages > 1
    # rubocop:enable Rails/OutputSafety
  end

  # на приём: title - назв. ссылки, url и набор других опций, которых не обязательны
  def nav_tab(title, url, options = {})
    # вытащить текущую страницу из набора опций (значение ключа ":current_page")
    current_page = options.delete :current_page

    # 'text-secondary' - class css для той страницы, где находимся сейчас
    css_class = current_page == title ? 'text-secondary' : 'text-white'

    options[:class] = if options[:class]
                        # options[:class] + ' ' + css_class
                        "#{options[:class]} #{css_class}"
                      else
                        css_class
                      end

    link_to title, url, options
  end

  # на какой странице мы в данный момент находимся
  # локальная переменная - current_page, значение которой достается из current_page
  # устанавливаем значение переменной current_page в partial
  def currently_at(current_page = '')
    render partial: 'shared/menu', locals: { current_page: current_page }
  end

  def full_title(page_title = '')
    base_title = 'AskIt'
    if page_title.present?
      "#{page_title} | #{base_title}"
    else
      base_title
    end
  end
end
