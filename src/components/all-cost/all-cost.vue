<template>
  <scroll class="cost-info-container">
    <div class="cost-info">
      <div class="cost-title">
        <span>选择日期</span>
        <select>
          <option>2017-1</option>
          <option>2017-2</option>
          <option>2017-3</option>
          <option>2017-4</option>
          <option>2017-5</option>
          <option>2017-6</option>
          <option>2017-7</option>
          <option>2017-8</option>
          <option>2017-9</option>
          <option>2017-10</option>
          <option>2017-11</option>
          <option>2017-12</option>
        </select>
        <span>用能单位</span>
        <select>
          <option>产值综合能耗</option>
          <option>产值碳排放量</option>
          <option>产值耗电量</option>
          <option>产值耗天然气量</option>
          <option>产值耗水量</option>
          <option>产值耗热量</option>
          <option>单车综合能耗</option>
          <option>单车碳排放量</option>
        </select>
      </div>
      <div class="row">
        <div class="panel-l col-lg-6 col-md-12 col-xs-12">
          <div class="panel-box">
            <data-panel-title title="三月能源绩效"></data-panel-title>
            <div class="panel row">
              <div class="col-md-6 col-xs-12">
                <data-panel
                  class="border-right border-bottom"
                  title="产值综合能耗"
                  data="0.0321"
                  unit="吨标煤/万元"
                  tongbiData="53.94%"
                  tongbiStatus="down"
                  huanbiData="23.94%"
                  huanbiStatus="down"
                ></data-panel>
              </div>
              <div class="col-md-6 col-xs-12">
                <data-panel
                  class="border-bottom"
                  title="单车能源费用"
                  data="1665"
                  unit="元/辆"
                  tongbiData="58.94%"
                  tongbiStatus="down"
                  huanbiData="2.96%"
                  huanbiStatus="up"
                ></data-panel>
              </div>
            </div>
            <div class="panel row">
              <div class="col-md-6 col-xs-12">
                <data-panel
                  class="border-right"
                  title="单车综合标煤"
                  data="0.442"
                  unit="吨标煤/辆"
                  tongbiData="7.94%"
                  tongbiStatus="down"
                  huanbiData="58.94%"
                  huanbiStatus="down"
                ></data-panel>
              </div>
              <div class="col-md-6 col-xs-12">
                <data-panel
                  title="单车碳排放量"
                  data="101.58"
                  unit="KGCO2/辆"
                  tongbiData="2.54%"
                  tongbiStatus="up"
                  huanbiData="2.96%"
                  huanbiStatus="up"
                ></data-panel>
              </div>
            </div>
          </div>
        </div>
        <div class="panel-r col-lg-6 col-md-12 col-xs-12">
          <div class="panel-box">
            <data-panel-title title="三月能耗信息"></data-panel-title>
            <div class="panel row">
              <div class="col-md-6 col-xs-12">
                <data-panel
                  class="border-right border-bottom"
                  title="生产产量"
                  data="22.9788"
                  unit="万辆"
                  tongbiData="212.2%"
                  tongbiStatus="down"
                  huanbiData="2.48%"
                  huanbiStatus="down"
                ></data-panel>
              </div>
              <div class="col-md-6 col-xs-12">
                <data-panel
                  class="border-bottom"
                  title="能源用量"
                  data="10.3514"
                  unit="万吨标煤"
                  tongbiData="20.28%"
                  tongbiStatus="down"
                  huanbiData="2.73%"
                  huanbiStatus="up"
                ></data-panel>
              </div>
            </div>
            <div class="panel row">
              <div class="col-md-6 col-xs-12">
                <data-panel
                  class="border-right"
                  title="碳排放量"
                  data="33.30"
                  unit="吨CO2"
                  tongbiData="56.2%"
                  tongbiStatus="down"
                  huanbiData="34.7%"
                  huanbiStatus="up"
                ></data-panel>
              </div>
              <div class="col-md-6  col-xs-12">
                <data-panel
                  title="能源费用"
                  data="37434.71"
                  unit="万元"
                  tongbiData="17.68%"
                  tongbiStatus="down"
                  huanbiData="1.32%"
                  huanbiStatus="up"
                ></data-panel>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="panel-box">
        <chart-bar-line class="energy" ref="energy"
                        titleText="三月整车制造产值综合能耗"></chart-bar-line>
      </div>
      <div class="panel-box">
        <chart-bar-line class="energy" ref="energy"
                        titleText="三月零部件加工产值综合能耗"></chart-bar-line>
      </div>
    </div>
  </scroll>
</template>
<script>
import Scroll from 'base/scroll/scroll'

import DataPanel from 'base/data-panel/data-panel'
import DataPanelTitle from 'base/data-panel-title/data-panel-title'
import ChartPie from 'base/chart-pie/chart-pie'
import ChartBarLine from 'base/chart-bar-line/chart-bar-line'
export default {
  components: {
    Scroll,
    DataPanel,
    DataPanelTitle,
    ChartPie,
    ChartBarLine
  },
  data() {
    return {
      quantityChartRadius: [0, '70%'],
      feeChartRadius: [0, '70%'],
      othersData: ['一汽解放：14%', '天津丰田：9%', '天津夏利：3%', '长春丰越：3%', '一汽通用：2%']
    }
  }
}
</script>
<style lang="stylus" scoped>
  @import "~common/stylus/variable.styl"
  @import "~common/stylus/mixin.styl"
  .cost-info-container
    overflow: hidden
    position: absolute
    top: 0
    left: 0
    right: 0
    bottom: 0
    .cost-info
      background: $color-sub-text
      display: flex
      flex-direction: column
      min-height: 100%
      .cost-title
        margin: 10px 10px 0 10px
        padding: 0 10px
        height: 40px
        line-height: 40px
        background: #fff
        border-radius: 5px
        color: #333
      .panel-l
        .panel-box
          margin: 10px 10px 0 10px
      .panel-r
        .panel-box
          margin: 10px 10px 0 0
      .panel-box
        margin: 0px 10px 10px 10px
        padding: 0 10px 10px 10px
        border-radius: 5px
        background: #fff
        .panel
          display: flex
          div
            flex: 1
            display: flex
            flex-direction: column
            .sample-data-panel
              flex: 1
        .energy
          min-height: 250px
          height: 100%
        &:last-child
          margin-bottom: 10px
      .quantity
        background: #fff
        margin: 10px
        min-height: 250px
        height: 100%
        border-radius: 5px
      .fee
        background: #fff
        margin: 10px 10px 10px 0px
        min-height: 250px
        height: 100%
        border-radius: 5px
</style>
