import { ref } from 'vue'
import type pageContent from '@/components/page-content/pageContent.vue'
const usePageContent = () => {
  const contentRef = ref<InstanceType<typeof pageContent>>()
  //search自定义事件触发后将内容发往content中请求数据
  const handelQueryListClick = (searchForm: any) => {
    contentRef.value?.fetchPageListData(searchForm)
  }
  const handelResetClick = () => {
    contentRef.value?.fetchPageListData()
  }
  return {
    contentRef,
    handelQueryListClick,
    handelResetClick
  }
}
export default usePageContent
