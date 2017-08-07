<template>
	<div class="ratingselect">
		<!-- 评价类型 -->
		<div class="rating-type border-1px">
			<!-- 全部 -->
			<span @click="select(2,$event)" class="block positive" :class="{ 'active': selectType === 2 }">
				{{ desc.all }}
				<span class="count">{{ ratings.length }}</span>
			</span>
			<!-- 好的 -->
			<span @click="select(0,$event)" class="block positive" :class="{ 'active': selectType === 0 }">
				{{ desc.positive }}
				<span class="count">{{ positives.length }}</span>
			</span>
			<!-- 不好的 -->
			<span @click="select(1,$event)" class="block negative" :class="{ 'active': selectType === 1 }">
				{{ desc.negative }}
				<span class="count">{{ negatives.length }}</span>
			</span>
		</div>
		<!-- 评价选择开关 -->
		<div @click="toggleContent" class="switch" :class="{ 'on': onlyContent }">
			<i class="icon-check_circle"></i>
			<span class="text">只看有内容的评价</span>
		</div>
	</div>
</template>

<script type="ecmascript-6">
	import bus from '../../common/js/bus.js'

	const POSITIVE = 0   // 好的评价
	const NEGATIVE = 1   // 坏的评价
	const ALL = 2        // 所有评价   

	export default {
		props: {
			ratings: {
				type: Array,
				default() {
					return []
				}
			},
			selectType: {
				type: Number,
				default: ALL
			},
			onlyContent: {
				type: Boolean,
				default: false
			},
			desc: {
				type: Object,
				default() {
					return {
						all: '全部',
						positive: '满意',
						negative: '不满意'
					}
				}
			}
		},
		computed: {
			positives() {
				return this.ratings.filter((rating) => {
					return rating.rateType === POSITIVE
				})
			},
			negatives() {
				return this.ratings.filter((rating) => {
					return rating.rateType === NEGATIVE
				})
			}
		},
		methods: {
			select(type,event) {
				// 消除PC端页面自带的点击事件
				if (!event._constructed) {
					return
				}
				// 发布改变selectType值的 “select” 函数
				this.$emit('select',type)
			},
			toggleContent(event) {
				// 消除PC端页面自带的点击事件
				if (!event._constructed) {
					return
				}
				// 发布改变onlyContent值的 “toggle” 函数
				this.$emit('toggle')
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
	@import '../../common/stylus/mlxin.styl'

	.ratingselect
		.rating-type
			padding 18px 0
			margin 0 18px
			border-1px(rgba(7, 17, 27, .1))
			font-size 0
			.block
				display inline-block
				padding 8px 12px
				margin-right 8px
				line-height 16px
				border-radius 1px
				font-size 12px
				color rgb(77, 85, 93)
				&.active
					color #fff
				.count
					margin-left 2px
					font-size 8px
				&.positive
					background rgba(0, 160, 220, .2)
					&.active
						background rgb(0, 160, 220)
				&.negative
					background rgba(77, 85, 93, .2)
					&.active
						background rgb(77, 85, 93)
		.switch
			padding 12px 18px
			line-height 24px
			border-bottom 1px solid rgba(7, 17, 27, .1)
			color rgb(147, 153, 159)
			font-size 0
			&.on
				.icon-check_circle,.text
					color #00c850
			.icon-check_circle
				display inline-block
				vertical-align top
				margin-right 4px
				font-size 24px
			.text
				display inline-block
				vertical-align top
				font-size 12px
</style>
