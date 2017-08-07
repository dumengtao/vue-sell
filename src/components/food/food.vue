<template>
	<transition name="move">
		<div class="food" v-show="showFlag" ref="food">
			<div class="food-content">
				<!-- 头部图片区 -->
				<div class="image-header">
					<img :src="food.image">
					<div class="back" @click="hide">
						<i class="icon-arrow_lift"></i>
					</div>
				</div>
				<!-- 详情内容区 -->
				<div class="content">
					<h1 class="title">{{ food.name }}</h1>
					<div class="detail">
						<span class="sell-count">月售{{ food.sellCount }}份</span>
						<span class="rating">好评率{{ food.rating }}%</span>
					</div>
					<div class="price">
						<span class="now">￥{{ food.price }}</span>
						<span class="old" v-show="food.oldPrice">￥{{ food.oldPrice }}</span>
					</div>
					<!-- 购物小球组件 -->
					<div class="cartcontrol-wrapper">
						<cartcontrol :food="food"></cartcontrol>
					</div>
					<!-- 加入购物车按钮 -->
					<transition name="fade">
						<div @click.stop.prevent="addFirst" class="buy" v-show="!food.count || food.count===0">加入购物车</div>
					</transition>
				</div>
				<!-- 分割框 -->
				<split v-show="food.info"></split>
				<div class="info" v-show="food.info">
					<h1 class="title">商品介绍</h1>
					<p class="text">{{ food.info }}</p>
				</div>
				<!-- 分割框 -->
				<split></split>
				<div class="rating">
					<h1 class="title">商品评价</h1>
					<ratingselect :selectType="selectType" :onlyContent="onlyContent" :desc="desc" :ratings="food.ratings" @select="select" @toggle="toggle"></ratingselect>
					<!-- 商品评价内容 -->
					<div class="rating-wrapper">
						<ul v-show="food.ratings && food.ratings.length">
							<li v-show="needShow(rating.rateType,rating.text)" v-for="rating in food.ratings" class="rating-item">
								<!-- 用户名 -->
								<div class="user">
									<span class="name">{{ rating.username }}</span>
									<img class="avatar" :src="rating.avatar" width="12" height="12">
								</div>
								<!-- 评价时间 -->
								<div class="time">{{ rating.rateTime | formatDate }}</div>
								<!-- 评价内容 -->
								<p class="text">
									<i :class="{ 'icon-thumb_up': rating.rateType === 0,'icon-thumb_down': rating.rateType === 1 }"></i>
									{{ rating.text }}
								</p>
							</li>
						</ul>
						<div class="no-rating" v-show="!food.ratings || !food.ratings.length">暂无评价</div>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script type="ecmascript-6">
	import Vue from 'vue'
	import BScroll from 'better-scroll'
	import cartcontrol from '../cartcontrol/cartcontrol.vue'
	import split from '../split/split.vue'
	import ratingselect from '../ratingselect/ratingselect.vue'
	import bus from '../../common/js/bus.js'
	import { formatDate } from '../../common/js/date.js'

	const POSITIVE = 0   // 好的评价
	const NEGATIVE = 1   // 坏的评价
	const ALL = 2        // 所有评价   

	export default {
		props: {
			food: Object
		},
		data() {
			return {
				showFlag: false,
				selectType: ALL,
				onlyContent: true,
				desc: {
					all: '全部',
					positive: '推荐',
					negative: '吐槽'
				}
			}
		},
		created() {
			/*// 监听来自ratingselect.vue的改变selectType值的 “select” 函数
			bus.$on('select',(type) => {
				this.selectType = type
				this.$nextTick(() => {
					this.scroll.refresh()
				})
			}),
			// 监听来自ratingselect.vue的改变onlyContent值的 “toggle” 函数
			bus.$on('toggle',() => {
				this.onlyContent = !this.onlyContent
				this.$nextTick(() => {
					this.scroll.refresh()
				})
			})*/
		},
		methods: {
			// show方法被父组件goods调用
			show() {
				this.showFlag = true
				this.selectType = ALL
				this.onlyContent = false
				this.$nextTick(() => {
					if (!this.scroll) {
						this.scroll = new BScroll(this.$refs.food,{
							click: true
						})
					}else{
						this.scroll.refresh()
					}
				})
			},
			hide() {
				this.showFlag= false
			},
			addFirst(event) {
				// 消除PC端页面自带的点击事件
				if (!event._constructed) {
					return
				}
				// 发布购物车小球动画 “cartAdd” 函数
				bus.$emit('cartAdd',event.target)
				Vue.set(this.food,'count',1)
			},
			needShow(type,text) {
				if (this.onlyContent && !text) {
					return false
				}
				if (this.selectType === ALL) {
					return true
				}else{
					return type === this.selectType
				}
			},
			// 监听来自ratingselect.vue的改变selectType值的 “select” 函数
			select(type) {
				this.selectType = type
				this.$nextTick(() => {
					this.scroll.refresh()
				})
			},
			// 监听来自ratingselect.vue的改变onlyContent值的 “toggle” 函数
			toggle() {
				this.onlyContent = !this.onlyContent
				this.$nextTick(() => {
					this.scroll.refresh()
				})
			}
		},
		filters: {
			formatDate(time) {
				let date = new Date(time)
				return formatDate(date,'yyyy-MM-dd hh:mm')
			}
		},
		components: {
			cartcontrol,
			split,
			ratingselect
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/mlxin.styl'

	.food
		position fixed
		left 0
		top 0
		bottom 48px
		z-index 30
		width 100%
		background #fff
		&.move-enter-active,&.move-leave-active
			transition all .2s linear
		&.move-enter,&.move-leave-to
			transform translate3d(100%,0,0)
		.image-header
			position relative
			width 100%
			height 0
			padding-top 100%  // 使宽高相等，显示正方形的容器
			img
				position absolute
				top 0
				left 0
				width 100%
				height 100%
			.back
				position absolute
				top 10px
				left 0
				.icon-arrow_lift
					display block
					padding 10px
					font-size 20px
					color #C7C1C1
					color #fff
		.content
			position relative
			padding 18px
			.title
				margin-bottom 8px
				line-height 14px
				font-size 14px
				font-weight 700
				color rgb(7, 17, 27)
			.detail
				margin-bottom 18px
				line-height 10px
				height 10px
				font-size 0
				.sell-count,.rating
					font-size 10px
					color rgb(147, 153, 159)
				.sell-count
					margin-right 12px
			.price
				font-weight 700
				line-height 24px
				font-size 0
				.now
					margin-right 8px
					font-size 14px
					color rgb(240, 20, 20)
				.old
					text-decoration line-through
					font-size 10px
					color rgb(147, 153, 159)
			.cartcontrol-wrapper
				position absolute
				right 12px
				bottom 12px
			.buy
				position absolute
				right 18px
				bottom 18px
				z-index 10
				height 24px
				line-height 24px
				padding 0 12px
				box-sizing border-box
				border-radius 12px
				font-size 10px
				color #fff
				background rgb(0, 160, 220)
				&.fade-enter-active,&.fade-leave-active
					transition all .2s
				&.fade-enter,&.fade-leave-to
					opacity: 0
		.info
			padding 18px
			.title
				line-height 14px
				margin-bottom 6px
				font-size 14
				color rgb(7, 17, 27)
			.text
				line-height 24px
				padding 0 8px
				font-size 12px
				color rgb(77, 85, 93)
		.rating
			padding-top 18px
			.title
				line-height 14px
				margin-left 6px
				font-size 14
				color rgb(7, 17, 27)
			.rating-wrapper
				padding 0 18px
				.rating-item
					position relative
					padding 16px 0
					border-1px(rgba(7, 17, 27, .1))
					.user
						position absolute
						right 0
						top 16px
						line-height 12px
						font-size 0
						.name
							display inline-block
							margin-right 6px
							vertical-align top
							font-size 10px
							color rgb(147, 153, 159)
						.avatar
							border-radius 50%
					.time
						margin-bottom 6px
						line-height 12px
						font-size 10px
						color rgb(147, 153, 159)
					.text
						line-height 16px
						font-size 12px
						color rgb(7, 17, 27)
						.icon-thumb_up,.icon-thumb_down
							margin-right 4px
							line-height 16px
							font-size 12px
						.icon-thumb_up
							color rgb(0, 160, 220)
						.icon-thumb_down
							color rgb(147, 153, 159)
				.no-rating
					padding 16px 0
					font-size 12px
					color rgb(147, 153, 159)
</style>
