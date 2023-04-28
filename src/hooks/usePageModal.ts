import { ref } from 'vue'
import type pageModal from '@/components/page-modal/pageModal.vue'
const usePageModal = () => {
  const modalRef = ref<InstanceType<typeof pageModal>>()
  const handleNewPageClick = () => {
    modalRef.value?.dialogVisibleClick(false)
  }
  const handelEditClick = (itemData: any) => {
    modalRef.value?.dialogVisibleClick(true, itemData)
  }
  return {
    modalRef,
    handleNewPageClick,
    handelEditClick
  }
}
export default usePageModal
