<template>
	<section>
	<Form :model="formItem">
		<Form-item label="">
			<div v-html="formItem.textarea" class="text-copy">
			</div>
		</Form-item>
		<Button type="success" long
		v-clipboard:copy="message"
      v-clipboard:success="onCopy"
      v-clipboard:error="onError">COPY TO CLIPBOARD  (测试单击按钮复制文本)</Button>
	</Form>
	
	</section>

</template>


<script>
	
	export default {
		data () {
            return {
              message: '有一种遇见，不曾邀约，却心有灵犀；有一种目光，不远不近，却一直在守望；山水相逢，相约陌上，你明媚的笑脸，是我心中倾城的暖，你在，我在，最美好的懂得也在，便是用一朵花开的明媚，见证了整个春天。',
			  formItem: {
				  textarea: '<h1>许你一场春暖花开</h1></br>'+
				  			'不曾邀约，却心有灵犀；</br>'+
							'有一种目光，不远不近，却一直在守望;</br>'+
							'山水相逢，相约陌上，</br>'+
							'你明媚的笑脸，是我心中倾城的暖，</br>'+
							'你在，我在，</br>'+
							'最美好的懂得也在，</br>'+
							'便是用一朵花开的明媚，</br>'+
							'见证了整个春天。'
			  }
            }
        }
	}
</script>
<style scoped>
	.text-copy{
		text-align: center;
		font-size: 14px;
		letter-spacing: 2px;
		margin: 20px;
	}
</style>