# создаем массив в json-не и для каждого элемента
# массива выводим "id" и "title" - название тега
json.array! @tags do |tag|
  json.id tag.id
  json.title tag.title
end

# конструкция на выходе
# {
#   id: 1,
#   title: test
# }
