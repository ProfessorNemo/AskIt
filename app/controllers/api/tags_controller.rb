# frozen_string_literal: true

module Api
  class TagsController < ApplicationController
    def index
      # arel_table - позволяет писать более сложные SQL-запросы на ruby
      tags = Tag.arel_table
      # найти  все теги, заголовки которых содержат слово "{params[:term]}"
      @tags = Tag.where(tags[:title].matches("%#{params[:term]}%"))

      # render(@tags) выполнит сериализацию и превратит коллекцию тегов в json
      render json: TagBlueprint.render(@tags)
    end
  end
end
