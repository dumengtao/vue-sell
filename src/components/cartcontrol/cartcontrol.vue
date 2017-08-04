<template>
	<div class="cartcontrol">
		<transition name="move">
			<div class="cart-decrease" v-show="food.count > 0" @click.stop.prevent="decreaseCart($event)">
				<span class="inner icon-remove_circle_outline"></span>
			</div>
		</transition>
		<div class="cart-count" v-show="food.count > 0">{{ food.count }}</div>
		<div class="cart-add icon-add_circle" @click.stop.prevent="addCart($event)"></div>
	</div>
</template>

<script type="ecmascript-6">
	import Vue from 'vue'
	import bus from '../../common/js/bus.js'

	export default {
		props: {
			food: Object
		},
		methods: {
			addCart(event) {
				// 消除PC端页面自带的点击事件
				if (!event._constructed) {
					return
				}
				if (!this.food.count) {
					Vue.set(this.food,'count',1)
				}else{
					this.food.count ++
				}
				// 发布购物车小球动画 “cartAdd” 函数
				bus.$emit('cartAdd',event.target)
			},
			decreaseCart(event) {
				// 消除PC端页面自带的点击事件
				if (!event._constructed) {
					return
				}
				if (this.food.count) {
					this.food.count --
				}
			}
		}
	}
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .cartcontrol
    	font-size 0
    	.cart-decrease
    		display inline-block
    		padding 6px
    		.inner
    			display inline-block
		    	line-height 24px
		    	font-size 24px
		    	color rgb(0, 160, 220)
		    	transition all .4s linear
    		&.move-enter-active,&.move-leave-active
    			transition all .4s linear
	    	&.move-enter,&.move-leave-to
	    		opacity 0
	    		transform translate3d(24px,0,0)
    			.inner
    				transform rotate(180deg)
    	.cart-count
    		display inline-block
    		vertical-align top
    		width 12px
    		padding-top 6px
    		line-height 24px
    		text-align center
    		font-size 10px
    		color rgb(147, 153, 159)
    	.cart-add
    		display inline-block
    		padding 6px
    		line-height 24px
    		font-size 24px
    		color rgb(0, 160, 220)
</style>
