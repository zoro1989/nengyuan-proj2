<template>
  <div class="login">
    <div class="title">
      <span class="text">中国一汽集团能源管理分析系统</span>
    </div>
    <div class="content">
      <div class="box">
        <div class="tab-box">
          <div class="tab">
            <div class="tab-item" :class="{ active: tabIndex === 0 }" @click="tabChange(0)">能源管理分析系统</div>
            <div class="tab-item" :class="{ active: tabIndex === 1 }" @click="tabChange(1)">能源网络查询系统</div>
            <div class="tab-item" :class="{ active: tabIndex === 2 }" @click="tabChange(2)">能源消耗数据直报系统</div>
          </div>
          <div class="tab-panel">
            <div class="tab-title">欢迎登录</div>
            <div class="panel-box">
              <div class="panel-item">
                <label class="panel-label"><i class="fa fa-user"></i></label>
                <input class="panel-input" placeholder="登录账号"/>
              </div>
              <div class="panel-item">
                <label class="panel-label"><i class="fa fa-lock"></i></label>
                <input class="panel-input" placeholder="输入密码"/>
              </div>
              <div class="btn-login" @click="onLogin">登录</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tabIndex: 0
    }
  },
  methods: {
    tabChange(index) {
      this.tabIndex = index
    },
    onLogin() {
      this.$router.replace('home')
    }
  }
}
</script>
<style scoped lang="stylus">
  @import "~common/stylus/variable.styl"
  .login
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    .title
      height: 100px
      line-height: 100px
      width: 100%
      background: url(bghead.png) $color-theme-d no-repeat
      background-size:cover
      background-position: right
      .text
        color: #f5f4f4
        font-size: 25px
        padding-left: 150px
        overflow: hidden
    .content
      position: fixed
      top: 100px
      left: 0
      width: 100%
      bottom: 0
      background: url(bgcontent.png) $color-theme-d no-repeat
      background-size:cover
      background-position: right
      display: flex
      justify-content: flex-end
      align-items: center
      .tab-box
        margin-right: 20px
        display: flex
        align-items: center
        .tab
          display: inline-block
          width: 200px
          background: #fff
          border-top: 1px solid #acb3bf
          border-left: 1px solid #acb3bf
          .tab-item
            height: 70px
            line-height: 70px
            padding: 0 10px
            font-size: $font-size-medium-x
            color: #666
            border-bottom: 1px solid #acb3bf
            cursor: pointer
            position: relative
            &.active,&:hover
              color: #fff
              background: #567dff
              &:before
                content:"";
                width:0;
                height:0;
                position:absolute;
                right:-1px;
                top: 50%;
                transform: translateY(-50%)
                border-top:solid 12px transparent;
                border-right:solid 12px #fff;
                border-bottom:solid 12px transparent;
        .tab-panel
          display: inline-block
          width: 300px
          .tab-title
            font-size: $font-size-large
            color: #616a87
            height: 50px
            line-height: 50px
            padding-left: 5px
          .panel-box
            background: #fff
            padding: 30px
            min-height: 280px
            border: 1px solid #acb3bf
            margin-bottom: 50px
            display: flex
            flex-direction: column
            justify-content: center
            .panel-item
              position: relative
              margin-bottom: 20px
              border: 1px solid #afbacd
              .panel-label
                position: absolute
                left: 0
                top: 0
                bottom: 0
                width: 40px
                line-height: 36px
                font-size: 18px
                color: #d3d3d3
                text-align: center
              .panel-input
                padding: 10px 0 10px 50px;
                width: 100%
                line-height: 18px;
                font-size: 15px;
                color: #333;
                border: none;
                outline: none;
            .btn-login
              height: 45px
              line-height: 45px
              text-align: center
              font-size: 15px
              color: #fff
              background: #6172f5
              border-radius: 5px
              cursor: pointer
</style>
