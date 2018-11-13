<template>
  <transition name="slide">
    <div class="menu">
      <ul class="mcd-menu">
        <li>
          <a href="#" :class="selectMenuIndex === 0 ? 'active' : ''" @click="changeRoute('/home', 0)">
            <i class="fa fa-home"></i>
            <strong>首页</strong>
          </a>
        </li>
        <li>
          <a href="#" :class="selectMenuIndex === 1 ? 'active' : ''">
            <i class="fa fa-search"></i>
            <strong>能源综合分析</strong>
          </a>
          <ul>
            <li>
              <a href="#"><i class="fa fa-battery-half"></i>能源消耗结构</a>
              <ul>
                <li><a href="#" @click="changeRoute('/nyzlfx/nh', 1)"><i class="fa fa-list"></i>能源种类分析</a></li>
                <li><a href="#" @click="changeRoute('/nybmfx/nh', 1)"><i class="fa fa-institution"></i>能源部门分析</a></li>
              </ul>
            </li>
            <li>
              <a href="#"><i class="fa fa-yen"></i>能源费用结构</a>
              <ul>
                <li><a href="#" @click="changeRoute('/nyzlfx/fy', 1)"><i class="fa fa-list"></i>能源种类分析</a></li>
                <li><a href="#" @click="changeRoute('/nybmfx/fy', 1)"><i class="fa fa-institution"></i>能源部门分析</a></li>
              </ul>
            </li>
            <li><a href="#" @click="changeRoute('/eyhtfx', 1)"><i class="fa fa-pie-chart"></i>二氧化碳量分布</a></li>
          </ul>
        </li>
        <li>
          <a href="#" :class="selectMenuIndex === 2 ? 'active' : ''">
            <i class="fa fa-edit"></i>
            <strong>能源统计分析</strong>
          </a>
          <ul>
            <li><a href="#" @click="changeRoute('/nyylfx', 2)"><i class="fa fa-bar-chart"></i>能源用量分析</a></li>
            <li><a href="#" @click="changeRoute('/nyfyfx', 2)"><i class="fa fa-yen"></i>能源费用分析</a></li>
            <li><a href="#" @click="changeRoute('/tjeyhtfx', 2)"><i class="fa fa-envira"></i>二氧化碳排放量分析</a></li>
            <li><a href="#" @click="changeRoute('/bmynfx', 2)"><i class="fa fa-institution"></i>部门用能分析</a></li>
            <li><a href="#" @click="changeRoute('/nyfhfx', 2)"><i class="fa fa-bell-o"></i>能源负荷分析</a></li>
            <li><a href="#" @click="changeRoute('/djfx', 2)"><i class="fa fa-flash"></i>电价分析</a></li>
          </ul>
        </li>
        <li>
          <a href="#" :class="selectMenuIndex === 3 ? 'active' : ''">
            <i class="fa fa-line-chart"></i>
            <strong>KPI指标分析</strong>
          </a>
          <ul>
            <li><a href="#" @click="changeRoute('/kpi1', 3)"><i class="fa fa-hourglass-start"></i>产值综合能耗分析</a></li>
            <li><a href="#" @click="changeRoute('/kpi2', 3)"><i class="fa fa-tint"></i>产值耗水量分析</a></li>
            <li><a href="#" @click="changeRoute('/kpi3', 3)"><i class="fa fa-battery-half"></i>能源消耗总量分析</a></li>
            <li><a href="#" @click="changeRoute('/kpi4', 3)"><i class="fa fa-truck"></i>单车综合能耗分析</a></li>
            <li><a href="#" @click="changeRoute('/kpi5', 3)"><i class="fa fa-trophy"></i>KPI评价考核表</a></li>
          </ul>
        </li>
        <li>
          <a href="#" :class="selectMenuIndex === 4 ? 'active' : ''">
            <i class="fa fa-gears"></i>
            <strong>设备能效分析</strong>
          </a>
          <ul>
            <li><a href="#" @click="changeRoute('/nxbyq', 4)"><i class="fa fa-gear"></i>变压器</a></li>
            <li><a href="#" @click="changeRoute('/nxkyj', 4)"><i class="fa fa-gear"></i>空压机</a></li>
            <li><a href="#" @click="changeRoute('/nxfj', 4)"><i class="fa fa-gear"></i>风机</a></li>
            <li><a href="#" @click="changeRoute('/nxsb', 4)"><i class="fa fa-gear"></i>水泵</a></li>
          </ul>
        </li>
        <li>
          <a href="#" :class="selectMenuIndex === 5 ? 'active' : ''">
            <i class="fa fa-book"></i>
            <strong>设备台账</strong>
          </a>
          <ul>
            <li><a href="#" @click="changeRoute('/tz1-ly', 5)"><i class="fa fa-file-text-o"></i>工业炉窑台账</a></li>
            <li><a href="#" @click="changeRoute('/tz2-gl', 5)"><i class="fa fa-file-text-o"></i>锅炉台账</a></li>
            <li><a href="#" @click="changeRoute('/tz3-kyj', 5)"><i class="fa fa-file-text-o"></i>空压机台账</a></li>
            <li><a href="#" @click="changeRoute('/tz5-tfj', 5)"><i class="fa fa-file-text-o"></i>通风机台账</a></li>
            <li><a href="#" @click="changeRoute('/tz6-sb', 5)"><i class="fa fa-file-text-o"></i>水泵台账</a></li>
            <li><a href="#" @click="changeRoute('/tz7-byq', 5)"><i class="fa fa-file-text-o"></i>变压器台账</a></li>
            <li><a href="#" @click="changeRoute('/tz8-qt', 5)"><i class="fa fa-file-text-o"></i>其他台账</a></li>
          </ul>
        </li>
        <li>
          <a href="#" :class="selectMenuIndex === 6 ? 'active' : ''" @click="changeRoute('/waning', 6)">
            <i class="fa fa-bell-o"></i>
            <strong>能源预警报警</strong>
          </a>
        </li>
        <li>
          <a href="#" :class="selectMenuIndex === 7 ? 'active' : ''">
            <i class="fa fa-gears"></i>
            <strong>设备录入</strong>
          </a>
          <ul>
            <li><a href="#" @click="changeRoute('/byq', 7)"><i class="fa fa-gear"></i>变压器</a></li>
            <li><a href="#" @click="changeRoute('/kyj', 7)"><i class="fa fa-gear"></i>空压机</a></li>
            <li><a href="#" @click="changeRoute('/dj', 7)"><i class="fa fa-gear"></i>电机</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </transition>
