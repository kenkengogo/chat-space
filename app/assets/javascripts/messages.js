$(function(){
    function buildHTML(message){
      var imagehtml = message.image == null ? "" : `<img src="${message.image}" class="lower-message__image">`
      var html = `
                    <div class="right__main__message">
                      <div class="right__main__message__name" >
                      ${message.user_name}
                      </div>
                      <div class="right__main__message__date">
                      ${message.created_at}
                      </div>
                      <div class="right__main__message__comment">
                        ${message.content}
                        ${imagehtml}
                      </div>
                    </div>`
      return html;
    }

    // function ScrollToNewMessage(){
    //   $('.main__message').animate({scrollTop: $('.main__message')[0].scrollHeight}, 'fast');
    // }

    $('#new_message').on('submit', function(e){

      e.preventDefault();
      var formData = new FormData(this);
      var href = window.location.href
      $.ajax({
        url: href,
        type: "POST",
        data: formData,
        dataType: 'json',
        processData: false,
        contentType: false
      })
      .done(function(data){
        var html = buildHTML(data);
        $('.right__main').append(html);
        $('#new_message')[0].reset();
       $( ".form__submit").prop( "disabled", false );
       $('.right__main').animate({scrollTop: $('.right__main')[0].scrollHeight}, 'fast');
       $('.hidden').val('');
      })
     .fail(function(){
        alert('error');
      })
    })

    var reloadMessages = function() {
      //カスタムデータ属性を利用し、ブラウザに表示されている最新メッセージのidを取得
      var last_message_id = $('.right__main__message').last().data('id');
      var group_id = $('.right').data('group_id');
      // var url = `/groups/${group_id}/api/messages`;
      if (window.location.href.match(/\/groups\/\d+\/messages/)){
      $.ajax({
        //ルーティングで設定した通りのURLを指定
        url: `/groups/${group_id}/api/messages`,
        //ルーティングで設定した通りhttpメソッドをgetに指定
        type: 'get',
        dataType: 'json',
        data: {id: last_message_id}
      })
        //dataオプションでリクエストに値を含める
        .done(function(data){
          console.log(data)
          var insertHTML = '';
          data.forEach(function(data){
          insertHTML = buildHTML(data);
          $('.right__main').append(insertHTML)
          // ScrollToNewMessage();
          });
        })
        .fail(function(data){
          console.log('自動更新に失敗しました');
        })
      }
    }

        setInterval(reloadMessages, 5000);
      })
