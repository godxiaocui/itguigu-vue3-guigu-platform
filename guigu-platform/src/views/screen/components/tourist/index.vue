<template>
  <div class="box">
    <div class="top clearfix">
      <p class="title">实时游客统计</p>
      <p class="bg"></p>
      <p class="right">
        可预约总量
        <span>99999</span>
        人
      </p>
    </div>
    <div class="number">
      <span v-for="(item, index) in people" :key="index">{{ item }}</span>
    </div>
    <!-- 盒子将来echarts展示图形图标的节点 -->
    <div class="charts" ref="charts">123</div>
  </div>
</template>

<script setup lang="ts">
import 'echarts-liquidfill'
import * as echarts from 'echarts'
import { ref, onMounted } from 'vue'
let people = ref('215908人')
let charts = ref()
onMounted(() => {
  // 基于准备好的dom，初始化echarts实例
  let myChart = echarts.init(charts.value)
  // 指定图表的配置项和数据
  let option = {
    series: [
      {
        type: 'liquidFill', //系列
        data: [0.6, 0.5, 0.4], // 展示的数据
        radius: '80%', // 半径
        center: ['50%', '50%'],
        backgroundStyle: {
          color: 'rgba(0,0,0,0)',
        },
        label: {
          normal: {
            formatter: function (param) {
              return Math.round(param.value * 100) + '%'
            },
            textStyle: {
              fontSize: 60,
              color: 'yellowgreen',
            },
          },
        },
      },
    ],
  }
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option)
})
</script>

<style scoped lang="scss">
.clearfix::after {
  content: '';
  display: block;
  clear: both;
}
.box {
  background: url(../../images/dataScreen-main-lb.png) no-repeat;
  background-size: 100% 100%;
  margin-top: 10px;

  .top {
    margin-left: 20px;

    .title {
      color: white;
      font-size: 20px;
    }

    .bg {
      width: 68px;
      height: 7px;
      background: url(../../images/dataScreen-title.png) no-repeat;
      background-size: 100% 100%;
      margin-top: 10px;
    }

    .right {
      float: right;
      color: white;
      font-size: 20px;

      span {
        color: yellowgreen;
      }
    }
  }

  .number {
    padding: 10px;
    margin-top: 30px;
    display: flex;

    span {
      flex: 1;
      height: 40px;
      text-align: center;
      line-height: 40px;
      background: url(../../images/total.png) no-repeat;
      background-size: 100% 100%;
      color: #29fcff;
    }
  }

  .charts {
    width: 100%;
    height: 270px;
  }
}
</style>
