# json.content @message.content
# json.image @message.image
# json.user_id  @message.user.id
# json.group_id @message.group.id
# json.user_name @message.user.name
# json.created_at @message.created_at.strftime("%Y%m%d")

json.content  @message.content
json.created_at  @message.created_at.strftime('%Y/%m/%d %R')
json.user_name  @message.user.name
json.image @message.image.url
json.user_id  @message.user.id