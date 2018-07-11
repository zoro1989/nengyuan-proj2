<template>
  <scroll class="cost-info-container">
    <div class="cost-info">
      <div class="cost-title">
        <span>选择日期</span>
        <select>
          <option></option>
        </select>
        <span>用能单位</span>
        <select>
          <option></option>
        </select>
      </div>
      <div class="panel-box">
        <data-panel-title title="三月集团能源用量信息"></data-panel-title>
        <div class="panel row">
          <div class="col-xs-12">
            <data-panel
              class="border-right"
              title="能源消耗总量"
              data="10.3514"
              unit="万吨标煤"
              tongbiData="20.28%"
              tongbiStatus="down"
              huanbiData="2.73%"
              huanbiStatus="up"
              showType="column"
            ></data-panel>
          </div>
          <div class="col-xs-12">
            <data-panel
              class="border-right"
              title="电量"
              data="373709.5"
              unit="万千瓦时"
              tongbiData="20.28%"
              tongbiStatus="down"
              huanbiData="2.73%"
              huanbiStatus="up"
              showType="column"
            ></data-panel>
          </div>
          <div class="col-xs-12">
            <data-panel
              class="border-right"
              title="热量"
              data="10.3514"
              unit="吉焦"
              tongbiData="20.28%"
              tongbiStatus="down"
              huanbiData="2.73%"
              huanbiStatus="up"
              showType="column"
            ></data-panel>
          </div>
          <div class="col-xs-12">
            <data-panel
              class="border-right"
              title="水量"
              data="3214"
              unit="吨"
              tongbiData="20.28%"
              tongbiStatus="down"
              huanbiData="2.73%"
              huanbiStatus="up"
              showType="column"
            ></data-panel>
          </div>
          <div class="col-xs-12">
            <data-panel
              class="border-right"
              title="天然气量"
              data="15826.5"
              unit="万立方米"
              tongbiData="20.28%"
              tongbiStatus="down"
              huanbiData="2.73%"
              huanbiStatus="up"
              showType="column"
            ></data-panel>
          </div>
          <div class="col-xs-12">
            <data-panel
              class="border-right"
              title="原煤量"
              data="611262.1"
              unit="吨"
              tongbiData="20.28%"
              tongbiStatus="down"
              huanbiData="2.73%"
              huanbiStatus="up"
              showType="column"
            ></data-panel>
          </div>
          <div class="col-xs-12">
            <data-panel
              title="清洁能源"
              data="4586"
              unit="吨标煤"
              tongbiData="20.28%"
              tongbiStatus="down"
              huanbiData="2.73%"
              huanbiStatus="up"
              showType="column"
            ></data-panel>
          </div>
        </div>
      </div>
      <div class="panel-box">
        <data-panel-title title="三月集团能源费用信息"></data-panel-title>
        <div class="panel row">
          <div class="col-xs-12">
            <data-panel
              class="border-right"
              title="能源总费用"
              data="461107.7"
              unit="万元"
              tongbiData="20.28%"
              tongbiStatus="down"
              huanbiData="2.73%"
              huanbiStatus="up"
              showType="column"
            ></data-panel>
          </div>
          <div class="col-xs-12">
            <data-panel
              class="border-right"
              title="电费"
              data="168483.9"
              unit="万元"
              tongbiData="20.28%"
              tongbiStatus="down"
              huanbiData="2.73%"
              huanbiStatus="up"
              showType="column"
            ></data-panel>
          </div>
          <div class="col-xs-12">
            <data-panel
              class="border-right"
              title="热量费"
              data="48019.5"
              unit="万元"
              tongbiData="20.28%"
              tongbiStatus="down"
              huanbiData="2.73%"
              huanbiStatus="up"
              showType="column"
            ></data-panel>
          </div>
          <div class="col-xs-12">
            <data-panel
              class="border-right"
              title="水费"
              data="9420.6"
              unit="万元"
              tongbiData="20.28%"
              tongbiStatus="down"
              huanbiData="2.73%"
              huanbiStatus="up"
              showType="column"
            ></data-panel>
          </div>
          <div class="col-xs-12">
            <data-panel
              class="border-right"
              title="天然气费"
              data="37430.0"
              unit="万元"
              tongbiData="20.28%"
              tongbiStatus="down"
              huanbiData="2.73%"
              huanbiStatus="up"
              showType="column"
            ></data-panel>
          </div>
          <div class="col-xs-12">
            <data-panel
              class="border-right"
              title="原煤费"
              data="1371.1"
              unit="万元"
              tongbiData="20.28%"
              tongbiStatus="down"
              huanbiData="2.73%"
              huanbiStatus="up"
              showType="column"
            ></data-panel>
          </div>
          <div class="col-xs-12">
            <div class="sample-data-panel">
              <data-panel
                title="柴油费"
                data="8047.2"
                unit="万元"
                showBi="hide"
              ></data-panel>
            </div>
            <div class="sample-data-panel">
              <data-panel
                title="其他费"
                data="6659.2"
                unit="万元"
                showBi="hide"
              ></data-panel>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-4 col-md-12 col-xs-12">
          <chart-pie class="quantity" ref="fee"
                     titleText="三月电量占比"
                     :radius="quantityChartRadius"
                     postion="inside"></chart-pie>
        </div>
        <div class="col-lg-8 col-md-12 col-xs-12">
          <chart-pie class="fee" ref="fee"
                     titleText="三月电费用占比"
                     :radius="feeChartRadius"
                     :othersData="othersData"
                     postion="inside"></chart-pie>
        </div>
      </div>
      <div class="panel-box">
        <chart-bar-line class="energy" ref="energy"
                        titleText="能源用量与节能指标同比分析"></chart-bar-line>
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
      .panel-box
        margin: 10px 10px 0px 10px
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
