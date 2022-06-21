module Api
  class TagsController < ApplicationController
    def index
      # arel_table - позволяет писать более сложные SQL-запросы на ruby
      tags = Tag.arel_table
      # найти  все теги, заголовки которых содержат слово "{params[:term]}"
      @tags = Tag.where(tags[:title].matches("%#{params[:term]}%"))
      # отвечать только в формате json
      respond_to do |format|
        format.json
      end
    end
  end
end
