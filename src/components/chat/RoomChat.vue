<template>
  <div class="room-chat">
    <div class="messages">
      <div class="message">
        <img src="@/assets/images/avatar.png" class="avatar">
        <div class="content">
          <span class="name">Nikola:</span>
          <span class="text">Lorem ipsum dolor sit amet consectetur.</span>
        </div>
      </div>
      <div class="message">
        <img src="@/assets/images/avatar.png" class="avatar">
        <div class="content">
          <span class="name">Braca:</span>
          <span class="text">Jojjj useri! Picke!</span>
        </div>
      </div>
      <div class="message me">
        <img src="@/assets/images/avatar.png" class="avatar">
        <div class="content">
          <span class="name">Braca:</span>
          <span class="text">Jojjj useri! Picke!</span>
        </div>
      </div>
    </div>
    <div class="send-message">
      <input type="text" placeholder="Kreni da kucaš...">
      <button />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.room-chat {
  width: 100%;
  height: 30%;
  padding-right: 40px;
  padding-bottom: 40px;
  box-sizing: border-box;
  .messages {
    height: calc(100% - 60px);
    overflow-y: auto;
    .message {
      display: flex;
      width: 100%;
      padding-right: 50px;
      box-sizing: border-box;
      .avatar {
        width: 30px;
        height: 30px;
      }
      .content {
        text-align: left;
        padding-left: 8px;
        box-sizing: border-box;
        .name {
          display: block;
          font-family: 'Comic Neue', cursive;
          color: #fff;
          font-size: 17px;
          font-weight: 700;
          margin-bottom: 5px;
        }
        .text {
          font-size: 15px;
          color: #ddd;
        }
      }
      &.me {
        flex-direction: row-reverse;
        padding-left: 50px;
        padding-right: 0;
        .content {
          text-align: right;
          padding-right: 8px;
          padding-left: 0;
        }
      }
    }
    .message + .message {
      margin-top: 15px;
    }
  }
  .send-message {
    position: relative;
    margin-top: 20px;
    input {
      width: calc(100% - 60px);
      height: 40px;
      border-top-left-radius: 99px;
      border-bottom-left-radius: 99px;
      outline: none;
      border: none;
      padding: 0 25px;
      box-sizing: border-box;
      vertical-align: middle;
    }
    button {
      vertical-align: middle;
      width: 60px;
      height: 40px;
      border-top-right-radius: 99px;
      border-bottom-right-radius: 99px;
      outline: none;
      border: none;
      background-color: #fff;
      background-image: url(../../assets/images/send.png);
      background-position: center;
      background-repeat: no-repeat;
      cursor: pointer;
      padding: 0;
    }
  }
}
</style>