</template>
<script>
  export default {
    data() {
      return {
        selectMenuIndex: 0,
        showsMenu: [],
        uniqueOpened: true
      }
    },
    methods: {
      hideMenu() {
        this.$emit('hide-menu')
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath)
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath)
      },
      changeRoute(path, index) {
        this.selectMenuIndex = index
        this.$router.replace(path)
      }
    }
  }
</script>
<style scoped lang="stylus">
  @import "~common/stylus/mixin.styl"
  @import "~common/stylus/variable"
  .menu
    position: fixed
    z-index: 9999
    top: 70px
    left: 0
    width: 180px
    bottom: 0
    background: #005d8f
    color: #fff
    &.slide-enter-active, &.slide-leave-active
      transition: all 0.3s
    &.slide-enter, &.slide-leave-to
      flex: 0 0 0px
    .mcd-menu {
      list-style: none;
      padding: 0;
      margin: 4px;
      background: #005d8f;
      /*height: 100px;*/
      border-radius: 2px;
      -moz-border-radius: 2px;
      -webkit-border-radius: 2px;

      /* == */
      width: 172px;
      /* == */
    }
  .mcd-menu li {
    position: relative;
    /*float:left;*/
  }
  .mcd-menu li a {
    outline:none;
    display: block;
    text-decoration: none;
    padding: 12px 20px;
    color: #fff;
    text-align: left;
    position: relative;
    border-bottom: 1px solid #777;
  }
  .mcd-menu li a i {
    float: left;
    font-size: 20px;
    margin: 0 10px 0 0;
  }
  .mcd-menu li a p {
    float: left;
    margin: 0 ;
  }

  .mcd-menu li a strong {
    display: block;
    text-transform: uppercase;
  }
  .mcd-menu li a small {
    display: block;
    font-size: 10px;
  }

  .mcd-menu li a i, .mcd-menu li a strong, .mcd-menu li a small {
    position: relative;

    transition: all 300ms linear;
    -o-transition: all 300ms linear;
    -ms-transition: all 300ms linear;
    -moz-transition: all 300ms linear;
    -webkit-transition: all 300ms linear;
  }
  .mcd-menu li:hover > a i {
    opacity: 1;
    -webkit-animation: moveFromTop 300ms ease-in-out;
    -moz-animation: moveFromTop 300ms ease-in-out;
    -ms-animation: moveFromTop 300ms ease-in-out;
    -o-animation: moveFromTop 300ms ease-in-out;
    animation: moveFromTop 300ms ease-in-out;
  }
  .mcd-menu li:hover a strong {
    opacity: 1;
    -webkit-animation: moveFromLeft 300ms ease-in-out;
    -moz-animation: moveFromLeft 300ms ease-in-out;
    -ms-animation: moveFromLeft 300ms ease-in-out;
    -o-animation: moveFromLeft 300ms ease-in-out;
    animation: moveFromLeft 300ms ease-in-out;
  }
  .mcd-menu li:hover a small {
    opacity: 1;
    -webkit-animation: moveFromRight 300ms ease-in-out;
    -moz-animation: moveFromRight 300ms ease-in-out;
    -ms-animation: moveFromRight 300ms ease-in-out;
    -o-animation: moveFromRight 300ms ease-in-out;
    animation: moveFromRight 300ms ease-in-out;
  }

  .mcd-menu li:hover > a {
    color: #06e56d;
  }
  .mcd-menu li a.active {
    position: relative;
    color: #06e56d;
    border:0;
    /*border-top: 4px solid #e67e22;
    border-bottom: 4px solid #e67e22;
    margin-top: -4px;*/
    box-shadow: 0 0 5px #2b87b7;
    -moz-box-shadow: 0 0 5px #2b87b7;
    -webkit-box-shadow: 0 0 5px #2b87b7;

    /* == */
    border-left: 4px solid #06e56d;
    border-right: 4px solid #06e56d;
    margin: 0 -4px;
    /* == */
  }
  .mcd-menu li a.active:before {
    content: "";
    position: absolute;
    /*top: 0;
    left: 45%;
    border-top: 5px solid #e67e22;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;*/

    /* == */
    top: 42%;
    left: 0;
    border-left: 5px solid #06e56d;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    /* == */
  }

  /* == */
  .mcd-menu li a.active:after {
    content: "";
    position: absolute;
    top: 42%;
    right: 0;
    border-right: 5px solid #06e56d;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
  }
  /* == */

  @-webkit-keyframes moveFromTop {
    from {
      opacity: 0;
      -webkit-transform: translateY(200%);
      -moz-transform: translateY(200%);
      -ms-transform: translateY(200%);
      -o-transform: translateY(200%);
      transform: translateY(200%);
    }
    to {
      opacity: 1;
      -webkit-transform: translateY(0%);
      -moz-transform: translateY(0%);
      -ms-transform: translateY(0%);
      -o-transform: translateY(0%);
      transform: translateY(0%);
    }
  }
  @-webkit-keyframes moveFromLeft {
    from {
      opacity: 0;
      -webkit-transform: translateX(200%);
      -moz-transform: translateX(200%);
      -ms-transform: translateX(200%);
      -o-transform: translateX(200%);
      transform: translateX(200%);
    }
    to {
      opacity: 1;
      -webkit-transform: translateX(0%);
      -moz-transform: translateX(0%);
      -ms-transform: translateX(0%);
      -o-transform: translateX(0%);
      transform: translateX(0%);
    }
  }
  @-webkit-keyframes moveFromRight {
    from {
      opacity: 0;
      -webkit-transform: translateX(-200%);
      -moz-transform: translateX(-200%);
      -ms-transform: translateX(-200%);
      -o-transform: translateX(-200%);
      transform: translateX(-200%);
    }
    to {
      opacity: 1;
      -webkit-transform: translateX(0%);
      -moz-transform: translateX(0%);
      -ms-transform: translateX(0%);
      -o-transform: translateX(0%);
      transform: translateX(0%);
    }
  }

  .mcd-menu li ul,
  .mcd-menu li ul li ul {
    position: absolute;
    height: auto;
    min-width: 200px;
    padding: 0;
    margin: 0;
    background: #005d8f;
    /*border-top: 4px solid #e67e22;*/
    opacity: 0;
    visibility: hidden;
    transition: all 300ms linear;
    -o-transition: all 300ms linear;
    -ms-transition: all 300ms linear;
    -moz-transition: all 300ms linear;
    -webkit-transition: all 300ms linear;
    /*top: 130px;*/
    z-index: 10000;

    /* == */
    left:202px;
    top: 0px;
    border-left: 4px solid #06e56d;
    /* == */
  }
  .mcd-menu li ul:before {
    content: "";
    position: absolute;
    top: 16.8px;
    left: -9px;
    border-right: 5px solid #06e56d;
    border-bottom: 5px solid transparent;
    border-top: 5px solid transparent;
  }
  .mcd-menu li:hover > ul,
  .mcd-menu li ul li:hover > ul {
    display: block;
    opacity: 1;
    visibility: visible;
    left:172px;
  }
  .mcd-menu li ul li a {
    padding: 10px;
    text-align: left;
    border: 0;
    border-bottom: 1px solid #777;
    height: auto;
  }
  .mcd-menu li ul li a i {
    font-size: 16px;
    display: inline-block;
    margin: 0 10px 0 0;
  }
  .mcd-menu li ul li ul {
    left: 230px;
    top: 0;
    border: 0;
    border-left: 4px solid #06e56d;
  }
  .mcd-menu li ul li ul:before {
    content: "";
    position: absolute;
    top: 15px;
    left: -9px;
    border-right: 5px solid #06e56d;
    border-bottom: 5px solid transparent;
    border-top: 5px solid transparent;
  }
  .mcd-menu li ul li:hover > ul {
    top: 0px;
    left: 200px;
  }

  .mcd-menu li a.search {
    padding: 10px 10px 15px 10px;
    clear: both;
  }
  .mcd-menu li a.search i {
    margin: 0;
    display: inline-block;
    font-size: 18px;
  }
  .mcd-menu li a.search input {
    border: 1px solid #EEE;
    padding: 10px;
    background: #FFF;
    outline: none;
    color: #777;
    width:170px;
    float:left;
  }
  .mcd-menu li a.search button {
    border: 1px solid #06e56d;
    background: #06e56d;
    outline: none;
    color: #FFF;
    margin-left: -4px;
    float:left;
    padding: 10px 10px 11px 10px;
  }
  .mcd-menu li a.search input:focus {
    border: 1px solid #06e56d;
  }

  .search-mobile {
    display:none !important;
    background:#06e56d;
    border-left:1px solid #06e56d;
    border-radius:0 3px 3px 0;
  }
  .search-mobile i {
    color:#FFF;
    margin:0 !important;
  }

  @media only screen and (min-width: 960px) and (max-width: 1199px) {
    .mcd-menu {
      margin-left:10px;
    }
  }

  @media only screen and (min-width: 768px) and (max-width: 959px) {
    .mcd-menu {
      width: 200px;
    }
    .mcd-menu li a {
      height:30px;
    }
    .mcd-menu li a i {
      font-size: 22px;
    }
    .mcd-menu li a strong {
      font-size: 12px;
    }
    .mcd-menu li a small {
      font-size: 10px;
    }
    .mcd-menu li a.search input {
      width: 120px;
      font-size: 12px;
    }
    .mcd-menu li a.search buton{
      padding: 8px 10px 9px 10px;
    }
    .mcd-menu li > ul {
      min-width:180px;
    }
    .mcd-menu li:hover > ul {
      min-width:180px;
      left:200px;
    }
    .mcd-menu li ul li > ul, .mcd-menu li ul li ul li > ul {
      min-width:150px;
    }
    .mcd-menu li ul li:hover > ul {
      left:180px;
      min-width:150px;
    }
    .mcd-menu li ul li ul li:hover > ul {
      left:150px;
      min-width:150px;
    }
    .mcd-menu li ul a {
      font-size:12px;
    }
    .mcd-menu li ul a i {
      font-size:14px;
    }
  }

  @media only screen and (min-width: 480px) and (max-width: 767px) {

    .mcd-menu {
      width: 50px;
    }
    .mcd-menu li a {
      position: relative;
      padding: 12px 16px;
      height:20px;
    }
    .mcd-menu li a small {
      display: none;
    }
    .mcd-menu li a strong {
      display: none;
    }
    .mcd-menu li a:hover strong,.mcd-menu li a.active strong {
      display:block;
      font-size:10px;
      padding:3px 0;
      position:absolute;
      bottom:0px;
      left:0;
      background:#06e56d;
      color:#FFF;
      min-width:100%;
      text-transform:lowercase;
      font-weight:normal;
      text-align:center;
    }
    .mcd-menu li .search {
      display: none;
    }

    .mcd-menu li > ul {
      min-width:180px;
      left:70px;
    }
    .mcd-menu li:hover > ul {
      min-width:180px;
      left:50px;
    }
    .mcd-menu li ul li > ul, .mcd-menu li ul li ul li > ul {
      min-width:150px;
    }
    .mcd-menu li ul li:hover > ul {
      left:180px;
      min-width:150px;
    }
    .mcd-menu li ul li ul li > ul {
      left:35px;
      top: 45px;
      border:0;
      border-top:4px solid #06e56d;
    }
    .mcd-menu li ul li ul li > ul:before {
      left:30px;
      top: -9px;
      border:0;
      border-bottom:5px solid #06e56d;
      border-left:5px solid transparent;
      border-right:5px solid transparent;
    }
    .mcd-menu li ul li ul li:hover > ul {
      left:30px;
      min-width:150px;
      top: 35px;
    }
    .mcd-menu li ul a {
      font-size:12px;
    }
    .mcd-menu li ul a i {
      font-size:14px;
    }

  }

  @media only screen and (max-width: 479px) {
    .mcd-menu {
      width: 50px;
    }
    .mcd-menu li a {
      position: relative;
      padding: 12px 16px;
      height:20px;
    }
    .mcd-menu li a small {
      display: none;
    }
    .mcd-menu li a strong {
      display: none;
    }
    .mcd-menu li a:hover strong,.mcd-menu li a.active strong {
      display:block;
      font-size:10px;
      padding:3px 0;
      position:absolute;
      bottom:0px;
      left:0;
      background:#06e56d;
      color:#FFF;
      min-width:100%;
      text-transform:lowercase;
      font-weight:normal;
      text-align:center;
    }
    .mcd-menu li .search {
      display: none;
    }

    .mcd-menu li > ul {
      min-width:180px;
      left:70px;
    }
    .mcd-menu li:hover > ul {
      min-width:180px;
      left:50px;
    }
    .mcd-menu li ul li > ul, .mcd-menu li ul li ul li > ul {
      min-width:150px;
    }
    .mcd-menu li ul li:hover > ul {
      left:180px;
      min-width:150px;
    }
    .mcd-menu li ul li ul li > ul {
      left:35px;
      top: 45px;
      border:0;
      border-top:4px solid #06e56d;
    }
    .mcd-menu li ul li ul li > ul:before {
      left:30px;
      top: -9px;
      border:0;
      border-bottom:5px solid #06e56d;
      border-left:5px solid transparent;
      border-right:5px solid transparent;
    }
    .mcd-menu li ul li ul li:hover > ul {
      left:30px;
      min-width:150px;
      top: 35px;
    }
    .mcd-menu li ul a {
      font-size:12px;
    }
    .mcd-menu li ul a i {
      font-size:14px;
    }

  }
</style>
